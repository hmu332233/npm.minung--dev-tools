const fs = require('fs');
const { fromCamelCase, uncapitalize } = require('../Utils');
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
    const uncapitalizedCamelCaseName = uncapitalize(camelCaseName);

    const shemaData = this.codeSnippetStore.get({
      type: 'mongooseSchema',
      replace: [{
        key: 'MODEL_NAME',
        value: uncapitalizedCamelCaseName
      }, {
        key: 'COLLECTION_NAME',
        value: pascalCaseName
      }]
    });

    const modelData = this.codeSnippetStore.get({
      type: 'mongooseModel',
      replace: [{
        key: 'MODEL_NAME',
        value: uncapitalizedCamelCaseName
      },{
        key: 'NAME_CAMEL',
        value: camelCaseName
      }]
    });

    fs.writeFileSync(`${path}/${uncapitalizedCamelCaseName}.js`, modelData);
    fs.writeFileSync(`${path}/${uncapitalizedCamelCaseName}Info.js`, shemaData);
  }
}

module.exports = CodeSnippetFileBuilder;