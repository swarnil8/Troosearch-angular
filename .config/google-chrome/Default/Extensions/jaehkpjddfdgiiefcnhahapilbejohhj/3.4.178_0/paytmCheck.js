
function main123()
{
var l = jQuery.noConflict();

var url =window.location.href;

var urlcheck= "paytm.com/shop/summary";
//var urlcheck= "paytm.com/myorders";

if(url.split(urlcheck).length>1)
{

//console.log("bhuwan");
var nooforder=1;


//For more than one products
var noofproducts= l(".detailorder-listing").length;
if (noofproducts>0)
{
//console.log(noofproducts);
var products=[];
var k=0;
for (var i=0;i<noofproducts;i++)

{

var productname=l(".detailorder-listing").eq(i).find("li").eq(1).find("a").eq(0).text();
var productcode=l(".detailorder-listing").eq(i).find("li").eq(1).find("a").eq(0).attr('href').split("-")[l(".detailorder-listing").eq(i).find("li").eq(1).find("a").eq(0).attr('href').split("-").length-1];
var productsize;
var deliverydate=l(".detailorder-listing").eq(i).find("li").eq(3).text().trim().split("Delivered on : ")[1];
var quantity="1";
var sellername="none";
if(l(".detailorder-listing").eq(i).find("li").eq(4).text().trim().split("Rs ")[1].trim().replace(/[^\x20-\x7E]/gmi, " ").split("Delivered on :").length>0)
{
var productprice=parseFloat(l(".detailorder-listing").eq(i).find("li").eq(4).text().trim().split("Rs ")[1].trim().replace(/[^\x20-\x7E]/gmi, " ").replace(",",'').split("Delivered on:")[0]);
deliverydate=l(".detailorder-listing").eq(i).find("li").eq(4).text().trim().split("Rs ")[1].trim().replace(/[^\x20-\x7E]/gmi, " ").split("Delivered on:")[1];

}
else
{
var productprice=parseFloat(l(".detailorder-listing").eq(i).find("li").eq(4).text().trim().split("Rs ")[1].trim().replace(/[^\x20-\x7E]/gmi, " ").replace(",",''));
 
}
//For more than one order id
var orderid=window.location.href.split("summary/")[1];

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
//console.log(product);
}

products=JSON.stringify(products);

products=encodeURIComponent(products);




var amount=parseFloat(parseInt(l("#total .col2").eq(0).text().split("Rs. ")[1]));

//General for all
var username= l(".name").text();
//console.log(username);
var mobile= l(".address").eq(1).html().split("</h2>")[1].split("<br>")[4].trim().split('Mobile : ')[1].trim();

var fullname= l(".address:contains('Mobile')").html().split("</h2>")[0].split("<h2>")[1].trim();
var address1= l(".address:contains('Mobile')").html().split("</h2>")[1].split("<br>")[0];
var address2= l(".address:contains('Mobile')").html().split("</h2>")[1].split("<br>")[1];
var address= address1 +","+address2;
var landmark= '';
var city= l(".address:contains('Mobile')").html().split("</h2>")[1].split("<br>")[2].split("-")[0];
var state= l(".address:contains('Mobile')").html().split("</h2>")[1].split("<br>")[3];
var mobilenumber=l(".address:contains('Mobile')").html().split("</h2>")[1].split("<br>")[4].trim().split('Mobile : ')[1].trim();
var pincode=l(".address:contains('Mobile')").html().split("</h2>")[1].split("<br>")[2].split("-")[1];


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
var email='';
var bankname="";
var modeofpayment="bank";
var website=1331;


//aff
var tags=["utm_source","utm_term","utm_campaign"];;
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
else
{
//	console.log("here");
	setTimeout(function(){main123();},3000);
}


}



}

main123();