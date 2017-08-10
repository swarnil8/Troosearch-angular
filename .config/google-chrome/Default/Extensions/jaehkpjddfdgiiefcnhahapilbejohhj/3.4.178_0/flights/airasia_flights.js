// https://booking.airasia.com/Flight/Select?o1=BLR&d1=DEL&culture=en-GB&dd1=2016-12-01&dd2=2016-12-10&r=true&ADT=2&CHD=2&inl=1&s=true&mon=true&cc=INR&c=false
// https://booking.airasia.com/Flight/Select?o1=DEL&d1=MFM&culture=en-GB&dd1=2016-12-01&ADT=1&CHD=0&inl=0&s=true&mon=true&cc=INR&c=false
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

	if(cur_url1.split("r=true").length > 1){
		isReturn = 1;
	}
	else{
		isReturn = 0;
	}


	if(cur_url1.split("booking.airasia.com/Flight/Select").length > 1){

		if(cur_url1.split("o1=").length > 1){
			from = cur_url1.split("o1=");
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

		if(cur_url1.split("d1=").length > 1){
			to = cur_url1.split("d1=");
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

		if(cur_url1.split("dd1=").length > 1){
			startDate = cur_url1.split("dd1=");
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

		if(isReturn == 1 && cur_url1.split("dd2=").length > 1){
			returnDate = cur_url1.split("dd2=");
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

		if(cur_url1.split("ADT=").length > 1){
			adults = cur_url1.split("ADT=");
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

		if(cur_url1.split("CHD=").length > 1){
			children = cur_url1.split("CHD=");
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

		if(cur_url1.split("inl=").length > 1){
			infants = cur_url1.split("inl=");
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

if(cur_url1.split("booking.airasia.com/Flight/Select").length > 1){
	scrapFlightData();
}