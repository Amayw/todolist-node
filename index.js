const fs =require('fs');
const path=require('path');

const home=getUserHome();
const dbPath=path.join(home,'.todo');



module.exports.add=(title)=>{
    fs.readFile(dbPath,{flag:'a+'},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            let list;
            try{
                list=JSON.parse(data.toString());
            }catch(err2){
                list=[];
            }
            const task={
                title:title,
                done:false
            }
            list.push(task);
            const string=JSON.stringify(list);
            fs.writeFile(dbPath,string+'\n',(err3)=>{
                if(err3){
                    console.log(err3);
                }
            });
        }
    })
}

function getUserHome() {
    const homedir=require('os').homedir();//home目录
    const home=process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];//home系统变量
    return home||homedir;//优先返回用户设置的系统变量
}

