pragma solidity ^0.5.0;

import "./ERC20Token.sol";
import "./SafeMath.sol";

contract ERC20TokenSale {
    using SafeMath for uint256;
    address admin;
    ERC20Token public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;
    event Sell(address _buyer, uint256 _amount);

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
        require(msg.value == _numberOfTokens.mul(tokenPrice) );
        //Require that the contract has enough tokens
        require(tokenContract.balanceOf(address(this) ) >= _numberOfTokens);
        //Require that a transfer is successful
        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        //Keep track of tokens sold
        tokensSold = tokensSold.add(_numberOfTokens);
        //Trigger Sell event
        emit Sell(msg.sender, _numberOfTokens);
    }

    //Ending the token sale
    function endSale() public {
        //Require admin
        require(msg.sender == admin);
        //Transfer remaining erc20 tokens to admin
        //Destroy contract
    }
}