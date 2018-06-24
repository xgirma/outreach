import * as owasp from 'owasp-password-strength-test';

owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 8,
  minPhraseLength: 20,
});

export default owasp;
