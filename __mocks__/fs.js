const fs = jest.createMockFromModule('fs');
const _fs = jest.requireActual('fs')
Object.assign(fs,_fs);

const hash={}

fs.writeMock=(path,err,data)=>{
    hash[path]=[err,data];
}

fs.readFile=(path,options,callback)=>{
    if(callback===undefined){
        callback=options;
    }
    if(path in hash){
        callback(...hash[path]);
    }else{
        _fs.readFile(path,options,callback);
    }
}

module.exports = fs;
