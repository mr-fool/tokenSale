var ERC20Token = artifacts.require("ERC20Token");


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
        assert.deepEqual(name, 'soycoin', 'has the correct name');
      });
  });
});