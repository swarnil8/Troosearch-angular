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
	var arrayToSend = [];
	if($('.productGrid .gBox').length > 0){
		var slider = $('.productGrid .gBox');
		var sliderLength = slider.length;
		var link;
		var price;
		var PID;
		var prod = "";
		var image = "";
		var oos = 0;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			prod = "";
			image = "";
			oos = 0;
			if($('.productGrid .gBox:eq('+ i +') a').length > 0){
				link = $('.productGrid .gBox:eq('+ i +') a:eq(0)').attr('href');
				if(link && link != ""){
					if(link.split("croma.").length < 2){
						link = "http://www.croma.com/"+link;
					}
					PID = returnPID(link);
				}
				else{
					PID = "";
				}
			}
			if(PID != ""){
				if($('.productGrid .gBox:eq('+ i +')').find('.productMainLink').length > 0 && $('.productGrid .gBox:eq('+ i +')').find('.productMainLink').attr("title")){
					prod = $('.productGrid .gBox:eq('+ i +')').find('.productMainLink:eq(0)').attr("title").trim();
				}
				if($('.productGrid .gBox:eq('+ i +')').find('.productGridItemPromotion img').length > 0 && $('.productGrid .gBox:eq('+ i +')').find('.productGridItemPromotion img').attr("data-blzsrc")){
					image = $('.productGrid .gBox:eq('+ i +')').find('.productGridItemPromotion img:eq(0)').attr("data-blzsrc");
					if(image.split("croma.com").length < 2){
						image = "http://www.croma.com/"+image;
					}
					if(image.split("data:image").length > 1){
						image = "";
					}
				}
				else if($('.productGrid .gBox:eq('+ i +')').find('.productGridItemPromotion img').length > 0 && $('.productGrid .gBox:eq('+ i +')').find('.productGridItemPromotion img').attr("src")){
					image = $('.productGrid .gBox:eq('+ i +')').find('.productGridItemPromotion img:eq(0)').attr("src");
					if(image.split("croma.com").length < 2){
						image = "http://www.croma.com/"+image;
					}

					if(image.split("data:image").length > 1){
						image = "";
					}
				}
				else if($('.productGrid .gBox:eq('+ i +')').find('img').length > 0 && $('.productGrid .gBox:eq('+ i +')').find('img').attr("data-blzsrc")){
					image = $('.productGrid .gBox:eq('+ i +')').find('img:eq(0)').attr("data-blzsrc");
					if(image.split("croma.com").length < 2){
						image = "http://www.croma.com/"+image;
					}

					if(image.split("data:image").length > 1){
						image = "";
					}
				}
				else if($('.productGrid .gBox:eq('+ i +')').find('img').length > 0 && $('.productGrid .gBox:eq('+ i +')').find('img').attr("src")){
					image = $('.productGrid .gBox:eq('+ i +')').find('img:eq(0)').attr("src");
					if(image.split("croma.com").length < 2){
						image = "http://www.croma.com/"+image;
					}

					if(image.split("data:image").length > 1){
						image = "";
					}
				}
				if($('.productGrid .gBox:eq('+ i +')').find('.productGridItemPromotion h3').length > 0){
					price = $('.productGrid .gBox:eq('+ i +')').find('.productGridItemPromotion h3:eq(0)').text();
					price = filter_price(price);
				}
				else if($('.productGrid .gBox:eq('+ i +')').find('h3').length > 0){
					price = $('.productGrid .gBox:eq('+ i +')').find('h3:eq(0)').text();
					price = filter_price(price);
				}
				if($('.productGrid .gBox:eq('+ i +')').find('.addToCartButton').length > 0 && $('.productGrid .gBox:eq('+ i +')').find('.addToCartButton').attr("disabled") && $('.productGrid .gBox:eq('+ i +')').find('.addToCartButton').attr("disabled") == "disabled"){
					oos = 1;
				}
				else {
					oos = 0;
				}

			}
			else{
				price = "";
			}
			if(PID != "" && price != ""){
				arrayToSend.push([PID, price, prod, image, oos]);
			}

		}
	}

	if($('.jcarousel-item').length > 0){
		var slider = $('.jcarousel-item');
		var sliderLength = slider.length;
		var link;
		var price;
		var PID;
		var prod = "";
		var image = "";
		var oos = 0;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			prod = "";
			image = "";
			oos = 0;
			if($('.jcarousel-item:eq('+ i +') a').length > 0){
				link = $('.jcarousel-item:eq('+ i +') a:eq(0)').attr('href');
				if(link && link != ""){
					if(link.split("croma.").length < 2){
						link = "http://www.croma.com/"+link;
					}
					PID = returnPID(link);
				}
				else{
					PID = "";
				}
			}
			if(PID != ""){
				if($('.jcarousel-item:eq('+ i +')').find('h2 .productMainLink').length > 0 && $('.jcarousel-item:eq('+ i +')').find('h2 .productMainLink:eq(0)').attr("title")){
					prod = $('.jcarousel-item:eq('+ i +')').find('h2 .productMainLink:eq(0)').attr("title").trim();
				}
				else if($('.jcarousel-item:eq('+ i +')').find('.productMainLink').length > 1 && $('.jcarousel-item:eq('+ i +')').find('h2 .productMainLink:eq(1)').attr("title")){
					prod = $('.jcarousel-item:eq('+ i +')').find('h2 .productMainLink:eq(1)').attr("title").trim();
				}
				if($('.jcarousel-item:eq('+ i +')').find('.productGridItemPromotion img').length > 0 && $('.jcarousel-item:eq('+ i +')').find('.productGridItemPromotion img').attr("data-blzsrc")){
					image = $('.jcarousel-item:eq('+ i +')').find('.productGridItemPromotion img:eq(0)').attr("data-blzsrc");
					if(image.split("croma.com").length < 2){
						image = "http://www.croma.com/"+image;
					}
					if(image.split("data:image").length > 1){
						image = "";
					}
				}
				else if($('.jcarousel-item:eq('+ i +')').find('.productGridItemPromotion img').length > 0 && $('.jcarousel-item:eq('+ i +')').find('.productGridItemPromotion img').attr("src")){
					image = $('.jcarousel-item:eq('+ i +')').find('.productGridItemPromotion img:eq(0)').attr("src");
					if(image.split("croma.com").length < 2){
						image = "http://www.croma.com/"+image;
					}
					if(image.split("data:image").length > 1){
						image = "";
					}
				}
				else if($('.jcarousel-item:eq('+ i +')').find('img').length > 0 && $('.jcarousel-item:eq('+ i +')').find('img').attr("data-blzsrc")){
					image = $('.jcarousel-item:eq('+ i +')').find('img:eq(0)').attr("data-blzsrc");
					if(image.split("croma.com").length < 2){
						image = "http://www.croma.com/"+image;
					}
					if(image.split("data:image").length > 1){
						image = "";
					}
				}
				else if($('.jcarousel-item:eq('+ i +')').find('img').length > 0 && $('.jcarousel-item:eq('+ i +')').find('img').attr("src")){
					image = $('.jcarousel-item:eq('+ i +')').find('img:eq(0)').attr("src");
					if(image.split("croma.com").length < 2){
						image = "http://www.croma.com/"+image;
					}
					if(image.split("data:image").length > 1){
						image = "";
					}
				}
				if($('.jcarousel-item:eq('+ i +')').find('h3').length > 0){
					price = $('.jcarousel-item:eq('+ i +')').find('h3:eq(0)').text();
					price = filter_price(price);
				}
			}
			else{
				price = "";
			}
			if(PID != "" && price != ""){
				arrayToSend.push([PID, price, prod, image, oos]);
			}

    } // for ends

}
if(arrayToSend.length > 0){
	arrayToSend = JSON.stringify(arrayToSend);
	var jsonArr = [{'pairsCroma': arrayToSend}];
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
	var avail = getAvailability();
	var link = "";
	var PID = "";

	prod = getProd();
	if(avail == 0){
		current_status = 1;
	}

	myPrice = getPrice();
	image = getImage();
	PID = returnPID(window.location.href);
	var breadcrumbF = getBreadCrumb();
	cur_url = window.location.href;
	curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumbF, 1]);
	curData = JSON.stringify(curData);
	var jsonArr = [{'curDataCroma': curData}];
	jsonArr = JSON.stringify(jsonArr);
	if($('.productDetailsPanel').length>0){
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);


