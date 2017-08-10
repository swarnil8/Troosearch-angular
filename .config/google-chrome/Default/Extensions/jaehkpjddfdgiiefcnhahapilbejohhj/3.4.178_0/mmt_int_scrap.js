

// function scrapFlightData(){
//   // console.log("Entered scrapFlightData");
//   var from = "";
//   var to = "";
//   var startDate = "";
//   var isReturn = "";
//   var adults = 1;
//   var infants = 0;
//   var children = 0;
//   var cabinClass = "";
//   var returnDate = "";
//   var flightData = [];

//   // https://flights.makemytrip.com/makemytrip/search/O/O/E/1/0/0/S/V0/BLR_GOI_23-11-2016?intid=homepage_Widget_Search_Bangalore_Goa

//   // https://flights.makemytrip.com/makemytrip/search/R/R/E/1/0/0/S/V0/BLR_GOI_23-11-2016,GOI_BLR_24-11-2016?intid=DF_LP_Widget_Search_Bangalore_Goa

// // https://cheapfaresindia.makemytrip.com/international/raw/index.html?l=exIndia&t=RT&i=BLR-JNB-D-24Nov2016_JNB-BLR-D-30Nov2016&p=A-1&c=E&userID=60181479386050107#/listing

// // https://cheapfaresindia.makemytrip.com/international/raw/index.html?l=exIndia&t=OW&i=BLR-JNB-D-24Nov2016&p=A-1&c=E?lang=en#/listing

// // https://www.makemytrip.com/air/search?tripType=R&itinerary=MAA-SIN-D-28Nov2016_SIN-MAA-D-26Dec2016&paxType=A-1&cabinClass=E&sTime=1479803754016

// // https://www.makemytrip.com/air/search?tripType=O&itinerary=MAA-SIN-D-28Nov2016&paxType=A-1&cabinClass=E


// var cur_url = window.location.href;
// var link = window.location.href;
// if(cur_url.split("https://cheapfaresindia.makemytrip.com/international/raw/").length > 1 || cur_url.split("https://www.makemytrip.com/air/search").length > 1){
//   if(cur_url.split("https://cheapfaresindia.makemytrip.com/international/raw/").length > 1){
//     cur_url = cur_url.split("https://cheapfaresindia.makemytrip.com/international/raw/");
//   }
//   else if(cur_url.split("https://www.makemytrip.com/air/search").length > 1){
//     cur_url = cur_url.split("https://www.makemytrip.com/air/search");
//   }
//   cur_url = cur_url[1];
//   if(cur_url.split("?").length > 1){
//     cur_url = cur_url.split("?");
//     cur_url = cur_url[1];
//   }
//   if(cur_url.split("&itinerary=").length > 1){
//     from = cur_url.split("&itinerary=");
//   }
//   else if(cur_url.split("?itinerary=").length > 1){
//     from = cur_url.split("?itinerary=");
//   }
//   else if(cur_url.split("&i=").length > 1){
//     from = cur_url.split("&i=");
//   }
//   else if(cur_url.split("?i=").length > 1){
//     from = cur_url.split("?i=");
//   }
//   else{
//     from = "";
//   }
//   if(from != ""){
//     from = from[1];
//     from = from.split("-");
//     from = from[0];
//   }
//   if(cur_url.split("&itinerary=").length > 1){
//     to = cur_url.split("&itinerary=");
//   }
//   else if(cur_url.split("?itinerary=").length > 1){
//     to = cur_url.split("?itinerary=");
//   }
//   else if(cur_url.split("&i=").length > 1){
//     to = cur_url.split("&i=");
//   }
//   else if(cur_url.split("?i=").length > 1){
//     to = cur_url.split("?i=");
//   }
//   else{
//     to = "";
//   }
//   if(to != ""){
//     to = to[1];
//     to = to.split("-");
//     to = to[1];
//   }

//   if(link.split("t=RT").length > 1 || link.split("tripType=R").length > 1){
//     returnDate = cur_url.split("-D-");
//     returnDate = returnDate[2];
//     returnDate = returnDate.split("&");
//     returnDate = returnDate[0];

