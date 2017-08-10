
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
if(cur_url.split("tripadvisor.in/CheapFlightsSearchResults").length > 1){
if(cur_url.split("airport0.").length>1)
{
  from = cur_url.split("airport0.")[1].split("-")[0];
  to=cur_url.split("airport1.")[1].split("-")[0];
  startDate=cur_url.split("date0.")[1].split("-")[0];

  startDate=properdate(startDate);
  if(cur_url.split("date1.").length>1)
  {
  returnDate=cur_url.split("date1.")[1].split("-")[0];
  returnDate=properdate(returnDate);
  isReturn=1;
  }
  else
  {
    isReturn=0;
  }
}
else
if(cur_url.split("airport0=").length>1)
{
from = cur_url.split("airport0=")[1].split("&")[0];
  to=cur_url.split("airport1=")[1].split("&")[0];
  startDate=cur_url.split("date0=")[1].split("-")[0];

  startDate=properdate(startDate);
  if(cur_url.split("date1=").length>1)
  {
  returnDate=cur_url.split("date1=")[1].split("-")[0];
  returnDate=properdate(returnDate);
  isReturn=1;
  }
  else
  {
    isReturn=0;
  } 
}

  adults=parseInt(document.getElementById("FLIGHTS_ADULTS_NUMBERS_LABEL").innerText)+parseInt(document.getElementById("FLIGHTS_SENIORS_NUMBERS_LABEL").innerText);
  children=parseInt(document.getElementById("FLIGHTS_CHILDREN_NUMBERS_LABEL").innerText);
  cabinClass=$("#cabin option:selected" ).text();
  //console.log(cabinClass);
if(cabinClass=="Business Class")
{
  cabinClass="Business";
}
if(cabinClass=="Premium Economy")
{
  cabinClass="PremiumEconomy";
}

infants=0;

function properdate(date){

return date.slice(0,4)+"-"+date.slice(4,6)+"-"+date.slice(6,8);

}  

  flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn);
//console.log(flightData);
}

var posResults = [];
posResults.push({selector: '#HEAD', attr: 'none', pos: 'before'});
posResults.push({selector: 'body', attr: 'none', pos: 'before'});
posResults = JSON.stringify(posResults);
var posSpecs = [];
posSpecs.push({selector: '#HEAD', attr: 'none', cssAttr: 'margin-top', preVal: '46px', postVal: '0px'});
posSpecs = JSON.stringify(posSpecs);

if(flightData.length > 0){
  flightData = JSON.stringify(flightData);
  flightBanner(flightData, posResults, posSpecs);
}
return;
}

var cur_url1 = window.location.href;
if(cur_url1.split("tripadvisor.in/CheapFlightsSearchResults").length > 1){
  scrapFlightData();
}
