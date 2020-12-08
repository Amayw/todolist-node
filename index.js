const { program } = require('commander');
program.version('0.0.1');

program.option('-x, --xxx', 'output')

program
    .command('add')
    .description('add a new task into todoList')
    .action((...args) => {
        const words=args[1].join(' ');
        console.log(words);
    });


program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        console.log(`clear all`);
    });



program.parse(process.argv);

