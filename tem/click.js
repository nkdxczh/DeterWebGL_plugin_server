var currentPage = 1;

function jump(page){
    currentPage = page;
    changePage(page);
    if(page == 1){
        $('#resume').show();
        $('#resume').attr('src','doc/resume.pdf');
    }
    else{
        $('#resume').hide();
    }
    if(page == 2){
        $('#projects').show();
    }else{
        $('#projects').hide();
    }
    if(page == 3){
        $('#demo').show();
        $('#demo').attr('src','attack/index.html');
        toTop($('#demo'));
    }else{
        $('#demo').hide();
    }
    if(page == 4){
        $('#note').show();
        toTop($('#note'));
        loadFS();
        resetForm(7);
    }else{
        $('#note').hide();
    }
}

function toTop(element){
    $(".terminal,.content").each(function() {
        $(this).css("zIndex", 1);
    });
    console.log(element);
    $(element).css("zIndex", 2);
}

function iframeclick(element){
    console.log(element);
    $(this).on('click',toTop(element));
}
console.log('inject!!!!')