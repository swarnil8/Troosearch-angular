var tags=[];

tags["flipkart"]=["affid","affExtParam2","affExtParam1"];
tags["amazon"]=["tag","ascsubtag"];
tags["jabong"]=["utm_source","utm_campaign","utm_medium","utm_content"];
tags["snapdeal"]=["aff_id","source","aff_sub","aff_sub2"];
tags["shopclues"]=["utm_source","s1","s2","s3","s4","s5"];
tags["myntra"]=["utm_source","utm_campaign","utm_medium"];
tags["zivame"]=["utm_source","utm_campaign","utm_medium"];
tags["paytm"]=["utm_source","utm_term","utm_campaign"];
tags["ebay"]=["source","aff_sub","aff_source","offer_id","aff_sub2"];
tags["koovs"]=["utm_source","utm_campaign","utm_medium","admitad_uid"];

var url= window.location.href;

if(url.split(".in").length>1)
{
var sitename = url.split(".in")[0].replace("http://","").replace("www.","").replace("https://","");
}
else
if(url.split(".com").length>1)
{
var sitename = url.split(".com")[0].replace("http://","").replace("www.","").replace("https://","");
}

//console.log(sitename);

if(tags[sitename]!=undefined)

{
	for(var i=0;i<tags[sitename].length;i++)
	{
		//console.log(tags[sitename][i]);
		if(url.split(tags[sitename][i]).length>1)
		{
			
			var affvalue=url.split(tags[sitename][i]+"=")[1].split("&")[0];
			
			if(localStorage[tags[sitename][i]]==undefined||localStorage[tags[sitename][i]]!=affvalue)
			{
				//console.log("here");
           	localStorage[tags[sitename][i]]=affvalue;
          //  console.log(affvalue);
         if(sitename=="amazon"||sitename=="myntra"||sitename=="jabong"||sitename=="shopclues"||sitename=="koovs")
         {
      setCookie1(tags[sitename][i],affvalue);
          }  
            if(localStorage[tags[sitename][i]+"path"]==""||localStorage[tags[sitename][i]+"path"]==undefined)
            {
               localStorage[tags[sitename][i]+"path"]=affvalue;
               if(sitename=="amazon"||sitename=="myntra"||sitename=="jabong"||sitename=="shopclues"||sitename=="koovs")
               {
               setCookie1(tags[sitename][i]+"path",affvalue);
               }         
            }
            else
            {
            //  console.log("path getting added");
              //console.log(i);
               localStorage[tags[sitename][i]+"path"]=localStorage[tags[sitename][i]+"path"]+"*"+affvalue;
               if(sitename=="amazon"||sitename=="myntra"||sitename=="jabong"||sitename=="shopclues"||sitename=="koovs")
               {
               setCookie1(tags[sitename][i]+"path",localStorage[tags[sitename][i]+"path"]+"*"+affvalue);
               }             
            }

            } 
    }
  }
}



 if(sitename=="amazon"||sitename=="myntra"||sitename=="shopclues"||sitename=="jabong"||sitename=="koovs")

 {
//console.log("here");
for(var i=0;i<tags[sitename].length;i++)
  {
//console.log("here1");
        if(getCookie(tags[sitename][i])=="")
        {
          //console.log("bhuwan");
          localStorage[tags[sitename][i]]="";
        }

        if(getCookie(tags[sitename][i]+"path")=="")
        {
          //console.log("bhuwan");
          localStorage[tags[sitename][i]+"path"]="";
        }

    }


 }


function setCookie1(cname, cvalue, exdays) {
  var d = new Date();
  var dom=window
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/;domain="+"."+window.location.host.split(".")[1]+"."+window.location.host.split(".")[2];
}