var dataArray=[];
var map=new Object;
var flagPrice=0;
var flagPriceDrop=0;
var flagStoreName=0;
var dataAvail = 0;
var wish_list_arr = [];
var newPushArr = [];
var newPushData = [];
var manifest_det = chrome.runtime.getManifest();
var manifest_version = manifest_det.version;
var tot_not = 0;

$(".mh-version").text(manifest_version);

function changeOrderAMS(){
	$("#order-change-btn").parent().css("display", "none");
	$("#order-input-id").css("display", "block");
	var db_id = $(this).parent().parent().attr("data-item").trim();
	// console.log("db_id1: "+db_id);
}
function changeEmailAMS(){
	$("#email-change-btn").parent().css("display", "none");
	$("#email-input-id").css("display", "block");
	var db_id = $(this).parent().parent().attr("data-item").trim();
	// console.log("db_id2: "+db_id);
}
function changeMobileAMS(){
	$("#mobile-change-btn").parent().css("display", "none");
	$("#mobile-input-id").css("display", "block");
	var db_id = $(this).parent().parent().attr("data-item").trim();
	// console.log("db_id3: "+db_id);
}
function changeIFSCAMS(){
	$("#ifsc-change-btn").parent().css("display", "none");
	$("#ifsc-input-id").css("display", "block");
	var db_id = $(this).parent().parent().attr("data-item").trim();
	// console.log("db_id4: "+db_id);
}
function changeBankAMS(){
	$("#bank-change-btn").parent().css("display", "none");
	$("#bank-input-id").css("display", "block");
	var db_id = $(this).parent().parent().attr("data-item").trim();
	// console.log("db_id5: "+db_id);
}

function saveOrderAMS(){
	var id_ams = $("#change-order-ams").parent().parent().attr("data-item").trim();
	var new_order = $("#change-order-ams").val().trim();
	if(new_order != ""){
		$.post("http://compare.buyhatke.com/promotions/amSwan/changeOrder.php", {id: encodeURIComponent(id_ams), order_id: encodeURIComponent(new_order)}).success(function(data){
			if(data != 0 && data != "0"){
				$("#order-input-id").css("display","none");
				$("#order-change-btn").parent().css("display","block");
				$("#order-change-btn").parent().find(".tc-li-value").html(new_order);
				localStorage.orderAMS = new_order;
			}
			else{
				alert("Order Id Already Exists!");
			}
		});
	}
	else{
		alert("Wrong Order ID!");
	}
}

function saveEmailAMS(){
	var id_ams = $("#change-email-ams").parent().parent().attr("data-item").trim();
	var new_email = $("#change-email-ams").val().trim();
	if(new_email != "" && new_email.split("@").length > 1 && new_email.split(".").length > 1){
		$.post("http://compare.buyhatke.com/promotions/amSwan/changeEmail.php", {id: encodeURIComponent(id_ams), email: encodeURIComponent(new_email)}).success(function(data){
			if(data != 0 && data != "0"){
				$("#email-input-id").css("display","none");
				$("#email-change-btn").parent().css("display","block");
				$("#email-change-btn").parent().find(".tc-li-value").html(new_email);
				localStorage.emailAMS = new_email;
			}
			else{
				alert("Email Id Already Exists!");
			}
		});
	}
	else{
		alert("Wrong Email!");
	}
}

function saveMobileAMS(){
	var id_ams = $("#change-mobile-ams").parent().parent().attr("data-item").trim();
	var new_mobile = $("#change-mobile-ams").val().trim();
	if(new_mobile != "" && new_mobile.length == 10){
		$.post("http://compare.buyhatke.com/promotions/amSwan/changeMobile.php", {id: encodeURIComponent(id_ams), mobile: encodeURIComponent(new_mobile)}).success(function(data){
			if(data != 0 && data != "0"){
				$("#mobile-input-id").css("display","none");
				$("#mobile-change-btn").parent().css("display","block");
				$("#mobile-change-btn").parent().find(".tc-li-value").html(new_mobile);
				localStorage.phoneAMS = new_mobile;

			}
			else{
				alert("Mobile No. Already Exists!");
			}
		});
	}
	else{
		alert("Wrong Mobile No.!");
	}
}

function saveIFSCAMS(){
	var id_ams = $("#change-ifsc-ams").parent().parent().attr("data-item").trim();
	var new_ifsc = $("#change-ifsc-ams").val().trim();
	if(new_ifsc != ""){
		$.post("http://compare.buyhatke.com/promotions/amSwan/changeIFSC.php", {id: encodeURIComponent(id_ams), ifsc: encodeURIComponent(new_ifsc)}).success(function(data){
			$("#ifsc-input-id").css("display","none");
			$("#ifsc-change-btn").parent().css("display","block");
			$("#ifsc-change-btn").parent().find(".tc-li-value").html(new_ifsc);
		});
	}
	else{
		alert("Empty Field!");
	}
}

function saveBankAMS(){
	var id_ams = $("#change-bank-ams").parent().parent().attr("data-item").trim();
	var new_bank = $("#change-bank-ams").val().trim();
	if(new_bank != ""){
		$.post("http://compare.buyhatke.com/promotions/amSwan/changeBank.php", {id: encodeURIComponent(id_ams), bank_acc: encodeURIComponent(new_bank)}).success(function(data){
			$("#bank-input-id").css("display","none");
			$("#bank-change-btn").parent().css("display","block");
			$("#bank-change-btn").parent().find(".tc-li-value").html(new_bank);
		});
	}
	else{
		alert("Empty Field!");
	}
}

function amsTabClicked(){
	var ams_email_local = localStorage.emailAMS;
	var ams_phone_local = localStorage.phoneAMS;
	var ams_order_local = localStorage.orderAMS;

	if( (ams_order_local != undefined && ams_order_local != "") || (ams_order_local != undefined && ams_order_local != "")){
		$.post("http://compare.buyhatke.com/promotions/amSwan/skipped2.php", {order_id: encodeURIComponent(ams_order_local)}).success(function(resp){
			resp = JSON.parse(resp);
			var id_ams = resp.id;
			var name = resp.name;
			var share_url = resp.share_url;
			var click_count = resp.click_count;
			var clickMes = "";
			if(click_count < 100) {
				clickMes = " (Get <b>" + (100 - click_count) + "</b> more clicks to avail 100% cashback offer.";
			}
			else {
				clickMes = " (Hurray ! You have unlocked 100% cashback offer. Wait for 21 days and you will get money in the respective account !)";
			}
			var order_id = resp.order_id;
			var email = resp.email;
			var mobile = resp.mobile;
			var ifsc = resp.ifsc;
			var bank_acc = resp.bank_acc;
			localStorage.orderAMS = resp.order_id;
			localStorage.emailAMS = resp.email;
			localStorage.phoneAMS = resp.mobile;

			if(share_url.toUpperCase().split("SORRY").length < 2){
				$("#ams-offer-text").text("Share the following URL to avail CashBack!");
				$("#ams-form").css("display","none");
				$("#share-url-ams").css("display","block");

				$("#share-url-ams").html('<ul class="tc-grp-list" data-item="'+id_ams+'"><li class="user-name-ams"><span class="tc-li-title">Hi, </span><span class="tc-li-value" id="">'+name+'</span></li><li class="tc-grp-li i-activated"><span class="tc-li-title">Share URL - </span><a href="'+share_url+'" target="_blank" class="tc-li-value" id="">'+share_url+'</a></li><li class="tc-grp-li i-activated"><span class="tc-li-title">Click Count - </span><span class="tc-li-value" id="">'+click_count+ clickMes + '</span></li><li class="tc-grp-li i-activated"><span class="tc-li-title">Order ID - </span><span class="tc-li-value" id="">'+order_id+'</span><a href="#" class="tc-grp-header-btn" id="order-change-btn"><i class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14.8" height="14.8" viewBox="0 0 14.8 14.8"><style>.s0{fill:#FFF;}</style><path d="M2.5 11L1 14.5 4.4 13l-2-2M13 2.4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8l7.8-7.7 2 2-8 7.8z" opacity=".2"></path><path fill="#FFF" d="M1.5 9L0 12.5 3.4 11l-2-2M12 .4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8L9.7.8l2 2-8 7.8z"></path></svg></i>Change</a></li><div id="order-input-id" class="es-input input-wrapper" style="display: none"><input class="input-field" type="email" placeholder="ENTER YOUR ORDER ID:" id="change-order-ams"><label class="input-label" for="change-order-ams">	Enter your Order ID:</label><button class="input-button-ams" id="change-order-submit">Submit</button></div><li class="tc-grp-li i-activated"><span class="tc-li-title">Email - </span><span class="tc-li-value" id="">'+email+'</span><a href="#" class="tc-grp-header-btn" id="email-change-btn"><i class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14.8" height="14.8" viewBox="0 0 14.8 14.8"><style>.s0{fill:#FFF;}</style><path d="M2.5 11L1 14.5 4.4 13l-2-2M13 2.4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8l7.8-7.7 2 2-8 7.8z" opacity=".2"></path><path fill="#FFF" d="M1.5 9L0 12.5 3.4 11l-2-2M12 .4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8L9.7.8l2 2-8 7.8z"></path></svg></i>Change</a></li><div id="email-input-id" class="es-input input-wrapper" style="display: none"><input class="input-field" type="email" placeholder="ENTER YOUR EMAIL ID:" id="change-email-ams"><label class="input-label" for="change-email-ams">	Enter your email ID:</label><button class="input-button-ams" id="change-email-submit">Submit</button></div><li class="tc-grp-li i-activated"><span class="tc-li-title">Mobile No. - </span><span class="tc-li-value" id="">'+mobile+'</span><a href="#" class="tc-grp-header-btn" id="mobile-change-btn"><i class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14.8" height="14.8" viewBox="0 0 14.8 14.8"><style>.s0{fill:#FFF;}</style><path d="M2.5 11L1 14.5 4.4 13l-2-2M13 2.4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8l7.8-7.7 2 2-8 7.8z" opacity=".2"></path><path fill="#FFF" d="M1.5 9L0 12.5 3.4 11l-2-2M12 .4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8L9.7.8l2 2-8 7.8z"></path></svg></i>Change</a></li><div id="mobile-input-id" class="es-input input-wrapper" style="display: none"><input class="input-field" type="email" placeholder="ENTER YOUR MOBILE NO.:" id="change-mobile-ams"><label class="input-label" for="change-mobile-ams">	Enter your Mobile No.:</label><button class="input-button-ams" id="change-mobile-submit">Submit</button></div><li class="tc-grp-li i-activated"><span class="tc-li-title">IFSC - </span><span class="tc-li-value" id="">'+ifsc+'</span><a href="#" class="tc-grp-header-btn" id="ifsc-change-btn"><i class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14.8" height="14.8" viewBox="0 0 14.8 14.8"><style>.s0{fill:#FFF;}</style><path d="M2.5 11L1 14.5 4.4 13l-2-2M13 2.4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8l7.8-7.7 2 2-8 7.8z" opacity=".2"></path><path fill="#FFF" d="M1.5 9L0 12.5 3.4 11l-2-2M12 .4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8L9.7.8l2 2-8 7.8z"></path></svg></i>Change</a></li><div id="ifsc-input-id" class="es-input input-wrapper" style="display: none"><input class="input-field" type="email" placeholder="ENTER YOUR IFSC:" id="change-ifsc-ams"><label class="input-label" for="change-ifsc-ams">	Enter your IFSC:</label><button class="input-button-ams" id="change-ifsc-submit">Submit</button></div><li class="tc-grp-li i-activated"><span class="tc-li-title">Bank Account No. - </span><span class="tc-li-value" id="">'+bank_acc+'</span><a href="#" class="tc-grp-header-btn" id="bank-change-btn"><i class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14.8" height="14.8" viewBox="0 0 14.8 14.8"><style>.s0{fill:#FFF;}</style><path d="M2.5 11L1 14.5 4.4 13l-2-2M13 2.4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8l7.8-7.7 2 2-8 7.8z" opacity=".2"></path><path fill="#FFF" d="M1.5 9L0 12.5 3.4 11l-2-2M12 .4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8L9.7.8l2 2-8 7.8z"></path></svg></i>Change</a></li><div id="bank-input-id" class="es-input input-wrapper" style="display: none"><input class="input-field" type="email" placeholder="ENTER YOUR BANK ACCOUNT NO:" id="change-bank-ams"><label class="input-label" for="change-bank-ams">	Enter your Bank Account No.:</label><button class="input-button-ams" id="change-bank-submit">Submit</button></div></ul>');
				$("#order-change-btn").click(function(){
					changeOrderAMS();
				});

				$("#email-change-btn").click(function(){
					changeEmailAMS();
				});

				$("#mobile-change-btn").click(function(){
					changeMobileAMS();
				});

				$("#ifsc-change-btn").click(function(){
					changeIFSCAMS();
				});
				$("#bank-change-btn").click(function(){
					changeBankAMS();
				});


				$("#change-order-submit").click(function(){
					saveOrderAMS();
				});
				$("#change-email-submit").click(function(){
					saveEmailAMS();
				});
				$("#change-mobile-submit").click(function(){
					saveMobileAMS();
				});
				$("#change-ifsc-submit").click(function(){
					saveIFSCAMS();
				});
				$("#change-bank-submit").click(function(){
					saveBankAMS();
				});

			}
			else{
				$("#ams-offer-text").text("Enter Details for AmericanSwan Offers: ");
				$("#ams-form").css("display","block");
				$("#share-url-ams").css("display","none");
			}
		});
}
else{
	$("#ams-offer-text").text("Enter Details for AmericanSwan Offers: ");
	$("#ams-form").css("display","block");
	$("#share-url-ams").css("display","none");
}
}
$('#ams-details').click(function(){
	amsTabClicked();
});

