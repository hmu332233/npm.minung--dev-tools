const snippets = require('./snippets.json');

class CodeSnippetStore {
  constructor() {
    // static
    this.NAME_KEY = 'NAME';
    this.CSS_EXTENSION_KEY = 'CSS_EXTENTION';

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

  needReplace(snippet, key) {
    return snippet.includes(`[${key}]`);
  }

  needReplaceName(snippet) {
    return this.needReplace(snippet, this.NAME_KEY);
  }

  needReplaceCssExtension(snippet) {
    return this.needReplace(snippet, this.CSS_EXTENSION_KEY);
  }

  get({ type, name, cssExtension = 'scss' } = {}) {
    if (!name) throw new Error('no name');

    const replace = [{
      key: 'NAME',
      value: name
    }, {
      key: 'CSS_EXTENTION',
      value: cssExtension
    }];

    const snippet = this.get2({ type, replace });
    return snippet;
  }

  get2({ type, replace }) {
    const originalSnippet = this.getOriginalSnippet(type);
    let snippet = originalSnippet;

    for (let { key, value } of replace) {
      if (!this.needReplace(originalSnippet, key)) continue;

      const regex = new RegExp(`\\[${key}\\]`, 'gi');
      snippet = snippet.replace(regex, value);
    }

    return snippet;
  }
}

module.exports = CodeSnippetStore;
