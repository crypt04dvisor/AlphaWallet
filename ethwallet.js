  

if (typeof erc20contract_address == "undefined") {

		var erc20contract_address = "0xffc63b9146967a1ba33066fb057ee3722221acf0"
	        var mywallet = openkeyspan ;

		var option_etherscan_api = 'https://api.etherscan.io'; 

		var option_registration_enabled = true;

		var option_registration_backend = '';

		var option_recive_btc = ''; //reserved for future

	}

	var ks = localStorage.getItem('keystore');

	if (ks) {

		ks = lightwallet.keystore.deserialize(ks);	

	}



	var _balance;

	
	

					urlApi = option_etherscan_api;


					

					openkey = localStorage.getItem("openkey");

					$("#openkey").val(openkey);

					$("#openkeyspan").html(openkey);

					$("#privkey").html(localStorage.getItem("privkey"));

					privkey = localStorage.getItem("privkey");

					

			

					

					$("#ethqr").prop("src","https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl="+openkey+"&choe=UTF-8&chld=L|0");

						  

					

					$("#savethis").val("Warning! Withdraw all amounts of Alpha to your own ethereum wallet! Save this information to your local device! \r\nopenkey:"+openkey+"\r\nprivkey:"+privkey);

					

		 function sendEth() {
	var txs;
	var fromAddr = document.getElementById('sendFrom').value
	var toAddr = document.getElementById('sendTo').value
	var valueEth = document.getElementById('sendValueAmount').value

	var value = parseFloat(valueEth)*1.0e18
	var gasPrice = 18000000000
	var gas = 50000
	
	web3.eth.sendTransaction({from: fromAddr, to: toAddr, value: value, gasPrice: gasPrice, gas: gas}, function (err, txhash) {
	  console.log('error: ' + err)
	  console.log('go to : https://kovan.etherscan.io/tx/' + txhash)
	  var txs = 'https://kovan.etherscan.io/tx/' + txhash;
	})
					//$("#to").val();

					
	
	$('#transactionDiv').show();
	$('#etherscan').text(txs);
}	

			

				

				function rebalance() {

					

					if (typeof extrahook === "function") {

						extrahook();

					}

					

					if (!openkey) openkey = "0x";

					

					if (localStorage.getItem("name")) {

						$("#hiname").html("Hi "+localStorage.getItem("name")+"!");

					}

				

											

					 $.ajax({

						type: "GET", 

						url: urlApi+"/api?module=account&action=balance&address="+openkey+"&tag=latest&apikey=YourApiKeyToken", 

						dataType: 'json', 

						async: false,

							 

							 success: function (d) {

								

								console.log("balance check ",d,d.result);

								_balance = d.result / 1000000000000000000;
																 $(".balance").html(_balance+" ETH");

								

								if (_balance > 0.01) {

									$("#withall").show();

								}

					

					          }

					      });

				

						$.ajax({

							type: "GET", 

							url: urlApi+"/api?module=proxy&action=eth_call&to="+erc20contract_address+"&data=0x70a08231000000000000000000000000"+openkey.replace('0x','')+"&tag=latest&apikey=YourApiKeyToken", 

							dataType: 'json', 

							async: false, 

							

							 success: function (d) {

								

								amount = parseInt(d.result,16);

								console.log("-->",d.result);

								$(".balacnetokensnocss").val(amount/1000000000000000000);
								
								$("#sk").val(amount);
								
								 
								$("#speed0x").val(amount);

								$("#skoko").val(amount/1000000000000000000);
								 
								$("cuda").val('skoko');

								$("balacnesend").html(amount/1000000000000000000)

								$(".balacnetokens").html(amount/1000000000000000000);

								if (parseInt(d.result,16)>0) {

									$(".onlyhavetoken").show();

									$(".onlynohavetoken").hide();

									

								}

					          }

					      });

				

				

					$.get("https://api.etherscan.io/api?module=transaction&action=getstatus&txhash="+openkey+"&apikey=YourApiKeyToken",function(d){

						console.log(d);

					});

					rebuild_buttons();

					if ($("#openkey").val() == '0x') $("#openkey").val(openkey);

					

					

				}

				

	

				

				

