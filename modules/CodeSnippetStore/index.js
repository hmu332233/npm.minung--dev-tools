const snippets = require('./snippets.json');

class CodeSnippetStore {
  constructor() {
    // static
    this.NAME_KEY = '[NAME]';
    this.CSS_EXTENSION_KEY = '[CSS_EXTENTION]';

    this.snippets = snippets;
  }

  getList() {
    return Object.keys(snippets);
  }

  validateType(type) {
    if (!type) return false;
    return this.getList().includes(type);
  }

  getOriginalSnippet(type) {
    if (!this.validateType(type)) throw new Error('not validated type');
    return this.snippets[type];
  }

  get({ type, name, cssExtension = 'scss'} = {}) {
    const originalSnippet = this.getOriginalSnippet(type);

    return null;
  }
}

module.exports = CodeSnippetStore;