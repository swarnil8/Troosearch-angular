function hkOpenFilter() { // function to open the filter within the compare bar list
	document.getElementsByClassName('hk-cB__more')[0].classList.add('hk-cB__more--filterOpen');
}

function hkCloseFilter() { // function to close the filter within the compare bar list
	document.getElementsByClassName('hk-cB__more')[0].classList.remove('hk-cB__more--filterOpen');
}


function hkShowBar() { // function to show the compare bar
	var $hkHdrPop = $('.hk-compBar'),
		$hkHdrPopHeight = $hkHdrPop.outerHeight(), // calculate the height of the compare bar which would be used to move the entire body of the document
		$hkGlobWrapper = $('body'),
		$hkHdrPopClose = $('.hk-cB__close'),
		$hkHdrPopLogoImg = $('.hk-cB__logoImg'),
		$hkBringBackCompBar = $('.hk-bringBackCompBar');

	$hkHdrPop.addClass('hk-ext-animated'); //initiates the animation of the compare bar
	$hkHdrPopLogoImg.addClass('hk-ext-animated'); //initiates the animation of the logo in the compare bar
	$hkHdrPop.removeClass('hk-ext-slideInUp').addClass('hk-ext-slideInDown') // slides down the animation of the compare bar by remove the slideup animation that was placed on close of the same 

	$hkBringBackCompBar.removeClass('hk-bringBackCompBar--show'); //hides the bringback comparebar element
	// $hkGlobWrapper.css('top', $hkHdrPopHeight + 'px'); //moves the body of the window by the height of the compare bar


	bringBackCmp();

	// $('.hk-cB__close').click(function() { // prepares the compare bar to close on clicking on the close button on the compare bar 
	// 	$hkHdrPop.removeClass('hk-ext-slideInDown').addClass('hk-ext-slideInUp') // adds slide up animation aftre removing the slide down animation
	// 	setTimeout(function() {
	// 		$hkHdrPop.removeClass('hk-ext-animated'); //remove the animation so that it animate later on when called back
	// 	}, 500);
	// 	$hkHdrPopLogoImg.removeClass('hk-ext-animated'); // removes logo animation to be added later 
	// 	// $hkGlobWrapper.css('top', 0); // brings the body back to the top position (note this is not the original position of the body)
	// 	$hkBringBackCompBar.addClass('hk-bringBackCompBar--show'); // shows the bringback comparebar waala button
	// 	removeBackCmp();

	// });
	/*************** animation (like in flight) ************/

	var $hkHdrOverlayAnim = $('.hk-compBar__overlayAnimation'); // in case where thers an overlay animation on the compare bar like in the flight bar

	if (!!$hkHdrOverlayAnim[0]) {
		setTimeout(function() {
			$hkHdrOverlayAnim.addClass('hk-compBar__oAnim--start'); // this was done for the case where there was continuous change in the prices
		}, 1000); // since the animation total time took <1s, hence after 1s add this
	}

}

