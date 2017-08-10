  // Initialize Firebase
  
 function initAll(){
  var link = document.createElement("link");
  link.href = returnResource("chat/main.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
  var link = document.createElement("link");
  link.href = returnResource("chat/mat.min.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
  var link = document.createElement("link");
  link.href = returnResource("style.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
  var config = {
    apiKey: "AIzaSyB_eQkHN45jPIP7aXMa8KWtq_xjfLZBOpc",
    authDomain: "chat1-5ca26.firebaseapp.com",
    databaseURL: "https://chat1-5ca26.firebaseio.com",
    storageBucket: "chat1-5ca26.appspot.com",
    messagingSenderId: "207904366879"
  };
  firebase.initializeApp(config);

$('body').append('<div id="hk-killerChat" style="display:block!important"></div>'); 
var newUI = returnResource("chat/index.html");
$('#hk-killerChat').load(newUI);
addListenersChat();

}

function addListenersChat(){
	if(document.querySelectorAll('.hk-js-chat__close').length > 0){
		document.querySelectorAll('.hk-js-chat__close')[0].addEventListener("click", function(){
			 document.querySelectorAll('.hk-bhChat')[0].style.display = "none";
			 localStorage.open = 0;
		});
    }
    else {
    	setTimeout(function(){addListenersChat()}, 500);
    }
}

function startInit(){
	// console.log("Here " + ext_id);
	if(ext_id=="" || ext_id=="Unspecified"){
		 setTimeout(function(){startInit()}, 50);
	}
	else {
			initAll();
	}
}

// startInit();
