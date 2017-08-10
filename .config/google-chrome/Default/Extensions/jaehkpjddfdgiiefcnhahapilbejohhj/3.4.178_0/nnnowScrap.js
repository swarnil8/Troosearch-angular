function getPos(){
	return 2192;
}
function sendPairs(){
	arrayToSend = [];
	if($('.product-grid li').length > 0){
		var slider = $('.product-grid li');
		var sliderLength = slider.length;
		var link = "";
		var price;
		var PID;
		var prod = "";
		var image = "";
		var oos = 100;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			prod = "";
			image = "";
			oos = 100;
			if($('.product-grid li:eq('+ i +')').length > 0 && $('.product-grid li:eq('+ i +') a').attr("ng-href")){
				link = $('.product-grid li:eq('+ i +') a:eq(0)').attr('ng-href');
				if(link != ""){
					if(link.split("nnnow.com").length < 2){
						PID = link;
					}
				}
				else{
					PID = "";
				}
			}
			if(PID != ""){
				if($('.product-grid li:eq('+ i +')').find('.content').length > 0){
					prod = $('.product-grid li:eq('+ i +')').find('.content:eq(0) .brand:eq(0)').text().trim();

					if($('.product-grid li:eq('+ i +')').find('.content:eq(0) .product-name').length > 0){
						prod = prod + " " +$('.product-grid li:eq('+ i +')').find('.content:eq(0) .product-name:eq(0)').text().trim();
					}
					prod = prod.trim();

				}
				if($('.product-grid li:eq('+ i +')').find('.main-img').length > 0){
					image = $('.product-grid li:eq('+ i +')').find('.main-img:eq(0)').attr("lazy-img");
				}
				
				if($('.product-grid li:eq('+ i +')').find('.price .original-price').length > 0){
					price = $('.product-grid li:eq('+ i +')').find('.price .original-price:eq(0)').text();
					price = filter_price(price);
				}
				else if($('.product-grid li:eq('+ i +')').find('.price span').length > 0){
					price = $('.product-grid li:eq('+ i +')').find('.price span:eq(0)').text();
					price = filter_price(price);
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
	if(arrayToSend.length > 0){
		arrayToSend = JSON.stringify(arrayToSend);
		var jsonArr = [{'pairsNNNow': arrayToSend}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(0, jsonArr, 0, doNothing, []);  
	}
}

function sendCurrent(){
	curData = [];   
	var prod = getProd();
	var image = getImage();
	var myPrice = getPrice();
	var cur_url = window.location.href;
	var current_status = 0;
	var link = window.location.href;
	var PID = getPID();
	var breadcrumb_str = getBreadCrumb();
	var avail = getAvailability();
	if(avail == 0){
		current_status = 1;
	}
	else{
		current_status = 0;
	}

	curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
	curData = JSON.stringify(curData);
	var jsonArr = [{'curDataNNNow': curData}];
	jsonArr = JSON.stringify(jsonArr);
	if($("#pdp-page").length > 0){
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
	var barnd = "";
	if($("#pdp-page").length > 0){
		if($("#pdp-page:eq(0) .description").length > 0 && $("#pdp-page:eq(0) .description:eq(0) h1").length > 0){
			brand = $("#pdp-page:eq(0) .description:eq(0) h1:eq(0)").text().trim();
			if($("#pdp-page:eq(0) .description:eq(0) h1").length > 1){
				prod = $("#pdp-page:eq(0) .description:eq(0) h1:eq(1)").text().trim();
			}
		}
	}
	if(brand != ""){
		prod = brand+" "+prod;
		prod = prod.trim();
	}
	if($("#pdp-page").length > 0){
		return prod;
	}
	else{
		return "";
	}
}

function getImage(){
	var image = "";
	if($('.primary-img-container').length > 0 && $('.primary-img-container:eq(0) .primary-img-img.zoom').length > 0){
		image = $('.primary-img-container:eq(0) .primary-img-img.zoom:eq(0)').attr("ng-src").trim();
	}
	return image;
}

function getPrice(){
	price = "";
	if($('.price-container').length > 0 && $('.price-container:eq(0) .original-price').length > 0)
	{
		price = $('.price-container:eq(0) .original-price:eq(0)').text().trim();
	}
	else if($('.price-container').length > 0 && $('.price-container:eq(0) .price').length > 0)
	{
		price = $('.price-container:eq(0) .price:eq(0)').text().trim();
	}
	price = filter_price(price);
	if(isNaN(price)){
		price = 0;
	}
	return price;
}

function getAvailability(){
	var avail = 1;
	if($('.price-container:eq(0) .inStock').length > 0){
		avail = 1;
	}
	else if($('.info-panel:eq(0) .outofstock').length > 0){
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
	if(pid.split(".com/").length > 1){
		pid = pid.split(".com/");
		pid = pid[1];
		if(pid.split("/").length > 1){
			pid = pid.split("/");
			pid = pid[0];
		}
	}
	else{
		pid = "";
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
	if(pid.split(".com/").length > 1){
		pid = pid.split(".com/");
		pid = pid[1];
		if(pid.split("/").length > 1){
			pid = pid.split("/");
			pid = pid[0];
		}
	}
	else{
		pid = 0;
	}
	if(link.split('nnnow.com').length < 2){
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
	return "";
}