var selectedIndex = -1;
var dataFetched = 0;
var dataAssigned = "";
var checkedSales = "";
var flashData = ""; 
var reqKey = "";
var selectedVariant = "";
var defaultTitle = "";
var prodName = "";
prodName = $('.item.current').text().trim();
if(prodName!=""){
	prodName = prodName.split("No registration required");
	prodName = prodName[0];
	prodName = prodName.trim();
}

function tryAfterMoment(){
chrome.runtime.sendMessage({tabAssignedHash: "haiKya"}, function(response) {
  var data = response.farewell;
  // console.log(data);
  dataAssigned = JSON.parse(data);
    chrome.runtime.sendMessage({getCheckedSales: "haiKya"}, function(response) {
	  var data = response.farewell;
	  // console.log(data);
	  checkedSales = JSON.parse(data);
		  chrome.runtime.sendMessage({getFlashSalesData: "haiKya"}, function(response) {
		  var data = response.farewell;
		  // console.log(data);
		  flashData = JSON.parse(data);
		  getCurrentVariant();
		});
	});
});
}

var totalAdded = 0;

function getCurrentVariant(){
	if(tabID==0 || tabID ==""){
		setTimeout(function(){getCurrentVariant()}, 1000);
	}
	else {
		if(dataAssigned!=""){
			for (var key in dataAssigned) {
				totalAdded++;
				   defReqKey = key;
				if(dataAssigned[key] == tabID){
					reqKey = key;
					break;
				}
			}
		}
		if(reqKey=="" && totalAdded>=1){
			reqKey = defReqKey;
		}
		if(reqKey!=""){
			codes = reqKey.split("~");
			codes = codes[1];
			if(checkedSales[codes]==true){
				selectedVariant = codes;

			}
		}

		// console.log("req " + reqKey);

		if(selectedVariant!=""){
			for(var k=0; k <flashData.length;k ++){
				if(flashData[k].code==selectedVariant){
					// console.log(flashData[k]);
					defaultTitle = flashData[k].title;
					if(prodName=="" || flashData[k].title.split(prodName).length > 1){
					   document.getElementById('p-msg').innerHTML = '<p><a style="text-decoration:none;color:white" href="#">We are ready to book ' + flashData[k].title + ' for you in this tab. Please don\'t close the tab and let it be in focus. Don\'t merge windows if we have opened more than one for you.</a></p>';
				    } 
					setCookie("phone"+tabID, flashData[k].title, 2);
					setCookie("phoneImp"+tabID, flashData[k].imp, 2);
					setCookie("phone"+reqKey, flashData[k].title, 2);
					setCookie("phoneImp"+reqKey, flashData[k].imp, 2);
				}
			}
		}
	}
}

function retrieveFromCookie(){
	// console.log("tab " + tabID)
	if(tabID==0 || reqKey==""){
		setTimeout(function(){retrieveFromCookie()}, 100);
	}
	else {
		var data = getCookie("phone" + tabID);
		if(data!="" && data!= undefined ){
			defaultTitle = data;
			if(prodName=="" || defaultTitle.split(prodName).length > 1){
					   document.getElementById('p-msg').innerHTML = '<p><a style="text-decoration:none;color:white" href="#">We are ready to book ' + defaultTitle + ' for you in this tab. Please don\'t close the tab and let it be in focus. Don\'t merge windows if we have opened more than one for you.</a></p>';
				    } 
		}
		else {
			var data = getCookie("phone" + reqKey);
			if(data!="" && data!= undefined ){
				defaultTitle = data;
				if(prodName=="" || defaultTitle.split(prodName).length > 1){
					   document.getElementById('p-msg').innerHTML = '<p><a style="text-decoration:none;color:white" href="#">We are ready to book ' + defaultTitle + ' for you in this tab. Please don\'t close the tab and let it be in focus. Don\'t merge windows if we have opened more than one for you.</a></p>';
				    }
			}
		}
	}
}

retrieveFromCookie();

