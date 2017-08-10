// http://book.spicejet.com/Select.aspx

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
	if($("#flightSearchContainer").length > 0 && cur_url1.split("book.spicejet.com/Select.aspx").length > 1){
		if($("#AvailabilitySearchInputSelectView_RoundTrip").length > 0 && $("#AvailabilitySearchInputSelectView_RoundTrip").attr("checked")){
			isReturn = 1;
		}
		if($("#AvailabilitySearchInputSelectView_OneWay").length > 0 && $("#AvailabilitySearchInputSelectView_OneWay").attr("checked")){
			isReturn = 0;
		}

		from = $("#AvailabilitySearchInputSelectVieworiginStation1").val().trim();
		to = $("#AvailabilitySearchInputSelectViewdestinationStation1").val().trim();

		startDate = $("#custom_date_picker_id_1").val().trim();
		startDate = startDate.split("-");
		startDate1 = startDate[startDate.length-1];
		startDate2 = startDate[1];
		startDate3 = startDate[0];
		startDate = startDate1+"-"+startDate2+"-"+startDate3;
		
		if(isReturn == 1){
			returnDate = $("#custom_date_picker_id_2").val().trim();
			returnDate = returnDate.split("-");
			returnDate1 = returnDate[returnDate.length-1];
			returnDate2 = returnDate[1];
			returnDate3 = returnDate[0];
			returnDate = returnDate1+"-"+returnDate2+"-"+returnDate3;
		}
		adults = parseInt($("#AvailabilitySearchInputSelectView_DropDownListPassengerType_ADT").val().trim());
		children = parseInt($("#AvailabilitySearchInputSelectView_DropDownListPassengerType_CHD").val().trim());
		infants = parseInt($("#AvailabilitySearchInputSelectView_DropDownListPassengerType_INFANT").val().trim());

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
	else{
		setTimeout(scrapFlightData, 500);
	}

}

if(cur_url1.split("book.spicejet.com/Select.aspx").length > 1){
	scrapFlightData();
}
