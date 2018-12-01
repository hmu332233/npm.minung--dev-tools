/*
시나리오

default
name.isRequired
type.isRequired
cssExtension (default: scss)

사용자는 code snippet을 생성할 수 있다.
  시나리오
    given: X
    when: code snippet을 생성하면
    then: 실패한다.
  시나리오
    given: name, type: 'class'
    when: code snippet을 생성하면
    then: [NAME] 자리에 name이 들어간 class type의 react component snippet이 리턴된다.
*/
const getCodeSnippet = require('../modules/getCodeSnippet');

describe('getCodeSinppet.js', () => {
  describe('사용자는 code snippet을 생성할 수 있다.', () => {
    test('X - code sinppet을 생성하면, 실패한다.', () => {
      function execgetCodeSnippet() {
        getCodeSnippet({});
      }
      expect(execgetCodeSnippet).toThrow();
    });
    test('name, type: "class" - code sinppet을 생성하면, [NAME] 자리에 name이 들어간 class type의 react component sinppet이 리턴된다.', () => {
      const name = 'TestComponent';
      const codeSnippet = getCodeSnippet({
        name,
        type: 'class'
      });
      const expectString = "import React from 'react';\nimport PropTypes from 'prop-types';\nimport styles from './TestComponent.scss';\n\nclass TestComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n    };\n  }\n  render() {\n    return (\n      <div className={styles.TestComponent}>\n      </div>\n    );\n  }\n}\n\nTestComponent.propTypes = {\n};\nTestComponent.defaultProps = {\n};\n\nexport default TestComponent;"

      expect(codeSnippet).toEqual(expectString);
    });
  });
});
