var inputReady = true;
var input = $('.404-input');
var info = '<p class="prompt">----------BASIC INFORMATION----------</p><p class="prompt">NAME: ZHANHAO CHEN</p><p class="prompt">EMAIL: <a href="mailto:zhc416@lehigh.edu">zhc416@gmail.com</a></p><p class="prompt">GITHUB: <a href="https://github.com/nkdxczh">nkdxczh</a></p><p class="prompt">---------------COMMAND---------------</p>';
var guide = '<p class="prompt">----------------GUIDE----------------</p><p class="prompt" onclick="jump(0)" style="text-decoration:underline;">HOMEPAGE</p><p class="prompt" onclick="jump(1)" style="text-decoration:underline;">RESUME</p><p class="prompt" onclick="jump(2)" style="text-decoration:underline;">PROJECTS</p><p class="prompt" onclick="jump(3)" style="text-decoration:underline;">TIME CHENNEL ATTACKS DEMO</p><p class="prompt" onclick="jump(4)" style="text-decoration:underline;">NOTES</p><p class="prompt">---------------COMMAND---------------</p>';
input.focus();
$('.container').on('click', function(e){
    input.focus();
});

input.on('keyup', function(e){
    $('.new-output').text(input.val());
});

$('.four-oh-four-form').on('submit', function(e){
    e.preventDefault();
    var val = $(this).children($('.404-input')).val().toLowerCase();
    var href;

    if (val == 'resume'){
        jump(1);
        resetForm(1);
    }
    else if(val == 'homepage'){
        jump(0);
        resetForm(1);
    }
    else if(val == 'projects'){
        jump(2);
        resetForm(1);
    }
    else if(val == 'demo'){
        jump(3);
        resetForm(1);
    }
    else if(val == 'information'){
        resetForm(2);
    }
    else if(val == 'guide'){
        resetForm(3);
    }
    else if(val == 'ls' && currentPage == 4){
        resetForm(4);
    }
    else if(val.slice(0,3) == 'cd ' && currentPage == 4){
        resetForm(5,val);
    }
    else if(val.slice(0,3) == 'vi ' && currentPage == 4){
        resetForm(6,val);
    }
    else if(val == 'notes'){
        jump(4);
        resetForm(7);
    }
    else {
        resetForm(0,val);
    }
});

function resetForm(found,m){
    var message = '<p class="prompt">'+m+' command not found.</p>'
        var input = $('.404-input');

    var append = true;

    if (found==1){
        message = "";
    }
    else if(found == 2)
        message = info;
    else if(found == 3)
        message = guide;
    else if(found == 4)
        message = FsLs();
    else if(found == 5){
        if(!FsCd(m.slice(3,m.length)))message = '<p class="prompt">Not this directory</p>';
        else message = '';
    }
    else if(found == 6){
        message = FsVi(m.slice(3,m.length), document.getElementById('note'));
        toTop(document.getElementById('note'));
    }
    else if(found == 7){
        message = "<p class='prompt'>You have entered notes file system. You could use ls, cd, vi(open file) commands.</p>"
    }

    $('.new-output').removeClass('new-output');
    input.val('');
    if(append)$('#console').append(message + '<p class="prompt output new-output"></p>');

    $('#console').animate({scrollTop: 1000*$('.terminal').height()}, 1000);

    $('.new-output').velocity(
            'scroll'
            ), {duration: 100}
}

function textEffect(line){
    var alpha = [';', '.', ',', ':', ';', '~', '`'];
    var animationSpeed = 10;
    var index = 0;
    var string = line.text();
    var splitString = string.split("");
    var copyString = splitString.slice(0);

    var emptyString = copyString.map(function(el){
        return [alpha[Math.floor(Math.random() * (alpha.length))], index++];
    })

    emptyString = shuffle(emptyString);

    $.each(copyString, function(i, el){
        var newChar = emptyString[i];
        toUnderscore(copyString, line, newChar);

        setTimeout(function(){
            fromUnderscore(copyString, splitString, newChar, line);
        },i * animationSpeed);
    })
}

function toUnderscore(copyString, line, newChar){
    copyString[newChar[1]] = newChar[0];
    line.text(copyString.join(''));
}

function fromUnderscore(copyString, splitString, newChar, line){
    copyString[newChar[1]] = splitString[newChar[1]];
    line.text(copyString.join(""));
}


function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

console.log('inject!!!!')