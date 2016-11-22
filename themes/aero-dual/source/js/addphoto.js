$(document).ready(function(){
    var that = this;
    var page = 1;
    var offset = 20;

    $.getJSON("/photos/data.json", function (data) {
        render(data);
        // that.scroll(data);
    });
    function render(data) {
        // var begin = (page - 1) * this.offset;
        // var end = page * this.offset;
        // if (begin < data.length) return;
        var html, li = "";
        // for (var i = begin; i < end && i < data.length; i++) {
        for (var i = 0; i < data.length; i++) {
            li += '<li><img src="' + data[i].url + '" data-img="' + data[i].url + '" alt="Thumb'+ i +'"/><div><h2>'+ data[i].title +'</h2><p>'+ data[i].desc +'</p></div></li>';
        }
        $(".iw_thumbs").append(li);
        // $(".img-box-ul").lazyload();
        // $("a[rel=example_group]").fancybox();
    }
})