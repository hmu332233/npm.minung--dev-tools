const CodeSnippetFileBuilder = require('../modules/CodeSnippetFileBuilder');

const codeSnippetFileBuilder = new CodeSnippetFileBuilder();

const program = require('commander');

program
  .command('cmpnt <name>')
  .description('기본적인 component 뼈대를 만들어준다')
  // .option('-t, --type [type]', '컴포넌트 타입 "class" or "function"', 'class')
  .option('-p, --path [path]', '컴포넌트가 저장될 경로', './')
  // .option('-j, --jstype [jstype]', '컴포넌트 파일의 확장자', 'jsx')
  .option('-c, --csstype [csstype]', '컴포넌트 파일의 확장자', 'scss')
  .on('--help', () => {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ mu-dev cmpnt Input');
    console.log('    $ mu-dev cmpnt Input -t function -p ./src/components');
    console.log('');
  })
  .action((componentName, options) => {
    console.log('make react component');
    // console.log(`${componentName}.${options.jstype}`);
    console.log(`${componentName}.jsx`);
    // console.log('type:', options.type === 'class' ? 'class' : 'function');

    codeSnippetFileBuilder.make({
      componentName: componentName,
      componentPath: options.path,
      // componentType: options.type,
      // componentJsExtension: options.jstype,
      componentCssExtension: options.csstype
    });
  });

program.parse(process.argv);