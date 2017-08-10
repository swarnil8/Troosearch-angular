var arrayMsg = [];
function getPos(){
	return 50;
}

function brandPull(){
	var brand = $('.brand').text();
	var breadcrumb = getBreadCrumb();
	var category = breadcrumb;
	category = category.split("*~");
	if(category.length > 1){
		category = category[category.length-2];
		category = category.trim();
	}
	else {
		category = "";
	}

	if(category.trim()!=""){
		var commonWords = findCommonWord(category, getProd(1), "");
	}
	else{
		var commonWords = "";
	}

	if(commonWords != "undefined" && commonWords.trim()!="" || brand.trim()!=""){
		commonWordsToPass =  commonWords.trim();
		commonWordsToPass = commonWordsToPass.split("**~").join(" ");
		commonWordsToPass = commonWordsToPass.trim();
		var jsonArr = [{'brand': brand.trim(), 'cat':commonWordsToPass.trim()}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(1, jsonArr, 36, doNothing, []);
	}
}

brandPull();

function sendPairs(){
	arrayToSend = [];
	dropToSend = [];

	if($('#new-recomm-slider-segment li').length > 0){
		var slider = $('#new-recomm-slider-segment li');
		var sliderLength = slider.length;
		var link;
		var price;
		var PID;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			if($('#new-recomm-slider-segment li:eq('+ i +') a').length > 0){
				link = $('#new-recomm-slider-segment li:eq('+ i +') a:eq(0)').attr('href');
				if(link != ""){
					if(link.split(".html").length > 1){
						link = link.split(".html")[0];
						if(link.split("-").length > 1){
							link = link.split("-");
							PID = link[link.length - 1];
						}
					}
					else{
						PID = "";
					}
				}
				else{
					PID = "";
				}
			}
			if(PID != ""){
				if($('#new-recomm-slider-segment li:eq('+ i +')').find('.price').length > 0){
					price = $('#new-recomm-slider-segment li:eq('+ i +')').find('.price').html();
					if(price.split("</strike>").length > 1){
						price = price.split("</strike>");
						price = price[1];
						if(price.split("</strong>").length > 1){
							price = price.split("</strong>");
							price = price[0];
						}
						if(price.split("Rs.").length > 1){
							price = price.split("Rs.");
							price = price[1];
						}
					}
					else{
						price = $('#new-recomm-slider-segment li:eq('+ i +')').find('.price').text();

						if(price.split("Rs.").length > 1){
							price = price.split("Rs.");
							price = price[1];
						}
					}
					price = price.split(",").join("").trim();
				}
			}
			else{
				price = "";
			}
			if(PID != "" && price != ""){
				arrayToSend.push([PID, price]);
				dropToSend.push(PID);
			}

    } // for ends

}

if($('#new-mostPopular li').length > 0){
	var slider = $('#new-mostPopular li');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;
	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		if($('#new-mostPopular li:eq('+ i +') a').length > 0){
			link = $('#new-mostPopular li:eq('+ i +') a:eq(0)').attr('href');
			if(link != ""){
				if(link.split(".html").length > 1){
					link = link.split(".html")[0];
					if(link.split("-").length > 1){
						link = link.split("-");
						PID = link[link.length - 1];
					}
				}
				else{
					PID = "";
				}
			}
			else{
				PID = "";
			}
		}
		if(PID != ""){
			if($('#new-mostPopular li:eq('+ i +')').find('.price').length > 0){
				price = $('#new-mostPopular li:eq('+ i +')').find('.price').html();
				if(price.split("</strike>").length > 1){
					price = price.split("</strike>");
					price = price[1];
					if(price.split("</strong>").length > 1){
						price = price.split("</strong>");
						price = price[0];
					}
					if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price = price[1];
					}
				}
				else{
					price = $('#new-mostPopular li:eq('+ i +')').find('.price').text();

					if(price.split("Rs.").length > 1){
						price = price.split("Rs.");
						price = price[1];
					}
				}
				price = price.split(",").join("").trim();
			}
		}
		else{
			price = "";
		}
		if(PID != "" && price != ""){
			arrayToSend.push([PID, price]);
			dropToSend.push(PID);
		}

    } // for ends

}

if($('#productsCatalog li').length > 0){
	var slider = $('#productsCatalog li');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;
	var flag;
	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		flag = 0;
		if($('#productsCatalog li:eq('+ i +') a').length > 0){
			link = $('#productsCatalog li:eq('+ i +') a:eq(0)').attr('href');
			if(link != ""){
				if(link.split(".html").length > 1){
					link = link.split(".html")[0];
					if(link.split("-").length > 1){
						link = link.split("-");
						PID = link[link.length - 1];
					}
				}
				else{
					PID = "";
				}
			}
			else{
				PID = "";
			}
		}
		if(PID != ""){
			if($('#productsCatalog li:eq('+ i +')').find('.price').length > 0){
				price = $('#productsCatalog li:eq('+ i +')').find('.price').html();
				if(price.split("</strike>").length > 1){
            ////console.log("iamhere");
            price = price.split("</strike>");
            price = price[1];
            flag = 1;
            if(price.split("</strong>").length > 1){
            	price = price.split("</strong>");
            	price = price[0];
            }
            if(price.split("Rs.").length > 1){
            	price = price.split("Rs.");
            	price = price[1];
            }
        }
        if($('#productsCatalog li:eq('+ i +')').find('.price').find('.discount').length > 0){
        	price = price.split("</span>")[0];
        	flag = 1;
        }
        if(flag == 0){
        	price = $('#productsCatalog li:eq('+ i +')').find('.price').text();

        	if(price.split("Rs.").length > 1){
        		price = price.split("Rs.");
        		price = price[1];
        	}
        }
        price = price.split(",").join("").trim();
        
    }
}
else{
	price = "";
}
if(PID != "" && price != ""){
	arrayToSend.push([PID, price]);
	dropToSend.push(PID);
}

    } // for ends

}

