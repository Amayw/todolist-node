const db=require('../db')
const fs=require('fs')
jest.mock('fs')


describe('db',()=>{
    it('can read',async ()=>{
        const data=[{title:"买花花",done:false}];
        fs.writeMock('/fakePath',null,JSON.stringify(data));
        const list=await db.read('/fakePath');
        expect(list).toStrictEqual(data);
    })

    // it('can write',(()=>{
    //     expect(db.write).toBeInstanceOf(Function)
    // }))
})
