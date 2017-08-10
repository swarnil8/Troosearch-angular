// crossword , landmark, purplle, rediffBooks, chumbak, cromaretail, american swan, zoomin, strapsandstring, bookadda, fnp, babyoye, uread, acadzone, floralis, Goodlife
//console.log("I was loaded");
$ = jQuery.noConflict();
var cur_site = "";
userSetting = "notYet";
function getCurrentPosition(siteName){
  var pos = 0;
  siteName = siteName.toUpperCase();
  if(siteName.split("EBAY").length>1){
   pos = 1;
   cur_site = "Ebay";
}
else if(siteName.split("FLIPKART").length>1){
   pos = 2;
   cur_site = "Flipkart";
}
else if(siteName.split("HOMESHOP").length>1){
   pos = 4;
   cur_site = "HomeShop18";
}  
else if(siteName.split("KOOVS").length>1){
   pos = 22;
   cur_site = "Koovs";
}
else if(siteName.split("SHOPPERSSTOP").length>1){
   pos = 45;
   cur_site = "ShoppersStop";
}
else if(siteName.split("JABONG").length>1){
   pos = 50;
   cur_site = "Jabong";
}
else if(siteName.split("LENSKART").length>1){
   pos = 57;
   cur_site = "Lenskart";
}
else if(siteName.split("INDIARUSH").length>1){
   pos = 62;
   cur_site = "Indiarush";
}
else if(siteName.split("AMAZON").length>1){
   pos = 63;
   cur_site = "Amazon";
}
else if(siteName.split("FASHIONARA").length>1){
   pos = 98;
   cur_site = "Fashionara";
}
else if(siteName.split("INFIBEAM").length>1){
   pos = 99;
   cur_site = "Infibeam";
}
else if(siteName.split("MYNTRA").length>1){
   pos = 111;
   cur_site = "Myntra";
}
else if(siteName.split("SNAPDEAL").length>1){
   pos = 129;
   cur_site = "Snapdeal";
}
else if(siteName.split("BOOKS.REDIFF").length>1){
   pos = 1037;
   cur_site = "RediffBooks";
}
else if(siteName.split("REDIFF").length>1){
   pos = 291;
   cur_site = "Rediff";
}
else if(siteName.split("PEPPERFRY").length>1){
   pos = 333;
   cur_site = "Pepperfry";
}
else if(siteName.split("PURPLLE").length>1){
   pos = 900;
   cur_site = "Purplle";
}
else if(siteName.split("INDIATIMES").length>1){
   pos = 401;
   cur_site = "Indiatimes";
}
else if(siteName.split("CROMA").length>1){
   pos = 71;
   cur_site = "Croma";
}
else if(siteName.split("GRABMORE").length>1){
   pos = 411;
   cur_site = "Grabmore";
}
else if(siteName.split("CRAFTSVILLA").length>1){
   pos = 412;
   cur_site = "Craftsvilla";
}
else if(siteName.split("SHOPCLUES").length>1){
   pos = 421;
   cur_site = "Shopclues";
}
else if(siteName.split("SHOPNINETEEN").length>1){
   pos = 422;
   cur_site = "Shopnineteen";
}
else if(siteName.split("CBAZAAR").length>1){
   pos = 423;
   cur_site = "Cbazaar";
}
else if(siteName.split("LIMEROAD").length>1){
   pos = 424;
   cur_site = "Limeroad";
}
else if(siteName.split("ZOVI").length>1){
   pos = 425;
   cur_site = "Zovi";
}
else if(siteName.split("BLUESTONE").length>1){
   pos = 426;
   cur_site = "BlueStone";
}
else if(siteName.split("VOYLLA").length>1){
   pos = 427;
   cur_site = "Voylla";
}
else if(siteName.split("CHUMBAK").length>1){
   pos = 902;
   cur_site = "Chumbak";
}
else if(siteName.split("DONEBYNONE").length>1){
   pos = 428;
   cur_site = "DoneByNone";
}
else if(siteName.split("ZIVAME").length>1){
   pos = 429;
   cur_site = "Zivame";
}
else if(siteName.split("N-GAL").length>1){
   pos = 430;
   cur_site = "N-Gal";
}
else if(siteName.split("PRETTYSECRETS").length>1){
   pos = 433;
   cur_site = "Pretty Secrets";
}
else if(siteName.split("MIRRAW").length>1){
   pos = 435;
   cur_site = "Mirraw";
}
else if(siteName.split("INDIAEMP").length>1){
   pos = 439;
   cur_site = "India Emporium";
}
else if(siteName.split("UREAD").length>1){
   pos = 1580;
   cur_site = "Uread";
}
else if(siteName.split("ACADZONE").length>1){
   pos = 1585;
   cur_site = "Acadzone";
}
else if(siteName.split("FLORALIS").length>1){
   pos = 91;
   cur_site = "Floralis";
}
else if(siteName.split("GOODLIFE").length>1){
   pos = 1586;
   cur_site = "Goodlife";
}
else if(siteName.split("NAAPTOL").length>1){
   pos = 441;
   cur_site = "Naaptol";
}
else if(siteName.split("CILORY").length>1){
   pos = 469;
   cur_site = "Cilory";
} 
else if(siteName.split("CROSSWORD").length>1){
   pos = 471;
   cur_site = "Crossword";
}
else if(siteName.split("FREECULTR").length>1){
   pos = 901;
   cur_site = "Freecultr";
}
else if(siteName.split("HEALTHKART").length>1){
   pos = 921;
   cur_site = "Healthkart";
}
else if(siteName.split("MANIACSTORE").length>1){
   pos = 999;
   cur_site = "ManiacStore";
}
else if(siteName.split("FABFURNISH").length>1){
   pos = 1000;
   cur_site = "Fabfurnish";
}
else if(siteName.split("YAPAA").length>1){
   pos = 1002;
   cur_site = "Yapaa";
}
else if(siteName.split("HEALTHGENIE").length>1){
   pos = 1068;
   cur_site = "HealthGenie";
}
else if(siteName.split("LANDMARK").length>1){
   pos = 7;
   cur_site = "Landmark";
}
else if(siteName.split("YEPME").length>1){
   pos = 1130;
   cur_site = "Yepme";
}
else if(siteName.split("INDIANROOTS").length>1){
   pos = 1175;
   cur_site = "Indian Roots";
}
else if(siteName.split("UTSAV").length>1){
   pos = 1176;
   cur_site = "Utsav Fashiona";
}
else if(siteName.split("BAGIT").length>1){
   pos = 1177;
   cur_site = "Bag It Today";
}
else if(siteName.split("FABALLEY").length>1){
   pos = 1179;
   cur_site = "FabAlley";
}
else if(siteName.split("STARCJ").length>1){
   pos = 1180;
   cur_site = "StarCJ";
}
else if(siteName.split("BHARATPLAZA").length>1){
   pos = 1181;
   cur_site = "BharatPlaza";
}
else if(siteName.split("MAKEMYTRIP").length>1){
   pos = 1288;
   cur_site = "MakeMyTrip";
}
else if(siteName.split("CLEARTRIP").length>1){
   pos = 1289;
   cur_site = "Cleartrip";
}
else if(siteName.split("REDBUS").length>1){
   pos = 1290;
   cur_site = "Redbus";
}
else if(siteName.split("TRAVELGURU").length>1){
   pos = 1291;
   cur_site = "Travelguru";
}
else if(siteName.split("TICKETGOOSE").length>1){
   pos = 1292;
   cur_site = "TicketGoose";
}
else if(siteName.split("YATRA").length>1){
   pos = 1293;
   cur_site = "Yatra";
}
else if(siteName.split("GOIBIBO").length>1){
   pos = 1294;
   cur_site = "Goibibo";
}
else if(siteName.split("EXPEDIA").length>1){
   pos = 1295;
   cur_site = "Expedia";
}
else if(siteName.split("MUSAFIR").length>1){
   pos = 1296;
   cur_site = "Musafir";
}
else if(siteName.split("PAYTMMALL").length>1){
   pos = 1331;
   cur_site = "Paytmmall";
}
else if(siteName.split("PAYTM").length>1){
   pos = 1331;
   cur_site = "Paytm";
}
else if(siteName.split("FREECHARGE").length>1){
   pos = 1348;
   cur_site = "Freecharge";
}
else if(siteName.split("AMERICANSWAN").length>1){
   pos = 1556;
   cur_site = "American swan";
}
else if(siteName.split("BASICSLIFE").length>1){
   pos = 1578;
   cur_site = "BasicsLife";
}
else if(siteName.split("ZOOMIN").length>1){
   pos = 1005;
   cur_site = "Zoomin";
}
else if(siteName.split("STRAPSANDSTRING").length>1){
   pos = 432;
   cur_site = "Strapsandstring";
}
else if(siteName.split("BOOKADDA").length>1){
   pos = 31;
   cur_site = "Bookadda";
}
else if(siteName.split("FNP").length>1){
   pos = 11;
   cur_site = "FNP";
}
else if(siteName.split("BABYOYE").length>1){
   pos = 929;
   cur_site = "Babyoye";
}
else if(siteName.split("FOODPANDA").length>1){
   pos = 1349;
   cur_site = "Foodpanda";
}
else if(siteName.split("TASTYKHANA").length>1){
   pos = 1350;
   cur_site = "TastyKhana";
}
else if(siteName.split("JUSTEAT").length>1){
   pos = 1351;
   cur_site = "JustEat";
}
else if(siteName.split("DOMINOS").length>1){
   pos = 1352;
   cur_site = "Dominos";
}
else if(siteName.split("PIZZAHUT").length>1){
   pos = 1353;
   cur_site = "Pizzahut";
}
//new sites added
else if(siteName.split("GREENDUST").length>1){
   pos = 1052;
   cur_site = "GREENDUST";
}
else if(siteName.split("ZOFFIO").length>1){
   pos = 1094;
   cur_site = "ZOFFIO";
}
else if(siteName.split("GOBOL").length>1){
   pos = 1027;
   cur_site = "GOBOL";
}
else if(siteName.split("SOCKTAIL").length>1){
   pos = 1239;
   cur_site = "SOCKTAIL";
}
else if(siteName.split("KOMASTORE").length>1){
   pos = 1559;
   cur_site = "KOMASTORE";
}
else if(siteName.split("FLOWERAURA").length>1){
   pos = 1143;
   cur_site = "FLOWERAURA";
}
else if(siteName.split("GIFTSBYMEETA").length>1){
   pos = 1584;
   cur_site = "GIFTSBYMEETA";
}
else if(siteName.split("SYBERPLACE").length>1){
   pos = 1174;
   cur_site = "SYBERPLACE";
}
else if(siteName.split("BLISSBASKET").length>1){
   pos = 1119;
   cur_site = "BLISSBASKET";
}
else if(siteName.split("JABRAAT").length>1){
   pos = 1145;
   cur_site = "JABRAAT";
}
else if(siteName.split("PORTAMART").length>1){
   pos = 1087;
   cur_site = "PORTAMART";
}
else if(siteName.split("POSTERGUY").length>1){
   pos = 1212;
   cur_site = "POSTERGUY";
}
else if(siteName.split("PRINTSASIA").length>1){
   pos = 1054;
   cur_site = "PRINTSASIA";
}
else if(siteName.split("SHOPBYCHOICE").length>1){
   pos = 1022;
   cur_site = "SHOPBYCHOICE";
}
else if(siteName.split("SSSCART").length>1){
   pos = 1045;
   cur_site = "SSSCART";
}
else if(siteName.split("STORE503").length>1){
   pos = 1121;
   cur_site = "STORE503";
}
else if(siteName.split("ZOOOMBERG").length>1){
   pos = 1226;
   cur_site = "ZOOOMBERG";
}
else if(siteName.split("ORDERVENUE").length>1){
   pos = 1218;
   cur_site = "ORDERVENUE";
}
else if(siteName.split("URBANDAZZLE").length>1){
   pos = 1062;
   cur_site = "URBANDAZZLE";
}
else if(siteName.split("BIGROCK").length>1){
   pos = 21;
   cur_site = "BIGROCK";
}
else if(siteName.split("FASHIONANDYOU").length>1){
   pos = 1819;
   cur_site = "FASHIONANDYOU";
}
else if(siteName.split("ELITIFY").length>1){
   pos = 1223;
   cur_site = "ELITIFY";
}
else if(siteName.split("MOBIKWIK").length>1){
   pos = 1820;
   cur_site = "MOBIKWIK";
}
else if(siteName.split("TINYOWL").length>1){
   pos = 1821;
   cur_site = "TINYOWL";
}
else if(siteName.split("SWIGGY").length>1){
   pos = 1822;
   cur_site = "SWIGGY";
}
else if(siteName.split("KFC").length>1){
   pos = 1823;
   cur_site = "KFC";
}
else if(siteName.split("PAPAJOHNS").length>1){
   pos = 1824;
   cur_site = "PAPAJOHNS";
}
else if(siteName.split("STALKBUYLOVE").length>1){
   pos = 1825;
   cur_site = "STALKBUYLOVE";
}
else if(siteName.split("VOXPOP").length>1){
   pos = 1826;
   cur_site = "VOXPOP";
}
else if(siteName.split("URBANLADDER").length>1){
   pos = 1827;
   cur_site = "URBANLADDER";
}
else if(siteName.split("ASKMEBAZAAR").length>1){
   pos = 1828;
   cur_site = "ASKMEBAZAAR";
}
else if(siteName.split("BOOKMYSHOW").length>1){
   pos = 1829;
   cur_site = "BOOKMYSHOW";
}
else if(siteName.split("NYKAA").length>1){
   pos = 1830;
   cur_site = "NYKAA";
}
else if(siteName.split("CLOVIA").length>1){
   pos = 1973;
   cur_site = "CLOVIA";
}
else if(siteName.split("MEBEL").length>1){
   pos = 1972;
   cur_site = "MEBELKART";
}
else if(siteName.split("ABOF").length>1){
   pos = 1850;
   cur_site = "ABOF";
}
else if(siteName.split("TRENDIN.").length>1){
   pos = 431;
   cur_site = "Trendin";
}
return pos;
}

