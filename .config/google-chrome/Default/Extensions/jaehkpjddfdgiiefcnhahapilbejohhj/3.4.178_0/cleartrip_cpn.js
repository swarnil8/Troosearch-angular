savingsArray = [];
coupArray = [];
bestCouponFound = 0;
flagCoupon = [];
mytext="";
arrayMsg = [];
arrayBest = [];
couponAt = 1289;

function getXMLHTTPRequest() {

  req = new XMLHttpRequest();
  return req;

}

for(var i=0;i < 200; i++){
  flagCoupon[i] = 2;
}

function changeFlag(i, coupon){
  flagCoupon[i] = 1;
  setTimeout(function(){postProcessor(coupon, i);},1000);
}

function changeFlag2(i, coupon){
  flagCoupon[i] = 0;
}

function removeCompletely(){
}

function postProcessor(coupon, i){
  if($('.couponResult').text()!=""){
    var totLen = $('.fare_row').length;
    ind_req2 = -1;
    var msg = $('.couponResult').text();
    msg = msg.split("Rs.");
    if(msg.length>1){
      msg = msg[1];
      msg = msg.trim();
      msg = msg.split(" ");
      msg = msg[0];
      msg = msg.split(",");
      msg = msg[0]+msg[1];
      savings = parseFloat(msg);
    }
    else {
      savings = 0;
    }
    savings = parseFloat(savings);
    // console.log("savings :"+savings);
    cpn_msg = "";
    if($('#saveMsg').length > 0){
      cpn_msg = $('#saveMsg').text().trim();
    }
    // console.log("cpn_msg: "+cpn_msg);
    couponAt = 1289;
    arrayMsg.push([coupon, encodeURIComponent(cpn_msg), couponAt ]);
    if(savings > $('.hdc-sav-amt:eq(0)').text().trim()){
      var currentSavAmt = parseFloat($('.hdc-sav-amt:eq(0)').text().trim()),
      finalSavAmt = savings;
      $({c: currentSavAmt}).animate({c: finalSavAmt}, {
        step: function(now) {
          $('.hdc-sav-amt').text(Math.round(now))
        },
        duration: 1000,
        easing: "linear"
      });
    }
    savingsArray[i] = savings;

    setTimeout(function(){changeFlag2(i, coupon);},1000);
  }
  else {
    setTimeout(function(){postProcessor(coupon, i);},1000);
  }
}

function preProcessor(i, coupon){
  $('#coupon').val(coupon);
  document.getElementById('check_saving').click();
  // console.log($('.couponResult').text());
  // console.log("Coupon Code applied " + coupon);
  setTimeout(function(){changeFlag(i, coupon);},1000);
}

function temp(coupon, i, lenArray){
  if(lenArray==100){
    $('.hdc-loading').html('Automatically applying the best coupon now !');
    $('.hdc-lb-progress').text("100% Complete");
    $('.hdc-lb-fg').css("width", "100%");
    arrayBest.push([coupon, couponAt]);
    arrayBest = JSON.stringify(arrayBest);
    var jsonArr = [{'best_cpn': arrayBest}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 13, doNothing, []);
    preProcessor(i, coupon);
  }
  else if(i==0||flagCoupon[i-1]==0){
    $('.hdc-loading').html('Trying code <span class="hdc-load-curr hdc-bold">' + (i+1) + '</span> of <span class="hdc-load-tot hdc-bold">' + lenArray + '</span>');
    var perDone = i/lenArray;
    perDone = perDone*100;
    perDone = parseInt(perDone);
    $('.hdc-lb-progress').text(perDone + "% Complete");
    $('.hdc-lb-fg').css("width", perDone + "%");
    preProcessor(i, coupon);
  }
  else {
    setTimeout(function(){temp(coupon, i, lenArray);},1000);
  }
}

