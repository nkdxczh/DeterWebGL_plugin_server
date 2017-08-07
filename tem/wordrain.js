var c = document.getElementById("backcanvas");
var ctx = c.getContext("2d");
var currentPage = 0;

//chinese characters - taken from the unicode charset
var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
chinese = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
///converting the string into an array of single characters
chinese = chinese.split("");

var font_size = 15;
//an array of drops - one per column
var drops = [];
var columns = c.width/font_size; //number of columns for the rain

//var titles = [indexTxt,resumeTxt,projectsTxt,demoTxt];
var alphas = [0,0,0,0];
var flags = [true,false,false,false];
var ls=[-0.05*c.width,0,0,0];
var ts=[0,0,0,0];
var ws=[1.2*c.width,1.2*c.width,1.2*c.width,1.2*c.width]
var hs=[0.8*c.height,0.8*c.height,0.8*c.height,0.8*c.height]

function refreshSize(){
    if(window.innerWidth == c.width && drops.length > 0)return;
    oldc = drops.length;
    c.width = window.innerWidth;
    columns = c.width/font_size; //number of columns for the rain
    for(var x = oldc; x < columns; x++)
        drops[x] = Math.random()*c.height/font_size; 
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, c.width, c.height);
}

//drawing the characters
function draw()
{
    refreshSize();
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#0F0"; //green text
    ctx.font = font_size + "px arial";
    //looping over drop
    for(var i = 0; i < drops.length; i++)
    {
        //a random chinese character to print
        var text = chinese[Math.floor(Math.random()*chinese.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*font_size, drops[i]*font_size);
        
        if(drops[i]*font_size > c.height && Math.random() > 0.98)
            drops[i] = 0;                                                                                       
        
        drops[i]++;
    }

    //for(var i = 0; i < titles.length; i++)
      //  alphas[i] = drawTxt(titles[i], c, flags[i], alphas[i],-0.1*c.width,0,1.2*c.width,0.8*c.height);
}

function changePage(page)
{
    /*for(var i = 0; i < titles.length; i++){
        flags[i]=false;
    }
    flags[page] = true;*/
    if(page==0)$('#title').attr('src','img/welcome.gif');
    else if(page==1)$('#title').attr('src','img/resume.gif');
    else if(page==2)$('#title').attr('src','img/projects.gif');
    else if(page==3)$('#title').attr('src','img/demo.gif');
    else $('#title').attr('src','img/notes.gif');
}

setInterval(draw, 100);
console.log('inject!!!!')