//     startDate = cur_url.split("-D-");
//     startDate = startDate[1];
//     startDate = startDate.split("_");
//     startDate = startDate[0];

//     isReturn = 1;
//   }
//   else if(link.split("t=OW").length > 1 || link.split("tripType=O").length > 1){
//     isReturn = 0;
//     startDate = cur_url.split("-D-");
//     startDate = startDate[1];
//     startDate = startDate.split("&");
//     startDate = startDate[0];
//   }

//   if(cur_url.split("&c=").length > 1){
//     cabinClass = cur_url.split("&c=");
//     cabinClass = cabinClass[1];
//     if(cabinClass.split("&").length > 1){
//       cabinClass = cabinClass.split('&');
//       cabinClass = cabinClass[0];
//     }
//   }
//   else if(cur_url.split("?c=").length > 1){
//     cabinClass = cur_url.split("?c=");
//     cabinClass = cabinClass[1];
//     if(cabinClass.split("&").length > 1){
//       cabinClass = cabinClass.split('&');
//       cabinClass = cabinClass[0];
//     }
//   }
//   else if(cur_url.split("&cabinClass=").length > 1){
//     cabinClass = cur_url.split("&cabinClass=");
//     cabinClass = cabinClass[1];
//     if(cabinClass.split("&").length > 1){
//       cabinClass = cabinClass.split('&');
//       cabinClass = cabinClass[0];
//     }
//   }
//   else if(cur_url.split("?cabinClass=").length > 1){
//     cabinClass = cur_url.split("?cabinClass=");
//     cabinClass = cabinClass[1];
//     if(cabinClass.split("&").length > 1){
//       cabinClass = cabinClass.split('&');
//       cabinClass = cabinClass[0];
//     }
//   }
//   else{
//     cabinClass = "";
//   }
//   if(cur_url.split("p=A-").length > 1){
//     adults = cur_url.split("p=A-");
//     adults = adults[1];
//   }
//   if(cur_url.split("paxType=A-").length > 1){
//     adults = cur_url.split("paxType=A-");
//     adults = adults[1];
//   }
//   if(adults.split("&").length > 1){
//     adults = adults.split('&');
//     adults = adults[0];
//   }
//   if(adults.split("#").length > 1){
//     adults = adults.split('#');
//     adults = adults[0];
//   }
//   if(cabinClass == "E"){
//     cabinClass = "Economy";
//   }
//   else if(cabinClass == "PE"){
//     cabinClass = "PremiumEconomy";
//   }
//   else if(cabinClass == "B"){
//     cabinClass = "Business";
//   }

//   if(returnDate != ""){
//     returnDate = convertDate(returnDate);
//   }

//   if(startDate != ""){
//     startDate = convertDate(startDate);
//   }
//   // console.log("from : "+from);
//   // console.log("to : "+to);
//   // console.log("startDate : "+startDate);
//   // console.log("returnDate : "+returnDate);
//   // console.log("cabinClass : "+cabinClass);
//   // console.log("adults : "+adults);
//   // console.log("children : "+children);
//   // console.log("infants : "+infants);
//   // console.log("isReturn : "+isReturn);

//   flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn);
// }

// var posResults = [];
// posResults.push({selector: '#chf_header', attr: 'none', pos: 'before'});
// posResults.push({selector: '.ch__bodyWrapper', attr: 'none', pos: 'before'});
// posResults = JSON.stringify(posResults);
// var posSpecs = [];
// posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'top', preVal: '38px', postVal: '0'});
// // posSpecs.push({selector: '.fix_header_mar_top', attr: 'none', cssAttr: 'margin-top', preVal: '120px', postVal: '75px'});
// posSpecs = JSON.stringify(posSpecs);


// if(flightData.length > 0){
//   // console.log("Flight-data: "+flightData);
//   flightData = JSON.stringify(flightData);
//   flightBanner(flightData, posResults, posSpecs);
// }
// return;
// }

// var cur_url1 = window.location.href;
// if(cur_url1.split("https://cheapfaresindia.makemytrip.com/international/raw/").length > 1 || cur_url1.split("https://www.makemytrip.com/air/search").length > 1){
//   scrapFlightData();
// }
