var arrayMsg = [];
function getCategory(){
	var categories = getBreadCrumb();
	var index = 0;
	var category = "";
	if(categories != "" && categories != undefined){
		categories = categories.split("*~");
		category = categories[index];
	}
	return category;
}

function pickValue(attrName)
{
      // console.log("am in pick values fun ");
      var myVar = "";
      if(document.querySelectorAll('.pdTab').length > 0){
      	myVar = document.querySelectorAll('.pdTab')[0].innerHTML;
      }
      else {
      	return "";
      }

      var strToSearch = attrName + "</td>";
      if(myVar.split(strToSearch).length > 1){
      	myVar = myVar.split(strToSearch)[1];
      	myVar = myVar.split("</td>")[0];
      	myVar = myVar.split('">');
      	if(myVar.length > 1){
      		myVar = myVar[1];
      	}
      	else {
      		myVar = myVar.join('">');
      		myVar = myVar.split(">");
      		myVar = myVar[1];
      	}
      	myVar = myVar.trim();
      	return myVar;
      }
      else {
      	return "";
      }

  }

  function getDetails(url)
  {
  	finalJSON = {};
  	var specialPat = /[^a-z0-9]+$/gi;
  	var prodName = getProd();
  	if(prodName ==""){
  		setTimeout(getDetails, 100);
  		return;
  	}
  	else {


  		var alphaNum = /([a-z]+[0-9]+|[0-9]+[a-z]+)(.)*/gi;
        // console.log("am here in getDetails fun");

        var loaded = $('._2ZbXBq');
        if(loaded.length > 1)
        {
          //not loaded properly
          setTimeout(getDetails,100);

      }
      else if(getSpecs()==""){
      	setTimeout(getDetails, 100);
      }
      else
      {
      	var filters = getSpecs();
         // console.log(filters);
         filters = JSON.parse(filters);
         if(!filters.model){
         	var brandHere = filters.brand;
         	var prodTemp = getProd();
         	prodTemp = prodTemp.split(brandHere);
         	if(prodTemp.length > 1){
         		prodTemp = prodTemp[1];
         		prodTemp = prodTemp.trim();
         		prodTemp = prodTemp.split(" ");
         		prodTemp = prodTemp[0];
         		if(!isAlphaNumeric(prodTemp) || parseInt(prodTemp)==prodTemp){
         			filters.model = prodTemp;
         		}
         	}
         }
         filters = JSON.stringify(filters);

         var prodName = getProd();
         lastProd = prodName;
         var myPrice = getPrice();

         finalJSON["category"] = 0;
         finalJSON["filters"] = filters;
         finalJSON["filteredName"]  = prodName;
         finalJSON["prodName"] = prodName;
         finalJSON["price"] = myPrice;
         finalJSON["image"] = getImage();


         var finalJSONTemp = JSON.stringify(finalJSON);
         msgToSend = finalJSONTemp;
         sendSearchMessageNew(msgToSend, 1, url);
     }
 }
}


function getSpecs()
{

	var laptopFound = 0;
	var bcs = $("._1joEet").html();
	cat =  $(bcs).find("._1KHd47").eq(2).text();
	bCat  =  $(bcs).find("._1KHd47").eq(3).text();
	brand = bCat.toLowerCase().trim().split(cat.toLowerCase().trim())[0];

	var ourAtts = [];
	ourAtts["model number"] = "model";
	ourAtts["Item model number"] = "serialno";
	ourAtts["Processor Type"] = "processor";
	ourAtts["processor generation"] = "gen";
	ourAtts["System Memory"] = "ram";
	ourAtts["Operating System"] = "os";
	ourAtts["HDD Capacity"] = "hdd";
	ourAtts["Series"] = "lapseries";
	ourAtts["model name"] = "modelname";
	ourAtts["emmc storage"] = "hdd";
	ourAtts["Brand"] = "brand";

	var attributeVal ={};
	var attributes = [];
	var attrVal = "";
	for(var k in ourAtts){
		var attrVal = pickValue(k);
		if(attrVal!="")
		{
			var key  = ourAtts[k];
			attributeVal[key] = attrVal;
		}
	}
	attributeVal["pid"] = getPID();
	if(attributeVal.serialno){
		attributeVal['serialno'] = "";
	}
	attributeVal = JSON.stringify(attributeVal);

	return attributeVal;
}

