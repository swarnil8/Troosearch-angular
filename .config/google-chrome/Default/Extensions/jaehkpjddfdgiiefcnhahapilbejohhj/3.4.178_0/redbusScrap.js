
$('body').append("<div id='ourSearchKey_pid' style='display:none;'></div>")
var scr = document.createElement("script");
scr.type="text/javascript";
var a = "document.getElementById('ourSearchKey_pid').innerHTML= JSON.stringify(offerRequired)";
scr.innerHTML = a;
document.body.appendChild(scr);

function createData(){
 if(document.getElementById('ourSearchKey_pid').innerHTML==""){
  setTimeout(function(){createData()}, 2000);
}
else {
 var data = document.getElementById('ourSearchKey_pid').innerHTML.trim();
 var offerRequired = JSON.parse(data);
 var p = offerRequired.Trips[0];
 var o, d, l = "", c = 0, u = null, m = "";
 var r = {};
 s = $("#otp_code").val(); var N = "SOMECODE";
 for (o = 0,d = offerRequired.Trips[0].PaxList.length; o < d; o++) {
  var f = offerRequired.Trips[0].PaxList[o];
  l = l.concat(f.SeatNo),
  c++
}
if (offerRequired.Trips.length > 1) {
  for (o = 0, d = offerRequired.Trips[1].PaxList.length; o < d; o++) {
    var f = offerRequired.Trips[1].PaxList[o];
    l = l.concat(f.SeatNo),
    c++
  }
  u = offerRequired.Trips[1].DateOfJourney,
  m = offerRequired.Trips[1].OperatorId
}
var h = "";
"1" == $(".payment-opt-wrap ul > li.active").attr("data-pgtypeid") ? h = $("#CCARDNO").val().replace(/ /g, "") : "2" == $(".payment-opt-wrap ul > li.active").attr("data-pgtypeid") && (h = $("#DCARDNO").val().replace(/ /g, ""));
r.OrderId = offerRequired.Orderdetails.OrderId;
r.FareBreakUp = offerRequired.FareBreakUp;
var p = offerRequired.Trips[0];
r.IsWalletChecked = false;
for (var y = 0, g = offerRequired.FareBreakUp.Onward[0].Value.amount, o = 0; o< offerRequired.FareBreakUp.Onward.length; o++)
  y += offerRequired.FareBreakUp.Onward[o].Value.amount;
if (null != offerRequired.FareBreakUp.Return && void 0 != offerRequired.FareBreakUp.Return && "" != offerRequired.FareBreakUp.Return && offerRequired.FareBreakUp.Return.length > 0) {
  g += offerRequired.FareBreakUp.Return[0].Value.amount;
  for (var v = 0; v < offerRequired.FareBreakUp.Return.length; v++)
    y += offerRequired.FareBreakUp.Return[v].Value.amount
}
r.OfferRequest = {
  mobileNo: p.MobileNo,
  emailId: p.EmailId,
  Units: l,
  NoOfUnits: c,
  NoOfTravellers: c,
  DateOfIssue: null,
  DateOfTravel: p.DateOfJourney,
  DateOfReturn: u,
  age: p.PaxList[0].Age,
  referralNo: null,
  TIN: null,
  sourceId: p.SourceId,
  destinationId: p.DestinationId,
  OperatorId: p.OperatorId,
  OperatorType: null,
  BoardingPointId: p.BPDetails.Id,
  Amenities: null,
  userId: null,
  BUType: p.BusType,
  IsReturnTrip: p.IsReturn,
  DelType: null,
  AdditionalVariables: null,
  OfferCode: "**",
  salesChannel: "WEB_DIRECT",
  Currency: offerRequired.FareBreakUp.TotalTripFare.currencyType,
  OfferType: null,
  CashCouponCode: null,
  otp: s,
  hash: null,
  Version: null,
  OS: null,
  BaseFare: g,
  ActualFare: null,
  TotalFare: y,
  RemainingFare: null,
  PaymentType: null,
  CARDNO: h,
  NETBANKING_BANK: null,
  TransactionType: null,
  CartId: offerRequired.Orderdetails.OrderId,
  PGType: null,
  HD_CITY: null,
  HD_CITY_AREA: null,
  delcharges: null,
  RTOperatorId: m
}
return (r);
}

}

