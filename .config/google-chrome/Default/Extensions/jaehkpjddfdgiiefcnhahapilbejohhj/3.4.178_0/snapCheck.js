var url =window.location.href;

var urlcheck= "snapdeal.com/prepareThankYouPage";

if(url.split(urlcheck).length>1)
{
	
var nooforder=$(".heads.prod").length;


//For more than one products
var noofproducts= parseInt($(".totl-prod").text().trim().split(": ")[1]);
var products=[];
var k=0;
for (var i=0;i<noofproducts;i++)

{

var productname=$(".ocn-item-name").eq(i).text().trim();
var productcode=$(".ocn-item-name a").eq(i).attr("href").split("/")[$(".ocn-item-name a").eq(i).attr("href").split("/").length-1];
var productsize;
var deliverydate=$(".expctd-del").eq(i).text().split("Expected Delivery:")[1].trim();
var quantity="1";
var sellername="none";
var productprice=parseInt($(".highlight-price").eq(i).text().split("Rs. ")[1]);

//For more than one order id
var orderid=window.location.href.split("order=")[1].split("&")[0];

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

for(var x=0;x<nooforder;x++)
{
	if(x==0)
	{
var amount=parseInt($(".highlight-price").eq(x).text().split("Rs. ")[1]);		
	}
	else
	{
var amount = amount + parseInt($(".highlight-price").eq(x).text().split("Rs. ")[1]);		
	}

}

//General for all
var username=$(".accountUserName").text();
var mobile=$(".ocn-cutomer-mobile").text().trim().split("91 ")[1];

var fullname= $(".o-main-head").text().split("Thank You ")[1].split("!")[0];
var address1= $(".ocn-cutomer-address-line1").text().trim();
var address2= $(".ocn-cutomer-address-line2").text().trim();
var address= $(".ocn-cutomer-address-line1").text().trim()+$(".ocn-cutomer-address-line2").text();
var landmark= $(".ocn-cutomer-address").text().split(",")[0];
var city=$(".ocn-cutomer-address").text().split(",")[1].split("-")[0].trim();
var state=$(".ocn-cutomer-address").text().split(",")[2].trim();
var mobilenumber=$(".ocn-cutomer-mobile").text().trim().split("91 ")[1];
var pincode=$(".ocn-cutomer-address").text().split(",")[1].split("-")[1].trim();


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
var clienttime=Date.now();
var date=Date.now();
var email=$(".ocn-cutomer-email").text();
var bankname="bhuwan";
var modeofpayment="bhuwan";
var website=129;

//aff
var tags=["aff_id","source","aff_sub","aff_sub2"];
var aff={};
var affparam1=localStorage[tags[0]];
var affparam2=localStorage[tags[1]];
for(var i=0;i<tags.length;i++)
{
	//console.log(localStorage[tags[i]]);
if(localStorage[tags[i]]!=undefined||localStorage[tags[i]]!="")
{
aff[tags[i]]=localStorage[tags[i]];
localStorage[tags[i]]="";
}

if(localStorage[tags[i]+"path"]!=undefined||localStorage[tags[i]+"path"]!="")
{
aff[tags[i]+"path"]=localStorage[tags[i]+"path"];

localStorage[tags[i]+"path"]="";
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





}