function getCategory(){
  var categories = getBreadCrumb();
  var index = 1;
  var category = "";
  if(categories != "" && categories != undefined){
    categories = categories.split("*~");
    category = categories[index];
  }
  return category;
}
function sendPairs(){
  arrayToSend = [];
  if($('.bdslidebox').length > 0){
    var slider = $('.bdslidebox');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.bdslidebox:eq('+ i +')').find('a').length > 0){
        link = $('.bdslidebox:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){ 
          if(link.split("?").length > 1){
            link = link.split("?");
            PID = link[0]; 
          }
          else{
            PID = link;
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0]; 
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0]; 
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          
        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('.bdslidebox:eq('+ i +')').find('.dealprice').length > 0){
            price = $('.bdslidebox:eq('+  i +')').find('.dealprice').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends

      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price]);
      }


    } //for loop ends
    
  } //1st if ends
  if($('[itemtype="http://schema.org/Product"]').length > 0){
    var slider = $('[itemtype="http://schema.org/Product"]');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('[itemtype="http://schema.org/Product"]:eq('+ i +')').find('a').length > 0){
        link = $('[itemtype="http://schema.org/Product"]:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){ 
          if(link.split("?").length > 1){
            link = link.split("?");
            PID = link[0]; 
          }
          else{
            PID = link;
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0]; 
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0]; 
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          
        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('[itemtype="http://schema.org/Product"]:eq('+ i +')').find('.discoprice').length > 0){
            price = $('[itemtype="http://schema.org/Product"]:eq('+  i +')').find('.discoprice').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price]);
      }


    } //for loop ends
    
  } //1st if ends

  if($('.accesories_product_cat').length > 0){
    var slider = $('.accesories_product_cat');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.accesories_product_cat:eq('+ i +')').find('a').length > 0){
        link = $('.accesories_product_cat:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){ 
          if(link.split("?").length > 1){
            link = link.split("?");
            PID = link[0]; 
          }
          else{
            PID = link;
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0]; 
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0]; 
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          
        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('.accesories_product_cat:eq('+ i +')').find('b').length > 0){
            price = $('.accesories_product_cat:eq('+  i +')').find('b').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price]);
      }


    } //for loop ends
    
  } //1st if ends

  if($('.prd_rec_box_new').length > 0){
    var slider = $('.prd_rec_box_new');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.prd_rec_box_new:eq('+ i +')').find('a').length > 0){
        link = $('.prd_rec_box_new:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){ 
          if(link.split("?").length > 1){
            link = link.split("?");
            PID = link[0]; 
          }
          else{
            PID = link;
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0]; 
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0]; 
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          
        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('.prd_rec_box_new:eq('+ i +')').find('p').length > 0){
            p_len = $('.prd_rec_box_new:eq('+ i +')').find('p').length - 1;
            price = $('.prd_rec_box_new:eq('+  i +')').find('p:eq('+ p_len +')').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price]);
      }


    } //for loop ends
    
  } //1st if ends

  if($('.div_proddesp_big').length > 0){
    var slider = $('.div_proddesp_big');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.div_proddesp_big:eq('+ i +')').find('a').length > 0){
        link = $('.div_proddesp_big:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){ 
          if(link.split("?").length > 1){
            link = link.split("?");
            PID = link[0]; 
          }
          else{
            PID = link;
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0]; 
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0]; 
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          
        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('.div_proddesp_big:eq('+ i +')').find('.div_by a').length > 0){

            price = $('.div_proddesp_big:eq('+  i +')').find('.div_by a:eq(0)').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price]);
      }


    } //for loop ends
    
  } //1st if ends

  if($('.rediffpickbox .rediff_picks_left').length > 0){
    var slider = $('.rediffpickbox .rediff_picks_left');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.rediffpickbox:eq('+ i +') .rediff_picks_left').find('a').length > 0){
        link = $('.rediffpickbox:eq('+ i +') .rediff_picks_left').find('a:eq(0)').attr('href');
        if(link != ""){ 
          if(link.split("?").length > 1){
            link = link.split("?");
            PID = link[0]; 
          }
          else{
            PID = link;
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0]; 
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0]; 
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          
        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('.rediffpickbox:eq('+ i +') .rediff_picks_left').find('strong[itemprop="price"]').length > 0){

            price = $('.rediffpickbox:eq('+ i +') .rediff_picks_left').find('strong[itemprop="price"]').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price]);
      }


    } //for loop ends
    
  } //1st if ends


  if($('.rediffpickbox .rediff_picks_right').length > 0){
    var slider = $('.rediffpickbox .rediff_picks_right');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.rediffpickbox:eq('+ i +') .rediff_picks_right').find('a').length > 0){
        link = $('.rediffpickbox:eq('+ i +') .rediff_picks_right').find('a:eq(0)').attr('href');
        if(link != ""){ 
          if(link.split("?").length > 1){
            link = link.split("?");
            PID = link[0]; 
          }
          else{
            PID = link;
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0]; 
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0]; 
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          
        }
        else{
          PID = "";
        }
        if(PID != ""){
          if($('.rediffpickbox:eq('+ i +') .rediff_picks_right').find('strong[itemprop="price"]').length > 0){

            price = $('.rediffpickbox:eq('+ i +') .rediff_picks_right').find('strong[itemprop="price"]').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price]);
      }


    } //for loop ends
    
  } //1st if ends

  if($('.dealofbox').length > 0){
    var slider = $('.dealofbox');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.dealofbox:eq('+ i +')').find('a').length > 0){
        link = $('.dealofbox:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){ 
          if(link.split("?").length > 1){
            link = link.split("?");
            PID = link[0]; 
          }
          else{
            PID = link;
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0]; 
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0]; 
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          
        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('.dealofbox:eq('+ i +')').find('strong[itemprop="price"]').length > 0){

            price = $('.dealofbox:eq('+ i +')').find('strong[itemprop="price"]').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price]);
      }


    } //for loop ends
    
  } //1st if ends

  if($('.carousel-list li').length > 0){
    var slider = $('.carousel-list li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.carousel-list li:eq('+ i +')').find('a').length > 0){
        link = $('.carousel-list li:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){ 
          if(link.split("?").length > 1){
            link = link.split("?");
            PID = link[0]; 
          }
          else{
            PID = link;
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0]; 
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0]; 
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          
        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('.carousel-list li:eq('+ i +')').find('strong[itemprop="price"]').length > 0){

            price = $('.carousel-list li:eq('+ i +')').find('strong[itemprop="price"]').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price]);
      }


    } //for loop ends
    
  } //1st if ends

  if($('.divbooklist').length > 0){
    var slider = $('.divbooklist');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.divbooklist:eq('+ i +')').find('a').length > 0){
        link = $('.divbooklist:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){ 
          if(link.split("?").length > 1){
            link = link.split("?");
            PID = link[0]; 
          }
          else{
            PID = link;
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0]; 
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0]; 
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          
        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('.divbooklist:eq('+ i +')').find('span[itemprop="price"]').length > 0){

            price = $('.divbooklist:eq('+ i +')').find('span[itemprop="price"]').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();

          }
          else if($('.divbooklist:eq('+ i +')').find('.bold').length > 0){
            price = $('.divbooklist:eq('+ i +')').find('.bold:eq(0)').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();
          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price]);
      }


    } //for loop ends
    
  } //1st if ends

  if($('#home_page li').length > 0){
    var slider = $('#home_page li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('#home_page li:eq('+ i +')').find('a').length > 0){
        link = $('#home_page li:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){ 
          if(link.split("?").length > 1){
            link = link.split("?");
            PID = link[0]; 
          }
          else{
            PID = link;
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0]; 
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0]; 
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          
        }
        else{
          PID = "";
        }
        if(PID != ""){
          if($('#home_page li:eq('+ i +')').find('span[itemprop="price"]').length > 0){

            price = $('#home_page li:eq('+ i +')').find('span[itemprop="price"]').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price]);
      }


    } //for loop ends
    
  } //1st if ends

  if($('.prod-suggestions li').length > 0){
    var slider = $('.prod-suggestions li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.prod-suggestions li:eq('+ i +')').find('a').length > 0){
        link = $('.prod-suggestions li:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){ 
          if(link.split("?").length > 1){
            link = link.split("?");
            PID = link[0]; 
          }
          else{
            PID = link;
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0]; 
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0]; 
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("product/").length > 1){
            PID = PID.split("product/");
            PID = PID[1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          
        }
        else{
          PID = "";
        }
        if(PID != ""){
          if($('.prod-suggestions li:eq('+ i +')').find('.prod-actual-price').length > 0){

            price = $('.prod-suggestions li:eq('+ i +')').find('.prod-actual-price').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            
            price = price.split(",").join("").trim();

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price]);
      }


    } //for loop ends
    
  } //1st if ends

