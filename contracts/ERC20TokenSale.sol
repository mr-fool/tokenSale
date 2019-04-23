pragma solidity ^0.5.0;

import "./ERC20Token.sol";

contract ERC20TokenSale {
    address admin;
    ERC20Token public tokenContract;

    constructor() public{
        //Assign an admin
        admin = msg.sender;
        //Token Contract
        //Token Price
    }
}