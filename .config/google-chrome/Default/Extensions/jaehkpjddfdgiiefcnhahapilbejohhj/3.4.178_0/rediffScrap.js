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

  if($('.div_grid_prdbox').length > 0){
    var slider = $('.div_grid_prdbox');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.div_grid_prdbox:eq('+ i +')').find('a').length > 0){
        link = $('.div_grid_prdbox:eq('+ i +')').find('a:eq(0)').attr('href');
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
          if($('.div_grid_prdbox:eq('+ i +')').find('[itemprop="price"]').length > 0){
            price = $('.div_grid_prdbox:eq('+  i +')').find('[itemprop="price"]').text();
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

  if($('.product_box').length > 0){
    var slider = $('.product_box');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.product_box:eq('+ i +')').find('a').length > 0){
        link = $('.product_box:eq('+ i +')').find('a:eq(0)').attr('href');
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
          if($('.product_box:eq('+ i +')').find('.dealprice').length > 0){
            price = $('.product_box:eq('+  i +')').find('.dealprice').text();
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
    var link = "";
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('[itemtype="http://schema.org/Product"]:eq('+ i +')').find('a').length > 0){
        link = $('[itemtype="http://schema.org/Product"]:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link && link != ""){ 
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
    var prod = "";
    var image = "";
    var oos = 100;
    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      prod = "";
      image = "";
      oos = 100;
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

          if($('.prd_rec_box_new:eq('+ i +')').find('.prd_rec_title a').length > 0 && $('.prd_rec_box_new:eq('+  i +')').find('.prd_rec_title:eq(0) a:eq(0)').attr("title")){
            prod = $('.prd_rec_box_new:eq('+  i +')').find('.prd_rec_title:eq(0) a:eq(0)').attr("title");
          }
          if($('.prd_rec_box_new:eq('+ i +')').find('.prd_rec_img img').length > 0 && $('.prd_rec_box_new:eq('+  i +')').find('.prd_rec_img:eq(0) img:eq(0)').attr("src")){
            image = $('.prd_rec_box_new:eq('+  i +')').find('.prd_rec_img:eq(0) img:eq(0)').attr("src");
          }

          if($('.prd_rec_box_new:eq('+ i +')').find('p').length > 0){
            p_len = $('.prd_rec_box_new:eq('+ i +')').find('p').length - 1;
            price = $('.prd_rec_box_new:eq('+  i +')').find('p:eq('+ p_len +')').text();
            price = filter_price(price);

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price, prod, image, oos]);
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


  if($('.g_similar_scroll_box').length > 0){
    var slider = $('.g_similar_scroll_box');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var prod = "";
    var image = "";
    var oos = 100;
    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      prod = "";
      image = "";
      oos = 100;
      if($('.g_similar_scroll_box:eq('+ i +')').find('a').length > 0){
        link = $('.g_similar_scroll_box:eq('+ i +')').find('a:eq(0)').attr('href');
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
          if($('.g_similar_scroll_box:eq('+ i +')').find('.g_similar_scroll_title').length > 0){
            prod = $('.g_similar_scroll_box:eq('+ i +')').find('.g_similar_scroll_title:eq(0)').text().trim();
          }
          if($('.g_similar_scroll_box:eq('+ i +')').find('.g_similar_scroll_img img').attr("src")){
            image = $('.g_similar_scroll_box:eq('+ i +')').find('.g_similar_scroll_img img:eq(0)').attr("src").trim();
          }
          if($('.g_similar_scroll_box:eq('+ i +')').find('.prod-actual-price').length > 0){

            price = $('.g_similar_scroll_box:eq('+ i +')').find('.prod-actual-price').text();
            price = filter_price(price);

          }
          else if($('.g_similar_scroll_box:eq('+ i +')').find('.f14.bold').length > 0){
            price = $('.g_similar_scroll_box:eq('+ i +')').find('.f14.bold').text();
            price = filter_price(price);
          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price, prod, image, oos]);
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
      if(PID != "" && price != "" && !isNaN(PID)){
        arrayToSend.push([PID, price, prod, image, oos]);
      }


    } //for loop ends
    
  } //1st if ends
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsRediff': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);  
  }
}

function sendCurrent(){
  curData = [];
  var prod = "";
  var image = "";
  var myPrice = "";
  var cur_url = "";
  var current_status = 0;
  var PID = "";
  var link = window.location.href;

  prod = $('h1[itemprop="name"] span').text().trim();   

  if(($('.boxcontainer').length > 0) && ($('.boxcontainer').text().toUpperCase().split("OUT OF STOCK").length > 1)){
    current_status = 1;
  }
  else if($('body').text().split("Sorry! We couldn't find").length > 1){
    current_status = 1;
  }
  else if($('body').text().split("not available").length > 1){
    current_status = 1;
  }
  else{
    current_status = 0;
  }
  if(current_status == 0){
    if($('[itemprop="price"]').length > 0){
      if($('[itemprop="price"]').text().split("Rs").length > 1)
      {
        myPrice = $('[itemprop="price"]').text().split("Rs")[1].split(",").join("").trim();
      }
      else
      {
        myPrice = $('[itemprop="price"]').text().split(",").join("").trim();
      }
    }
    else if($('price_bottom').length > 0){
      myPrice = $('price_bottom').text().split(",").join("").trim();
    }
  }
  else{
    myPrice = "0";
  }
  image = $('img[itemprop="image"]').attr('src');

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

  cur_url = window.location.href;
  curData.push([prod, image, myPrice, cur_url, current_status, PID]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataRediff': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('#productform').length > 0){
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
  prod = $('h1[itemprop="name"] span').text().trim();   
  if($('#productform').length > 0){
    return prod;
  }
  else{
    return "";
  }

}

function getImage(){
  var image = "";

  image = $('img[itemprop="image"]').attr('src');
  
  return image;
}

function getPrice(){
  price = "";
  if($('[itemprop="price"]').length > 0){
    if($('[itemprop="price"]').text().split("Rs").length > 1)
    {
      price = $('[itemprop="price"]').text().split("Rs")[1].split(",").join("").trim();
    }
    else
    {
      price = $('[itemprop="price"]').text().split(",").join("").trim();
    }
  }
  else if($('price_bottom').length > 0){
    price = $('price_bottom').text().split(",").join("").trim();
  }
  
  price = filter_price(price);
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
  else if($('body').text().split("not available").length > 1){
    avail = 0;
  }
  
  return avail;

}
function getPID(){

  var link = window.location.href;
  //console.log("link: "+link);
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
      pid = pid1[pid1.length - 2];
    }
    else{
      pid = pid1;
    }
  }
  
  return pid;



}

