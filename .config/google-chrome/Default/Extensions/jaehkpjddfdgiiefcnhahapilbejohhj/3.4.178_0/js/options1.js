var tabID = 0;
var globalInstExt = 0;
var instructionsExt = [];
var extension = chrome.runtime.id;
var flashSalesArray = "";
var checkedSalesArray = "";

function setTab(tabId, passBack){
	tabID = tabId
	if($("#hatke-tab-id").length > 0){
		$("#hatke-tab-id").remove();
	}

	var hiddenInput = document.createElement("div");
	hiddenInput.setAttribute("id", "hatke-tab-id");
	hiddenInput.setAttribute("type", "hidden");                     
	hiddenInput.setAttribute("data-item", tabID);                     
	$('body').append(hiddenInput);
}

function getTab(){
	var jsonArr = [{'sendTabID': 'bhejDE'}];
	jsonArr = JSON.stringify(jsonArr);
	var passBack = [];
	passBack = JSON.stringify(passBack);
	sendMessage(0, jsonArr, 0, setTab, passBack);
}
getTab();

function setSalesData(){
	var jsonArr = [{'sendSalesData': checkedSalesArray}];
	jsonArr = JSON.stringify(jsonArr);
	var passBack = [];
	passBack = JSON.stringify(passBack);
	sendMessage(0, jsonArr, 0, doNothing, passBack);
}

function plotSalesData(){
	// console.log(checkedSalesArray);
	// console.log(flashSalesArray);
  if(window.location.href.split("/options").length==1){
  	return;
  	// not options page
  }
   var checkedSalesNow = JSON.parse(checkedSalesArray);
   var flashSalesNow = JSON.parse(flashSalesArray);
   
   
   for(var k=0;k<flashSalesNow.length; k++){
   	  if(k==0){
   	  	var kName = "";
   	  }
   	  else {
   	  	var kName = k+1;
   	  }
   	  var liClone = document.querySelector('#flashSale-id' + kName + ' .tc-grp-list .tc-grp-li');
      var liAll = document.querySelectorAll('#flashSale-id' + kName + ' .tc-grp-list .tc-grp-li');
      for(var n=0; n< liAll.length; n++){
	   	   liAll[n].remove();
	   }
      for(var m=0;m<flashSalesNow[k].length;m++){
   	  liNow = liClone.cloneNode("true");
   	  liNow.querySelector('.tc-li-title').innerHTML = flashSalesNow[k][m].title;
   	  liNow.querySelector('input').setAttribute('uni',flashSalesNow[k][m].code);
   	  liNow.querySelector('input').setAttribute('id','ftt-' + (k+1) + (m+1));
   	  liNow.querySelector('label').setAttribute('for','ftt-' + (k+1) + (m+1));
   	  liNow.querySelector('input').setAttribute('data-toggler',flashSalesNow[k][m].code);
   	  if(typeof(checkedSalesNow[flashSalesNow[k][m].code]) != undefined){
   	  	  // console.log("Value " + checkedSalesNow[flashSalesNow[k].code]);
   	  	  if(checkedSalesNow[flashSalesNow[k][m].code] == true){
   	  	  	  // console.log("adding checked");
   	  	  	  liNow.querySelector('input').setAttribute("checked", "checked");
   	  	  }
   	  }
   	  document.querySelector('#flashSale-id' + kName + ' .tc-grp-list').append(liNow);
   	  }
   	  // console.log("added");
   }
   $(".ftt-1").click(function(){
    		///alert("copied");
            // console.log("Changed " + $(this).attr('uni') + " " + $(this).prop("checked"));
            updateSalesData($(this).attr('uni'), $(this).prop("checked"));
    	});
}

function updateSalesData(key,value){
	console.log("called with " + key + " " + value + " " +  checkedSalesArray);
	var checkedSalesNow = JSON.parse(checkedSalesArray);
	checkedSalesNow[key] = value;
	checkedSalesArray = JSON.stringify(checkedSalesNow);
	console.log(checkedSalesArray);
	setSalesData();
}