//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = "";

function getProd(){
	var prod = "";

	if($(".productDescription h1").length > 0){
		prod = $(".productDescription h1:eq(0)").text().trim();
	}
	else if($(".productDescriptionCss h1").length > 0){
		prod = $(".productDescriptionCss h1:eq(0)").text().trim();
	}
	else if($("h1").length > 0){
		prod = $("h1:eq(0)").text().trim();
	}
	if($('.productDetailsPanel').length>0){
		return prod;
	}
	else {
		return "";
	}
}

function getImage(){
	var image = "";
	if($("#imageLink").length > 0 && $("#imageLink img").length > 0){
		image = $("#imageLink img:eq(0)").attr("src");
		if(image.split("croma.com/").length < 2){
			image = "https://www.croma.com/" + image;
		}
	}

	// //console.log("image: "+image);
	return image;
}

function getPrice(){
	price = "";
	if($(".cta h2").length > 0)
	{
		price = $(".cta h2").text().trim();
	}
	else{
		price = "";
	}

	price = filter_price(price);
	return price;
}

function getAvailability(){
	var avail = 1;
	if($(".addToCartButton.outOfStock").length > 0){
		avail = 0;
	}
	return avail;

}


function getPID(){
	var link = window.location.href;
	var pid = link;

	if(pid.split("/p/").length > 1){
		pid = pid.split("/p/")[1];

		if(pid.split("#").length > 1){
			pid = pid.split("#")[0];
		}
		if(pid.split("&").length > 1){
			pid = pid.split("&")[0];
		}
		if(pid.split("?").length > 1){
			pid = pid.split("?")[0];
		}
		if(pid.split("/").length > 1){
			pid = pid.split("/")[0];
		}
	}
	else{
		pid = "";
	}
	return pid;

}