$(document).ready(function($){

	amsTabClicked();
	$("#submit-ams-details").click(function(){
		var ams_name = $("#ams-name").val().trim();
		var ams_email = $("#ams-email").val().trim();
		var ams_order_id = $("#ams-order-id").val().trim();
		var ams_mob = $("#ams-mob").val().trim();
		var ams_ifsc = $("#ams-ifsc").val().trim();
		var ams_bank = $("#ams-bank").val().trim();
		var fill_ams = 0;

		if( (ams_order_id == "" || ams_email == "") || (ams_mob == "" && ams_bank == "" && ams_ifsc == "") ){
			alert("Please fill all the required fields!");
			fill_ams = 1;
		}
		else if(ams_mob != "" && (ams_bank != "" || ams_ifsc != "")){
			alert("Please fill only one cash back Option!");
			fill_ams = 1;
		}
		else if(ams_mob != "" && (ams_mob.length < 10 || ams_mob.length > 11 || isNaN(ams_mob) )){
			alert("Mobile No. not Correct!");
			fill_ams = 1;
		}
		else if(ams_email.split("@").length < 2 || ams_email.split(".").length < 2){
			alert("Email Id not Correct!");
			fill_ams = 1;
		}
		localStorage.emailAMS = ams_email;
		localStorage.phoneAMS = ams_mob;
		localStorage.orderAMS = ams_order_id;
		ams_name = encodeURIComponent(ams_name);
		ams_email = encodeURIComponent(ams_email);
		ams_order_id = encodeURIComponent(ams_order_id);
		ams_mob = encodeURIComponent(ams_mob);
		ams_ifsc = encodeURIComponent(ams_ifsc);
		ams_bank = encodeURIComponent(ams_bank);

		if(fill_ams == 0){
			$.post("http://compare.buyhatke.com/promotions/amSwan/saveCashBackInfo2.php", {name: ams_name, email: ams_email, order_id: ams_order_id, mobile: ams_mob, ifsc: ams_ifsc, account_no: ams_bank}).success(function(resp){
				resp = JSON.parse(resp);
				var id_ams = resp.id;
				var name = resp.name;
				var share_url = resp.share_url;
				var click_count = resp.click_count;
				var order_id = resp.order_id;
				var email = resp.email;
				var mobile = resp.mobile;
				var ifsc = resp.ifsc;
				var bank_acc = resp.bank_acc;
				var msg = resp.msg;
				var duplicateData = 0;
				if(msg.toUpperCase().split("ALREADY EXIST").length > 1){
					alert(msg);
					duplicateData = 1;
				}
				if(duplicateData == 0){
					localStorage.orderAMS = order_id;
					localStorage.emailAMS = email;
					localStorage.phoneAMS = mobile;

					$("#ams-offer-text").text("Share the following URL to avail CashBack!");
					$("#ams-form").css("display","none");
					$("#share-url-ams").css("display","block");

					$("#share-url-ams").html('<ul class="tc-grp-list" data-item="'+id_ams+'"><li class="user-name-ams"><span class="tc-li-title">Hi, </span><span class="tc-li-value" id="">'+name+'</span></li><li class="tc-grp-li i-activated"><span class="tc-li-title">Share URL - </span><a href="'+share_url+'" target="_blank" class="tc-li-value" id="">'+share_url+'</a></li><li class="tc-grp-li i-activated"><span class="tc-li-title">Click Count - </span><span class="tc-li-value" id="">'+click_count+'</span></li><li class="tc-grp-li i-activated"><span class="tc-li-title">Order ID - </span><span class="tc-li-value" id="">'+order_id+'</span><a href="#" class="tc-grp-header-btn" id="order-change-btn"><i class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14.8" height="14.8" viewBox="0 0 14.8 14.8"><style>.s0{fill:#FFF;}</style><path d="M2.5 11L1 14.5 4.4 13l-2-2M13 2.4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8l7.8-7.7 2 2-8 7.8z" opacity=".2"></path><path fill="#FFF" d="M1.5 9L0 12.5 3.4 11l-2-2M12 .4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8L9.7.8l2 2-8 7.8z"></path></svg></i>Change</a></li><div id="order-input-id" class="es-input input-wrapper" style="display: none"><input class="input-field" type="email" placeholder="ENTER YOUR ORDER ID:" id="change-order-ams"><label class="input-label" for="change-order-ams">	Enter your Order ID:</label><button class="input-button-ams" id="change-order-submit">Submit</button></div><li class="tc-grp-li i-activated"><span class="tc-li-title">Email - </span><span class="tc-li-value" id="">'+email+'</span><a href="#" class="tc-grp-header-btn" id="email-change-btn"><i class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14.8" height="14.8" viewBox="0 0 14.8 14.8"><style>.s0{fill:#FFF;}</style><path d="M2.5 11L1 14.5 4.4 13l-2-2M13 2.4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8l7.8-7.7 2 2-8 7.8z" opacity=".2"></path><path fill="#FFF" d="M1.5 9L0 12.5 3.4 11l-2-2M12 .4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8L9.7.8l2 2-8 7.8z"></path></svg></i>Change</a></li><div id="email-input-id" class="es-input input-wrapper" style="display: none"><input class="input-field" type="email" placeholder="ENTER YOUR EMAIL ID:" id="change-email-ams"><label class="input-label" for="change-email-ams">	Enter your email ID:</label><button class="input-button-ams" id="change-email-submit">Submit</button></div><li class="tc-grp-li i-activated"><span class="tc-li-title">Mobile No. - </span><span class="tc-li-value" id="">'+mobile+'</span><a href="#" class="tc-grp-header-btn" id="mobile-change-btn"><i class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14.8" height="14.8" viewBox="0 0 14.8 14.8"><style>.s0{fill:#FFF;}</style><path d="M2.5 11L1 14.5 4.4 13l-2-2M13 2.4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8l7.8-7.7 2 2-8 7.8z" opacity=".2"></path><path fill="#FFF" d="M1.5 9L0 12.5 3.4 11l-2-2M12 .4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8L9.7.8l2 2-8 7.8z"></path></svg></i>Change</a></li><div id="mobile-input-id" class="es-input input-wrapper" style="display: none"><input class="input-field" type="email" placeholder="ENTER YOUR MOBILE NO.:" id="change-mobile-ams"><label class="input-label" for="change-mobile-ams">	Enter your Mobile No.:</label><button class="input-button-ams" id="change-mobile-submit">Submit</button></div><li class="tc-grp-li i-activated"><span class="tc-li-title">IFSC - </span><span class="tc-li-value" id="">'+ifsc+'</span><a href="#" class="tc-grp-header-btn" id="ifsc-change-btn"><i class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14.8" height="14.8" viewBox="0 0 14.8 14.8"><style>.s0{fill:#FFF;}</style><path d="M2.5 11L1 14.5 4.4 13l-2-2M13 2.4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8l7.8-7.7 2 2-8 7.8z" opacity=".2"></path><path fill="#FFF" d="M1.5 9L0 12.5 3.4 11l-2-2M12 .4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8L9.7.8l2 2-8 7.8z"></path></svg></i>Change</a></li><div id="ifsc-input-id" class="es-input input-wrapper" style="display: none"><input class="input-field" type="email" placeholder="ENTER YOUR IFSC:" id="change-ifsc-ams"><label class="input-label" for="change-ifsc-ams">	Enter your IFSC:</label><button class="input-button-ams" id="change-ifsc-submit">Submit</button></div><li class="tc-grp-li i-activated"><span class="tc-li-title">Bank Account No. - </span><span class="tc-li-value" id="">'+bank_acc+'</span><a href="#" class="tc-grp-header-btn" id="bank-change-btn"><i class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14.8" height="14.8" viewBox="0 0 14.8 14.8"><style>.s0{fill:#FFF;}</style><path d="M2.5 11L1 14.5 4.4 13l-2-2M13 2.4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8l7.8-7.7 2 2-8 7.8z" opacity=".2"></path><path fill="#FFF" d="M1.5 9L0 12.5 3.4 11l-2-2M12 .4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8L9.7.8l2 2-8 7.8z"></path></svg></i>Change</a></li><div id="bank-input-id" class="es-input input-wrapper" style="display: none"><input class="input-field" type="email" placeholder="ENTER YOUR BANK ACCOUNT NO:" id="change-bank-ams"><label class="input-label" for="change-bank-ams">	Enter your Bank Account No.:</label><button class="input-button-ams" id="change-bank-submit">Submit</button></div></ul>');

					$("#order-change-btn").click(function(){
						changeOrderAMS();
					});

					$("#email-change-btn").click(function(){
						changeEmailAMS();
					});

					$("#mobile-change-btn").click(function(){
						changeMobileAMS();
					});

					$("#ifsc-change-btn").click(function(){
						changeIFSCAMS();
					});
					$("#bank-change-btn").click(function(){
						changeBankAMS();
					});


					$("#change-order-submit").click(function(){
						saveOrderAMS();
					});
					$("#change-email-submit").click(function(){
						saveEmailAMS();
					});
					$("#change-mobile-submit").click(function(){
						saveMobileAMS();
					});
					$("#change-ifsc-submit").click(function(){
						saveIFSCAMS();
					});
					$("#change-bank-submit").click(function(){
						saveBankAMS();
					});
				}
				else{
					$("#ams-offer-text").text("Enter Details for AmericanSwan Offers: ");
					$("#ams-form").css("display","block");
					$("#share-url-ams").css("display","none");
				}
			});
}
});


// New code for OJASS starts

if(localStorage.sourceInstall!="ojass"){
	$('#ojass-registration').css("display", "none");
}

if(localStorage.emailOjass && localStorage.emailOjass!=""){
	$("#ojass-email").val(localStorage.emailOjass);
}
if(localStorage.phoneOjass && localStorage.phoneOjass!=""){
	$("#ojass-phone").val(localStorage.phoneOjass);
}
if(localStorage.nameOjass && localStorage.nameOjass!=""){
	$("#ojass-name").val(localStorage.nameOjass);
}
if(localStorage.branchOjass && localStorage.branchOjass!=""){
	$("#ojass-branch").val(localStorage.branchOjass);
}
if(localStorage.yearOjass && localStorage.yearOjass!=""){
	$("#ojass-year").val(localStorage.yearOjass);
}
if(localStorage.collOjass && localStorage.collOjass!=""){
	$("#ojass-college").val(localStorage.collOjass);
}

$("#submit-ojass-details").click(function(){
	var ojass_name = $("#ojass-name").val().trim();
	var ojass_email = $("#ojass-email").val().trim();
	var ojass_branch = $("#ojass-branch").val().trim();
	var ojass_phone = $("#ojass-phone").val().trim();
	var ojass_year = $("#ojass-year").val().trim();
	var ojass_college = $("#ojass-college").val().trim();
		// var ams_bank = $("#ams-bank").val().trim();
		var fill_ams = 0;

		if( ojass_year == "" || ojass_branch == "" || ojass_phone == "" || ojass_name == "" || ojass_email == "" || ojass_college == ""){
			alert("Please fill all the required fields!");
			fill_ams = 1;
		}
		else if(ojass_phone != "" && (ojass_phone.length < 10 || ojass_phone.length > 11 || isNaN(ojass_phone) )){
			alert("Mobile No. not Correct!");
			fill_ams = 1;
		}
		else if(ojass_email.split("@").length < 2 || ojass_email.split(".").length < 2){
			alert("Email Id not Correct!");
			fill_ams = 1;
		}
		localStorage.emailOjass = ojass_email;
		localStorage.phoneOjass = ojass_phone;
		localStorage.nameOjass = ojass_name;
		localStorage.branchOjass = ojass_branch;
		localStorage.yearOjass = ojass_year;
		localStorage.collOjass = ojass_college;
		ojass_name = encodeURIComponent(ojass_name);
		ojass_email = encodeURIComponent(ojass_email);
		ojass_year = encodeURIComponent(ojass_year);
		ojass_branch = encodeURIComponent(ojass_branch);
		ojass_phone = encodeURIComponent(ojass_phone);
		ojass_college = encodeURIComponent(ojass_college);

		if(fill_ams == 0){
			$.post("http://compare.buyhatke.com/ojassReg.php", {name: ojass_name, email: ojass_email, phone: ojass_phone, branch: ojass_branch, coll: ojass_college, year: ojass_year, ext_id: localStorage.ext_id, ext_auth: localStorage.ext_auth}).success(function(resp){
				if(resp.split("~*~*").length > 1){
					var ojassID = resp.split("~*~*")[1];
					document.getElementById('regID').innerHTML =  ojassID;
					$('#ojass-details').css("display", "block");
				}
				else {
				// alert(resp);
			}
		});
		}
	});

// New code for OJASS ends here






if(localStorage.pushNotStore != "" && localStorage.pushNotStore != undefined){
	tot_not = localStorage.pushNotStore;
	tot_not = JSON.parse(tot_not);
	tot_not = tot_not.length;
}
$(".hk-opt-hdr-notif--count").html(tot_not);
var tabItems = $('.nav-tab,.tc-grp-header-btn'),
tabContentWrapper = $('.cd-tabs-content');

tabItems.on('click', function(event){
	event.preventDefault();
	sendAnalyticsData($(this).attr("data-content"));
	var selectedItem = $('.nav-tab[data-content='+$(this).attr("data-content")+"]");
	if( !selectedItem.hasClass('selected') ) {
		var selectedTab = selectedItem.data('content'),
		selectedContent = tabContentWrapper.find('div[data-content="'+selectedTab+'"]'),
		slectedContentHeight = selectedContent.innerHeight();
		tabItems.removeClass('selected');
		selectedItem.addClass('selected');
		selectedContent.addClass('selected').siblings('.cd-tab').removeClass('selected');
			//animate tabContentWrapper height when content changes
			tabContentWrapper.animate({
				'height': slectedContentHeight
			}, 200);
		}

	});
$('#email-change-id').click(function(){
		// console.log("am clicked");
		//map = new Object();

		for(j=0;j<logos.length;j++)
		{
			if(map[logos[j].position])
				continue;
			map[logos[j].position] = logos[j].image;
		}
		pageLoad(dataArray);
	});
$('#customer-details').click(function(){
		// console.log("am here");
		if(localStorage.bankBox1)
			document.getElementById('bankName').value=localStorage.bankBox1;
		if(localStorage.bankBox2)
			document.getElementById('accountNumber').value=localStorage.bankBox2;
		if(localStorage.bankBox3)
			document.getElementById('bankBranch').value=localStorage.bankBox3;
		if(localStorage.bankBox4)
			document.getElementById('ifscCode').value=localStorage.bankBox4;
		if(localStorage.phoneNo)
			document.getElementById('phoneNumber').value=localStorage.phoneNo;
		if(localStorage.emailEbay)
			document.getElementById('emailID').value=localStorage.emailEbay;
		if(localStorage.myName)
			document.getElementById('myName').value=localStorage.myName;
		
		
	});
$('#import-wishlist').click(function(){
	displaySiteList();
});
$(".update-wishlist").click(function(){
	var each_link = $(this).parent().find(".link_wish").attr("href");
	// alert(each_link);
	selectSiteWish(each_link);
});
$('.hk-opt-hdr-notif--button').click(function(){
	$('.hk-notifications').addClass('hk-opt-show');
})
$('.hk-notif-close').click(function(){
	$('.hk-notifications').removeClass('hk-opt-show');
})
checkChecks();
function DropDown(el) {
	this.dd = el;
	this.placeholder = this.dd.children('span');
	this.opts = this.dd.find('ul.dropdown > li');
	this.val = '';
	this.index = -1;
	this.initEvents();
}
DropDown.prototype = {
	initEvents : function() {
		var obj = this;

		obj.dd.on('click', function(event){
			$(this).toggleClass('active');
			return false;
		});

		obj.opts.on('click',function(){
			var opt = $(this);
			obj.val = opt.text();
			obj.index = opt.index();
			obj.placeholder.text(obj.val);
		});
	},
	getValue : function() {
		return this.val;
	},
	getIndex : function() {
		return this.index;
	}
}
var dd = new DropDown( $('#dd1') );

$('.hk-btn-link').click(function(){
	localStorage.pushNotStore = "";
	$(".hk-notif-main .hk-notifs-list").html("");
	$('.hk-btn-link').css("display", "none");
	$('.no-not-msg').css("display", "block");
});
$('.nk-filter').click(function(){
	var currFil=$(this).attr('data-notifFilter');
	$('.nk-filter').removeClass('selected')
	$(this).addClass('selected')
	if(currFil=='all'){
		$('.hk-notifs-li').removeClass('hide');

	}
	else {
		$('.hk-notifs-li').addClass('hide');
		$('.hk-notifs-li').each(function(){
			if($(this).attr('data-notifFilter')==currFil)
				$(this).removeClass('hide');
		})
	}
})
$('.hk-mod-sort--button').click(function(){
	$(this).parent().toggleClass('hk-mod-sort-asc');
	var sortby=$('#dd1 span').text();
		//var sortby=$('#dd1 span').text();
		if(sortby.trim() === "Sort By")
		{

		}
		if(sortby.trim() === "Price")
		{
			if(flagPrice)
			{
				dataArray.sort(SortByPrice);
				flagPrice=0;	
			}
			else
			{
				dataArray.sort(SortByRPrice);
				flagPrice=1;
			}
			pageLoad(dataArray);

		}
		if(sortby.trim() === "Price Drop")
		{
			if(flagPriceDrop)
			{
				dataArray.sort(SortByPriceDrop);
				flagPriceDrop=0;	
			}
			else
			{
				dataArray.sort(SortByRPriceDrop);
				flagPriceDrop=1;
			}
			pageLoad(dataArray);

		}

		if(sortby.trim() === "Store Name")
		{
			if(flagStoreName)
			{
				dataArray.sort(SortByStoreName);
				flagStoreName=0;	
			}
			else
			{
				dataArray.sort(SortByRStoreName);
				flagStoreName=1;
			}
			pageLoad(dataArray);
		}
	});

if(localStorage.pushNotStore != "" && localStorage.pushNotStore != undefined){
	$('.no-not-msg').css("display", "none");
	if($(".nk-filter.selected").attr("data-notiffilter") == "all"){
		$(".hk-notif-main .hk-notifs-list").html("");
		$('.hk-btn-link').css("display", "block");
		pushData = localStorage.pushNotStore;
		pushData1 = JSON.parse(pushData);
		var totalShown = 0;
		for(var i=pushData1.length-1;i>=0;i--){
			totalShown++;
			var image = pushData1[i].image;
			var title = pushData1[i].title;
			var detail = pushData1[i].detail;
			var link = pushData1[i].URL;
			var id = pushData1[i].notfID;
			var type = pushData1[i].type;
			if(type == 1){
				var data_not = "price-drops";
				var alt = "Price Drop";
			}
			else if(type == 0){
				var data_not = "offers";
				var alt = "Offers";
			}
			if(title!=undefined && totalShown <= 5){
			$(".hk-notif-main .hk-notifs-list").append('<li data-item="'+id+'" class="hk-notifs-li cd-fade-in" data-notiffilter="'+data_not+'"><a href="'+link+'" target="_blank" class="hk-notifs-li-link clearfix"><div class="hk-notif-icon"><div class="hk-notif-icon-wrap"><img src="'+image+'" alt="'+alt+'" class="hk-notif-icon--img hk-opt-icons"></div></div><div class="hk-notif-txt"><b>'+title+'</b><br>'+detail+'</div></a><button  class="hk-notif-delete hk-opt-btn">×</button></li>');
			}
		}
	}
	else if($(".nk-filter.selected").attr("data-notiffilter") == "offers"){
		$(".hk-notif-main .hk-notifs-list").html("");
		$('.hk-btn-link').css("display", "block");
		pushData = localStorage.pushNotStore;
		pushData1 = JSON.parse(pushData);
		for(var i=pushData1.length-1;i>=0;i--){
			var image = pushData1[i].image;
			var title = pushData1[i].title;
			var detail = pushData1[i].detail;
			var link = pushData1[i].URL;
			var id = pushData1[i].notfID;
			var type = pushData1[i].type;
			if(type == 0){
				var data_not = "offers";
				var alt = "Offers";
				$(".hk-notif-main .hk-notifs-list").append('<li data-item="'+id+'" class="hk-notifs-li cd-fade-in" data-notiffilter="'+data_not+'"><a href="'+link+'" target="_blank" class="hk-notifs-li-link clearfix"><div class="hk-notif-icon"><div class="hk-notif-icon-wrap"><img src="'+image+'" alt="'+alt+'" class="hk-notif-icon--img hk-opt-icons"></div></div><div class="hk-notif-txt"><b>'+title+'</b><br>'+detail+'</div></a><button  class="hk-notif-delete hk-opt-btn">×</button></li>');
			}

		}
	}
	else if($(".nk-filter.selected").attr("data-notiffilter") == "price-drops"){
		$(".hk-notif-main .hk-notifs-list").html("");
		$('.hk-btn-link').css("display", "block");
		pushData = localStorage.pushNotStore;
		pushData1 = JSON.parse(pushData);
		for(var i=pushData1.length-1;i>=0;i--){
			var image = pushData1[i].image;
			var title = pushData1[i].title;
			var detail = pushData1[i].detail;
			var link = pushData1[i].URL;
			var id = pushData1[i].notfID;
			var type = pushData1[i].type;
			if(type == 1){
				var data_not = "price-drops";
				var alt = "Price Drop";
				$(".hk-notif-main .hk-notifs-list").append('<li data-item="'+id+'" class="hk-notifs-li cd-fade-in" data-notiffilter="'+data_not+'"><a href="'+link+'" target="_blank" class="hk-notifs-li-link clearfix"><div class="hk-notif-icon"><div class="hk-notif-icon-wrap"><img src="'+image+'" alt="'+alt+'" class="hk-notif-icon--img hk-opt-icons"></div></div><div class="hk-notif-txt"><b>'+title+'</b><br>'+detail+'</div></a><button  class="hk-notif-delete hk-opt-btn">×</button></li>');
			}
		}
	}
}
else{
	$('.no-not-msg').css("display", "block");
}
$('.hk-notif-delete').click(function(){
	var id = $(this).parent().attr("data-item");
	$(this).parent().addClass('hideRight').slideUp(500, function(){
		$(this).remove();
		newPushArr = [];
		newPushData = localStorage.pushNotStore;
		newPushData = JSON.parse(newPushData);
		for(var j=0;j<newPushData.length;j++){
			if(newPushData[j].notfID == id && id != ""){

			}
			else if(id != ""){
				newPushArr.push({notfID : newPushData[j].notfID, URL : newPushData[j].notfID, image: newPushData[j].image, title: newPushData[j].title, detail: newPushData[j].detail, type: newPushData[j].type});
			}
		}
		localStorage.pushNotStore = JSON.stringify(newPushArr);
	});
});
$(document).click(function () {
	$('.wrapper-dropdown-5').removeClass('active');
})

$("#wishlist-submit").click(function(){
	$(".alert-new-count").text("");
	wish_url_gb = $("#wishListURL").val().trim();
	selectSiteWish(wish_url_gb);

});



});
function selectSiteWish(user_url){
	if(user_url != "" && user_url.split("flipkart.com/wishlist").length > 1){
		flipWishListURL(user_url);
	}
	else if(user_url != "" && user_url.split("snapdeal.com/mywishlist").length > 1 || user_url != "" && user_url.split("snapdeal.com/wishlist").length > 1){
		snapWishList(user_url);
	}
	else if(user_url != "" && user_url.split("amazon.in").length > 1 && user_url.split("wishlist/").length > 1){
		amazWishList(user_url);
	}
}
function settingsButton(){
	$('.hk-alrt-mod-btn').click(function(){
				//console.log("func called for button");
				//$( 'button[ data-modOpt=' + $(this).attr('data-modOpt') + ']' ).addClass('hk-mod-li-show');
				$('#'+$(this).attr('data-modOpt')).addClass('hk-mod-li-show');
				return false;
			});
	$('.hk-alrt-li-opt-close').click(function(){
		$('#'+$(this).attr('data-modOptX')).removeClass('hk-mod-li-show');
	});
	$('.hk-alrt-li-opt-mod--btn').click(function(){

		var price_not=$('#minDrop'+$(this).attr('data-link-id')).val();
		var link_id=$(this).attr('data-link-id');
		var platform=$(this).attr('data-platform');
		var extId=localStorage.ext_id;
		var extAuth=localStorage.ext_auth;
		$.ajax({url: "http://pa.buyhatke.com/alertAPIs/changeCurStatus.php?ext_id="+extId+"&auth_val="+extAuth+"&link_id="+link_id+"&platform="+platform+"&price_not="+price_not+"",
			success: function(result)
			{
	 	//console.log("http://pa.buyhatke.com/alertAPIs/changeCurStatus.php?ext_id="+extId+"&auth_val="+extAuth+"&link_id="+link_id+"&platform="+platform+"&price_not="+price_not+"");
	 	alert(result);
	 }
	});

	});
	$('.hk-alrt-li-opt-mod--delete-btn').click(function(){
		// console.log('am here in remove alert');
		sendAnalyticsData("alert-removed");
		var link_id=$(this).attr('data-link-id');
		var extId=localStorage.ext_id;
		var extAuth=localStorage.ext_auth;
		var prod_name=$(this).attr('data-prod-name');
		$.ajax({url: "http://compare.buyhatke.com/extension/removeFromWatchList.php?ext_id="+extId+"&auth_val="+extAuth+"&link_id="+link_id+"",
			success: function(result1)
			{
				// console.log('hello');
				dataArray = jQuery.parseJSON(result1);
	 	//pageLoad(dataArray);	
	 	//alert(prod_name+" has been removed");
	 	// console.log("http://compare.buyhatke.com/extension/removeFromWatchList.php?ext_id="+extId+"&auth_val="+extAuth+"&link_id="+link_id+"");
	 	//alert(result1);
	 	
	 	var sortby=$('#dd1 span').text();
	 	if(sortby.trim() === "Sort By")
	 	{
	 		pageLoad(dataArray);
	 	}
	 	if(sortby.trim() === "Price")
	 	{
	 		// console.log(sortby);
	 		dataArray.sort(SortByPrice);
	 		pageLoad(dataArray);

	 	}
	 	if(sortby.trim() === "Price Drop")
	 	{
	 		dataArray.sort(SortByPriceDrop);
	 		pageLoad(dataArray);
	 	}
	 	if(sortby.trim() === "Recently Added")
	 	{
	 		dataArray.sort(SortByRecentAdded);
	 		pageLoad(dataArray);

	 	}
	 	if(sortby.trim() === "Store Name")
	 	{
	 		// console.log("store name called");
	 		dataArray.sort(SortByStoreName);
	 		pageLoad(dataArray);

	 	}







	 }
	});

});
}

