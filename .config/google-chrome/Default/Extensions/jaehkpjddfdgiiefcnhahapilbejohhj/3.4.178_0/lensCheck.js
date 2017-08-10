var url =window.location.href;

var urlcheck= "lenskart.com/checkout/onepage/success";

if(url.split(urlcheck).length>0)
{

var orderid=$(".pull-left.bold").text().trim().split("#")[1];
//For more than one products

//Total amount (More than one order)

//General for all
var username= $(".page-title span").text();
var mobile= "none";

var addressobject="";
var products="";
var fullname= $(".page-title span").text();
var clienttime=Date.now();
var date=Date.now();
var email= "";
var bankname="bhuwan";
var modeofpayment="";
var website=57;
var jsonArr = [{'modeofpayment':modeofpayment,'orderid':orderid,'bankname':bankname,'email':email,'date':date,'amount':amount,'username':username,'mobile':mobile,'address':addressobject,'products':products,'website':website}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,25,doNothing, []);
    //console.log("type");





}

