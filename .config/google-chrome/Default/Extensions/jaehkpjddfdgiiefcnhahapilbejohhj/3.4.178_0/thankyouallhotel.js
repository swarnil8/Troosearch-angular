var bookingdate='';
var bookingid='';
var hotelname='';
var hoteladdress='';
var checkin='';
var checkout='';
var noofrooms='';
var noofdays='';
var roomtype='';
var people='';
var email='';
var amount='';
var amountpaid='';
var paymentmethod='';
var website='';
var type='';

var url = window.location.href;

if(url.split('goibibo.com/hotels/paycallback-ne').length>1)


{

bookingdate=$("span:contains('Booked on')").text().split("Booked on ")[1].trim();
bookingid=$("span:contains('Booking ID:')").next().text().trim();
hotelname=$(".ticketCenter span:eq(0)").text();
hoteladdress=$(".ticketCenter span:eq(0)").text().split(",")[0]+","+$(".ticketCenter span:eq(1)").text();
checkin=$("span:contains('Check In')").next().text().trim();
checkout=$("span:contains('Check Out')").next().text().trim();
noofrooms=$("span:contains('Room Type')").parent().next().find("span").eq(1).text().split("Room")[0].trim();
noofdays=$("span:contains('Room Type')").parent().next().find("span").eq(1).text().split(",")[1].trim().split("Nights")[0].trim();
roomtype=$("span:contains('Room Type')").next().text().trim();
people=$("span:contains('Guest Name')").next().text().trim();
email=$(".bkngId u").text().trim();
amount=$("#pah").text().split("Rs.")[1].split("at")[0].trim();
amountpaid=amount;
paymentmethod=$("#pah").text();
website='goibibo';
type='hotels';

}

if(url.split('makemytrip.com/mmthtl/site/hotels/thankyo').length>1)
{

setTimeout(function(){
bookingdate='';
bookingid=$('p[mt-id="bookingId"]').text();
hotelname=$('span[mt-id="name"]').text();
hoteladdress=$('span[mt-id="name"]').text();
checkin=$('span[mt-id="checkinStr"]').text();
checkout=$('span[mt-id="checkoutStr"]').text();
noofrooms=$('span[mt-id="roomNumber"]').text();
noofdays='';
roomtype=$('span[mt-id="roomType"]').text();
people=$('span[mt-id="fName"]').text()+""+$('span[mt-id="lName"]').text();
email=$('a[mt-id="travellerEmail"]').text();
amount=$('a[mt-id="grandTotal"]').text();
amountpaid=amount;
paymentmethod='';
website='mmt';
},3000);
website='mmt';
type='hotels';


}



if (url.split('cleartrip.com/hotels/itinerary/').length>1)

{

bookingdate='';
bookingid=$("p:contains('Your trip id') strong").text();
hotelname=$("h1:eq(0)").text();
hoteladdress='';
checkin=$(".start").text().split("Check-in")[1].trim().replace(/ /g,"");
checkout=$(".end").text().split("Check-out")[1].trim().replace(/ /g,"");
noofrooms=$(".summary h2").text().split("room")[0].trim();
noofdays=$(".duration").text().split("nights")[0].trim();
roomtype=$(".roomDetails").html().split("<small>")[0].trim().replace(/ /g,"");
people=$(".travName").text().trim().replace(/ /g,"");
email=$("p:contains('Your trip id')").text().split("sent to ")[1].trim();
amount=$("dt:contains('Room rate:')").next().text().split("Rs. ")[1].trim();
amountpaid=$("dt:contains('Total:')").next().text().split("Rs. ")[1].trim();
paymentmethod=$(".paymentSummary ul li ").eq(1).text().trim();
website='cleartrip';
type='hotels';

}


if(url.split('secure.yatra.com/hotels-india/hotel/confirmatio').length>1)
{

bookingdate='';
bookingid=$(".ref-no").text();
hotelname=$('txtXXXl:eq(0)').text();
hoteladdress=$("p.wfull:eq(0)").text().trim().replace(/ /g,"");
checkin=$(".Backdate:eq(0)").text().trim().replace(/ /g,"");
checkout=$(".Backdate:eq(0)").text().trim().replace(/ /g,"");
noofrooms=$(".abtHotel h4").text().trim().split("Room")[0].trim();
noofdays=$(".abtHotel h4").text().trim().split("Nights")[0].split(" for ")[1].trim();
roomtype=$(".room-type").text().trim();
people=$(".main-detail li:eq(0)").text().split("Dear")[1].split(",")[0];
email=$("span:contains('Email ID:')").text().split("[")[0].split("Email ID:")[1].trim();
amount=$(".total-pric .fare-label-price").text().split("Rs.")[1].replace(",","");
amountpaid=amount;
paymentmethod=$("font:contains('Payment mode')").text().trim();
website='yatra';
type='hotels';

}

if(url.split('secure.booking.com/confirmatio').length>1)
{

bookingdate='';
bookingid=$("th:contains('Booking number')").eq(0).next().text().trim();
hotelname=$("ul.checklst li:eq(1) strong").text();
hoteladdress=$("th:contains('Address')").eq(0).next().text().trim();
checkin=$("th:contains('Check-in')").eq(0).next().text().trim();
checkout=$("th:contains('Check-out')").eq(0).next().text().trim().split(")")[0];
noofrooms=$("th:contains('Booking details')").eq(0).next().text().trim().split(")")[0].split(",")[1].split("room")[0];
noofdays=$("th:contains('Booking details')").eq(0).next().text().trim().split(")")[0].split(",")[0].split("night")[0].trim();
roomtype=$(".pb_conf_room_descr_and_no_img").text().split("Change")[0].trim();
people=$("th:contains('Guest name')").next().text().split("Edit")[0].trim();
email= $("ul.checklst li:contains('confirmation email') strong").text();
amount=$(".totalsum__amount__number").text().split("Rs.")[1].trim();
amountpaid=amount;
paymentmethod='';
website='booking';
type='hotels';

}









if(type=="hotels")
{

if(website=="mmt")
{

setTimeout(function(){
var jsonArr = [{'bookingdate':bookingdate,'bookingid':bookingid,'hotelname':hotelname,'hoteladdress':hoteladdress,'checkin':checkin,'checkout':checkout,'noofrooms':noofrooms,'noofdays':noofdays,'roomtype':roomtype,'people':people,'email':email,'amount':amount,'amountpaid':amountpaid,'paymentmethod':paymentmethod,'website':website}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,1236,doNothing, []);
},4000);
}
else
{
var jsonArr = [{'bookingdate':bookingdate,'bookingid':bookingid,'hotelname':hotelname,'hoteladdress':hoteladdress,'checkin':checkin,'checkout':checkout,'noofrooms':noofrooms,'noofdays':noofdays,'roomtype':roomtype,'people':people,'email':email,'amount':amount,'amountpaid':amountpaid,'paymentmethod':paymentmethod,'website':website}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,1236,doNothing, []);

}


}


