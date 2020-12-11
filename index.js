const db = require('./db.js');
const inquirer = require('inquirer');

module.exports.add = async (title) => {
    const list = await db.read();
    list.push({title: title, done: false});
    await db.write(list);
};

module.exports.clear = async () => {
    await db.write([]);
};


function printTasks(list){
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'index',
                message: '请选择你想操作的任务',
                choices: [{name:'退出',value:'-1'},...list.map((task,index)=>{
                    return {name:`${task.done?'[x]':'[_]'} ${index+1}-${task.title}`,value:index.toString()}
                }),{name:'新建任务',value:'-2'}]
            })
        .then(answer=>{
            let index=parseInt(answer.index);
            if(index>=0){
                //选中任务
                selectedActions(list,index)
            }else if(index===-2){
                //新建
                createTask(list);
            }
            //退出
        })

}


function selectedActions(list,index){
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'action',
                message: '请选择你想做的操作',
                choices: [{name:'退出',value:'quit'},
                    {name:'已完成',value:'markAsDone'},
                    {name:'未完成',value:'markAsUndone'},
                    {name:'改标题',value:'rename'},
                    {name:'删除',value:'remove'}
                ]
            })
        .then(answer=>{
            const actions={
                markAsDone,markAsUndone,remove,rename
            }
            const action=actions[answer.action];
            action&&action(list,index);
        })
}

function createTask(list){
    inquirer.prompt({
        type: 'input',
        name: 'newTask',
        message: "请输入任务名"
    }).then((answer) => {
        list.push({title:answer.newTask,done:false})
        db.write(list);
    });
}

function markAsDone(list,index){
    list[index].done=true;
    db.write(list);
}
function markAsUndone(list,index){
    list[index].done=false;
    db.write(list);
}
function remove(list,index){
    list.splice(index,1)
    db.write(list);
}
function rename(list,index){
    inquirer.prompt({
        type: 'input',
        name: 'newTitle',
        message: "请输入新的任务名",
        default:list[index].title
    }).then((answer) => {
        list[index].title=answer.newTitle
        db.write(list);
    });
}

module.exports.showAll = async () => {
    const list = await db.read();
    printTasks(list);
};
