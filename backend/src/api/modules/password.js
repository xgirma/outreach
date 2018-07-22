import * as owasp from 'owasp-password-strength-test';
import * as err from './error';

/*
 * OWASP password strength config
 */
owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 8,
  minPhraseLength: 20,
});

export { owasp };

/*
 * test password strength
 *
 * may fail for several reasons
 * - if password is weak
 */
export const passwordStrengthTest = (password) => {
  const passwordTest = owasp.test(password);
  if (!passwordTest.strong) {
    const { errors } = passwordTest;
    const message = errors.join(' ');
    throw err.WeakPassword(message);
  }
};

/*
 * temporary-password generation configuration
 * for 'generate-password' module
 */
export const passwordConfig = {
  numbers: true,
  symbols: true,
  strict: true,
  excludeSimilarCharacters: true,
  exclude: '"',
};
