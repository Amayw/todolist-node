const fs = require('fs');
const path = require('path');

const home = getUserHome();
const dbPath = path.join(home, '.todo');
const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: 'a+'}, (err, data) => {
                if (err) {
                    return reject(err);
                }
                let list;
                try {
                    list = JSON.parse(data.toString());
                } catch (err2) {
                    list = [];
                }
                resolve(list);
            });
        });
    },

    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list);
            fs.writeFile(path, string + '\n', (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
};


function getUserHome() {
    const homedir = require('os').homedir();//home目录
    const home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];//home系统变量
    return home || homedir;//优先返回用户设置的系统变量
}

module.exports = db;