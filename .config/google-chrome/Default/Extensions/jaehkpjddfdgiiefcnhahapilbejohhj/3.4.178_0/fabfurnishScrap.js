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

someFlag = 0;
// function sendProdCpn(){
// 	// console.log("sendProdCpn was called");
// 	if(someFlag == 0 && $('#coupon_box_div #code').length > 0){
// 		cpnProd = [];
// 		var couponText = "";
// 		var couponCode = "";
// 		var couponURL = "";
// 		var couponExp = "0000-00-00 00:00:00";
// 		var couponDesc = "";
// 		var couponAt = 1000;
// 		if($('#coupon_box_div #code').length > 0){
// 			couponCode = $('#coupon_box_div #code').attr('value').trim();
// 			// console.log("couponCode: "+couponCode);
// 		}
// 		cpnProd.push([couponCode, couponText, couponExp, couponDesc, couponAt]);
// 		cpnProd = JSON.stringify(cpnProd);
// 		// console.log("cpnData: "+cpnProd);
// 		var jsonArr = [{'cpnData': cpnProd}];
// 		jsonArr = JSON.stringify(jsonArr);
// 		sendMessage(1, jsonArr, 10, doNothing, []);
// 		someFlag = 1;
// 	}
// 	else{
// 		setTimeout(function(){ sendProdCpn(); }, 1000);
// 	}
// }

// sendProdCpn();

