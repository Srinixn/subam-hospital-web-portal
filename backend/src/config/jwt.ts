// ─────────────────────────────────────────────
//  JWT configuration and helpers
//  Used for chatbot admin API authentication,
//  running in parallel with the existing session auth.
// ─────────────────────────────────────────────
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

/** JWT configuration from environment variables. */
const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'dev-jwt-secret-change-in-production',
  accessExpiry: process.env.JWT_EXPIRY || '15m',
  refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
} as const;

if (JWT_CONFIG.secret === 'dev-jwt-secret-change-in-production') {
  logger.warn('Using default JWT secret — set JWT_SECRET in .env for production');
}

/** Payload stored in JWT access tokens. */
export interface JwtPayload {
  userId: number;
  email: string;
  name: string;
  type: 'access' | 'refresh';
}

/**
 * Generate an access token (short-lived, 15min default).
 */
export function generateAccessToken(payload: Omit<JwtPayload, 'type'>): string {
  return jwt.sign(
    { ...payload, type: 'access' },
    JWT_CONFIG.secret,
    { expiresIn: JWT_CONFIG.accessExpiry as any },
  );
}

/**
 * Generate a refresh token (long-lived, 7d default).
 */
export function generateRefreshToken(payload: Omit<JwtPayload, 'type'>): string {
  return jwt.sign(
    { ...payload, type: 'refresh' },
    JWT_CONFIG.secret,
    { expiresIn: JWT_CONFIG.refreshExpiry as any },
  );
}

/**
 * Verify and decode a JWT token.
 * @returns Decoded payload or null if invalid/expired
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_CONFIG.secret) as JwtPayload;
    return decoded;
  } catch (err) {
    logger.debug(`JWT verification failed: ${(err as Error).message}`);
    return null;
  }
}

/**
 * Generate both access and refresh tokens for a user.
 */
export function generateTokenPair(user: {
  id: number;
  email: string;
  name: string;
}): { accessToken: string; refreshToken: string } {
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}
