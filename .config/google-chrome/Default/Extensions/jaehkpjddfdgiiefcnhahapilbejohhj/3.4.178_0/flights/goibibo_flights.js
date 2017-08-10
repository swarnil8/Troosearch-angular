function scrapFlightData(){
  var from = "";
  var to = "";
  var startDate = "";
  var isReturn = "";
  var adults = 1;
  var infants = 0;
  var children = 0;
  var cabinClass = "";
  var returnDate = "";
  var flightData = [];

  var cur_url = window.location.href;
  var link = window.location.href;
  if(cur_url.split("goibibo.com").length > 1 && cur_url.split("#flight-searchresult").length > 1){
    cur_url = cur_url.split("#flight-searchresult");
    cur_url = cur_url[1];

    if(cur_url.split("#air-").length > 1){
      cur_url = cur_url.split("#air-");
      cur_url = cur_url[1];
    }
    from = cur_url.split("-");
    from = from[0];

    to = cur_url.split("-");
    to = to[1];

    startDate = cur_url.split("-");
    startDate = startDate[2];

    date1 = startDate.substring(0,4);
    date2 = startDate.substring(4,6);
    date3 = startDate.substring(6,startDate.length);
    startDate = date1+"-"+date2+"-"+date3;


    returnDate = cur_url.split("-");
    returnDate = returnDate[3];
    if(returnDate != ""){
      isReturn = 1;
      date1 = returnDate.substring(0,4);
      date2 = returnDate.substring(4,6);
      date3 = returnDate.substring(6,returnDate.length);
      returnDate = date1+"-"+date2+"-"+date3;
    }
    else{
      isReturn = 0;
    }


    adults = cur_url.split("-");
    adults = adults[4];


    children = cur_url.split("-");
    children = children[5];

    infants = cur_url.split("-");
    infants = infants[6];

    cabinClass = cur_url.split("-");
    cabinClass = cabinClass[7];

    if(cabinClass != ""){
      if(cabinClass.split("&").length > 1){
        cabinClass = cabinClass.split("&");
        cabinClass = cabinClass[0];
      }
      if(cabinClass.split("#").length > 1){
        cabinClass = cabinClass.split("#");
        cabinClass = cabinClass[0];
      }
      if(cabinClass.split("/").length > 1){
        cabinClass = cabinClass.split("/");
        cabinClass = cabinClass[0];
      }
      cabinClass = cabinClass.split("+").join("").trim();
    }

    if(cabinClass == "E"){
      cabinClass = "Economy";
    }
    else if(cabinClass == "F"){
      cabinClass = "First";
    }
    else if(cabinClass == "W"){
      cabinClass = "PremiumEconomy";
    }
    else if(cabinClass == "B"){
      cabinClass = "Business";
    }
    // console.log("from : "+from);
    // console.log("to : "+to);
    // console.log("startDate : "+startDate);
    // console.log("returnDate : "+returnDate);
    // console.log("cabinClass : "+cabinClass);
    // console.log("adults : "+adults);
    // console.log("children : "+children);
    // console.log("infants : "+infants);
    // console.log("isReturn : "+isReturn);

    flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn);
  }

  var posResults = [];
  posResults.push({selector: 'body', attr: 'none', pos: 'before'});
  posResults.push({selector: '.mobMoreMenu', attr: 'none', pos: 'before'});
  posResults = JSON.stringify(posResults);
  var posSpecs = [];
  posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '53px', postVal: '0px'});
  posSpecs = JSON.stringify(posSpecs);

  if(flightData.length > 0){
  // console.log("Flight-data: "+flightData);
  flightData = JSON.stringify(flightData);
  flightBanner(flightData, posResults, posSpecs);
}
return;
}

var cur_url1 = window.location.href;
if(cur_url1.split("goibibo.com").length > 1 && cur_url1.split("#flight-searchresult").length > 1){
  scrapFlightData();
}

function checkURL(){
  var url = window.location.href;
  if(cur_url1 != url){
    if(url.split("goibibo.com").length > 1 && url.split("#flight-searchresult").length > 1){
      $(".hk-compBar").remove();
      $('body').css("margin-top", "0px")
      scrapFlightData();
    }
    cur_url1 = url;
    // console.log("Successful");
  }
}

setInterval(function(){
  checkURL();
}, 500);

