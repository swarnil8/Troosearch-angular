// http://domestic-air-tickets.expedia.co.in/flights/results?from=DEL&to=BLR&depart_date=19/12/2016&return_date=28/12/2016&adults=4&childs=0&infants=0&dep_time=0&ret_time=0&class=Economy&airline=&carrier=&x=57&y=16&flexi_search=no
// http://domestic-air-tickets.expedia.co.in/flights/search?rnd_one=O&origin=New+Delhi%2C+IN+-+Indira+Gandhi+Airport+%28DEL%29&from=DEL&destination=Bangalore%2C+IN+-+Kempegowda+International+Airport+%28BLR%29&to=BLR&depart_date=22%2F12%2F2016&adults=1&childs=0&infants=0&class=Economy&airline=&carrier=&dep_time=0&modify_search=T

// https://www.expedia.com/Flights-Search?trip=roundtrip&leg1=from:Johannesburg,%20South%20Africa%20(JNB-All%20Airports),to:Los%20Angeles,%20California,departure:12/06/2016TANYT&leg2=from:Los%20Angeles,%20California,to:Johannesburg,%20South%20Africa%20(JNB-All%20Airports),departure:12/13/2016TANYT&passengers=children:0,adults:1,seniors:0,infantinlap:Y&mode=search

// https://www.expedia.com/Flights-Search?mdpcid=US.META.KAYAK.FLOATING-COMPARE.FLIGHT&mode=search&paandi=true&leg1=from%3ABOM%2Cto%3APRG%2Cdeparture%3A01%2F12%2F2017TANYT&passengers=children%3A0%2Cadults%3A1%2Cseniors%3A0%2Cinfantinlap%3AY&trip=RoundTrip&mdpdtl=FLT.BOM.PRG&leg2=from%3APRG%2Cto%3ABOM%2Cdeparture%3A01%2F16%2F2017TANYT&options=cabinclass%3Aeconomy%2Csortby%3Aprice&

function scrapFlightData(){
	if(getCookie("currency_to_usd")){
	}
	else{
		convertINRToUSD();
	} 
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
	if(cur_url.split("expedia.co.in/flights/results").length > 1 || cur_url.split("expedia.com/Flights-Search").length > 1){
		if(cur_url.split("expedia.co.in/flights/results").length > 1){
			cur_url = cur_url.split("expedia.co.in/flights/results");
			cur_url = cur_url[1];
			if(cur_url.split("?from=").length > 1){
				from = cur_url.split("?from=");
			}
			else if(cur_url.split("&from=").length > 1){
				from = cur_url.split("&from=");
			}
			else{
				from = "";
			}
			if(from != ""){
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


			if(cur_url.split("?to=").length > 1){
				to = cur_url.split("?to=");
			}
			else if(cur_url.split("&to=").length > 1){
				to = cur_url.split("&to=");
			}
			else{
				to = "";
			}
			if(to != ""){
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


			if(cur_url.split("?depart_date=").length > 1){
				startDate = cur_url.split("?depart_date=");
			}
			else if(cur_url.split("&depart_date=").length > 1){
				startDate = cur_url.split("&depart_date=");
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

			if(cur_url.split("?return_date=").length > 1){
				isReturn = 1;
				returnDate = cur_url.split("?return_date=");
			}
			else if(cur_url.split("&return_date=").length > 1){
				isReturn = 1;
				returnDate = cur_url.split("&return_date=");
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

			if(cur_url.split("?adults=").length > 1){
				adults = cur_url.split("?adults=");
			}
			else if(cur_url.split("&adults=").length > 1){
				adults = cur_url.split("&adults=");
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


			if(cur_url.split("?childs=").length > 1){
				children = cur_url.split("?childs=");
			}
			else if(cur_url.split("&childs=").length > 1){
				children = cur_url.split("&childs=");
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

			if(cur_url.split("?infants=").length > 1){
				infants = cur_url.split("?infants=");
			}
			else if(cur_url.split("&infants=").length > 1){
				infants = cur_url.split("&infants=");
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


			if(cur_url.split("?class=").length > 1){
				cabinClass = cur_url.split("?class=");
			}
			else if(cur_url.split("&class=").length > 1){
				cabinClass = cur_url.split("&class=");
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
				cabinClass = cabinClass.split("+").join("").trim();
			}
			flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn);
		}
		else if(cur_url.split("expedia.com/Flights-Search").length > 1){
			cur_url = cur_url.split("expedia.com/Flights-Search");
			cur_url = cur_url[1];
			if(cur_url.split("leg1=").length > 1){
				cur_url = cur_url.split("leg1=");
				cur_url = cur_url[1];
				cur_url = decodeURIComponent(cur_url);
				from = cur_url.split("from:");
				from = from[1];
				from = from.split(",");
				from = from[0];
				to = cur_url.split("to:");
				to = to[1];
				to = to.split(",");
				to = to[0];
				adults = cur_url.split("adults:");
				adults = adults[1];
				adults = adults.split(",");
				adults = adults[0];
				children = cur_url.split("children:");
				children = children[1];
				children = children.split(",");
				children = children[0];
				infantinlap = cur_url.split("infantinlap:");
				infantinlap = infantinlap[1];
				infantinlap = infantinlap.split(",");
				infantinlap = parseInt(infantinlap[0]);
				startDate = cur_url.split("departure:");
				startDate = startDate[1];
				startDate = startDate.split("T");
				startDate = startDate[0];
				startDate = startDate.split("/");
				startDate1 = startDate[2];
				startDate2 = startDate[1];
				startDate3 = startDate[0];
				startDate = startDate1+"-"+startDate3+"-"+startDate2;
				cabinClass = cur_url.split("cabinclass:");
				cabinClass = cabinClass[1];
				cabinClass = cabinClass.split(",");
				cabinClass = cabinClass[0];

				if(cur_url.split("leg2=").length > 1){
					cur_url = cur_url.split("leg2=");
					cur_url = cur_url[1];
					returnDate = cur_url.split("departure:");
					returnDate = returnDate[1];
					returnDate = returnDate.split("T");
					returnDate = returnDate[0];
					returnDate = returnDate.split("/");
					returnDate1 = returnDate[2];
					returnDate2 = returnDate[1];
					returnDate3 = returnDate[0];
					returnDate = returnDate1+"-"+returnDate3+"-"+returnDate2;
					isReturn = 1;
				}
				else{
					isReturn = 0;
				}
				flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn, "USD");
			}
		}
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
if(cur_url1.split("expedia.co.in/flights/results").length > 1 || cur_url1.split("expedia.com/Flights-Search").length > 1){
	scrapFlightData();
}