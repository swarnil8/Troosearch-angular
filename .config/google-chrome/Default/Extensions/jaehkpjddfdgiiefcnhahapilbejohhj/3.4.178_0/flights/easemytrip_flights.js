// https://www.easemytrip.in/EaseAir/FlightListingRoundTrip.aspx?_searchKey=&domType=Any&OneWay=false&fromCity=DEL-Delhi,India(DEL)&toCity=BLR-Bangaluru,India(BLR)&fromDt=25/11/2016&toDt=29/11/2016&adultNum=1&childNum=0&infantNum=0&selClass=&selAirLine=Any

// http://www.easemytrip.in/EaseAir/searchmidscreen.aspx?_searchKey=&domType=Any&OneWay=true&fromCity=DEL-Delhi,India(DEL)&toCity=BLR-Bangalore,India(BLR)&fromDt=25/11/2016&toDt=29/11/2016&adultNum=1&childNum=0&infantNum=0&selClass=&selAirLine=Any

// http://www.easemytrip.in/EaseAir/searchmidscreen.aspx?_searchKey=3&domType=Any&OneWay=true&fromCity=DEL-Delhi,India(DEL)&toCity=BLR-Bangalore,India(BLR)&fromDt=30/11/2016&toDt=&adultNum=1&childNum=0&infantNum=0&selClass=Y&selAirLine=Any&res=ok

// http://www.easemytrip.in/EaseAir/searchmidscreen.aspx?_searchKey=&domType=Any&OneWay=true&fromCity=DEL-Delhi,India(DEL)&toCity=BLR-Bangalore,India(BLR)&fromDt=30/11/2016&toDt=&adultNum=1&childNum=0&infantNum=0&selClass=C&selAirLine=Any

// http://www.easemytrip.in/EaseAir/FlightListingRoundTrip.aspx?_searchKey=&domType=Any&OneWay=false&fromCity=DEL-Delhi,India(DEL)&toCity=BLR-Bangalore,India(BLR)&fromDt=29/11/2016&toDt=30/11/2016&adultNum=1&childNum=0&infantNum=0&selClass=F&selAirLine=Any