function returnPID(link){
	var pid = link;
	if(pid.split("/p/").length > 1){
		pid = pid.split("/p/")[1];

		if(pid.split("#").length > 1){
			pid = pid.split("#")[0];
		}
		if(pid.split("&").length > 1){
			pid = pid.split("&")[0];
		}
		if(pid.split("?").length > 1){
			pid = pid.split("?")[0];
		}
		if(pid.split("/").length > 1){
			pid = pid.split("/")[0];
		}
	}
	else{
		pid = "";
	}
	if(link.split('croma.com').length < 2){
		pid = "";
	}
	if(link == ""){
		pid = "";
	}
	return pid;
}


function getBreadCrumb(){
	var breadcrumb = "";
	var bread_final = "Home*~";
	var len_bread = $('#breadcrumb').find('a').length;

	for(i=1;i<len_bread;i++){
		breadcrumb = $('#breadcrumb').find('a:eq('+ i +')').text().trim();
		bread_final += breadcrumb + "*~";
	}

	return bread_final;
}



// function getModel(){
// 	var model = "";
// 	if($(".SpecificationsDiv .w50p").length > 0){
// 		var spec_len = $(".SpecificationsDiv .w50p").length;
// 		for(var i=0;i<spec_len;i++){
// 			if($(".SpecificationsDiv .w50p:eq("+i+") caption:eq(0)").text().trim().toUpperCase() == "GENERAL"){
// 				var key_len = $(".SpecificationsDiv .w50p:eq("+i+") th").length;

// 				for(var j=1;j<key_len;j++){
// 					if($(".SpecificationsDiv .w50p:eq("+i+") th:eq("+j+")").text().trim().toUpperCase() == "MODEL NO.:"){
// 						var model = $(".SpecificationsDiv .w50p:eq("+i+") td:eq("+j+")").text().trim();
// 					}
// 				}
// 				break;
// 			}
// 		}
// 	}
// 	return model;
// }


// function getIntStorage(){
// 	var intMem = "";
// 	if($(".SpecificationsDiv .w50p").length > 0){
// 		var spec_len = $(".SpecificationsDiv .w50p").length;
// 		for(var i=0;i<spec_len;i++){
// 			if($(".SpecificationsDiv .w50p:eq("+i+") caption:eq(0)").text().trim().toUpperCase() == "MEMORY"){
// 				var key_len = $(".SpecificationsDiv .w50p:eq("+i+") th").length;

// 				for(var j=0;j<key_len;j++){
// 					if($(".SpecificationsDiv .w50p:eq("+i+") th:eq("+j+")").text().trim().toUpperCase() == "INTERNAL MEMORY:"){
// 						var intMem = $(".SpecificationsDiv .w50p:eq("+i+") td:eq("+j+")").text().trim();
// 					}
// 				}
// 				break;
// 			}
// 		}
// 	}
// 	return intMem;
// }

// function sendMobile(){
// 	var breadCrumb = getBreadCrumb();
//   // console.log("getBreadCrumb: " + breadCrumb);
//   if(breadCrumb.split("*~").length > 1 && breadCrumb.split("*~")[2].trim().toUpperCase() == "MOBILE PHONES" && getProd() != ""){
//   	var PID = getPID();
//   	var pos = 71;
//   	var price = getPrice();
//   	var image = getImage();
//   	var avail = getAvailability();
//   	var mainTitle = getProd();
//   	var modelName = getModel();
//   	var color = "";
//   	var intStorage = getIntStorage();
//   	var link = window.location.href;

//   	var jsonArr = [{'PID': encodeURIComponent(PID), 'pos': pos, 'price': price, 'image': image, 'avail': avail, 'mainTitle': encodeURIComponent(mainTitle), 'modelName': encodeURIComponent(modelName), 'color': encodeURIComponent(color), 'intStorage': encodeURIComponent(intStorage), 'link': encodeURIComponent(link) }];
//   	jsonArr = JSON.stringify(jsonArr);
//     // console.log("jsonArr: "+jsonArr);
//     sendMessage(1, jsonArr, 19, doNothing, []);

// }
// }
// sendMobile();
