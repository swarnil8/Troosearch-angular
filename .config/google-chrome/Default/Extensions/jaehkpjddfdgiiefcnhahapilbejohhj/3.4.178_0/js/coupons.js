
/************** coupons ***************/

// expand & collapse the coupons description:

$(document).on('click', '.hk-sTab__cMoreDetailToggler', function() {
	var $this = $(this);
	$this.parent().toggleClass('hk-sTab__coupDescriWrap--expanded');
})

$(document).on('click', '.hk-js-coupRev', function() {
	var $this = $(this),
		$nearestWrap = $this.closest('.hk-sTab__coupRevEachWrap');

	hkClearRatings($nearestWrap.parent());
	$nearestWrap.addClass('hk-sTab__coupRevEachWrap--selected');
})

function hkClearRatings(el) {
	el.find('.hk-sTab__coupRevEachWrap--selected').removeClass('hk-sTab__coupRevEachWrap--selected');

	//something to reset the vote counter
}


//Tab Layout

$('.hk-c-tabLayout').each(function() {
	var tabWidth = $(this).find('.hk-c-tab:eq(1)').width();
	$(this).find('.hk-c-tabLine').css({ transform: "scaleX(" + (tabWidth / 100) + ")" });

	$(this).on('click', '.hk-c-tab', function() {
		hkSwitchTab($(this));
	});
});



function hkSwitchTab(clickedTab) {

	$(clickedTab).parent().find('.hk-c-tab--current').removeClass('hk-c-tab--current');
	$(clickedTab).addClass('hk-c-tab--current');

	var temp = clickedTab.closest('.hk-c-tabs').data('hktablayout');
	var line = clickedTab.closest('.hk-c-tabs').find('.hk-c-tabLine');

	if ($(clickedTab).data('hktabtype') != 'all') {

		$('#' + temp).find('.hk-sTab__coupLi').hide();
		var tabType = $(clickedTab).data('hktabtype');
		$('.hk-sTab__coupLi[data-hktabtype=' + tabType + ']').show();

	} else {
		$('#' + temp).find('.hk-sTab__coupLi').show();
	}

	var tabWidth = clickedTab.outerWidth();
	$(line).css({ transform: "scaleX(" + (tabWidth / 100) + ")translateX(" + (clickedTab.position().left / (tabWidth / 100)) + "px)" });
}


/************** coupon rating *********/ 
$(document).on("click", ".hk-sTab__coupRatingIcon--thumbsUp", function(){
	var cID = $(this).parent().parent().parent().parent().parent().parent().attr("id");
	var webID = getCurrentPosition(window.location.href);
	var lflag = 1;
	var exflag = 0;
	// console.log("cID: "+cID);
	// console.log("webID: "+webID);
	// console.log("lflag: "+lflag);
	// console.log("exflag: "+exflag);
	likeDislikeCoupons(cID, webID, lflag, exflag);
});

$(document).on("click", ".hk-sTab__coupRatingIcon--thumbsDown", function(){
	var cID = $(this).parent().parent().parent().parent().parent().parent().attr("id");
	var webID = getCurrentPosition(window.location.href);
	var lflag = 0;
	var exflag = 0;
	// console.log("cID down: "+cID);
	// console.log("webID down: "+webID);
	// console.log("lflag down: "+lflag);
	// console.log("exflag down: "+exflag);
	likeDislikeCoupons(cID, webID, lflag, exflag);
	
	hkFdbkWrapper.innerHTML = hkFdBkTypes['sideCoupon'];
	hkOpenModal('hk-feedback');
});
