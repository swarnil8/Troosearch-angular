var url =window.location.href;

var urlcheck= "zivame.com/order/success";

if(url.split(urlcheck).length>1)
{

var productsdetails=JSON.parse($(".order-success-container").attr("data-productdetail"));
var nooforder=1;
var orderid=$(".details:contains('ORDER')").text().split("# ")[1];

//For more than one products
var noofproducts= productsdetails.length;
var products=[];
var k=0;
for (var i=0;i<noofproducts;i++)

{

var productname=productsdetails[i].name;
var productcode=productsdetails[i].id;
var productsize=productsdetails[i].variant;
var deliverydate='';
var quantity=parseFloat(productsdetails[i].quantity);
var sellername="none";
var productprice=parseFloat(productsdetails[i].price);

//For more than one order id
var orderid=$(".details:contains('ORDER')").text().split("# ")[1];

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

var amount=parseFloat($(".order-success-container").attr("data-netpayable"));


//General for all
var username=$(".accountUserName").text();
var mobile=$(".ocn-cutomer-mobile").text().trim().split("91 ")[1];

var fullname= $(".order_success_shipto_address").eq(0).text();
var address1= $(".order_success_shipto_address").eq(1).text();
var address2= "";
var address= $(".order_success_shipto_address").eq(1).text();
var landmark= '';
var city=$(".city").text();
var state='';
var mobilenumber='';
var pincode=parseInt($(".pincode").text());


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
var email=$(".order-success-container").attr("data-email");
var bankname="notknown";
var modeofpayment=$(".order-success-container").attr("data-ptype").trim().replace(/[^\x20-\x7E]/gmi, " ");
var website=429;

//aff
var tags=["utm_source","utm_campaign","utm_medium"];
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