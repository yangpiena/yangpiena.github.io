$(document).ready(function(){
    var that = this;
    $.getJSON("/photos/data.json", function (data) {
        render(that.page, data);
        // that.scroll(data);
    });
    function render(page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
            li += '<li><div class="img-box">' + '<a class="img-bg" rel="example_group" href="https://raw.githubusercontent.com/yangpiena/yangpiena.github.io/blob/source/photos/' + data[i] + '"></a>' + '<img lazy-src="https://raw.githubusercontent.com/yangpiena/yangpiena.github.io/blob/source/photos/' + data[i] + '" />' + '</li>';
        }
        $(".img-box-ul").append(li);
        // $(".img-box-ul").lazyload();
        $("a[rel=example_group]").fancybox();
    }
})