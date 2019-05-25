App = {
    web3Provider: null,
    contracts: {},
    account: "0x0",
    loading: false,
    tokenPrice: 1000000000000000,

    init: () => {
        console.log('App initialized...')
        return App.initWeb3();
    },
    initWeb3: () =>{
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
    initContracts: () => {
      $.getJSON("ERC20TokenSale.json", (ERC20TokenSale) =>{
        App.contracts.ERC20TokenSale = TruffleContract(ERC20TokenSale);
        App.contracts.ERC20TokenSale.setProvider(App.web3Provider);
        App.contracts.ERC20TokenSale.deployed().then((ERC20TokenSale) =>{
          console.log("ERC20 Token Sale Address:", ERC20TokenSale.address);
        });
      }).done(()=>{
          $.getJSON("ERC20Token.json", (ERC20Token) =>{
            App.contracts.ERC20Token = TruffleContract(ERC20Token);
            App.contracts.ERC20Token.setProvider(App.web3Provider);
            App.contracts.ERC20Token.deployed().then(function(ERC20Token){
              console.log("ERC20 Sale Address:", ERC20Token.address);
            });  
            return App.render();

        });
      })
    },
    render: () => {
      if (App.loading){
        return;
      }
      App.loading = true;
      
      var loader = $('#loader');
      var content = $("content");

      loader.show();
      console.log("loader " + loader);

      content.hide();
      console.log("content " + content);

      //Load account data
      web3.eth.getCoinbase( (err, account) => {
        if (err === null ) {
          console.log("account", account);
          App.account = account;
          $("#accountAddress").html("You Account: " + account);

        }
      })

      App.contracts.ERC20TokenSale.deployed().then(function(instance) {
        ERC20TokenSaleInstance = instance;
        return ERC20TokenSaleInstance.tokenPrice();
      }).then(function(tokenPrice){
        console.log("tokenPrice", tokenPrice);
        App.tokenPrice = tokenPrice;
        $(".token-price").html(App.tokenPrice.toNumber());
      });
      
      App.loading = false;
      loader.hide();
      content.show();

    }
  }

$(function(){
    $(window).load(function(){
        App.init();
    })
});