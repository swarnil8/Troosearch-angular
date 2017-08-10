resultsShown = 0;
settingsSelectors = ["#hk-killerDIV", ".main-hk-ext-div"];
watchListArray = [];
dataPop = [];
tabID = 0;
flagAvail = 0;
chart2Handle = false;
chart1Handle = false;
userSetting = "notYet";
check_hover_graph = 0;
check_hover_yellow = 0;
check_hover_pred = 0;
check_click_yellow = 0;
check_click_coupon = 0;
check_hover_deals = 0;
check_click_yellow = 0;
ext_blockList = "";
// var lastClicked = "";
var email = "";
var extName = "";
var ext_id = "";
var ext_auth = "";
prodNameUni = "";
siteNameUni = "";
dataStringUni = "";
var features_json = "";
var hkFdbkWrapper = "";
globalGraphData = "";
graphDataFetched = 0;
getRecommCalled = 0;
globalSearchFlag = 0;
if(!localStorage.showGraph){
  localStorage.showGraph = 1;
}

function pickAppliedCpn(checkPick, selector, attr, webID, homeLink){
  // console.log("pickAppliedCpn was called with "+selector);
  if($(checkPick).length > 0){
    var coupon = "";
    if(attr.trim() == ""){
      coupon = $(selector).text().trim();
      if(coupon == ""){
        coupon = $(selector).val().trim();
      }
    }
    else{
      coupon = $(selector).attr(attr).trim();
    }

    var someDate = new Date();
    var numberOfDaysToAdd = 5;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    if(mm < 10){
      mm = "0"+mm;
    }
    if(dd < 10){
      dd = "0"+dd;
    }
    var expTime = y + '-'+ mm + '-'+ dd + " 23:59:59";
    if(coupon.split("(").length > 1){
      coupon = coupon.split("(");
      coupon = coupon[1];
      coupon = coupon.split(")");
      coupon = coupon[0].trim();
    }
    if(coupon != "" && coupon == coupon.toUpperCase()){
      var jsonArr = [{'coupon': encodeURIComponent(coupon.trim()), 'url': homeLink, 'expTime': expTime, 'webID': webID}];
      jsonArr = JSON.stringify(jsonArr);
      // console.log("sending with ",jsonArr);
      sendMessage(1, jsonArr, 38, doNothing, []);
    }
  }
  else{
    setTimeout(function(){
      pickAppliedCpn(checkPick, selector, attr, webID, homeLink);
    }, 3000);
  }
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var months_int = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var month_ind = months.indexOf(month);
  var month_val = months_int[month_ind];
  if(date < 10){
    date = "0"+date;
  }
  if(year > 2018){
    year = 2018;
  }
  var time = year + '-' + month_val + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function convertISBN(isbn){
  var x = "978"+ isbn;
  var x_1 = parseInt(x.substr(0, 1));
  var x_2 = parseInt(x.substr(1, 1));
  var x_3 = parseInt(x.substr(2, 1));
  var x_4 = parseInt(x.substr(3, 1));
  var x_5 = parseInt(x.substr(4, 1));
  var x_6 = parseInt(x.substr(5, 1));
  var x_7 = parseInt(x.substr(6, 1));
  var x_8 = parseInt(x.substr(7, 1));
  var x_9 = parseInt(x.substr(8, 1));
  var x_10 = parseInt(x.substr(9, 1));
  var x_11 = parseInt(x.substr(10, 1));
  var x_12 = parseInt(x.substr(11, 1));
  var checkdigit = (10 - (x_1 + 3*x_2 + x_3 + 3*x_4 + x_5 + 3*x_6 + x_7 + 3*x_8 + x_9 + 3*x_10 + x_11 + 3*x_12) % 10 ) % 10;
  var isbn = x.substr(0,12) + checkdigit.toString();
  if(isbn.length == 13){
    return isbn;
  }
  else{
    return "";
  }
}

function submitUserCpnResp(data, passBack){
  passGlobal = passBack;
  if(data.trim() == "1" || data.trim() == 1){
    hkDummyModal.fill({
      header: `Something Went Wrong`,
      main: ` Thanks for Trying!
      <br>Please try after sometime.`,
      footer: `<div class="hk-u-flexChild--right">
      <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close hk-js-focusOnOpen">Okay</button>
      </div>`
    });
    hkOpenModal('hk-modal__dummy');
  }
  else if(data.split("Thank").length > 1){
    hkSubmitCoup.submitSuccess();
  }
  else if(data.split("Sorry").length > 1){
    hkDummyModal.fill({
      header: `Thanks for Trying`,
      main: data.trim(),
      footer: `<div class="hk-u-flexChild--right">
      <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close hk-js-focusOnOpen">Okay</button>
      </div>`
    });
    hkOpenModal('hk-modal__dummy');
  }
}

/************************* submit coupons **************/
class hkSubmitCouponsClass {
  constructor() {
    $('.hk-js-modal__coupSubmit--reset').click(() => {this.reset()});

    $('.hk-js-coupSubmit--submit').click(() => {
      this.submit();
    });
  }
  openModal(){
    this.reset();
    hkOpenModal('hk-submitCoupons');

  }
  reset() {
    $('input, textarea', '.hk-js-modalCoupSubmit__wrapper').map((i, el) => {
      el.value = "";
    })
  }
  submitCheck() {
    let hkSubmitCheckFlag = true;
    $('input[required], textarea[required]', '.hk-js-modalCoupSubmit__wrapper').each((i, el) => {
      if ($(el).val() === "") {
        hkSubmitCheckFlag = false;
      }
    });
    return hkSubmitCheckFlag;
  }
  submitSuccess() {
    hkDummyModal.fill({
      header: `Coupon Submitted Successfully`,
      main: ` Thanks a Ton!
      <br>Your coupon would be added in our coupons list after successful verification.`,
      footer: `<div class="hk-u-flexChild--right">
      <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close hk-js-focusOnOpen">Okay</button>
      </div>`
    });
    hkOpenModal('hk-modal__dummy');
    hkCloseModal($('.hk-js-modalCoupSubmit__wrapper'));

    setTimeout(this.reset, 1000);
  }
  submit() {
    if (this.submitCheck()) {
            //do something here
            //after successSubmit
            var submitCPUsers = $(".hk-js-modalCoupSubmit__wrapper");
            var cpnCode = submitCPUsers.find(".hk-submitCoupon__code:eq(0)").val().trim();
            var cpnSite = getCurrentPosition(window.location.href);
            var cpnTitle = submitCPUsers.find(".hk-submitCoupon__title:eq(0)").val().trim();
            var cpnURL = submitCPUsers.find(".hk-submitCoupon__url:eq(0)").val().trim();
            var cpnExp = submitCPUsers.find(".hk-submitCoupon__validDate:eq(0)").val().trim()+" 23:59:59";
            var cpnCat = submitCPUsers.find(".hk-submitCoupon__validCat:eq(0)").val().trim();
            var cpnDesc = submitCPUsers.find(".hk-submitCoupon__description:eq(0)").val().trim();
            var isBank = 0;
            var isMobile = 0;
            var email_id = email;

            var jsonArr = [{"cpnCode" : encodeURIComponent(cpnCode), "cpnSite" : encodeURIComponent(cpnSite), "cpnTitle" : encodeURIComponent(cpnTitle), "cpnURL" : encodeURIComponent(cpnURL), "cpnExp" : encodeURIComponent(cpnExp), "cpnCat" : encodeURIComponent(cpnCat), "cpnDesc" : encodeURIComponent(cpnDesc), "isBank" : isBank, "isMobile" : isMobile, "email_id" : encodeURIComponent(email_id)}];
            jsonArr = JSON.stringify(jsonArr);
            var passBack = [{"selector": $(this)}]
            passBack = JSON.stringify(passBack);
            sendMessage(1, jsonArr, 39, submitUserCpnResp, passBack);

          } else {
            hkDummyModal.fill({
              header: `Form Incomplete`,
              main: `You need to at least fill in all the fields that are starred`,
              footer: `<div class="hk-u-flexChild--right">
              <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close hk-js-focusOnOpen">Okay</button>
              </div>`
            });
            hkOpenModal('hk-modal__dummy');
          }
        }
      }
      let hkSubmitCoup;

      /* --------------------------- dummy modals . ----------- */
      const hkDummyModalReset = {
       header: `Heading`,
       main: `Text`,
       footer: `<div class="hk-u-flexChild--right">
       <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close hk-js-focusOnOpen">Close</button>
       </div>`
     }

     class hkDummyModalClass {
       constructor() {
        this.hdr = document.querySelector('.hk-js-dummyModal__headerContent');
        this.main = document.querySelector('.hk-js-dummyModal__mainContent');
        this.ftr = document.querySelector('.hk-js-dummyModal__footerContent');
      }
      reset() {
        this.fill(hkDummyModalReset);
      }
      fill(modalContents) {
        this.hdr.innerHTML = modalContents.header;
        this.main.innerHTML = modalContents.main;
        this.ftr.innerHTML = modalContents.footer;

        if(!!modalContents.clicks){
         modalContents.clicks.map( (el) => {
           $(`${el.item}`).click(function(){
            eval(el.fn);
          })
         });
       }

       $('.hk-js-modal__close', '.hk-js-dummyModals').click(hkCloseModalBinder);

     }
   }
   let hkDummyModal;

   /***************** autocoupons ** */
   class hkAutoCouponsClass{
     constructor(){
       this.hdr = document.querySelector('.hk-js-aCoup__headerContent');
       this.main = document.querySelector('.hk-js-aCoup__contentWrap');
       this.ftr = document.querySelector('.hk-js-aCoup__footerContent');
       this.state = 'play';

       $('.hk-js-autoCoupon__bank').click(function() {
        hkDummyModal.fill({
          header: `	Remember this preference?`,
          main: ` Do you want to apply <b class="hk-js-aCoup__bankName">ICICI Bank</b> coupons over others for future orders?`,
          footer: `<div class="hk-u-flexChild--right">
          <button class="hk-c-btn hk-c-btn--orange hk-js-autoCoupon__bank--savePref hk-js-modal__close hk-js-focusOnOpen">Yes</button>
          <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close">No Thanks</button>
          </div>`,
          clicks: [{
           item: `.hk-js-autoCoupon__bank--savePref`,
           fn: 'hkAutoCoup.saveBankPref()'
         }]
       });
        hkOpenModal('hk-modal__dummy');

      });
     }
     loadContent(msgType) {
      this.hdr.innerHTML = hkAutoCoupMsgs[msgType].headerText;
      this.main.innerHTML = hkAutoCoupMsgs[msgType].wrapContent;
      this.ftr.innerHTML = hkAutoCoupMsgs[msgType].footerContent;

      if(!!hkAutoCoupMsgs[msgType].clicks){

       hkAutoCoupMsgs[msgType].clicks.map( (el) => {
         $(`${el.item}`).click(function(){
          eval(el.fn);
        })
       });
     }
   }
   openAutoCoup(){
    this.loadContent('inProgress');
    if(localStorage.doneACTill != undefined && parseInt(localStorage.doneACTill) > 0){
      // alert("entered here");
      var dt1 = parseInt(localStorage.doneACTill);
      var lenArray = localStorage.getCoupons;
      lenArray = lenArray.split("~");
      lenArray = lenArray.length-1;
      var perDone = (dt1+1)/lenArray;
      perDone = perDone*100;
      perDone = parseInt(perDone);
      $(".hk-aCoup__coupsTried").text(dt1+1);
      $(".hk-aCoup__coupsTot").text("/"+lenArray);
      $('.hk-c-progress__inner').css("width", perDone + "%");
      $('.hk-c-progress__inner').attr("data-progress", perDone);

      if(localStorage.bestSaving && localStorage.bestSaving != 0){
        var bestSavingDisplay = localStorage.bestSaving;
        if(localStorage.bestCoupon && localStorage.bestCoupon != ""){
          var bestCouponDisplay = localStorage.bestCoupon;
          $(".hk-aCoup__netSavings b:eq(0)").text(bestSavingDisplay);
          $(".hk-js-autoCoup__bestCouponTill:eq(0)").text(bestCouponDisplay);
        }
      }

    }
    // else if(typeof(bestCoupon) != "undefined" && bestCoupon.trim() != ""){
    //   $(".hk-aCoup__netSavings b:eq(0)").text(bestSaving);
    //   $(".hk-js-autoCoup__bestCouponTill:eq(0)").text(bestCoupon);
    // }
    // alert("bestCoupon: "+bestCoupon+" saving: "+bestSavingDisplay)
    hkOpenModal('hk-autoCoupon');
  }
  playPause(){
    this.playPauseBtn = document.querySelector('.hk-js-aCoup__playPause');

    if(this.state == 'paused'){
      this.state = 'play';
      this.playPauseBtn.innerHTML = `<svg viewBox="0 0 24 24" class="hk-ext__icons--small hk-u-va--bottom hk-js-aCoupPause">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__pause" >
      </use>
      </svg>Pause Auto Apply`;
    } else if(this.state == 'play'){
      this.state = 'paused';
      this.playPauseBtn.innerHTML = `<svg viewBox="0 0 24 24" class="hk-ext__icons--small hk-u-va--bottom hk-js-aCoupPause">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__play" >
      </use>
      </svg>Continue Auto Apply`;
    }
  }
  saveBankPref() {

				//save preference


				//and show success
				hkDummyModal.fill({
          header: `Success`,
          main: `Bank preference saved!`,
          footer: `<div class="hk-u-flexChild--right">
          <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close hk-js-focusOnOpen">Close</button>
          </div>`
        });
				hkOpenModal('hk-modal__dummy');
      }
    }
    let hkAutoCoup;
    var isValidISBN = function(str) {
      var sum,
      weight,
      digit,
      check,
      i;

      str = str.replace(/[^0-9X]/gi, '');

      if (str.length != 10 && str.length != 13) {
        return false;
      }

      if (str.length == 13) {
        sum = 0;
        for (i = 0; i < 12; i++) {
          digit = parseInt(str[i]);
          if (i % 2 == 1) {
            sum += 3*digit;
          } else {
            sum += digit;
          }
        }
        check = (10 - (sum % 10)) % 10;
        return (check == str[str.length-1]);
      }

      if (str.length == 10) {
        var chars = str.split('');
        if(chars[9].toUpperCase() == 'X'){
          chars[9] = 10;
        }
        sum = 0;
        for (var i = 0; i < chars.length; i++) {
          sum += ((10-i) * parseInt(chars[i]));
        };
        return ((sum % 11) == 0);
      }
    }

    function populateList(ext_data){
      if(document.querySelectorAll('.hk-blockedURLList').length > 0){
       var cloneSample = document.querySelectorAll('.hk-blockedURLList')[0].querySelector('li');
       if(ext_data.trim()!="[]" && ext_data.trim()!=""){
        ext_data = JSON.parse(ext_data);
        document.querySelector('.hk-blockedURLList').innerHTML = ("");
        for(var k=0; k<ext_data.length; k++){
          var cloneCurrent = cloneSample.cloneNode("true");
          cloneCurrent.querySelector('.hk-blockedURLList__item').innerHTML = ext_data[k];
          cloneCurrent.querySelector('.hk-js-blockedList__remove').setAttribute('data-id', k);
          document.querySelector('.hk-blockedURLList').append(cloneCurrent);
        }
      }
      else {
        document.querySelector('.hk-js-modalBlockedList__wrapper').innerHTML = ("<div style='text-align:center;padding-top:30px'>You do not have any blocked URLs</div>");
      }
      $('.hk-js-blockedList__remove').click(function(event){
        var urlToRemove = $(this).parent().parent().find('.hk-blockedURLList__item').text();
        removeExtBlockList(urlToRemove);
        $(this).parent().parent().parent().remove();

        if (!document.querySelectorAll('.hk-blockedURLList__item').length) {
          document.querySelector('.hk-js-modalBlockedList__wrapper').innerHTML = ("<div style='text-align:center;padding-top:30px'>You do not have any blocked URLs</div>");
        }
      });
    }
    else {
      setTimeout(function(){populateList(ext_data)}, 1000);
    }
  }

  function setExtBlockList(data, passBack){
    flagAvail = 0;
    ext_blockList = data;
    if(ext_blockList.trim()!="[]" && ext_blockList.trim()!=""){
      ext_blockList = JSON.parse(ext_blockList);
      var currentFil = window.location.href;
      currentFil = currentFil.split("&")[0];
  // console.log("Checking for " + currentFil);
  for(var i=0; i<ext_blockList.length; i++){
   if(currentFil == ext_blockList[i]){
    flagAvail = -1;
  }
}
if(flagAvail==0){
  flagAvail = 1;
}
if(flagAvail!=-1 && document.getElementsByClassName('hk-sideBar').length > 0){
  document.getElementsByClassName('hk-sideBar')[0].style.display = "";
}
else if(document.getElementsByClassName('hk-sideBar').length > 0){
  document.getElementsByClassName('hk-sideBar')[0].style.display = "none";
}
populateList(JSON.stringify(ext_blockList));
}
else {
  flagAvail = 1;
  populateList(data);
}
  // console.log("Value here " + ext_blockList);
}

function getExtBlockList(){
 var jsonArr = [{'getBlockList': 'haiKya'}];
 jsonArr = JSON.stringify(jsonArr);
 var passBack = [];
 passBack = JSON.stringify(passBack);
 sendMessage(0, jsonArr, 0, setExtBlockList, passBack);
}

getExtBlockList();

function removeExtBlockList(url){
 var jsonArr = [{'removeFromBlockList': url}];
 jsonArr = JSON.stringify(jsonArr);
 var passBack = [];
 passBack = JSON.stringify(passBack);
 sendMessage(0, jsonArr, 0, doNothing, passBack);
}

function setExtAuth(data, passBack){
  ext_auth = data;
}

function getExtAuth(){
   // Gets all current alerts list
   var jsonArr = [{'ext_auth': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setExtAuth, passBack);
 }

 getExtAuth();



 function isFlightSite(){
  var flagFlight = false;
  var cur_url1 = window.location.href;
  if(cur_url1.split("booking.airasia.com/Flight/Select").length > 1){
    flagFlight = true;
  }
  else if(cur_url1.split("book.airindia.in/itd/itd/lang/en/prg").length > 1){
   flagFlight = true;
 }
 else if(cur_url1.split("akbartravels.com/Flight/Search").length > 1){
   flagFlight = true;
 }
 else if(cur_url1.split("//www.cleartrip.com/flights/results").length > 1 || cur_url1.split("//www.cleartrip.com/flights/international/results").length > 1){
   flagFlight = true;
 }
 else if(cur_url1.split("//www.easemytrip.in/EaseAir/searchmidscreen").length > 1 || cur_url1.split("//www.easemytrip.in/EaseAir/FlightListingRoundTrip").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("expedia.co.in/flights/results").length > 1 || cur_url1.split("expedia.com/Flights-Search").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("goair.in/flight/search").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("goibibo.com").length > 1 && cur_url1.split("#flight-searchresult").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("book.goindigo.in").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("offers.smartbuy.hdfcbank.com/search_flight").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("secure.jetairways.com").length > 1 && cur_url1.split("Booking/Select").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("kayak.co.in/flights").length > 1 || cur_url1.split("kayak.com/flights").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("//flights.makemytrip.com/makemytrip/search").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("https://cheapfaresindia.makemytrip.com/international/raw/").length > 1 || cur_url1.split("https://www.makemytrip.com/air/search").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("paytm.com/flights/flightSearch/").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("priceline.com/m/fly/search").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("book.spicejet.com/Select.aspx").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("tripadvisor.in/CheapFlightsSearchResults").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("in.via.com/flight/search").length > 1){
  flagFlight = true;
}
else if(cur_url1.split("flight.yatra.com/air-search-ui/dom2").length > 1 || cur_url1.split("flight.yatra.com/air-search-ui/int2").length > 1){
  flagFlight = true;
}
return flagFlight;
}

function getProperCat(cat_init){
  var cat_so_far = "";
  if(cat_init.split("&").length==1 && cat_init.toUpperCase().split("AND").length==1 && cat_init.toUpperCase().split(",").length==1){
    return cat_init;
  }
  else {
    cat_init = cat_init.split("&").join(" ");
    cat_init = cat_init.split(",").join(" ");
    cat_split = cat_init.split(" ");
    var cur_prod = getProd();
    for(var k=0; k<cat_split.length; k++){
      if(cat_split[k].trim()!=""){
        var sing = convertSing(cat_split[k]);
        sing = sing.split("~");
        if(cur_prod.split(cat_split[k]).length > 1){
              // console.log("Trying " + cat_split[k]);
              if(cat_so_far.toLocaleLowerCase().split(cat_split[k].toLocaleLowerCase()).length ==1){
                cat_so_far += cat_split[k] + " ";
              }
              // return cat_split[k];
            }
            for(var l=0; l<sing.length; l++){
             if(cur_prod.toUpperCase().split(sing[l].toUpperCase()).length > 1){
              // console.log("Trying " + sing[l]);
              if(cat_so_far.toLocaleLowerCase().split(sing[l].toLocaleLowerCase()).length ==1){

                cat_so_far += sing[l] + " ";
              }
            }
          }
        }
      }
    }
    if(cat_so_far.trim()!=""){
     return cat_so_far.trim();
   }
   else {
    return cat_init;
  }
  return cat_init;
}

var counter = 5;
function brahmastra(){
  counter--;
  for(var m=0;m<settingsSelectors.length;m++){
    if(document.querySelectorAll(settingsSelectors[m]).length > 0 && document.querySelectorAll(settingsSelectors[m])[0].style.display=="none"){
     document.querySelectorAll(settingsSelectors[m])[0].style.display = "block";
   }
 }
 if(counter >= 0){
   setTimeout(function(){brahmastra()},2000);
 }
 else {

 }
}

brahmastra();

function addEmailToBase(){
  $ = jQuery.noConflict();
  if(email.trim() != "" && email.split("@").length == 2 && email.split(".").length > 1){
    $(".hk-pw__emailSyncEmail").text(email);
    $(".hk-pw__emailSyncCurrent").css("display", "block");
  }
  else{
    $(".hk-pw__emailSyncCurrent").css("display", "none");
    $('.hk-pw__emailSyncAdd').css("display", "block");
  }
}

function likeDislikeCoupons(cID, webID, lflag, exflag){
  var jsonArr = [{'cID': cID, 'webID': webID, 'lflag': lflag, 'exflag': exflag}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 35, likeDislikeCouponsResp, jsonArr);
}

function likeDislikeCouponsResp(response, passBack){
 passB1 = JSON.parse(passBack);
 var lflag = passB1[0].lflag;
 id_coup = passB1[0].cID;
 this_ele = $("#"+id_coup);
 if(typeof(response) == 'undefined'){
   pop('Connection Issues. Please try again.',0);
 }else{
   response = jQuery.parseJSON(response);
   var uc, dc;
   if(response.status){
    if(response.isNew){
     if(lflag){

      uc = this_ele.find('.hk-up-votes').text();
      uc = parseInt(uc) + 1;
      this_ele.find('.hk-up-votes').text(uc);
    }else{

      dc = this_ele.find('.hk-down-votes').text();
      dc = parseInt(dc) + 1;

      this_ele.find('.hk-down-votes').text(dc);
    }
  }else if(response.changed){
   if(lflag){

    uc = this_ele.find('.hk-up-votes').text();
    dc = this_ele.find('.hk-down-votes').text();
    uc = parseInt(uc) + 1;
    dc = dc - 1;

    this_ele.find('.hk-up-votes').text(uc);
    this_ele.find('.hk-down-votes').text(dc);
  }else{

    dc = this_ele.find('.hk-down-votes').text();
    uc = this_ele.find('.hk-up-votes').text();
    dc = parseInt(dc) + 1;
    uc = uc - 1;

    this_ele.find('.hk-down-votes').text(dc);
    this_ele.find('.hk-up-votes').text(uc);
  }
}
}else{
  pop(response.msg, response.status);
}
}
}


function setNewEmail(email_new){
  var jsonArr = [{'email': email_new}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 100, showChangedEmail, jsonArr);
}

function showChangedEmail(data, passBack){
  var email_new = JSON.parse(passBack);
  email_new = email_new[0].email;
  alert("An email has been sent to "+email_new+". Please verify your mail to ! Do check your SPAM folder");
  $(".hk-pw__emailSyncCurrent").css("display", "block");
  $(".hk-pw__emailSyncEmail").text(email_new);
  $(".hk-sTab__PWEmailInput").val("");
  return;
}

function hkClearRatings(el) {
	el.find('.hk-sTab__coupRevEachWrap--selected').removeClass('hk-sTab__coupRevEachWrap--selected');

	//something to reset the vote counter
}

function checkAlertStatusNew(){
  // console.log("Eneterd checkAlertStatusNew");
  flagToDisp = 0;
  strToDisp = "";
  clsToUse = "";
  var diff = 0;
  addedToDOM2 = 0;
  if(userSetting != "notYet"){
    // console.log("Eneterd user case");
    arrayRes = watchListArray;
    var currentURL = window.location.href;
    var filterURL = currentURL.split("&")[0];
    filterURL = filterURL.split("affid")[0];
    myPrice = getPrice();

    if(parseInt(alertPosition) == 99){
     currentURL = getInfiURL();
   }

   // console.log("watchListArray length "+watchListArray.length);

   for(i=0;i<watchListArray.length;i++){
    var currentURL2 = watchListArray[i].link;


    if(watchListArray[i].link!="" && addedToDOM2==0 && returnPID(currentURL2) != 0 && (returnPID(currentURL)) == (returnPID(watchListArray[i].link))){

      addedToDOM2 = 1;
      $(".hk-main-watch").removeClass("hk-sTab__pw--on");
      $(".hk-main-watch").addClass("hk-sTab__pw--on");
      $('.hk-js-pw__add').addClass('hk-u-vanish');
      //hide 'Add to price watch' buttons
      $('.hk-js-pw__remove').removeClass('hk-u-vanish');
      //show 'Remove from price watch' buttons
      if(myPrice!=0){
        watchListArray[i].cur_price = myPrice;
      }
      if(watchListArray[i].price_added >= watchListArray[i].cur_price){
       clsToUse = "dec-hatke";
       diff = watchListArray[i].price_added - watchListArray[i].cur_price;
       $(".hk-triangle--left").removeClass("hk-u-text--red hk-tri--up");
       $(".hk-triangle--left").addClass("hk-u-text--green hk-tri--down");
     }
     else {
       clsToUse = "inc-hatke";
       diff = watchListArray[i].cur_price - watchListArray[i].price_added;
       $(".hk-triangle--left").removeClass("hk-u-text--green hk-tri--down");
       $(".hk-triangle--left").addClass("hk-u-text--red hk-tri--up");
     }

     $(".hk-pw__setPrice").text(watchListArray[i].price_added);
     $(".hk-pw__currPrice").text(watchListArray[i].cur_price);
     $(".hk-pw__diffPrice").text(diff);

     flagToDisp = 1;
     addedToDOM = 0;

   }
 }
 if(flagToDisp==0){
  addedToDOM = 0;
  // console.log("Entered condition2 ");
  $(".hk-main-watch").removeClass("hk-sTab__pw--on");
  $('.hk-js-pw__add').removeClass('hk-u-vanish'); //show 'Add to price watch' buttons
  $('.hk-js-pw__remove').addClass('hk-u-vanish'); //hide 'Remove from price watch' buttons
  $(".hk-pw__setPrice").text(getPrice());
  $(".hk-pw__currPrice").text(getPrice());
  $(".hk-pw__diffPrice").text("0");
  $(".hk-triangle--left").removeClass("hk-u-text--green hk-tri--down");
  $(".hk-triangle--left").addClass("hk-u-text--green hk-tri--down");
  $(".hk-triangle--left").removeClass("hk-u-text--red hk-tri--up");
}
}
else{
  // console.log("Entered here2");
  setTimeout(checkAlertStatusNew, 500);
}
}

function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
  }
}
return true;
}

function getRecomm(){
  if(getRecommCalled == 0){
    if(typeof(getCurrentPosition) == "function"){
     var jsonArr = [{'pos': getCurrentPosition(window.location.href), 'cl': getCookie('bhInfV_cl_id')}];
     jsonArr = JSON.stringify(jsonArr);
     sendMessage(1, jsonArr, 33, showRecomm, []);
   }
   else{
    setTimeout(getRecomm, 500);
  }
}
}

function showRecomm(data, passBack){
  if(data.length > 5){
    data = JSON.parse(data);
    $(".hk-recom-main-div").css("display", "block");
    var cloneRec = $(".hk-recoBox__items:eq(0) li:eq(0)").clone();
    $(".hk-recoBox__items li").remove();
    if(data.length > 0){
      for(var r=0;r<data.length;r++){
        var cloneAppend2 = cloneRec.clone();
        $(".hk-recoBox__items").append(cloneAppend2);
        var select1 = $(".hk-recoBox__items li:eq("+r+")");
        var prod_rec = data[r].prod;
        var price_rec = data[r].price;
        var image_rec = data[r].image;
        if(getCurrentPosition(window.location.href) == 129){
          if(image_rec.split("http://").length > 1){
            image_rec = image_rec.split("http://");
            image_rec = "https://"+image_rec[1];
          }
        }
        var link_rec = data[r].link;
       // console.log("eneterd prod_rec: "+prod_rec);
       // console.log("eneterd price_rec: "+price_rec);
       // console.log("eneterd image_rec: "+image_rec);
       // console.log("eneterd link_rec: "+link_rec);
       $("a:eq(0)", select1).attr("href", link_rec);
       $(".hk-c-gridItem__img:eq(0)", select1).attr("src", image_rec);
       $(".hk-c-gridItem__img:eq(0)", select1).attr("alt", prod_rec);
       $(".hk-c-gridItem__2lineText:eq(0)", select1).text(prod_rec);
       $(".hk-recomm-price:eq(0)", select1).text(price_rec);
     }
     if (!!$('.hk-c-carousel__innerWrap')[0]) {
      $('.hk-c-carousel__innerWrap').lightSlider({
        item: 3,
        slideMargin: 10,
        slideMove: 3,
        pager: false,
      });
    }
    $('.hk-recoBox').mouseover(function() { // to bring back the opacity on mouseover
      this.style.opacity = "1";
    });
  }
}
return;
}

