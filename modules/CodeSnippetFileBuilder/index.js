const fs = require('fs');
const { fromCamelCase } = require('../Utils');
const CodeSnippetStore = require('../CodeSnippetStore');

class CodeSnippetFileBuilder {
  constructor() {
    this.codeSnippetStore = new CodeSnippetStore();
  }

  makeReactComponent({ componentName = 'Component', componentPath = './', componentType = 'class', componentJsExtension = 'jsx', componentCssExtension = 'scss' } = {}) {
    componentPath += `/${componentName}`;
  
    const jsxData = this.codeSnippetStore.get({
      type: 'reactClassComponent',
      name: componentName,
      cssExtension: componentCssExtension
    });
    const cssData = this.codeSnippetStore.get({
      type: 'reactComponentCss',
      name: componentName,
      cssExtension: componentCssExtension
    });
    const indexData = this.codeSnippetStore.get({
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
      name: componentName,
      cssExtension: componentCssExtension
    });

    const modelData = this.codeSnippetStore.get({
      type: 'mongooseModel',
      name: componentName,
      cssExtension: componentCssExtension
    });
  }
}

module.exports = CodeSnippetFileBuilder;