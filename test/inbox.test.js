const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');
let Accounts;
let inbox;
beforeEach(async ()=>{
    
    //get a list os accounts
    Accounts=await web3.eth.getAccounts()

        //use one of those accounts to deploy
    inbox=await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode,
        arguments:['Hi there!']})
        .send({from:Accounts[0],gas: '1000000'});
        

});
describe('inbox',()=>{
    it('deploys acontract',()=>{
        console.log(inbox);
    });
});


