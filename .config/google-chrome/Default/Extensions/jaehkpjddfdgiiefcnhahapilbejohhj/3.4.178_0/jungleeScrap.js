//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;
alertPosition = 0;
function getProd(){
  var prod = "";
  prod = $(".productTitle:eq(0)").text().trim();
  if($('.mainTopContent').length>0){
    return prod;
  }
  else {
    return "";
  }
}
function getImage(){
  return "";
}

function getBreadCrumb(){
  return "";
}

function getPrice(){
  price = "";
  if($('.offer-price .offer-price-lowest-price').length > 0)
  {
    price = $('.offer-price .offer-price-lowest-price').text().trim();
  }
  price = filter_price(price);
  return price;
}

