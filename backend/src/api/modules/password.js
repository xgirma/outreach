import { generate } from 'generate-password';
import * as owasp from 'owasp-password-strength-test';
import * as err from './error';

/*
 * Password strength config
 */
owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 8,
  minPhraseLength: 20,
});

export { owasp };

/*
 * Generate a temporary password, for password reset
 */
export const tempPassword = generate({
  numbers: true,
  symbols: true,
  strict: true,
  excludeSimilarCharacters: true,
  exclude: '"',
});

/*
 * Test password strength
 *
 * This function may fail for several reasons
 * - if password is weak
 */
export const testPasswordStrength = ({ password }) => {
  const passwordTest = owasp.test(password);
  if (!passwordTest.strong) {
    const { errors } = passwordTest;
    const message = errors.join(' ');
    throw err.WeakPassword(message);
  }
};
