const CodeSnippetFileBuilder = require('../modules/CodeSnippetFileBuilder');

const codeSnippetFileBuilder = new CodeSnippetFileBuilder();

const program = require('commander');

program
  .command('cmpnt <name>')
  .description('기본적인 component 뼈대를 만들어준다')
  .option('-t, --type [type]', '컴포넌트 타입 "class" or "function"', 'function')
  .option('-p, --path [path]', '컴포넌트가 저장될 경로', './')
  // .option('-j, --jstype [jstype]', '컴포넌트 파일의 확장자', 'jsx')
  .option('-c, --csstype [csstype]', '컴포넌트 파일의 확장자', 'scss')
  .option('-i, --index', 'index 파일을 컴포넌트로 사용한다.')
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
    console.log(`${componentName}.jsx`, '-', options.type);

    codeSnippetFileBuilder.makeReactComponent({
      componentName: componentName,
      componentPath: options.path,
      componentType: options.type,
      // componentJsExtension: options.jstype,
      componentCssExtension: options.csstype,
      indexComponent: options.index,
    });
  });

  program
  .command('model <name>')
  .description('기본적인 model 뼈대를 만들어준다')
  .option('-p, --path [path]', '컴포넌트가 저장될 경로', './')
  .on('--help', () => {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ mu-dev model User');
    console.log('    $ mu-dev model User -p ./models');
    console.log('');
  })
  .action((name, options) => {
    console.log('make model', name);

    codeSnippetFileBuilder.makeMongooseModel({
      name: name,
      path: options.path
    });
  });

program.parse(process.argv);