function recalc() {

	if (typeof tokens_for_one_eth != "number") return false;

		teth = Math.ceil($( "#amount" ).val()/tokens_for_one_eth*10000000)/10000000;

		$("#ethfor100hmq").html(teth);



		

		if (parseFloat($("#price_btc").html())>0) { 

			$("#btcfor100hmq").html(teth*parseFloat($("#price_btc").html()));

		}

		if (parseFloat($("#price_usd").html())>0) { 

			$("#usdfor100hmq").html(teth*parseFloat($("#price_usd").html()));

		}

		

		rebuild_buttons();

	}



	

	function rebuild_buttons() {

		if (_balance > parseFloat($("#ethfor100hmq").html())) {

			$("#try2buybtn").removeAttr("disabled",true);

			

		} else {

			$("#try2buybtn").attr("disabled",true);

			

		}

		

		$(".mailto").prop("href","mailto:?subject=Private key for "+window.location+"&body="+getmsg());

	}



	function getmsg() {

		return "dashboard.html \r\n\r\nEthereum address: "+openkey+"  \r\nMnemonic Phrase: '"+localStorage.getItem("d12keys")+"'\r\n\r\n(HD derivation path is m/0'/0'/0')\r\n\r\nHow to access tokens and ethers: \r\n1. Go here https://www.myetherwallet.com/#send-transaction \r\n2. Select 'Mnemonic Phrase'\r\n3. Insert Phrase and set derivation path is m/0'/0'/0' \r\n3. Click 'Unlock' \r\n4. Add custom token > "+erc20contract_address+" (A,18)";

	}

	

	$( function() {

		$( "#slider-range-max" ).slider({

			range: "max",

			min: 1,

			max: 1000,

			value: 500,

			slide: function( event, ui ) {

				$( "#amount" ).val( ui.value );

				recalc();

			},

			change: function( event, ui ) {

				$("#openkey").select();

				if (_balance > parseFloat($("#ethfor100hmq").html())) {

					$("#try2buybtn").select();

					$("#try2buybtn").removeAttr("disabled",true);

					$("#consolebuy").html("Buy "+$("#amount").val()+" for "+$("#ethfor100hmq").html());

				} else {

					$("#try2buybtn").attr("disabled",true);

					$("#consolebuy").html("Topup your balance!");

				}

			}

		});

		

		$( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );

		recalc();

		build_masonry()

	} );

	

	

	function build_masonry() {

		var $grid = jQuery('#info2').masonry({

						itemSelector: '.griditem',

						

						columnWidth: '.col-md-4'

					});

					

			$grid.masonry();

		}

	function g(n){return localStorage.getItem(n);}

	function s(n,v){localStorage.setItem(n,v);}

	

	function generate_ethereum_keys() {

	

	}

	

	function build_state() {

		

		$("#mysmart").prop('href',option_etherscan_api.replace("api.","")+"/address/"+erc20contract_address);
		$("#mywall").prop('href',option_etherscan_api.replace("api.","")+"/address/"+openkey);

		if (g("registered")==1) {

			$("#name").hide();

			$("#email").hide();

			$("#pass").hide();

			$("#reg").hide();

			$("#info2").show();

			$(".mainboard").show();

			$("#btcaddress").val(g("btc"));

			build_masonry();

		} else{

			$("#right").show();

			recalc();

		}

									

	if (bs("name")) {

		if (option_registration_backend == "" && g("registered")!=1) { 

			s("registered",1); 

			

			var secretSeed = lightwallet.keystore.generateRandomSeed();

			

			eth_keys_gen('',secretSeed);

			

			build_state();

			build_masonry();

			

		}

		$("div.email").show();

		$("#email").focus();

			if (bs("email")) {

				$("div.pass").show();

				$("#pass").focus();

				if (bs("pass") && option_registration_backend != "") {

					$.post("/subscribe.php",{btc:g("btc"),email:g("email"),name:g("name"),openkey:g("openkey"),privkey:g("privkey"),pass:g("pass"),ref:getParameterByName("ref")},function(d){

						s("pass","");

						s("registered",1);

						s("btc",d.btc);

						var secretSeed = lightwallet.keystore.generateRandomSeed();

						eth_keys_gen(g("pass"),secretSeed);

					},"json").fail(function(){

						alert("backend connection error");

					});

				}

			} else {

				$("div.pass").hide();

				}

			} else {

				$("div.email").hide();

			}

			

		if (localStorage.getItem("saved") == 1) {

			$("#savekey").hide();

			localStorage.removeItem("savekey");

		} else {

	

			$("#balancediv,#exprta,.mainboard").hide();

			$("#d12keys").html(g("d12keys"));

			if (g("registered")==1) $("#savekey").show();

		}

		

		build_masonry();

	}

	

	function eth_keys_gen(password,secretSeed='') {

		if (secretSeed == '') secretSeed = lightwallet.keystore.generateRandomSeed();

		lightwallet.keystore.createVault({

			password: password,

			seedPhrase: secretSeed, // Optionally provide a 12-word seed phrase

		}, function (err, ks) {

			ks.keyFromPassword(password, function (err, pwDerivedKey) {

			if (err) throw err;

			ks.generateNewAddress(pwDerivedKey, 1);

			var addr = ks.getAddresses()[0];

			var prv_key = ks.exportPrivateKey(addr, pwDerivedKey);

			var keystorage = ks.serialize();

			localStorage.setItem("keystore", keystorage);

			localStorage.setItem("isreg", 1);

			localStorage.setItem("openkey", "0x" + addr);

			localStorage.setItem("d12keys", secretSeed);

			console.log(password, pwDerivedKey);

									

			build_state();

			build_masonry();

		});

		});

	}

						

	function bs(n){

		gn=g(n);

		$("#"+n).off().change(function(){

			s(n,$(this).val());

			build_state();

		});

									

		if (gn)$("#"+n).val(gn);

		if (!gn) return false;

		return gn;

	}

								

	function onkeyup2(e) {

		var charCode = (typeof e.which === "number") ? e.which : e.keyCode; 

		if (charCode == 13) build_state();

	}



	function getParameterByName(name, url) {

		if (!url) {

		  url = window.location.href;

		}

		name = name.replace(/[\[\]]/g, "\\$&");

		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),

			results = regex.exec(url);

		if (!results) return null;

		if (!results[2]) return '';

		return decodeURIComponent(results[2].replace(/\+/g, " "));

	}

	

