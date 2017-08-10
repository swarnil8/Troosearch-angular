var bookingdate='';
var bookingid='';
var flightname1='';
var flightname2='';
var traveldate1='';
var traveldate2='';
var from1='';
var to1='';
var from2='';
var to2='';
var passengers='';
var email='';
var amount='';
var amountpaid='';
var paymentmethod='';
var website='';
var type='';

var url = window.location.href;

if(url.split("goibibo.com/myaccount/trips/GOFLD").length>1)
{

// bookingdate=document.getElementsByClassName("bkngdate")[0].innerText.split("Booking Date:")[1].trim();
// bookingid=document.getElementsByClassName("pnrInfo")[0].innerText.trim();
// flightname=document.getElementsByClassName("airlineInfo")[0].innerText.trim();
// from=document.getElementsByClassName("tripStartinfo")[0].getElementsByClassName('boardLocCode')[0].innerText.trim();
// to=document.getElementsByClassName("tripEndInfo")[0].getElementsByClassName('boardLocCode')[document.getElementsByClassName("tripEndInfo")[0].getElementsByClassName('boardLocCode').length-1].innerText.trim();
// passengers=$("span:contains('Passengers')").parent().text().trim().split("Passengers")[1];
// amount=parseInt($("th:contains('Total Fare')").parent().text().split("Total Fare")[1].trim());
// amountpaid=parseInt($("th:contains('Amount Paid')").parent().text().split("Amount Paid")[1].trim());
// paymentmethod=$("span:contains('Payment Method')").parent().parent().text().trim().split("Payment Method")[1].trim();
// webiste="goibibo";
// type="flight";
}


if(url.split("cleartrip.com/flights/itinerary").length>1)
{

email=document.getElementById('userAccountLink').getAttribute('title');
bookingid=$("p:contains('Trip Id')").text().split("is ")[1].split('.')[0];
flightname1=$(".infoBlock .row").eq(0).find(".airlineName").find(".name").text().trim().replace(/ /g,'')+" "+$(".infoBlock .row").eq(0).find(".airlineName").find(".flightNumber").text().trim().replace(/ /g,'');
flightname2=$(".infoBlock .row").eq(1).find(".airlineName").find(".name").text().trim().replace(/ /g,'')+" "+$(".infoBlock .row").eq(1).find(".airlineName").find(".flightNumber").text().trim().replace(/ /g,'')
from1=$(".infoBlock .row").eq(0).find(".truncate").eq(1).text().replace(/ /g,'').split('→')[0];
to1=$(".infoBlock .row").eq(0).find(".truncate").eq(1).text().replace(/ /g,'').split('→')[1];
from2=$(".infoBlock .row").eq(1).find(".truncate").eq(1).text().replace(/ /g,'').split('→')[0];
to2=$(".infoBlock .row").eq(1).find(".truncate").eq(1).text().replace(/ /g,'').split('→')[1];
traveldate1=$(".infoBlock .row").eq(0).find(".truncate").parent().find('small').eq(1).text().replace(/ /g,'');
traveldate2=$(".infoBlock .row").eq(1).find(".truncate").parent().find('small').eq(1).text().replace(/ /g,'');

for(var i=0;i<$('#travellerBooked .truncate').length;i++)
{

if(i==0)
{
	passengers=$('#travellerBooked .truncate').eq(0).text().trim();
}
else

{
	passengers =passengers+"~"+$('#travellerBooked .truncate').eq(i).text().trim();

}

amount = $("dd.total").text().trim().split('Rs. ')[1].trim();
amountpaid=amount;

paymentmethod=$(".paymentSummary ul li ").eq(1).text().trim();

website="cleartrip";

type="flight";





}

}


