var arrayMsg = [];
function getPos(){
	return 2237;
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
	var jsonArr = [{'curData1mg': curData}];
	jsonArr = JSON.stringify(jsonArr);
	if($('[itemtype="http://schema.org/Product"]').length > 0){
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
}

function sendPairs(){
	arrayToSend = [];
	dropToSend = [];

	if($('.js-alert-section .dia-sku').length > 0){
		var slider = $('.js-alert-section .dia-sku');
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
			if($('.js-alert-section .dia-sku:eq('+ i +') a').length > 0){
				link = $('.js-alert-section .dia-sku:eq('+ i +') a:eq(0)').attr('href');
				if(link != ""){
					if(link.split("1mg.com").length < 2){
						link = "https://www.1mg.com/"+link;
					}
					PID = returnPID(link);
				}
				else{
					PID = "";
				}
			}
			if(PID != ""){
				if($('.js-alert-section .dia-sku:eq('+ i +')').find('.sku-price').length > 0 && $('.js-alert-section .dia-sku:eq('+ i +')').find('.sku-price:eq(0) .sku-offer').length > 0){
					price = $('.js-alert-section .dia-sku:eq('+ i +')').find('.sku-price:eq(0) .sku-offer:eq(0)').text().trim();
					price = filter_price(price);
				}

				if($('.js-alert-section .dia-sku:eq('+ i +')').find('.sku-name').length > 0){
					prod = $('.js-alert-section .dia-sku:eq('+ i +')').find('.sku-name:eq(0)').text().trim();
				}

				if($('.js-alert-section .dia-sku:eq('+ i +')').find('.sku-img').length > 0 && $('.js-alert-section .dia-sku:eq('+ i +')').find('.sku-img:eq(0) img').attr("src")){
					image = $('.js-alert-section .dia-sku:eq('+ i +')').find('.sku-img:eq(0) img:eq(0)').attr("src").trim();
				}

				if($('.js-alert-section .dia-sku:eq('+ i +')').find('.out-of-stock').length > 0){
					oos = 1;
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
	var jsonArr = [{'pairs1mg': arrayToSend}];
	jsonArr = JSON.stringify(jsonArr);
	sendMessage(0, jsonArr, 0, doNothing, []);  
}
if(dropToSend.length > 0){
	dropToSend = JSON.stringify(dropToSend);
	var jsonArr = [{'pids': dropToSend, 'pos': 2237}];
	jsonArr = JSON.stringify(jsonArr);
	var passBack = ['.js-alert-section .dia-sku'];
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

	if($("h1").length > 0){
		prod = $("h1:eq(0)").text().trim();
	}
	else if($("[itemprop='name']").length > 0){
		prod = $("[itemprop='name']:eq(0)").text().trim();
	}

	if($('[itemtype="http://schema.org/Product"]').length > 0){
		return prod;
	}
	else{
		return "";
	}
}

function getImage(){
	var image = "";
	if($(".otc").length > 0 && $(".otc:eq(0) .otc-img-box").length > 0){
		image = $(".otc:eq(0) .otc-img-box:eq(0) img:eq(0)").attr("src").trim();
	}
	return image;
}

function getPrice(){
	var price = "";
	if($(".otc").length > 0 && $(".otc:eq(0) .otc-price").length > 0){
		price = $(".otc:eq(0) .otc-price:eq(0)").text().trim();
		price = filter_price(price);
	}
	else if($('[itemprop="price"]').length > 0)
	{
		price = $('[itemprop="price"]:eq(0)').text().trim();
		price = filter_price(price);
	}
	if(isNaN(price)){
		price = 0;
	}
	return price;
}

function getAvailability(){
	var avail = 1;
	if($('.js-avail').length > 0 && $(".js-avail:eq(0)").text().trim().toUpperCase() == "NOT AVAILABLE"){
		avail = 0;
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
	if(pid.split("-").length > 1){
		pid = pid.split("-");
		pid = pid[pid.length - 1];
		if(pid.split("/").length > 1){
			pid = pid.split("/");
			pid = pid[0];
		}
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
	if(pid.split("-").length > 1){
		pid = pid.split("-");
		pid = pid[pid.length - 1];
		if(pid.split("/").length > 1){
			pid = pid.split("/");
			pid = pid[0];
		}
	}
	if(link.split('1mg.com').length < 2){
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
	return bread_final;
}

function getCategory(){
	var categories = getBreadCrumb();
	var category = "";
	return category;
}