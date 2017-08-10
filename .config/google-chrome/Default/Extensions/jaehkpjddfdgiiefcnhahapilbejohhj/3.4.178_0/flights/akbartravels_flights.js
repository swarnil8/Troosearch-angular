function scrapFlightData(){
	var from = "";
	var to = "";
	var startDate = "";
	var isReturn = "";
	var adults = "";
	var infants = "";
	var children = "";
	var cabinClass = "";
	var returnDate = "";
	var flightData = [];
	var cur_url = window.location.href;
	var link = window.location.href;
	if(cur_url.split("akbartravels.com/Flight/Search").length > 1){

		if($("#To").length > 0){
			to = $("#To").attr("value");
			to = to.split("[");
			to = to[to.length-1];
			to = to.split("]");
			to = to[0].trim();
		}

		if($("#From").length > 0){
			from = $("#From").attr("value");
			from = from.split("[");
			from = from[from.length-1];
			from = from.split("]");
			from = from[0].trim();
		}

		if($(".sector-details").length > 0){
			data = $(".sector-details").text().trim();
			cabinClass = data.split("Travel Class :");
			cabinClass = cabinClass[1];
			cabinClass = cabinClass.split("|");
			cabinClass = cabinClass[0].trim();
			cabinClass = cabinClass.split(" ").join("").trim();


			startDate = data.toUpperCase().split("ONWARD :");
			startDate = startDate[1];
			startDate = startDate.split("|");
			startDate = startDate[0].trim();

			if(data.toUpperCase().split("RETURN :").length > 1){
				isReturn = 1;
				returnDate = data.toUpperCase().split("RETURN :");
				returnDate = returnDate[1];
				returnDate = returnDate.split("|");
				returnDate = returnDate[0].trim();
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

			if(isReturn == 1 && returnDate.split("/").length > 1){
				date1 = returnDate.split("/");
				date1 = date1[date1.length-1];
				date2 = returnDate.split("/");
				date2 = date2[1];
				date3 = returnDate.split("/");
				date3 = date3[0];
				returnDate = date1+"-"+date2+"-"+date3;
			}

			adults = data.toUpperCase().split("ADULTS-");
			adults = adults[1];
			adults = adults.split(",");
			adults = adults[0].trim();

			children = data.toUpperCase().split("CHILD-");
			children = children[1];
			children = children.split(",");
			children = children[0].trim();

			infants = data.toUpperCase().split("INFANT-");
			infants = infants[1].trim();
			if(infants.split(",").length > 1){
				infants = infants.split(",");
				infants = infants[0].trim();
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
	}

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
	return;
}

var cur_url1 = window.location.href;
if(cur_url1.split("akbartravels.com/Flight/Search").length > 1){
	scrapFlightData();
}