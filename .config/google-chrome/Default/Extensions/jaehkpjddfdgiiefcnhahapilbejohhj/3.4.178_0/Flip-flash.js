var imgLogo = chrome.extension.getURL("logo.png");
var variant = "";
var prodName = "";
var varCode = "";
var saleTime = "";
var eid = "";

if(getPID()!=""){
    switch(getPID()){
       case "MOBEQ98TGHHPQJGH":
         prodName = getProd();
         varCode = "f118";
         eid = "LSTMOBEQ98TGHHPQJGHYT46XM";
         break;

       case "MOBEQ98MMWX5R8RE":
         prodName = getProd();
         varCode = "f117";
         eid = "LSTMOBEQ98MMWX5R8REN82A4";
         break;

       case "MOBEQ98TQDQD298Z":
         prodName = getProd();
         varCode = "f116";
         eid = "LSTMOBEQ98TQDQD298ZNY5XHG";
         break;

       case "MOBEQ98TESD8MYUA":
         prodName = getProd();
         varCode = "f115";
         eid = "LSTMOBEQ98TESD8MYUASHFXKS";
         break;

       case "MOBEQ98TWG8X4HH3":
         prodName = getProd();
         varCode = "f114";
         eid = "LSTMOBEQ98TWG8X4HH30D3CZW";
         break;

       case "MOBEQ98MNXHY4RU9":
         prodName = getProd();
         varCode = "f113";
         eid = "LSTMOBEQ98MNXHY4RU9XEFSBA";
         break;

       case "MOBEQ98TABTWXGTD":
         prodName = getProd();
         varCode = "f112";
         eid = "LSTMOBEQ98TABTWXGTDL64TKO";
         break;

        case "MOBEQ98THNGR4FD5":
         prodName = getProd();
         varCode = "f111";
         eid = "LSTMOBEQ98THNGR4FD5TBCRKY";
         break;

       case "MOBEQ98T82CYVHGZ":
         prodName = getProd();
         varCode = "f110";
         eid = "LSTMOBEQ98T82CYVHGZJFZSK1";
         break;
    }
}

if(varCode!=""){
    getTime(varCode);
}

function getTime(varCode){
   var jsonArr = [{'sendStartTime': varCode}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack['code'] = varCode;
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, startAutoBook, passBack);
 }

var refreshedOnce = 0;

function post(path, params, method) {
    method = method || "post"; 
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

function addToCart(){
  var data = {};
  data['domain'] = "physical";
  data['eids'] = eid;
  data['otracker'] = "nmenu_sub_Appliances_0_Fully Automatic Top Load"; 
    post('/checkout/init', data, "post");
}


function startSale(){
      $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:150px!important;"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><a target="_blank" style="text-decoration:none;color:white;font-size:14px;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><p>We will add ' + prodName + ' to the cart as soon as it is available for sale. Make sure you system timing is correct. Match it with http://bit.ly/2sEtPIP <br>Time Remaining : <span id="ourTimer"></span></a></p></div></div></div>'); 
      timer = setInterval(function(){
          var timeRemaining = Math.floor(Date.now() / 1000) - saleTime;
          if(timeRemaining >= 0 && timeRemaining < 3600){
             addToCart();
             clearInterval(timer);
             if(localStorage[varCode]==undefined){
               localStorage[varCode] =1;
             }
             else {
               localStorage[varCode] = 1 + parseInt(localStorage[varCode]);
             }
          }
          else {
            timeRemaining = -1*timeRemaining;
            if(timeRemaining < 3 && refreshedOnce==0){
               
            }
            var hours = Math.floor(timeRemaining/3600);
            var remTime = timeRemaining - hours*3600;
            var minRemain = Math.floor(remTime/60);
            remTime = remTime - minRemain*60;
            if(hours < 10){
               hours = '0' + hours;
            }
            if(minRemain < 10){
               minRemain = '0' + minRemain;
            }
            if(remTime < 10){
               remTime = '0' + remTime;
            }
            document.getElementById('ourTimer').innerHTML = hours + ":" + minRemain + ":" + remTime;
          }
      },200);  
}

function startAutoBook(data, passBack){
	console.log("Data Received " + data);
	
  // data = 1499086086;
  saleTime = data - 10;
	if(data!=0){
		// passBack = JSON.parse(passBack);
		var currentTime = Math.floor(Date.now() / 1000);
		if(data - currentTime > 3600){
			  // More than 1 hr. Ask to subscribe/check already subscribed
			 // sale over - nothing to do 
			 // console.log("Case 1");
			 checkSubscription(passBack);
		}
		else if(data - currentTime > 0 || (currentTime - data > 0 && currentTime - data < 3600)){

				// console.log("Case 2");
			  //  Ask for variant. Focus on sale
        if(localStorage[varCode]==undefined || localStorage[varCode]<=5){
            startSale();
        }
		}
		else if(currentTime - data >0){
			 // sale over - nothing to do 
			 // console.log("Case 3");
			 checkSubscription(passBack);
		}
	}
}

function timeConverter(t) {     
   var a = new Date(t * 1000);
    var today = new Date();
    var yesterday = new Date(Date.now() - 86400000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    if(min<10){
    	min = '0' + min;
    }
    if(hour >=12){
    	var last = "PM";
    }
    else {
    	var last = "AM";
    }
    if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0))
        return 'today, ' + hour + ':' + min + " " + last;
    else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
        return 'yesterday, ' + hour + ':' + min + " " + last;
    else if (year == today.getFullYear())
        return date + ' ' + month + ', ' + hour + ':' + min + " " + last;
    else
        return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min + " " + last;
}

function checkSubscription(passBack){
	var passBack = JSON.parse(passBack);
	var jsonArr = [{'checkSubscription': varCode}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, showSubsMessage, passBack);
}


function showSubsMessage(data, passBack){
	if(data==1){
      // console.log("FOund subscribed");
      $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:120px!important;color:white;font-size:1em;font-family:calibri"><a target="_blank" style="text-decoration:none;color:white;font-size:1em;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><p>You are subscribed to ' + prodName + ' Flash Sale starting  ' + timeConverter(saleTime) + '.&nbsp;&nbsp;<br> We will open the page automatically at sale time and book it for you.</p></div></div></a></div>');
	}
	else {
	  // console.log("Found unsuscribed");
	  // a = "what about this";
	  $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:120px!important;color:white;font-size:1em;font-family:calibri"><a id="subscribeNow" target="_blank" style="text-decoration:none;color:white;font-size:1em;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><p>Click me to subscribe to autobook ' + prodName + ' during flash Sale starting  ' + timeConverter(saleTime) + '.&nbsp;&nbsp;<br> We will open the page automatically at sale time and book it for you.</p></div></div></a></div>');
	}
}



