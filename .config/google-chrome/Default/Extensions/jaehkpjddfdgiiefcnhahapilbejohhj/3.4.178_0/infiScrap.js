function getCategory(){
	var categories = getBreadCrumb();
	var index = 1;
	var category = "";
	if(categories != "" && categories != undefined){
   categories = categories.split("*~");
   category = categories[index];
 }
 return category;
}


function getDetails(url){
	finalJSON = {};
      // var specialPat = /[^a-z0-9]+$/gi;
      var prodName = getProd();
      if(prodName ==""){
      	setTimeout(getDetails, 100);
      	return;
      }
      else {

      	var filters = getSpecs();
      	var prodName = getProd();
      	lastProd = prodName;
      	var myPrice = getPrice();

      	finalJSON["category"] = 0;
      	finalJSON["filters"] = filters;
      	finalJSON["filteredName"]  = prodName;
      	finalJSON["prodName"] = prodName;
      	finalJSON["price"] = myPrice;


      	var finalJSONTemp = JSON.stringify(finalJSON);
      	msgToSend = finalJSONTemp;
      	sendSearchMessageNew(msgToSend, 1, url);

      }
    }


    function getSpecs()
    {

    	var ourAtts = [];
    	ourAtts["model no"] = "model";
    	ourAtts["part number"] = "serialno";
    	ourAtts["processor name"] = "processor";
    	ourAtts["system memory"] = "ram";
    	ourAtts["operating system"] = "os";
    	ourAtts["hdd disk capacity"] = "hdd";
    	ourAtts["ssd"] = "hdd";
    	ourAtts["series"] = "lapseries";
    	ourAtts["model name"] = "modelname";
    	ourAtts["brand"] = "brand";

    	var attributeVal ={};
    	var attributes = [];
    	var attrVal = "";
    	for(var attribute in ourAtts)
    	{
    		if(!attributeVal[attribute])
    		{
    			attrVal = pickValue(attribute);
    			if(attrVal!="")
    			{

    				var key  = ourAtts[attribute];
    				attributeVal[key] = attrVal;

    			}
    		}
    	}

    	attributeVal["pid"] = getPID();
    	attributeVal = JSON.stringify(attributeVal);
    	return attributeVal;
    }

    function pickValue(attrName)
    {
    	var myVar = document.querySelectorAll('#specification table');
    	var noTables = myVar.length;
    	for(var i=0;i<noTables;i++)
    	{
       var allRows = myVar[i].querySelectorAll('tr');
       for(var j=0;j<allRows.length;j++)
       {
         var key =allRows[j].querySelectorAll('td')[0].textContent;


         if(key.toLowerCase().indexOf(attrName) >= 0)
         {
           var value =allRows[j].querySelectorAll('td')[1].textContent;
           value = " "+value+" ";
           value = value.replace(/wi-fi/ig," ");
           value = value.replace(/wifi/ig," ");
           value = value.replace(/ wi fi /ig," ");
	                 // value = value.replace(/[^0-9A-Z]3g[^0-9A-Z]/ig," ");
	                 value = value.replace(/([^0-9A-Z])3g([^0-9A-Z])/ig,"$1 $2");
	                 // value = value.replace(/ 4g /ig," ");
	                 value = value.replace(/([^0-9A-Z])4g([^0-9A-Z])/ig,"$1 $2");
	                 // value = value.replace(spclSymbols," ");
	                 value = value.replace(/\s\s+/g,' ');
	                 value = value.replace(/[^0-9A-Z\-\/\s]/gi,' ');
	                 value = value.trim();

	                 if(key.toLowerCase().indexOf("hdd disk capacity") >= 0 || key.toLowerCase().indexOf("ssd") >= 0)
	                 {
	                 	value = value.replace(/(.)*([0-9]+)[^0-9A-Za-z]*GB(.)*/ig,' $2GB ');
	                 	value = value.replace(/(.)*([0-9]+)[^0-9A-Za-z]*TB(.)*/ig,' $2TB ');

	                 }
	                 return value;
	               }
	             }

	           }
	           return "";
	         }



	         function sendPairs(){
	         	arrayToSend = [];
	         	if($('#results-wrapper .search-icon').length > 0){
             var slider = $('#results-wrapper .search-icon');
             var sliderLength = slider.length;
             var link;
             var price;
             var PID;

             for(i=0;i<sliderLength;i++){
               price = "";
               PID = "";
               link1 = "";
               if($('#results-wrapper .search-icon:eq('+ i +') a').length > 0){
                 link = $('#results-wrapper .search-icon:eq('+ i +') a:eq(0)').attr("href");
                 if(link.split("infibeam.").length < 2){
                   link = "http://www.infibeam.com/"+link;
                 }
                 if(link.split("variantId=").length < 2){
                   PID = "";
                 }
                 else{
                   PID = returnPIDNew(link);
                 }
               }

               if(PID != ""){
                 if($('#results-wrapper .search-icon:eq('+ i +')').find('.price .final-price').length > 0){
                   price = $('#results-wrapper .search-icon:eq('+ i +')').find('.price .final-price:eq(0)').text();
                   if(price.toUpperCase() == 'COMING SOON'){
                     price = "";
                   }
                   if(price.split("Rs.").length > 1){
                     price = price.split("Rs.");
                     price =price[1];
                   }
                   price =price.split(",").join("").trim();
                 }
               }
               else{
                 price = "";
               }
               price = filter_price(price);

               if(PID != "" && price != "" && !isNaN(price)){
                 arrayToSend.push([PID, price]);
               }
    } // for ends1

  }

  if($('.productlist_index').length > 0){
  	var slider = $('.productlist_index');
  	var sliderLength = slider.length;
  	var link;
  	var price;
  	var PID;

  	for(i=0;i<sliderLength;i++){
     price = "";
     PID = "";
     link1 = "";
     if($('.productlist_index:eq('+ i +') a').length > 0){
       link = $('.productlist_index:eq('+ i +') a:eq(0)').attr("href");
       if(link.split("infibeam.").length < 2){
         link = "http://www.infibeam.com/"+link;
       }
       if(link.split("variantId=").length < 2){
         PID = "";
       }
       else{
         PID = returnPIDNew(link);
       }

     }

     if(PID != ""){
       if($('.productlist_index:eq('+ i +') a').find('.final-price').length > 0){
         price = $('.productlist_index:eq('+ i +') a').find('.final-price').text();
         if(price.toUpperCase() == 'COMING SOON'){
           price = "";
         }
         if(price.split("Rs.").length > 1){
           price = price.split("Rs.");
           price =price[1];
         }
         price =price.split(",").join("").trim();
       }
     }
     else{
       price = "";
     }
     price = filter_price(price);

     if(PID != "" && price != "" && !isNaN(price)){
       arrayToSend.push([PID, price]);
     }
    } // for ends1

  }


  if($('.similar-items .item').length > 0){
  	var slider = $('.similar-items .item');
  	var sliderLength = slider.length;
  	var link;
  	var price;
  	var PID;

  	for(i=0;i<sliderLength;i++){
     price = "";
     PID = "";
     link1 = "";
     if($('.similar-items .item:eq('+ i +') a').length > 0){
       link = $('.similar-items .item:eq('+ i +') a:eq(0)').attr("href");
       if(link.split("infibeam.").length < 2){
         link = "http://www.infibeam.com/"+link;
       }
       if(link.split("variantId=").length < 2){
         PID = "";
       }
       else{
         PID = returnPIDNew(link);
       }

     }

     if(PID != ""){
       if($('.similar-items .item:eq('+ i +') a').find('.price .price').length > 0){
         price = $('.similar-items .item:eq('+ i +') a').find('.price .price:eq(0)').text();
         if(price.split("Rs.").length > 1){
           price = price.split("Rs.");
           price =price[1];
         }
         price =price.split(",").join("").trim();
       }
     }
     else{
       price = "";
     }
     price = filter_price(price);

     if(PID != "" && price != "" && !isNaN(price)){
       arrayToSend.push([PID, price]);
     }
    } // for ends1

  }

  if($('#similar-items-carousel .item').length > 0){
  	var slider = $('#similar-items-carousel .item');
  	var sliderLength = slider.length;
  	var link;
  	var price;
  	var PID;

  	for(i=0;i<sliderLength;i++){
     price = "";
     PID = "";
     link1 = "";
     if($('#similar-items-carousel .item:eq('+ i +') a').length > 0){
       link = $('#similar-items-carousel .item:eq('+ i +') a:eq(0)').attr("href");
       if(link.split("infibeam.").length < 2){
         link = "http://www.infibeam.com/"+link;
       }
       if(link.split("variantId=").length < 2){
         PID = "";
       }
       else{
         PID = returnPIDNew(link);
       }

     }

     if(PID != ""){
       if($('#similar-items-carousel .item:eq('+ i +') a').find('.price .price').length > 0){
         price = $('#similar-items-carousel .item:eq('+ i +') a').find('.price .price:eq(0)').text();
         if(price.split("Rs.").length > 1){
           price = price.split("Rs.");
           price =price[1];
         }
         price =price.split(",").join("").trim();
       }
     }
     else{
       price = "";
     }
     price = filter_price(price);
     if(PID != "" && price != "" && !isNaN(price)){
       arrayToSend.push([PID, price]);
     }
    } // for ends1
  }


  if($('.dodright li').length > 0){
  	var slider = $('.dodright li');
  	var sliderLength = slider.length;
  	var link;
  	var price;
  	var PID;

  	for(i=0;i<sliderLength;i++){
     price = "";
     PID = "";
     link1 = "";
     if($('.dodright li:eq('+ i +') a').length > 0){
       link = $('.dodright li:eq('+ i +') a:eq(0)').attr("href");
       if(link.split("infibeam.").length < 2){
         link = "http://www.infibeam.com/"+link;
       }
       if(link.split("variantId=").length < 2){
         PID = "";
       }
       else{
         PID = returnPIDNew(link);
       }

     }

     if(PID != ""){
       if($('.dodright li:eq('+ i +') a').find('.normal').length > 0){
         price = $('.dodright li:eq('+ i +') a').find('.normal').text();
         if(price.split("Rs.").length > 1){
           price = price.split("Rs.");
           price =price[1];
         }
         price =price.split(",").join("").trim();
       }
     }
     else{
       price = "";
     }
     price = filter_price(price);

     if(PID != "" && price != "" && !isNaN(price)){
       arrayToSend.push([PID, price]);
     }
   }
 }
 if($('.srch_result li').length > 0){
   var slider = $('.srch_result li');
   var sliderLength = slider.length;
   var link;
   var price;
   var PID;

   for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    link1 = "";
    if($('.srch_result li:eq('+ i +') a').length > 0){
     link = $('.srch_result li:eq('+ i +') a:eq(0)').attr("href");
     if(link.split("infibeam.").length < 2){
       link = "http://www.infibeam.com/"+link;
     }
     if(link.split("variantId=").length < 2){
       PID = "";
     }
     else{
       PID = returnPIDNew(link);
     }

   }

   if(PID != ""){
     if($('.srch_result li:eq('+ i +')').find('.normal').length > 0){
       price = $('.srch_result li:eq('+ i +')').find('.normal').text();
       if(price.split("Rs.").length > 1){
         price = price.split("Rs.");
         price =price[1];
       }
       price =price.split(",").join("").trim();
     }
     else if($('.srch_result li:eq('+ i +')').find('.price span').length > 0){
       price = $('.srch_result li:eq('+ i +')').find('.price span:eq(0)').text();
       if(price.split("Rs.").length > 1){
         price = price.split("Rs.");
         price =price[1];
       }
       price =price.split(",").join("").trim();
     }
   }
   else{
     price = "";
   }
   price = filter_price(price);

   if(PID != "" && price != "" && !isNaN(price)){
     arrayToSend.push([PID, price]);
   }
    } // for ends1

  }

  if($('#magicbox .product-section').length > 0){
  	var slider = $('#magicbox .product-section');
  	var sliderLength = slider.length;
  	var link;
  	var price;
  	var PID;

  	for(i=0;i<sliderLength;i++){
  		price = "";
  		PID = "";
  		link1 = "";
  		if($('#magicbox .product-section:eq('+ i +') a').length > 0){
  			link = $('#magicbox .product-section:eq('+ i +') a:eq(0)').attr("href");
  			if(link.split("infibeam.").length < 2){
  				link = "http://www.infibeam.com/"+link;
  			}
  			if(link.split("variantId=").length < 2){
  				PID = "";
  			}
  			else{
  				PID = returnPIDNew(link);
  			}

  		}

  		if(PID != ""){
  			if($('#magicbox .product-section:eq('+ i +')').find('#price-after-discount .price').length > 0){
  				price = $('#magicbox .product-section:eq('+ i +')').find('#price-after-discount .price').text();
  				if(price.split("R").length > 1){
  					price = price.split("R");
  					price =price[1];
  				}
  				price =price.split(",").join("").trim();
  			}
  		}
  		else{
  			price = "";
  		}
  		price = filter_price(price);

  		if(PID != "" && price != "" && !isNaN(price)){
  			arrayToSend.push([PID, price]);
  		}
    } // for ends1

  }

