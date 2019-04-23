const ERC20Token = artifacts.require("ERC20Token");
const ERC20TokenSale = artifacts.require("ERC20TokenSale");

beforeEach( async () => {
    instance = await ERC20TokenSale.deployed();
  
  });
contract('ERC20TokenSale', function(accounts){
    describe('constructor', () => {
        it('initializes the contract with the correct values', async () => {
            let address = await instance.address;
            assert.notEqual(address, 0x0, 'has contract address');
            let tokenContractAddress = await instance.tokenContract();
            assert.notEqual(tokenContractAddress, 0x0, 'has token contract address');
        });
    });
});