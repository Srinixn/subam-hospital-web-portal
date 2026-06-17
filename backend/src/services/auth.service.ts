// ─────────────────────────────────────────────
//  Auth service — authentication business logic
// ─────────────────────────────────────────────
import bcrypt from 'bcrypt';
import * as userRepo from '../repositories/user.repository.js';
import { toSafeUser } from '../repositories/user.repository.js';
import type { SafeAdminUser } from '../types/index.js';

/**
 * Validate email + password credentials.
 * Returns the safe user object on success, null on failure.
 */
export async function validateCredentials(
  email: string,
  password: string,
): Promise<SafeAdminUser | null> {
  const user = await userRepo.findByEmail(email);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return null;

  return toSafeUser(user);
}

/**
 * Look up a user by ID and return the safe (no-password) representation.
 * Used to check the current session's user still exists.
 */
export async function getUserById(
  id: number,
): Promise<SafeAdminUser | null> {
  const user = await userRepo.findById(id);
  if (!user) return null;

  return toSafeUser(user);
}
