var handle = chrome.extension.getBackgroundPage();
var hashTable = handle.hashTable;
var resultsTable = handle.resultsTable;
var watchListArray = handle.watchListArray;
var length = hashTable.length;
var count = 0;
var currentArray = [];
var newPushArr = [];
// shelly's awesome code starts here

function initValues(){
  var myEmail = localStorage.ext_email;
  if(myEmail == undefined || myEmail == "" || myEmail.trim() == ""){
    myEmail = "Not Available";
  }
  $(".hk-cust-email-text").text(myEmail);
  var cust_nav_bar = localStorage.featuresArray;
  cust_nav_bar = JSON.parse(cust_nav_bar);

  for(var n=0;n<cust_nav_bar.length;n++){
    val_key = cust_nav_bar[n].key;
    val_nav = cust_nav_bar[n].value;
// alrt-btn--off pc-btn--off deals--off coup-auto--off coup-side--off hk-pop-show pc-bar--off graph--off
var query_sel = $(".cmn-toggle:eq("+n+")").parent().parent().parent().parent().parent().parent();
if(val_nav == 1 || val_nav == "1"){
  $(".cmn-toggle:eq("+n+")").removeAttr("checked");
  $(".cmn-toggle:eq("+n+")").prop("checked", "true");
  $(".cmn-toggle:eq("+n+")").parent().find(".hk-cust-on").css("display", "inline-block");
  $(".cmn-toggle:eq("+n+")").parent().find(".hk-cust-off").css("display", "none");
  if($(".cmn-toggle:eq("+n+")").attr('id') == "pc-bar"){

    query_sel.removeClass("pc-bar--off");
  }
  else if($(".cmn-toggle:eq("+n+")").attr('id') == "alrt-btn"){

    query_sel.removeClass("alrt-btn--off");
  }
  else if($(".cmn-toggle:eq("+n+")").attr('id') == "pc-btn"){

    query_sel.removeClass("pc-btn--off");
  }
  else if($(".cmn-toggle:eq("+n+")").attr('id') == "graph"){

    query_sel.removeClass("graph--off");
  }
  else if($(".cmn-toggle:eq("+n+")").attr('id') == "deals"){

    query_sel.removeClass("deals--off");
  }
  else if($(".cmn-toggle:eq("+n+")").attr('id') == "coup-auto"){

    query_sel.removeClass("coup-auto--off");
  }
  else if($(".cmn-toggle:eq("+n+")").attr('id') == "coup-side"){

    query_sel.removeClass("coup-side--off");
  }
}
else if(val_nav == 0 || val_nav == "0"){
  $(".cmn-toggle:eq("+n+")").removeAttr("checked");
  $(".cmn-toggle:eq("+n+")").parent().find(".hk-cust-off").css("display", "inline-block");
  $(".cmn-toggle:eq("+n+")").parent().find(".hk-cust-on").css("display", "none");
  if($(".cmn-toggle:eq("+n+")").attr('id') == "pc-bar"){

    query_sel.removeClass("pc-bar--off");
    query_sel.addClass("pc-bar--off");
  }
  else if($(".cmn-toggle:eq("+n+")").attr('id') == "alrt-btn"){

    query_sel.removeClass("alrt-btn--off");
    query_sel.addClass("alrt-btn--off");
  }
  else if($(".cmn-toggle:eq("+n+")").attr('id') == "pc-btn"){

    query_sel.removeClass("pc-btn--off");
    query_sel.addClass("pc-btn--off");
  }
  else if($(".cmn-toggle:eq("+n+")").attr('id') == "graph"){

    query_sel.removeClass("graph--off");
    query_sel.addClass("graph--off");
  }
  else if($(".cmn-toggle:eq("+n+")").attr('id') == "deals"){

    query_sel.removeClass("deals--off");
    query_sel.addClass("deals--off");
  }
  else if($(".cmn-toggle:eq("+n+")").attr('id') == "coup-auto"){

    query_sel.removeClass("coup-auto--off");
    query_sel.addClass("coup-auto--off");
  }
  else if($(".cmn-toggle:eq("+n+")").attr('id') == "coup-side"){

    query_sel.removeClass("coup-side--off");
    query_sel.addClass("coup-side--off");
  }

}
}

$('.hk-notifications .hk-btn-link').click(function(){
  localStorage.pushNotStore = "";
  $(".hk-notifications .hk-notifs-list").html("");
  $(this).css("display", "none");
  $('.no-not-msg').css("display", "block");
});
if(localStorage.pushNotStore != "" && localStorage.pushNotStore != undefined){
  pushData_count = localStorage.pushNotStore;
  pushData_count1 = JSON.parse(pushData_count);
  $(".hk-pop-hdr-notif--count").text(pushData_count1.length);
}
else{
  $(".hk-pop-hdr-notif--count").text(0);
}
$(".hk-pop-hdr-notif").click(function(){
  if(localStorage.pushNotStore != "" && localStorage.pushNotStore != undefined){
    $('.no-not-msg').css("display", "none");
    $(".hk-notifs-list").html("");
    $('.hk-notifications .hk-btn-link').css("display", "block");
    pushData = localStorage.pushNotStore;
    pushData1 = JSON.parse(pushData);
    var lim = 10;

    for(var i=pushData1.length-1;i>=0;i--){
      var image = pushData1[i].image;
      var title = pushData1[i].title;
      var detail = pushData1[i].detail;
      var link = pushData1[i].URL;
      var id = pushData1[i].notfID;
      var type = pushData1[i].type;

      if(title!=undefined && lim > 0){

      $(".hk-notif-main .hk-notifs-list").append('<li data-item="'+id+'" class="hk-notifs-li"><a href="'+link+'" target="_blank" class="hk-notifs-li-link clearfix"><div class="hk-notif-icon"><div class="hk-notif-icon-wrap-no"><img src="'+image+'" alt="Alerts" class="hk-notif-icon--img hk-pop-icons"></div></div><div class="hk-notif-txt"><b>'+title+'</b><br>'+detail+'</div></a><button class="hk-notif-delete hk-pop-btn" style="font-size: 12px;">x</button></li>');

      lim--;

    }

    if(lim == 0){
       break;
    }

      
    }

    $('.hk-notif-delete').click(function(){
        var id = $(this).parent().attr("data-item");
        $(this).parent().addClass('hideRight').slideUp(500, function(){
          $(this).remove();
          var newPushArr = [];
          var newPushData = localStorage.pushNotStore;
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


  }
  else{
    $('.hk-notifications .hk-btn-link').css("display", "none");
    $('.no-not-msg').css("display", "block");
  }
});
$(".cmn-toggle").change(function(){
  var cust_nav_bar1 = localStorage.featuresArray;
  cust_nav_bar1 = JSON.parse(cust_nav_bar1);
  var changed_nav = $(this).attr("data-item");
  cust_nav_bar_new = cust_nav_bar1[changed_nav-1].value;
  var cust_sel = $(this).parent().parent().parent().parent().parent().parent(); 
  if(cust_nav_bar_new == 1){
    cust_nav_bar_new = 0;
    if(changed_nav == 1){
      cust_sel.removeClass("pc-bar--off");
      cust_sel.addClass("pc-bar--off");
    }
    else if(changed_nav == 3){
      cust_sel.removeClass("alrt-btn--off");
      cust_sel.addClass("alrt-btn--off");
    }
    else if(changed_nav == 4){
      cust_sel.removeClass("pc-btn--off");
      cust_sel.addClass("pc-btn--off");
    }
    else if(changed_nav == 2){
      cust_sel.removeClass("graph--off");
      cust_sel.addClass("graph--off");
    }
    else if(changed_nav == 7){
      cust_sel.removeClass("deals--off");
      cust_sel.addClass("deals--off");
    }
    else if(changed_nav == 6){
      cust_sel.removeClass("coup-auto--off");
      cust_sel.addClass("coup-auto--off");
    }
    else if(changed_nav == 5){
      cust_sel.removeClass("coup-side--off");
      cust_sel.addClass("coup-side--off");
    }
  }
  else if(cust_nav_bar_new == 0){
    cust_nav_bar_new = 1;
    if(changed_nav == 1){
      cust_sel.removeClass("pc-bar--off");
    }
    else if(changed_nav == 3){
      cust_sel.removeClass("alrt-btn--off");
    }
    else if(changed_nav == 4){
      cust_sel.removeClass("pc-btn--off");
    }
    else if(changed_nav == 2){
      cust_sel.removeClass("graph--off");
    }
    else if(changed_nav == 7){
      cust_sel.removeClass("deals--off");
    }
    else if(changed_nav == 6){
      cust_sel.removeClass("coup-auto--off");
    }
    else if(changed_nav == 5){
      cust_sel.removeClass("coup-side--off");
    }
  }
  cust_nav_bar1[changed_nav-1].value = cust_nav_bar_new;
  cust_nav_bar1 = JSON.stringify(cust_nav_bar1);
  localStorage.featuresArray = cust_nav_bar1;
});

$('.hk-pop-hdr-srch--input').keypress(function (e) {
  var search_text = $('.hk-pop-hdr-srch--input').val().trim();
  search_text = search_text.split(" ").join("-").trim();
  var search_url = "http://compare.buyhatke.com/products/"+search_text;
  var key = e.which;
  if(key == 13) 
  {
    if(search_text != ""){
      $('.hk-pop-hdr-srch--input').val("");
      window.open(search_url);  
    }
  }
});  

showAlerts();
deleteAlerts();

$.post("http://compare.buyhatke.com/deals-home/hottest.php", {}).success(function(offer){

  // console.log("data: "+offer);  
  var offerArray = offer.trim();
  offerArray = JSON.parse(offerArray);
  var lim = 0;
  if(offerArray.length > 15){
    lim = 15;
  }
  else {
    lim = offerArray.length;
  }
  for(var o=0;o<lim;o++){
    var deals_list = "";
    var offer_link = "http://compare.buyhatke.com"+offerArray[o].link+"?gclid=ext_popup_new";
    var image = offerArray[o].image;
    var perDrop = offerArray[o].perDrop;
    var prod = offerArray[o].prod;
    var price = offerArray[o].price;
    var mrp = offerArray[o].MRP;

    for(var l1=0;l1<logos.length;l1++){
     if(logos[l1].position == offerArray[o].pos){
      logo_url_hot = logos[l1].image;
      // console.log("log: "+logo_url_hot);
      break;
    }
  }

  deals_list = '<li class="deal-item dib va-t"><a target="_blank" href="'+offer_link+'"><div class="di-wrap clearfix"><div class="di-drop fl-r">'+perDrop+'%</div><div class="di-img"><img src="'+image+'" alt="'+prod+'"></div><div class="di-details"><h2>'+prod+'</h2><div class="di-prices"><div class="di-mrp"><span><span>&#8377;</span>'+mrp+'</span></div><div class="di-curr_p"><span>&#8377;</span>'+price+'</div></div><div class="di-store-img"><img style="margin-top: -2px;" src="'+logo_url_hot+'" alt="Price Drop"></div></div></div></a></li>';

  $('.deals-list').append(deals_list);

}

});

}

initValues();

function deleteAlerts(){
  $(".hk-alrt-del-btn").click(function(){
    var ext_id = localStorage.ext_id;
    var auth_val = localStorage.ext_auth;
    var link_id = $(this).parent().parent().parent().attr("data-item");

    var del_url = "http://compare.buyhatke.com/extension/removeFromWatchList.php?ext_id="+ext_id+"&auth_val="+auth_val+"&link_id="+link_id;
    $.get(del_url, {}).success(function(data){
      data = data.trim();
      watchListArray = JSON.parse(data);
      handle.watchListArray = JSON.parse(data);
      // console.log("calling showAlerts");
      showAlerts();
    });
    return false;
  });
}
function showAlerts(){
  var logo_url = "";
  var alert_list = "";
  $('.hk-alerts-list').html("");
  var lim = 0;
  if(watchListArray.length > 10){
    lim = 10;
  }
  else {
    lim = watchListArray.length;
  }
  for(var w=0;w<lim;w++){
    alert_list = "";

    var link_id = watchListArray[w].link_id;
    var link = watchListArray[w].link;


    var image = watchListArray[w].image;
    var prod = watchListArray[w].prod;
    var cur_price = watchListArray[w].cur_price;
    var drop_price = watchListArray[w].price_added - watchListArray[w].cur_price;
    var drop_price1 = "";
    if(drop_price >= 0){
      drop_price1 = drop_price;
      var include_red = "hk-alerts-li-drop";
    }
    else{
      drop_price1 = drop_price * (-1);
      var include_red = "";
    }
    var position_logo = watchListArray[w].position;
    var final_link = "http://tracking.buyhatke.com/Navigation/?pos="+position_logo+"&source=extension&ext1=popup_alert_view&ext2=" + localStorage.ext_id + "&link="+encodeURIComponent(link);
    logo_url = "http://compare.buyhatke.com/images/site_icons_m/unavail_logo.png"; 
    for(var l=0;l<logos.length;l++){
     if(logos[l].position == position_logo){
      logo_url = logos[l].image;
      break;
    }
  }

  alert_list = '<li class="hk-alerts-li '+include_red+'" data-item="'+link_id+'"><a href="'+final_link+'" class="hk-alrt-li-link" target="_blank"><div class="hk-alrt-wrap"><div class="hk-alrt-li-img-wrap"><img src="'+image+'" alt="'+prod+'" class="hk-alert-li-img"></div><div class="hk-alrt-li-details"><h4 class="hk-alrt-li-name">'+prod+'</h4><div class="hk-alrt-li-price"><div class="hk-alrt-li-price--label">Current<br>Price:</div><div class="hk-alrt-li-price--curr">'+cur_price+'</div><div class="hk-alrt-li-price--label">Price<br>Change:</div><div class="hk-alrt-li-price--drop">'+drop_price1+'</div></div></div><div class="hk-alrt-li-site"><img src="'+logo_url+'" alt="" class="hk-alrt-li-site--img"></div><button class="hk-alrt-del-btn hk-pop-btn"><img src="img/icon--thrash.svg" alt="Delete Alert" class="hk-alrt-del--img hk-pop-icons"></button></div></a></li>'

  $('.hk-alerts-list').append(alert_list);
}

deleteAlerts();
}

//shelly's awesome code ends here


document.addEventListener('DOMContentLoaded', function () {


});

function setCookie(c_name,value,exdays)
{
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}

function clickHandler(e) {
  //console.log(e.srcElement);
  setTimeout(sendRequests, 100);
}

function clickHandler1(e) {
  setTimeout(sendRequests2, 100);
}

function clickHandler2(e){
  var query = document.getElementById('enterName').value;
  if(query!=""){
    query = query.trim();
    query = query.split(" ");
    query = query.join("-");
    var url2 = "http://compare.buyhatke.com/products/" + query;
    chrome.tabs.create({url: url2});
  }
}

function clickHandler3(e) {
  setCookie("hasGiven", 1, 100000);
  chrome.extension.getBackgroundPage().hasGiven = 1;
  document.getElementById('kachada').innerHTML = '<div id="enterDiv">Your query: <input type="text" id="enterName"><button id="alto" style="margin-left: 90px;margin-top: 20px;">Search</button></div>';
  document.getElementById('alto').addEventListener('click', clickHandler2);
}

function getXMLHTTPRequest() {

  req = new XMLHttpRequest();
  return req;

}

function sendRequests2(){
  http2 = getXMLHTTPRequest();
  activeTabUrl = activeTabUrl.split("/")[2];
  var url2 = "http://compare.buyhatke.com/submitURL.php?url=" + encodeURIComponent(activeTabUrl) ;
  //console.log(url2);
  document.getElementById('notify').innerHTML = "Request to add the site " + activeTabUrl + " has been submitted. Thanks for helping US. ";
  http2.open("GET",url2,true);
  http2.onload = (function(){
    if (http2.readyState == 4) {
     if(http2.status == 200) { 
      var msg = http2.responseText;
    //console.log(msg);
  }
}
});
  http2.send(null);
}


function removeMe(num){
  num = num.split("removeClient");
  num = parseInt(num[1]);
  var index = num;
  num = "remove" + num;
  var element = document.getElementById(num);
  element.parentNode.removeChild(element);
  num = num.split("remove");
  num = index;
  if(num<watchListArray.length){
    link_id = watchListArray[num].link_id;
    ext_id = localStorage.ext_id;
    var httpq2 = getXMLHTTPRequest();
    var myurl = "http://compare.buyhatke.com/extension/removeFromWatchList.php";
    var parameters = "link_id=" + (link_id) + "&ext_id=" + ext_id + "&auth_val=" + localStorage.ext_auth;
    httpq2.open("POST", myurl, true);
    httpq2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpq2.onreadystatechange = function(){
      if (httpq2.readyState == 4) {
        if(httpq2.status == 200) {
          var mytext = httpq2.responseText;
          watchListArray = JSON.parse(mytext);
          handle.watchListArray = watchListArray;
        }
      }
    };
    httpq2.send(parameters);
  }

}

function sendRequests(){
  http2 = getXMLHTTPRequest();
  var val1 = document.getElementById('enterName').value;
  var val2 = document.getElementById('enteremail').value;
  var flag = 1;
  if(val1==""||val1=="Please enter your name"){
    document.getElementById('enterName').value = "Please enter your name";
    flag = 0;
  }
  if(val2==""||val2=="Please enter your E-Mail"){
    document.getElementById('enteremail').value = "Please enter your E-Mail";
    flag = 0;
  }
  if(val2!=""){
    var e_sp = val2.split("@").length;
    var e_sp2 = val2.split(".").length;
    if(e_sp==2&&e_sp2>1){
      flag = flag;
    }
    else {
      flag = 0;
      document.getElementById('enteremail').value = "Invalid E-Mail";
    }
  }
  if(flag==1){
    var url2 = "http://compare.buyhatke.com/submitName.php?name=" + encodeURIComponent(val1) + "&email=" + encodeURIComponent(val2);
  //console.log(url2);
  document.getElementById('notify').innerHTML = "An email has been sent to " + val2 + " . Please verify to start discovering products at Compare Hatke !";
  http2.open("GET",url2,true);
  http2.onload = (function(){
    if (http2.readyState == 4) {
     if(http2.status == 200) { 
      var msg = http2.responseText;
    //console.log(msg);
    chrome.extension.getBackgroundPage().userName = msg;
    chrome.extension.getBackgroundPage().reqSent = 1;
  }
}
});
  http2.send(null);
}
}

function checkVerified(){
  http2 = getXMLHTTPRequest();
  var url2 = "http://compare.buyhatke.com/extension.php";
  //console.log(url2);
  http2.open("GET",url2,true);
  http2.onload = (function(){
    if (http2.readyState == 4) {
     if(http2.status == 200) { 
      var msg = http2.responseText;
    //console.log(msg);
    msg_sp = msg.split("~");
    chrome.extension.getBackgroundPage().userID = msg_sp[0];
    chrome.extension.getBackgroundPage().isVerified = msg_sp[1];
    chrome.extension.getBackgroundPage().userName = msg_sp[2];
  }
}
});
  http2.send(null);
}

chrome.tabs.getSelected(null, function(tab) { 


  /********** UI js ******************/
  var hdrSrch=document.getElementsByClassName('hk-pop-hdr-search')[0],
  hdrSrchInput = document.getElementsByClassName('hk-pop-hdr-srch--input')[0]

  $(hdrSrch).click(function(e) {
    this.classList.add('expanded')
    hdrSrchInput.focus();
    return false;
  });
  $('.hk-pop-hdr-srch--button','.expanded').click(function(e){

		//			IMPORTANT		//
		/* put the search function here and not inline on the button.. should search only after typing and expanding" */
	})
  $(document).click(function () {
    hdrSrch.classList.remove('expanded');	
    $('.wrapper-dropdown-5').removeClass('active');   
  })
  /**************slider*********/
  $(document).ready(function(){
   var unslider=$(".hk-carousel-main").unslider({
		speed: 700,               //  The speed to animate each slide (in milliseconds)
		delay: 5000,              //  The delay between slide animations (in milliseconds)
		complete: function() {},  //  A function that gets called after every slide animation
		keys: true,               //  Enable keyboard (left, right) arrow shortcuts
		dots: false,               //  Display dot navigation
		fluid: false              //  Support responsive design. May break non-responsive designs
	});
   $('.hk-carousel_nav').click(function() {
    var fn = this.className.split(' ')[1];

        //  Either do unslider.data('unslider').next() or .prev() depending on the className
        unslider.data('unslider')[fn]();
      });
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
  var dd = new DropDown( $('#dd') );

  $('.hk-mod-sort--button').click(function(){
    $(this).parent().toggleClass('hk-mod-sort-asc')
  });
  $('.hk-nav-tab-inner').click(function(e){
    $('.hk-nav-tab-inner').removeClass('hk-nav-selected');
    $(this).addClass('hk-nav-selected');
    var navTab =$(this)
    $('.hk-poptabs').each(function(i,e){
     if($(e).attr('data-tab')==navTab.attr('data-nav')){
      $(e).addClass('hk-pop-show')
    }
    else
      $(e).removeClass('hk-pop-show')
  })	
  })
  $('.hk-custabs-nav-li-inner').click(function(){
    $('.hk-custabs-nav-li-inner').removeClass('hk-custab--selected');
    $(this).addClass('hk-custab--selected');
    var navTab =$(this)
    $('.hk-cust-tabs').each(function(i,e){
     if($(e).attr('data-tab')==navTab.attr('data-custab')){
      $(e).addClass('hk-pop-show')
    }
    else
      $(e).removeClass('hk-pop-show')
  })	
  })
  $('.hk-pop-hdr-notif--button').click(function(){
    $('.hk-notifications').addClass('hk-pop-show')
  })

  $('.hk-notif-close').click(function(){
    $('.hk-notifications').removeClass('hk-pop-show');
    return close;
  })
})

/*******************************/
/***********************UI ENDS HERE************************/



if(chrome.extension.getBackgroundPage().isVerified==1){
  string = "<body><center style='font-family: calibri;padding: 6px;'><br><div id='notify'></div><br>Hi <span id ='name'>" + chrome.extension.getBackgroundPage().userName + "</span>!<br/><br/>To add this site, send a request by clicking the button below:<br><br><button> Request </button></div><div id='about'></br>visit <a target='_blank' href='http://www.buyhatke.com'>www.buyhatke.com</a> to know more!</div></center></body>";
  document.getElementById('showData').innerHTML = (string);
}
else {
  if(chrome.extension.getBackgroundPage().reqSent==1){
    checkVerified();
          //console.log("Entered this loop");
        }
        if(chrome.extension.getBackgroundPage().hasGiven==1){

          string = "<body><center style='font-family: calibri;'><br><div id='notify'></div><div id='kachada'><br><div id='enterDiv'>Your query: <input type='text' id='enterName'><button id='alto' style='margin-left: 90px;margin-top: 20px;'>Search</button></div></div><div id='about'></br>visit <a target='_blank' href='http://www.buyhatke.com'>www.buyhatke.com</a> to know more!</div></center></body>";
          document.getElementById('showData').innerHTML = (string);
          document.getElementById('alto').addEventListener('click', clickHandler2);
        }
        else {
          string = "<body><center style='font-family: calibri;'><div id='notify'></div><div id='kachada' style='text-align: justify; padding: 20px; font-family: calibri; font-size: 16px; color: black;'><h3 style='font-size: 16px;'>Compare, Track and Save !</h3>1. Planning to shop online ?<br/><br/>2. Want the best price for the product ?<br><br>3. Then just go to a product page on Flipkart, Snapdeal, Amazon, Shopclues, Infibeam etc.<br><br>4. Click on the watch price button. Enter your email-id, if you wish to receive a mail. <br><br>5. Awesome, now lay back and get notified of every price drop on your favourite products.<br><br>6. You would also get prices of that product from other sellers selling it. Just hover over Compare Prices Option.</div><div id='about'></br><a style='color:blue!important;' target='_blank' href='http://compare.buyhatke.com/thankYou.php?utm_source=ext_popup'>Know More</a></div></center></body>";
          document.getElementById('showData').innerHTML = (string);
        }
      }
      

      if(chrome.extension.getBackgroundPage().isVerified==1){
        chrome.tabs.query({
    active: true,                              // Select active tabs
    windowId: chrome.windows.WINDOW_ID_CURRENT // In the current window
  }, function(array_of_Tabs) {
    var tab = array_of_Tabs[0];
    activeTabUrl = tab.url;
    //console.log(activeTabUrl);
  });
        document.querySelector('button').addEventListener('click', clickHandler1);
      }
      currentArray = (watchListArray);
      var len = currentArray.length;
      var string = "";

      for(i=0;i<len;i++){
        var tempLen = currentArray[i].prod.length;
        if(tempLen>35){
          currentArray[i].prod = currentArray[i].prod.substring(0,34);
        }

        var imgURL2 = chrome.extension.getURL("red-cross-button.gif");
        var removeID = "remove" + i;
        var removeClient = "removeClient" + i;
        string += "<div class='itemWrap' id='" + removeID + "'>";
        string += "<a id='" + removeClient + "' href='javascript:void();'><img src='" + imgURL2 + "' style='right: 20px;position: absolute;'></a>";
        string += "<a target='_blank' href='" + currentArray[i].link + "'><div class='imageDiv'><img src='" + currentArray[i].image + "'/></div>";
        string += "<div class='prodName'>"+ currentArray[i].prod + "</div><div class='storeRow'>";
        string += "<div class='prodStore'>" +  "</div>";
        string += "<div class='prodPrice' style='margin-top: -15px;font-weight: bold;font-family: calibri;font-size: 20px;'><span class='WebRupee'>Rs.</span> " + currentArray[i].cur_price + "</div>";
        if((currentArray[i].price_added - currentArray[i].cur_price)>0){
          fontColor = "green";
          diff = (currentArray[i].price_added - currentArray[i].cur_price);
          ChangeIndex = "(Drop)";
        }
        else if((currentArray[i].price_added - currentArray[i].cur_price)==0){
          fontColor = "green";
          diff = (currentArray[i].price_added - currentArray[i].cur_price);
          ChangeIndex = "(No Change)";
        }
        else {
          fontColor = "red";
          diff = (currentArray[i].price_added - currentArray[i].cur_price)*-1;
          ChangeIndex =  "(Rise)" ;
        }
        string += "<div class='prodPrice2' style='margin-top: 0;font-weight: bold;font-family: calibri;font-size: 16px;right: 19px;position: absolute;margin-top: 9px;color: " + fontColor + ";'><span class='WebRupee'>Rs.</span> " + diff + "<span style='font-size:13px;padding-left:4px;'>" + ChangeIndex + "</span></div>";
        string += "</div></a></div>";
      }
      if(string==""){
      }
      else {
        document.getElementById('showData').innerHTML = (string);
        for(var i=0;i<len;i++){
          var removeID = "removeClient" + i;
          var button = document.getElementById(removeID);
          button.addEventListener("click", function(){
            removeMe(this.id);
          }, false);
        }
      }

    })


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-21447924-6']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//tracer
$(".hk-nav-tab-inner").eq(1).click(function()
{
  //var pid= getPID();
var website=window.location.href.split(".com")[0].split("www.")[1];
var ext_id=localStorage.ext_id;
var ext_auth=localStorage.ext_auth;

var jsonArr = [{'mode':0,'listener':1,'type':5,'pid':'0','website':'0'}];
    jsonArr = JSON.stringify(jsonArr);

     var jsonParData = JSON.parse(jsonArr);
     var parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth;
     var L = jsonParData.length;
     for (var i = 0; i < L; i++) {
      var obj = jsonParData[i];
      for (var j in obj) {
        var paramKey = (j);
        var paramVal = (jsonParData[i][j]);
        if(paramKey == 'cpnData'){
          parameters += "&" + paramKey + "=" + encodeURIComponent(JSON.stringify(paramVal));
        }
        else{
          parameters += "&" + paramKey + "=" + paramVal;
        }
      }
    }
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
     //console.log("success");
         }
  };
  xhttp.open("POST", "http://52.77.254.109/dump", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(parameters);
  
});

/* ******************** FOR EXCLUSIVE DEALS    *********** */

exclusivedeals();

class Timer {
    constructor(selector) {
        this.clock = selector;
		this.startMsg = this.clock.getAttribute('data-startMsg');
		
		this.flag = 0;
		this.clock.innerHTML= `
		${this.startMsg? `<span class="hk-timer__msg">
			${this.startMsg}
		</span>` : ''}
		
		
    <span class="hk-timer__time--daysWrap"><span class="hk-timer__time hk-timer__time--days"></span> Days </span> 
    <span class="hk-timer__time--hoursWrap"><span class="hk-timer__time hk-timer__time--hours"></span> Hrs </span> 
    <span class="hk-timer__time--minutesWrap"><span class="hk-timer__time hk-timer__time--minutes"></span> Mins </span> 
    <span class="hk-timer__time--secondsWrap"><span class="hk-timer__time hk-timer__time--seconds"></span> Secs </span> 
    </div>`;
		
		this.daysSpan = this.clock.querySelector('.hk-timer__time--days');
		this.daysWrap = this.clock.querySelector('.hk-timer__time--daysWrap');

		this.hoursSpan = this.clock.querySelector('.hk-timer__time--hours');
		this.hoursWrap = this.clock.querySelector('.hk-timer__time--hoursWrap');
		
		this.minutesSpan = this.clock.querySelector('.hk-timer__time--minutes');
		this.minutesWrap = this.clock.querySelector('.hk-timer__time--minutesWrap');
		
		this.secondsSpan = this.clock.querySelector('.hk-timer__time--seconds');
		this.secondsWrap = this.clock.querySelector('.hk-timer__time--secondsWrap');
		
		this.endtime = new Date(Date.parse(this.clock.getAttribute('data-endtime')));
		
		this.startMsg = this.clock.getAttribute('data-startMsg');
		this.endMsg = this.clock.getAttribute('data-endMsg');
		this.getTimeRemaining = this.getTimeRemaining.bind(this);
		this.updateClock = this.updateClock.bind(this);
		this.start = this.start.bind(this);
    }
    getTimeRemaining(endtime) {
        this.t = Date.parse(this.endtime) - Date.parse(new Date());
        this.seconds = Math.floor((this.t / 1000) % 60);
        this.minutes = Math.floor((this.t / 1000 / 60) % 60);
        this.hours = Math.floor((this.t / (1000 * 60 * 60)) % 24);
        this.days = Math.floor(this.t / (1000 * 60 * 60 * 24));
        return {
            'total': this.t,
            'days': this.days,
            'hours': this.hours,
            'minutes': this.minutes,
            'seconds': this.seconds
        };
    }
    updateClock() {
        this.t = this.getTimeRemaining(this.endtime);

				this.daysSpan.innerHTML = this.t.days;
        this.hoursSpan.innerHTML = ('0' + this.t.hours).slice(-2);
        this.minutesSpan.innerHTML = ('0' + this.t.minutes).slice(-2);
        this.secondsSpan.innerHTML = ('0' + this.t.seconds).slice(-2);
				
				if(this.t.days > 0) {
					this.flag = 4;
				} else if(this.t.hours > 0) {
					this.flag = 3;
				} else {
					this.flag = 2;
				}

				switch(this.flag){
					case 4:
						this.daysWrap.style.display = '';
						this.hoursWrap.style.display = '';
						this.minutesWrap.style.display = 'none';
						this.secondsWrap.style.display = 'none';
						break;
					case 3:
						this.daysWrap.style.display = 'none';
						this.hoursWrap.style.display = '';
						this.minutesWrap.style.display = '';
						this.secondsWrap.style.display = 'none';
						break;
					default:
						this.daysWrap.style.display = 'none';
						this.hoursWrap.style.display = 'none';
						this.minutesWrap.style.display = '';
						this.secondsWrap.style.display = '';
				}


        if (this.t.total <= 0) {
          clearInterval(this.timeinterval);
          this.clock.innerHTML = `<div style="font-size: 1.4em">${this.endMsg || `Time's Up!` } </div>`;
        }
    }
	start(){
		  this.updateClock();
    	this.timeinterval = setInterval(this.updateClock, 1000);
	}
}

document.querySelectorAll('.hk-timer').forEach((el, i) => {
  el = new Timer(el);  
  el.start();
});

$(document).on('click','.hk-exclDIDescri__readMore', function(){
		
    this.parentNode.querySelector('.hk-exclDIDescri__text').classList.add('hk-exclDIDescri__text--expanded');
		
})



//exclusive deals

function exclusivedeals()
{

var userid=localStorage.ext_id;

$.ajax({url:"http://extmain.buyhatke.com/offerdisplay.php?ext_id="+userid,success:function(result){


if(result!="[]")
{
var respo=JSON.parse(result);




for(var i=0;i<respo.length;i++)
{

var offerid=respo[i].serial;
var title=respo[i].title;
var description=respo[i].description;
var expire=respo[i].expire;
var offerurl=respo[i].offerurl+"~"+localStorage.ext_id+"~"+offerid;
var offerimage=respo[i].offerimage;
var noofoffers=respo.length;

var dat=expire.split("T")[0].split("-");

expire=dat[1]+"/"+dat[2]+"/"+dat[0]+' '+expire.split("T")[1].split("Z")[0];

if(respo[i].type=="shop")
{
var img2="img/shopping.svg";
var typo="Shopping";
}
else
if(respo[i].type=="movies")
{
var img2="img/cinema.svg";
var typo="Movies";
}
else
if(respo[i].type=="bus")
{
var img2="img/bus.svg";
var typo="Bus";
}
else
if(respo[i].type=="hotels")
{
var img2="img/hotel.svg";
var typo="Hotels";
}
else
if(respo[i].type=="flight")
{
var img2="img/flight.svg";
var typo="Flights";

}
else
if(respo[i].type=="cards")
{
var img2="img/bankcard.svg";
var typo="Bank Cards";

}

var random =Math.floor(Math.random() * 300) + 50;
if(i==0)
{
  random=22;
}
else
if(i==1)
{
  random=45;
} 
$(".hk-noofoffers").text(noofoffers);
$('.hk-mod-exclDeals').append('<li class="hk-mod-exclDealsItem"> <div class="hk-exclDealsItem__wrappers--header hk-exclDealsItem__wrappers"> <div class="hk-exclDealsItem__headerWrapper hk-exclDealsItem__headerWrapper--left"> <img src="'+img2+'" alt="Cinema" height="40"> <span class="hk-exclDealsItem__categName">'+typo+' Deal</span> </div> <div class="hk-exclDealsItem__headerWrapper hk-exclDealsItem__headerWrapper--right"> <div class="hk-timer hk-timer--small" data-endtime="'+expire+'" data-startmsg="Expires in:" data-endmsg="Deal Ended!"> </div> </div> </div> <div class="hk-exclDealsItem__wrappers hk-exclDealsItem__wrappers--imgWrap"> <img class="hk-exclDealsItem__img" src="'+offerimage+'" alt="OFFER"> <div class="hk-exclDealsItem__title">'+title+'</div> </div> <div class="hk-exclDealsItem__wrappers hk-exclDealsItem__wrappers--descriWrap"><div class="hk-exclDealsItem__descri"> <p class="hk-exclDIDescri__text">'+description+'</p> <div class="hk-exclDIDescri__readMore"> Read More </div> </div> <div style="text-align:right;"> <a target="_blank" href="'+offerurl+'" class="hk-btn-link hk-exclDealsItem__grabBtn">GRAB NOW</a> </div> </div> <div class="hk-exclDealsItem__wrappers hk-exclDealsItem__wrappers--footer"> <img src="img/person.svg" alt="person" height="40"> <span class="hk-exclDealsItemfooter__text"><b>'+random+'</b> people have claimed this offer</span> </div> </li>')

document.querySelectorAll('.hk-timer').forEach((el, i) => {
  el = new Timer(el);  
  el.start();
});

}

}
else
{



$("#hk-exc-tab").css("order","1");
$(".hk-pop--exclDeals").removeClass("hk-pop-show");
$(".hk-pop--alerts").addClass("hk-pop-show");
$(".hk-select-0").removeClass("hk-nav-selected");
$(".hk-select-1").addClass("hk-nav-selected");
$(".hk-pop-deal-heading").hide();
$(".hk-mod-exclDeals").append("<img style='margin-top:30px;margin-left: 85px;' src='img/zero-state.png'></img>")

}




}});

}


/* ******************** END OF - FOR EXCLUSIVE DEALS    *********** */