function sendPairs(){
	var arrayToSend = [];
	var dropToSend = [];
	if($('#product_list .column.col3').length > 0){
		var slider = $('#product_list .column.col3');
		var sliderLength = slider.length;
		var link;
		var price;
		var PID;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			if($('#product_list .column.col3:eq('+ i +') a').length > 0){
				link = $('#product_list .column.col3:eq('+ i +') a:eq(0)').attr('href');
				if(link == "javascript:void(0);" && $('#product_list .column.col3:eq('+ i +') a').length > 1){
					link = $('#product_list .column.col3:eq('+ i +') a:eq(1)').attr('href');
				}
				if(link != ""){
					PID = returnPID(link);
				}
				else{
					PID = "";
				}
			}
			else{
				PID = "";
			}
			if(PID != ""){
				if($('#product_list .column.col3:eq('+ i +')').find('.prd_p_section').length > 0 && $('#product_list .column.col3:eq('+ i +')').find('.prd_p_section .ori_price').length > 0 && $('#product_list .column.col3:eq('+ i +')').find('.prd_p_section:eq(0) .ori_price:eq(0) .p_price').length > 0){
					price = $('#product_list .column.col3:eq('+ i +')').find('.prd_p_section:eq(0) .ori_price:eq(0) .p_price:eq(0)').text();
					price = filter_price(price);
				}
			}
			else{
				price = "";
			}
			if(PID != "" && price != ""){
				arrayToSend.push([PID, price]);
				dropToSend.push(PID);
			}

		}
	}

	if($('.slick-slide').length > 0){
		var slider = $('.slick-slide');
		var sliderLength = slider.length;
		var link;
		var price;
		var PID;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			if($('.slick-slide:eq('+ i +') a').length > 0){
				link = $('.slick-slide:eq('+ i +') a:eq(0)').attr('href');
				if(link != ""){
					PID = returnPID(link);
					// console.log("PID: "+PID);
				}
				else{
					PID = "";
				}
			}
			else{
				PID = "";
			}
			if(PID != ""){
				if($('.slick-slide:eq('+ i +')').find('p').length > 0){
					price = $('.slick-slide:eq('+ i +')').find('p:eq(0)').html();
					if(price.split("Rs.").length > 2){
						price = price.split("Rs.");
						price = price[price.length - 1];
					}
					price = filter_price(price);
					// console.log("price: "+price);
				}
			}
			else{
				price = "";
			}

			if(PID != "" && price != ""){
				arrayToSend.push([PID, price]);
				dropToSend.push(PID);
			}

		}
	}
	if($('.dd_section li').length > 0){
		var slider = $('.dd_section li');
		var sliderLength = slider.length;
		var link;
		var price;
		var PID;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			if($('.dd_section li:eq('+ i +') a').length > 0){
				link = $('.dd_section li:eq('+ i +') a:eq(0)').attr('href');
				if(link != ""){
					PID = returnPID(link);
					// console.log("PID: "+PID);
				}
				else{
					PID = "";
				}
			}
			else{
				PID = "";
			}
			if(PID != ""){
				if($('.dd_section li:eq('+ i +')').find('p').length > 0){
					price = $('.dd_section li:eq('+ i +')').find('p:eq(0)').html();
					if(price.split("Rs.").length > 2){
						price = price.split("Rs.");
						price = price[price.length - 1];
					}
					price = filter_price(price);
					// console.log("price: "+price);
				}
			}
			else{
				price = "";
			}

			if(PID != "" && price != ""){
				arrayToSend.push([PID, price]);
				dropToSend.push(PID);
			}

		}
	}
	// console.log("arrayToSend: "+arrayToSend);
	if(arrayToSend.length > 0){
		arrayToSend = JSON.stringify(arrayToSend);
		var jsonArr = [{'pairsShopClues': arrayToSend}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
	if(dropToSend.length > 0){
		dropToSend = JSON.stringify(dropToSend);
		var jsonArr = [{'pids': dropToSend, 'pos': 421}];
		jsonArr = JSON.stringify(jsonArr);
		var passBack = ['.slick-slide', '#product_list .column.col3'];
		sendMessage(1, jsonArr, 30, displayRecentDrops, passBack);
	}
}




function sendCurrent(){
	curData = [];
	var prod = "";
	var image = "";
	var myPrice = "";
	var cur_url = "";
	var current_status = 0;
	var link = window.location.href;
	var PID = "";
	var breadcrumb_str = getBreadCrumb();

	prod = getProd();
	var avail = getAvailability();
	if(avail == 1){
		current_status = 0;
	}
	else if(avail == -1){
		current_status = 2;
	}
	else{
		current_status = 1;
	}
	myPrice = getPrice();

	if(isNaN(myPrice)){
		myPrice = "";
	}
	image = getImage();

	PID = returnPID(link);


	if($('[itemtype="http://schema.org/Product"]').length>0 && $(".prd_mid_info").length > 0){
		cur_url = window.location.href;
		curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
		curData = JSON.stringify(curData);
		var jsonArr = [{'curDataShopClues': curData}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
	else if($("#product_list").length == 0){
		cur_url = window.location.href;
		curData.push(["", "", "", cur_url, 2, PID, ""]);
		curData = JSON.stringify(curData);
		var jsonArr = [{'curDataShopClues': curData}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);


//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;


function getProd(){
	var prod = "";

	if($('.name h1').length > 0){
		prod = $('.name h1').text().trim();
	}
	else if($('.prd_mid_info').length > 0 && $('.prd_mid_info h1').length > 0){
		prod = $('.prd_mid_info:eq(0) h1:eq(0)').text().trim();
	}
	if($('[itemtype="http://schema.org/Product"]').length>0 && $(".prd_mid_info").length > 0){
		return prod;
	}
	else {
		return "";
	}
	// //console.log("prod: "+prod);
}

function getImage(){
	var image = "";
	if($('.img').length > 0){
		image = $('.img').attr('src');
	}
	else if($('.zoomPup img').length > 0){
		image = $('.zoomPup img:eq(0)').attr('src');
	}
	// //console.log("image: "+image);
	return image;
}

function getPrice(){
	price = "";
	if($('.prd_mid_info').length > 0 && $('.prd_mid_info:eq(0) .price').length > 0 && $('.prd_mid_info:eq(0) .price:eq(0) .f_price').length > 0){
		price = $('.prd_mid_info:eq(0) .price:eq(0) .f_price:eq(0)').text().trim();
		price = filter_price(price);
	}
	else if($('.product-pricing .price').length > 0){
		price = $('.product-pricing .price').text().trim();
		price = filter_price(price);
	}
	return price;
}

function getAvailability(){
	var avail = 1;
	if($('.price-hldr .o-stock').length > 0){
		avail = 0;
	}
	else if($('.out-of-stock').length > 0){
		avail = 0;
	}
	if(getProd() == "" && (getPrice() == "" || getPrice() == 0) && getImage() == "" && $(".pID").length > 0){
		var prod_id = $(".pID").text();
		prod_id = prod_id.split(":");
		prod_id = prod_id[1];
		if(prod_id.trim() == ""){
			avail = -1;
		}
	}
	if($(".product_ntavailable").length > 0 && $(".product_ntavailable").text().toUpperCase().split("DISCONTINUED").length > 1){
		avail = -1;
	}
	return avail;

}
function getPID(){

	var link = window.location.href;
	var pid = link;

	if(pid.split("#").length > 1){
		pid = pid.split("#")[0];
	}
	if(pid.split("&").length > 1){
		pid = pid.split("&")[0];
	}
	if(pid.split("?").length > 1){
		pid = pid.split("?")[0];
	}

	// if(pid.split("/").length > 1){
	// 	pid = pid.split("/");
	// 	pid = pid[pid.length - 1];
	// }

	return pid;



}

function returnPID(link){

	var pid = link;
	if(pid){

		if(pid.split("#").length > 1){
			pid = pid.split("#")[0];
		}
		if(pid.split("&").length > 1){
			pid = pid.split("&")[0];
		}
		if(pid.split("?").length > 1){
			pid = pid.split("?")[0];
		}
		if(link.split('shopclues.com').length < 2){
			pid = 0;
		}
		if(link == ""){
			pid = 0;
		}
	}
	else{
		pid = "";
	}

	// if(pid.split("/").length > 1){
	// 	pid = pid.split("/");
	// 	pid = pid[pid.length - 1];
	// }

	return pid;



}

function getBreadCrumb(){
	var breadcrumb = "";
	var bread_final = "";
	var len_bread = $('.breadcrums a').length;

	for(i=1;i<len_bread;i++){
		breadcrumb = $('.breadcrums a:eq('+ i +')').text().trim();
		bread_final += breadcrumb + "*~";
	}

	return bread_final;


}


function getModel(){
	var model = "";
	if($(".product-details-list .MsoNormalTable").length > 0){
		var tab_len = $(".product-details-list .MsoNormalTable").length;
		for(var i=0;i<tab_len;i++){
			if($(".product-details-list .MsoNormalTable:eq("+i+") strong").length > 0 && $(".product-details-list .MsoNormalTable:eq("+i+") strong:eq(0) span:eq(0)").text().trim().toUpperCase() == "GENERAL"){

				var lab_len = $(".product-details-list .MsoNormalTable:eq("+i+") tr").length;

				for(var j=1;j<lab_len;j++){
					if($(".product-details-list .MsoNormalTable:eq("+i+") tr:eq("+j+") td").length > 0 && $(".product-details-list .MsoNormalTable:eq("+i+") tr:eq("+j+") td:eq(0)").text().trim().toUpperCase() == "MODEL"){
						model = $(".product-details-list .MsoNormalTable:eq("+i+") tr:eq("+j+") td:eq(1)").text().trim();
					}
				}
				break;
			}
		}
	}
	else if($(".product-features-list label").length > 0){
		var tab_len = $(".product-features-list label").length;
		for(var i=0;i<tab_len;i++){
			if($(".product-features-list label:eq("+i+")").text().trim().toUpperCase() == "MODEL ID:"){
				model = $(".product-features-list span:eq("+i+")").text().trim();
				break;
			}
		}
	}
	if(model == ""){
		if($(".specTable .specsKey").length > 0){
			var tab_len = $(".specTable .specsKey").length;
			for(var t=0;t<tab_len;t++){
				if($(".specTable .specsKey:eq("+t+")").text().trim().toUpperCase() == "MODEL NAME"){
					model = $(".specTable .specsValue:eq("+t+")").text().trim();
				}
			}

		}
	}
	return model;
}


function getIntStorage(){
	var intMem = "";
	if($(".product-details-list .MsoNormalTable").length > 0){
		var tab_len = $(".product-details-list .MsoNormalTable").length;
		for(var i=0;i<tab_len;i++){
			if($(".product-details-list .MsoNormalTable:eq("+i+") strong").length > 0 && $(".product-details-list .MsoNormalTable:eq("+i+") strong:eq(0) span:eq(0)").text().trim().toUpperCase() == "MEMORY & STORAGE"){

				var lab_len = $(".product-details-list .MsoNormalTable:eq("+i+") tr").length;

				for(var j=1;j<lab_len;j++){
					if($(".product-details-list .MsoNormalTable:eq("+i+") tr:eq("+j+") td").length > 0 && $(".product-details-list .MsoNormalTable:eq("+i+") tr:eq("+j+") td:eq(0)").text().trim().toUpperCase() == "INTERNAL MEMORY"){
						intMem = $(".product-details-list .MsoNormalTable:eq("+i+") tr:eq("+j+") td:eq(1)").text().trim();
					}
				}
				break;
			}
		}
	}
	else if($(".product-features-list label").length > 0){
		var tab_len = $(".product-features-list label").length;
		for(var i=0;i<tab_len;i++){
			if($(".product-features-list label:eq("+i+")").text().trim().toUpperCase() == "INCLUDED MEMORY CARD:"){
				intMem = $(".product-features-list span:eq("+i+")").text().trim();
				break;
			}
		}
	}
	if(intMem == ""){
		if($(".product-details-list p").length > 0){

			var tab_len = $(".product-details-list p").length;
			for(var i=0;i<tab_len;i++){
				if($(".product-details-list p:eq("+i+")").text().trim().toUpperCase().split("BUILT-IN MEMORY:").length > 1){
					intMem = $(".product-details-list p:eq("+i+")").text().trim().toUpperCase().split("BUILT-IN MEMORY:");
					intMem = intMem[1].trim();
					if(intMem.length > 7 && intMem.toUpperCase().split("GB").length < 2 && intMem.toUpperCase().split("MB").length < 2){
						intMem = "";
					}
				}
			}

		}
	}
	if(intMem == ""){
		if($(".specTable .specsKey").length > 0){
			var tab_len = $(".specTable .specsKey").length;
			for(var t=0;t<tab_len;t++){
				if($(".specTable .specsKey:eq("+t+")").text().trim().toUpperCase() == "INTERNAL"){
					intMem = $(".specTable .specsValue:eq("+t+")").text().trim();
				}
			}

		}
	}
	return intMem;
}

function getColor(){
	var color = "";
	if($(".product-details-list .MsoNormalTable").length > 0){
		var tab_len = $(".product-details-list .MsoNormalTable").length;
		for(var i=0;i<tab_len;i++){
			if($(".product-details-list .MsoNormalTable:eq("+i+") strong").length > 0 && $(".product-details-list .MsoNormalTable:eq("+i+") strong:eq(0) span:eq(0)").text().trim().toUpperCase() == "GENERAL"){

				var lab_len = $(".product-details-list .MsoNormalTable:eq("+i+") tr").length;

				for(var j=1;j<lab_len;j++){
					if($(".product-details-list .MsoNormalTable:eq("+i+") tr:eq("+j+") td").length > 0 && $(".product-details-list .MsoNormalTable:eq("+i+") tr:eq("+j+") td:eq(0)").text().trim().toUpperCase() == "COLOR"){
						color = $(".product-details-list .MsoNormalTable:eq("+i+") tr:eq("+j+") td:eq(1)").text().trim();
					}
				}
				break;
			}
		}
	}
	else if($(".product-features-list label").length > 0){
		var tab_len = $(".product-features-list label").length;
		for(var i=0;i<tab_len;i++){
			if($(".product-features-list label:eq("+i+")").text().trim().toUpperCase() == "COLORS:"){
				color = $(".product-features-list span:eq("+i+")").text().trim();
				if(color.split(" - ").length > 1){
					color = color.split(" - ");
					color = color[0].trim();
				}
				break;
			}
		}
	}
	if(color == ""){
		if($(".specTable .specsKey").length > 0){
			var tab_len = $(".specTable .specsKey").length;
			for(var t=0;t<tab_len;t++){
				if($(".specTable .specsKey:eq("+t+")").text().trim().toUpperCase() == "HANDSET COLOR"){
					color = $(".specTable .specsValue:eq("+t+")").text().trim();
				}
			}

		}
	}
	return color;
}

function sendMobile(){
	var breadCrumb = getBreadCrumb();
	// console.log("getBreadCrumb: " + breadCrumb);
	if( breadCrumb.split("*~").length > 1 && (breadCrumb.split("*~")[1].trim().toUpperCase() == "MOBILE PHONES" || breadCrumb.split("*~")[1].trim().toUpperCase() == "MOBILES (SELLER CERTIFIED)") && getProd() != ""){
		var PID = getPID();
		var pos = 421;
		var price = getPrice();
		var image = getImage();
		var avail = getAvailability();
		var mainTitle = getProd();
		var modelName = getModel();
		var color = getColor();
		var intStorage = getIntStorage();
		var link = window.location.href;

		var jsonArr = [{'PID': encodeURIComponent(PID), 'pos': pos, 'price': price, 'image': image, 'avail': avail, 'mainTitle': encodeURIComponent(mainTitle), 'modelName': encodeURIComponent(modelName), 'color': encodeURIComponent(color), 'intStorage': encodeURIComponent(intStorage), 'link': encodeURIComponent(link) }];
		jsonArr = JSON.stringify(jsonArr);
		// console.log("jsonArr: "+jsonArr);
		sendMessage(1, jsonArr, 19, doNothing, []);
	}
}
sendMobile();



var cur_url = window.location.href;
if(cur_url.split("secure.shopclues.com/atom/").length > 1 && cur_url.split("/summary").length > 1){
	var checkPick = ".coupon-apply .remove_coupon";
	var selector = ".coupon-apply ul:eq(0) li:eq(0) span:eq(0)";
	var attr = "";
	var webID = 421;
	var homeLink = "http://www.shopclues.com/";
	pickAppliedCpn(checkPick, selector, attr, webID, homeLink);

	if($(".coupon-apply").length > 0 && $("#couponClick").length == 0){
		var selectorACIcon = ".coupon-apply:eq(0)";
		var position = "after";
		var parent = "none";
		var method = "POST";
		var api = "https://secure.shopclues.com/atom/applycoupon";
		var request_uid = $("#request_uid").val().trim();
		var postFields = {"promotion": "**", "remove_coupon": 0, "summary": 1, "request_uid": request_uid };
		var clickRemoveButton = ".remove_coupon";
		var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, "clickRemoveButton": clickRemoveButton, "site": 7}];
		details = JSON.stringify(details);
		initializeLocaStorage();
		displayACIcon(selectorACIcon, parent, position, 7, details);
	}
}

savings = [];
bestSaving = 0;
bestCoupon = "";
function startSaving(data){

	data = JSON.parse(data);
	var nowCode = "";
	var nowSaving = "";
	var csaving = 0;
	var resp = data[0].data;
	var code = data[0].code.trim().toUpperCase();
	var ecashsaving = 0;
	var savingsObject = {};
	nowCode = code;
	resp = JSON.parse(resp);
	if(resp != "" && code != ""){
		if(resp.atomcart_data && resp.atomcart_data.order_discount && resp.atomcart_data.coupon_result && resp.atomcart_data.coupon_result.code && resp.atomcart_data.coupon_result.code != "[]"){
			csaving = resp.atomcart_data.order_discount;
			csaving = filter_price(csaving);
		}
		else{
			csaving = 0;
			ecashsaving = 0;
		}
		if(isNaN(csaving)){
			csaving = 0
		}
		else if(csaving > bestSaving){
			bestSaving = csaving;
			bestCoupon = code;
		}
		if(resp.coupon_msg && resp.coupon_msg.error && resp.coupon_msg.error != null && resp.coupon_msg.error != "" && resp.coupon_msg.error.length > 0){
			cpnMsg = resp.coupon_msg.error[0].trim();
			cpnMsg = cpnMsg.replace(/(<([^>]+)>)/ig,"");
			arrayMsg.push([code, encodeURIComponent(cpnMsg), 421 ]);
		}
	}
	var savingsLen = savings.length;
	savingsObject["code"] = code;
	savingsObject["saving"] = csaving;
	savingsObject["ecash"] = ecashsaving;
	savings[savingsLen] = savingsObject;
	localStorage.savings = JSON.stringify(savings);
	displayEachCpnSaving(code, csaving, ecashsaving);
	doneSavingCheck++;
	if(doneSavingCheckFn() == 1){
		applyBestCoupon();
		if(localStorage.anaSent!=1 && parseInt(bestSaving) != 0 && bestSaving!="" && !isNaN(parseInt(bestSaving))){
	    localStorage.anaSent = 1;
	    var host=window.location.host;
	    var jsonArr = [{'type': 'finish1','website':host}];
	    jsonArr = JSON.stringify(jsonArr);
	    sendMessage(1, jsonArr,22,doNothing, []);
	    tracer(1,4);
	    setTimeout(function(){if(JSON.parse(features_json)[4]==0){ft(4);}},100);
	  }
	}
	else{
		displayAutoSaving(bestSaving);
	}
}

var mainClick = 0;
var deleteAC = 0;
function applyBestCoupon(){
	// console.log("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
	if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
		if(document.getElementsByClassName("remove_coupon").length > 0){
			document.getElementsByClassName("remove_coupon")[0].click();
		}
		var selec = [];
		selec[0] = ".view-all-coupons";

		// $(".label_jump.coupon_text").val("bhuwan");
		// $("label:contains('Enter')").addClass("label-valid");
		// $("#apply_cart_coupons").removeClass("disable");
		// $("#apply_cart_coupons").prop('disabled', false);
		// $("#apply_cart_coupons").click();

		selectorExists(selec, 1).then(function(data){
			if(mainClick == 0){
				document.getElementsByClassName("view-all-coupons")[0].click();
				mainClick = 1;
			}
			if($(".label_jump.coupon_text").length > 0 && $("#apply_cart_coupons:eq(0)").length > 0){
				$(".label_jump.coupon_text").val(bestCoupon.trim());
				// $(".av_coupons:eq(0) .coupon_text").val(bestCoupon.trim());
				$("label:contains('Enter')").addClass("label-valid");
				$("#apply_cart_coupons").removeClass("disable");
				$("#apply_cart_coupons").prop('disabled', false);
				displayFinalSavings();
				document.getElementById("apply_cart_coupons").click();
			}
			else{
				setTimeout(applyBestCoupon, 1000);
			}
		});

	}
	else{
		displayNoSavings();
		// console.log("Show no savings popup");
	}
	if(deleteAC == 0){
		if(arrayMsg.length > 0 && arrayMsg.length != ""){
			arrayMsg = JSON.stringify(arrayMsg);
			var jsonArr = [{'cpn_msg': arrayMsg}];
			jsonArr = JSON.stringify(jsonArr);
			// console.log("cpn_msg JSON: "+jsonArr);
			deleteAC = 1;
			sendMessage(1, jsonArr, 12, doNothing, []);
			arrayMsg = [];
		}
	}
}


// function sendCoupon(){
//   couponToSend = [];
//   var cur_link = window.location.href;
//   var couponUrl = "";
//   var couponCode = "";
//   var couponText = "";
//   var couponDesc = "";
//   var couponExp = 0;
//   var couponAt = 421;
//   couponUrl = "http://www.shopclues.com/";
//   couponCode = "";
//   couponText = "";
//   couponDesc = "";
//   slider = $("#offersWrap").find(".offer-data");
//   sliderLength = slider.length;

//   for(i=0;i<sliderLength;i++){
//     couponUrl = "http://www.shopclues.com/";
//     couponCode = "";
//     couponText = "";
//     couponDesc = "";
//     couponExp = 0;

//     couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
//   }
//   couponToSend = JSON.stringify(couponToSend);
//   var jsonArr = [{'couponsExt': couponToSend}];
//   jsonArr = JSON.stringify(jsonArr);
//   // sendMessage(1, jsonArr, 14, doNothing, []);
// }
// // sendCoupon()