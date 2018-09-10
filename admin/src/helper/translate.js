import * as languages from './locale';

const DEFAULT_LANGUAGE = 'AM';

export class Translate {
  constructor(lang = DEFAULT_LANGUAGE) {
    this.setLanguage(lang);
  }

  setLanguage = (lang) => {
    this.lang = languages[lang] ? lang : DEFAULT_LANGUAGE;
  };

  translate = (str) => languages[this.lang][str] || str;
}
