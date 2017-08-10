var imgLogo = chrome.extension.getURL("logo.png");
var variant = "";
var prodName = "";
var varCode = "";
var saleTime = "";
var someClick = "";
var clickID = 0;
flagClick = 0;

function checkAdded(){
  setTimeout(function(){checkAdded()},1000);
  if(document.querySelectorAll('.a-alert-content').length>0){

    if(document.querySelectorAll('.a-alert-content')[0].innerText.split("in your Cart").length > 0){
       localStorage.saleTried = 2;
    }
  }
}

function addToCart(){
  var count = 0;
  someClick = setInterval(function(){
  if(document.querySelectorAll('.dealTile').length > clickID){
   if(document.querySelectorAll('.dealTile')[clickID].querySelectorAll('button').length > 0){
      document.querySelectorAll('.dealTile')[clickID].querySelectorAll('button')[0].click();
      clearInterval(someClick);
      checkAdded();
   }
  }
  count++;
  if(count%100==0){
    console.log("Tried " + count + " times " + clickID);
  }
  }, 200);
}

messageShown = 0;

function startSale(){
  if(messageShown==0){
    messageShown = 1;
    showMessage();
  }
  
   if($('.dealTile #dealImage').length>0 && tabID!=0){
     if(clickID==0){
        if(getCookie('amaz-' + tabID)!=""){
           clickID = parseInt(getCookie('amaz-' + tabID));
           if(isNaN(clickID)){
             clickID = 0;
           }
        }
     }
     for(var k=0; k<$('.dealTile #dealImage').length; k++){
        if($('.dealTile:eq(' + k + ')').find('.hk-c-check').length==0){
           $('.dealTile #dealImage:eq(' + k + ')').after('<div class="hk-c-check"><input type="checkbox" name="" value="selectVariant" id="variant' + k + '" class="hk-c-check__input--check"><label for="variant' + k + '" class="hk-c-check__label"><span id="text' + k + '" class="hk-c-check__labelText">Select variant</span></label></div>');
           if(k==clickID){
               $('#variant' + k)[0].checked = true;
               $('#text' + k).html("Selected");
           }
           
           $('#variant' + k).click(function(){
               // console.log($(this).checked);
               if(!$(this)[0].checked){
                  $(this).parent().find('.hk-c-check__labelText')[0].innerHTML = "Select variant";
                  return; 
               }
               $(this).parent().find('.hk-c-check__labelText')[0].innerHTML = "Selected";
               var currectIndex = ($(this).attr('id'));
               currectIndex = currectIndex.split("variant");
               if(currectIndex.length > 1){
                 currectIndex = parseInt(currectIndex[1]);
               }
               for(var m=0; m<$('.dealTile .hk-c-check__labelText').length; m++){
                   if(currectIndex!=m){
                       $('.dealTile .hk-c-check__labelText')[m].innerHTML = "Select variant";
                       // console.log(m);
                       if($('#variant' + m)[0]){
                           $('#variant' + m)[0].checked = false;
                       }
                   } 
               }
               clickID = currectIndex;
               // console.log("TabID - " + tabID + " , Index " + currectIndex);
               setCookie('amaz-'+tabID, currectIndex, 10);      
           });
        }
     }
     setTimeout(function(){startSale()},500);
   }
   else {
     setTimeout(function(){startSale()},500);
   }
}




if(window.location.href.split("redmi-4A").length > 1 || window.location.href.split("node=12177423031").length>1){
variant = "redmi4A";
prodName = "Redmi 4A";
varCode = "f120";
}
else if(window.location.href.split("redmi-4").length > 1 || window.location.href.split("node=13713623031").length>1){
variant = "redmi4";
prodName = "Redmi 4";
varCode = "f121";
}

if(variant!=""){
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

function startAutoBook(data, passBack){
	console.log("Data Received " + data);
	saleTime = data;
	if(data!=0){
		// passBack = JSON.parse(passBack);
		var currentTime = Math.floor(Date.now() / 1000);
		if(data - currentTime > 3600){
			  // More than 1 hr. Ask to subscribe/check already subscribed
			 // sale over - nothing to do 
			 // console.log("Case 1");
			 checkSubscription(passBack);
		}
		else if(data - currentTime > 0 || (currentTime - data > 0 && currentTime - data < 900)){
				// console.log("Case 2");
			  //  Ask for variant. Focus on sale
        startSale();
        addToCart();
		}
		else if(currentTime - data >0){
			 // sale over - nothing to do 
			 // console.log("Case 3");
			 // checkSubscription(passBack);
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


function showMessage(){
  $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:120px!important;"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><a target="_blank" style="text-decoration:none;color:white;font-size:16px;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><p>We are ready to book ' + prodName + ' for you. Please select the variant you wish to purchase. We will book it for you as soon as the sale starts.</a></p></div></div></div>');
  localStorage.saleTried = 1;
}

function showSubsMessage(data, passBack){
	if(data==1){
      // console.log("FOund subscribed");
      $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:200px!important;"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><a target="_blank" style="text-decoration:none;color:white;font-size:16px;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><p>You are subscribed to ' + prodName + ' Flash Sale starting  ' + timeConverter(saleTime) + '.&nbsp;&nbsp;<br> We will give variant selection option on the day of sale on this page. Click me to change subscription settings.</a></p><a href="http://bit.ly/2sjz41k" style="text-decoration:none;color:white;font-size:16px;font-family:calibri" target="_blank"><div>Now that I have got your attention, why not let us know how we can improve your shopping experience. Tap here to rate us.  </div></a></div></div></div>');
	}
	else {
	  // console.log("Found unsuscribed");
	  // a = "what about this";
	  $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:200px!important;"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><a id="subscribeNow" target="_blank" style="text-decoration:none;color:white;font-size:16px;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><p>Click me to subscribe to autobook ' + prodName + ' during flash Sale starting  ' + timeConverter(saleTime) + '.&nbsp;&nbsp;<br> We will give variant selection option on the day of sale on this page.</a></p><a href="http://bit.ly/2sjz41k" style="text-decoration:none;color:white;font-size:16px;font-family:calibri" target="_blank"><div>Now that I have got your attention, why not let us know how we can improve your shopping experience. Tap here to rate us.  </div></a></div></div></div>');
	}
}


function checkCartProd(){
  if(window.location.href.split("/gp/buy/spc/handlers/display.html").length > 1){
    var pidS = document.querySelectorAll('#spc-orders .a-box-inner');
    if(pidS.length==0){
      setTimeout(function(){checkCartProd()}, 1000);
      return;
    }
    for(var m=0;m<pidS.length; m++){
       var temp = pidS[m].querySelectorAll('.shipment')[0];
       var temp2 = $(a).find("input[name='dupOrderCheckArgs']");
       if(temp2){
          var valueList = $(temp2).attr("value");
          if(valueList.split("B01NAKU5HE").length > 1 || valueList.split("B01FM7K078").length > 1){
             if(localStorage.saleTried==1){
                 localStorage.saleTried = 2;
                 notify();
             }
             break;
          }
       }
    }
  }
}

checkCartProd();

function notify(){
if(window.location.href.split("gp/buy/thankyou/handlers/display.html").length > 1 && localStorage.saleTried==2){
    localStorage.saleTried = 0;
    var jsonArr = [{'sendNewPush': 1}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack['code'] = varCode;
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, doNothing, passBack);
}
}

notify();

