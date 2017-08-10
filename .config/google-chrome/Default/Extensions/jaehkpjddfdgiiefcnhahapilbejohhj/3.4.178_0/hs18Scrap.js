var arrayMsg = [];
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
	var arrayToSend = [];

	if($('.viewedBox li').length > 0){
		var slider = $('.viewedBox li');
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

			if($('.viewedBox li:eq('+ i +') a').length > 0){
				link = $('.viewedBox li:eq('+ i +') a:eq(0)').attr("href");
				if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
					link = $('.viewedBox li:eq('+ i +') a:eq(1)').attr("href");
				}
				if(link != ""){
					if(link.split("product:").length > 1){
						link = link.split("product:");
						PID = link[1];
					}
					else{
						PID = link;
					}
					if(PID.split("/").length > 1){
						PID =PID.split("/");
						PID =PID[0];
					}
					if(PID.split("?").length > 1){
						PID =PID.split("?");
						PID =PID[0];
					}

					if(PID.split("#").length > 1){
						PID =PID.split("#");
						PID =PID[0];
					}
				}
				else{
					PID = "";
				}
			}

			if(PID.split("javascript:void").length > 1){
				PID = "";
			}

			if(PID != ""){
				if($('.viewedBox li:eq('+ i +')').find('.productName').length > 0){
					prod = $('.viewedBox li:eq('+ i +')').find('.productName').text().trim();
				}

				if($('.viewedBox li:eq('+ i +')').find('.productImg img').length > 0){
					image = $('.viewedBox li:eq('+ i +')').find('.productImg img:eq(0)').attr("data-original");
					if(image.split("http").length < 2){
						image = "http:" + image;
					}
				}
				if($('.viewedBox li:eq('+ i +')').find('.price').length > 0){
					if($('.viewedBox li:eq('+ i +')').find('.price').html().split("</em>").length > 1){
						price = $('.viewedBox li:eq('+ i +')').find('.price').html().split("</em>");
						price = price[1];
						if(price.split("nbsp;").length > 1){
							price = price.split("nbsp;");
							price =price[1];
						}
						else if(price.split("</span>").length > 1){
							price = price.split("</span>");
							price =price[1];
						}
						else if(price.split("Rs.").length > 1){
							price = price.split("Rs.");
							price =price[1];
						}
						if(price.split("<span").length > 1){
							price = price.split("<span");
							price = price[0];
						}
						price = filter_price(price);
					}

					else{
						price = $('.viewedBox li:eq('+ i +')').find('.price').text();
						
						price = filter_price(price);
					}
				}

			}
			else{
				price = "";
			}

			if(PID != "" && price != ""){
				arrayToSend.push([PID, price, prod, image, oos]);
			}
    } // for ends1

}


