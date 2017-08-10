$ = jQuery.noConflict();
var arrayMsg = [];
node_id_last = [];
for(var k=0;k<10;k++){
  node_id_last[k] = "";
}

function trySpecial(){
  setTimeout(function(){trySpecial();},180000);
  if(localStorage.ht!="" && localStorage.ht!= undefined && localStorage.sessionId!="" && localStorage.sessionId!= undefined && localStorage.rrid!="" && localStorage.rrid!= undefined){
    var jsonArr = [{'checkFlag': '1'}];
    // var jsonArr = [];
    jsonArr = JSON.stringify(jsonArr);
    // console.log("Calling to get PIDs trySpecial");
    sendMessage(1, jsonArr, 8, getResults, []);
  }
}

function pickValue(attrName)
{
      // console.log("am in pick values fun ");
      var myVar = "";
      if(document.querySelectorAll('.pdTab').length > 0){
        myVar = document.querySelectorAll('.pdTab')[0].innerHTML;
      }
      else {
        return "";
      }

      var strToSearch = attrName + "</td>";
      if(myVar.split(strToSearch).length > 1){
        myVar = myVar.split(strToSearch)[1];
        myVar = myVar.split("</td>")[0];
        myVar = myVar.split('">');
        if(myVar.length > 1){
          myVar = myVar[1];
        }
        else {
          myVar = myVar.join('">');
          myVar = myVar.split(">");
          myVar = myVar[1];
        }
        myVar = myVar.trim();
        return myVar;
      }
      else {
        return "";
      }

    }

    function getDetails(url)
    {
      finalJSON = {};
      var specialPat = /[^a-z0-9]+$/gi;
      var prodName = getProd();
      if(prodName ==""){
       setTimeout(getDetails, 100);
       return;
     }
     else {


      var alphaNum = /([a-z]+[0-9]+|[0-9]+[a-z]+)(.)*/gi;
      // console.log("am here in getDetails fun");

      var loaded = $('._2ZbXBq');
      if(loaded.length > 1)
      {
          //not loaded properly
          setTimeout(getDetails,100);

        }
        else if(getSpecs()==""){
          setTimeout(getDetails, 100);
        }
        else
        {
         var filters = getSpecs();
         // console.log(filters);
         filters = JSON.parse(filters);
         if(!filters.model){
          var brandHere = filters.brand;
          var prodTemp = getProd();
          prodTemp = prodTemp.split(brandHere);
          if(prodTemp.length > 1){
            prodTemp = prodTemp[1];
            prodTemp = prodTemp.trim();
            prodTemp = prodTemp.split(" ");
            prodTemp = prodTemp[0];
            if(!isAlphaNumeric(prodTemp) || parseInt(prodTemp)==prodTemp){
              filters.model = prodTemp;
            }
          }
        }
        filters = JSON.stringify(filters);

        var prodName = getProd();
        lastProd = prodName;
        var myPrice = getPrice();

        finalJSON["category"] = 0;
        finalJSON["filters"] = filters;
        finalJSON["filteredName"]  = prodName;
        finalJSON["prodName"] = prodName;
        finalJSON["price"] = myPrice;
        finalJSON['image'] = getImageJson();


        var finalJSONTemp = JSON.stringify(finalJSON);
        msgToSend = finalJSONTemp;
        sendSearchMessageNew(msgToSend, 1, url);
      }
    }
  }

  
  function getImageJson()
  {
      var images = [];k=0;
      var imageDiv = document.querySelector('#altImages');
      var allImages = imageDiv.getElementsByTagName("img");
      for(var j=0;j<allImages.length;j++)
      {
          var imagePar = allImages[j].getAttribute("src");
          if(imagePar.split("play-button").length > 1)
          {
              continue;
          }
          images[k++] = imagePar.split("SS40").join("SX425");
      }
      images = JSON.stringify(images);
      return images;
  }

  function getSpecs()
  {

    var laptopFound = 0;
    var bcs = $("._1joEet").html();
    cat =  $(bcs).find("._1KHd47").eq(2).text();
    bCat  =  $(bcs).find("._1KHd47").eq(3).text();
    brand = bCat.toLowerCase().trim().split(cat.toLowerCase().trim())[0];

    var ourAtts = [];
      ourAtts["model number"] = "model";
      ourAtts["part number"] = "serialno";
      ourAtts["Processor Type"] = "processor";
      ourAtts["processor generation"] = "generation";
      ourAtts["RAM Size"] = "ram";
      ourAtts["Operating System"] = "os";
      ourAtts["Hard Drive Size"] = "hdd";
      ourAtts["Hard Disk Technology"] = "hdt";
      ourAtts["Series"] = "lapseries";
      ourAtts["model name"] = "modelname";
      ourAtts["Item Weight"] = "weight";
      ourAtts["emmc storage"] = "emmc";
      ourAtts["Screen Size"] = "inch";
      ourAtts["touchscreen"] = "touchscreen";
      ourAtts["laptoptype"] = "type";
      ourAtts["Brand"] = "brand";
      ourAtts["Graphics Card Ram Size"] = "gCard";

      var attributeVal ={};
      var attributes = [];
      var attrVal = "";
      var prodName = getProd();
      // console.log("prodName = "+prodName);
      for(var k in ourAtts){
        var attrVal = pickValue(k);
        if(attrVal!="")
        {
          if(k=="Hard Disk Technology" && (attrVal.toLowerCase().split("solid").length > 1 || attrVal.toLowerCase().split("ssd").length > 1))
          {
            attributeVal["ssd"] = attributeVal["hdd"];
            attributeVal["hdd"] = "";
            continue;
          }
          var key  = ourAtts[k];
          attributeVal[key] = attrVal;
        }
        
      }

      if(attributeVal["model"])
      { 
        if(attributeVal["model"]!="")
        {
            attributeVal["serialno"] = "";
        }

      }

      for(var k in ourAtts){
          var key  = ourAtts[k];
          if(!attributeVal[key])
          {
            // console.log("key = "+key);
            if(key == "touchscreen" || key == "type")
            {
                if(key=="touchscreen")
                {
                     if(prodName.toLowerCase().split("touchscreen").length > 1 || prodName.toLowerCase().split("touch screen").length > 1)
                    {
                        attributeVal[key] = "yes";
                    }
                    else
                    {
                       attributeVal[key] = "";
                    }
                }
                else
                {
                    // console.log("ultrabook is present ");
                     if(prodName.toLowerCase().split("ultrabook").length > 1 || prodName.toLowerCase().split("ultra book").length > 1 || prodName.toLowerCase().split("ultra-book").length > 1)
                    {
                        attributeVal[key] = "ultrabook";
                    }
                    else if(prodName.toLowerCase().split("notebook").length > 1 || prodName.toLowerCase().split("note book").length > 1 || prodName.toLowerCase().split("note-book").length > 1)
                    {
                        attributeVal[key] = "notebook";
                    }
                    else if(prodName.toLowerCase().split("netbook").length > 1 || prodName.toLowerCase().split("net book").length > 1 || prodName.toLowerCase().split("net-book").length > 1)
                    {
                       attributeVal[key] = "netbook";
                    }
                    else if(prodName.toLowerCase().split("2 in 1").length > 1 || prodName.toLowerCase().split("2-in-1").length > 1 || prodName.toLowerCase().split("2in1").length > 1)
                    {
                       attributeVal[key] = "2 in 1";
                    }
                    else
                    {
                       attributeVal[key] = "";

                    }
                }
               
            }
            else
            {
                attributeVal[key] = "";

            }
          }
      }

      
     
      attributeVal["pid"] = getPID();
     //  if(attributeVal.serialno){
     //   attributeVal['serialno'] = "";
     // }

     attributeVal["updated"] = "1";

   
      var newAttributes = findMemory(prodName);
      // console.log("newAttributes ");
      // console.log(newAttributes);

      var finalAttr = findFinalAttr(attributeVal,newAttributes,prodName);

     finalAttr = JSON.stringify(finalAttr);

     console.log("finalAttr");
     console.log(finalAttr);

     return finalAttr;
   }


   function findFinalAttr(attributes,newAttributes,prodName)
   {
     // console.log("am here in findFinalAttr fun");
     var calGen = 0;
     newAttributes = JSON.parse(newAttributes);
      for(var arow in attributes)
      {

         aValue = attributes[arow];
         //  console.log("arow"+arow);
         // console.log("aValue "+aValue);
         if(arow=="generation" && aValue=="")
         {
            if(attributes["processor"]!="")
            {
                 var temp = attributes["processor"];
                 var regex = /[^0-9A-Z]+([0-9]+[^0-9A-Z]*(th|nd|rd|st)[^0-9A-Z]*(generation|gen))[^0-9A-Z]+/ig;
                 var matches = regex.exec(temp);
                 if(matches)
                  {
                    gen = matches[1];
                    attributes["generation"]= gen;
                  }
                  else
                  {
                      var regex = /[^0-9A-Z]+([0-9]+[^0-9A-Z]*(th|nd|rd|st)[^0-9A-Z]*(generation|gen))[^0-9A-Z]+/ig;
                      var matches = regex.exec(prodName);
                      if(matches)
                      {
                        gen = matches[1];
                        attributes["generation"]= gen;
                      }
                  }
            }
            else  //getitfrom name
            {
                     var regex = /[^0-9A-Z]+([0-9]+[^0-9A-Z]*(th|nd|rd|st)[^0-9A-Z]*(generation|gen))[^0-9A-Z]+/ig;
                      var matches = regex.exec(prodName);
                      if(matches)
                      {
                        gen = matches[1];
                        attributes["generation"]= gen;
                      }
            }

         }
         if(aValue.trim()=="")
         {
              if(newAttributes[arow])
              {
                  var defaultVal  = newAttributes["defaultVal"];
                  if(defaultVal==1 && attributes["ssd"]!="" && arow=="hdd")
                  {
                         continue;
                  }
                  else
                  {
                    aValue = newAttributes[arow];
                    attributes[arow] = aValue;

                  }


              }
              continue;
         }
         else if(arow=="hdd" || arow == "emmc")
         {
              avalueTemp = aValue.replace(/[^0-9A-Z]*([0-9]+)[^0-9A-Za-z]*GB[^0-9A-Z]*/gi,' $1gb ');
              avalueTemp = avalueTemp.replace(/[^0-9A-Z]*([0-9]+)[^0-9A-Za-z]*TB[^0-9A-Z]*/gi,' $1tb ');
              avalueTemp = avalueTemp.trim();
              if(newAttributes[arow])
              {
                  anValue = newAttributes[arow];

                  if(anValue.trim()==avalueTemp)
                  {
                      continue;
                  }
                  else
                  {
                      var hddValue = newAttributes["hdd"];
                      var ssdValue = newAttributes["ssd"];
                      var emmcValue = newAttributes["emmc"];
                      // var defaultVal = newAttributes["defaultVal"];
                      if(avalueTemp==hddValue.trim())
                      {

                         attributes[arow] = "";
                          attributes["hdd"] = avalueTemp;
                      }
                      else if(avalueTemp==ssdValue.trim())
                      {
                          attributes[arow] = "";
                          attributes["ssd"] = avalueTemp;
                      }
                      else if(avalueTemp==emmcValue.trim())
                      {
                         attributes[arow] = "";
                          attributes["emmc"] = avalueTemp;
                      }

                  }

              }
              else
                  {
                      hddValue = newAttributes["hdd"];
                      ssdValue = newAttributes["ssd"];
                      emmcValue = newAttributes["emmc"];
                      if(avalueTemp==hddValue.trim())
                      {
                         attributes[arow] = "";
                          attributes["hdd"] = avalueTemp;
                      }
                      else if(avalueTemp==ssdValue.trim())
                      {
                         attributes[arow] = "";
                          attributes["ssd"] = avalueTemp;
                      }
                      else if(avalueTemp==emmcValue.trim())
                      {
                         attributes[arow] = "";
                          attributes["emmc"] = avalueTemp;
                      }
                  }
         }
         if(arow=="hdd" || arow == "emmc" || arow=="gCard" || arow == "ssd" || arow=="ram")
         {
            if(aValue.toLowerCase().split("tb").length > 1 || aValue.toLowerCase().split("gb").length > 1 || aValue.toLowerCase().split("mb").length > 1)
            {

            }
            else if(aValue.toLowerCase().split("integrat").length > 1)
            {

            }
            else if(newAttributes[arow].trim()!="")
            {
              anValue = newAttributes[arow];
              attributes[arow] = anValue;
            }
            else
            {   ///keep units
                if(arow == "ram")
                {
                    var ramValue = parseFloat(aValue.trim());
                    if(ramValue <= 64)
                    {
                        ramValue=ramValue+"gb";
                    }
                    else
                    {
                        ramValue=ramValue+"mb";
                    }
                    attributes[arow] = ramValue;
                }
                else if(arow == "gCard")
                {
                    var gcardValue = parseFloat(aValue.trim());
                    if(gcardValue <= 64)
                    {
                        gcardValue=gcardValue+"gb";
                    }
                    else
                    {
                        gcardValue=gcardValue+"mb";
                    }
                    attributes["gCard"] = gcardValue;
                }

            }

         }

      }
      // console.log(attributes);
      // console.log("-------------------");
      return attributes;
   }
   function findMemory(prodName)
   {
      prodName = prodName.replace(/[^0-9A-Z]*([0-9]+)[^0-9A-Za-z]*GB[^0-9A-Z]*/gi,' $1gb ');
      prodName = prodName.replace(/[^0-9A-Z]*([0-9]+)[^0-9A-Za-z]*TB[^0-9A-Z]*/gi,' $1tb ');
      prodName = prodName.toLowerCase();
      var ramMem = "";var hddMem = "";var grapMem = "";var emmcMem = "";var ssdMem="";var ntrgrap="";var ntrhdd="";var ntrssd="";var ntremmc="";
      var memory = [];var ram = 0; var hdd = 0; var emmc = 0;var graphics = 0; var ssd = 0;var defaultVal = 0;
      var allMemories = {};
      // if(count(explode('ram',strtolower($searchRes))) > 1)
      if(prodName.split("ram").length > 1)
      {
          var regex  = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(ram)/gi;
          matches = regex.exec(prodName);
          if(matches)
          {
             ramMem = matches[1];
             ram = 1;
          }

      }

      if(prodName.split("hdd").length > 1)
      {
          // preg_match('/[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(hdd)/i',$searchRes, $matches);
          var regex  = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(hdd)/gi;
          matches = regex.exec(prodName);
          if(matches)
          {

                  ntrhdd = matches[0];
                  hddMem = matches[1];
                  if(ntrhdd!="")
                  {
                    prodName = prodName.split(ntrhdd).join(" ");

                  }
                  // $searchResTemp = explode($ntrhdd,$searchRes);
                  // $searchRes = implode('  ',$searchResTemp);
                  hdd = 1;
          }


      }

      if(prodName.split("ssd").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(ssd)/ig;
          // preg_match('/[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(ssd)/i',$searchRes, $matches);

          matches = regex.exec(prodName);
          if(matches)
          {
              ntrssd = matches[0];
              ssdMem = matches[1];

              // console.log("prodName in ssd = "+prodName);
              if(ntrssd!="")
              {
                 prodName = prodName.split(ntrssd).join(" ");
              }

              ssd = 1;
          }

      }

      if(prodName.split("emmc").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(emmc)/ig;
          matches = regex.exec(prodName);
          // preg_match('/[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(emmc)/i',$searchRes, $matches);
          if(matches)
          {
                ntremmc = matches[0];
                emmcMem = matches[1];
                if(ntremmc.trim()!="")
                {
                    prodName = prodName.split(ntremmc).join(" ");
                }

                emmc = 1;

          }

      }

      if(prodName.split("amd graphics").length > 1 || prodName.split("graphics").length > 1 || prodName.split("grap").length > 1 || prodName.split("graphic").length > 1 || prodName.split("gfx").length > 1 || prodName.split("grafix").length > 1)

      {
      if(prodName.split("amd graphics").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(amd graphics)/ig;
          matches = regex.exec(prodName);
          if(matches)
          {
                ntrgrap = matches[0];
                grapMem = matches[1];
                graphics = 1;
          }
          // else if(count(explode('integrated',strtolower($searchRes)))>1)
          else if(prodName.split("integrated").length > 1)
          {
                ntrgrap = "integrated graphics";
                grapMem = "integrated graphics";
                graphics = 1;
          }

      }
      else if(prodName.split("graphics").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(graphics)/ig;
          matches = regex.exec(prodName);
          if(matches)
          {
                ntrgrap = matches[0];
                grapMem = matches[1];
                graphics = 1;
          }
          // else if(count(explode('integrated',strtolower($searchRes)))>1)
          else if(prodName.split("integrated").length > 1)
          {
                ntrgrap = "integrated graphics";
                grapMem = "integrated graphics";
                graphics = 1;
          }

      }
      else if(prodName.split("graphic").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(graphic)/i;
          matches = regex.exec(prodName);
          if(matches)
          {
                ntrgrap = matches[0];
                grapMem = matches[1];
                graphics = 1;
          }
          else if(prodName.split("integrated").length > 1)
          {
                grapMem = "integrated graphics";
                ntrgrap = "integrated graphic";
                graphics = 1;
          }

      }
      else  if(prodName.split("grap").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(grap)/i;
          matches = regex.exec(prodName);
          if(matches)
          {
                ntrgrap = matches[0];
                grapMem = matches[1];
                graphics = 1;
          }
          else if(prodName.split("integrated").length > 1)
          {
                grapMem = "integrated graphics";
                ntrgrap = "integrated grap";
                graphics = 1;
          }

      }
      else if(prodName.split("gfx").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(gfx)/ig;
          matches = regex.exec(prodName);
          if(matches)
          {
          // preg_match('/[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(gfx)/i',$searchRes, $matches);
          ntrgrap = matches[0];
          grapMem = matches[1];
          graphics = 1;
          }
          else if(prodName.split("integrated").length > 1)
          {
                grapMem = "integrated graphics";
                ntrgrap = "integrated gfx";
                graphics = 1;
          }
      }
      else if(prodName.split("grafix").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(grafix)/i;
          matches = regex.exec(prodName);
          if(matches)
          {
            ntrgrap = matches[0];
            grapMem = matches[1];
            graphics = 1;
          }
          else if(prodName.split("integrated").length > 1)
          {
                grapMem = "integrated graphics";
                ntrgrap = "integrated grafix";
                graphics = 1;
          }

      }

      if(ntrgrap.trim()!="" && prodName.split(ntrgrap.toLowerCase()).length > 1)
      {
         // console.log("prodNAme in split = "+prodName);
         //  console.log("ntrgrap = "+ntrgrap);
          var regEx = new RegExp(ntrgrap, "ig");
          // console.log("regEx"+regEx);
          prodName = prodName.replace(regEx, ' ');
          // console.log("prodName in split ="+prodName);
      }


      }


      if(hdd == 0 || ssd == 0 || emmc == 0 || ram == 0)
      {
      // console.log(prodName);
      var reqEx = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*/ig;
      matches = prodName.match(reqEx);
      // matches = reqEx.exec(prodName);
      if(matches)
      {
         var allMem = matches;

          // $allMem = $matches[1];
          // console.log(allMem);
          for(var i=0;i< allMem.length;i++)
          {
              if(allMem[i].split("tb").length > 1)
              {
                  var temp = allMem[i].trim();
                  temp = parseFloat(temp);
                  var st = temp*1024;
              }
              else
              {
                  temp = allMem[i].trim();
                  var st = parseFloat(temp);

              }
              memory[allMem[i].trim()] = st;

          }
      }
      // preg_match_all('/[^A-Z0-9]+?([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]+?/i',$searchRes, $matches);

      }



        //sort it by value

        memory.reverse();
        min = 10000;max = -1;minMem = "";maxMem = "";min2 = 10000;minMem2 = "";
        for(key in memory)
        {
            value = memory[key];
            if(hddMem=="")
            {
              if(value >= 32)
              {
                    hddMem = key;
                    hdd = 1;
                    defaultVal = 1;
                    continue;
              }

            }
            if(ramMem == "")
            {
                if(value >= 1 && value < 32)
                {
                    ramMem = key;
                    ram = 1;
                    continue;
                }

            }

        }

         // return ramMem+"~*~"+hddMem+"~*~"+prodName+"~*~"+grapMem+"~*~"+emmcMem+"~*~"+ssdMem+"~*~"+defaultVal;
         allMemories["ram"] = ramMem;
         allMemories["hdd"] = hddMem;
         allMemories["gCard"] = grapMem;
         allMemories['emmc'] = emmcMem;
         allMemories['ssd'] = ssdMem;
         allMemories['defaultVal'] = defaultVal;
         allMemories = JSON.stringify(allMemories);
         return allMemories;
   }


   function getResults(data){
  // console.log("getResults data received is " + data);
  data = JSON.parse(data);
  pid_final_arr = "{\"asins\": " + JSON.stringify(data) + "}";
  getPriceByUrl = "/gp/shogun/ajax.html/" + localStorage.sessionId + "?swn=productdb-ajax&oia=1&ht=" + localStorage.ht + "&opt=Gateway&oe=%7B%22isDesktop%22%3A1%2C%22isTablet%22%3A0%2C%22isMobile%22%3A0%7D&sa=" + encodeURIComponent(pid_final_arr) + "&ospt=desktop&rrid=" + localStorage.rrid;
  //console.log(getPriceByUrl);
  $.ajax({
    type: "GET",
    url: getPriceByUrl,
    success: function(msg){
      var arrayToSend2 = [];
    //console.log(msg.p.length);
    //console.log(msg.p);
    if(!msg.error){
      for(m=0;m<msg.p.length;m++){
        var pidCurr = (msg.p[m].asin);
        var priceCurr = msg.p[m].price;
        var priceCurr2 = msg.p[m].priceOnly;

        var priceCurr = msg.p[m].price;
        var priceCurr2 = msg.p[m].priceOnly;
        //console.log("Entered here " + msg.p[m].price);
        priceCurr = priceCurr.split('<span>');
        //console.log("Length is " + priceCurr.length);
        for(k=0;k<priceCurr.length;k++){
          p_temp = priceCurr[k].split('</span>');

          p_temp = p_temp[0];
          p_temp = p_temp.split(",").join("");
          //console.log("Temp value " + p_temp);
          p_temp = parseFloat(p_temp);
          if(p_temp!=0 && p_temp!= null){
            priceCur = p_temp;
          }
        }

        priceCurr2 = priceCurr2.split('<span>');
        for(k=0;k<priceCurr2.length;k++){
          p_temp = priceCurr2[k].split('</span>');
          p_temp = p_temp[0];
          p_temp = p_temp.split(",").join("");
          p_temp = parseFloat(p_temp);
          if(p_temp!=0 && priceCur > p_temp && p_temp != null){
            priceCur = p_temp;
          }
        }




        if(priceCur == null || parseFloat(priceCur) == null){
          priceCur = 0;
        }


        if(isNaN(priceCur) == true){
          priceCur = 0;
        }
        arrayToSend2.push([pidCurr, priceCur]);
      //console.log(m + " " + pidCurr + " " + priceCur);
    }
    if(arrayToSend2.length > 0){
      arrayToSend2 = JSON.stringify(arrayToSend2);
      var jsonArr = [{'pairsAmaz': arrayToSend2}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(0, jsonArr, 0, doNothing, []);
    }
  }
}
});
}

trySpecial();

function sendSpecial(){
  // console.log("sendSpecial was called");
  $('body').append("<div id='ourSearchKey_pid' style='display:none;'></div>")
  var scr = document.createElement("script");
  scr.type="text/javascript";
  var a = "document.getElementById('ourSearchKey_pid').innerHTML= ue_sid";
  scr.innerHTML = a;
  document.body.appendChild(scr);

  if($('body').html().split('auiShogunAjaxHandler.params').length > 1){
    ht = $('body').html().split('auiShogunAjaxHandler.params')[1];
    if(ht.split('ht":"').length > 1){
      ht = ht.split('ht":"')[1];
      ht = ht.split('"')[0];
      if(ht != ""){
        localStorage.ht = ht;
      }
    }

    rrid = $('body').html().split('auiShogunAjaxHandler.params')[1];
    if(rrid.split('rrid":"').length > 1){
      rrid = rrid.split('rrid":"')[1];
      rrid = rrid.split('"')[0];
      // console.log("rrid is " + rrid);
      if(rrid != ""){
        localStorage.rrid = rrid;
      }
    }
  }

  else {
    rrid = getCookie("csm-hit")
    var rrid = getCookie("csm-hit");
    if(rrid.split("+sa").length > 1){
      rrid = rrid.split("+sa");
      rrid = rrid[0].trim();
    }
    if(rrid.split("+s-").length > 1){
      rrid = rrid.split("+s-");
      rrid = rrid[1].trim();
    }
    if(rrid.split("|").length > 1){
      rrid = rrid.split("|");
      rrid = rrid[0].trim();
    }
  }

  localStorage.rrid = rrid;

  pid_list_len = $('.feed-carousel-card').length;
  pid_list_arr = [];
  pid_final_arr = [];
  for(i=0;i<pid_list_len;i++){
    if($('.feed-carousel-card:eq(' + i + ')').attr('data-sghover')){
      pid_list = $('.feed-carousel-card:eq(' + i + ')').attr('data-sghover');
    }
    else if($('.feed-carousel-card:eq(' + i + ')').attr('data-sgproduct')){
      pid_list = $('.feed-carousel-card:eq(' + i + ')').attr('data-sgproduct');
    }
    else{
      pid_list = "";
    }
    if(pid_list != ""){
      if(pid_list.split(",").length > 1){
        pid_list = pid_list.split(",")[0];
      }
      if(pid_list.split('asin":"').length > 1){
        pid_list = pid_list.split('asin":"')[1];
      }
      if(pid_list.split('"').length > 1){
        pid_list = pid_list.split('"')[0];
      }
      pid_list_arr[i] = pid_list;
    }
  //console.log("pidarr: "+pid_list_arr);
}
//pid_list_arr[i] = "B00MUESIQC";
pid_final_arr = "{'asins': " + JSON.stringify(pid_list_arr) + "}";


sessionId = $('#ourSearchKey_pid').text().trim();
if(sessionId != ""){
  localStorage.sessionId = sessionId;
}

getPriceByUrl = "/gp/shogun/ajax.html/" + localStorage.sessionId + "?swn=productdb-ajax&oia=1&ht=" + localStorage.ht + "&opt=Gateway&oe=%7B%22isDesktop%22%3A1%2C%22isTablet%22%3A0%2C%22isMobile%22%3A0%7D&sa=" + encodeURIComponent(pid_final_arr) + "&ospt=desktop&rrid=" + localStorage.rrid;
$.ajax({
  type: "GET",
  url: getPriceByUrl,
  success: function(msg){
    // console.log("msg: ",msg);
    var arrayToSend2 = [];
    var dropToSend = [];
    //console.log(msg.p.length);
    if(!msg.error){
      for(m=0;m<msg.p.length;m++){
        var pidCurr = (msg.p[m].asin);
        var priceCurr = msg.p[m].price;
        var priceCurr2 = msg.p[m].priceOnly;
        priceCurr = priceCurr.split("</span><span>");
        if(priceCurr.length>1){
          priceCurr = priceCurr[1];
          priceCurr = priceCurr.split("</span>")[0];
          priceCurr = priceCurr.split(",").join("");
          priceCurr = parseFloat(priceCurr);
        }
        priceCurr2 = priceCurr2.split("</span><span>");
        if(priceCurr2.length>1){
          priceCurr2 = priceCurr2[1];
          priceCurr2 = priceCurr2.split("</span>")[0];
          priceCurr2 = priceCurr2.split(",").join("");
          priceCurr2 = parseFloat(priceCurr2);
        }

        if(priceCurr!=""){
          priceCur = priceCurr;
        }
        else if(priceCurr2!=""){
          priceCur = priceCurr2;
        }
        else {
          priceCur = 0;
        }
        if(isNaN(priceCur) == true){
          priceCur = "";
        }
        arrayToSend2.push([pidCurr, priceCur]);
        dropToSend.push(pidCurr);
      }
      // console.log("reached here1 with "+arrayToSend2);
      arrayToSend2 = JSON.stringify(arrayToSend2);
      var jsonArr = [{'pairsAmaz': arrayToSend2}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(0, jsonArr, 0, doNothing, []);
      if(dropToSend.length > 0){
        dropToSend = JSON.stringify(dropToSend);
        var jsonArr = [{'pids': dropToSend, 'pos': 63}];
        jsonArr = JSON.stringify(jsonArr);
        var passBack = ['.RIGHT-COL-SDL a', '.s-result-item .a-color-price', '.gbwshoveler-button-wrapper li',  '#rhfShovelerWrapper .a-carousel-row-inner li', '#conditional-probability_feature_div li', '#searchResults #mainResults .prod', '.zgChartBody .rankedItem', '.a-carousel li', '#fbt_item_details li', '.asin', '.cpsims li', '#mainResults .celwidget', '.shoveler-content li', '#recommendations .a-list-item', '.recs-grid-item', '.s-result-item', '.a-carousel-card', '.vxd-music-bs-col-content', '.singleCell', '.widgetContent .dealView'];
        sendMessage(1, jsonArr, 30, displayRecentDrops, passBack);
      }
    }
  }
});
}

function sendPairsOld(){
  var arrayToSend = [];

  for(k=0;k<$('script').length;k++){
    hm_pg_len = $('script:eq(' + k + ')').html().split('P.when("gw-productdb")').length;
    // hm_pg = $('body').split('P.when("gw-productdb")')[1];
    for(i=1;i<hm_pg_len;i++){
      PID = "";
      price = "";
      price1 = "";
      hm_pg = $('script:eq(' + k + ')').html();
      hm_pg = hm_pg.split('P.when("gw-productdb")')[i];
      hm_pg = hm_pg.split('}]});')[0];
      for(j=1;j<hm_pg.split('nodeId').length;j++){
        hm_pg1 = hm_pg.split('"images"')[j];
        hm_pg1 = hm_pg1.split('asin')[1];
        PID = hm_pg1.split('"')[2];
        price1 = hm_pg1.split('gwCurrencyINR')[1];
        price = price1.split('"')[1];
        price = price.split('<span>')[1];
        price = price.split('</span>')[0];
        price = price.split(",").join("");
        if(PID != "" && price != ""){
          price = parseFloat(price);
          if(isNaN(price) == true){
            price = "";
          }
          arrayToSend.push([PID, price]);
        }
        //console.log("PID: " + PID + " Price: " + price );
      }
    }
  }

  if($('.RIGHT-COL-SDL').length > 0){

    var link;
    var price;
    var PID;

    link = $('.RIGHT-COL-SDL a:eq(0)').attr('href');
    if(link != "" && link != undefined){
     if(link.split("amazon.in").length < 2){
      link = "http://www.amazon.in/"+link;
    }
    PID = returnPID(link);
  }
  else{
    PID = "";
  }

  if(PID != ""){
    price = $('.RIGHT-COL-SDL').find('.gbDealPrice:eq(0)').text();
    if(price.split("Rs.").length > 1){
      price = price.split("Rs.");
      price = price[1];
    }
    if(price.split("₹").length > 1){
      price = price.split("₹");
      price = price[1];
    }
    price = price.split(",").join("").trim();

    price = parseFloat(price);
    if(isNaN(price) == true){
      price = "";
    }
    if(PID != "" && price != ""){
      arrayToSend.push([PID, price]);
    }


  }
}

if($('.s-result-item').find('.a-color-price').length > 0){

  var link;
  var price;
  var count = 0;
  var PID;

  for(j=0;j<($('.s-result-item').length);j++){
    var slider = $('.s-result-item:eq('+ j +')').find('.a-color-price');
    var sliderLength = slider.length;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.s-result-item:eq('+ j +')').find('.a-color-price:eq('+ i +')').length > 0){
        link = $('.s-result-item:eq('+ j +')').find('.a-color-price:eq('+ i +')').parent().attr('href');

        if(link != "" && link != undefined){

         if(link.split("/offer-listing/").length > 1){
          link = link.split("/offer-listing/")[1];
          if(link.split("/").length > 1){
            link = link.split("/");
            PID = link[0];
          }
          else{
            PID = link;
          }
          if(PID.split("?").length > 1){
            PID = PID.split("?");
            PID = PID[0];
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0];
          }

        }
        else{
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
      }
      if(PID != "" && PID != undefined){

        if($('.s-result-item:eq('+ j +')').find('.a-color-price:eq('+ i +')').length > 0){
          price = $('.s-result-item:eq('+ j +')').find('.a-color-price:eq('+ i +')').text();
          if(price.split("from").length > 1){
            price = price.split("from");
            price = price[1].trim();
          }
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price = price[1];
          }
          if(price.split("₹").length > 1){
            price = price.split("₹");
            price = price[1];
          }
          price = price.split(",").join("").trim();
        }
      }
      else{
        price = "";
      }
      price = parseFloat(price);
      if(isNaN(price) == true){
        price = "";
      }


      // if(count != 0 && (arrayToSend[count - 1][0] == PID) ){
        if(PID != "" && price != "" && PID != undefined && price != undefined) {
          if(count != 0 && (arrayToSend[count - 1][0] == PID)){
            if(price < arrayToSend[count-1][1]){
             arrayToSend[count-1][1] = price;
           }
         }
         else{
           arrayToSend.push([PID, price]);
           count = count + 1;
         }
       }
      // }

        // //////console.log("count: "+count);
        // //////console.log("array: "+arrayToSend[count-1]);


    } // for ends
  }
  //////console.log(arrayToSend);

}
}

