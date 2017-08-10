var url =window.location.href;

var urlcheck= "flipkart.com/orderresponse";

if(url.split(urlcheck).length>1)
{

var x=0;

var timer=setInterval(function()
{

if($("[class*=_3pxK8E]:eq(0)").length>0&&$("[class*=_3pxK8E]:eq(0)").attr('href').length>0&&$("[class*=_3pxK8E]:eq(0)").text().length>0)
{

	
	clearInterval(timer);
	flipcheck();


}

},10000);






function flipcheck()
{

var orderid=$("span:contains('Order ID')").eq(2).parent().parent().next().text().split("(")[0];




//For more than one products
var noofproducts= $("[class*=_1d7tj_]").length;
//console.log(noofproducts);
var products=[];

for (var i=0;i<noofproducts;i++)

{

var productname=$("[class*=_3pxK8E]").eq(i).text().trim();
var productcode=$("[class*=_3pxK8E]").eq(i).attr("href").split("pid=")[1].trim();
var productsize;
var deliverydate=$("[class*=_21i-38]").eq(i).text().split("Delivery expected ")[1]
var quantity='1';
var sellername=$("[class*=_3OtLFa]").eq(i).text();
var productprice=parseFloat($("[class*=_2-hYRf]").eq(i).clone().children().remove().end().text().split("₹")[1].replace(",",""));


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
//console.log(product);

products.push(product);				

}

products=JSON.stringify(products);

products=encodeURIComponent(products);



//Total amount (More than on order)
try
{
var amount=$("[class*=_1TDa2]").text().replace("₹","").replace(",",'');

//General for all
var username=$("[class*=_2uCUBV]").eq(0).text().trim();
var mobile=$("[class*=_3xR2v]").text().trim();

var fullname= $("[class*=_2uCUBV]").eq(0).text().trim();
var address1= $("[class*=_11Ke5x]").text().split(",")[0]+','+$("[class*=_11Ke5x]").text().split(",")[1];
var address2= $("[class*=_11Ke5x]").text().split(",")[2];
var address=$("[class*=_11Ke5x]").text().trim();
var landmark= '';
var city=$("[class*=_11Ke5x]").text().split(",")[$("[class*=_11Ke5x]").text().split(",").length-2].split("-")[0].trim();
var state=$("[class*=_11Ke5x]").text().split(",")[$("[class*=_11Ke5x]").text().split(",").length-1].trim();
var mobilenumber=mobile;
var pincode=parseInt($("[class*=_11Ke5x]").html().split("-")[$("[class*=_11Ke5x]").html().split("-").length-1].split(",")[0].trim());


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

}
catch(error)
{

var addressobject=
{
	
	"fullname":"err",
	"address1":"err",
	"address2":"err",
	"address":"err",
	"landmark":"err",
	"city":"err",
	"state":"err",
	"mobilenumber":"err",
	"pincode":"err"

}

}


addressobject=JSON.stringify(addressobject);
addressobject=encodeURIComponent(addressobject);
//aff
var tags=["affid","affExtParam2","affExtParam1"];
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

var clienttime=Date.now();
var date=Date.now();
var email=$("#login_email_id").val();
var bankname="";
var modeofpayment=$(".order-status").text().split("through")[$(".order-status").text().split("through").length-1].replace(/[^\x20-\x7E]/gmi, " ");
var website=2;
var jsonArr = [{'modeofpayment':modeofpayment,'orderid':orderid,'bankname':bankname,'email':email,'date':date,'amount':amount,'username':username,'mobile':mobile,'address':addressobject,'products':products,'website':website,'aff':affobject,'param1':affparam1,'param2':affparam2}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,25,doNothing, []);
    //console.log("type");



}

}