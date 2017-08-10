//console.log("bhuwan");
function checkBodyContents(){
if(($("body:contains('Booking Number'),body:contains('Booking Reference'),body:contains('Booking ID'),body:contains('Ref Number')").length==1)||($("body:contains('Booking'),body:contains('BOOKING'),body:contains('booking'),body:contains('Confirmed'),body:contains('CONFIRMED'),body:contains('confirmed'),body:contains('Choosing'),body:contains('CHOOSING'),body:contains('itinerary'),body:contains('ITINERARY'),body:contains('Itinerary'),body:contains('choosing')").length==1)&&($("body:contains('Thank you'),body:contains('thank you'),body:contains('Thanks'),body:contains('thanks'),body:contains('THANK YOU'),body:contains('Thank You')").length==1)||($("body:contains('booking is confirmed'),body:contains('booking is done'),body:contains('ticket is confirmed'),body:contains('Booking is Confirmed'),body:contains('Ticket is Confirmed'),body:contains('Booking is Done'),body:contains('reservation is confirmed'),body:contains('Reservation is Confirmed'),body:contains('Reservation is confirmed'),body:contains('booking confirmation'),body:contains('Booking Confirmation'),body:contains('BOOKING IS CONFIRMED'),body:contains('TICKET IS CONFIRMED'),body:contains('BOOKING IS DONE'),body:contains('RESERVATION IS CONFIRMED'),body:contains('RESERVATION IS CONFIRMED'),body:contains('BOOKING CONFIRMATION')")).length==1)

{

html = document.getElementsByTagName('html')[0].innerHTML;
// console.log(html);
url =window.location.href.split("?")[0];
var html1 = {};
html1['url'] = url;
html1['html'] = html;
// console.log("trying to send -1 " + html1);
var html1=JSON.stringify(html1);
// console.log("trying to send " + html1);
var jsonArr = [{'url':url,'html': html}];
jsonArr = JSON.stringify(jsonArr);
sendMessage(1, jsonArr, 40, doNothing, []);


}
}


setTimeout(function(){checkBodyContents()}, 5000);

setTimeout(function(){checkBodyContents()}, 10000);