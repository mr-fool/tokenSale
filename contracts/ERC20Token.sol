pragma solidity ^0.5.0;

contract ERC20Token {
    /*What is needed
    Constructor
    Set the total number of tokens
    Read the total number of tokens
     */
    
     /*
    Testing 
    truffle console
    truffle(development)> ERC20Token.deployed().then(function(i) {token=i;})
    token.address
    token.totalSupply().then(function(s) {totalSupply =s;})
    totalSupply.toNumber()
      */
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    string public name = 'soycoin';
    string public symbol = 'syn';

    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }
    //Transfer
    function transfer(address _to, uint256 _value) public returns (bool success) {
      //Exception if account does't have enough
      require(balanceOf[msg.sender] >= _value);
      //Return a boolean
      //transfer Event

    }
}