var arrayMsg = [];
function getPos(){
	return 2190;
}
function sendPairs(){
	arrayToSend = [];
	if($('.product-item').length > 0){
		var slider = $('.product-item');
		var sliderLength = slider.length;
		var link;
		var price;
		var PID;
		var pids;
		var pid;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			prod = "";
			image = "";
			link = "";
			oos = 100;
			pids = [];
			pid = "";
			var prices = "";
			var prc = "";
			var price_each = "";
			var oos_each = "";
			var PID_each = "";
			var oos_val = "";
			var oos1 = "";
			var oos_each = "";

			// prod

			if($(".product-item:eq("+i+") .product-name").length > 0){
				prod = $(".product-item:eq("+i+") .product-name:eq(0)").text().trim();
			}

			// image

			if($(".product-item:eq("+i+") .image").length > 0){
				image = $(".product-item:eq("+i+") .image:eq(0) .picZoomer-pic:eq(0)").attr("src").trim();
				if(image.split("http").length < 2){
					image = "https:"+image;
				}
			}


			// PID
			if($(".product-item:eq("+i+") #productUrl").length > 0){
				pids = $(".product-item:eq("+i+") #productUrl").val().trim();
				if(pids != "" && typeof(pids) == "string"){
					pids = JSON.parse(pids);
				}
			}

			// price
			if($(".product-item:eq("+i+") #productPrice").length > 0){
				prices = $(".product-item:eq("+i+") #productPrice").val().trim();
				if(prices != "" && typeof(prices) == "string"){
					prices = JSON.parse(prices);
				}
			}

			// oos
			if($(".product-item:eq("+i+") #sizeStockLevel").length > 0){
				oos_val = $(".product-item:eq("+i+") #sizeStockLevel").val().trim();
				if(oos_val != "" && typeof(oos_val) == "string"){
					oos_val = JSON.parse(oos_val);
				}
			}
			if(pids.length > 0){
				for(var o=0;o<pids[0].length;o++){
					ele = pids[0][o];
					for (key in ele) {
						price_each = "";
						oos_each = "";
						PID_each = "";

						if (ele.hasOwnProperty(key)) {
							if(ele){
								link = "https://www.tatacliq.com"+ele[key];
								PID_each = returnPID(link);
								if(oos_val[0][o][key] && oos_val[0][o][key] == "inStock"){
									oos_each = 0;
								}
								else{
									oos_each = 1;
								}
								if(prices && prices[0][o][key]){
									price_each = filter_price(prices[0][o][key]);
								}
								if(PID_each != undefined && PID_each != "" && PID_each != 0 && price_each != 0 &&  price_each != "" && !isNaN(price_each)){
									arrayToSend.push([PID_each, price_each, prod, image, oos_each]);
								}
							}
						}
					}
				}
			}

			if(pids == "" || pids.length == 0){
				if($(".product-item:eq("+i+") .product-tile").length > 0){
					//PID
					if($(".product-item:eq("+i+") .product-tile a").length > 0){
						link = $(".product-item:eq("+i+") .product-tile:eq(0) a:eq(0)").attr("href");
						link = "tatacliq.com"+link;
						PID = returnPID(link);

					}

					if($(".product-item:eq("+i+") .sale").length > 0 && $(".product-item:eq("+i+") .sale .priceFormat").length > 0){
						price = $(".product-item:eq("+i+") .sale:eq(0) .priceFormat:eq(0)").text().trim();
						price = filter_price(price);

					}

					oos = 100;

					if(PID != undefined && PID != "" && PID != 0 && price != 0 &&  price != "" && !isNaN(price)){
						arrayToSend.push([PID, price, prod, image, oos]);
					}


				}
			}

    } // for ends

  }