if(url.split("book.spicejet.com/Itinerary").length>1)
{

bookingdate=$(".tgrid-itinerary:eq(0) td").eq(3).text();
bookingid=$(".tgrid-itinerary:eq(0) td").eq(1).text();
flightname1=$(".tgrid-itinerary:eq(1) td").eq(1).text().replace(/ /g,'');
flightname2=$(".tgrid-itinerary:eq(1) td").eq(5).text().replace(/ /g,'');
traveldate1=$(".tgrid-itinerary:eq(1) td").eq(0).text();
traveldate2=$(".tgrid-itinerary:eq(1) td").eq(4).text();
from1=$(".tgrid-itinerary:eq(1) td").eq(2).html().split("<br>")[0];
to1=$(".tgrid-itinerary:eq(1) td").eq(3).html().split("<br>")[0];
from2=$(".tgrid-itinerary:eq(1) td").eq(6).html().split("<br>")[0];
to2=$(".tgrid-itinerary:eq(1) td").eq(7).html().split("<br>")[0];
passengers=$("table:contains('Passenger Name') tr:eq(2)").find("td:eq(1)").text().trim();
email=$("#phone").text();
amount=$("#paymentDisplayTable tr:eq(2)").find("td:eq(2)").text().replace(/ /g,'').split("INR")[0].trim();

amountpaid=amount;
paymentmethod=$("#paymentDisplayTable tr:eq(2)").find("td:eq(1)").text().replace(/ /g,'');$("#paymentDisplayTable tr:eq(2)").find("td:eq(0)").text().replace(/ /g,'')+" "+$("#paymentDisplayTable tr:eq(2)").find("td:eq(1)").text().replace(/ /g,'');;
website="spicejet";
type="flight";




}


if(url.split("jetairways.com/JetOBE2/Booking/Confirmatio").length>1)
{

bookingdate='';
bookingid=$(".as-h1:contains('Booking Reference')").text().split(":")[1].trim();
flightname1=$(".panel-col h4:eq(0)").text();
flightname2=$(".panel-col h4:eq(1)").text();
traveldate1=$(".panel-col:eq(0) dd:eq(1)").text();
traveldate2=$(".panel-col:eq(1) dd:eq(1)").text();
from1=$(".panel-col:eq(0) dd:eq(0)").text();
to1=$(".panel-col:eq(0) dd:eq(3)").text();
from2=$(".panel-col:eq(1) dd:eq(0)").text();
to2=$(".panel-col:eq(1) dd:eq(3)").text();
passengers=$(".passenger-list td:eq(0)").text();
email='';
var markup = document.documentElement.innerHTML;
amount=markup.split('"price"')[1].split(',"quantity')[0];
paymentmethod=markup.split('"paymentMethod"')[1].split(',"jp')[0];
markup='';
amountpaid=amount;
website="jetairways";
type='flight';


}


if(url.split("book.goindigo.in/Booking/Vie").length>1)

{

bookingdate=$("li:contains('Date Of Booking')").find('h4').text().trim();
bookingid=$("li:contains('Booking Reference')").find('h4').text().trim();
flightname1=$(".itiFlightDetails table tr:eq(1)").find("td").eq(1).text().trim();
flightname2=$(".itiFlightDetails table tr:eq(2)").find("td").eq(1).text().trim();;
traveldate1=$(".itiFlightDetails table tr:eq(1)").find("td").eq(0).text().trim();
traveldate2=$(".itiFlightDetails table tr:eq(2)").find("td").eq(0).text().trim();;
from1=$(".itiFlightDetails table tr:eq(1)").find("td").eq(2).text().trim();
to1=$(".itiFlightDetails table tr:eq(1)").find("td").eq(3).text().trim();
from2=$(".itiFlightDetails table tr:eq(2)").find("td").eq(2).text().trim();
to2=$(".itiFlightDetails table tr:eq(2)").find("td").eq(3).text().trim();
passengers=$(".passenger_views li h2").text().trim().replace(/ /g,' ');
email=$(".passenser-details:contains('Email') a").text().trim();
amount=$(".sumry_table tr:contains('Total Price') td:eq(1)").text().trim().split("INR")[0];
amountpaid=amount;
paymentmethod='';
website='Indigo';
type='flight';	

}

if(url.split('paytm.com/myorder').length>1&&$("div").hasClass('flightOrder'))
{

bookingdate=$(".timedate").text();
bookingid=$(".flight").text().replace(/ /g,'');
flightname1=$(".fName:eq(0)").text()+" "+$(".fNumber:eq(0)").text();
flightname2=$(".fName:eq(1)").text()+" "+$(".fNumber:eq(1)").text();
traveldate1=$(".time:eq(0)").text();
traveldate2=$(".time:eq(2)").text();
from1=$(".fCity:eq(0)").text();
to1=$(".fCity:eq(1)").text();
from2=$(".fCity:eq(2)").text();
to2=$(".fCity:eq(3)").text();;
passengers=$(".pasangerName").text().replace(/ /g,'');
email='';
amount=$("#total").text().split("Grand Total")[1].replace(/ /g,'').split("Rs.")[1].trim();
amountpaid=amount;
paymentmethod='';
website='paytm';
type='flight';


}	

