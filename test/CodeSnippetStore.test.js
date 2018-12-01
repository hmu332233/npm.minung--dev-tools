const CodeSnippetStore = require('../modules/CodeSnippetStore');

describe('CodeSnippetStore', () => {
  describe('getList, 가져올 수 있는 snippet의 리스트를 리턴한다.', () => {
    test('getList() 호출', () => {
      const codeSnippetStore = new CodeSnippetStore();
      const snippetList = Object.keys(codeSnippetStore.snippets);
      
      expect(codeSnippetStore.getList()).toEqual(snippetList);
    });
  });
  describe('validateType, 입력받은 값이 가져올 수 있는 snippet인지 확인한다.', () => {
    test('validateType() 호출시 false', () => {
      const codeSnippetStore = new CodeSnippetStore();
      expect(codeSnippetStore.validateType()).toEqual(false);
    });
    test('validateType("존재하지 않는 값") 호출시 false', () => {
      const codeSnippetStore = new CodeSnippetStore();
      const noneExistedValue = 'abc';
      expect(codeSnippetStore.validateType(noneExistedValue)).toEqual(false);
    });
    test('validateType("존재하는 값") 호출시 true', () => {
      const codeSnippetStore = new CodeSnippetStore();
      const existedValue = codeSnippetStore.getList()[0];
      expect(codeSnippetStore.validateType(existedValue)).toEqual(true);
    });
  });
});