function getSelIndex(){
	// console.log("tab" + tabID);
	if(tabID==0 || document.querySelectorAll('.item-name').length==0 || reqKey==""){
		setTimeout(function(){getSelIndex()}, 100);
	}
	else {
		var data = getCookie("phoneImp" + tabID);
		var data2 = getCookie("phoneImp" + reqKey);
		// console.log(data);
		// console.log(data2);
		if(data!="" && data!= undefined){
			var defaultArray = data.split(",");
			var all = document.querySelectorAll('.item-name');
			for(var k=0; k<all.length; k++){
				var curText = all[k].innerHTML;
				var matFound = 0;
				for(var l=0;l<defaultArray.length;l++){
					if(curText.split(defaultArray[l]).length > 1){
						matFound++;
					}
				}
				if(matFound==defaultArray.length){
					selectedIndex = k;
					break;
				}
			}
		}
		else if(data2!="" && data2!= undefined ){
			data = data2;
			var defaultArray = data.split(",");
			var all = document.querySelectorAll('.item-name');
			for(var k=0; k<all.length; k++){
				var curText = all[k].innerHTML;
				var matFound = 0;
				for(var l=0;l<defaultArray.length;l++){
					if(curText.split(defaultArray[l]).length > 1){
						matFound++;
					}
				}
				console.log(matFound + "~" + defaultArray.length);
				if(matFound==defaultArray.length){
					selectedIndex = k;
					break;
				}
			}
		}
		else {
			selectedIndex = 0;
		}
		if(selectedIndex==-1){
			setTimeout(function(){getSelIndex()}, 100);
		}
	}
}

if(window.location.href.split("openbuy/").length > 1 || window.location.href.split("choosePro").length > 1){
	tryAfterMoment();
	// setTimeout(function(){tryAfterMoment()}, 1000);
    var clickedOnce = 0;
}



function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}










// var statusFlag = 0;
// if(window.location.href.split("choosePro").length > 1){
// 	statusFlag = 1;
// 	getSelIndex();
// }
// console.log("statusFlag " + statusFlag);

// function buyNow(){
	
// 	// console.log("selectedIndex " + selectedIndex);
// 	if(statusFlag==1 && selectedIndex!=-1 && document.getElementsByClassName('btn-buy').length>0){
// 			setTimeout(function(){buyNow();},1000);
// 			document.getElementsByClassName('btn-buy')[selectedIndex].click();
//     }
//     else {
//     	setTimeout(function(){buyNow();},10);
//     }
// }

// buyNow();

var prodName = "";
prodName = $('.item.current').text().trim();
if(prodName!=""){
	prodName = prodName.split("No registration required");
	prodName = prodName[0];
	prodName = prodName.trim();
}
var imgLogo = chrome.extension.getURL("logo.png");
if(window.location.href.split("openbuy/").length > 1 || window.location.href.split("choosePro").length > 1){
//$('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:120px!important;"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><p><a style="text-decoration:none;color:white" href="#">We are ready to book ' + prodName + ' for you.</a>&nbsp;&nbsp;<br><a target="_blank" href="https://compare.buyhatke.com/options/#mi-details"><button class="hk-c-btn hk-c-btn--white">Change Variant</button></a></p></div></div></div>');
}

var globalClicked = 0;

if(window.location.href.split("http://www.mi.com/in/hdindex/openbuy/").length > 1){
	timePID = setInterval(function(){ 
       if(document.getElementsByClassName('btn-primary').length > 0){
		document.getElementsByClassName('btn-primary')[0].click();
			if(globalClicked==0){
				globalClicked = 1;
				document.querySelectorAll('.pro-info')[0].querySelectorAll('.btn')[0].click();
			    console.log("Clicked");
			}
		    clearInterval(timePID);
		}
	},100);

	timePID2 = setInterval(function(){ 
		var classValues = " " + document.querySelectorAll('.pro-info')[0].querySelectorAll('.btn')[0].className + " ";
		if(classValues.split("btn-disabled").length == 1 && globalClicked==0){
			globalClicked = 1;
			document.querySelectorAll('.pro-info')[0].querySelectorAll('.btn')[0].click();
			console.log("Clicked");
			clearInterval(timePID2);
		}
		
	},100);
}

