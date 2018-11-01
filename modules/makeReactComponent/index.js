const fs = require('fs');
const snippets = require('./snippets.json');

module.exports = ({ componentName = 'Component', componentPath = './', componentType = 'class', componentJsExtension = 'jsx', componentCssExtension = 'scss' } = {}) => {
  componentPath += `/${componentName}`;
  
  const templateJsxData = snippets.reactClassComponent.body;
  const templateCssData = snippets.reactComponentCss.body;
  const templateIndexData = snippets.reactComponentIndex.body;

  const jsxData = templateJsxData.replace(/\[COMPONENT_NAME\]/gi, componentName).replace(/\[CSS_EXTENTION\]/gi, componentCssExtension);
  const cssData = templateCssData.replace(/\[COMPONENT_NAME\]/gi, componentName);
  const indexData = templateIndexData.replace(/\[COMPONENT_NAME\]/gi, componentName);

  fs.mkdirSync(componentPath);
  fs.writeFileSync(`${componentPath}/${componentName}.${componentJsExtension}`, jsxData);
  fs.writeFileSync(`${componentPath}/${componentName}.${componentCssExtension}`, cssData);
  fs.writeFileSync(`${componentPath}/index.js`, indexData);
}