positionSpecsHK = [];

function showResultsNew(results, indexSelected, posSpecs, posResults, url){
  // console.log(results);
  resultsShow = results;
  if(resultsShow.length > 0){
    positionSpecsHK = JSON.parse(posSpecs);
    selectors = JSON.parse(posResults);

    $(".hk-yellow-bar-main-div").css("display","block");
    $(".hk-yellow-bar-comp-link").attr("href", url);
    var title = getProd();
    title = title.split("(")[0];
    var titleS = title.split(" ");
    if(titleS.length<5){
      title = titleS.join("-");
    }
    else {
      title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
    }
    if($(".hk-cBBuy-toolTip__container").length > 0){
      var price_min = resultsShow[indexSelected].price;
      var link_min = resultsShow[indexSelected].link;
      var image_min = resultsShow[indexSelected].image;
      var pos_min = resultsShow[indexSelected].position;
      if(getCurrentPosition(window.location.href) == 129 && resultsShow[indexSelected].position == 129){
        if(image_min.split("http://").length > 1){
          image_min = image_min.split("http://");
          image_min = "https://"+image_min[1];
        }
      }
      var prod_min = resultsShow[indexSelected].prod;
      var site_img_min = resultsShow[indexSelected].site_image;
      if(site_img_min && site_img_min.trim() != "" && site_img_min.split("/images/").length > 1){
        var site_img_min1 = site_img_min.split("/images/")[0];
        var site_img_min2 = site_img_min.split("/images/")[1];
        site_img_min = site_img_min1+"/images/site_icons_m/"+site_img_min2;
        if(site_img_min.split("http://").length > 1){
          site_img_min = site_img_min.split("http://").join("https://");
        }
      }
      var site_name_min = resultsShow[indexSelected].site_name;
      if(getPrice()-parseFloat(price_min) > 0){
        $(".hk-cmp-price-diff").text(price_min);
        $(".hk-cmp-site-diff").text(site_name_min);
      }
      else if(getPrice()-parseInt(price_min) == 0){
        $(".hk-cB__txt").html("This is the lowest price across all sites");
      }
      else{
        $(".hk-cB__txt").html("Check out prices for similar products at other sites");
      }
      $(".hk-cBBuy-toolTip__container").find(".hk-lowest-cmp-price:eq(0)").text(price_min);
      $(".hk-cBBuy-toolTip__container").attr("data-position", pos_min);
      $(".hk-cBBuy-toolTip__container").find("a").attr("href", link_min);
      var hkcBBuyTTlistImg = $(".hk-cBBuy-toolTip__container").find(".hk-cBBuy-tT__imgWrap:eq(0) .hk-c-list__img:eq(0)");
      hkcBBuyTTlistImg.attr("src", image_min);
      hkcBBuyTTlistImg.attr("title", prod_min);
      hkcBBuyTTlistImg.attr("alt", prod_min);

      $(".hk-cBBuy-toolTip__container").find(".hk-prod-min-price:eq(0)").text(prod_min);
      $(".hk-cBBuy-toolTip__container").find(".hk-l-flexCol__col:eq(0) .hk-u-fSize--big:eq(0) .hk-price-prod:eq(0)").text(price_min);

      var hkcBBuyTTlistStoreImg = $(".hk-cBBuy-toolTip__container").find(".hk-cBBuy-tT__storeIcoImg:eq(0)");
      hkcBBuyTTlistStoreImg.attr("src", site_img_min);
      hkcBBuyTTlistStoreImg.attr("alt", site_name_min);
      hkcBBuyTTlistStoreImg.attr("title", site_name_min);

      $("#oldSearch .hk-tot-cmp-no").text(resultsShow.length);
      $(".hk-prod-cmp").text(getProd());
      var cloneCmpLi = $("#oldSearch .hk-cBMore__results li:eq(0)").clone();
      $("#oldSearch .hk-cBMore__results li").remove();
      for(var l=0;l<resultsShow.length;l++){
        var cloneAppend3 = cloneCmpLi.clone();
        $("#oldSearch .hk-cBMore__results").append(cloneAppend3);
        var price_each = resultsShow[l].price;
        var link_each = resultsShow[l].link;
        var image_each = resultsShow[l].image;
        var pos_each = resultsShow[l].position;
        if(getCurrentPosition(window.location.href) == 129 && resultsShow[l].position == 129){
          if(image_each.split("http://").length > 1){
            image_each = image_each.split("http://");
            image_each = "https://"+image_each[1];
          }
        }
        var prod_each = resultsShow[l].prod;
        var site_img_each = resultsShow[l].site_image;
        if(site_img_each && site_img_each.trim() != "" && site_img_each.split("/images/").length > 1){
          var site_img_each1 = site_img_each.split("/images/")[0];
          var site_img_each2 = site_img_each.split("/images/")[1];
          site_img_each = site_img_each1+"/images/site_icons_m/"+site_img_each2;
          if(site_img_each.split("http://").length > 1){
            site_img_each = site_img_each.split("http://").join("https://");
          }
        }

        // console.log("SiteImage " + site_img_each);
        var site_name_min = resultsShow[indexSelected].site_name;
        var site_name_each = resultsShow[l].site_name;
        var $hkcBMoreResultItem = $("#oldSearch .hk-cBMore__results:eq(0) li:eq("+l+")");
        $hkcBMoreResultItem.attr("data-position", pos_each);

        $hkcBMoreResultItem.find("a").attr("href", link_each);

        var $hkcBMoreResultItemImg = $hkcBMoreResultItem.find(".hk-c-list__img:eq(0)");

        $hkcBMoreResultItemImg.attr("src", image_each);
        $hkcBMoreResultItemImg.attr("title", prod_each);
        $hkcBMoreResultItemImg.attr("alt", prod_each);

        $hkcBMoreResultItem.find(".hk-cBLi__name:eq(0)").text(prod_each);

        $hkcBMoreResultItem.find(".hk-cmp-each-price:eq(0)").text(price_each);

        var $hkcBMoreResultItemStoreImg = $hkcBMoreResultItem.find(".hk-cBLi__storeIco:eq(0)");

        $hkcBMoreResultItemStoreImg.attr("src", site_img_each);
        $hkcBMoreResultItemStoreImg.attr("alt", site_name_each);
        $hkcBMoreResultItemStoreImg.attr("title", site_name_each);
      }
    }
    bringBackCmp();
    // console.log("Done with results");
    hkShowBar();

    $(".indvResults").click(function(event){
      // console.log("indvResults was clicked");
      sendClickData();
      if(check_click_yellow == 0){
       var jsonArr = [{'dp': "Yellow Compare Click ~*" + window.location.hostname}];
       jsonArr = JSON.stringify(jsonArr);
       sendMessage(0, jsonArr, 0, doNothing, []);
       check_click_yellow = 1;
     }
     else {
       var jsonArr = [{'dp': "Yellow Compare Multi Click ~*" + window.location.hostname}];
       jsonArr = JSON.stringify(jsonArr);
       sendMessage(0, jsonArr, 0, doNothing, []);
     }
   });

    $('.hk-cBMore__results').parent().animate({scrollTop: 0}, 'fast');

  }
  return;
}

function bringBackCmp(){
  if($(".hk-compBar.hk-ext-animated").length > 0 ){
    for(var l=0;l<positionSpecsHK.length;l++){
     $(positionSpecsHK[l].selector).css(positionSpecsHK[l].cssAttr, positionSpecsHK[l].preVal);
     resultsShown = 1;
   }
 }
 else{
  setTimeout(bringBackCmp, 500);
}
return;
}

function removeBackCmp(){
  // console.log("bring back is called with "+positionSpecsHK.length);
  for(var l=0;l<positionSpecsHK.length;l++){
   $(positionSpecsHK[l].selector).css(positionSpecsHK[l].cssAttr, positionSpecsHK[l].postVal);
   resultsShown = 0;
 }
 return;
}
// function showDeals(pos){
//   var PID = getPID();
//   var dealArr = [];
//   if(PID != ""){
//     dealArr.push([PID, pos]);
//     dealArr = JSON.stringify(dealArr);
//     var jsonArr = [{'dealData': dealArr}];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(1, jsonArr, 18, hotDeals, []);
//   }
// }

// function hotDeals(resp){
//   resp = JSON.parse(resp);
//   if(resp[0] != "Hottest Deals"){
//     var deal_text = "Checkout our Hand-picked deals in " + resp[0] + " category!";
//   }
//   else{
//     var deal_text = "Checkout our Hand-picked Hottest Deals!";
//   }
//   // console.log("deal_text: "+resp[0]);
//   // console.log("deal_text: "+resp[1]);
//   $(".hk-c-links.hk-c-links--iconTri.hk-tri--right.hk-u-text--white.hk-u-fSize--small").text(deal_text);
//   $(".hk-c-links.hk-c-links--iconTri.hk-tri--right.hk-u-text--white.hk-u-fSize--small").attr("href", resp[1]);
//   // $(".hk-dpop-details--text").text(deal_text);
//   // $(".hk-dpop-wrap").attr("href", resp[1]);

// }

var couponsFetched = 0;
var couponsFound = "";
// $(document).on("click", ".hk-main-coupons", function(){
//   getCouponsDetails();
// });
function getCouponsDetails(){
  // console.log("getCouponsDetails was called");
  document.querySelector('.hk-sTab__coupLi').style.display = "none";
  hkSwitchSTab(10);
  if(couponsFetched == 0){
    var jsonArr = [{'webID': getCurrentPosition(window.location.href)}];
    jsonArr = JSON.stringify(jsonArr);
    tracer(1,3);
    setTimeout(function(){if(JSON.parse(features_json)[3]==0){ft(3);}},100);
    sendMessage(1, jsonArr, 32, showCoupons, []);
  }
  else if(couponsFetched==1){
    var sel = document.querySelectorAll('.hk-sTab__coupLi');
    for(var m=0; m<sel.length; m++){
      sel[m].style.display = "block";
    }
    hkSwitchSTab(10);
    // showCoupons(couponsFound);
  }
}

function showCoupons(data){
  // console.log("getCouponsDetails was called");
  couponsFound = data;
  data = JSON.parse(data);
  data = data.codes;

  var back_img = returnResource("/img/hk-list-empty.png");
  $(".hk-sTab__coupList").css("background", "url("+back_img+") no-repeat");

  if(data && data.length > 0){
    couponsFetched = 1;
    var coupClone = $(".hk-sTab__coupList li:eq(0)").clone();
    $(".hk-sTab__coupList li").remove();

    for(var c=0;c<data.length;c++){
      var coupClone2 = coupClone.clone();
      $(".hk-sTab__coupList").append(coupClone2);
      var codeDesc = data[c].desc;
      var codeExp = data[c].valid_till;
      var codeCat = data[c].category;
      var codeUp = data[c].upvotes;
      var codeDown = data[c].downvotes;
      var codeLink = data[c].link;
      var codeNet = data[c].netvotes;
      var code = data[c].code;
      var codeId = data[c].codeId;
      var codeExFlag = data[c].exflag;
      var $currentCoupListLi = $(".hk-sTab__coupList li:eq("+c+")");
      if(codeExFlag == "0"){
        $(".hk-sTab__coupSpl--excl:eq(0)", $currentCoupListLi).css("display","none");
      }
      else{
        $(".hk-sTab__coupSpl--excl:eq(0)", $currentCoupListLi).css("display","block");
      }
      if(code.trim().toUpperCase() == "NO CODE REQUIRED"){
        var textBuy = "Grab Offer";
        $(".hk-sTab__coupBtn--hasCode", $currentCoupListLi).css("display","none");
        $(".hk-sTab__coupBtn--hasOffer:eq(0)", $currentCoupListLi).css("display", "block").text(textBuy);
        $currentCoupListLi.attr("data-hktabtype", "offers");
      }
      else{
        var textBuy = code.trim();
        $(".hk-sTab__coupBtn--hasCode:eq(0)", $currentCoupListLi).css("display", "block");
        $(".hk-sTab__coupBtn--hasOffer:eq(0)", $currentCoupListLi).css("display", "none");
        $(".hk-sTab__coupBtnCode:eq(0)", $currentCoupListLi).text(textBuy);
        $currentCoupListLi.attr("data-hktabtype", "coupons");
      }

      $currentCoupListLi.attr("id", codeId);
      // $(".hk-sTab__coupList li:eq("+c+") .hk-sTab__coupRevInput:eq(0)").attr("id", "hk-sTabCoupRev--2working--"+c);
      // $(".hk-sTab__coupList li:eq("+c+") .hk-sTab__coupRevInput:eq(1)").attr("id", "hk-sTabCoupRev--2notWorking--"+c);
      // $(".hk-sTab__coupList li:eq("+c+") .hk-sTab__coupRevInput:eq(2)").attr("id", "hk-sTabCoupRev--2dead--"+c);

      // $(".hk-sTab__coupList li:eq("+c+") .hk-sTab__coupRevLabel:eq(0)").attr("for", "hk-sTabCoupRev--2working--"+c);
      // $(".hk-sTab__coupList li:eq("+c+") .hk-sTab__coupRevLabel:eq(1)").attr("for", "hk-sTabCoupRev--2notWorking--"+c);
      // $(".hk-sTab__coupList li:eq("+c+") .hk-sTab__coupRevLabel:eq(2)").attr("for", "hk-sTabCoupRev--2dead--"+c);

      $("a:eq(0)", $currentCoupListLi).attr("href", codeLink);
      $(".hk-sTab__coupTitle:eq(0)",$currentCoupListLi).text(codeDesc);
      $(".hk-coup-category:eq(0)",$currentCoupListLi).text(codeCat);
      $(".hk-coup-valid-till:eq(0)",$currentCoupListLi).text(codeExp);
      $(".hk-up-votes:eq(0)",$currentCoupListLi).text(codeUp);
      $(".hk-down-votes:eq(0)",$currentCoupListLi).text(codeDown);
      $(".hk-net-votes:eq(0)",$currentCoupListLi).text(codeNet);
    }
    hkSwitchSTab(10);
  }
  else{
    $(".hk-sTab__coupList li").remove();
    $(".hk-sTab__coupList").html("<div style='text-align: center;padding: 50px;'>No offers or coupons currently</div>").css('background', '');
  }

  $('.hk-js-copyThis').click(function(e) {
   e.preventDefault();
  //this is a quasi-generic function :P. It copies the contents of the element and then shows a Copied! animation to the user
  var $this = $(this);
  hkCopyThis($this.find('.hk-js-copyThis__text').text());
  $this.addClass('hk-js-copyThis--copied');
  setTimeout(function() {
    $this.removeClass('hk-js-copyThis--copied');
  }, 600);
});

  $(".hk-sTab__coupRatingIcon--thumbsUp").click(function(e){
   e.preventDefault();
   var $this = $(this),
   $nearestWrap = $this.closest('.hk-sTab__coupRevEachWrap');

   hkClearRatings($nearestWrap.parent());
   $nearestWrap.addClass('hk-sTab__coupRevEachWrap--selected');

   var cID = $(this).parent().parent().parent().parent().parent().parent().parent().attr("id");
   var webID = getCurrentPosition(window.location.href);
   var lflag = 1;
   var exflag = 0;
  // console.log("cID: "+cID);
  // console.log("webID: "+webID);
  // console.log("lflag: "+lflag);
  // console.log("exflag: "+exflag);
  likeDislikeCoupons(cID, webID, lflag, exflag);
});

  $(".hk-sTab__coupRatingIcon--thumbsDown").click(function(e){
   e.preventDefault();
   var $this = $(this),
   $nearestWrap = $this.closest('.hk-sTab__coupRevEachWrap');

   hkClearRatings($nearestWrap.parent());
   $nearestWrap.addClass('hk-sTab__coupRevEachWrap--selected');

   var cID = $(this).parent().parent().parent().parent().parent().parent().parent().attr("id");
   var webID = getCurrentPosition(window.location.href);
   var lflag = 0;
   var exflag = 0;
  // console.log("cID down: "+cID);
  // console.log("webID down: "+webID);
  // console.log("lflag down: "+lflag);
  // console.log("exflag down: "+exflag);
  hkFdbkWrapper = document.querySelector('.hk-js-modalFeedback__wrapper');

  likeDislikeCoupons(cID, webID, lflag, exflag);

  hkFdbkWrapper.innerHTML = hkFdBkTypes['sideCoupon'];
  hkOpenModal('hk-feedback');
});

  var sel = document.querySelectorAll('.hk-sTab__coupLi');
  for(var m=0; m<sel.length; m++){
    sel[m].style.display = "block";
  }

  return;
}

function displayEachCoup(data){

  return;
}


function alertInit(){
  // console.log("called alertInit");
  if(typeof(getPrice) == "function" && !isNaN(getPrice()) && getPrice() != 0 && typeof(getProd) == "function" && getProd() != "" && $(".hk-main-watch").length > 0){

    // console.log("Entered here watch");
    $(".hk-main-watch").css("display", "block");

    checkAlertStatusNew();
    setSuggestions();
    // $(".hk-graph-wp").css("display", "block");
  }
  else {
    setTimeout(function(){alertInit()}, 500);
  }
}

function plotAllData(){
  // console.log("called plotAllData with "+alertPosition);
  // add Graph
  $(".main-hk-ext-div").attr( "style","display:block!important");
  if(alertPosition && alertPosition > 0){
    if(getCurrentPosition(window.location.href) != 1){
      // addGraphBase();
      var addedToDOM = 0;
      var imgSet = returnResource("settings.png");
      // var stringToAdd = '<div id="containerBHMain" class="yeHaiUnique"><div id="container2" class="contBHMain"></div></div>';
      var bug_icon = returnResource("bug-icon.png");
      var bulb_icon = returnResource("bulb-icon.png");
      var settings_icon = returnResource("settings.png");
      var star_icon = returnResource("star-icon.png");
      var embed_icon = returnResource("embedGraph.png");
      // console.log("length of bug "+$(".hk-bug-img").length);
      $(".hk-bug-img").attr("src", bug_icon);
      $(".hk-bulb-img").attr("src", bulb_icon);
      $(".hk-set-img").attr("src", settings_icon);
      $(".hk-star-img").attr("src", star_icon);
      $(".hk-embed-img").attr("src", embed_icon);

      var passBack1 = [{title: getProd(), siteName: cur_site, price: getPrice()}];
      passBack1 = JSON.stringify(passBack1);
      // console.log("calling prepareGraph from here");
      prepareGraph(getPID(), passBack1);
    }
  //add Graph ends

  // watch price starts

  alertInit();


  // watch price ends

  // recommendation starts

  getRecomm();

  // recommendation ends
}
return;
}

function hkCloseModalBinder() { //close modals
  if(typeof(initializeLocaStorage) == "function" && localStorage.acReApply != 1){
    localStorage.savings = "";
    localStorage.acReApply = 0;
    savings = [];
    queueHash = [];
    initializeLocaStorage();
  }
  var $this = $(this);
  hkCloseModal($this);
		if (!!$this.closest('.hk-ext-slideInDown--center')) { //if it had slidedown(center) animation then close the modal with slide up animation and restore the slidein down class to prepare for its next show
			hkSlideInUp($this);
			setTimeout(function() {
				hkSlideInDown($this);
			}, 600)
		}
  }

  var addItOnce = 0;

  function addDrag(){
  // console.log("Drag called");
  if(!!document.querySelector('.hk-bringBackSideBar') && !!document.querySelector('.hk-viewPort') && jQuery.isFunction("draggabilly")){
    var $draggable = $('.hk-bringBackSideBar').draggabilly({
      axis: 'y',
      containment: '.hk-viewPort'
    });
    addItOnce = 1;
    $('.hk-bringBackSideBar:not(.is-dragging)').click(function() {
      $('.hk-sTabSwitch__wrap--hidden').removeClass('hk-sTabSwitch__wrap--hidden');
      $('.hk-bringBackSideBar--show').removeClass('hk-bringBackSideBar--show');
    })

    $( '.hk-js-sB__minimize').click( function() {
      $('.hk-sTabSwitch__wrap').addClass('hk-sTabSwitch__wrap--hidden');
      $('.hk-bringBackSideBar').addClass('hk-bringBackSideBar--show');
    })
  }
  else if(addItOnce==0 && !!document.querySelector('.hk-bringBackSideBar')){
    addItOnce = 1;
    $('.hk-bringBackSideBar:not(.is-dragging)').click(function() {
      $('.hk-sTabSwitch__wrap--hidden').removeClass('hk-sTabSwitch__wrap--hidden');
      $('.hk-bringBackSideBar--show').removeClass('hk-bringBackSideBar--show');
    });
    $( '.hk-js-sB__minimize').click( function() {
      $('.hk-sTabSwitch__wrap').addClass('hk-sTabSwitch__wrap--hidden');
      $('.hk-bringBackSideBar').addClass('hk-bringBackSideBar--show');
    })
    setTimeout(function(){addDrag();}, 1000);
  }
  else {
    setTimeout(function(){addDrag();}, 1000);
  }
}

function blockPermanent(url){
  if (confirm("Do you really want to remove sidebar permanently from this page?") == true){
   var jsonArr = [{'addToBlockList': url}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, doNothing, passBack);
   document.getElementsByClassName('hk-sideBar')[0].style.display = "none";
 } else {

 }
}



