const ERC20Token = artifacts.require("ERC20Token");
const ERC20TokenSale = artifacts.require("ERC20TokenSale");

let instance;
let tokenPrice;
let buyer;
let buyTokens;
let numberOfTokens;

beforeEach( async () => {
    instance = await ERC20TokenSale.deployed();
    tokenPrice = 1000000000000000; // in wei 0.001 ether
  });
contract('ERC20TokenSale', function(accounts){
    buyer = accounts[1];
    describe('constructor', () => {
        it('has contract address', async () => {
            let address = await instance.address;
            assert.notEqual(address, 0x0, 'has contract address');
        });

        it('has token contract address', async () => {
            let tokenContractAddress = await instance.tokenContract();
            assert.notEqual(tokenContractAddress, 0x0, 'has token contract address');  
        });

        it('token price is correct', async () => {
            let price = await instance.tokenPrice();
            assert.equal(price, tokenPrice, 'token price is correct');
        });

    });

    describe("buyTokens", () => {
        it('increments the number of tokens sold', async () => {
            numberOfTokens = 10;
            let value = numberOfTokens * tokenPrice;
            buyTokens = await instance.buyTokens(numberOfTokens, {from: buyer, value: value});
            let amount = await instance.tokensSold();
            assert.equal(amount.toNumber(), numberOfTokens, "increments the number of tokens sold");
        });

        it('receipt', async () => {
            let receipt = await buyTokens;
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, "Sell", 'should be the "Sell" event');
            assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens');
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased');
        });

        it ("msg.value must equal number of tokens in wei", async () => {
            try{
                await buyTokens(numberOfTokens, { from: buyer, value: 1 });
            }
            catch(error) {
                assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');
            }
            
        });
    });
});