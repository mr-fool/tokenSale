App = {
    web3Provider: null,
    contracts: {},

    init: function() {
        console.log('App initialized...')
        return App.initWeb3();
    },
    initWeb3: function(){
        if (typeof web3 !== 'undefined') {
            // If a web3 instance is already provided by Meta Mask.
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
          } else {
            // Specify default instance if no web3 instance provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
      }
      return App.initContracts();
    },
    initContracts: async () => {
        const ERC20TokenSale = require('ERC20TokenSale.json'); 

        const accounts = await web3.eth.getAccounts();
      
        console.log('Attempting to deploy from account', accounts[0]);
      
        const result = await new web3.eth.Contract(ERC20TokenSale.abi)
          .deploy({ data: '0x' + ERC20TokenSale.evm.bytecode.object })
          .send({ gas: '7000000', from: accounts[0] });
      
        console.log('Contract deployed to', result.options.address);
      }
}
$(function(){
    $(window).load(function(){
        App.init();
    })
});