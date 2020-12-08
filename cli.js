const { program } = require('commander');
const api =require('./index')
program.version('0.0.1');

program.option('-x, --xxx', 'output')

program
    .command('add')
    .description('add a new task into todoList')
    .action((...args) => {
        const words=args[1].join(' ');
        api.add(words);
    });


program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        console.log(`clear all`);
    });



program.parse(process.argv);

