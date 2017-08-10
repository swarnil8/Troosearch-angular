var curURL = window.location.href;
couponsArr = [];
var couponString = "";
var linkFound = 0;
var linkDone = 0;
var codes = "";
var flagDoneCpColl = 0;
function pickProdURL(){
	//console.log("PickProdURL called");
	if($('.big-wrapper .order-listing a').length > 0){
		//console.log("Entered pickProdURL with: "+$('.big-wrapper .order-listing:eq('+ i +') a:eq(0)').attr('href'));
		var slider = $('.big-wrapper .order-listing');
		var sliderLength = slider.length;
		var link;
		linkFound = $('.big-wrapper .order-listing').length;
		for(var i=0;i<parseInt(sliderLength);i++){
			price = "";
			link = "";
			if($('.big-wrapper .order-listing:eq('+ i +') a').length > 0){
				link = $('.big-wrapper .order-listing:eq('+ i +') a:eq(0)').attr('href');
				if(link != "" && link != undefined){

					if(link.split("shop/p/").length > 1){
						// linkFound++;
						link = link.split("shop/p/");
						link = link[1].trim();

						link = "https://catalog.paytm.com/v1/p/"+link;
						
						var j = 0;
						$.get(link, {}).success(function(data){
							//console.log("paytm: "+JSON.stringify(data));
							var offer_url = data.offer_url;
							offer_url = "https://paytm.com/papi"+offer_url;

							$.get(offer_url, {}).success(function(data1){
								//console.log("codesData: "+JSON.stringify(data1));
								//console.log("codes: "+data1.codes.length);
								for(var k=0;k<(data1.codes).length;k++){
									codes += data1.codes[k].code+"~";
									couponsArr[j] = data1.codes[k].code;
									couponString += data1.codes[k].code + "~";
									j++;
									linkDone++;
								}
								console.log("couponsArr: "+couponsArr);
								console.log("codes: "+codes);
							})
							.fail(function(){
								linkDone++;
							});
							
						})
						.fail(function(){
							linkDone++;
						});
					}
				}
				else {
					linkDone++;
				}
			} 
		}
		//console.log("couponsArrFinal: "+couponsArr);
	}
	else{
		setTimeout(pickProdURL, 1000);
	}

	checkDone();

}

function checkDone(){
	setTimeout(checkDone, 2000);
	if(linkDone>=linkFound && linkFound!=0){
		flagDoneCpColl = 1;
		//console.log("DOne with values " + couponString);
	}
	else {
		//console.log("Not yet " + linkDone + " " + linkFound);
		// pickProdURL();
	}
}

if(curURL.split("paytm.com/cart").length > 1){
	pickProdURL();
}