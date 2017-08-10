var url =window.location.href;

var urlcheck= "myntra.com/checkout/confirm";

if(url.split(urlcheck).length>1)
{

var s = document.createElement('script');
     s.id="myntra1";
 //  console.log(pincode);
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('myntraCheckCookie.js');
s.onload = function() {
//For more than one products

var analyticsLayer = JSON.parse($("#proddetails").html());
var noofproducts = analyticsLayer.products.length;
var products=[];
var k=0;
for (var i=0;i<noofproducts;i++)

{

var productname=analyticsLayer.products[i]["Style-Name"];
var productcode=analyticsLayer.products[i].SKU;
var productsize=analyticsLayer.products[i].Size;
var deliverydate='';
var quantity=parseFloat(analyticsLayer.products[i].Quantity);
var sellername="none";
var productprice= parseFloat(analyticsLayer.products[i].Price);

//For more than one order id
var orderid=analyticsLayer.id;

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

var amount=parseFloat($(".amount").text().split("Rs. ")[1].trim());

//General for all
var username= $(".user-name").text();
var mobile='';

var addressobject=getCookie("addressobject");

//addressobject=JSON.stringify(addressobject);
var clienttime=Date.now();
var date=Date.now();
var email='';
var bankname="bhuwan";
var modeofpayment=$(".pmode").text().split("Payment Mode")[1].trim().replace(/[^\x20-\x7E]/gmi, " ");
var website=111;

//aff
var tags=["utm_source","utm_campaign","utm_medium"];
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


if(url.split("checkout/paymen").length>1)
{
 // alert("bhuwan");
var fullname= $(".name").eq(0).text();
var address1= $("div.address").text();
var address2= $(".locality").text();
var address= address1+","+address2;
var landmark= "";
var city=$(".city").text().split("-")[0].trim();
var state=$(".state").text();
var mobilenumber=$("div.mobile").text().split("Mobile:")[1].trim();
var pincode=$(".city").text().split("-")[1].trim();


var addressobject=
{
  "type":'',
  "fullname":encodeURIComponent(fullname),
  "address1":encodeURIComponent(address1),
  "address2":encodeURIComponent(address2),
  "address":encodeURIComponent(address),
  "landmark":encodeURIComponent(landmark),
  "city":encodeURIComponent(city),
  "state":encodeURIComponent(state),
  "mobilenumber":encodeURIComponent(mobilenumber),
  "pincode":encodeURIComponent(pincode)

}


addressobject=JSON.stringify(addressobject);
addressobject=encodeURIComponent(addressobject);
setCookie("addressobject",addressobject);

}



function setCookie1(cname, cvalue, exdays) {
  var d = new Date();
  var dom=window
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/;domain="+"."+window.location.host.split(".")[1]+"."+window.location.host.split(".")[2];
}