if($('#irec').contents().find('.footer-item').length > 0){
 var slider = $('#irec').contents().find('.footer-item');
 var sliderLength = slider.length;
 var link;
 var price;
 var PID;

 for(i=0;i<sliderLength;i++){
  price = "";
  PID = "";
  link1 = "";
  if($('#irec').contents().find('.footer-item:eq('+ i +') a').length > 0){
   link = $('#irec').contents().find('.footer-item:eq('+ i +') a:eq(0)').attr("href");
   if(link.split("infibeam.").length < 2){
    link = "http://www.infibeam.com/"+link;
  }
  if(link.split("variantId=").length < 2){
    PID = "";
  }
  else{
    PID = returnPIDNew(link);
  }

}

if(PID != ""){
 if($('#irec').contents().find('.footer-item:eq('+ i +')').find('.meta .price').length > 0){
  price = $('#irec').contents().find('.footer-item:eq('+ i +')').find('.meta .price:eq(0)').text();
  if(price.split("Rs.").length > 1){
   price = price.split("Rs.");
   price =price[1];
 }
 price =price.split(",").join("").trim();
}
}
else{
 price = "";
}
price = filter_price(price);

if(PID != "" && price != "" && !isNaN(price)){
 arrayToSend.push([PID, price]);
}
    } // for ends1

  }

  if($('.productlist_index').length > 0){
  	var slider = $('.productlist_index');
  	var sliderLength = slider.length;
  	var link;
  	var price;
  	var PID;

  	for(i=0;i<sliderLength;i++){
     price = "";
     PID = "";
     link1 = "";
     if($('.productlist_index:eq('+ i +') a').length > 0){
       link = $('.productlist_index:eq('+ i +') a:eq(0)').attr("href");
       if(link.split("infibeam.").length < 2){
        link = "http://www.infibeam.com/"+link;
      }
      if(link.split("variantId=").length < 2){
        PID = "";
      }
      else{
        PID = returnPIDNew(link);
      }

    }

    if(PID != ""){
     if($('.productlist_index:eq('+ i +')').find('.price .final-price').length > 0){
      price = $('.productlist_index:eq('+ i +')').find('.price:eq(0) .final-price').text();
      if(price.split("Rs.").length > 1){
       price = price.split("Rs.");
       price =price[1];
     }
     price =price.split(",").join("").trim();
   }
 }
 else{
   price = "";
 }
 price = filter_price(price);

 if(PID != "" && price != "" && !isNaN(price)){
   arrayToSend.push([PID, price]);
 }
    } // for ends1

  }

  if(arrayToSend.length > 0){
  	arrayToSend = JSON.stringify(arrayToSend);
  	var jsonArr = [{'pairsInfi': arrayToSend}];
  	jsonArr = JSON.stringify(jsonArr);
  	sendMessage(0, jsonArr, 0, doNothing, []);
  }
}



