var dateStr="2094-03-07 00:00:00";
var a=dateStr.split(" ");
var d=a[0].split("-");
var t=a[1].split(":");
var endDate = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);

function refreshTime(){
    var last = endDate - Date.now();
    last /= 1000;
    year = Math.floor(last/(60*60*24*365));
    last -= year*(60*60*24*365);
    day = Math.floor(last/(60*60*24));
    last -= day*(60*60*24);
    hour = Math.floor(last/(60*60));
    last -= hour*(60*60);
    min = Math.floor(last/(60));
    last -= min*(60);
    sec = Math.floor(last);

    document.getElementById("day").innerHTML = year+" Years ,"+day+" Days, "+hour+' Hours, '+min+' Min, '+sec+' Sec';
}

setInterval(refreshTime, 1000);
console.log('inject!!!!')