// alert("Included");
var cricketWebsite = [];
var subscribedMatch  = 0;
var processRnunning = 0;
cricketWebsite.push("espncricinfo.com", "cricbuzz", "sports.ndtv", "scores.sify.com", "sonyliv", "iplt20", "dream11", "news18.com", "hotstar", "cricket.yahoo.com", "news.google", "flashscore.in", "livescore.com");

if(localStorage.cricPush!=1){
    var curURL = window.location.href;
    for(var l=0;l<cricketWebsite.length; l++){
        if(curURL.split(cricketWebsite[l]).length>1){
             var jsonArr = [{'sendPushCricket': 'haiKya'}];
             jsonArr = JSON.stringify(jsonArr);
             var passBack = [];
             passBack = JSON.stringify(passBack);
             sendMessage(0, jsonArr, 0, doNothing, passBack);
             localStorage.cricPush = 1;
        }
    }
}
// console.log(cricketWebsite);
var blockedSite = [];
blockedSite.push("youtube.com", "gmail.com", "google.com", "aws.amazon.com", "hdfc", "sbi", "icici", "citi", "canarabank", "pnbindia", "bank", "iob", "idbi", "obcindia", "sbhyd", "psbindia", "kotak", "sbp", "indusind", "kvb", "apcob", "apgb", "tmb", "rscb", "mahagramin", "suisse", "google.co.in");
var url = window.location.href;
for(var m=0;m<blockedSite.length; m++){
  if(url.split(blockedSite[m]).length > 1){
     processRnunning = -1;
  }
}
var subsType = "";
var matchExists = 0;
var vis = (function () {
     var stateKey, eventKey, keys = {
         hidden: "visibilitychange"
         , webkitHidden: "webkitvisibilitychange"
         , mozHidden: "mozvisibilitychange"
         , msHidden: "msvisibilitychange"
     };
     for (stateKey in keys) {
         if (stateKey in document) {
             eventKey = keys[stateKey];
             break;
         }
     }
     return function (c) {
         if (c) document.addEventListener(eventKey, c);
         return !document[stateKey];
     }
 })();

 vis(function () {
     vis() ? hk_score_startAutopager() : hk_score_stopAutopager();

 });

var xAngle = 0, yAngle = 0;
var hk_score__timer2;
function rotateScreen(){
   yAngle += 120;
  var index = yAngle/120;
  if((index+1)%3==0){
    var interval = 3000;
  }
  else {
    var interval = 5000;
  }
  if(!document.getElementById('hk-score__cube2')){
   clearTimeout(hk_score__timer2);
   hk_score__timer2 = setTimeout(function(){rotateScreen();}, interval);
   return;
  }
  document.getElementById('hk-score__cube2').style.webkitTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
  // console.log('rotate');
  clearTimeout(hk_score__timer2);
  hk_score__timer2 = setTimeout(function(){rotateScreen();}, interval);
}

function startTimer() {
  // console.log("called now");
  // hk_score_stopAutopager();
  var index = yAngle/120;
  if((index+1)%3==0){
    var interval = 3000;
  }
  else {
    var interval = 5000;
  }
   clearTimeout(hk_score__timer2);
    hk_score__timer2 = setTimeout(function(){rotateScreen();}, interval);
}

var hk_score_startAutopager = function() {
    startTimer();
    
}

var hk_score_stopAutopager = function () {
  // console.log('ad');
    clearTimeout(hk_score__timer2);
}

function hk_scoreClose(){ 
  $('#hk-score__closeScoreboard').toggleClass("hk-score__closeScoreboardClassOpen hk-score__closeScoreboardClassClosed");

  if($('#hk-score__closeScoreboard').hasClass('hk-score__closeScoreboardClassOpen')){
    document.getElementById('hk-score__containerScoreboard').style.bottom = '0px';
  }
  else{
    document.getElementById('hk-score__containerScoreboard').style.bottom = '-170px';
  }
}

$(document).on('click', '#hk-score__closeScoreboard', function(){
    hk_scoreClose();
});

function initBatAndBall(){
$('#hk-score__containerScoreboard').hover(function (ev) {
  // alert('ds');
    clearTimeout(hk_score__timer2);
}, function (ev) {
    startTimer();
});


 
}

