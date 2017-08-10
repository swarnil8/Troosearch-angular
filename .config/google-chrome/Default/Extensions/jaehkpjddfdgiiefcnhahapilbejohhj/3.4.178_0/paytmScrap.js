//avail (1 = available, 0 = oos, -1 = permanently disconnected )
$ = jQuery.noConflict();
var arrayMsg = [];
function getISBN(link){
	var isbn = "";
	if(link){
		if(link.split("/p/").length > 1){
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
			link = link.split("/p/");
			link = link[1];

			if(link.split("_").length > 1){
				link = link.split("_");
				link = link[0];

				if(link.split("-").length > 1){
					link = link.split("-");
					link = link[link.length-1];
					if(isValidISBN(link)){
						isbn = link.trim();
					}
				}
			}
		}
		else{
			isbn = "";
		}
	}
	return isbn;
}

function sendPairs(){
	// console.log("entered sendPairs");
	$ = jQuery.noConflict();
	arrayToSend = [];
	if($('.recentlyViewedNew .product-listing').length > 0){
		var slider = $('.recentlyViewedNew .product-listing');
		var sliderLength = slider.length;
		var link = "";
		var price;
		var PID;

		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			if($('.recentlyViewedNew .product-listing:eq('+ i +')').length > 0){
				link = $('.recentlyViewedNew .product-listing:eq('+ i +')').attr("href");
				if(link && link != ""){
					if(link.split("http").length < 2){
						link = "https://paytmmall.com"+link;
					}
					PID = returnPID(link);
					// if(PID.split("?").length > 1){
					// 	PID = PID.split("?");
					// 	PID = PID[0];
					// }
					// if(PID.split("#").length > 1){
					// 	PID = PID.split("#");
					// 	PID = PID[0];
					// }

				}
				else{
					PID = "";
				}
			}

			if(PID != ""){
				if($('.recentlyViewedNew .product-listing:eq('+ i +')').find('.pro-deta .col1').length > 0){
					price = $('.recentlyViewedNew .product-listing:eq('+ i +')').find('.pro-deta:eq(0) .col1:eq(0)').text();
				}
				price = filter_price(price);

			}
			else{
				price = "";
			}
			if(isNaN(price) == true){
				price = "";
			}
			var isbn = getISBN(link);
			if(isbn != "" && prod.trim() != ""){
				prod = prod + " " + isbn;
			}
			if(PID != "" && price != "" && price != 0){
				arrayToSend.push([PID, price]);
			}

		} // for ends1

	}

	if($('.GridItems').length > 0){
		var slider = $('.GridItems');
		var sliderLength = slider.length;
		var link = "";
		var price;
		var PID;
		var PID;
		var prod = "";
		var image = "";
		var oos = 100;

		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			PID;
			prod = "";
			image = "";
			oos = 100;
			if($('.GridItems:eq('+ i +') a').length > 0){
				link = $('.GridItems:eq('+ i +') a:eq(0)').attr("href");
				if(link != ""){
					if(link.split("http").length < 2){
						link = "https://paytmmall.com"+link;
					}
					PID = returnPID(link);
					// if(PID.split("?").length > 1){
					// 	PID = PID.split("?");
					// 	PID = PID[0];
					// }
					// if(PID.split("#").length > 1){
					// 	PID = PID.split("#");
					// 	PID = PID[0];
					// }

				}
				else{
					PID = "";
				}
			}

			if(PID != ""){
				if($('.GridItems:eq('+ i +')').find('img').length > 0){
					prod = $('.GridItems:eq('+ i +')').find('img:eq(0)').attr("alt").trim();
				}
				if($('.GridItems:eq('+ i +')').find('img').attr("ng-src").length > 0){
					image = $('.GridItems:eq('+ i +')').find('img:eq(0)').attr("ng-src");
				}
				else if($('.GridItems:eq('+ i +')').find('img').attr("src").length > 0){
					image = $('.GridItems:eq('+ i +')').find('img:eq(0)').attr("src");
				}
				if($('.GridItems:eq('+ i +')').find('.details li').length > 0){
					price = $('.GridItems:eq('+ i +')').find('.details:eq(0) li:eq(0)').text();
				}
				price = filter_price(price);

			}
			else{
				price = "";
			}
			if(isNaN(price) == true){
				price = "";
			}
			var isbn = getISBN(link);
			if(isbn != "" && prod.trim() != ""){
				prod = prod + " " + isbn;
			}
			if(PID != "" && price != "" && price != 0){
				arrayToSend.push([PID, price, prod, image, oos]);
			}

		} // for ends1

	}


	if($('.carousel a').length > 0){
		var slider = $('.carousel a');
		var sliderLength = slider.length;
		var link = "";
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
			if($('.carousel a:eq('+ i +')').length > 0){
				link = $('.carousel a:eq('+ i +')').attr("href");
				if(link && link != ""){
					if(link.split("http").length < 2){
						link = "https://paytmmall.com"+link;
					}
					PID = returnPID(link);
					// PID = link;
					// if(PID.split("?").length > 1){
					// 	PID = PID.split("?");
					// 	PID = PID[0];
					// }
					// if(PID.split("#").length > 1){
					// 	PID = PID.split("#");
					// 	PID = PID[0];
					// }

				}
				else{
					PID = "";
				}
			}

			if(PID != ""){
				if($('.carousel a:eq('+ i +')').find('img').length > 0){
					prod = $('.carousel a:eq('+ i +')').find('img:eq(0)').attr("alt").trim();
				}
				if($('.carousel a:eq('+ i +')').find('img').attr("ng-src").length > 0){
					image = $('.carousel a:eq('+ i +')').find('img:eq(0)').attr("ng-src");
				}
				else if($('.carousel a:eq('+ i +')').find('img').attr("src").length > 0){
					image = $('.carousel a:eq('+ i +')').find('img:eq(0)').attr("src");
				}
				if($('.carousel a:eq('+ i +')').find('.details li').length > 0){
					price = $('.carousel a:eq('+ i +')').find('.details:eq(0) li:eq(0)').text();
				}
				price = filter_price(price);

			}
			else{
				price = "";
			}
			if(isNaN(price) == true){
				price = "";
			}
			var isbn = getISBN(link);
			if(isbn != "" && prod.trim() != ""){
				prod = prod + " " + isbn;
			}
			if(PID != "" && price != "" && price != 0){
				arrayToSend.push([PID, price, prod, image, oos]);
			}

		} // for ends1

	}


	if($('._2i1r').length > 0){
		var slider = $('._2i1r');
		var sliderLength = slider.length;
		var link = "";
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
			if($('._2i1r:eq('+ i +') a').length > 0){
				link = $('._2i1r:eq('+ i +') a:eq(0)').attr("href");
				if(link && link != ""){
					if(link.split("http").length < 2){
						link = "https://paytmmall.com"+link;
					}
					PID = returnPID(link);
					// PID = link;
					// if(PID.split("?").length > 1){
					// 	PID = PID.split("?");
					// 	PID = PID[0];
					// }
					// if(PID.split("#").length > 1){
					// 	PID = PID.split("#");
					// 	PID = PID[0];
					// }

				}
				else{
					PID = "";
				}
			}

			if(PID != ""){
				if($('._2i1r:eq('+ i +')').find('img').length > 0){
					prod = $('._2i1r:eq('+ i +')').find('img:eq(0)').attr("alt").trim();
				}
				if($('._2i1r:eq('+ i +')').find('img').attr("ng-src")){
					image = $('._2i1r:eq('+ i +')').find('img:eq(0)').attr("ng-src");
				}
				else if($('._2i1r:eq('+ i +')').find('img').attr("src").length > 0){
					image = $('._2i1r:eq('+ i +')').find('img:eq(0)').attr("src");
				}
				if($('._2i1r:eq('+ i +')').find('.qXdv').length > 0 && $('._2i1r:eq('+ i +')').find('.qXdv ._1kMS').length > 0){
					price = $('._2i1r:eq('+ i +')').find('.qXdv:eq(0) ._1kMS:eq(0)').text();
				}
				price = filter_price(price);

			}
			else{
				price = "";
			}
			if(isNaN(price) == true){
				price = "";
			}
			var isbn = getISBN(link);
			if(isbn != "" && prod.trim() != ""){
				prod = prod + " " + isbn;
			}
			if(PID != "" && price != "" && price != 0){
				arrayToSend.push([PID, price, prod, image, oos]);
			}

		} // for ends1

	}
	// console.log("entered sendPairs with"+arrayToSend);

	if(arrayToSend.length > 0){
		arrayToSend = JSON.stringify(arrayToSend);
		var jsonArr = [{'pairsPaytm': arrayToSend}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
}

function sendCurrent(){
	$ = jQuery.noConflict();
	curData = [];
	var prod = "";
	var image = "";
	var price = "";
	var cur_url = "";
	var PID = "";
	var current_status = 0;
	if(getAvailability() == 0){
		current_status = 1;
	}
	else if(getAvailability() == 1){
		current_status = 0;
	}
	var link = window.location.href;
	prod = getProd();


	if($('#midd-container-inner .product-details').length > 0){
		if($('#midd-container-inner .product-details').find('[itemprop="price"]').length > 0)
		{
			price = $('#midd-container-inner .product-details').find('[itemprop="price"]:eq(0)').text().trim();
		}
		if(price != undefined || price != ""){
			price = filter_price(price);
		}
	}

	if(price == "" || price == 0 || price == undefined || isNaN(price)){
		if($('.discraption').length > 0){
			price = $('.discraption:eq(0)').html();
			if(price.split("Buy for").length > 1){
				price = price.split("Buy for");
				price = price[1];
				price = price.split("</span>")[0];
			}
		}
		if(price != undefined || price != ""){
			price = filter_price(price);
		}
	}
	if(price == "" || price == 0 ||  price == undefined || isNaN(price)){
		if($(".img-description .buy-bar .effPric").length > 0){
			price = $(".img-description .buy-bar:eq(0) .effPric:eq(0) span:eq(0)").text().trim();
			price = filter_price(price);
		}
		if(price == "" || price == 0 || price == undefined || isNaN(price)){
			if($('meta[property="og:price:amount"]').length > 0){
				price = $('meta[property="og:price:amount"]').attr('content').trim();
				price = filter_price(price);
			}
		}
		if(price == "" || price == 0 || price == undefined || isNaN(price)){
			if($('.img-description .buy-bar').length > 0){
				price = $('.img-description .buy-bar:eq(0) span:eq(0)').html();
				if(price.split("<").length > 1){
					price = price.split("<");
					price = price[0].trim();
				}
				if(price.toUpperCase().split("BUY FOR ").length > 1){
					price = price.toUpperCase().split("BUY FOR ");
					price = price[1].trim();
					;
					price = filter_price(price);
				}
			}
		}
	}
	if(isNaN(price) == true){
		price = "";
	}

	if($('.img-display-con .shown-image img').length > 0)
	{
		image = $('.img-display-con:eq(0) .shown-image:eq(0) img:eq(0)').attr('src').trim();
	}
	else if($('meta[property="og:image"]').length > 0)
	{
		image = $('meta[property="og:image"]').attr('content').trim();
	}
	else if($('[itemprop="image"]').length > 0 ){
		image = $('[itemprop="image"]').attr('src');
	}

	if(link && link != ""){
		if(link.split("http").length < 2){
			link = "https://paytmmall.com"+link;
		}
		PID = returnPID(link);
	}
	else{
		PID = "";
	}

	cur_url = window.location.href;
	var isbn = getISBN(cur_url);
	if(isbn != "" && prod.trim() != ""){
		prod = prod + " " + isbn;
	}
	if( PID!=""){
		var breadcrumbF = getBreadCrumb();
		curData.push([prod, image, price, cur_url, current_status, PID, breadcrumbF, 1]);
		curData = JSON.stringify(curData);
		var jsonArr = [{'curDataPaytm': curData}];
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
	//console.log("iwas called now" + $('#midd-container-inner .product-details').length);
	var prod = "";
	if(document.querySelectorAll('h1').length > 0){
		prod = document.querySelector('h1').innerText;
	}
	else if($(".img-description h1").length > 0){
		prod = $(".img-description h1:eq(0)").text().trim();
	}
	else if($('#midd-container-inner .product-details').length > 0){
		if($('#midd-container-inner .product-details').find('[itemprop="name"]').length > 0)
		{
			prod = $('#midd-container-inner .product-details').find('[itemprop="name"]').text().trim();
			//console.log("prod1: "+prod);


		}

	}
	else if($('h2').length > 0)
	{
		prod = $("h2:eq(0)").text().trim();
		//console.log("prod2: "+prod);


	}
	if($(".img-description h1").length > 0){
		prod = $(".img-description h1:eq(0)").text().trim();
	}
	if($('.product').length>0 || $('meta[property="og:type"]').attr('content') == "product"){
		return prod;
	}
	else {
		return "";
	}
	// if(prod!="" && prod!= undefined && typeof(prod)!="undefined"){
	// 	title = prod;
	// 	return prod;
	// }
}


function getImage(){
	var image = "";
	if($('.img-display-con .shown-image img').length > 0)
	{
		image = $('.img-display-con:eq(0) .shown-image:eq(0) img:eq(0)').attr('src').trim();
	}
	else if($('#midd-container-inner .product-images img').length > 0)
	{
		image = $('#midd-container-inner .product-images img').attr('src');
	}
	else if($('meta[property="og:image"]').length > 0)
	{
		image = $('meta[property="og:image"]').attr('content').trim();
	}
	// //console.log("image: "+image);
	return image;
}

function getPrice(){
	price = "";

	if($('#midd-container-inner .product-details').length > 0){
		if($('#midd-container-inner .product-details').find('[itemprop="price"]').length > 0)
		{
			price = $('#midd-container-inner .product-details').find('[itemprop="price"]:eq(0)').text().trim();
		}
		if(price != undefined || price != ""){
			price = filter_price(price);
		}
	}

	if(price == "" || price == 0 || price == undefined || isNaN(price)){
		if($('.discraption').length > 0){
			price = $('.discraption:eq(0)').html();
			if(price.split("Buy for").length > 1){
				price = price.split("Buy for");
				price = price[1];
				price = price.split("</span>")[0];
			}
		}
		if(price != undefined || price != ""){
			price = filter_price(price);
		}
	}
	if(price == "" || price == 0 ||  price == undefined || isNaN(price)){
		if($(".img-description .buy-bar .effPric").length > 0){
			price = $(".img-description .buy-bar:eq(0) .effPric:eq(0) span:eq(0)").text().trim();
			price = filter_price(price);
		}
		if(price == "" || price == 0 || price == undefined || isNaN(price)){
			if($('meta[property="og:price:amount"]').length > 0){
				price = $('meta[property="og:price:amount"]').attr('content').trim();
				price = filter_price(price);
			}
		}
		if(price == "" || price == 0 || price == undefined || isNaN(price)){
			if($('.img-description .buy-bar').length > 0){
				price = $('.img-description .buy-bar:eq(0) span:eq(0)').html();
				if(price.split("<").length > 1){
					price = price.split("<");
					price = price[0].trim();
				}
				if(price.toUpperCase().split("BUY FOR ").length > 1){
					price = price.toUpperCase().split("BUY FOR ");
					price = price[1].trim();
					;
					price = filter_price(price);
				}
			}
		}
	}
	if(isNaN(price) == true){
		price = "";
	}
	return price;
}

function getAvailability(){
	var avail = 1;

	// if($('.error:eq(1).ng-hide').length > 0){
	// 	avail = 1;
	// }
	// else if($('.error:eq(1).ng-hide').length == 0){
	// 	avail = 1;
	// }
	if($(".img-description .buy-bar button").attr("disabled") == "disabled"){
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
	if(pid.split(".com/").length>1){
		pid = pid.split(".com/");
		pid = pid[1];
	}
	if(pid.split("shop/p/").length>1){
		pid = pid.split("shop/p/");
		pid = pid[1];
	}
	// if(pid.split("-pdp").length>1){
	// 	pid = pid.split("-pdp");
	// 	pid = pid[0];
	// }
	// else{
	// 	pid = "";
	// }
	if(pid.split("/shop/g/").length > 1){
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
	if(pid.split(".com/").length>1){
		pid = pid.split(".com/");
		pid = pid[1];
	}
	if(pid.split("shop/p/").length>1){
		pid = pid.split("shop/p/");
		pid = pid[1];
	}
	// if(pid.split("-pdp").length>1){
	// 	pid = pid.split("-pdp");
	// 	pid = pid[0];
	// }
	// else{
	// 	pid = "";
	// }
	if(link.split('.com').length < 2){
		pid = "";
	}
	if(link == ""){
		pid = "";
	}
	if(link.split("/shop/g/").length > 1){
		pid = "";
	}
	return pid;
}

function getBreadCrumb(){
	var breadcrumb = "";
	var bread_final = "";



	var len_bread = $('.Tk9i').length;

	for(i=0;i<len_bread;i++){
		breadcrumb = $('.Tk9i:eq('+ i +')').text().trim();
		bread_final += breadcrumb + "*~";
	}

	if(bread_final == ""){
		var len_bread = $('.breadcrumbs-highlight li').length;

		for(i=0;i<len_bread;i++){
			breadcrumb = $('.breadcrumbs-highlight li:eq('+ i +')').text().trim();
			bread_final += breadcrumb + "*~";
		}
	}

	if(bread_final == ""){
		len_bread = $('.breadcrum li').length;

		for(i=0;i<len_bread;i++){
			breadcrumb = $('.breadcrum li:eq('+ i +')').text().trim();
			if(breadcrumb.split("/").length > 1){
				breadcrumb = breadcrumb.split("/");
				breadcrumb = breadcrumb[0].trim();
			}

			bread_final += breadcrumb + "*~";
		}
	}
	return bread_final;

}
function getModel(){
	var model = "";
	if($(".ProductDescription .heading").length > 0){
		var head_len = $(".ProductDescription .heading").length;
		for(var i=0;i<head_len;i++){
			if($(".ProductDescription .heading:eq("+i+")").text().trim().toUpperCase() == "GENERAL"){
				var model_len = $(".ProductDescription .heading:eq("+i+")").parent().find(".col1").length;

				for(var j=0;j<model_len;j++){

					if($(".ProductDescription .heading:eq("+i+")").parent().find(".col1:eq("+j+")").text().trim().toUpperCase() == "MODEL ID"){

						model = $(".ProductDescription .heading:eq("+i+")").parent().find(".col1:eq("+j+")").parent().find("span:eq(1)").text().trim();
						break;
					}
					else{
						model = "";
					}
				}

			}
		}
	}
	return model;
}

function getColor(){
	var color = "";
	if($(".ProductDescription .heading").length > 0){
		var head_len = $(".ProductDescription .heading").length;
		for(var i=0;i<head_len;i++){
			if($(".ProductDescription .heading:eq("+i+")").text().trim().toUpperCase() == "GENERAL"){
				var color_len = $(".ProductDescription .heading:eq("+i+")").parent().find(".col1").length;

				for(var j=0;j<color_len;j++){

					if($(".ProductDescription .heading:eq("+i+")").parent().find(".col1:eq("+j+")").text().trim().toUpperCase() == "COLOR"){

						color = $(".ProductDescription .heading:eq("+i+")").parent().find(".col1:eq("+j+")").parent().find("span:eq(1)").text().trim();
						break;
					}
					else{
						color = "";
					}
				}

			}
		}
	}
	return color;
}

function getIntStorage(){
	var intMem = "";
	if($(".ProductDescription .heading").length > 0){
		var head_len = $(".ProductDescription .heading").length;
		for(var i=0;i<head_len;i++){
			if($(".ProductDescription .heading:eq("+i+")").text().trim().toUpperCase() == "GENERAL"){
				var intMem_len = $(".ProductDescription .heading:eq("+i+")").parent().find(".col1").length;

				for(var j=0;j<intMem_len;j++){

					if($(".ProductDescription .heading:eq("+i+")").parent().find(".col1:eq("+j+")").text().trim().toUpperCase() == "INTERNAL MEMORY"){

						intMem = $(".ProductDescription .heading:eq("+i+")").parent().find(".col1:eq("+j+")").parent().find("span:eq(1)").text().trim();
						break;
					}
					else{
						intMem = "";
					}
				}

			}
		}
	}
	return intMem;
}

function sendMobile(){
	var breadCrumb = getBreadCrumb();
	//console.log("getBreadCrumb: " + breadCrumb);
	if(breadCrumb.split("*~").length > 1 && breadCrumb.split("*~")[2].trim().toUpperCase() == "MOBILES" && getProd() != ""){
		var PID = getPID();
		var pos = 1331;
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
		//console.log("jsonArr: "+jsonArr);
		sendMessage(1, jsonArr, 19, doNothing, []);

	}
}
sendMobile();
// function sendCoupon(){
// 	$ = jQuery.noConflict();
// 	couponToSend = [];
// 	var cur_link = window.location.href;

// 	if(cur_link.split("/shop/p/").length > 1){

// 		if($('.product-details .offer-tc').length > 0){
// 			var slider = $('.product-details .offer-tc');
// 			var sliderLength = slider.length;
// 			var couponUrl = "";
// 			var couponCode = "";
// 			var couponText = "";
// 			var couponDesc = "";
// 			var couponExp = 0;
// 			var couponAt = 1331;

// 			for(i=0;i<sliderLength;i++){
// 				couponUrl = cur_link;
// 				couponCode = "";
// 				couponText = "";
// 				couponDesc = "";

// 				if($('.product-details .offer-tc:eq('+ i +')').parent().find(".orangetxt").length > 0){
// 					couponCode = $('.product-details .offer-tc:eq('+ i +')').parent().find(".orangetxt:eq(0)").text().trim();
// 				}

// 				if($('.product-details .offer-tc:eq('+ i +')').parent().find(".grey").length > 0){
// 					couponText = $('.product-details .offer-tc:eq('+ i +')').parent().find(".grey:eq(0)").text().trim();
// 				}

// 				if(couponCode != ""){
// 					couponToSend.push([couponCode, couponText, couponExp, couponUrl, couponDesc, couponAt]);
// 				}

// 			}

// 		}

// 	}

// 	if(cur_link.split("offer/termsconditions").length > 1){

// 		if($('#primary .col-md-4').length > 0){
// 			var slider = $('#primary .col-md-4');
// 			var sliderLength = slider.length;
// 			var couponUrl = "";
// 			var couponCode = "";
// 			var couponText = "";
// 			var couponDesc = "";
// 			var couponExp = 0;
// 			var couponAt = 1331;

// 			for(i=0;i<sliderLength;i++){
// 				couponUrl = cur_link;
// 				couponCode = "";
// 				couponText = "";
// 				couponDesc = "";

// 				if($('#primary .col-md-4:eq('+ i +')').find("tr").length > 0){
// 					couponCode = $('#primary .col-md-4:eq('+ i +')').find("tr:eq(1) td:eq(0) span:eq(0)").text().trim();
// 					couponText = $('#primary .col-md-4:eq('+ i +')').find("tr:eq(0) td:eq(0)").text().trim();
// 				}

// 				if(couponCode != ""){
// 					couponToSend.push([couponCode, couponText, couponExp, couponUrl, couponDesc, couponAt]);
// 				}

// 			}

// 		}

// 	}
// }



// /////////////// WISH TO WATCH LIST STARTS ///////////////

var wish_call = "";
var cur_url = window.location.href;
function importWishPay(){
	if((cur_url.split("paytm.com").length > 1) && $('.proWishList').length>0 && $("#importHatke").length == 0){
		importWishGlobal('.proWishList:eq(0)', 'before', paytmWishList);

		if($("#importHatke").length > 0){
			$("#importHatke").css("float","right");
		}
	}
	else{
		setTimeout(function(){importWishPay();}, 2500);
	}
}



function paytmWishList(){
	clearInterval(wish_call);
	wishListPaytm = [];
	var link = "";
	var url = "";
	var prod = "";
	var image = "";
	var price = "";
	var PID = "";
	var pos = 1331;
	var brand = "";
	var till_wl = 0;
	if($('#grid .bigContainer:eq(0) .fl').length > 0) {
		var slider = $('#grid .bigContainer:eq(0) .fl');
		var sliderLength = $('#grid .bigContainer:eq(0) .fl').length;

		for(i=0;i<sliderLength;i++){
			link = "";
			url = "";
			prod = "";
			image = "";
			price = "";
			PID = "";
			if($('#grid .bigContainer:eq(0) .fl:eq('+ i +') a').length > 0){
				link = $('#grid .bigContainer:eq(0) .fl:eq('+ i +') a:eq(0)').attr('href');
				url = link;
				if(link.split("paytmmall.com").length < 2){
					link = "https://paytmmall.com"+link;
					url = link;
				}

				PID = returnPID(link);
			}
			else{
				link = "";
				PID = "";
			}
			price = 0;

			if($('#grid .bigContainer:eq(0) .fl:eq('+ i +')').find('.details').length > 0){
				prod =$('#grid .bigContainer:eq(0) .fl:eq('+ i +')').find('.details').find("div:eq(0)").text().trim();
				if(prod.split("...").length > 1){
					prod = prod.split("...");
					prod = prod[0].trim();
				}
			}

			if($('#grid .bigContainer:eq(0) .fl:eq('+ i +')').find('.item img').length > 0 && $('#grid .bigContainer:eq(0) .fl:eq('+ i +')').find('.item img').attr("ng-src")){
				image = $('#grid .bigContainer:eq(0) .fl:eq('+ i +')').find('.item:eq(0) img:eq(0)').attr('ng-src').trim();
			}
			if($('#grid .bigContainer:eq(0) .fl:eq('+ i +')').find('.details').length > 0 && $('#grid .bigContainer:eq(0) .fl:eq('+ i +')').find('.details').parent().find('ul').length > 0){
				price = $('#grid .bigContainer:eq(0) .fl:eq('+ i +')').find('.details').parent().find('ul:eq(0) li:eq(0)').text().trim();
				price = filter_price(price);
			}

			if(PID != "" && PID != 0 && price != "" && !isNaN(price)){
				wishListPaytm.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
			}
		}
		wishJson = JSON.stringify(wishListPaytm);
		var jsonArr = [{'wishList': wishJson}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(1, jsonArr, 17, alertWLResp, []);
	}

}
function alertWLResp(data){
	alert(data);
}

function getAppliedCpn(){
	var cur_url = window.location.href;
	if(cur_url.split("paytm.com/cart").length > 1){
		if(document.getElementsByClassName("cartpromo").length > 0){
			var len = document.getElementsByClassName("cartpromo").length-1;
			var checkPick = ".cartpromo:eq("+len+") .promo-text";
			var selector = ".cartpromo:eq("+len+") .promo-text";
			var attr = "";
			var webID = 1331;
			var homeLink = "https://www.paytm.com/";
			pickAppliedCpn(checkPick, selector, attr, webID, homeLink);
		}
		else{
			setTimeout(getAppliedCpn, 1000);
		}
	}
}
getAppliedCpn();
var api = "";
function applyCpnInitiate(){
	var cur_url = window.location.href;
	if(cur_url.split("paytm.com/cart").length > 1){
		if($(".payment-summary").length > 0 && $("#couponClick").length == 0){
			var selectorACIcon = ".payment-summary:eq(0)";
			var position = "after";
			var parent = "none";
			var method = "POST";
			api = "https://paytm.com/v1/api/cart?child_site_id=1&site_id=1";
			var postFields = {"promocode":"**", "action":"applypromo", "channel":"web", "version":2};
			var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, 'site': 14}];
			details = JSON.stringify(details);
			displayACIcon(selectorACIcon, parent, position, 14, details);
			keepCheckingACIcon(selectorACIcon, parent, position, 14, details);

			if(localStorage.showFinalSavings && localStorage.showFinalSavings == 1){
				displayFinalSavings();
				$(".hk-aCoup__netSavings b:eq(0)").text(localStorage.bestSaving);
				$(".hk-js-autoCoup__bestCouponTill").text(localStorage.bestCoupon.toUpperCase());
			}
		}
		else{
			setTimeout(applyCpnInitiate, 1000);
		}
	}

	if(cur_url.split("paytm.com/coupons").length > 1){
		$('body').append("<div id='cart_items' style='display:none;'></div>")
		var scr = document.createElement("script");
		scr.type="text/javascript";
		var a = "document.getElementById('cart_items').innerHTML= localStorage.cart";
		scr.innerHTML = a;
		document.body.appendChild(scr);
		if(($("#couponsDetails").length > 0 || $(".pjke").length > 0) && $("#couponClick").length == 0){
			if($("#couponsDetails").length > 0){
				var selectorACIcon = "#couponsDetails";
				var position = "after";
			}
			else {
				var selectorACIcon = ".pjke:eq(0)";
				var position = "append";
			}
			var parent = "none";
			var method = "POST";
			api = "https://paytm.com/papi/v1/expresscart/verify?channel=web&version=2&child_site_id=1&site_id=1&utm_source=/papi/v1/expresscart/verify";
			var postFields = {"promocode":"**", "action":"applypromo", "channel":"web", "version":2};
			var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, 'site': 29}];
			details = JSON.stringify(details);
			displayACIcon(selectorACIcon, parent, position, 29, details);
			if(localStorage.showFinalSavings && localStorage.showFinalSavings == 1){
				displayFinalSavings();
				$(".hk-aCoup__netSavings b:eq(0)").text(localStorage.bestSaving);
				$(".hk-js-autoCoup__bestCouponTill").text(localStorage.bestCoupon.toUpperCase());
			}
		}
		else{
			setTimeout(applyCpnInitiate, 1000);
		}
	}
}
applyCpnInitiate();
savings = [];
bestSaving = 0;
bestCoupon = "";
bestEcash = 0;
bestECoupon = "";

function startSaving(data){
	$ = jQuery.noConflict();
	data = JSON.parse(data);
	var nowCode = "";
	var csaving = 0;
	var ecashsaving = 0;
	var nowSaving = "";
	var resp = data[0].data;
	var code = data[0].code.trim();
	nowCode = code;
	var cpnMsg = "";
	var savingsObject = {};
	if(resp != "" && code != ""){
		if(resp.status && resp.status.result && resp.status.result == "success" || (resp.cart && resp.cart.promostatus && resp.cart.promostatus == "success")){
			if(resp.cart && resp.cart.paytm_discount){
				csaving = resp.cart.paytm_discount;
				csaving = filter_price(csaving);
			}
			if(resp.cart && resp.cart.paytm_cashback){
				ecashsaving = resp.cart.paytm_cashback;
				ecashsaving = filter_price(ecashsaving);
			}
			if(ecashsaving == 0 && csaving == 0 && (resp.cart && resp.cart.promostatus && resp.cart.promostatus == "success")){
				ecashsaving = 1;
			}

			// if(resp.cart && resp.cart.promofailuretext){
			// 	cpnMsg = resp.cart.promofailuretext;
			// 	setCookie("HKCode~"+code, cpnMsg, 1);
			// }

			if(isNaN(csaving)){
				csaving = 0
			}
			else if(csaving > bestSaving){
				bestSaving = csaving;
				bestCoupon = code;
			}
			if(isNaN(ecashsaving)){
				ecashsaving = 0
			}
			else if(ecashsaving > bestEcash){
				bestEcash = ecashsaving;
				bestECoupon = code;
			}
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
}


// function applyBestCoupon(){
// 	console.log("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
// 	console.log("applyBest was called with ecode : "+bestECoupon+ " savings : "+bestEcash);
// 	$ = jQuery.noConflict();
// 	if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "") || (parseInt(bestEcash) != 0 && bestECoupon.trim() != "")){

// 		if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
// 			var applyBestCode = bestCoupon;
// 		}
// 		else{
// 			var applyBestCode = bestECoupon.trim();
// 			bestSaving = bestEcash;
// 			bestCoupon = bestECoupon;
// 		}
// 		if(document.getElementsByClassName("remo").length > 0){
// 			document.getElementsByClassName("remo")[0].click();
// 		}
// 		else if($(".code").length > 0 && $(".code:eq(0) i").length > 0){
// 			document.getElementsByClassName("code")[0].getElementsByTagName("i")[0].click();
// 		}
// 		var cur_url = window.location.href;
// 		if(cur_url.split("paytm.com/coupons").length > 1){
// 			if($("#input_1").length > 0 && $(".apply").length > 0 && $(".apply a").length > 0 && $(".apply a.ng-hide").length == 0){
// 				// $("#input_1").val(applyBestCode.trim());
// 				displayFinalCouponCopy();
// 				// document.getElementsByClassName("apply")[0].getElementsByTagName("a")[0].click();
// 			}
// 			else if($(".apply-link").length > 0){
// 				setTimeout(applyBestCoupon, 1000);
// 			}
// 		}
// 		else if(cur_url.split("paytm.com/cart").length > 1){
// 			if($("#input_1").length > 0 && $(".apply-link").length > 0 && $(".apply-link.ng-hide").length == 0){
// 				// $("#input_1").val(applyBestCode.trim());
// 				displayFinalCouponCopy();
// 				// document.getElementsByClassName("apply-link")[0].click();
// 			}
// 			else if($(".apply-link").length > 0){
// 				setTimeout(applyBestCoupon, 1000);
// 			}
// 		}
// 	}
// 	else{
// 		displayNoSavings();
// 		console.log("Show no savings popup");
// 	}
// }


function applyBestCoupon(){
	setTimeout(function(){
		var cur_url = window.location.href;
		var finalPostFieldSpcl1 = {};

	// var allCoupons = localStorage.getCoupons;
	// allCoupons = allCoupons.split("~");
	// for(var all=0;all<allCoupons.length-1;all++){
	// 	var cookieCpn = "HKCode~"+allCoupons[all].trim();
	// 	if(getCookie(cookieCpn)){
	// 		arrayMsg.push([allCoupons[all], encodeURIComponent(getCookie(cookieCpn)), 1331]);
	// 		setCookie(cookieCpn, 0, -1);
	// 	}
	// }
	// arrayMsg = JSON.stringify(arrayMsg);
	// var jsonArr = [{'cpn_msg': arrayMsg}];
	// jsonArr = JSON.stringify(jsonArr);
	// sendMessage(1, jsonArr, 12, doNothing, []);

	if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
		var applyBestCode = bestCoupon;
	}
	else{
		var applyBestCode = bestECoupon.trim();
		bestSaving = bestEcash;
		bestCoupon = bestECoupon;
	}
	localStorage.bestSaving = bestSaving;
	localStorage.bestCoupon = bestCoupon;
	if(document.getElementsByClassName("remo").length > 0){
		document.getElementsByClassName("remo")[0].click();
	}
	else if($(".code").length > 0 && $(".code:eq(0) i").length > 0){
		// document.getElementsByClassName("code")[0].getElementsByTagName("i")[0].click();
	}

	if(cur_url.split("paytm.com/cart").length > 1){
		finalPostFieldSpcl1["promocode"] = applyBestCode;
		finalPostFieldSpcl1["action"] = "applypromo";
		finalPostFieldSpcl1["channel"] = "channel";
		finalPostFieldSpcl1["version"] = 2;
		finalPostFieldSpcl1 = JSON.stringify(finalPostFieldSpcl1);
	}
	else if(localStorage.cart){
		var cartItems = localStorage.cart;
		cartItems1 = JSON.parse(cartItems).cart_items;
		finalPostFieldSpcl1["cart_items"] = cartItems1;
		finalPostFieldSpcl1["promocode"] = applyBestCode.trim();
		finalPostFieldSpcl1 = JSON.stringify(finalPostFieldSpcl1);
		// console.log(finalPostFieldSpcl1);
	}
	else{
		finalPostFieldSpcl1 = finalPostField;
	}
	var authorizationToken = document.cookie;
	if(authorizationToken.split("XSRF-TOKEN=").length > 1){
		authorizationToken = authorizationToken.split("XSRF-TOKEN=");
		authorizationToken = authorizationToken[1];
		authorizationToken = authorizationToken.split(";");
		authorizationToken = authorizationToken[0].trim();
	}
	else{
		authorizationToken = "";
	}
	$.ajax({
		type: "POST",
		beforeSend: function(request) {
			request.setRequestHeader("x-xsrf-token", authorizationToken);
			request.setRequestHeader("x-csrf-token", authorizationToken);
		},
		url: api,
		dataType: "json",
		data: finalPostFieldSpcl1,
		contentType: "application/json;  charset=utf-8"
	})
	.success(function(data1){
		localStorage.showFinalSavings = 1;
		localStorage.acStarted = 0;
		if(cur_url.split("paytm.com/coupons").length == 1){
			displayFinalSavings();
			window.location.reload();
		}
		else{
			displayFinalCouponCopy();
		}
	})
	.fail(function(data){
		setTimeout(function(){console.log("calling");applyBestCoupon();},5000);
		// applyBestCoupon();
		// displayNoSavings();
	});
}, 2000);
}