$(function() {
	var hkSTab = document.querySelector('.hk-sB__tabs'),
		hkSTabWrap = document.querySelector('.hk-sB-tabs__wrap'),
		hkPWTab = document.querySelector('.hk-sTab__pw'),
		hkSTabSwitcher = document.querySelector('.hk-sTabSwitch__wrap'),
		hkSideBar = document.querySelector('.hk-sideBar');

	// setTimeout(hkShowBar, 2000);
	setTimeout(hkShowRecoBox, 2000);
	/* use this on load of the extension sidebar*/
	if (hkSideBar) {
		if (!!parseInt(hkEatACookie('hkSmallSidebar'))) {
			hkSideBar.classList.add('hk-sideBar--small');
			document.querySelector('.hk-js-check__sTabSizeChange').checked = true;
		} else {
			hkSideBar.classList.remove('hk-sideBar--small');
			document.querySelector('.hk-js-check__sTabSizeChange').checked = false;
		}
	}


	// if (!!$('.hk-sTab__graph')[0]) {
	// 	$('.hk-sTab__graph').highcharts({ // this chart is different.. has some hover effect & all.. also the color scheme is pretty keeewl.. forgot what i added. :( 
	// 		chart: {
	// 			backgroundColor: '#fff',
	// 			spacing: [10, 10, 10, 0],
	// 			plotBorderColor: '#c0c0c0'
	// 		},
	// 		xAxis: {
	// 			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	// 		},
	// 		tooltip: {
	// 			shared: !0,
	// 			crosshairs: !0
	// 		},
	// 		plotOptions: {
	// 			line: {
	// 				dataLabels: {
	// 					enabled: !1
	// 				},
	// 				enableMouseTracking: !0
	// 			},
	// 			credits: {
	// 				enabled: !1
	// 			},
	// 			title: {
	// 				text: $('title').text()
	// 			},
	// 			xAxis: {
	// 				type: 'datetime',
	// 				title: {
	// 					text: 'Date'
	// 				},
	// 				labels: {
	// 					x: 0
	// 				}
	// 			},
	// 			yAxis: {
	// 				gridLineColor: '#ccc',
	// 				gridLineDashStyle: 'dash',
	// 				title: {
	// 					text: 'Price [INR]'
	// 				}
	// 			},
	// 			series: {
	// 				allowPointSelect: true,
	// 				marker: {
	// 					enabled: true
	// 				}
	// 			}
	// 		},
	// 		series: [{
	// 			name: 'Product Price',
	// 			color: '#1e88e5',
	// 			fillOpacity: .1,
	// 			type: 'area',
	// 			tooltip: {
	// 				valueDecimals: 2
	// 			},
	// 			data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
	// 		}]
	// 	});
	// }
	// var $hkDropInputCheck = $('.hk-sTabDropInput__check');

	///this is for the carousel

	// if (!!$('.hk-c-carousel__innerWrap')[0]) {
	// 	$('.hk-c-carousel__innerWrap').lightSlider({
	// 		item: 3,
	// 		slideMargin: 10,
	// 		slideMove: 3,
	// 		pager: false,
	// 	});
	// }

});
// click events -- mostly event delegation

// var lastClicked = "";

// $(document).on('click', '.hk-js-sB__tabSwitcher', function() { // this for tab switching..
// 	console.log("was clicked");
// 	var	hkSideBar = document.querySelector('.hk-sideBar');
// 	var tabSideId = $(this).attr("data-hk-stab");

// 	if(lastClicked==tabSideId){
// 		hkSTabClose();
// 		lastClicked = "";
// 		return;
// 	}
// 	else {
// 		lastClicked = tabSideId;
// 	}

// 	hkClickAnywhereToClose(hkSideBar, '.hk-sideBar', hkSTabClose);
// 	hkSwitchSTab($(this).data('hk-stab')); //note that it takes the tab's index as argument for opening that specific tab which is handled by css . the details are in hkSwitchTab
// 	if($(this).hasClass("hk-main-coupons")){
// 		console.log("was clicked and entered");
// 		getCouponsDetails();
// 	}
// });

// $(document).on('click', '.hk-js-bringBackCompBar', function() { //this is for bringing the compare bar back on the screen
// 	hkShowBar();
// });

// $(document).on('click', '.hk-js-pw__add', function() { // starts watching price...or.. add to price alerts
// 	hkAddToPriceWatch();
// });

// $(document).on("click", ".hk-sTab__coupRatingIcon--thumbsUp", function(){
// 	var cID = $(this).parent().parent().parent().parent().parent().parent().attr("id");
// 	var webID = getCurrentPosition(window.location.href);
// 	var lflag = 1;
// 	var exflag = 0;
// 	// console.log("cID: "+cID);
// 	// console.log("webID: "+webID);
// 	// console.log("lflag: "+lflag);
// 	// console.log("exflag: "+exflag);
// 	likeDislikeCoupons(cID, webID, lflag, exflag);
// });

// $(document).on("click", ".hk-sTab__coupRatingIcon--thumbsDown", function(){
// 	var cID = $(this).parent().parent().parent().parent().parent().parent().attr("id");
// 	var webID = getCurrentPosition(window.location.href);
// 	var lflag = 0;
// 	var exflag = 0;
// 	// console.log("cID down: "+cID);
// 	// console.log("webID down: "+webID);
// 	// console.log("lflag down: "+lflag);
// 	// console.log("exflag down: "+exflag);
// 	likeDislikeCoupons(cID, webID, lflag, exflag);
// });

// $(document).on('click', '.hk-sTab__pw', function() { // same as above but the differnce is that this acts on the sidebar tab so that when its clicked, price alert is automagically added and  it changes color, etc.  
// 	hkAddToPriceWatch();
// });

// $('.hk-js-pw__remove').click(function() { // remove from price watch
// 	hkRemoveFromPriceWatch();
// });


