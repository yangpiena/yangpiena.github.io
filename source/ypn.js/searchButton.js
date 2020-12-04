var favObj = {
	init: function() {
		var s = this;
		s.band();
	},
	band: function() {
		$('#b-btn, #q-btn, #m-btn, #d-btn, #p-btn, #w-btn').focus(function() {
				var id = this.id;
				var urlArr = {
					'b-btn': '//www.baidu.com/baidu',
					'q-btn': '//www.google.com/search',
					'm-btn': 'https://mijisou.com/',
					'd-btn': 'https://www.dogedoge.com/results',
					'w-btn': 'https://cn.bing.com/'
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