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

  get({ type, name, cssExtension = 'scss' } = {}) {
    // const codeSnippet = snippets[type].body;

    if (!codeSnippet) throw new Error('Cannot found snippet');
    if (!name) throw new Error('No Name');

    const result = codeSnippet.replace(/\[NAME\]/gi, name).replace(/\[CSS_EXTENTION\]/gi, cssExtension);
    return result;
  }
}

module.exports = CodeSnippetStore;