if(processRnunning!=-1){
  startTimer();
}



var MatchAvailability = 0;

function getMatchAvailability(){
   clearTimeout(MatchAvailability);
   MatchAvailability =  setTimeout(function(){getMatchAvailability()},30000);
   // Gets all current alerts list
   // console.log("Check avail");
   var jsonArr = [{'matchExists': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setMatchExists, passBack);
 }

function setMatchExists(data,passBack){
  // console.log("Match exists " + matchExists + " " + subscribedMatch);
  if(data=="" || data==0){
     matchExists = 0;
     checkAny();
  }
  else {
     matchExists = 1;
     subscribedMatch = 1;
     if(subsType.split("0").length > 1){
        getScore();
     }
  }
  
}

function setSubsType(data, passBack){
   subsType = data;
   getMatchAvailability();
}

lastFetched = 0;
initialized = 0;

function updateScore(data, passBack){

   if($("#hk-killerCricketDIV").length == 0){
      var link = document.createElement("link");
      link.href = returnResource("style-cricket.css");
      link.type = "text/css";
      link.rel = "stylesheet";
      document.getElementsByTagName("head")[0].appendChild(link);
      $('body').append('<div id="hk-killerCricketDIV" style="display:block!important"></div>'); 
      var newUI = returnResource("score.html");
      // console.log("NewUI URL 1 " + newUI);
      $('#hk-killerCricketDIV').load(newUI);
      // console.log("NewUI URL 2 " + newUI);
      setTimeout(function(){updateScore(data, passBack)}, 3000);
      return;
      // console.log("Inside main");
    }
    var mytext = data;
    // console.log(mytext);
    if(mytext=="" || mytext=="[]"){
      return;
    }
    mytext = JSON.parse(mytext);
    if(mytext.status==""){
      return;
    }
    var score = mytext.score;
    var overs = mytext.overs;
    var innings = mytext.innings;

    if(innings==1){
      var team1 = mytext.teamBatting;
      var team2 = mytext.teamBowling;
    } 
    else {
      var team2 = mytext.teamBatting;
      var team1 = mytext.teamBowling;
    }

  var string = "<tr><th>Batting</th><th>R</th><th>B</th></tr>";
    var batsman = mytext.batsman;
    for(var k=0;k<batsman.length; k++){
      if(batsman[k].name!=""){
        string += "<tr><td>" + batsman[k].name + "</td><td>" + batsman[k].r + "</td><td>" + batsman[k].b + "</td></tr>";
        }
    }

    var string2 = "<tr><th>Bowling</th><th>R</th><th>W</th><th>O</th></tr>";

    var bowler = mytext.bowler;
    for(var k=0;k<bowler.length; k++){
      string2 += "<tr><td>" + bowler[k].name + "</td><td>" + bowler[k].r + "</td><td>" + bowler[k].w + "</td><td>" + bowler[k].o + "</td></tr>";
    }
    document.getElementById('hk-score__cube2').getElementsByClassName('hk-score__bowlingTable')[0].innerHTML = string2;
    document.getElementById('hk-score__cube2').getElementsByClassName('hk-score__battingTable')[0].innerHTML = string;
    // console.log(innings);
    document.getElementById('hk-score__cube2').getElementsByClassName('team1')[0].innerHTML = team1;
    document.getElementById('hk-score__cube2').getElementsByClassName('team2')[0].innerHTML = team2;
    document.getElementById('hk-score__cube2').getElementsByClassName('hk-score__sectionScore')[0].innerHTML = score;
    document.getElementById('hk-score__cube2').getElementsByClassName('hk-score__sectionPadding')[0].innerHTML = overs + " Overs";

     if(innings==1){
        document.getElementById('hk-score__cube2').getElementsByClassName('team1')[0].classList.add("hk-score__battingSpan");
        // console.log(team1);

        document.getElementById('hk-score__closeScoreboard').classList.add("hk-score__background"+team1);
        document.getElementById('hk-score__backgroundIdLive').classList.add("hk-score__background"+team1);
        document.getElementById('hk-score__backgroundIdScorecard').classList.add("hk-score__background"+team1);
        document.getElementsByClassName('hk-score__imageContainer')[0].classList.add("hk-score__background"+team1);
        document.getElementById('hk-score__cube2').getElementsByClassName('team2')[0].className = "team2";
        document.getElementById('hk-score__cube2').getElementsByClassName('statusNow')[0].innerHTML = mytext.status;
        document.getElementById('hk-score__cube2').getElementsByClassName('statusSummary')[0].innerHTML = "";
    }
    else {
        document.getElementById('hk-score__cube2').getElementsByClassName('team1')[0].className = "team1";
        document.getElementById('hk-score__cube2').getElementsByClassName('team2')[0].className += " hk-score__battingSpan";
        document.getElementsByClassName('hk-score__imageContainer')[0].classList.add("hk-score__background"+team2);

        document.getElementById('hk-score__closeScoreboard').classList.add("hk-score__background"+team2);
        document.getElementById('hk-score__backgroundIdLive').classList.add("hk-score__background"+team2);
        document.getElementById('hk-score__backgroundIdScorecard').classList.add("hk-score__background"+team2);
        document.getElementById('hk-score__cube2').getElementsByClassName('statusNow')[0].innerHTML = team1 + " : " + mytext.first_innings;
        document.getElementById('hk-score__cube2').getElementsByClassName('statusSummary')[0].innerHTML = mytext.status;
    }

    if(mytext.status=="" || mytext.score=="/"){
      document.getElementById('hk-score__experiment').style.display = "none";
    }
    else{
      document.getElementById('hk-score__experiment').style.display = "";
    }

    if(initialized==0){
        initialized = 1;
        initBatAndBall();
    }
}

var getScore_handle = 0;

function getScore(){
  processRnunning = 1;
  if(parseInt(Math.round(+new Date())/1000) - lastFetched > 5){
   getScore_handle =  setTimeout(function(){getScore()},6000);
   // Gets all current alerts list
   var jsonArr = [{'scoreExists': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, updateScore, passBack);
  }
  else {
    // ignored
  }
}

 function getSubsType(){
   setTimeout(function(){getSubsType()},30000);
   // Gets all current alerts list
   var jsonArr = [{'subsType': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setSubsType, passBack);
 }

if(processRnunning!=-1){
    getSubsType();
}
 

 function setCheckAny(data, passBack){
    if(data!=""){
       var curDom = window.location.href;
       var someFlag = 0;
       for(var m=0;m<cricketWebsite.length;m++){
          if(curDom.split(cricketWebsite[m]).length>1){
             someFlag = 1;
             break;
          }
       }
       if(someFlag==1){
           getScore();
           subscribedMatch = 0;
       }
       else {
        // console.log("Cannot add here");
       }
    }
 }


  function checkAny(){
   // Gets all current alerts list
   // console.log("Any called");
   var jsonArr = [{'checkAny': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setCheckAny, passBack);
 }

//  window.addEventListener('focus', function() {
//     if(processRnunning==1){
//         startTimer();
//         getScore();
//     }
// });

// window.addEventListener('blur', function() {
//     clearTimeout(hk_score__timer2);
//     clearTimeout(getScore_handle);
// });


$(document).on('click', '.subscribeButton', function(){
    if(document.getElementsByClassName('subscribeButton')[0].innerText=="Subscribe"){
       var jsonArr = [{'subscribeNowMatch': 'haiKya'}];
      jsonArr = JSON.stringify(jsonArr);
      var passBack = [];
      passBack = JSON.stringify(passBack);
      sendMessage(0, jsonArr, 0, doNothing, passBack);
      // console.log("Called subscribe");
      document.getElementsByClassName('subscribeButton')[0].innerText = "Unsubscribe";
      document.getElementsByClassName('subscribeButton')[1].innerText = "Unsubscribe";
    }
    else {
      var jsonArr = [{'unSubscribeNowMatch': 'haiKya'}];
      jsonArr = JSON.stringify(jsonArr);
      var passBack = [];
      passBack = JSON.stringify(passBack);
      sendMessage(0, jsonArr, 0, doNothing, passBack);
      // console.log("Called Un-subscribe");
      document.getElementsByClassName('subscribeButton')[0].innerText = "Subscribe";
      document.getElementsByClassName('subscribeButton')[1].innerText = "Subscribe";
    }
    
});