function _isEmpty(str){
   if((str == 'null')||(str == null)||(str == '')||(typeof (str) == 'undefined'))
      return true;
   return false;
}

function _toggle(d){
   if(d=='l')
      return 'r';
   return 'l';
}

function pop(msg, status){
   
   if (typeof(status) == 'undefined'){
      status = 1;
   }
   
   var imgLogo = chrome.extension.getURL("logo.png");
   $('#hc-p-logo').html('<img src="'+imgLogo+'" width="64px">');
   $('#hc-p-msg').html(msg);
   $('#hc-p-wrap').removeClass('status-0 status-1').addClass('status-'+status);
   $('#hc-pop-alert').fadeIn();
   
   setTimeout(function(){ 
      $('#hc-pop-alert').fadeOut();
   }, 4000);
}

sidebar = {
   total: 0,
   coupons: 0,
   show: function(){
      $('.hatke-coupons_list-main').addClass('hatke-coupons-sidebar-open');
   },

   hide: function(){
      $('.hatke-coupons_list-main').removeClass('hatke-coupons-sidebar-open');
   },

   generator: {
      code_wrapper: function(coupons,type){
         var coupon_list_html='';
         if(!isNaN(coupons.length)){
            sidebar.total += parseInt(coupons.length);
         }
         
         jQuery.each(coupons, function(){
            coupon_list_html += (type == 'exclusive') ? sidebar.generator.exclusive_coupon_item(this) : sidebar.generator.coupon_item(this);
         });
         return coupon_list_html;
      },

      exclusive_coupon_item: function(coupon){
         var coupon_item_html = '', expBtn, isDeal = (coupon.code == "NO CODE REQUIRED");
         if(!isDeal) sidebar.coupons += 1;
         coupon_item_html += '<li class="hc-li hc-exclusive ';
         coupon_item_html += (isDeal) ? 'isDeal' : '';
         coupon_item_html += '" id="code-'+coupon.codeId+'">'
         coupon_item_html += '<a href="'+coupon.link+'" target="_blank" class="hc-li-deal">';
         coupon_item_html += '<div class="hc-li-wrap">';
         coupon_item_html += (_isEmpty(coupon.desc)) ? '' : '<div class="hc-detail">'+coupon.desc+'</div>';
         coupon_item_html += (isDeal) ? '' : '</a>';
         coupon_item_html += '<input type="text" rel="'+coupon.codeId+'" style="background:rgb(35, 181, 116) !important;" class="hc-code" value="'+coupon.code+'" readonly="true"/></a>'; //'<div class="hc-code"><span>'+coupon.code+'</span></div>';
         coupon_item_html += (isDeal) ? '</a>' : '';
         coupon_item_html += '<div class="hc-add"><div class="hc-add-det">';
         
         if(_isEmpty(coupon.category))
            coupon_item_html += '<div class="det-row"><span>Valid on: </span><span class="det-validOn">N.A.</span></div>';
         else
            coupon_item_html +=  '<div class="det-row" title="'+coupon.category+'"><span>Valid on: </span><span class="det-validOn">'+coupon.category+'</span></div>';

         coupon_item_html += '<div class="det-row"><span>Valid Till: </span><span class="det-validTill">';
         
         if(coupon.valid_till == "0000-00-00 00:00:00"){
            coupon_item_html += 'N.A.';
         }else{
            coupon_item_html +=  new Date(coupon.valid_till).toDateString();
         }
         
//'<svg><use xlink:href="#ex-code"></use></svg>'
coupon_item_html += '</span></div></div><div class="hc-add-act"><svg><use xlink:href="#ex-buyh"></use></svg></div></div><div class="hc-com"><span class="hc-com-vc">EXCLUSIVELY PICKED FOR YOU</span></div></a></li>';
return coupon_item_html;                        
},

coupon_item: function(coupon){
   if(coupon.exflag == 1) {
   //   console.log(coupon);
}
var coupon_item_html = '', expBtn, isDeal = (coupon.code == "NO CODE REQUIRED");
if(!isDeal) sidebar.coupons += 1;
coupon_item_html += '<li class="hc-li ';
coupon_item_html += (coupon.exflag == 1) ? 'hc-buyh ' : 'hc-general ';
coupon_item_html += (isDeal) ? 'isDeal' : '';
coupon_item_html += '" id="code-'+coupon.codeId+'">';
coupon_item_html += (coupon.exflag == 1) ? '<div  class="hc-buyh-ribbon" title="Exclusive for Buyhatke users"><svg><use xlink:href="#ex-buyh"></use></svg></div>' : '';
coupon_item_html += '<a href="'+coupon.link+'" target="_blank" class="hc-li-deal">';
coupon_item_html += '<div class="hc-li-wrap">';
coupon_item_html += (_isEmpty(coupon.desc)) ? '' : '<div class="hc-detail">'+coupon.desc+'</div>';
coupon_item_html += (isDeal) ? '' : '</a>';
         coupon_item_html += '<input type="text" class="hc-code" style="background:rgb(35, 181, 116) !important;" value="'+coupon.code+'" readonly="true"/></a>'; //'<div class="hc-code"><span>'+coupon.code+'</span></div>';
         coupon_item_html += (isDeal) ? '</a>' : '';
         coupon_item_html += '<div class="hc-add"><div class="hc-add-det">';
         
         if(_isEmpty(coupon.category))
            coupon_item_html += '<div class="det-row"><span>Valid on: </span><span class="det-validOn">N.A.</span></div>';
         else
            coupon_item_html +=  '<div class="det-row" title="'+coupon.category+'"><span>Valid on: </span><span class="det-validOn">'+coupon.category+'</span></div>';

         coupon_item_html += '<div class="det-row"><span>Valid Till: </span><span class="det-validTill">';
         
         if(coupon.valid_till == "0000-00-00 00:00:00"){
            coupon_item_html += 'N.A.';
         }else{
            coupon_item_html +=  new Date(coupon.valid_till).toDateString();
         }
         

         coupon_item_html += '</span></div></div><div class="hc-add-act" rel="'+coupon.codeId+'"';
         coupon_item_html += (coupon.exflag == 1) ? ' data-type="exbuyh"' : ' data-type="general"';
         coupon_item_html += '>';

         expBtn = (coupon.eflag) ? '#cpnExp-active' : '#cpnExp';
         expClass = (coupon.eflag) ? 'markedExp' : 'markExp';

         if(coupon.lflag == "1"){
            coupon_item_html += '<div class="act-btn vote-up"><svg><use class="act-btn-up" xlink:href="#codeUp-active"></use></svg><span class="vote-counter">' + coupon.upvotes + '</span></div>'
            + '<div class="act-btn vote-down"><svg><use class="act-btn-down" xlink:href="#codeDown"></use></svg><span class="vote-counter">'+ coupon.downvotes + '</span></div>'
            + '<div class="act-btn '+expClass+'"><svg><use class="act-btn-exp" xlink:href="'+expBtn+'"></use></svg></div>';
         }else if(coupon.lflag == "0"){
            coupon_item_html += '<div class="act-btn vote-up"><svg><use class="act-btn-up" xlink:href="#codeUp"></use></svg><span class="vote-counter">' + coupon.upvotes + '</span></div>'
            + '<div class="act-btn vote-down"><svg><use class="act-btn-down" xlink:href="#codeDown-active"></use></svg><span class="vote-counter">'+ coupon.downvotes + '</span></div>'
            + '<div class="act-btn '+expClass+'"><svg><use class="act-btn-exp" xlink:href="'+expBtn+'"></use></svg></div>';
         }else{
            coupon_item_html += '<div class="act-btn vote-up"><svg><use class="act-btn-up" xlink:href="#codeUp"></use></svg><span class="vote-counter">' + coupon.upvotes + '</span></div>'
            + '<div class="act-btn vote-down"><svg><use class="act-btn-down" xlink:href="#codeDown"></use></svg><span class="vote-counter">'+ coupon.downvotes + '</span></div>'
            + '<div class="act-btn '+expClass+'"><svg><use class="act-btn-exp" xlink:href="'+expBtn+'"></use></svg></div>';
         }

         coupon_item_html += '</div></div><div class="hc-com"><span class="hc-com-hc">close</span><span class="hc-com-vc" id="hc-com-vc-'+coupon.codeId+'" rel="'+coupon.codeId+'"';
         coupon_item_html += (coupon.exflag == 1) ? ' data-type="exbuyh"' : ' data-type="general"';
         coupon_item_html += '>VIEW COMMENTS ('+coupon.commentCount+')</span><div class="hc-com-wrap"></div></div></div></li>';
         return coupon_item_html;                        
      },

      comment_item: function(comment, exflag, direction){
         var comment_html = '', cu_icn = '', cd_icn = '';
         
         if(comment.lflag == "1"){
            cu_icn = '#comUp-active';
            cd_icn = '#comDown';
         }else if(comment.lflag == "0"){
            cu_icn = '#comUp';
            cd_icn = '#comDown-active';
         }else{         
            cu_icn = '#comUp'; 
            cd_icn = '#comDown';
         }

         comment_html +=    '<div class="com com-'+direction+'"><div class="com-head"><svg><use xlink:href="#usr-'+direction+'"></use></svg>';
         comment_html += '<div class="com-act" rel="'+comment.commentId+'"';
         comment_html += (exflag == 1) ? 'data-type="exbuyh"' : 'data-type="general"';
         comment_html += '><div class="com-act-btn vote-up"><svg><use xlink:href="'+cu_icn+'"></use></svg><span class="vote-counter">'+comment.upvotes+'</span></div>'
         +'<div class="com-act-btn vote-down"><svg><use xlink:href="'+cd_icn+'"></use></svg><span class="vote-counter">'+comment.downvotes+'</span></div>'
         +'</div></div><div class="com-c"><span class="com-c-id">USER_'+comment.uid+'</span>'+comment.comment+'</div></div>';

         return comment_html;                   
      }
   }
};