// $(document).on('click', '.hk-js-cBMFilter__close', function() { // close the filter in the compare bar list
// 	hkCloseFilter()
// });


// $(document).on('click', '.hk-js-cBMFilter__open', function() { // open the filter in the compare bar
// 	hkOpenFilter()
// });

// $(document).on('click', '.hk-sTab__setPriceDrop .hk-c-toolTip__col', function() { //this is inside the sidebar which is found inside the tooltip after setting the price alerts.
// 	//Its for that minimum price drop value setting thingy on the sidebar. clicking on that tooltip column would append to the input next to the tooltip  
// 	var $this = $(this),
// 	$hkDropInput = $('.hk-sTabDropInput__text', '.hk-sTab__setPriceDrop');
// 	$hkDropInput.val($this.data('ttval'));

// });

// $(document).on('click', '.hk-js-sTabDropInput__check', function() {
// 	//check if the price drop value setting is on and then toggle the tooltip and the input box
// 	var $this = $(this),
// 	$check = $this.parent().find('.hk-sTabDropInput__text'),
// 	$checkContainer = $this.parent().find('.hk-c-toolTips__container--clickFocus')[0];

// 	if ($this.prop('checked')) {
// 		$check.prop('disabled', false);
// 		hkTTAdd($checkContainer);
// 	} else {
// 		$check.prop('disabled', true);
// 		hkTTRemove($checkContainer);
// 	}
// });

// $(document).on('click', '.hk-js-sTab__close', hkSTabClose); // close the sidebar tab

// $(document).on('click', '.hk-js-copyThis', function() {
// 	//this is a quasi-generic function :P. It copies the contents of the element and then shows a Copied! animation to the user
// 	var $this = $(this);
// 	hkCopyThis($this.find('.hk-js-copyThis__text').text());
// 	$this.addClass('hk-js-copyThis--copied');
// 	setTimeout(function() {
// 		$this.removeClass('hk-js-copyThis--copied');
// 	}, 600);
// });

// $(document).on('click', '.hk-js-check__sTabSizeChange', function() {
// 	var hkSTab = document.querySelector('.hk-sB__tabs'),
// 	hkSTabWrap = document.querySelector('.hk-sB-tabs__wrap'),
// 	hkPWTab = document.querySelector('.hk-sTab__pw'),
// 	hkSTabSwitcher = document.querySelector('.hk-sTabSwitch__wrap'),
// 	hkSideBar = document.querySelector('.hk-sideBar');
// 	//toggle the size of the sidebar and its icons
// 	var $this = $(this);
// 	if ($this.prop('checked')) {
// 		$(hkSideBar).addClass('hk-sideBar--small');
// 		hkCookACookie('hkSmallSidebar', 1, '9999');
// 	} else {
// 		$(hkSideBar).removeClass('hk-sideBar--small');
// 		hkCookACookie('hkSmallSidebar', 0, '9999');
// 	}

// });


/******* cookie make, eat and egest *****/

function hkCookACookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else var expires = "";
	document.cookie = name + "=" + value + expires + " ; path=/";
}

function hkEatACookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function hkThrowACookie(name) {
	hkCookACookie(name, "", -1);
}
/******* end of cookie maker, eater and egest *****/


function hkRemoveFromPriceWatch() {
	var hkSTab = document.querySelector('.hk-sB__tabs'),
		hkSTabWrap = document.querySelector('.hk-sB-tabs__wrap'),
		hkPWTab = document.querySelector('.hk-sTab__pw'),
		hkSTabSwitcher = document.querySelector('.hk-sTabSwitch__wrap'),
		hkSideBar = document.querySelector('.hk-sideBar'),
		hkPWTitle = document.querySelector('.hk-sTab__pwTitle');
	//opposite of above 
	$(hkPWTab).removeClass('hk-sTab__pw--on');
	$('.hk-js-pw__add').removeClass('hk-u-vanish');
	$('.hk-js-pw__remove').addClass('hk-u-vanish');
	$('.hk-js-sTabDropInput__check').prop('disabled', true);
	hkResetMinAlert();
	removeAlert();
	
	hkPWTitle.innerHTML = `<svg viewBox="0 0 50.7 63.1" class="hk-u-va--middle hk-ext__icons--dark hk-u-margin__v-05" height="20px">
			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hk-svg__priceAlert"></use>
		</svg>

		<div class="hk-u-margin__h-05"><span>Not watching price right now</span>
			<div class="hk-u-fSize--tiny hk-u-text--lighter hk-u-text--normalWeight">Set price drop alerts to let you know when the price of this product falls</div>
		</div>`;
	return;
}

