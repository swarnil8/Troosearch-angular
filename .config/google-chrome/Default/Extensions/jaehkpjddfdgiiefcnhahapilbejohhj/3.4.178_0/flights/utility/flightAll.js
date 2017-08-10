var tabID = 0;
function convertINRToUSD(){
  var amount = 1.00;
  var from_Currency = 'INR';
  var to_Currency = 'USD';
  var amount = encodeURIComponent(amount);
  var from_Currency = encodeURIComponent(from_Currency);
  var to_Currency = encodeURIComponent(to_Currency);
  $.get("https://www.google.com/finance/converter?a="+amount+"&from="+from_Currency+"&to="+to_Currency).success(function(data){
    data1 = data.split('currency_converter_result');
    data1 = data1[1];
    data1 = data1.split('USD');
    data1 = data1[0];
    data1 = data1.split('>');
    data1 = data1[data1.length-1];
    setCookie("currency_to_usd", data1, 1);
  });
  return;
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

function convertMonth(date){
  month = "";
  date = date.toUpperCase();
  if(date.split("JAN").length > 1){
    month = 01;
    mon = "JAN";
  }
  else if(date.split("FEB").length > 1){
    month = 02;
    mon = "FEB";
  }
  else if(date.split("MAR").length > 1){
    month = 03;
    mon = "MAR";
  }
  else if(date.split("APR").length > 1){
    month = 04;
    mon = "APR";
  }
  else if(date.split("MAY").length > 1){
    month = 05;
    mon = "MAY";
  }
  else if(date.split("JUN").length > 1){
    month = 06;
    mon = "JUN";
  }
  else if(date.split("JUL").length > 1){
    month = 07;
    mon = "JUL";
  }
  else if(date.split("AUG").length > 1){
    month = 08;
    mon = "AUG";
  }
  else if(date.split("SEP").length > 1){
    month = 09;
    mon = "SEP";
  }
  else if(date.split("OCT").length > 1){
    month = 10;
    mon = "OCT";

  }
  else if(date.split("NOV").length > 1){
    month = 11;
    mon = "NOV";

  }
  else if(date.split("DEC").length > 1){
    month = 12;
    mon = "DEC";

  }
  return month;
}

function convertMonthInt(date){
  date = parseInt(date);
  mon = date;
  if(date == 1){
    mon = "Jan";
  }
  else if(date == 2){
    mon = "Feb";
  }
  else if(date == 3){
    mon = "Mar";
  }
  else if(date == 4){
    mon = "Apr";
  }
  else if(date == 5){
    mon = "May";
  }
  else if(date == 6){
    mon = "Jun";
  }
  else if(date == 7){
    mon = "Jul";
  }
  else if(date == 8){
    mon = "Aug";
  }
  else if(date == 9){
    mon = "Sep";
  }
  else if(date == 10){
    mon = "Oct";

  }
  else if(date == 11){
    mon = "Nov";

  }
  else if(date == 12){
    mon = "Dec";

  }
  return mon;
}

function convertDate(date){
  //int mmt case
  date = date.toUpperCase();
  date.split("").length > 1
  if(date.split("JAN").length > 1){
    month = 01;
    mon = "JAN";
  }
  else if(date.split("FEB").length > 1){
    month = 02;
    mon = "FEB";
  }
  else if(date.split("MAR").length > 1){
    month = 03;
    mon = "MAR";
  }
  else if(date.split("APR").length > 1){
    month = 04;
    mon = "APR";
  }
  else if(date.split("MAY").length > 1){
    month = 05;
    mon = "MAY";
  }
  else if(date.split("JUN").length > 1){
    month = 06;
    mon = "JUN";
  }
  else if(date.split("JUL").length > 1){
    month = 07;
    mon = "JUL";
  }
  else if(date.split("AUG").length > 1){
    month = 08;
    mon = "AUG";
  }
  else if(date.split("SEP").length > 1){
    month = 09;
    mon = "SEP";
  }
  else if(date.split("OCT").length > 1){
    month = 10;
    mon = "OCT";

  }
  else if(date.split("NOV").length > 1){
    month = 11;
    mon = "NOV";

  }
  else if(date.split("DEC").length > 1){
    month = 12;
    mon = "DEC";

  }

  date1 = date.split(mon);
  date1 = date1[0];
  year = date.split(mon);
  year = year[1];

  return year+"-"+month+"-"+date1;

}

function flightBanner(flightData, posResults, posSpecs){
  // console.log("Flight banner was called");
  if($("#svg-hatke-flights-id").length == 0){
    $("body").append(str_flight);
  }
  flightData = JSON.parse(flightData);
  var from = flightData[0];
  var to = flightData[1];
  var startDate = flightData[2];
  var returnDate = flightData[3];
  var cabinClass = flightData[4];
  var adults = flightData[5];
  var children = flightData[6];
  var infants = flightData[7];
  var isReturn = flightData[8];
  var currency = 0;

  if(cabinClass == ""){
    cabinClass = "Economy";
  }
  if(startDate.split("-").length > 1){
    startDate1 = startDate.split("-")[0];
    startDate2 = startDate.split("-")[1];
    startDate3 = startDate.split("-")[2];
    if(startDate2.length == 1){
      startDate2 = "0"+startDate2;
    }
    if(startDate3.length == 1){
      startDate3 = "0"+startDate3;
    }
    startDate = startDate1+"-"+startDate2+"-"+startDate3;
  }

  if(isReturn == 1 && returnDate.split("-").length > 1){
    returnDate1 = returnDate.split("-")[0];
    returnDate2 = returnDate.split("-")[1];
    returnDate3 = returnDate.split("-")[2];
    if(returnDate2.length == 1){
      returnDate2 = "0"+returnDate2;
    }
    if(returnDate3.length == 1){
      returnDate3 = "0"+returnDate3;
    }
    returnDate = returnDate1+"-"+returnDate2+"-"+returnDate3;
  }
  if(flightData[9] && flightData[9] == 'USD'){
   // var postFields = encodeURIComponent('&originplace='+from+'&destinationplace='+to+'&outbounddate='+startDate+'&inbounddate='+returnDate+'&adults='+adults+'&children='+children+'&infants='+infants+'&cabinclass='+cabinClass+'&currency=USD');
   currency = 1;
 }
 else {
   currency = 0;
 }
 var postFields = encodeURIComponent('&originplace='+from+'&destinationplace='+to+'&outbounddate='+startDate+'&inbounddate='+returnDate+'&adults='+adults+'&children='+children+'&infants='+infants+'&cabinclass='+cabinClass);

 var jsonArr = [{"postFields": postFields, "posResults": encodeURIComponent(posResults), "posSpecs": encodeURIComponent(posSpecs), "currency": currency}];
 jsonArr = JSON.stringify(jsonArr);
 var passB = [{"postFields": postFields}];
 passB = JSON.stringify(passB);

 var session_flights = getCookie("flights_session");
 var session_flights_post = getCookie("flights_session_post");
 var ss_mmt_code = getCookie("ss_mmt_code");
 if(ss_mmt_code){
  var mmt_code = ss_mmt_code.split("~*~");
  mmt_code = mmt_code[1];
}
else{
  mmt_code = "";
}
if(session_flights && session_flights_post && session_flights != "" && session_flights_post == passB){
  var jsonArr1 = [{"code": encodeURIComponent(getCookie("flights_session")), "postFields": postFields, "posResults": encodeURIComponent(posResults), "posSpecs": encodeURIComponent(posSpecs), "mmt_code": encodeURIComponent(mmt_code), "mmt_data": "", "called": 0, "currency": currency}];
  jsonArr1 = JSON.stringify(jsonArr1);
  sendMessageFlights(1, jsonArr1, 27, displayFinalFlights, jsonArr1);
}
else{
  setCookie("ss_mmt_code", "", -1);
  sendMessageFlights(1, jsonArr, 26, saveFlightSession, jsonArr);
  var jsonArr22 = [];
  var cabinclass_mmt = cabinClass;
  var outbounddate_mmt = startDate;
  var inbounddate_mmt = returnDate;
  var originplace_mmt = from;
  var adults_mmt = adults;
  var children_mmt = children;
  var infants_mmt = infants;
  var destinationplace_mmt = to;
  outbounddate_mmt = outbounddate_mmt.split("-");
  outdate1 = outbounddate_mmt[outbounddate_mmt.length-1];
  outdate2 = outbounddate_mmt[1];
  outdate3 = outbounddate_mmt[0];
  outbounddate_mmt1 = outdate1+"/"+outdate2+"/"+outdate3;
  outbounddate_mmt = outbounddate_mmt.join("-").trim();

  if(isReturn == 0){
   tripType = "O";
   returnTrue = "";
 }
 else{
   tripType = "R";
   inbounddate_mmt = inbounddate_mmt.split("-");
   indate1 = inbounddate_mmt[inbounddate_mmt.length-1];
   indate2 = inbounddate_mmt[1];
   indate3 = inbounddate_mmt[0];
   inbounddate_mmt1 = indate1+"/"+indate2+"/"+indate3;
   inbounddate_mmt = inbounddate_mmt.join("-").trim();
   returnTrue = "&returnDate="+encodeURIComponent(inbounddate_mmt1);

 }
 if(cabinclass_mmt == "Economy"){
  cabinclass_mmt = "E";
}
else if(cabinclass_mmt == "Business"){
  cabinclass_mmt = "B";
}
else if(cabinclass_mmt == "PremiumEconomy"){
  cabinclass_mmt = "PE";
}
$.ajax("https://flights.makemytrip.com/makemytrip/search-api.json?classType="+cabinclass_mmt+"&dcID=&deptDate="+encodeURIComponent(outbounddate_mmt1)+"&deviceType=desktop&filterReq=&fromCity="+originplace_mmt+"&isDateChange=&lob=Flight&noOfAdlts="+adults_mmt+"&noOfChd="+children_mmt+"&noOfInfnt="+infants_mmt+"&rebookFlow=false"+returnTrue+"&toCity="+destinationplace_mmt+"&tripType="+tripType+"&tripTypeDup="+tripType, {})
.success(function(resp){
  mmt_data = resp;
  mmt_code = resp.searchKey;
  if(!mmt_code){
    mmt_code = "";
  }
  else{
    setCookie("ss_mmt_code", getCookie("flights_session")+"~*~"+mmt_code, 0.0035);
  }
  jsonArr2 = [{"code": encodeURIComponent(getCookie("flights_session")), "postFields": postFields, "posResults": encodeURIComponent(posResults), "posSpecs": encodeURIComponent(posSpecs), "mmt_code": encodeURIComponent(mmt_code), "mmt_data": JSON.stringify(mmt_data), "called": 1}];
  jsonArr2 = JSON.stringify(jsonArr2);
  var passBack2 = [{"code": encodeURIComponent(getCookie("flights_session")), "postFields": postFields, "posResults": encodeURIComponent(posResults), "posSpecs": encodeURIComponent(posSpecs), "mmt_code": encodeURIComponent(mmt_code), "mmt_data": "", "called": 1, "currency": currency}];
  passBack2 = JSON.stringify(passBack2);
  if(getCookie("flights_session") && getCookie("flights_session") != ""){
    sendMessageFlights(1, jsonArr2, 27, displayFinalFlights, passBack2);
  }
})
.fail(function(resp){
  jsonArr2 = [{"code": encodeURIComponent(getCookie("flights_session")), "postFields": postFields, "posResults": encodeURIComponent(posResults), "posSpecs": encodeURIComponent(posSpecs), "mmt_code": "", "mmt_data": "", "called": 0, "currency": currency}];
  jsonArr2 = JSON.stringify(jsonArr2);
  if(getCookie("flights_session") && getCookie("flights_session") != ""){
    sendMessageFlights(1, jsonArr2, 27, displayFinalFlights, jsonArr2);
  }
});
}
return;
}

function saveFlightSession(data, passBack){
  setCookie("flights_session", data, 0.0035);
  var passNow = JSON.parse(passBack);
  var postFields = passNow[0].postFields;
  var currency = 0;
  currency = passNow[0].currency;
  var postFields1 = decodeURIComponent(postFields);
  var pf = [];
  pf = [{"postFields": postFields}];
  pf = JSON.stringify(pf);
  setCookie("flights_session_post", pf, 0.0035);

  var posResults = decodeURIComponent(passNow[0].posResults);
  var posSpecs = decodeURIComponent(passNow[0].posSpecs);
  var ss_mmt_code = getCookie("ss_mmt_code");
  var mmt_code = "";
  if(ss_mmt_code){
    ss_mmt_code = ss_mmt_code.split("~*~");
    ss_code = ss_mmt_code[0];
    mmt_code = ss_mmt_code[1];
  }
  var jsonArr = [{"code": encodeURIComponent(getCookie("flights_session")), "postFields": postFields, "posResults": encodeURIComponent(posResults), "posSpecs": encodeURIComponent(posSpecs), "mmt_code": encodeURIComponent(mmt_code), "mmt_data": "", "called": 0, "currency": currency}];
  jsonArr = JSON.stringify(jsonArr);
  if(getCookie("flights_session") && getCookie("flights_session") != ""){
    sendMessageFlights(1, jsonArr, 27, displayFinalFlights, jsonArr);
  }

}
var str_flight = ' <svg id="svg-hatke-flights-id" xmlns="http://www.w3.org/2000/svg" style="display:none;"> <symbol id="hk-svg__clock" viewBox="0 0 24 24"> <path fill="inherit" d="M12 2C6.46 2 2 6.48 2 12s4.47 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path fill="none" d="M0 0h24v24H0z"></path><path fill="inherit" d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path> </symbol> <symbol id="hk-svg__arrow--fwd" viewBox="0 0 24 24"> <path fill="none" d="M0 0h24v24H0z"></path><path fill="inherit" d="M12 4l-1.4 1.4 5.6 5.6H4v2h12.2l-5.6 5.6L12 20l8-8z"></path> </symbol> <symbol id="hk-svg__refresh" viewBox="0 0 24 24"> <path fill="inherit" d="M17.6 6.3C16.3 5 14.2 4 12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8c3.7 0 6.8-2.5 7.7-6h-2c-1 2.3-3 4-5.7 4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.7 0 3 .7 4.2 1.8L13 11h7V4l-2.4 2.4z"></path><path fill="none" d="M0 0h24v24H0z"></path> </symbol> <symbol id="hk-svg__buyhatkeLogo--text" viewBox="0 0 490.7 107.8"> <g fill="#29ABE2"><path d="M295.3 85.6c0-10.7 3.6-22.8-.1-33.3-2.1-6-5.3-5.4-9.4-1.3-5 4.9-6.9 10.9-6.8 17.6.1 6.2 6.7 22.8-2.5 23.9-8.2 1-7.7-9.9-8.5-15.5-1.5-10.5-2.5-21.1-3.9-31.7-1.1-8.2-4.9-21.1-2.1-29.3 1.5-4.2 6.2-7.4 10.9-5.4 4.4 1.9 3.6 5.6 3.4 9.6-.5 10.6.9 20.7 1.3 31.2 2-7.8 14.1-14.7 21.9-12.5 8.2 2.3 9.5 13.7 9.9 20.8.5 7.5.1 15.8-1 23.2-.6 3.9-1 6.7-5.2 7.8-3.4.9-7.9-1.2-7.9-5.1zm18.5-.7c0-7.8 5.7-14 11.2-18.9 3.6-3.1 7.4-6.4 11.4-9 3.3-2.2 5.2-2.4 3.1-6.5-5-9.7-11.8 1.9-17.2 2.7-2.6.4-5.9-1.6-5.9-4.6 0-3.8 5.5-5.7 8.1-6.9 7.3-3.2 15.8-6.4 22 .6 4.9 5.5 6.8 14.6 7.6 21.8.7 6.1 3 21.5-2 26-5.4 4.9-11.7-.8-10.3-6.7-4.7 5.3-28 15.1-28 1.5zm27.9-22.2c-4.4 2.8-16.2 9.9-15.4 16.7 1.1 9.9 12.4-3.5 15.7-3.5.1-4.2.1-8.9-.3-13.2m23.1-11.3c-4.5.4-13.8-2.5-6.7-7.4 3.1-2.1 4.6.9 5.9-2.8 1-3-1.3-8.6-1.5-11.6-.3-6 5.7-12.5 11.2-6.2 3.1 3.6 2.1 13.7 2.1 18.2 3.4-.6 10.1-1.6 8.5 4.7-.8 3.1-2.3 1.8-4.3 3.3-3.2 2.4-2.2-.7-3 3.8-1.9 10.5 2.9 22.3 1.9 32.9-.4 4.6-2.1 8.9-8.1 7.1-5.6-1.7-4.6-7.4-4.8-12.3-.7-9.9-1.2-19.8-1.2-29.7-.4.1 0 .7 0 0z"></path><path d="M402.5 72.1c.2 5.2 4.2 14.1-.1 18.2-4.4 4.2-9.4.4-10.6-4-2.8-10.4-1.7-22.6-3.4-33.4-.7-4.3-8.8-31.8 4.5-27.7 6.1 1.8 7.2 20.2 7.7 25.5 4.2-3.6 10.1-7.6 13.2-12.1 2.3-3.3 3.6-11.3 10.8-7.8 11.4 5.7-16.3 23.6-19.7 26.8-1.4 1.3-3.4 2.1-3 3.8.3 1.5 8 4.8 9.2 5.5 5 2.9 13.5 4.5 17.6 8.3 5.1 4.6 1.7 9.7-4.2 9-7.5-.9-16.5-7.2-22-12.1.1 2.5 3 2.6 0 0z"></path><path d="M472.7 68.8c0 6.8-18.8 19.7-24.3 21.7-11.2 4.2-14.6-11.9-14.5-20.1-3.4 1.4-5.3-1.9-4.4-4.9.2-1.1.9-1.9 1.9-2.5 2.4-.4 3.2-1.8 2.4-4.2 2-6.3.9-15.1 6.8-19.9 8.7-7 32.3 7.4 21.6 18.5-5.5 5.7-23.6 7.6-15.4 19.6 4.5 6.6 10.2-2.5 14.1-6.3 1.9-1.8 11.8-10.3 11.8-1.9zm-24.2-21.4c-2.4 0-3.2 9-3.2 10.4 1.8-1 8-2.6 8.8-4.3 1.1-2.6-2.6-6.1-5.6-6.1zm41.2 18.8c0 8.2-9.1 9.1-12 2.2-1.7-4 .2-11.9.2-16.2.1-10.9-2.1-22.3-1.2-33 .4-4.7 3.5-12.1 9.7-8.1 4.3 2.8 2.8 10.3 2.7 14.5-.2 13.5.6 27.1.6 40.6zm-12.5 21.4c0-9.5 15.9-6.3 13.2 2.6-2 6.6-13.2 4.2-13.2-2.6z"></path></g><path fill="#3F6B77" d="M114.5 23.4v23.9c5.5-5.6 13.4-7.9 21-5.8 6.4 1.8 11.7 6.8 14.4 12.8 5.7 12.6 1.1 29.6-12.1 35.4-3.6 1.6-7.7 2.1-11.5 1.5-4.6-.6-8.5-3-11.8-6.1v5.1h-12V24.6c0-.2-.1-1 0-1.1.2-.2 1.9 0 2.2 0 3.3-.1 6.6-.1 9.8-.1zm12.7 28.5c-5.8 0-10.8 3.6-12.5 9.2-1.6 5.4-.5 12 3.7 15.9 4.1 3.8 10.8 4.5 15.5 1.5 5-3.1 6.9-9.1 6.2-14.7-.8-6.8-6.1-11.9-12.9-11.9zM159 42h12.2v13.3c0 5.1-.3 10.4.2 15.5.4 4.5 2.4 8.7 7.3 9.3 4.8.6 9.2-2.1 10-7 .9-5 .4-10.5.4-15.6V42h12.1v17.2c0 7.9.7 17.1-3.9 23.9-3.3 4.9-8.6 7.6-14.4 8.1-5.9.6-12.4-.4-17-4.4-7.4-6.5-7-16.9-7-25.8.1-6.4.1-12.7.1-19zm45.9 0h12.3l12.5 30.2L243.5 42h12.4l-30.1 65.8h-12.5c2.1-4.5 4.2-9.1 6.3-13.6 1.1-2.3 2.2-4.7 3.3-7 .4-.8.2-.9-.1-1.7-4.4-10.8-8.8-21.6-13.3-32.4-1.6-3.7-3.1-7.4-4.6-11.1z"></path><path fill="#0B9CC0" d="M6.1 14.5h69.4v83.2H6.1z"></path><path fill="#197D9B" d="M6.2 14.5h69.3l-5.9 2.9 12 4.3H0l12-4.3"></path><path fill="#186470" d="M0 21.7c6.3-2.2 7.2-2.6 12-4.3v4.3H0zm81.5 0c-6.3-2.2-7.2-2.6-12-4.3v4.3h12z"></path><g fill="#4D4D4D"><ellipse cx="21.7" cy="20.2" rx="1.2" ry="1"></ellipse><ellipse cx="60" cy="20.2" rx="1.2" ry="1"></ellipse></g><path fill="#29ABE2" d="M0 21.7h81.6v77H0z"></path><path fill="#FFF" d="M31.1 40.8h21.6v.1c-1.3 2.2-2 3.4-2.2 3.6h-5.8c.8 1.1 1.3 2.3 1.6 3.8h6.1c.1 0 .1.1.1.1-1.4 2.3-2.1 3.5-2.1 3.5h-4c-.1 1.2-.6 2.6-1.5 4.3-1.3 1.7-2.4 2.8-3.6 3.3-2.1 1.1-4.1 1.7-6 1.7v.1c0 .2.5.9 1.4 2.1L47.6 78v.7c0 .1 0 .1-.1.1h-4.7C34.3 67.6 30.1 62 30.1 62v-3.4l.1-.1c.7.1 1.6.2 2.6.2 4.7 0 7.7-1.7 8.8-5.2.2-.5.3-1 .3-1.6H29c-.1 0-.1 0-.1-.1 1.4-2.3 2.1-3.5 2.2-3.5h10.2v-.1c-.6-1.3-1.7-2.4-3.4-3.1-1.2-.4-2.3-.7-3.2-.7H29v-.1c1.4-2.4 2.1-3.5 2.1-3.5z"></path><g fill="#333"><circle cx="16.9" cy="30.8" r="1.5"></circle><circle cx="64.8" cy="30.8" r="1.5"></circle></g><path fill="none" stroke="#666" stroke-width="1.13" stroke-miterlimit="10" d="M60.1 20.7c0-26.8-38.6-26.8-38.6 0"></path><path fill="none" stroke="#4D4D4D" stroke-width="1.13" stroke-miterlimit="10" d="M64.7 30.4c0-39.7-47.8-39.7-47.8 0"></path> </symbol> <symbol id="hk-svg__buyhatkeLogo--icon" viewBox="0 0 160.7 194.4"> <path fill="#0B9CC0" d="M12.1 28.6h136.5v163.8H12.1z"></path><path fill="#197D9B" d="M12.3 28.6h136.3l-11.5 5.7 23.6 8.5H0l23.6-8.5"></path><path fill="#186470" d="M0 42.8c12.4-4.4 14.2-5.1 23.6-8.5v8.5H0zm160.4 0c-12.4-4.4-14.2-5.1-23.6-8.5v8.5h23.6z"></path><g fill="#4D4D4D"><ellipse cx="42.6" cy="39.8" rx="2.3" ry="2"></ellipse><ellipse cx="118.1" cy="39.8" rx="2.3" ry="2"></ellipse></g><path fill="#29ABE2" d="M0 42.8h160.7v151.6H0z"></path><path fill="#FFF" d="M61.2 80.2h42.5v.1c-2.5 4.4-3.9 6.7-4.3 7H88.1c1.6 2.1 2.6 4.6 3.2 7.6h12.1c.1 0 .2.1.2.2-2.7 4.6-4.1 6.9-4.2 6.9h-7.8c-.2 2.3-1.2 5.2-3 8.6-2.5 3.4-4.8 5.6-7 6.6-4.1 2.2-8 3.3-11.8 3.3v.1c0 .3.9 1.7 2.8 4.1l21 28.7v1.4c0 .1-.1.2-.2.2h-9.2c-16.6-21.9-24.9-33-24.9-33.1v-6.7l.1-.3c1.5.2 3.2.4 5.2.4 9.3 0 15.1-3.4 17.4-10.3.3-1 .5-2 .5-3.1H57.2c-.1 0-.2-.1-.2-.3 2.8-4.6 4.2-6.9 4.3-6.9h20.1v-.1c-1.2-2.6-3.4-4.7-6.7-6.2-2.4-.9-4.5-1.3-6.4-1.3H57v-.3c2.8-4.3 4.2-6.6 4.2-6.6z"></path><g fill="#333"><circle cx="33.2" cy="60.6" r="2.9"></circle><circle cx="127.5" cy="60.6" r="2.9"></circle></g><path fill="none" stroke="#666" stroke-width="2.23" stroke-miterlimit="10" d="M118.4 40.7c0-52.8-76-52.8-76 0"></path><path fill="none" stroke="#4D4D4D" stroke-width="2.23" stroke-miterlimit="10" d="M127.4 59.8c0-78.2-94-78.2-94 0"></path> </symbol> <symbol id="hk-svg__buyhatkeLogo--full" viewBox="0 0 965.9 212.1"> <g fill="#29ABE2"><path d="M581.2 168.4c0-16.5 3.2-32.8 2.3-49.4-.4-6.6-.7-18-5.5-23.2-4.7-5.2-11.2.1-15.1 4-14.9 14.8-15.1 32.3-12.5 51.9 1.2 9.6 9.9 29.5-6.1 30.2-13.3.6-13.6-10.2-15.3-20.6-2.5-15.2-4.1-30.6-5.7-46-1.9-17.7-4.9-35.4-6.9-53.1-1.2-10.5-4.9-27.5 1.9-36.6 4.3-5.7 14.8-7.5 21-4 8.4 4.7 4.6 17.5 4.3 25.2-.7 18.3 2.3 36.2 2.9 54.4 4-15.6 27.4-28.4 42.8-24.7 16.1 3.9 19 26.5 19.9 40 1 15.3-1.3 30.6-1.9 45.9-.3 6.8-1.3 13-8.5 15.5-7.3 2.6-17.6-.6-17.6-9.5zm36.5-1.3c0-24.4 26-41 43.4-54 2.2-1.6 4.8-2.9 6.8-4.6 2.6-2.1 2.9-.2 1.8-4.9-1.1-5.1-4.4-10.4-9.8-11.3-5.9-1-13.2 3-17.7 6.2-4.7 3.4-7.3 8.8-13.6 5.4-15.9-8.5 3.7-19.2 11.5-22.5 9.9-4.2 22.2-9.6 32.9-5.2 21.3 8.8 24.5 44.3 25.2 63.9.3 10.8 3 36.4-10.8 39.4-5.2 1.1-12.7.3-14.8-5.5-1.1-3-.1-6.9.3-10-9.3 10.5-55.2 30-55.2 3.1zm55-43.6c-10.5 6.7-29.8 18.4-30.4 32.9-.3 8 7.3 7.5 13 5.1 5.3-2.3 12.1-12.1 18.1-12.1 0-8.2 0-17.4-.7-25.9 0 0 .5 5.8 0 0zm45.4-22.2c-4.8.5-11.6 2.4-15.5-1.4-5.5-5.5-.6-12.3 5.3-13.8 1.4-.4 7.9 0 8.6-1.1 1-1.6-.4-7.8-.6-9.6-.7-6.7-2.4-13.4-2.7-20.2-.2-5.6 1.2-10.5 6.9-12.6 5.4-2 13.9-.4 16.7 5.1 2.2 4.4 1.5 11.7 1.8 16.5.5 5.9 1 11.8 1 17.8 5.3-.9 10-4.1 14.5.7 2.8 3 3.6 8.5.8 11.8-2.7 3.2-6.9 2.2-10.4 3.8-5.4 2.5-1.6-.8-2.8 2.7-.5 1.3.1 3.7.2 5.1.8 20.6 2.7 41.2 3.6 61.8.4 10.5-4.6 20-17.2 15.5-10.2-3.6-8-15.8-8.4-24.7-.7-19.1-1.8-38.4-1.8-57.4-.7 0 0 1.3 0 0zm74.2 40.6c.3 7.1 1.7 14.1 2.7 21.1.7 4.6 1.7 9-1.3 12.9-7 9.4-21.2 4.6-22.5-6-2.5-20-3-40.2-5.7-60.2-1.7-12.4-4.5-24.6-6.2-37-1.2-8.8-3.7-19.3 7-22.8 13.5-4.4 14.3 8.3 16.2 17.5 2.1 10.6 5.2 21.4 6.1 32.1 7.3-6.3 14.3-13 21.4-19.5 2.3-2.1 6.7-5 7.9-7.9.9-2.2-.8-3.5-.3-5.8.6-2.7 3.4-3.9 5.8-4.8 10.5-4 21.9 1.4 16.2 13.7-3.4 7.3-12.4 13-18.4 18-7.8 6.6-15.7 13.2-23.7 19.5-1.7 1.4-6 3.5-6.5 5.6-.9 3.5 2.6 4.2 5.7 6 9.7 5.7 19.3 11.7 29.7 16.3 7.8 3.4 19.5 4.3 22.2 14 4.3 15.7-14.7 11.2-22.4 8-12-5-24.2-12-33.9-20.7.2 4.9 5.8 5.2 0 0z"></path><path d="M930.6 135.5c0 7.7-11.9 15.9-16.9 20-9.4 7.7-19.2 16.1-29.8 22.2-21.8 12.6-29.7-24.4-29.6-39.1-7 2.8-11.1-4.6-8.4-10.7 1.3-2.8 3.2-3.1 5.4-4.9 2.6-.3 3.4-1.7 2.6-4.2l.3-6c1-11.7 4.3-30.1 14.6-37.6 9.8-7.2 30.5 3.5 38.3 10.2 8.9 7.6 12.5 19.7 2.3 28-8.8 7.2-22 9.6-30.1 17.5-2.6 2.5-2.4 3-2.3 7.1.1 4.8.4 15.9 5.5 18.7 7.9 4.3 21.4-14.2 26-18.7 3.3-3.2 7.3-8 11.9-9.2 5.1-1.2 10.2 1.2 10.2 6.7zm-47.8-42.2c-4.8 0-6.3 17.3-6.3 20.5 4.3-2.3 14.7-4.5 17.5-8.5 3.5-5-6.3-12-11.2-12zm81.1 37c0 6.5-3 13.6-10.3 13.9-5.9.2-12.2-3.7-13.4-9.5-2.1-10.5.4-23.5.5-34.2.2-21.3-2.4-42.6-2.5-63.9 0-10.2 9.9-22.8 20.4-13.8 7.8 6.7 4.1 24.6 4 33.4-.1 24.7 1.3 49.4 1.3 74.1zm-24.6 42.1c0-7.1 8.7-13.6 15.6-12 6 1.5 12.5 11 10.7 17.2-3.9 13.2-26.3 8.1-26.3-5.2z"></path></g><path fill="#3F6B77" d="M225.4 46v47.1c13.4-13.5 34.4-17.1 51.1-7.3 15.4 9.1 23 26 23.3 43.4.2 17.5-7.4 34.3-22.3 44-16.8 10.9-37.8 7.7-52-5.8 0 1.9 1.1 7.9 0 9.4-1 1.3-4.5.6-6.5.6h-12.2c-.9 0-4.4.5-4.9-.1-1-1.1 0-7.5 0-8.9V52.9c0-2.1-.7-5.9.7-6.9 1.9-1.4 10.5 0 12.9 0h9.9zm24.9 56.1c-33.8 0-34.4 55-.9 55.9 34.4 1 35.4-55.9.9-55.9zm62.8-19.5h17.8c5.3 0 6.2-1.3 6.2 3.8v40.4c0 7.7-.7 17.2 3.8 23.9 6.5 9.8 22.6 9.3 28.6-.8 4-6.6 3-15.4 3.1-22.8V86.3c0-5.3 1.2-3.8 6.5-3.8h10.7c1 0 5.9-.7 6.5 0 1.6 1.7 0 12.4 0 14.6 0 15.6.9 31.7-1.1 47.3-3.3 26.1-25.7 39.2-51 34.5-13.8-2.6-24.2-12.1-28.3-25.5-3.1-10.1-2.8-21.4-2.8-31.8-.1-13 0-26 0-39zm90.2 0h24.3l24.6 59.5 27.1-59.5h24.3l-59.3 129.5h-24.5l19.5-41.8-36-87.7z"></path><path fill="#0B9CC0" d="M12.1 28.6h136.5v163.8H12.1z"></path><path fill="#197D9B" d="M12.3 28.6h136.3l-11.5 5.7 23.6 8.5H0l23.6-8.5"></path><path fill="#186470" d="M0 42.8c12.4-4.4 14.2-5.1 23.6-8.5v8.5H0zm160.4 0c-12.4-4.4-14.2-5.1-23.6-8.5v8.5h23.6z"></path><g fill="#4D4D4D"><ellipse cx="42.6" cy="39.8" rx="2.3" ry="2"></ellipse><ellipse cx="118.1" cy="39.8" rx="2.3" ry="2"></ellipse></g><path fill="#29ABE2" d="M0 42.8h160.7v151.6H0z"></path><path fill="#FFF" d="M61.2 80.2h42.5v.1c-2.5 4.4-3.9 6.7-4.3 7H88.1c1.6 2.1 2.6 4.6 3.2 7.6h12.1c.1 0 .2.1.2.2-2.7 4.6-4.1 6.9-4.2 6.9h-7.8c-.2 2.3-1.2 5.2-3 8.6-2.5 3.4-4.8 5.6-7 6.6-4.1 2.2-8 3.3-11.8 3.3v.1c0 .3.9 1.7 2.8 4.1l21 28.7v1.4c0 .1-.1.2-.2.2h-9.2c-16.6-21.9-24.9-33-24.9-33.1v-6.7l.1-.3c1.5.2 3.2.4 5.2.4 9.3 0 15.1-3.4 17.4-10.3.3-1 .5-2 .5-3.1H57.2c-.1 0-.2-.1-.2-.3 2.8-4.6 4.2-6.9 4.3-6.9h20.1v-.1c-1.2-2.6-3.4-4.7-6.7-6.2-2.4-.9-4.5-1.3-6.4-1.3H57v-.3c2.8-4.3 4.2-6.6 4.2-6.6z"></path><g fill="#333"><circle cx="33.2" cy="60.6" r="2.9"></circle><circle cx="127.5" cy="60.6" r="2.9"></circle></g><path fill="none" stroke="#666" stroke-width="2.23" stroke-miterlimit="10" d="M118.4 40.7c0-52.8-76-52.8-76 0"></path><path fill="none" stroke="#4D4D4D" stroke-width="2.23" stroke-miterlimit="10" d="M127.4 59.8c0-78.2-94-78.2-94 0"></path> </symbol> <symbol id="hk-svg__watchlistRemove" viewBox="0 0 19.3 16.4"> <g fill="inherit"><path d="M16.8 1.4L15.4 0l-2.2 2.2c-1.1-.4-2.3-.7-3.6-.7-4.3 0-8.1 2.8-9.6 6.6.7 1.7 1.7 3.1 3.1 4.2L.4 15l1.4 1.4 15-15zM5.3 8.1c0-2.4 2-4.4 4.4-4.4.6 0 1.1.1 1.7.4L9.9 5.5h-.2C8.2 5.5 7 6.7 7 8.1v.2L5.6 9.8c-.2-.5-.3-1.1-.3-1.7zm6.9.8l-1.7 1.7c.8-.2 1.4-.9 1.7-1.7z"></path><path d="M16.7 4.3l-2.8 2.8c.1.3.1.7.1 1 0 2.4-2 4.4-4.4 4.4-.3 0-.7 0-1-.1l-1.9 1.9c.9.3 1.9.4 2.9.4 4.4 0 8.1-2.7 9.7-6.6-.5-1.4-1.4-2.7-2.6-3.8z"></path></g> </symbol> <symbol id="hk-svg__watchlistAdd" viewBox="0 0 19.3 13.2"> <path fill="inherit" d="M9.7 4C8.2 4 7 5 7 6.6 7 8 8.2 9.2 9.7 9.2s2.6-1.2 2.6-2.6C12.3 5 11 4 9.7 4m0 7c-2.4 0-4.4-2-4.4-4.4 0-2.4 2-4.4 4.4-4.4 2.4 0 4.4 2 4.4 4.4C14 9 12 11 10 11m0-11C5.3 0 1.5 2.7 0 6.6c1.5 4 5.3 6.6 9.7 6.6s8-2.7 9.7-6.6C17.8 2.6 14 0 9.7 0"></path> </symbol> <symbol id="hk-svg__filter" viewBox="0 0 14.3 9.5"> <path fill="currentColor" d="M5.5 9.5h3.2V8H5.5v1.5zM0 0v1.6h14.3V0H0zm2.4 5.5H12V4H2.3v1.5z"></path> </symbol> <symbol id="hk-svg__priceGraph" viewBox="0 0 252.4 249.6"> <g fill="none" stroke="#fff" stroke-miterlimit="10" stroke-linecap="round"> <path stroke-width="23" d="M240.9 238.1H11.5V11.5"></path> <path stroke-width="26" d="M62.5 98.4v88.4m50-148.4v148.4m50-65.8v65.8m50-111.4v111.4"></path> </g> </symbol> <symbol id="hk-svg__priceWatch--brow" viewBox="0 0 219.4 164"> <path fill="#fff" d="M111.7 71.7c-30.8 0-57 19.1-67.7 46.1 10.6 27 36.9 46.1 67.7 46.1s57-19.1 67.7-46.1c-10.7-26.9-36.9-46.1-67.7-46.1zm0 76.9c-17 0-30.8-13.8-30.8-30.8S94.7 87 111.7 87s30.8 13.8 30.8 30.8-13.8 30.8-30.8 30.8zm0-49.2c-10.2 0-18.5 8.2-18.5 18.5s8.2 18.5 18.5 18.5 18.5-8.2 18.5-18.5-8.3-18.5-18.5-18.5z"></path> <path fill="#fff" d="M34 91.4L0 51.8c4.1-4.5 8.5-8.7 13-12.7l30.2 43.3c-3.2 2.8-6.3 5.9-9.2 9zm153.5-5.2c-3.1-3-6.3-5.8-9.6-8.3l27.9-45.2c4.7 3.7 9.3 7.6 13.6 11.8l-31.9 41.7zM66.2 66.6l-20.4-50c5.2-2.7 10.6-5.1 16.1-7.1l15.5 52.2c-3.7 1.3-7.5 3-11.2 4.9zm87.9-3c-3.7-1.6-7.6-3-11.5-4.2l12.7-53.2c5.5 1.7 11.1 3.7 16.4 6l-17.6 51.4zm-50.2-8.1L99.8.6c4.5-.4 9.1-.6 13.6-.6h3.7L116 55c-4.1 0-8.1.1-12.1.5z"></path> </symbol> <symbol id="hk-svg__copy" viewBox="0 0 24 24"> <path fill="inherit" d="M0 0h24v24H0z"></path><path fill="inherit" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path> </symbol> <symbol id="hk-svg__thumbsUp" viewBox="0 0 24 22.2"> <path fill="none" stroke="inherit" stroke-width="2" stroke-miterlimit="10" d="M1 21.2h4v-12H1v12zm22-10.9c0-1.1-.9-2.1-2-2.1h-6.3l.9-4.5v-.3c0-.4-.2-.8-.4-1l-1.1-1L7.6 8c-.4.4-.6.9-.6 1.4v10c0 1.1.9 1.8 2 1.8h9c.8 0 1.5-.4 1.8-1.1l3-7c.1-.2.1-.4.1-.7v-2l.1-.1z"></path> </symbol> <symbol id="hk-svg__thumbsDown" viewBox="0 0 24 22.2"> <path fill="none" stroke="inherit" stroke-width="2" stroke-miterlimit="10" d="M1 1h4v12H1V1zm22 10.9c0 1.1-.9 2.1-2 2.1h-6.3l.9 4.5v.3c0 .4-.2.8-.4 1l-1.1 1-6.6-6.6c-.3-.3-.5-.9-.5-1.4v-10C7 1.7 7.9 1 9 1h9c.8 0 1.5.4 1.8 1.1l3 7c.2.2.2.4.2.7v2.1z"></path> </symbol> <symbol id="hk-svg__dead" viewBox="0 0 29.6 29.6"> <g fill="inherit"><path d="M14.8 0C6.6 0 0 6.6 0 14.8 0 23 6.6 29.6 14.8 29.6c8.2 0 14.8-6.6 14.8-14.8C29.6 6.6 23 0 14.8 0zm0 28.2c-7.4 0-13.4-6-13.4-13.4s6-13.4 13.4-13.4 13.4 6 13.4 13.4-6 13.4-13.4 13.4z"></path><path d="M11.4 13.8l1-1-1.6-1.6 1.6-1.5-1-1-1.6 1.6-1.5-1.6-1 1 1.6 1.5-1.6 1.6 1 1 1.5-1.6m11.5-3.5l-1.6 1.6-1.6-1.6-.9 1 1.5 1.5-1.5 1.6.9 1 1.6-1.6 1.6 1.6 1-1-1.6-1.6 1.6-1.5m-2 9.7c-.2-.1-.4-.3-.6-.4h-.1c-.6-.4-1.2-.6-1.8-.9l-.2.7.2-.7-1.1-.3c-2.9-.5-5.8.4-7.8 2.4l1 1c1.4-1.4 3.4-2.2 5.4-2.1-.1.5-.1 1.1-.1 1.7 0 1.8 1 2.8 2.8 2.8 1.6 0 2.6-1 2.8-2.7l.6-.6c-.5-.4-.8-.7-1.1-.9z"></path></g> </symbol> <symbol id="hk-svg__airplaneRight" viewBox="0 0 34.7 32.9"> <path fill="inherit" d="M10.4 32.9h3.5L22.6 19h9.5c1.4 0 2.6-1.2 2.6-2.6s-1.2-2.6-2.6-2.6h-9.5L13.9 0h-3.5l4.3 13.9H5.2l-2.6-3.5H0l1.7 6.1-1.7 6h2.6L5.2 19h9.5l-4.3 13.9z"></path> </symbol> <symbol id="hk-svg__takeOff" viewBox="0 0 33.7 28.9"> <path d="M1 25.6h31.6V29H1v-3.4zM33.7 10c-.3-1.2-1.7-2-3-1.7l-9 2.4L10.4 0 7 .8l7 12L5.7 15l-3.3-2.6L0 13l3 5.2 1.3 2.2 2.7-.6 8.8-2.4 7.2-2 8.8-2.3c1.3 0 2-1.4 1.8-3z"></path> </symbol> <symbol id="hk-svg__info--filled" fill-rule="evenodd" stroke-miterlimit="1.41" viewBox="0 0 24 24" clip-rule="evenodd" stroke-linejoin="round"> <path fill="inherit" fill-opacity="1" d="M12 1c6.07 0 11 4.93 11 11s-4.93 11-11 11S1 18.07 1 12 5.93 1 12 1zm2.3 17.1v-1.37l-1.1-.24V9.6H9.7V11l1.22.24v5.24l-1.1.23v1.4h4.48zM13.2 7.6V5.9h-2.28v1.7h2.28z"></path> </symbol> </svg>';

function displayFinalFlights(data, passBack){
  if($(".refresh-flights").length > 0 && $(".refresh-flights .hk-c-btnIcons:eq(0) .hk-ext-anim--spin").length > 0){
    document.getElementsByClassName("refresh-flights")[0].getElementsByClassName("hk-c-btnIcons")[0].classList.remove('hk-ext-anim--spin');
  }
  var passBackCook = getCookie("flights_session_post");
  var passNow = JSON.parse(passBackCook);
  var passBack1 = JSON.parse(passBack);
  var postFields = passNow[0].postFields;
  var posResults = decodeURIComponent(passBack1[0].posResults);
  var posSpecs = decodeURIComponent(passBack1[0].posSpecs);
  var called = passBack1[0].called;
  var currency = 0;
  currency = passBack1[0].currency;
  var addedFlightsToDOM = 0;
  var ss_mmt_code = getCookie("ss_mmt_code");
  if(ss_mmt_code){
    var mmt_code = ss_mmt_code.split("~*~");
    mmt_code = mmt_code[1];
  }
  else{
    var mmt_code = "";
  }
  if(data && data.trim() != "" && data.trim() != "Something Went Wrong!"){
    data = JSON.parse(data);

    var status = data.status;
    if(status == "UpdatesPending"){
      var jsonArr = [{"code": encodeURIComponent(getCookie("flights_session")), "postFields": postFields, "posResults": encodeURIComponent(posResults), "posSpecs": encodeURIComponent(posSpecs), "mmt_code": encodeURIComponent(mmt_code), "mmt_data": "", "called": 0, "currency": currency}];
      jsonArr = JSON.stringify(jsonArr);
      if(called == 0){
        sendMessageFlights(1, jsonArr, 27, displayFinalFlights, jsonArr);
      }
      else if(called==1){
        return;
      }
    }
    else if(status!="UpdatesComplete"){
      setTimeout(function(){
        var mmt_code1 = getCookie("ss_mmt_code");
        if(mmt_code1){
          mmt_code = mmt_code1.split("~*~");
          mmt_code = mmt_code[1];
        }
        else{
          mmt_code1 = "";
          mmt_code = "";
        }
        var jsonArr = [{"code": encodeURIComponent(getCookie("flights_session")), "postFields": postFields, "posResults": encodeURIComponent(posResults), "posSpecs": encodeURIComponent(posSpecs), "mmt_code": encodeURIComponent(mmt_code), "mmt_data": "", "called": 0, "currency": currency}];
        jsonArr = JSON.stringify(jsonArr);
        if(called == 0){
          sendMessageFlights(1, jsonArr, 27, displayFinalFlights, jsonArr);
        }
      }, 2000);
      return;
    }

    if(data.status!="UpdatesComplete" && data.status!="UpdatesPending"){
      return;
    }

    var str = "";
    if($(".hk-compBar").length > 0){
      var anim_flight = "hk-compBar__oAnim--start";
      var anim_start = "hk-ext-animated";
    }
    else{
      var anim_start = "";
      var anim_flight = "";
    }
    var show_more = "";
    var info_str = "";
    // var info_str = '<div class="hk-u-disp--ib hk-u-va--bottom hk-c-toolTips__container hk-c-toolTips__container--down hk-c-toolTips__container--hoverFocus hk-c-toolTips__container--transpIcon hk-c-toolTips__container--dark"> <svg class="hk-ext__icon hk-ext__icons--small hk-ext__icons--gray" viewBox="0 0 24 24"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__info--filled"></use> </svg> <div class="hk-c-toolTip"> <div class="hk-c-toolTip__wrap"> <div class="hk-c-toolTip__title hk-u-text__align--center"> Fare Breakup </div> <table class="hk-c-table hk-c-table--small"> <tbody> <tr> <td class="hk-c-table__heading" colspan="2">Base Fare:</td> </tr> <tr> <td class="hk-c-table__cell">1 Adult (1 X 23,255)</td> <td class="hk-c-table__cell hk-u-text__align--right"><span class="hk-u-text--super">₹</span>23,205</td> </tr> <tr> <td class="hk-c-table__heading" colspan="2">Taxes:</td> </tr> <tr> <td class="hk-c-table__cell">1 Adult (1 X2,745)</td> <td class="hk-c-table__cell hk-u-text__align--right"><span class="hk-u-text--super">₹</span>2,705</td> </tr> <tr> <td class="hk-c-table__footer">Convenience Fee:</td> <td class="hk-c-table__footer hk-u-text__align--right"><span class="hk-u-text--super">₹</span>90</td> </tr> <tr> <td class="hk-c-table__footer">Grand Total:</td> <td class="hk-c-table__footer hk-u-text__align--right"><span class="hk-u-text--super">₹</span>26,000</td> </tr> </tbody> </table> </div> </div> </div>';
    
    // console.log("aacha sa " + anim_start + " ~ " + anim_flight + " ~ " + $(".hk-compBar").length);
    var flightDet = [];
    var origin_name = data.origin_name;
    var origin_code = data.origin_code;
    var destination_name = data.destination_name;
    var destination_code = data.destination_code;
    var depart_date = data.depart_date;
    var arrival_date = data.arrival_date;
    var carrier = data.carrier;
    flightDet = data.flight_options;
    if(flightDet[0] && flightDet[0].inbound && flightDet[0].inbound != [] && flightDet[0].inbound != ""){
      returnFl = 1;
    }
    else{
      returnFl = 0;
    }
    if(returnFl == 0){
      var returnFlight = "";
    }
    else{
      var returnFlight = '<svg class="hk-ext__icons--tiny hk-ext__icons--dark hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__airplaneRight"></use> </svg> '+origin_code;
    }
    if(flightDet[0]){
      var cheapest_price = flightDet[0].pricing[0].price;
      var cheapest_flight_no_out = flightDet[0].outbound.flight_details[0].flight_no;
      var cheapest_flight_name_out = flightDet[0].outbound.flight_details[0].carrier_name;
      var cheapest_flight_code_out = flightDet[0].outbound.flight_details[0].carrier_code;
      var cheapest_flight_image_out = flightDet[0].outbound.flight_details[0].carrier_image;


      if(cheapest_flight_image_out=="" && carrier[cheapest_flight_code_out]){
        cheapest_flight_image_out = carrier[cheapest_flight_code_out]['image'];
      }
      var cheapest_deeplink = flightDet[0].pricing[0].deeplink;
      var cheapest_airline_name = flightDet[0].pricing[0].agent_name;
      var cheapest_airline_img = flightDet[0].pricing[0].agent_image;
      var cheapest_outdate = flightDet[0].outbound.depart_date;
      var cheapest_outdate0 = cheapest_outdate.split("-");
      var cheapest_outdate1 = cheapest_outdate0[cheapest_outdate0.length - 1].trim();
      var cheapest_outdate2 = cheapest_outdate0[1].trim();
      cheapest_outdate2 = convertMonthInt(cheapest_outdate2);
      cheapest_outdate = cheapest_outdate1 + " " + cheapest_outdate2;


      var cheapest_outtime = flightDet[0].outbound.depart_time;
      var cheapest_duration_out = flightDet[0].outbound.duration;
      var cheapest_hours_out = Math.floor( cheapest_duration_out / 60);          
      var cheapest_minutes_out = cheapest_duration_out % 60;
      if(cheapest_minutes_out > 0){
        cheapest_duration_out = cheapest_hours_out+"h "+cheapest_minutes_out+"m";
      }
      else{
        cheapest_duration_out = cheapest_hours_out+"h";
      }

      if(currency == 1){
        currency_icon = "$";
        if(getCookie("currency_to_usd")){
          cheapest_price = parseFloat(getCookie("currency_to_usd")) * cheapest_price;
        }
      }
      else if(currency == 0){
        currency_icon = "&#8377;";
      }
      cheapest_price = Math.round(cheapest_price * 100) / 100
      str = '<div class="hk-compBar__overlayAnimation '+anim_flight+'"> <svg class="hk-compBar__oAnimIcon hk-ext__icons--medium hk-ext__icons--light" viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__airplaneRight"></use> </svg> </div> <div class="hk-compBar__wrap"> <a class="hk-cB__logo" href="https://compare.buyhatke.com/?utm_source=compareBar&utm_medium=extension"> <svg class="hk-cB__logoImg hk-cB__flexChild hk-ext-animDelay--1 hk-ext-bounceInDown" viewBox="0 0 490.7 107.8"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__buyhatkeLogo--text"></use> </svg> </a> <div class="hk-cB__txt hk-cB__flexChild hk-u-text--white"> Cheaper flights available for: <div class="hk-cB__fltLoc">'+origin_code+' <div class="hk-cB__fltLocFull" title="'+origin_name+'">'+origin_name+'</div> </div> <svg class="hk-ext__icons--small hk-ext__icons--light hk-u-disp--ib" viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__airplaneRight"></use> </svg> <div class="hk-cB__fltLoc">'+destination_code+' <div class="hk-cB__fltLocFull" title="'+destination_name+'">'+destination_name+'</div> </div> </div> <div class="hk-cB__btnWrap hk-cB__flexChild"> <div class="hk-u-disp--ib hk-c-toolTips__container hk-c-toolTips__container--down hk-c-toolTips__container--hoverFocus hk-cBBuy-toolTip__container"> <a class="hk-c-btn hk-c-btn--orange hk-c-btn--iconTri hk-tri--right" href="'+cheapest_deeplink+'" target="_blank">Starts From '+currency_icon+''+cheapest_price+'</a><div class="hk-c-toolTip hk-cBBuy-toolTip"> <a class="hk-c-toolTip__wrap hk-cBBuy-tT__wrap hk-l-flex--allCenter hk-u-padding__v-05 hk-u-plainLink" href="'+cheapest_deeplink+'" target="_blank"> <div class="hk-cBBuy-tT__wrap hk-cBBuy__results hk-c-lists hk-c-lists--mini"> <input type="checkbox" class="hk-cB-fltDetail__check" id="hk-cBLi-fltDetail--cbBuy"> <div class="hk-c-list__wrap hk-cBLi-fltDetailBrief"> <div class="hk-u-disp--flex"> <div class="hk-c-list__imgWrap"> <img src="'+cheapest_flight_image_out+'" title="'+cheapest_flight_name_out+'" alt="'+cheapest_flight_name_out+'" class="hk-c-list__img"> </div> <div class="hk-cBLi__text hk-c-list__text"> <div class="hk-cBLi__name"> '+origin_code+' <svg class="hk-ext__icons--tiny hk-ext__icons--dark hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__airplaneRight"></use> </svg> '+destination_code+' '+returnFlight+' </div> <div class="hk-c-list__extraDescri hk-u-margin__v-05"> <svg class="hk-ext__icons--tiny hk-ext__icons--gray hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__takeOff"></use> </svg> '+cheapest_outtime+', '+cheapest_outdate+', <svg class="hk-ext__icons--tiny hk-ext__icons--gray hk-u-disp--ib hk-u-va--baseline" viewBox="0 0 24 24"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__clock"></use> </svg> '+cheapest_duration_out+' </div> </div> </div> </div> <div class="hk-c-list__wrap hk-cBLi-fltDetail"> <div class="hk-u-padding__v-1 hk-u-disp--flex"> <div class="hk-c-list__imgWrap"> <img src="'+cheapest_flight_image_out+'" alt="'+cheapest_flight_name_out+'" title="'+cheapest_flight_name_out+'" class="hk-c-list__img"> </div> <div class="hk-cBLi__text hk-c-list__text"> <div class="hk-cBLi__name"> '+origin_name+' <svg class="hk-ext__icons--tiny hk-ext__icons--dark hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__airplaneRight"></use> </svg> '+destination_code+' <span class="hk-u-fSize--tiny hk-u-margin__h-05 hk-u-text--lighter">'+cheapest_flight_code_out+'-'+cheapest_flight_no_out+'</span></div> <div class="hk-c-list__extraDescri hk-u-margin__v-05"> <svg class="hk-ext__icons--tiny hk-ext__icons--gray hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__takeOff"></use> </svg> '+cheapest_outtime+', '+cheapest_outdate+', <svg class="hk-ext__icons--tiny hk-ext__icons--gray hk-u-disp--ib hk-u-va--baseline" viewBox="0 0 24 24"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__clock"></use> </svg> '+cheapest_duration_out+' </div> </div> </div> </div>';

      if(returnFl == 1){

        var cheapest_indate = flightDet[0].inbound.depart_date;
        var cheapest_indate0 = cheapest_indate.split("-");
        var cheapest_indate1 = cheapest_indate0[cheapest_indate0.length - 1].trim();
        var cheapest_indate2 = cheapest_indate0[1].trim();
        cheapest_indate2 = convertMonthInt(cheapest_indate2);
        cheapest_indate = cheapest_indate1 + " " + cheapest_indate2;
        var cheapest_intime = flightDet[0].inbound.depart_time;
        var cheapest_flight_no_in = flightDet[0].inbound.flight_details[0].flight_no;
        var cheapest_flight_name_in = flightDet[0].inbound.flight_details[0].carrier_name;
        var cheapest_flight_code_in = flightDet[0].inbound.flight_details[0].carrier_code;
        var cheapest_flight_image_in = flightDet[0].inbound.flight_details[0].carrier_image;
        var cheapest_duration_in = flightDet[0].inbound.duration;
        var cheapest_hours_in = Math.floor( cheapest_duration_in / 60);          
        var cheapest_minutes_in = cheapest_duration_in % 60;
        if(cheapest_minutes_in > 0){
          cheapest_duration_in = cheapest_hours_in+"h "+cheapest_minutes_in+"m";
        }
        else{
          cheapest_duration_in = cheapest_hours_in+"h";
        }

        if(cheapest_flight_image_in=="" && carrier[cheapest_flight_code_in]){
          cheapest_flight_image_in = carrier[cheapest_flight_code_in]['image'];
        }

        show_more = '<label for="hk-cBLi-fltDetail--cbBuy" class="hk-cB-fltDetail__checkLabel1 hk-cB-fltDetail__checkLabels hk-c-links hk-c-links--iconTri hk-tri--down">Show More</label><label for="hk-cBLi-fltDetail--cbBuy" class="hk-cB-fltDetail__checkLabel2 hk-cB-fltDetail__checkLabels hk-c-links hk-c-links--iconTri hk-tri--up">Show Less</label>';

        str += '<div class="hk-c-list__wrap hk-cBLi-fltDetail"> <div class="hk-u-padding__v-1 hk-u-disp--flex"> <div class="hk-c-list__imgWrap"> <img src="'+cheapest_flight_image_in+'" alt="'+cheapest_flight_name_in+'" title="'+cheapest_flight_name_in+'" class="hk-c-list__img"> </div> <div class="hk-cBLi__text hk-c-list__text"> <div class="hk-cBLi__name"> '+destination_code+' <svg class="hk-ext__icons--tiny hk-ext__icons--dark hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__airplaneRight"></use> </svg> '+origin_code+' <span class="hk-u-fSize--tiny hk-u-margin__h-05 hk-u-text--lighter">'+cheapest_flight_code_in+'-'+cheapest_flight_no_in+' </span></div> <div class="hk-c-list__extraDescri hk-u-margin__v-05"> <svg class="hk-ext__icons--tiny hk-ext__icons--gray hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__takeOff"></use> </svg> '+cheapest_intime+', '+cheapest_indate+', <svg class="hk-ext__icons--tiny hk-ext__icons--gray hk-u-disp--ib hk-u-va--baseline" viewBox="0 0 24 24"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__clock"></use> </svg> '+cheapest_duration_in+' </div> </div> </div> </div>';
      }

      str+='<div class="hk-cBLi__footer">'+show_more+' <div class="hk-cBLi__price"> <span class="hk-u-text--super">'+currency_icon+'</span>'+cheapest_price+' </div> '+info_str+'<div class="hk-cBLi__storeIcoWrap"><img src="'+cheapest_airline_img+'" title="'+cheapest_airline_name+'" alt="'+cheapest_airline_name+'" class="hk-cBLi__storeIco"></div> </div> </div> </a> </div> </div> <strong class="hk-u-margin__0-1 hk-u-text--white">OR</strong> <div class="hk-u-disp--ib hk-c-toolTips__container hk-c-toolTips__container--down hk-c-toolTips__container--hoverFocus hk-c-btn hk-cB__btn--more hk-c-btn--check hk-check-down"> See All Prices<div class="hk-cB__more hk-c-toolTip hk-u-borderBox"> <div class="hk-c-toolTip__wrap"> <div class="hk-u-margin__h-1 hk-cBMore__header hk-cBMore__flexChild hk-u-borderBox"> <div class="hk-u-text--singleLine"> <span class="hk-u-text--lighter">Found</span> '+flightDet.length+' <span class="hk-u-text--lighter">Prices for</span> '+origin_code+' to '+destination_code+' </div> </div> <div class="hk-cBMore__filter"> <div class="hk-cBMFilter__wrap"> <div onclick="closeFilter()" class="hk-cBMFilter__close hk-js-cBMFilter__close">&times;</div> <div class="hk-cBMFilter__group"> <div class="hk-cBMFilter__title"> Filter Stores: </div> <div class="hk-cBMFilter__header"> <div class="hk-c-links hk-cBMFilter__header-left hk-js-cBMFilter__selectAll"> Select All </div> <div class="hk-c-links hk-cBMFilter__header-right hk-u-flexChild--right hk-js-cBMFilter__deselectAll"> Deselect All </div> </div> <div class="hk-cBMFilter__body"> <div class="hk-cBMFilter__check hk-c-check"> <input type="checkbox" name="hk-cBMFilter__checks" value="Make My Trip" id="hk-filter-mmt" class="hk-c-check__input--check"> <label for="hk-filter-mmt" class="hk-c-check__label hk-c-btn hk-c-btn--outline"> <span class="hk-c-check__labelText">Make My Trip</span> </label> </div> <div class="hk-cBMFilter__check hk-c-check"> <input type="checkbox" name="hk-cBMFilter__checks" value="Cleartrip" id="hk-filter-cleartrip" class="hk-c-check__input--check"> <label for="hk-filter-cleartrip" class="hk-c-check__label hk-c-btn hk-c-btn--outline"> <span class="hk-c-check__labelText">Cleartrip</span> </label> </div> </div> </div> </div> </div> <div class="hk-cBMore__body hk-cBMore__flexChild hk-u-borderBox "> <ul class="hk-cBMore__results hk-c-lists hk-c-lists--mini">';

      var show_more1 = "";
      var sm = 0;
      for(var l=0;l<flightDet.length;l++){
        var other_price = flightDet[l].pricing[0].price;
        var other_deeplink = flightDet[l].pricing[0].deeplink;
        var other_airline_name = flightDet[l].pricing[0].agent_name;
        var other_airline_img = flightDet[l].pricing[0].agent_image;
        var other_outdate = flightDet[l].outbound.depart_date;

        if(currency == 1){
          currency_icon = "$";
          if(getCookie("currency_to_usd")){
            other_price = parseFloat(getCookie("currency_to_usd")) * other_price;
          }
        }
        else if(currency == 0){
          currency_icon = "&#8377;";
        }
        other_price = Math.round(other_price * 100) / 100

        var other_outdate0 = other_outdate.split("-");
        var other_outdate1 = other_outdate0[other_outdate0.length - 1].trim();
        var other_outdate2 = other_outdate0[1].trim();
        other_outdate2 = convertMonthInt(other_outdate2);
        other_outdate = other_outdate1 + " " + other_outdate2;


        var other_outtime = flightDet[l].outbound.depart_time;
        var other_flight_no_out = flightDet[l].outbound.flight_details[0].flight_no;
        var other_flight_name_out = flightDet[l].outbound.flight_details[0].carrier_name;
        var other_flight_code_out = flightDet[l].outbound.flight_details[0].carrier_code;
        var other_flight_image_out = flightDet[l].outbound.flight_details[0].carrier_image;
        var other_duration_out = flightDet[l].outbound.duration;
        var other_hours_out = Math.floor( other_duration_out / 60);          
        var other_minutes_out = other_duration_out % 60;
        if(other_minutes_out > 0){
          other_duration_out = other_hours_out+"h "+other_minutes_out+"m";
        }
        else{
          other_duration_out = other_hours_out+"h";
        }
        if(other_flight_image_out=="" && carrier[other_flight_code_out]){

          other_flight_image_out = carrier[other_flight_code_out]['image'];
        }
        if(flightDet[l].inbound && flightDet[l].inbound != [] && flightDet[l].inbound != ""){
          var other_returnFlight = '<svg class="hk-ext__icons--tiny hk-ext__icons--dark hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__airplaneRight"></use> </svg> '+origin_code;
        }
        else{
          other_returnFlight = "";
        }

        str += '<li class="hk-cBMore__li hk-c-lists__li"> <a target="_blank" href="'+other_deeplink+'" class="hk-cBLi__link"> <input type="checkbox" class="hk-cB-fltDetail__check" id="hk-cBLi-fltDetail--'+sm+'"> <div class="hk-c-list__wrap hk-cBLi-fltDetailBrief"> <div class="hk-u-disp--flex"> <div class="hk-c-list__imgWrap"> <img src="'+other_flight_image_out+'" alt="'+other_flight_name_out+'" title="'+other_flight_name_out+'" class="hk-c-list__img"> </div> <div class="hk-cBLi__text hk-c-list__text"> <div class="hk-cBLi__name"> '+origin_code+' <svg class="hk-ext__icons--tiny hk-ext__icons--dark hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__airplaneRight"></use> </svg> '+destination_code+' '+other_returnFlight+' </div> <div class="hk-c-list__extraDescri hk-u-margin__v-05"> <svg class="hk-ext__icons--tiny hk-ext__icons--gray hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__takeOff"></use> </svg> '+other_outtime+', '+other_outdate+', <svg class="hk-ext__icons--tiny hk-ext__icons--gray hk-u-disp--ib hk-u-va--baseline" viewBox="0 0 24 24"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__clock"></use> </svg> '+other_duration_out+' </div> </div> </div> </div> <div class="hk-c-list__wrap hk-cBLi-fltDetail"> <div class="hk-u-padding__v-1 hk-u-disp--flex"> <div class="hk-c-list__imgWrap"> <img src="'+other_flight_image_out+'" alt="'+other_flight_name_out+'" title="'+other_flight_name_out+'" class="hk-c-list__img"> </div> <div class="hk-cBLi__text hk-c-list__text"> <div class="hk-cBLi__name"> '+origin_code+' <svg class="hk-ext__icons--tiny hk-ext__icons--dark hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__airplaneRight"></use> </svg> '+destination_code+' <span class="hk-u-fSize--tiny hk-u-margin__h-05 hk-u-text--lighter">'+other_flight_code_out+'-'+other_flight_no_out+' </span></div> <div class="hk-c-list__extraDescri hk-u-margin__v-05"> <svg class="hk-ext__icons--tiny hk-ext__icons--gray hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__takeOff"></use> </svg> '+other_outtime+', '+other_outdate+', <svg class="hk-ext__icons--tiny hk-ext__icons--gray hk-u-disp--ib hk-u-va--baseline" viewBox="0 0 24 24"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__clock"></use> </svg> '+other_duration_out+' </div> </div> </div> </div>';

        if(flightDet[l].inbound && flightDet[l].inbound != [] && flightDet[l].inbound != ""){
          var other_indate = flightDet[l].inbound.depart_date;
          var other_indate0 = other_indate.split("-");
          var other_indate1 = other_indate0[other_indate0.length - 1].trim();
          var other_indate2 = other_indate0[1].trim();
          other_indate2 = convertMonthInt(other_indate2);
          other_indate = other_indate1 + " " + other_indate2;

          var other_intime = flightDet[l].inbound.depart_time;
          var other_flight_no_in = flightDet[l].inbound.flight_details[0].flight_no;
          var other_flight_name_in = flightDet[l].inbound.flight_details[0].carrier_name;
          var other_flight_code_in = flightDet[l].inbound.flight_details[0].carrier_code;
          var other_flight_image_in = flightDet[l].inbound.flight_details[0].carrier_image;
          var other_duration_in = flightDet[l].inbound.duration;
          var other_hours_in = Math.floor( other_duration_in / 60);          
          var other_minutes_in = other_duration_in % 60;
          if(other_minutes_in > 0){
            other_duration_in = other_hours_in+"h "+other_minutes_in+"m";
          }
          else{
            other_duration_in = other_hours_in+"h";
          }
          if(other_flight_image_in=="" && carrier[other_flight_code_in]){
            other_flight_image_in = carrier[other_flight_code_in]['image'];
          }

          str +='<div class="hk-c-list__wrap hk-cBLi-fltDetail"> <div class="hk-u-padding__v-1 hk-u-disp--flex"> <div class="hk-c-list__imgWrap"> <img src="'+other_flight_image_in+'" alt="'+other_flight_name_in+'" class="hk-c-list__img"> </div> <div class="hk-cBLi__text hk-c-list__text"> <div class="hk-cBLi__name"> '+destination_code+' <svg class="hk-ext__icons--tiny hk-ext__icons--dark hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__airplaneRight"></use> </svg> '+origin_code+' <span class="hk-u-fSize--tiny hk-u-margin__h-05 hk-u-text--lighter">'+other_flight_code_in+'-'+other_flight_no_in+' </span></div> <div class="hk-c-list__extraDescri hk-u-margin__v-05"> <svg class="hk-ext__icons--tiny hk-ext__icons--gray hk-u-disp--ib " viewBox="0 0 34.7 32.9"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__takeOff"></use> </svg> '+other_intime+', '+other_indate+', <svg class="hk-ext__icons--tiny hk-ext__icons--gray hk-u-disp--ib hk-u-va--baseline" viewBox="0 0 24 24"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__clock"></use> </svg> '+other_duration_in+' </div> </div> </div> </div>';
          show_more1 = '<label for="hk-cBLi-fltDetail--'+sm+'" class="hk-cB-fltDetail__checkLabel1 hk-cB-fltDetail__checkLabels hk-c-links hk-c-links--iconTri hk-tri--down">Show More</label> <label for="hk-cBLi-fltDetail--'+sm+'" class="hk-cB-fltDetail__checkLabel2 hk-cB-fltDetail__checkLabels hk-c-links hk-c-links--iconTri hk-tri--up">Show Less</label>';
          sm++;
        }
        str +='<div class="hk-cBLi__footer"> '+show_more1+' <div class="hk-cBLi__price"> <span class="hk-u-text--super">'+currency_icon+'</span>'+other_price+' </div> '+info_str+'<div class="hk-cBLi__storeIcoWrap"><img src="'+other_airline_img+'" title="'+other_airline_name+'" alt="'+other_airline_name+'" class="hk-cBLi__storeIco"></div> </div> </a> </li>';

      }
      str +='</ul> </div> <div style="display:none;" class="hk-cBMore__footer hk-u-margin__h-1 hk-cBMore__flexChild hk-u-borderBox"> <div class="hk-u-borderBox hk-cBMore__footer-left"> <a href="mailto:wecare@buyhatke.com" class="hk-c-links hk-c-links--iconTri hk-tri--right">Send Feedback</a> </div> <div class="hk-u-borderBox hk-cBMore__footer-right hk-u-flexChild--right"> <div class="hk-cBMore__header-right hk-u-flexChild--right"> <div class="hk-c-btn hk-c-btn--outline hk-js-openFilter" onclick="openFilter()"> <svg class="hk-c-btnIcons" viewBox="0 0 14.3 9.5"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__filter"></use> </svg> Filter Results</div> </div> </div> </div> </div> </div> </div> <button class="refresh-flights hk-c-btn hk-c-btn--iconOnly hk-u-margin__h-05 hk-js-cB__refresh"> <svg class="hk-c-btnIcons hk-ext__icons--dark" viewBox="0 0 24 24"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__refresh"></use> </svg> </button> </div> </div> <div class="hk-cB__close hk-cB__flexChild"> &times; </div>';


      var positionSpecs = JSON.parse(posSpecs);
      var selectors = JSON.parse(posResults);
      if($(".hk-compBar").length > 0){
        $(".hk-compBar").html(str);
      }
      else {
        var str = '<div class="hk-compBar hk-ext-slideInDown hk-compBar--flight">' + str + ' </div>';
        for(n=0;n<selectors.length;n++){
          if($(selectors[n].selector).length>0 && addedFlightsToDOM==0){
            addedFlightsToDOM = 1;
            if(selectors[n].attr=="none"){
              if(selectors[n].pos=="after"){
                $(selectors[n].selector).after(str);
              }
              else {
                $(selectors[n].selector).before(str);
              }
            }
            else if(selectors[n].attr=="parent"){
              if(selectors[n].pos=="after"){
                $(selectors[n].selector).parent().after(str);
              }
              else {
                $(selectors[n].selector).parent().before(str);
              }
            }
          }
        }
      }
      setTimeout(function() {
        var $hkHdrPop = $('.hk-compBar'),
        $hkHdrPopHeight = $hkHdrPop.outerHeight(),
        $hkGlobWrapper = $('body'),
        $hkHdrPopClose = $('.hk-cB__close'),
        $hkHdrPopLogoImg = $('.hk-cB__logoImg'),
        $hkBringBackCompBar = $('.hk-bringBackCompBar');

        $hkHdrPop.addClass('hk-ext-animated');
        $hkHdrPopLogoImg.addClass('hk-ext-animated');
        $hkHdrPop.addClass('hk-ext-slideInDown').removeClass('hk-ext-slideInUp')

        $hkBringBackCompBar.removeClass('hk-bringBackCompBar--show');
        // $hkGlobWrapper.css('top', $hkHdrPopHeight + "px");
        var $hkHdrOverlayAnim = $('.hk-compBar__overlayAnimation');
        $('.hk-cB__close').click(function(){
         $hkHdrPop.removeClass('hk-ext-slideInDown').addClass('hk-ext-slideInUp')
         setTimeout(function() {
          $hkHdrPop.removeClass('hk-ext-animated');
        }, 500);
         $hkHdrPopLogoImg.removeClass('hk-ext-animated');
         $hkGlobWrapper.css('top', 0);
         $hkBringBackCompBar.addClass('hk-bringBackCompBar--show');
         for(l1=0;l1<positionSpecs.length;l1++){
          $(positionSpecs[l1].selector).css(positionSpecs[l1].cssAttr, positionSpecs[l1].postVal);
        }
      });
        if (!!$hkHdrOverlayAnim[0]) {
          setTimeout(function() {
            $hkHdrOverlayAnim.addClass('hk-compBar__oAnim--start');
          }, 1000);
        }
      }, 2000);

      for(l1=0;l1<positionSpecs.length;l1++){
        $(positionSpecs[l1].selector).css(positionSpecs[l1].cssAttr, positionSpecs[l1].preVal);
      }

      

      if($(".hk-compBar").length == 0){
        for(l1=0;l1<positionSpecs.length;l1++){
          $(positionSpecs[l1].selector).css(positionSpecs[l1].cssAttr, positionSpecs[l1].postVal);
        }
      }

    }
  }
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

function sendMessageFlights(msgType, jsonObj, command, funcName, passBack){
  // console.log("sendMessageFlights was called");
  if (msgType==1){
   if(tabID!=0){
    // console.log("flights Tab ID is " + tabID);
    var port = chrome.runtime.connect({name: "flightsPayloadData" + tabID});
    var strToSend = jsonObj + "~*" + command;
    port.postMessage({messageData: strToSend});
    port.onMessage.addListener(function(data){
      // console.log("flights Complete data is " + JSON.stringify(data));
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
    setTimeout(function(){sendMessageFlights(msgType, jsonObj, command, funcName, passBack);}, 100);
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
  chrome.runtime.sendMessage(args, function(response) {
    respoObt = response.farewell;
    if(typeof(funcName)=="function"){
      // console.log("here ",respoObt);
      // console.log("here ",passBack);
      funcName(respoObt, passBack);
    }
    else {
      // console.log("here not ");
      window[funcName](respoObt, passBack);
    }
  });   
}
}

function doNothingF(data, passBack){
  // Just do nothing !!
}

function setTabIDF(tabId, passBack){
  // console.log("Tab ID received is " + tabId);
  tabID = tabId;
}

function getTabIDF(){
 // console.log("Tab ID process initiated");
 var jsonArr = [{'sendTabIDF': 'bhejDE'}];
 jsonArr = JSON.stringify(jsonArr);
 var passBack = [];
 passBack = JSON.stringify(passBack);
 sendMessageFlights(0, jsonArr, 0, setTabIDF, passBack);
}
getTabIDF();