function setFlashSales(data, passBack){
	flashSalesArray = data;
	// console.log("flash " + data);
	getCheckedArray();
}

function setCheckedSales(data, passBack){
	checkedSalesArray = data;
	// console.log("cNow" + data);
	plotSalesData();
}


function getCheckedArray(){
	var jsonArr = [{'getCheckedSales': 'bhejDE'}];
	jsonArr = JSON.stringify(jsonArr);
	var passBack = [];
	passBack = JSON.stringify(passBack);
	sendMessage(0, jsonArr, 0, setCheckedSales, passBack);
}

function getFlashSales(){
	var jsonArr = [{'getFlashSalesData': 'bhejDE'}];
	jsonArr = JSON.stringify(jsonArr);
	var passBack = [];
	passBack = JSON.stringify(passBack);
	sendMessage(0, jsonArr, 0, setFlashSales, passBack);
}
getFlashSales();

function readInstructs(){
	setTimeout(function(){readInstructs()}, 100);
	var instructions = localStorage.instructions;
	// console.log(" instructions received: "+localStorage.instructions);
	if(instructions && instructions!="" && instructions!= undefined){
		instructions = JSON.parse(instructions);

		if(instructions && instructions.length > 0 && tabID!=0){
			for(var i=0;i<instructions.length;i++){
				var prefix = instructions[i]['name'];
				if(instructions[i][prefix + '5']==tabID && instructions[i]['status']==0){
					var msgType = instructions[i][prefix + "0"];
					var jsonObj = instructions[i][prefix + "1"];
					var command = instructions[i][prefix + "2"];
					var funcName = instructions[i][prefix + "3"];
					var passBack = instructions[i][prefix + "4"];
					var tabId = instructions[i][prefix + "5"];
					var PID = JSON.parse(passBack);
					instructions[i]['PID'] = PID[0].pid;
					instructions[i]['status'] = 1;
					instructions[i]['time'] = Math.floor(Date.now()/1000);
					sendMessage(msgType, jsonObj, command, funcName, passBack);
				}


			}
		}
		instructions = JSON.stringify(instructions);
		localStorage.instructions = instructions;
	}
}

readInstructs();


function instructionsExtn(data, passBack){
	// console.log("tabID: "+tabID);
	passBack = JSON.parse(passBack);
	var pid = passBack[0].pid;
	var prefix = passBack[0].prefix;
	if(globalInstExt == 0  && tabID!=0){
		globalInstExt = 1;
		var instructionsExt = [];
		if(localStorage.instructionsExt){
			instructionsExt = localStorage.instructionsExt;
			instructionsExt = JSON.parse(instructionsExt);
		}

		var flagFoundExt = false;

		for(k=0;k<instructionsExt.length;k++){
			if(instructionsExt[k][prefix + "0"]==tabID){
				flagFoundExt = true;
				break;
			}
		}

		if(!flagFoundExt){
			var inst = {};
			// console.log("Prefix: "+prefix);
			inst["name"] = prefix;
			inst["tabID"] = tabID;
			inst["data"] = data;
			inst["passBack"] = passBack;
			instructionsExt.push(inst);
		}
		var instructions = [];
		instructions = localStorage.instructions;
		instructions = JSON.parse(instructions);
		for(var j=0;j<instructions.length;j++){
			if(Math.floor(instructions[j]["PID"]) == Math.floor(pid)){
				instructions.splice(j, 1);
				break;
			}
			else{
				// console.log("Pid here "+instructions[j]["PID"]);
			}
		}
		instructions = JSON.stringify(instructions);
		localStorage.instructions = instructions;
		// console.log("instructions after process over : "+instructions);
		// console.log("instructionsExt : ",instructionsExt);
		localStorage.instructionsExt = JSON.stringify(instructionsExt);
		globalInstExt = 0;
	}
	else{
		setTimeout(function(){
			instructionsExtn(data, passBack);
		}, 100);
	}
}


function callBack(data, passBack){
	// console.log("callBack was called with ",data);
	// console.log("passBack was called with ",passBack);
	instructionsExtn(data, passBack);

}

