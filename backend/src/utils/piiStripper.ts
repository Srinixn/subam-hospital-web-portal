// ─────────────────────────────────────────────
//  PII Stripper — removes personally identifiable
//  information before sending text to external LLM APIs.
//  HIPAA/GDPR compliance: never expose patient data
//  to third-party services.
// ─────────────────────────────────────────────

/**
 * Patterns that match common PII in Indian and international formats.
 * Each pattern is replaced with a generic placeholder.
 */
const PII_PATTERNS: { regex: RegExp; replacement: string }[] = [
  // Email addresses
  {
    regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    replacement: '[EMAIL]',
  },
  // Indian phone numbers (+91, 0-prefixed, or 10-digit)
  {
    regex: /(?:\+91[\s-]?)?(?:0\d{2,4}[\s-]?)?\d{5}[\s-]?\d{5}/g,
    replacement: '[PHONE]',
  },
  // International phone numbers (generic)
  {
    regex: /\+\d{1,3}[\s-]?\(?\d{1,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}/g,
    replacement: '[PHONE]',
  },
  // Aadhaar number (12 digits, optionally spaced/dashed)
  {
    regex: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
    replacement: '[AADHAAR]',
  },
  // PAN card number (Indian tax ID: ABCDE1234F)
  {
    regex: /\b[A-Z]{5}\d{4}[A-Z]\b/g,
    replacement: '[PAN]',
  },
  // Dates of birth patterns (DD/MM/YYYY, DD-MM-YYYY, etc.)
  {
    regex: /\b(?:0[1-9]|[12]\d|3[01])[\/\-.](?:0[1-9]|1[0-2])[\/\-.](?:19|20)\d{2}\b/g,
    replacement: '[DOB]',
  },
  // Credit/debit card numbers (13-19 digits, optionally spaced/dashed)
  {
    regex: /\b(?:\d{4}[\s-]?){3,4}\d{1,4}\b/g,
    replacement: '[CARD]',
  },
  // IP addresses
  {
    regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
    replacement: '[IP]',
  },
];

/**
 * Strip PII from text before sending to external APIs.
 * This function applies all PII patterns and returns sanitized text.
 *
 * @param text - Raw user input
 * @returns Sanitized text with PII replaced by placeholders
 */
export function stripPII(text: string): string {
  let sanitized = text;

  for (const { regex, replacement } of PII_PATTERNS) {
    // Reset regex lastIndex for global patterns
    regex.lastIndex = 0;
    sanitized = sanitized.replace(regex, replacement);
  }

  return sanitized;
}

/**
 * Check if text contains any detectable PII.
 * Useful for logging decisions and audit trails.
 */
export function containsPII(text: string): boolean {
  for (const { regex } of PII_PATTERNS) {
    regex.lastIndex = 0;
    if (regex.test(text)) {
      return true;
    }
  }
  return false;
}