function hkResetMinAlert() {
	$('.hk-js-sTabDropInput__check').prop('disabled', true).prop('checked', false);
	$('.hk-sTabDropInput__text').val("").prop('disabled', true);
}

// $(document).on("click", ".hk-sTab__SPDSubmit", function(){

// 	var set_price_new = $(".hk-sTabDropInput__text").val().trim();
// 	console.log("set_price_new: "+set_price_new);

// 	if(set_price_new.trim() == "" || isNaN(parseFloat(set_price_new)) || set_price_new <= 0){
// 		alert("Please set a valid minimum expected Price");
// 	}
// 	else{
// 		setPriceMinimum(set_price_new);
// 	}
// });

// $(document).on("click", ".hk-sTab__PWEmailSubmit", function(){
// 	var email_new = $(".hk-sTab__PWEmailInput").val().trim();
// 	if(email_new != "" && email_new.split("@").length == 2 && email_new.split(".").length > 1){
// 		setNewEmail(email_new);
// 	}
// 	else{
// 		alert("Please provide a valid email id!");
// 	}
// });



function hkCopyThis(text) {
	//use this to copy any text 

	$('body').append("<input type='text' id='temp' style='position:absolute;opacity:0'>");
	$('#temp').val(text).select();

	document.execCommand('copy');


	$('#temp').remove();
}

function hkSTabClose() {
	//ponchoon to close the sidebar tab
	// lastClicked = "";
	// console.log("Set it's value to null");
	var hkSTab = document.querySelector('.hk-sB__tabs'),
		hkSTabWrap = document.querySelector('.hk-sB-tabs__wrap'),
		hkPWTab = document.querySelector('.hk-sTab__pw'),
		hkSTabSwitcher = document.querySelector('.hk-sTabSwitch__wrap'),
		hkSideBar = document.querySelector('.hk-sideBar'),
		hkSelectedTab = document.querySelector('.hk-sB__tabSwitcher--selected');

	hkSTab.className = 'hk-sB__tabs';
	hkSTabSwitcher.className = 'hk-sTabSwitch__wrap';
	if (hkSelectedTab) {
		hkSelectedTab.classList.remove('hk-sB__tabSwitcher--selected');
	}
}

function hkSwitchSTab(t) { // ponchoon to switch the sidebar tab
	if (t == 3) {
		return;
	}
	if (t == 10) {
		t = 3;
	}
	// console.log("Entered here with t: "+t);
	var hkSTab = document.querySelector('.hk-sB__tabs'),
		hkSTabWrap = document.querySelector('.hk-sB-tabs__wrap'),
		hkPWTab = document.querySelector('.hk-sTab__pw'),
		hkSTabSwitcher = document.querySelector('.hk-sTabSwitch__wrap'),
		hkSTabSelector = document.querySelector('.hk-sB__tabSelector'), //new
		hkSideBar = document.querySelector('.hk-sideBar');


	var hkSbTabAll = document.querySelectorAll('.hk-sB__tabSwitcher'),
		hkSbTabsLength = hkSbTabAll.length,
		$hkSbTabVisible = $('.hk-sB__tabSwitcher:visible'),
		$hkSbCurrTabSwitcher = $('.hk-sB__tabSwitcher[data-hk-stab=' + (t) + ']'),

		hkSbCurrTabSwitcherTop = $hkSbCurrTabSwitcher.position().top,
		hkSbCurrTabSwitcherHeight = $hkSbCurrTabSwitcher.outerHeight();

	hkSTabSelectorTop = hkSbCurrTabSwitcherTop + (hkSbCurrTabSwitcherHeight / 2);

	hkSTabSelector.style.transform = "translateY(" + hkSTabSelectorTop + "px)";

	hkSTabClose(); // closes the sidebar first 

	$hkSbCurrTabSwitcher.addClass('hk-sB__tabSwitcher--selected');
	hkSTab.classList.add('hk-sB__tabs--open' + t); //open the t(th) tab
	hkSTabSwitcher.classList.add('hk-sTabSwitch__wrap--open', 'hk-sTabSwitch__wrap--' + t);
	// document.querySelector('.hk-sTab__coupTab').click();
	return;
}

function hkTTAdd(el) { // ponchoon to open hk-c-toolTips__container--clickFocus tooltips
	el.classList.add('hk-c-toolTips__container--infocus');
	hkClickAnywhereToClose(el, '.hk-c-toolTips__container--infocus', hkTTRemove);
}

