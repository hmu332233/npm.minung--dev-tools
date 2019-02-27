const fs = require('fs');
const { fromCamelCase } = require('../Utils');
const CodeSnippetStore = require('../CodeSnippetStore');

class CodeSnippetFileBuilder {
  constructor() {
    this.codeSnippetStore = new CodeSnippetStore();
  }

  makeReactComponent({ componentName = 'Component', componentPath = './', componentType = 'class', componentJsExtension = 'jsx', componentCssExtension = 'scss' } = {}) {
    componentPath += `/${componentName}`;
  
    const jsxData = this.codeSnippetStore.getReact({
      type: 'reactClassComponent',
      name: componentName,
      cssExtension: componentCssExtension
    });
    const cssData = this.codeSnippetStore.getReact({
      type: 'reactComponentCss',
      name: componentName,
      cssExtension: componentCssExtension
    });
    const indexData = this.codeSnippetStore.getReact({
      type: 'reactComponentIndex',
      name: componentName
    });
  
    fs.mkdirSync(componentPath);
    fs.writeFileSync(`${componentPath}/${componentName}.${componentJsExtension}`, jsxData);
    fs.writeFileSync(`${componentPath}/${componentName}.${componentCssExtension}`, cssData);
    fs.writeFileSync(`${componentPath}/index.js`, indexData);
  }

  makeMongooseModel({ name, path }) {
    const camelCaseName = name;
    const pascalCaseName = fromCamelCase(name);

    const shemaData = this.codeSnippetStore.get({
      type: 'mongooseSchema',
      replace: [{
        key: 'NAME_CAMEL',
        value: camelCaseName
      }, {
        key: 'NAME_PASCAL',
        value: pascalCaseName
      }]
    });

    const modelData = this.codeSnippetStore.get({
      type: 'mongooseModel',
      replace: [{
        key: 'NAME_CAMEL',
        value: camelCaseName
      }]
    });

    fs.writeFileSync(`${path}/${camelCaseName}.js`, modelData);
    fs.writeFileSync(`${path}/${camelCaseName}Info.js`, shemaData);
  }
}

module.exports = CodeSnippetFileBuilder;