function getExCode(ele,cid){
   makeRequest(function(response){
      res = jQuery.parseJSON(response);
      if(res.status){
         ele.val(res.code).select();
      }else{
         pop(res.msg, res.status);
      }
   }, JSON.stringify([{ 'cID': cid }]),'getExCode2.php');
}


function rec1(data){
  // console.log(data);
}

alreadyFetchedCoupons = 0;
/*

ListenerFile = [];

function makeRequest(funcName, jsonArray, fileName){
  var cur_pos = getCurrentPosition(window.location.href);
  var strToSend = jsonArray + "~*" + cur_pos + "~*" + fileName;
  //alert(strToSend);
  chrome.runtime.sendMessage({getCouponsData: strToSend}, function(response) {
   });
   if(typeof(ListenerFile[fileName]) == 'undefined'){
      chrome.runtime.onMessage.addListener(
         function(request, sender) {
           mytext = request.dataBack;
           var chString = fileName + "~*~file_";
           if(mytext.split(fileName + "~*~file_").length>1){
             funcName(mytext.split(fileName + "~*~file_")[1]);
             chrome.runtime.onMessage.removeListener();
           }
      });
      ListenerFile[fileName] = true;
   }
}
*/

function makeRequest(funcName, jsonArray, fileName){
   var cur_pos = getCurrentPosition(window.location.href);
   var strToSend = jsonArray + "~*" + cur_pos + "~*" + fileName;
   //alert(strToSend);

   var port = chrome.runtime.connect({name: "couponsPayloadData"});
   port.postMessage({couponsPayloadData: strToSend});
   port.onMessage.addListener(function(data){
      funcName(data.dataBack);
      port.onMessage.removeListener();
   });
}