function sendPairs(){
	arrayToSend = [];


	if($('.flotImgPriceNew').length > 0){
		var slider = $('.flotImgPriceNew');
		var sliderLength = slider.length;
		var link;
		var price;
		var PID;
		var pid1;

		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			pid1 = "";
			if($('.flotImgPriceNew:eq('+ i +')').length > 0){
				link = $('.flotImgPriceNew:eq('+ i +')').attr("href");
				if(link != ""){
					if(link.split("ct=").length > 1){
						link = decodeURIComponent(link);
						link = link.split("ct=");
						link = link[1];
					}
					if(link.split(".html").length > 1){
						link = link.split(".html");
						pid1 = link[0];
					}
					if(pid1.split("-").length > 1){
						pid1 = pid1.split("-");
						pid1 = pid1[pid1.length - 1];
					}
					if(parseFloat(pid1) != 0){
						PID = pid1;

					}
					else{
						PID = "";
					}
					if(PID.split(".com/").length > 1){
						PID = PID.split(".com/");
						PID = PID[1];
					}
				}
			}

			if(PID != ""){

				if($('.flotImgPriceNew:eq('+ i +')').find('.orngClrTextNew').length > 0){
					price = $('.flotImgPriceNew:eq('+ i +')').find('.orngClrTextNew').text();
					price = filter_price(price);
				}
				else{
					price = "";
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

if($('.topSeller a').length > 0){
	var slider = $('.topSeller a');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;
	var pid1;

	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		pid1 = "";
		if($('.topSeller a:eq('+ i +')').length > 0){
			link = $('.topSeller a:eq('+ i +')').attr("href");
			if(link != ""){
				if(link.split("ct=").length > 1){
					link = decodeURIComponent(link);
					link = link.split("ct=");
					link = link[1];
				}
				if(link.split(".html").length > 1){
					link = link.split(".html");
					pid1 = link[0];
				}
				if(pid1.split("-").length > 1){
					pid1 = pid1.split("-");
					pid1 = pid1[pid1.length - 1];
				}
				if(parseFloat(pid1) != 0){
					PID = pid1;

				}
				else{
					PID = "";
				}
				if(PID.split(".com/").length > 1){
					PID = PID.split(".com/");
					PID = PID[1];
				}
			}
		}

		if(PID != ""){

			if($('.topSeller a:eq('+ i +')').find('p').length > 0){
				price = $('.topSeller a:eq('+ i +')').find('p:eq(0)').html();
				price = price.split("<br>")[1];
				price = filter_price(price);
			}
			else{
				price = "";
			}
		}
		else{
			price = "";
		}

		if(PID != "" && price != "" || price == 0){
			arrayToSend.push([PID, price]);
		}
    } // for ends1

}


if($('.productsCatalog li').length > 0){
	var slider = $('.productsCatalog li');
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
		if($('.productsCatalog li:eq('+ i +') .itm-link').length > 0){
			link = $('.productsCatalog li:eq('+ i +') .itm-link').attr("href");
			if(link != ""){
				if(link.split("ct=").length > 1){
					link = decodeURIComponent(link);
					link = link.split("ct=");
					link = link[1];
				}
				if(link.split(".html").length > 1){
					link = link.split(".html");
					pid1 = link[0];
				}
				if(pid1.split("-").length > 1){
					pid1 = pid1.split("-");
					pid1 = pid1[pid1.length - 1];
				}
				if(parseFloat(pid1) != 0){
					PID = pid1;

				}
				else{
					PID = "";
				}
				if(PID.split(".com/").length > 1){
					PID = PID.split(".com/");
					PID = PID[1];
				}
			}
		}
		if(PID != ""){

			if($('.productsCatalog li:eq('+ i +') .itmTitleCont').length > 0){
				prod = $('.productsCatalog li:eq('+ i +') .itmTitleCont:eq(0)').text().trim();
			}
			if(prod == "" || prod.split("..").length > 1){
				if($('.productsCatalog li:eq('+ i +') .itm-imageWrapper').attr("title")){
					prod = $('.productsCatalog li:eq('+ i +') .itm-imageWrapper:eq(0)').attr("title");
				} 
			}

			if($('.productsCatalog li:eq('+ i +') .itm-img').length > 0){
				image = $('.productsCatalog li:eq('+ i +') .itm-img:eq(0)').attr("src").trim();
			}
			if(image == ""){
				if($('.productsCatalog li:eq('+ i +') .itm-imageWrapper').length > 0){
					image = $('.productsCatalog li:eq('+ i +') .itm-imageWrapper:eq(0)').attr("id").trim();
				}
			}
			
			if($('.productsCatalog li:eq('+ i +') .soldOutText').length > 0){
				oos = 1;
			}
			else{
				oos = 0;
			}


			if($('.productsCatalog li:eq('+ i +')').length > 0){
				if($('.productsCatalog li:eq('+ i +') .cat_final_price:eq(0)').length > 0){
					price = $('.productsCatalog li:eq('+ i +') .cat_final_price:eq(0)').text().trim();
					price = filter_price(price);

				}
				else if($('.productsCatalog li:eq('+ i +') .catItmPriceBox_orange .itm-priceSpecialnew').length > 0){
					price = $('.productsCatalog li:eq('+ i +') .catItmPriceBox_orange .itm-priceSpecialnew').text().trim();
					price = filter_price(price);

				}
				else if($('.productsCatalog li:eq('+ i +') .itm-priceSpecial').length > 0){
					price = $('.productsCatalog li:eq('+ i +') .itm-priceSpecial:eq(0)').text().trim();
					price = filter_price(price);

				}
				else{

					price = $('.productsCatalog li:eq('+ i +') .itm-price:eq(0)').text().trim();
					price = filter_price(price);
				}

			}
			else{
				price = "";
			}


    } //PID ends

    else{
    	price = "";
    }

    if(PID != "" && price != ""){
    	arrayToSend.push([PID, price, prod, image, oos]);
    }

    } // for ends1

}

if($('.prodVertRecommendLi').length > 0){
	var slider = $('.prodVertRecommendLi');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;

	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		if($('.prodVertRecommendLi:eq('+ i +') a').length > 0){
			link = $('.prodVertRecommendLi:eq('+ i +') a:eq(0)').attr("href");
			if(link != ""){
				if(link.split("ct=").length > 1){
					link = decodeURIComponent(link);
					link = link.split("ct=");
					link = link[1];
				}
				if(link.split(".html").length > 1){
					link = link.split(".html");
					pid1 = link[0];
				}
				if(pid1.split("-").length > 1){
					pid1 = pid1.split("-");
					pid1 = pid1[pid1.length - 1];
				}
				if(parseFloat(pid1) != 0){
					PID = pid1;

				}
				else{
					PID = "";
				}
				if(PID.split(".com/").length > 1){
					PID = PID.split(".com/");
					PID = PID[1];
				}
			}
		}

		if(PID != ""){

			if($('.prodVertRecommendLi:eq('+ i +') .recommProdPrice').length > 0){
				price = $('.prodVertRecommendLi:eq('+ i +') .recommProdPrice').text().trim();
				price = filter_price(price);


			}
			else{
				price = "";
			}


    } //PID ends

    else{
    	price = "";
    }

    if(PID != "" && price != ""){
    	arrayToSend.push([PID, price]);
    }

    } // for ends1

}


if($('.longProdRecommendLi').length > 0){
	var slider = $('.longProdRecommendLi');
	var sliderLength = slider.length;
	var link;
	var price;
	var PID;

	for(i=0;i<sliderLength;i++){
		price = "";
		PID = "";
		if($('.longProdRecommendLi:eq('+ i +') a').length > 0){
			link = $('.longProdRecommendLi:eq('+ i +') a:eq(0)').attr("href");
			if(link != ""){
				if(link.split("ct=").length > 1){
					link = decodeURIComponent(link);
					link = link.split("ct=");
					link = link[1];
				}
				if(link.split(".html").length > 1){
					link = link.split(".html");
					pid1 = link[0];
				}
				if(pid1.split("-").length > 1){
					pid1 = pid1.split("-");
					pid1 = pid1[pid1.length - 1];
				}
				if(parseFloat(pid1) != 0){
					PID = pid1;

				}
				else{
					PID = "";
				}
				if(PID.split(".com/").length > 1){
					PID = PID.split(".com/");
					PID = PID[1];
				}
			}
		}
		if(PID != ""){

			if($('.longProdRecommendLi:eq('+ i +') .recommProdPrice').length > 0){
				price = $('.longProdRecommendLi:eq('+ i +') .recommProdPrice').text().trim();
				price = filter_price(price);
			}
			else{
				price = "";
			}


    } //PID ends

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
	var jsonArr = [{'pairsFab': arrayToSend}];
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
	var PID = "";
	var link = window.location.href;
	var pid1 = "";
	var avail = getAvailability();
	if(avail == 0){
		current_status = 1;
	}
	else if(avail == -1){
		current_status = 2;
	}
	else{
		current_status = 0;
	}

	prod = getProd();
	
	myPrice = getPrice();
	image = getImage();

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
		pid = pid.split(".htm")[0];
	}
	if(pid.split("-").length > 1){
		pid = pid.split("-");
		pid = pid[pid.length - 1];
	}

	PID = pid;

	cur_url = window.location.href;
	// console.log("prod: "+prod);
	// console.log("image: "+image);
	// console.log("myPrice: "+myPrice);
	// console.log("cur_url: "+cur_url);
	// console.log("current_status: "+current_status);
	// console.log("PID: "+PID);
	if(myPrice != 0 && myPrice != "" && PID != ""){ 
		curData.push([prod, image, myPrice, cur_url, current_status, PID]);
		curData = JSON.stringify(curData);
		var jsonArr = [{'curDataFab': curData}];
		jsonArr = JSON.stringify(jsonArr);
		if($('[itemtype="http://schema.org/Product"]').length>0){
			sendMessage(0, jsonArr, 0, doNothing, []);
		}
	}
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);




//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;
if($('[itemtype="http://schema.org/Product"]').length > 0){
	check_prod_pg = 1;
}
function getProd(){
	var prod = "";
	prod = $('[itemprop="name"]:eq(0)').text().trim();
	if($('[itemtype="http://schema.org/Product"]').length>0){
		return prod;
	}
	else {
		return "";
	}
}

function getImage(){
	var image = "";
	if($('meta[property="og:image"]').length > 0 && $('meta[property="og:image"]').attr('content')){
		image = $('meta[property="og:image"]').attr('content').trim();
	}
	return image;
}

function getPrice(){
	price = "";
	if($('#final_price_text').length > 0){
		price = $('#final_price_text').text().trim();
	}
	else if($('#product_special_price').length > 0){
		price = $('#product_special_price').text().trim();
	}
	else if($('meta[itemprop="price"]').length > 0 && $('meta[itemprop="price"]').attr('content')){
		price = $('meta[itemprop="price"]').attr('content').trim();

		if($('#coupon_block').length > 0){
			price1 = $('#coupon_block').text();
			if(price1.split("Get it for").length > 1){
				price = price1.split("Get it for")[1].trim();
			}
		}
	}

	price = filter_price(price);
	return price;
}

function getAvailability(){
	var avail = 1;
	if($('#SoldOut').css('display') == "block"){
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
	if(pid.split(".htm").length > 1){
		pid = pid.split(".htm")[0];
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
		pid = pid.split(".htm")[0];
	}
	if(pid.split("-").length > 1){
		pid = pid.split("-");
		pid = pid[pid.length - 1];
	}
	if(link.split('fabfurnish.com').length < 2){
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
	var len_bread = $('.breadcrumbWideDesign').find('a').length;

	for(i=0;i<len_bread;i++){
		breadcrumb = $('.breadcrumbWideDesign').find('a:eq('+ i +')').text().trim();
		bread_final += breadcrumb + "*~";
	}

	return bread_final;


}

function sendCoupon(){
	$ = jQuery.noConflict();
	couponToSend = [];
	var cur_link = window.location.href;

	if($('#code').length > 0){
		var couponUrl = "http://www.fabfurnish.com/";
		var couponCode = "";
		var couponText = "";
		var couponDesc = "";
		var couponExp = 0;
		var couponAt = 1000;

		couponCode = $("#code").val();
		if(couponCode == ""){
			couponCode = $("#code").text().trim();
		}

		if($(".getit_cupon .extra-code").length > 0){
			couponText = $(".getit_cupon .extra-code:eq(0)").text().trim();
		}

		if($(".getit_cupon .show-tooltip li").length > 0){
			couponDesc = $(".getit_cupon .show-tooltip:eq(0) li:eq(0)").text().trim();
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
sendCoupon();


var cur_url = window.location.href;

if(cur_url.split("fabfurnish.com/customer/wishlist").length > 1){
	if($('#wishlist').length>0){
		importWishGlobal('#wishlist', 'before', fabWishList);
	}
}

function fabWishList(){
	$ = jQuery.noConflict();
	wishListFab = [];
	var link = "";
	var url = "";
	var prod = "";
	var image = "";
	var price = "";
	var PID = "";
	var pos = 1000;
	var brand = "";

	if($('.wishlistItems .ui-borderTop').length > 0) {
		var slider = $('.wishlistItems .ui-borderTop');
		var sliderLength = $('.wishlistItems .ui-borderTop').length;

		for(i=0;i<sliderLength;i++){
			link = "";
			url = "";
			prod = "";
			image = "";
			price = "";
			PID = "";
			if($('.wishlistItems .ui-borderTop:eq('+ i +')').find('.itm-wishlistDetails a').length > 0){
				link = $('.wishlistItems .ui-borderTop:eq('+ i +')').find('.itm-wishlistDetails:eq(0) a:eq(0)').attr('href');
				if(link.split("fabfurnish.com").length < 2){
					link = "https://www.fabfurnish.com" + link;
				}
				url = link;

				if(link.split("ct=").length > 1){
					link = decodeURIComponent(link);
					link = link.split("ct=");
					link = link[1];
				}
				if(link.split(".html").length > 1){
					link = link.split(".html");
					pid1 = link[0];
				}
				if(pid1.split("-").length > 1){
					pid1 = pid1.split("-");
					pid1 = pid1[pid1.length - 1];
				}
				if(parseFloat(pid1) != 0){
					PID = pid1;

				}
				else{
					PID = "";
				}
				if(PID.split(".com/").length > 1){
					PID = PID.split(".com/");
					PID = PID[1];
				}
			}
			else{
				link = "";
				PID = "";
			}
			if(PID != ""){
				if($('.wishlistItems .ui-borderTop:eq('+ i +')').find('.wishlistSpecialPrice').length > 0){
					price = $('.wishlistItems .ui-borderTop:eq('+ i +')').find('.wishlistSpecialPrice:eq(0)').text().trim();
					price = filter_price(price);
				}
				else if($('.wishlistItems .ui-borderTop:eq('+ i +')').find('.wishlistNormalPrice').length > 0){
					price = $('.wishlistItems .ui-borderTop:eq('+ i +')').find('.wishlistNormalPrice:eq(0)').text().trim();
					price = filter_price(price);
				}
				else if($('.wishlistItems .ui-borderTop:eq('+ i +')').find('.price p').length > 0){
					price = $('.wishlistItems .ui-borderTop:eq('+ i +')').find('.price:eq(0) p:eq(0)').text().trim();
					price = filter_price(price);
				}

			}
			else{
				price = "";
			}
			if(isNaN(price)){
				price = "";
			}

			if($('.wishlistItems .ui-borderTop:eq('+ i +')').find('.itm-wishlistDetails a').length > 0){

				prod = $('.wishlistItems .ui-borderTop:eq('+ i +')').find('.itm-wishlistDetails:eq(0) a:eq(0)').text().trim();
			}

			if($('.wishlistItems .ui-borderTop:eq('+ i +')').find('.itm-wishlistImg img').length > 0){
				image = $('.wishlistItems .ui-borderTop:eq('+ i +')').find('.itm-wishlistImg img:eq(0)').attr('src').trim();
			}
			prod = prod.split("'").join("").trim();
			prod = prod.split('"').join('').trim();
			if(PID != "" && price != ""){
				wishListFab.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
			}
			// console.log("price: "+price);
			// console.log("prod: "+prod);
			// console.log("image: "+image);
			// console.log("PID: "+PID);
			// console.log("url: "+url);

		}
    // console.log("Wishlist: " + wishListFab);
    wishJson = JSON.stringify(wishListFab);
    var jsonArr = [{'wishList': wishJson}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 17, alertWLResp, []);  
    // console.log("WishlistJSON: " + wishJson);
}

}
function alertWLResp(data){
	alert(data);
}

function getAppliedCpn(){
	if($(".cart-tb-cell-total .i-remove").length > 0){
		var coupon = $(".cart-tb-cell-total .i-remove").parent().text().trim();
		if(coupon.split("Unselect").length > 1){
			coupon = coupon.split("Unselect");
			coupon = coupon[0].trim();
		}
		var someDate = new Date();
		var numberOfDaysToAdd = 5;
		someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
		var dd = someDate.getDate();
		var mm = someDate.getMonth() + 1;
		var y = someDate.getFullYear();
		if(mm < 10){
			mm = "0"+mm;
		}
		if(dd < 10){
			dd = "0"+dd;
		}
		var expTime = y + '-'+ mm + '-'+ dd + " 23:59:59";
		if(coupon.split("(").length > 1){
			coupon = coupon.split("(");
			coupon = coupon[1];
			coupon = coupon.split(")");
			coupon = coupon[0].trim();
		}
		if(coupon != "" && coupon == coupon.toUpperCase()){
			var jsonArr = [{'coupon': encodeURIComponent(coupon.trim()), 'url': "https://www.fabfurnish.com/", 'expTime': expTime, 'webID': 1000}];
			jsonArr = JSON.stringify(jsonArr);
			sendMessage(1, jsonArr, 38, doNothing, []);
		}
	} 
	else{
		setTimeout(function(){
			getAppliedCpn(); 
		}, 3000);
	}
}
if(cur_url.split(".fabfurnish.com/cart/").length > 1){
	getAppliedCpn();

	if($(".cart-footer").length > 0 && $("#couponClick").length == 0){
		var selectorACIcon = ".cart-footer";
		var position = "after";
		var parent = "parent";
		var selectorInput = "#couponCode";
		var inputAttr = "val";
		var clickApplySelector = ".couponFormEl .ui-buttonCta";
		var clickRemoveSelector = ".cart-footer-cell .i-remove";
		var details = [{'selectorInput': selectorInput, "clickApplySelector": clickApplySelector, "clickRemoveSelector": clickRemoveSelector, "inputAttr" : inputAttr, "api_case": 0}];
		details = JSON.stringify(details);
		localStorage.acDetails = details;
		displayACIcon(selectorACIcon, parent, position, 19, details);
		if($("#couponClick").length > 0){
			$("#couponClick").css("float", "right");
		}
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
	// console.log("Entered startSaving");
	return new Promise(function(resolve, reject){

		var code = localStorage.lastCoupon.trim();
		var csaving = 0;
		var ecashing = 0;
		var savingsObject = {};
		var bestSaving = localStorage.bestSaving;
		var bestCoupon = localStorage.bestCoupon;
		var doneSavingCheck = localStorage.doneSavingCheck;
		var couponsTotal = localStorage.getCoupons;
		couponsTotal = couponsTotal.split("~").length - 1;

		if($(".cart-product-subtotal-sum").length > 0 && $(".cart-product-subtotal-sum .cart-total-value").length > 0){

			csaving = $(".cart-total-row-border").html().toUpperCase().trim();
			if(csaving.split("COUPON").length > 1){
				csaving = csaving.split("COUPON");
				csaving = csaving[1];
				csaving = csaving.split("CART-TOTAL-VALUE");
				csaving = csaving[1];
				csaving = csaving.split("</SPAN>");
				csaving = csaving[0];
				csaving = csaving.split(">");
				csaving = csaving[csaving.length-1];
				csaving = csaving.split("-");
				csaving = csaving[1];
				csaving = filter_price(csaving);
			}
			else{
				csaving = 0;
			}
			
			if($(".cart-footer-cell").length > 0 && $(".cart-footer-cell .i-remove").length > 0){
				code = $(".cart-footer-cell .i-remove").parent().text().trim();
				if(code.split("Unselect").length > 1){
					code = code.split("Unselect");
					code = code[0].trim();
				}
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
		

		if($(".show_msg").length > 0 && $(".show_msg .pas").length > 0){
			var cpnMsg = $(".show_msg .pas:eq(0)").text().trim();
			setCookie("HKCode~"+localStorage.lastCoupon, encodeURIComponent(cpnMsg), 1);
		}
		if(localStorage.savings.trim() != ""){
			var savings = JSON.parse(localStorage.savings);
		}
		else{
			var savings = [];
		}
		var savingsLen = savings.length;
		savingsObject["code"] = code;
		savingsObject["saving"] = csaving;
		savingsObject["ecash"] = ecashing;
		savings[savingsLen] = savingsObject;
		localStorage.savings = JSON.stringify(savings);

		if($(".cart-footer-cell").length > 0 && $(".cart-footer-cell .i-remove").length > 0){
			document.getElementsByClassName("cart-footer-cell")[0].getElementsByClassName("i-remove")[0].click();
		}
		// console.log("calling from startSaving code "+code);
		// console.log("calling from startSaving saving "+csaving);
		// console.log("calling from startSaving couponsTotal "+couponsTotal);
		// console.log("calling from startSaving localStorage.doneACTill "+localStorage.doneACTill);
		if(localStorage.doneACTill >= couponsTotal){
			resolve("done");
		}
		else{
			// console.log("calling from startSaving startACProcess");
			resolve("notdone");
		}
	});
}
if(!localStorage.clickedRemove){
	localStorage.clickedRemove = 0;
}
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
				arrayMsg.push([allCoupons[all], encodeURIComponent(getCookie(cookieCpn)), 1000]);
				setCookie(cookieCpn, 0, -1);
			}
		}
		arrayMsg = JSON.stringify(arrayMsg);
		var jsonArr = [{'cpn_msg': arrayMsg}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(1, jsonArr, 12, doNothing, []);
		deleteAC = 1;
	}
	if($(".cart-footer-cell").length > 0 && $(".cart-footer-cell .i-remove").length > 0 && localStorage.clickedRemove == 0){
		document.getElementsByClassName("cart-footer-cell")[0].getElementsByClassName("i-remove")[0].click();
		localStorage.clickedRemove = 1;
	}
	if(localStorage.bestSaving != 0 && localStorage.bestCoupon.trim() != "" && $(".couponFormEl").length > 0 && $(".couponFormEl .ui-buttonCta").length > 0){
		$("#couponCode").val(localStorage.bestCoupon.trim());
		localStorage.showFinalSavings = 1;
		localStorage.acStarted = 0;
		displayFinalSavings();
		document.getElementsByClassName("couponFormEl")[0].getElementsByClassName("ui-buttonCta")[0].click();
	}
	else if(localStorage.bestSaving != 0 && localStorage.bestCoupon.trim() != ""){
		setTimeout(applyBestCoupon, 1000);
	}
	else{
		displayNoSavings();
	}
}

