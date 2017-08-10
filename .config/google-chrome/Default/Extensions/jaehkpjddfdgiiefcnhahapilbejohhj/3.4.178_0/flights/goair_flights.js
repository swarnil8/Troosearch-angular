// https://www.goair.in/flight/search?interline=false&fromCityCode=GOI&toCityCode=BLR&departureDateString=2016-12-28&returnDateString=2016-12-30&adults=2&children=1&infants=1&roundTrip=true&useFlexDates=false&allInclusive=false&fareTypes=&currency=&goCode=&customPtc=

var cur_url1 = window.location.href;
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

	if(cur_url1.split("roundTrip=true").length > 1){
		isReturn = 1;
	}
	else{
		isReturn = 0;
	}


	if(cur_url1.split("goair.in/flight/search").length > 1){

		if(cur_url1.split("fromCityCode=").length > 1){
			from = cur_url1.split("fromCityCode=");
			from = from[1];
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

		if(cur_url1.split("toCityCode=").length > 1){
			to = cur_url1.split("toCityCode=");
			to = to[1];
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

		if(cur_url1.split("departureDateString=").length > 1){
			startDate = cur_url1.split("departureDateString=");
			startDate = startDate[1];
			if(startDate.split("&").length > 1){
				startDate = startDate.split("&");
				startDate = startDate[0];
			}
			if(startDate.split("#").length > 1){
				startDate = startDate.split("#");
				startDate = startDate[0];
			}
			if(startDate.split("/").length > 1){
				startDate = startDate.split("/");
				startDate = startDate[0];
			}
		}

		if(isReturn == 1 && cur_url1.split("returnDateString=").length > 1){
			returnDate = cur_url1.split("returnDateString=");
			returnDate = returnDate[1];
			if(returnDate.split("&").length > 1){
				returnDate = returnDate.split("&");
				returnDate = returnDate[0];
			}
			if(returnDate.split("#").length > 1){
				returnDate = returnDate.split("#");
				returnDate = returnDate[0];
			}
			if(returnDate.split("/").length > 1){
				returnDate = returnDate.split("/");
				returnDate = returnDate[0];
			}
		}

		if(cur_url1.split("adults=").length > 1){
			adults = cur_url1.split("adults=");
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

		if(cur_url1.split("children=").length > 1){
			children = cur_url1.split("children=");
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

		if(cur_url1.split("infants=").length > 1){
			infants = cur_url1.split("infants=");
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
		// console.log("from : "+from);
		// console.log("to : "+to);
		// console.log("startDate : "+startDate);
		// console.log("returnDate : "+returnDate);
		// console.log("cabinClass : "+cabinClass);
		// console.log("adults : "+adults);
		// console.log("children : "+children);
		// console.log("infants : "+infants);
		// console.log("isReturn : "+isReturn);
	} 
	
	flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn);
	var posResults = [];
	posResults.push({selector: 'body', attr: 'none', pos: 'before'});
	posResults = JSON.stringify(posResults);
	var posSpecs = [];
	posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '53px', postVal: '0px'});
	posSpecs = JSON.stringify(posSpecs);

	if(flightData.length > 0){
		flightData = JSON.stringify(flightData);
		flightBanner(flightData, posResults, posSpecs);
	}

}

if(cur_url1.split("goair.in/flight/search").length > 1){
	scrapFlightData();
}