function hkTTRemove(el) { // ponchoon to close hk-c-toolTips__container--clickFocus tooltips
	el.classList.remove('hk-c-toolTips__container--infocus');
}

function hkHasParent(e, p) { // generic ponchoon to match the DNA of child n parent :P 
	if (!e) return false;
	var el = e.target || e.srcElement || e || false;
	while (el && el != p) {
		el = el.parentNode || false;
	}
	return (el !== false);
};

function hkClickAnywhereToClose(el, qrySel, fn) {
	// generic ponchoon to close anything on clicking anywhere in the document with el being the element passed so as to exclude that element from being clicked, qrySel to check whether the element exists - else it would keep calling that function again and again, and function to be called when clicked anywhere else.
	document.addEventListener('click', function(ev) {
		var target = ev.target;
		if (document.querySelector(qrySel) && target !== el && !hkHasParent(target, el)) {
			fn(el);
		}
	});
}

var hkSTab = document.querySelector('.hk-sB__tabs'),
	hkSTabWrap = document.querySelector('.hk-sB-tabs__wrap'),
	hkPWTab = document.querySelector('.hk-sTab__pw'),
	hkSTabSwitcher = document.querySelector('.hk-sTabSwitch__wrap'),
	hkSideBar = document.querySelector('.hk-sideBar');


/********** modals ***********/

// $(document).on('click', '.hk-js-modal__close', function() { //close modals
// 	var $this = $(this);
// 	hkCloseModal($this);
// 	if (!!$this.closest('.hk-ext-slideInDown--center')) { //if it had slidedown(center) animation then close the modal with slide up animation and restore the slidein down class to prepare for its next show
// 		hkSlideInUp($this);
// 		setTimeout(function() {
// 			hkSlideInDown($this);
// 		}, 600)
// 	}
// })

// $(document).on('click', '.hk-js-modal__open', function() { //open gangnam style the modal
// 	var $this = $(this);
// 	hkOpenModal($this.data('hkmodal')); // !!IMPORTANT!!. here the element's data tag bears the ID of the modal to be invoked. 
// })

function hkCloseModal(elem) {
	var $hkGlobWrapper = $('body');
	if ($('.hk-c-modals--open').length == 1) {
		$hkGlobWrapper.removeClass('hk-modal-shown'); // add back the scroll thingy to the window while remove the modal iff the number of modals=1. else stay as it is till all except one modal remains open. 
	}

	$(elem).closest('.hk-c-modals--open').removeClass('hk-c-modals--open'); // remove the closes modal. 

	setTimeout(function() {
			$(elem).closest('.hk-c-modal').removeClass('hk-ext-animated')
		}, 600) // remove the animation on the modal after it has vanished
}

function hkSlideInUp(elem) {
	$(elem).closest('.hk-ext-slideInDown--center').removeClass('hk-ext-slideInDown--center').addClass('hk-ext-slideInUp--center'); // add the slideInUp(center) animation 
}

function hkSlideInDown(elem) {
	$(elem).closest('.hk-ext-slideInUp--center').removeClass('hk-ext-slideInUp--center').addClass('hk-ext-slideInDown--center'); // add the slideInDown(center) animation 
}


function hkOpenModal(modalID) {
	//ponchoon to open the modals.. it takes the ID of the modal as the argument of the modal ka dhakkan
	var $hkGlobWrapper = $('body');

	$hkGlobWrapper.addClass('hk-modal-shown');

	$('#' + modalID).addClass('hk-c-modals--open').find('.hk-c-modal').addClass('hk-ext-animated').find('.hk-js-focusOnOpen').focus();

}



//Tab Layout

// $('.hk-c-tabLayout').each(function() {
// 	var tabWidth = $(this).find('.hk-c-tab:eq(1)').width();
// 	$(this).find('.hk-c-tabLine').css({ transform: "scaleX(" + (tabWidth / 100) + ")" });

// 	$(this).on('click', '.hk-c-tab', function() {
// 		hkTabSwitcher($(this));
// 	});
// });



// function hkTabSwitcher(clickedTab) {

// 	$(clickedTab).parent().find('.hk-c-tab--current').removeClass('hk-c-tab--current');
// 	$(clickedTab).addClass('hk-c-tab--current');