function addClickEvents(){
  // console.log("entered addClickEvents "+$('.hk-js-sB__tabSwitcher').length);
  if($('.hk-js-sB__tabSwitcher').length > 0){
   if(document.getElementsByClassName("hk-embed-graph").length > 0){
    document.getElementsByClassName("hk-embed-graph")[0].addEventListener("click", function(){
      localStorage.showGraph = 1;
      // document.getElementsByClassName("hk-embed-graph")[0].style.display = "none";
      document.getElementsByClassName("hk-embed-text")[0].innerText = "Embedded";
    });
  }


  if(document.getElementsByClassName("hk-js-disableSBar--domain").length > 0){
    document.getElementsByClassName("hk-js-disableSBar--domain")[0].addEventListener("click", function(){
      var currentURL = window.location.href;
      currentURL = currentURL.split("&")[0];
      blockPermanent(currentURL);
      // alert("DOmain button");
    });
  }

  if(document.getElementsByClassName("hk-js-disableSBar--hibernate").length > 0){
    document.getElementsByClassName("hk-js-disableSBar--hibernate")[0].addEventListener("click", function(){
      hkOpenModal('hk-blockedList');
      document.querySelector('#hk-blockedList').style.display = "";
    });
  }


  addDrag();

  if(document.getElementsByClassName("hk-js-disableSBar--hibernate").length > 0){
    document.getElementsByClassName("hk-js-disableSBar--hibernate")[0].addEventListener("click", function(){
      // blockNow(window.location.href);
      populateList(JSON.stringify(ext_blockList));
      // alert("Hibernate button");
    });
  }

    $('.hk-cB__close').click(function() { // prepares the compare bar to close on clicking on the close button on the compare bar
      var $hkHdrPop = $('.hk-compBar'),
    $hkHdrPopHeight = $hkHdrPop.outerHeight(), // calculate the height of the compare bar which would be used to move the entire body of the document
    $hkGlobWrapper = $('body'),
    $hkHdrPopClose = $('.hk-cB__close'),
    $hkHdrPopLogoImg = $('.hk-cB__logoImg'),
    $hkBringBackCompBar = $('.hk-bringBackCompBar');
    $hkHdrPop.removeClass('hk-ext-slideInDown').addClass('hk-ext-slideInUp') // adds slide up animation aftre removing the slide down animation
    setTimeout(function() {
      $hkHdrPop.removeClass('hk-ext-animated'); //remove the animation so that it animate later on when called back
    }, 100);
    $hkHdrPopLogoImg.removeClass('hk-ext-animated'); // removes logo animation to be added later
    // $hkGlobWrapper.css('top', 0); // brings the body back to the top position (note this is not the original position of the body)
    $hkBringBackCompBar.addClass('hk-bringBackCompBar--show'); // shows the bringback comparebar waala button
    removeBackCmp();

  });

    $('.hk-c-tabLayout').each(function() {
      var tabWidth = $(this).find('.hk-c-tab:eq(2)').width();
      $(this).find('.hk-c-tabLine').css({ transform: "scaleX(" + (tabWidth / 100) + ")" });

    // $(this).on('click', '.hk-c-tab', function() {
    //   hkTabSwitcher($(this));
    // });
  });

    $('.hk-sTab__coupTab').click(function() { // this for tab switching..
        // console.log("Clicked wa-1tch-1");
        // hkTabSwitcher($('.hk-sTab__coupTab.hk-c-tab:eq(0)'))

        hkTabSwitcher($(this));
      });


      $('.hk-main-watch').click(function() { // this for tab switching..
        // console.log("Clicked watch");
        hkAddToPriceWatch();
      });

      $(".hk-cB__more:eq(0) .hk-c-toolTip__wrap:eq(0)").hover(function(){
        if(check_hover_yellow == 0){
         var jsonArr = [{'dp': 'Yellow Hover ~*' + window.location.hostname}];
         jsonArr = JSON.stringify(jsonArr);
         sendMessage(0, jsonArr, 0, doNothing, []);
         check_hover_yellow = 1;
         //tracer
         tracer(0,2);
         setTimeout(function(){if(JSON.parse(features_json)[0]==0){ft(0);}},100);

       }
     });

      $('.hk-js-sB__tabSwitcher').click(function() { // this for tab switching..
        // console.log("was clicked");
        var hkSideBar = document.querySelector('.hk-sideBar');
        var tabSideId = $(this).attr("data-hk-stab");
        if(tabSideId==1 && alertPosition!=1331){
          rePlot();
        }
        if($(this).hasClass('hk-sB__tabSwitcher--selected')){
         hkSTabClose();
         if(tabSideId==3){
          var jsonArr = [{'dp': "Coupon Sidebar Closed ~*" + window.location.hostname}];
          jsonArr = JSON.stringify(jsonArr);
          sendMessage(0, jsonArr, 0, doNothing, []);
        }
        return;
      }
      hkClickAnywhereToClose(hkSideBar, '.hk-sideBar', hkSTabClose);
        hkSwitchSTab($(this).data('hk-stab')); //note that it takes the tab's index as argument for opening that specific tab which is handled by css . the details are in hkSwitchTab
        if($(this).hasClass("hk-main-coupons")){
          // console.log("coupons was clicked and entered");
          hkTabSwitcher($('.hk-sTab__coupTab.hk-c-tab:eq(0)'))
          var jsonArr = [{'dp': "Coupon Sidebar Opened ~*" + window.location.hostname}];
          jsonArr = JSON.stringify(jsonArr);
          sendMessage(0, jsonArr, 0, doNothing, []);
          getCouponsDetails();
        }
      });

$('.hk-js-bringBackCompBar').click(function() { //this is for bringing the compare bar back on the screen
  hkShowBar();
});

$('.hk-js-pw__add').click(function() { // starts watching price...or.. add to price alerts
  hkAddToPriceWatch();
});

$('.hk-js-pw__remove').click(function() { // remove from price watch
  hkRemoveFromPriceWatch();
});


$('.hk-js-cBMFilter__close').click(function() { // close the filter in the compare bar list
  hkCloseFilter()
});


$('.hk-js-cBMFilter__open').click(function() { // open the filter in the compare bar
  hkOpenFilter()
});

$('.hk-sTab__setPriceDrop .hk-c-toolTip__col').click(function() { //this is inside the sidebar which is found inside the tooltip after setting the price alerts.
  //Its for that minimum price drop value setting thingy on the sidebar. clicking on that tooltip column would append to the input next to the tooltip
  var $this = $(this),
  $hkDropInput = $('.hk-sTabDropInput__text', '.hk-sTab__setPriceDrop');
  $hkDropInput.val($this.data('ttval'));

});

$('.hk-js-sTabDropInput__check').click(function() {
  //check if the price drop value setting is on and then toggle the tooltip and the input box
  var $this = $(this),
  $check = $this.parent().find('.hk-sTabDropInput__text'),
  $checkContainer = $this.parent().find('.hk-c-toolTips__container--clickFocus')[0];

  if ($this.prop('checked')) {
    $check.prop('disabled', false);
    hkTTAdd($checkContainer);
  } else {
    $check.prop('disabled', true);
    hkTTRemove($checkContainer);
  }
});

$('.hk-js-sTab__close').click(function(){
  hkSTabClose();
//   lastClicked = "";
}); // close the sidebar tab

$('.hk-js-check__sTabSizeChange').click(function() {
  var hkSTab = document.querySelector('.hk-sB__tabs'),
  hkSTabWrap = document.querySelector('.hk-sB-tabs__wrap'),
  hkPWTab = document.querySelector('.hk-sTab__pw'),
  hkSTabSwitcher = document.querySelector('.hk-sTabSwitch__wrap'),
  hkSideBar = document.querySelector('.hk-sideBar');
  //toggle the size of the sidebar and its icons
  var $this = $(this);
  if ($this.prop('checked')) {
    $(hkSideBar).addClass('hk-sideBar--small');
    hkCookACookie('hkSmallSidebar', 1, '9999');
  } else {
    $(hkSideBar).removeClass('hk-sideBar--small');
    hkCookACookie('hkSmallSidebar', 0, '9999');
  }

});


$(".hk-sTab__SPDSubmit").click(function(){

  var set_price_new = $(".hk-sTabDropInput__text").val().trim();
  // console.log("set_price_new: "+set_price_new);

  if(set_price_new.trim() == "" || isNaN(parseFloat(set_price_new)) || set_price_new <= 0){
   hkDummyModal.fill({
     header: `Invalid Input`,
     main: `Please set a valid minimum expected Price!`,
     footer: `<div class="hk-u-flexChild--right">
     <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close hk-js-focusOnOpen">Close</button>
     </div>`
   });
   hkOpenModal('hk-modal__dummy');
 }
 else{
  hkDummyModal.fill({
    header: `Done!`,
    main: `You will be alerted when the price drops below
    <b><span class="hk-u-super">&#8377;</span>${set_price_new}</b>`,
    footer: `<div class="hk-u-flexChild--right">
    <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close hk-js-focusOnOpen">Close</button>
    </div>`
  });
  hkOpenModal('hk-modal__dummy');
  setPriceMinimum(set_price_new);
}
});

$(".hk-sTab__PWEmailSubmit").click(function(){
  var email_new = $(".hk-sTab__PWEmailInput").val().trim();
  if(email_new != "" && email_new.split("@").length == 2 && email_new.split(".").length > 1){
    setNewEmail(email_new);
    hkDummyModal.fill({
     header: `Almost done... Just one more step!`,
     main: `Please check your email <b>Inbox</b> (even spam folder) and confirm your email id to successfully sync your price drop alerts!`,
     footer: `<div class="hk-u-flexChild--right">
     <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close hk-js-focusOnOpen">Okay</button>
     </div>`
   });
    hkOpenModal('hk-modal__dummy');
  }
  else{
    hkDummyModal.fill({
     header: `Invalid Email!`,
     main: `Please provide a valid email id!`,
     footer: `<div class="hk-u-flexChild--right">
     <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close hk-js-focusOnOpen">Close</button>
     </div>`
   });
    hkOpenModal('hk-modal__dummy');
  }
});

$('.hk-c-toolTips__container--clickFocus').click(function() {

  // quasi generic ponchoon .. this is for initializing those tooltips that are open on click and closes (those with the classname: hk-c-toolTips__container--clickFocus)

  if (!$(this).find('.hk-sTabDropInput__text').prop('disabled')) {
    hkTTAdd(this); // open the tooltip
  }
  //clicking anywhere would close the hk-c-toolTips__container--clickFocus waala tooltup
});

$('.hk-js-modal__close').click(function() { //close modals
  if(typeof(initializeLocaStorage) == "function"){
    localStorage.savings = "";
    savings = [];
    queueHash = [];
    initializeLocaStorage();
  }
  var $this = $(this);
  hkCloseModal($this);
  if (!!$this.closest('.hk-ext-slideInDown--center')) { //if it had slidedown(center) animation then close the modal with slide up animation and restore the slidein down class to prepare for its next show
    hkSlideInUp($this);
    setTimeout(function() {
      hkSlideInDown($this);
    }, 600)
  }
})

$('.hk-js-modal__open').click(function() { //open gangnam style the modal
  var $this = $(this);
  if ($this.hasClass('hk-js-fdbkModal')) {
    hkFdbkWrapper = document.querySelector('.hk-js-modalFeedback__wrapper');
    hkFdbkWrapper.innerHTML = hkFdBkTypes[$this.data('hkfeedback')];

  }
  $('.hk-js-modalFeedback__wrapper').attr("data-source", $this.data('hkfeedback'));
  hkOpenModal($this.data('hkmodal')); // !!IMPORTANT!!. here the element's data tag bears the ID of the modal to be invoked.
});

function sendFeedbacks(hkModFdbkWrapper){
  var thisFB = hkModFdbkWrapper;
  var indexOptions = "";
  var other_feedback = "";
  var options = $(thisFB).find(".hk-c-check__input--check");
  var source = $(thisFB).attr("data-source");
  for(var o=0;o<options.length;o++){
    var each_fb =$(thisFB).find(".hk-c-check__input--check:eq("+o+")");
    if(each_fb.prop("checked")){
      // console.log("o : "+o);
      indexOptions += o + ",";
    }
  }

  other_feedback = $("#hk-feedback .hk-c-textarea").val().trim();
  var url = window.location.href;
  var jsonArr = [{'feedback_selected': indexOptions, 'source': source, 'feedback_other': other_feedback, 'url': url}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 37, respFeedbacks, [{'thisFB': thisFB}]);
}

function respFeedbacks(data, passBack){
  // console.log("Entered here");
  passBackFB = passBack[0].thisFB;
  hkCloseModal(passBackFB);
  hkDummyModal.fill({
    header: `All Done!`,
    main: `Thanks for the Feedback`,
    footer: `<div class="hk-u-flexChild--right">
    <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close hk-js-focusOnOpen">Close</button>
    </div>`
  });
  hkOpenModal('hk-modal__dummy');
}

$('.hk-js-modal__fdbkSubmit').click(function(){
	const hkModFdbkWrapper = $('.hk-js-modalFeedback__wrapper');
  if($('.hk-c-check__input--check:checked', hkModFdbkWrapper).length || $('.hk-c-textarea',hkModFdbkWrapper).val().trim().length){
    sendFeedbacks(hkModFdbkWrapper);
  }
  else{
   hkDummyModal.fill({
    header: `Incomplete Feedback!`,
    main: `Please choose an option/write your feedback before submitting.`,
    footer: `<div class="hk-u-flexChild--right">
    <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close hk-js-focusOnOpen">Close</button>
    </div>`
  });
   hkOpenModal('hk-modal__dummy');
 }
});

$('.hk-sTab__cMoreDetailToggler').click(function(e) {
	e.preventDefault();
  var $this = $(this);
  $this.parent().toggleClass('hk-sTab__coupDescriWrap--expanded');
})

$('.hk-js-recoBox__close').click(function(){
  hkHideRecoBox();
});
$('.hk-js-bringBackRecoBox').click(function(){
  hkShowRecoBox();
});

$(".hk-dd__select").change(function(){
  var selectedRng = $(this).val().trim();
  if(selectedRng == 'inAWeek'){
    if($(".hk-prediction-score").attr("data-score2")){
      var scoreG = $(".hk-prediction-score").attr("data-score2").split("~~")[0].trim();
      var text1G = $(".hk-prediction-score").attr("data-score2").split("~~")[1].trim();
      var text2G = $(".hk-prediction-score").attr("data-score2").split("~~")[2].trim();
      plotScorePred(scoreG, text1G, text2G);
    }
  }
  else if(selectedRng == 'inAMonth'){
    if($(".hk-prediction-score").attr("data-score3")){
      var scoreG = $(".hk-prediction-score").attr("data-score3").split("~~")[0].trim();
      var text1G = $(".hk-prediction-score").attr("data-score3").split("~~")[1].trim();
      var text2G = $(".hk-prediction-score").attr("data-score3").split("~~")[2].trim();
      plotScorePred(scoreG, text1G, text2G);
    }
  }
  else if(selectedRng == '23days'){
    if($(".hk-prediction-score").attr("data-score1")){
      var scoreG = $(".hk-prediction-score").attr("data-score1").split("~~")[0].trim();
      var text1G = $(".hk-prediction-score").attr("data-score1").split("~~")[1].trim();
      var text2G = $(".hk-prediction-score").attr("data-score1").split("~~")[2].trim();
      plotScorePred(scoreG, text1G, text2G);
    }
  }
});

$('.hk-js-copyThis').click(function(e) {
	e.preventDefault();
  //this is a quasi-generic function :P. It copies the contents of the element and then shows a Copied! animation to the user
  var $this = $(this);
  hkCopyThis($this.find('.hk-js-copyThis__text').text());
  $this.addClass('hk-js-copyThis--copied');
  setTimeout(function() {
    $this.removeClass('hk-js-copyThis--copied');
  }, 600);
});

$(".hk-sTab__coupRatingIcon--thumbsUp").click(function(e){

	e.preventDefault();
  var $this = $(this),
  $nearestWrap = $this.closest('.hk-sTab__coupRevEachWrap');

  hkClearRatings($nearestWrap.parent());
  $nearestWrap.addClass('hk-sTab__coupRevEachWrap--selected');


  var cID = $(this).parent().parent().parent().parent().parent().parent().parent().attr("id");
  var webID = getCurrentPosition(window.location.href);
  var lflag = 1;
  var exflag = 0;
  // console.log("cID: "+cID);
  // console.log("webID: "+webID);
  // console.log("lflag: "+lflag);
  // console.log("exflag: "+exflag);
  likeDislikeCoupons(cID, webID, lflag, exflag);
});

$(".hk-sTab__coupRatingIcon--thumbsDown").click(function(e){
	e.preventDefault();
  var $this = $(this),
  $nearestWrap = $this.closest('.hk-sTab__coupRevEachWrap');

  hkClearRatings($nearestWrap.parent());
  $nearestWrap.addClass('hk-sTab__coupRevEachWrap--selected');


  var cID = $(this).parent().parent().parent().parent().parent().parent().parent().attr("id");
  var webID = getCurrentPosition(window.location.href);
  var lflag = 0;
  var exflag = 0;
  // console.log("cID down: "+cID);
  // console.log("webID down: "+webID);
  // console.log("lflag down: "+lflag);
  // console.log("exflag down: "+exflag);
  likeDislikeCoupons(cID, webID, lflag, exflag);
  hkFdbkWrapper = document.querySelector('.hk-js-modalFeedback__wrapper');
  hkFdbkWrapper.innerHTML = hkFdBkTypes['sideCoupon'];
  hkOpenModal('hk-feedback');
});

//submit coupon
$('.hk-js-coupSubmit__open').click(function() {
  hkSubmitCoup.reset();
  hkOpenModal('hk-submitCoupons');
});

$('.hk-js-modal__coupSubmit--reset').click(function(){
  hkSubmitCoup.reset();
});


/// initiate classes and AutoCoupUI after UI init
hkAutoCoup = new hkAutoCouponsClass();
hkDummyModal = new hkDummyModalClass(hkDummyModalReset);
hkSubmitCoup = new hkSubmitCouponsClass();
}
else{
  setTimeout(addClickEvents, 200);
}
return;
}

var maxCall = 0;

function changeCSS(){
  if(document.querySelectorAll('.hk-sB__tabSwitcher').length > 0){
    if(maxCall <= 10){
      maxCall++;
      setTimeout(function(){changeCSS()}, 1000);
    }
    if(document.querySelectorAll('.hk-sB__tabSwitcher')[0].style.display=="none" && document.querySelectorAll('.hk-sB__tabSwitcher')[1].style.display=="none"){
      document.querySelector('.hk-sTabSwitch__wrap').style.transform = "translateY(30%)";
    }
    else {
      document.querySelector('.hk-sTabSwitch__wrap').style.transform = "";
    }
  }
  else {
   setTimeout(function(){changeCSS()}, 1000);
 }
}

changeCSS();

function initiateNewUI(){
  // console.log("initiateNewUI was called");
  if(getCurrentPosition(window.location.hostname) != 0 || (window.location.hostname.split("google.co.in").length > 1 && (getCurrentPosition(window.location.href) != 0))){
    if(flagAvail==1){
    // coupons available
    if($("#hk-killerDIV").length == 0){
      var link = document.createElement("link");
      link.href = returnResource("style.css");
      link.type = "text/css";
      link.rel = "stylesheet";
      document.getElementsByTagName("head")[0].appendChild(link);
      $('body').append('<div id="hk-killerDIV" style="display:block!important"></div>');
      var newUI = returnResource("newUI.html");
      $('#hk-killerDIV').load(newUI);
      addClickEvents();
      // console.log("Inside main");
    }
    $(".main-hk-ext-div").attr( "style","display:block!important");
    $(".hk-main-coupons").attr( "style","display:block!important");
    $(".hk-main-settings").attr( "style","display:block!important");
    settingsSelectors.push('.hk-main-settings');
    settingsSelectors.push('.hk-main-coupons');
    settingsSelectors.push('.hk-js-sB__chat');

    hkFdbkWrapper = document.querySelector('.hk-js-modalFeedback__wrapper');

    if(isFlightSite() == true){
        // console.log("entered  isFlight condition");
        $(".hk-main-watch").remove();
        $(".hk-main-graph").remove();
        $(".hk-yellow-bar-main-div").remove();
      }
      if((typeof(getPID) == 'function' && typeof(getProd) == 'function')){
        // console.log("entered  plotAllData condition with "+getProd());
        if(isFlightSite() == false && getProd() != ""){
          // console.log("calling plotAllData");
          plotAllData();
        }
        else if(isFlightSite() == false && (getCurrentPosition(window.location.href) == 1331 || getCurrentPosition(window.location.href) == 902)){
          if(getProd() == ""){
            setTimeout(initiateNewUI, 500);
          }
        }
        else if(isFlightSite() == false){
          // console.log("FInalcase");
          $(".hk-main-graph").css("display","none");
          $(".hk-main-watch").css("display","none");
          $(".hk-yellow-bar-main-div").css("display","none");
        }
      }
      else{
        setTimeout(initiateNewUI, 500);
      }
    }
    else if(flagAvail==0){
     setTimeout(initiateNewUI, 500);
   }
 }

}
initiateNewUI();



function hkTabSwitcher(clickedTab) {
 // console.log("Clicked here tabSwitcher " + clickedTab);
 $(clickedTab).parent().find('.hk-c-tab--current').removeClass('hk-c-tab--current');
 $(clickedTab).addClass('hk-c-tab--current');

 var temp = clickedTab.closest('.hk-sTab__coupTabs').data('hktablayout');
 var line = clickedTab.closest('.hk-sTab__coupTabs').find('.hk-c-tabLine');

 if ($(clickedTab).data('hktabtype') != 'all') {

  $('#' + temp).find('.hk-sTab__coupLi').hide();
  var tabType = $(clickedTab).data('hktabtype');
  $('.hk-sTab__coupLi[data-hktabtype=' + tabType + ']').show();

} else {
  $('#' + temp).find('.hk-sTab__coupLi').show();
}

var tabWidth = clickedTab.outerWidth();
$(line).css({ transform: "scaleX(" + (tabWidth / 100) + ")translateX(" + (clickedTab.position().left / (tabWidth / 100)) + "px)" });
}

var globalDrop = 0;

function displayRecentDrops(data, passBack, flag){
  var dataAll = data;
  // console.log(data);
  if(data && data.trim() != ""){
  // console.log("drop data: "+data);
  if(flag === true && getCurrentPosition(window.location.href) == 63 && globalDrop == $(".bh_parent").length && globalDrop != 0){
    setTimeout(function(){
      displayRecentDrops(data, passBack, true);
    }, 500);
    return;
  }

  data = JSON.parse(data);
  str = "";
  for(var p=0;p<passBack.length;p++){
    var selector = passBack[p];
    // console.log("selector: "+selector+" with len: "+$(selector).length);
    if($(selector).length > 0){
      var len = $(selector).length;
      for(var t=0;t<len;t++){
        if($(selector).eq(t).find("a").length > 0 && $(selector).eq(t).find("a:eq(0)").attr("href")){
          var link_found = $(selector).eq(t).find("a").attr("href").trim();
          if((link_found == "" || link_found == "javascript:void(0);") && $(selector).eq(t).find("a:eq(1)").length > 0 && $(selector).eq(t).find("a:eq(1)").attr("href")){
            link_found = $(selector).eq(t).find("a:eq(1)").attr("href");
          }
          if(link_found.split(window.location.hostname).length < 2){
            link_found = window.location.hostname+"/"+link_found;
          }
          var pid_found = returnPID(link_found);
          if(data[pid_found] && $(selector).eq(t).find("a:eq(0)").parent().find(".bh_parent").length == 0){
            var per = data[pid_found]["per"];

            str = `
            <div class="hk-c-dropSticky bh_parent">
            <div class="bh_priceDrop hk-c-toolTips__container hk-c-toolTips__container--dark hk-c-toolTips__container--hoverFocus hk-c-toolTips__container--bottomRight">
            <div class="hk-u-noWrap">
            <div class="dropIcon">

            <svg class="hk-ext__icons--darkGreenFill" height="20px" viewBox="0 0 160.7 194.4">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__info--priceDrop_down"></use>

            </svg>
            </div>
            <span class="dropPerc">${per}%</span>
            </div>
            <div class="hk-c-toolTip" style="width:250px;margin-left: -5px;">
            <div class="hk-c-toolTip__wrap hk-u-padding__1 hk-u-text__align--left hk-u-fSize--small hk-u-text--readable">
            Current price is <b class="hk-js-stickyPDrop">${per}%</b> lower than previous lowest price
            <div class="hk-u-fSize--small hk-u-text--white hk-u-float--right hk-u-margin__v-1">
            <a href="https://compare.buyhatke.com/?utm_source=sBTabGraph&amp;utm_medium=extension" title="Powered By: Buyhatke">
            <svg viewBox="0 0 160.7 194.4" class="hk-u-va--bottom" height="20px">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__buyhatkeLogo--icon"></use>
            </svg>
            </a>
            </div>
            </div>
            </div>
            </div>
            </div>`;
            // $(selector).eq(t).find("a:eq(0)").parent().attr("data-hk-id", pid_found);
            $(selector).eq(t).find("a:eq(0)").before(str);
          }
        }
      }

      globalDrop = $(".bh_parent").length;
    }
  }

  if(Object.keys(data).length > 0 && getCurrentPosition(window.location.href) == 63 && $(".GB-M-COMMON.GB-SHOVELER").length > 0){

    setTimeout(function(){
      // console.log("Enterd recalling case");
      displayRecentDrops(JSON.stringify(data), passBack, true);
    }, 500);

  }

}
}

function product_already_browsed(webPosName, pid){
 var site = 'bh-browsed-' + webPosName;
 var bh_browsed = localStorage.getItem(site);
 var list_of_products_browsed;
 if(bh_browsed)
  list_of_products_browsed = JSON.parse(bh_browsed);
else
  list_of_products_browsed = [];
if(list_of_products_browsed && list_of_products_browsed != "undefined" && list_of_products_browsed.length){
  if(list_of_products_browsed.indexOf(pid) == -1){
    list_of_products_browsed.push(pid);
    var length = list_of_products_browsed.length;
    if(length > 300){
     list_of_products_browsed.splice(0,1);
   }
   localStorage.setItem(site, JSON.stringify(list_of_products_browsed));
 }
 else{
  return 1;
}
}
else {
  list_of_products_browsed.push(pid);
  localStorage.setItem(site, JSON.stringify(list_of_products_browsed));
}
return 0;
}

function removePrepositions(prod){
 preps.forEach(function(prep){
  while(prod.indexOf(prep) != -1){
    prod = prod.replace(prep, " ");
    prod = prod.trim();
  }
});
 return prod;
}

function wholeUnitMatch(target_str, unit){
  target_str_tokens = target_str.toLocaleLowerCase().split(" ");
  var flag = false;
  target_str_tokens.forEach(function(item){
    if(item == unit)
     flag = true;
 });
  return flag;
}

function traverseProdForMetric(prod, index){
  var quant = "";
  while(prod[index] == " ")
   index--;
 while((!isNaN(prod[index]) || prod[index] == ".") && index >= 0 && prod[index] != " "){
   quant = prod[index] + quant;
   index--;
 }
 if(quant.length)
   return quant;
 else
   return undefined;
}

function getMetricsFromMainFeatures(main_features, units_matched){
 main_features.forEach(function(main_feature){
   getMetricsFromProdName(main_feature, units_matched);
 });
}
function removeBrackets(prod){
  var stack = [];
  for(i = 0; i < prod.length; i++){
    if(stack[stack.length - 1] == '('){
      if(prod[i] == ")")
       stack.pop();
     else if(prod[i] == "(")
       stack.push("(");
   }
   else{
     stack.push(prod[i]);
   }
 }
 prod = "";
 stack.forEach(function(s){
   prod = prod + s;
 });

 return prod;
}

function filterInt(prod){
  prod = prod.trim();
  prod_spl = prod.split(" ");
  if(prod_spl.length > 1){
   var prodNew = "";
   for(var m=0; m< prod_spl.length; m++){
    var curProd = prod_spl[m].trim();
    var letters = /^[A-Za-z]+$/;
    var flag = true;
    for(var n=0; n<curProd.length; n++){
      if(curProd[n].match(letters)){

      }
      else {
        flag = false;
      }
    }
    if(flag){
      prodNew +=  " **~ " + curProd;
    }
  }
  if(prodNew.trim()!=""){
    return prodNew.trim();
  }
  else {
    return prod;
  }
}
else {
  return prod;
}
}

function convertNumToWord(num){
  switch(num){
    case 1:
    return "SINGLE~ONE";
    break;
    case 2:
    return "DOUBLE~TWO";
    break;
    case 3:
    return "TRIPLE~THREE";
    break;
    case 4:
    return "FOUR";
    break;
    case 5:
    return "FIVE";
    break;
    case 6:
    return "SIX";
    break;
    case 7:
    return "SEVEN";
    break;
    case 8:
    return "EIGHT";
    break;
    case 9:
    return "NINE";
    break;
    case 10:
    return "TEN";
    break;
    default:
    return "";
    break;
  }
}

function normalizeProd(prod, category, main_features, brand, units_matched){
  // console.log("Rec " + prod + " " + category + " " + brand);
   // prod = prod.replace(category, '');
   prod = prod.replace(/[^a-zA-Z0-9.\-]/g, ' ');
   for(var property in units_matched){
    var unit_str_remove = units_matched[property] + " " + property;
    prod = prod.replace(unit_str_remove, "");
    unit_str_remove = units_matched[property] + property;
    prod = prod.replace(unit_str_remove, "");
    prod = prod.replace(/  +/g, ' ');
  }
  var prod_tokens = prod.split(" ");
  var final_prod = "";
  var i = 0;
  var temp_prod_tokens = [];
  prod_tokens.forEach(function(item){
    if(item !== "" && item !== 'X' && item !== 'x')
      temp_prod_tokens.push(item);
    i++;
  });
  prod_tokens = temp_prod_tokens;
  prod_tokens.forEach(function(item){

    main_features.forEach(function(main_item){
          // console.log("CUrrent match " + main_item);
          var flag = false;
          main_item = main_item.split(" ");
          main_item.forEach(function(main_item_item){
            // console.log("CUrrent match " + main_item_item);
            if(main_item_item == item)
              flag = true;

            if(!flag && !isNaN(parseInt(main_item_item))){
              var variants = convertNumToWord(parseInt(main_item_item));
              if(variants!=""){
                variants = variants.split("~");
                for(var k=0; k< variants.length; k++){
                 if(variants[k] == item.toUpperCase()){
                  if(final_prod.split(variants[k].toLocaleLowerCase()).length==1){
                   final_prod = final_prod + " **~ " + variants[k].toLocaleLowerCase();
                 }
               }
             }
           }
         }

         if(flag && isNaN(item) && final_prod.split(item).length==1){
          final_prod = final_prod + " **~ " + item;
                // console.log(item);
              }
            });
        });

  });
   // for(var property in units_matched){
   //    final_prod = final_prod + " ~* " + units_matched[property] +  " " + property;
   // }
   final_prod = final_prod.trim();
   // console.log("Returning from here " + final_prod);
   return final_prod;
 }

 function getMetricsFromProdName(main_feature, units_matched){
  // console.log("Received here " + main_feature + " " + JSON.stringify(units_matched));
  var flag = 0;
  if(main_feature)
   flag = 1;
 var prod = getProd();
 if(flag)
   prod = main_feature;
 prod = prod.toLocaleLowerCase();
 prod = removeBrackets(prod);
 prod = prod.replace(/ *\([^)]*\) */g, "");
 prod = prod.replace(/-/g, ' ');
 prod = prod.trim();
 units_for_product_matching.forEach(function(unit){
  var indexes = [];
  var quants = [], quant = "";
  var index = prod.indexOf(unit);
  while(index != -1){
   indexes.push(index);
   index = prod.indexOf(unit, index + 1);
 }
 indexes.every(function(index){
   quant = traverseProdForMetric(prod, index - 1);
   if(quant){
     quants.push(quant);
   }
   return true;
 });
 if(quants.length){
   var len = quants.length;
   for(i = 0; i < len; i++){
     var str_to_be_removed = quants[i] + " " + unit;
     prod = prod.replace(str_to_be_removed, "");
     var str_to_be_removed1 = quants[i] + unit;
     prod = prod.replace(str_to_be_removed1, "");
     if(!flag)
       units_matched[unit] = quants[i];
     else {
       if(getProd().toLocaleLowerCase().indexOf(str_to_be_removed) != -1 || getProd().toLocaleLowerCase().indexOf(str_to_be_removed1) != -1)
        units_matched[unit] = quants[i];
    }
  }
}
return true;
});

 return units_matched;
}

function findGetParameter(parameterName) {
  var result = null,
  tmp = [];
  location.search
  .substr(1)
  .split("&")
  .forEach(function (item) {
    tmp = item.split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  });
  return result;
}

function importWishGlobal(sel, atPos, callBack){
  var importImg = returnResource("import_img.png");
  var info_icon = returnResource("info_icon.png");

  if(atPos == "before"){
    var str =  $(sel).before('<div id="importHatke"> <img src="'+importImg+'" alt="Click to import wishlist" height="50px" width="auto"/> <img src="'+info_icon+'" alt="Click to import wishlist" title="Click IMPORT to set Price Alert on all your wish-list products at once." width="auto" style="height: 18px;margin-bottom: 30px;margin-left: -10px;"/> </div>');
  }
  else if(atPos == "after"){
    var str =  $(sel).after('<div id="importHatke"> <img src="'+importImg+'" alt="Click to import wishlist" height="50px" width="auto"/> <img src="'+info_icon+'" alt="Click to import wishlist" title="Click IMPORT to set Price Alert on all your wish-list products at once." width="auto" style="height: 18px;margin-bottom: 30px;margin-left: -10px;"/> </div>');
  }
  $("#importHatke").click(function(){
    callBack();
  });
}

function returnResource(name){
  return chrome.extension.getURL(name);
}

function setExtID2(data, passBack){
  ext_id = data;
}

