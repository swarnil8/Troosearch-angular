
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


cur_url=window.location.href;
if(cur_url.split("offers.smartbuy.hdfcbank.com/search_flight").length>1)
{

from=$("#leavingfrom").val().split("(")[1].trim().split(")")[0].trim(); 
to=$("#goingto").val().split("(")[1].trim().split(")")[0].trim();
var startday=$("#depart").val().split("-")[0];
var startmonth=$("#depart").val().split("-")[1];
var startyear = $("#depart").val().split("-")[2];
startDate=startyear+"-"+startmonth+"-"+startday;

var returnday=$("#arrive").val().split("-")[0];
var returnmonth=$("#arrive").val().split("-")[1];
var returnyear = $("#arrive").val().split("-")[2];
returnDate=returnyear+"-"+returnmonth+"-"+returnday;

if($("input[value=R]").is(':checked'))
{
  isReturn=1;
}
else
{
  isReturn=0;
  returnDate="";
}

adults=$("#adults").val();
children=$("select[name=child]").val();
infants=$("select[name=infants]").val();

cabinClass=$("select[name=class] option:selected").text().trim();
if(cabinClass=="Premium Economy")
{
  cabinClass="PremiumEconomy";
}



  flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn);
//console.log(flightData);
}

var posResults = [];
posResults.push({selector: 'body', attr: 'none', pos: 'before'});
posResults.push({selector: 'body', attr: 'none', pos: 'before'});
posResults = JSON.stringify(posResults);
var posSpecs = [];
posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '46px', postVal: '0px'});
posSpecs = JSON.stringify(posSpecs);

if(flightData.length > 0){
  flightData = JSON.stringify(flightData);
  flightBanner(flightData, posResults, posSpecs);
}
return;
}

var cur_url1 = window.location.href;
if(cur_url1.split("offers.smartbuy.hdfcbank.com/search_flight").length > 1){
  scrapFlightData();
}