if($('.gbwshoveler-button-wrapper li').length > 0){
  var slider = $('.gbwshoveler-button-wrapper li');
  var sliderLength = slider.length;
  var link;
  var price;
  var PID;
  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    if($('.gbwshoveler-button-wrapper li:eq('+ i +') a').length > 0){
      link = $('.gbwshoveler-button-wrapper li:eq('+ i +') a:eq(0)').attr('href');
      if(link != ""){
       if(link.split("amazon.in").length < 2){
        link = "http://www.amazon.in/"+link;
      }
      PID = returnPID(link);
    }
    else{
      PID = "";
    }
  }
  if(PID != ""){
    if($('.gbwshoveler-button-wrapper li:eq('+ i +')').find('#dealPriceBlock #dealDealPrice').length > 0){
      price = $('.gbwshoveler-button-wrapper li:eq('+ i +')').find('#dealPriceBlock #dealDealPrice:eq(0)').text();
      if(price.split("Rs.").length > 1){
        price = price.split("Rs.");
        price = price[1];
      }
      if(price.split("₹").length > 1){
        price = price.split("₹");
        price = price[1];
      }
      price = price.split(",").join("").trim();
    }
  }
  else{
    price = "";
  }
  price = parseFloat(price);
  if(isNaN(price) == true){
    price = "";
  }
  if(PID != "" && price != ""){
    arrayToSend.push([PID, price]);
  }

    } // for ends

  }

  if($('#rhfShovelerWrapper .a-carousel-row-inner li').length > 0){
    var slider = $('#rhfShovelerWrapper .a-carousel-row-inner li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('#rhfShovelerWrapper .a-carousel-row-inner li:eq('+ i +') a').length > 0){
        link = $('#rhfShovelerWrapper .a-carousel-row-inner li:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('#rhfShovelerWrapper .a-carousel-row-inner li:eq('+ i +')').find('.price').length > 0){
          price = $('#rhfShovelerWrapper .a-carousel-row-inner li:eq('+ i +')').find('.price:eq(0)').text();
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
      price = parseFloat(price);
      if(isNaN(price) == true){
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price]);
      }

    } // for ends

  }

  if($('#conditional-probability_feature_div li').length > 0){
    var slider = $('#conditional-probability_feature_div li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('#conditional-probability_feature_div li:eq('+ i +') a').length > 0){
        link = $('#conditional-probability_feature_div li:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('#conditional-probability_feature_div li:eq('+ i +')').find('.price').length > 0){
          price = $('#conditional-probability_feature_div li:eq('+ i +')').find('.price:eq(0)').text();
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
      price = parseFloat(price);
      if(isNaN(price) == true){
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price]);
      }

    } // for ends

  }

  if($('#searchResults #mainResults .prod').length > 0){
    var slider = $('#searchResults #mainResults .prod');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('#searchResults #mainResults .prod:eq('+ i +') a').length > 0){
        link = $('#searchResults #mainResults .prod:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('#searchResults #mainResults .prod:eq('+ i +')').find('.rsltGridList .mkp2 .price').length > 0){
          price = $('#searchResults #mainResults .prod:eq('+ i +')').find('.rsltGridList .mkp2 .price:eq(0)').text();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price = price[1];
          }
          price = price.split(",").join("").trim();
        }
        else if($('#searchResults #mainResults .prod:eq('+ i +')').find('.rsltGridList .newp .red').length > 0){
          price = $('#searchResults #mainResults .prod:eq('+ i +')').find('.rsltGridList .newp .red:eq(0)').text();
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
      price = parseFloat(price);
      if(isNaN(price) == true){
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price]);
      }

    } // for ends

  }

  if($('.zgChartBody .rankedItem').length > 0){
    var slider = $('.zgChartBody .rankedItem');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.zgChartBody .rankedItem:eq('+ i +') a').length > 0){
        link = $('.zgChartBody .rankedItem:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.zgChartBody .rankedItem:eq('+ i +')').find('.s9Price').length > 0){
          price = $('.zgChartBody .rankedItem:eq('+ i +')').find('.s9Price').text();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price = price[1];
          }
          price = price.split(",").join("").trim();
        }
        else if($('.zgChartBody .rankedItem:eq('+ i +')').find('.priceBlock .price').length > 0){
          price = $('.zgChartBody .rankedItem:eq('+ i +')').find('.priceBlock .price').text().trim();
          if(price != ""){
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            price = price.split(",").join("").trim();
          }
        }
      }
      else{
        price = "";
      }
      price = parseFloat(price);
      if(isNaN(price) == true){
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price]);
      }

    } // for ends

  }

  if($('.a-carousel').length > 0){
    var slider = $('.a-carousel li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.a-carousel li:eq('+ i +') a').length > 0){
        link = $('.a-carousel li:eq('+ i +') a:eq(0)').attr('href');
        if(link != "" && link != undefined){
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('.a-carousel li:eq('+ i +')').find('.price').length > 0){
            price = $('.a-carousel li:eq('+ i +')').find('.price:eq(0)').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            price = price.split(",").join("").trim();
          }
          else if($('.a-carousel li:eq('+ i +')').find('.a-color-price').length > 0){
            price = $('.a-carousel li:eq('+ i +')').find('.a-color-price:eq(0)').text();
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
        price = parseFloat(price);

        if(isNaN(price) == true){
          price = "";
        }
        if(PID != "" && price != ""){
          arrayToSend.push([PID, price]);
        }
      }
    } // for ends

  } //1st if ends
  if($('#fbt_item_details').length > 0){
    var slider = $('#fbt_item_details li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('#fbt_item_details li:eq('+ i +') a').length > 0){
        link = $('#fbt_item_details li:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){
        if($('#fbt_item_details li:eq('+ i +')').find('.price').length > 0){
          price = $('#fbt_item_details li:eq('+ i +')').find('.price').text();
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
      price = parseFloat(price);

      if(isNaN(price) == true){
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price]);
      }

    } // for ends

  }


  if($('.asin').length > 0){
    var slider = $('.asin');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.asin:eq('+ i +') a').length > 0){
        link = $('.asin:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.asin:eq('+ i +')').find('.t11:eq(2) .price').length > 0){
          price = $('.asin:eq('+ i +')').find('.t11:eq(2) .price:eq(0)').text();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price = price[1];
          }
          price = price.split(",").join("").trim();
        }
        else if($('.asin:eq('+ i +')').find('.s9Price').length > 0){
          price = $('.asin:eq('+ i +')').find('.s9Price').text();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price = price[1];
          }
          price = price.split(",").join("").trim();
        }
        else if($('.asin:eq('+ i +')').find('.priceBlock').length > 0){
          price = $('.asin:eq('+ i +')').find('.priceBlock').text().trim();
          if(price != ""){
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            price = price.split(",").join("").trim();
          }
        }
      }
      else{
        price = "";
      }
      price = parseFloat(price);

      if(isNaN(price) == true){
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price]);
      }

    } // for ends

  }

  if($('.cpsims li').length > 0){
    var slider = $('.cpsims li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.cpsims li:eq('+ i +') a').length > 0){
        link = $('.cpsims li:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.cpsims li:eq('+ i +')').find('.price').length > 0){
          price = $('.cpsims li:eq('+ i +')').find('.price').text();
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
      price = parseFloat(price);

      if(isNaN(price) == true){
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price]);
      }

    } // for ends

  }


  if($('#mainResults .celwidget').length > 0){
    var slider = $('#mainResults .celwidget');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength.length;i++){
      price = "";
      PID = "";
      if($('#mainResults .celwidget:eq('+ i +') a').length > 0){
        link = $('#mainResults .celwidget:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('#mainResults .celwidget:eq('+ i +')').find('.price').length > 0){
          price = $('#mainResults .celwidget:eq('+ i +')').find('.price').text();
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
      price = parseFloat(price);

      if(isNaN(price) == true){
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price]);
      }

    } // for ends

  }

  if($('.shoveler-content').length > 0){
    var slider = $('.shoveler-content li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.shoveler-content li:eq('+ i +') a').length > 0){
        link = $('.shoveler-content li:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('.shoveler-content li:eq('+ i +')').find('.price').length > 0){
            price = $('.shoveler-content li:eq('+ i +')').find('.price').text();
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
        price = parseFloat(price);
        if(isNaN(price) == true){
          price = "";
        }
        if(PID != "" && price != ""){
          arrayToSend.push([PID, price]);
        }
      }
    } // for ends

  } //1st if ends


  if($('#recommendations .a-list-item').length > 0){
    var slider = $('#recommendations .a-list-item');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('#recommendations .a-list-item:eq('+ i +') a').length > 0){
        link = $('#recommendations .a-list-item:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('#recommendations .a-list-item:eq('+ i +')').find('.item-price').length > 0){
            price = $('#recommendations .a-list-item:eq('+ i +')').find('.item-price .a-color-secondary').text();
            if(price.split("-").length > 1){
              price = price.split("-");
              price = price[0];
            }
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[0];
            }
            price = price.split(",").join("").trim();
          }
        }
        else{
          price = "";
        }
        price = parseFloat(price);
        if(isNaN(price) == true){
          price = "";
        }
        if(PID != "" && price != ""){
          arrayToSend.push([PID, price]);
        }
      }
    } // for ends

  } //1st if ends

  if($('.recs-grid-item').length > 0){
    var slider = $('.recs-grid-item');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.recs-grid-item:eq('+ i +') a').length > 0){
        link = $('.recs-grid-item:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("amazon.in").length < 2){
            link = "http://www.amazon.in/"+link;
          }
          PID = returnPID(link);

        }
        else{
          PID = "";
        }

        if(PID != ""){
          if($('.recs-grid-item:eq('+ i +')').find('.p13n-sc-price').length > 0){
            price = $('.recs-grid-item:eq('+ i +')').find('.p13n-sc-price:eq(0)').text().trim();
            if(price.split("-").length > 1){
              price = price.split("-");
              price = price[0];
            }
            price = filter_price(price);
          }
          price = parseFloat(price);
          if(isNaN(price) == true){
            price = "";
          }
          if(PID != "" && price != ""){
            arrayToSend.push([PID, price]);
          }
        }
      }
    }
  }

  arrayToSend = JSON.stringify(arrayToSend);
  var jsonArr = [{'pairsAmaz': arrayToSend}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(0, jsonArr, 0, doNothing, []);
}



