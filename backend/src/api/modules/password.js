import * as owasp from 'owasp-password-strength-test';
import * as err from './error';

owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 8,
  minPhraseLength: 20,
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

export { owasp };
