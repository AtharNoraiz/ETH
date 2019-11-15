const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

//const web3 = new Web3(ganache.provider());

const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let Accounts;
let inbox;
let msg='Hi there!'
beforeEach(async ()=>{
    
    //get a list os accounts
    Accounts=await web3.eth.getAccounts()

        //use one of those accounts to deploy
    inbox=await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode,
        arguments:['Hi there!']})
        .send({from:Accounts[0],gas: '1000000'});
    inbox.setProvider(provider);
        

});
describe('inbox',()=>{
    it('deploys acontract',()=>{
        assert.ok(inbox.options.address);
    });
    it('has default message',async ()=>{
        const message=await inbox.methods.message().call();
        assert.equal(message,'Hi there!') ;
    });
    it('can change the message',async ()=>{
     await inbox.methods.setMessage('bye').send({from:Accounts[0]});
     const message=await inbox.methods.message().call();
        assert.equal(message,'bye') ;

    });
});