// console.log("arrayToSend: ",arrayToSend);
if(arrayToSend.length > 0){
	arrayToSend = JSON.stringify(arrayToSend);
	var jsonArr = [{'pairsTatacliq': arrayToSend}];
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
	else if(avail == -1){
		current_status = 2;
	}
	else{
		current_status = 0;
	}

	curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
	curData = JSON.stringify(curData);
	var jsonArr = [{'curDataTatacliq': curData}];
	jsonArr = JSON.stringify(jsonArr);
	if(cur_url.split("/p-").length > 1){
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
	if($("#product_name").length > 0){
		prod = $("#product_name").val().trim();
	}
	var cur_url = window.location.href;
	if(cur_url.split("/p-").length > 1){
		return prod;
	}
	else{
		return "";
	}
}

function getImage(){
	var image = "";
	if($("#imageLink").length > 0 && $("#imageLink .picZoomer-pic").length > 0){
		image = $("#imageLink .picZoomer-pic:eq(0)").attr("src").trim();
		if(image.split("http").length < 2){
			image = "https:"+image;
		}
	}
	return image;
}

function getPrice(){
	price = "";
	if($('#product_list_price').length > 0)
	{
		price = $('#product_list_price').val().trim();
	}
	else if($("#spPriceId").length > 0){
		price = $("#spPriceId").text().trim();
	}
	if(price == ""){
		if($('#mopPriceId').length > 0)
		{
			price = $('#mopPriceId').text().trim();
		}
	}
	price = filter_price(price);
	if(isNaN(price)){
		price = 0;
	}
	return price;
}

function getAvailability(){
	var avail = 1;
	if($('#allVariantOutOfStock').length > 0 && $("#allVariantOutOfStock").css("display") == "none"){
		avail = 1;
	}
	else if($('#allVariantOutOfStock').length > 0){
		avail = 0;
	}
	if($("#dListedErrorMsg").length > 0 && $("#dListedErrorMsg").css("display") != "none" && $("#dListedErrorMsg").text().trim().toUpperCase() == "PRODUCT IS NOT SALEABLE"){
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
	if(pid.split("/p-").length > 1){
		pid = pid.split("/p-");
		pid = pid[pid.length-1];
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
	if(pid.split("/p-").length > 1){
		pid = pid.split("/p-");
		pid = pid[pid.length-1];
		if(pid.split("/").length > 1){
			pid = pid.split("/");
			pid = pid[0];
		}
	}
	else{
		pid = 0;
	}
	if(link.split('tatacliq.com').length < 2){
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
	return bread_final;
}

function getCategory(){
	var categories = getBreadCrumb();
	var index = 1;
	var category = "";
	if(categories != undefined && categories != ""){
		categories = categories.split("*~");
		category = categories[index];
	}
	return category;
}


var cur_url = window.location.href;
if(cur_url.split(".tatacliq.com/checkout/multi/payment-method/pay").length > 1){
	var checkPick = ".coupon-section .actions .delete-coupon";
	var selector = ".coupon-section .actions .delete-coupon:eq(0)";
	var attr = "data-coupon";
	var webID = 111;
	var homeLink = "http://www.myntra.com/";
	pickAppliedCpn(checkPick, selector, attr, webID, homeLink);

	if($(".coupon.block").length > 0 && $("#couponClick").length == 0){
		var selectorACIcon = ".coupon.block";
		var position = "after";
		var parent = "none";
		var method = "POST";
		var guid = $("#guid").val();
		var timeStamp =  Math.floor(Date.now());
		var token = $("#silentOrderPostForm").find("input");
		var CSRFToken = "";
		for(var inp =0;inp<token.length;inp++){
			if($("#silentOrderPostForm").find("input:eq("+inp+")").attr("name") == "CSRFToken"){
				CSRFToken = $("#silentOrderPostForm").find("input:eq("+inp+")").val().trim();
				break;
			}
		}
		var api = "https://www.tatacliq.com/checkout/multi/coupon/redeem";
		var postFields = {"couponCode":"**", "paymentMode":"Credit+Card", "bankNameSelected":"null", "guid":guid, "CSRFToken":CSRFToken};
		var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, site: 2190}];
		details = JSON.stringify(details);
		arrayMsg = [];
		displayACIcon(selectorACIcon, parent, position, 2190, details);
	}
}


savings = [];
bestSaving = 0;
bestCoupon = "";
bestECoupon = "";
bestEcash = 0;




function startSaving(data){

	data = JSON.parse(data);
	var nowCode = "";
	var nowSaving = "";
	var resp = data[0].data;
	var code = data[0].code.trim();
	var csaving = 0;
	var ecashsaving = 0;
	nowCode = code;
	respYatra = resp;
	var savingsObject = {};
	// console.log("applied with "+code);
	if(resp != "" && code != ""){
		if(resp.voucher){
			csaving = 0;
			// console.log("lenght : "+resp.voucher.length);
			for(var vp=0;vp<resp.voucher.length;vp++){
				var voucherCode = resp.voucher[vp].voucherCode;
				voucherCode = voucherCode.toUpperCase().trim();
				// console.log("code: "+code.toUpperCase().trim()+" vouvher code: "+voucherCode);
				if(code.toUpperCase().trim() == voucherCode){
					csaving = resp.voucher[vp].value;
					csaving = filter_price(csaving);
					// console.log("csaving: "+csaving);
					break;
				}
			}
			if(isNaN(csaving)){
				csaving = 0
			}
			else if(csaving > bestSaving){
				bestSaving = csaving;
				bestCoupon = code;
			}
		}
		if(resp.redeemErrorMsg && resp.redeemErrorMsg != null){
			cpnMsg = resp.redeemErrorMsg.trim();
			csaving = 0;
			arrayMsg.push([code, encodeURIComponent(cpnMsg), 2190 ]);
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
var deleteAC = 0;
var clickedRemove = 0;

function applyBestCoupon(){
	// alert("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
	if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "")){
		var applyBestCode = bestCoupon;
		if($("#couponApplied").length > 0 && $("#couponApplied").css("display") == "block" && clickedRemove == 0){
			var guid = $("#guid").val();
			var appliedCpn = $("#couponFieldId").val().trim().toUpperCase();
			var timeStamp =  Math.floor(Date.now());
			$.get("https://www.tatacliq.com/checkout/multi/coupon/release?couponCode="+appliedCpn+"&guid="+guid+"&_="+timeStamp).success(function(){
				clickedRemove = 1;
			});
		}
		else if($("#couponApplied").length > 0 && $("#couponApplied").css("display") != "block"){
			clickedRemove = 1;
		}
		if(clickedRemove == 1){
			if($("#couponFieldId").length > 0 && $("#couponSubmitButton").length > 0){
				$("#couponFieldId").val(applyBestCode.trim());
				// alert("applying "+applyBestCode)
				document.getElementById("couponSubmitButton").click();

				displayFinalSavings();
			}
		}
		else{
			setTimeout(applyBestCoupon, 2000);
		}
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