function addCoupons(data){

   if(alreadyFetchedCoupons) return;
   
   var coupons_html = '';

   if (data == 0){
      document.getElementById('currentStatus').innerHTML = 'NO COUPONS FOUND';
      coupons_html = '<span style="font-family: monospace; font-size: 10rem; color: #ccc; display: block;margin: 3rem 0 3rem 2rem; transform: rotate(90deg);">:(</span>'
      + '<span style="font-size: 0.8rem; display: block;margin: 3rem 1rem;">Looks like we returned empty handed. If you have some, you can always share with us :)</span>';
   }else{
      coupons = jQuery.parseJSON(data);
      
      if(coupons.exCodes != 0) coupons_html += sidebar.generator.code_wrapper(coupons.exCodes, 'exclusive');
      if(coupons.codes != 0) coupons_html += sidebar.generator.code_wrapper(coupons.codes, 'general');
      
      document.getElementById('currentStatus').innerHTML = '<span style="width: 100px">ALL ('+sidebar.total+')</span>'
      + '<span style="width: 50px"><div class="hc-tog-switch"><input id="anc-toggle" class="hc-tog hc-tog-round" type="checkbox"><label for="anc-toggle"></label></div></span>'
      + '<span style="width: 120px">COUPONS ('+sidebar.coupons+')</span>';
   }

   alreadyFetchedCoupons = 1;
   document.getElementById('toAddCouponsHere').innerHTML = coupons_html;

   $(".hc-li .hc-com-vc").click(function(){
      showComments($(this).attr("rel"), $(this).attr("data-type"));
   });

   $(".hc-li-deal").click(function(){
      var jsonArr = [{'dp': window.location.hostname + '-dealsORcoupClicked'}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(0, jsonArr, 0, doNothing, []);
   });

   $(".hc-li .hc-com-hc").click(function(){
      $(this).parent().removeClass("showCom");
   });

   $('.hc-general .hc-code').click(function(){
      $(this).select();
   });

   $('.hc-buyh .hc-code').click(function(){
      $(this).select();
   });

   $('.hc-exclusive .hc-code').click(function(){
      getExCode($(this), $(this).attr('rel'));
   });

   $('.act-btn').click(function(){
      if($(this).hasClass('vote-up'))
         likeCode(1,$(this));
      if($(this).hasClass('vote-down'))
         likeCode(0,$(this));
      if($(this).hasClass('markExp'))
         markExpire($(this));
   });

   $('#anc-toggle').click(function(){
    if($('#anc-toggle').is(':checked')){
       $('.isDeal').hide();
    }else{
       $('.isDeal').show();
    }
 });
}

function addComments(data){
   var comments_html = '', lastID=0, d='r';
   //console.log('data received ::' + data);
   comm = jQuery.parseJSON(data);
   codeId = comm.codeId;
   exflag = comm.exflag;
   if (comm.comments == 0){
      comments_html += '<hr/><div class="hc-com-cont"><svg class="no-com"><use xlink:href="#no-comments"></use></svg>'
      + '<span class="no-com-txt">No Comments yet. Use the text box below to add comments.</span>';
   }else{
      comments_html = '<hr/><span class="hc-com-comments">COMMENTS:</span><div class="hc-com-cont">';
      jQuery.each(comm.comments, function(){
         if(this.uflag){
            d= 'r';
         }else if(lastID != this.uid){
            d=_toggle(d);
         }               
         comments_html += sidebar.generator.comment_item(this,exflag, d);
         lastID = this.uid;
      });
   }

   comments_html += '</div>';
   comments_html += '<div class="hc-com-add"><div class="hc-com-add-cell cell-txt"><textarea id="hc-com-add-txt-'+codeId+'" class="hc-com-add-txt"></textarea></div>'
   + '<div class="hc-com-add-cell cell-btn"><div class="hc-com-add-sub" id="hc-com-add-txt-'+codeId+'" rel="'+codeId+'" ';
   comments_html += (exflag == 1) ? ' data-type="exbuyh"' : ' data-type="general"';
   comments_html += '></div></div></div>';
   

   $('#code-'+codeId+' .hc-com-wrap').html(comments_html);
   $('#code-'+codeId+' .hc-com').addClass('showCom');
   
   $('.hc-com-add-sub').click(function(){
      submitComment($(this));
   });

   $('.com-act-btn').click(function(){
      if($(this).hasClass('vote-up'))
         likeComment(1,$(this));
      if($(this).hasClass('vote-down'))
         likeComment(0,$(this));
   });

}

function showComments(cid, type){
   var exflag = (type == 'exbuyh') ? 1 : 0;
   var jsonArr = [{'cID': cid, 'exflag': exflag}];
   jsonArr = JSON.stringify(jsonArr);
   
   makeRequest(addComments, jsonArr, 'getComment.php');
   //console.log('asking for comments :: '+ exflag);
}

function submitComment(this_ele){
   codeId = this_ele.attr('rel'); 
   exflag = (this_ele.attr('data-type') == 'exbuyh') ? 1 : 0;
   var jsonArr = [{'cID': codeId, 'uComm': $('#hc-com-add-txt-'+codeId).val(), 'exflag': exflag}];
   jsonArr = JSON.stringify(jsonArr);
   //console.log(jsonArr);
   makeRequest(function(response){
      if(typeof(response) == 'undefined'){
         pop('Connection Issues. Please try again.',0);
      }else{
         response = jQuery.parseJSON(response);
         if(response.status){
            
            var comment = {
               commentId: response.commentID,
               uid: response.uid,
               comment: $('#hc-com-add-txt-'+codeId).val(),
               upvotes: 0,
               downvotes: 0,
               netvotes: 0,
               dos: new Date().toDateString(),
               lflag: 'none',
               exflag: response.exflag
            };
            
            var comment_html = sidebar.generator.comment_item(comment, response.exflag, 'r');
            $('#hc-com-add-txt-'+codeId).val('');
            if(this_ele.parent().parent().siblings('.hc-com-cont').find('.no-com').length){
               this_ele.parent().parent().siblings('.hc-com-cont').html(comment_html);
            }else{
               this_ele.parent().parent().siblings('.hc-com-cont').append(comment_html);
            }
            reg = /\((\d+)\)/;
            str = $('#hc-com-vc-'+codeId).text();
            r = reg.exec(str);
            if(r) $('#hc-com-vc-'+codeId).html('VIEW COMMENTS ('+ (parseInt(r[1]) + 1) +')');
         }else{
            pop(response.msg, response.status);
         }
      }
   },jsonArr, 'sendComment.php');
}

function submitCode(){
   
   if(!_isEmpty($('#hc-code-txt').val())){
      
      var jsonArr = [{'code': $('#hc-code-txt').val()}];
      jsonArr = JSON.stringify(jsonArr);

      makeRequest(submitedCode, jsonArr, 'addCoupon.php');
   }else{
      pop('Empty');
   }
}

function submitedCode(data){
   if(typeof(data)== 'undefined'){
      pop("Something's not right");
      return;
   }
   var response = jQuery.parseJSON(data);
   if(response.status){
      $('#hc-code-txt').val('');
      pop(response.msg, response.status);
   }else{
      pop(response.msg, response.status);
   }
}

function likeCode(lflag, this_ele){
   codeId = this_ele.parent().attr('rel');
   exflag = (this_ele.parent().attr('data-type') == 'exbuyh') ? 1 : 0;
   var jsonArr = JSON.stringify([{'cID': codeId, 'lflag': lflag, 'exflag': exflag }]);
   makeRequest(function(response){
      if(typeof(response) == 'undefined'){
         pop('Connection Issues. Please try again.',0);
      }else{
         response = jQuery.parseJSON(response);
         var uc, dc;
         if(response.status){
            if(response.isNew){
               if(lflag){
                  this_ele.parent().find('.vote-down svg use').attr('xlink:href','#codeDown');
                  this_ele.find('use').attr('xlink:href','#codeUp-active');
                  uc = this_ele.find('.vote-counter').html();
                  uc = parseInt(uc) + 1;
                  this_ele.find('.vote-counter').html(uc);
               }else{
                  this_ele.parent().find('.vote-up svg use').attr('xlink:href','#codeUp');
                  this_ele.find('use').attr('xlink:href','#codeDown-active');
                  dc = this_ele.find('.vote-counter').html();
                  dc = parseInt(dc) + 1;
                  this_ele.find('.vote-counter').html(dc);
               }   
            }else if(response.changed){
               if(lflag){
                  this_ele.parent().find('.vote-down svg use').attr('xlink:href','#codeDown');
                  this_ele.find('use').attr('xlink:href','#codeUp-active');
                  uc = this_ele.find('.vote-counter').html();
                  dc = this_ele.parent().find('.vote-down').find('.vote-counter').html();
                  uc = parseInt(uc) + 1;
                  dc = dc - 1;
                  this_ele.find('.vote-counter').html(uc);
                  this_ele.parent().find('.vote-down').find('.vote-counter').html(dc);
               }else{
                  this_ele.parent().find('.vote-up svg use').attr('xlink:href','#codeUp');
                  this_ele.find('use').attr('xlink:href','#codeDown-active');
                  dc = this_ele.find('.vote-counter').html();
                  uc = this_ele.parent().find('.vote-up').find('.vote-counter').html();
                  dc = parseInt(dc) + 1;
                  uc = uc - 1;
                  this_ele.find('.vote-counter').html(dc);
                  this_ele.parent().find('.vote-up').find('.vote-counter').html(uc);
               }   
            }
         }else{
            pop(response.msg, response.status);
         }
      }
   },jsonArr, 'likeDislike.php');
}

function likeComment(lflag, this_ele){
   commId = this_ele.parent().attr('rel');
   exflag = (this_ele.parent().attr('data-type') == 'exbuyh') ? 1 : 0;
   var jsonArr = JSON.stringify([{'cID': commId, 'lflag': lflag, 'exflag': exflag}]);
   makeRequest(function(response){
      if(typeof(response) == 'undefined'){
         pop('Connection Issues. Please try again.',0);
      }else{
         response = jQuery.parseJSON(response);
         var uc, dc;
         if(response.status){
            if(response.isNew){
               if(lflag){
                  this_ele.parent().find('.vote-down svg use').attr('xlink:href','#comDown');
                  this_ele.find('use').attr('xlink:href','#comUp-active');
                  uc = this_ele.find('.vote-counter').html();
                  uc = parseInt(uc) + 1;
                  this_ele.find('.vote-counter').html(uc);
               }else{
                  this_ele.parent().find('.vote-up svg use').attr('xlink:href','#comUp');
                  this_ele.find('use').attr('xlink:href','#comDown-active');
                  dc = this_ele.find('.vote-counter').html();
                  dc = parseInt(dc) + 1;
                  this_ele.find('.vote-counter').html(dc);
               }   
            }else if(response.changed){
               if(lflag){
                  this_ele.parent().find('.vote-down svg use').attr('xlink:href','#comDown');
                  this_ele.find('use').attr('xlink:href','#comUp-active');
                  uc = this_ele.find('.vote-counter').html();
                  dc = this_ele.parent().find('.vote-down').find('.vote-counter').html();
                  uc = parseInt(uc) + 1;
                  dc = dc - 1;
                  this_ele.find('.vote-counter').html(uc);
                  this_ele.parent().find('.vote-down').find('.vote-counter').html(dc);
               }else{
                  this_ele.parent().find('.vote-up svg use').attr('xlink:href','#comUp');
                  this_ele.find('use').attr('xlink:href','#comDown-active');
                  dc = this_ele.find('.vote-counter').html();
                  uc = this_ele.parent().find('.vote-up').find('.vote-counter').html();
                  dc = parseInt(dc) + 1;
                  uc = uc - 1;
                  this_ele.find('.vote-counter').html(dc);
                  this_ele.parent().find('.vote-up').find('.vote-counter').html(uc);
               }   
            }
         }else{
            pop(response.msg, response.status);
         }
      }
   },jsonArr, 'likeComment.php');
}

function markExpire(this_ele){
   codeId = this_ele.parent().attr('rel');
   exflag = (this_ele.parent().attr('data-type') == 'exbuyh') ? 1 : 0;

   var jsonArr = JSON.stringify([{'cID': codeId, 'exflag': exflag }]);
   makeRequest(function(response){
      if(typeof(response) == 'undefined'){
         pop('Connection Issues. Please try again.',0);
      }else{
         response = jQuery.parseJSON(response);
         if(response.status){
            this_ele.find('use').attr('xlink:href','#cpnExp-active');
         }
         pop(response.msg, response.status);
      }
   },jsonArr, 'markExp.php');
}

function toggleShow(){
 if(!($('.hatke-coupons_list-main').hasClass('hatke-coupons-sidebar-open'))){
  sidebar.show();
}
else {
  sidebar.hide();
  var jsonArr = [{'dp': window.location.hostname + '-cpnSideBar-closed'}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(0, jsonArr, 0, doNothing, []);

}
}


var pos = getCurrentPosition(window.location.href);
// console.log("Pos is " + pos);
// if(pos !=0){
//    $('body').append('<div id="killerDIV"></div>');   
//    $('#killerDIV').load(chrome.extension.getURL("coupons-sidebar.html"));
//    //console.log("tried adding killerDiv");
// }

function initialize(){

 if(document.getElementById("hc-toggle") != null){

  var cur_pos = getCurrentPosition(window.location.href);
    //console.log("Current pos " + cur_pos);
    if(cur_pos!=0){
     // console.log("Entered inside");
     document.getElementById('titleChange').innerHTML = (cur_site + " Coupons");
     document.getElementsByClassName('hc-code-sub')[0].innerHTML = ("ADD " + cur_site.toUpperCase() + " COUPONS");


     $('#changeImage').attr("src", chrome.extension.getURL("sidebar-toggler.png"));
     makeRequest(function(response){
      try{
         var res = jQuery.parseJSON(response);
         if(res.exclusive > 0){
            $('#changeImage').attr("src", chrome.extension.getURL("sidebar-exclusive.png"));
            $('#changeImage').attr("title", res.exclusive + ' exclusive coupons along with ' + res.normal + ' other offers for you');
         }else{
            $('#changeImage').attr("src", chrome.extension.getURL("sidebar-toggler.png"));
            $('#changeImage').attr("title", res.normal + ' coupons and deals found');
         }
      }catch(err){
      }
   },JSON.stringify([]),'exclusiveAPI.php');

     $('#hc-toggle').click(function(){
      if(alreadyFetchedCoupons==0){
       // console.log("Clicked coupons fetch");
       var cur_pos = getCurrentPosition(window.location.href);
       var fileName = "getCode.php";
       var jsonArray = [];
       jsonArray = JSON.stringify(jsonArray);
       makeRequest(addCoupons, jsonArray, fileName);
       var jsonArr = [{'dp': window.location.hostname + '-cpnSideBar-opened'}];
       jsonArr = JSON.stringify(jsonArr);
       sendMessage(0, jsonArr, 0, doNothing, []);
       // console.log("request made");
       //tracer
       tracer(1,3);
       setTimeout(function(){if(JSON.parse(features_json)[3]==0){ft(3);}},100);
    }
    toggleShow();
 });

     

     $('.hc-close').click(function(){
      sidebar.hide();
      var jsonArr = [{'dp': window.location.hostname + '-cpnSideBar-closed'}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(0, jsonArr, 0, doNothing, []);
   });

   //  $('.hc-code-sub').click(function(){
   //    submitCode();
   // });
   $('#hc-p-close').click(function(){
      $('#hc-pop-alert').hide();
   });
}
else {
 setTimeout("initialize();", 1000);
}
}
else {
 setTimeout("initialize();", 1000);
}
}

function callInitialize(){
   if(userSetting!="notYet"){
    if(userSetting[4].value==1){
        // console.log("init called finally");
        initialize();
     }
  }
  else {
     setTimeout(function(){callInitialize();}, 1000);
  }
     // console.log("Intialized Code");
  }

 // callInitialize();
