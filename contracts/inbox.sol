pragma solidity ^0.4.17;

contract Inbox{
    string private  messag;
    function Inbox(string initialmsg) public{
        messag = initialmsg;
    }
    function setmsg(string newmsg)public{
        messag = newmsg;
    }
    function getmsg() public view returns (string){
        return messag;
    }
}