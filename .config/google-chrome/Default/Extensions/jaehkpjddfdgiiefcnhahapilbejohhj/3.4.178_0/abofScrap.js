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


function sendPairs(){
	arrayToSend = [];

	if($('.product').length > 0){
		var slider = $('.product');
		var sliderLength = slider.length;
		var link;
		var price;
		var PID;
		var brand = "";
		var prod = "";
		var image = "";
		var oos = 100;

		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			brand = "";
			prod = "";
			image = "";
			oos = 100;

			if($('.product:eq('+ i +') a').length > 0){
				link = $('.product:eq('+ i +') a:eq(0)').attr("href");
				if(link.split("abof.com").length < 2){
					link = "http://www.abof.com" + link;
				}
				if(link != ""){
					PID = returnPID(link);

				}
				else{
					PID = "";
				}
			}

			if(PID != ""){

				if($('.product:eq('+ i +')').find('.product__title').length > 0){
					prod = $('.product:eq('+ i +')').find('.product__title:eq(0)').text().trim();
				}

				if($('.product:eq('+ i +')').find('.product__thumbnail').length > 0){
					image = $('.product:eq('+ i +')').find('.product__thumbnail:eq(0)').attr("data-src").trim();
					if(image.split(",").length > 1){
						image = image.split(",");
						image = trim(image[1]);
					}
					if(image.split("http").length < 2){
						image = "http:" + image;
					}
					if(image.split("data:image/gif").length > 1){
						image = "";
					}
				}

				if($('.product:eq('+ i +')').find('.prices__price--selling').length > 0){
					price = $('.product:eq('+ i +')').find('.prices__price--selling:eq(0)').text().trim();
					price = filter_price(price);
				}
				else{
					price = "";
				}
				if(isNaN(price)){
					price = 0;
				}
			}
			else{
				price = "";
			}

			if(PID != "" && price != "" && price != 0){
				arrayToSend.push([PID, price, prod, image, oos]);
			}

    } // for ends1

  }

  if($('.product-grid__wrapper').length > 0 && $('.product-grid__wrapper .product-card').length > 0){
  	var slider = $('.product-grid__wrapper .product-card');
  	var sliderLength = slider.length;
  	var link;
  	var price;
  	var PID;
  	var brand = "";
  	var prod = "";
  	var image = "";
  	var oos = 100;

  	for(i=0;i<sliderLength;i++){
  		price = "";
  		PID = "";
  		brand = "";
  		prod = "";
  		image = "";
  		oos = 100;

  		if($('.product-grid__wrapper .product-card:eq('+ i +') a').length > 0){
  			link = $('.product-grid__wrapper .product-card:eq('+ i +') a:eq(0)').attr("href");
  			if(link.split("abof.com").length < 2){
  				link = "http://www.abof.com" + link;
  			}
  			if(link != ""){
  				PID = returnPID(link);

  			}
  			else{
  				PID = "";
  			}
  		}

  		if(PID != ""){

  			if($('.product-grid__wrapper .product-card:eq('+ i +')').find('.product-card__title').length > 0){
  				prod = $('.product-grid__wrapper .product-card:eq('+ i +')').find('.product-card__title:eq(0)').text().trim();
  			}

  			if($('.product-grid__wrapper .product-card:eq('+ i +')').find('.product-card__thumbnail').length > 0){
  				image = $('.product-grid__wrapper .product-card:eq('+ i +')').find('.product-card__thumbnail:eq(0)').attr("data-src").trim();
  				if(image.split(",").length > 1){
  					image = image.split(",");
  					image = trim(image[1]);
  				}
  				if(image.split("http").length < 2){
  					image = "http:/" + image;
  				}
  				if(image.split("data:image/gif").length > 1){
  					image = "";
  				}
  			}

  			if($('.product-grid__wrapper .product-card:eq('+ i +')').find('.prices__price--selling').length > 0){
  				price = $('.product-grid__wrapper .product-card:eq('+ i +')').find('.prices__price--selling:eq(0)').text().trim();
  				price = filter_price(price);
  			}
  			else{
  				price = "";
  			}
  			if(isNaN(price)){
  				price = 0;
  			}
  		}
  		else{
  			price = "";
  		}

  		if(PID != "" && price != "" && price != 0){
  			arrayToSend.push([PID, price, prod, image, oos]);
  		}

    } // for ends1

  }

  if(arrayToSend.length > 0){
  	arrayToSend = JSON.stringify(arrayToSend);
  	var jsonArr = [{'pairsABOF': arrayToSend}];
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
	curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumbF]);
	curData = JSON.stringify(curData);
	var jsonArr = [{'curDataABOF': curData}];
	jsonArr = JSON.stringify(jsonArr);
	if($('#product-detail').length>0){
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

	if($(".product-detail__title").length > 0){
		prod = $(".product-detail__title:eq(0)").text().trim();
	}
	if($('#product-detail').length>0){
		return prod;
	}
	else {
		return "";
	}
}