function endProcess(i){
  // console.log("called with " + i);
  if(flagCoupon[i]==0){
    // console.log("Process terminated");
    max = -111111;
    ind_req = 1000;
    for(m=0;m<savingsArray.length;m++){
     if(max < savingsArray[m]){
      max = savingsArray[m];
      ind_req = m;
    }
  }
  if(max>0){
    bestCouponFound = 1;
    coup_req = coupArray[ind_req];
    flagCoupon[0] = 2;
    temp(coup_req, 0, 100);
    $('.hatke-discount-cover').css("display", "none");
    savings = $('.hdc-sav-amt:eq(0)').text();
    $('.hatke-discount-cover:eq(1)').css("display", "block");
    var currentSavAmt = 0,
    finalSavAmt = max;
    $({c: currentSavAmt}).animate({c: finalSavAmt}, {
      step: function(now) {
        $('.hdc-sav-amt').text(Math.round(now))
      },
      duration: 1000,
      easing: "linear"
    });
    var jsonArr = [{'savings': max}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  } 
  else {
    $('.hatke-discount-cover').css("display", "none");
    $('.hatke-discount-cover:eq(2)').css("display", "block");
  } 
  arrayMsg = JSON.stringify(arrayMsg);
  var jsonArr = [{'cpn_msg': arrayMsg}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 12, doNothing, []);
  // console.log(savingsArray);
}
else {
  setTimeout(function(){endProcess(i);},1000);
}
}
function couponInitiate(mytext){
 mytext="HATKE20~"+mytext;     

 if($('.fancy').length>0){
  for(k=0;k<$('.fancy').length;k++){
    var msg = $('.fancy:eq(' + k + ')').text();
    msg = msg.split("coupon");
    if(msg.length>1){
      msg = msg[1];
      msg = msg.trim();
      msg = msg.split(" ");
      msg = msg[0];
      if(msg == msg.toUpperCase()){
        mytext = mytext + msg + "~";
      }
    }
  }
}
// console.log("mytext"+mytext);
couponsLength = mytext.split("~").length - 1;
$('.hdc-c-line:eq(0)').text("We are automatically trying " + couponsLength + " coupon codes for you !");
applyCoupons(mytext); 

}
function applyCoupons(coupons){
 couponsArray = coupons.split("~");
 var savings = [];
 for(var i=0;i<couponsArray.length;i++){
  if(couponsArray[i]!=""&&couponsArray[i]!=" "){

    var cur = couponsArray[i];
    coupArray[i] = cur;
    temp(cur, i, couponsArray.length-1);
  }
}
endProcess(couponsArray.length-2);
}

function getCoupons(){
  for(var i=0;i < 200; i++){
    flagCoupon[i] = 2;
  }
  bestCouponFound = 0;

  $('.hatke-discount-cover:eq(0)').css("display", "block");
  if($('#couponRemove').length>0){
    document.getElementById('couponRemove').click();
  }
  var jsonArr = [{'pos': 13}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 7, startCouponProcess, []);



}

function removeTheCover(){
  if($('.hatke-discount-cover').length>0){
    $('.hatke-discount-cover').css("display", "none"); 
  }
}

var imgURL = returnResource("apply-coupon.png");
var autoCouponTextIcon = '<div id="couponClick" style="cursor:pointer;"><div class="js-couponTooltip hk-c-toolTips__container--infocus hk-c-toolTips__container hk-c-toolTips__container--dark hk-c-toolTips__container--left hk-sTab__setPriceDrop hk-u-disp--ib"><img style="margin-top:5px;" src="' + imgURL + '"><div class="hk-c-toolTip hk-u-padding__15"><div style="position: absolute;top: 5px;right: 5px;font-size: 21px;font-weight: bold;cursor: pointer;z-index: 1000;width: 20px;height: 20px;line-height: 100%;" class="js-closeCouponTooltip">&times;</div><svg class="hk-ext__pulse-svg" version="1.1" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg" style="position: absolute; z-index: 100; top: 8px; left: 8px;"><circle style="fill:#FFFFFF" class="hk-ext__circle hk-ext__first-circle" cx="29" cy="29" opacity="0" r="25"></circle><circle style="fill:#FFFFFF" class="hk-ext__circle hk-ext__second-circle" cx="29" cy="29" opacity="0" r="25"></circle><circle style="fill:#FFFFFF" class="hk-ext__circle hk-ext__third-circle" cx="29" cy="29" opacity="0" r="25"></circle><g class="hk-ext__opacityPulse"><circle cx="29" cy="29" r="29" style="fill:#FFFFFF"></circle><path d="M37.0171132,8 L15,27.6897228 L26.7948821,30.8400784 L20.5042783,50.5298012 L42.5213915,28.4773117 L32.2991604,24.5393671 L37.0171132,8 L37.0171132,8 Z" fill="#333333" style="fill: #be1e2d;"></path></g></svg><div class="hk-c-toolTip__wrap hk-l-flexColumns hk-u-noWrap"><div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAMAAAAc9R5vAAADAFBMVEVMaXEAAAAAAHYAPUkAJS8AIEEALjwAKToAIjUAJzjDnggAJjsAJDwLFxwAK0BNQgsAIzAALT8AHzApIBAHJz8EJz4GJzfGogAGLD8EKkEFJDYFKD1yXQ+mggoaOT7GowA0SDnJoQBwbC3FngAHIioVKiwXKyskKhsiKyDBmwXHoAElLSBkUg8mMB/GnwAxNR3HoABCQBzJogCPcwtNRRqkix6rkRp5ah9RShthVRVpXRzFngCRdQnGnwDAmwCjiBa2lhKLcxSSdwqNdRXFmwCxjgG8lgXFnQCcfgzEmwClhAekgwTFmwCkgwHIoQDBmgC/mgC5lQTDnADAmADCmgHKowDHngDDmwDIoADHnQDCmQDEmgDAlgDCmADDmgDEmwDFmwDGmwDHnADIngDInwDIoADKoQDMowLLpAjNpQTRpgDSpgDPpgvUqADPqBXVqgDRqhPWrAXRqxnXrQbVrBHSrB/WrhTarwXUrhzTriTasAjUriTZshnWsSvetBTbtCDXszHdtijfuBnbtzPeuiXhux/hvCjgvDLdvT7hwDjnwiDmwybpyCjmxz/nxkXryDPqyTjoyUbnyk3qzT7tzjHrzE3x0S7v0TTt0k7w0kfz1i/v00/u1knu1Ffz1z3z1kr32Ej22Uzw2lf33Tb33EPy3Frx3GLy3V333VH430X44ULy3mL23lj64En24VH04Vfz3m3640H04lv34V/25FP44mD541n75kz+50D65lX+50f+50r+6UH+6UX+6Uj96FD35XP+6VD86Fv+6kz+60r+7EX+7Uj+7kP+61P+6ln+7FH+7U786mf+7Fj+707+7F7+7lb66nb+71L+71T56n3+71f+7WL+71n+7mD+713+7mX/80n+7mb+8GH+72n+72r+72z+727+8Gv+8HH/8mX774P+8Hf+8Hr/82n/8XX/8nL/8nj/8nv/9HT/8oD/8oL/9Hn/84P/9Xv/9nf/93T/9Ib/9n//9oP/+Hz+9or/9oj/94T/94r/+Ib/+5L//I9ht2gZAAAAXHRSTlMAAQIDBAUJCw0OERIVFhcXGhwfHyAiJCQnKiwxMTExMjU5PUJCR01UX19kZWZqbXJ3f4GCh4eJi42QkZelp6yytLq8wcPGxsjNzc7V2dnc4ebn6e3t9Pb2+Pj6/Vhe6xwAAAH7SURBVCgVBcFbS5NhAMDx/3PYob1uOpzObaapJCI2SyqCIr9BXvQJ+mbddNd90F1ERFAQxMJgE9HlMHdwzu09PYd+PwEAbMwX51QUjgaXAIAAYH2tWpqbV+kg6l8czwDQALs75fs7TyrMzr63K0u/zwE00HxQffkK59Ls9t7oXTbnu4CCrf3VNy9MHCfGJpPcs/5MDmJQFB5VXz8OEzeXUVpoFT080dMeaNZX9g5vnJx9TDMGZwsHR2/vng7QcunOYWopvP8iHFokG81SdVQbCK3Kje1bl9r9ZRl2WpWndTdtnC5IL0UQaJdIv4TNbtcnt/1xUg5KGa9FJpdaHRc+fBNCKP9pczOWWmVjjTE2cX66lpP4497BWiQT45BaRLPQOsc9VNq+WH6eH+dHceiU9pPe2aIxpc9flQ1rTcapGEShQXM9/nF0zbRe6O9u1fMTj7i6HAqvlF4wy+V4Wi2cTzZWhsIHP89PzhKrZJot3m7mkptV0elVFtKg3eqeDIxRiDArroJFOa379nWj+KsVtXomdcoLETvVG8vANcft6KLT/dONI4NAZIJirdaYD7LCnaI6f6+iWWrReDMjHf4rBUrZ9GY4mcahcSAAqfM5LYOMTO3M2SQ0zoMAkEpnslKC82lsrPeAAACphJLgrLceDyAAAJACvPcAAP8BP9MD77uUqaYAAAAASUVORK5CYII=" alt="Coin" style="max-width: inherit;"></div><div class="hk-l-flexCol__col hk-u-padding__h-05"><p><b>Click this &amp; Get &#8377;25 Gift Voucher.</b><br>Exclusive for First time users of <br>Buyhatke Auto-coupon</p></div></div></div></div></div>';

function couponCheck(){
  var curURL = window.location.href;
  // console.log("CP Check was called");
  if(curURL.split('cleartrip.com/flights/').length>1 || curURL.split('cleartrip.com/hotels/').length>1){
    var imgURL = returnResource("apply-coupon.png");
    // console.log("TEst passed");
    if($('.upSell').length>1){
      $('.upSell:eq(0)').after(autoCouponTextIcon);
      addToDOM();
			setTimeout(()=>{
					requestAnimationFrame(()=>{
						$('.js-closeCouponTooltip').click(function(e){
							e.stopPropagation();$(this).hide();$('.js-couponTooltip').removeClass('hk-c-toolTips__container--infocus')
						
							$('.js-couponTooltip').hover(function(){ $(this).addClass('hk-c-toolTips__container--infocus')},function(){ $(this).removeClass('hk-c-toolTips__container--infocus')});})});
				}, 1000);
      $('.hd-cover-close').click(function(){
window.location.reload();  
});
    $('.hdc-button:eq(2)').click(function(){
window.location.reload();  
});
      var button = document.getElementById("couponClick");
      button.addEventListener("click", function(){
        getCoupons();
      }, false);
    }
    else {
      setTimeout(function(){couponCheck();},1000);
    }
  }
  if(curURL.split('cleartrip.com/packages/').length>1){
    var imgURL = returnResource("apply-coupon.png");
    // console.log("TEst passed1");
    if($('#couponCodeBlock').length>0){
      $('#couponCodeBlock').after(autoCouponTextIcon);
      addToDOM();
			setTimeout(()=>{
					requestAnimationFrame(hkTTAdd(document.querySelector('#couponClick .hk-c-toolTips__container--hoverFocus')));
			}, 1000);
      $('.hd-cover-close').click(function(){
window.location.reload();  
});
    $('.hdc-button:eq(2)').click(function(){
window.location.reload();  
});
      var button = document.getElementById("couponClick");
      button.addEventListener("click", function(){
        getCoupons();
      }, false);
    }
    else {
      setTimeout(function(){couponCheck();},1000);
    }
  }



}

couponCheck();

