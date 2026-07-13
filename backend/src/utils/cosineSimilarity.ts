// ─────────────────────────────────────────────
//  Cosine similarity for embedding vectors
//  Pure TypeScript — no external dependencies.
// ─────────────────────────────────────────────

/**
 * Compute the cosine similarity between two numeric vectors.
 * Returns a value in the range [-1, 1] where:
 *   1  = identical direction
 *   0  = orthogonal (unrelated)
 *  -1  = opposite direction
 *
 * For normalized embedding vectors (e.g., OpenAI embeddings),
 * this simplifies to the dot product.
 *
 * @throws {Error} If vectors have different lengths or are zero-length.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(
      `Vector length mismatch: ${a.length} vs ${b.length}`,
    );
  }

  if (a.length === 0) {
    throw new Error('Cannot compute cosine similarity for zero-length vectors');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);

  // Guard against division by zero (zero vector)
  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
}

/**
 * Find the top-K most similar items from a collection of embeddings.
 * Returns items sorted by descending similarity score.
 *
 * @param queryEmbedding - The query vector to compare against
 * @param items - Array of items, each with an `embedding` property
 * @param topK - Number of top results to return (default: 5)
 * @returns Sorted array of { item, score } pairs
 */
export function findTopKSimilar<T extends { embedding: number[] }>(
  queryEmbedding: number[],
  items: T[],
  topK: number = 5,
): { item: T; score: number }[] {
  const scored = items.map((item) => ({
    item,
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}
