$ = jQuery.noConflict();
var f=0;
var a=0;
var p=0;
var id="";
function main () {
//  console.log("inside main");

  //console.log(addressbutton);
  if(f<100) 
  {   
   //console.log(f);
   appearbutton();
 }
}

function appearbutton()
{
  if(getCurrentPosition(window.location.href) == 1331){
    $ = jQuery.noConflict();
  }
  var addressbutton=$("#hatke--address").length;
//console.log(addressbutton);
if(parseInt(addressbutton)==1)
{
    //console.log(observer);
    //alert("bhuwan");
    observer.disconnect();
    //console.log("end");
    f=200;
  //  alert("bhuwan");
    //console.log(f);
  }
  //console.log("f="+f);
//input type text
var pin1 = $('input:text').filter(function() {return this.name.match(/([P,p][I,i][N,n][C,c][O,o][D,d][E,e])/);}).length;
var pin2 = $('input:text').filter(function() {return this.id.match(/([P,p][I,i][N,n][C,c][O,o][D,d][E,e])/);}).length;
var pin3 = $('input:text').filter(function() {return this.value.match(/([P,p][I,i][N,n][C,c][O,o][D,d][E,e])/);}).length;
var pin4 = $('input:text').filter(function() {return this.name.match(/([P,p][I,i][N,n])/);}).length;
var pin5 = $('input:text').filter(function() {return this.id.match(/([P,p][I,i][N,n])/);}).length;
var pin6 = $('input:text').filter(function() {return this.value.match(/([P,p][I,i][N,n])/);}).length;
var pin7 = $('input:text').filter(function() {return this.name.match(/([Z,z][I,i][P,p])/);}).length;
var pin8 = $('input:text').filter(function() {return this.id.match(/([Z,z][I,i][P,p])/);}).length;
var pin9 = $('input:text').filter(function() {return this.value.match(/([Z,z][I,i][P,p])/);}).length;
var pin10= $('input:text').filter(function() {return this.name.match(/([P,p][O,o][S,s][T,t][C,c][O,o][D,d][E,e])/);}).length;
var pin11= $('input:text').filter(function() {return this.id.match(/([P,p][O,o][S,s][T,t][C,c][O,o][D,d][E,e])/);}).length;
var pin12= $('input:text').filter(function() {return this.value.match(/([P,p][O,o][S,s][T,t][C,c][O,o][D,d][E,e])/);}).length;
var pin13= $('input:text').filter(function() {return this.name.match(/([P,p][O,o][S,s][T,t][A,a][L,l])/);}).length;
var pin14= $('input:text').filter(function() {return this.id.match(/([P,p][O,o][S,s][T,t][A,a][L,l])/);}).length;
var pin15= $('input:text').filter(function() {return this.value.match(/([P,p][O,o][S,s][T,t][A,a][L,l])/);}).length;
//input type tel
var pin1a = $('input[type="tel"],input[type="number"]').filter(function() {return this.name.match(/([P,p][I,i][N,n][C,c][O,o][D,d][E,e])/);}).length;
var pin2a = $('input[type="tel"],input[type="number"]').filter(function() {return this.id.match(/([P,p][I,i][N,n][C,c][O,o][D,d][E,e])/);}).length;
var pin3a = $('input[type="tel"],input[type="number"]').filter(function() {return this.value.match(/([P,p][I,i][N,n][C,c][O,o][D,d][E,e])/);}).length;
var pin4a = $('input[type="tel"],input[type="number"]').filter(function() {return this.name.match(/([P,p][I,i][N,n])/);}).length;
var pin5a = $('input[type="tel"],input[type="number"]').filter(function() {return this.id.match(/([P,p][I,i][N,n])/);}).length;
var pin6a = $('input[type="tel"],input[type="number"]').filter(function() {return this.value.match(/([P,p][I,i][N,n])/);}).length;
var pin7a = $('input[type="tel"],input[type="number"]').filter(function() {return this.name.match(/([Z,z][I,i][P,p])/);}).length;
var pin8a = $('input[type="tel"],input[type="number"]').filter(function() {return this.id.match(/([Z,z][I,i][P,p])/);}).length;
var pin9a = $('input[type="tel"],input[type="number"]').filter(function() {return this.value.match(/([Z,z][I,i][P,p])/);}).length;
var pin10a= $('input[type="tel"],input[type="number"]').filter(function() {return this.name.match(/([P,p][O,o][S,s][T,t][C,c][O,o][D,d][E,e])/);}).length;
var pin11a= $('input[type="tel"],input[type="number"]').filter(function() {return this.id.match(/([P,p][O,o][S,s][T,t][C,c][O,o][D,d][E,e])/);}).length;
var pin12a= $('input[type="tel"],input[type="number"]').filter(function() {return this.value.match(/([P,p][O,o][S,s][T,t][C,c][O,o][D,d][E,e])/);}).length;
var pin13a= $('input[type="tel"],input[type="number"]').filter(function() {return this.name.match(/([P,p][O,o][S,s][T,t][A,a][L,l])/);}).length;
var pin14a= $('input[type="tel"],input[type="number"]').filter(function() {return this.id.match(/([P,p][O,o][S,s][T,t][A,a][L,l])/);}).length;
var pin15a= $('input[type="tel"],input[type="number"]').filter(function() {return this.value.match(/([P,p][O,o][S,s][T,t][A,a][L,l])/);}).length;
//sites using angular
    //var pinangular=$("input[ng-model*='pin']").length();


//console.log(pin1a+""+pin2a+""+pin4a+""+pin5a+""+pin7a+""+pin8a+""+pin8a);
//console.log(pin11a);
var state1=$('input:text').filter(function() {return this.name.match(/([C,c][I,i][T,t][Y,y])/);}).length;
var state2=$('input:text').filter(function() {return this.id.match(/([C,c][I,i][T,t][Y,y])/);}).length;
var state3=$('input:text').filter(function() {return this.value.match(/([C,c][I,i][T,t][Y,y])/);}).length;

var city1=$('input:text').filter(function() {return this.name.match(/([C,c][I,i][T,t][Y,y])/);});
var city2=$('input:text').filter(function() {return this.name.match(/([C,c][I,i][T,t][Y,y])/);});
var city3=$('input:text').filter(function() {return this.name.match(/([C,c][I,i][T,t][Y,y])/);});

//console.log(city1.is(":visible"));
//console.log(city2.is(":visible"));
//console.log(city3.is(":visible"));

//visible
var add1v=$('input:text').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][1])/);}).is(":visible");
var add2v=$('input:text').filter(function() {return this.id.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][1])/);}).is(":visible");
var add3v=$('input:text').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][L,l][I,i][N,n][E,e][1])/);}).is(":visible");
var add4v=$('input:text').filter(function() {return this.id.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][L,l][I,i][N,n][E,e][1])/);}).is(":visible");
var add5v=$('input:text').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][L,l][I,i][N,n][E,e][2])/);}).is(":visible");
var add6v=$('input:text').filter(function() {return this.id.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][L,l][I,i][N,n][E,e][2])/);}).is(":visible");
var add7v=$('input:text').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][2])/);}).is(":visible");
var add8v=$('input:text').filter(function() {return this.id.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][2])/);}).is(":visible");
var add9v=$('input:text').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s])/);}).is(":visible");
var add10v=$('input:text').filter(function() {return this.id.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s])/);}).is(":visible");
var add11v=$('textarea').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s])/);}).is(":visible");
var add12v=$('textarea').filter(function() {return this.id.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s])/);}).is(":visible");
var add13v=$('textarea').filter(function() {return this.name.match(/([L,l][I,i][N,n][E,e])/);}).is(":visible");
var add14v=$('textarea').filter(function() {return this.id.match(/([L,l][I,i][N,n][E,e])/);}).is(":visible");
var add15v=$('input:text').filter(function() {return this.id.match(/([S,s][T,t][R,r][E,e][E,e][T,t])/);}).is(":visible");