function sendPairs(){
  var arrayToSend = [];
  var dropToSend = [];

  if($('.s-result-item').length > 0){
    var slider = $('.s-result-item');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var prod = "";
    var image = "";
    var oos = 0;
    for(i=0;i<sliderLength;i++){
      price = 0;
      PID = "";
      prod = "";
      image = "";
      oos = 0;
      price_now = 0;
      if($('.s-result-item:eq('+ i +')').length > 0){
        if($('.s-result-item:eq('+ i +')').attr("data-asin")){
          PID = $('.s-result-item:eq('+ i +')').attr("data-asin");
        }
        else if($('.s-result-item:eq('+ i +') a').attr("href")){
          link = $('.s-result-item:eq('+ i +') a').attr("href");
          if(link.split("/slredirect/picca").length > 1){
            link = $('.s-result-item:eq('+ i +') a:eq(1)').attr("href");
          }
          if(link.split("amazon.in").length < 2){
            link = "www.amazon.in"+link;
          }
          PID = returnPID(link);

        }
        else{
          PID = "";
        }
        if(PID != ""){
          if($('.s-result-item:eq('+ i +')').find('img').attr("srcset")){
            image = $('.s-result-item:eq('+ i +')').find('img:eq(0)').attr("srcset").trim();
            if(image.split("1x").length > 1){
              image = image.split("1x");
              image = image[0]+"1x";
              image = image.trim();
            }
          }

          if( (image == "" || image.split(".jpg").length < 2 || image.split(".jpeg").length < 2 || image.split(".png").length < 2) && $('.s-result-item:eq('+ i +')').find('img').attr("src")){
            image = $('.s-result-item:eq('+ i +')').find('img:eq(0)').attr("src").trim();
          }


          if($('.s-result-item:eq('+ i +')').find('a').attr("title")){
            prod = $('.s-result-item:eq('+ i +')').find('a:eq(0)').attr("title").trim();
          }
          if(prod == "" || prod == "undefined"){
            if($('.s-result-item:eq('+ i +')').find('h2').attr("data-attribute")){
              prod = $('.s-result-item:eq('+ i +')').find('h2:eq(0)').attr("data-attribute").trim();
            }
          }

          if( (isNaN(price) || price == "" || price == 0) && $('.s-result-item:eq('+ i +')').find('.a-color-price.s-price').length > 0){
            if($('.s-result-item:eq('+ i +')').find('.a-color-price.s-price:eq(0)').parent().attr("href")){
              price_url = $('.s-result-item:eq('+ i +')').find('.a-color-price.s-price:eq(0)').parent().attr("href");
              if(price_url.split("amazon.in").length < 2){
                price_url = "www.amazon.in/"+price_url;
              }
              if(returnPID(price_url) != PID){
                price = "";
              }
            }
            else{
              price = $('.s-result-item:eq('+ i +')').find('.a-color-price.s-price:eq(0)').text().trim();
              price = price.split("&nbsp;").join("").trim();
              price = filter_price(price);
            }
          }

          if($('.s-result-item:eq('+ i +')').find('.a-color-price').length > 0){
            price_len = $('.s-result-item:eq('+ i +')').find('.a-color-price').length;

            for(var p =0;p<price_len;p++){
              price_now = $('.s-result-item:eq('+ i +')').find('.a-color-price:eq('+p+')').text().trim();
              if(price_now.split("from").length > 1){
                price_now = price_now.split("from");
                price_now = price_now[1].trim();
                price = filter_price(price_now);
              }
              else if($('.s-result-item:eq('+ i +')').find('.a-color-price:eq('+p+')').parent().attr("href")){
                price_url = $('.s-result-item:eq('+ i +')').find('.a-color-price:eq('+p+')').parent().attr("href");
                if(price_url.split("amazon.in").length < 2){
                  price_url = "www.amazon.in/"+price_url;
                }
                if(returnPID(price_url) == PID && filter_price(price_now) != 0 && filter_price(price_now) != "" && !isNaN(filter_price(price_now))  ){
                  if(!isNaN(price) && price > 0 && price < filter_price(price_now) && price != ""){

                  }
                  else if(price_now != undefined){
                    price = filter_price(price_now);
                  }
                }

              }
            }

          }
          if(isValidISBN(PID.toString()) && prod.trim() != ""){
            prod = prod + " " + convertISBN(PID.toString());
          }
          if(PID != "" && price != "" && price != 0 && !isNaN(price)){
            arrayToSend.push([PID, price, prod, image, oos]);
            dropToSend.push(PID);
          }

        }
      }
    }
  }

  if($('.a-carousel-card').length > 0){
    var slider = $('.a-carousel-card');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var prod = "";
    var image = "";
    var oos = 0;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.a-carousel-card:eq('+ i +')').length > 0){
        if($('.a-carousel-card:eq('+ i +') a:eq(0)').attr("href")){

          link = $('.a-carousel-card:eq('+ i +') a:eq(0)').attr("href");
          if(link.split("/slredirect/picca").length > 1){
            link = $('.a-carousel-card:eq('+ i +') a:eq(1)').attr("href");
          }
          if(link.split("amazon.in").length < 2){
            link = "www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else if($('.a-carousel-card:eq('+ i +') a:eq(1)').attr("href")){
          link = $('.a-carousel-card:eq('+ i +') a:eq(1)').attr("href");
          if(link.split("amazon.in").length < 2){
            link = "www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
        if(PID == "" && $('.a-carousel-card:eq('+ i +') div:eq(0)').attr("data-asin")){
          link = $('.a-carousel-card:eq('+ i +') div:eq(0)').attr("data-asin");
          if(link.split("amazon.in").length < 2){
            link = "www.amazon.in/"+link;
          }
          PID = returnPID(link);
        }
        if(PID != ""){

          if($('.a-carousel-card:eq('+ i +')').find('img').attr("alt")){
            prod = $('.a-carousel-card:eq('+ i +')').find('img:eq(0)').attr("alt").trim();
          }
          if(prod == ""){
            if($('.a-carousel-card:eq('+ i +')').find('a:eq(0)').attr("title")){
              prod = $('.a-carousel-card:eq('+ i +')').find('a:eq(0)').attr("title").trim();
            }
          }
          if(prod == ""){
            if($('.a-carousel-card:eq('+ i +')').find('a:eq(1)').attr("title")){
              prod = $('.a-carousel-card:eq('+ i +')').find('a:eq(1)').attr("title").trim();
            }
          }

          if( (isNaN(price) || price == "" || price == 0) && $('.a-carousel-card:eq('+ i +')').find('.p13n-sc-price').length > 0){
            price = $('.a-carousel-card:eq('+ i +')').find('.p13n-sc-price:eq(0)').text().trim();
            price = price.split("&nbsp;").join("").trim();
            price = filter_price(price);
          }
          else if( (isNaN(price) || price == "" || price == 0) && $('.a-carousel-card:eq('+ i +')').find('.acs_product-price__buying').length > 0){
            price = $('.a-carousel-card:eq('+ i +')').find('.acs_product-price__buying:eq(0)').text().trim();
            price = price.split("&nbsp;").join("").trim();
            price = filter_price(price);
          }
          else if( (isNaN(price) || price == "" || price == 0) && $('.a-carousel-card:eq('+ i +')').find('.a-color-price').length > 0){
            price = $('.a-carousel-card:eq('+ i +')').find('.a-color-price:eq(0)').text().trim();
            price = price.split("&nbsp;").join("").trim();
            price = filter_price(price);
          }

          if($('.a-carousel-card:eq('+ i +')').find('.a-color-price').length > 0){
            price_len = $('.a-carousel-card:eq('+ i +')').find('.a-color-price').length;

            for(var p =0;p<price_len;p++){
              price_now = $('.a-carousel-card:eq('+ i +')').find('.a-color-price:eq('+p+')').text().trim();
              if(price_now.split("from").length > 1){
                price_now = price_now.split("from");
                price_now = price_now[1].trim();
                price = filter_price(price_now);
              }
              else if($('.a-carousel-card:eq('+ i +')').find('.a-color-price:eq('+p+')').parent().attr("href")){
                price_url = $('.a-carousel-card:eq('+ i +')').find('.a-color-price:eq('+p+')').parent().attr("href");
                if(price_url.split("amazon.in").length < 2){
                  price_url = "www.amazon.in/"+price_url;
                }
                if(returnPID(price_url) == PID && filter_price(price_now) != 0 && filter_price(price_now) != "" && !isNaN(filter_price(price_now))  ){
                  if(!isNaN(price) && price > 0 && price < filter_price(price_now) && price != ""){

                  }
                  else if(price_now != undefined){
                    price = filter_price(price_now);
                  }
                }

              }
            }

          }
          if($('.a-carousel-card:eq('+ i +')').find('img').attr("data-src")){
            image = $('.a-carousel-card:eq('+ i +')').find('img:eq(0)').attr("data-src").trim();
          }
          else if($('.a-carousel-card:eq('+ i +')').find('img').attr("src")){
            image = $('.a-carousel-card:eq('+ i +')').find('img:eq(0)').attr("src").trim();
          }

          if(image.split(".jpg").length < 2 && image.split(".jpeg").length < 2 && image.split(".png").length < 2){
            image = "";
          }
          if(isValidISBN(PID.toString()) && prod.trim() != ""){
            prod = prod + " " + convertISBN(PID.toString());
          }
          if(PID != "" && price != "" && price != 0 && !isNaN(price)){
            arrayToSend.push([PID, price, prod, image, oos]);
            dropToSend.push(PID);
          }

        }
      }
    }
  }

  if($('.vxd-music-bs-col-content').length > 0){
    var slider = $('.vxd-music-bs-col-content');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var prod = "";
    var image = "";
    var oos = 0;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.vxd-music-bs-col-content:eq('+ i +')').length > 0){
        if($('.vxd-music-bs-col-content:eq('+ i +') a').attr("href")){
          link = $('.vxd-music-bs-col-content:eq('+ i +') a').attr("href");
          if(link.split("/slredirect/picca").length > 1){
            link = $('.vxd-music-bs-col-content:eq('+ i +') a:eq(1)').attr("href");
          }
          if(link.split("amazon.in").length < 2){
            link = "www.amazon.in/"+link;
          }
          PID = returnPID(link);

        }
        else{
          PID = "";
        }
        if(PID != ""){
          if($('.vxd-music-bs-col-content:eq('+ i +')').find('img').attr("data-src")){
            image = $('.vxd-music-bs-col-content:eq('+ i +')').find('img:eq(0)').attr("data-src").trim();
            if(image.split("1x").length > 1){
              image = image.split("1x");
              image = image[0]+"1x";
              image = image.trim();
            }
          }

          if( (image == "" && image.split(".jpg").length < 2 && image.split(".jpeg").length < 2 && image.split(".png").length < 2) && $('.vxd-music-bs-col-content:eq('+ i +')').find('img').attr("src")){
            image = $('.vxd-music-bs-col-content:eq('+ i +')').find('img:eq(0)').attr("src").trim();
          }


          if($('.vxd-music-bs-col-content:eq('+ i +')').find('a').attr("title")){
            prod = $('.vxd-music-bs-col-content:eq('+ i +')').find('a:eq(0)').attr("title").trim();
          }
          if(prod == "" || prod == "undefined"){
            if($('.vxd-music-bs-col-content:eq('+ i +')').find('h2').attr("data-attribute")){
              prod = $('.vxd-music-bs-col-content:eq('+ i +')').find('h2:eq(0)').attr("data-attribute").trim();
            }
          }

          if($('.vxd-music-bs-col-content:eq('+ i +')').find('.a-color-price').length > 0){
            price_len = $('.vxd-music-bs-col-content:eq('+ i +')').find('.a-color-price').length;

            for(var p =0;p<price_len;p++){
              price_now = $('.vxd-music-bs-col-content:eq('+ i +')').find('.a-color-price').text().trim();
              if(price_now.split("from").length > 1){
                price_now = price_now.split("from");
                price_now = price_now[1].trim();
                price = filter_price(price_now);
              }
            }

          }

          if( (isNaN(price) || price == "" || price == 0) && $('.vxd-music-bs-col-content:eq('+ i +')').find('.vxd-music-bs-price .a-color-price').length > 0){
            price = $('.vxd-music-bs-col-content:eq('+ i +')').find('.vxd-music-bs-price .a-color-price:eq(0)').text().trim();
            price = price.split("&nbsp;").join("").trim();
            price = filter_price(price);
          }
          if(isValidISBN(PID.toString()) && prod.trim() != ""){
            prod = prod + " " + convertISBN(PID.toString());
          }
          if(PID != "" && price != "" && price != 0 && !isNaN(price)){
            arrayToSend.push([PID, price, prod, image, oos]);
            dropToSend.push(PID);
          }

        }
      }
    }
  }

  if($('.widgetContent .dealView').length > 0){
    var slider = $('.widgetContent .dealView');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var prod = "";
    var image = "";
    var oos = 0;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.widgetContent .dealView:eq('+ i +')').length > 0){
        if($('.widgetContent .dealView:eq('+ i +') a').attr("href")){
          link = $('.widgetContent .dealView:eq('+ i +') a').attr("href");
          if(link.split("/slredirect/picca").length > 1){
            link = $('.widgetContent .dealView:eq('+ i +') a:eq(1)').attr("href");
          }
          if(link.split("amazon.in").length < 2){
            link = "www.amazon.in/"+link;
          }
          PID = returnPID(link);

        }
        else{
          PID = "";
        }
        if(PID != ""){
          if($('.widgetContent .dealView:eq('+ i +')').find('img').attr("data-src")){
            image = $('.widgetContent .dealView:eq('+ i +')').find('img:eq(0)').attr("data-src").trim();
          }
          else if($('.widgetContent .dealView:eq('+ i +')').find('img').attr("src")){
            image = $('.widgetContent .dealView:eq('+ i +')').find('img:eq(0)').attr("src").trim();
          }

          if($('.widgetContent .dealView:eq('+ i +')').find('.dealTitleTwoLine').length > 0){
            prod = $('.widgetContent .dealView:eq('+ i +')').find('.dealTitleTwoLine:eq(0)').text().trim();
          }
          if($('.widgetContent .dealView:eq('+ i +')').find('.priceBlock').length > 0){
            price = $('.widgetContent .dealView:eq('+ i +')').find('.priceBlock').text().trim();
            price = price.split("&nbsp;").join("").trim();
            price = filter_price(price);
          }
          if($('.widgetContent .dealView:eq('+ i +')').find(".buttonOuterContainer").length > 0){
            if($('.widgetContent .dealView:eq('+ i +')').find(".buttonOuterContainer").text().trim().toUpperCase().split("DEAL HAS ENDED").length > 1){
              PID = "";
            }
          }
          if(isValidISBN(PID.toString()) && prod.trim() != ""){
            prod = prod + " " + convertISBN(PID.toString());
          }
          if(PID != "" && price != "" && price != 0 && !isNaN(price)){
            arrayToSend.push([PID, price, prod, image, oos]);
            dropToSend.push(PID);
          }

        }
      }
    }
  }
  if($('.singleCell').length > 0){
    var slider = $('.singleCell');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var prod = "";
    var image = "";
    var oos = 0;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.singleCell:eq('+ i +')').length > 0){
        if($('.singleCell:eq('+ i +') a').attr("href")){
          link = $('.singleCell:eq('+ i +') a').attr("href");
          if(link.split("/slredirect/picca").length > 1){
            link = $('.singleCell:eq('+ i +') a:eq(1)').attr("href");
          }
          if(link.split("amazon.in").length < 2){
            link = "www.amazon.in/"+link;
          }
          PID = returnPID(link);

        }
        else{
          PID = "";
        }
        if(PID != ""){
          if($('.singleCell:eq('+ i +')').find('img').attr("data-src")){
            image = $('.singleCell:eq('+ i +')').find('img:eq(0)').attr("data-src").trim();
          }
          else if($('.singleCell:eq('+ i +')').find('img').attr("src")){
            image = $('.singleCell:eq('+ i +')').find('img:eq(0)').attr("src").trim();
          }

          if($('.singleCell:eq('+ i +')').find('.dealTitleTwoLine').length > 0){
            prod = $('.singleCell:eq('+ i +')').find('.dealTitleTwoLine:eq(0)').text().trim();
          }
          if($('.singleCell:eq('+ i +')').find('.priceBlock').length > 0){
            price = $('.singleCell:eq('+ i +')').find('.priceBlock').text().trim();
            price = price.split("&nbsp;").join("").trim();
            price = filter_price(price);
          }

          if(isValidISBN(PID.toString()) && prod.trim() != ""){
            prod = prod + " " + convertISBN(PID.toString());
          }
          if(PID != "" && price != "" && price != 0 && !isNaN(price)){
            arrayToSend.push([PID, price, prod, image, oos]);
            dropToSend.push(PID);
          }

        }
      }
    }
  }
  // console.log("reached here2 with "+arrayToSend);
  // console.log("reached here2 with dropToSend");

  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsAmaz': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
    arrayToSend = JSON.stringify(arrayToSend);
  }
  if(dropToSend.length > 0){
    dropToSend = JSON.stringify(dropToSend);
    var jsonArr = [{'pids': dropToSend, 'pos': 63}];
    jsonArr = JSON.stringify(jsonArr);
    var passBack = ['.RIGHT-COL-SDL a', '.s-result-item .a-color-price', '.gbwshoveler-button-wrapper li',  '#rhfShovelerWrapper .a-carousel-row-inner li', '#conditional-probability_feature_div li', '#searchResults #mainResults .prod', '.zgChartBody .rankedItem', '.a-carousel li', '#fbt_item_details li', '.asin', '.cpsims li', '#mainResults .celwidget', '.shoveler-content li', '#recommendations .a-list-item', '.recs-grid-item', '.s-result-item', '.a-carousel-card', '.vxd-music-bs-col-content','.singleCell', '.widgetContent .dealView'];
    sendMessage(1, jsonArr, 30, displayRecentDrops, passBack);
  }
}
function sendCurrent(){
  curData = [];
  var prod = getProd();
  var image = getImage();
  var myPrice = getPrice();
  var PID = getPID();
  var current_status = 0;
  var breadcrumb_str = getBreadCrumb();
  if(getAvailability() == 0){
    current_status = 1;
  }
  else if(getAvailability() == -1){
    current_status = 2;
  }

  var a = $('body').text();
  if(a.split("ISBN-13:").length>1){
    isbn = a.split("ISBN-13:")[1].trim().split(" ")[0].trim().split("-").join("");
    console.log("ISBN found " + isbn);
  }
  else {
    isbn = false;
  }

  if(isbn){
    prod = prod + " " + isbn;
  }
    // console.log("current_status: "+current_status);

    var cur_url = window.location.href;
    curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
    curData = JSON.stringify(curData);
    var jsonArr = [{'curDataAmaz': curData}];
    jsonArr = JSON.stringify(jsonArr);
    if($("#imageBlock").length > 0 || cur_url.split("/product").length > 1){
      sendMessage(0, jsonArr, 0, doNothing, []);
    }

  }

  var pollInterval = 1000 * 15;
  window.setTimeout(sendCurrent, 5000);
  window.setTimeout(sendPairs, 5000);
  window.setTimeout(sendSpecial, 5000);
  window.setTimeout(sendPairsAPI, 5000);
  window.setTimeout(sendPairsAPI, pollInterval);
  window.setTimeout(sendPairs, pollInterval);

