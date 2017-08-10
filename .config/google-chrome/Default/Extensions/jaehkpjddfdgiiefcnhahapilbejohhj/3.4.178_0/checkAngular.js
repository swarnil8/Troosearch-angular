 var id = document.getElementById("idSelectorHK").innerText;
 var code = document.getElementById("idCodeHK").innerText;
 var clickSelector = document.getElementById("idClickHK").innerText;

 function changeValue() {
 	var e = $(id).val(code);
 	var $e = angular.element(e);
 	$e.triggerHandler('input');
 	$(clickSelector).click();
 	document.getElementById("idSelectorHK").remove();
 	document.getElementById("idCodeHK").remove();
 	document.getElementById("idClickHK").remove();
 }
 if(document.getElementById("idSelectorHK") && document.getElementById("idCodeHK")  && document.getElementById("idClickHK")){
 	changeValue();
 }
