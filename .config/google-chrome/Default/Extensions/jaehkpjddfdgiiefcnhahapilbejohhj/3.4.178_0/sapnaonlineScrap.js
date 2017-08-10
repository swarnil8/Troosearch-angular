function getPos(){
	return 451;
}
function getISBN(link){
	var isbn = "";
	if(link){
		if(link.split("#").length > 1){
			link = link.split("#");
			link = link[0];
		}
		if(link.split("?").length > 1){
			link = link.split("?");
			link = link[0];
		}
		if(link.split("&").length > 1){
			link = link.split("&");
			link = link[0];
		}
		if(link.split("-").length > 1){
			link = link.split("-");
			link = link[link.length-1];

			if(link.split("/").length > 1){
				link = link.split("/");
				link = link[0];
			}

			if(isValidISBN(link.toString())){
				isbn = link.trim();
			}
		}
	}
	return isbn;
}
function sendPairs(){
	arrayToSend = [];
	if($('.slide-sapna').length > 0){
		var slider = $('.slide-sapna');
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
			if($('.slide-sapna:eq('+ i +')').length > 0 && $('.slide-sapna:eq('+ i +') a').attr("href")){
				link = $('.slide-sapna:eq('+ i +') a:eq(0)').attr('href');
				if(link != ""){
					if(link.split("sapnaonline.com").length > 1){
						PID = returnPID(link);
					}
				}
				else{
					PID = "";
				}
			}
			if(PID != ""){
				if($('.slide-sapna:eq('+ i +')').find('img').length > 0 && $('.slide-sapna:eq('+ i +')').find('img:eq(0)').attr("alt")){
					prod = $('.slide-sapna:eq('+ i +')').find('img:eq(0)').attr("alt").trim();
				}
				if($('.slide-sapna:eq('+ i +')').find('img').length > 0 && $('.slide-sapna:eq('+ i +')').find('img:eq(0)').attr("data-href")){
					image = $('.slide-sapna:eq('+ i +')').find('img:eq(0)').attr("data-href");
				}
				else if($('.slide-sapna:eq('+ i +')').find('img').length > 0 && $('.slide-sapna:eq('+ i +')').find('img:eq(0)').attr("src")){
					image = $('.slide-sapna:eq('+ i +')').find('img:eq(0)').attr("src");
				}
				
				if($('.slide-sapna:eq('+ i +')').find('.price-f').length > 0){
					if($('.slide-sapna:eq('+ i +')').find('.price-f .sapna-striked').length > 0){
						var price_div = $('.slide-sapna:eq('+ i +')').find('.price-f').clone();
						$(price_div).find(".sapna-striked").remove();
						price = $(price_div).text().trim();
						price = filter_price(price);
					}
					else if($('.slide-sapna:eq('+ i +')').find('.price-f').length > 0){
						var price = $('.slide-sapna:eq('+ i +')').find('.price-f').text().trim();
						price = filter_price(price);
					}
				}
			}
			else{
				price = "";
			}
			var isbn = getISBN(link);
			if(isbn != "" && prod != ""){
				prod = prod + " " + isbn;
			}

			if(PID != "" && price != ""){
				arrayToSend.push([PID, price, prod, image, oos]);
			}

		}
	}

	if($('.product-book-list-view').length > 0){
		var slider = $('.product-book-list-view');
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
			if($('.product-book-list-view:eq('+ i +')').length > 0 && $('.product-book-list-view:eq('+ i +') a').attr("href")){
				link = $('.product-book-list-view:eq('+ i +') a:eq(0)').attr('href');
				if(link != ""){
					if(link.split("sapnaonline.com").length > 1){
						PID = returnPID(link);
					}
				}
				else{
					PID = "";
				}
			}
			if(PID != ""){
				if($('.product-book-list-view:eq('+ i +')').find('img').length > 0 && $('.product-book-list-view:eq('+ i +')').find('img:eq(0)').attr("alt")){
					prod = $('.product-book-list-view:eq('+ i +')').find('img:eq(0)').attr("alt").trim();
				}
				if($('.product-book-list-view:eq('+ i +')').find('img').length > 0 && $('.product-book-list-view:eq('+ i +')').find('img:eq(0)').attr("data-href")){
					image = $('.product-book-list-view:eq('+ i +')').find('img:eq(0)').attr("data-href");
				}
				else if($('.product-book-list-view:eq('+ i +')').find('img').length > 0 && $('.product-book-list-view:eq('+ i +')').find('img:eq(0)').attr("src")){
					image = $('.product-book-list-view:eq('+ i +')').find('img:eq(0)').attr("src");
				}
				
				if($('.product-book-list-view:eq('+ i +')').find('.actual-price').length > 0){
					var price = $('.product-book-list-view:eq('+ i +')').find('.actual-price').text().trim();
					price = filter_price(price);
				}


				if($('.product-book-list-view:eq('+ i +')').find('.attr-in-stock').length > 0 && $('.product-book-list-view:eq('+ i +')').find('.attr-in-stock').text().toUpperCase().trim().split("- IN STOCK").length > 1){
					oos = 0;
				}
				else if($('.product-book-list-view:eq('+ i +')').find('.attr-no-stock').length > 0){
					oos = 1;
				}
				
			}
			else{
				price = "";
			}
			var isbn = getISBN(link);
			if(isbn != "" && prod != ""){
				prod = prod + " " + isbn;
			}
			if(PID != "" && price != ""){
				arrayToSend.push([PID, price, prod, image, oos]);
			}

		}
	}
	if(arrayToSend.length > 0){
		arrayToSend = JSON.stringify(arrayToSend);
		var jsonArr = [{'pairsSapnaonline': arrayToSend}];
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

	var isbn = getISBN(cur_url);
	if(isbn != "" && prod != ""){
		prod = prod + " " + isbn;
	}

	curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
	curData = JSON.stringify(curData);
	var jsonArr = [{'curDataSapnaonline': curData}];
	jsonArr = JSON.stringify(jsonArr);
	if($("#product-main-primary").length > 0){
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
	if($("#product-main-title").length > 0){
		prod = $("#product-main-title").text().trim();
	}
	if($("#product-main-primary").length > 0){
		return prod;
	}
	else{
		return "";
	}
}

function getImage(){
	var image = "";
	if($('#product-image-main').length > 0 && $('#product-image-main').attr("data-zoom-image")){
		image = $('#product-image-main').attr("data-zoom-image").trim();
	}
	else if($('#product-image-main').length > 0 && $('#product-image-main').attr("src")){
		image = $('#product-image-main').attr("src").trim();
	}
	return image;
}

function getPrice(){
	price = "";
	if($('#product-details-pricing').length > 0 && $('#product-details-pricing:eq(0) .final-price').length > 0)
	{
		price = $('#product-details-pricing:eq(0) .final-price:eq(0)').text().trim();
	}
	price = filter_price(price);
	if(isNaN(price)){
		price = 0;
	}
	return price;
}

function getAvailability(){
	var avail = 1;
	if($('#product-details-pricing .out-of-stock').length > 0){
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
	}
	else{
		pid = 0;
	}
	if(link.split('sapnaonline.com').length < 2){
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