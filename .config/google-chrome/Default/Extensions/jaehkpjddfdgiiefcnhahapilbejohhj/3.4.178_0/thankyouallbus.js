var bookingdate='';
var bookingid='';
var busname='';
var bustype='';
var from='';
var to='';
var boardingpoint='';
var departure='';
var dropoff='';
var passengers='';
var email='';
var amount='';
var amountpaid='';
var paymentmethod='';
var coupon='';
var ticketurl='';
var website='';
var type='';

var url = window.location.href;

if(url.split('redbus.in/Ticket/ShowTicke').length>1)


{

 bookingdate='';
 bookingid=$(".ticketno").text().split(":")[1].trim();
 busname=$('.bus-name').text().trim();
 from=$(".source-dest").text().split("-")[0].trim();
 to=$(".source-dest").text().split("-")[1].trim();
 boardingpoint=$(".loc:eq(0)").text().trim();
 departure=$(".doj").text().trim().replace(/ /g,'').split("Confirmed")[0]+" "+$(".dep-time").text().trim();
 dropoff=$(".loc:eq(1)").text().trim();
 passengers=$(".ppname").text().trim();
 var markup=document.documentElement.innerHTML;
 email=markup.split("var dataLayer")[1].split("<script>")[0].split("'email'")[1].split(",")[0].split(":")[1].replace(/'/g,"").trim();
 bustype=markup.split("var dataLayer")[1].split("<script>")[0].split("'variant'")[1].split(",")[0].split(":")[1].replace(/'/g,"").trim();
 amount=markup.split("var dataLayer")[1].split("<script>")[0].split("'price'")[1].split(",")[0].split(":")[1].replace(/'/g,"").trim();
 amountpaid=amount;
 paymentmethod=markup.split("var dataLayer")[1].split("<script>")[0].split("'paymentType'")[1].split(",")[0].split(":")[1].replace(/'/g,"").trim()+""+markup.split("var dataLayer")[1].split("<script>")[0].split("'cardType'")[1].split(",")[0].split(":")[1].replace(/'/g,"").trim().replace(/ /g,'');
 coupon=markup.split("var dataLayer")[1].split("<script>")[0].split("'coupon'")[1].split(",")[0].split(":")[1].replace(/'/g,"").trim().replace(/ /g,'');
 website='redbus';
 ticketurl='';
 type='bus';
 markup='';

}


if(url.split('bus.makemytrip.com/bus/booking/completed').length>1)
{

  var url1=$("a:contains('PRINT')").attr("href");
  var url12="https://bus.makemytrip.com"+url1;
  bookingdate='';
  bookingid=$("p:contains('Your Booking ID')").text().split("Booking ID -")[1].trim();
  setTimeout(function(){
  busname=$(".bus_operator").text().trim();
  bustype='';
  from=$(".thanks_list_time:eq(0)").next().text();
  to=$(".thanks_list_time:eq(1)").next().text();
  boardingpoint='';
  departure=$(".itineary_dateinfo").text()+" "+$(".thanks_list_time:eq(0)").text();
  dropoff='';
  passengers=$("#ssologinlink strong").text().trim();
  email=$("p:contains('e-ticket') a:eq(0)").text();
  amount=$("span:contains('TOTAL BASE FARE'):eq(0)").next().text().split("Rs. ")[1].replace(",","");
  amountpaid=$("span:contains('GRAND TOTAL'):eq(0)").next().text().split("Rs. ")[1].replace(",","");
  paymentmethod='';
  coupon='';
  ticketurl=url12;
},3000);
  website='mmt';
  type='bus';

}


if(url.split('goibibo.com/buspaymentcallbac').length>1)

{
try{
   bookingdate='';
   bookingid=$("span:contains('Booking Id')").next().text().trim();
   busname=$("span.airlineSprite").next().find("span:eq(0)").text();
   bustype=$("span.airlineSprite").next().find("span:eq(1)").text();
   from=$("i.icon-bus").parent().children().find("span").eq(0).text().split("to")[0].trim();
   to=$("i.icon-bus").parent().children().find("span").eq(0).text().split("to")[1].trim();
   boardingpoint=$("span:contains('Boarding Point')").next().text();
   departure=$("span:contains('Travel Date')").next().text();
   dropoff='';
   passengers=$("span:contains('Passenger(s)')").next().text();
   email=$(".bkngId a").text();
   var markup=document.documentElement.innerHTML;
   amount=markup.split('"busTransactionAmount"')[1].split(",")[0].split(":")[1].replace(/"/g,'').trim();
   amountpaid=amount;
   paymentmethod='';
   coupon=markup.split('"promoCode"')[1].split(",")[0].split(":")[1].replace(/"/g,'').trim();
   ticketurl='';
   }
   catch(e)
   {
    ticketurl=encodeURIComponent(e);
   }
   website='goibibo';
   type='bus';
   markup='';



}

if(url.split('abhibus.com/confirmatio').length>1)

{
try{
  if($("p:contains('Booked on')").text().split("Booked on").length>0)
  {
bookingdate=$("p:contains('Booked on')").text().split("Booked on")[1].replace(/ /g,'');
  }
  else
  {
    bookingdate="error";
  }
   bookingid=$(".detailjrny p").eq(0).text();
   busname=$(".detailjrny h3").eq(3).text();
   bustype=$(".detailjrny p").eq(2).text();
   
if ($(".detailjrny h3").eq(2).text().split("to").length>0)
 {
   from=$(".detailjrny h3").eq(2).text().split("to")[0].replace(/ /g,'');
   to=$(".detailjrny h3").eq(2).text().split("to")[1].replace(/ /g,'')
 }
 else
 {
  from="error";
  to="error";
 }

if($("td:contains('Boarding Point')").eq(1).length>0)
{
   boardingpoint=$("td:contains('Boarding Point')").eq(1).find("h4").text().replace(/ /g,'');
 }
 if($(".detailjrny p").eq(1).length>0)
 {
   departure=$(".detailjrny p").eq(1).text().replace(/ /g,'');
  }
  else
  {
    deaprture="error";
  }
  if($("td:contains('Dropping Point')").eq(1).length>0)
  {
     dropoff=$("td:contains('Dropping Point')").eq(1).find("h4").text().replace(/ /g,'');
   }
   else
   {
    dropoff="error";
   }
   for(var i=0;i<10;i++)
   {
   passengers+=$("tr:contains('Travellers'):contains('Age')").eq(i).next().find("td").eq(1).text();
   }
   
   passengers=passengers;
   email='';
   if($("h3:contains('Total Amount Paid')").next().text().split("Rs.").length>0)
   { 
   amount=$("h3:contains('Total Amount Paid')").next().text().split("Rs.")[1].replace(/ /g,'');
   }
   else
   {
   amount="error";
   }
   amountpaid=amount;
   paymentmethod='';
   coupon='';
   ticketurl='';
   

}
catch (e)
{
ticketurl=encodeURIComponent(e);
}
   website='abhi';
   type='bus';




}






if(type=="bus")
{

if(website=="mmt")
{
  setTimeout(function(){
var jsonArr = [{'bookingdate':bookingdate,'bookingid':bookingid,'busname':busname,'bustype':bustype,'from':from,'to':to,'from':from,'to':to,'boardingpoint':boardingpoint,'departure':departure,'dropoff':dropoff,'passengers':passengers,'email':email,'coupon':coupon,'ticketurl':ticketurl,'amount':amount,'amountpaid':amountpaid,'paymentmethod':paymentmethod,'website':website}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,1235,doNothing, []);


  },4000);
}
else
{
  var jsonArr = [{'bookingdate':bookingdate,'bookingid':bookingid,'busname':busname,'bustype':bustype,'from':from,'to':to,'from':from,'to':to,'boardingpoint':boardingpoint,'departure':departure,'dropoff':dropoff,'passengers':passengers,'email':email,'coupon':coupon,'ticketurl':ticketurl,'amount':amount,'amountpaid':amountpaid,'paymentmethod':paymentmethod,'website':website}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,1235,doNothing, []);

}

}


