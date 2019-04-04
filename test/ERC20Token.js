var ERC20Token = artifacts.require("ERC20Token");


contract("sets the total supply upon deployment", async accounts => {
    it("sets the total supply upon deployment", async () => {
      let instance = await ERC20Token.deployed();
      let balance = await instance.totalSupply.call();
      assert.equal(balance.toNumber(), 1000000,'sets the total supply to 1,000,000')
    });
});