var arrayMsg = [];
function getPos(){
	return 2238;
}

function sendCurrent(){
	curData = [];   
	var prod = "";
	var image = "";
	var myPrice = "";
	var cur_url = "";
	var current_status = 0;
	var PID = "";
	var breadcrumb_str = "";

	breadcrumb_str = getBreadCrumb();
	prod = getProd();
	var avail = getAvailability();
	if(avail == 0){
		current_status = 1;
	}
	else if(avail == -1){
		current_status = 2;
	}
	myPrice = getPrice();
	image = getImage();

	PID = getPID();

	cur_url = window.location.href;
	curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
	curData = JSON.stringify(curData);
	var jsonArr = [{'curDataNetmeds': curData}];
	jsonArr = JSON.stringify(jsonArr);
	if(prod != ""){
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
}

function sendPairs(){
	arrayToSend = [];
	dropToSend = [];

	if($('.product-item-block').length > 0){
		var slider = $('.product-item-block');
		var sliderLength = slider.length;
		var link = "";
		var price = "";
		var PID = "";
		var prod = "";
		var image = "";
		var oos = 100;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			image = "";
			link = "";
			oos = 100;
			if($('.product-item-block:eq('+ i +') a').length > 0){
				link = $('.product-item-block:eq('+ i +') a:eq(0)').attr('href');
				if(link != ""){
					if(link.split("netmeds.com").length < 2){
						link = "http://www.netmeds.com"+link;
					}
					PID = returnPID(link);
				}
				else{
					PID = "";
				}
			}
			if(PID != ""){
				if($('.product-item-block:eq('+ i +')').find('.item-action').length > 0 && $('.product-item-block:eq('+ i +')').find('.item-action:eq(0) .pro-rate').length > 0){
					price = $('.product-item-block:eq('+ i +')').find('.item-action:eq(0) .pro-rate:eq(0)').text().trim();
					price = filter_price(price);
				}

				if($('.product-item-block:eq('+ i +')').find('.product-item-visual').length > 0 && $('.product-item-block:eq('+ i +')').find('.product-item-visual:eq(0) img').length > 0 && $('.product-item-block:eq('+ i +')').find('.product-item-visual:eq(0) img:eq(0)').attr("alt")){
					prod = $('.product-item-block:eq('+ i +')').find('.product-item-visual:eq(0) img:eq(0)').attr("alt").trim();
				}

				if($('.product-item-block:eq('+ i +')').find('.product-item-visual').length > 0 && $('.product-item-block:eq('+ i +')').find('.product-item-visual:eq(0) img').length > 0 && $('.product-item-block:eq('+ i +')').find('.product-item-visual:eq(0) img:eq(0)').attr("src")){
					image = $('.product-item-block:eq('+ i +')').find('.product-item-visual:eq(0) img:eq(0)').attr("src").trim();
					if(image != "" && image.split("netmeds.com").length < 2){
						image = "http://www.netmeds.com/"+image;
					}
					if(image.split("/loader").length > 1){
						image  = "";
					}
					if(prod.split("...").length > 1 && image != ""){
						prod = image.split("/");
						prod = prod[prod.length-1];
						prod = prod.split(".jpg");
						prod = prod[0];
						prod = prod.split("_").join(" ").trim().toUpperCase();
					}
				}
			}
			if(PID != "" && price != ""){
				arrayToSend.push([PID, price, prod, image, oos]);
				dropToSend.push(PID);
			}

    } // for ends

}

if($('.cater_list_items').length > 0){
	var slider = $('.cater_list_items');
	var sliderLength = slider.length;
	var link = "";
	var price = "";
	var PID = "";
	var prod = "";
	var image = "";
	var oos = 0;
	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		oos = 0;
		image = "";
		link = "";
		if($('.cater_list_items:eq('+ i +') a').length > 0){
			link = $('.cater_list_items:eq('+ i +') a:eq(0)').attr('href');
			if(link != ""){
				if(link.split("netmeds.com").length < 2){
					link = "http://www.netmeds.com"+link;
				}
				PID = returnPID(link);
			}
			else{
				PID = "";
			}
		}
		if(PID != ""){
			if($('.cater_list_items:eq('+ i +')').find('.otc_drug-rate').length > 0 && $('.cater_list_items:eq('+ i +')').find('.otc_drug-rate:eq(0) .org-priz').length > 0){
				price = $('.cater_list_items:eq('+ i +')').find('.otc_drug-rate:eq(0) .org-priz:eq(0)').text().trim();
				price = filter_price(price);
			}

			if($('.cater_list_items:eq('+ i +')').find('.products-img').length > 0 && $('.cater_list_items:eq('+ i +')').find('.products-img:eq(0) img').length > 0 && $('.cater_list_items:eq('+ i +')').find('.products-img:eq(0) img:eq(0)').attr("alt")){
				prod = $('.cater_list_items:eq('+ i +')').find('.products-img:eq(0) img:eq(0)').attr("alt").trim();
			}

			if($('.cater_list_items:eq('+ i +')').find('.products-img').length > 0 && $('.cater_list_items:eq('+ i +')').find('.products-img:eq(0) img').length > 0 && $('.cater_list_items:eq('+ i +')').find('.products-img:eq(0) img:eq(0)').attr("src")){
				image = $('.cater_list_items:eq('+ i +')').find('.products-img:eq(0) img:eq(0)').attr("src").trim();
				if(image != "" && image.split("netmeds.com").length < 2){
					image = "http://www.netmeds.com/"+image;
				}
				if(image.split("/loader").length > 1){
					image  = "";
				}

				if(prod.split("...").length > 1 && image != ""){
					prod = image.split("/");
					prod = prod[prod.length-1];
					prod = prod.split(".jpg");
					prod = prod[0];
					prod = prod.split("_").join(" ").trim().toUpperCase();
				}

			}

			if($('.cater_list_items:eq('+ i +')').find('.stock-popup').length > 0 && $('.cater_list_items:eq('+ i +')').find('.stock-popup:eq(0)').attr("href")){
				if($('.cater_list_items:eq('+ i +')').find('.stock-popup:eq(0)').attr("href").split("out-of-stock").length > 1){
					oos = 1;
				}
			}
		}
		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
			dropToSend.push(PID);
		}

    } // for ends

}

