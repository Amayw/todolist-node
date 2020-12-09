const { program } = require('commander');
const api =require('./index.js')
program.version('0.0.1');

program
    .command('add')
    .description('add a new task into todoList')
    .action((...args) => {
        let words;
        try{
            words=args[1].join(' ');
        }catch{
            console.log('请检查是否输入任务名');
            return;
        }
        api.add(words).then( ()=>{
            console.log('添加成功');
        } ,()=>{
            console.log('添加失败');
        });
    });


program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear().then(()=>{
            console.log('清空成功');
        } ,()=>{
            console.log('清空失败');
        });
    });


program
    .command('show')
    .description('show all tasks')
    .action(() => {
        api.showAll();
    });

    program.parse(process.argv);

