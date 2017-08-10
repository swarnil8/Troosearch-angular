
$("body").append("<div id='proddetails'></div>");

$("#proddetails").html(JSON.stringify(prodsJson));

$("body").append("<div id='proddata'></div>");

$("#proddata").html(JSON.stringify(digitalData));

$("body").append("<div id='prodemail'></div>");
$("#prodemail").html(email);
