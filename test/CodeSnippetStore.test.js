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
  describe('getOriginalSnippet, type에 해당하는 snippet 원본을 가져온다.', () => {
    test('getOriginalSnippet() 호출시 에러', () => {
      const codeSnippetStore = new CodeSnippetStore();
      function execGetOriginalSnippet() {
        codeSnippetStore.getOriginalSnippet();
      }
      expect(execGetOriginalSnippet).toThrowError('not validated type');
    });
    test('getOriginalSnippet("존재하지 않는 값") 호출시 에러', () => {
      const codeSnippetStore = new CodeSnippetStore();
      function execGetOriginalSnippet() {
        const noneExistedValue = 'abc';
        codeSnippetStore.getOriginalSnippet(noneExistedValue)
      }
      expect(execGetOriginalSnippet).toThrowError('not validated type');
    });
    test('getOriginalSnippet("존재하는 값") 호출시 올바른 값', () => {
      const codeSnippetStore = new CodeSnippetStore();
      const existedValue = codeSnippetStore.getList()[0];
      const existedSnippet = codeSnippetStore.snippets[existedValue].body;
      expect(codeSnippetStore.getOriginalSnippet(existedValue)).toEqual(existedSnippet);
    });
  });
  describe('needReplace 시리즈, 각 KEY들이 변환될 필요가 있는지 확인', () => {
    test('needReplaceName, [NAME]을 포함하면 true', () => {
      const codeSnippetStore = new CodeSnippetStore();
      const snippet = codeSnippetStore.getOriginalSnippet('reactClassComponent');
      expect(codeSnippetStore.needReplaceName(snippet)).toEqual(true);
    });
    test('needReplaceCssExtension, [CSS_EXTENSION]을 포함하면 true', () => {
      const codeSnippetStore = new CodeSnippetStore();
      const snippet = codeSnippetStore.getOriginalSnippet('reactClassComponent');
      expect(codeSnippetStore.needReplaceCssExtension(snippet)).toEqual(true);
    });
    test('needReplaceCssExtension, [CSS_EXTENSION]을 포함하지 않으면 false', () => {
      const codeSnippetStore = new CodeSnippetStore();
      const snippet = codeSnippetStore.getOriginalSnippet('reactComponentCss');
      expect(codeSnippetStore.needReplaceCssExtension(snippet)).toEqual(false);
    });
  });
  describe('get, snippet을 불러오고, 필요한 데이터를 replace한 후 가져온다.', () => {
    test('get, name이 없으면 에러', () => {
      const codeSnippetStore = new CodeSnippetStore();
      function execGet() {
        const snippet = codeSnippetStore.getReact({
          type: 'reactClassComponent'
        });
      }
      expect(execGet).toThrowError('no name');
    });
    test('get, type이 없거나 이상하면 에러', () => {
      const codeSnippetStore = new CodeSnippetStore();
      function execGet() {
        const snippet = codeSnippetStore.getReact({
          name: 'TEST',
        });
      }
      expect(execGet).toThrowError('not validated type');
    });
    test('get, type과 name이 제대로 있으면 해당 값을 replace (css는 scss로)', () => {
      const codeSnippetStore = new CodeSnippetStore();
      const name = 'TestComponent';
      const snippet = codeSnippetStore.getReact({
        name,
        type: 'reactClassComponent'
      });
      const expectString = "import React from 'react';\nimport PropTypes from 'prop-types';\nimport styles from './TestComponent.scss';\n\nclass TestComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n    };\n  }\n  render() {\n    return (\n      <div className={styles.TestComponent}>\n      </div>\n    );\n  }\n}\n\nTestComponent.propTypes = {\n};\nTestComponent.defaultProps = {\n};\n\nexport default TestComponent;";

      expect(snippet).toEqual(expectString);
    });
    test('get, type과 name이 제대로 있고 cssExtension이 있으면 해당 값을 replace', () => {
      const codeSnippetStore = new CodeSnippetStore();
      const name = 'TestComponent';
      const snippet = codeSnippetStore.getReact({
        name,
        type: 'reactClassComponent',
        cssExtension: 'css'
      });
      const expectString = "import React from 'react';\nimport PropTypes from 'prop-types';\nimport styles from './TestComponent.css';\n\nclass TestComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n    };\n  }\n  render() {\n    return (\n      <div className={styles.TestComponent}>\n      </div>\n    );\n  }\n}\n\nTestComponent.propTypes = {\n};\nTestComponent.defaultProps = {\n};\n\nexport default TestComponent;";

      expect(snippet).toEqual(expectString);
    });
  });
});
