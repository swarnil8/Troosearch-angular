var url =window.location.href;

var urlcheck= "amazon.in/gp/buy/thankyou/handlers/display.html";

if(url.split(urlcheck).length>1)
{

var orderid=window.location.href.split("orderId=")[1].split("&")[0];

//var products=getCookie("proddetails");
var products=localStorage.proddetails;
var addressobject=localStorage.addressobject;

var username=$(".nav-line-1:contains('Hello')").text().split("Hello, ")[1] ;
var mobile= $("#customer-mobile-number-stored").text();

var amount = parseFloat(localStorage.totalprice.replace(",",""));

var clienttime=Date.now();
var date=Date.now();
var email="";
var bankname="bhuwan";
var modeofpayment = localStorage.mode.trim().replace(/[^\x20-\x7E]/gmi, " ");
var website=63;

//aff
var tags=["tag","ascsubtag"];
var aff={};
var affparam1=getCookie(tags[0]);
var affparam2=getCookie(tags[1]);

for(var i=0;i<tags.length;i++)
{
  //console.log(localStorage[tags[i]]);
if(getCookie(tags[i])!=undefined||getCookie(tags[i])!="")
{
aff[tags[i]]=getCookie(tags[i]);
setCookie1(tags[i],"");
}

if(getCookie(tags[i]+"path")!=undefined||getCookie(tags[i]+"path")!="")
{
aff[tags[i]+"path"]=getCookie(tags[i]+"path");

setCookie1(tags[i]+"path","");
}

}
//console.log(aff);
affobject=JSON.stringify(aff);
//console.log(affobject);
affobject=encodeURIComponent(affobject);

//aff
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
  }
  return "";
}

var jsonArr = [{'modeofpayment':modeofpayment,'orderid':orderid,'bankname':bankname,'email':email,'date':date,'amount':amount,'username':username,'mobile':mobile,'address':addressobject,'products':products,'website':website,'aff':affobject,'param1':affparam1,'param2':affparam2}];
    
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,25,doNothing, []);
    //console.log("type");


function setCookie1(cname, cvalue, exdays) {
  var d = new Date();
  var dom=window
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/;domain="+"."+window.location.host.split(".")[1]+"."+window.location.host.split(".")[2];
}


}