if($('.similarSliderBox li').length > 0){
	var slider = $('.similarSliderBox li');
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
		if($('.similarSliderBox li:eq('+ i +') a').length > 0){
			link = $('.similarSliderBox li:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('.similarSliderBox li:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('.similarSliderBox li:eq('+ i +')').find('a').length > 0){
				prod = $('.similarSliderBox li:eq('+ i +')').find('a:eq(0)').text().trim();
			}
			if($('.similarSliderBox li:eq('+ i +')').find('.slider_product_img').length > 0){
				image = $('.similarSliderBox li:eq('+ i +')').find('.slider_product_img:eq(0)').attr("data-original");
				if(image.split("http").length < 2){
					image = "http:" + image;
				}
			}
			if($('.similarSliderBox li:eq('+ i +')').find('.price').length > 0){
				if($('.similarSliderBox li:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('.similarSliderBox li:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('.similarSliderBox li:eq('+ i +')').find('.price').text();
					
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
		}
    } // for ends1

}

if($('.catproduct-slider li').length > 0){
	var slider = $('.catproduct-slider li');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;
	

	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		
		if($('.catproduct-slider li:eq('+ i +') a').length > 0){
			link = $('.catproduct-slider li:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('.catproduct-slider li:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			
			if($('.catproduct-slider li:eq('+ i +')').find('.price').length > 0){
				if($('.catproduct-slider li:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('.catproduct-slider li:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('.catproduct-slider li:eq('+ i +')').find('.price').text();
					
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price]);
		}
    } // for ends1

}

if($('.topPicks li').length > 0){
	var slider = $('.topPicks li');
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
		if($('.topPicks li:eq('+ i +') a').length > 0){
			link = $('.topPicks li:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('.topPicks li:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('.topPicks li:eq('+ i +')').find('a').length > 0){
				prod = $('.topPicks li:eq('+ i +')').find('a:eq(0)').text().trim();
			}
			if($('.topPicks li:eq('+ i +')').find('.product-photo img').length > 0){
				image = $('.topPicks li:eq('+ i +')').find('.product-photo img:eq(0)').attr("data-original");
				if(image.split("http").length < 2){
					image = "http:" + image;
				}
			}
			if($('.topPicks li:eq('+ i +')').find('.price').length > 0){
				if($('.topPicks li:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('.topPicks li:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('.topPicks li:eq('+ i +')').find('.price').text();
					
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
		}
    } // for ends1

}

if($('#similarbrought-slider-js li').length > 0){
	var slider = $('#similarbrought-slider-js li');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;

	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		if($('#similarbrought-slider-js li:eq('+ i +') a').length > 0){
			link = $('#similarbrought-slider-js li:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('#similarbrought-slider-js li:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('#similarbrought-slider-js li:eq('+ i +')').find('.price').length > 0){
				if($('#similarbrought-slider-js li:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('#similarbrought-slider-js li:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('#similarbrought-slider-js li:eq('+ i +')').find('.price').text();
					
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price]);
		}
    } // for ends1

}

if($('#recentlysold-slider-js li').length > 0){
	var slider = $('#recentlysold-slider-js li');
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
		if($('#recentlysold-slider-js li:eq('+ i +') a').length > 0){
			link = $('#recentlysold-slider-js li:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('#recentlysold-slider-js li:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('#recentlysold-slider-js li:eq('+ i +')').find('a').length > 0){
				prod = $('#recentlysold-slider-js li:eq('+ i +')').find('a:eq(0)').attr("title").trim();
				if(prod.split("Buy ").length > 1){
					prod = prod.split("Buy ")[1].trim();
				}
			}
			if($('#recentlysold-slider-js li:eq('+ i +')').find('.product-photo img').length > 0){
				image = $('#recentlysold-slider-js li:eq('+ i +')').find('.product-photo img:eq(0)').attr("data-original");
				if(image.split("http").length < 2){
					image = "http:" + image;
				}
			}
			if($('#recentlysold-slider-js li:eq('+ i +')').find('.price').length > 0){
				if($('#recentlysold-slider-js li:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('#recentlysold-slider-js li:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('#recentlysold-slider-js li:eq('+ i +')').find('.price').text();
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
		}
    } // for ends1

}

if($('#recentlyviewed-slider-js li').length > 0){
	var slider = $('#recentlyviewed-slider-js li');
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
		if($('#recentlyviewed-slider-js li:eq('+ i +') a').length > 0){
			link = $('#recentlyviewed-slider-js li:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('#recentlyviewed-slider-js li:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('#recentlyviewed-slider-js li:eq('+ i +')').find('a').length > 0){
				prod = $('#recentlyviewed-slider-js li:eq('+ i +')').find('a:eq(0)').attr("title").trim();
				if(prod.split("Buy ").length > 1){
					prod = prod.split("Buy ")[1].trim();
				}
			}
			if($('#recentlyviewed-slider-js li:eq('+ i +')').find('.product-photo img').length > 0){
				image = $('#recentlyviewed-slider-js li:eq('+ i +')').find('.product-photo img:eq(0)').attr("data-original");
				if(image.split("http").length < 2){
					image = "http:" + image;
				}
			}
			if($('#recentlyviewed-slider-js li:eq('+ i +')').find('.price').length > 0){
				if($('#recentlyviewed-slider-js li:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('#recentlyviewed-slider-js li:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('#recentlyviewed-slider-js li:eq('+ i +')').find('.price').text();
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
		}
    } // for ends1

}

if($('.daily-products').length > 0){
	var slider = $('.daily-products');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;

	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		if($('.daily-products:eq('+ i +') a').length > 0){
			link = $('.daily-products:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('.daily-products:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('.daily-products:eq('+ i +')').find('.price').length > 0){
				if($('.daily-products:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('.daily-products:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[price.length - 1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('.daily-products:eq('+ i +')').find('.price').text();
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price]);
		}
    } // for ends1

}

if($('#recent-sold-timer .box').length > 0){
	var slider = $('#recent-sold-timer .box');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;

	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		if($('#recent-sold-timer .box:eq('+ i +') a').length > 0){
			link = $('#recent-sold-timer .box:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('#recent-sold-timer .box:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('#recent-sold-timer .box:eq('+ i +')').find('.price').length > 0){
				if($('#recent-sold-timer .box:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('#recent-sold-timer .box:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('#recent-sold-timer .box:eq('+ i +')').find('.price').text();
					
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price]);
		}
    } // for ends1

}
if($('.simple-border-box').length > 0){
	var slider = $('.simple-border-box');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;

	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		if($('.simple-border-box:eq('+ i +') a').length > 0){
			link = $('.simple-border-box:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('.simple-border-box:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('.simple-border-box:eq('+ i +')').find('.price').length > 0){
				if($('.simple-border-box:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('.simple-border-box:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('.simple-border-box:eq('+ i +')').find('.price').text();
					
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price]);
		}
    } // for ends1

}

if($('.category_rails').length > 0){
	var slider = $('.category_rails');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;

	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		if($('.category_rails:eq('+ i +')  li a').length > 0){
			link = $('.category_rails:eq('+ i +')  li:eq(0) a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('.category_rails:eq('+ i +')  li:eq(0) a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('.category_rails:eq('+ i +') li:eq(0) ').find('.price').length > 0){
				if($('.category_rails:eq('+ i +') li:eq(0) ').find('.price').html().split("</em>").length > 1){
					price = $('.category_rails:eq('+ i +') li:eq(0) ').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[price.length - 1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('.category_rails:eq('+ i +') li:eq(0) ').find('.price').text();

					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price]);
		}
    } // for ends1

}

if($('.product_div').length > 0){
	var slider = $('.product_div');
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
		if($('.product_div:eq('+ i +') a').length > 0){
			link = $('.product_div:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('.product_div:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('.product_div:eq('+ i +')').find('.product_title a').length > 0){
				prod = $('.product_div:eq('+ i +')').find('.product_title a:eq(0)').text().trim();
			}
			if($('.product_div:eq('+ i +')').find('.product_image img').length > 0){
				image = $('.product_div:eq('+ i +')').find('.product_image img:eq(0)').attr("data-original");
				if(image.split("http").length < 2){
					image = "http:" + image;
				}
			}


			if($('.product_div:eq('+ i +')').find('.price').length > 0){
				if($('.product_div:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('.product_div:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[price.length - 1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("</b>").length > 1){
						price = price.split("</b>");
						price =price[0];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);

				}

				else{
					price = $('.product_div:eq('+ i +')').find('.price').text();
					
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
		}
    } // for ends1

} 

if($('.promo-grid-view').length > 0){
	var slider = $('.promo-grid-view');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;

	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		if($('.promo-grid-view:eq('+ i +') a').length > 0){
			link = $('.promo-grid-view:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('.promo-grid-view:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('.promo-grid-view:eq('+ i +')').find('.price').length > 0){
				if($('.promo-grid-view:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('.promo-grid-view:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[price.length - 1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("</b>").length > 1){
						price = price.split("</b>");
						price =price[0];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);

				}

				else{
					price = $('.promo-grid-view:eq('+ i +')').find('.price').text();

					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price]);
		}
    } // for ends1

} 

if($('#sameBrandProductHorizontalRailsBox li').length > 0){
	var slider = $('#sameBrandProductHorizontalRailsBox li');
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
		if($('#sameBrandProductHorizontalRailsBox li:eq('+ i +') a').length > 0){
			link = $('#sameBrandProductHorizontalRailsBox li:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('#sameBrandProductHorizontalRailsBox li:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('#sameBrandProductHorizontalRailsBox li:eq('+ i +')').find('a').length > 0){
				prod = $('#sameBrandProductHorizontalRailsBox li:eq('+ i +')').find('a:eq(0)').attr("title").trim();
				if(prod.split("Buy ").length > 1){
					prod = prod.split("Buy ")[1].trim();
				}
			}
			if($('#sameBrandProductHorizontalRailsBox li:eq('+ i +')').find('.product-photo img').length > 0){
				image = $('#sameBrandProductHorizontalRailsBox li:eq('+ i +')').find('.product-photo img:eq(0)').attr("data-original");
				if(image.split("http").length < 2){
					image = "http:" + image;
				}
			}
			if($('#sameBrandProductHorizontalRailsBox li:eq('+ i +')').find('.price').length > 0){
				if($('#sameBrandProductHorizontalRailsBox li:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('#sameBrandProductHorizontalRailsBox li:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('#sameBrandProductHorizontalRailsBox li:eq('+ i +')').find('.price').text();
					
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
		}
    } // for ends1

}

if($('#similarViewed-slider-js li').length > 0){
	var slider = $('#similarViewed-slider-js li');
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
		if($('#similarViewed-slider-js li:eq('+ i +') a').length > 0){
			link = $('#similarViewed-slider-js li:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('#similarViewed-slider-js li:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('#similarViewed-slider-js li:eq('+ i +')').find('a').length > 0){
				prod = $('#similarViewed-slider-js li:eq('+ i +')').find('a:eq(0)').attr("title").trim();
				if(prod.split("Buy ").length > 1){
					prod = prod.split("Buy ")[1].trim();
				}
			}
			if($('#similarViewed-slider-js li:eq('+ i +')').find('.product-photo img').length > 0){
				image = $('#similarViewed-slider-js li:eq('+ i +')').find('.product-photo img:eq(0)').attr("data-original");
				if(image.split("http").length < 2){
					image = "http:" + image;
				}
			}
			if($('#similarViewed-slider-js li:eq('+ i +')').find('.price').length > 0){
				if($('#similarViewed-slider-js li:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('#similarViewed-slider-js li:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('#similarViewed-slider-js li:eq('+ i +')').find('.price').text();
					
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
		}
    } // for ends1

}

if($('#similarbrought-slider-js li').length > 0){
	var slider = $('#similarbrought-slider-js li');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;

	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		if($('#similarbrought-slider-js li:eq('+ i +') a').length > 0){
			link = $('#similarbrought-slider-js li:eq('+ i +') a:eq(0)').attr("href");
			if(link.split("youtu").length > 1 || link.split("javascript:").length > 1){
				link = $('#similarbrought-slider-js li:eq('+ i +') a:eq(1)').attr("href");
			}
			if(link != ""){
				if(link.split("product:").length > 1){
					link = link.split("product:");
					PID = link[1];
				}
				else{
					PID = link;
				}
				if(PID.split("/").length > 1){
					PID =PID.split("/");
					PID =PID[0];
				}
				if(PID.split("?").length > 1){
					PID =PID.split("?");
					PID =PID[0];
				}

				if(PID.split("#").length > 1){
					PID =PID.split("#");
					PID =PID[0];
				}
			}
			else{
				PID = "";
			}
		}
		if(PID.split("javascript:void").length > 1){
			PID = "";
		}
		if(PID != ""){
			if($('#similarbrought-slider-js li:eq('+ i +')').find('.price').length > 0){
				if($('#similarbrought-slider-js li:eq('+ i +')').find('.price').html().split("</em>").length > 1){
					price = $('#similarbrought-slider-js li:eq('+ i +')').find('.price').html().split("</em>");
					price = price[1];
					if(price.split("nbsp;").length > 1){
						price = price.split("nbsp;");
						price =price[1];
					}
					else if(price.split("</span>").length > 1){
						price = price.split("</span>");
						price =price[1];
					}
					else if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price =price[1];
					}
					if(price.split("<span").length > 1){
						price = price.split("<span");
						price = price[0];
					}
					price = filter_price(price);
				}

				else{
					price = $('#similarbrought-slider-js li:eq('+ i +')').find('.price').text();
					
					price = filter_price(price);
				}
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != ""){
			arrayToSend.push([PID, price]);
		}
    } // for ends1

}
if(arrayToSend.length > 0){
	arrayToSend = JSON.stringify(arrayToSend);
	var jsonArr = [{'pairsHS18': arrayToSend}];
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
	var link = "";
	var PID = "";

	var breadcrumb = "";
	var breadcrumb_str = "";
	var breadcrumb_len = $('.breadcrumb li').length - 1;

	for(i=0;i<breadcrumb_len;i++){
		if($('.breadcrumb li:eq('+ i +')').find('[itemprop="title"]').text().trim() != ""){
			breadcrumb = $('.breadcrumb li:eq('+ i +')').find('[itemprop="title"]').text().trim();
			breadcrumb_str += breadcrumb + "*~";
		}
	}
	prod = $("#productTitleInPDP").text().trim();
	if(($('#productInfoDes').length > 0) && ($('#productInfoDes').find('.out_stock').length > 0)){
		current_status = 1;
	}
	else if(prod.trim() == ("Sold Out")){
		current_status = 1;
	}
	else{
		current_status = 0;
	}
	if(current_status == 0 && $("#hs18Price").length > 0){
		myPrice = $("#hs18Price").html().split("</span>")[1];
		myPrice = myPrice.split(",").join("").trim();
		if(myPrice.split("nbsp;").length > 1){
			myPrice = myPrice.split("nbsp;")[1];
		}
	}
	else if(current_status == 0){
		myPrice = getPrice();
	}
	else{
		myPrice = "0";
	}

	var img = getImage();
	var count = img.split("http:").length;
	if(count > 2)
	{
		image = "http:" + img.split("http:")[2];
	}
	else
	{
		image = img;
	}

	link = window.location.href;

	if(link.split("product:").length > 1){
		link = link.split("product:");
		PID = link[1];
	}
	else{
		PID = link;
	}
	if(PID.split("/").length > 1){
		PID =PID.split("/");
		PID =PID[0];
	}
	if(PID.split("?").length > 1){
		PID =PID.split("?");
		PID =PID[0];
	}

	if(PID.split("#").length > 1){
		PID =PID.split("#");
		PID =PID[0];
	}

	cur_url = window.location.href;
	curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
	curData = JSON.stringify(curData);
	var jsonArr = [{'curDataHS18': curData}];
	jsonArr = JSON.stringify(jsonArr);
	if($('#productInfoDes').length>0){
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
}


var pollInterval = 1000 * 15;
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 10000);


//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;



function getProd(){
	var prod = "";

	if($("#productTitleInPDP").length > 0){
		prod = $("#productTitleInPDP").text().trim();
	}
	if($('#productInfoDes').length>0){
		return prod;
	}
	else {
		return "";
	}

}

function getImage(){
	var image = "";
	if($('meta[property="og:image"]').length > 0){
		var img = $('meta[property="og:image"]').attr('content');
		var count = img.split("http:").length;
		if(count > 2)
		{
			image = "http:" + img.split("http:")[2];
		}
		else
		{
			image = img;
		}
	}
	// //console.log("image: "+image);
	return image;
}

function getPrice(){
	price = "";
	price = $('[itemprop="price"]').text();
	price = filter_price(price);
	return price;
}

function getAvailability(){
	var avail = 1;
	if(($('#productInfoDes').length > 0) && ($('#productInfoDes').find('.out_stock').length > 0)){
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
	// if(pid.split("/product:").length > 1){
	// 	pid = pid.split("/product:")[1];
	// }
	// if(pid.split("/").length > 1){
	// 	pid = pid.split("/")[0];
	// }
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
	if(link.split('homeshop18.com').length < 2){
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
	var len_bread = $('.breadcrumb').find('[itemprop="title"]').length;

	for(i=0;i<len_bread;i++){
		breadcrumb = $('.breadcrumb').find('[itemprop="title"]:eq('+ i +')').text().trim();
		bread_final += breadcrumb + "*~";
	}

	return bread_final;


}

function getModel(){
	var model = "";
	if($(".productDetails .specs_header").length > 0){
		var spec_len = $(".productDetails .specs_header").length;
		for(var i=0;i<spec_len;i++){
			if($(".productDetails .specs_header:eq("+i+")").text().trim().toUpperCase() == "GENERAL"){
				var key_len = $(".productDetails .specs_data:eq("+i+") .specs_key").length;

				for(var j=0;j<key_len;j++){
					if($(".productDetails .specs_data:eq("+i+") .specs_key:eq("+j+")").text().trim().toUpperCase() == "MODEL"){
						var model = $(".productDetails .specs_data:eq("+i+") .specs_value:eq("+j+")").text().trim();
					}
				}
				break;
			}
		}
	}
	return model;
}


function getIntStorage(){
	var intMem = "";
	if($(".productDetails .specs_header").length > 0){
		var spec_len = $(".productDetails .specs_header").length;
		for(var i=0;i<spec_len;i++){
			if($(".productDetails .specs_header:eq("+i+")").text().trim().toUpperCase() == "MEMORY DETAILS"){
				var key_len = $(".productDetails .specs_data:eq("+i+") .specs_key").length;

				for(var j=0;j<key_len;j++){
					if($(".productDetails .specs_data:eq("+i+") .specs_key:eq("+j+")").text().trim().toUpperCase() == "INTERNAL MEMORY"){
						var intMem = $(".productDetails .specs_data:eq("+i+") .specs_value:eq("+j+")").text().trim();
					}
				}
				break;
			}
		}
	}
	return intMem;
}

function getColor(){
	var color = "";
	if($("#attribute-js li a").length > 0){
		color_len = $("#attribute-js li").length;	
		if(color_len > 1){
			for(var i=0;i<color_len;i++){
				if($("#attribute-js li:eq("+i+") a:eq(0)").attr("title").length > 0){
					color += $("#attribute-js li:eq("+i+") a:eq(0)").attr("title") + "/";
				}
				else{
					color = "";
				}
			}
		}
		else{
			if($("#attribute-js li:eq(0) a:eq(0)").attr("title").length > 0){
				color += $("#attribute-js li:eq(0) a:eq(0)").attr("title");
			}
		}
	}
	return color;
}

function sendMobile(){
	var breadCrumb = getBreadCrumb();
	// console.log("getBreadCrumb: " + breadCrumb);
	if(breadCrumb.split("*~").length > 1 && breadCrumb.split("*~")[2].trim().toUpperCase() == "MOBILE PHONES" && getProd() != ""){
		var PID = getPID();
		var pos = 4;
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
if(cur_url.split(".homeshop18.com/shopping-cart").length > 1 || cur_url.split(".homeshop18.com/checkout?execution").length > 1){
	var checkPick = "#removeCouponAtCart .remove_coupon";
	var selector = "#removeCouponAtCart .remove_coupon";
	var attr = "";
	var webID = 4;
	var homeLink = "http://www.homeshop18.com/";
	pickAppliedCpn(checkPick, selector, attr, webID, homeLink);

	if($(".shoppingCartLeft").length > 0 || $(".apply-form").length > 0 && $("#couponClick").length == 0){
		if($(".shoppingCartLeft").length > 0){
			var selectorACIcon = ".shoppingCartLeft";
		}
		else if($(".apply-form").length > 0){
			var selectorACIcon = ".apply-form:eq(0)";
		}
		var position = "after";
		var parent = "none";
		var selectorInput = "#code";
		var inputAttr = "val";
		var clickApplySelector = "#show-gcdc-form .cssbtn-orange";
		var clickRemoveSelector = ".remove_coupon";
		var details = [{'selectorInput': selectorInput, "clickApplySelector": clickApplySelector, "clickRemoveSelector": clickRemoveSelector, "inputAttr" : inputAttr, "api_case": 0}];
		details = JSON.stringify(details);
		localStorage.acDetails = details;
		displayACIcon(selectorACIcon, parent, position, 9, details);
		if(localStorage.showFinalSavings && localStorage.showFinalSavings == 1){
			displayFinalSavings();
			$(".hk-aCoup__netSavings b:eq(0)").text(localStorage.bestSaving);
			$(".hk-js-autoCoup__bestCouponTill").text(localStorage.bestCoupon.toUpperCase());
		}
	}

}

if(!localStorage.savings){
	localStorage.savings = "";
}
if(!localStorage.bestSaving){
	localStorage.bestSaving = 0;
}
if(!localStorage.bestCoupon){
	localStorage.bestCoupon = "";
}
function startSaving(){
	return new Promise(function(resolve, reject){

		var code = localStorage.lastCoupon.trim();
		var csaving = 0;
		var bestSaving = localStorage.bestSaving;
		var bestCoupon = localStorage.bestCoupon;
		var ecashing = 0;
		var savingsObject = {};
		var doneSavingCheck = localStorage.doneSavingCheck;
		var couponsTotal = localStorage.getCoupons;
		var cpnMsg = "";
		couponsTotal = couponsTotal.split("~").length - 1;

		if($(".message_box.successmsg").length > 0 && $(".message_box.successmsg h5").length > 0){

			csaving = $(".message_box.successmsg h5:eq(0)").text().trim();
			cpnMsg = $(".message_box.successmsg h5:eq(0)").text().trim();
			setCookie("HKCode~"+localStorage.lastCoupon, cpnMsg, 1);
			if(csaving.split("discount").length > 0){
				csaving = csaving.split("discount");
				csaving = csaving[0].trim();
			}
			csaving = filter_price(csaving);
			if($(".remove_coupon").length > 0){
				code = $(".remove_coupon").text().trim();
			}
			else if(localStorage.lastCoupon && localStorage.lastCoupon != ""){
				code = localStorage.lastCoupon.trim();
			}

			if(isNaN(csaving)){
				csaving = 0;
			}
			else if(csaving > bestSaving && code != ""){
				bestSaving = csaving;
				localStorage.bestSaving = bestSaving;
				localStorage.bestCoupon = code;
			}
		}
		else{
			if($(".errormsg").length > 0){
				cpnMsg = $(".errormsg h5:eq(0)").text().trim();
				setCookie("HKCode~"+localStorage.lastCoupon, cpnMsg, 1);
			}

		}
		
		if(localStorage.savings.trim() != ""){
			var savings = JSON.parse(localStorage.savings);
		}
		else{
			var savings = [];
		}
		var dontSave = 0;
		if(localStorage.savings.trim() != ""){
			var checkContains = JSON.parse(localStorage.savings);
			for(var cc=0;cc<checkContains.length;cc++){
				if(checkContains[cc].code == code || code.trim() == ""){
					dontSave = 1;
				}
			}
		}
		if(dontSave == 0){
			var savingsLen = savings.length;
			savingsObject["code"] = code;
			savingsObject["saving"] = csaving;
			savingsObject["ecash"] = ecashing;
			savings[savingsLen] = savingsObject;
			localStorage.savings = JSON.stringify(savings);
		}
		displayEachCpnSaving(code, csaving, ecashing);

		if($(".remove_coupon").length > 0){
			document.getElementsByClassName("remove_coupon")[0].click();
		}
		if(localStorage.doneACTill >= couponsTotal){
			resolve("done");
		}
		else{
			resolve("notdone");
		}
	});
}
var clickRemove = 0;
var deleteAC = 0;

function applyBestCoupon(){
	bestSaving = localStorage.bestSaving;
	bestCoupon = localStorage.bestCoupon;

	if(deleteAC == 0){
		var allCoupons = localStorage.getCoupons;
		allCoupons = allCoupons.split("~");
		for(var all=0;all<allCoupons.length-1;all++){
			var cookieCpn = "HKCode~"+allCoupons[all].trim();
			if(getCookie(cookieCpn)){
				arrayMsg.push([allCoupons[all], encodeURIComponent(getCookie(cookieCpn)), 4]);
			}
			setCookie(cookieCpn, 0, -1);
		}
		arrayMsg = JSON.stringify(arrayMsg);
		var jsonArr = [{'cpn_msg': arrayMsg}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(1, jsonArr, 12, doNothing, []);
		deleteAC = 1;
		arrayMsg = [];
	}

	if($(".remove_coupon").length > 0 && clickRemove == 0){
		document.getElementsByClassName("remove_coupon")[0].click();
		clickRemove = 1;
	}

	if(localStorage.bestSaving != 0 && localStorage.bestCoupon.trim() != "" && $("#code").length > 0 && $("#show-gcdc-form").length > 0 && $("#show-gcdc-form .cssbtn-orange").length > 0){
		$("#code").val(localStorage.bestCoupon.trim());
		localStorage.showFinalSavings = 1;
		localStorage.acStarted = 0;
		displayFinalSavings();
		document.getElementById("show-gcdc-form").getElementsByClassName("cssbtn-orange")[0].click();
	}
	else if(localStorage.bestSaving != 0 && localStorage.bestCoupon.trim() != ""){
		setTimeout(applyBestCoupon, 1000);
	}
	else{
		displayNoSavings();
	}

}


