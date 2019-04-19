var ERC20Token = artifacts.require("ERC20Token");

/*
its not needed
just run it and make some sort of assert
like make sure the balance of the owner is reduced afteer a transfer
with balanceOf and assert.equal
*/
let instance;

beforeEach( async () => {
  instance = await ERC20Token.deployed();

});
contract("ERC20", async accounts => {
    describe('constructor', () => {
      it("sets the total supply upon deployment", async () => {
        let balance = await instance.totalSupply.call();
        assert.equal(balance.toNumber(), 1000000,'sets the total supply to 1,000,000')
        
      });
      it("gives initial supply to msg.sender", async() =>{
        let adminBalance = await instance.balanceOf.call(accounts[0]);
        assert.equal(adminBalance.toNumber(),1000000,'testing msg.sender balance');
      });
      it("has the proper token name", async() => {
        let name = await instance.name();
        assert.equal(name, 'soycoin', 'has the correct name');
      });
      it("has the proper symbol", async() => {
        let symbol = await instance.symbol();
        assert.equal(symbol, 'soy', 'has the correct symbol');
      });
  });
  describe('transfer', () => {
    it('transfers token ownership', async() => {
      try{
        let transfer = await instance.transfer.call(accounts[1],999999);
        let transferTest = await instance.transfer.call(accounts[1], 250000, { from: accounts[0] });
      }
      catch (error) {
        assert.fail(transfer.error.messageindexOf('revert') >=0, 'error message must contain revert');
        assert.equal(transferTest, true, 'it returns true');
        assert.equal(accounts[1] >= 240000 ); //gas lost
      }
    });
  });
  
  describe('approve', () => {
    it('approves tokens for delegated transfer', async() => {
      let approval =  await instance.approve.call(accounts[1], 100);
      assert.equal(approval, true, 'it returns true');
      instance.approve(accounts[1], 100, { from: accounts[0] });
      let allowanceTest = await instance.allowance(accounts[0], accounts[1]);
      assert.equal(allowanceTest.toNumber(), 100, 'stores the allowance for delegated transfer');
    });
  });

  describe('transfer from', () => {
    it("properly rejects invalid balance", async() => {
      assert.equal(balance[account[1] <= 100, "right account");
      
    });

  });

});