//console.log(add1v);
//console.log(add2v);
//console.log(add3v);
//console.log(add4v);
//console.log(add5v);
//console.log(add6v);
//console.log(add7v);
//console.log(add8v);
//console.log(add9v);
//console.log(add10v);
//console.log(add11v);
//console.log(add12v);
//console.log(add13v);
//console.log(add14v);
//console.log(add1v+"-"+add2v+"-"+add3v+"-"+add4v+"-"+add5v+"-"+add6v+"-"+add7v+"-"+add8v+"-"+add9v+"-"+add10v+"-"+add11v+"-"+add12v+"-"+add13v+"-"+add14v);
if(add1v==true||add2v==true||add3v==true||add4v==true||add5v==true||add6v==true||add7v==true||add8v==true||add9v==true||add10v==true||add11v==true||add12v==true||add13v==true||add14v==true||add15v==true)
{
  var toshow=1;
  
}
else
{
  var toshow=0;
}


//


var add1=$('input:text').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][1])/);}).length;
var add2=$('input:text').filter(function() {return this.id.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][1])/);}).length;
var add3=$('input:text').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][L,l][I,i][N,n][E,e][1])/);}).length;
var add4=$('input:text').filter(function() {return this.id.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][L,l][I,i][N,n][E,e][1])/);}).length;
var add5=$('input:text').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][L,l][I,i][N,n][E,e][2])/);}).length;
var add6=$('input:text').filter(function() {return this.id.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][L,l][I,i][N,n][E,e][2])/);}).length;
var add7=$('input:text').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][2])/);}).length;
var add8=$('input:text').filter(function() {return this.id.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s][2])/);}).length;
var add9=$('input:text').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s])/);}).length;
var add10=$('input:text').filter(function() {return this.id.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s])/);}).length;
var add11=$('textarea').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s])/);}).length;
var add12=$('textarea').filter(function() {return this.id.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s])/);}).length;
var add13=$('textarea').filter(function() {return this.name.match(/([L,l][I,i][N,n][E,e])/);}).length;
var add14=$('textarea').filter(function() {return this.id.match(/([L,l][I,i][N,n][E,e])/);}).length;

