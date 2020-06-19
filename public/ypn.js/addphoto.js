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
            li += '<li style="list-style-type:none"><p><span class="label">'+ data[i].title +'</span> 创建于'+ data[i].desc +'</p><img src="' + data[i].url + '" data-img="' + data[i].url + '" alt="Thumb'+ i +'"></li>';
        }
        $(".iw_thumbs").append(li);
        // $(".img-box-ul").lazyload();
        // $("a[rel=example_group]").fancybox();
    }
})