//avail (1 = available, 0 = oos, -1 = permanently disconnected )

var check_prod_pg = 1;

// if($('.top-section').attr('itemtype') == "http://schema.org/Product"){
//  check_prod_pg = 1; //product page
// }
// else{
//  check_prod_pg = 0;
// }



function getProd(){
  $ = jQuery.noConflict();
  var prod = "";

  if($('#btAsinTitle').length>0){
    prod = $('#btAsinTitle').text().trim();
  }
  else if($('#productTitle').length > 0){
    prod = $('#productTitle').text().trim();
  }
  else if($("#product-title").length >0)
  {
    prod = $("#product-title").text().trim();
  }
  else if($("#ebooksProductTitle").length >0)
  {
    prod = $("#ebooksProductTitle").text().trim();
  }
  else if($("#title").length >0)
  {
    prod = $("#title").text().trim();
  }
  else
  {
    prod = $('h1').text().trim();
  }
  if($("#imageBlock").length > 0 || $("#imageBlockNew_feature_div").length > 0){
    return prod;
  }
  else{
    return "";
  }
}

function getImage(){
  $ = jQuery.noConflict();

  var image = "";
  if($("#prodImage").length > 0)
  {
    image = $("#prodImage").attr("src");
  }
  else if($('#prodImageCell').length>0){
    image = $('#prodImageCell').find('img').attr('src');
  }
  else if($('#holderMainImage').length>0 && image2 == undefined){
    image = $('#holderMainImage').find('img').attr("src");
  }
  else if($('#main-image').length>0 && image2 == undefined){
    image = $('#main-image').attr('src');
  }
  else if($("#detailImg").length > 0)
  {
    image = $("#detailImg").attr("src");
  }
  else if($("#kib-ma-container-0").length > 0 )
  {
    image = $("#kib-ma-container-0 img").attr("src");
  }
  else if($("#imgTagWrapperId").length > 0)
  {
    image = $("#imgTagWrapperId img").attr("src");
  }
  else if($('.imageDiv img').length > 0){
    image = $('.imageDiv img:eq(2)').attr('src');
  }
  else if($('#imgBlkFront').length > 0){
    image = $('#imgBlkFront').attr('src');
  }
  else if($('#ebooksImgBlkFront').length > 0){
    image = $('#ebooksImgBlkFront').attr('src');
  }
  if(image == undefined){
    image = "NO IMAGE";
  }
  if(image.split("data:image/webp;base64").length > 1){
    if($("#imgTagWrapperId").length > 0)
    {
      image = $("#imgTagWrapperId img").attr("data-a-dynamic-image");
      if(image.split('"').length > 1){
        image = image.split('"');
        image = image[1];
      }
    }
    else{
      image = "";
    }
  }

  // //////console.log("image: "+image);
  return image;
}