var element= $('input:text').filter(function() {return this.name.match(/([A,a][D,d][D,d][R,r][E,e][S,s][S,s])/);});
//console.log(element[0]);
//function isVisible( elem ) { return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ); }; 

//isVisible(element[1]);


var total=state1+state2+state3+add1+add2+add3+add4+add5+add6+add7+add8+add9+add10+add12+add13+add14;
//console.log(pin1+"-"+pin2+"-"+pin4+"-"+pin5+"-"+pin7+"-"+pin8+"-"+pin10+"-"+pin11+"-"+pin13+"-"+pin14+"-"+pin1a+"-"+pin2a+"-"+pin4a+"-"+pin5a+"-"+pin7a+"-"+pin8a+"-"+pin10a+"-"+pin11a+"-"+pin13a+"-"+pin14a+"-"+total+"-"+toshow);
if((pin1>0||pin2>0||pin4>0||pin5>0||pin7>0||pin8>0||pin10>0||pin11>0||pin13>0||pin14>0||pin1a>0||pin2a>0||pin4a>0||pin5a>0||pin7a>0||pin8a>0||pin10a>0||pin11a>0||pin13a>0||pin14a>0)&&total>0&& toshow==1)
  
{
      //console.log("bhuwan");
      //console.log(pin1+""+pin2+""+pin4+""+pin5+""+pin7+""+pin8+""+pin8);
      
//if(state1>0||state2>0)
{


  var add_logo=returnResource("address.png");
 //$('body').append('<div class="add-button"><img src="'+add_logo+'"></div>');
 if(document.getElementById('hatke--address')==null)
 {
   $('body').append("<div class='hkExt-address hkE-animated hkE-bounceInUp' id='hatke--address' style='display:block!important;'><div class='hkE-addr__main'><svg class='hkE-addr__icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12.7 17.8'><g fill='none' stroke='#fff' stroke-width='1.39' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'><path d='M.7 6.9v-.5C.7 3.3 3.2.7 6.4.7S12 3.2 12 6.4v.5M6.4 17.1S.7 11.8.7 6.4M6.4 17.1s5.7-5.3 5.7-10.7'/><circle cx='6.4' cy='6.9' r='2.2'/></g></svg>Autofill <div class='hkE-addr__arrow'>&#9660;</div></div><div class='hkE-addr__options'><ul class='hkE-addr__optList'><li class='hkE-addr__optLi'><a target='_blank' href='chrome-extension://jaehkpjddfdgiiefcnhahapilbejohhj/options.html#address' class='hkE-addr__optLi--link'>+ Add New Address</a></li></ul>");
 }
 chrome.runtime.sendMessage({method: "getLocalStorage",key:"addressarray"}, function(response) {

  var addressarray=JSON.parse(response.data);
//console.log(addressarray.address.length);
var addresses=addressarray.address;

for(var i=0;i<addressarray.address.length;i++)
{
  var id =addresses[i].type;
  //console.log(id);
  //console.log(document.getElementById(id));
  if(document.getElementById(id)==null)
  {
    $('.hkE-addr__optList').append('<li class="hkE-addr__optLi hkE-addr__optLi--selectable" id ="'+addresses[i].type+'">'+addresses[i].type+'<div class="hkE-addr__expanded"><div class="hkE-addr__expAdd">'+addresses[i].fullname+'<br>'+addresses[i].address1+'<br>'+addresses[i].address2+'<br>'+addresses[i].landmark+'<br>'+addresses[i].city+'-'+addresses[i].pincode+'<br>'+addresses[i].state+'<br>'+'Ph:'+addresses[i].mobilenumber+'</div><div class="hkE-add__expBtnsWrap"><div class="hkE-addr__expBtns hkE-addr__expBtns--apply applybutton" id="'+addresses[i].type+'">Apply</div><div class="hkE-addr__expBtns hkE-addr__expBtns--red">Remove</div></div></div></li>');

  }
}

if(p<1)
{
  $(".applybutton").click(function()
  {

    var id =this.id;
//console.log(this.id);
//console.log(addresses.length);
for(var i=0;i<addresses.length;i++)
{

//console.log(addresses[i]);  
if (addresses[i].type==id)
{

  var fullname1=addresses[i].fullname;
  var mobile1=addresses[i].mobilenumber;
  var landmark1=addresses[i].landmark;
  var pincode1=addresses[i].pincode;
  var address1z=addresses[i].address1;
  var address2z=addresses[i].address2;
  var addressz=address1z+"\n"+address2z;
  var cityz=addresses[i].city;
  var statez=addresses[i].state;
    //console.log(mobile1);
    
//autofill1

autofill3(fullname1,mobile1,landmark1,pincode1,address1z,address2z,addressz,cityz,statez);




}
}
});
  p++;
}
//console.log(addressarray);
});


/*

  $('.add-button').click(function(){
autofill();
 });
 */

}
}

