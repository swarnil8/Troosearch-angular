var start = 0;
var feedName = "Marketplaces";
var bModel = "";
var reqURL = "http%3A%2F%2Ftracxn.com%2Ftheme%2Fcompactview%2F53314299e4b09e5482339cad%23%257Csort%253DdatePublished%257Corder%253DDEFAULT%257CfeedName%253DMarketplaces";
var finalLength = 37879;
function makeReq(start){
var data = "{\"sort\":\"firstPublishDate\",\"order\":\"DEFAULT\",\"size\":70,\"from\":" + start + ",\"view\":\"myfeeds_compactview_internal\",\"type\":\"query\",\"others\":{\"url\":\"http%3A%2F%2Ftracxn.com%2Ftheme%2Fmyfeeds%2Fcompactview%23%257Csort%253DfirstPublishDate%257Corder%253DDEFAULT%257CpracticeArea%253DConsumer\"},\"practiceArea\":[\"Consumer\"]}";
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    // console.log(this.responseText);
    $.post( "http://aws1.buyhatke.com/dataCraw/dataRec.php", { data: this.responseText, cat: feedName } );
    console.log("Done with " + start);
    if(start + 70 < finalLength){
    	start = start + 70;
    	setTimeout(function(){makeReq(start)}, 3000);
    }
    else if(start < finalLength){
    	start = finalLength;
    	setTimeout(function(){makeReq(start)}, 3000);
    }
    else {
    	console.debug("PROCESS_OVER");
    }
  }
});

xhr.open("POST", "http://tracxn.com/search/reactSearch");
xhr.setRequestHeader("accept", "application/json, text/javascript, */*; q=0.01");
xhr.setRequestHeader("origin", "http://tracxn.com");
xhr.setRequestHeader("x-devtools-emulate-network-conditions-client-id", "1B9A6B07-7CEB-4211-9009-5010BB7F6042");
xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
xhr.setRequestHeader("referer", "http://tracxn.com/theme/compactview/5614df3ce4b0b940a327e91b");
xhr.setRequestHeader("accept-encoding", "gzip, deflate");
xhr.setRequestHeader("accept-language", "en-US,en;q=0.8,hi;q=0.6");
xhr.setRequestHeader("cookie", "tracxn_session=a996ec19-6afc-42b2-ac4e-a14635cbdd9b; _gat_UA-41952435-1=1; _gat=1; _ga=GA1.2.1411341542.1467911984; tracxn_session=a996ec19-6afc-42b2-ac4e-a14635cbdd9b; _ga=GA1.2.1411341542.1467911984");
xhr.setRequestHeader("alexatoolbar-alx_ns_ph", "AlexaToolbar/alx-4.0");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "d653c0d8-d23c-8196-c7dc-10b77c9ee97b");

xhr.send(data);

}

// makeReq(0);