var url =window.location.href;

var urlcheck= "koovs.com/checkout/succes";

if(url.split(urlcheck).length>1)
{

var s = document.createElement('script');
     s.id="koovs12";
 //  console.log(pincode);
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('koovsCheckcookie.js');
s.onload = function() {
    //this.remove();
   // console.log(pincode);
  // console.log("bhuwan");
var orderid=$(".suceessordernumber").text();
//For more than one products
var productsdetails=JSON.parse(getCookie("products"));

var noofproducts= JSON.parse(getCookie("products")).length;
var products=[];
var k=0;
 
for (var i=0;i<noofproducts;i++)

{


var productname=productsdetails[i].name;
var productcode=productsdetails[i].sku;
var productsize=productsdetails[i].size;
var deliverydate='';
var quantity=parseFloat(productsdetails[i].quantity);
var sellername="none";
var productprice=parseFloat(productsdetails[i].price);
//For more than one order id
var orderid=$(".suceessordernumber").text();

var product =   {
          "name":encodeURIComponent(productname),
          "pid":encodeURIComponent(productcode),
          "quantity":encodeURIComponent(quantity),
          "size":encodeURIComponent(productsize),
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

var amount = parseFloat($(".payment_amount").text().split("Rs. ")[1]);

//General for all
var username= $(".selected_add_name").text();
var mobile= "none";
var fullname= $(".selected_add_name").text();
var address1= $(".selected_address_text").html().split("&nbsp;")[0];
var address2= '';
var address= $(".selected_address_text").html().split("&nbsp;")[0];
var landmark= "";
var city=$(".selected_address_text").html().split("&nbsp;")[1].split(",")[0].trim();
var state=$(".selected_address_text").html().split("&nbsp;")[1].split(",")[1].trim();
var mobilenumber='';
var pincode=$(".selected_address_text").html().split("&nbsp;")[2].split(",")[1].trim();


var addressobject=
{
  
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

//aff
var tags=["utm_source","utm_campaign","utm_medium","admitad_uid"];
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
var website=22;
var clienttime=Date.now();
var date=Date.now();
var email=$(".sub-email").text();
var bankname="bhuwan";
var modeofpayment=$(".add_new_address").text().split(": ")[1].trim().replace(/[^\x20-\x7E]/gmi, " ");
var jsonArr = [{'modeofpayment':modeofpayment,'orderid':orderid,'bankname':bankname,'email':email,'date':date,'amount':amount,'username':username,'mobile':mobile,'address':addressobject,'products':products,'website':website,'aff':affobject,'param1':affparam1,'param2':affparam2}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,25,doNothing, []);
    //console.log("type");


};
(document.head || document.documentElement).appendChild(s);


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



}