f++;
}    



var target=document.querySelector('body');
////console.log(target);

var observer = new WebKitMutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
     // console.log("bhuwan");
     // //console.log("Success");
     main();
     
              //$('#log').text('input text changed: "' + target.text() + '"');
        ////console.log(mutation, mutation.type);
      });    
});
if(window.location.href.split("myntra.com").length>0)
{
  observer.observe(target, {attributes:true,childList: true, subtree:true});
}
else
{
  observer.observe(target, {childList: true, subtree:true});
}
//console.log(observer);

/*
var insertedNodes = [];
var observer = new MutationObserver(function(mutations) {
 mutations.forEach(function(mutation) {
   for (var i = 0; i < mutation.addedNodes.length; i++)
     insertedNodes.push(mutation.addedNodes[i]);
   
 })
 //console.log(insertedNodes);
 //console.log("succ")
});
observer.observe(target, { childList: true });

*/
main();

function autofill3(fullname1,mobile1,landmark1,pincode1,address1a,address2a,addressa,city1,state1)
{
//pincode trigger

var s = document.createElement('script');
var pincodez =document.createElement("div");
pincodez.id="bhtk-pincode";
console.log()
pincodez.innerText= pincode1;
s.id="bhuwan";
 //  console.log(pincode);
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('address_script.js');
s.onload = function(pincode) {
    //this.remove();
   // console.log(pincode);
 };
 (document.head || document.documentElement).appendChild(s);
 (document.head || document.documentElement).appendChild(pincodez);



 var firstname1 = fullname1.split(" ")[0];
 var n=fullname1.split(" ").length;
 var lastname1= fullname1.split(" ")[n-1];
//console.log(fullname1.split(" "));
//console.log(lastname1);
var pin = /([P,p][I,i][N,n]|[P,p][O,o][S,s][T,t]|[Z,z][I,i][P,p])/;

var name= /([N,n][A,a][M,m][E,e])/;

var fname=/([F,f][I,i][R,r][S,s][T,t])/;

var lname=/([L,l][A,a][S,s][T,t])/;

var mname=/([M,m][I,i][D,d][D,d][L,l][E,e])/;

var city=/([C,c][I,i][T,t][Y,y])/;

var state=/([S,s][T,t][A,a][T,t][E,e])/;

var landmark=/([L,l][A,a][N,n][D,d][M,m][A,a][R,r][K,k])/;

var notaddress=/^((?!ddress)[\s\S])*$/;

var address=/([A,a][D,d][D,d][R,r][E,e][S,s][S,s])/;

var mobile=/([P,p][H,h][O,o][N,n][E,e]|[M,m][O,o][B,b][I,i][L,l][E,e]|[C,c][O,o][N,n][T,t][A,a][C,c][T,t])/;

var alternate=/([A,a][L,l][T,t][E,e][R,r][N,n][A,a][T,t][E,e])/;

var address1=/([L,l][I,i][N,n][E,e][ ][1]|[L,l][I,i][N,n][E,e][1]|[A,a][D,d][D,d][R,r][E,e][S,s][S,s][ ][1])/;
var address2=/([L,l][I,i][N,n][E,e][ ][2]|[L,l][I,i][N,n][E,e][2]|[A,a][D,d][D,d][R,r][E,e][S,s][S,s][ ][2])/;

var house=/([H,h][O,o][U,u][S,s][E,e])/;
var colony=/([C,c][O,o][L,l][O,o][N,n][Y,y])/;

var email=/([E,e][M,m][A,a][I,i][L,l])/;

var regexarray=[address,pin,mobile,name,fname,lname,mname,city,state,landmark,address1,address2,email,house,colony,alternate];
var valuesarray=[addressa,pincode1,mobile1,fullname1,firstname1,lastname1,"",city1,state1,landmark1,address1a,address2a,"",address1a,address2a,""];



var inputs= $('input:visible:enabled');
var textarea=$('textarea:visible:enabled');
var select=$('select:visible:enabled');




for (var i=0;i<inputs.length;i++)

{

  for(var j=0;j<regexarray.length;j++)

  {
    if(inputs.eq(i).attr('placeholder')!=undefined)
    {

     if(inputs.eq(i).attr('placeholder').match(regexarray[j]))
     {
      inputs.eq(i).val(valuesarray[j]).css("background-color", "#cce6ff").focus(); 
    }
  }


  {
    if($('input:visible:enabled').eq(i).parent().find('input:visible:enabled').length==1&&$('input:visible:enabled').eq(i).parent().find('select:visible:enabled').length==0)
    {
      
      if($('input:visible:enabled').eq(i).parent().text().match(regexarray[j]))
      {
        
        $('input:visible:enabled').eq(i).val(valuesarray[j]).css("background-color", "#cce6ff").focus(); 
        
      }

      else
        if($('input:visible:enabled').eq(i).parent().parent().find('input:visible:enabled').length==1&&$('input:visible:enabled').eq(i).parent().parent().find('select:visible:enabled').length==0)
        {
          
          if($('input:visible:enabled').eq(i).parent().parent().text().match(regexarray[j]))
          {
            
            $('input:visible:enabled').eq(i).val(valuesarray[j]).css("background-color", "#cce6ff").focus(); 
            
          }
          else
            if($('input:visible:enabled').eq(i).parent().parent().parent().find('input:visible:enabled').length==1&&$('input:visible:enabled').eq(i).parent().parent().parent().find('select:visible:enabled').length==0)
            {
              
              if($('input:visible:enabled').eq(i).parent().parent().parent().text().match(regexarray[j]))
              {
                
                $('input:visible:enabled').eq(i).val(valuesarray[j]).css("background-color", "#cce6ff").focus(); 
                
              }
            }

          }
        }
      }
    }
  }

  for(var l=0;l<textarea.length;l++)
  { 

    if(textarea.eq(l).attr('placeholder')!=undefined)
    {

     if(textarea.eq(l).attr('placeholder').match(address))
     {
      textarea.eq(l).val(addressa).focus(); 
    }
  }

  {
    if($('textarea:visible:enabled').eq(l).parent().text().match(address))
    {
      
     $('textarea:visible:enabled').eq(l).val(addressa).css("background-color", "#cce6ff").focus(); 
   }
   else
    if($('textarea:visible:enabled').eq(l).parent().parent().text().match(address))
    {
     $('textarea:visible:enabled').eq(l).val(addressa).css("background-color", "#cce6ff").focus();
   }
   else
    if($('textarea:visible:enabled').eq(l).parent().parent().text().match(address))
    {
      $('textarea:visible:enabled').eq(l).val(addressa).css("background-color", "#cce6ff").focus();  
    }
  } 
  
}

function statefill(){
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  state1=state1.toString();
  var state=state1.capitalize();

  var uppstate=state1.toUpperCase();
  

  $("select:visible:enabled"+">"+"option").filter(function() { return $(this).text() == uppstate; }).attr('selected', true).parent().css("background-color", "#cce6ff").focus();
  $("select:visible:enabled"+">"+"option").filter(function() { return $(this).text() == state; }).attr('selected', true).parent().css("background-color", "#cce6ff").focus();
  $("select:visible:enabled"+">"+"option").filter(function() { return $(this).text() == " "+uppstate; }).attr('selected', true).parent().css("background-color", "#cce6ff").focus();
  $("select:visible:enabled"+">"+"option").filter(function() { return $(this).text() == " "+state; }).attr('selected', true).parent().css("background-color", "#cce6ff").focus();

}

for(var k=0;k<select.length;k++)
{

  if(select.eq(l).attr('placeholder')!=undefined)
  {

   if(select.eq(l).attr('placeholder').match(state))
   {
    statefill();
  }
}  

if($('select:visible:enabled').eq(k).parent().text().match(state))
{
  statefill();

}
else
  if($('select:visible:enabled').eq(k).parent().parent().text().match(state))
  {
    statefill();
  }
  else
    if($('select:visible:enabled').eq(k).parent().parent().parent().text().match(state))
    {
      statefill();
    }
  }

}