// $('input[type="checkbox"]').change(function()
// {
// 	featuresModify();
// });


function checkChecks(){
	$('.cmn-toggle').each(function(){
		if($(this).prop('checked')){
			$(this).parent().parent().removeClass('i-inactive').addClass('i-activated')
			$("."+$(this).attr("data-toggler")).not(this).attr("checked","checked").parent().parent().removeClass('i-inactive').addClass('i-activated');

		}
		else{
			$(this).parent().parent().removeClass('i-activated').addClass('i-inactive')
			$("."+$(this).attr("data-toggler")).not(this).removeAttr("checked").parent().parent().removeClass('i-activated').addClass('i-inactive');
		}
	});
}

$('.cmn-toggle').click(function(){
	$(this).parent().parent().toggleClass('i-inactive').toggleClass('i-activated');
	if(	$("."+$(this).attr("data-toggler")).not(this).attr("checked"))
		$("."+$(this).attr("data-toggler")).not(this).removeAttr("checked").parent().parent().removeClass('i-activated').addClass('i-inactive');
	else
		$("."+$(this).attr("data-toggler")).not(this).attr("checked","checked").parent().parent().removeClass('i-inactive').addClass('i-activated');
})

$("#mainFeatures-page-id").click(function(){
	
	featurePageDisplay();	
	// console.log("I m modify on yay!");
	//$('li#features-page-id').html();
	//featuresModifyFP();
});