function sendCoupon(){
 $ = jQuery.noConflict();
 couponToSend = [];
 var cur_link = window.location.href;

 if(cur_link.split("redbus.in/info/OfferTerms").length > 1){

   if($('.offerTilebutton').length > 0){
     var slider = $('.offerTilebutton');
     var sliderLength = slider.length;
     var couponUrl = "";
     var couponCode = "";
     var couponText = "";
     var couponDesc = "";
     var couponExp = 0;
     var couponAt = 1290;

     for(i=0;i<sliderLength;i++){
       couponUrl = cur_link;
       couponCode = "";
       couponText = "";
       couponDesc = "";

       if($('.offerTilebutton:eq('+ i +')').attr("data-promo")){
         couponCode = $('.offerTilebutton:eq('+ i +')').attr("data-promo").trim();
         if(couponCode.toUpperCase().split("NO OFFER CODE REQUIRED").length > 1){
          couponCode = "NO CODE REQUIRED";
        }
      }

      if($('.offerTilebutton:eq('+ i +') .OfferDes').length > 0){
       couponText = $('.offerTilebutton:eq('+ i +')').find(".OfferDes:eq(0)").text().trim();
     }

     if($('.offerTilebutton:eq('+ i +')').find(".OfferValidity").length > 0){
      couponExp1 = $('.offerTilebutton:eq('+ i +')').find(".OfferValidity:eq(0)").text().trim();
      if(couponExp1.split("Till: ").length > 1){
        couponExp1 = couponExp1.split("Till: ");
        couponExp1 = couponExp1[1].trim();

        if(couponExp1.split("-").length > 1){
          couponExp2 = couponExp1.split("-");
          couponExp3 = couponExp2[0].trim();
          couponExp4 = couponExp2[1].trim();
          couponExp5 = couponExp2[2].trim();

          if(couponExp4.toUpperCase().split("JAN").length > 1){
            couponExp4 = "01";
          }
          else if(couponExp4.toUpperCase().split("FEB").length > 1){
            couponExp4 = "02";
          }
          else if(couponExp4.toUpperCase().split("MAR").length > 1){
            couponExp4 = "03";
          }
          else if(couponExp4.toUpperCase().split("APR").length > 1){
            couponExp4 = "04";
          }
          else if(couponExp4.toUpperCase().split("MAY").length > 1){
            couponExp4 = "05";
          }
          else if(couponExp4.toUpperCase().split("JUN").length > 1){
            couponExp4 = "06";
          }
          else if(couponExp4.toUpperCase().split("JUL").length > 1){
            couponExp4 = "07";
          }
          else if(couponExp4.toUpperCase().split("AUG").length > 1){
            couponExp4 = "08";
          }
          else if(couponExp4.toUpperCase().split("SEP").length > 1){
            couponExp4 = "09";
          }
          else if(couponExp4.toUpperCase().split("OCT").length > 1){
            couponExp4 = "10";
          }
          else if(couponExp4.toUpperCase().split("NOV").length > 1){
            couponExp4 = "11";
          }
          else if(couponExp4.toUpperCase().split("DEC").length > 1){
            couponExp4 = "12";
          }

          couponExp = couponExp5+"-"+couponExp4+"-"+couponExp3+" 23:59:59";
        }

      }
    }

    if(couponCode != couponCode.toUpperCase()){
      couponCode = "";
    }

    if(couponCode != ""){
     couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
   }

 }     

}

}

if(cur_link.split("redBus_offers").length > 1){

 if($('.offer-box').length > 0){
   var slider = $('.offer-box');
   var sliderLength = slider.length;
   var couponUrl = "";
   var couponCode = "";
   var couponText = "";
   var couponDesc = "";
   var couponExp = 0;
   var couponAt = 1290;

   for(i=0;i<sliderLength;i++){
     couponUrl = cur_link;
     couponCode = "";
     couponText = "";
     couponDesc = "";

     if($('.offer-box:eq('+ i +')').find(".offer_code").length > 0){
       couponCode = $('.offer-box:eq('+ i +')').find(".offer_code:eq(0)").text().trim();
     }

     if($('.offer-box:eq('+ i +')').length > 0){
       couponText1 = $('.offer-box:eq('+ i +')').find("h2:eq(0)").text().trim();
       couponText = couponText1+ ": " + $('.offer-box:eq('+ i +')').find("h3:eq(0)").text().trim();
     }

     if($('.offer-box:eq('+ i +')').find(".highlight-text").length > 0){
      couponExp1 = $('.offer-box:eq('+ i +')').find(".highlight-text:eq(0)").text().trim();
      if(couponExp1.split("till").length > 1){
        couponExp1 = couponExp1.split("till");
        couponExp1 = couponExp1[1].trim();

        if(couponExp1.split("-").length > 1){
          couponExp2 = couponExp1.split("-");
          couponExp3 = couponExp2[0].trim();
          couponExp4 = couponExp2[1].trim();
          couponExp5 = couponExp2[2].trim();

          if(couponExp4.toUpperCase().split("JAN").length > 1){
            couponExp4 = "01";
          }
          else if(couponExp4.toUpperCase().split("FEB").length > 1){
            couponExp4 = "02";
          }
          else if(couponExp4.toUpperCase().split("MAR").length > 1){
            couponExp4 = "03";
          }
          else if(couponExp4.toUpperCase().split("APR").length > 1){
            couponExp4 = "04";
          }
          else if(couponExp4.toUpperCase().split("MAY").length > 1){
            couponExp4 = "05";
          }
          else if(couponExp4.toUpperCase().split("JUN").length > 1){
            couponExp4 = "06";
          }
          else if(couponExp4.toUpperCase().split("JUL").length > 1){
            couponExp4 = "07";
          }
          else if(couponExp4.toUpperCase().split("AUG").length > 1){
            couponExp4 = "08";
          }
          else if(couponExp4.toUpperCase().split("SEP").length > 1){
            couponExp4 = "09";
          }
          else if(couponExp4.toUpperCase().split("OCT").length > 1){
            couponExp4 = "10";
          }
          else if(couponExp4.toUpperCase().split("NOV").length > 1){
            couponExp4 = "11";
          }
          else if(couponExp4.toUpperCase().split("DEC").length > 1){
            couponExp4 = "12";
          }

          couponExp = couponExp5+"-"+couponExp4+"-"+couponExp3+" 23:59:59";
        }

      }
    }

    if(couponCode != ""){
     couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
   }

 }     

}

}

if(cur_link.split("redBusHotel_offers").length > 1){
  desc_len = 0;
  couponUrl = cur_link;
  couponCode = "";
  couponText = "";
  couponDesc = "";

  if($("#hoteloffer").length > 0){
    couponText = $("#hoteloffer").text().trim();
  }
  if($(".pOpt li").length > 0){
    desc_len = $(".pOpt li").length;

    for(j=0;j<desc_len-2;j++){
      couponDesc += $(".pOpt li:eq("+j+")").text().trim() + ". ";
    }
    if(couponDesc.split("offer code").length > 1){
      couponCode1 = couponDesc.split("offer code");
      couponCode1 = couponCode1[1].trim();
      if(couponCode1.split(". ").length > 1){
        couponCode1 = couponCode1.split(". ");
        couponCode1 = couponCode1[0].trim();
      }
      if(couponCode1 == couponCode1.toUpperCase()){
        couponCode = couponCode1;
      }
      else{
        couponCode = "";
      }
    }
  }
  if(couponCode != ""){
   couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
 }
}
if(couponToSend.length > 0){
  couponToSend = JSON.stringify(couponToSend);
  var jsonArr = [{'couponsExt': couponToSend}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 15, doNothing, []);  
}
}
sendCoupon();