function getPrice(){
  $ = jQuery.noConflict();
  price = "";
  price1 = "";
  if($('#moreBuyingChoices_feature_div .a-color-price').length > 0){
    var slider = $('#moreBuyingChoices_feature_div .a-color-price');
    var sliderLength = slider.length;
    var priceArr = [];
    var priceMin = 10000000;

    for(i=0;i<sliderLength;i++){
      price = "";
      price1 = "";
      if($('#moreBuyingChoices_feature_div .a-color-price:eq('+ i +')').length > 0){
        if($("#moreBuyingChoices_feature_div .a-color-price:eq("+ i +")").parent().text().toUpperCase().split("USED").length < 2 && $("#moreBuyingChoices_feature_div .a-color-price:eq("+ i +")").parent().text().toUpperCase().split("REFURBISH").length < 2 && $('#moreBuyingChoices_feature_div .a-color-price:eq('+ i +')').text().trim() != ""){
          price = $('#moreBuyingChoices_feature_div .a-color-price:eq('+ i +')').text();
          price = filter_price(price);
        }
      }
      if(price < priceMin && price != "" && !isNaN(price)){
        priceMin = price;

      }
    } // for ends
    if(priceMin != 10000000){
      price = priceMin;
    }

  }
  else if($('.mbcContainer .mbcPriceCell').length > 0){
    var slider = $('.mbcContainer .mbcPriceCell');
    var sliderLength = slider.length;
    var price;
    var price1;
    var priceArr = [];
    var priceMin = 10000000;

    for(i=0;i<sliderLength;i++){
      price = "";
      price1 = "";
      if($('.mbcContainer .mbcPriceCell:eq('+ i +')').length > 0){
        price = $('.mbcContainer .mbcPriceCell:eq('+ i +')').text();
        price = filter_price(price);

      }


      if(price < priceMin){
        priceMin = price;

      }


    } // for ends

    if(priceMin != 10000000){
      price = priceMin;
    }

  }

  // main price middle price

  if($('#price #priceblock_saleprice').length > 0){
    price1 = $('#price #priceblock_saleprice').text();
    price1 = filter_price(price1);


    if(price1 < price){
      price = price1;
    }
    else if(price == "" || price == undefined || isNaN(price) == true){
      price = price1;
    }
  }
  if($('#price #priceblock_ourprice').length > 0){
    price1 = $('#price #priceblock_ourprice').text();
    if(price1.split("-").length > 1){
      price1 = price1.split("-")[0].trim();
    }
    price1 = filter_price(price1);


    if(price1 < price){
      price = price1;
    }
    else if(price == "" || price == undefined || isNaN(price) == true){
      price = price1;
    }
  }
  if($('#buyingPriceValue').length > 0){
    price1 = $('#buyingPriceValue').text();
    price1 = filter_price(price1);


    if(price1 < price){
      price = price1;
    }
    else if(price == "" || price == undefined || isNaN(price) == true){
      price = price1;
    }
  }

  if($('#priceBlock .priceLarge').length > 0){
    price1 = $('#priceBlock .priceLarge').text();
    price1 = filter_price(price1);


    if(price1 < price){
      price = price1;
    }
    else if(price == "" || price == undefined || isNaN(price) == true){
      price = price1;
    }
  }

  if($('.swatchElement.selected .a-color-price').length > 0){
    price1 = $('.swatchElement.selected .a-color-price').text();
    price1 = filter_price(price1);

    if(price1 < price){
      price = price1;
    }
    else if(price == "" || price == undefined || isNaN(price) == true){
      price = price1;
    }
  }
  if($('.swatchElement.selected .a-color-base').length > 0){
    price1 = $('.swatchElement.selected .a-color-base').text();
    if(price1.split("from").length > 1){
      price1 = price1.split("from");
      price1 = price1[1].trim();
    }
    price1 = filter_price(price1);

    if(price1 < price){
      price = price1;
    }
    else if(price == "" || price == undefined || isNaN(price) == true){
      price = price1;
    }
  }


  //middle lowest price (starts from)
  if($('#olp_feature_div .a-color-price').length > 0){
    price1 = $('#olp_feature_div .a-color-price').text();
    price1 = filter_price(price1);

    if(price1 < price){
      price = price1;
    }
    else if(price == "" || price == undefined || isNaN(price) == true){
      price = price1;
    }
  }

  //side lowest price (offer from )

  if($('#secondaryUsedAndNew .price').length > 0){
    price1 = $('#secondaryUsedAndNew .price').text();
    price1 = filter_price(price1);


    if(price1 < price){
      price = price1;
    }
    else if(price == "" || price == undefined || isNaN(price) == true){
      price = price1;
    }
  }
  if($('#mbc .a-size-small .a-color-price').length > 0){
    if($("#mbc .a-size-small .a-color-price").parent().text().toUpperCase().split("USED").length < 2 && $("#mbc .a-size-small .a-color-price").parent().text().toUpperCase().split("REFURBISH").length < 2 && $('#mbc .a-size-small .a-color-price').text().trim() != ""){
      price1 = $('#mbc .a-size-small .a-color-price').text();
      price1 = filter_price(price1);
      if(price1 < price){
        price = price1;
      }
      else if(price == "" || price == undefined || isNaN(price) == true){
        price = price1;
      }
    }
  }

  if($('#priceblock_dealprice').length > 0){
    price1 = $('#priceblock_dealprice').text();
    price1 = filter_price(price1);


    if(price1 < price){
      price = price1;
    }
    else if(price == "" || price == undefined || isNaN(price) == true){
      price = price1;
    }
  }


  if((isNaN(price) || price == "" || price == 0) &&  $('.swatchElement.selected .olp-link').length > 0){
    price1 = $('.swatchElement.selected .olp-link').text();
    if(price1.split("to buy").length > 1){
      price = filter_price(price1);
    }
  }

  if($(".a-button-list .olp-new").length > 0){
    price1 = $(".a-button-list .olp-new:eq(0)").html();
    price1 = price1.split("</a>");
    price1 = price1[0];
    price1 = price1.split(">");
    price1 = price1[price1.length-1];
    price1 = filter_price(price1);
    if((price > price1 && price1 != 0 && price1 != undefined && !isNaN(price1)) ){
      price = price1;
    }
  }

  if((isNaN(price) || price == "" || price == 0) && $("#buybox").length > 0 && $("#buybox .a-color-price.a-size-medium").length > 0){
    price1 = $("#buybox .a-color-price.a-size-medium").html();
    price1 = price1.split("</p>");
    price1 = price1[0];
    price1 = price1.split("</span>");
    price1 = price1[1];
    price1 = price1.split("<");
    price1 = price1[0];
    price1 = filter_price(price1);
    if((price > price1 && price1 != 0 && price1 != undefined && !isNaN(price1)) ){
      price = price1;
    }
  }

  if((isNaN(price) || price == "" || price == 0) && $("#dpv2_redesign_priceblock_priceToPay").length > 0 && $("#dpv2_redesign_priceblock_priceToPay").length > 0){
    price1 = $("#dpv2_redesign_priceblock_priceToPay").text();
    price = filter_price(price1);
  }
  // console.log("Final Price: "+price);
  if(isNaN(price) == true || price == 10000000){
    price = "";
  }
  return price;
}

