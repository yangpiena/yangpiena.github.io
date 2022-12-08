var favObj = {
	init: function() {
		var s = this;
		s.band();
	},
	band: function() {
		$('#b-btn, #q-btn, #m-btn, #f-btn, #d-btn').focus(function() {
				var id = this.id;
				var urlArr = {
					'b-btn': 'https://www.baidu.com/baidu',
					'g-btn': 'https://swag.pw/search',
					'm-btn': 'https://cn.bing.com/search',
					'p-btn': 'https://petalsearch.com/search',
					'f-btn': 'https://www.fuzhugou.com/find',
					'd-btn': 'https://www.dogdoggo.com/search',
					'c-btn': 'https://fsou.cc/search'
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