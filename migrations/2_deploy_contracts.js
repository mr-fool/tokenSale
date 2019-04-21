const ERC20Token = artifacts.require("ERC20Token");
const ERC20Token = artifacts.require("ERC20TokenSale");

module.exports = function(deployer) {
  deployer.deploy(ERC20Token,1000000);
  deployer.deploy(ERC20TokenSale);
};