function getAvailability(){
  var avail = 1;
  var strToReject = ["currently unavailable", "permanently disconnected", "permanently discontinued"];
  if($("#outOfStock").length > 0){
    if($("#outOfStock").text().toLowerCase().split("currently unavailable").length > 1){
      avail = -1;
    }
    else{
      avail = 0;
    }
  }
  else if($("#invictus-app-link").length > 0){
    if($("#invictus-app-link").text().toLowerCase().split("currently unavailable").length > 1){
      avail = -1;
    }
    else{
      avail = 0;
    }
  }
  else if(($(".ensbox").length > 0) && ($(".ensbox").text().split("item becomes available").length > 1)){
    avail = 0;
  }
  else if(($(".availRed").length > 0) && ($(".availRed").text().split("notified when this item becomes available").length > 1)){
    avail = 0;
  }
  else if($('body').text().split('not a functioning page').length > 1){
    avail = -1;
  }
  else if($('body').text().split("but the page you're looking for is not available").length > 1 && getProd() == "" && (getPrice() == 0 || getPrice() == "")){
    avail = -1;
  }

  return avail;

}
function getPID(){

  var link = window.location.href;
  var pid = link;

  if(pid.split("#").length > 1){
    pid = pid.split("#")[0];
  }
  if(pid.split("?ASIN=").length > 1){
    pid = pid.split("?ASIN=")[1];
    if(pid.split("/").length > 1){
      pid = pid.split("/")[0];
    }
  }
  else if(pid.split("&ASIN=").length > 1){
    pid = pid.split("&ASIN=")[1];
    if(pid.split("/").length > 1){
      pid = pid.split("/")[0];
    }
  }
  else if(pid.split("/product/").length > 1){
    pid = pid.split("/product/")[1];
  }
  else if(pid.split("/dp/").length > 1){
    pid = pid.split("/dp/")[1];
  }
  else{
    pid = "";
  }
  if(pid != ""){
    if(pid.split("?").length > 1){
      pid = pid.split("?")[0];
    }
    if(pid.split("&").length > 1){
      pid = pid.split("&")[0];
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

    if(pid != pid.toUpperCase()){
      pid = "";
    }
  }
  return pid;
}

function returnPID(link){

  var pid = link;

  if(pid.split("#").length > 1){
    pid = pid.split("#")[0];
  }
  if(pid.split("?ASIN=").length > 1){
    pid = pid.split("?ASIN=")[1];
    if(pid.split("/").length > 1){
      pid = pid.split("/")[0];
    }
  }
  else if(pid.split("&ASIN=").length > 1){
    pid = pid.split("&ASIN=")[1];
    if(pid.split("/").length > 1){
      pid = pid.split("/")[0];
    }
  }
  else if(pid.split("/product/").length > 1){
    pid = pid.split("/product/")[1];
  }
  else if(pid.split("/dp/").length > 1){
    pid = pid.split("/dp/")[1];
  }
  else{
    pid = "";
  }

  if(pid != ""){
    if(pid.split("?").length > 1){
      pid = pid.split("?")[0];
    }
    if(pid.split("&").length > 1){
      pid = pid.split("&")[0];
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

    if(link.split('amazon.in').length < 2){
      pid = "";
    }
    if(link == ""){
      pid = "";
    }
    if(pid != pid.toUpperCase()){
      pid = "";
    }
  }
  return pid;
}

function getBreadCrumb(){
  var breadcrumb = "";
  var bread_final = "";
  var len_bread = $('#showing-breadcrumbs_div .a-link-normal').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('#showing-breadcrumbs_div .a-link-normal:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }
  if($('#breadcrumb-back-link').length > 0 || breadcrumb == ""){
    breadcrumb = "";
    bread_final = "";
    if($('#browse_feature_div .content:eq(0) a').length > 0){
     len_bread = $('#browse_feature_div .content:eq(0) a').length;


     for(i=0;i<len_bread;i++){
      breadcrumb = $('#browse_feature_div .content:eq(0) a:eq('+ i +')').text().trim();
      bread_final += breadcrumb + "*~";
    }

  }
  else if($('#a-page .bucket').length > 0){
    breadcrumb = "";
    bread_final = "";
    var len_bread1 = $('#a-page .bucket').length;
    for(var i=0;i<len_bread1;i++){
      var textCheck = $('#a-page .bucket:eq('+ i +')').text().trim();
      if(textCheck.toUpperCase().split("LOOK FOR SIMILAR ITEMS BY CATEGORY").length > 1){
        if($('#a-page .bucket:eq('+ i +') .content:eq(0) a').length > 0){
          var len_bread2 = $('#a-page .bucket:eq('+ i +') .content:eq(0) a').length;
          for(var k=0;k<len_bread2;k++){
            breadcrumb = $('#a-page .bucket:eq('+ i +') .content:eq(0) a:eq('+k+')').text().trim();
            bread_final += breadcrumb + "*~";
          }
        }
        break;
      }
      else if(textCheck.toUpperCase().split("PRODUCT DETAILS").length > 1){
        if($('#a-page .bucket:eq('+ i +') #SalesRank .zg_hrsr_ladder a').length > 0){
          var len_bread2 = $('#a-page .bucket:eq('+ i +') #SalesRank .zg_hrsr_ladder a').length;
          for(var k=0;k<len_bread2;k++){
            breadcrumb = $('#a-page .bucket:eq('+ i +') #SalesRank .zg_hrsr_ladder a:eq('+k+')').text().trim();
            bread_final += breadcrumb + "*~";
          }
        }
        break;
      }
    }

  }
  else if($('.a-breadcrumb:eq(0) .a-link-normal').length > 0){
    len_bread = $('.a-breadcrumb:eq(0) .a-link-normal').length;
    for(i=0;i<len_bread;i++){
      breadcrumb = $('.a-breadcrumb:eq(0) .a-link-normal:eq('+ i +')').text().trim();
      bread_final += breadcrumb + "*~";
    }

  }

  else{
    bread_final = "";
  }
}

return bread_final;
}




function getModel(){
  var model = "";
  if($("#prodDetails .section.techD .label").length > 0){
    var labe_len = $("#prodDetails .section.techD .label").length;
    for(var i = 0;i<labe_len;i++){
      if($("#prodDetails .section.techD .label:eq("+i+")").text().trim().toUpperCase() == "MODEL NAME"){
        var model = $("#prodDetails .section.techD .value:eq("+i+")").text().trim();
        break;
      }

    }
  }
  if(model == ""){
    if($("#prodDetails .section.techD .item-model-number .value").length > 0){
      var model = $("#prodDetails .section.techD .item-model-number:eq(0) .value:eq(0)").text().trim();

    }
  }
  return model;
}

function getColor(){
  var color = "";
  if($("#prodDetails .section.techD .label").length > 0){
    var labe_len = $("#prodDetails .section.techD .label").length;
    for(var i = 0;i<labe_len;i++){
      if($("#prodDetails .section.techD .label:eq("+i+")").text().trim().toUpperCase() == "COLOUR" || $("#prodDetails .section.techD .label:eq("+i+")").text().trim().toUpperCase() == "COLOR"){
        var color = $("#prodDetails .section.techD .value:eq("+i+")").text().trim();
        break;
      }

    }
  }
  return color;
}


function sendPairsAPI(){
  var rrid = "";
  var arrayToSend2 = [];
  var dropToSend = [];
  rrid = getCookie("csm-hit")
  var rrid = getCookie("csm-hit");
  if(rrid.split("+sa").length > 1){
    rrid = rrid.split("+sa");
    rrid = rrid[0].trim();
  }
  if(rrid.split("+s-").length > 1){
    rrid = rrid.split("+s-");
    rrid = rrid[1].trim();
  }
  if(rrid.split("|").length > 1){
    rrid = rrid.split("|");
    rrid = rrid[0].trim();
  }
  var pid_list_len = $('.feed-carousel-card').length;
  pid_list_arr = [];
  pid_final_arr = [];
  for(i=0;i<pid_list_len;i++){
    if($('.feed-carousel-card:eq(' + i + ')').attr('data-sgproduct')){
      var pid_list = $('.feed-carousel-card:eq(' + i + ')').attr('data-sgproduct');
      if(pid_list && pid_list.split(",").length > 1){
        pid_list = pid_list.split(",");
        pid_list = pid_list[0];
      }
      if(pid_list.split('asin":"').length > 1){
        pid_list = pid_list.split('asin":"');
        pid_list = pid_list[1];
      }
      if(pid_list.split('"').length > 1){
        pid_list = pid_list.split('"');
        pid_list = pid_list[0];
      }
      pid_list_arr[i] = pid_list;
    }
  }
  if(pid_list_arr.length > 0){
    pid_final_arr = '{"asins": ' + JSON.stringify(pid_list_arr) + '}';
    if(rrid != "" && pid_final_arr.length > 0){
      var getPriceByUrl = "http://www.amazon.in/gp/gw/ajax/pdb.html?swn=productdb-ajax&sa=" + encodeURIComponent(pid_final_arr) + "&oe=%7B%22isDesktop%22%3A1%2C%22isTablet%22%3A0%2C%22isMobile%22%3A0%7D&rrid=" + rrid;
      $.ajax({
        type: "GET",
        url: getPriceByUrl,
        success: function(msg){
          // console.log("msg  at new API: ",msg);
          var arrayToSend2 = [];
          if(!msg.error){
            for(m=0;m<msg.p.length;m++){
              var pidCurr = (msg.p[m].asin);
              var oos = 0;
              var image = msg.p[m].images[0].src;
              var prod = msg.p[m].title;
              var priceCurr = msg.p[m].price;
              var priceCurr2 = msg.p[m].priceOnly;
              priceCurr = priceCurr.split("Rs.");
              if(priceCurr.length>1){
                priceCurr = priceCurr[1];
                priceCurr = priceCurr.split("</span>");
                priceCurr = priceCurr[1];
                priceCurr = priceCurr.split(">");
                priceCurr = priceCurr[priceCurr.length - 1];
                priceCurr = priceCurr.split(",").join("");
                priceCurr = filter_price(priceCurr);
              }
              priceCurr2 = priceCurr2.split("Rs.");
              if(priceCurr2.length>1){
                priceCurr2 = priceCurr2[1];
                priceCurr2 = priceCurr2.split("</span>");
                priceCurr2 = priceCurr2[1];
                priceCurr2 = priceCurr2.split(">");
                priceCurr2 = priceCurr2[priceCurr2.length - 1];
                priceCurr2 = priceCurr2.split(",").join("");
                priceCurr2 = filter_price(priceCurr2);
              }

              if(priceCurr!=""){
                priceCur = priceCurr;
              }
              else if(priceCurr2!=""){
                priceCur = priceCurr2;
              }
              else {
                priceCur = 0;
              }
              if(isNaN(priceCur) == true){
                priceCur = "";
              }
              if(isValidISBN(PID.toString()) && prod.trim() != ""){
                prod = prod + " " + convertISBN(PID.toString());
              }
              if(pidCurr != "" && priceCur != "" && priceCur != 0 && !isNaN(priceCur)){
                arrayToSend2.push([pidCurr, priceCur, prod, image, oos]);
                dropToSend.push(pidCurr);
              }
            }
            // console.log("reached here3 with "+arrayToSend2);

            if(arrayToSend2.length > 0){
              arrayToSend2 = JSON.stringify(arrayToSend2);
              var jsonArr = [{'pairsAmaz': arrayToSend2}];
              jsonArr = JSON.stringify(jsonArr);
              sendMessage(0, jsonArr, 0, doNothing, []);
            }
            // console.log("reached here3 with dropToSend");

            if(dropToSend.length > 0){
              dropToSend = JSON.stringify(dropToSend);
              var jsonArr = [{'pids': dropToSend, 'pos': 63}];
              jsonArr = JSON.stringify(jsonArr);
              var passBack = ['.RIGHT-COL-SDL a', '.s-result-item .a-color-price', '.gbwshoveler-button-wrapper li',  '#rhfShovelerWrapper .a-carousel-row-inner li', '#conditional-probability_feature_div li', '#searchResults #mainResults .prod', '.zgChartBody .rankedItem', '.a-carousel li', '#fbt_item_details li', '.asin', '.cpsims li', '#mainResults .celwidget', '.shoveler-content li', '#recommendations .a-list-item', '.recs-grid-item', '.s-result-item', '.a-carousel-card', '.vxd-music-bs-col-content', '.singleCell', '.widgetContent .dealView'];
              sendMessage(1, jsonArr, 30, displayRecentDrops, passBack);
            }
          }
        }
      });
    }
  }
}
sendPairsAPI();

function getCategory(){
  var categories = getBreadCrumb();
  var category = "";
  var index = 1;
  if(categories != "" && categories != undefined){
    categories = categories.split("*~");
    if(categories[0].toUpperCase() == "Books"){
      category = "Books";
    }
    else{
      category = categories[index];
    }
  }
  return category;
}

function getIntStorage(){
 var intMem = "";
 if($("#prodDetails .disclaim").length > 0){
  var intMem1 = $("#prodDetails .disclaim:eq(0)").html();
  if(intMem1.toUpperCase().split("SIZE:").length > 1){
    intMem1 = intMem1.toUpperCase().split("SIZE:");
    intMem1 = intMem1[1].trim();
    if(intMem1.split("</").length > 1){
      intMem1 = intMem1.split("</");
      intMem1 = intMem1[0];
    }
    if(intMem1.split(">").length > 1){
      intMem1 = intMem1.split(">");
      intMem1 = intMem1[1];
    }
    intMem1 = intMem1.trim();
    intMem = intMem1;
  }

}
if(intMem == ""){
  if($("#featurebullets_feature_div").length > 0){
    intMem1 = $("#featurebullets_feature_div").text().trim();
    if(intMem1.toUpperCase().split("INTERNAL MEMORY").length > 1){
      intMem1 = intMem1.toUpperCase().split("INTERNAL MEMORY");
      intMem1 = intMem1[0].trim();
    }
    if(intMem1.toUpperCase().split(",").length > 1){
      intMem1 = intMem1.toUpperCase().split(",");
      intMem1 = intMem1[intMem1.length - 1].trim();
    }
    if(intMem1.toUpperCase().split("AND").length > 1){
      intMem1 = intMem1.toUpperCase().split("AND");
      intMem1 = intMem1[intMem1.length - 1].trim();
    }
    if(intMem1.toUpperCase().split(".").length > 1){
      intMem1 = intMem1.toUpperCase().split(".");
      intMem1 = intMem1[intMem1.length - 1].trim();
    }
    if(intMem1.toUpperCase().split(" ").length > 1){
      intMem1 = intMem1.toUpperCase().split(" ");
      intMem1 = intMem1[intMem1.length - 1].trim();
    }
    if(intMem1.length < 7 && (intMem1.toUpperCase().split("GB").length > 1 || intMem1.toUpperCase().split("MB").length > 1)){
      intMem = intMem1;
    }
  }
}
return intMem;
}

function sendMobile(){
  var breadCrumb = getBreadCrumb();
  // console.log("getBreadCrumb: " + breadCrumb);
  if( breadCrumb.split("*~").length > 1 && (breadCrumb.split("*~")[2].trim().toUpperCase() == "SMARTPHONES & BASIC MOBILES" || breadCrumb.split("*~")[1].trim().toUpperCase() == "CELL PHONES" ) && getProd() != ""){
    var PID = getPID();
    var pos = 63;
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
setTimeout(sendMobile, 6000);


function sendTrack(){
  var prod = getProd();
  var webID = getCurrentPosition(window.location.href);
  var url = window.location.href;
  var prToSend = getPrice();
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);
  var a = $('body').text();
  if(a.split("ISBN-13:").length>1){
    isbn = a.split("ISBN-13:")[1].trim().split(" ")[0].trim().split("-").join("");
  }
  else {
    isbn = false;
  }
  if(isbn){
    var jsonArr = [{'prod': isbn, 'url': url, 'webID': webID, 'isBook': 1, 'price': prToSend }];
  }
  else if(prod!=""){
    var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0, 'price': prToSend }];
  }
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 11, doNothing, []);
}

sendTrack();

function sendCoupon(){
 $ = jQuery.noConflict();
 couponToSend = [];
 var cur_link = window.location.href;


 var couponUrl = "";
 var couponCode = "";
 var couponText = "";
 var couponDesc = "";
 var couponExp = 0;
 var couponAt = 63;


 couponUrl = cur_link;
 couponCode = "";
 couponText = "";
 couponDesc = "";
 couponText1 = "";

 if($('.categoryRefinementsSection li:eq(1) strong').length > 0){
   couponText1 = $('.categoryRefinementsSection li:eq(0)').text().trim();
   couponText = $('.categoryRefinementsSection li:eq(1) strong:eq(0)').text().trim();

   if(couponText.split(" - ").length > 1){
    couponCode = couponText.split(" - ");
    couponCode = couponCode[0].trim();
    if(couponCode.split(" ").length > 1){
      couponCode = couponCode.split(" ");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split(",").length > 1){
      couponCode = couponCode.split(",");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split(".").length > 1){
      couponCode = couponCode.split(".");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split("'").length > 1){
      couponCode = couponCode.split("'");
      couponCode = couponCode[1].trim();
    }
    if(couponCode != couponCode.toUpperCase()){
      couponCode = "";
    }
    if(couponCode.length < 4){
      couponCode = "";
    }
  }
  else if(couponText.split("code ").length > 1){
    couponCode = couponText.split("code ");
    couponCode = couponCode[1].trim();
    if(couponCode.split(" ").length > 1){
      couponCode = couponCode.split(" ");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split(",").length > 1){
      couponCode = couponCode.split(",");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split(".").length > 1){
      couponCode = couponCode.split(".");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split("'").length > 1){
      couponCode = couponCode.split("'");
      couponCode = couponCode[1].trim();
    }
    if(couponCode != couponCode.toUpperCase()){
      couponCode = "";
    }
    if(couponCode.length < 4){
      couponCode = "";
    }
  }
  else if(couponText.split("code:").length > 1){
    couponCode = couponText.split("code:");
    couponCode = couponCode[1].trim();
    if(couponCode.split(" ").length > 1){
      couponCode = couponCode.split(" ");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split(",").length > 1){
      couponCode = couponCode.split(",");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split(".").length > 1){
      couponCode = couponCode.split(".");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split("'").length > 1){
      couponCode = couponCode.split("'");
      couponCode = couponCode[1].trim();
    }
    if(couponCode != couponCode.toUpperCase()){
      couponCode = "";
    }
    if(couponCode.length < 4){
      couponCode = "";
    }
  }
  else if(couponText.split("Code ").length > 1){
    couponCode = couponText.split("Code ");
    couponCode = couponCode[1].trim();
    if(couponCode.split(" ").length > 1){
      couponCode = couponCode.split(" ");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split(",").length > 1){
      couponCode = couponCode.split(",");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split(".").length > 1){
      couponCode = couponCode.split(".");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split("'").length > 1){
      couponCode = couponCode.split("'");
      couponCode = couponCode[1].trim();
    }
    if(couponCode != couponCode.toUpperCase()){
      couponCode = "";
    }
    if(couponCode.length < 4){
      couponCode = "";
    }
  }
  else if(couponText.split("Code: ").length > 1){
    couponCode = couponText.split("Code: ");
    couponCode = couponCode[1].trim();
    if(couponCode.split(" ").length > 1){
      couponCode = couponCode.split(" ");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split(",").length > 1){
      couponCode = couponCode.split(",");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split(".").length > 1){
      couponCode = couponCode.split(".");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split("'").length > 1){
      couponCode = couponCode.split("'");
      couponCode = couponCode[1].trim();
    }
    if(couponCode != couponCode.toUpperCase()){
      couponCode = "";
    }
    if(couponCode.length < 4){
      couponCode = "";
    }
  }
  else{
    couponCode = "";
  }


  couponText = couponText + " on " + couponText1;

}

if($('.acs-bgh1-h1wrap p').length > 0){
 couponText = $('.acs-bgh1-h1wrap p:eq(0)').text().trim();
 couponDesc = $('.acs-bgh1-h1wrap .a-color-secondary:eq(0)').text().trim();
 if(couponDesc.split('\n').length > 1){
  couponDesc = couponDesc.split('\n').join(" ").trim();
}

if(couponText.split("code ").length > 1){
  couponCode = couponText.split("code ");
  couponCode = couponCode[1].trim();
  if(couponCode.split(" ").length > 1){
    couponCode = couponCode.split(" ");
    couponCode = couponCode[0].trim();
  }
  if(couponCode.split(",").length > 1){
    couponCode = couponCode.split(",");
    couponCode = couponCode[0].trim();
  }
  if(couponCode.split(".").length > 1){
    couponCode = couponCode.split(".");
    couponCode = couponCode[0].trim();
  }
  if(couponCode.split("'").length > 1){
    couponCode = couponCode.split("'");
    couponCode = couponCode[1].trim();
  }
  if(couponCode != couponCode.toUpperCase()){
    couponCode = "";
  }
  if(couponCode.length < 4){
    couponCode = "";
  }
}
else{
  couponCode = "";
}
}

if(couponCode != ""){
 couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
}



if($('#hero-quick-promo .unified_widget').length > 0){
  couponCode = "";
  couponText = "";
  couponExp = 0;
  couponUrl = "http://www.amazon.in/";
  couponDesc = "";
  couponAt = "";
  cur_link = window.location.href;

  couponText = $('#hero-quick-promo .unified_widget:eq(0) h2:eq(0)').text().trim();
  couponDesc = $('#hero-quick-promo .unified_widget:eq(0) p:eq(0)').text().trim();
  couponUrl = $('#hero-quick-promo .unified_widget:eq(0) p:eq(0) a:eq(0)').attr("href").trim();
  if(couponUrl.split('amazon.in').length < 2){
    couponUrl = "http://www.amazon.in/"+couponUrl;
  }
  if(couponDesc.split('\n').length > 1){
    couponDesc = couponDesc.split('\n').join(" ").trim();
  }
  if(couponDesc.split('Click here').length > 1){
    couponDesc = couponDesc.split('Click here')[0].trim();
  }

  if(couponDesc.split("code ").length > 1){
    couponCode = couponDesc.split("code ");
    couponCode = couponCode[1].trim();
    if(couponCode.split(" ").length > 1){
      couponCode = couponCode.split(" ");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split(",").length > 1){
      couponCode = couponCode.split(",");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split(".").length > 1){
      couponCode = couponCode.split(".");
      couponCode = couponCode[0].trim();
    }
    if(couponCode.split("'").length > 1){
      couponCode = couponCode.split("'");
      couponCode = couponCode[1].trim();
    }
    if(couponCode != couponCode.toUpperCase()){
      couponCode = "";
    }
    if(couponCode.length < 4){
      couponCode = "";
    }
  }
  else{
    couponCode = "";
  }
}

if(couponCode != ""){
 couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
}


couponToSend = JSON.stringify(couponToSend);
var jsonArr = [{'couponsExt': couponToSend}];
jsonArr = JSON.stringify(jsonArr);
sendMessage(1, jsonArr, 15, doNothing, []);

}
sendCoupon();

// function escapeHtml(text) {
//   return text
//   .replace(/&/g, "&amp;")
//   .replace(/</g, "&lt;")
//   .replace(/>/g, "&gt;")
//   .replace(/"/g, "&quot;")
//   .replace(/'/g, "&#039;");
// }


// $("#selectedCategory").change(function(){
//   getCategDeals();
// });
function getCategDeals(d){
  // setTimeout(function(){ getCategDeals(); }, 1000);
  // console.log("get Deals was called! "+d);
  $ = jQuery.noConflict();
  var node_id = "";
  var node_name = "";
  if($(".ONETHIRTYFIVE-HERO:eq("+d+") #selectedCategory").length > 0){

    var cat_name = $(".ONETHIRTYFIVE-HERO:eq("+d+") #selectedCategory").text().trim().toUpperCase();
    // console.log("cat_name: "+cat_name);
    cat_name = cat_name.toUpperCase();
    var node_ids = [];
    var cat_names = [];

    node_ids = ["all","1571274031","1355016031","976389031","1388977031","4772060031","1571271031","1953148031","1967851031","1967936031","1968024031","1953602031","1375344031","976392031","1375393031","1375392031","976419031","1388867031","1380441031","4048867031","2454178031","1983338031","1350384031","1380374031","976442031","1389335031","1380442031","4286640031","1380510031","1380485031","1951048031","1375412031","5925789031","4951860031","1375424031","1380263031","4294807031","2454169031","1389402031","1389432031","976416031","976445031","3677697031","1375427031","2454172031","2454181031","1389433031","1983397031","1983456031","1983518031","1983578031","976451031","1984443031","1389339031","1967862031","1967947031","1968036031","1968401031","1375458031","1389396031","1350380031","976460031","2563506031","1350387031","2563504031","2563505031","57236051","PRIME_EARLY_ACCESS"];

    cat_names = ["All", "Baby Products","Beauty","Books","Cameras & Photography","Automotive","Clothing & Accessories","Clothing (Baby)","Clothing (Boys')","Clothing (Girls')","Clothing (Men's)","Clothing (Women's)","Computer Components","Computers & Accessories","Data Storage & External Devices","Desktops","Electronics","Electronics Accessories","Furniture ","Gift Cards","Grocery","Handbags","Health & Personal Care","Home & Decor","Home & Kitchen","Home Audio & Accessories","Home Furnishing","Home Improvement","Home Storage & Organization","Indoor Lighting","Jewellery","Keyboards, Mice & Input Devices","Kitchen & Dining","Kitchen & Home Appliances","Laptops","Large Appliances","Lawn & Garden","Luggage & Bags","Mobile Accessories","Mobiles","Movies & TV Shows","Music","Musical Instruments","Networking Devices","Office & School Supplies","Pet Supplies","Portable Media Players","Shoes (Boys')","Shoes (Girls')","Shoes (Men's)","Shoes (Women's)","Software","Sporting Goods","Streaming Media Players","Sunglasses (Boys')","Sunglasses (Girls')","Sunglasses (Men's)","Sunglasses (Women's)","Tablets","Televisions","Toys","Video Games","Watches (Kids')","Watches","Watches (Men's)","Watches (Women's)","Everything Else","Prime Early Access Deals"];
    for(var c=0;c<cat_names.length;c++){
      if(cat_names[c].toUpperCase() == cat_name){
        node_id = node_ids[c];
      }
    }
  }
  // else{
  //   setTimeout(function(){ getCategDeals(d); }, 1000);
  // }
  // console.log("node_id: "+node_id);
  // console.log("cat_name: "+cat_name);
  if(node_id != "" && node_id_last[d] != node_id){
    // console.log("node_id changed from " + node_id_last[d] + " to " + node_id);
    node_id_last[d] = node_id;
    scrapDeal(node_id, cat_name, d);
  }

}

function returnNodeID(catName){
  var node_id = 0;
  // var cat_name = $(".ONETHIRTYFIVE-HERO:eq("+d+") #selectedCategory").text().trim().toUpperCase();
  node_ids = ["all","1571274031","1355016031","976389031","1388977031","4772060031","1571271031","1953148031","1967851031","1967936031","1968024031","1953602031","1375344031","976392031","1375393031","1375392031","976419031","1388867031","1380441031","4048867031","2454178031","1983338031","1350384031","1380374031","976442031","1389335031","1380442031","4286640031","1380510031","1380485031","1951048031","1375412031","5925789031","4951860031","1375424031","1380263031","4294807031","2454169031","1389402031","1389432031","976416031","976445031","3677697031","1375427031","2454172031","2454181031","1389433031","1983397031","1983456031","1983518031","1983578031","976451031","1984443031","1389339031","1967862031","1967947031","1968036031","1968401031","1375458031","1389396031","1350380031","976460031","2563506031","1350387031","2563504031","2563505031","57236051","PRIME_EARLY_ACCESS"];

  cat_names = ["All", "Baby Products","Beauty","Books","Cameras & Photography","Automotive","Clothing & Accessories","Clothing (Baby)","Clothing (Boys')","Clothing (Girls')","Clothing (Men's)","Clothing (Women's)","Computer Components","Computers & Accessories","Data Storage & External Devices","Desktops","Electronics","Electronics Accessories","Furniture ","Gift Cards","Grocery","Handbags","Health & Personal Care","Home & Decor","Home & Kitchen","Home Audio & Accessories","Home Furnishing","Home Improvement","Home Storage & Organization","Indoor Lighting","Jewellery","Keyboards, Mice & Input Devices","Kitchen & Dining","Kitchen & Home Appliances","Laptops","Large Appliances","Lawn & Garden","Luggage & Bags","Mobile Accessories","Mobiles","Movies & TV Shows","Music","Musical Instruments","Networking Devices","Office & School Supplies","Pet Supplies","Portable Media Players","Shoes (Boys')","Shoes (Girls')","Shoes (Men's)","Shoes (Women's)","Software","Sporting Goods","Streaming Media Players","Sunglasses (Boys')","Sunglasses (Girls')","Sunglasses (Men's)","Sunglasses (Women's)","Tablets","Televisions","Toys","Video Games","Watches (Kids')","Watches","Watches (Men's)","Watches (Women's)","Everything Else","Prime Early Access Deals"];

  for(var c=0;c<cat_names.length;c++){
    if(cat_names[c].toUpperCase() == catName){
      node_id = node_ids[c];
    }
  }

  return node_id;

}

function checkDeals(){
  setTimeout(function(){ checkDeals(); }, 1000);
  // console.log("called now");
  // return;
  if($(".ONETHIRTYFIVE-HERO").length > 0){
    var deal_len = $(".ONETHIRTYFIVE-HERO").length;
    // console.log("deal_len: "+deal_len);
    for(var d=0;d<deal_len;d++){
      getCategDeals(d);
      // console.log("Reached in between");
    }
  }
  else{
    setTimeout(function(){ checkDeals(); }, 1000);
  }
}
// checkDeals();


function scrapDeal(node_id, cat_name, d){
  // console.log("scrapDeal Deals was called! "+d + " " + cat_name + " " +node_id);
  var catDealArr = [];
  var PID_last = "";
  var PID_first = "";
  var PID = "";

  if($(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content li").length > 0){
    var slider = $(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li");
    var sliderLength = $(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li").length;
    PID = "";
    var pid_url = "";
    var prod = "";
    var dis_price = 0;
    var perDrop = "";
    var image = "";
    var seller = "";
    var cat_name = $(".ONETHIRTYFIVE-HERO:eq("+d+") #selectedCategory").text().trim().toUpperCase();
    var nodeNow = returnNodeID(cat_name);
    node_id = nodeNow;
    for(var j=0;j<sliderLength;j++){
      PID = "";
      pid_url = "";
      pid1 = "";
      prod = "";
      dis_price = "";
      perDrop = "";
      image = "";
      seller = "";
      endsAt = "";
      ends = "";
      hour = "";
      min = "";
      // console.log("cat_name: "+cat_name+ " d:"+d);

      if($(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+")").find(".prodimg:eq(0) .imageLink:eq(0)").length > 0){
        pid_url = $(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+")").find(".prodimg:eq(0) .imageLink:eq(0)").attr("href");
      }
      if(pid_url != undefined && pid_url != ""){
        PID = returnPID(pid_url);
        // console.log("PID: "+PID);
        image = $(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+")").find(".prodimg:eq(0) img:eq(0)").attr("src");
        // console.log("image: "+image);
        dis_price = $(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+")").find("#dealDealPrice").text().trim();
        dis_price = filter_price(dis_price);
        if(isNaN(dis_price)){
          dis_price = 0;
        }
        // console.log("dis_price: "+dis_price);
        perDrop = $(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+")").find("#dealPercentOff").text().trim();

        if(perDrop.split("%").length > 1){
          perDrop = perDrop.split("%");
          perDrop = perDrop[0].trim();
        }
        if(perDrop.split("(").length > 1){
          perDrop = perDrop.split("(");
          perDrop = perDrop[1].trim();
        }
        if(prod = $(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+")").find("#dealTitle .titleLink:eq(0)").length > 0){
          prod = $(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+")").find("#dealTitle .titleLink:eq(0)").attr("title").trim();
        }
        if($(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+")").find("#dealTimeRemaining .ticker").length > 0){
         hour = $(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+")").find("#dealTimeRemaining .ticker:eq(0)").text().trim();
         min = $(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+")").find("#dealTimeRemaining .ticker:eq(1)").text().trim();
         endsAt = hour + "h " + min + "m";

       }
       if($(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+")").find("#dealMerchantName").length > 0){
        seller = $(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+")").find("#dealMerchantName").text().trim();
      }
      if($(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+") #dealPercentClaimed").length > 0 && $(".ONETHIRTYFIVE-HERO:eq("+d+") .gbwshoveler-content:eq(0) li:eq("+j+") #dealClosedMessage").length == 0){
        if(dis_price != 0 && PID != "" && PID != undefined && node_id != "" && node_id != undefined){
          catDealArr.push([PID, node_id, encodeURIComponent(cat_name), encodeURIComponent(prod), image, dis_price, perDrop, encodeURIComponent(seller), encodeURIComponent(endsAt)]);
        }
      }
    }
  }
  if(sliderLength > 0 && catDealArr.length > 0){
    amazLight = JSON.stringify(catDealArr);
    var jsonArr = [{'amazLight': amazLight}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 21, doNothing, []);
      // console.log("Sending Lighting data");
      // node_id_last[d] = node_id;
    }
    else if(sliderLength > 0 && catDealArr.length == 0){
      setTimeout(function(){ scrapDeal(node_id, cat_name, d); } , 500);
    }

    // console.log("catDealArr: "+catDealArr);
  }
  else{
    setTimeout(function(){ scrapDeal(node_id, cat_name, d); } , 500);
  }
}


//////// WISH TO WATCH LIST STARTS ////////////////

var cur_url = window.location.href;
if(cur_url.split("amazon.in").length > 1 && cur_url.split("/registry/wishlist").length > 1){
  if($('#item-page-wrapper').length>0){
    importWishGlobal('#item-page-wrapper', 'before', amazWishList1);
  }
}

function amazWishList1(){
 wishListAmaz = [];
 var sid = getCookie("session-id");
 var rid = getCookie("csm-hit");
 if(rid.split("+sa").length > 1){
  rid = rid.split("+sa");
  rid = rid[0].trim();
}
if($('.a-pagination').length > 0){
  var pg = $('.a-pagination:eq(0) li').length - 2;
}
else{
  var pg = 1;
}
var uid = "";
var uid = cur_url.split("/wishlist/");
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
if(uid != uid.toUpperCase() || uid == ""){
  var uid1 = $("body").html();
  if(uid1.split('"registrySubType"').length > 1){
    uid1 = uid1.split('"registrySubType"');
    uid1 = uid1[1].split('}');
    uid1 = uid1[0].split('"id":');
    uid1 = uid1[1].split('"');
    uid1 = uid1[1].trim();
    uid = uid1;
  }
  else{
    uid = "";
  }
}
// console.log("uid: "+uid);
// console.log("rid: "+rid);
// console.log("sid: "+sid);
for(var p=1;p<=pg;p++){
    // alert(p);
    var amazURL = "https://www.amazon.in/gp/registry/wishlist?ref_=cm_wl_ap_page_1&_encoding=UTF8&disableBtf=0&sid="+sid+"&ajax=renderItemsSection&subPageType=WishlistVisitorView&requestID="+rid+"&sort=date-added&reveal=unpurchased&page="+p+"&view=null&filter=all&id="+uid+"&type=wishlist";
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
      // console.log(" wrapper: "+ $(wrapperAmaz).html());
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
        prod = prod.split("'").join("").trim();
        prod = prod.split('"').join('').trim();

        if(PID != "" && price != ""){
          wishListAmaz.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
        }
      }
    }
    // console.log("Total: "+wishListAmaz.length);
    wishJson = JSON.stringify(wishListAmaz);
    var jsonArr = [{'wishList': wishJson}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 17, alertImportResp, []);
  })
.fail(function(data){
  console.log("NA HO PAYII!!");
});
}
}
function alertImportResp(data){
  $("#importHatke").text(data);
}
function applyCpnInitiate(){
  // console.log("applyCpnInitiate was called");
  var cur_url = window.location.href;
  if(cur_url.split("gp/buy/spc/handlers/display.html").length > 1){
    if($("#right-grid").length > 0 && $("#couponClick").length == 0){
      var selectorACIcon = "#right-grid .a-box-group";
      var position = "after";
      var parent = "none";
      var method = "POST";
      var api = "https://www.amazon.in/gp/buy/spc/handlers/add-giftcard-promotion.html/ref=ox_pay_page_gc_add";
      var timeStamp = Math.floor(Date.now());
      var postFields = {"claimcode": "**", "disablegc": 0, "returnjson": 1, "returnFullHTML": 1, "hasWorkingJavascript": 1, "fromAnywhere": 0, "cachebuster": timeStamp};
      var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1}];
      details = JSON.stringify(details);
      arrayMsg = [];
      displayACIcon(selectorACIcon, parent, position, 18, details);
    }
  }
  else{
    setTimeout(applyCpnInitiate, 1000);
  }
}
applyCpnInitiate();