function sendCurrent(){
	curData = [];
	var prod = "";
	var image = "";
	var myPrice = "";
	var cur_url = "";
	var current_status = 0;
	var avial = 1;
	var link = "";
	var PID = "";
	var brand = "";
	var name = "";
	var prod1 = "";

	prod = getProd();
	price = getPrice();
	image = getImage();
	cur_url = getInfiURL();
	avail = getAvailability();
	if(avail == 0){
   current_status = 1;
 }
 PID = getPID();

 var isbn = PID.split("~");
 isbn = isbn[0].trim();
 if(isValidISBN(isbn.toString()) && prod.trim() != ""){
  prod = prod + " " + convertISBN(PID.toString());
}
if(price != "" && price != 0 && !isNaN(price) && PID != ""){
  curData.push([prod, image, price, cur_url, current_status, PID, 2]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataInfi': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('#product-overview').length>0){
   sendMessage(0, jsonArr, 0, doNothing, []);
 }
}
else if($('#ib-page').length == 0){
  curData.push(["", "", 0, cur_url, 2, PID, 2]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataInfi': curData}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(0, jsonArr, 0, doNothing, []);
}
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);

var check_prod_pg = 1;
function getProd(){
	var prod = "";

	if($("h1").length >  0)
	{
   prod = $("h1:eq(0)").text().trim();
 }
 if($('#product-overview').length>0){
   return prod;
 }
 else {
   return "";
 }
}

function getImage(){
	var image = "";
	image = $('meta[property="og:image"]').attr('content');
	if(image == "" || image == undefined){
   if($('#imgMain').length>0){
     image = $('#imgMain').attr("src");
   }
   else if($('img[itemprop="image"]').length > 0)
   {
     image = $('img[itemprop="image"]').attr('content');
   }
   else if($('#product-images').length > 0)
   {
     image = $("#product-images a").attr("href");
   }
   else
   {
     image = "Noimage";
   }
 }

	// //console.log("image: "+image);
	return image;
}

function getPrice(){
	var price = "";
	var price1 = 0;
	var minPc = 100000000;

	if($(".price-and-promo").length > 0 && $(".price-and-promo .currentPrice").length > 0){
   price1 = $(".price-and-promo .currentPrice").length;
   for(var pc=0;pc<price1;pc++){
     price = $(".price-and-promo .currentPrice:eq("+pc+")").text().trim();
     price = filter_price(price);
     if(price < minPc){
      minPc = price;
    }
  }
  if(minPc > 0 && minPc != 100000000){
   price = minPc;
 }
}
if(price == "" || price == 0 || isNaN(price)){
  if($('.marketplaceStartPriceSpan').length > 0){
   if($('.marketplaceStartPriceSpan:eq(0)').text().trim() != "0"){
    price = $('.marketplaceStartPriceSpan:eq(0)').text().trim();
  }
}
else if($(".pricing").length >0 ){
 price = $(".pricing").find("#price-after-discount:eq(0)").text().trim();
}
else if($('#price-after-discount .price').length > 0){
 price = $('#price-after-discount .price:eq(0)').text().trim();
}
}
price = filter_price(price);
if(isNaN(price)){
	price = "";
}

return price;
}

function getAvailability(){
	var avail = 1;
	if(($('[itemprop="availability"]').length > 0) && ($('[itemprop="availability"]').attr('content').split("out_of_stock").length > 1)){
   avail = 0;
 }
 else if($('.soldout').length > 0){
   avail = 0;
 }

 if($('#product_overview').length > 0 && $('.status.comingsoon').length > 0 && $('.comingsoon').css("display") == "block"){
   avail = 0;
 }

 return avail;

}

function getInfiURL(){
	var link = window.location.href;
	var url = "";
	// link = decodeURIComponent(link);
	var cat_each = "";
	var cat_ids = "";
	var url_infi = link;
	var url_infi1 = "";
	if($('.cat-options').length > 0){
   cat_each = $('.cat-options');
   cat_no = "";
   for(i=0;i<cat_each.length;i++){
     if($('.cat-options:eq('+i+')').css("display") != "none" && $('.cat-options:eq('+i+') .selected').length > 0){
      cat_no += $('.cat-options:eq('+i+') .selected:eq(0)').attr("data-co-id") + ",";
    }
    else if($('.cat-options:eq('+i+')').css("display") == "none" && $('.cat-options:eq('+(i+1)+')').find('.selectboxit-text').length > 0){
      cat_super_class = $('.cat-options:eq('+(i+1)+')').find('.selectboxit-text:eq(0)').attr("data-val");
      cat_opts = $('.cat-options:eq('+i+')').find("option");
      for(p=0;p<cat_opts.length;p++){
       if($('.cat-options:eq('+i+')').find("option:eq("+p+")").attr("value") == cat_super_class){
        cat_no += $('.cat-options:eq('+i+')').find("option:eq("+p+")").attr("data-co-id") + ",";
        break;
      }
    }
  }
}
cat_no = cat_no.trim().substring(0, cat_no.length - 1);
data = $('body').html();
var res = data.split("var variant_sections = ");
res = res[1].trim();
res = res.split("}};");
res = res[0].trim()+"}}";
res = JSON.parse(res);

var res_arr = $.map(res, function(value, index) {
 return [value];
});

for(j=0;j<res_arr.length;j++){
 cat_ids = res_arr[j]['cat_opts'];
 if(cat_ids == cat_no){
  variants_id = res_arr[j]['id'];

  if(link.split(".html").length > 1){
   url_infi1 = link.split(".html");
   url_infi1 = url_infi1[0];
   url_infi = url_infi1+".html#variantId="+variants_id;
 }
 else{
   url_infi = link;
 }
 url = url_infi;
}
}
}
else {
	url = window.location.href;
}
if(url.split("&").length > 1){
	url = url.split("&")[0];
}
if(url.split("?").length > 1){
	url = url.split("?")[0];
}
if(url.split("#variantId=").length < 2){
 if(url.split("#").length > 1){
   url = url.split("#")[0];
 }
}
return url;
}

function getPIDOld3(){
	var url = $('meta[property="og:url"]').attr('content');
	var pid = "";
	var pid1 = "";
	var pid2 = "";

	if(url.split(".htm").length > 1){
   pid1 = url.split(".htm");
   pid1 = pid1[0];
   pid1 = pid1.split("/");
   pid1 = pid1[pid1.length-1];
   pid1 = pid1.trim();
 }
 if(url.split("variantId=").length > 1){

   pid2 = url.split("variantId=");
   pid2 = pid2[1];
   if(pid2.split("#").length > 1){
     pid2 = pid2.split("#");
     pid2 = pid2[0];
   }
   if(pid2.split("?").length > 1){
     pid2 = pid2.split("?");
     pid2 = pid2[0];
   }
   if(pid2.split("&").length > 1){
     pid2 = pid2.split("&");
     pid2 = pid2[0];
   }
   if(pid2.split("/").length > 1){
     pid2 = pid2.split("/");
     pid2 = pid2[0];
   }
   pid2 = pid2.trim();
 }
 if(pid2 == ""){
   var data = "";
   var body = document.getElementsByTagName("body")[0].innerHTML;
   if(body.split("var product = ").length > 1){
     data = body.split("var product = ");
     data = data[1];
     data = data.split("};");
     data = data[0];
     data = data.trim();
	// console.log("data: "+data);
	if(data.split("identifier: '").length > 1){
   pid2 = data.split("identifier: '");
   pid2 = pid2[1];
   pid2 = pid2.split("'");
   pid2 = pid2[0];
   pid2 = pid2.trim();
	// console.log("pid2: "+pid2);
}
}
}
if(pid2 == "undefined" || pid2 == undefined || pid2 == ""){
	pid2 = pid1;
}
if(pid1 != ""){
	pid = pid1 + "~" + pid2;
}
return pid;
}
function getPID(){
	var link = window.location.href;
	var url = "";
	// link = decodeURIComponent(link);
	var cat_each = "";
	var cat_ids = "";
	var url_infi = link;
	var url_infi1 = "";
	if($('.cat-options').length > 0){
   cat_each = $('.cat-options');
   cat_no = "";
   for(i=0;i<cat_each.length;i++){
     if($('.cat-options:eq('+i+')').css("display") != "none" && $('.cat-options:eq('+i+') .selected').length > 0){
       cat_no += $('.cat-options:eq('+i+') .selected:eq(0)').attr("data-co-id") + ",";
     }
     else if($('.cat-options:eq('+i+')').css("display") == "none" && $('.cat-options:eq('+(i+1)+')').find('.selectboxit-text').length > 0){
       cat_super_class = $('.cat-options:eq('+(i+1)+')').find('.selectboxit-text:eq(0)').attr("data-val");
       cat_opts = $('.cat-options:eq('+i+')').find("option");
       for(p=0;p<cat_opts.length;p++){
         if($('.cat-options:eq('+i+')').find("option:eq("+p+")").attr("value") == cat_super_class){
           cat_no += $('.cat-options:eq('+i+')').find("option:eq("+p+")").attr("data-co-id") + ",";
           break;
         }
       }
     }
   }
   cat_no = cat_no.trim().substring(0, cat_no.length - 1);
   data = $('body').html();
   var res = data.split("var variant_sections = ");
   res = res[1].trim();
   res = res.split("}};");
   res = res[0].trim()+"}}";
   res = JSON.parse(res);

   var res_arr = $.map(res, function(value, index) {
     return [value];
   });

   for(j=0;j<res_arr.length;j++){
     cat_ids = res_arr[j]['cat_opts'];
     if(cat_ids == cat_no){
       variants_id = res_arr[j]['id'];

       if(link.split(".html").length > 1){
         url_infi1 = link.split(".html");
         url_infi1 = url_infi1[0];
         url_infi = url_infi1+".html#variantId="+variants_id;
       }
       else{
         url_infi = link;
       }
       url = url_infi;
     }
   }
 }
 else {
   url = window.location.href;
 }
 if(url.split("&").length > 1){
   url = url.split("&")[0];
 }
 if(url.split("?").length > 1){
   url = url.split("?")[0];
 }
 if(url.split("#variantId=").length < 2){


   if(url.split("#").length > 1){
     url = url.split("#")[0];
   }
 }

	// console.log("url: "+url);
	var pid = "";
	var pid1 = "";
	var pid2 = "";
	if(url.split(".htm").length > 1){
   pid1 = url.split(".htm");
   pid1 = pid1[0].trim();
   if(pid1 && pid1.split("/").length > 1){
     pid1 = pid1.split("/");
     pid1 = pid1[pid1.length-1];
   }
   if(pid1 && pid1.split("&").length > 1){
     pid1 = pid1.split("&");
     pid1 = pid1[0];
   }
   if(pid1 && pid1.split("?").length > 1){
     pid1 = pid1.split("?");
     pid1 = pid1[0];
   }
   if(pid1 && pid1.split("#").length > 1){
     pid1 = pid1.split("#");
     pid1 = pid1[0];
   }
   pid1 = pid1.trim();
 }
 if(url.split("#variantId=").length > 1){
   pid2 = url.split("#variantId=");
   pid2 = pid2[1].trim();
   if(pid2 && pid2.split("/").length > 1){
     pid2 = pid2.split("/");
     pid2 = pid2[pid2.length-1];
   }
   if(pid2 && pid2.split("&").length > 1){
     pid2 = pid2.split("&");
     pid2 = pid2[0];
   }
   if(pid2 && pid2.split("?").length > 1){
     pid2 = pid2.split("?");
     pid2 = pid2[0];
   }
   if(pid2 && pid2.split("#").length > 1){
     pid2 = pid2.split("#");
     pid2 = pid2[0];
   }
   pid2 = pid2.trim();
 }
 if(pid2 == ""){
   pid2 = pid1;
 }
 if(pid1 != ""){
   pid = pid1 + "~" + pid2;
 }
 return pid;
}

function returnPIDNew(url){
	var pid = "";
	var pid1 = "";
	var pid2 = "";
	if(url.split(".htm").length > 1){
   pid1 = url.split(".htm");
   pid1 = pid1[0].trim();
   if(pid1 && pid1.split("/").length > 1){
     pid1 = pid1.split("/");
     pid1 = pid1[pid1.length-1];
   }
   if(pid1 && pid1.split("&").length > 1){
     pid1 = pid1.split("&");
     pid1 = pid1[0];
   }
   if(pid1 && pid1.split("?").length > 1){
     pid1 = pid1.split("?");
     pid1 = pid1[0];
   }
   if(pid1 && pid1.split("#").length > 1){
     pid1 = pid1.split("#");
     pid1 = pid1[0];
   }
   pid1 = pid1.trim();
 }
 if(url.split("#variantId=").length > 1){
  pid2 = url.split("#variantId=");
  pid2 = pid2[1].trim();
  if(pid2 && pid2.split("/").length > 1){
   pid2 = pid2.split("/");
   pid2 = pid2[pid2.length-1];
 }
 if(pid2 && pid2.split("&").length > 1){
   pid2 = pid2.split("&");
   pid2 = pid2[0];
 }
 if(pid2 && pid2.split("?").length > 1){
   pid2 = pid2.split("?");
   pid2 = pid2[0];
 }
 if(pid2 && pid2.split("#").length > 1){
   pid2 = pid2.split("#");
   pid2 = pid2[0];
 }
 pid2 = pid2.trim();

}

if(pid1 != "" && pid2 != ""){
	pid = pid1 + "~" + pid2;
}
return pid;
}

function getPIDOld(){

	var link = window.location.href;
	// var link1 = window.location.href;
	// var pid = decodeURIComponent(link);

	if(pid.split("&").length > 1){
   pid = pid.split("&")[0];
 }
 if(pid.split("?").length > 1){
   pid = pid.split("?")[0];
 }
 if(pid.split("#variantId=").length < 2){

  if(pid.split("#").length > 1){
   pid = pid.split("#")[0];
 }

}

return pid;
}

function returnPID(url){
	var pid = "";
	var pid1 = "";
	var pid2 = "";
	if(url.split(".htm").length > 1){
   pid1 = url.split(".htm");
   pid1 = pid1[0].trim();
   if(pid1 && pid1.split("/").length > 1){
     pid1 = pid1.split("/");
     pid1 = pid1[pid1.length-1];
   }
   if(pid1 && pid1.split("&").length > 1){
     pid1 = pid1.split("&");
     pid1 = pid1[0];
   }
   if(pid1 && pid1.split("?").length > 1){
     pid1 = pid1.split("?");
     pid1 = pid1[0];
   }
   if(pid1 && pid1.split("#").length > 1){
     pid1 = pid1.split("#");
     pid1 = pid1[0];
   }
   pid1 = pid1.trim();
 }
 if(url.split("#variantId=").length > 1){

  pid2 = url.split("#variantId=");
  pid2 = pid2[1].trim();
  if(pid2 && pid2.split("/").length > 1){
   pid2 = pid2.split("/");
   pid2 = pid2[pid2.length-1];
 }
 if(pid2 && pid2.split("&").length > 1){
   pid2 = pid2.split("&");
   pid2 = pid2[0];
 }
 if(pid2 && pid2.split("?").length > 1){
   pid2 = pid2.split("?");
   pid2 = pid2[0];
 }
 if(pid2 && pid2.split("#").length > 1){
   pid2 = pid2.split("#");
   pid2 = pid2[0];
 }
 pid2 = pid2.trim();
}

if(pid1 != "" && pid2 != ""){
	pid = pid1 + "~" + pid2;
}
return pid;
}

function getBreadCrumb(){
	var breadcrumb = "";
	var bread_final = "";
	var len_bread = $('.breadcrumb-sdp a').length;

	for(i=0;i<len_bread;i++){
   breadcrumb = $('.breadcrumb-sdp a:eq('+ i +')').text().trim();
   bread_final += breadcrumb + "*~";
 }

 return bread_final;


}

function findVariant(){
	$ = jQuery.noConflict();
	minCheck = 9999999999;
	var cur_link = window.location.href;
	var data = $("body").html();
	res = data.split("var variant_sections = ");
	res = res[1].trim();
	res = res.split("}};");
	res = res[0].trim()+"}}";
	res = JSON.parse(res);

	res_arr = $.map(res, function(value, index) {
   return [value];
 });
	// //find Preffered Variant Id
	// pid1 = data.split("var minPrice = ");
	// pid1 = pid1[1];
	// pid1 = pid1.split("</script>");
	// pid1 = pid1[0];

	// pid2 = pid1.split("val = ");
	// for(p=1;p<pid2.length;p++){
	// 	minP = pid2[p].split("}");
	// 	minP = minP[0].trim();
	// 	minPrc = minP.split("if");
	// 	minPrc = minPrc[0].trim();


	// 	if(minPrc < minCheck && minP.split('"true" == "true"').length > 1){
	// 	minCheck = minPrc;
	// 	minId = minP.split('preferredVariant = "');
	// 	minId = minId[1].trim();
	// 	minId = minId.split('"');
	// 	minId = minId[0].trim();
	// 	}

	// 	if(minCheck != 9999999999 && minCheck != "" && minCheck != 'undefined' && cur_link.split("variantId=").length < 2){
	// 	price_prefer = minCheck;
	// 	PID_prefer = minId;
	// 	}
	// }
	// if(cur_link.split("variantId=").length > 1){
	// 	PID_prefer = cur_link.split("variantId=");
	// 	PID_prefer = PID_prefer[1].trim();

	// 	if(PID_prefer.split("?").length > 1){
	// 	PID_prefer = PID_prefer.split("?");
	// 	PID_prefer = PID_prefer[0].trim();
	// 	}


	// 	if(PID_prefer.split("&").length > 1){
	// 	PID_prefer = PID_prefer.split("&");
	// 	PID_prefer = PID_prefer[0].trim();
	// 	}

	// 	if(PID_prefer.split("#").length > 1){
	// 	PID_prefer = PID_prefer.split("#");
	// 	PID_prefer = PID_prefer[0].trim();
	// 	}

	// 	if(PID_prefer.split("/").length > 1){
	// 	PID_prefer = PID_prefer.split("/");
	// 	PID_prefer = PID_prefer[0].trim();
	// 	}
	// }

	// console.log("preferredVariant = "+PID_prefer);
	// console.log("preferredCost = "+price_prefer);
	for(r=0;r<res_arr.length;r++){
   variants_id = res_arr[r]['id'];
	// console.log("id: "+variants_id);
	variants_price = res_arr[r]['html_sections']['pricing_summary'];
	if(variants_price.split('itemprop="price"').length > 1){
   price = variants_price.split('itemprop="price"');
   price = price[1].trim();
   price = price.split("/>");
   price = price[0].trim();
   price = price.split('content=');
   price = price[1].trim();
	// price = filter_price(price);
	// console.log("price: "+price);


}
variants_prod = res_arr[r]['html_sections']['title'];
if(variants_prod.split('itemprop="name"').length > 1){
	prod = variants_prod.split('itemprop="name"');
	prod = prod[1].trim();
	prod = prod.split("</");
	prod = prod[0].trim();
	prod = prod.split('>');
	prod = prod[prod.length - 1].trim();
	// console.log("prod: "+prod);
}

variants_oos = res_arr[r]['html_sections']['pricing_summary'];
if(variants_oos.split('itemprop="availability"').length > 1){
	oos = variants_oos.split('itemprop="availability"');
	oos = oos[1].trim();
	oos = oos.split("/>");
	oos = oos[0].trim();
	oos = oos.split('content="');
	oos = oos[1].trim();
	if(oos.split("in_stock").length > 1){
   oos = 0;
 }
 else{
   oos = 1;
 }
	// console.log("oos: "+oos);

}
if(PID_prefer == variants_id){
	price_prefer = price;
	prod_prefer = prod;
	oos_prefer = oos;

	// console.log("Preffered Prod: "+prod);
	// console.log("Preffered Id: "+PID_prefer);
	// console.log("Preffered Price: "+price);
}

}

}


function variantAlert(){
	var cat_each = "";
	var cat_ids = "";
	var price = "";
	var prod = "";
	var oos = 0;
	var cur_link = window.location.href;
	cur_link = decodeURIComponent(cur_link);
	img_infi = getImage();
	price_infi = getPrice();
	prod_infi = getProd();
	url_infi = cur_link;
	var url_infi1 = "";
	if($('.cat-options').length > 0){
		cat_each = $('.cat-options');
		cat_no = "";
		cat_no_text = "";
		cat_val = "";
		cat_no_text = "";
		for(i=0;i<cat_each.length;i++){
			if($('.cat-options:eq('+i+')').css("display") != "none" && $('.cat-options:eq('+i+') .selected').length > 0){
				cat_no += $('.cat-options:eq('+i+') .selected:eq(0)').attr("data-co-id") + ",";
			}
			else if($('.cat-options:eq('+i+')').css("display") == "none" && $('.cat-options:eq('+(i+1)+')').find('.selectboxit-text').length > 0){
				cat_super_class = $('.cat-options:eq('+(i+1)+')').find('.selectboxit-text:eq(0)').attr("data-val");
				cat_opts = $('.cat-options:eq('+i+')').find("option");
				for(p=0;p<cat_opts.length;p++){
					if($('.cat-options:eq('+i+')').find("option:eq("+p+")").attr("value") == cat_super_class){
						cat_no += $('.cat-options:eq('+i+')').find("option:eq("+p+")").attr("data-co-id") + ",";
						break;
					}
				}
			}
		}
		cat_no = cat_no.trim().substring(0, cat_no.length - 1);
		data = $('body').html();
		var res = data.split("var variant_sections = ");
		res = res[1].trim();
		res = res.split("}};");
		res = res[0].trim()+"}}";
		res = JSON.parse(res);

		var res_arr = $.map(res, function(value, index) {
			return [value];
		});

		for(j=0;j<res_arr.length;j++){
			cat_ids = res_arr[j]['cat_opts'];
			img_infi = getImage();
			// console.log("cat_ids: "+cat_ids);
			if(cat_ids == cat_no){
				variants_id = res_arr[j]['id'];
				// console.log("id: "+variants_id);
				variants_price = res_arr[j]['html_sections']['qty-range'];
				var price1 = "";
				if(variants_price.split('setQtyPromoDetails(').length > 1){
					price1 = variants_price.split('setQtyPromoDetails(');
					price1 = price1[1].trim();
					price1 = price1.split(");");
					price1 = price1[0].trim();
					price1 = price1.split('"quantity":1');
					var minPc = 10000000000;
					for(var pc=0;pc<price1.length-1;pc++){
						price = price1[pc].trim();
						price = price.split('"price":');
						price = price[price.length-1].trim();
						price = price.split(',');
						price = price[0].trim();
						price = filter_price(price);
						if(price < minPc){
							minPc = price;
							price_infi = minPc;
						}
					}
					// console.log("price: "+price_infi);
				}
				variants_prod = res_arr[j]['html_sections']['title'];
				if(variants_prod.split('itemprop="name"').length > 1){
					prod = variants_prod.split('itemprop="name"');
					prod = prod[1].trim();
					prod = prod.split("</");
					prod = prod[0].trim();
					prod = prod.split('>');
					prod_infi = prod[prod.length - 1].trim();
					// console.log("prod: "+prod_infi);
				}

				variants_oos = res_arr[j]['html_sections']['product_overview'];
				if(variants_oos.toLowerCase().split('out of stock').length > 1){
					oos = 1;
				}
				else if(variants_oos.toLowerCase().split('in stock').length > 1){
					oos = 0;
				}

				if(cur_link.split(".html").length > 1){
					url_infi1 = cur_link.split(".html");
					url_infi1 = url_infi1[0];
					url_infi = url_infi1+".html#variantId="+variants_id;
				}
				else{
					url_infi = cur_link;
				}
			}
		}
	}
	// console.log("Price: "+price_infi);
	// console.log("prod: "+prod_infi);
	// console.log("image: "+img_infi);
	// console.log("url: "+url_infi);
}

function sendCoupon(){
	$ = jQuery.noConflict();
	couponToSend = [];
	var cur_link = window.location.href;
	var couponUrl = "";
	var couponCode = "";
	var couponText = "";
	var couponDesc = "";
	var couponExp = 0;
	var couponAt = 99;
	var slider = "";
	var sliderLength = 0;

	if($('#promo_message li').length > 0){
		slider = $('#promo_message li');
		sliderLength = slider.length;
		couponUrl = "";
		couponCode = "";
		couponText = "";
		couponDesc = "";
		couponExp = 0;
		couponAt = 99;

		for(i=0;i<sliderLength;i++){
			couponUrl = "http://www.infibeam.com/";
			couponCode = "";
			couponText = "";
			couponDesc = "";


			if($('#promo_message li:eq('+ i +')').length > 0){
				couponText = $('#promo_message li:eq('+ i +')').find("span:eq(0)").text().trim();
				if(couponText.split("Use code").length > 1){
					couponCode = couponText.split("Use code")[1].trim();
					couponCode = couponCode.split(" ")[0].trim();
					if(couponCode != couponCode.toUpperCase()){
						couponCode = "";
					}
				}
				else if(couponText.split("Use coupon code").length > 1){
					couponCode = couponText.split("Use coupon code")[1].trim();
					couponCode = couponCode.split(" ")[0].trim();
					if(couponCode != couponCode.toUpperCase()){
						couponCode = "";
					}
				}
				else if(couponText.split("code").length > 1){
					couponCode = couponText.split("code")[1].trim();
					couponCode = couponCode.split(" ")[0].trim();
					if(couponCode != couponCode.toUpperCase()){
						couponCode = "";
					}
				}
				else{
					couponCode = "";
				}

				if(couponText.split("*T&C").length > 1){
					couponText = couponText.split("*T&C");
					couponText = couponText[0].trim();
				}
				if($('#promo_message li:eq('+ i +')').find(".promo-tnc:eq(0)").length > 0 && $('#promo_message li:eq('+ i +')').find(".promo-tnc:eq(0)").attr('oldtitle')){
					couponDesc = $('#promo_message li:eq('+ i +')').find(".promo-tnc:eq(0)").attr('oldtitle').trim();

					couponDesc = couponDesc.split("</a>").join(". ").trim();
					couponDesc = couponDesc.split("<br>").join(" ").trim();
					couponDesc = couponDesc.split("<br/>").join(" ").trim();
				}

			}

			// if($('#promo_message li:eq('+ i +')').find("a").length > 0){
			// 	couponExp = $('#promo_message li:eq('+ i +')').find("a:eq(0)").attr('oldtitle').trim();
			// 	if(couponExp.split("valid upto").length > 1){
			// 		couponExp = couponExp.split("valid upto")[1].trim();
			// 		couponExp = couponExp.split("<")[0].trim();
			// 	}
			// 	else{
			// 		couponExp = 0;
			// 	}
			// }

			if(couponCode != couponCode.toUpperCase()){
				couponCode = "";
			}

			if(couponCode != ""){
				couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
			}



		}

	}

	if($('.header-top .mkt-offer').length > 0){
   slider = $('.header-top .mkt-offer');
   sliderLength = slider.length;
   couponUrl = "";
   couponCode = "";
   couponText = "";
   couponDesc = "";
   couponExp = 0;
   couponAt = 99;

   for(i=0;i<sliderLength;i++){
     couponUrl = "http://www.infibeam.com/";
     couponCode = "";
     couponText = "";
     couponDesc = "";


     if($('.header-top .mkt-offer:eq('+ i +')').length > 0){
       couponText = $('.header-top .mkt-offer:eq('+ i +')').text().trim();
       couponUrl = $('.header-top .mkt-offer:eq('+ i +')').attr('href').trim();
       couponUrl = "http://www.infibeam.com" + couponUrl;

       if(couponText.split("$(").length > 1){
         couponText = couponText.split("$(");
         couponText = couponText[0].trim();
       }
     }

     if($('.header-top .mkt-offer:eq('+ i +') .coupon').length > 0){
       couponCode = $('.header-top .mkt-offer:eq('+ i +') .coupon:eq(0)').text().trim();
       if(couponCode != couponCode.toUpperCase()){
         couponCode = $('.header-top .mkt-offer:eq('+ i +') .coupon:eq(1)').text().trim();
       }
     }
     else{
       couponCode = "";
     }

     if(couponCode != couponCode.toUpperCase()){
       couponCode = "";
     }

     if(couponCode != ""){
       couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
     }

   }

 }

 if(couponToSend.length > 0){

  couponToSend = JSON.stringify(couponToSend);
  var jsonArr = [{'couponsExt': couponToSend}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 15, doNothing, []);
}
}
sendCoupon();

var cur_url = window.location.href;
if(cur_url.split(".infibeam.com/ShowCart").length > 1){
	var checkPick = "#coupons-applied";
	var selector = "#coupons-applied .flex-cont:eq(0)";
	var attr = "";
	var webID = 99;
	var homeLink = "https://www.infibeam.com/";
	pickAppliedCpn(checkPick, selector, attr, webID, homeLink);
}

