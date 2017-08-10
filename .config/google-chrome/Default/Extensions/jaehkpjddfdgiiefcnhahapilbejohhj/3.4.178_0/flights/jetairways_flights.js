function scrapFlightData(){
	var from = "";
	var to = "";
	var startDate = "";
	var isReturn = "";
	var adults = 1;
	var infants = 0;
	var children = 0;
	var cabinClass = "Economy";
	var returnDate = "";
	var flightData = [];

	if($(".flight-basic-info").length > 1){
		isReturn = 1;
	}
	else if($(".flight-basic-info").length > 0){
		isReturn = 0;
	}
	else{
		setTimeout(scrapFlightData, 500);
	}

	if($(".flight-basic-info").length > 0 && $(".flight-basic-info:eq(0) .header-date").length > 0){
		startDate = $(".flight-basic-info:eq(0) .header-date:eq(0)").text().trim();
		startDate = startDate.split(",").join("").trim();
		startDate = startDate.split(" ");
		date1 = startDate[startDate.length - 1];
		date2 = startDate[startDate.length - 2];
		date2 = convertMonth(date2);
		date3 = startDate[startDate.length - 3];
		startDate = date1+"-"+date2+"-"+date3;
	}

	if($(".airport-info").length > 0 && $(".airport-info:eq(0) .city-name").length > 0 && $(".airport-info:eq(0) .city-name:eq(0)").attr("data-port-code")){
		from = $(".airport-info:eq(0) .city-name:eq(0)").attr("data-port-code");
	}

	if($(".airport-info").length > 0 && $(".airport-info:eq(0) .city-name").length > 1 && $(".airport-info:eq(0) .city-name:eq(1)").attr("data-port-code")){
		to = $(".airport-info:eq(0) .city-name:eq(1)").attr("data-port-code");
	}

	if(isReturn == 1){
		if($(".flight-basic-info").length > 1 && $(".flight-basic-info:eq(1) .header-date").length > 0){
			returnDate = $(".flight-basic-info:eq(1) .header-date:eq(0)").text().trim();
			returnDate = returnDate.split(",").join("").trim();
			returnDate = returnDate.split(" ");
			date1 = returnDate[returnDate.length - 1];
			date2 = returnDate[returnDate.length - 2];
			date2 = convertMonth(date2);
			date3 = returnDate[returnDate.length - 3];
			returnDate = date1+"-"+date2+"-"+date3;
		}
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
	var posResults = [];
	posResults.push({selector: 'body', attr: 'none', pos: 'before'});
	posResults = JSON.stringify(posResults);
	var posSpecs = [];
	posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'position', preVal: 'relative', postVal: 'none'});
	posSpecs = JSON.stringify(posSpecs);

	if(flightData.length > 0){
		flightData = JSON.stringify(flightData);
		flightBanner(flightData, posResults, posSpecs);
	}
}

var cur_url1 = window.location.href;
if(cur_url1.split("secure.jetairways.com").length > 1 && cur_url1.split("Booking/Select").length > 1){
	scrapFlightData();
}
