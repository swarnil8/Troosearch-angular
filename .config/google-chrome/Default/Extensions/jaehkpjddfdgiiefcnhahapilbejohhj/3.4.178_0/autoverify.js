
var ext_id1="";
var ext_auth1="";
var url=window.location.href;

if(url.split("buyhatke.com/autocoupon-contes").length>1)
{


 var jsonArr = [{'website':'autocoupon'}];
     jsonArr = JSON.stringify(jsonArr);
     sendMessage(1, jsonArr,1240,autocouponcontest, []);
     var s3 = document.createElement('script');
s3.src = chrome.extension.getURL('auto_contest3.js');
(document.head || document.documentElement).appendChild(s3);
    

amain123();

function amain123()

{
//console.log("here");

var tout=setTimeout(function(){

	ext_id1=ext_id;ext_auth1=ext_auth;

if(ext_id1===undefined||ext_id1===""||ext_id==="Unspecified")
{
	amain123();
	//console.log("here1");
}
else
{
	
 clearTimeout(tout);
	main23();
	
}


},2000);

}



function main23()
{

var ext_idz =document.createElement("div");
ext_idz.id="bhtk-extz";

ext_idz.innerText= ext_id1+"~"+ext_auth1;
(document.head || document.documentElement).appendChild(ext_idz);


}




autocouponcontest();
 }


function autocouponcontest(data,passBack)


{
//console.log(data);

if(data==1)

{

var s = document.createElement('script');
s.src = chrome.extension.getURL('auto_contest.js');
(document.head || document.documentElement).appendChild(s);
setCookie("thank",1);

}
else
if(data!=undefined)
{

if(data.trim().split("~").length>1)
{

var s2 = document.createElement('script');
s2.src = chrome.extension.getURL('auto_contest1.js');
(document.head || document.documentElement).appendChild(s2);

$(".js-winnerName").text(data.trim().split("~")[0]);
$(".js-winnerPhone").text(data.trim().split("~")[1]);
$(".js-winnerEmail").text(data.trim().split("~")[2]);

setCookie("thank",1);;

}
}


}