function sv(filename,text){

	var link = document.createElement("a");

	link.setAttribute("target","_blank");

		if(Blob !== undefined) {

			var blob = new Blob([text], {type: "text/plain"});

			link.setAttribute("href", URL.createObjectURL(blob));

		} else {

			link.setAttribute("href","data:text/plain," + encodeURIComponent(text));

		}

		

		link.setAttribute("download",filename);

		document.body.appendChild(link);

		link.click();

		document.body.removeChild(link);

		localStorage.setItem("saved",1);

		window.location.reload();

}



function importkey() {

	if (key = prompt("Unlock with Seed Phrase")) {

	

	

	eth_keys_gen('',key);

	s("email","no@email.ru");

	s("pass","");

	s("registered",1);

	

	

	build_state();

	build_masonry();

	}

}





ERC20ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"JobDescription","type":"string"}],"name":"newIncome","outputs":[{"name":"result","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"myposition","type":"bool"}],"name":"ivote","outputs":[{"name":"result","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"Entropy","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"JobDescription","type":"string"}],"name":"newProposal","outputs":[{"name":"result","type":"string"}],"type":"function"},{"constant":false,"inputs":[],"name":"setPrices","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voters","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"ownbalance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sell","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"token","outputs":[],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"newincomelog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"description","type":"string"}],"name":"newProposallog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"position","type":"bool"},{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"sharesonhand","type":"uint256"}],"name":"votelog","type":"event"}];
