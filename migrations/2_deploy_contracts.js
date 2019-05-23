const ERC20Token = artifacts.require("ERC20Token");
const ERC20TokenSale = artifacts.require("ERC20TokenSale");

/*module.exports = async function(deployer) {
  let deployCrowdTestTokenResult = await deployer.deploy(ERC20Token,1000000);
  let deployCrowdSaleResult = await deployer.deploy(ERC20TokenSale, ERC20Token.address);
};*/
module.exports = function(deployer) {
  deployer.deploy(ERC20Token, 2000000).then(function() {
    let tokenPrice = 1000000000000000; // in wei 0.001 ether
    return deployer.deploy(ERC20TokenSale, ERC20Token.address,tokenPrice);
  });
};