$("#overview").click(function(){
	
	displayFeatures();	
	//$('li#features-page-id').html();
	//featuresModifyFP();
});

function showAlertsNew(){
	if(dataAvail==1){
		for(j=0;j<logos.length;j++)
		{
			if(map[logos[j].position])
				continue;
			map[logos[j].position] = logos[j].image;
		}
		pageLoad(dataArray);

	}
	else {
		setTimeout(function(){showAlertsNew();},500);
	}
}

$("#price-alert-id").click(function(){
	
       // map = new Object();

       showAlertsNew();

   });

		//sortinggg

		$("#dd1").click(function(){

			var sortby=$('#dd1 span').text();
			if(sortby.trim() === "Sort By")
			{

			}
			if(sortby.trim() === "Price")
			{
				// console.log(sortby);
				dataArray.sort(SortByPrice);
				pageLoad(dataArray);

			}
			if(sortby.trim() === "Price Drop")
			{
				dataArray.sort(SortByPriceDrop);
				pageLoad(dataArray);
			}
			if(sortby.trim() === "Recently Added")
			{
				dataArray.sort(SortByRecentAdded);
				pageLoad(dataArray);

			}
			if(sortby.trim() === "Store Name")
			{
				// console.log("store name called");
				dataArray.sort(SortByStoreName);
				pageLoad(dataArray);

			}
		});


//searching a product

$('[attr~=search-product]').keypress(function(e){

	if(e.which == 13)
	{
		var str="";
		var searchProduct=$('[attr~=search-product]').val();
			//alert(searchProduct+" "+dataArray.length);
			for(var i=0;i<dataArray.length;i++)
			{
				var dataArray_pos = dataArray[i].position;
				var old_link = dataArray[i].link;
				var dataArray_link = "http://pa.buyhatke.com/Navigation/?pos="+dataArray_pos+"&source=ext_alert_view&link="+encodeURIComponent(old_link);

				var indval=dataArray[i].prod.toLowerCase().indexOf(searchProduct.toLowerCase());
				// console.log(indval);
				if(indval>=0)
				{
					var logoimg=map[dataArray[i].position];
					var price_drop=dataArray[i].price_added-dataArray[i].cur_price;
					if(price_drop>=0)
					{
						str+='<li class="hk-alerts-li hk-alerts-li--dropped hk-new-alert" id='+dataArray[i].link_id+' data-alrt="hk-alrt1"> <div class="hk-tooltip clearfix"> <div class="hk-tooltip-content"> Latest Alert Value = <span class="hk-ls-val">₹'+dataArray[i].price_notify+'</span> </div> </div> <div class="hk-alrt-wrap"> <a href='+dataArray_link+' target="_blank" class="hk-alrt-li-link"> <div class="hk-alrt-new"></div> <div class="hk-alrt-li-img-wrap"> <img src='+dataArray[i].image+' alt="'+dataArray[i].prod+'r" class="hk-alert-li-img"> </div> <div class="hk-alrt-li-details"> <h4 class="hk-alrt-li-name">'+dataArray[i].prod+'</h4> <div class="hk-alrt-li-price"> <div class="alrt-price"> <div class="hk-alrt-li-price--label"> Current<br>Price: </div> <div class="hk-alrt-li-price--curr hk-alrt-li-price--price">' +dataArray[i].cur_price+ '</div> </div> <div class="alrt-price"> <div class="hk-alrt-li-price--label"> Price<br>Change: </div> <div class="hk-alrt-li-price--drop hk-alrt-li-price--price"> ₹'+price_drop+' </div> </div> </div> </div> <div class="hk-alrt-li-site"> <img src='+logoimg+ ' alt="flipkart" class="hk-alrt-li-site--img"> </div> <button class="hk-alrt-mod-btn hk-opt-btn" data-platform='+dataArray[i].platform+' data-modopt='+dataArray[i].link_id+'> <img src="img/icon--settings.svg" alt="Modify Alert" class="hk-alrt-mod--img hk-opt-icons"> </button> </a> <div class="hk-alrt-li-opt"> <div class="hk-alrt-li-opt-bg"></div> <div class="hk-alrt-li-opt-wrapper"> <div class="hk-alerts-ctnr"> <header class="hk-alrt-li-opt-hdr"> <div class="hk-opt-headings">MODIFY</div> <button class="hk-alrt-li-opt-close hk-opt-btn" data-modoptx='+dataArray[i].link_id+'>×</button> </header> <div class="hk-alrt-li-opt-main"> <p> Minimum Drop Alert Value: </p> <div class="hk-alrt-li-opt-mod  rupee-field"> <input type="number" class="input-field hk-opt-input hk-alrt-li-opt-mod--input" id="minDrop'+dataArray[i].link_id+'" placeholder="SET MINIMUM VALUE"> <label for="minDrop1" class="input-label">Set Minimum Value</label> <button class="input-button hk-alrt-li-opt-mod--btn hk-alrt-mod-btn" data-link-id='+dataArray[i].link_id+' data-platform='+dataArray[i].platform+'>SET</button></div><button class="input-button hk-alrt-li-opt-mod--delete-btn" data-link-id='+dataArray[i].link_id+' data-prod-name='+dataArray[i].prod+' >REMOVE ALERT</button> </div> </div> </div> </div> </div> </li>';
					}
					else
					{
						price_drop=-price_drop;
						str+='<li class="hk-alerts-li" id='+dataArray[i].link_id+' data-alrt="hk-alrt6"> <div class="hk-alrt-wrap"><a href='+dataArray_link+' target="_blank" class="hk-alrt-li-link"><div class="hk-alrt-new"></div><div class="hk-alrt-li-img-wrap"><img src='+dataArray[i].image+' alt="'+dataArray[i].prod+'" class="hk-alert-li-img"></div><div class="hk-alrt-li-details"><h4 class="hk-alrt-li-name">'+dataArray[i].prod+'</h4><div class="hk-alrt-li-price"><div class="alrt-price"><div class="hk-alrt-li-price--label">Current<br>Price:</div><div class="hk-alrt-li-price--curr hk-alrt-li-price--price">&#8377;'+dataArray[i].cur_price+'</div></div><div class="alrt-price"><div class="hk-alrt-li-price--label">Price<br>Change:</div><div class="hk-alrt-li-price--drop hk-alrt-li-price--price">&#8377;'+price_drop+'</div></div></div></div><div class="hk-alrt-li-site"><img src='+logoimg +' alt="flipkart" class="hk-alrt-li-site--img"></div><button class="hk-alrt-mod-btn hk-opt-btn" data-platform='+dataArray[i].platform+' data-modOpt='+dataArray[i].link_id+'><img src="img/icon--settings.svg" alt="Modify Alert" class="hk-alrt-mod--img hk-opt-icons"></button></a><div class="hk-alrt-li-opt"><div class="hk-alrt-li-opt-bg"></div><div class="hk-alrt-li-opt-wrapper"><div class="hk-alerts-ctnr"><header class="hk-alrt-li-opt-hdr"><div class="hk-opt-headings">MODIFY</div><button class="hk-alrt-li-opt-close hk-opt-btn" data-modOptX='+dataArray[i].link_id+'>&times;</button></header><div class="hk-alrt-li-opt-main"><p>Minimum Drop Alert Value:</p><div class="hk-alrt-li-opt-mod  rupee-field"><input type="number" class="input-field hk-opt-input hk-alrt-li-opt-mod--input" id="minDrop'+dataArray[i].link_id+'" placeholder="SET MINIMUM VALUE"><label for="minDrop1" class="input-label">Set Minimum Value</label><button class="input-button hk-alrt-li-opt-mod--btn" data-link-id='+dataArray[i].link_id+' data-platform='+dataArray[i].platform+'>SET</button></div><button class="input-button hk-alrt-li-opt-mod--delete-btn" data-link-id='+dataArray[i].link_id+' data-prod-name='+dataArray[i].prod+' >REMOVE ALERT</button></div></div></div></div></div></li>';

					}
				}
			}
			$(".hk-alerts-list").html(str);
			settingsButton();
			// setButton();

		}

	});
$("#email-submit").click(function()
{
	change_email();
	sendAnalyticsData("email-changed");
});

$("#submit-bank-details").click(function(){
	save_Bank();
});
$("#submit-general-details").click(function(){
	save_Gen();
});
$("#submit-paisapay-details").click(function(){
	save_PAISAPAY();
});

$("#submit-address").click(function(){
save_ADDRESS();
});

$("#change").click(function(){

add_ADDRESS();
});

function getXMLHTTPRequest() {

	req = new XMLHttpRequest();
	return req;

}

function sendAnalyticsData(parametersRec){
  if(parametersRec.split("[object").length >1){
  	 return;
  }
  if(parametersRec.length > 1000){
     return;
  }
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://tracking.buyhatke.com/analytics/?cid=" + localStorage.ext_id + "&uid=" + localStorage.ext_id + "&cs=" + localStorage.ext_id + "&tid=UA-21447924-6" + "&dp=" + parametersRec + "&cm=apnese";
  if(myurl.length > 4000){
  	return ;
  }
  var parameters = "";
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
       console.log("Tracked " + parameters);
     }
   }
 };
 httpq4.send(parameters);
}

sendAnalyticsData("options-page");

