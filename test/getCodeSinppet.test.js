/*
시나리오

default
name.isRequired
type.isRequired
cssExtention (default: scss)

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
      const codeSnippet = getCodeSnippet();
      expect(codeSnippet).toEqual(true);
    });
    test('name, type: "class" - code sinppet을 생성하면, [NAME] 자리에 name이 들어간 class type의 react component sinppet이 리턴된다.', () => {

    });
  });
});
