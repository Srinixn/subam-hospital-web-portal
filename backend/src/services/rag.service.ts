// ─────────────────────────────────────────────
//  RAG Service — Retrieval-Augmented Generation
//  pipeline for the hospital chatbot.
//
//  Flow:
//  1. Strip PII from user message
//  2. Classify query (medical keywords → fallback)
//  3. Generate embedding → cosine similarity search
//  4. If confidence ≥ 0.75 → generate LLM answer
//  5. If confidence < 0.75 → trigger fallback form
//
//  Fallback mode (no OpenAI key):
//  Uses keyword-based TF-IDF matching.
// ─────────────────────────────────────────────
import { getOpenAIClient, isAIAvailable, EMBEDDING_MODEL, CHAT_MODEL } from '../config/openai.js';
import * as faqRepo from '../repositories/faq.repository.js';
import { cosineSimilarity, findTopKSimilar } from '../utils/cosineSimilarity.js';
import { stripPII } from '../utils/piiStripper.js';
import logger from '../utils/logger.js';
import type { ChatResponse, FaqDocument } from '../types/index.js';

/** Confidence threshold — below this, we trigger the fallback form. */
const CONFIDENCE_THRESHOLD = 0.75;

/** Maximum context documents to include in the LLM prompt. */
const MAX_CONTEXT_DOCS = 5;

/**
 * Medical/diagnostic keywords that always trigger the fallback form.
 * These patterns match common medical queries that should be routed
 * to human staff, not answered by the chatbot.
 */
const MEDICAL_KEYWORDS = [
  'symptom', 'symptoms', 'diagnosis', 'diagnose', 'diagnosed',
  'emergency', 'prescription', 'prescribe', 'dosage', 'dose',
  'medication', 'medicine', 'drug', 'treatment', 'treat',
  'surgery', 'operation', 'pain', 'bleeding', 'fever',
  'infection', 'pregnant', 'pregnancy test', 'miscarriage',
  'blood pressure', 'diabetes', 'cancer', 'tumor', 'tumour',
  'heart attack', 'stroke', 'allergy', 'allergic', 'breathing',
  'chest pain', 'vomiting', 'diarrhea', 'unconscious', 'seizure',
  'side effect', 'side effects', 'contraindication', 'overdose',
  'lab report', 'blood test', 'scan result', 'mri', 'ct scan',
  'x-ray', 'biopsy', 'prognosis', 'complication',
];

/**
 * Phrases that indicate the user wants to speak to a human.
 */
const HUMAN_REQUEST_PHRASES = [
  'speak to human', 'talk to human', 'talk to someone',
  'speak to someone', 'contact staff', 'real person',
  'human agent', 'live chat', 'customer service',
  'speak to doctor', 'talk to doctor', 'call me',
  'need help', 'connect me', 'transfer',
];

/**
 * Default quick-reply suggestions for common topics.
 */
const DEFAULT_QUICK_REPLIES = [
  'Visiting Hours',
  'Departments',
  'Book Appointment',
  'Talk to Staff',
];

/**
 * Main entry point — process a chat message through the RAG pipeline.
 */
export async function processChat(message: string): Promise<ChatResponse> {
  try {
    // 1. Strip PII before any processing
    const sanitizedMessage = stripPII(message);
    const lowerMessage = sanitizedMessage.toLowerCase().trim();

    // 2. Check for human request
    if (isHumanRequested(lowerMessage)) {
      logger.info('Chat: Human requested by user');
      return {
        fallback: true,
        fallbackReason: 'human_requested',
        answer: 'I\'d be happy to connect you with our staff. Please fill out the form below and a team member will get back to you shortly.',
        quickReplies: DEFAULT_QUICK_REPLIES,
      };
    }

    // 3. Check for medical/diagnostic keywords
    if (containsMedicalKeywords(lowerMessage)) {
      logger.info('Chat: Medical keywords detected — routing to fallback');
      return {
        fallback: true,
        fallbackReason: 'medical',
        answer: 'For medical questions, symptoms, or health concerns, please speak with our qualified medical staff. Fill out the form below and we\'ll connect you with the right department.',
        quickReplies: DEFAULT_QUICK_REPLIES,
      };
    }

    // 4. Retrieve relevant documents and generate answer
    if (isAIAvailable) {
      return await processWithAI(sanitizedMessage);
    } else {
      return await processWithKeywords(sanitizedMessage);
    }
  } catch (err) {
    logger.error('Chat processing error:', err);
    return {
      fallback: true,
      fallbackReason: 'error',
      answer: 'I\'m sorry, I encountered an issue processing your request. Please try again or fill out the form below to reach our team.',
      quickReplies: DEFAULT_QUICK_REPLIES,
    };
  }
}

/**
 * Process with OpenAI embeddings + LLM generation.
 */
