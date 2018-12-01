const snippets = require('./snippets.json');

const getCodeSnippet = ({ name, type, cssExtension = 'scss'}) => {
  if (!name) throw new Error('no name')

  const templateJsxData = snippets.reactClassComponent.body;
  const templateCssData = snippets.reactComponentCss.body;
  const templateIndexData = snippets.reactComponentIndex.body;

  const jsxData = templateJsxData.replace(/\[NAME\]/gi, name).replace(/\[CSS_EXTENTION\]/gi, cssExtension);
  const cssData = templateCssData.replace(/\[NAME\]/gi, name);
  const indexData = templateIndexData.replace(/\[NAME\]/gi, name);

  return jsxData;
};
module.exports = getCodeSnippet;