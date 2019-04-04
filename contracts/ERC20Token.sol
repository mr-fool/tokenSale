pragma solidity ^0.5.0;

contract ERC20Token {
    /*What is needed
    Constructor
    Set the total number of tokens
    Read the total number of tokens
     */
    uint256 public totalSupply;
    
    constructor() public {
        totalSupply = 1000000;

    }
}