if($('.video-link-box').length > 0){
	var slider = $('.video-link-box');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;
	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		if($('.video-link-box:eq('+ i +') a').length > 0){
			link = $('.video-link-box:eq('+ i +') a:eq(0)').attr('href');
			if(link != ""){
				if(link.split(".html").length > 1){
					link = link.split(".html")[0];
					if(link.split("-").length > 1){
						link = link.split("-");
						PID = link[link.length - 1];
					}
				}
				else{
					PID = "";
				}
			}
			else{
				PID = "";
			}
		}
		if(PID != ""){
			if($('.video-link-box:eq('+ i +')').find('p').length > 0){
				price = $('.video-link-box:eq('+ i +')').find('p').text();
				
				
				if(price.split("Rs.").length > 1){
					price = price.split("Rs.");
					price = price[1];
					price = price.split(",").join("").trim();
				}
				else{
					price = "";
				}
			}
		}

		else{
			price = "";
		}
		if(PID != "" && price != ""){
			arrayToSend.push([PID, price]);
			dropToSend.push(PID);
		}

    } // for ends

}

if($('.verti-slider li').length > 0){
	var slider = $('.verti-slider li');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;
	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		if($('.verti-slider li:eq('+ i +') a').length > 0){
			link = $('.verti-slider li:eq('+ i +') a:eq(0)').attr('href');
			if(link == "javascript:void(0);" || link == ""){
				link = $('.verti-slider li:eq('+ i +') a:eq(1)').attr('href');
			}
			if(link == "javascript:void(0);" || link == ""){
				link = $('.verti-slider li:eq('+ i +') a:eq(2)').attr('href');
			}
			if(link != ""){
				if(link.split(".html").length > 1){
					link = link.split(".html")[0];
					if(link.split("-").length > 1){
						link = link.split("-");
						PID = link[link.length - 1];
					}
				}
				else{
					PID = "";
				}
			}
			else{
				PID = "";
			}
		}
		if(PID != ""){
			if($('.verti-slider li:eq('+ i +')').find('.fs15').length > 0){
				price = $('.verti-slider li:eq('+ i +')').find('.fs15').text();
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

    } // for ends

}

if($('#similarPicksPaginated li').length > 0){
	var slider = $('#similarPicksPaginated li');
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
		if($('#similarPicksPaginated li:eq('+ i +') a').length > 0){
			link = $('#similarPicksPaginated li:eq('+ i +') a:eq(0)').attr('href');
			if(link == "javascript:void(0);" || link == ""){
				link = $('#similarPicksPaginated li:eq('+ i +') a:eq(1)').attr('href');
			}
			if(link == "javascript:void(0);" || link == ""){
				link = $('#similarPicksPaginated li:eq('+ i +') a:eq(2)').attr('href');
			}
			if(link != ""){
				if(link.split(".html").length > 1){
					link = link.split(".html")[0];
					if(link.split("-").length > 1){
						link = link.split("-");
						PID = link[link.length - 1];
					}
				}
				else{
					PID = "";
				}
			}
			else{
				PID = "";
			}
		}
		if(PID != ""){
			if($('#similarPicksPaginated li:eq('+ i +')').find('.short-info p').length > 0){
				prod = $('#similarPicksPaginated li:eq('+ i +')').find('.short-info:eq(0) p:eq(0)').text();
			}
			if($('#similarPicksPaginated li:eq('+ i +')').find('img').length > 0){
				image = $('#similarPicksPaginated li:eq('+ i +')').find('img:eq(0)').attr("src");
			}
			if(image == ""){ 
				if($('#similarPicksPaginated li:eq('+ i +')').find('img').length > 0){
					image = $('#similarPicksPaginated li:eq('+ i +')').find('img:eq(0)').attr("data-src-320");
				}
			}
			if(image.split("live/images/product").length > 1){
				image = "";
			}
			if($('#similarPicksPaginated li:eq('+ i +')').find('.product-price').length > 0){
				price = $('#similarPicksPaginated li:eq('+ i +')').find('.product-price:eq(0)').text();
				price = filter_price(price);
			}
		}

		else{
			price = "";
		}
		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
			dropToSend.push(PID);
		}

    } // for ends

}


if($('#similarPicks .product-tile').length > 0){
	var slider = $('#similarPicks .product-tile');
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
		if($('#similarPicks .product-tile:eq('+ i +') a').length > 0){
			link = $('#similarPicks .product-tile:eq('+ i +') a:eq(0)').attr('href');
			if(link == "javascript:void(0);" || link == ""){
				link = $('#similarPicks .product-tile:eq('+ i +') a:eq(1)').attr('href');
			}
			if(link == "javascript:void(0);" || link == ""){
				link = $('#similarPicks .product-tile:eq('+ i +') a:eq(2)').attr('href');
			}
			if(link != ""){
				if(link.split(".html").length > 1){
					link = link.split(".html")[0];
					if(link.split("-").length > 1){
						link = link.split("-");
						PID = link[link.length - 1];
					}
				}
				else{
					PID = "";
				}
			}
			else{
				PID = "";
			}
		}
		if(PID != ""){
			if($('#similarPicks .product-tile:eq('+ i +')').find('.product-info h4').length > 0){
				prod = $('#similarPicks .product-tile:eq('+ i +')').find('.product-info:eq(0) h4:eq(0)').text();
			}
			if($('#similarPicks .product-tile:eq('+ i +')').find('img').length > 0){
				image = $('#similarPicks .product-tile:eq('+ i +')').find('img:eq(0)').attr("src");
			}
			if(image == ""){
				
				if($('#similarPicks .product-tile:eq('+ i +')').find('img').length > 0){
					image = $('#similarPicks .product-tile:eq('+ i +')').find('img:eq(0)').attr("data-src-320");
				}
			}
			if(image.split("live/images/product").length > 1){
				image = "";
			}
			if($('#similarPicks .product-tile:eq('+ i +')').find('.product-price').length > 0){
				price = $('#similarPicks .product-tile:eq('+ i +')').find('.product-price:eq(0)').text();
				price = filter_price(price);
			}
		}

		else{
			price = "";
		}
		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
			dropToSend.push(PID);
		}

    } // for ends

}