savings = [];
bestSaving = 0;
bestCoupon = "";
function startSaving(data){

  data = JSON.parse(data);
  var nowCode = "";
  var nowSaving = "";
  var resp = data[0].data;
  var code = data[0].code.trim();
  nowCode = code;
  var csaving = 0;
  respYatra = resp;
  if(resp && resp != "" && resp.responseText){
    resp = resp.responseText;
    if(resp.split("errors").length > 1 && resp.split("addPromo_AlreadyRedeemed").length > 1){
      savings.push({"code": code, "savings": 1});
    csaving = 0; //promocode already applied

    if($("#subtotals-marketplace-table").length > 0 && $("#subtotals-marketplace-table .a-text-left").length > 0){
      var divs = $("#subtotals-marketplace-table .a-text-left").length;
      for(var d=0;d<divs;d++){
        if($("#subtotals-marketplace-table .a-text-left:eq("+d+")").text().trim() == "Promotion Applied:"){
          csaving = $("#subtotals-marketplace-table .a-text-left:eq("+d+")").parent().text().trim();
          csaving = filter_price(csaving);
          if(isNaN(csaving)){
            csaving = 0
          }
          else if(csaving > bestSaving){
            bestSaving = csaving;
            bestCoupon = code;
          }
          savings.push({"code": code, "savings": csaving});
          nowSaving = csaving;
          // console.log("code3: "+nowCode+" nowSaving "+nowSaving);
        }
      }
    }

    nowSaving = csaving;
    // console.log("code1: "+nowCode+" nowSaving "+nowSaving);
  }
  else if(resp.split("errors").length > 1 && (resp.split("addPromo_BadCode").length > 1 || resp.split("addPromo_").length > 1)){
    savings.push({"code": code, "savings": 0});
    nowSaving = 0;
    var cpn_msg = resp.split("addPromo_");
    cpn_msg = cpn_msg[1];
    cpn_msg = resp.split(",");
    cpn_msg = cpn_msg[0];
    arrayMsg.push([code, (cpn_msg), 63 ]);
  }
}
else if(code != "" && resp != ""){
  wrapper= document.createElement('div');
  wrapper.innerHTML= resp;
  if($(wrapper).find("#subtotals-marketplace-table").length > 0 && $(wrapper).find("#subtotals-marketplace-table .a-text-left").length > 0){
    var divs = $(wrapper).find("#subtotals-marketplace-table .a-text-left").length;
    for(var d=0;d<divs;d++){
      if($(wrapper).find("#subtotals-marketplace-table .a-text-left:eq("+d+")").text().trim() == "Promotion Applied:"){
        var csaving = $(wrapper).find("#subtotals-marketplace-table .a-text-left:eq("+d+")").parent().text().trim();
        csaving = filter_price(csaving);
        if(isNaN(csaving)){
          csaving = 0
        }
        else if(csaving > bestSaving){
          bestSaving = csaving;
          bestCoupon = code;
        }
        savings.push({"code": code, "savings": csaving});
        nowSaving = csaving;
        // console.log("code3: "+nowCode+" nowSaving "+nowSaving);
      }
    }
  }
}
doneSavingCheck++;
if(doneSavingCheckFn() == 1){
  applyBestCoupon();
  if(localStorage.anaSent!=1 && parseInt(bestSaving) != 0 && bestSaving!="" && !isNaN(parseInt(bestSaving))){
    localStorage.anaSent = 1;
    var host=window.location.host;
    var jsonArr = [{'type': 'finish1','website':host}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,22,doNothing, []);
    tracer(1,4);
    setTimeout(function(){if(JSON.parse(features_json)[4]==0){ft(4);}},100);
  }
}
else{
  displayAutoSaving(bestSaving);
}
}

var mainClick = 0;
var deleteAC = 0;

function applyBestCoupon(){
  // console.log("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
  if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
    if($("#spc-gcpromoinput").length > 0 && $(".redeem-gc-grid:eq(0) .a-button-inner:eq(0)").length > 0){
      $("#spc-gcpromoinput").val(bestCoupon.trim());
      displayFinalSavings();
      document.getElementsByClassName("redeem-gc-grid")[0].getElementsByClassName("a-button-inner")[0].click();
    }
    else{
      setTimeout(applyBestCoupon, 1000);
    }
  }
  else{
    displayNoSavings();
    // console.log("Show no savings popup");
  }
  if(deleteAC == 0){
    if(arrayMsg.length > 0 && arrayMsg.length != ""){
      arrayMsg = JSON.stringify(arrayMsg);
      var jsonArr = [{'cpn_msg': arrayMsg}];
      jsonArr = JSON.stringify(jsonArr);
      deleteAC = 1;
      sendMessage(1, jsonArr, 12, doNothing, []);
      arrayMsg = [];
    }
  }
}
////////// WISH TO WATCH LIST ENDS ////////////////