if(url.split('akbartravelsonline.com/Flight/BookingConfirmation').length>1)

{

bookingdate= '';
bookingid='' ;
flightname1=$(".in-flightdetails .in-item:eq(1)").text().replace(/ /g,"").trim();
flightname2= ''; 
traveldate1= $(".in-flightdetails .in-sector:eq(1)").html().split("<br>")[3].trim().replace(/ /g,"");
traveldate2='';
from1=$(".in-flightdetails .in-sector:eq(0) strong").text().trim();
to1= $(".in-flightdetails .in-sector:eq(1) strong").text().trim();
from2= '';
to2= '';
passengers= $(".in-paxname").text().replace(/ /g,"").trim();
email= $(".in-invoiceto").html().split("<br>")[1].split("Email :")[1].split("|")[0].trim();
amount=$(".paymntfare").text().split("INR ")[1];
amountpaid= amount;
paymentmethod="" ;
website= "akb";
type="flight" ;


}

if(url.split('yatra.com/checkout-ui/dom2/confirmatio').length>1)

{

bookingdate= '';
bookingid=$("span:contains('Reference Number')").parent().find("span .bold").text().trim();
flightname1=$(".flight-name:eq(0)").text().trim().replace(/ /g,"");
flightname2=$(".flight-name:eq(1)").text().trim().replace(/ /g,""); 
traveldate1= $(".dep-leg:eq(0) .txt-light:eq(0)").text().trim();
traveldate2=$(".dep-leg:eq(1) .txt-light:eq(0)").text().trim();
from1=$(".dep-leg:eq(0) .bold:eq(0)").text().trim();
to1= $(".arvl-leg:eq(0) .bold:eq(0)").text().trim();
from2= $(".dep-leg:eq(1) .bold:eq(0)").text().trim();
to2= $(".arvl-leg:eq(1) .bold:eq(0)").text().trim();
passengers= $(".pax-name").text().trim();
var markup = document.documentElement.innerHTML;
email=markup.split('"email":')[1].split(",")[0];
markup='';
amount=$(".fare-label-price:eq(0)").text().split("Rs.")[1].trim();
amountpaid= $(".total-price .fare-label-price").text().trim().split("Rs.")[1].trim();
paymentmethod=$(".pay-mode .fare-label-price").text().trim();
website= "yatra";
type="flight" ;


}

if(url.split('flights.makemytrip.com/makemytrip/thankyouResul').length>1)
{


bookingid=$("h3:contains('Booking ID')").text().split("Booking ID:")[1].trim();
flightname1=$(".itineary_sectional_info:eq(0) .flght_name:eq(0)").text().trim()+" "+$(".itineary_sectional_info .fligh_number:eq(0)").text().trim();
flightname2=$(".itineary_sectional_info:eq(1) .flght_name:eq(0)").text().trim()+" "+$(".itineary_sectional_info .fligh_number:eq(1)").text().trim();
traveldate1=$(".itineary_dateinfo:eq(0)").text().trim();
traveldate2=$(".itineary_dateinfo:eq(1)").text().trim();
from1=$(".itineary_departure:eq(0) .city_name:eq(0)").text();
to1=$(".itineary_departure:eq(1) .city_name:eq(0)").text();
from2=$(".itineary_departure:eq(3) .city_name:eq(0)").text();
to2=$(".itineary_departure:eq(4) .city_name:eq(0)").text();
var markup = document.documentElement.innerHTML;
email=markup.split('"emailID":')[1].split(",")[0];
passengers=markup.split('"firstName":')[1].split(",")[0];
bookingdate=markup.split('"bookingDate":')[1].split(",")[0];
amount=markup.split('"totalCost":')[1].split(",")[0];
markup='';
amountpaid=amount;
paymentmethod='';
website='mmt';
type='flight';


}

