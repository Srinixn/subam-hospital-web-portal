// ─────────────────────────────────────────────
//  OpenAI client configuration
//  Provides the OpenAI SDK client for embeddings
//  and chat completions. Gracefully degrades if
//  OPENAI_API_KEY is not set.
// ─────────────────────────────────────────────
import OpenAI from 'openai';
import logger from '../utils/logger.js';

/** Whether the OpenAI API is available for use. */
export let isAIAvailable = false;

/** The embedding model used for FAQ document vectorization. */
export const EMBEDDING_MODEL = 'text-embedding-3-small';

/** The chat model used for answer generation. */
export const CHAT_MODEL = 'gpt-4o-mini';

/** Embedding vector dimension for text-embedding-3-small. */
export const EMBEDDING_DIMENSION = 1536;

let openaiClient: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  try {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    isAIAvailable = true;
    logger.info('OpenAI client initialized successfully');
  } catch (err) {
    logger.warn('Failed to initialize OpenAI client — falling back to keyword search', {
      error: (err as Error).message,
    });
  }
} else {
  logger.warn(
    'OPENAI_API_KEY not set — chatbot will use keyword-based fallback search',
  );
}

/**
 * Get the OpenAI client instance.
 * @throws {Error} If OpenAI is not configured
 */
export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    throw new Error('OpenAI client is not initialized. Set OPENAI_API_KEY in .env');
  }
  return openaiClient;
}

export default openaiClient;