if($('#sold-out-recommendations .product-tile').length > 0){
	var slider = $('#sold-out-recommendations .product-tile');
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
		link = "";
		oos = 0;
		if($('#sold-out-recommendations .product-tile:eq('+ i +') a').length > 0){
			link = $('#sold-out-recommendations .product-tile:eq('+ i +') a:eq(0)').attr('href');
			if(link == "javascript:void(0);" || link == ""){
				link = $('#sold-out-recommendations .product-tile:eq('+ i +') a:eq(1)').attr('href');
			}
			if(link == "javascript:void(0);" || link == ""){
				link = $('#sold-out-recommendations .product-tile:eq('+ i +') a:eq(2)').attr('href');
			}
			if(link != ""){
				if(link.split(".html").length > 1){
					link = link.split(".html")[0];
					if(link.split("-").length > 1){
						link = link.split("-");
						PID = link[link.length - 1];
					}
				}
				else{
					PID = "";
				}
			}
			else{
				PID = "";
			}
		}
		if(PID != ""){
			if($('#sold-out-recommendations .product-tile:eq('+ i +')').find('.product-info h4').length > 0){
				prod = $('#sold-out-recommendations .product-tile:eq('+ i +')').find('.product-info:eq(0) h4:eq(0)').text();
			}
			if($('#sold-out-recommendations .product-tile:eq('+ i +')').find('img').length > 0){
				image = $('#sold-out-recommendations .product-tile:eq('+ i +')').find('img:eq(0)').attr("src");
			}
			if(image == ""){
				
				if($('#sold-out-recommendations .product-tile:eq('+ i +')').find('img').length > 0){
					image = $('#sold-out-recommendations .product-tile:eq('+ i +')').find('img:eq(0)').attr("data-src-320");
				}
			}
			if(image.split("live/images/product").length > 1){
				image = "";
			}
			if($('#sold-out-recommendations .product-tile:eq('+ i +')').find('.product-price').length > 0){
				price = $('#sold-out-recommendations .product-tile:eq('+ i +')').find('.product-price:eq(0)').text();
				price = filter_price(price);
			}
		}

		else{
			price = "";
		}
		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
			dropToSend.push(PID);
		}

    } // for ends

}
if($('.recently-viewed-carousel .product-tile').length > 0){
	var slider = $('.recently-viewed-carousel .product-tile');
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
		if($('.recently-viewed-carousel .product-tile:eq('+ i +') a').length > 0){
			link = $('.recently-viewed-carousel .product-tile:eq('+ i +') a:eq(0)').attr('href');
			if(link == "javascript:void(0);" || link == ""){
				link = $('.recently-viewed-carousel .product-tile:eq('+ i +') a:eq(1)').attr('href');
			}
			if(link == "javascript:void(0);" || link == ""){
				link = $('.recently-viewed-carousel .product-tile:eq('+ i +') a:eq(2)').attr('href');
			}
			if(link != ""){
				if(link.split(".html").length > 1){
					link = link.split(".html")[0];
					if(link.split("-").length > 1){
						link = link.split("-");
						PID = link[link.length - 1];
					}
				}
				else{
					PID = "";
				}
			}
			else{
				PID = "";
			}
		}
		if(PID != ""){
			if($('.recently-viewed-carousel .product-tile:eq('+ i +')').find('.product-info h4').length > 0){
				prod = $('.recently-viewed-carousel .product-tile:eq('+ i +')').find('.product-info:eq(0) h4:eq(0)').text().trim(); 
			}
			if($('.recently-viewed-carousel .product-tile:eq('+ i +')').find('img').length > 0){
				image = $('.recently-viewed-carousel .product-tile:eq('+ i +')').find('img').attr("src"); 
			}
			if(image == ""){
				
				if($('.recently-viewed-carousel .product-tile:eq('+ i +')').find('img').length > 0){
					image = $('.recently-viewed-carousel .product-tile:eq('+ i +')').find('img:eq(0)').attr("data-src-320");
				}
			}
			if(image.split("live/images/product").length > 1){
				image = "";
			}
			if($('.recently-viewed-carousel .product-tile:eq('+ i +')').find('.product-price').length > 0){
				price = $('.recently-viewed-carousel .product-tile:eq('+ i +')').find('.product-price:eq(0)').text();
				price = filter_price(price);
			}
		}

		else{
			price = "";
		}
		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
			dropToSend.push(PID);
		}

    } // for ends

}

