var favObj = {
	init: function() {
		var s = this;
		s.band();
	},
	band: function() {
		$('#b-btn, #g-btn, #o-btn, #w-btn, #m-btn').focus(function() {
				var id = this.id;
				var urlArr = {
					'b-btn': '//www.baidu.com/baidu',
					'g-btn': '//www.google.com/search',
					'o-btn': '//www.sanzhima.com/search',
					'w-btn': '//cn.bing.com/',
					'm-btn': '//mijisou.com/'
				}
				$('#search-form').attr('action', urlArr[id]);
		});
		$('#search-form').on('submit', function() {
			$('#q-word').val($('#b-word').val());
		});
		//alert("");
	}
};
favObj.init();