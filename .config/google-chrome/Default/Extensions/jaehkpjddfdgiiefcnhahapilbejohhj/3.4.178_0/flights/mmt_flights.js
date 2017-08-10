function scrapFlightData(){
  var from = "";
  var to = "";
  var startDate = "";
  var isReturn = "";
  var adults = "";
  var infants = "";
  var children = "";
  var cabinClass = "";
  var returnDate = "";
  var flightData = [];

  // //flights.makemytrip.com/makemytrip/search/O/O/E/1/0/0/S/V0/BLR_GOI_23-11-2016?intid=homepage_Widget_Search_Bangalore_Goa

  // //flights.makemytrip.com/makemytrip/search/R/R/E/1/0/0/S/V0/BLR_GOI_23-11-2016,GOI_BLR_24-11-2016?intid=DF_LP_Widget_Search_Bangalore_Goa

// https://cheapfaresindia.makemytrip.com/international/raw/index.html?l=exIndia&t=RT&i=BLR-JNB-D-24Nov2016_JNB-BLR-D-30Nov2016&p=A-1&c=E&userID=60181479386050107#/listing

// https://cheapfaresindia.makemytrip.com/international/raw/index.html?l=exIndia&t=OW&i=BLR-JNB-D-24Nov2016&p=A-1&c=E?lang=en#/listing
var cur_url = window.location.href;
var link = window.location.href;
if(cur_url.split("//flights.makemytrip.com/makemytrip/search").length > 1){
  cur_url = cur_url.split("//flights.makemytrip.com/makemytrip/search");
  cur_url = cur_url[1];
  if(cur_url.split("?").length > 1){
    cur_url = cur_url.split("?");
    cur_url = cur_url[0];
  }
  from = cur_url.split("_");
  from = from[0];
  from = from.split("/");
  from = from[from.length-1];

  to = cur_url.split("_");
  to = to[1];

  if(link.split("/R/").length > 1){
    returnDate = cur_url.split("_");
    returnDate = returnDate[returnDate.length-1];
    startDate = cur_url.split(",");
    startDate = startDate[0];
    startDate = startDate.split("_");
    startDate = startDate[startDate.length-1];
    returnDate = returnDate.split("-");
    returnDate1 = returnDate[returnDate.length-1];
    returnDate2 = returnDate[1];
    returnDate3 = returnDate[0];
    returnDate = returnDate1+"-"+returnDate2+"-"+returnDate3;
    isReturn = 1;
  }
  else if(link.split("/O/").length > 1){
    isReturn = 0;
    returnDate = "";
    startDate = cur_url.split("_");
    startDate = startDate[startDate.length-1];
  }
  startDate = startDate.split("-");
  startDate1 = startDate[startDate.length-1];
  startDate2 = startDate[1];
  startDate3 = startDate[0];
  startDate = startDate1+"-"+startDate2+"-"+startDate3;

  cabinClass = cur_url.split("/");
  cabinClass = cabinClass[3];

  adults = cur_url.split("/");
  adults = adults[4];

  children = cur_url.split("/");
  children = children[5];

  infants = cur_url.split("/");
  infants = infants[6];
  if(cabinClass == "E"){
    cabinClass = "Economy";
  }
  else if(cabinClass == "PE"){
    cabinClass = "PremiumEconomy";
  }
  else if(cabinClass == "B"){
    cabinClass = "Business";
  }

  flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn);
}

var posResults = [];
posResults.push({selector: '#chf_header', attr: 'none', pos: 'before'});
posResults = JSON.stringify(posResults);
var posSpecs = [];
posSpecs.push({selector: '#chf_header', attr: 'none', cssAttr: 'margin-top', preVal: '46px', postVal: '0px'});
posSpecs.push({selector: '#webklipper-publisher-widget-container-notification-frame', attr: 'none', cssAttr: 'margin-top', preVal: '46px', postVal: '0px'});
posSpecs = JSON.stringify(posSpecs);

if(flightData.length > 0){
  flightData = JSON.stringify(flightData);
  flightBanner(flightData, posResults, posSpecs);
}
return;
}

var cur_url1 = window.location.href;
if(cur_url1.split("//flights.makemytrip.com/makemytrip/search").length > 1){
  scrapFlightData();
}


function checkURL(){
  var url = window.location.href;
  if(cur_url1 != url){
    if(url.split("//flights.makemytrip.com/makemytrip/search").length > 1){
      $(".hk-compBar").remove();
      $('#chf_header').css("margin-top", "0px")
      $('#webklipper-publisher-widget-container-notification-frame').css("margin-top", "0px")
      scrapFlightData();
    }
    cur_url1 = url;
    // console.log("Successful");
  }
}

setInterval(function(){
  checkURL();
}, 500);


function checkFlightBarPos(){
  // console.log("checkFlightBarPos was called ");
  if($(".hk-compBar").length > 0 && $("#webklipper-publisher-widget-container-notification-frame").length > 0){
    $("#webklipper-publisher-widget-container-notification-frame").css("margin-top", "46px");
    $("#chf_header").css("margin-top", "46px");
  }
  else{
    setTimeout(checkFlightBarPos, 1500);
  }
}
checkFlightBarPos();
