var apikey = "bu862466354479549285577482220942";
function getXMLHTTPRequestF() {
  req = new XMLHttpRequest();
  return req;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(typeof(request.sendTabIDF) != "undefined"){
      sendResponse({farewell: sender.tab.id});
    }
  });

chrome.runtime.onConnect.addListener(function(port) {
  if(port.name=="flightsPayloadData" + port.sender.tab.id){
    port.onMessage.addListener(function(msg) {
      if (msg.messageData != ""){
        var comp = msg.messageData.split("~*");
        var jsonData = comp[0];
        var command = comp[1];
        command = parseInt(command);
        var jsonData = JSON.parse(jsonData);
        switch(command){
         case 26:
         var myurl="https://compare.buyhatke.com/flights/getSession.php?apikey="+apikey;
         break;
         case 27:
         var myurl="https://compare.buyhatke.com/flights/getFlightDetailsNew2.php";
         break;
       }
       var httpq4 = new getXMLHTTPRequestF();
       var ext_id, ext_auth;
       ext_id = "";
       var jsonParData = (jsonData);
       var parameters = "ext_id=" + ext_id;
       var L = jsonParData.length;
       for (var i = 0; i < L; i++) {
        var obj = jsonParData[i];
        for (var j in obj) {
          var paramKey = (j);
          var paramVal = (jsonParData[i][j]);
          parameters += "&" + paramKey + "=" + paramVal;
        }
      }

      httpq4.open("POST", myurl, true);
      httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      httpq4.onreadystatechange = function(){
        if (httpq4.readyState == 4) {
          if(httpq4.status == 200) {
           mytext = httpq4.responseText;
           port.postMessage({dataBack: mytext});
         }
         else{
           port.postMessage({dataBack: ""});
         }
       }
     }
     httpq4.send(parameters);
   }     
 });
  }
});