if($("#apply_offer").length > 0){
  var checkPick = "#apply_offer.dn";
  var selector = "#offer_code";
  var attr = "";
  var webID = 1290;
  var homeLink = "http://www.redbus.in/";
  pickAppliedCpn(checkPick, selector, attr, webID, homeLink);
} 
else if($("#offerInputs").length > 0){
  getAppliedCpn();
}

function getAppliedCpn(){
 if($("#offer-error").text().toUpperCase().split("CONGRATULATIONS").length > 1){
   var checkPick = "#offercode";
   var selector = "#offercode";
   var attr = "";
   var webID = 1290;
   var homeLink = "http://www.redbus.in/";
   pickAppliedCpn(checkPick, selector, attr, webID, homeLink);
 } 
 else{
  setTimeout(getAppliedCpn, 2000);
}
}

var cur_url = window.location.href;
if(cur_url.split("redbus.in/Pay/PaymentDetails").length > 1){

  var scriptText = "document.getElementById('hdiv').innerText= sourceId+'~'+destinationId+'~'+RouteId+'~'+operatorId+'~'+DateOfJourney+'~'+numSeats+'~'+operatorId_rtd+'~'+pmobile+'~'+pname+'~'+pUserId;";
  var rwscript = document.createElement("script");
  var hdiv=document.createElement("div");
  hdiv.id="hdiv";
  document.body.appendChild(hdiv);
  rwscript.type = "text/javascript";
  rwscript.textContent = scriptText;
  document.body.appendChild(rwscript);


  var selectorACIcon = ".offer-block";
  var position = "after";
  var parent = "none";
  var method = "POST";
  var api = "https://www.redbus.in/Pay/OfferFareBreakup";
  var postFields = {};
  var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, site: 25 }];
  details = JSON.stringify(details);
  displayACIcon(selectorACIcon, parent, position, 25, details);
}