// 	var temp = clickedTab.closest('.hk-sTab__coupTabs').data('hktablayout');
// 	var line = clickedTab.closest('.hk-sTab__coupTabs').find('.hk-c-tabLine');

// 	if ($(clickedTab).data('hktabtype') != 'all') {

// 		$('#' + temp).find('.hk-sTab__coupLi').hide();
// 		var tabType = $(clickedTab).data('hktabtype');
// 		$('.hk-sTab__coupLi[data-hktabtype=' + tabType + ']').show();

// 	} else {
// 		$('#' + temp).find('.hk-sTab__coupLi').show();
// 	}

// 	var tabWidth = clickedTab.outerWidth();
// 	$(line).css({ transform: "scaleX(" + (tabWidth / 100) + ")translateX(" + (clickedTab.position().left / (tabWidth / 100)) + "px)" });
// }



/************** coupons ***************/

// expand & collapse the coupons description:

// $(document).on('click', '.hk-sTab__cMoreDetailToggler', function() {
// 	var $this = $(this);
// 	$this.parent().toggleClass('hk-sTab__coupDescriWrap--expanded');
// })

// $(document).on('click', '.hk-js-coupRev', function() {
// 	var $this = $(this),
// 	$nearestWrap = $this.closest('.hk-sTab__coupRevEachWrap');

// 	hkClearRatings($nearestWrap.parent());
// 	$nearestWrap.addClass('hk-sTab__coupRevEachWrap--selected');
// })


/*************** recommendations box*************** */

function hkShowRecoBox() {
	if (document.getElementsByClassName("hk-recoBox").length > 0) {
		var recoBox = document.querySelector('.hk-recoBox'),
			bringBackRecoBox = document.querySelector('.hk-bringBackRecoBox');

		recoBox.classList.add('hk-recoBox--show');
		bringBackRecoBox.classList.remove('hk-bringBackRecoBox--show');
	}
}

function hkHideRecoBox() {
	var recoBox = document.querySelector('.hk-recoBox'),
		bringBackRecoBox = document.querySelector('.hk-bringBackRecoBox');

	recoBox.classList.remove('hk-recoBox--show');
	bringBackRecoBox.classList.add('hk-bringBackRecoBox--show');
}

/************* need jquery */
// $(document).on('click', '.hk-js-recoBox__close', hkHideRecoBox);
// $(document).on('click', '.hk-js-bringBackRecoBox', hkShowRecoBox);

// $('.hk-recoBox').mouseover(function() { // to bring back the opacity on mouseover
// 	this.style.opacity = "1"
// })

/***********need jquery**********/
// $(document).on("change", ".hk-dd__select", function(){
// 	var selectedRng = $(this).val().trim();
// 	if(selectedRng == 'inAWeek'){
// 		if($(".hk-prediction-score").attr("data-score2")){
// 			var scoreG = $(".hk-prediction-score").attr("data-score2").split("~~")[0].trim();
// 			var text1G = $(".hk-prediction-score").attr("data-score2").split("~~")[1].trim();
// 			var text2G = $(".hk-prediction-score").attr("data-score2").split("~~")[2].trim();
// 			plotScorePred(scoreG, text1G, text2G);
// 		}
// 	}
// 	else if(selectedRng == 'inAMonth'){
// 		if($(".hk-prediction-score").attr("data-score3")){
// 			var scoreG = $(".hk-prediction-score").attr("data-score3").split("~~")[0].trim();
// 			var text1G = $(".hk-prediction-score").attr("data-score3").split("~~")[1].trim();
// 			var text2G = $(".hk-prediction-score").attr("data-score3").split("~~")[2].trim();
// 			plotScorePred(scoreG, text1G, text2G);
// 		}
// 	}
// 	else if(selectedRng == '23days'){
// 		if($(".hk-prediction-score").attr("data-score1")){
// 			var scoreG = $(".hk-prediction-score").attr("data-score1").split("~~")[0].trim();
// 			var text1G = $(".hk-prediction-score").attr("data-score1").split("~~")[1].trim();
// 			var text2G = $(".hk-prediction-score").attr("data-score1").split("~~")[2].trim();
// 			plotScorePred(scoreG, text1G, text2G);
// 		}
// 	}
// });

document.addEventListener('scroll', function listener() { // passive scroll listener to transparentify the recommendations box
	if (document.getElementsByClassName('hk-recoBox').length > 0) {
		var recoBox = document.querySelector('.hk-recoBox');
		recoBox.style.opacity = ".7"
	}
}, { passive: true });