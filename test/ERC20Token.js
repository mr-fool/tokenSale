var ERC20Token = artifacts.require("ERC20Token");


contract("sets the total supply upon deployment", async accounts => {
    it("sets the total supply upon deployment", async () => {
      let instance = await ERC20Token.deployed();
      let balance = await instance.totalSupply.call();
      assert.equal(balance.toNumber(), 1000000,'sets the total supply to 1,000,000')
      let adminBalance = await instance.balanceOf.call(accounts[0]);
      assert.equal(adminBalance.toNumber(),1000000,'testing msg.sender balance');
    });
});