if($('.search-product .product-tile').length > 0){
	var slider = $('.search-product .product-tile');
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
		if($('.search-product .product-tile:eq('+ i +') a').length > 0){
			link = $('.search-product .product-tile:eq('+ i +') a:eq(0)').attr('href');
			if(link == "javascript:void(0);" || link == ""){
				link = $('.search-product .product-tile:eq('+ i +') a:eq(1)').attr('href');
			}
			if(link == "javascript:void(0);" || link == ""){
				link = $('.search-product .product-tile:eq('+ i +') a:eq(2)').attr('href');
			}
			if(link != ""){
				if(link.split(".html").length > 1){
					link = link.split(".html")[0];
					if(link.split("-").length > 1){
						link = link.split("-");
						PID = link[link.length - 1];
					}
				}
				else{
					PID = "";
				}
			}
			else{
				PID = "";
			}
		}
		if(PID != ""){
			if($('.search-product .product-tile:eq('+ i +')').find('.product-info .h4').length > 0){
				prod = $('.search-product .product-tile:eq('+ i +')').find('.product-info:eq(0) .h4:eq(0)').text().trim(); 
			}
			
			if($('.search-product .product-tile:eq('+ i +')').find('.primary-image').length > 0){
				image = $('.search-product .product-tile:eq('+ i +')').find('.primary-image').attr("src"); 
			}
			if(image == ""){
				if($('.search-product .product-tile:eq('+ i +')').find('.primary-image').length > 0){
					image = $('.search-product .product-tile:eq('+ i +')').find('.primary-image').attr("data-src-320"); 
				}
			}
			if(image.split("live/images/product").length > 1){
				image = "";
			}
			if($('.search-product .product-tile:eq('+ i +')').find('.standard-price').length > 0){
				price_len = $('.search-product .product-tile:eq('+ i +')').find('.standard-price').length-1;
				price = $('.search-product .product-tile:eq('+ i +')').find('.standard-price:eq('+price_len+')').text();
				price = filter_price(price);
			}
		}

		else{
			price = "";
		}
		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
			dropToSend.push(PID);
		}

    } // for ends

}
if(arrayToSend.length > 0){
	arrayToSend = JSON.stringify(arrayToSend);
	var jsonArr = [{'pairsJab': arrayToSend}];
	jsonArr = JSON.stringify(jsonArr);
	sendMessage(0, jsonArr, 0, doNothing, []);  
}
if(dropToSend.length > 0){
	dropToSend = JSON.stringify(dropToSend);
	var jsonArr = [{'pids': dropToSend, 'pos': 50}];
	jsonArr = JSON.stringify(jsonArr);
	var passBack = ['#new-recomm-slider-segment li', '#new-mostPopular li', '.search-product .product-tile', '.recently-viewed-carousel .product-tile', '#sold-out-recommendations .product-tile', '#similarPicks .product-tile', '#similarPicksPaginated li', '.verti-slider li', '.video-link-box', '#productsCatalog li'];
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
	var link = "";
	var PID = "";
	var brand = "";
	var name = "";
	var prod1 = "";
	var breadcrumb_str = "";

	breadcrumb_str = getBreadCrumb();
	prod = getProd();
	if($('.prd-sold-out').length > 0){
		current_status = 1;
	}
	else if($('.sold-product').length > 0){
		current_status = 1;
	}
	if($('.error-msgtxt').text().toUpperCase().split("HAS BEEN DISCONTINUED").length > 1){
		current_status = 1;
	}
	myPrice = getPrice();
	image = getImage();
	link = window.location.href;

	if(link.split(".html").length > 1){
		link = link.split(".html")[0];
		if(link.split("-").length > 1){
			link = link.split("-");
			PID = link[link.length - 1];
		}
	}
	cur_url = window.location.href;
	curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
	curData = JSON.stringify(curData);
	var jsonArr = [{'curDataJab': curData}];
	jsonArr = JSON.stringify(jsonArr);
	if($('[itemtype="http://schema.org/Product"]').length > 0){
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
	var prod1 = "";
	var brand = "";

	if($('#qa-prd-brand').length > 0){
		brand = $('#qa-prd-brand').text().trim();
	}
	if($('#qa-title-product').length > 0){
		prod1 = $('#qa-title-product').text().trim();

	}
	prod = brand+" "+prod1;

	if(brand == ""){
		prod = prod1;
	}
	if(prod1 == ""){
		prod = brand;
	}


	if(prod == ""){

		if($('.product-details .brand').length > 0){
			brand = $('.product-details .brand:eq(0)').text().trim();
		}
		if($('.product-details .product-title').length > 0){
			prod1 = $('.product-details .product-title:eq(0)').text().trim();
		}
		prod = brand+" "+prod1;

		if(brand == ""){
			prod = prod1;
		}
		if(prod1 == ""){
			prod = brand;
		}
	}
	if(prod == ""){

		brand = "";
		if($("[itemprop='brand']").length > 0){
			brand = $("[itemprop='brand']:eq(0)").text().trim();
		}
		if($("[itemprop='name']").length > 0){
			prod1 = $("[itemprop='name']:eq(0)").text().trim();
		}
		prod = brand+" "+prod1;

		if(brand == ""){
			prod = prod1;
		}
		if(prod1 == ""){
			prod = brand;
		}
	}

	if(prod == "Home"){
		prod = "";
	}

	if($('[itemtype="http://schema.org/Product"]').length > 0){
		return prod;
	}
	else{
		return "";
	}
	// //console.log("prod: "+prod);
}

function getImage(){
	var image = "";

	if($("[itemprop='image']").length > 0){
		image = $("[itemprop='image']").attr('src').trim();
	}
	else if($(".prd-imageview li img").length > 0){
		image = $(".prd-imageview li img").attr("src");
	}
	else if($('.prod_main_slider li').length > 0){
		image = $('.prod_main_slider li').eq(0).find('img').attr('src');
	}
	else if($('.product-details .primary-image').length > 0){
		image = $('.product-details .primary-image:eq(0)').attr('src');
	}
	

	// //console.log("image: "+image);
	return image;
}

function getPrice(){
	price = "";
	if($('[itemprop="price"]').length > 0)
	{
		price = $('[itemprop="price"]').text().trim();
	}
	else if($("#before_price").length > 0){
		price = $("#before_price").text().trim();
	}
	if(price == ""){
		if($('.product-details .actual-price').length > 0)
		{
			price = $('.product-details:eq(0) .actual-price:eq(0)').text().trim();
		}
	}
	
	
	if(price.toUpperCase().split("RS.").length > 1){
		price = price.toUpperCase().split("RS.");
		price = price[1];
	}
	else if(price.toUpperCase().split("RS").length > 1){
		price = price.toUpperCase().split("RS");
		price = price[1];
	}
	else if(price.toUpperCase().split("R").length > 1){
		price = price.toUpperCase().split("R");
		price = price[1];
	}
	if(price.toUpperCase().split(";").length > 1){
		price = price.toUpperCase().split(";");
		price = price[1];
	}
	price = price.split(",").join("").trim();
	price = parseFloat(price);

	if(isNaN(price)){
		price = 0;
	}

	return price;
}

function getAvailability(){
	var avail = 1;
	if($('.prd-sold-out').length > 0){
		avail = 0;
	}
	else if($('.sold-product').length > 0){
		avail = 0;
	}
	if($('.error-msgtxt').text().toUpperCase().split("HAS BEEN DISCONTINUED").length > 1){
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
	if(pid.split(".htm").length > 1){
		pid = pid.split(".htm");
		pid = pid[0];
	}
	
	if(pid.split("-").length > 1){
		pid = pid.split("-");
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
	if(pid.split(".htm").length > 1){
		pid = pid.split(".htm");
		pid = pid[0];
	}
	
	if(pid.split("-").length > 1){
		pid = pid.split("-");
		pid = pid[pid.length - 1];
	}
	if(link.split('jabong.com').length < 2){
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
	var len_bread = $('.breadcrumbs').find('a').length;

	for(i=0;i<len_bread;i++){
		breadcrumb = $('.breadcrumbs').find('a:eq('+ i +')').text().trim();
		bread_final += breadcrumb + "*~";
	}

	if(bread_final == ""){
		len_bread = $('.breadcrumb').find('a').length;

		for(i=0;i<len_bread;i++){
			breadcrumb = $('.breadcrumb').find('a:eq('+ i +')').text().trim();
			bread_final += breadcrumb + "*~";
		}
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

function sendCoupon(){
	couponToSend = [];
	var cur_link = window.location.href;
	var couponUrl = "";
	var couponCode = "";
	var couponText = "";
	var couponDesc = "";
	var couponExp = 0;
	var couponAt = 50;
	couponUrl = "http://www.jabong.com/";
	couponCode = "";
	couponText = "";
	couponDesc = "";

	if($("#catalogTopStrip .new-banner-box .d-tcell").length > 0){
		
		slider = $("#catalogTopStrip .new-banner-box .d-tcell");
		sliderLength = slider.length;

		for(i=0;i<sliderLength;i++){
			couponUrl = "http://www.jabong.com/";
			couponCode = "";
			couponText = "";
			couponDesc = "";

			if($("#catalogTopStrip .new-banner-box .d-tcell:eq("+i+")").find("a").length > 0){
				couponText = $("#catalogTopStrip .new-banner-box .d-tcell:eq("+i+")").find("a:eq(0)").text().trim();
				couponUrl = $("#catalogTopStrip .new-banner-box .d-tcell:eq("+i+")").find("a:eq(0)").attr("href").trim();

				if(couponUrl.split("www.jabong.com").length < 2){
					couponUrl = "http://www.jabong.com" + couponUrl;
				}
			}
			if($("#catalogTopStrip .new-banner-box .d-tcell:eq("+i+")").find("span").length > 0){
				couponText = couponText + " " + $("#catalogTopStrip .new-banner-box .d-tcell:eq("+i+")").find("span:eq(0)").text().trim();
			}

			if(couponText.split("code").length < 2 || couponText.split("Code").length < 2 || couponText.split("coupon").length < 2 || couponText.split("Coupon").length < 2 ){
				couponCode = "NO CODE REQUIRED";
			}

			if(couponUrl.split("?source=").length > 1 && couponCode == "NO CODE REQUIRED"){
				couponUrl = couponUrl.split("?source=");
				couponUrl = couponUrl[0].trim();
			}
			else if(couponUrl.split("&source=").length > 1 && couponCode == "NO CODE REQUIRED"){
				couponUrl = couponUrl.split("&source=");
				couponUrl = couponUrl[0].trim();
			}

			couponUrl = couponUrl.split("&amp;").join("&").trim();
			if(couponCode != ""){
				couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
			} 
		}
	}

	if($('#pdp-voucher-text').length > 0){
		couponUrl = "http://www.jabong.com/";
		couponCode = "";
		couponText = "";
		couponDesc = "";
		couponExp = 0;
		couponExp1 = "";
		couponExp2 = "";
		couponExp3 = "";
		couponExp4 = "";
		couponExp5 = "";
		couponCode = $('#pdp-voucher-text .cpn-code:eq(0)').text().trim();
		if(couponCode != couponCode.toUpperCase()){
			couponCode = "";
		}
		if($(".pdp-cpn-offer .pdp-offer-tooltip").length > 0){
			couponDesc = $(".pdp-cpn-offer .pdp-offer-tooltip:eq(0)").text().trim();
			if(couponDesc.split(". Valid").length > 1){
				couponText = couponDesc.split(". Valid");
				couponText = couponText[0].trim();
			}

			if(couponDesc.toLowerCase().split("valid till").length > 1){
				couponExp1 = couponDesc.toLowerCase().split("valid till");
				couponExp1 = couponExp1[1].trim();
				couponExp1 = couponExp1.split(".");
				couponExp1 = couponExp1[0].trim();

				couponExp2 = couponExp1.split(" ");
				couponExp3 = couponExp2[0];
				couponExp4 = couponExp2[1];
				couponExp5 = couponExp2[2];

				if(couponExp4.toUpperCase().split("JAN").length > 1){
					couponExp4 = "01";
				}
				else if(couponExp4.toUpperCase().split("FEB").length > 1){
					couponExp4 = "02";
				}
				else if(couponExp4.toUpperCase().split("MAR").length > 1){
					couponExp4 = "03";
				}
				else if(couponExp4.toUpperCase().split("APR").length > 1){
					couponExp4 = "04";
				}
				else if(couponExp4.toUpperCase().split("MAY").length > 1){
					couponExp4 = "05";
				}
				else if(couponExp4.toUpperCase().split("JUN").length > 1){
					couponExp4 = "06";
				}
				else if(couponExp4.toUpperCase().split("JUL").length > 1){
					couponExp4 = "07";
				}
				else if(couponExp4.toUpperCase().split("AUG").length > 1){
					couponExp4 = "08";
				}
				else if(couponExp4.toUpperCase().split("SEP").length > 1){
					couponExp4 = "09";
				}
				else if(couponExp4.toUpperCase().split("OCT").length > 1){
					couponExp4 = "10";
				}
				else if(couponExp4.toUpperCase().split("NOV").length > 1){
					couponExp4 = "11";
				}
				else if(couponExp4.toUpperCase().split("DEC").length > 1){
					couponExp4 = "12";
				}
				else{
					couponExp4 = 0;
				}
				if(couponExp4 != 0){
					couponExp = couponExp5+"-"+couponExp4+"-"+couponExp3+" 23:59:59";
				}
			}
			else {
				couponExp = 0;
			}
		}

		if(couponUrl.split("?source=").length > 1 && couponCode == "NO CODE REQUIRED"){
			couponUrl = couponUrl.split("?source=");
			couponUrl = couponUrl[0].trim();
		}
		else if(couponUrl.split("&source=").length > 1 && couponCode == "NO CODE REQUIRED"){
			couponUrl = couponUrl.split("&source=");
			couponUrl = couponUrl[0].trim();
		}
		couponUrl = couponUrl.split("&amp;").join("&").trim();

		if(couponCode != ""){
			couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), encodeURIComponent(couponExp), encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
		} 
	}

	if($('#click-offer').length > 0){
		couponUrl = "http://www.jabong.com/";
		couponCode = "";
		couponText = "";
		couponDesc = "";
		couponCode = $('.pdp-cpn-offer .cpn-code:eq(0)').text().trim();
		if(couponCode != couponCode.toUpperCase()){
			couponCode = "";
		}
		couponUrl = couponUrl.split("&amp;").join("&").trim();

		if(couponCode != ""){
			couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
		} 
	}

	if($("#qa-Offers-title").length > 0){
		
		slider = $("#qa-Offers-title").parent().parent().html().split('id="qa-promotion');
		sliderLength = slider.length;

		for(i=1;i<sliderLength;i++){
			couponUrl = "http://www.jabong.com/";
			couponCode = "";
			couponText = "";
			couponDesc = "";
			cp = slider[i].split("</a>");
			cp = cp[0];
			couponUrl = cp.split('href="');
			couponUrl = couponUrl[1];

			couponUrl = couponUrl.split('"');
			couponUrl = couponUrl[0].trim();

			if(couponUrl.split("?").length > 1){
				couponUrl1 = couponUrl.split(".com/");
				couponUrl1 = couponUrl1[0]+".com/";
				couponUrl2 = couponUrl.split("?");
				couponUrl2 = "?"+couponUrl2[1];
				couponUrl = couponUrl1+"all-products"+couponUrl2;

			}
			// console.log(couponUrl);
			couponText = cp.split(">");
			couponText = couponText[1].trim();
			// console.log(couponText);

			if(couponText.split("Use code:").length > 1){
				couponCode = couponText.split("Use code:");
				couponCode = couponCode[1].trim();
				// console.log(couponCode);
				if(couponCode != couponCode.toUpperCase()){
					couponCode = "";
				}
			}
			if(couponUrl.split("?source=").length > 1 && couponCode == "NO CODE REQUIRED"){
				couponUrl = couponUrl.split("?source=");
				couponUrl = couponUrl[0].trim();
			}
			else if(couponUrl.split("&source=").length > 1 && couponCode == "NO CODE REQUIRED"){
				couponUrl = couponUrl.split("&source=");
				couponUrl = couponUrl[0].trim();
			}
			couponUrl = couponUrl.split("&amp;").join("&").trim();

			if(couponCode != ""){
				couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
			} 
		}


		slider = $("#qa-Offers-title").parent().parent().html().split('id="qa-bundle');
		sliderLength = slider.length;

		for(i=1;i<sliderLength;i++){
			couponUrl = "http://www.jabong.com/";
			couponCode = "";
			couponText = "";
			couponDesc = "";
			cp_url = "";
			cp = slider[i].split("</a>");
			cp = cp[0];
			couponUrl = cp.split('href="');
			couponUrl = couponUrl[1];

			couponUrl = couponUrl.split('"');
			couponUrl = couponUrl[0].trim();

			cp_url = slider[i].split("</a>");
			cp_url = cp_url[0];
			if(cp_url.split("selectBundle").length > 1){
				cp_url = cp_url.split("selectBundle");
				cp_url = cp_url[1];
				cp_url = cp_url.split("bundle_");
				cp_url = cp_url[1];
				cp_url = cp_url.split("'");
				cp_url = cp_url[0].trim();
			}

			if(couponUrl.split("?").length > 1){
				couponUrl = couponUrl.split("?");
				couponUrl = couponUrl[0].trim();
			}
			couponUrl = couponUrl+"?bundle=bundle_"+cp_url;
			couponUrl1 = couponUrl.split(".com/");
			couponUrl1 = couponUrl1[0]+".com/";
			couponUrl2 = couponUrl.split("?");
			couponUrl2 = "?"+couponUrl2[1];
			couponUrl = couponUrl1+"all-products"+couponUrl2;
			couponText = cp.split(">");
			couponText = couponText[1].trim();

			couponCode = "NO CODE REQUIRED";
			if(couponUrl.split("?source=").length > 1 && couponCode == "NO CODE REQUIRED"){
				couponUrl = couponUrl.split("?source=");
				couponUrl = couponUrl[0].trim();
			}
			else if(couponUrl.split("&source=").length > 1 && couponCode == "NO CODE REQUIRED"){
				couponUrl = couponUrl.split("&source=");
				couponUrl = couponUrl[0].trim();
			}
			couponUrl = couponUrl.split("&amp;").join("&").trim();
			
			if(couponCode != ""){
				couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
			} 
		}
	}

	if($("#filter-container").length > 0 && $("#filter-container .offers").length > 0){

		slider = $("#filter-container .offers .filter-link");
		sliderLength = slider.length;

		for(i=0;i<sliderLength;i++){
			couponUrl = "http://www.jabong.com/";
			couponCode = "";
			couponText = "";
			couponDesc = "";
			couponExp = 0;
			cur_link = window.location.href;

			if($("#filter-container .offers .filter-link:eq("+i+")").attr("href")){
				couponUrl = $("#filter-container .offers .filter-link:eq("+i+")").attr("href").trim();
				if(couponUrl.split("jabong.com").length < 2){
					couponUrl = "http://www.jabong.com/"+couponUrl;
				}
			}

			if($("#filter-container .offers .filter-link:eq("+i+")").attr("title")){
				couponText = $("#filter-container .offers .filter-link:eq("+i+")").attr("title").trim();
			}

			if(couponText.split("Use code:").length > 1){
				couponCode = couponText.split("Use code:");
				couponCode = couponCode[1].trim();

			}
			else if(couponText.split("code :").length > 1){
				couponCode = couponText.split("code :");
				couponCode = couponCode[1].trim();

			}
			else if(couponText.split("Code:").length > 1){
				couponCode = couponText.split("Code:");
				couponCode = couponCode[1].trim();

			}
			else if(couponText.split("Code :").length > 1){
				couponCode = couponText.split("Code :");
				couponCode = couponCode[1].trim();

			}
			else{
				couponCode = "";
			}

			if(couponCode.toUpperCase().trim() != couponCode.trim()){
				couponCode = "";
			}
			
			if(couponCode != ""){
				couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
			} 
		}
	}

	if($(".header-top").length > 0 && $(".header-top .offer").length > 0){

		slider = $(".header-top .offer .filter-link");
		sliderLength = slider.length;

		couponUrl = "http://www.jabong.com/";
		couponCode = "";
		couponText = "";
		couponDesc = "";
		couponExp = 0;
		cur_link = window.location.href;

		if($(".header-top .offer a").attr("href")){
			couponUrl = $(".header-top .offer a:eq(0)").attr("href").trim();
			if(couponUrl.split("jabong.com").length < 2){
				couponUrl = "http://www.jabong.com/"+couponUrl;
			}
		}

		if($(".header-top .offer a p")){
			couponText = $(".header-top .offer a:eq(0) p:eq(0)").text().trim();
		}

		if($(".header-top .offer a span")){
			couponCode = $(".header-top .offer a:eq(0) span:eq(0)").text().trim();
			if(couponCode.split("Use code:").length > 1){
				couponCode = couponCode.split("Use code:");
				couponCode = couponCode[1].trim();

			}
			else if(couponCode.split("code :").length > 1){
				couponCode = couponCode.split("code :");
				couponCode = couponCode[1].trim();

			}
			else if(couponCode.split("Code:").length > 1){
				couponCode = couponCode.split("Code:");
				couponCode = couponCode[1].trim();

			}
			else if(couponCode.split("Code :").length > 1){
				couponCode = couponCode.split("Code :");
				couponCode = couponCode[1].trim();

			}
			else{
				couponCode = "";
			}

			if(couponCode.toUpperCase().trim() != couponCode.trim()){
				couponCode = "";
			}
		}

		

		if(couponCode != ""){
			couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
		} 
	}
	if(couponToSend.length > 0){
		couponToSend = JSON.stringify(couponToSend);
		var jsonArr = [{'couponsExt': couponToSend}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(1, jsonArr, 15, doNothing, []);  
	}
}
sendCoupon()

var cur_url = window.location.href;
if(cur_url.split("jabong.com/quicklist").length > 1){
	if($('.save-for-later .cart-heading').length>0){
		importWishGlobal('.save-for-later .cart-heading:eq(0)', 'after', jabWishList);
	}
}

function jabWishList(){
	wishListJab = [];
	var link = "";
	var url = "";
	var prod = "";
	var image = "";
	var price = "";
	var PID = "";
	var pos = 50;
	var brand = "";

	if($('.save-for-later #main .cart-bottom-content .main-wrapper section').length > 0) {
		var slider = $('.save-for-later #main .cart-bottom-content .main-wrapper section');
		var sliderLength = $('.save-for-later #main .cart-bottom-content .main-wrapper section').length;

		for(i=0;i<sliderLength;i++){
			link = "";
			url = "";
			prod = "";
			image = "";
			price = "";
			PID = "";
			if($('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-img-container a').length > 0){
				link = $('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-img-container a').attr('href');
				url = link;
				if(link.split("jabong.com").length < 2){
					url = "http://www.jabong.com/"+url;
				}
				if(link.split(".html").length > 1){
					link = link.split(".html")[0];
					if(link.split("-").length > 1){
						link = link.split("-");
						PID = link[link.length - 1];
					}
				}
				else{
					PID = "";
				}
			}
			else{
				link = "";
				PID = "";
			}
			if(PID != ""){
				if($('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-right-main .prod-special-price').length > 0){
					price = $('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-right-main .prod-special-price:eq(0)').text().trim();
					price = filter_price(price);
				}
				else if($('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-right-main .prod-price').length > 0){
					price = $('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-right-main .prod-price:eq(0)').text().trim();
					price = filter_price(price);
				}
			}
			else{
				price = "";
			}
			if(isNaN(price)){
				price = "";
			}

			if($('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-right-main .item-head-main').length > 0){
				if($('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-right-main .item-head-main').length > 0){
					brand = $('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-right-main .item-head-main:eq(0) .item-heading:eq(0)').text().trim();
				}
				else{
					brand = "";
				}
				if($('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-right-main .item-head-main:eq(0) .item-brief:eq(0)').attr('title')){
					prod = brand + " " + $('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-right-main .item-head-main:eq(0) .item-brief:eq(0)').attr('title').trim();

				}
				else if($('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-right-main .item-head-main:eq(0) .item-brief:eq(0)')){
					prod = brand + " " + $('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-right-main .item-head-main:eq(0) .item-brief:eq(0)').text().trim();
				}
				else{
					prod = brand; 
				}
			}

			if($('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-img-container img').attr("data-src-320")){
				image = $('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-img-container img:eq(0)').attr('data-src-320').trim();
			}
			else if($('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-img-container img').attr("src")){
				image = $('.save-for-later #main .cart-bottom-content .main-wrapper section:eq('+ i +')').find('.cart-img-container img:eq(0)').attr('src').trim();
			}

			if(PID != "" && price != ""){
				wishListJab.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
			}
		}

		wishJson = JSON.stringify(wishListJab);
		var jsonArr = [{'wishList': wishJson}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(1, jsonArr, 17, displayImportResp, []);  
	}

}

function displayImportResp(data){
	alert(data);
}



if(cur_url.split(".jabong.com/cart").length > 1){
	var checkPick = ".cart-summery:eq(0) .remove-coupon";
	var selector = ".cart-summery:eq(0) .remove-coupon";
	var attr = "data-coupon";
	var webID = 50;
	var homeLink = "http://www.jabong.com/";
	pickAppliedCpn(checkPick, selector, attr, webID, homeLink);

	if($(".cart-summery").length > 0 && $("#couponClick").length == 0){
		var selectorACIcon = ".cart-summery:eq(0)";
		var position = "after";
		var parent = "none";
		var method = "POST";
		var api = "http://www.jabong.com/cart/applycoupon/";
		var csrf = $("input[name='_csrf']").val().trim();
		var postFields = {"couponcode": "**", "_csrf": encodeURIComponent(csrf)};
		var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1}];
		details = JSON.stringify(details);
		arrayMsg = [];
		displayACIcon(selectorACIcon, parent, position, 1, details);
		keepCheckingACIcon(selectorACIcon, parent, position, 1, details);
	}
} 

savings = [];
bestSaving = 0;
bestCoupon = "";
function startSaving(data){

	data = JSON.parse(data);
	var nowCode = "";
	var nowSaving = "";
	var resp = data[0].data;
	var code = data[0].code.trim();
	var cpnMsg = "";
	var couponAt = 50;
	var csaving = 0;
	var ecashing = 0;
	var savingsObject = {};
	nowCode = code;
	if(typeof(resp) == "object" && code != ""){
		if(resp.error){
			if(resp.msg && resp.msg.error){
				cpnMsg = resp.msg.error[0].trim();
				cpnMsg = cpnMsg.replace(/(<([^>]+)>)/ig,"");
				arrayMsg.push([code, encodeURIComponent(cpnMsg), couponAt ]);
			}
			// console.log("code: "+nowCode+" nowSaving "+nowSaving);
		}
	}
	else if(typeof(resp) == "string" && code != ""){
		wrapper= document.createElement('div');
		wrapper.innerHTML= resp;
		if($(wrapper).find(".summary-content").length > 0 && $(wrapper).find(".summary-content .left").length > 0){
			var divs = $(wrapper).find(".summary-content .left").length;
			for(var d=0;d<divs;d++){
				if($(wrapper).find(".summary-content .left:eq("+d+")").text().trim() == "Coupon Discount"){
					var csaving = $(wrapper).find(".summary-content .right:eq("+d+") .standard-price:eq(0)").text().trim();
					csaving = filter_price(csaving);
					if(isNaN(csaving)){
						csaving = 0
					}
					else if(csaving > bestSaving){
						bestSaving = csaving;
						bestCoupon = code;
					}
					// displayEachSavings(csaving);
					cpnMsg = "SUCCESS";
					arrayMsg.push([code, encodeURIComponent(cpnMsg), couponAt ]);
					// console.log("code: "+nowCode+" nowSaving "+nowSaving);
				}
			}
		}
	}
	savingsLen = savings.length;
	savingsObject["code"] = code;
	savingsObject["saving"] = csaving;
	savingsObject["ecash"] = ecashing;
	savings[savingsLen] = savingsObject;
	localStorage.savings = JSON.stringify(savings);
	displayEachCpnSaving(code, csaving, ecashing);
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

var mainClick = 0;
var clickedRemove = 0;
var deleteAC = 0;
var timerStart = 0;
function applyBestCoupon(){
	if(localStorage.retryPostLoad==1){
		bestCoupon = localStorage.bestCouponHere;
		bestSaving = localStorage.bestSavingHere;
	}
	var allowNow = 0;
	if(localStorage.retryPostLoad==1 || ( parseInt(bestSaving) != 0 && bestCoupon.trim() != "")){
		if(document.getElementsByClassName("remove-coupon").length > 0 && clickedRemove == 0){
			document.getElementsByClassName("remove-coupon")[0].click();
			clickedRemove = 1;
			localStorage.bestCouponHere = bestCoupon;
			localStorage.bestSavingHere = bestSaving;
		}
		if(localStorage.retryPostLoad==1){
			bestCoupon = localStorage.bestCouponHere;
			bestSaving = localStorage.bestSavingHere;
			$(".hdc-sav-amt").text(parseInt(bestSaving));
		}
		if($(".have-a-coupon").length > 0){
			if(mainClick < 5){
				document.getElementsByClassName("have-a-coupon")[0].click();
				mainClick++;
			}
			if($("#applyCoupon").length > 0 && $(".apply-coupon-block:eq(0) .input-group-addon:eq(0)").length > 0){
				$("#applyCoupon").val(bestCoupon.trim());
				document.getElementsByClassName("apply-coupon-block")[0].getElementsByClassName("input-group-addon")[0].click();
				localStorage.retryPostLoad = 0;
				displayFinalSavings();
			}
			else{
				setTimeout(applyBestCoupon, 1000);
			}
		}
		else{
			if(timerStart > 7){
				localStorage.retryPostLoad = 1;
				window.location.reload();
			}
			timerStart++;
			setTimeout(applyBestCoupon, 1000);
		}
	}
	else if(localStorage.retryPostLoad==1){
		setTimeout(applyBestCoupon, 1000);
	}
	else{
		displayNoSavings();
	}
	if(deleteAC == 0){
		if(arrayMsg.length > 0 && arrayMsg.length != ""){
			arrayMsg = JSON.stringify(arrayMsg);
			var jsonArr = [{'cpn_msg': arrayMsg}];
			jsonArr = JSON.stringify(jsonArr);
			deleteAC = 1;
			sendMessage(1, jsonArr, 12, doNothing, []);
			arrayMsg = [];
		}
	}
}

if(localStorage.retryPostLoad==1){
	applyBestCoupon();
}

