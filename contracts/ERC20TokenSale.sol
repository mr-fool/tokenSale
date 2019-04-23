pragma solidity ^0.5.0;

import "./ERC20Token.sol";

contract ERC20TokenSale {
    address admin;
    ERC20Token public tokenContract;
    uint256 public tokenPrice;

    constructor(ERC20Token _tokenContract, uint256 _tokenPrice) public{
        //Assign an admin
        admin = msg.sender;
        //Token Contract
        tokenContract = _tokenContract;
        //Token Price
        tokenPrice = _tokenPrice;
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        //Require that value is equal to tokens
        //Require that the contract has enough tokens
        //Require that a transfer is successful
        
        //Keep track of tokens sold
        //Trigger Sell event
    }
}