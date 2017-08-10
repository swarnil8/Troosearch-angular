

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
  if(cur_url.split("//www.cleartrip.com/flights/results").length > 1 || cur_url.split("//www.cleartrip.com/flights/international/results").length > 1){
   if(cur_url.split("//www.cleartrip.com/flights/results").length > 1){
    cur_url = cur_url.split("//www.cleartrip.com/flights/results");
  }
  else  if(cur_url.split("//www.cleartrip.com/flights/international/results").length > 1){
    cur_url = cur_url.split("//www.cleartrip.com/flights/international/results");
  }
  cur_url = cur_url[1];

  if(cur_url.split("?from=").length > 1){
    from = cur_url.split("?from=");
  }
  else if(cur_url.split("&from=").length > 1){
    from = cur_url.split("&from=");
  }
  else{
    from = "";
  }
  if(from != ""){
    from = from[1];
    if(from.split("&").length > 1){
      from = from.split("&");
      from = from[0];
    }
    if(from.split("#").length > 1){
      from = from.split("#");
      from = from[0];
    }
    if(from.split("/").length > 1){
      from = from.split("/");
      from = from[0];
    }
  }


  if(cur_url.split("?to=").length > 1){
    to = cur_url.split("?to=");
  }
  else if(cur_url.split("&to=").length > 1){
    to = cur_url.split("&to=");
  }
  else{
    to = "";
  }
  if(to != ""){
    to = to[1];
    if(to.split("&").length > 1){
      to = to.split("&");
      to = to[0];
    }
    if(to.split("#").length > 1){
      to = to.split("#");
      to = to[0];
    }
    if(to.split("/").length > 1){
      to = to.split("/");
      to = to[0];
    }
  }


  if(cur_url.split("?depart_date=").length > 1){
    startDate = cur_url.split("?depart_date=");
  }
  else if(cur_url.split("&depart_date=").length > 1){
    startDate = cur_url.split("&depart_date=");
  }
  else{
    startDate = "";
  }
  if(startDate != ""){
    startDate = startDate[1];
    if(startDate.split("&").length > 1){
      startDate = startDate.split("&");
      startDate = startDate[0];
    }
    if(startDate.split("#").length > 1){
      startDate = startDate.split("#");
      startDate = startDate[0];
    }
  }

  if(cur_url.split("?return_date=").length > 1){
    isReturn = 1;
    returnDate = cur_url.split("?return_date=");
  }
  else if(cur_url.split("&return_date=").length > 1){
    isReturn = 1;
    returnDate = cur_url.split("&return_date=");
  }
  else{
    isReturn = 0;
    returnDate = "";
  }
  if(returnDate != ""){
    returnDate = returnDate[1];
    if(returnDate.split("&").length > 1){
      returnDate = returnDate.split("&");
      returnDate = returnDate[0];
    }
    if(returnDate.split("#").length > 1){
      returnDate = returnDate.split("#");
      returnDate = returnDate[0];
    }
  }

  if(startDate.split("/").length > 1){
    date1 = startDate.split("/");
    date1 = date1[date1.length-1];
    date2 = startDate.split("/");
    date2 = date2[1];
    date3 = startDate.split("/");
    date3 = date3[0];
    startDate = date1+"-"+date2+"-"+date3;
  }

  if(returnDate.split("/").length > 1){
    date1 = returnDate.split("/");
    date1 = date1[date1.length-1];
    date2 = returnDate.split("/");
    date2 = date2[1];
    date3 = returnDate.split("/");
    date3 = date3[0];
    returnDate = date1+"-"+date2+"-"+date3;
  }

  if(cur_url.split("?adults=").length > 1){
    adults = cur_url.split("?adults=");
  }
  else if(cur_url.split("&adults=").length > 1){
    adults = cur_url.split("&adults=");
  }
  else{
    adults = "";
  }
  if(adults != ""){
    adults = adults[1];
    if(adults.split("&").length > 1){
      adults = adults.split("&");
      adults = adults[0];
    }
    if(adults.split("#").length > 1){
      adults = adults.split("#");
      adults = adults[0];
    }
    if(adults.split("/").length > 1){
      adults = adults.split("/");
      adults = adults[0];
    }
  }


  if(cur_url.split("?childs=").length > 1){
    children = cur_url.split("?childs=");
  }
  else if(cur_url.split("&childs=").length > 1){
    children = cur_url.split("&childs=");
  }
  else{
    children = "";
  }
  if(children != ""){
    children = children[1];
    if(children.split("&").length > 1){
      children = children.split("&");
      children = children[0];
    }
    if(children.split("#").length > 1){
      children = children.split("#");
      children = children[0];
    }
    if(children.split("/").length > 1){
      children = children.split("/");
      children = children[0];
    }
  }

  if(cur_url.split("?infants=").length > 1){
    infants = cur_url.split("?infants=");
  }
  else if(cur_url.split("&infants=").length > 1){
    infants = cur_url.split("&infants=");
  }
  else{
    infants = "";
  }
  if(infants != ""){
    infants = infants[1];
    if(infants.split("&").length > 1){
      infants = infants.split("&");
      infants = infants[0];
    }
    if(infants.split("#").length > 1){
      infants = infants.split("#");
      infants = infants[0];
    }
    if(infants.split("/").length > 1){
      infants = infants.split("/");
      infants = infants[0];
    }
  }


  if(cur_url.split("?class=").length > 1){
    cabinClass = cur_url.split("?class=");
  }
  else if(cur_url.split("&class=").length > 1){
    cabinClass = cur_url.split("&class=");
  }
  else{
    cabinClass = "";
  }
  if(cabinClass != ""){
    cabinClass = cabinClass[1];
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
posResults.push({selector: '#GlobalNav', attr: 'none', pos: 'before'});
posResults = JSON.stringify(posResults);
var posSpecs = [];
posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'position', preVal: 'relative', postVal: 'none'});
posSpecs = JSON.stringify(posSpecs);

if(flightData.length > 0){
  // console.log("Flight-data: "+flightData);
  flightData = JSON.stringify(flightData);
  flightBanner(flightData, posResults, posSpecs);
}
return;
}

var cur_url1 = window.location.href;
if(cur_url1.split("//www.cleartrip.com/flights/results").length > 1 || cur_url1.split("//www.cleartrip.com/flights/international/results").length > 1){
  scrapFlightData();
}

function checkURL(){
  var url = window.location.href;
  if(cur_url1 != url){
    if(url.split("//www.cleartrip.com/flights/results").length > 1 || url.split("//www.cleartrip.com/flights/international/results").length > 1){
      $(".hk-compBar").remove();
      $('body').css("position", "none")
      scrapFlightData();
    }
    cur_url1 = url;
    // console.log("Successful");
  }
}

setInterval(function(){
  checkURL();
}, 500);
