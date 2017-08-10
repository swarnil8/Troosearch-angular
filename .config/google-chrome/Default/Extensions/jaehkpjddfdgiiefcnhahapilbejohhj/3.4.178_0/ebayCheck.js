var url =window.location.href;

var urlcheck= "ebay.in/OrderConfir";

if(url.split(urlcheck).length>1)
{


var nooforder=1;

var orderid=$(".xo-oc-ppc b").text();
//For more than one products
var noofproducts= $(".xo-oc-odi").length;
var products=[];
var k=0;
for (var i=0;i<noofproducts;i++)

{

var productname=$(".xo-oc-h50").eq(i).text();
var productcode=$(".xo-oc-h50").eq(i).text().split("(")[1].split(")")[0];
var productsize;
var deliverydate=$(".xo-oc-edd").eq(i).text().trim().split("Delivery:")[1];
var quantity=parseFloat($("li span:contains('Qty')").eq(i).parent().text().split("Qty :")[1]);
var sellername=$(".xo-oc-vcd p").eq(i).text();
var productprice=parseFloat($("li span:contains('Price')").eq(i).parent().text().split("Price :")[1].split("Rs.")[1]);

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


//Total amount (More than on order)

var amount=parseFloat($(".xo-oc-cpa").text().split("Rs.")[1]);
//General for all
var username=$("#gh-eb-u").text().split("Hi ")[1].split("!")[0];
var mobile=$(".xo-oc-rec b").text();
var fullname= $(".xo-spb p").eq(0).text();
var address1= $(".xo-spb p").eq(1).text();
var address2= '';
var address= $(".xo-spb p").eq(0).text();
var landmark= "";
var city=$(".xo-spb p").eq(2).text();
var state=$(".xo-spb p").eq(3).text().split(",")[0];
var mobilenumber=$(".xo-oc-rec b").text();
var pincode=$(".xo-spb p").eq(3).text().split(",")[1];


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
var tags=["source","aff_sub","aff_source","offer_id","aff_sub2"];
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

var clienttime=Date.now();
var date=Date.now();
var email='';
var bankname="bhuwan";
var modeofpayment=$(".xo-oc-sp").text().split("Mode:")[1].replace(/[^\x20-\x7E]/gmi, " ");
var website= 1;
var jsonArr = [{'modeofpayment':modeofpayment,'orderid':orderid,'bankname':bankname,'email':email,'date':date,'amount':amount,'username':username,'mobile':mobile,'address':addressobject,'products':products,'website':website,'aff':affobject,'param1':affparam1,'param2':affparam2}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,25,doNothing, []);
    //console.log("type");


}

function setCookie1(cname, cvalue, exdays) {
  var d = new Date();
  var dom=window
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/;domain="+"."+window.location.host.split(".")[1]+"."+window.location.host.split(".")[2];
}