async function processWithAI(message: string): Promise<ChatResponse> {
  const openai = getOpenAIClient();

  // Generate embedding for the user's query
  const queryEmbedding = await generateEmbedding(message);

  // Fetch all FAQ documents with embeddings
  const allDocs = await faqRepo.findAllActive();
  const docsWithEmbeddings = allDocs.filter(
    (doc) => doc.embeddingJson && doc.embeddingJson.length > 0,
  );

  if (docsWithEmbeddings.length === 0) {
    logger.warn('No FAQ documents with embeddings found — falling back');
    return await processWithKeywords(message);
  }

  // Find top-K similar documents
  const topDocs = findTopKSimilar(
    queryEmbedding,
    docsWithEmbeddings.map((doc) => ({
      ...doc,
      embedding: doc.embeddingJson!,
    })),
    MAX_CONTEXT_DOCS,
  );

  const bestScore = topDocs.length > 0 ? topDocs[0].score : 0;

  // 5. Confidence check
  if (bestScore < CONFIDENCE_THRESHOLD) {
    logger.info(`Chat: Low confidence (${bestScore.toFixed(3)}) — routing to fallback`);
    return {
      fallback: true,
      fallbackReason: 'low_confidence',
      confidence: bestScore,
      answer: 'I\'m not confident I have the right information for your question. Please fill out the form below so our staff can assist you directly.',
      quickReplies: DEFAULT_QUICK_REPLIES,
    };
  }

  // 6. Generate answer using LLM with retrieved context
  const contextText = topDocs
    .map((d, i) => `[Source ${i + 1}: ${d.item.title}]\n${d.item.content}`)
    .join('\n\n---\n\n');

  const systemPrompt = `You are a helpful hospital information assistant for Subam Hospital, Salem, Tamil Nadu.
You ONLY provide general hospital information based on the context provided below.
You do NOT provide medical advice, diagnoses, prescriptions, or treatment recommendations.
Keep responses concise (2-4 sentences), professional, and friendly.
Always cite your sources using [Source N] notation when referencing specific information.
If the context doesn't contain relevant information, say so honestly.

CONTEXT:
${contextText}`;

  const completion = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message },
    ],
    temperature: 0.3,
    max_tokens: 300,
  });

  const answer = completion.choices[0]?.message?.content || '';
  const sources = topDocs
    .filter((d) => d.score >= CONFIDENCE_THRESHOLD)
    .map((d) => ({ title: d.item.title, id: d.item.id }));

  logger.info(`Chat: AI response generated (confidence: ${bestScore.toFixed(3)}, sources: ${sources.length})`);

  return {
    answer,
    confidence: bestScore,
    sources,
    fallback: false,
    quickReplies: DEFAULT_QUICK_REPLIES,
  };
}

/**
 * Fallback: keyword-based search when OpenAI is unavailable.
 * Uses keyword overlap scoring from the database.
 */
async function processWithKeywords(message: string): Promise<ChatResponse> {
  return await keywordSearch(message);
}

/**
 * Async keyword search — matches query words against FAQ content.
 */
export async function keywordSearch(message: string): Promise<ChatResponse> {
  const allDocs = await faqRepo.findAllActive();
  const queryWords = message.toLowerCase().split(/\s+/).filter((w) => w.length > 2);

  if (queryWords.length === 0 || allDocs.length === 0) {
    return {
      fallback: true,
      fallbackReason: 'low_confidence',
      answer: 'Could you please rephrase your question? Or select a topic from the quick replies below.',
      quickReplies: DEFAULT_QUICK_REPLIES,
    };
  }

  // Score each document by weighted keyword overlap (title/tag boosting)
  const scored = allDocs.map((doc) => {
    const titleLower = doc.title.toLowerCase();
    const contentLower = doc.content.toLowerCase();
    const tagsLower = (doc.tags || '').toLowerCase();
    
    let score = 0;
    for (const word of queryWords) {
      let wordScore = 0;
      if (titleLower.includes(word)) {
        wordScore += 5.0; // Title match gets highest boost
      }
      if (tagsLower.includes(word)) {
        wordScore += 3.0; // Tags match gets medium boost
      }
      if (contentLower.includes(word)) {
        wordScore += 1.0; // Content match gets standard weight
      }
      score += wordScore;
    }
    
    // Normalize score against max possible score for this query (weight 5.0 per query word)
    const normalizedScore = score / (5.0 * queryWords.length);
    return { doc, score: normalizedScore };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];

  if (best.score >= 0.2) {
    return {
      answer: best.doc.content,
      confidence: best.score,
      sources: [{ title: best.doc.title, id: best.doc.id }],
      fallback: false,
      quickReplies: DEFAULT_QUICK_REPLIES,
    };
  }

  return {
    fallback: true,
    fallbackReason: 'low_confidence',
    confidence: best.score,
    answer: 'I couldn\'t find a precise answer. Please fill out the form below so our team can help you.',
    quickReplies: DEFAULT_QUICK_REPLIES,
  };
}

/**
 * Generate an embedding vector for text using OpenAI.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAIClient();
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });
  return response.data[0].embedding;
}

/**
 * Check if the message contains medical/diagnostic keywords.
 */
function containsMedicalKeywords(message: string): boolean {
  return MEDICAL_KEYWORDS.some((keyword) => message.includes(keyword));
}

/**
 * Check if the user is explicitly requesting a human.
 */
function isHumanRequested(message: string): boolean {
  return HUMAN_REQUEST_PHRASES.some((phrase) => message.includes(phrase));
}

/**
 * Generate embeddings for a FAQ document and store them.
 * Called when creating or updating FAQ entries.
 */
export async function embedAndStoreFaq(faqId: number): Promise<void> {
  if (!isAIAvailable) {
    logger.info(`Skipping embedding generation for FAQ ${faqId} — OpenAI not available`);
    return;
  }

  const doc = await faqRepo.findById(faqId);
  if (!doc) {
    logger.warn(`FAQ document ${faqId} not found for embedding`);
    return;
  }

  const textToEmbed = `${doc.title}\n${doc.content}`;
  const embedding = await generateEmbedding(textToEmbed);

  await faqRepo.update(faqId, { embeddingJson: embedding });
  logger.info(`Embedding generated and stored for FAQ ${faqId}`);
}