savings = [];
bestSaving = 0;
bestCoupon = "";

function startSaving(data){
  data = JSON.parse(data);
  var nowCode = "";
  var nowSaving = "";
  var resp = data[0].data;
  var code = data[0].code.trim();
  var csaving = 0;
  var ecashsaving = 0;
  var savingsObject = {};
  nowCode = code;
  if(resp != "" && code != ""){
    if(resp.offerResponse && resp.offerResponse.data && resp.offerResponse.data.Response != "FAILURE"){
      if(resp.offerResponse.data.Value){
        csaving = resp.offerResponse.data.Value;
        csaving = filter_price(csaving);
        if(isNaN(csaving)){
          csaving = 0
        }
        else if(csaving > bestSaving){
          bestSaving = csaving;
          bestCoupon = code;
        }
      }
    }
  }
  var savingsLen = savings.length;
  savingsObject["code"] = code;
  savingsObject["saving"] = csaving;
  savingsObject["ecash"] = ecashsaving;
  savings[savingsLen] = savingsObject;
  localStorage.savings = JSON.stringify(savings);
  doneSavingCheck++;
  if(doneSavingCheckFn() == 1){
    applyBestCoupon();
    if(localStorage.anaSent!=1 && parseInt(bestSaving) != 0 && bestSaving!="" && !isNaN(parseInt(bestSaving))){
    localStorage.anaSent = 1;
    var host=window.location.host;
    var jsonArr = [{'type': 'finish1','website':host}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,22,doNothing, []);
    tracer(1,4);
    setTimeout(function(){if(JSON.parse(features_json)[4]==0){ft(4);}},100);
  }
  }
}

var mainClick = 0;
function applyBestCoupon(){
  console.log("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
  if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "")){
    if($("#offerCheckBox").length > 0){
      if(mainClick == 0){
        document.getElementById("offerCheckBox").click();
        mainClick = 1;
      }
      if($("#offercode").length > 0 && $(".applyButton").length > 0){
        $("#offercode").parent().find("label:eq(0)").addClass("move-up");
        $("#offercode").val(bestCoupon.trim());
        $(".applyButton").removeAttr("disabled");
        document.getElementsByClassName("applyButton")[0].click();
        displayFinalSavings();
      }
      else{
        setTimeout(applyBestCoupon, 1000);
      }
    }
    else{
      setTimeout(applyBestCoupon, 1000);
    }
  }
  else{
    displayNoSavings();
  }
}