function SortByPrice(a, b){
	var aPrice = parseFloat(a.cur_price);
	var bPrice = parseFloat(b.cur_price);
	return (aPrice-bPrice);
}
function SortByPriceDrop(a, b){
	var aPriceDrop = parseFloat(a.price_added-a.cur_price);
	var bPriceDrop = parseFloat(b.price_added-b.cur_price);
	return (bPriceDrop-aPriceDrop);
}
function SortByRecentAdded(a, b){
	var aLink = parseFloat(a.link_id);
	var bLink = parseFloat(b.link_id);
	return (bLink-aLink);
}
function SortByStoreName(a,b){
	var aStore=a.link.split(".")[1];
	var bStore=b.link.split(".")[1];
	//console.log(aStore+" "+bStore);
	if(aStore<bStore) 
		return -1;
	else if(aStore>bStore) 
		return 1;
	else 
		return 0;

}
function SortByRStoreName(a,b){
	var aStore=a.link.split(".")[1];
	var bStore=b.link.split(".")[1];
	//console.log(aStore+" "+bStore);
	if(aStore<bStore) 
		return 1;
	else if(aStore>bStore) 
		return -1;
	else 
		return 0;

}
function SortByRPrice(a, b){
	var aPrice = parseFloat(a.cur_price);
	var bPrice = parseFloat(b.cur_price);
	return (bPrice-aPrice);
}
function SortByRPriceDrop(a, b){
	var aPriceDrop = parseFloat(a.price_added-a.cur_price);
	var bPriceDrop = parseFloat(b.price_added-b.cur_price);
	return (aPriceDrop-bPriceDrop);
}
function pageLoad(dataArray)
{

	var len=dataArray.length;
	var str="";
		/*for(var i=0;i<len;i++)
		{
			console.log(dataArray[i].link);
		}*/
		for(var i=0;i<len;i++)
		{
			var logoimg=map[dataArray[i].position];
			var dataArray_pos = dataArray[i].position;
			var old_link = dataArray[i].link;
			var dataArray_link = "http://pa.buyhatke.com/Navigation/?pos="+dataArray_pos+"&source=ext_alert_view&link="+encodeURIComponent(old_link);
			var price_drop=dataArray[i].price_added-dataArray[i].cur_price;
			if(price_drop>=0)
			{
				str+='<li class="hk-alerts-li hk-alerts-li--dropped hk-new-alert" id='+dataArray[i].link_id+' data-alrt="hk-alrt1"> <div class="hk-tooltip clearfix"> <div class="hk-tooltip-content"> Latest Alert Value = <span class="hk-ls-val">₹'+dataArray[i].price_notify+'</span> </div> </div> <div class="hk-alrt-wrap"> <a href='+dataArray_link+' target="_blank" class="hk-alrt-li-link"> <div class="hk-alrt-new"></div> <div class="hk-alrt-li-img-wrap"> <img src='+dataArray[i].image+' alt="'+dataArray[i].prod+'" class="hk-alert-li-img"> </div> <div class="hk-alrt-li-details"> <h4 class="hk-alrt-li-name">'+dataArray[i].prod+'</h4> <div class="hk-alrt-li-price"> <div class="alrt-price"> <div class="hk-alrt-li-price--label"> Current<br>Price: </div> <div class="hk-alrt-li-price--curr hk-alrt-li-price--price">' +dataArray[i].cur_price+ '</div> </div> <div class="alrt-price"> <div class="hk-alrt-li-price--label"> Price<br>Change: </div> <div class="hk-alrt-li-price--drop hk-alrt-li-price--price"> ₹'+price_drop+' </div> </div> </div> </div> <div class="hk-alrt-li-site"> <img src='+logoimg+ ' alt="flipkart" class="hk-alrt-li-site--img"> </div> <button class="hk-alrt-mod-btn hk-opt-btn" data-platform='+dataArray[i].platform+' data-modopt='+dataArray[i].link_id+'> <img src="img/icon--settings.svg" alt="Modify Alert" class="hk-alrt-mod--img hk-opt-icons"> </button> </a> <div class="hk-alrt-li-opt"> <div class="hk-alrt-li-opt-bg"></div> <div class="hk-alrt-li-opt-wrapper"> <div class="hk-alerts-ctnr"> <header class="hk-alrt-li-opt-hdr"> <div class="hk-opt-headings">MODIFY</div> <button class="hk-alrt-li-opt-close hk-opt-btn" data-modoptx='+dataArray[i].link_id+'>×</button> </header> <div class="hk-alrt-li-opt-main"> <p> Minimum Drop Alert Value: </p> <div class="hk-alrt-li-opt-mod  rupee-field"> <input type="number" class="input-field hk-opt-input hk-alrt-li-opt-mod--input" id="minDrop'+dataArray[i].link_id+'" placeholder="SET MINIMUM VALUE"> <label for="minDrop1" class="input-label">Set Minimum Value</label> <button class="input-button hk-alrt-li-opt-mod--btn" data-link-id='+dataArray[i].link_id+' data-platform='+dataArray[i].platform+'>SET</button></div><button class="input-button hk-alrt-li-opt-mod--delete-btn" data-link-id='+dataArray[i].link_id+' data-prod-name='+dataArray[i].prod+' >REMOVE ALERT</button> </div> </div> </div> </div> </div> </li>';
			}
			else
			{
				price_drop=-price_drop;
				str+='<li class="hk-alerts-li" id='+dataArray[i].link_id+' data-alrt="hk-alrt6"> <div class="hk-tooltip clearfix"><div class="hk-tooltip-content">Latest Alert Value = <span class="hk-ls-val">₹'+dataArray[i].price_notify+'</span></div></div><div class="hk-alrt-wrap"><a href='+dataArray_link+' target="_blank" class="hk-alrt-li-link"><div class="hk-alrt-new"></div><div class="hk-alrt-li-img-wrap"><img src='+dataArray[i].image+' alt="'+dataArray[i].prod+'" class="hk-alert-li-img"></div><div class="hk-alrt-li-details"><h4 class="hk-alrt-li-name">'+dataArray[i].prod+'</h4><div class="hk-alrt-li-price"><div class="alrt-price"><div class="hk-alrt-li-price--label">Current<br>Price:</div><div class="hk-alrt-li-price--curr hk-alrt-li-price--price">&#8377;'+dataArray[i].cur_price+'</div></div><div class="alrt-price"><div class="hk-alrt-li-price--label">Price<br>Change:</div><div class="hk-alrt-li-price--drop hk-alrt-li-price--price">&#8377;'+price_drop+'</div></div></div></div><div class="hk-alrt-li-site"><img src='+logoimg +' alt="flipkart" class="hk-alrt-li-site--img"></div><button class="hk-alrt-mod-btn hk-opt-btn" data-platform='+dataArray[i].platform+' data-modOpt='+dataArray[i].link_id+'><img src="img/icon--settings.svg" alt="Modify Alert" class="hk-alrt-mod--img hk-opt-icons"></button></a><div class="hk-alrt-li-opt"><div class="hk-alrt-li-opt-bg"></div><div class="hk-alrt-li-opt-wrapper"><div class="hk-alerts-ctnr"><header class="hk-alrt-li-opt-hdr"><div class="hk-opt-headings">MODIFY</div><button class="hk-alrt-li-opt-close hk-opt-btn" data-modOptX='+dataArray[i].link_id+'>&times;</button></header><div class="hk-alrt-li-opt-main"><p>Minimum Drop Alert Value:</p><div class="hk-alrt-li-opt-mod  rupee-field"><input type="number" class="input-field hk-opt-input hk-alrt-li-opt-mod--input" id="minDrop'+dataArray[i].link_id+'" placeholder="SET MINIMUM VALUE"><label for="minDrop1" class="input-label">Set Minimum Value</label><button class="input-button hk-alrt-li-opt-mod--btn" data-link-id='+dataArray[i].link_id+' data-platform='+dataArray[i].platform+'>SET</button></div><button class="input-button hk-alrt-li-opt-mod--delete-btn" data-link-id='+dataArray[i].link_id+' data-prod-name='+dataArray[i].prod+' >REMOVE ALERT</button></div></div></div></div></div></li>';

			}
		}

		$(".hk-alerts-list").html(str);
		settingsButton();
        //setButton();

    }

    function init()
    {

    	var extId=localStorage.ext_id;
    	var extAuth=localStorage.ext_auth;
    	var x = Math.floor((Math.random() * 10000000) + 1);
    	$.ajax({url: "http://compare.buyhatke.com/extension/checkStatus.php?ext_id="+extId+"&auth_val="+extAuth+"&rand="+x,dataType: "text",
    		success: function(result)
    		{
    			dataArray = jQuery.parseJSON(result);
    			dataAvail = 1;
	 	// console.log(dataArray.length);
	 }
	});

    }

    function displayFeatures(){
    	// console.log("displayFeatures was called");
    	var data = localStorage.featuresArray;
    	data = JSON.parse(data);

    	var dataSale = localStorage.flashSale;
    	dataSale = JSON.parse(dataSale);

    	var data2 = localStorage.salesArray;
    	data2 = JSON.parse(data2);
    	var string = "";

    	for(var k=0;k<data.length;k++){
    		if(data[k].value==1){

    			string = string +'<li class="tc-grp-li i-activated"><span class="tc-li-title">'+data[k].key+'</span><div class="tc-li-toggle dib va-m"><input id="ft-'+(k+1)+'" data-toggler="ft-'+(k+1)+'" class="ft-'+(k+1)+' cmn-toggle cmn-toggle-round" checked="checked" type="checkbox"><label for="ft-'+(k+1)+'"></label></div></li>';


    		}
    		else {
    			string = string +'<li class="tc-grp-li i-inactive"><span class="tc-li-title">'+data[k].key+'</span><div class="tc-li-toggle dib va-m"><input id="ft-'+(k+1)+'" data-toggler="ft-'+(k+1)+'" class="ft-'+(k+1)+' cmn-toggle cmn-toggle-round" type="checkbox"><label for="ft-'+(k+1)+'"></label></div></li>';
    		}
    	}
    	$('section#features-id').css({'list-style-type':"none"});
    	document.getElementById('features-id').innerHTML = string;


    	var string = "";

    	for(var k=0;k<dataSale.length;k++){
    		if(dataSale[k].value==1){

    			string = string +'<li class="tc-grp-li i-activated"><span class="tc-li-title">'+dataSale[k].key+'</span><div class="tc-li-toggle dib va-m"><input id="ft-'+(k+14)+'" data-toggler="ft-'+(k+14)+'" class="ft-'+(k+14)+' cmn-toggle cmn-toggle-round" checked="checked" type="checkbox"><label for="ft-'+(k+14)+'"></label></div></li>';


    		}
    		else {
    			string = string +'<li class="tc-grp-li i-inactive"><span class="tc-li-title">'+dataSale[k].key+'</span><div class="tc-li-toggle dib va-m"><input id="ft-'+(k+14)+'" data-toggler="ft-'+(k+14)+'" class="ft-'+(k+14)+' cmn-toggle cmn-toggle-round" type="checkbox"><label for="ft-'+(k+14)+'"></label></div></li>';
    		}
    	}
    	$('section#flashSale-id').css({'list-style-type':"none"});
    	document.getElementById('flashSale-id').innerHTML = string;

    	string = "";
    	for(var k=0;k<data2.length;k++){
    		if(data2[k].value==1){

    			string = string +'<li class="tc-grp-li i-activated"><span class="tc-li-title">'+data2[k].key+'</span><div class="tc-li-toggle dib va-m"><input id="ft-'+(data.length + k+1)+'" data-toggler="ft-'+(data.length + k+1)+'" class="ft-'+(data.length + k+1)+' cmn-toggle cmn-toggle-round" checked="checked" type="checkbox"><label for="ft-'+(data.length + k+1)+'"></label></div></li>';


    		}
    		else {
    			string = string +'<li class="tc-grp-li i-inactive"><span class="tc-li-title">'+data2[k].key+'</span><div class="tc-li-toggle dib va-m"><input id="ft-'+(data.length + k+1)+'" data-toggler="ft-'+(data.length + k+1)+'" class="ft-'+(data.length + k+1)+' cmn-toggle cmn-toggle-round" type="checkbox"><label for="ft-'+(data.length + k+1)+'"></label></div></li>';
    		}
    	}
    	$('section#sales-id').css({'list-style-type':"none"});
    	document.getElementById('sales-id').innerHTML = string;
    	// onChangeCheckbox();

    	var data3 = localStorage.promoPushArray;
    	data3 = JSON.parse(data3);
    	string = "";

    	// console.log("key1: "+data3[0].value);
    	// console.log("key2: "+data3[1].value);
    	// console.log("key3: "+data3[2].value);
    	var addingCheck = "checked";
    	if(data3[1].value == 0){
    		addingCheck = "";
    	}
    	else if(data3[1].value == 1){
    		addingCheck = "checked";
    	}

    	var addingCheck1 = "checked";
    	if(data3[2].value == 0){
    		addingCheck1 = "";
    	}
    	else if(data3[2].value == 1){
    		addingCheck1 = "checked";
    	}

    	var addingCheck2 = 'i-activated';
    	var addingCheck3 = 'checked="checked"';
    	if(data3[0].value == 0 || data3[0].value == '0'){
    		addingCheck2 = 'i-inactive';
    		addingCheck3 = '';
    	}
    	else{
    		addingCheck2 = 'i-activated';
    		addingCheck3 = 'checked="checked"';
    	}
    	string = string +'<header class="tc-grp-header clearfix ' + addingCheck2 + '"><h2 class="tc-grp-heading"><b>Subscribe to Promotional Push Messages:</b></h2><div class="tc-li-toggle dib va-m"><input id="ft-10" data-toggler="ft-10" class="ft-10 cmn-toggle cmn-toggle-round" '+ addingCheck3 +' type="checkbox"><label for="ft-10"></label></div></header><div id="promo-time-id" style="margin-top:20px;margin-bottom:20px;" class="tab-content-main"><table class="promo-time-tab"><tbody><tr><th class="timing-head">Time Slots</th></tr><tr><th>10:00 AM - 09:00 PM</th><th>09:00 PM - 10:00 AM</th></tr><tr><td><input type="checkbox" name="morning" value="morning" id="ft-11" '+addingCheck+'></td><td><input type="checkbox" name="evening" value="evening" id="ft-12" '+addingCheck1+'></td></tr></tbody></table></div>';
    	$('section#promo-allow-id').css({'list-style-type':"none"});
    	document.getElementById('promo-allow-id').innerHTML = string;
    	onChangeCheckbox();
    }

//document.getElementById('getBank').addEventListener('click', save_Bank);
//document.getElementById('getGen').addEventListener('click', save_Gen);
//document.getElementById('getPP').addEventListener('click', save_PAISAPAY);

function save_Bank(){
	var dataToSend = [{Bank : document.getElementById('bankName').value}, {Acc : document.getElementById('accountNumber').value}, {IFSC : document.getElementById('ifscCode').value}, {Branch : document.getElementById('bankBranch').value}];
	var fileToSend = "submitData.php";
	localStorage.bankBox4 = document.getElementById('ifscCode').value;
	localStorage.bankBox3 = document.getElementById('bankBranch').value;
	localStorage.bankBox2 = document.getElementById('accountNumber').value;
	localStorage.bankBox1 = document.getElementById('bankName').value;
	dataToSend = JSON.stringify(dataToSend);
	if(!localStorage.bankBox1 || !localStorage.bankBox2 || !localStorage.bankBox3 || !localStorage.bankBox4)
	{
		alert("Please fill your bank details before Submitting");
	}
	else
	{
		submitDataEBAY(dataToSend, fileToSend);
	}

}

function save_Gen(){
	 	//console.log("am here in general fun");
	 	var dataToSend = [{Name : document.getElementById('myName').value}, {Phone : document.getElementById('phoneNumber').value}, {email : document.getElementById('emailID').value}];
	 	var fileToSend = "submitData.php";
	 	localStorage.phoneNo = document.getElementById('phoneNumber').value;
	 	localStorage.emailEbay = document.getElementById('emailID').value;
	 	localStorage.myName = document.getElementById('myName').value;
	 	dataToSend = JSON.stringify(dataToSend);
	 	if(!localStorage.phoneNo || !localStorage.emailEbay || !localStorage.myName)
	 	{
	 		alert("Please fill the general details before Submitting");	
	 	}
	 	else
	 	{
	 		submitDataEBAY(dataToSend, fileToSend);
	 	}
	 }

	 function save_PAISAPAY(){
	 	var dataToSend = [{PP : document.getElementById('ppid').value}];
	 	var fileToSend = "submitPP.php";
	 	dataToSend = JSON.stringify(dataToSend);
	 	var ppayid=document.getElementById('ppid').value;
	 	if(!ppayid)
	 	{
	 		alert("Please fill PAISAPAY ID before Submitting");	
	 	}
	 	else
	 	{
	 		submitDataEBAY(dataToSend, fileToSend);
	 	}
	 }


	 function submitDataEBAY(jsonData, fileToSend){
	 	var httpq4 = new getXMLHTTPRequest();
	 	var myurl = "http://buyhatke.com/ebYOf/" + fileToSend;
	 	var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
	 	jsonParData = JSON.parse(jsonData);
	 	var L = jsonParData.length;
	 	for (var i = 0; i < L; i++) {
	 		var obj = jsonParData[i];
	 		for (var j in obj) {
	 			var paramKey = (j);
	 			var paramVal = (jsonParData[i][j]);
	 			parameters += "&" + paramKey + "=" + paramVal;
	 		}
	 	}
	 	httpq4.open("POST", myurl, true);
	 	httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	 	httpq4.onreadystatechange = function(){
	 		if (httpq4.readyState == 4) {
	 			if(httpq4.status == 200) {
	 				var mytext = httpq4.responseText;
	 				mytext = mytext.split("~~~");
	 				alert(mytext[0]);
	 				localStorage.submittedPaisa = mytext[1];
	 				var tempPaisa = JSON.parse(localStorage.submittedPaisa);
	 				if(tempPaisa.length>0){
	 					var start = '<tr class="et-tr et-tr-heading"><th class="et-th et-cell">Paisa Pay Id</th><th class="et-th et-cell">Time of Submission</th><th class="et-th et-cell">Status</th></tr>';
	 					for(k=0;k<tempPaisa.length;k++){
	 						if(tempPaisa[k][1]==0){
	 							tempPaisa[k][1] = "<div style='color:orange;'>Pending</div>";
	 						}
	 						else if(tempPaisa[k][1]==1){
	 							tempPaisa[k][1] = "<div style='color:green;'>Approved</div>";
	 						}
	 						start = start + '<tr class="et-tr"><td class="et-cell">' + tempPaisa[k][0] + '</td><td class="et-cell">' + tempPaisa[k][2] + '</td><td class="et-cell">' + tempPaisa[k][1] + '</td></tr>';
	 					}
	 					document.getElementById('curPaisaStatus').innerHTML = start;
	 				}
//console.log(mytext);
}
}
};
httpq4.send(parameters);
}




