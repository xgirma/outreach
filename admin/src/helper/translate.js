import * as languages from './locale';

const DEFAULT_LANGUAGE = 'amharic';

export class Translate {
  constructor(lang = DEFAULT_LANGUAGE) {
    this.setLanguage(lang);
  }

  setLanguage = (lang) => {
    this.lang = languages[lang] ? lang : DEFAULT_LANGUAGE;
  };

  getLanguage = () => this.lang;

  translate = (str) => languages[this.lang][str] || str;
}
