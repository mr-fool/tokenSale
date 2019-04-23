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
}