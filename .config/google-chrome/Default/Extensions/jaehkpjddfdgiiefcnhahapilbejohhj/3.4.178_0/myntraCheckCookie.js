var s = document.createElement('div');
     s.id="proddetails";

(document.body || document.documentElement).appendChild(s);

document.getElementById("proddetails").innerHTML=JSON.stringify(analyticsLayer);

document.getElementById("proddetails").style.display="none";