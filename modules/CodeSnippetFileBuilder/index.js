const fs = require('fs');
const { fromCamelCase, uncapitalize } = require('../Utils');
const CodeSnippetStore = require('../CodeSnippetStore');

class CodeSnippetFileBuilder {
  constructor() {
    this.codeSnippetStore = new CodeSnippetStore();
  }

  makeReactComponent({ componentName = 'Component', componentPath = './', componentType = 'function', componentJsExtension = 'jsx', componentCssExtension = 'scss', indexComponent } = {}) {
    componentPath += `/${componentName}`;
  
    const isClassType = componentType === 'class';
    const componentFileName = indexComponent ? 'index' : componentName;
    const cssFileName = indexComponent ? 'styles' : componentName;
    
    const jsxData = this.codeSnippetStore.get({
      type: isClassType ? 'reactClassComponent' : 'reactFunctionComponent',
      replace: [{ 
        key: 'NAME',
        value: componentName,
      }, {
        key: 'CSS_FILE_NAME',
        value: cssFileName,
      }, {
        key: 'CSS_EXTENTION',
        value: componentCssExtension,
      }],
    });
    const cssData = this.codeSnippetStore.get({
      type: 'reactComponentCss',
      replace: [{ 
        key: 'NAME',
        value: componentName,
      }],
    });
    const indexData = this.codeSnippetStore.get({
      type: 'reactComponentIndex',
      replace: [{ 
        key: 'NAME',
        value: componentName,
      }],
    });
  
    fs.mkdirSync(componentPath);

    fs.writeFileSync(`${componentPath}/${componentFileName}.${componentJsExtension}`, jsxData);
    fs.writeFileSync(`${componentPath}/${cssFileName}.${componentCssExtension}`, cssData);

    if (!indexComponent) {
      fs.writeFileSync(`${componentPath}/index.js`, indexData);
    }
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