function scrapFlightData(){
	var from = "";
	var to = "";
	var startDate = "";
	var isReturn = "";
	var adults = 1;
	var infants = 0;
	var children = 0;
	var cabinClass = "";
	var returnDate = "";
	var flightData = [];

	var cur_url = window.location.href;
	var link = window.location.href;
	if(cur_url.split("//www.easemytrip.in/EaseAir/searchmidscreen").length > 1 || cur_url.split("//www.easemytrip.in/EaseAir/FlightListingRoundTrip").length > 1){
		if(cur_url.split("//www.easemytrip.in/EaseAir/searchmidscreen").length > 1){
			cur_url = cur_url.split("//www.easemytrip.in/EaseAir/searchmidscreen");
		}
		else  if(cur_url.split("//www.easemytrip.in/EaseAir/FlightListingRoundTrip").length > 1){
			cur_url = cur_url.split("//www.easemytrip.in/EaseAir/FlightListingRoundTrip");
		}
		cur_url = cur_url[1];

		if(cur_url.split("?fromCity=").length > 1){
			from = cur_url.split("?fromCity=");
		}
		else if(cur_url.split("&fromCity=").length > 1){
			from = cur_url.split("&fromCity=");
		}
		else{
			from = "";
		}
		if(from != ""){
			from = from[1];
			if(from.split("-").length > 1){
				from = from.split("-");
				from = from[0];
			}
			if(from.split("&").length > 1){
				from = from.split("&");
				from = from[0];
			}
			if(from.split("#").length > 1){
				from = from.split("#");
				from = from[0];
			}
			if(from.split("/").length > 1){
				from = from.split("/");
				from = from[0];
			}
		}


		if(cur_url.split("?toCity=").length > 1){
			to = cur_url.split("?toCity=");
		}
		else if(cur_url.split("&toCity=").length > 1){
			to = cur_url.split("&toCity=");
		}
		else{
			to = "";
		}
		if(to != ""){
			to = to[1];
			if(to.split("-").length > 1){
				to = to.split("-");
				to = to[0];
			}
			if(to.split("&").length > 1){
				to = to.split("&");
				to = to[0];
			}
			if(to.split("#").length > 1){
				to = to.split("#");
				to = to[0];
			}
			if(to.split("/").length > 1){
				to = to.split("/");
				to = to[0];
			}
		}

		if(cur_url.split("?fromDt=").length > 1){
			startDate = cur_url.split("?fromDt=");
		}
		else if(cur_url.split("&fromDt=").length > 1){
			startDate = cur_url.split("&fromDt=");
		}
		else{
			startDate = "";
		}
		if(startDate != ""){
			startDate = startDate[1];
			if(startDate.split("&").length > 1){
				startDate = startDate.split("&");
				startDate = startDate[0];
			}
			if(startDate.split("#").length > 1){
				startDate = startDate.split("#");
				startDate = startDate[0];
			}
		}

		if(cur_url.split("OneWay=false").length > 1){
			if(cur_url.split("?toDt=").length > 1){
				isReturn = 1;
				returnDate = cur_url.split("?toDt=");
			}
			else if(cur_url.split("&toDt=").length > 1){
				isReturn = 1;
				returnDate = cur_url.split("&toDt=");
			}
			else{
				isReturn = 0;
				returnDate = "";
			}
			if(returnDate != ""){
				returnDate = returnDate[1];
				if(returnDate.split("&").length > 1){
					returnDate = returnDate.split("&");
					returnDate = returnDate[0];
				}
				if(returnDate.split("#").length > 1){
					returnDate = returnDate.split("#");
					returnDate = returnDate[0];
				}
			}
		}
		else{
			isReturn = 0;
		}

		if(startDate.split("/").length > 1){
			date1 = startDate.split("/");
			date1 = date1[date1.length-1];
			date2 = startDate.split("/");
			date2 = date2[1];
			date3 = startDate.split("/");
			date3 = date3[0];
			startDate = date1+"-"+date2+"-"+date3;
		}

		if(returnDate.split("/").length > 1){
			date1 = returnDate.split("/");
			date1 = date1[date1.length-1];
			date2 = returnDate.split("/");
			date2 = date2[1];
			date3 = returnDate.split("/");
			date3 = date3[0];
			returnDate = date1+"-"+date2+"-"+date3;
		}

		if(cur_url.split("?adultNum=").length > 1){
			adults = cur_url.split("?adultNum=");
		}
		else if(cur_url.split("&adultNum=").length > 1){
			adults = cur_url.split("&adultNum=");
		}
		else{
			adults = "";
		}
		if(adults != ""){
			adults = adults[1];
			if(adults.split("&").length > 1){
				adults = adults.split("&");
				adults = adults[0];
			}
			if(adults.split("#").length > 1){
				adults = adults.split("#");
				adults = adults[0];
			}
			if(adults.split("/").length > 1){
				adults = adults.split("/");
				adults = adults[0];
			}
		}


		if(cur_url.split("?childNum=").length > 1){
			children = cur_url.split("?childNum=");
		}
		else if(cur_url.split("&childNum=").length > 1){
			children = cur_url.split("&childNum=");
		}
		else{
			children = "";
		}
		if(children != ""){
			children = children[1];
			if(children.split("&").length > 1){
				children = children.split("&");
				children = children[0];
			}
			if(children.split("#").length > 1){
				children = children.split("#");
				children = children[0];
			}
			if(children.split("/").length > 1){
				children = children.split("/");
				children = children[0];
			}
		}

		if(cur_url.split("?infantNum=").length > 1){
			infants = cur_url.split("?infantNum=");
		}
		else if(cur_url.split("&infantNum=").length > 1){
			infants = cur_url.split("&infantNum=");
		}
		else{
			infants = "";
		}
		if(infants != ""){
			infants = infants[1];
			if(infants.split("&").length > 1){
				infants = infants.split("&");
				infants = infants[0];
			}
			if(infants.split("#").length > 1){
				infants = infants.split("#");
				infants = infants[0];
			}
			if(infants.split("/").length > 1){
				infants = infants.split("/");
				infants = infants[0];
			}
		}


		if(cur_url.split("?selClass=").length > 1){
			cabinClass = cur_url.split("?selClass=");
		}
		else if(cur_url.split("&selClass=").length > 1){
			cabinClass = cur_url.split("&selClass=");
		}
		else{
			cabinClass = "";
		}
		if(cabinClass != ""){
			cabinClass = cabinClass[1];
			if(cabinClass.split("&").length > 1){
				cabinClass = cabinClass.split("&");
				cabinClass = cabinClass[0];
			}
			if(cabinClass.split("#").length > 1){
				cabinClass = cabinClass.split("#");
				cabinClass = cabinClass[0];
			}
			if(cabinClass.split("/").length > 1){
				cabinClass = cabinClass.split("/");
				cabinClass = cabinClass[0];
			}
		}

		if(cabinClass == "Y"){
			cabinClass = "Economy";
		}
		else if(cabinClass == "C"){
			cabinClass = "Business";
		}
		else if(cabinClass == "F"){
			cabinClass = "First";
		}

		// console.log("from : "+from);
		// console.log("to : "+to);
		// console.log("startDate : "+startDate);
		// console.log("returnDate : "+returnDate);
		// console.log("cabinClass : "+cabinClass);
		// console.log("adults : "+adults);
		// console.log("children : "+children);
		// console.log("infants : "+infants);
		// console.log("isReturn : "+isReturn);

		flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn);
	}

	var posResults = [];
	posResults.push({selector: 'body', attr: 'none', pos: 'before'});
	posResults.push({selector: '#Head1', attr: 'none', pos: 'before'});
	posResults = JSON.stringify(posResults);
	var posSpecs = [];
	posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
	posSpecs = JSON.stringify(posSpecs);

	if(flightData.length > 0){
  // console.log("Flight-data: "+flightData);
  flightData = JSON.stringify(flightData);
  flightBanner(flightData, posResults, posSpecs);
}
return;
}

var cur_url1 = window.location.href;
if(cur_url1.split("//www.easemytrip.in/EaseAir/searchmidscreen").length > 1 || cur_url1.split("//www.easemytrip.in/EaseAir/FlightListingRoundTrip").length > 1){
	scrapFlightData();
}

function checkURL(){
	var url = window.location.href;
	if(cur_url1 != url){
		if(url.split("//www.easemytrip.in/EaseAir/searchmidscreen").length > 1 || url.split("//www.easemytrip.in/EaseAir/FlightListingRoundTrip").length > 1){
			$(".hk-compBar").remove();
			$('body').css("margin-top", "45px")
			scrapFlightData();
		}
		cur_url1 = url;
    // console.log("Successful");
}
}

setInterval(function(){
	checkURL();
}, 500);