function getExtID2(){
   // Gets all current alerts list
   var jsonArr = [{'extId': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setExtID2, passBack);
 }

 getExtID2();
//referral

function setExtFeatures(data, passBack){
  features_json = data;
}

function getExtFeatures(){
   // Gets all current alerts list
   var jsonArr = [{'fetchFeatures': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setExtFeatures, passBack);
 }

 getExtFeatures();

//referral
var urlNow = window.location.href;
var posNow = getCurrentPosition(urlNow);
if(posNow!=0){
  var jsonArr = [{'dp': 'website-visit' + "~*" + window.location.hostname}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(0, jsonArr, 0, doNothing, []);
}

function logNotDone(breadCrumb){
  var jsonArr = [{'bread': encodeURIComponent(breadCrumb)}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 29, doNothing, []);
  // console.log("Called to log");
}

function findCommonWord(cat_name, prod_name, centres){
  prod_name = prod_name.split("(").join(" ");
  prod_name = prod_name.split(")").join(" ");
  prod_name = prod_name.split(",").join(" ");

  var keywordsList = {};
  var ind = 0;
  cat_name = cat_name.trim();
  var keywords = [];
  cat_name_sing = "";
  cat_name_sing = convertSing(cat_name);
  if(cat_name_sing==cat_name){
    cat_name_sing = "";
    keywords = [];
  }
  else if(cat_name_sing){
    keywords = cat_name_sing.split("~");
  }

  keywords[keywords.length] = cat_name;

  for(var k=0; k< keywords.length; k++){
    if(keywords[k].trim()!=""){
      if(keywords[k].trim().split(" ").length > 1){
        var tempKey = keywords[k].trim().split(" ").join("").toUpperCase();
        keywordsList[tempKey] = 0;
      }
      else {
        keywordsList[keywords[k].trim().toUpperCase()] = 0;
      }
    }
  }
  for(var k=0; k< keywords.length; k++){
    if(keywords[k].trim()!=""){
      if(keywords[k].trim().split(" ").length > 1){
        var tempKey = keywords[k].trim().split(" ");
        for(var a=0; a< tempKey.length; a++){
          if(tempKey[a].trim()!=""){
            keywordsList[tempKey[a].toUpperCase()] = 0;
          }
        }
      }
    }
  }

  // console.log(JSON.stringify(keywordsList));

  var finalCent = "";
  var prod_name_spl = prod_name.split(" ");
  var letters = /^[A-Za-z0-9]+$/;
  for(var key in keywordsList){
    for(var l=0; l<prod_name_spl.length; l++){
     if(prod_name_spl[l].trim()!="" && prod_name_spl[l].toUpperCase().split(key).length > 1){
      keywordsList[key] = 1;
      var firstPos = prod_name_spl[l].toUpperCase().indexOf(key);
      var endPos = firstPos + key.length;
        // console.log("Next char " + endPos + " ~ " + prod_name_spl[l] + " ~ " + prod_name_spl[l].length);
        var someStr = prod_name_spl[l];
        var toAdd = "";
        if(endPos < (someStr.length - 1)){
          // console.log(" Main char ~ " + someStr[endPos] + " ~ ");

          if(someStr[endPos+1].match(letters))
          {
            toAdd = prod_name_spl[l];
          }
          else {
            toAdd = prod_name_spl[l].substr(0,endPos);
          }
             // if(finalCent.split(toAdd).length==1){
             //  finalCent += toAdd + "~*";
             //  }
           }
           else if(finalCent.split(prod_name_spl[l]).length==1){
            toAdd =  prod_name_spl[l];
          }
          var flagFound = 0;
          if(finalCent.split(toAdd).length==1){

          }
          else {
            flagFound = 1;
          }
          if(flagFound==0){
           var singValues = convertSing(toAdd);
           if(singValues && singValues!=""){
            singValues = singValues.split("~");
            for(var j=0; j<singValues.length; j++){
              var toCheck = singValues[j].trim();
              // console.log("Checking  " + toCheck + " ~*** " + finalCent);
              if(finalCent.split(toCheck).length==1){

              }
              else {
               flagFound = 1;
               break;
             }
           }
         }
       }

       if(flagFound==0 && centres.indexOf(toAdd) == -1){

        finalCent += toAdd + "**~";
          // console.log("Adding " + toAdd + " ~*** " + finalCent);
        }

      }
    }
  }
  return finalCent;
}

function replaceStr(str, substr, newsubstr){
  var n = str.lastIndexOf(substr);
  if (n >= 0 && n + substr.length >= str.length) {
    str = str.substring(0, n) + newsubstr;
  }
  return str;
}



function convertSing(str){
  if(str.endsWith("ies")){
   str = replaceStr(str, "ies", "y");
   return str;
 }
 else if(str.endsWith("ves")){
  str1 = replaceStr(str, "ves", "ff");
  str2 = replaceStr(str, "ves", "f");
  str3 = replaceStr(str, "ves", "fe");
  str4 = replaceStr(str, "s", "");
  return str1 + "~" + str2 + "~" + str3 + "~" + str4;
}
else if(str.endsWith("es")){
 str1 = replaceStr(str, "es", "s");
 str2 = replaceStr(str, "es", "x");
 str3 = replaceStr(str, "es", "z");
 str4 = replaceStr(str, "es", "ch");
 str5 = replaceStr(str, "es", "sh");
 str6 = replaceStr(str, "s", "");
 str7 = replaceStr(str, "es", "");
 return str1 + "~" + str2 + "~" + str3 + "~" + str4 + "~" + str5 + "~" + str6 + "~" + str7;
}
else if(str.endsWith("s")){
  return replaceStr(str, "s", "");
}
else {
  return str;
}
}


// pidPosArr = [];
// console.log("posAll: "+posAll);
function checkDefine(){
 if(typeof(getPID) == 'function' && typeof(getProd) == 'function'){
   pidAll = getPID();
   prodAll = getProd();
   if(prodAll!=""){
     var posAll = getCurrentPosition(window.location.href);
       // pidPosArr.push([encodeURIComponent(pidAll), posAll]);
       var jsonArr = [{'pid': pidAll, 'pos': posAll}];
       jsonArr = JSON.stringify(jsonArr);
       sendMessage(1, jsonArr, 20, doNothing, []);
     }
   }
   else{
   // console.log("NO SUCH function");
   setTimeout(checkDefine, 5000);
 }
}
checkDefine();

function getExtName(){
   // Gets all current alerts list
   var jsonArr = [{'extName': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setExtName, passBack);
 }

 getExtName();

 function setExtName(data, passBack){
   extName = data;
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

function plotHotDeals(){
  return;
  $('body').append('<div class="hk-dpop animated" style="display:block!important;"><div class="hk-dpop-toggle"><svg class="hk-dpop-toggle-arrow hk-dpop--icon " xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 8.2 15.8"><style>.hk-dpop-toggle-arrow0{fill:none;stroke:#FFFFFF;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><path id="XMLID_113_" d="M1.5 1.5L6.7 8l-5.2 6.3" class="hk-dpop-toggle-arrow0"/></svg></div><div class="hk-dpop-box"><a href="#" target="_blank" style="text-decoration:none;" class="hk-dpop-wrap"><div class="hk-dpop-img--wrap"><svg class="hk-dpop-img" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 76.1 71.5"><style>.hk-dpop-img0{fill:url(#XMLID_76_);} .hk-dpop-img1{fill:#FFFFFF;}</style><g id="XMLID_84_"><radialGradient id="XMLID_76_" cx="38.2" cy="35.7" r="32.4" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#DE1C24"/><stop offset=".4" stop-color="#D91E26"/><stop offset=".8" stop-color="#C9242A"/><stop offset="1" stop-color="#C1272D"/></radialGradient><circle id="XMLID_87_" cx="38.2" cy="35.7" r="32.4" class="hk-dpop-img0"/><g id="XMLID_54_"><path id="XMLID_55_" d="M24.7 32.5H24V32v-.8l.4-2 .3-2.3c0-1 .2-1.8.3-2.6h-.6s-.2 0-.2-.3c0 0 0-.2.2-.3l.6-.4h.2v-.8l.2-.6V21l1-6c0-.2 0-.4.2-.6 0-.2.4-.3 1-.5h.8l-.2 1c0 .7-.2 1.3-.4 2 0 1-.3 1.8-.4 2.8l-.4 3 2.8-.7H31c.4-.2.8-.2 1.2-.2l.3-2.2c0-.7.2-1.4.3-2 0-.6.2-1.2.3-1.6l.3-1c0-.3 0-.5.2-.6 0-.2 0-.3.2-.4l.3-.2h.4s.2 0 .3-.2h1l-1 4-.8 4.2h1c.3 0 .5 0 .6.2v.5l-.2.3-.3.4c-.2 0-.3.3-.5.5h-.3l-.3-.2h-.5c0 .2 0 .5-.2.8v1l-.4 2c-.2.5-.2 1.2-.3 2v2h-.4l-.3.2h-.3-.2-.2-.5v-1.2-1-1-1l-.6-1c0-.5-.4-.8-.6-1l-1-1-1-.2h-.8v1.3l-.2 1c0 1 0 1.6-.2 2.3v2L26 32l-.6.3c-.2 0-.3 0-.5.2 0-.2 0-.2-.3-.2zm7-9.4h-1.4l-1 .2c.2 0 .4.3.6.5 0 .2.4.5.6.7l.6.8.4 1c0-.7 0-1.2.2-1.7 0-.5 0-1 .2-1.5h-.2-.2z" class="hk-dpop-img1"/><path id="XMLID_58_" d="M42.3 24c0 .5-.2 1-.4 1.4l-.8 1.2-1 .8-1.2.4c-.5 0-1 0-1.3-.2l-.8-.8c-.3-.3-.4-.7-.5-1 0-.5 0-1-.2-1.2v-.8c0-.3 0-.6.2-1l.3-1c0-.2.3-.5.5-.8l.3-.6c0-.2.3-.3.5-.5l.8-.4c.2 0 .5 0 .7-.2H40.5l.8.6.7.8.3 1.3v.9l1-.6.8-.6 1-.7.5-.5.3-.2h.2v.4s0 .3-.2.4c0 .2-.2.4-.5.6l-1 1-1 .8-1 .6zm-4.5 1v.6l.3.6.5.4h1.1l.5-.6.5-.6.3-.7h-.3-.3c-.5 0-1 0-1.3-.2-.5-.3-.8-.6-1-1v.8c-.2 0-.2.3-.2.6zm1-3.7v1c0 .2 0 .4.3.6l.6.3H41V23v-.5-.8c0-.3 0-.5-.2-.7 0-.2-.2-.4-.3-.5l-.4-.2s-.4 0-.6.3l-.7.7z" class="hk-dpop-img1"/><path id="XMLID_62_" d="M51.3 21.2l.2-.2h.2V21.6l-1 1.7-1 1.7-1.3 1.4c-.4.4-.8.6-1 .6H46l-.7-.7-.4-.8v-.8-1-2c.2-.7.2-1.5.3-2.3l.3-2.4H45l-.7.2H43c-.3 0-.6 0-.8-.2 0 0-.2 0-.2-.2v-.3c.2 0 .2-.2.3-.3h1.1c.3 0 .6 0 1-.2h.6l.7-.3c0-.6.2-1.2.3-1.7 0-.5.2-.8.3-1l.2-.2h1l.2.8v1.7H51l.4.2.2.2v.3s0 .2-.2.3H51 50.2h-.7c-.3 0-.7 0-1 .2h-.8v.6l-.2.7c0 .5-.3 1-.4 1.8 0 .5-.3 1.2-.5 2l-.7 2.2c0 .6 0 1 .2 1.3 0 .3.3.5.4.6l.6.2c.2 0 .4 0 .7-.3l.8-.7.8-1 .8-1 .7-1 .6-.6z" class="hk-dpop-img1"/><path id="XMLID_64_" d="M20 56c0-.2-.2-.2-.2-.3v-.3s0-.2.2-.3l.3-.6.3-1.4.3-1.8c0-.6 0-1.3.2-2l.2-1.6v-1.2l.2-1.2V44 42l1.6-1h.5v2.2c0 .5 0 1-.2 1.8l-.2 2L23 49l-.3 1.7-.8 4.5c0 .3.5.4 1 .4s1.2-.3 1.8-.8c.7-.5 1.3-1.2 2-2 .5-1 1-2 1.4-3.4s.6-2.8.5-4.5c0-1 0-1.8-.4-2.5-.2-.7-.5-1.2-1-1.7-.3-.4-.7-.7-1.2-1-.4 0-1-.2-1.5 0-1.3 0-2.6.7-4 2l-.2-1.7 1-1c.5 0 1-.3 1.3-.5.4-.2 1-.3 1.3-.3.7 0 1.5 0 2.3.2.8.2 1.5.7 2 1.2S29.6 41 30 42c.3.8.5 2 .6 3.3 0 .8 0 1.6-.2 2.4-.2.8-.4 1.7-.8 2.5l-1.2 2.4-1.6 2c-.6.6-1.3 1-2 1.5s-1.5.7-2.3.8h-.8l-1-.3-.7-.6z" class="hk-dpop-img1"/><path id="XMLID_66_" d="M40.6 47.3L39.4 49c-.4.7-1 1.2-1.4 1.7-.5.5-1 1-1.6 1.2l-1.6.5h-1l-1-.6-.7-1-.2-1.7c0-.5 0-1 .3-1.7l1-1.7 1.3-1.5s1-.6 1.5-.6 1 0 1 .2.5.5.5 1c0 .3 0 .7-.2 1 0 .4-.2.7-.5 1l-.8.8-.8.7-1 .6c0 .2-.4.4-.5.5 0 .3 0 .6.3.8 0 .2.3.4.4.5l.6.3h.6c.4 0 1-.2 1.3-.6.5-.3 1-.7 1.3-1.2l1.2-1.4c.4-.4.6-.8 1-1 0-.2 0-.3.2-.3h.2v.5zm-5.2-2.5c-.2 0-.3 0-.5.3l-.7.8-.5 1-.3 1.6.5-.4c.2 0 .3-.3.5-.5.5-.5 1-1 1-1.2.3-.3.4-.6.4-1 0 0 0-.3-.2-.4l-.4-.2z" class="hk-dpop-img1"/><path id="XMLID_69_" d="M49.2 46.6l-.6 1-.8 1.2c-.3.4-.5.8-.8 1l-.7.8-.4.2h-1.6l-.3-.4-.2-.5c0-.3 0-.6-.2-1-.3.5-.6 1-1 1.3-.2.3-.6.6-1 .7l-1 .4h-.6l-.6-.6-.4-1v-1.5c0-.8.3-1.6.7-2.2.2-.6.6-1.2 1-1.7s.8-1 1.3-1.2l1-.3c.5 0 .8 0 1 .2.2 0 .3.2.4.4 0 .2 0 .6-.2 1h.8V46l-.3 1.4V49.2l.2.4s0 .2.2.3h.4s.3 0 .5-.3l.6-.7.5-1 .6-1 .6-.7.3-.5s0-.2.2-.2h.2v.4c0 .2 0 .4-.2.6zM43.6 48v-1c.2-.3.2-.6.2-1v-.7-.3h-.2s0 .2-.2.2H43c.2 0 .2-.3.2-.4v-.3-.2c-.3 0-.5 0-.8.4-.3.3-.7 1-1 1.8l-.5 1c-.2.5-.2 1-.2 1.2v1l.3.4.6.3c.2 0 .4 0 .5-.2.3 0 .5-.2.6-.3l.5-.5.4-.5.2-.7z" class="hk-dpop-img1"/><path id="XMLID_72_" d="M48 50.3l.8-6 .5-3.3.2-2v-.6-.6-.6l.2-.2h.3c0-.2.3-.2.4-.2h1v1.8L51 41l-.7 3.8-1 6v.2H49h-.3-.3s-.2 0-.3-.2v-.5z" class="hk-dpop-img1"/><path id="XMLID_74_" d="M55.3 49.2h.7c0-.2.2-.2.3-.3l.2-.5V48l-.4-1-.4-.8-.4-.8-.2-.5c0-.2 0-.4-.2-.5v-.3c-.2 0-.3.3-.4.5l-.5.8-.6.8c0 .2-.2.4-.3.5 0 0 0 .2-.2.2h-.2v-.2-.4l.3-.5c0-.3.2-.6.3-.8 0-.3.3-.5.4-.7l.2-.4-.2-.3c0-.2-.2-.4 0-.6l.2-.6.6-.7.7-.5h.7c.2 0 .3 0 .4.2l.2.4v.3c0 .2-.2.3-.3.5 0 .2-.2.4-.4.6v1c.2 0 .3.3.4.5l.3.6c0 .3.3.6.4.8.3.2.4.5.5.7l.3.6v.6c0 .2 0 .5-.2.8l-.6 1c-.3.3-.5.6-1 .8-.2.2-.6.4-1 .4-.3 0-.5 0-.8-.2-.3 0-.5-.3-.7-.5l-.5-.7v-.5l.3-.4s0-.2.3-.3h.2s0-.2.3-.2c.2 0 .3 0 .5-.2l.4 1s0 .3.2.4v.2z" class="hk-dpop-img1"/></g></g></svg></div><div class="hk-dpop-details--wrap"><div class="hk-dpop-details--text">Get upto 50% off for products in this category</div><button class="hk-dpop-btn"><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" class="hk-dpop-btn--img hk-dpop--icon animated tupper" viewBox="0 0 14.9 10.6"><style>.hk-dpop-btn--img0{fill:none;stroke:#333333;stroke-width:2;stroke-miterlimit:10;}</style><g id="XMLID_53_"><path id="XMLID_61_" d="M9.8.6l4 4.7-4 4.7" class="hk-dpop-btn--img0"/><path id="XMLID_55_" d="M13.7 5.3H0" class="hk-dpop-btn--img0"/></g></svg> TAKE ME THERE</button></div></a></div><div class="hk-dpop--close" onclick="event.stopPropagation();"><div style="margin-left:15px;">&times;</div></div><div class="hk-dpop-hide"><button class="hk-dpop-hiders hideOne">1 Day</button><button class="hk-dpop-hiders hideFifteen">15 DAYS</button></div></div>');
}

function addToDOM(){

  var big_logo = returnResource("buyhatke_logo_big.png");
  if($('.hatke-discount-cover').length < 3){
    $('body').append('<div class="hatke-discount-cover" style="display:none;"><div class="hd-cover-bg"></div><div class="hd-cover-main"><a href="#" class="hd-cover-close">x</a><div class="hd-cover-wrap"><header class="hd-cover-head"><a href="http://compare.buyhatke.com/"><img src="'+big_logo+'"></a></header><div class="hd-cover_content"><h3 class="hdc-head">Finding out the best coupon for you !</h3><div class="hdc-content-main"><div class="hdc-c-line">We are automatically finding out best coupon code for you.</div><div class="hdc-loading_bar"><div class="hdc-lb-bg hdc-lb"><span class="hdc-lb-progress">0% Complete</span><div class="hdc-lb hdc-lb-fg" style="width:0%;"></div></div></div><div class="hdc-c-line hdc-center"><div class="bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div><span class="hdc-loading"></span></div><div class="hdc-savings"><div class="hdc-total-savings"><span class="WebRupee">Rs.</span> <span class="hdc-sav-amt">0</span></div> saved till now</div></div></div></div></div></div>');

    $('body').append('<div class="hatke-discount-cover" style="display:none;"><div class="hd-cover-bg"></div><div class="hd-cover-main"><div class="hd-cover-wrap"><header class="hd-cover-head"><a href="http://compare.buyhatke.com/"><img src="'+big_logo+'"></a></header><div class="hd-cover_content"><h3 class="hdc-head">Yippie!</h3><div class="hdc-content-main"><div class="hdc-c-line">Congratulations! You have saved a total of <div class="hdc-total-savings"><span class="WebRupee">Rs.</span> <span class="hdc-sav-amt">0</span>!</div></div><div class="hdc-button-wrap"><div href="#" class="hdc-button"><div class="hdc-share"><span class="its-title">Share Your Joy:</span> <div class="is-sp is-fb"><a href="https://www.facebook.com/sharer/sharer.php?s=100&p%5Btitle%5D=Have%20you%20started%20saving%20via%20Buyhatke%20?&p%5Bsummary%5D=Yippie%20!%20I%20just%20saved%20by%20automatically%20applying%20best%20coupon%20via%20Buyhatke&p%5Burl%5D=http%3A%2F%2Fextension.buyhatke.com&p%5Bimages%5D%5B0%5D=http://compare.buyhatke.com/pricegraph.jpg.pagespeed.ce.DJYFBY26i2.jpg" target="_blank" class="is-logo is-l-fb"></a></div><div class="is-sp is-tw"><a href="http://twitter.com/home?status=Try%20the%20amazing%20CompareHatke%20Chrome%20Extension!+http%3A%2F%2Fextension.buyhatke.com" target="_blank" class="is-logo is-l-tw"></a></div><div class="is-sp is-gp"><a href="https://plus.google.com/share?url=http%3A%2F%2Fextension.buyhatke.com" target="_blank" class="is-logo is-l-gp"></a></div></div></div><a href="javascript:void();" class="hdc-button" style="z-index: 10001;">Finish</a></div><footer class="hdc-footer"><div class="hdc-feedback">Give us a <a href="https://goo.gl/wpYSpE" target="_blank">feedback</a></div></footer></div></div></div></div></div>');

    $('body').append('<div class="hatke-discount-cover" style="display:none;"><div class="hd-cover-bg"></div><div class="hd-cover-main"><a href="#" class="hd-cover-close">x</a><div class="hd-cover-wrap"><header class="hd-cover-head"><a href="http://compare.buyhatke.com/"><img src="'+big_logo+'"></a></header><div class="hd-cover_content"><h3 class="hdc-head">Sorry! No Coupons Found</h3><div class="hdc-content-main"><div class="hdc-c-line">Sorry. We were unable to find any suitable coupons for your product.</div><div class="hdc-c-line"> But still you saved your precious time ! :)</div><div class="hdc-button-wrap"><a href="javascript:void();" class="hdc-button" style="z-index: 10001;">Finish</a></div><footer class="hdc-footer"><div class="hdc-feedback">Give us a <a href="https://goo.gl/wpYSpE" target="_blank">feedback</a></div><div class="hdc-share"><span class="its-title">Share:</span><div class="is-sp is-fb"><a href="https://www.facebook.com/sharer/sharer.php?s=100&p%5Btitle%5D=Have%20you%20started%20saving%20via%20Buyhatke%20?&p%5Bsummary%5D=Yippie%20!%20I%20just%20saved%20by%20automatically%20applying%20best%20coupon%20via%20Buyhatke&p%5Burl%5D=http%3A%2F%2Fextension.buyhatke.com&p%5Bimages%5D%5B0%5D=http://compare.buyhatke.com/pricegraph.jpg.pagespeed.ce.DJYFBY26i2.jpg" target="_blank" class="is-logo is-l-fb"></a></div><div class="is-sp is-tw"><a href="http://twitter.com/home?status=Try%20the%20amazing%20CompareHatke%20Chrome%20Extension!+http%3A%2F%2Fextension.buyhatke.com" target="_blank" class="is-logo is-l-tw"></a></div><div class="is-sp is-gp"><a href="https://plus.google.com/share?url=http%3A%2F%2Fextension.buyhatke.com" target="_blank" class="is-logo is-l-gp"></a></div></div></footer></div></div></div></div></div>');

    var buttons = document.getElementsByClassName('hd-cover-close');
    buttons[0].addEventListener("click", function(){
      removeTheCover();
      stopCoupon = 0;
      setCookie("coupInProgress", 0, 1);

    }, false);
    buttons[1].addEventListener("click", function(){
      removeTheCover();
      stopCoupon = 0;
      setCookie("coupInProgress", 0, 1);

    }, false);

    var buttons2 = document.getElementsByClassName('hdc-button');
    buttons2[1].addEventListener("click", function(){
      removeTheCover();
      stopCoupon = 0;
      setCookie("coupInProgress", 0, 1);

    }, false);
    buttons2[2].addEventListener("click", function(){
      removeTheCover();
      stopCoupon = 0;
      setCookie("coupInProgress", 0, 1);

    }, false);

    $(".hd-cover-close").click(function(){
     if(check_click_coupon == 0){
       var jsonArr = [{'act': 4, 'act_text': 'Coupon PopUp Cross'}];
       jsonArr = JSON.stringify(jsonArr);
       sendMessage(1, jsonArr, 9, doNothing, []);
       check_click_coupon = 1;
     }
   });
    coupontracer();
  }}


  function setTabID(tabId, passBack){
  // console.log("Tab ID received is " + tabId);
  tabID = tabId;
}

function getTabID(){
   ////console.log("Tab ID process initiated");
   var jsonArr = [{'sendTabID': 'bhejDE'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setTabID, passBack);
 }

 getTabID();

 function filter_price(pr){
  pr = String(pr);
  if(pr.split("Rs.").length > 1){
    pr = pr.split("Rs.")[1];
  }
  if(pr.split("Rs").length > 1){
    pr = pr.split("Rs")[1];
  }
  if(pr.split("INR").length > 1){
    pr = pr.split("INR")[1];
  }
  if(pr.split("Inr").length > 1){
    pr = pr.split("Inr")[1];
  }
  if(pr.split("RS.").length > 1){
    pr = pr.split("RS.")[1];
  }
  if(pr.split("RS").length > 1){
    pr = pr.split("RS")[1];
  }
  if(pr.split("R").length > 1){
    pr = pr.split("R")[1];
  }
  if(pr.split("`").length > 1){
    pr = pr.split("`")[1];
  }
  if(pr.split("MRP").length > 1){
    pr = pr.split("MRP")[1];
  }
  if(pr.split("mrp").length > 1){
    pr = pr.split("mrp")[1];
  }
  if(pr.split("/").length > 1){
    pr = pr.split("/")[0];
  }
  if(pr.split("₹").length > 1){
    pr = pr.split("₹")[1].trim();
  }
  if(pr.split("र").length > 1){
    pr = pr.split("र")[1].trim();
  }
  pr = pr.split(",").join("").trim();
  pr = parseFloat(pr);
  return pr;

}

testAllowed = 0;

function getTestResults(data, passBack){
  testAllowed = data;
  // console.log("Data received " + data);
  if(data==1){
   startNewSearch();
 }
 else {
     // console.log("New Search not allowed");
   }
 }

 function showTestResults(results, indexSelected, posSpecs, posResults, url){
  // console.log(results);
  // return;
  resultsShow = JSON.parse(results);
  if(resultsShow.length > 0){

    $(".hk-yellow-bar-main-div").css("display","block");
    $("#newSearch").css("display","");
    $(".hk-yellow-bar-comp-link").attr("href", url);
    var title = getProd();
    title = title.split("(")[0];
    var titleS = title.split(" ");
    if(titleS.length<5){
      title = titleS.join("-");
    }
    else {
      title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
    }
    if($(".hk-cBBuy-toolTip__container").length > 0){
      document.querySelectorAll(".hk-tot-cmp-no")[1].innerHTML = resultsShow.length;
      var cloneCmpLi = $('#newSearch .hk-cBMore__results li')[0];
      $("#newSearch .hk-cBMore__results li").remove();
      for(var l=0;l<resultsShow.length;l++){
        var cloneAppend3 = cloneCmpLi.cloneNode("true");
        $("#newSearch .hk-cBMore__results").append(cloneAppend3);
        var price_each = resultsShow[l].price;
        var link_each = resultsShow[l].link;
        var image_each = resultsShow[l].image;
        var pos_each = resultsShow[l].position;
        if(getCurrentPosition(window.location.href) == 129 && resultsShow[l].position == 129){
          if(image_each.split("http://").length > 1){
            image_each = image_each.split("http://");
            image_each = "https://"+image_each[1];
          }
        }
        var prod_each = resultsShow[l].prod;
        var site_img_each = resultsShow[l].site_image;
        if(site_img_each && site_img_each.trim() != "" && site_img_each.split("/images/").length > 1){
          var site_img_each1 = site_img_each.split("/images/")[0];
          var site_img_each2 = site_img_each.split("/images/")[1];
          site_img_each = site_img_each1+"/images/site_icons_m/"+site_img_each2;
          if(site_img_each.split("http://").length > 1){
            site_img_each = site_img_each.split("http://").join("https://");
          }
        }


        var site_name_each = resultsShow[l].site_name;
        var $hkcBMoreResultItem = $("#newSearch .hk-cBMore__results:eq(0) li:eq("+l+")");
        // console.log($hkcBMoreResultItem);
        $hkcBMoreResultItem.attr("data-position", pos_each);

        $hkcBMoreResultItem.find("a").attr("href", link_each);

        var $hkcBMoreResultItemImg = $hkcBMoreResultItem.find(".hk-c-list__img:eq(0)");

        $hkcBMoreResultItemImg.attr("src", image_each);
        $hkcBMoreResultItemImg.attr("title", prod_each);
        $hkcBMoreResultItemImg.attr("alt", prod_each);

        $hkcBMoreResultItem.find(".hk-cBLi__name:eq(0)").text(prod_each);

        $hkcBMoreResultItem.find(".hk-cmp-each-price:eq(0)").text(price_each);

        var $hkcBMoreResultItemStoreImg = $hkcBMoreResultItem.find(".hk-cBLi__storeIco:eq(0)");

        $hkcBMoreResultItemStoreImg.attr("src", site_img_each);
        $hkcBMoreResultItemStoreImg.attr("alt", site_name_each);
        $hkcBMoreResultItemStoreImg.attr("title", site_name_each);
      }
    }
    bringBackCmp();
    // console.log("Done with results");
    hkShowBar();

    $('#newSearch .hk-cBMore__results').parent().animate({scrollTop: 0}, 'fast');

  }
  return;
}


function isAlphaNumeric2(str){
  str = str.replace(/[^\w\s]/gi, '');
  var Exp = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
  var Exp2 = /((^[0-9\s]+[a-z]+)|(^[a-z\s]+[0-9]+))+[0-9a-z\s]+$/i;
  if(str.toUpperCase()==str){
   Exp = Exp2;
 }
 if(!str.match(Exp)){
   return false;
 }
 else{
  return true;
}
}

function startNewSearch(){
  if(testAllowed==1){
    var sendNow =  getCurrentPosition(window.location.href);
    if(typeof(getPID) == 'function' && typeof(getProd) == 'function'){
      // console.log("Called with sendNow "+sendNow);
      if(userSetting!="notYet"){
        // console.log("Called with notYet ");
        if(tabID!=0){
          // console.log("Called with tabSideId "+tabID);
          if(userSetting[0].value==1 && getProd()!=""){
            // console.log("Called with userSetting ");
            var port = chrome.runtime.connect({name: "searchPayloadDataTest" + tabID});

            var myText = getProd();
            var inBrackets = "";
            var actualName = myText;

            while(myText.match(/\(([^)]+)\)/)){
             var complete = myText.match(/\(([^)]+)\)/);
               // console.log(complete);
               var strFound = complete[1];
               var toRemove = complete[0];
               actualName = actualName.split(toRemove).join(" ");
               strFound = strFound.split(",");
               // console.log(strFound);
               for(var q=0;q<strFound.length;strFound++){
                if(isAlphaNumeric2(strFound[q])){
                 inBrackets += strFound[q] + " ";
               }
             }

               // console.log("FOund " + strFound);
               // console.log("inBrackets " + inBrackets);
               myText = myText.substr(complete.index + complete[1].length, myText.length);
             }

             searchKey = actualName + inBrackets + "~*~*" + getPrice();

             var strToSend = searchKey + "~*~*" + sendNow + "~*~*" + getPID();
             port.postMessage({messageData: strToSend});
             port.onMessage.addListener(function(data){
              // console.log("Called with port ");

              // globalSearchFlag = 0;
              if(data.dataBack=="" || data.dataBack=="null" || data.dataBack== null || data.dataBack=="[]"){
                // console.log("No results found - new search");
                var jsonArr = [{'dp': 'No Search Results~*' + getProd() + "--" + getPID()}];
                jsonArr = JSON.stringify(jsonArr);
                sendMessage(0, jsonArr, 0, doNothing, []);
              }
              // console.log("Results " + data.dataBack);
              showTestResults(data.dataBack);
              port.onMessage.removeListener();
            });
           }else{
              // console.log("No results allowed - new search");
              // filterResults("", url);
            }
          }
          else {
            // globalSearchFlag = 0;
            setTimeout(function(){startNewSearch();}, 1000);
          }
        }
        else {
          // globalSearchFlag = 0;
              // console.log("Called with userSetting notYet ");
              setTimeout(function(){startNewSearch();}, 1000);
            }
          }
          else {
            // globalSearchFlag = 0;
    // console.log("Waiting for getPID to be defined");
    setTimeout(function(){startNewSearch();}, 1000);
  }
}

}

function setTestResults(){
 var jsonArr = [{'searchTesting': 'haiKya'}];
 jsonArr = JSON.stringify(jsonArr);
 var passBack = [];
 passBack = JSON.stringify(passBack);
 sendMessage(0, jsonArr, 0, getTestResults, passBack);
}

setTestResults();


function sendMessage(msgType, jsonObj, command, funcName, passBack){
 if (msgType==1){
   if(tabID!=0){
    // console.log("Tab ID is " + tabID + " ~ " + command);
    var port = chrome.runtime.connect({name: "othersPayloadData" + tabID});
    var strToSend = jsonObj + "~*" + command;
    port.postMessage({messageData: strToSend});
    port.onMessage.addListener(function(data){

    // console.log("Plot length" + window.location.href.split("paytm").length);
    if(typeof(funcName)=="function"){
      funcName(data.dataBack, passBack);
    }
    else {
      window[funcName](data.dataBack, passBack);
    }

    port.onMessage.removeListener();
  });
  }
  else {
    setTimeout(function(){sendMessage(msgType, jsonObj, command, funcName, passBack);}, 100);
  }
}
else {
 var jsonData = JSON.parse(jsonObj);
 var L = jsonData.length;
 for (var i = 0; i < L; i++) {
  var obj = jsonData[i];
  for (var j in obj) {
    var toSendKey = (j);
    var toSendVal = (jsonData[i][j]);
  }
}
var args = {};
args[toSendKey] = toSendVal;
  // console.log(toSendKey + " " + toSendVal);
  chrome.runtime.sendMessage(args, function(response) {
    respoObt = response.farewell;
    if(typeof(funcName)=="function"){
      funcName(respoObt, passBack);
    }
    else {
      window[funcName](respoObt, passBack);
    }
  });
}
}
function sendMessagePromise(msgType, jsonObj, command){
  return new Promise(function(resolve, reject){

    if (msgType==1){
      var port = chrome.runtime.connect({name: "othersPayloadData" + tabID});
      var strToSend = jsonObj + "~*" + command;
      port.postMessage({messageData: strToSend});
      port.onMessage.addListener(function(data){
        port.onMessage.removeListener();
        resolve(data.dataBack);
      });
    }
    else {
      var jsonData = JSON.parse(jsonObj);
      var L = jsonData.length;
      for (var i = 0; i < L; i++) {
        var obj = jsonData[i];
        for (var j in obj) {
          var toSendKey = (j);
          var toSendVal = (jsonData[i][j]);
        }
      }
      var args = {};
      args[toSendKey] = toSendVal;
      chrome.runtime.sendMessage(args, function(response) {
        respoObt = response.farewell;
        resolve(respoObt);
      });
    }
  });
}

function sendSearchMessage(searchKey, url){
  if(globalSearchFlag == 0){
    globalSearchFlag = 1;
    // console.log("Called with " + searchKey);
    $(".hk-bringBackCompBar").removeClass("hk-bringBackCompBar--show");

    var sendNow =  getCurrentPosition(window.location.href);
    if(typeof(getPID) == 'function' && typeof(getProd) == 'function'){
      // console.log("Called with sendNow "+sendNow);
      if(userSetting!="notYet"){
        // console.log("Called with notYet ");
        if(tabID!=0){
          // console.log("Called with tabSideId "+tabID);
          if(userSetting[0].value==1 && getProd()!=""){
            // console.log("Called with userSetting ");
            var port = chrome.runtime.connect({name: "searchPayloadData" + tabID});
            if(sendNow==1){
              searchKey = getProd() + "~*~*" + getPrice();
            }
            var strToSend = searchKey + "~*~*" + sendNow + "~*~*" + getPID();
            port.postMessage({messageData: strToSend});
            port.onMessage.addListener(function(data){
              // console.log("Called with port ");

              globalSearchFlag = 0;
              if(data.dataBack=="" || data.dataBack=="null" || data.dataBack== null || data.dataBack=="[]"){
                var jsonArr = [{'dp': 'No Search Results~*' + getProd() + "--" + getPID()}];
                jsonArr = JSON.stringify(jsonArr);
                sendMessage(0, jsonArr, 0, doNothing, []);
              }
              filterResults(data.dataBack, url, 1);
              port.onMessage.removeListener();
            });
          }else{
              // console.log("Called with empty filter ");
              filterResults("", url);
            }
          }
          else {
            globalSearchFlag = 0;
            setTimeout(function(){sendSearchMessage(searchKey, url);}, 1000);
          }
        }
        else {
          globalSearchFlag = 0;
              // console.log("Called with userSetting notYet ");
              setTimeout(function(){sendSearchMessage(searchKey, url);}, 1000);
            }
          }
          else {
            globalSearchFlag = 0;
    // console.log("Waiting for getPID to be defined");
    setTimeout(function(){sendSearchMessage(searchKey, url);}, 1000);
  }
}
}

function changeCompURL(url){
  if($(".hk-yellow-bar-comp-link").length > 0){
    $(".hk-yellow-bar-comp-link").attr("href", url);
  }
  return;
}

function sendSearchMessageNew(searchKey, cat_id, url){
 if(globalSearchFlag == 0){
  globalSearchFlag = 1;
  $(".hk-bringBackCompBar").removeClass("hk-bringBackCompBar--show");

  // console.log("Called with1 " + searchKey + "~and~" + cat_id);
  var sendNow =  getCurrentPosition(window.location.href);
  if(typeof(getPID) == 'function' && typeof(getProd) == 'function'){
    if(userSetting!="notYet"){
      if(tabID!=0){
        if(userSetting[0].value==1 && getProd()!=""){
          var port = chrome.runtime.connect({name: "searchPayloadDataNew" + tabID});
          var queryObj = {};
          if(cat_id==0||cat_id==1){
           queryObj['query'] = getProd();
           queryObj['price'] = getPrice();
           queryObj['pos'] = sendNow;
           queryObj['original'] = searchKey;
           queryObj['category'] = cat_id;
           queryObj['PID'] = getPID();
         }
         else {
          // console.log("Returning");
          return;
        }
        port.postMessage({messageData: JSON.stringify(queryObj)});
        port.onMessage.addListener(function(data){
          globalSearchFlag = 0;

          // console.log("Data rec " + data.dataBack);
          if(data.dataBack=="" || data.dataBack=="null" || data.dataBack=="[]"){
            var jsonArr = [{'dp': 'No Search Results~*' + getProd() + "--" + getPID()}];
            jsonArr = JSON.stringify(jsonArr);
            sendMessage(0, jsonArr, 0, doNothing, []);
          }
          // console.log("calling filterResults1: ", data.dataBack);

          filterResults(data.dataBack, url, 1);
          port.onMessage.removeListener();
        });
      }else{
        filterResults("", url);
      }
    }
    else {
      globalSearchFlag = 0;
      setTimeout(function(){sendSearchMessageNew(searchKey, cat_id, url);}, 1000);
    }
  }
  else {
    globalSearchFlag = 0;
    setTimeout(function(){sendSearchMessageNew(searchKey, cat_id, url);}, 1000);
  }
}
else {
  globalSearchFlag = 0;
  // console.log("Waiting for getPID to be defined");
  setTimeout(function(){sendSearchMessageNew(searchKey, cat_id, url);}, 1000);
}
}
}

function setWatchListArray(data, passBack){
  watchListArray = data;
}

function setUserSettings(data, passBack){
  userSetting = JSON.parse(data);

}

function setEmail(data, passBack){
  email = data;
  addEmailToBase();
}

function doNothing(data, passBack){
  // Just do nothing !!
}

function wholeUnitMatch(target_str, unit){
 target_str_tokens = target_str.toLocaleLowerCase().split(" ");
 var flag = false;
 target_str_tokens.forEach(function(item){
  if(item == unit)
   flag = true;
});
 return flag;
}

function getUpdatedAlertList(){
   // Gets all current alerts list
   var jsonArr = [{'detailArray': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setWatchListArray, passBack);
 }

 getUpdatedAlertList();

 function getIxigoVar(){
   // Gets all current alerts list
   var jsonArr = [{'ixigoVar': 'deDo'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setIxigoVar, passBack);
 }

 function sendEcomm(){
   // Gets all current alerts list
   var jsonArr = [{'eccomVisit': 'logIT'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, doNothing, passBack);
 }

 function sendToken(cl_id){
   // Gets all current alerts list
   var jsonArr = [{'sentClient_Id': cl_id}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, doNothing, passBack);
 }

 function setIxigoVar(data, passBack){
  localStorage.lastTime = data;
}

getIxigoVar();

function sendIxigoVar(){
   // Gets all current alerts list
   var jsonArr = [{'ixigoVarSet': Math.floor(Date.now() / 1000)}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, doNothing, passBack);
 }

 function getUpdatedUserSettings(){
   // Gets all current alerts list
   var jsonArr = [{'userSetting': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setUserSettings, passBack);
 }

 getUpdatedUserSettings();

 function getEmail(){
   // Gets all current alerts list
   var jsonArr = [{'email': 'haiKya'}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, setEmail, passBack);
 }

 getEmail();

 function compare(a,b) {
  if (parseInt(a.price) < parseInt(b.price))
   return -1;
 if (parseInt(a.price) > parseInt(b.price))
  return 1;
return 0;
}

function getXMLHTTPRequest() {

  req = new XMLHttpRequest();
  return req;

}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
  }
  return "";
}

// console.log("Cookie is " + getCookie('bhInfV_cl_id'));

function rePlot(){
  $('.hk-sTab__graph').highcharts({
    chart: {
     type: 'areaspline',
     backgroundColor: '#fff',
     spacing: [10, 10, 10, 0],
     plotBorderColor: '#c0c0c0'
   },
   title: {
     text: 'Should I purchase ' + prodNameUni.substring(0,34) + " now ?",
     align: 'left',
     x: 15
   },
   plotOptions: {
     line: {
      dataLabels: {
       enabled: !1
     },
     enableMouseTracking: !0
   },

   series: {
    allowPointSelect: true,
    marker: {
     enabled: true
   },

   states: {
     hover: {
      lineWidthPlus: 0
    }
  },
}
},
xAxis: {
 type: 'datetime',
				dateTimeLabelFormats: { // don't display the dummy year
       month: '%e. %b',
       year: '%b'
     }
   },
   yAxis: {

     gridLineColor: '#ccc',
     gridLineDashStyle: 'dash',
     title: {
       text: 'Price (INR)'
     },
     min: 0
   },
   tooltip: {
     crosshairs: true,
     shared: true,
     formatter: function() {
      // console.log("Series name " + this.points[0].series.name);
      if(this.points[0].series.name.split("Popularity").length>1){
       var unitHere = "";
     }
     else {
       var unitHere = "Rs."
     }
     return '<b>'+ this.points[0].series.name +'</b><br/>'+
     Highcharts.dateFormat('%e. %b', this.x) +': ' + unitHere + this.y;
   }
 },



 series: [{
   name: siteNameUni + ' Price',
   data: dataStringUni,
   color: '#1e88e5',


   marker: {
    enabled: true,
    radius: 2.5
  },
  fillOpacity: .1
},{
 name: siteNameUni + ' Popularity',
 data: dataStringUni2,
 color: '#1e88e5',

 marker: {
  enabled: true,
  radius: 2.5
},
fillOpacity: .1
}]
});

  hideAndShow('.hk-sTab__graph', 1, 0);


  $(".highcharts-series").hover(function(){
    if(check_hover_graph == 0){
      var jsonArr = [{'dp': "Graph hover side ~*" + window.location.hostname}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(0, jsonArr, 0, doNothing, []);
      check_hover_graph = 1;
      tracer(0,1);
      setTimeout(function(){if(JSON.parse(features_json)[2]==0){ft(2);}},100);
    }
  });

}


function removeTags(length2){
  $('tspan:eq(' + length2 + ')').css("display", "none");
}

function hideAndShow(classTM, index, flag){
  if(flag==0){
    $(classTM).highcharts().series[index].hide();
  }
  else {
    $(classTM).highcharts().series[index].show();
  }

}

function plotGraph(data, passBack){
  // return;
  // console.log("plotGraph was called");
  if(data != undefined && data.trim() != ""){
    null_data = "~*~*&~&~100&~&~100&~&~100";
    null_data_len = null_data.length;

    null_data2 = "&~&~100&~&~100&~&~100";
    null_data_len2 = null_data2.length;
    if(data.trim() == null_data2 || data.trim() == null_data){
      $(".hk-main-graph").css("display", "none");
      $("#container2").css("display", "none");
      $("#container4").css("display", "none");
      $("#chart-logo").css("display", "none");
      return;
    }
  //console.log("actual data is-" + data.trim() + "-ends here");
  //console.log(data.trim() == "");
  // console.log("actual data is-" + data.trim() + "-ends here");
  globalGraphData = data;
  graphDataFetched = 1;
  var passedData = JSON.parse(passBack);
  var prodName = passedData[0].title;
  var siteName = passedData[0].siteName;
  var currentPrice = passedData[0].price;
  if(currentPrice=="" || currentPrice==0 || currentPrice == undefined){
    var flagPrice = 0;
  }
  else {
    var flagPrice = 1;
  }
  var mytext = data.trim();
  var dataString = [];
  dataPop = [];
  var predScores = mytext.split("&~&~");
  $(".hk-main-graph").css("display","block");
  $(".hk-main-settings").css("display","block");

  if(flagPrice==0 && ( data == undefined || data.trim() == "" || data.trim().length == null_data_len )){
    $(".yeHaiUnique").css("display", "none");
    $('#chart-logo').html("");
    $('#container2').html("");
    $('#container3').html("");
    $('#container4').html("");
  }
  else if(flagPrice==1&& ( data == undefined || data.trim() == "" || data.trim().length == null_data_len || data.trim().length == null_data_len2 )){
    predScores[0] = "";
    predScores[1] = 100;
    predScores[2] = 100;
    predScores[3] = 100;
  }
  var score1 = predScores[1];
  if(score1 < 50){
    var class1 = "hk-pred-low";
    var extra1 = "It is just " + score1 + "% good to go for it today. Price is expected to fall soon. Set a price drop alert to avail it at lowest price";
    var text1a = "High Chance of Price Drop";
    var text2a = "You can wait for price to fall";
  }
  else if(score1 < 65 && score1 >=50){
    var class1 = "hk-pred-medium";
    var extra1 = "Price may fall down in next 2-3 days. However, if you need it real hard, you can go for it. You can set a price drop alert otherwise!";
    var text1a = "Medium Chance of Price Drop";
    var text2a = "You can either buy now or wait for price to fall";
  }
  else {
    var class1 = "hk-pred-high";
    var extra1 = "Price will change very minutely in next 2-3 days. so, you can go for it today!";
    var text1a = "Low Chance of Price Drop";
    var text2a = "You can buy the product now";
  }
  var score2 = predScores[2];
  if(score2 < 50){
    var class2 = "hk-pred-low";
    var extra2 = "It is just " + score2 + "% good to go for it today. Price is expected to fall within 1 week. Set a price drop alert to avail it at lowest price.";
    var text1b = "High Chance of Price Drop";
    var text2b = "You can wait for price to fall";
  }
  else if(score2 < 65 && score2 >=50){
    var class2 = "hk-pred-medium";
    var extra2 = "Price may fall down within 1 week. We recommend you to set an alert and wait for price to fall down .However, if you need it real hard, you can go for it!";
    var text1b = "Medium Chance of Price Drop";
    var text2b = "You can either buy now or wait for price to fall";
  }
  else {
    var class2 = "hk-pred-high";
    var extra2 = "Price will change very minutely in next 1 week. so, you can go for it today!";
    var text1b = "Low Chance of Price Drop";
    var text2b = "You can buy the product now";
  }
  var score3 = predScores[3];
  if(score3 < 50){
    var class3 = "hk-pred-low";
    var extra3 = "It is just " + score3 + "% good to go for it today. Price is expected to fall in one month for sure. Set a price drop alert to avail it at lowest price";
    var text1c = "High Chance of Price Drop";
    var text2c = "You can wait for price to fall";
  }
  else if(score3 < 65 && score3 >=50){
    var class3 = "hk-pred-medium";
    var extra3 = "Price may fall down in next 1 month. We recommend you to set an alert and wait for price to fall down!";
    var text1c = "Medium Chance of Price Drop";
    var text2c = "You can either buy now or wait for price to fall";
  }
  else {
    var class3 = "hk-pred-high";
    var extra3 = "Price will change very minutely in next 1 month as it is already selling at a good price. So, you can go for it today!";
    var text1c = "Low Chance of Price Drop";
    var text2c = "You can buy the product now";
  }

  $(".hk-prediction-score").attr("data-score1", score1+"~~"+text1a+"~~"+text2a);
  $(".hk-prediction-score").attr("data-score2", score2+"~~"+text1b+"~~"+text2b);
  $(".hk-prediction-score").attr("data-score3", score3+"~~"+text1c+"~~"+text2c);

  if(typeof(score1) != "undefined" && $(".hk-dd__select").length > 0 && $(".hk-dd__select").val().trim() == "23days"){
    plotScorePred(score1, text1a, text2a);
  }
  else if(typeof(score2) != "undefined" && $(".hk-dd__select").length > 0 && $(".hk-dd__select").val().trim() == "inAWeek"){
    plotScorePred(score2, text1b, text2b);
  }
  else if(typeof(score3) != "undefined" && $(".hk-dd__select").length > 0 && $(".hk-dd__select").val().trim() == "inAMonth"){
    plotScorePred(score3, text1c, text2c);
  }

  if(predScores[0].trim()!=""){
    var compList = predScores[0].split("~*~*");
  }
  else {
   var compList = "";
 }
 var today = new Date();
 var dd = today.getDate();
 var mm = today.getMonth();
 var yyyy = today.getFullYear();
 var pointFound = 0;
 var mini_price = 999999999999;
 var max_price = 0;
 var diff_max = 0;
 var aver_price = 0;
 var curDateString = yyyy + "-" + mm + "-" + dd;
 for(k=0;k<compList.length-1;k++){
  dateC = compList[k].split("~")[0];
  var price = compList[k].split("~")[1];
  if(parseFloat(price) < mini_price && parseInt(price) != 0){
    mini_price = parseFloat(price);
  }
  if(parseFloat(price) > max_price && parseInt(price) != 0){
    max_price = parseFloat(price);
  }
  aver_price += parseInt(price);
    // console.log("Place 3 " + price);
    dateC2 = dateC.split(" ")[0];
    dateS = dateC2.split("-");
    year = dateS[0];
    month = dateS[1] - 1;
    date = dateS[2];

    if(flagPrice==0){
      currentPrice = getPrice();
      if(currentPrice=="" || currentPrice==0 || currentPrice == undefined){
        flagPrice = 0;
      }
      else {
        flagPrice = 1;
      }
    }
    // console.log("FlagPrice is " + flagPrice);
    // console.log("Place 3 " + price);
    if(flagPrice==1 && parseInt(dd)==parseInt(date) && parseInt(mm)==parseInt(month) && parseInt(yyyy)==parseInt(year)){
      price = parseInt(currentPrice);
      pointFound = 1;
    }

    if(month==0){
      //month = 12;
    }


    dataString.push([Date.UTC(parseInt(year), parseInt(month) , parseInt(date)), parseInt(price)]);
    dataPop.push([Date.UTC(parseInt(year), parseInt(month) , parseInt(date)), 0]);
    // console.log("Place 1 " + price);
  }
  if(getPrice()!="" && parseFloat(getPrice())!=0){
    if(parseFloat(getPrice()) < mini_price){
      mini_price = parseFloat(getPrice());
    }
  }
  if(mini_price != 999999999999 && mini_price != 0){
    var $hkMaxDiffWrap = $(".hk-graph-max-diff__wrapper");
    $(".hk-graph-min-price").text(mini_price);
    diff_max = parseInt(price) - parseInt(mini_price);
    if (diff_max === 0){
      $hkMaxDiffWrap.html('(This product is at the lowest price at this store)');
    }
    else{
      $hkMaxDiffWrap.html(`(lower than the current price by &#8377;<span class="hk-graph-max-diff">${diff_max}</span>)`);
    }
  }
  else{
    $(".hk-graph-min-price").parent().parent().parent().css("display", "none");
    $(".hk-graph-max-diff").parent().parent().parent().css("display", "none");
  }
  if(compList.length-1 > 0){
    aver_price = aver_price/dataString.length;
    aver_price = Math.round(aver_price * 100) / 100;
    $(".hk-graph-avg").text(aver_price);
  }
  else{
    $(".hk-graph-avg").text("Unknown");
  }
  if(pointFound==0 && flagPrice==1){
    dataString.push([Date.UTC(parseInt(yyyy), parseInt(mm) , parseInt(dd)), parseInt(currentPrice)]);
    dataPop.push([Date.UTC(parseInt(year), parseInt(month) , parseInt(date)), 0]);
    // console.log("Place 2 " + price);
  }
  prodNameUni = prodName;
  siteNameUni = siteName;
  dataStringUni = dataString;
  dataStringUni2 = dataPop;
//dataString = dataString + "]";
if (!!$('.hk-sTab__graph')[0]) {
	chart2Handle = $('.hk-sTab__graph').highcharts({ // this chart is different.. has some hover effect & all.. also the color scheme is pretty keeewl.. forgot what i added. :(
		chart: {
			type: 'areaspline',
			backgroundColor: '#fff',
			spacing: [10, 10, 10, 0],
			plotBorderColor: '#c0c0c0'
		},
		title: {
			text: 'Should I purchase ' + prodName.substring(0,34) + " now ?",
			align: 'left',
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: !1
				},
				enableMouseTracking: !0
			},

			series: {
				allowPointSelect: true,
				marker: {
					enabled: true
				},

				states: {
					hover: {
						lineWidthPlus: 0
					}
				},
			}
		},
		xAxis: {
			type: 'datetime',
				dateTimeLabelFormats: { // don't display the dummy year
				month: '%e. %b',
				year: '%b'
      }
    },
    yAxis: {
     gridLineColor: '#ddd',
     title: {
       text: 'Price (INR)'
     },
     min: 0
   },
   tooltip: {
     crosshairs: true,
     shared: true,
     formatter: function() {
      // console.log("Series name " + this.points[0].series.name);
      if(this.points[0].series.name.split("Popularity").length>1){
       var unitHere = "";
     }
     else {
       var unitHere = "Rs."
     }
     return '<b>'+ this.points[0].series.name +'</b><br/>'+
     Highcharts.dateFormat('%e. %b', this.x) +': ' + unitHere + this.y;
   }
 },

 series: [{
   name: siteName + ' Price',
   data: dataString,
   color: '#1e88e5',

   marker: {
    enabled: true,
    radius: 2.5
  },
  fillOpacity: .1
},{
 name: siteName + ' Popularity',
 data: dataPop,
 color: '#1e88e5',

 marker: {
  enabled: true,
  radius: 2.5
},
fillOpacity: .1
}]
});
  getPopData();
}

dataPopTemp = [];
function plotPopularity(data, passBack){
 dataPop = [];
 dataPopTemp = JSON.parse(data);
    // dataPopTemp = JSON.stringify(dataPopTemp);
    // console.log("Called with " + dataPopTemp[0]);
    // if(chart1Handle){
     if(dataPopTemp[0].flag==0){
      if($('.contBHMain').highcharts()){
        $('.contBHMain').highcharts().series[1].remove();
      }
      if($('.hk-sTab__graph').highcharts()){
        $('.hk-sTab__graph').highcharts().series[1].remove();
      }
         // chart2Handle.series[1].remove();
         // console.log("Remoig");
       }
       else {
          // console.log("Updating dataPop");
          dataPop = [];
          for(var k=dataPopTemp.length-1;k>=0;k--){
              // console.log(dataPopTemp[k]);
              dateC2 = dataPopTemp[k].date.split(" ")[0];
              dateS = dateC2.split("-");
              year = dateS[0];
              month = dateS[1] - 1;
              date = dateS[2];
              dataPop.push([Date.UTC(parseInt(year), parseInt(month) , parseInt(date)), dataPopTemp[k].pop]);

            }
            dataStringUni2 = dataPop;
            $('.contBHMain').highcharts().series[1].update({
             data: dataPop
           });
          }
    // }
  }

  function getPopData(){
    var curPosition = getCurrentPosition(window.location.href);
    var jsonArr = [{'pos': curPosition, 'pid': getPID()}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 50, plotPopularity, []);
  }

  function plotGraphBase(){
    // console.log("containerBHMain: "+$('#containerBHMain').length);
    // console.log("container2: "+$('#container2').length);
    // console.log("container4: "+$('#container4').length);
    // console.log("chart: "+$('#chart-logo').length);
    // console.log("contBHMain: "+$('.contBHMain').length);
    if($('#containerBHMain').length>0){
      // console.log("Plot container2 was found");
      if(alertPosition == 1331 || alertPosition == 425){
        $ = jQuery.noConflict();
      }
      chart1Handle  = $('.contBHMain').highcharts({
       chart: {
        type: 'areaspline',
        backgroundColor: '#fff',
        spacing: [10, 10, 10, 0],
        plotBorderColor: '#c0c0c0'
      },
      title: {
        text: 'Should I purchase ' + prodName.substring(0,34) + " now ?",
        align: 'left',
      },
      plotOptions: {
        line: {
         dataLabels: {
          enabled: !1
        },
        enableMouseTracking: !0
      },

      series: {
       allowPointSelect: true,
       marker: {
        enabled: true
      },

      states: {
       hover: {
        lineWidthPlus: 0
      }
    },
  }
},
xAxis: {
  type: 'datetime',
					dateTimeLabelFormats: { // don't display the dummy year
					month: '%e. %b',
					year: '%b'
       }
     },
     yAxis: {
      gridLineColor: '#ddd',
      title: {
        text: 'Price (INR)'
      },
      min: 0
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      formatter: function() {
      // console.log("Series name " + this.points[0].series.name);
      if(this.points[0].series.name.split("Popularity").length>1){
       var unitHere = "";
     }
     else {
       var unitHere = "Rs."
     }
     return '<b>'+ this.points[0].series.name +'</b><br/>'+
     Highcharts.dateFormat('%e. %b', this.x) +': ' + unitHere + this.y;
   }
 },

 series: [{
  name: siteName + ' Price',
  data: dataString,
  color: '#1e88e5',

  marker: {
    enabled: true,
    radius: 2.5
  },
  fillOpacity: .1
},{
  name: siteName + ' Popularity',
  data: dataPop,
  color: '#1e88e5',

  marker: {
    enabled: true,
    radius: 2.5
  },
  fillOpacity: .1
}]
});
      hideAndShow('.contBHMain', 1, 0);
    }
    else {
      // console.log("plotGraphBase was called again");
      setTimeout(plotGraphBase, 500);
    }
  }

  if(localStorage.showGraph != 0){
    // console.log("plotGraphBase was called");
    plotGraphBase();
  }
  else{
    $("#container2").css("display", "none");
    $("#container4").css("display", "none");
    $("#chart-logo").css("display", "none");
  }
  var length2 = $('tspan').length;
  length2 = length2 - 1;
  $(".highcharts-series").hover(function(){
    if(check_hover_graph == 0){
      var jsonArr = [{'dp': 'Graph Hover~*' + window.location.hostname}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(0, jsonArr, 0, doNothing, []);
      check_hover_graph = 1;
      tracer(0,1);
    }
  });
  $(".pg-prediction").hover(function(){
    if(check_hover_pred == 0){
     var jsonArr = [{'dp': 'Prediction Hover~*' + window.location.hostname}];
     jsonArr = JSON.stringify(jsonArr);
     sendMessage(0, jsonArr, 0, doNothing, []);
     check_hover_pred = 1;
   }
 });
  setTimeout("removeTags(" + length2 + ")", 4000);
}
else{
  $("#container2").css("display", "none");
  $("#container4").css("display", "none");
  $("#chart-logo").css("display", "none");
}
}



function prepareGraph(pid, passBack){
  if(userSetting!="notYet"){
    if(userSetting[1].value==1){
      // console.log("Here i am");
      var curPosition = getCurrentPosition(window.location.href);
      var jsonArr = [{'pos': curPosition, 'pid': pid}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(1, jsonArr, 1, plotGraph, passBack);
    }
    else {
      plotGraph("", []);
    }
  }
  else {
   setTimeout(function(){prepareGraph(pid, passBack);}, 1000);
 }
}

testingtesting = 0;

function addGraphBase(passBack) {

  if (userSetting != "notYet") {
    if (userSetting[1].value == 0 && userSetting[6].value == 0 && alertPosition != 1331) {

    }
    else {
      // console.log("addGraphBase was called twic");
      var passedData = JSON.parse(passBack);
      var selectors = JSON.parse(passedData[0].selectors);
      if (passedData[0].height != undefined && typeof(passedData[0].height) != "undefined") {
        var height = passedData[0].height;
      }
      else {
        var height = "750px";
      }
      if (height.split("1050").length > 1) {
        height = "1150px";
      }

      var addedToDOM = 0;
      var imgSet = returnResource("settings.png");
      if($("#containerBHMain").length > 0){
        $("#containerBHMain").remove();
      }
      var hideGraphImg = returnResource("hideGraph.png");
      var stringToAdd = '<div style="clear:both"></div><div id="containerBHMain" class="yeHaiUnique full-width" style=" background: #fff; min-width: 820px; max-width: 960px; height: auto; margin: 0 auto; position: relative;padding:2px;display:block!important;"><div id="chart-logo" style="position: absolute;bottom: 10px;right: 0;font-size: 13px;z-index: 1">Price Chart Powered by<a target="_blank" href="http://compare.buyhatke.com?utm_source=graph" style="color: #0db2db;"><img src="http://compare.buyhatke.com/images/logo-mini.png" style="vertical-align: middle;margin-left: 5px;margin-top: -6px;"></a></div><div id="container2" class="contBHMain"></div><div id="container4" style="padding: 10px;font-family: Open Sans, Arial, Helvetica, sans-serif;"><a href="https://goo.gl/xHV5Yo" target="_blank" class=" hk-u-fSize--small hk-c-links hk-u-margin__0-05" style="text-transform:none"><img src="http://compare.buyhatke.com/images/bug-icon.png" style="vertical-align: bottom;height: 15px;top: -2px;position: relative;">Report A Bug</a><a href="https://goo.gl/xHV5Yo" target="_blank" class=" hk-u-fSize--small hk-c-links hk-u-margin__0-05" style="text-transform:none"><img src="http://compare.buyhatke.com/images/bulb-icon.png" style="vertical-align: bottom;height: 16px;top: -2px;position: relative;">Suggest Us Something</a><a href="https://goo.gl/wpYSpE" target="_blank" class=" hk-u-fSize--small hk-c-links hk-u-margin__0-05" style="text-transform:none"><img src="http://compare.buyhatke.com/images/star-icon.png" style="vertical-align: bottom;height: 16px;top: -2px;position: relative;">Rate Us</a><a href="http://options.buyhatke.com/" target="_blank" class=" hk-u-fSize--small hk-c-links hk-u-margin__0-05" style="text-transform:none"><img src="' + imgSet + '" style="vertical-align: bottom;height: 16px;top: -2px;position: relative;">Customize Buyhatke</a><a id="hideGraph" href="javascript:void();" target="_blank" class=" hk-u-fSize--small hk-c-links hk-u-margin__0-05" style="text-transform:none"><img src="'+hideGraphImg+'" style="vertical-align: bottom;height: 15px;top: -2px;position: relative;">Hide Graph</a></div><div id="container10"> </div></div><div style="clear:both">';
      for (n = 0; n < selectors.length; n++) {
        if ($(selectors[n].selector).length > 0 && addedToDOM == 0) {
          addedToDOM = 1;
          if (selectors[n].attr == "none") {
            if (selectors[n].pos == "after") {
              $(selectors[n].selector).after(stringToAdd);
            }
            else {
              $(selectors[n].selector).before(stringToAdd);
            }
          }
          else if (selectors[n].attr == "parent") {
            if (selectors[n].pos == "after") {
              $(selectors[n].selector).parent().after(stringToAdd);
            }
            else {
              $(selectors[n].selector).parent().before(stringToAdd);
            }
          }
        }
      }
    }

    if(localStorage.showGraph==0){
      $("#container2").css("display", "none");
      $("#container4").css("display", "none");
      $("#chart-logo").css("display", "none");
    }

    if(document.getElementById("hideGraph")){
      document.getElementById("hideGraph").addEventListener("click", function(){
        $("#container2").css("display", "none");
        $("#container4").css("display", "none");
        $("#chart-logo").css("display", "none");
        document.getElementsByClassName("hk-embed-graph")[0].style.display = "block";
        localStorage.showGraph = 0;
        document.getElementsByClassName("hk-embed-text")[0].innerText = "Embed Graph On Page";
      }, false);
    }
  }
  else {
    setTimeout(function(){addGraphBase(passBack)},1000);
  }
}


  // if($('#containerBHMain').length>0){
  //   var button4 = document.getElementById("hideGraph");
  //   if(button4 != null){
  //     button4.addEventListener("click", function(){
  //       setCookie("graphShown", 0, 1000);
  //       $('#containerBHMain').css("display", "none");
  //     }, false);
  //   }
  // }
// function escapeHtml(text) {
//   return text
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/"/g, "&quot;")
//       .replace(/'/g, "&#039;");
// }

function plotScorePred(scoreG, text1G, text2G){
  // console.log("Reached here with text: "+text1G);
  // console.log("Reached here with text2: "+text2G);
  // console.log("Reached here with score: "+scoreG);
  var buy_link = "https://tracking.buyhatke.com/Navigation/?pos="+getCurrentPosition(window.location.href)+"&source=extension&ext1=price-compare&ext2="+ext_id+"&link="+encodeURIComponent(window.location.href);
  $(".hk-sTab__predContent .hk-sTab-pred__title:eq(0)").text(text1G);
  $(".hk-sTab__predContent .hk-u-text--lighter:eq(0)").text(text2G);
  $(".hk-prediction-score").text(100-parseInt(scoreG));
  $(".hk-buy-graph").attr("href", buy_link);
  if(text1G.split("High").length > 1){
    if($(".hk-main-watch.hk-sTab__pw--on").length == 0){
      $(".hk-buy-graph").removeClass("hk-u-vanish");
      $(".hk-buy-graph").addClass("hk-u-vanish");
      $(".hk-graph-wp").removeClass("hk-u-vanish");
    }
    else{
      $(".hk-buy-graph").removeClass("hk-u-vanish");
    }
  }
  else if(text1G.split("Low").length > 1){
    $(".hk-buy-graph").removeClass("hk-u-vanish");
    $(".hk-graph-wp").removeClass("hk-u-vanish");
    $(".hk-graph-wp").addClass("hk-u-vanish");
  }
  else{
    $(".hk-buy-graph").removeClass("hk-u-vanish");
    $(".hk-graph-wp").removeClass("hk-u-vanish");
    $(".hk-graph-wp").addClass("hk-u-vanish");
  }
  return;
}

function prepareDeals(pid, passBack, command){
  if(alertPosition!=2){
    var jsonArr = [{'pid': pid}];
  }
  else {
    var jsonArr = [{'pid': pid, 'selectedFlag': selectedFlag}];
  }
  jsonArr = JSON.stringify(jsonArr);
  if(userSetting!="notYet"){
    if(userSetting[6].value==1){
      sendMessage(1, jsonArr, command, addDeals, passBack);
    }
    else {
      addDeals("", []);
    }
  }
  else {
   setTimeout(function(){prepareDeals(pid, passBack, command);}, 1000);
 }
}

function startCouponProcess(data, passBack){
  var mytext = data;
  ////////console.log("mytext"+mytext);
  if(typeof(mytext) != undefined && mytext!= "undefined"){
   couponInitiate(mytext);
 }
}

function addDeals(data, passBack){
  // alert(data);
  if(data){
    var deals = JSON.parse(data);
    var passedData = JSON.parse(passBack);
    var catName = passedData[0].catName;
    var command = passedData[0].command;
    var linkRules = JSON.parse(passedData[0].affRules);
    var pre = "";
    var post = "";
    switch(command){
      case 2:
      pre = "http://dl.flipkart.com/dl/buyhatke/p/buyhatke?pid=";
      post = "";
      break;
      case 5:
      pre = "http://www.myntra.com/buyhatke-deals/price-drop/product/";
      post = "/buy";
      break;
      case 4:
      pre = "http://www.snapdeal.com/product/buyhatke-deals/";
      post = "?utm_source=aff_prog&utm_campaign=afts&offer_id=17&aff_id=3686&source=dealZone";
      break;
      case 3:
      pre = "http://www.amazon.in/buyhatke-deals/dp/";
      post = "/?tag=buyhatke-21";
      break;
      case 6:
      pre = "http://www.jabong.com/buyhatke-deals-";
      post = ".html";
      break;
      default:
      pre = "";
      post = "";
      break;
    }
  ////////console.log("Pre: "+pre);
  ////////console.log("Post: "+post);
  var dealsText = '<div id="hatke_pricedrops" class="hatke_pricedrops hk-rt-on"><div id="hatke-pd-title"><span>Price Drops in ' +  catName + '</span><a href="#" onclick="return false;" id="hk-pd-close" class="hk-pd-toggle"></a></div> <div id="hatke-pd-wrap"> <div id="hatke-pd-cover"> <nav class="hr-arrows ar-left"> <a onclick="return false;" href="#" class="ar-prev"> <svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"x="0px" y="0px" width="16.801px" height="25px" viewBox="394.64 389.25 16.801 25" xml:space="preserve"> <polygon id="arrow-left-25x25" class="hatke-arrow arrow-left" points="399,414.25 394.64,409.91 402.761,401.75 394.64,393.59 399,389.25 411.441,401.75 "/> </svg> </a> </nav> <div id="hatke-pd-main" class=""> <ul id="hatke-pd-carousel" class="clearfix">';
  for(k=0;k<deals.length;k++){
    var saved = parseFloat(parseFloat(deals[k].mrp) - parseFloat(deals[k].price));
    var link1 = "http://compare.buyhatke.com/deals-landing/from-extension/-hatke" + deals[k].PID;
    var link3 = pre + deals[k].PID2 + post;
    if(linkRules[0].prePart != ""){
      var link2 = linkRules[0].prePart + encodeURIComponent(link3 + linkRules[0].postPart);
    }
    else{
      var link2 = linkRules[0].prePart + link3 + linkRules[0].postPart;
    }
    if(deals[k].link && deals.link!=""){
      link2 = deals[k].link;
    }
    // console.log("Pos is " + getCurrentPosition(window.location.href));
    if(parseInt(getCurrentPosition(window.location.href))==129){
    // console.log("Entered 1");
    if(deals[k].image.split("http://").length > 1){
          // console.log("Entered 2");
          deals[k].image = deals[k].image.split("http://").join("https://");
        }

      }

    // console.log("Link added " + link2);
    dealsText = dealsText + '<li><div class="hk-drop">' + deals[k].perDrop + '</div> <a href="' + link2 + '" style="text-decoration:none;"> <div class="hk-prod-img"> <img src="' + deals[k].image + '" alt="product"/> </div></a> <div class="hk-prod-details clearfix"> <a style="text-decoration:none;" href="' + link2 + '"> <div class="hk-prod-name"> ' + deals[k].prod + ' </div> <div class="hk-price-details"> <div class="hk-prod-price-orig h_webrupee">' + deals[k].mrp + ' </div> <div class="hk-prod-price h_webrupee"> ' + deals[k].price + ' </div> <div class="hk-price-save "> YOU SAVE <span class="h_webrupee"> ' + saved + '</span> </div> </div> </div></a><a href="' + link2 + '" style="text-decoration:none;margin-left:20px;"> <div class="hk-prod-check" style="width: 100px;text-align: center;margin-left: 20px;"> Buy </div> </a> </li>';
  }

  dealsText = dealsText + '</ul> </div> <nav class="hr-arrows ar-right" style="margin-top:-310px;"> <a href="#" onclick="return false;" class="ar-next"> <svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"x="0px" y="0px" width="16.801px" height="25px" viewBox="394.64 389.25 16.801 25" xml:space="preserve"> <polygon id="arrow-right-25x25" class="hatke-arrow arrow-right" points="399,414.25 394.64,409.91 402.761,401.75 394.64,393.59 399,389.25 411.441,401.75 "/></svg></a></nav></div></div></div>';
  if(k!=0){
    document.getElementById('container10').innerHTML = dealsText;
    $('#hatke-pd-carousel').simplecarousel({
      next: $('.ar-next'),
      prev: $('.ar-prev'),
      slidespeed: 700,
      auto: 0,
      width: 180,
      height: 406,
      visible:5
    });
    if(getCookie("dealsHide")==1){
      $('#hatke_pricedrops').toggleClass("hk-rt-on");
    }
    else {
      $(".hatke-pd-cover").hover(function(){
        if(check_hover_deals == 0){
         var jsonArr = [{'dp': 'DealsExt Hover~*' + window.location.hostname}];
         jsonArr = JSON.stringify(jsonArr);
         sendMessage(0, jsonArr, 0, doNothing, []);
         check_hover_deals = 1;
       }
     });
    }
    $('.hk-pd-toggle').click(function(){
      $(this).parent().parent().toggleClass("hk-rt-on");
      if(!$('#hatke_pricedrops').hasClass("hk-rt-on")){
        setCookie("dealsHide", 1, 200);
        var jsonArr = [{'dp': 'Deals Deactivated~*' + window.location.hostname}];
        jsonArr = JSON.stringify(jsonArr);
        sendMessage(0, jsonArr, 0, doNothing, []);
      }
      else {
        setCookie("dealsHide", 0, 200);
        var jsonArr = [{'dp': 'Deals Activated~*' + window.location.hostname}];
        jsonArr = JSON.stringify(jsonArr);
        sendMessage(0, jsonArr, 0, doNothing, []);
      }
    });
  }
}
}


function addToWatchListGen(prod, price, image, url, pos, cat){
 var parameters =  encodeURIComponent(prod) + "~*~*" + price + "~*~*" + encodeURIComponent(image) + "~*~*" + encodeURIComponent(url) + "~*~*" + pos ;
 // var parameters =  encodeURIComponent(prod) + "~*~*" + price + "~*~*" + encodeURIComponent(image) + "~*~*" + encodeURIComponent(url) + "~*~*" + pos + "~*~*" + encodeURIComponent(cat) ;
 var jsonArr = [{data : parameters}];
 jsonArr = JSON.stringify(jsonArr);
 sendMessage(0, jsonArr, 0, doNothing, []);
 setTimeout("getUpdatedAlertList()", 4000);
 var jsonArr = [{'dp': 'Price Alert Set~*' + window.location.hostname}];
 jsonArr = JSON.stringify(jsonArr);
 sendMessage(0, jsonArr, 0, doNothing, []);
//tracer

tracer(1,0);
setTimeout(function(){if(JSON.parse(features_json)[1]==0){ft(1);}},100);

}

var price1min = 100;
var price2min = 500;
var price3min = 1000;
function setSuggestions(){
  if(typeof(getPrice) == 'function' && !isNaN(getPrice()) && getPrice() != 0 ){
    // console.log("Entered here setSugg");
    $(".hk-sTabDropInput__wrapper").css("display", "block");
    var pricemin = getPrice();
    price1min = Math.round(pricemin - (0.25 * pricemin));
    price2min = Math.round(pricemin - (0.20 * pricemin));
    price3min = Math.round(pricemin - (0.10 * pricemin));
    $(".hk-suggest-1").text(price1min);
    $(".hk-suggest-1").parent().attr("data-ttval", price1min);
    $(".hk-suggest-2").text(price2min);
    $(".hk-suggest-2").parent().attr("data-ttval", price2min);
    $(".hk-suggest-3").text(price3min);
    $(".hk-suggest-3").parent().attr("data-ttval", price3min);
  }
  else if(typeof(getPrice) == 'function' && !isNaN(getPrice()) && getPrice() == 0 ){
   $(".hk-sTabDropInput__wrapper").css("display", "none");
 }
 else{
  setTimeout(setSuggestions, 500);
}
return;
}

function setPriceMinimum(set_min){
  var currentURL = window.location.href;
  if(parseInt(alertPosition) == 99){
    currentURL = getInfiURL();
  }
  for(m=0;m<watchListArray.length;m++){
    var url2 = watchListArray[m].link;
    if(returnPID(url2)==returnPID(currentURL)&&returnPID(url2)!=0){
      sendId = watchListArray[m].link_id;
      var jsonArr = [{'link_id': sendId, 'platform': 0, 'price_not': set_min }];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(1, jsonArr, 34, alertSetMinPrice, []);
      break;
    }
  }
  return;
}

function alertSetMinPrice(data, passBack){
	hkOpenModal('hk-priceDropWhen');
}

function removeAlert(){
  // hkRemoveFromPriceWatch();
  var currentURL = window.location.href;
  if(parseInt(alertPosition) == 99){ //infi spcl case
    currentURL = getInfiURL();
  }
  for(m=0;m<watchListArray.length;m++){
    var url2 = watchListArray[m].link;
    if(returnPID(url2)==returnPID(currentURL)&&returnPID(url2)!=0){
      sendId = watchListArray[m].link_id;
      var jsonArr = [{'removeURL': sendId}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(0, jsonArr, 0, doNothing, []);
      setTimeout("getUpdatedAlertList()", 4000);
      var jsonArr = [{'dp': 'Alert Removed ~*' + window.location.hostname}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(0, jsonArr, 0, doNothing, []);
    }
  }
}

var callCount = 5;
function sendInt(){
  if(typeof(getProd) == 'function' && getProd()!=""){
    if(getCookie('bhInfV_cl_id')!=""){
      sendToken(getCookie('bhInfV_cl_id'));
    }
    var prod = getProd();
    var price = getPrice();
    var cat = getBreadCrumb();
    cat = encodeURIComponent(cat);
    var cl_id = getCookie('bhInfV_cl_id');
    if(cl_id && cl_id.length==50){

    }
    else {
      // console.log("Test failed, returning");
      return;
    }
    if(window.location.href.split('amazon.in').length > 1){
     alertPosition = 63;
   }
   var webPos = alertPosition;
   var url = window.location.href;
   var image = getImage();
   if(cl_id!="" && (prod!='' || cat!='')){
    fetch('https://tracking.buyhatke.com/universalLog/?client_id=' + cl_id + '&type=log&action=pageBrowse&breadcrumb=' + cat + '&prod=' + encodeURIComponent(prod) + '&price=' + price + "&webPos=" + webPos + "&url=" + encodeURIComponent(url) + "&image=" + image).then(function(response) {
      return response.json();
    }).then(function(j) {
         //console.log(j);
       });
  }
}
else {
 if(callCount >0){
  callCount--;
  setTimeout(function(){sendInt();}, 2000);
}
}
}

sendInt();


function getCurrentPosition(siteName){
  var pos = 0;
  siteName = siteName.toUpperCase();
  if(siteName.split("AMAZON.COM").length>1){
   pos = 0;
   cur_site = "Amazon.com";
 }
 else if(siteName.split("EBAY.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
   pos = 1;
   cur_site = "Ebay";
 }
 else if(siteName.split("FLIPKART.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FLIPKART").length>1)){
   pos = 2;
   cur_site = "Flipkart";
 }
 else if(siteName.split("HOMESHOP18.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("HOMESHOP").length>1)){
   pos = 4;
   cur_site = "HomeShop18";
 }
 else if(siteName.split("KOOVS.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("KOOVS").length>1)){
   pos = 22;
   cur_site = "Koovs";
 }
 else if(siteName.split("SHOPPERSSTOP.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("SHOPPERSSTOP").length>1)){
   pos = 45;
   cur_site = "ShoppersStop";
 }
 else if(siteName.split("JABONG.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("JABONG").length>1)){
   pos = 50;
   cur_site = "Jabong";
 }
 else if(siteName.split("LENSKART.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("LENSKART").length>1)){
   pos = 57;
   cur_site = "Lenskart";
 }
 else if(siteName.split("INDIARUSH.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("INDIARUSH").length>1)){
   pos = 62;
   cur_site = "Indiarush";
 }
 else if(siteName.split("AMAZON.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("AMAZON").length>1)){
   pos = 63;
   cur_site = "Amazon";
 }
 else if(siteName.split("FASHIONARA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FASHIONARA").length>1)){
   pos = 98;
   cur_site = "Fashionara";
 }
 else if(siteName.split("INFIBEAM.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("INFIBEAM").length>1)){
   pos = 99;
   cur_site = "Infibeam";
 }
 else if(siteName.split("MYNTRA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("MYNTRA").length>1)){
   pos = 111;
   cur_site = "Myntra";
 }
 else if(siteName.split("SNAPDEAL.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("SNAPDEAL").length>1)){
   pos = 129;
   cur_site = "Snapdeal";
 }
 else if(siteName.split("BOOKS.REDIFF.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("BOOKS.REDIFF").length>1)){
   pos = 1037;
   cur_site = "RediffBooks";
 }
 else if(siteName.split("REDIFF.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("REDIFF").length>1)){
   pos = 291;
   cur_site = "Rediff";
 }
 else if(siteName.split("PEPPERFRY.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("PEPPERFRY").length>1)){
   pos = 333;
   cur_site = "Pepperfry";
 }
 else if(siteName.split("PURPLLE.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("PURPLLE").length>1)){
   pos = 900;
   cur_site = "Purplle";
 }
 else if(siteName.split("CROMA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("CROMA").length>1)){
   pos = 71;
   cur_site = "Croma";
 }
 else if(siteName.split("GRABMORE.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("GRABMORE").length>1)){
   pos = 411;
   cur_site = "Grabmore";
 }
 else if(siteName.split("CRAFTSVILLA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("CRAFTSVILLA").length>1)){
   pos = 412;
   cur_site = "Craftsvilla";
 }
 else if(siteName.split("SHOPCLUES.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("SHOPCLUES").length>1)){
   pos = 421;
   cur_site = "Shopclues";
 }
 else if(siteName.split("SHOPNINETEEN.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("SHOPNINETEEN").length>1)){
   pos = 422;
   cur_site = "Shopnineteen";
 }
 else if(siteName.split("CBAZAAR.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("CBAZAAR").length>1)){
   pos = 423;
   cur_site = "Cbazaar";
 }
 else if(siteName.split("LIMEROAD.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("LIMEROAD").length>1)){
   pos = 424;
   cur_site = "Limeroad";
 }
 else if(siteName.split("ZOVI.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("ZOVI").length>1)){
   pos = 425;
   cur_site = "Zovi";
 }
 else if(siteName.split("BLUESTONE.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("BLUESTONE").length>1)){
   pos = 426;
   cur_site = "BlueStone";
 }
 else if(siteName.split("VOYLLA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("VOYLLA").length>1)){
   pos = 427;
   cur_site = "Voylla";
 }
 else if(siteName.split("CHUMBAK.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("CHUMBAK").length>1)){
   pos = 902;
   cur_site = "Chumbak";
 }
 if(siteName.split("ZOMATO.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("ZOMATO").length>1)){
   pos = 2050;
   cur_site = "Zomato";
 }
 else if(siteName.split("DONEBYNONE.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("DONEBYNONE").length>1)){
   pos = 428;
   cur_site = "DoneByNone";
 }
 else if(siteName.split("ZIVAME.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("ZIVAME").length>1)){
   pos = 429;
   cur_site = "Zivame";
 }
 else if(siteName.split("N-GAL.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("N-GAL").length>1)){
   pos = 430;
   cur_site = "N-Gal";
 }
 else if(siteName.split("PRETTYSECRETS.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("PRETTYSECRETS").length>1)){
   pos = 433;
   cur_site = "Pretty Secrets";
 }
 else if(siteName.split("MIRRAW.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("MIRRAW").length>1)){
   pos = 435;
   cur_site = "Mirraw";
 }
 else if(siteName.split("INDIAEMPORIUM.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("INDIAEMPORIUM").length>1)){
   pos = 439;
   cur_site = "India Emporium";
 }
 else if(siteName.split("UREAD.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("UREAD").length>1)){
   pos = 1580;
   cur_site = "Uread";
 }
 else if(siteName.split("ACADZONE.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("ACADZONE").length>1)){
   pos = 1585;
   cur_site = "Acadzone";
 }
 else if(siteName.split("FLORALIS.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FLORALIS").length>1)){
   pos = 91;
   cur_site = "Floralis";
 }
 else if(siteName.split("GOODLIFE.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("GOODLIFE").length>1)){
   pos = 1586;
   cur_site = "Goodlife";
 }
 else if(siteName.split("NAAPTOL.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("NAAPTOL").length>1)){
   pos = 441;
   cur_site = "Naaptol";
 }
 else if(siteName.split("CILORY.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("CILORY").length>1)){
   pos = 469;
   cur_site = "Cilory";
 }
 else if(siteName.split("CROSSWORD.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("CROSSWORD").length>1)){
   pos = 471;
   cur_site = "Crossword";
 }
 else if(siteName.split("FREECULTR.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FREECULTR").length>1)){
   pos = 901;
   cur_site = "Freecultr";
 }
 else if(siteName.split("HEALTHKART.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("HEALTHKART").length>1)){
   pos = 921;
   cur_site = "Healthkart";
 }
 else if(siteName.split("MANIACSTORE").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("MANIACSTORE").length>1)){
   pos = 999;
   cur_site = "ManiacStore";
 }
 else if(siteName.split("FABFURNISH.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FABFURNISH").length>1)){
   pos = 1000;
   cur_site = "Fabfurnish";
 }
 else if(siteName.split("YAPAA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("YAPAA").length>1)){
   pos = 1002;
   cur_site = "Yapaa";
 }
 else if(siteName.split("HEALTHGENIE.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("HEALTHGENIE").length>1)){
   pos = 1068;
   cur_site = "HealthGenie";
 }
 else if(siteName.split("LANDMARK").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("LANDMARK").length>1)){
   pos = 7;
   cur_site = "Landmark";
 }
 else if(siteName.split("YEPME.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("YEPME").length>1)){
   pos = 1130;
   cur_site = "Yepme";
 }
 else if(siteName.split("INDIANROOTS.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("INDIANROOTS").length>1)){
   pos = 1175;
   cur_site = "Indian Roots";
 }
 else if(siteName.split("UTSAVFASHION.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("UTSAVFASHION").length>1)){
   pos = 1176;
   cur_site = "Utsav Fashion";
 }
 else if(siteName.split("BAGIT").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("BAGIT").length>1)){
   pos = 1177;
   cur_site = "Bag It Today";
 }
 else if(siteName.split("FABALLEY").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FABALLEY").length>1)){
   pos = 1179;
   cur_site = "FabAlley";
 }
 else if(siteName.split("STARCJ.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("STARCJ").length>1)){
   pos = 1180;
   cur_site = "StarCJ";
 }
 else if(siteName.split("BHARATPLAZA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("BHARATPLAZA").length>1)){
   pos = 1181;
   cur_site = "BharatPlaza";
 }
 else if(siteName.split("MAKEMYTRIP.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("MAKEMYTRIP").length>1)){
   pos = 1288;
   cur_site = "MakeMyTrip";
 }
 else if(siteName.split("CLEARTRIP.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("CLEARTRIP").length>1)){
   pos = 1289;
   cur_site = "Cleartrip";
 }
 else if(siteName.split("REDBUS.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("REDBUS").length>1)){
   pos = 1290;
   cur_site = "Redbus";
 }
 else if(siteName.split("TRAVELGURU.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("TRAVELGURU").length>1)){
   pos = 1291;
   cur_site = "Travelguru";
 }
 else if(siteName.split("TICKETGOOSE.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("TICKETGOOSE").length>1)){
   pos = 1292;
   cur_site = "TicketGoose";
 }
 else if(siteName.split("YATRA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("YATRA").length>1)){
   pos = 1293;
   cur_site = "Yatra";
 }
 else if(siteName.split("GOIBIBO.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("GOIBIBO").length>1)){
   pos = 1294;
   cur_site = "Goibibo";
 }
 else if(siteName.split("EXPEDIA.CO.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EXPEDIA").length>1)){
   pos = 1295;
   cur_site = "Expedia";
 }
 else if(siteName.split("MUSAFIR.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("MUSAFIR").length>1)){
   pos = 1296;
   cur_site = "Musafir";
 }
 else if(siteName.split("PAYTMMALL.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("PAYTMMALL").length>1)){
   pos = 1331;
   cur_site = "Paytmmall";
 }
 else if(siteName.split("PAYTM.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("PAYTM").length>1)){
   pos = 1331;
   cur_site = "Paytm";
 }
 else if(siteName.split("FREECHARGE.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FREECHARGE").length>1)){
   pos = 1348;
   cur_site = "Freecharge";
 }
 else if(siteName.split("AMERICANSWAN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("AMERICANSWAN").length>1)){
   pos = 1556;
   cur_site = "American swan";
 }
 else if(siteName.split("BASICSLIFE.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("BASICSLIFE").length>1)){
   pos = 1578;
   cur_site = "BasicsLife";
 }
 else if(siteName.split("ZOOMIN.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("ZOOMIN").length>1)){
   pos = 1005;
   cur_site = "Zoomin";
 }
 else if(siteName.split("STRAPSANDSTRING.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("STRAPSANDSTRING").length>1)){
   pos = 432;
   cur_site = "Strapsandstring";
 }
 else if(siteName.split("BOOKADDA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("BOOKADDA").length>1)){
   pos = 31;
   cur_site = "Bookadda";
 }
 else if(siteName.split("FNP.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FNP").length>1)){
   pos = 11;
   cur_site = "FNP";
 }
 else if(siteName.split("BABYOYE.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("BABYOYE").length>1)){
   pos = 929;
   cur_site = "Babyoye";
 }
 else if(siteName.split("FOODPANDA.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FOODPANDA").length>1)){
   pos = 1349;
   cur_site = "Foodpanda";
 }
 else if(siteName.split("TASTYKHANA").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("TASTYKHANA").length>1)){
   pos = 1350;
   cur_site = "TastyKhana";
 }
 else if(siteName.split("JUSTEAT.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("JUSTEAT").length>1)){
   pos = 1351;
   cur_site = "JustEat";
 }
 else if(siteName.split("DOMINOS.CO.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("DOMINOS").length>1)){
   pos = 1352;
   cur_site = "Dominos";
 }
 else if(siteName.split("PIZZAHUT").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("PIZZAHUT").length>1)){
   pos = 1353;
   cur_site = "Pizzahut";
 }
//new sites added
else if(siteName.split("GREENDUST.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("GREENDUST").length>1)){
 pos = 1052;
 cur_site = "GREENDUST";
}
else if(siteName.split("ZOFFIO.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("ZOFFIO").length>1)){
 pos = 1094;
 cur_site = "ZOFFIO";
}
else if(siteName.split("GOBOL.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("GOBOL").length>1)){
 pos = 1027;
 cur_site = "GOBOL";
}
else if(siteName.split("SOCKTAIL.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("SOCKTAIL").length>1)){
 pos = 1239;
 cur_site = "SOCKTAIL";
}
else if(siteName.split("KOMASTORE.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("KOMASTORE").length>1)){
 pos = 1559;
 cur_site = "KOMASTORE";
}
else if(siteName.split("FLOWERAURA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FLOWERAURA").length>1)){
 pos = 1143;
 cur_site = "FLOWERAURA";
}
else if(siteName.split("GIFTSBYMEETA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("GIFTSBYMEETA").length>1)){
 pos = 1584;
 cur_site = "GIFTSBYMEETA";
}
else if(siteName.split("SYBERPLACE.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("SYBERPLACE").length>1)){
 pos = 1174;
 cur_site = "SYBERPLACE";
}
else if(siteName.split("BLISSBASKET.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("BLISSBASKET").length>1)){
 pos = 1119;
 cur_site = "BLISSBASKET";
}
else if(siteName.split("JABRAAT.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("JABRAAT").length>1)){
 pos = 1145;
 cur_site = "JABRAAT";
}
else if(siteName.split("PORTAMART.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("PORTAMART").length>1)){
 pos = 1087;
 cur_site = "PORTAMART";
}
else if(siteName.split("POSTERGUY").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("POSTERGUY").length>1)){
 pos = 1212;
 cur_site = "POSTERGUY";
}
else if(siteName.split("PRINTSASIA").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("PRINTSASIA").length>1)){
 pos = 1054;
 cur_site = "PRINTSASIA";
}
else if(siteName.split("SHOPBYCHOICE").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("SHOPBYCHOICE").length>1)){
 pos = 1022;
 cur_site = "SHOPBYCHOICE";
}
else if(siteName.split("SSSCART").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("SSSCART").length>1)){
 pos = 1045;
 cur_site = "SSSCART";
}
else if(siteName.split("STORE503").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("STORE503").length>1)){
 pos = 1121;
 cur_site = "STORE503";
}
else if(siteName.split("ZOOOMBERG").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1226;
 cur_site = "ZOOOMBERG";
}
else if(siteName.split("ORDERVENUE").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1218;
 cur_site = "ORDERVENUE";
}
else if(siteName.split("URBANDAZZLE").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1062;
 cur_site = "URBANDAZZLE";
}
else if(siteName.split("BIGROCK").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("BIGROCK").length>1)){
 pos = 21;
 cur_site = "BIGROCK";
}
else if(siteName.split("FASHIONANDYOU").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1819;
 cur_site = "FASHIONANDYOU";
}
else if(siteName.split("ELITIFY").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1223;
 cur_site = "ELITIFY";
}
else if(siteName.split("MOBIKWIK").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1820;
 cur_site = "MOBIKWIK";
}
else if(siteName.split("TINYOWL").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1821;
 cur_site = "TINYOWL";
}
else if(siteName.split("SWIGGY").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1822;
 cur_site = "SWIGGY";
}
else if(siteName.split("KFC").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1823;
 cur_site = "KFC";
}
else if(siteName.split("PAPAJOHNS").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1824;
 cur_site = "PAPAJOHNS";
}
else if(siteName.split("STALKBUYLOVE").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1825;
 cur_site = "STALKBUYLOVE";
}
else if(siteName.split("VOXPOP").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1826;
 cur_site = "VOXPOP";
}
else if(siteName.split("URBANLADDER").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1827;
 cur_site = "URBANLADDER";
}
else if(siteName.split("ASKMEBAZAAR").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1828;
 cur_site = "ASKMEBAZAAR";
}
else if(siteName.split("BOOKMYSHOW").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1829;
 cur_site = "BOOKMYSHOW";
}
else if(siteName.split("NYKAA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("NYKAA").length>1)){
 pos = 1830;
 cur_site = "NYKAA";
}
else if(siteName.split("CLOVIA.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("CLOVIA").length>1)){
 pos = 1973;
 cur_site = "CLOVIA";
}
else if(siteName.split("MEBEL").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 1972;
 cur_site = "MEBELKART";
}
else if(siteName.split("ABOF.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("ABOF").length>1)){
 pos = 1850;
 cur_site = "ABOF";
}
else if(siteName.split("TRENDIN.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 431;
 cur_site = "TRENDIN";
}
else if(siteName.split("TATACLIQ.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EBAY").length>1)){
 pos = 2190;
 cur_site = "TATACLIQ";
}
else if(siteName.split("AJIO.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("AJIO").length>1)){
 pos = 2191;
 cur_site = "AJIO";
}
else if(siteName.split("NETMEDS.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("NETMEDS").length>1)){
 pos = 2238;
 cur_site = "NETMEDS";
}
else if(siteName.split("1MG.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("1MG").length>1)){
 pos = 2237;
 cur_site = "1MG";
}
else if(siteName.split("NNNOW.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("NNNOW").length>1)){
 pos = 2192;
 cur_site = "NNNOW";
}
else if(siteName.split("SAPNAONLINE.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("SAPNAONLINE").length>1)){
 pos = 451;
 cur_site = "SAPNAONLINE";
}
else if(siteName.split("AKBARTRAVELS.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("AKBARTRAVELS").length>1)){
 pos = 2241;
 cur_site = "AkbarTravels";
}

else if(siteName.split("NEARBUY.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("NEARBUY").length>1)){
 pos = 2051;
 cur_site = "Nearbuy";
}
else if(siteName.split("LITTLEAPP.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("LITTLEAPP").length>1)){
 pos = 2052;
 cur_site = "LittleApp";
}
else if(siteName.split("PRACTO.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("PRACTO").length>1)){
 pos = 2239;
 cur_site = "Practo";
}
else if(siteName.split("PHARMEASY.IN").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("PHARMEASY").length>1)){
 pos = 2240;
 cur_site = "PharmEasy";
}
else if(siteName.split("GODADDY.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("GODADDY").length>1)){
 pos = 2269;
 cur_site = "GoDaddy";
}
else if(siteName.split("BIGBASKET.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("BIGBASKET").length>1)){
 pos = 2268;
 cur_site = "BigBasket";
}
else if(siteName.split("GROFERS.COM").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("GROFERS").length>1)){
 pos = 2057;
 cur_site = "Grofers";
}
else if(siteName.split("MRVOONIK.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("MRVOONIK").length>1)){
 pos = 2267;
 cur_site = "MrVoonik";
}
else if(siteName.split("VOONIK.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("VOONIK").length>1)){
 pos = 2266;
 cur_site = "Voonik";
}
else if(siteName.split("FIRSTCRY.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FIRSTCRY").length>1)){
 pos = 2265;
 cur_site = "FirstCry";
}
else if(siteName.split(".BURGERKING").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("BURGERKING").length>1)){
 pos = 2263;
 cur_site = "BurgerKing";
}
else if(siteName.split("FRESHMENU.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FRESHMENU").length>1)){
 pos = 2262;
 cur_site = "Freshmenu";
}
else if(siteName.split("ABHIBUS.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("ABHIBUS").length>1)){
 pos = 2261;
 cur_site = "Abhibus";
}
else if(siteName.split("ZOOMCAR.").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("ZOOMCAR").length>1)){
 pos = 2260;
 cur_site = "Zoomcar";
}
else if(siteName.split(".TREEBO").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("TREEBO").length>1)){
 pos = 2259;
 cur_site = "Treebo";
}
else if(siteName.split(".FABHOTELS").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FABHOTELS").length>1)){
 pos = 2258;
 cur_site = "FabHotels";
}
else if(siteName.split(".CHEAPTICKET").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("CHEAPTICKET").length>1)){
 pos = 2257;
 cur_site = "CheapTicket";
}
else if(siteName.split(".OYOROOMS").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("OYOROOMS").length>1)){
 pos = 2256;
 cur_site = "OyoRooms";
}
else if(siteName.split(".EASEMYTRIP").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("EASEMYTRIP").length>1)){
 pos = 2255;
 cur_site = "EaseMyTrip";
}
else if(siteName.split(".FAASOS").length>1 || (siteName.split("GOOGLE.CO.IN").length>1 && siteName.split("FAASOS").length>1)){
 pos = 2056;
 cur_site = "Faasos";
}

return pos;
}



function hkAddToPriceWatch() {
  // console.log("Entered condition3 ");
  var hkPWTab = document.querySelector('.hk-sTab__pw'),
  hkPWTitle = document.querySelector('.hk-sTab__pwTitle');

  $(hkPWTab).addClass('hk-sTab__pw--on');
  $('.hk-js-pw__add').addClass('hk-u-vanish'); //show 'Add to price watch' buttons
  $('.hk-js-pw__remove').removeClass('hk-u-vanish'); //hide 'Remove from price watch' buttons
  $('.hk-js-sTabDropInput__check').prop('disabled', false); // disabled the min drop value setting
  $(".hk-pw__setPrice").text(getPrice());
  $(".hk-pw__currPrice").text(getPrice());
  $(".hk-pw__diffPrice").text("0");
  $(".hk-triangle--left:eq(0)").removeClass("hk-u-text--red hk-tri--up");
  $(".hk-triangle--left:eq(0)").addClass("hk-u-text--green hk-tri--down");
  addToWatchList();

  hkPWTitle.innerHTML = `<svg viewBox="0 0 35.9 35.9" class="hk-u-va--middle hk-ext__icons--greenStroke hk-ext__icons--medium">
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__filledTick"></use>
  </svg>

  <div class="hk-u-margin__h-05"><span class="hk-u-text--green">Added to Price Watch List!</span>
  <div class="hk-u-fSize--tiny hk-u-text--lighter hk-u-text--normalWeight"> You will be alerted when the price would fall</div>
  </div>`;
}

function addToWatchList() {
  if(typeof(getCategory) == 'function'){
    var category = getCategory();
    if(category == undefined || category == 'undefined'){
      category = "";
    }
  }
  else{
    var category = "";
  }
  var myPrice = getPrice();
  var prod = getProd();
  var url = window.location.href;
  var image = "";
  image = getImage();
  if(alertPosition == 99){ //infibeam spcl case
    variantAlert();
    myPrice = getPrice();
    prod = getProd();
    image = getImage();
    url = url_infi;
  }
  addToWatchListGen(prod, myPrice, image, url, alertPosition);
  return;
}

function addEmailID(email){
  var jsonArr = [{addEmail: email}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(0, jsonArr, 0, doNothing, []);
}

function blinker(){
  if (cancel==false) {
    elem1.style.background="linear-gradient(to bottom, #eaefb5 0%,#e1e9a0 100%)";
    elem1.style.borderColor="#6b6";
    setTimeout("elem1.style.background=''", 1200);
    setTimeout("elem1.style.borderColor=''", 1200);
    setTimeout("blinker()",2400);}
    if (cancel==true){elem1.style.backgroundColor="#fbfbfb";elem1.style.borderColor="#ddd";}
  }


  function checkAlertStatus(){
    flagToDisp = 0; strToDisp = ""; clsToUse = ""; diff = 0;
    addedToDOM2 = 0;
    if(userSetting[2].value==1){
     arrayRes = watchListArray;
     var currentURL = window.location.href;
     var filterURL = currentURL.split("&")[0];
     filterURL = filterURL.split("affid")[0];
     myPrice = getPrice();

     if(parseInt(alertPosition) == 99){ //infi spcl case
       currentURL = getInfiURL();
     }


     for(i=0;i<watchListArray.length;i++){
      var currentURL2 = watchListArray[i].link;
      if(watchListArray[i].link!="" && addedToDOM2==0 && returnPID(currentURL2) != 0 && (returnPID(currentURL)) == (returnPID(watchListArray[i].link))){
        addedToDOM2 = 1;
        if(myPrice!=0){
          watchListArray[i].cur_price = myPrice;
        }
        if(watchListArray[i].price_added >= watchListArray[i].cur_price){
         clsToUse = "dec-hatke";
         diff = watchListArray[i].price_added - watchListArray[i].cur_price;
       }
       else {
         clsToUse = "inc-hatke";
         diff = watchListArray[i].cur_price - watchListArray[i].price_added;
       }

       $(".hk-pw__setPrice").text(watchListArray[i].price_added);
       $(".hk-pw__currPrice").text(watchListArray[i].cur_price);
       $(".hk-pw__diffPrice").text(diff);
       if(diff >= 0){

        $(".hk-triangle--left").removeClass("hk-u-text--red hk-tri--up");
        $(".hk-triangle--left").addClass("hk-u-text--green hk-tri--down");

      }
      else{
        $(".hk-triangle--left").removeClass("hk-u-text--green hk-tri--down");
        $(".hk-triangle--left").addClass("hk-u-text--red hk-tri--up");
      }


      flagToDisp = 1;
      addedToDOM = 0;

    }
  }
  if(flagToDisp==0){
    addedToDOM = 0;
  }
}
}


siteList = [{"position":"1","name":"Ebay","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/ebay2.png"},{"position":"1000","name":"Fabfurnish","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/fabfurnish.png"},{"position":"411","name":"Grabmore","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/grabmore.png"},{"position":"1002","name":"Yapaa","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/yapaa.jpg"},{"position":"1003","name":"Fatakk","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/fatakk.jpg"},{"position":"1005","name":"Zoomin","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/zoomin.jpg"},{"position":"1008","name":"Happily Unmarried","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/happilyunm.jpg"},{"position":"35","name":"Yebhi","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/yebhi1.png"},{"position":"63","name":"Amazon","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/amazon.png"},{"position":"30","name":"IndiaPlaza","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/indiaplaza1.png"},{"position":"31","name":"Bookadda","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/bookadda1.png"},{"position":"129","name":"SnapDeal","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/snapdeal.png"},{"position":"50","name":"Jabong","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/jabong1.png"},{"position":"45","name":"ShopperStop","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/shpstop1.png"},{"position":"929","name":"BabyOye","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/by.png"},{"position":"911","name":"StrawBerryNet","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/strawberrynet.png"},{"position":"939","name":"Hushbabies","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/hb.png"},{"position":"921","name":"Healthkart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/hk.png"},{"position":"62","name":"Indiarush","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/indiarush.png"},{"position":"2","name":"Flipkart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/flipkart1.png"},{"position":"99","name":"Infibeam","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/infibeam2.png"},{"position":"4","name":"HomeShop18","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/homeshop181.png"},{"position":"7","name":"LandMark","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/landmark1.png"},{"position":"13","name":"Tradus","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/tradus2.png"},{"position":"22","name":"Koovs","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/koovs.png"},{"position":"333","name":"PepperFry","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/pepperfry1.png"},{"position":"11","name":"Ferns n Petals","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/fnp1.png"},{"position":"5","name":"Futurebazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/futurebazaar1.png"},{"position":"98","name":"Fashionara","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/fashionara.png"},{"position":"111","name":"Myntra","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/myntra1.png"},{"position":"421","name":"ShopClues","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/shopclues.png"},{"position":"441","name":"Naaptol","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/naaptol.png"},{"position":"471","name":"Crossword","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/crossword.png"},{"position":"461","name":"Magazine Mall","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/magmall.png"},{"position":"91","name":"Floralis","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/floralis.png"},{"position":"401","name":"Indiatimes Shopping","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/indtimesshopping.png"},{"position":"393","name":"Adexmart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/adexmart.png"},{"position":"373","name":"Phoolwala","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/phoolwala.png"},{"position":"37","name":"JewelsKart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/jewelkart.jpg"},{"position":"57","name":"LensKart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/lenskart.jpg"},{"position":"47","name":"BagsKart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/bagskart.jpg"},{"position":"67","name":"WatchKart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/watch.jpeg"},{"position":"69","name":"Next.co.in","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/next.png"},{"position":"71","name":"Croma","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/croma.png"},{"position":"412","name":"Craftsvilla","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/craftsvilla.png"},{"position":"469","name":"Cilory","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/cilory.png"},{"position":"429","name":"Zivame","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/zivame.png"},{"position":"999","name":"ManiacStore","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/maniacstore.png"},{"position":"433","name":"Pretty Secrets","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/prettysecrets.png"},{"position":"422","name":"ShopNineteen","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/shop19.png"},{"position":"428","name":"DoneByNone","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/donebynone.png"},{"position":"291","name":"Rediff Shopping","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/rediff.png"},{"position":"435","name":"Mirraw","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/mirraw.png"},{"position":"432","name":"StrapsAndStrings","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/strapsnstrings.png"},{"position":"431","name":"Trendin","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/trendin.png"},{"position":"423","name":"CBazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/cbazaar.png"},{"position":"430","name":"N-gal","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/ngal.png"},{"position":"424","name":"Limeroad","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/limeroad.png"},{"position":"425","name":"Zovi","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/zovi.png"},{"position":"426","name":"BlueStone","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/bluestone.png"},{"position":"427","name":"Voylla","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/voylla.png"},{"position":"439","name":"India Emporium","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/indiaemporium.png"},{"position":"451","name":"Sapna Online","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/sapnaonline.png"},{"position":"1010","name":"ItalianoTUCCI","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1011","name":"Bumpersales.in","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1012","name":"OneRx","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1013","name":"MyMobileMart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1014","name":"Takshu","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1015","name":"Dealtz","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/dealtz.png"},{"position":"1016","name":"HardwareBajaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1019","name":"143shopping","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/143-shop.jpg"},{"position":"1021","name":"India'O'mart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1020","name":"Durga Books Agency","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1022","name":"ShopByChoice","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/shopbychoice.jpg"},{"position":"1024","name":"Deal Kya Hai","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/dealkyahai.jpg"},{"position":"1025","name":"Paragon","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1026","name":"Kaamastra","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1027","name":"Gobol","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/gobol.png"},{"position":"1029","name":"Peopleskart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1030","name":"sai ram online store","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1031","name":"shahid.sales@buyhatke.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1032","name":"Lowprice Online","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1033","name":"BuyDirekt","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1034","name":"Biggcart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/biggcart.png"},{"position":"1036","name":"gopals","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1037","name":"books.rediff.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1038","name":"Bookjugad","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/bookjugaad.png"},{"position":"1039","name":"SB Equipments","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1040","name":"Specs Retail","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1041","name":"Shopymart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1042","name":"Full2shopping","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1043","name":"www.sugarpie.in","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1045","name":"SSSCART","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/ssscart.jpg"},{"position":"1046","name":"iBhejo","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/ibhejo.png"},{"position":"1047","name":"Retailbunny.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1048","name":"Saifeesons","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1049","name":"Satnam Rice Bhandar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1050","name":"OnlySSD","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1051","name":"ACTIVRPIXEL","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1052","name":"GreenDust","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/greendust.png"},{"position":"1053","name":"Slan Foods","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1054","name":"Printsasia.in","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/printasia.png"},{"position":"1055","name":"sdk technologies","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1056","name":"shopeyard","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/shopeyard.png"},{"position":"1057","name":"Solomon","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1058","name":"abcdkey.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1059","name":"Bewakoof","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/bewakoof.png"},{"position":"1061","name":"PURSHO","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1062","name":"Urban Dazzle","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/urbandazzle.png"},{"position":"1063","name":"BoonToon","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1064","name":"CareerOrbits","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1065","name":"balajishop12","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1066","name":"Bean Bag Online","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1067","name":"RateToRate","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1068","name":"Healthgenie","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/healthgenie.png"},{"position":"1069","name":"Moods Condoms","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1070","name":"SHILPKART","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1071","name":"MONJARDEALS","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1072","name":"BigThela.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1073","name":"Soyng","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/soyng.png"},{"position":"1074","name":"CrazeeMania","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1075","name":"tintinshoppe","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1076","name":"Khantil","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1077","name":"Angel Fragrance","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1078","name":"Suranas Jewelove","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1079","name":"Mozart Singh","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1080","name":"SMART BUY","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1081","name":"Infikart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/infikart.png"},{"position":"1082","name":"Buxsa.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1083","name":"Buytestseries","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/buytest.png"},{"position":"1084","name":"om tex","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1085","name":"grabNwrap","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1086","name":"Popnetic","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/popnetics.png"},{"position":"1087","name":"PortaMart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/portamart.png"},{"position":"1088","name":"Nplabel","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1089","name":"Crasters Inn","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1090","name":"Traditional 2 Trendy","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/trad2trend.png"},{"position":"1091","name":"shopperszilla","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1092","name":"ElaboreStore","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/elab-store.png"},{"position":"1093","name":"HOTZ FASHION","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1094","name":"zoffio","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/zoffio.png"},{"position":"1095","name":"purple tree","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1097","name":"masteringphotoshop.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1098","name":"Cart2India","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/cart2india.png"},{"position":"1099","name":"Wearitin","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/wearitin.png"},{"position":"1101","name":"sheela enterprises","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1102","name":"Eden Overseas","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1103","name":"premiumcollection","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1104","name":"Rv Marketing","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1105","name":"Ibscart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1106","name":"Group-Pharma","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1107","name":"coollingerierajbeer","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1108","name":"v scarves","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1109","name":"jabraat","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1110","name":"luxerium","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1111","name":"KARTNBUY","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1112","name":"Stanley Kane","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1113","name":"Teach","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1114","name":"DOOR2DOOR","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1115","name":"Malabar Shopping","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1116","name":"Compuindia.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/compuindia.png"},{"position":"1117","name":"ProteinsIndia","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1118","name":"Talash.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/talash.png"},{"position":"1119","name":"BlissBasket","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/blissb.png"},{"position":"1120","name":"SHOPPINGBAAZ","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1121","name":"store503","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/store503.png"},{"position":"1122","name":"Nuttymart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1123","name":"getezee","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/getezee.png"},{"position":"900","name":"Purplle","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"901","name":"FreeCultr","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/freecultr.png"},{"position":"1124","name":"prime time","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1125","name":"Giftease Kart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1126","name":"Provogue","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/provogue.png"},{"position":"1127","name":"Binocolor","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/binocolor.png"},{"position":"1128","name":"yufta.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1129","name":"STYLINER","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/styliner.png"},{"position":"1130","name":"Yepme","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/yepme.png"},{"position":"1131","name":"Socrase","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1132","name":"Sparklejewells","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/sparklefashion.png"},{"position":"1133","name":"Bling4u","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/bling4u.png"},{"position":"1134","name":"Shoppinping","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/shoppingping.png"},{"position":"1135","name":"Trendylicious","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/trendylicious.png"},{"position":"1136","name":"Kakori","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/kakori.png"},{"position":"1137","name":"Keepitclean","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/keepitclean.png"},{"position":"1138","name":"Gadgetshut","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/gadgetshut.png"},{"position":"1139","name":"Lessthantwo","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/lessthan2.png"},{"position":"1140","name":"Gamefrog","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/gamefrog.png"},{"position":"1141","name":"Aidalane","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/aidalane.png"},{"position":"1142","name":"YeDeal","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1143","name":"Floweraura","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/floweraura.png"},{"position":"1144","name":"anzuefashions","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1145","name":"Jabraat.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/jabraat.png"},{"position":"1146","name":"homeshoppi","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/homeshoppi.png"},{"position":"1147","name":"shopcrazydeal","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1148","name":"Balloonistics","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1149","name":"Smesauda","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1150","name":"DealsOnDth","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1151","name":"My Craft Hub","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1152","name":"Vu LED TV","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1153","name":"Swarajshop.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1154","name":"Clothion","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1155","name":"Shopoj.in","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1156","name":"GNR INC","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1157","name":"eNetram","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1158","name":"bluegape","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1159","name":"Triveni Fashions","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/triveni.png"},{"position":"1161","name":"Royal Fashion Shop","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1160","name":"iKings","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/i-kings.png"},{"position":"1162","name":"Eazyshopping4u","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1163","name":"Vi\u1ec7c bu\u00f4n b\u00e1n - the vietnamese online store","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1164","name":"Netshop Retail","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1165","name":"chilisdeals","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1168","name":"Mrig Studios","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1169","name":"Sun Fashions","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/sunfashions.png"},{"position":"1170","name":"thefishmaret.in","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1171","name":"BestPrice","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1174","name":"SyberPlace","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/syberplace.png"},{"position":"1175","name":"Indianroots","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/indianroots.png"},{"position":"1176","name":"Utsav Fashion","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/utsavfashion.png"},{"position":"1177","name":"Bag it today","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/bagittoday.png"},{"position":"1178","name":"Stylehoops","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1179","name":"Faballey","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/faballey.png"},{"position":"1180","name":"Starcj","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/starcj.png"},{"position":"1181","name":"Bharatplaza","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/bharatplaza.png"},{"position":"1182","name":"Djewels.org","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1183","name":"Krishkare","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1184","name":"BlessingStore","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1185","name":"Mindsclick","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1186","name":"Walcart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1187","name":"Smart Buy Deal","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1189","name":"ShoppersTech","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1190","name":"Inkflame","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/inkflame.png"},{"position":"1191","name":"SmartShophar.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1192","name":"Shopnova.in","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/shopnova.png"},{"position":"1193","name":"free samples in india","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/freesamples.png"},{"position":"902","name":"Chumbak","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1194","name":"UNLTDOFFERS","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1195","name":"KnottyKart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1196","name":"Gofitindia.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/gofitindia.png"},{"position":"1197","name":"GadgetsDukaan","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1198","name":"WhiteMango.in","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/whitemango.png"},{"position":"1199","name":"gadgets mafia","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1200","name":"Zohraa","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/zohraa.png"},{"position":"1201","name":"faverdeal","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1202","name":"AbhiLelo","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1203","name":"Shopgenx","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1204","name":"Sharda Sarees","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1205","name":"seernirai handicraft","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1206","name":"j-admin","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1207","name":"aapnoshop","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1208","name":"EndeavorCAreers","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/endeavor.png"},{"position":"1209","name":"Shoppers99","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1210","name":"Frinkytown","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/frinkytown.png"},{"position":"1211","name":"Epicstar Enterprise","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1212","name":"PosterGuy","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1213","name":"Led Lighting","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1214","name":"Advancenutratech","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1215","name":"HOPE Entrepreneurs PVT LTD","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1216","name":"Shop Luxury","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1217","name":"vaishnovi jewelery","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1218","name":"OrderVenue.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/ordervenue.png"},{"position":"1219","name":"blogstylo","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/blogstylo.png"},{"position":"1220","name":"Dail Shoppers","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1221","name":"Alloykart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1222","name":"Warp And Weft","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1223","name":"Elitify","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/elitify.png"},{"position":"1224","name":"MAZORIA CAFE","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1225","name":"FlipDel","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1226","name":"Zooomberg","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/zooomberg.png"},{"position":"1227","name":"Saurabhbsns","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1228","name":"Sapnaonline.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1229","name":"CustoTee","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1230","name":"Ambara Empire","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1231","name":"Smile N Buy","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1232","name":"jmshopping","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1233","name":"HealthTokri","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/healthtokri.png"},{"position":"1234","name":"Kudos Fashions","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1235","name":"Feyeshoppy","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1236","name":"FemNmas","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/femnmas.png"},{"position":"1237","name":"eSmartDeals","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1238","name":"Aurangabadkar Saraf","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1239","name":"Socktail","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1240","name":"Dealshott","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1241","name":"AQUA 7X","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1242","name":"Goldencollections","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1243","name":"Shivam Plastics","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1244","name":"FurnishFantasy","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/furnishfantasy.png"},{"position":"1245","name":"kharidlay.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1246","name":"PrimeABGB","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1247","name":"Tapyti","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/tapyti.png"},{"position":"1248","name":"Cheer Shopping","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1249","name":"test","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1250","name":"YoWebby.Com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1251","name":"Veena Bazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1252","name":"Oh Nine One Fashion & Retail Pvt Ltd","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1253","name":"the furniture store","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1254","name":"Overcart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/overcart.png"},{"position":"1255","name":"Shop4Deal","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1256","name":"Shopping Experia","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1257","name":"Habbana.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1258","name":"Zerel","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1259","name":"iStylefreak","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1260","name":"lawangi.com Buy Diwali FireCrackers Online!","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1261","name":"elec2buy","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1262","name":"Myshopbazzar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/myshopbazzar.png"},{"position":"1263","name":"kartbin.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1264","name":"Kota","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1265","name":"uditbhatia","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1266","name":"EBC","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1267","name":"Buyers Crush","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1268","name":"CONNECTWIDE","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1269","name":"Knesta Herbals","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1270","name":"comwayonline","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1271","name":"Nautanki Fashion Store","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1272","name":"OnEMi","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1273","name":"Buysimple","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1274","name":"BIG Chemist","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1275","name":"Feerol","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/feerol.png"},{"position":"1277","name":"RB InfoTech","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1278","name":"Acorda Infotech Pvt. Ltd.","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1279","name":"Kumar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1280","name":"Addocart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1282","name":"Naughty Strands","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1283","name":"Indiwear.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1284","name":"Oh Nine One","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1285","name":"Collectabillia","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/collectabillia.png"},{"position":"1286","name":"Sports 365","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/sports365.png"},{"position":"1287","name":"Banglewale","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/banglewale.png"},{"position":"1288","name":"Makemytrip","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/makemytrip.png"},{"position":"1289","name":"Cleartrip","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/cleartrip.png"},{"position":"1290","name":"Redbus","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/redbus.png"},{"position":"1291","name":"Travelguru","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/travelguru.png"},{"position":"1292","name":"Ticketgoose","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/tktgoose.png"},{"position":"1293","name":"Yatra","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/yatra.png"},{"position":"1294","name":"Goibibo","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/goibibo.png"},{"position":"1295","name":"Expedia","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/expedia.png"},{"position":"1296","name":"Musafir","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/musafir.png"},{"position":"1297","name":"Metro Bazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1298","name":"Books Wagon","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/bookswagon.png"},{"position":"1299","name":"BeltKart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1300","name":"GetTrek Smart Attendance System","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1301","name":"UniqInfoTechIndia","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1302","name":"atisundar.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1303","name":"naturebreed","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1304","name":"SALEBRATIONS","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1305","name":"Zevrr","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1306","name":"Asianbigbazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1307","name":"SchoolPep","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1308","name":"Fyne","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1310","name":"Segment Retails","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1311","name":"arya investment","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1312","name":"HAPPY KIDZ","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1313","name":"Surplus Bazar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1314","name":"xtremeonlinestore","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1316","name":"martnext","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1318","name":"Discownt","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1319","name":"Merakapda","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1320","name":"DIVESH","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1321","name":"Ebay.in","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1323","name":"THE MOBILESTORE","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/themobstore.png"},{"position":"1324","name":"Slimthread","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1325","name":"Diamond Nexus India","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1326","name":"Meridian","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1328","name":"Vidya Books","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1329","name":"Flazee","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1330","name":"Pearl Paradise","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1331","name":"Paytm","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/paytm.png"},{"position":"1332","name":"PeopleEasy.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1333","name":"buybuk","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/buybuk.png"},{"position":"1334","name":"koshimbir","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1335","name":"EMiBazaar.com powered by OnEMi.in","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1336","name":"Mycityflowers","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1337","name":"GameXS","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1338","name":"SparesHub","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1339","name":"Canopies The online Store","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1340","name":"Sterling Home Innovators Pvt. Ltd.","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1341","name":"Help On Wheels","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1342","name":"Fleaffair","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1343","name":"onlineshop","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1344","name":"SG Musical","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1345","name":"handloomdaddy","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1346","name":"N\/A","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1347","name":"Stylish Bazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1348","name":"Freecharge","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/freecharge.png"},{"position":"1349","name":"FoodPanda","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/foodpanda.png"},{"position":"1350","name":"TastyKhana","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/tastykhana.png"},{"position":"1351","name":"JustEat","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/justeat.png"},{"position":"1352","name":"Dominos","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/dominos.png"},{"position":"1353","name":"Pizza Hut","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/pizzahut.png"},{"position":"1354","name":"myDigimart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1355","name":"Fashionstyler","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1356","name":"Bholanath Garments","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1357","name":"MELBON","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1358","name":"BazaarCart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1359","name":"1stbuy","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1360","name":"OceanHomeStore","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1362","name":"Shippme","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1363","name":"JASMINBHAI","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1364","name":"fastindiashop","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1365","name":"Shimply","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1366","name":"bigoffershop","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1367","name":"Her Choice","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1369","name":"Lab No. 4 - The Quotography Department","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1370","name":"nightingale","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1371","name":"C_Cradle---YouR OnlinE ShoppinG PartneR","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1372","name":"The Pen World","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1373","name":"Befunkies","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1375","name":"kidswids","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1376","name":"Next Dress","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1377","name":"DoorDeals","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1378","name":"Zoprix","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1379","name":"Omegakart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1380","name":"AQUIL ENTERPRISES","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1381","name":"TIA Creation","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1382","name":"www.wearwristband.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1383","name":"LoginKART","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1384","name":"AcMahabazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1385","name":"Flipcart,Amazone","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1386","name":"MOBILEWALA","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1387","name":"Baniyababu Retails Pvt. Ltd","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1388","name":"mallforindia","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1389","name":"A1 Designer Wear","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1390","name":"Festivalas India","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1391","name":"moOOou","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1392","name":"Abel Estore","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1393","name":"ClassicAccess.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1394","name":"Kaizer Jewelry","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1395","name":"Hashmi Mart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1396","name":"tinydeal.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1397","name":"Shoping Inc","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1398","name":"D Store","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1399","name":"lapguard","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1400","name":"Jazzmyride","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1401","name":"SimpleSarees","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1402","name":"Unmatched Solutions Pvt Ltd","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1403","name":"npitjunction.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1404","name":"Tv Teleshopping","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1405","name":"robocraze","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1406","name":"nowbestdeal","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1407","name":"XtraKart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1408","name":"Bags Craze","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1409","name":"Rivera Sarees","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1166","name":"Heustyle","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1410","name":"Fashionove.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1411","name":"Crazekart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1412","name":"OyeKitchen.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1413","name":"Subhdeal","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1414","name":"Dharavi Market","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1415","name":"YourDeal","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1416","name":"Jantabazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1418","name":"SEE-social economic environmental","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1419","name":"Kanico Store","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1420","name":"V & V Shop","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1421","name":"MishreeSaree","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1422","name":"IndiaInMyBag","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1423","name":"Avikart.com","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1424","name":"bigcmobiles pvt ltd","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1425","name":"thetubelights","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1426","name":"Ankit","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1427","name":"Clickedia","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1428","name":"Orveno Store","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1429","name":"https:\/\/paytm.com\/","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1431","name":"Make My Kart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1432","name":"My Novelty Shop","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1433","name":"AROMA STORE","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1434","name":"F3 FASION","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1435","name":"Techzone","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1436","name":"ShopForStar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1437","name":"Naughty At9","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1439","name":"Colo Venture","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1440","name":"OrganoNutri","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1441","name":"Sunshine Kitchen Appliances","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1442","name":"twistmart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1443","name":"For Dolly","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1444","name":"Style Lady","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1445","name":"Naisha Boutique","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1446","name":"Thought Road","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1447","name":"Daily Bachat","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1448","name":"Tohfah 4 You","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1449","name":"Off and On Shop","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1450","name":"The Tube Lights","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1451","name":"Everything Sasta","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1452","name":"Bling It","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1453","name":"Unlike Store","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1454","name":"French Aura","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1455","name":"Quirky Huts","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1456","name":"Ballonistics","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1457","name":"Craftisthan","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1458","name":"Its A Ruse","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1459","name":"F9 Shoppee","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1461","name":"Orvenotek","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1462","name":"Cart 91","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1463","name":"Wear and Steal","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1464","name":"Princess Walk","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1465","name":"Huligans","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1466","name":"Dhrorar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1467","name":"Fashion and Tashan","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1468","name":"Cryptic Voodoo","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1469","name":"Foresight Opticals Ltd.","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1470","name":"TRV Sports","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1471","name":"Villa Lifestyle","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1472","name":"Foodwala","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1473","name":"Kovi Bazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1474","name":"Komas Store","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1475","name":"Mezza Luna","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1476","name":"Festivalals","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1477","name":"Fabmee","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1478","name":"Poise Collections","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1479","name":"Fasion360","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1480","name":"VSK Graphics","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1481","name":"House of Saffron","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1482","name":"Mulberry Life","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1483","name":"Aanchal Fashions","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1485","name":"Shimoro","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1486","name":"Fashion Square","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1487","name":"Zaras Boutique","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1488","name":"Dancing Girl","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1489","name":"Zylomart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1490","name":"Enquotism","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1492","name":"Sneak Peek Store","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1493","name":"Fad Attire","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1494","name":"Kivon","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1495","name":"Finery Shop","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1496","name":"Hand Made JUnction","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1497","name":"Vesar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1498","name":"Sweet SHoppy","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1499","name":"Fiesta Bazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1500","name":"Ask For Fashion","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1501","name":"SN Rama","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1502","name":"Artistory","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1503","name":"Gulab London Jewels","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1504","name":"Jean Factory","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1505","name":"Chennai Shop Kart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1506","name":"Shop 4 Special","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1507","name":"Swastik Life","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1508","name":"Gazifab","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1509","name":"Weavers of Magic Threads","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1510","name":"Shoppersfit","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1511","name":"Mycroyance","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1512","name":"DIvine Haat","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1513","name":"Brands Bazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1514","name":"Arush Jewels","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1515","name":"Bolsao Online","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1516","name":"Order My Treat","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1517","name":"Chiffony","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1518","name":"Dress 365","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1519","name":"Hal-E-Deals","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1520","name":"Solar Store","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1521","name":"Subh Deal","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1522","name":"Electronyx Bazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1523","name":"Shop N Rock","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1524","name":"Amafac","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1525","name":"Locked Off","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1526","name":"Grab Me A Bargain","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1527","name":"Spice Lot Retail","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1528","name":"Abuse","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1529","name":"Luxuriat","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1530","name":"Tappories","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1531","name":"Ayesha Creations","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1532","name":"Vearings","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1533","name":"Venetian Designs","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1534","name":"Nutraj","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1535","name":"Bandra Bazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1536","name":"Kahipan","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1537","name":"Peach Affair","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1538","name":"Pep Alley","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1539","name":"The Fashion Hub","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1540","name":"Shoffex","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1541","name":"Perfum Booth","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1542","name":"Schrot Flinte","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1543","name":"Pune Stationery","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1544","name":"The Apple Singhs","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1545","name":"Nino Bambino","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1546","name":"Kashka","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1547","name":"Batie Energy","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1548","name":"Organic Kuteera","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1549","name":"Trendy SOuk","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1550","name":"Nainica Divas","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1551","name":"Window Kart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"1552","name":"Add 2 Kart India","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"1830","name":"Nykaa","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"1827","name":"Urban Ladder","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"1828","name":"AskMeBazaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"1819","name":"Fashion And You","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"1972","name":"Mebelkart","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"1973","name":"Clovia","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"1975","name":"Zansaar","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"1850","name":"Abof","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"2190","name":"Tatacliq","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"2191","name":"Ajio","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"2237","name":"1mg","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"2192","name":"NNNow","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"},{"position":"451","name":"Sapnaonline","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"1585","name":"Acadzone","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}, {"position":"2238","name":"Netmeds","image":"http:\/\/compare.buyhatke.com\/images\/site_icons_m\/unavail_logo.png"}];

var siteName = [];
var siteImage = [];

for(k=0;k<siteList.length;k++){
  siteName[siteList[k].position] = siteList[k].name;
  var image_temp = siteList[k].image.split("site_icons_m/").join("");
  siteImage[siteList[k].position] = image_temp;
}

function sendClickData(){
  // console.log("sendClickData was called");
  var jsonArr = [{'dp': "Price Compare Clicked ~*" + window.location.hostname}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(0, jsonArr, 0, doNothing, []);
  return true;
}


function showResults(results, indexSelected, positionSpecs, positionResults){
  positionSpecs = JSON.parse(positionSpecs);
  selectors = JSON.parse(positionResults);
  var siteSelected = siteName[results[indexSelected].position];
  if(siteSelected == undefined || typeof(siteSelected) == "undefined"){
    siteSelected = "Others";
  }
  var stringToShow = '<div id="dd_menu_list"><ul>';
  for(i=0;i<results.length;i++){
    image_name = siteImage[results[i].position];
    if(results[i].link.split("%3F").length > 1){
      results[i].link +=  '%26tab_id%3D' + tabID;
    }
    else {
      results[i].link +=  '%3Ftab_id%3D' + tabID;
    }
    stringToShow = stringToShow + '<li><a position="' + results[i].position + '" class="indvResults" style="display:inline!important;" target="_blank" href="' + results[i].link + '"><div class="itemWrap"><div class="imageDiv_wrap"><div class="imageDiv"><img src="' + results[i].image + '"></div></div><div class="prod_right"><div class="prodName">' + results[i].prod + '</div><div class="storeRow"><div class="prodPrice"><img src="https://compare.buyhatke.com/images/rupeeK.png">' + results[i].price + '</div><div class="prodStore"><img src="' + image_name + '"></div></div></div></div></a></li>';
  }
  stringToShow = stringToShow + '</ul></div>';

  string2 = '<footer><div id="dd_menu_footer"><iframe src="http://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FBuyHatke&amp;width=450&amp;height=35&amp;colorscheme=light&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;send=false&amp;appId=205177396285577" scrolling="no" frameborder="0" style="border: none;overflow: hidden;width: 230px;height: 30px;float: left;" allowtransparency="true"></iframe> <a href="mailto:wecare@buyhatke.com">Send Feedback</a></div></footer></div></div><div id="share_buttons">Share: <a class="dd_share_buttons" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fextension.buyhatke.com" target="_blank"><img src="http://compare.buyhatke.com/images/fbs.png"></a><a class="dd_share_buttons" href="https://plus.google.com/share?url=http%3A%2F%2Fextension.buyhatke.com" target="_blank"><img src="https://www.gstatic.com/images/icons/gplus-32.png" alt="Share on Google+"></a><a class="dd_share_buttons" href="http://twitter.com/home?status=Try the amazing CompareHatke Chrome Extension!+http%3A%2F%2Fextension.buyhatke.com" target="_blank"><img src="http://compare.buyhatke.com/images/tweet.png"></a></div></div><a href="javascript:void(); return false;" id="detailClose">x</a></div></div>';
  //////console.log("prices are " + parseInt(results[indexSelected].price) + " , " + parseInt(getPrice()));
  if(parseInt(results[indexSelected].price) < parseInt(getPrice())){
    var msgString = "Hurray !  Massive savings found. This product is available for ";
  }
  else if(parseInt(results[indexSelected].price) == parseInt(getPrice())){
    var msgString = "You already seem to be close to it\'s best price at ";
  }
  else {
    var msgString = "Other variants of the product are available starting from ";
  }
  if(results.length>0){
    //console.log("current pos is " + getCurrentPosition(window.location.href));
    if(getCurrentPosition(window.location.href)==2){
      var temp_link = results[indexSelected].link;
      temp_link = temp_link.split("affid%3Dbuyhatkegm")[0];
      temp_link = temp_link + "&force_aff=0";
      results[indexSelected].link = temp_link;
    }
    var stringFinal = '<div class="to_del_det_wrap" id="detailOutWrap"><div id="detailInWrap"><a target="_blank" href="https://compare.buyhatke.com" title="Visit Buyhatke"><img id="details_logo" src="https://compare.buyhatke.com/images/logo_small.png"></a><div id="details">' + msgString + ' <span id="detail_cost"><img src="http://compare.buyhatke.com/images/rupeeK.png"> ' + results[indexSelected].price + '</span> at <span id="detail_store">' + siteSelected + '</span><a style="display:inline!important;" onclick="return sendClickData();" href="' + results[indexSelected].link + '" target="_blank"><input type="button" value=" BUY IT NOW" ></a>or<div class="drop_down" id="compare_now" onmouseover="cancel=true;">COMPARE PRICES<div class="drop_down_symbol"></div><div id="dd_menu"><head><div id="dd_menu_header">Showing <span>' + results.length + '</span> results</div></head>' + stringToShow + string2;
    addedToDOM = 0;
    if($('.to_del_det_wrap').length > 1){
      $('.to_del_det_wrap').remove();
    }
    for(n=0;n<selectors.length;n++){
      if($(selectors[n].selector).length>0 && addedToDOM==0){
        addedToDOM = 1;
        if(selectors[n].attr=="none"){
          if(selectors[n].pos=="after"){
           $(selectors[n].selector).after(stringFinal);
         }
         else {
           $(selectors[n].selector).before(stringFinal);
         }
       }
       else if(selectors[n].attr=="parent"){
        if(selectors[n].pos=="after"){
         $(selectors[n].selector).parent().after(stringFinal);
       }
       else {
         $(selectors[n].selector).parent().before(stringFinal);
       }
     }
   }
 }
 for(l=0;l<positionSpecs.length;l++){
   $(positionSpecs[l].selector).css(positionSpecs[l].cssAttr, positionSpecs[l].preVal);
   resultsShown = 1;
 }

 $("#detailClose").click(function(){
   if(check_click_yellow == 0){
     var jsonArr = [{'dp': "Yellow Hover Crossed ~*" + window.location.hostname}];
     jsonArr = JSON.stringify(jsonArr);
     sendMessage(0, jsonArr, 0, doNothing, []);
     check_click_yellow = 1;
   }
 });
 $("#dd_menu_list").hover(
  function() {
    msg2 = "Results Viewed";
    var port = chrome.runtime.connect({name: "knockknock"});
    port.postMessage({joke: "Knock knock"});
    port.onMessage.addListener(function(msg) {
      if (msg.question == "Product-name")
        port.postMessage({answer: msgToSend});
    });
  }, function() {
  }
  );

 var button = document.getElementById("detailClose");
 button.addEventListener("click", function() {
  for(i=0;i<document.getElementsByClassName('to_del_det_wrap').length;i++){
    document.getElementsByClassName('to_del_det_wrap')[i].remove();
  }
  for(l=0;l<positionSpecs.length;l++){
   $(positionSpecs[l].selector).css(positionSpecs[l].cssAttr, positionSpecs[l].postVal);
   resultsShown = 0;
 }
}, false);


 cancel=false;
 elem1=document.getElementById("compare_now");
 // blinker();
}
}
function hkModalKaDhakkan(){
  var $this = $(this);
  if ($this.hasClass('hk-js-fdbkModal')) {
    hkFdbkWrapper = document.querySelector('.hk-js-modalFeedback__wrapper');
    hkFdbkWrapper.innerHTML = hkFdBkTypes[$this.data('hkfeedback')];

  }
  $('.hk-js-modalFeedback__wrapper').attr("data-source", $this.data('hkfeedback'));
  hkOpenModal($this.data('hkmodal')); // !!IMPORTANT!!. here the element's data tag bears the ID of the modal to be invoked.
}
function coupontracer(){

 //  var button1=document.getElementById("couponClick");
 //  if(button1!=null)
 //  {
 //   button1.addEventListener("click", function(){
 //    var host=window.location.host;
 //    var jsonArr = [{'type': 'button','website':host}];
 //    jsonArr = JSON.stringify(jsonArr);
 //    sendMessage(1, jsonArr,22,doNothing, []);
 //    // console.log("donehere");

 //  });
 // }

//  var button = document.getElementById("couponClick2");
//  if(button!=null)
//  {
//   button.addEventListener("click", function(){
//     var host=window.location.host;
//     var jsonArr = [{'type': 'button','website':host}];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(1, jsonArr,22,doNothing, []);
//     // console.log("donehere");

//   });
// }
var finish=document.getElementsByClassName("hdc-button");
finish[1].addEventListener("click",function(){
  var host=window.location.host;
  var jsonArr = [{'type': 'finish1','website':host}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr,22,doNothing, []);
  // console.log("donehere2");
        //tracer
        tracer(1,4);
        setTimeout(function(){if(JSON.parse(features_json)[4]==0){ft(4);}},100);
      });

finish[2].addEventListener("click",function(){
  var host=window.location.host;
  var jsonArr = [{'type': 'finish2','website':host}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr,22,doNothing, []);
  // console.log("donehere3");
        //tracer
        tracer(1,4);
        setTimeout(function(){if(JSON.parse(features_json)[4]==0){ft(4);}},100);

      });


}

function tracer(listener,type)

{

// console.log("called tracer");
var website= getCurrentPosition(window.location.href);
var pid = "";

if(type==2)
{
  pid= msgToSend.split("~")[0];
  pid = pid.trim();
  if(pid[pid.length-1] == "-"){
    pid = pid.substring(0,(pid.length-1));
  }
}
else if(typeof(getPID) == "function")
{
  pid= getPID();
}

if(type == 1 && typeof(getPID) == "function"){
  pid= getPID();
}

if (pid=='')
{
  pid="0";
}
if(website=='')
{
  website="0";
}

var jsonArr = [{'mode':0,'listener':listener,'type':type,'pid': encodeURIComponent(pid),'website':website}];
jsonArr = JSON.stringify(jsonArr);
sendMessage(1, jsonArr,23,doNothing, []);
    //console.log("type");

  }

//referral

function ft(id)


{

  var jsonArr=[{'ft':id}];
  jsonArr=JSON.stringify(jsonArr);

  sendMessage(1,jsonArr,24,doNothing,[]);

//console.log("clicked"+id);
}


const hkFdBkTypes = {

	autoCoupons: ` <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="A coupon was missing" id="hk-feedback-prob1" class="hk-c-check__input--check">
  <label for="hk-feedback-prob1" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">A coupon was missing</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Takes too long" id="hk-feedback-prob2" class="hk-c-check__input--check">
  <label for="hk-feedback-prob2" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Takes too long</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Unable to stop it" id="hk-feedback-prob3" class="hk-c-check__input--check">
  <label for="hk-feedback-prob3" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Unable to stop it</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="I do not understand what it does" id="hk-feedback-prob4" class="hk-c-check__input--check">
  <label for="hk-feedback-prob4" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">I do not understand what it does</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Not looking good" id="hk-feedback-prob5" class="hk-c-check__input--check">
  <label for="hk-feedback-prob5" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Not looking good</span>
  </label>
  </div>


  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Satisfied" id="hk-feedback-prob0" class="hk-c-check__input--check">
  <label for="hk-feedback-prob0" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Satisfied</span>
  </label>
  </div>


  <div class="hk-u-margin__v-15">

  <div class="hk-u-fSize--big hk-u-margin__v-1"><b>Any Other Feedback?</b></div>

  <textarea class="hk-c-textarea hk-c-textarea--fullWidth" placeholder="Write away..." type="text"></textarea>


  </div>
  `,
  compareResults: `<div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Incorrect Price" id="hk-feedback-prob1" class="hk-c-check__input--check">
  <label for="hk-feedback-prob1" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Incorrect Price</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Wrong product compared" id="hk-feedback-prob2" class="hk-c-check__input--check">
  <label for="hk-feedback-prob2" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Wrong product compared</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Wrong category comparison" id="hk-feedback-prob3" class="hk-c-check__input--check">
  <label for="hk-feedback-prob3" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Wrong category comparison</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="I do not understand what it does" id="hk-feedback-prob4" class="hk-c-check__input--check">
  <label for="hk-feedback-prob4" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">I do not understand what it does</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Not looking good" id="hk-feedback-prob5" class="hk-c-check__input--check">
  <label for="hk-feedback-prob5" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Not looking good</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Out of stock" id="hk-feedback-prob6" class="hk-c-check__input--check">
  <label for="hk-feedback-prob6" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Out of stock</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Satisfied" id="hk-feedback-prob0" class="hk-c-check__input--check">
  <label for="hk-feedback-prob0" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Satisfied</span>
  </label>
  </div>

  <div class="hk-u-margin__v-15">

  <div class="hk-u-fSize--big hk-u-margin__v-1"><b>Any Other Feedback?</b></div>

  <textarea class="hk-c-textarea hk-c-textarea--fullWidth" placeholder="Write away..." type="text"></textarea>


  </div>
  `,
  graph: `<div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Current price does not match" id="hk-feedback-prob1" class="hk-c-check__input--check">
  <label for="hk-feedback-prob1" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Current price does not match</span>
  </label>
  </div>


  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="I do not understand what it does" id="hk-feedback-prob2" class="hk-c-check__input--check">
  <label for="hk-feedback-prob2" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">I do not understand what it does</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Not looking good" id="hk-feedback-prob3" class="hk-c-check__input--check">
  <label for="hk-feedback-prob3" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Not looking good</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Satisfied" id="hk-feedback-prob0" class="hk-c-check__input--check">
  <label for="hk-feedback-prob0" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Satisfied</span>
  </label>
  </div>



  <div class="hk-u-margin__v-15">

  <div class="hk-u-fSize--big hk-u-margin__v-1"><b>Any Other Feedback?</b></div>

  <textarea class="hk-c-textarea hk-c-textarea--fullWidth" placeholder="Write away..." type="text"></textarea>


  </div>
  `,
  sideCoupons: `<div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Too Many Expired Coupons" id="hk-feedback-prob1" class="hk-c-check__input--check">
  <label for="hk-feedback-prob1" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Too Many Expired Coupons</span>
  </label>
  </div>


  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Not all Coupons are here" id="hk-feedback-prob2" class="hk-c-check__input--check">
  <label for="hk-feedback-prob2" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Not all coupons are here</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Not So Intuitive" id="hk-feedback-prob3" class="hk-c-check__input--check">
  <label for="hk-feedback-prob3" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Not So Intuitive</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Not looking good" id="hk-feedback-prob4" class="hk-c-check__input--check">
  <label for="hk-feedback-prob4" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Not looking good</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Satisfied" id="hk-feedback-prob0" class="hk-c-check__input--check">
  <label for="hk-feedback-prob0" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Satisfied</span>
  </label>
  </div>

  <div class="hk-u-margin__v-15">

  <div class="hk-u-fSize--big hk-u-margin__v-1"><b>Any Other Feedback?</b></div>

  <textarea class="hk-c-textarea hk-c-textarea--fullWidth" placeholder="Write away..." type="text"></textarea>


  </div>
  `,
  watchPrice: `<div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Incorrect Price Drop: The price was not the same as mentioned " id="hk-feedback-prob1" class="hk-c-check__input--check">
  <label for="hk-feedback-prob1" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Incorrect Price Drop: The price was not the same as mentioned </span>
  </label>
  </div>


  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Not able to remove an alert" id="hk-feedback-prob2" class="hk-c-check__input--check">
  <label for="hk-feedback-prob2" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Not able to remove an alert</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Unable to find watch price button" id="hk-feedback-prob3" class="hk-c-check__input--check">
  <label for="hk-feedback-prob3" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Unable to find watch price button</span>
  </label>
  </div>

  <div class="hk-c-check">
  <input type="checkbox" name="hk-feedback__checks" value="Satisfied" id="hk-feedback-prob0" class="hk-c-check__input--check">
  <label for="hk-feedback-prob0" class="hk-c-check__label hk-c-btn hk-c-btn--outline">
  <span class="hk-c-check__labelText">Satisfied</span>
  </label>
  </div>



  <div class="hk-u-margin__v-15">

  <div class="hk-u-fSize--big hk-u-margin__v-1"><b>Any Other Feedback?</b></div>

  <textarea class="hk-c-textarea hk-c-textarea--fullWidth" placeholder="Write away..." type="text"></textarea>


  </div>
  `,
}
/***************** autocoupons *********/

if(!localStorage.someMoney){
  localStorage.someMoney = "some money";
}

const hkAutoCoupMsgs = {
  inProgress: {
    headerText: `Fetching the best coupons for you!`,
    wrapContent: `
    <div class="hk-u-fSize--large hk-u-margin__2-a   hk-u-text__align--center">
    <b class="hk-aCoup__headingText">Trying Coupons</b>
    </div>
    <div class="hk-u-text__align--center">
    <svg viewBox="0 0 100 100" class="hk-ext__icons--semiMed hk-aCoup__coupClock">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__loading" >
    </use>
    </svg><b class="hk-u-fSize--xxlarge hk-aCoup__coupsTried">0</b><b class="hk-u-text--lighter hk-u-fSize--large hk-aCoup__coupsTot">/total</b>
    </div>
    <div class="hk-u-margin__2-a hk-c-progress">
    <div class="hk-c-progress__wrap">
    <div class="hk-c-progress__inner" style="width:0%"></div>
    </div>
    </div>
    <div class="hk-u-margin__v-2 hk-u-padding__v-2   hk-u-text__align--center">
    <div class="hk-u-fSize--big"><b>You got <span class="hk-u-fSize--large hk-u-text--lightGreen hk-aCoup__netSavings"><span class="hk-u-text--super">&#8377;</span><b>0</b></span> OFF!</b></div>
    <div class="hk-u-fSize--small hk-u-text--lighter">with coupon <b class="hk-js-autoCoup__bestCouponTill">loading...</b></div>
    </div>
    `,
    footerContent: `
    <div class="hk-u-flexChild--right">
    <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close">Cancel</button>
    </div>
    `,
    clicks:
    [
    {
      item: `#hk-autoCoupon .hk-js-aCoup__playPause`,
      fn: `hkAutoCoup.playPause()`
    },
    {
      item: `#hk-autoCoupon .hk-js-modal__close`,
      fn: `hkCloseModalBinder.call(this)`
    }

    ]
  },
  success: {
    headerText: `We got a good offer you can't refuse!`,
    wrapContent: `
    <div class="hk-u-text__align--center hk-u-fSize--xxlarge hk-u-margin__1-a">
    <svg viewBox="0 0 231.9 175.6" style="height:60px">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__baiHappy"></use>
    </svg>
    </div>
    <div class="hk-u-fSize--large hk-u-text__align--center hk-u-margin__1-a">
    <b class="hk-aCoup__headingText">Hurray!</b>
    </div>

    <div class="hk-u-margin__v-15 hk-u-padding__v-2   hk-u-text__align--center">
    <div class="hk-u-fSize--big">We've applied a coupon that gives you <br><b><span class="hk-u-fSize--large hk-u-text--lightGreen hk-aCoup__netSavings"><span class="hk-u-text--super">&#8377;</span><b>0</b></span> OFF</b> for this purchase!</div>
    <div class="hk-u-fSize--small hk-u-text--lighter">with coupon <b class="hk-js-autoCoup__bestCouponTill">loading...</b></div>
    </div>
    <div class="hk-u-text__align--center">
    <div class="hk-u-margin__v-1 hk-u-text__align--center">
    Share your happiness with others!
    </div>
    <a href="https://www.facebook.com/sharer/sharer.php?sdk=joey&u=http%3A%2F%2Fcompare.buyhatke.com%2Fextension.php%3Futm_source-auto-coupon&display=popup&ref=plugin&src=share_button" target="_blank" class="hk-c-btn hk-c-btn--facebook">
    <svg class="hk-ext__icons--small hk-u-margin__h-05 hk-u-va--top" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__facebook"></use></svg>Share
    </a>

    <a href="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fcompare.buyhatke.com%2Fextension.php%3Futm_source-auto-coupon
    &ref_src=twsrc%5Etfw&text=Yipee%21+I+just+saved+${localStorage.someMoney}+by+using+Auto-coupon+Feature+of+Buyhatke+Chrome+Extension.&tw_p=tweetbutton&url=http%3A%2F%2Fcompare.buyhatke.com%2Fextension.php%3Futm_source-auto-coupon" target="_blank" class="hk-c-btn hk-c-btn--twitter">
    <svg class="hk-ext__icons--small hk-u-margin__h-05 hk-u-va--top" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__twitter"></use></svg>Tweet
    </a>

    <a href="https://plus.google.com/u/0/share?url=http%3A%2F%2Fcompare.buyhatke.com%2Fextension.php%3Futm_source-auto-coupon&source=yt&hl=en&soc-platform=1&soc-app=130" target="_blank" class="hk-c-btn hk-c-btn--gPlus">
    <svg class="hk-ext__icons--small hk-u-margin__h-05 hk-u-va--top" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__gPlus"></use></svg>Share
    </a>
    </div>
    `,
    footerContent: `
    <div class="hk-c-links hk-c-links--iconTri hk-tri--right hk-js-modal__open hk-js-fdbkModal" data-hkmodal="hk-feedback" data-hkfeedback="autoCoupons">
    <svg class="hk-ext__icons--small hk-u-margin__h-05 hk-u-va--top" viewBox="0 0 16.4 17.3"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__feedback"></use></svg>Send Feedback
    </div>
    <div class="hk-u-flexChild--right">
    <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close">Close</button>
    </div>
    `,
    clicks:
    [
    {
      item: `#hk-autoCoupon .hk-js-modal__close`,
      fn: `hkCloseModalBinder.call(this)`
    },
    {
      item: `#hk-autoCoupon .hk-js-fdbkModal`,
      fn: `hkModalKaDhakkan.call(this)`,
    }

    ]
  },
  failed: {
    headerText: `We Tried, Dost!`,
    wrapContent: `
    <div class="hk-u-text__align--center hk-u-fSize--xxlarge hk-u-margin__1-a">
    <svg viewBox="0 0 231.9 175.6" style="height:60px">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__baiSad"></use>
    </svg>
    </div>
    <div class="hk-u-fSize--large hk-u-text__align--center hk-u-margin__1-a">
    <b class="hk-aCoup__headingText">Sorry!</b>
    </div>
    <div class="hk-u-margin__2-a hk-u-fSize--big ">
    We tried <b class="hk-coup-length">0</b> coupons but none of them worked for your current cart. We have enrolled you for lucky draw :)
    </div>
    <div class="hk-u-padding__v-05 hk-u-text__align--center">
    <div class="hk-u-margin__v-1">
    If you found any valid coupons not in the list, you can submit to us here:
    </div>
    <button class="hk-c-btn hk-c-btn--orange hk-c-links--iconTri hk-tri--right hk-js-coupSubmit__open">Submit Coupons</button>

    </div>
    `,
    footerContent: `
    <div class="hk-c-links hk-c-links--iconTri hk-tri--right hk-js-modal__open hk-js-fdbkModal" data-hkmodal="hk-feedback" data-hkfeedback="autoCoupons">
    <svg class="hk-ext__icons--small hk-u-margin__h-05 hk-u-va--top" viewBox="0 0 16.4 17.3"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__feedback"></use></svg>Send Feedback
    </div>
    <div class="hk-u-flexChild--right">
    <button class="hk-c-btn hk-c-btn--outline hk-js-modal__close">Close</button>
    </div>
    `,
    clicks:
    [
    {
      item: `#hk-autoCoupon .hk-js-coupSubmit__open`,
      fn: `hkSubmitCoup.openModal()`
    },
    {
      item: `#hk-autoCoupon .hk-js-modal__close`,
      fn: `hkCloseModalBinder.call(this)`
    },
    {
      item: `#hk-autoCoupon .hk-js-fdbkModal`,
      fn: `hkModalKaDhakkan.call(this)`,
    }

    ]

  }
}