function getImage(){
	var image = "";
	if($(".image-magnifier-component").length > 0 && $(".image-magnifier-component img").length > 0){
		image = $(".image-magnifier-component:eq(0) img:eq(0)").attr("src");
		if(image.split("http").length < 2){
			image = "http:/" + image;
		}
	}
	else if($("#product-thumbs-gallery").length > 0 && $("#product-thumbs-gallery img").length > 0){
		image = $("#product-thumbs-gallery img:eq(0)").attr("src");
		if(image.split("http").length < 2){
			image = "http:/" + image;
		}
	}

	// //console.log("image: "+image);
	return image;
}

function getPrice(){
	price = "";
	if($(".product-detail .prices:eq(0) .prices__price--selling").length > 0)
	{
		price = $(".product-detail .prices:eq(0) .prices__price--selling:eq(0)").text().trim();
		price = filter_price(price);
	}
	if(price == "" || price == 'undefined'){
		if($(".product-detail .product-detail__price--original").length > 0)
		{
			price = $(".product-detail .product-detail__price--original:eq(0)").text().trim();
			price = filter_price(price);
		}
	}
	return price;
}

function getAvailability(){
	var avail = 1;
	if($(".addToCartButton.outOfStock").length > 0){
		avail = 0;
	}
	else if($(".product-sizes").length > 0){
		var size_len = $(".product-sizes li").length;
		if($(".product-sizes .product-sizes--inactive").length == size_len && $(".product-sizes li").length != 0){
			avail = 0;
		}
	}
	return avail;

}


function getPID(){
	var link = window.location.href;
	var pid = link;

	if(pid.split("/product/").length > 1){
		pid = pid.split("/product/")[1];
	}
	if(pid.split("-").length > 1){
		pid = pid.split("-")[0];
	}
	if(pid.split("#").length > 1){
		pid = pid.split("#")[0];
	}
	if(pid.split("&").length > 1){
		pid = pid.split("&")[0];
	}
	if(pid.split("?").length > 1){
		pid = pid.split("?")[0];
	}
	if(pid.split("com/").length > 1){
		pid = pid.split("com/")[1];
	}
	if(pid.split("/").length > 1){
		pid = pid.split("/")[0];
	}
	if(pid.toUpperCase() != pid){
		pid = "";
	}
	return pid;

}

function returnPID(link){
	var pid = link;
	if(pid.split("/product/").length > 1){
		pid = pid.split("/product/")[1];
	}
	if(pid.split("-").length > 1){
		pid = pid.split("-")[0];
	}
	if(pid.split("#").length > 1){
		pid = pid.split("#")[0];
	}
	if(pid.split("&").length > 1){
		pid = pid.split("&")[0];
	}
	if(pid.split("?").length > 1){
		pid = pid.split("?")[0];
	}
	if(pid.split("com/").length > 1){
		pid = pid.split("com/")[1];
	}
	if(pid.split("/").length > 1){
		pid = pid.split("/")[0];
	}
	if(pid.toUpperCase() != pid){
		pid = "";
	}
	if(link.split('abof.com').length < 2){
		pid = "";
	}
	if(link == ""){
		pid = "";
	}
	return pid;
}


function getBreadCrumb(){
	var breadcrumb = "";
	var bread_final = "";
	if($('.breadcrumbs__list').find('a').length > 0){
		var len_bread = $('.breadcrumbs__list').find('a').length;
		for(i=0;i<len_bread;i++){
			breadcrumb = $('.breadcrumbs__list').find('a:eq('+ i +')').text().trim();
			bread_final += breadcrumb + "*~";
		}
	}
	else if($('.breadcrumbs').find('a').length > 0){
		var len_bread = $('.breadcrumbs').find('a').length;
		for(i=0;i<len_bread;i++){
			breadcrumb =$('.breadcrumbs').find('a:eq('+ i +')').text().trim();
			bread_final += breadcrumb + "*~";
		}
	}
	return bread_final;
}
