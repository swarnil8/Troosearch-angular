// https://in.via.com/flight/search?returnType=return&month2=12&day2=23&year2=2016&date2=12/23/2016&destination=DEL&bdestination=DEL&destinationL=Delhi&destinationCity=Delhi&destinationCN=India&source=BLR&bsource=BLR&sourceL=Bangalore&sourceCity=Bangalore&sourceCN=India&month=12&day=1&year=2016&date=12/1/2016&numAdults=1&numChildren=2&numInfants=1&validation_result=&domesinter=international&livequote=-1&flightClass=ALL&travType=INTL&routingType=ALL&preferredCarrier=&prefCarrier=0&isAjax=false
// https://in.via.com/flight/search?returnType=return&month2=12&day2=23&year2=2016&date2=12/23/2016&destination=DEL&bdestination=DEL&destinationL=Delhi&destinationCity=&destinationCN=&source=BLR&bsource=BLR&sourceL=Bangalore&sourceCity=&sourceCN=&month=12&day=1&year=2016&date=12/1/2016&numAdults=1&numChildren=2&numInfants=1&validation_result=&domesinter=international&livequote=-1&flightClass=ECONOMY&travType=INTL&routingType=ALL&preferredCarrier=&prefCarrier=0&isAjax=false
// https://in.via.com/flight/search?returnType=return&month2=12&day2=23&year2=2016&date2=12/23/2016&destination=DEL&bdestination=DEL&destinationL=Delhi&destinationCity=&destinationCN=&source=BLR&bsource=BLR&sourceL=Bangalore&sourceCity=&sourceCN=&month=12&day=1&year=2016&date=12/1/2016&numAdults=1&numChildren=2&numInfants=1&validation_result=&domesinter=international&livequote=-1&flightClass=BUSINESS&travType=INTL&routingType=ALL&preferredCarrier=&prefCarrier=0&isAjax=false
// https://in.via.com/flight/search?returnType=return&month2=12&day2=23&year2=2016&date2=12/23/2016&destination=DEL&bdestination=DEL&destinationL=Delhi&destinationCity=&destinationCN=&source=BLR&bsource=BLR&sourceL=Bangalore&sourceCity=&sourceCN=&month=12&day=1&year=2016&date=12/1/2016&numAdults=1&numChildren=2&numInfants=1&validation_result=&domesinter=international&livequote=-1&flightClass=ECONOMY_FULL&travType=INTL&routingType=ALL&preferredCarrier=&prefCarrier=0&isAjax=false
// https://in.via.com/flight/search?returnType=one-way&destination=DEL&bdestination=DEL&destinationL=Delhi&destinationCity=&destinationCN=&source=BLR&bsource=BLR&sourceL=Bangalore&sourceCity=&sourceCN=&month=12&day=1&year=2016&date=12/1/2016&numAdults=1&numChildren=2&numInfants=1&validation_result=&domesinter=international&livequote=-1&flightClass=ECONOMY_FULL&travType=INTL&routingType=ALL&preferredCarrier=&prefCarrier=0&isAjax=false
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

	if(cur_url1.split("in.via.com/flight/search").length > 1){
		if(cur_url1.split("returnType=return").length > 1){
			isReturn = 1;
		}
		else if(cur_url1.split("returnType=one-way").length > 1){
			isReturn = 0;
		}
		if(cur_url1.split("source=").length > 1){
			from = cur_url1.split("source=");
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

		if(cur_url1.split("destination=").length > 1){
			to = cur_url1.split("destination=");
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

		if(cur_url1.split("date=").length > 1){
			startDate = cur_url1.split("date=");
			startDate = startDate[1];
			if(startDate.split("&").length > 1){
				startDate = startDate.split("&");
				startDate = startDate[0];
			}
			if(startDate.split("#").length > 1){
				startDate = startDate.split("#");
				startDate = startDate[0];
			}
			startDate = startDate.split("/");
			startDate1 = startDate[startDate.length-1];
			startDate2 = startDate[1];
			if(startDate2.length == 1){
				startDate2 = "0"+startDate2;
			}
			startDate3 = startDate[0];
			if(startDate3.length == 1){
				startDate3 = "0"+startDate3;
			}
			startDate = startDate1+"-"+startDate3+"-"+startDate2;
		}

		if(isReturn == 1 && cur_url1.split("date2=").length > 1){
			returnDate = cur_url1.split("date2=");
			returnDate = returnDate[1];
			if(returnDate.split("&").length > 1){
				returnDate = returnDate.split("&");
				returnDate = returnDate[0];
			}
			if(returnDate.split("#").length > 1){
				returnDate = returnDate.split("#");
				returnDate = returnDate[0];
			}
			returnDate = returnDate.split("/");
			returnDate1 = returnDate[returnDate.length-1];
			returnDate2 = returnDate[1];
			if(returnDate2.length == 1){
				returnDate2 = "0"+returnDate2;
			}
			returnDate3 = returnDate[0];
			if(returnDate3.length == 1){
				returnDate3 = "0"+returnDate3;
			}
			returnDate = returnDate1+"-"+returnDate3+"-"+returnDate2;
			
		}

		if(cur_url1.split("numAdults=").length > 1){
			adults = cur_url1.split("numAdults=");
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

		if(cur_url1.split("numChildren=").length > 1){
			children = cur_url1.split("numChildren=");
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

		if(cur_url1.split("numInfants=").length > 1){
			infants = cur_url1.split("numInfants=");
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

		if(cur_url1.split("flightClass=").length > 1){
			cabinClass = cur_url1.split("flightClass=");
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
			if(cabinClass == "ALL"){
				cabinClass = "Economy";
			}
			if(cabinClass == "ECONOMY_FULL"){
				cabinClass = "PremiumEconomy";
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
		posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '53px', postVal: '0px'});
		posSpecs = JSON.stringify(posSpecs);

		if(flightData.length > 0){
			flightData = JSON.stringify(flightData);
			flightBanner(flightData, posResults, posSpecs);
		}
	} 

}

if(cur_url1.split("in.via.com/flight/search").length > 1){
	scrapFlightData();
}
