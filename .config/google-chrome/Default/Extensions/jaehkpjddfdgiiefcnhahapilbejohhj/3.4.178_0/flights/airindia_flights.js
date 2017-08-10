
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
if(cur_url.split("book.airindia.in/itd/itd/lang/en/prg").length>1)
{

if(cur_url.split("Availa").length>1)
{
if($(".origin").length>0)
{
from = $("#wdforigin1").val().split(".")[1];
to =$("#wdfdest1").val().split(".")[1];
startDate=$("#wdfmonthyear1").val()+"-"+$("#wdfday1").val();

returnDate=$("#wdfmonthyear2").val()+"-"+$("#wdfday2").val()
if(returnDate.length<3)
{
  isReturn=0;
  returnDate="";
}
else
{
  isReturn=1;
}

cabinClass=$("#fareClass").val();
adults=$("#paxadult0").val();
children=$("#paxchild0").val();
infants=$("#paxinfant0").val();
}



}







  flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn);
//console.log(flightData);
}

var posResults = [];
posResults.push({selector: '#header', attr: 'none', pos: 'before'});
posResults.push({selector: 'body', attr: 'none', pos: 'before'});
posResults = JSON.stringify(posResults);
var posSpecs = [];
posSpecs.push({selector: '#header', attr: 'none', cssAttr: 'margin-top', preVal: '46px', postVal: '0px'});
posSpecs = JSON.stringify(posSpecs);

if(flightData.length > 0){
  flightData = JSON.stringify(flightData);
  flightBanner(flightData, posResults, posSpecs);
}
return;
}

var cur_url1 = window.location.href;
if(cur_url1.split("book.airindia.in/itd/itd/lang/en/prg").length > 1){
  scrapFlightData();
}
