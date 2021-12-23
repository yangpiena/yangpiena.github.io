var favObj = {
	init: function() {
		var s = this;
		s.band();
	},
	band: function() {
		$('#b-btn, #q-btn, #m-btn, #f-btn).focus(function() {
				var id = this.id;
				var urlArr = {
					'b-btn': '//www.baidu.com/baidu',
					'g-btn': '//www.google.com/search',
					'm-btn': 'https://cn.bing.com/',
					'f-btn': 'https://www.fuzhugou.com/find'
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