// BOOKS REDIFF


if($('[itemtype="http://schema.org/Book"]').length > 0){
  var slider = $('[itemtype="http://schema.org/Book"]');
  var sliderLength = slider.length;
  var link;
  var price;
  var PID;
  var prod = "";
  var image = "";
  var oos = 0;
  for(i=0;i<sliderLength;i++){
    PID = "";
    price = "";
    prod = "";
    image = "";
    oos = 0;
    if($('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('a').length > 0){
      link = $('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('a:eq(0)').attr('href');
      if(link != ""){ 
        if(link.split("?").length > 1){
          link = link.split("?");
          PID = link[0]; 
        }
        else{
          PID = link;
        }
        if(PID.split("#").length > 1){
          PID = PID.split("#");
          PID = PID[0]; 
        }
        if(PID.split("&").length > 1){
          PID = PID.split("&");
          PID = PID[0]; 
        }
        if(PID.split("product/").length > 1){
          PID = PID.split("product/");
          PID = PID[1];
        }
        if(PID.split("product/").length > 1){
          PID = PID.split("product/");
          PID = PID[1];
        }
        if(PID.split("/").length > 1){
          PID = PID.split("/");
          PID = PID[PID.length - 1];
        }
        
      }
      else{
        PID = "";
      }

      if(PID != ""){

        if($('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('.bkimage img').attr("data-src")){
          image = $('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('.bkimage:eq(0) img:eq(0)').attr("data-src");
        }
        else if($('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('.bkimage img').attr("src")){
          image = $('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('.bkimage:eq(0) img:eq(0)').attr("src");
        }
        else if($('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('[itemprop="image"]').attr("src")){
          image = $('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('[itemprop="image"]').attr("src");
        }
        if($('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('.bkinfo a').attr("title")){
          prod = $('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('.bkinfo:eq(0) a:eq(0)').attr("title");
        }
        else if($('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('h3 a').attr("title")){
          prod = $('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('h3:eq(0) a:eq(0)').attr("title");
        }
        else if($('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('h3 a').length > 0){
          prod = $('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('h3:eq(0) a:eq(0)').text().trim();
        }
        if($('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('.ostock').length > 0 && $('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('.ostock').text().toUpperCase().split("OUT OF STOCK").length > 1){
          oos = 1;
        }
        else{
          oos = 0;
        }

        if($('[itemtype="http://schema.org/Book"]:eq('+ i +')').find('[itemprop="price"]').length > 0){
          price = $('[itemtype="http://schema.org/Book"]:eq('+  i +')').find('[itemprop="price"]').text();
          price = filter_price(price);
        }

      }
      else{
        price = "";
      }
      } // if 2 ends
      if(isValidISBN(PID.toString()) && prod.trim() != ""){
        prod = prod + " " + PID.trim();
      }
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price, prod, image, oos]);
      }


    } //for loop ends
    
  } //1st if ends
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsRediffB': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);  
  }
}

function sendCurrent(){
  curData = [];
  var prod = getProd();
  var image = getImage();
  var myPrice = getPrice();
  var cur_url = "";
  var avail = getAvailability();
  var current_status = 0;
  var PID = getPID();
  var link = window.location.href;
  if(avail == 0){
    current_status = 1;
  }
  else{
    current_status = 0;
  }
  cur_url = window.location.href;
  if(isValidISBN(PID.toString()) && prod.trim() != ""){
    prod = prod + " " + PID.trim();
  }
  curData.push([prod, image, myPrice, cur_url, current_status, PID]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataRediffB': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('.proddetailinforight').length>0 || ($(".div_bread").length > 0 && $("#proddetail").length > 0)){
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);


//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;


function getProd(){
  var prod = "";
  prod = $('h1[itemprop="name"]').text().trim();   
  // //console.log("prod: "+prod);
  if($('.proddetailinforight').length>0 || ($(".div_bread").length > 0 && $("#proddetail").length > 0)){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  if($('.div_book_image').length > 0){
    image = $('.div_book_image img').attr('src').trim();
  }
  else if($('.leftcontainer.table ').length > 0 && $('.leftcontainer .table img[itemprop="image"]').length > 0 && $('.leftcontainer .table img[itemprop="image"]').attr('src')){
    image = $('.leftcontainer .table img[itemprop="image"]').attr('src');
  }
  else if($('.leftcontainer').length > 0 && $('.leftcontainer .bk_cell1').length > 0 && $('.leftcontainer .bk_cell1 img').attr('src')){
    image = $('.leftcontainer .bk_cell1 img:eq(0)').attr('src');
  }
  return image;
}

function getPrice(){
  price = "";
  myPrice = "";
  if($('.proddetailinforight .bigBold').length > 0){
    myPrice = $('.proddetailinforight .bigBold').text().trim();
    if(myPrice.split("Rs.").length > 1){
      myPrice = myPrice.split("Rs.")[1].trim();
      myPrice = filter_price(myPrice);
    }
  }
  else if($('.book-details-wrap').find('[itemprop="price"]').length > 0){
    if($('.book-details-wrap').find('[itemprop="price"]').text().split("Rs.").length > 1)
    {
      myPrice = $('.book-details-wrap').find('[itemprop="price"]').text().split("Rs.")[1].split(",").join("").trim();
      myPrice = filter_price(myPrice);
    }
    else
    {
      myPrice = $('.book-details-wrap').find('[itemprop="price"]').text().split(",").join("").trim();
      myPrice = filter_price(myPrice);
    }
  }
  else if($('.price_bottom').length > 0){
    myPrice = $('.price_bottom').text().trim();
    myPrice = filter_price(myPrice);
  }
  else if($('.div_price').length > 0 && $('.div_price [itemprop="offers"]').length > 0){
    myPrice = $('.div_price [itemprop="offers"]:eq(0)').text().trim();
    myPrice = filter_price(myPrice);
  }
  else{
    myPrice = 0;
  }
  price = myPrice;
  return price;
}

function getAvailability(){
  var avail = 1;
  if(($('.boxcontainer').length > 0) && ($('.boxcontainer').text().toUpperCase().split("OUT OF STOCK").length > 1)){
    avail = 0;
  }
  else if($('body').text().split("Sorry! We couldn't find").length > 1){
    avail = 0;
  }
  else if($('.proddetailinforight .red-alert').text().toUpperCase().split("OUT OF STOCK").length > 1){
    avail = 0;

  }
  else if($('.rightcontainer').length > 0 && $('.rightcontainer').find(".bold.red").length > 0  && $('.rightcontainer').find(".bold.red").text().toUpperCase().split("OUT OF STOCK").length > 1){ 
    avail = 0;

  }
  
  return avail;

}
function getPID(){

  var link = window.location.href;
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
  if(pid.split("/").length > 1){
    pid1 = pid.split("/");
    pid1 = pid1[pid1.length - 1];
    if(pid1 == ""){
      pid1 = pid1[pid1.length - 2];
    }
    else{
      pid = pid1;
    }
  }
  
  return pid;
}

function returnPID(link){

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
  if(pid.split("/").length > 1){
    pid1 = pid.split("/");
    pid1 = pid1[pid1.length - 1];
    if(pid1 == ""){
      pid1 = pid1[pid1.length - 2];
    }
    else{
      pid = pid1;
    }
  }
  if(link.split('books.rediff.com').length < 2){
    pid = 0;
  }
  if(link == ""){
    pid = 0;
  }
  
  return pid;



}


function getBreadCrumb(){
  var breadcrumb = "";
  var bread_final = "";
  var len_bread = $('.div_bread').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('.div_bread').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}




