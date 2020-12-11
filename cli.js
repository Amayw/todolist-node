#!/usr/bin/env node
const { program } = require('commander');
const api =require('./index.js')
const pkg=require('./package.json')
program.version(pkg.version);

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


if(process.argv.length===2){
    void api.showAll()
}else{
    program.parse(process.argv);
}