function returnPID(link){

  var pid = link;
  if(link == ""){
    pid = 0;
  }
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
      pid = pid1[pid1.length - 2];
    }
    else{
      pid = pid1;
    }
  }
  if(link.split('shopping.rediff.com').length < 2){
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
  var len_bread = $('.div_bread_product').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('.div_bread_product').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}


function getModel(){
  var model = "";
  if($(".spbox .sp").length > 0){
    var tab_len = $(".spbox .sp").length;
    for(var i=0;i<tab_len;i++){
      if($(".spbox .sp:eq("+i+") .lf:eq(0)").text().trim().toUpperCase() == "MODEL NUMBER"){
        model = $(".spbox .sp:eq("+i+") .rt:eq(0)").text().trim();
      }
    }
  }
  return model;
}

function getColor(){
  var color = "";
  if($(".spbox .sp").length > 0){
    var tab_len = $(".spbox .sp").length;
    for(var i=0;i<tab_len;i++){
      if($(".spbox .sp:eq("+i+") .lf:eq(0)").text().trim().toUpperCase() == "HANDSET COLOR"){
        color = $(".spbox .sp:eq("+i+") .rt:eq(0)").text().trim();
        if(color.split("(").length > 1){
          color = color.split("(");
          //
          color = color[0].trim();
        }
        color = color.split(",").join("/").trim();
        color = color.split("&").join("/").trim();
      }
    }
  }
  return color;
}

function getIntStorage(){
  var intMem = "";
  if($(".spbox .sp").length > 0){
    var tab_len = $(".spbox .sp").length;
    for(var i=0;i<tab_len;i++){
      if($(".spbox .sp:eq("+i+") .lf:eq(0)").text().trim().toUpperCase() == "MEMORY INTERNAL"){
        intMem = $(".spbox .sp:eq("+i+") .rt:eq(0)").text().trim();
        if(intMem.split(",").length > 1){
          intMem = intMem.split(",");
          intMem = intMem[0].trim();
        }
        if(intMem.toUpperCase().split("STORAGE").length > 1){
          intMem = intMem.toUpperCase().split("STORAGE");
          intMem = intMem[0].trim();
        }
        if(intMem.length > 6){
          if(intMem.toUpperCase().split("GB").length > 1){
            intMem = intMem.toUpperCase().split("GB");
            intMem = intMem[0].trim() + "GB";
          }
          else if(intMem.toUpperCase().split("MB").length > 1){
            intMem = intMem.toUpperCase().split("MB");
            intMem = intMem[0].trim() + "MB";
          }
          if(intMem.toUpperCase().split("INTERNAL:").length > 1){
            intMem = intMem.toUpperCase().split("INTERNAL:");
            intMem = intMem[1].trim();
          }
          if(intMem.toUpperCase().split("RAM").length > 1){
            intMem = intMem.toUpperCase().split("RAM");
            intMem = intMem[0].trim();
          }
        }
      }
    }
  }
  return intMem;
}

function sendMobile(){
  var breadCrumb = getBreadCrumb();
  // console.log("getBreadCrumb: " + breadCrumb);
  if(breadCrumb.split("*~").length > 1 && breadCrumb.split("*~")[2].trim().toUpperCase() == "MOBILE HANDSETS" && getProd() != ""){
    var PID = getPID();
    var pos = 291;
    var price = getPrice();
    var image = getImage();
    var avail = getAvailability();
    var mainTitle = getProd();
    var modelName = getModel();
    var color = getColor();
    var intStorage = getIntStorage();
    var link = window.location.href;

    var jsonArr = [{'PID': encodeURIComponent(PID), 'pos': pos, 'price': price, 'image': image, 'avail': avail, 'mainTitle': encodeURIComponent(mainTitle), 'modelName': encodeURIComponent(modelName), 'color': encodeURIComponent(color), 'intStorage': encodeURIComponent(intStorage), 'link': encodeURIComponent(link) }];
    jsonArr = JSON.stringify(jsonArr);
    // console.log("jsonArr: "+jsonArr);
    sendMessage(1, jsonArr, 19, doNothing, []);

  }
}
sendMobile();
