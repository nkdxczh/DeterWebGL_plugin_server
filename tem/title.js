var words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
words = words.split("");

function drawTxt(list, element, flag, alpha, l, t, w, h){
    if(!flag && alpha == 0)return 0;
    var columns = w/font_size;
    var rows= h/font_size;
    var ctx = element.getContext("2d");
    ctx.font = font_size + "px arial";
    for(var i=0; i<list.length; i++){
        //if(list[i][2]<0.1)continue;
        ctx.fillStyle = "rgba(0, 0, 0,"+alpha+ ")";
        ctx.fillRect(l+list[i][1]*w, t+list[i][0]*h - font_size, font_size, 1.5*font_size);
        ctx.fillStyle = "rgba(0,255,0,"+alpha+")"; //green text
        var text = words[Math.floor(Math.random()*words.length)];
        ctx.fillText(text, l+list[i][1]*w, t+list[i][0]*h);
    }
    if(flag){
        if(alpha < 1)return alpha + 0.1;
        else return 1;
    }else{
        if(alpha <= 0)return 0;
        return alpha - 0.1;
    }
}

//var welcome_canvas = document.getElementById('title');
//setInterval(drawTxt,80,welcomeTxt, welcome_canvas);
console.log('inject!!!!')