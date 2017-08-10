var url =window.location.href;

var urlcheck= "jabong.com/checkout/success";

if(url.split(urlcheck).length>1)
{

var s = document.createElement('script');
     s.id="jabong1";
 //  console.log(pincode);
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('jabongCheckcookie.js');
s.onload = function() {
//For more than one products

var globalConfig = JSON.parse($("#proddetails").html());
var noofproducts = globalConfig.productsName.length;
var products=[];
var k=0;
for (var i=0;i<noofproducts;i++)

{

var productname=globalConfig.productsName[i].name;
var productcode=globalConfig.productsName[i].sku;
var productsize;
var deliverydate=$(".products span").eq(0).text().split("Delivery by Thu,")[1];
var quantity=globalConfig.productsName[i].quantity;
var sellername="none";
var productprice= globalConfig.productsName[i].price;

//For more than one order id
var orderid=globalConfig.pageOnSuccessPurchaseID;

var product =   {
					"name":productname,
					"pid":productcode,
					"quantity":quantity,
					"size":'',
					"price":productprice,
					"sellername":sellername,
					"deliverydate":deliverydate,
					"orderid":orderid
					
				}
				
products.push(product);				

}

products=JSON.stringify(products);
products=encodeURIComponent(products);



//Total amount (More than one order)

var amount=$("li:contains('Total')").text().split(":")[1];

//General for all
var username= globalConfig.customer.first_name +" "+ globalConfig.customer.last_name;
var mobile=globalConfig.customer.phone;

var fullname= globalConfig.customer.address.first_name+" "+globalConfig.customer.address.last_name;
var address1= globalConfig.customer.address.address1;
var address2= globalConfig.customer.address.address2;
var address= globalConfig.customer.address.address1+" ,"+globalConfig.customer.address.address2;
var landmark='';
var city=globalConfig.customer.address.city;
var state=globalConfig.customer.address.state;
var mobilenumber=globalConfig.customer.address.phone;
var pincode=globalConfig.customer.address.postcode;


var addressobject=
{
	
	"fullname":fullname,
	"address1":address1,
	"address2":address2,
	"address":address,
	"landmark":landmark,
	"city":city,
	"state":state,
	"mobilenumber":mobilenumber,
	"pincode":pincode

}
addressobject=JSON.stringify(addressobject);
addressobject=encodeURIComponent(addressobject);
var clienttime=Date.now();
var date=Date.now();
var email=globalConfig.customer.email;
var bankname="bhuwan";
var modeofpayment=globalConfig.customer.paymentMethod;
var website=50;

//aff
var tags=["utm_source","utm_campaign","utm_medium","utm_content"];
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

function setCookie1(cname, cvalue, exdays) {
  var d = new Date();
  var dom=window
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/;domain="+"."+window.location.host.split(".")[1]+"."+window.location.host.split(".")[2];
}




};
(document.head || document.documentElement).appendChild(s);

}