function featurePageDisplay()
{   
	// console.log("Me called");
	var data = localStorage.featuresArray;
	data = JSON.parse(data);
	var string = "";var src="";
	for(var k=0;k<data.length;k++){

		switch(k+1)
		{
			case 1:src="img/pc-bar.png";
			break;
			case 2:src="img/graph.png";
			break;
			case 3: src="img/alrt-btn.png";
			break;
			case 4:src="img/pc-btn.png";
			break;
			case 5:src="img/coup-side.png";
			break;
			case 6:src="img/coup-auto.png";
			break;
			case 7:src="img/deals.png";
			break;
			default:

		}
		// console.log(data[k].value + " " + data[k].key);
		if(data[k].value==1){
			string+='<li class="tc-ft-li i-activated"><img class="li-ft-img" src='+src+' alt='+data[k].key+'><span class="tc-li-title">'+data[k].key+'</span><div class="tc-li-toggle dib va-m"><input id="ft2-'+(k+1)+'" data-toggler="ft-'+(k+1)+'" class="ft-'+(k+1)+' cmn-toggle cmn-toggle-round" type="checkbox" checked="checked"><label for="ft2-'+(k+1)+'"></label></div></li>';

		}
		else
		{

			string+='<li class="tc-ft-li i-inactive"><img class="li-ft-img" src='+src+' alt='+data[k].key+'><span class="tc-li-title">'+data[k].key+'</span><div class="tc-li-toggle dib va-m"><input id="ft2-'+(k+1)+'" data-toggler="ft-'+(k+1)+'" class="ft-'+(k+1)+' cmn-toggle cmn-toggle-round" type="checkbox"><label for="ft2-'+(k+1)+'"></label></div></li>';


		}
	}
	$('li#features-page-id').css({'list-style-type':"none"});
	document.getElementById('features-page-id').innerHTML = string;
	   	 // console.log(string);
	   	 onChangeCheckboxFP();
	   	}

	   	function featuresModify()
	   	{
	   		// console.log("featuresModify called");
	   		var data=localStorage.featuresArray;
	   		data=JSON.parse(data);

	   		var dataSales=localStorage.flashSale;
	   		dataSales=JSON.parse(dataSales);

	   		var data2 = localStorage.salesArray;
	   		data2 = JSON.parse(data2);

	   		var data3 = localStorage.promoPushArray;
	   		data3 = JSON.parse(data3);

	   		for(var k=0;k<data.length;k++)
	   		{
	   			if($("#ft-"+(k+1)+"").prop('checked') == true)
	   			{
	   				if(data[k].value==0){
		  				var nameAnalytics = $("#ft-"+(k+1)+"").parent().parent().find('span').text();
		  				nameAnalytics = nameAnalytics.split(" ").join("-");
		  				sendAnalyticsData("subscribed-" + nameAnalytics);
		  			}
	   				data[k].value=1;
	   				$("input#ft-"+(k+1)+"").removeAttr('checked');

	   				$("input#ft-"+(k+1)+"").prop('checked', true);
	   			}
	   			else
	   			{
	   				if(data[k].value==1){
		  				var nameAnalytics = $("#ft-"+(k+1)+"").parent().parent().find('span').text();
		  				nameAnalytics = nameAnalytics.split(" ").join("-");
		  				sendAnalyticsData("unsubscribed-" + nameAnalytics);
		  			}
	   				data[k].value=0;
				/*	var oldclass=$('li.tc-grp-li').attr('class').split(' ')[1];
					$("li.tc-grp-li").removeClass(oldclass).addClass("i-inactive");
					*/	$("input#ft-"+(k+1)+"").removeAttr('checked');
				}

			}

			var oneDone = 0; 

			for(var k=0;k<dataSales.length;k++)
	   		{
	   			if($("#ft-"+(k+14)+"").prop('checked') == true && oneDone==0)
	   			{
	   				if(dataSales[k].value==0){
		  				var nameAnalytics = $("#ft-"+(k+14)+"").parent().parent().find('span').text();
		  				nameAnalytics = nameAnalytics.split(" ").join("-");
		  				sendAnalyticsData("subscribed-" + nameAnalytics);
		  			}
	   				dataSales[k].value=1;
	   				oneDone = 1;
	   				$("input#ft-"+(k+14)+"").removeAttr('checked');

	   				$("input#ft-"+(k+14)+"").prop('checked', true);
	   			}
	   			else
	   			{
	   				if(dataSales[k].value==1){
		  				var nameAnalytics = $("#ft-"+(k+14)+"").parent().parent().find('span').text();
		  				nameAnalytics = nameAnalytics.split(" ").join("-");
		  				sendAnalyticsData("unsubscribed-" + nameAnalytics);
		  			}
	   				dataSales[k].value=0;
				/*	var oldclass=$('li.tc-grp-li').attr('class').split(' ')[1];
					$("li.tc-grp-li").removeClass(oldclass).addClass("i-inactive");
					*/	$("input#ft-"+(k+14)+"").removeAttr('checked');
				}

			}

			for(var k=0;k<data2.length;k++)
			{
				if($("#ft-"+(data.length +k+1)+"").prop('checked') == true)
				{
					if(data2[k].value==0){
		  				var nameAnalytics = $("#ft-"+(data.length + k+1)+"").parent().parent().find('span').text();
		  				nameAnalytics = nameAnalytics.split(" ").join("-");
		  				sendAnalyticsData("subscribed-" + nameAnalytics);
		  			}
					data2[k].value=1;
					$("input#ft-"+(data.length + k+1)+"").removeAttr('checked');

					$("input#ft-"+(data.length + k+1)+"").prop('checked', true);
				}
				else
				{
					if(data2[k].value==1){
		  				var nameAnalytics = $("#ft-"+(data.length + k+1)+"").parent().parent().find('span').text();
		  				nameAnalytics = nameAnalytics.split(" ").join("-");
		  				sendAnalyticsData("unsubscribed-" + nameAnalytics);
		  			}
					data2[k].value=0;
				/*	var oldclass=$('li.tc-grp-li').attr('class').split(' ')[1];
					$("li.tc-grp-li").removeClass(oldclass).addClass("i-inactive");
					*/	$("input#ft-"+(data.length + k+1)+"").removeAttr('checked');
				}

			}

			
			for(var k=0;k<data3.length;k++)
			{
				if($("#ft-"+(k+10)+"").prop('checked') == true)
				{
					if(data3[k].value==0){
		  				sendAnalyticsData("subscribed-promotional-push");
		  			}
					data3[k].value=1;
					$("input#ft-"+(k+10)+"").removeAttr('checked');

					$("input#ft-"+(k+10)+"").prop('checked', true);
					// console.log("set the value of " + k + " to 1" );
				}
				else
				{
					if(data3[k].value==1){
		  				sendAnalyticsData("unsubscribed-promotional-push");
		  			}
					data3[k].value=0;
				/*	var oldclass=$('li.tc-grp-li').attr('class').split(' ')[1];
					$("li.tc-grp-li").removeClass(oldclass).addClass("i-inactive");
					*/
						$("input#ft-"+(k+10)+"").removeAttr('checked');
					// console.log("set the value of " + k + " to 0" );

				}

			}

		  	localStorage.featuresArray=JSON.stringify(data);//give your json
		  	localStorage.salesArray = JSON.stringify(data2);
		  	localStorage.promoPushArray = JSON.stringify(data3);
		  	localStorage.flashSale = JSON.stringify(dataSales);
		  	// console.log(localStorage.promoPushArray);
		  	//$('#features-id').html();
		  	// console.log(localStorage.featuresArray);

		  	displayFeatures();

		  }

		  function featuresModifyFP()
		  {
		  	var data=localStorage.featuresArray;
		  	data=JSON.parse(data);
		  	for(var k=0;k<data.length;k++)
		  	{
		  		if($("#ft2-"+(k+1)+"").prop('checked') == true)
		  		{
		  			if(data[k].value==0){
		  				var nameAnalytics = $("#ft2-"+(k+1)+"").parent().parent().find('span').text();
		  				nameAnalytics = nameAnalytics.split(" ").join("-");
		  				sendAnalyticsData("subscribed-" + nameAnalytics);
		  			}
		  			data[k].value=1;
				  //  $("li.tc-ft-li").addClass("i-activated");
				}
				else
				{
					if(data[k].value==1){
		  				var nameAnalytics = $("#ft2-"+(k+1)+"").parent().parent().find('span').text();
		  				nameAnalytics = nameAnalytics.split(" ").join("-");
		  				sendAnalyticsData("unsubscribed-" + nameAnalytics);
		  			}
					data[k].value=0;
				//	$("li.tc-ft-li").addClass("i-inactive");
			}
			
		}

		  	localStorage.featuresArray=JSON.stringify(data);//give your json
		  	// console.log(localStorage.featuresArray);
		  	featurePageDisplay();

		  }


		  function onChangeCheckbox()
		  {
		  	$('input[type="checkbox"]').change(function()
		  	{
		  		// console.log("FM was called");
		  		featuresModify();

		  	});
		  }

		  function onChangeCheckboxFP()
		  {
		  	$('input[type="checkbox"]').change(function()
		  	{
		  		featuresModifyFP();

		  	});	
		  }
		  function change_email(){
		  	var current_email = document.getElementById('emailIDforSync').value;

		  	if(localStorage.ext_email != current_email){
		  		chrome.runtime.sendMessage({addEmail: current_email}, function(response) {
		  		});
		  		document.getElementById('showEmailMsg').innerHTML = "An email has been sent to " + current_email + ". Please verify your mail to  ! Do check your SPAM folder</br></br>";
		  		alert("Please note that all price drop alerts will now be sent to the new email, if verified. It is mandatory to verify your email everytime you change it !");
		  	}
		  }

		  function showEmail()
		  {
		  	if(localStorage.ext_email ==="")
		  	{
		  		document.getElementById("show-email-id").innerHTML="Email is not set";
		  	}
		  	else
		  	{
		  		document.getElementById("show-email-id").innerHTML=localStorage.ext_email;
		  	}
		  	$('#emailIDforSync').val(localStorage.ext_email);
		  }

		  function displayRelevant(){
		  	var url = window.location.href;
		  	url = url.trim();
		  	url = url.split("#");
		  	if(url.length > 1 && url[1]!="" && url[1]!="overview"){
		  		if(url[1]=="price-alert-id"){
		  			init();
		  			setTimeout(function(){console.log("Waiting")},2500);
		  		}
		  		var idCLick = url[1];
	  			// $('.selected').removeClass('selected');
	  			// $('#'+idCLick).addClass('selected');
	  			var tabItems = $('.nav-tab,.tc-grp-header-btn'),
	  			tabContentWrapper = $('.cd-tabs-content');
	  			var selectedItem = $('.nav-tab[data-content='+$('#' + idCLick).attr("data-content")+"]");
	  			sendAnalyticsData(selectedItem);
	  			if( !selectedItem.hasClass('selected') ) {
	  				var selectedTab = selectedItem.data('content'),
	  				selectedContent = tabContentWrapper.find('div[data-content="'+selectedTab+'"]'),
	  				slectedContentHeight = selectedContent.innerHeight();

	  				tabItems.removeClass('selected');
	  				selectedItem.addClass('selected');
	  				selectedContent.addClass('selected').siblings('.cd-tab').removeClass('selected');
					//animate tabContentWrapper height when content changes
					tabContentWrapper.animate({
						'height': slectedContentHeight
					}, 200);
				}
				document.getElementById(idCLick).click();
				onChangeCheckbox();
				onChangeCheckboxFP();
			}
			else {

			}
		}

		function flipWishListURL(wish_url){
			wishListFlip = [];
			if(wish_url.split("?").length > 1){
				wish_url = wish_url.split("?");
				wish_url = wish_url[0].trim();
			}
			wish_url = wish_url + "?page=1&sort=dd";
			crawlWishFlip(wish_url);
		}

		function crawlWishFlip(wish_url){
			totAlert = 0;
			var slider = "";
			var sliderLength = 0;
			var link = "";
			var prod = "";
			var image = "";
			var price = "";
			var PID = "";
			var pos = 2;
			$.ajax(wish_url, {}).success(function(data){
				wrapper = document.createElement('div');
				wrapper.innerHTML= data;
		// console.log("wrapper: "+ $(wrapper).html());
		if($(wrapper).find('#wishlist .fk-wishl-itm').length > 0) {
			totAlert = 1;
			// console.log("data: " + data);
			slider = $(wrapper).find('#wishlist .fk-wishl-itm');
			sliderLength = $(wrapper).find('#wishlist .fk-wishl-itm').length;

			for(i=0;i<sliderLength;i++){
				link= "";
				url_wish = "";
				price= "";
				image = "";
				PID= "";
				pos = 2;
				if($(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('a').length > 0){
					link = $(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('a').attr('href');
					url_wish = link;
					if(url_wish.split("www.flipkart.com").length < 2){
						url_wish = "http://www.flipkart.com"+url_wish;
					}
					if(link.split('?pid=').length > 1){
						link = link.split("?pid=")[1];
						PID = link.split("&")[0];
					}
					else if(link.split('&pid=').length > 1){
						link = link.split("&pid=")[1];
						PID = link.split("&")[0];
					}
					else{
						link = "";
						PID = "";
					}
				}
				else{
					link = "";
					PID = "";
				}
				if(PID != ""){
					if(PID != PID.toUpperCase()){
						PID = "";
					}
				}
				if(PID != ""){
					if($(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.pu-final').length > 0){
						price = $(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.pu-final:eq(0)').text().trim();
						price = filter_price(price);
					}
				}
				else{
					price = "";
				}
				if(isNaN(price)){
					price = "";
				}

				if($(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-title-wrapper a').length > 0){
					prod = $(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-title-wrapper:eq(0) a:eq(0)').text().trim();
				}

				if($(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-image-link  img').length > 0){
					image = $(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-image-link img:eq(0)').attr('src').trim();
					if(image.split("data:image").length > 1){
						image = $(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-image-link img:eq(0)').attr('data-src').trim();
					}
				}

				if(PID != "" && price != ""){
					wishListFlip.push([(PID), (prod), price, (image), pos, (url_wish)]);
				}
			}
			if($(wrapper).find(".wishlist-pagination").length > 0 && $(wrapper).find(".wishlist-pagination").text().toUpperCase().split("NEXT") > 1){
				var pg_no = $(wrapper).find(".wishlist-pagination .current").text().trim();
				pg_no = parseInt(pg_no) + 1;
				wish_url = wish_url.split("?");
				wish_url = wish_url[0].trim();
				wish_url = wish_url + "?page=" + pg_no + "&sort=dd";
				crawlWishFlip(wish_url);
			}
			else{
				// console.log("Wishlist: " + wishListFlip);
				wishJson = JSON.stringify(wishListFlip);
				var jsonArr = [{'wishList': wishJson}];
				jsonArr = JSON.stringify(jsonArr);
				sendMessage(1, jsonArr, 17, wishResponse, []);  
				// console.log("WishlistJSON: " + wishJson);
			}
			
		}
		else {
			totAlert = 0;
		}
	})
.fail(function(){
	console.log("Something went Wrong!");
});
}

function snapWishList(wish_url){
	wishListSnap = [];
	var slider = $('.product_list_view_cont');
	var sliderLength = slider.length;
	var link = "";
	var url = "";
	var prod = "";
	var image = "";
	var price = "";
	var PID = "";
	var pos = 129;
	if(wish_url.split("?u=").length > 1){
		var snap_user = wish_url.split("?u=");
		snap_user = snap_user[1].trim();
		if(snap_user.split("&").length > 1){
			snap_user = snap_user.split("&");
			snap_user = snap_user[0].trim();
		}
		if(snap_user.split("#").length > 1){
			snap_user = snap_user.split("#");
			snap_user = snap_user[0].trim();
		}
		if(snap_user.split("/").length > 1){
			snap_user = snap_user.split("/");
			snap_user = snap_user[0].trim();
		}
	}
	else if(wish_url.split("&u=").length > 1){
		var snap_user = wish_url.split("&u=");
		snap_user = snap_user[1].trim();
		if(snap_user.split("&").length > 1){
			snap_user = snap_user.split("&");
			snap_user = snap_user[0].trim();
		}
		if(snap_user.split("#").length > 1){
			snap_user = snap_user.split("#");
			snap_user = snap_user[0].trim();
		}
		if(snap_user.split("/").length > 1){
			snap_user = snap_user.split("/");
			snap_user = snap_user[0].trim();
		}
	}
	var url_first = "https://www.snapdeal.com/wishlist/getProducts/0/1?sort=dhtl&lang=en&wishlistUrl="+snap_user;
	$.ajax(url_first, {}).success(function(resp){
		resp = JSON.parse(resp);
		var pages = resp.totalLength;
		var snapapi = "https://www.snapdeal.com/wishlist/getProducts/0/"+pages+"?sort=dhtl&lang=en&wishlistUrl="+snap_user;
		$.get(snapapi, {}).success(function(data){
			data = JSON.parse(data);
			for(var d=0;d<data.wishlistProductDisplayDTOs.length;d++){
				image = "";
				price = "";
				prod = "";
				link = "";
				url = "";
				PID = "";

				image = data.wishlistProductDisplayDTOs[d].listViewProductOfferGroupDTO.image;
				image = "https://n2.sdlcdn.com/" + image;
				price = data.wishlistProductDisplayDTOs[d].listViewProductOfferGroupDTO.displayPrice;
				prod = data.wishlistProductDisplayDTOs[d].listViewProductOfferGroupDTO.name;
				link = data.wishlistProductDisplayDTOs[d].listViewProductOfferGroupDTO.pageUrl;
				if(link.split("snapdeal.com/").length < 2){
					link = "https://www.snapdeal.com/" + link;
				}
				url = link;

				if(link.split("#").length > 1)  {
					link = link.split("#")[0];
				}
				if(link.split("?").length > 1)  {
					link = link.split("?")[0];
				}
				if(link.split("/").length > 1)  {
					link = link.split("/");
					PID = link[link.length -1];
				}

				if(PID != "" && price != ""){
					wishListSnap.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
				}
			}
			wishJson = JSON.stringify(wishListSnap);
			var jsonArr = [{'wishList': wishJson}];
			jsonArr = JSON.stringify(jsonArr);
			sendMessage(1, jsonArr, 17, wishResponse, []);  
			// console.log("WishlistJSON: " + wishJson);

		})
.fail(function(data){
	console.log("Something went wrong!");
});

})
.fail(function(){
	console.log("Something went wrong!");
});

}

function wishResponse(data){
	$("#wishListURL").val("");
	// $(".alert-new-count").css("display", "none");
	$(".alert-new-count").text(data);
	if(localStorage.wishListJson != "" && localStorage.wishListJson != undefined){
		var wishJ = JSON.parse(localStorage.wishListJson);
		var flagWish = 0;
		for(var j=0;j<wishJ.length;j++){
			if(wishJ[j] == wish_url_gb){
				flagWish = 1;
			}
		}
		// alert(flagWish);
		if(flagWish == 0){
			wishJ[wishJ.length] = wish_url_gb;
			wish_list_json = JSON.stringify(wishJ);
		}
	}
	else if(wish_url_gb != ""){
		wish_list_arr[0] = wish_url_gb;
		wish_list_json = JSON.stringify(wish_list_arr);
	}
	if(flagWish == 0){
		localStorage.wishListJson = wish_list_json;
	}
	displaySiteList();
	
}

var inputFields = document.getElementsByClassName('input-field');

function inputHasInput(el){
	if(el.value==""){
		el.classList.remove('has-entered')
	}
	else{
		el.classList.add('has-entered')
	}
}
Array.prototype.forEach.call(inputFields, function(el, i){
	el.onblur = function(){inputHasInput(el)};
	inputHasInput(el);
});


function displaySiteList(){
	var tot_sites = localStorage.wishListJson;
	tot_sites = JSON.parse(tot_sites);
	var allSites = "";
	for(var s=0;s<tot_sites.length;s++){
		var each_url = tot_sites[s];
		var each_pos = getCurrentPosition(each_url);
		for(var l=0;l<logos.length;l++){
			if(logos[l].position == each_pos){
				var each_logo = logos[l].image;
				break;
			}
			else{
				var each_logo = "http://compare.buyhatke.com/images/site_icons_m/unavail_logo.png";
			}
		}
		allSites = allSites + '<div data-pos="'+each_pos+'" class="each-wish-list clearfix" style="padding: 10px 20px 10px 10px;border-bottom: 1px solid #F7F7F7;"><div class="di-store-img" style="width: 1.7rem;height: 1.7rem;overflow: hidden;border: 1px solid #eee;border-radius: 50%;display: inline-block;vertical-align: middle;"><img style=" width: 25px; vertical-align: middle;" src="'+each_logo+'"></div><a class="link_wish" target="_blank" href="'+each_url+'" style="margin-left: 10px;color: #777;font-size: 15px;margin-top: -1px;">'+each_url+'</a><a data-content="update-wishlist" href="#" class="tc-grp-header-btn update-wishlist"><i class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14.8" height="14.8" viewBox="0 0 14.8 14.8"><style>.s0{fill:#FFF;}</style><path d="M2.5 11L1 14.5 4.4 13l-2-2M13 2.4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8l7.8-7.7 2 2-8 7.8z" opacity=".2"></path><path fill="#FFF" d="M1.5 9L0 12.5 3.4 11l-2-2M12 .4c-.7-.8-1.7 0-1.7 0l2 1.8s.7-1-.2-1.8zm-10 8L9.7.8l2 2-8 7.8z"></path></svg></i>UPDATE</a></div>';
	}
	$(".site-details").html(allSites);
	$(".update-wishlist").click(function(){
		$(".alert-new-count").text("");
		var each_link = $(this).parent().find(".link_wish").attr("href");
		selectSiteWish(each_link);
	});
}


function amazWishList(wish_url){
	wishListAmaz = [];

	$.ajax(wish_url).success(function(dataAmz){
		// console.log("dataAmz: "+dataAmz);

		wrapperAmaz1 = document.createElement('div');
		wrapperAmaz1.innerHTML = dataAmz;

		var sid = getCookie("session-id");
		var rid = getCookie("csm-hit");
		if(rid.split("+sa").length > 1){
			rid = rid.split("+sa");
			rid = rid[0].trim();
		}
		if($(wrapperAmaz1).find('.a-pagination').length > 0){
			var pg = $(wrapperAmaz1).find('.a-pagination:eq(0) li').length - 2;
		}
		else{
			var pg = 1;
		}
		var uid = wish_url.split("/wishlist/");
		uid = uid[1].trim();
		if(uid.split("?").length > 1){
			uid = uid.split("?");
			uid = uid[0].trim();
		}
		if(uid.split("#").length > 1){
			uid = uid.split("#");
			uid = uid[0].trim();
		}
		if(uid.split("&").length > 1){
			uid = uid.split("&");
			uid = uid[0].trim();
		}
		if(uid.split("/").length > 1){
			uid = uid.split("/");
			uid = uid[0].trim();
		}
		for(var p=1;p<=pg;p++){
    // alert(p);
    // alert("sid: "+sid);
    // alert("rid: "+rid);
    // alert("p: "+p);
    // alert("uid: "+uid);
    var amazURL = "http://www.amazon.in/gp/registry?ref_=cm_wl_ap_page_1&_encoding=UTF8&disableBtf=0&sid="+sid+"&ajax=renderItemsSection&subPageType=WishlistVisitorView&requestID="+rid+"&sort=date-added&reveal=unpurchased&page="+p+"&view=null&filter=all&id="+uid+"&type=wishlist";
    $.post(amazURL).success(function(data){
    	var slider = "";
    	var sliderLength = "";
    	var link = "";
    	var url = "";
    	var prod = "";
    	var image = "";
    	var price = "";
    	var PID = "";
    	var pos = 63;
      // console.log(" data: "+ data.content);
      wrapperAmaz = document.createElement('div');
      wrapperAmaz.innerHTML= data.content;
      // console.log(" wrapper: "+ $(wrapper).html());
      if($(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid').length > 0) {
      	slider = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid');
      	sliderLength = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid').length;

      	for(var i=0;i<sliderLength;i++){
      		link = "";
      		url = "";
      		price = "";
      		image = "";
      		prod = "";
      		PID = "";
      		pos = 63;

      		if($(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('a').length > 0){
      			link = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('a:eq(0)').attr('href');
      			// console.log("LINK: "+link);
      			if(link.split("amazon.in").length < 2){
      				link = "http://www.amazon.in" + link;
      			}
      			url = link;
      			if(url.split("www.amazon.in").length < 2){
      				url = "https://www.amazon.in" + url;
      			}
      			var pid = link;
      			if(pid.split("#").length > 1){
      				pid = pid.split("#")[0];
      			}
      			if(pid.split("&").length > 1){
      				pid = pid.split("&")[0];
      			}
      			if(pid.split("?").length > 1){
      				pid = pid.split("?")[0];
      			}
      			if(pid.split("/product/").length > 1){
      				pid = pid.split("/product/")[1];
      			}
      			else if(pid.split("/dp/").length > 1){
      				pid = pid.split("/dp/")[1];
      			}

      			if(pid.split("/ref").length > 1){
      				pid = pid.split("/ref")[0];
      			}
      			if(pid.split("/").length > 1){
      				pid1 = pid.split("/");
      				pid1 = pid1[pid1.length - 1];
      				if(pid1 == ""){
      					pid = pid.split("/");
      					pid = pid[pid.length - 2];
      				}
      				else {
      					pid = pid1;
      				}
      			}
      			PID = pid;
      		}
      		// console.log("PID: "+PID);

      		if(PID != ""){
      			if($(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.a-color-price span').length > 0){
      				price = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.a-color-price:eq(0) span:eq(0)').text().trim();
      				price = filter_price(price);
      			}
      			else if($(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.price-section span').length > 0){
      				price = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.price-section:eq(0) span:eq(0)').text().trim();
      				price = filter_price(price);
      			}
      		}
      		else{
      			price = "";
      		}
      		if(isNaN(price)){
      			price = "";
      		}

      		if($(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.g-itemImage a').length > 0){
      			prod = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.g-itemImage:eq(0) a:eq(0)').attr('title').trim();
      		}

      		if($(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.g-itemImage  img').length > 0){
      			image = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.g-itemImage img:eq(0)').attr('src').trim();
      		}
      		// console.log("Price: "+price);
      		// console.log("image: "+image);
      		// console.log("prod: "+prod);
      		// console.log("PID: "+PID);
      		// console.log("url: "+url);

      		if(PID != "" && price != ""){
      			wishListAmaz.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
      		}
      	}
      }
      wishJson = JSON.stringify(wishListAmaz);
      var jsonArr = [{'wishList': wishJson}];
      jsonArr = JSON.stringify(jsonArr);
      // sendMessage(1, jsonArr, 17, wishResponse, []);  
      // console.log("WishlistJSON: " + wishJson);
  })
.fail(function(data){
	// console.log("NA HO PAYII!!");
});
}

})
.fail(function(data){
	// console.log("Something Went Wrong!");
});

}


init();
showEmail();
displayFeatures();
displayRelevant();


function save_ADDRESS()
{
	addressobject();
	

}

/*
function save_ADDRESS()
{
    localStorage.firstname = document.getElementById('firstname').value;
	localStorage.lastname = document.getElementById('lastname').value;
	localStorage.fullname= localStorage.firstname+" "+localStorage.lastname;
	localStorage.address1 = document.getElementById('address1').value;
	localStorage.address2 = document.getElementById('address2').value;
	localStorage.address= document.getElementById('address1').value+"\n"+document.getElementById('address2').value;	
    localStorage.landmark = document.getElementById('landmark').value;
    localStorage.city = document.getElementById('city').value;
    localStorage.state = document.getElementById('state').value;
    localStorage.mobilenumber = document.getElementById('mobilenumber').value;
    localStorage.pincode = document.getElementById('pincode').value;
document.getElementById("name").innerText=localStorage.firstname +localStorage.lastname;
document.getElementById("completeaddress").innerHTML=localStorage.address1+"<br>"+localStorage.address2+"<br>"+localStorage.landmark+"<br>"+localStorage.city+"<br>"+localStorage.state+"<br>"+localStorage.pincode;
document.getElementById("phoneno").innerText=localStorage.mobilenumber;
document.getElementById("htk-address-enter1").style.display="none";
document.getElementById("htk-address1").style.display="block";
addressobject();


} 
function add_ADDRESS()
{
	document.getElementById("htk-address-enter1").style.display="block";
	document.getElementById("htk-address1").style.display="none";
}

function check_ADDRESS()

{
	document.getElementById("name").innerText=localStorage.firstname +localStorage.lastname;
document.getElementById("completeaddress").innerHTML=localStorage.address1+"<br>"+localStorage.address2+"<br>"+localStorage.landmark+"<br>"+localStorage.city+"<br>"+localStorage.state+"<br>"+localStorage.pincode;
document.getElementById("phoneno").innerText=localStorage.mobilenumber;


	if(document.getElementById("name").innerText=='')

	{
    
    document.getElementById("htk-address-enter1").style.display="block";
    document.getElementById("htk-address1").style.display="none";

	}
	else
	{
		document.getElementById("htk-address-enter1").style.display="none";
    document.getElementById("htk-address1").style.display="block";
	}
}

check_ADDRESS();
*/


function addressobject()
{


if(localStorage.getItem("addressarray") ===null)
{
	var addressjson={};
    var address=[];

    addressjson.address = address;
    console.log(addressjson);
	
	
}
else
{
	addressjson=JSON.parse(localStorage.addressarray);
	console.log(addressjson);

}
var type=document.getElementById('type').value;
var fullname= document.getElementById('firstname').value +" "+document.getElementById('lastname').value; 
var address1= document.getElementById('address1').value;
var address2= document.getElementById('address2').value;
var address=document.getElementById('address').value;
var landmark=document.getElementById('landmark').value;
var city=document.getElementById('city').value;
var state=document.getElementById('state').value;
var mobilenumber=document.getElementById('mobilenumber').value;
var pincode=document.getElementById('pincode').value;

if(type==null||type==""||fullname==null||fullname==""||address1==null||address1==""||address2==null||address2==""||city==""||city==null||state==null||state==""||pincode==null||pincode==""||mobilenumber==""||mobilenumber==null)
{
alert("Please Fill All Required Field");	
}
else
	if(pincode.length>6||pincode.length<6)
	{
alert("Enter Correct Pincode.");
	}
	else
		if(mobilenumber.length>10||mobilenumber.length<10)
		{
			alert("Mobile Number should be of 10 digit.");
		}
		else
{

var addaddress={
	"type":type,
	"fullname":fullname,
	"address1":address1,
	"address2":address2,
	"address":address,
	"landmark":landmark,
	"city":city,
	"state":state,
	"mobilenumber":mobilenumber,
	"pincode":pincode

}

//displaying address as it is  added
addressjson.address.push(addaddress);
localStorage.addressarray=JSON.stringify(addressjson);
console.log(JSON.stringify(addressjson));


   var addressdisplay=JSON.parse(localStorage.addressarray);
   var l=addressdisplay.address.length-1;
displayaddress(l);
//

}
}

/*

*/

function displayaddress(j)
{
  if(localStorage.getItem("addressarray") ===null)
{
	  
	
}
else
{
   

   var addressdisplay=JSON.parse(localStorage.addressarray);
   console.log(addressdisplay) ;

   
for(var i=j;i<addressdisplay.address.length;i++)	
{
//	$('.addresses').append("<div class='htk-address' id='"+addressdisplay.address[i].type+"'><h3 id='name'>"+addressdisplay.address[i].fullname +"</h3><br><h4 id='completeaddress'>"+addressdisplay.address[i].address1+"<br>"+addressdisplay.address[i].address2+"<br>"+addressdisplay.address[i].landmark+"<br>"+addressdisplay.address[i].city+"-"+addressdisplay.address[i].pincode+"<br>"+addressdisplay.address[i].state+"</h4><div id ='phoneno'>"+"Ph:"+addressdisplay.address[i].mobilenumber+"</div><br><div class='hk-opt-double'><button class='input-button remove' id='"+addressdisplay.address[i].type+"'>Remove</button></div></div>");
    $('.addresses').append("<div class='htk-address' id='"+addressdisplay.address[i].type+"'><div class='htk-addr__type'>"+addressdisplay.address[i].type+"</div><div class='htk-addr__name'>"+addressdisplay.address[i].fullname +"</div><div class='htk-addr__fullAddr'>"+addressdisplay.address[i].address1+"<br>"+addressdisplay.address[i].address2+"<br>"+addressdisplay.address[i].landmark+"<br>"+addressdisplay.address[i].city+"-"+addressdisplay.address[i].pincode+"<br>"+addressdisplay.address[i].state+"</div><div class='htk-addr__phone'>Ph:"+addressdisplay.address[i].mobilenumber+"</div><div class='hk-opt-double'><button class='input-button remove' id='"+addressdisplay.address[i].type+"'>Remove</button></div></div>");

	console.log(addressdisplay.address[i].landmark);
}

$(".remove").click(function(){
	var type=this.id;
	removeaddress(type);
	
	console.log(document.getElementById(type));
	//removing eleemnt prototype
	Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
    //
   
document.getElementById(type).remove();
});
	//
}
}
displayaddress(0);
//displaying all the addresses

//removing addresses
function removeaddress(type)
{
	Array.prototype.removeValue = function(name, value){
   var array = $.map(this, function(v,i){
      return v[name] === value ? null : v;
   });
   this.length = 0; //clear original array
   this.push.apply(this, array); //push all elements except the one we want to delete
}
var addressjson=JSON.parse(localStorage.addressarray);
console.log(addressjson);
addressjson.address.removeValue('type',type);
localStorage.addressarray=JSON.stringify(addressjson);
//countries.results.removeValue('name', 'Albania');
}
//removeaddress();




// referral

var child1=[];

function refer()
{
console.log("here");
//var ext_id=localStorage.ext_id;

var ext_id=localStorage.ext_id;

$.ajax({
  method: "GET",
  url: "https://tracking.buyhatke.com/referr/check.php",
  data: "ext_id="+ext_id
})
  .done(function( msg ) {
    if (msg!=0)
    {   $('#refer-button').remove();
        document.getElementById("refer-main").style.display="block"; 
    	document.getElementById("refer-link").href="http://compare.buyhatke.com/ref/"+msg;
    	document.getElementById("refer-link").innerText="http://compare.buyhatke.com/ref/"+msg;
    }
  });

$.ajax({
  method: "GET",
  url: "https://tracking.buyhatke.com/referr/todisplay.php",
  data: "ext_id="+ext_id
})
  .done(function( msg ) {
    if (msg!=0)
    {   
console.log(msg);


var data=JSON.parse(msg);

child1 =data.child;


document.getElementById('refer_id').innerText=data.refer_id;
document.getElementById('install_time').innerText=data.install_time;
document.getElementById('phone_no').innerText=data.phone_no;
var mobile=data.phone_no;
document.getElementById('lastactive').innerText=data.lastactive;
document.getElementById('lastused').innerText=data.lastused;
document.getElementById('rental_tentative').innerText=data.rental_tentative;
document.getElementById('rental_earned').innerText=data.rental_earned;
document.getElementById('redeem').innerText=data.redeem;
document.getElementById('balance').innerText=data.rental_earned-data.redeem;


chart(child1,mobile);





    }
  });


}

refer();



function chart(child,mobile){

var margin = {
    top: 20,
    right: 120,
    bottom: 20,
    left: 120
},
width = 960 - margin.right - margin.left,
height = 800 - margin.top - margin.bottom;


var mobileno=mobile.split("+91")[1];
var root = {
    "name": mobileno,
        "children": [
        //{
        //"name": "8887379369",
        // }
    ]
};


var root2 = {
    "name": mobileno,
        "children": [
        //{
        //"name": "8887379369",
        // }
    ]
};

//inserting child

console.log(child1);
child1.forEach(function(element) {
	var phoneno=element.split("+91")[1];
    root.children.push({'name':phoneno,'children':[]});
});


//

var i = 0,
    duration = 750,
    rectW = 60,
    rectH = 30;

var tree = d3.layout.tree().nodeSize([70, 40]);
var diagonal = d3.svg.diagonal()
    .projection(function (d) {
    return [d.x + rectW / 2, d.y + rectH / 2];
});

var svg = d3.select("#body").append("svg").attr("width", 1000).attr("height", 1000)
    .call(zm = d3.behavior.zoom().scaleExtent([1,1]).on("zoom", redraw)).append("g")
    .attr("transform", "translate(" + 318 + "," + 20 + ")");

//necessary so that zoom knows where to zoom and unzoom from
zm.translate([318, 20]);

root.x0 = 0;
root.y0 = height / 2;

function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

root.children.forEach(collapse);

update(root);



d3.select("#body").style("height", "800px");

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
        d.y = d.depth * 180;
    });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function (d) {
        return d.id || (d.id = ++i);
    });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
        return "translate(" + source.x0 + "," + source.y0 + ")";
    })
        .on("click", click);

    nodeEnter.append("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
    });

    nodeEnter.append("text")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
        return d.name;
    });

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    nodeUpdate.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
    });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
    })
        .remove();

    nodeExit.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
    //.attr("width", bbox.getBBox().width)""
    //.attr("height", bbox.getBBox().height)
    .attr("stroke", "black")
        .attr("stroke-width", 1);

    nodeExit.select("text");

    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function (d) {
        return d.target.id;
    });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("d", function (d) {
        var o = {
            x: source.x0,
            y: source.y0
        };
        return diagonal({
            source: o,
            target: o
        });
    });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
        var o = {
            x: source.x,
            y: source.y
        };
        return diagonal({
            source: o,
            target: o
        });
    })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle children on click.
function click(d) {
 
    if (d.children) {
        d._children = d.children;
        d.children = null;
  //console.log("children");
    } 
  else {
       d.children = d._children;
        d._children = null;
    
    //console.log("_children");
    
      var ids=d.id;
      var phoneno=d.name;
      //console.log(ids);
      //console.log(phoneno);
      
      d3.selectAll('.node').each(function(l) {
  if(l.id==ids&&l.click!=1)
  {

$.ajax({
  method: "GET",
  url: "https://tracking.buyhatke.com/referr/child.php",
  data: "phoneno="+(phoneno)
})
  .done(function( msg ) {
    if (msg!=0)
    {   
   var childrens=JSON.parse(msg);
   //console.log(children.child);
   // childrens.child;
   //console.log(l);
   

   d3.selectAll('.node').each(function(k) {

if(k.id==ids&&k.click!=1)

{
	console.log(childrens.child);
     console.log(k);
     k.click=1;

     //l.children=[{'name':"bhuwan",children:[]}];
     if(childrens.child!=undefined)
     {
     for(var i=0;i<childrens.child.length;i++)
     {
        
        
           	//console.log(children)
        if(i==0)
        {
          k.children=[{'name':childrens.child[i].split('+91')[1],'children':[]}];
     	}
     	else
     	{
     		k.children.push({'name':childrens.child[i].split('+91')[1],'children':[]});
     	}
     
     }
 }
	 
}

   });

        }

        update(d);
  });


//  	var children= getchild(phoneno);
  	
    
    //console.log("bhuwan");
   
    //console.log(l);  
  }

  // Logs the element attached to d.
});
      
         
    }
    update(d);
}

//Redraw for zoom
function redraw() {
  //console.log("here", d3.event.translate, d3.event.scale);
  svg.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
}


}


function getchild(phoneno){

}

