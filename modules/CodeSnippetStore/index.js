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
    return this.snippets[type].body;
  }

  needReplaceName(snippet) {
    return snippet.includes(this.NAME_KEY);
  }

  needReplaceCssExtension(snippet) {
    return snippet.includes(this.CSS_EXTENSION_KEY);
  }

  get({ type, name, cssExtension = 'scss'} = {}) {
    if (!name) throw new Error('no name');

    const originalSnippet = this.getOriginalSnippet(type);
    let snippet = originalSnippet;

    if (this.needReplaceName(originalSnippet)) {
      snippet = snippet.replace(/\[NAME\]/gi, name);
    }

    if (this.needReplaceCssExtension(originalSnippet)) {
      snippet = snippet.replace(/\[CSS_EXTENTION\]/gi, cssExtension);
    }

    return snippet;
  }
}

module.exports = CodeSnippetStore;