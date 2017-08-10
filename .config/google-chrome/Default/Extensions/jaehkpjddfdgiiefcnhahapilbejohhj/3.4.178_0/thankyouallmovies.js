var bookingdate='';
var bookingid='';
var moviename='';
var theatre='';
var time='';
var date='';
var quantity='';
var seats='';
var hallnumber='';
var customername='';
var email='';
var mobile='';
var amount='';
var amountpaid='';
var paymentmethod='';
var coupon='';
var website='';
var type='';

var url = window.location.href;

if(url.split('bookmyshow.com/confirmatio').length>1)


{


 bookingdate=$("p:contains('BOOKING DATE') span").text();
 bookingid=$(".__booking-id:eq(0) strong").text();
 moviename=$(".ticket-info h1:eq(0)").text();
 theatre=$(".venue-pin").parent().text().split("|")[0].trim();
 time=$(".venue-pin").parent().html().split("<br>")[1].split("|")[0].trim();
 date=$(".venue-pin").parent().text().split("|")[1].trim().replace(/ /g,'');
 quantity=$(".qyt").text().split("Quantity:")[1].trim();
 seats=$(".__seats strong").text()+"~"+$(".seats strong").text();
 hallnumber=$(".__seats span:eq(1)").html().trim();
 markup=document.documentElement.innerHTML;
 email=markup.split("strMemberEmail")[1].split(";")[0].split("=")[1].trim();
 mobile=markup.split("strMemberMobile")[1].split(";")[0].split("=")[1].trim();
 markup='';
 amount=$("span:contains('Ticket price')").next().text().split("Rs.")[1];
 amountpaid=$(".__value").text().split("Rs.")[1];
 paymentmethod=$("p:contains('PAYMENT METHOD') span").text();
 coupon='';
 website='bookmyshow';
 type='movies';
}






if(type=="movies")
{

  var jsonArr = [{'bookingdate':bookingdate,'bookingid':bookingid,'moviename':moviename,'theatre':theatre,'time':time,'date':date,'quantity':quantity,'customername':customername,'seats':seats,'hallnumber':hallnumber,'email':email,'mobile':mobile,'coupon':coupon,'amount':amount,'amountpaid':amountpaid,'paymentmethod':paymentmethod,'website':website}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(1, jsonArr,1237,doNothing, []);

}