if(url.split('goair.in/manage/print-receipt').length>1)
{


bookingdate=$("td:contains('Date of Booking:')").text().split("Date of Booking:")[1].trim();
bookingid=$("td:contains('Booking Reference')").text().split("Booking Reference:")[1].trim().replace(/ /g,'');
flightname1=$("tr:contains('Date'):eq(0)").next().find("td").eq(4).text().trim();
flightname2=$("tr:contains('Date'):eq(1)").next().find("td").eq(4).text().trim();
traveldate1=$("tr:contains('Date'):eq(0)").next().find("td").eq(0).text().trim();
traveldate2=$("tr:contains('Date'):eq(1)").next().find("td").eq(0).text().trim();
from1=$("tr:contains('Date'):eq(0)").next().find("td").eq(2).text().trim();
to1=$("tr:contains('Date'):eq(0)").next().find("td").eq(3).text().trim();
from2=$("tr:contains('Date'):eq(1)").next().find("td").eq(2).text();
to2=$("tr:contains('Date'):eq(1)").next().find("td").eq(3).text();
passengers=$("table:contains('Traveler(s) Information:') td.font11").text().trim().replace(/ /g,"");
email=$("td:contains('Mobile:')").text().split("Email:")[1].split("Mobile")[0].trim();
amount=$("td:contains('Payment Summary')").parent().find("td").eq(3).text().split('INR')[0].trim();
amountpaid=amount;
paymentmethod=$("td:contains('Payment Summary')").parent().find("td").eq(1).text();
website='goair';
type='flight';

}


if(url.split('book.airindia.in/itd/itd').length>1)
{


bookingdate='';
bookingid=$("#bookedsection tr:contains('Airline booking reference:')").find("td").eq(1).text().trim();
flightname1=$(".servicecode:eq(0)").text().split(",")[0].split("Operated")[0];
flightname2=$(".servicecode:eq(0)").text().split(",")[0].split("Operated")[0];
traveldate1=$(".depart-date:eq(0)").text().split("Depart")[1];
traveldate2=$(".depart-date:eq(1)").text().split("Depart")[1];
from1=$(".origin-destination:eq(0) .od-depart:eq(0)").text();
to1=$(".origin-destination:eq(0) .od-arrive:eq(0)").text();
from2=$(".origin-destination:eq(1) .od-depart:eq(0)").text();
to2=$(".origin-destination:eq(1) .od-depart:eq(0)").text();
passengers=$("td:contains('Adult passenger Traveller:').label").parent().find("td").eq(1).text();
email=$("font:contains('A booking confirmation')").text().split("sent to")[1].trim();
amount=$(".total.money").text().split("INR")[1].trim().replace(/ /g,"");
amountpaid=amount;
paymentmethod='';
website='AI';
type='flight';

}

if(url.split('goibibo.com/paymentcallbac').length>1)
{

bookingdate=$(".book_date").text().trim();
bookingid=$('.bkngId strong').text().trim();
flightname1=$(".seatingClass:eq(0)").parent().parent().text().trim();
flightname2=$(".seatingClass:eq(1)").parent().parent().text().trim();
traveldate1=$(".journeydate:eq(0)").text().trim();
traveldate2=$(".journeydate:eq(1)").text().trim();
from1=$(".flghtInfo").eq(0).text().split("(")[0];
to1=$(".flghtInfo").eq(2).text().split("(")[0];
from2=$(".flghtInfo").eq(3).text().split("(")[0];
to2=$(".flghtInfo").eq(5).text().split("(")[0];
passengers=$("span:contains('Passenger(s)')").parent().text().trim().replace(/ /g,"");
email=$('.bkngId').text().trim().split("(")[1].split(")")[0];
var markup = document.documentElement.innerHTML;
amount=markup.split("transactamount':")[1].split(",")[0];
amountpaid=amount;
paymentmethod='';
website='goibibo';
type='flight';



}

if(type=="flight")
{

var jsonArr = [{'bookingdate':bookingdate,'bookingid':bookingid,'flightname1':flightname1,'flightname2':flightname2,'traveldate1':traveldate1,'traveldate2':traveldate2,'from1':from1,'to1':to1,'from2':from2,'to2':to2,'passengers':passengers,'amount':amount,'amountpaid':amountpaid,'paymentmethod':paymentmethod,'website':website}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,1234,doNothing, []);

}







