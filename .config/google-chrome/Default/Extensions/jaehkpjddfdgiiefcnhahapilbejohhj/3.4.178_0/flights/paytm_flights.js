
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
	if(cur_url.split("paytm.com/flights/flightSearch/").length > 1){
		cur_url = cur_url.split("paytm.com/flights/flightSearch/");
		cur_url = cur_url[1];
		if(cur_url.split("?").length > 1){
			cur_url = cur_url.split("?");
			cur_url = cur_url[0];
		}
		if(cur_url.split("#").length > 1){
			cur_url = cur_url.split("#");
			cur_url = cur_url[0];
		}
		if(cur_url.split("&").length > 1){
			cur_url = cur_url.split("&");
			cur_url = cur_url[0];
		}
		from = cur_url.split("-");
		from = cur_url.split("-");
		from = from[0];

		to = cur_url.split("-");
		to = to[1];
		to = to.split("/");
		to = to[to.length-1];


		data = cur_url;
		adults = data.split("/");
		adults = adults[2];

		children = data.split("/");
		children = children[3];

		infants = data.split("/");
		infants = infants[4];

		cabinClass = data.split("/");
		cabinClass = cabinClass[5];

		startDate = data.split("/");
		startDate = startDate[6];

		returnDate = data.split("/");
		returnDate = returnDate[7];

		if(returnDate && returnDate.split("-").length > 2){
			isReturn = 1;
		}
		else{
			isReturn = 0;
			returnDate = "";
		}

		if(cabinClass == "E"){
			cabinClass = "Economy";
		}
		else if(cabinClass == "P"){
			cabinClass = "PremiumEconomy";
		}
		else if(cabinClass == "B"){
			cabinClass = "Business";
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
	posResults.push({selector: '#user-detail', attr: 'none', pos: 'before'});
	posResults.push({selector: 'body', attr: 'none', pos: 'before'});
	posResults = JSON.stringify(posResults);
	var posSpecs = [];
	posSpecs.push({selector: '#user-detail', attr: 'none', cssAttr: 'margin-top', preVal: '53px', postVal: '0px'});
	posSpecs = JSON.stringify(posSpecs);

	if(flightData.length > 0){
		flightData = JSON.stringify(flightData);
		flightBanner(flightData, posResults, posSpecs);
	}
	return;
}

var cur_url1 = window.location.href;
if(cur_url1.split("paytm.com/flights/flightSearch/").length > 1){
	scrapFlightData();
}

