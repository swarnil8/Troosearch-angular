var url =window.location.href;

var urlcheck= "shopclues.com/atom/orderConfirmation";

if(url.split(urlcheck).length>1)
{

var s = document.createElement('script');
     s.id="shopcheck";
 //  console.log(pincode);
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('shopCheckcookie.js');
s.onload = function() {
//For more than one products

var prodsJson = JSON.parse($("#proddetails").html());
var digitalData = JSON.parse($("#proddata").html());

var noofproducts = prodsJson.length;
var products=[];
var k=0;
for (var i=0;i<noofproducts;i++)

{

var productname=prodsJson[i].name;
var productcode=prodsJson[i].sku;
var productsize='';
var deliverydate='';
var quantity=parseFloat(prodsJson[i].quantity);
var sellername="none";
var productprice=parseFloat(prodsJson[0].price);

//For more than one order id
var orderid=window.location.href.split("order_id=")[1];

var product =   {
					"name":encodeURIComponent(productname),
					"pid":encodeURIComponent(productcode),
					"quantity":encodeURIComponent(quantity),
					"size":'',
					"price":encodeURIComponent(productprice),
					"sellername":encodeURIComponent(sellername),
					"deliverydate":encodeURIComponent(deliverydate),
					"orderid":encodeURIComponent(orderid)
					
				}
				
products.push(product);				

}

products=JSON.stringify(products);
products=encodeURIComponent(products);



//Total amount (More than one order)

var amount=parseFloat(digitalData.amount_payable);

//General for all
var username= $(".details h4").text().split("You ")[1];
var mobile='';


var addressobject='';
var clienttime=Date.now();
var date=Date.now();
var email=$("#prodemail").html();
var bankname="";
var modeofpayment=digitalData.paymentMethod;
var website= 421;

//aff
var tags=["utm_source","s1","s2","s3","s4","s5"];;
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

var jsonArr = [{'modeofpayment':modeofpayment,'orderid':orderid,'bankname':bankname,'email':email,'date':date,'amount':amount,'username':username,'mobile':mobile,'address':addressobject,'products':products,'website':website,'aff':affobject,'param1':affparam1,'param2':affparam2}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,25,doNothing, []);
    //console.log("type");





};
(document.head || document.documentElement).appendChild(s);

}

function setCookie1(cname, cvalue, exdays) {
  var d = new Date();
  var dom=window
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/;domain="+"."+window.location.host.split(".")[1]+"."+window.location.host.split(".")[2];
}