if(arrayToSend.length > 0){
	arrayToSend = JSON.stringify(arrayToSend);
	var jsonArr = [{'pairsNetmeds': arrayToSend}];
	jsonArr = JSON.stringify(jsonArr);
	sendMessage(0, jsonArr, 0, doNothing, []);  
}
if(dropToSend.length > 0){
	dropToSend = JSON.stringify(dropToSend);
	var jsonArr = [{'pids': dropToSend, 'pos': 2238}];
	jsonArr = JSON.stringify(jsonArr);
	var passBack = ['.product-item-block', '.cater_list_items'];
	sendMessage(1, jsonArr, 30, displayRecentDrops, passBack);  
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

	if($("#lblbrandname").length > 0){
		prod = $("#lblbrandname").text().trim();
		return prod;
	}
	else{
		return "";
	}
}

function getImage(){
	var image = "";
	if($("#Bsmallimg").length > 0){
		image = $("#Bsmallimg").attr("src").trim();
		if(image != "" && image.split("netmeds.com").length < 2){
			image = "http://www.netmeds.com/"+image;
		}
	}
	return image;
}

function getPrice(){
	var price = "";
	if($("#ddlqty").length > 0 && $("#ddlqty option").length > 0){
		price = $("#ddlqty option:eq(0)").text().trim();
		if(price.split("-").length > 1){
			price = price.split("-");
			price = price[price.length - 1];
			price = filter_price(price);
		}
	}
	if(isNaN(price) || price == 0){
		if($("#lblprice").length > 0){
			price = $("#lblprice").text().trim();
			price = filter_price(price);
		}
	}
	if(isNaN(price)){
		price = 0;
	}
	return price;
}

function getAvailability(){
	var avail = 1;
	if($('#bntBaddtocart').length == 0 && $(".otc_cart").length > 0 && $(".otc_cart:eq(0) .stock-popup").length > 0){
		if($(".otc_cart:eq(0) .stock-popup").attr("href").split("out-of-stock").length > 1){
			avail = 0;
		}
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
	if(pid.split("netmeds.com/").length > 1){
		pid = pid.split("netmeds.com/");
		pid = pid[pid.length - 1];
	}
	return pid;



}
function returnPID(link){

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
	if(pid.split("netmeds.com/").length > 1){
		pid = pid.split("netmeds.com/");
		pid = pid[pid.length - 1];
	}
	if(link.split('netmeds.com').length < 2){
		pid = 0;
	}
	if(link == ""){
		pid = 0;
	}
	
	return pid;
}

function getBreadCrumb(){
	var breadcrumb = "";
	var bread_final = "";
	var len_bread = $('.traverse').find('a').length;

	for(i=0;i<len_bread;i++){
		breadcrumb = $('.traverse').find('a:eq('+ i +')').text().trim();
		bread_final += breadcrumb + "*~";
	}
	return bread_final;
}

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