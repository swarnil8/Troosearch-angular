var myDiv = "<div id='helloSaysPrashant'></div>";
var ext_id = '';
var ext_auth = '';

$(document).on('change', '.ftc-1', function(){
		changeTeams();
});

$(document).on('change', '.fttype-1', function(){
	changeSubsType();
});

function sendRegisterValues(){
	var jsonArr = [{'regisDone': 'setValue'}];
	jsonArr = JSON.stringify(jsonArr);
	var passBack = [];
	passBack = JSON.stringify(passBack);
	sendMessage(0, jsonArr, 0, doNothing, passBack);
}

if(localStorage.register==1){
	sendRegisterValues();
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=.buyhatke.com" ;
}

function setExtNameCook(){
	if(extName==''){
		setTimeout(function(){setExtNameCook();}, 1000);
	}
	else {
		setCookie("ext_name", extName, 100000);
	}
}


setExtNameCook();

function setExtID(data, passBack){
  ext_id = data; 
}

function getExtID(){
   // Gets all current alerts list
   var jsonArr = [{'extId': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setExtID, passBack);
 }

 getExtID();

function setExtIDCook(){
	if(ext_id==''){
		setTimeout(function(){setExtIDCook();}, 1000);
	}
	else {
		setCookie("ext_id", ext_id, 100000);
	}
}


setExtIDCook();


function getTeams(){
   // Gets all current alerts list
   var jsonArr = [{'getTeamsCurrent': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setTeams, passBack);
 }


function setTeams(data, passBack){
	console.log(data);
	for(var k=0;k<document.getElementsByClassName('ftc-1').length;k++){
   	  if(data.split(document.getElementsByClassName('ftc-1')[k].value).length>1){
   	  	   document.getElementsByClassName('ftc-1')[k].checked = true;
   	  }
   }
}

getTeams();

function getTypes(){
   // Gets all current alerts list
   var jsonArr = [{'getTypesCurrent': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setTypes, passBack);
 }


function setTypes(data, passBack){
	console.log(data);
	for(var k=0;k<document.getElementsByClassName('fttype-1').length;k++){
   	  if(data.split(document.getElementsByClassName('fttype-1')[k].value).length>1){
   	  	   document.getElementsByClassName('fttype-1')[k].checked = true;
   	  }
   }
}

getTypes();




function setExt_authCook(){
	if(ext_auth==''){
		setTimeout(function(){setExt_authCook();}, 1000);
	}
	else {
		setCookie("ext_auth", ext_auth, 100000);
	}
}


setExt_authCook();

$('#footer').after(myDiv);

function changeTeams(){
   var teams = ""; 
   for(var k=0;k<document.getElementsByClassName('ftc-1').length;k++){
   	  if(document.getElementsByClassName('ftc-1')[k].checked){
   	  	 if(teams==""){
   	  	 	teams = document.getElementsByClassName('ftc-1')[k].value;
   	  	 }
   	  	 else {
   	  	 	teams += "," + document.getElementsByClassName('ftc-1')[k].value;
   	  	 }
   	  }
   }
   var jsonArr = [{'setCricketTeams': teams}];
   jsonArr = JSON.stringify(jsonArr);
   sendMessage(0, jsonArr, 0, doNothing, []);
   console.log("Teams set " + teams);
}

function changeSubsType(){
   var type = ""; 
   for(var k=0;k<document.getElementsByClassName('fttype-1').length;k++){
   	  if(document.getElementsByClassName('fttype-1')[k].checked){
   	  	 if(type==""){
   	  	 	type = document.getElementsByClassName('fttype-1')[k].value;
   	  	 }
   	  	 else {
   	  	 	type += "," + document.getElementsByClassName('fttype-1')[k].value;
   	  	 }
   	  }
   }
   if(type==""){
   	type = 0;
   }
   var jsonArr = [{'setNotifType': type}];
   jsonArr = JSON.stringify(jsonArr);
   sendMessage(0, jsonArr, 0, doNothing, []);
   console.log("Subs type changed " + type);
}

