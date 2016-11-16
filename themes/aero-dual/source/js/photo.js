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
            li += '<a class="img-bg" rel="example_group" href="' + data[i] + '"><img src="' + data[i] + '" style="width: 300px;height: 200px"/></a><span>&nbsp;&nbsp</span>';
        }
        $(".instagram").append(li);
        // $(".img-box-ul").lazyload();
        $("a[rel=example_group]").fancybox();
    }
})