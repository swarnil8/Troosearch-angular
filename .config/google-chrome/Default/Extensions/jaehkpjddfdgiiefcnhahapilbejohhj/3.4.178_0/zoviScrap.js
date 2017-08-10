$ = jQuery.noConflict();
function getCategory(){
	var category = "";
	return category;
}

//avail (1 = available, 0 = oos, -1 = permanently disconnected )
function sendPairs(){
	arrayToSend = [];

	if($('.item').length > 0){
		var slider = $('.item');
		var sliderLength = slider.length;
		var link = "";
		var price;
		var PID;
		var prod = "";
		var image = "";
		var oos = 0;
		for(i=0;i<sliderLength;i++){
			PID = "";
			price = "";
			prod = "";
			image = "";
			oos = 0;
			if($('.item:eq('+ i +')').find('a').length > 0){
				link = $('.item:eq('+ i +')').find('a:eq(0)').attr('href');
				if(link != ""){ 
					PID = link;
					if(link.split("--").length > 1){
						link = link.split("--");
						PID = link[1];
					}
					if(PID.split("?").length > 1){
						PID = PID.split("?");
						PID = PID[0];
					}
					if(PID.split("#").length > 1){
						PID = PID.split("#");
						PID = PID[0];
					}
				}
				else{
					PID = "";
				}

				if(PID != ""){

					if($('.item:eq('+ i +')').find('img').attr("data-src")){
						image = $('.item:eq('+ i +')').find('img').attr("data-src");
						if(image.split("http").length < 2){
							image = "http:"+image;
						}
					}
					else if($('.item:eq('+ i +')').find('img').attr("src")){
						image = $('.item:eq('+ i +')').find('img').attr("src");
						if(image.split("http").length < 2){
							image = "http:"+image;
						}
					}

					if($('.item:eq('+ i +')').find('.pro_title').attr("data-name")){
						prod = $('.item:eq('+ i +')').find('.pro_title').attr("data-name");
					}
					else if($('.item:eq('+ i +')').find('.pro_title').length > 0){
						prod = $('.item:eq('+ i +')').find('.pro_title').text().trim();
						if(prod.split("..").length > 1){
							prod = "";
						}
					}

					if($('.item:eq('+ i +')').find('.item_price').length > 0){
						if($('.item:eq('+ i +')').find('.item_price .old-price').length > 0){
							price = $('.item:eq('+ i +')').find('.item_price').html();
							if(price.split("</i>").length > 1){
								price = price.split("</i>");
								price = price[price.length - 1];
								if(price.split("<span").length > 1){
									price = price.split("<span")[0];
								}
								price = price.trim();
							}
							
							if(price.split("Rs").length > 1){
								price = price.split("Rs");
								price = price[1];
							}
						}
						else{
							price = $('.item:eq('+  i +')').find('.item_price').text();
						}
						if(price.split("Rs.").length > 1){
							price = price.split("Rs.");
							price = price[1];
						}
						if(price.split("Rs").length > 1){
							price = price.split("Rs");
							price = price[1];
						}

						price = price.split(",").join("").trim();

					}

					else if($('.item:eq('+ i +')').find('.price').length > 0){
						if($('.item:eq('+ i +')').find('.cross-price').length > 0){
							price = $('.item:eq('+ i +')').find('.price').html().split("cross-price")[1];
							p_len = price.split("</span>").length - 1;
							price = price.split("</span>")[p_len];
							if(price.split("Rs").length > 1){
								price = price.split("Rs");
								price = price[1];
							}
						}
						else{
							price = $('.item:eq('+  i +')').find('.price').text();
						}
						if(price.split("Rs.").length > 1){
							price = price.split("Rs.");
							price = price[1];
						}
						if(price.split("Rs").length > 1){
							price = price.split("Rs");
							price = price[1];
						}

						price = price.split(",").join("").trim();

					}
				}

				else{
					price = "";
				}


        //prce ends
      } // if 2 ends
      if(price.split("</span>").length > 1){
      	price = price.split("</span>");
      	price = price[0].trim();
      }
      if(PID != "" && price != ""){
      	arrayToSend.push([PID, price, prod, image, oos]);
      }


    } //for loop ends
    
  } //1st if ends

  if(arrayToSend.length > 0){
  	arrayToSend = JSON.stringify(arrayToSend);
  	var jsonArr = [{'pairsZovi': arrayToSend}];
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
	var PID = "";
	var current_status = 0;

	prod = $('meta[property="og:title"]').attr('content');
	if($('#size-selection').length > 0){
		var size = $('#size-selection .sizes').find('li').length;
	}
	if(($('#size-selection').length > 0) && ($('#size-selection').find('.sold-out').length == size)){
		current_status = 1;
	}
	else{
		current_status = 0;
	}

	var price = "";
	if($(".old-price").length > 0)
	{
		if($('body').html().split("discounted_price").length > 1){
			price = $('body').html().split("discounted_price")[1].split(",")[0].split(":")[1];
		}
	}
	else if(($("#price").length > 0))
	{
		price = $("#price").text().trim();
	}
	else if($("#buy-box .price-box").length > 0)
	{
		price = $("#buy-box .price-box").text().trim();
	}
	price = filter_price(price);
	myPrice = price;

	image = $('meta[property="og:image"]').attr('content')
	var link = window.location.href;
	if(link != ""){ 
		PID = link;
		if(link.split("--").length > 1){
			link = link.split("--");
			PID = link[1];
		}
		if(PID.split("?").length > 1){
			PID = PID.split("?");
			PID = PID[0];
		}
		if(PID.split("#").length > 1){
			PID = PID.split("#");
			PID = PID[0];
		}
	}
	else{
		PID = "";
	}
	cur_url = window.location.href;
	curData.push([prod, image, myPrice, cur_url, current_status, PID]);
	curData = JSON.stringify(curData);
	var jsonArr = [{'curDataZovi': curData}];
	jsonArr = JSON.stringify(jsonArr);
	if($('#buy-box').length > 0){
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);

var check_prod_pg = 1;



function getProd(){
	var prod = "";
	prod = $('meta[property="og:title"]').attr('content');
	if($('#buy-box').length > 0){
		return prod;
	}
	else{
		return "";
	}
}

function getImage(){
	var image = "";
	image = $('meta[property="og:image"]').attr('content')
	if(image.split("http").length < 2){
		image = "http:"+image;
	}
	// //console.log("image: "+image);
	return image;
}

function getPrice(){
	price = "";
	if($(".old-price").length > 0)
	{
		if($('body').html().split("discounted_price").length > 1){
			price = $('body').html().split("discounted_price")[1].split(",")[0].split(":")[1];
		}
	}
	else if(($("#price").length > 0))
	{
		price = $("#price").text().trim();
	}
	else if($("#buy-box .price-box").length > 0)
	{
		price = $("#buy-box .price-box").text().trim();
	}
	price = filter_price(price);

	return price;
}

function getAvailability(){
	var avail = 1;
	var loc = window.location.href;

	if($('body').html().split('"footer"').length > 1){
		b = $('body').html().split('"footer"')[1];
		b = b.split("</script>")[0];
		if(b.split('404').length > 1){
			avail = -1;
		}   			
		else {
			avail  = 1;
		}
	}
	if($('#content').text().toUpperCase().split("THIS IS DEFINETLY NOT THAT PAGE WE WANT YOU TO SEE").length > 1){
		avail = -1;
	}
	if($('#size-selection').length > 0){
		var size = $('#size-selection .sizes').find('li').length;
	}
	if(($('#size-selection').length > 0) && ($('#size-selection').find('.sold-out').length == size)){
		avail = 0;
	}

	if(loc.split("/orders/").length > 1){
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
	// if(pid.split("--").length > 1){
	// 	pid = pid.split("--");
	// 	pid = pid[pid.length - 1];
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
	if(link.split('zovi.com').length < 2){
		pid = 0;
	}
	if(link == ""){
		pid = 0;
	}
	// if(pid.split("--").length > 1){
	// 	pid = pid.split("--");
	// 	pid = pid[pid.length - 1];
	// }

	return pid;



}

function getBreadCrumb(){
	var breadcrumb = "";
	var bread_final = "";
	var len_bread = $('#breadcrumbs a').length;

	for(i=0;i<len_bread;i++){
		breadcrumb = $('#breadcrumbs a:eq('+ i +')').text().trim();
		bread_final += breadcrumb + "*~";
	}

	return bread_final;


}


function sendCoupon(){
	$ = jQuery.noConflict();
	couponToSend = [];
	var cur_link = window.location.href;


	if($('.only-banner .top-banner').length > 0){
		var slider = $('.only-banner .top-banner');
		var sliderLength = slider.length;
		var couponUrl = "";
		var couponCode = "";
		var couponText = "";
		var couponDesc = "";
		var couponExp = 0;
		var couponAt = 425;

		for(i=0;i<sliderLength;i++){
			couponUrl = "http://zovi.com/";
			couponCode = "";
			couponText = "";
			couponDesc = "";
			couponCode1 = "";
			couponCode2 = "";
			cp = "";

			if($('.only-banner .top-banner:eq('+ i +')').length > 0){
				couponText = $('.only-banner .top-banner:eq('+ i +')').text().trim();

				if($('.only-banner .top-banner:eq('+ i +') a').length > 0){
					couponUrl = $('.only-banner .top-banner:eq('+ i +') a:eq(0)').attr("href").trim();

					if(couponUrl.split(".zovi.com").length < 2){
						couponUrl = "http://zovi.com" + couponUrl;
					}
				}
				else{
					couponUrl = "http://zovi.com/";
				}


				if(couponText.split("code ").length > 1){
					cp = couponText.split("code ");
					cp = cp[1];
					if(cp.split(" ").length > 1){
						cp = cp.split(" ");
						cp = cp[0].trim();
					}
					else if(cp.split(",").length > 1){
						cp = cp.split(",");
						cp = cp[0].trim();
					}
					else if(cp.split(".").length > 1){
						cp = cp.split(".");
						cp = cp[0].trim();
					}
					if(cp == cp.toUpperCase()){
						couponCode = cp;
					}
				}
				else if(couponText.split("coupon ").length > 1){
					cp = couponText.split("coupon ");
					cp = cp[1];
					if(cp.split(" ").length > 1){
						cp = cp.split(" ");
						cp = cp[0].trim();
					}
					else if(cp.split(",").length > 1){
						cp = cp.split(",");
						cp = cp[0].trim();
					}
					else if(cp.split(".").length > 1){
						cp = cp.split(".");
						cp = cp[0].trim();
					}
					if(cp == cp.toUpperCase()){
						couponCode = cp;
					}
				}
				else{
					couponCode = "NO CODE REQUIRED";
				}

				couponToSend.push([(couponCode), (couponText), couponExp, (couponUrl), (couponDesc), couponAt, (cur_link)]);
			}
		}    

	}

	if(cur_link.split("/offers").length > 1){
		if($('.offerset .offerlist').length > 0){
			var slider = $('.offerset .offerlist');
			var sliderLength = slider.length;
			var couponUrl = "";
			var couponCode = "";
			var couponText = "";
			var couponDesc = "";
			var couponExp = 0;
			var couponAt = 425;

			for(i=0;i<sliderLength;i++){
				couponUrl = "http://zovi.com/";
				couponCode = "";
				couponText = "";
				couponDesc = "";
				couponCode1 = "";
				couponCode2 = "";
				cp = "";

				if($('.offerset .offerlist:eq('+ i +')').length > 0){
					couponText = $('.offerset .offerlist:eq('+ i +')').text().trim();

					if($('.offerset .offerlist:eq('+ i +') a').length > 0){
						couponUrl = $('.offerset .offerlist:eq('+ i +') a:eq(0)').attr("href").trim();

						if(couponUrl.split(".zovi.com").length < 2){
							couponUrl = "http://zovi.com" + couponUrl;
						}
					}
					else{
						couponUrl = "http://zovi.com/";
					}


					if(couponText.split("code ").length > 1){
						cp = couponText.split("code ");
						cp = cp[1];
						if(cp.split(" ").length > 1){
							cp = cp.split(" ");
							cp = cp[0].trim();
						}
						else if(cp.split(",").length > 1){
							cp = cp.split(",");
							cp = cp[0].trim();
						}
						else if(cp.split(".").length > 1){
							cp = cp.split(".");
							cp = cp[0].trim();
						}
						if(cp == cp.toUpperCase()){
							couponCode = cp;
						}
					}
					else if(couponText.split("coupon ").length > 1){
						cp = couponText.split("coupon ");
						cp = cp[1];
						if(cp.split(" ").length > 1){
							cp = cp.split(" ");
							cp = cp[0].trim();
						}
						else if(cp.split(",").length > 1){
							cp = cp.split(",");
							cp = cp[0].trim();
						}
						else if(cp.split(".").length > 1){
							cp = cp.split(".");
							cp = cp[0].trim();
						}
						if(cp == cp.toUpperCase()){
							couponCode = cp;
						}
					}
					else{
						couponCode = "NO CODE REQUIRED";
					}

					couponToSend.push([(couponCode), (couponText), couponExp, (couponUrl), (couponDesc), couponAt, (cur_link)]);
				}
			}    

		}
	}
	couponToSend = JSON.stringify(couponToSend);
	var jsonArr = [{'couponsExt': couponToSend}];
	jsonArr = JSON.stringify(jsonArr);
	sendMessage(1, jsonArr, 15, doNothing, []);  
}
sendCoupon();