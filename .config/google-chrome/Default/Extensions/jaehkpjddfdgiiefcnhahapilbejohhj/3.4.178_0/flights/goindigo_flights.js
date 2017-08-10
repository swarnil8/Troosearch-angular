
function scrapFlightData(){
  var from = "";
  var to = "";
  var startDate = "";
  var isReturn = "";
  var adults = 1;
  var infants = 0;
  var children = 0;
  var cabinClass = "Economy";
  var returnDate = "";
  var flightData = [];

  if($(".price_container").length > 0 && $(".price_container .departing_ul").length > 0){
    if($(".price_container:eq(0) .departing_ul:eq(0) .stations_name").length > 0 && $(".price_container:eq(0) .departing_ul:eq(0) .stations_name:eq(0) .stn").length > 0){
      from = $(".price_container:eq(0) .departing_ul:eq(0) .stations_name:eq(0) .stn:eq(0)").text().trim();
      to_len = $(".price_container:eq(0) .departing_ul:eq(0) .stations_name").length-1;
      to = $(".price_container:eq(0) .departing_ul:eq(0) .stations_name:eq("+to_len+") .stn:eq(0)").text().trim();
    }

    if($(".price_container:eq(0) .departing_ul:eq(0) .stations_name").length > 0 && $(".price_container:eq(0) .departing_ul:eq(0) .stations_name:eq(0) span").length > 1){
      startDate = $(".price_container:eq(0) .departing_ul:eq(0) .stations_name:eq(0) span:eq(1)").text().trim();
      startDate = startDate.split(" ");
      date1 = startDate[startDate.length - 1];
      date1 = "20"+date1;
      date2 = startDate[startDate.length - 2];
      date2 = convertMonth(date2);
      date3 = startDate[startDate.length - 3];

      startDate = date1+"-"+date2+"-"+date3;
    }

    if($(".price_container .departing_ul").length > 1){
      isReturn = 1;

      if($(".price_container:eq(0) .departing_ul:eq(1) .stations_name").length > 0 && $(".price_container:eq(0) .departing_ul:eq(1) .stations_name:eq(0) span").length > 1){
        returnDate = $(".price_container:eq(0) .departing_ul:eq(1) .stations_name:eq(0) span:eq(1)").text().trim();
        returnDate = returnDate.split(" ");
        date1 = returnDate[returnDate.length - 1];
        date1 = "20"+date1;
        date2 = returnDate[returnDate.length - 2];
        date2 = convertMonth(date2);
        date3 = returnDate[returnDate.length - 3];
        returnDate = date1+"-"+date2+"-"+date3;
      }

    }
    else{
      isReturn = 0;
    }
  }
  else{
    setTimeout(scrapFlightData, 500);
  }

  if($("#indiGoRoundTripSearch_PassengerCounts_1__Count").length > 0 && $("#indiGoRoundTripSearch_PassengerCounts_1__Count").find("option").length > 0){
    for(var c=0;c<$("#indiGoRoundTripSearch_PassengerCounts_1__Count").find("option").length;c++){
      if($("#indiGoRoundTripSearch_PassengerCounts_1__Count").find("option:eq("+c+")").attr("selected")){
        children = parseInt($("#indiGoRoundTripSearch_PassengerCounts_1__Count").find("option:eq("+c+")").attr("value"));
      }
    }
  }

   if($("#indiGoRoundTripSearch_PassengerCounts_0__Count").length > 0 && $("#indiGoRoundTripSearch_PassengerCounts_0__Count").find("option").length > 0){
    for(var c=0;c<$("#indiGoRoundTripSearch_PassengerCounts_0__Count").find("option").length;c++){
      if($("#indiGoRoundTripSearch_PassengerCounts_0__Count").find("option:eq("+c+")").attr("selected")){
        adults = parseInt($("#indiGoRoundTripSearch_PassengerCounts_0__Count").find("option:eq("+c+")").attr("value"));
      }
    }
  }

   if($("#indiGoRoundTripSearch_InfantCount").length > 0 && $("#indiGoRoundTripSearch_InfantCount").find("option").length > 0){
    for(var c=0;c<$("#indiGoRoundTripSearch_InfantCount").find("option").length;c++){
      if($("#indiGoRoundTripSearch_InfantCount").find("option:eq("+c+")").attr("selected")){
        infants = parseInt($("#indiGoRoundTripSearch_InfantCount").find("option:eq("+c+")").attr("value"));
      }
    }
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
  var posResults = [];
  posResults.push({selector: 'body', attr: 'none', pos: 'before'});
  posResults = JSON.stringify(posResults);
  var posSpecs = [];
  posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '53px', postVal: '0px'});
  posSpecs = JSON.stringify(posSpecs);

  if(flightData.length > 0){
    flightData = JSON.stringify(flightData);
    flightBanner(flightData, posResults, posSpecs);
  }
}

var cur_url1 = window.location.href;
if(cur_url1.split("book.goindigo.in").length > 1){
  scrapFlightData();
}
