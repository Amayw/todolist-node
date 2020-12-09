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

module.exports.showAll = async () => {
    const list = await db.read();
    // list.forEach((task,index)=>{
    //     newlist.push(`${task.done?'[x]':'[_]'} ${index+1}-${task.title}`);
    // })

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
        .then(answer => {
            let index=parseInt(answer.index);
            if(index>=0){
                //选中任务
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
                    .then(answer2=>{
                        switch(answer2.action){
                            case 'markAsDone':
                                list[index].done=true;
                                db.write(list);
                                break;
                            case 'markAsUndone':
                                list[index].done=false;
                                db.write(list);
                                break;
                            case 'remove':
                                list.splice(-1,1)
                                db.write(list);
                                break;
                            case 'rename':
                                inquirer.prompt({
                                    type: 'input',
                                    name: 'newTitle',
                                    message: "请输入新的任务名",
                                    default:list[index].title
                                }).then((answer3) => {
                                    list[index].title=answer3.newTitle
                                    db.write(list);
                                });
                                break;
                        }
                    })
            }else if(index===-1){
                 //退出
                return;
            }else if(index===-2){
                //新建
                inquirer.prompt({
                    type: 'input',
                    name: 'newTask',
                    message: "请输入任务名"
                }).then((answer4) => {
                    list.push({title:answer4.newTask,done:false})
                    db.write(list);
                });
            }
        })
        .catch()
};
