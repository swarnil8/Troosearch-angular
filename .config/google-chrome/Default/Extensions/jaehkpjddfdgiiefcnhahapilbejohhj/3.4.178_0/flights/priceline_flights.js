
function scrapFlightData(){

  if(getCookie("currency_to_usd")){
  }
  else{
    convertINRToUSD();
  }  
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

  // //flights.makemytrip.com/makemytrip/search/O/O/E/1/0/0/S/V0/BLR_GOI_23-11-2016?intid=homepage_Widget_Search_Bangalore_Goa

  // //flights.makemytrip.com/makemytrip/search/R/R/E/1/0/0/S/V0/BLR_GOI_23-11-2016,GOI_BLR_24-11-2016?intid=DF_LP_Widget_Search_Bangalore_Goa

// https://cheapfaresindia.makemytrip.com/international/raw/index.html?l=exIndia&t=RT&i=BLR-JNB-D-24Nov2016_JNB-BLR-D-30Nov2016&p=A-1&c=E&userID=60181479386050107#/listing

// https://cheapfaresindia.makemytrip.com/international/raw/index.html?l=exIndia&t=OW&i=BLR-JNB-D-24Nov2016&p=A-1&c=E?lang=en#/listing


cur_url=window.location.href;
if(cur_url.split("priceline.com/m/fly/search").length>1)
{

  var cur_url12=cur_url.split("search/")[1].split("/")[0].split("-");

  from =cur_url12[0];
  to=cur_url12[1];
  startDate=properdate(cur_url12[2]);
  if(cur_url.split("search/")[1].split("/")[1].split("cabin").length>1)
  {
    isReturn=0;
  }
  else
  {
    isReturn=1;
    returnDate=properdate(cur_url.split("search/")[1].split("/")[1].split("-")[2]);
  }


  if(cur_url.split("children=").length>1)

    if(cur_url.split("children=").length>1)
    {
      children=cur_url.split("children=")[1].split("")[0];
      adults=cur_url.split("adults=")[1].split("")[0];

    }
    else
    {
      adults=cur_url.split("adults=")[1];
    }

    if(cur_url.split("youths=").length>1)
    {
      if(children=="")
      {
        children=0;
      }
      children=parseInt(children)+parseInt(cur_url.split("youths=")[1].split("")[0]);
      adults=cur_url.split("adults=")[1].split("")[0];
    }

    if(cur_url.split("infants=").length>1)
    {
      infants=cur_url.split("infants=")[1].split("")[0];
      adults=cur_url.split("adults=")[1].split("")[0];
    }

    cabinClass=cur_url.split("cabin-class=")[1].split("&")[0];

    if(cabinClass=="ECO")
    {
      cabinClass="Economy";

    }
    else
      if(cabinClass=="PEC")
      {
        cabinClass="PremiumEconomy";
      }
      else
        if(cabinClass=="BUS")
        {
          cabinClass="Business";
        }
        if(cur_url.split("num-adults=").length > 1){
          adults = cur_url.split("num-adults=");
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



        flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn, 'USD');

//console.log(flightData);
}

var posResults = [];
posResults.push({selector: '#transclude-header', attr: 'none', pos: 'before'});
posResults.push({selector: 'body', attr: 'none', pos: 'before'});
posResults = JSON.stringify(posResults);
var posSpecs = [];
posSpecs.push({selector: '#transclude-header', attr: 'none', cssAttr: 'margin-top', preVal: '46px', postVal: '0px'});
posSpecs = JSON.stringify(posSpecs);

if(flightData.length > 0){
  flightData = JSON.stringify(flightData);
  flightBanner(flightData, posResults, posSpecs);
}
return;
}

var cur_url1 = window.location.href;
if(cur_url1.split("priceline.com/m/fly/search").length > 1){
  scrapFlightData();
}
function properdate(date){

  return date.slice(0,4)+"-"+date.slice(4,6)+"-"+date.slice(6,8);

}  

