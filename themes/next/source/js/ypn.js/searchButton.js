var favObj = {
	init: function() {
		var s = this;
		s.band();
	},
	band: function() {
		$('#b-btn, #g-btn, #m-btn').focus(function() {
				var id = this.id;
				var urlArr = {
					'b-btn': 'https://www.baidu.com/baidu',
					'g-btn': 'https://www.google.com/search',
					'm-btn': 'https://cn.bing.com/search',
				}
				$('#search-form').attr('action', urlArr[id]);
		});
		$('#search-form').on('submit', function() {
			$('#q-word').val($('#b-word').val());
		});
	}
};
favObj.init();