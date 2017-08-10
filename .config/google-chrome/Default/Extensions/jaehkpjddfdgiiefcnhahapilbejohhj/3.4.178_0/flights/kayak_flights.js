
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

  if(getCookie("currency_to_usd")){
  }
  else{
    convertINRToUSD();
  } 

  // //flights.makemytrip.com/makemytrip/search/O/O/E/1/0/0/S/V0/BLR_GOI_23-11-2016?intid=homepage_Widget_Search_Bangalore_Goa

  // //flights.makemytrip.com/makemytrip/search/R/R/E/1/0/0/S/V0/BLR_GOI_23-11-2016,GOI_BLR_24-11-2016?intid=DF_LP_Widget_Search_Bangalore_Goa

// https://cheapfaresindia.makemytrip.com/international/raw/index.html?l=exIndia&t=RT&i=BLR-JNB-D-24Nov2016_JNB-BLR-D-30Nov2016&p=A-1&c=E&userID=60181479386050107#/listing

// https://cheapfaresindia.makemytrip.com/international/raw/index.html?l=exIndia&t=OW&i=BLR-JNB-D-24Nov2016&p=A-1&c=E?lang=en#/listing
var cur_url = window.location.href;
var link = window.location.href;
if(cur_url.split("kayak.co.in/flights/").length > 1 || cur_url.split("kayak.com/flights/").length > 1){

  from = cur_url.split("flights/")[1].split("-")[0];
  to=cur_url.split("flights/")[1].split("-")[1].split("/")[0];
  startDate=cur_url.split("flights/")[1].split("/")[1];
  if(cur_url.split("flights/")[1].split("/").length>2)
  {
    if(cur_url.split("flights/")[1].split("/")[2].split("-").length==3)
    {

      returnDate=cur_url.split("flights/")[1].split("/")[2];
      isReturn=1;
    }
    else
    {
      isReturn=0;
    }
  }

  if(cur_url.split("business").length>1)
  {
    cabinClass="Business";
  }
  else if (cur_url.split("premium").length>1)
  {
    cabinClass="PremiumEconomy";
  }
  else
  {
    cabinClass="Economy";
  }
  if(cur_url.split("adult").length>1)
  {
    var adposition =parseInt(cur_url.split("adult")[0].split("/").length)-1;
    adults=cur_url.split("adult")[0].split("/")[adposition];
  }
  else
  {
    adults=1;
  }
  if (cur_url.split("children").length>1)
  {
    var youth=parseInt(cur_url.split("children")[1].split("17").length-1);
    var childs=parseInt(cur_url.split("children")[1].split("11").length-1);
//console.log(youth);
//console.log(childs);
children= youth+childs;

sinfants=parseInt(cur_url.split("children")[1].split("1S").length-1);
linfants=parseInt(cur_url.split("children")[1].split("1L").length-1);
infants=sinfants+linfants;
}

if(cur_url1.split("kayak.com/flights").length > 1){
  flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn,'USD');

}
else{
  flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn);
}

//console.log(flightData);
}

var posResults = [];
posResults.push({selector: '#hd', attr: 'none', pos: 'before'});
posResults.push({selector: 'body', attr: 'none', pos: 'before'});
posResults = JSON.stringify(posResults);
var posSpecs = [];
posSpecs.push({selector: '#hd', attr: 'none', cssAttr: 'margin-top', preVal: '46px', postVal: '0px'});
posSpecs = JSON.stringify(posSpecs);

if(flightData.length > 0){
  flightData = JSON.stringify(flightData);
  flightBanner(flightData, posResults, posSpecs);
}
return;
}

var cur_url1 = window.location.href;
if(cur_url1.split("kayak.co.in/flights").length > 1 || cur_url1.split("kayak.com/flights").length > 1){
  scrapFlightData();
}
