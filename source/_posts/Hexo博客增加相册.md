---
title: Hexo博客增加相册
author: 昜丿捺
categories: 技术
timestamp: 1553668821
date: 2019-03-27 14:40:21
authorDesc:
tags: [hexo]
description:
---
#### 1. 增加菜单，命令如下：
	hexo new page photos

#### 2. 编辑菜单photos下的文件index.md，添加如下内容：
	<div class="content">
		<div class="iw_wrapper">
			<ul class="iw_thumbs" id="iw_thumbs">
				<!-- <li><img src="/img/thumbs/1.jpg" data-img="/img/full/1.jpg" alt="Thumb1"/><div><h2>Serenity</h2><p>Far far away, behind the word mountains there live the blind texts.</p></div></li> -->
			</ul>
		</div>
		<div id="iw_ribbon" class="iw_ribbon">
			<span class="iw_close"></span>
			<span class="iw_zoom">Click thumb to zoom</span>
		</div>
	</div>

	<script type="text/javascript" src="/js/addphoto.js"></script>
	<script type="text/javascript" src="/js/jquery.min.js"></script>
	<script type="text/javascript" src="/js/jquery.masonry.min.js"></script>
	<script type="text/javascript" src="/js/jquery.easing.1.3.js"></script>
	<script type="text/javascript">
		$(window).load(function(){
			var $iw_thumbs			= $('#iw_thumbs'),
				$iw_ribbon			= $('#iw_ribbon'),
				$iw_ribbon_close	= $iw_ribbon.children('span.iw_close'),
				$iw_ribbon_zoom		= $iw_ribbon.children('span.iw_zoom');
				
				ImageWall	= (function() {
						// window width and height
					var w_dim,
						// index of current image
						current				= -1,
						isRibbonShown		= false,
						isFullMode			= false,
						// ribbon / images animation settings
						ribbonAnim			= {speed : 500, easing : 'easeOutExpo'},
						imgAnim				= {speed : 400, easing : 'jswing'},
						// init function : call masonry, calculate window dimentions, initialize some events
						init				= function() {
							$iw_thumbs.imagesLoaded(function(){
								$iw_thumbs.masonry({
									isAnimated	: true
								});
							});
							getWindowsDim();
							initEventsHandler();
						},
						// calculate window dimentions
						getWindowsDim		= function() {
							w_dim = {
								width	: $(window).width(),
								height	: $(window).height()
							};
						},
						// initialize some events
						initEventsHandler	= function() {
							
							// click on a image
							$iw_thumbs.delegate('li', 'click', function() {
								if($iw_ribbon.is(':animated')) return false;
								
								var $el = $(this);
								
								if($el.data('ribbon')) {
									showFullImage($el);
								}
								else if(!isRibbonShown) {
									isRibbonShown = true;
									
									$el.data('ribbon',true);
									
									// set the current
									current = $el.index();
								
									showRibbon($el);
								}
							});
							
							// click ribbon close
							$iw_ribbon_close.bind('click', closeRibbon);
							
							// on window resize we need to recalculate the window dimentions
							$(window).bind('resize', function() {
										getWindowsDim();
										if($iw_ribbon.is(':animated'))
											return false;
										closeRibbon();
									 })
									 .bind('scroll', function() {
										if($iw_ribbon.is(':animated'))
											return false;
										closeRibbon();
									 });
							
						},
						showRibbon			= function($el) {
							var	$img	= $el.children('img'),
								$descrp	= $img.next();
							
							// fadeOut all the other images
							$iw_thumbs.children('li').not($el).animate({opacity : 0.2}, imgAnim.speed);
							
							// increase the image z-index, and set the height to 100px (default height)
							$img.css('z-index', 100)
								.data('originalHeight',$img.height())
								.stop()
								.animate({
									height 		: '100px'
								}, imgAnim.speed, imgAnim.easing);
							
							// the ribbon will animate from the left or right
							// depending on the position of the image
							var ribbonCssParam 		= {
									top	: $el.offset().top - $(window).scrollTop() - 6 + 'px'
								},
								descriptionCssParam,
								dir;
							
							if( $el.offset().left < (w_dim.width / 2) ) {
								dir = 'left';
								ribbonCssParam.left 	= 0;
								ribbonCssParam.right 	= 'auto';
							}
							else {
								dir = 'right';
								ribbonCssParam.right 	= 0;
								ribbonCssParam.left 	= 'auto';
							}
							
							$iw_ribbon.css(ribbonCssParam)
									  .show()
									  .stop()
									  .animate({width : '100%'}, ribbonAnim.speed, ribbonAnim.easing, function() {
											switch(dir) {
												case 'left' :
													descriptionCssParam		= {
														'left' 			: $img.outerWidth(true) + 'px',
														'text-align' 	: 'left'
													};
													break;
												case 'right' :	
													descriptionCssParam		= {
														'left' 			: '-200px',
														'text-align' 	: 'right'
													};
													break;
											};
											$descrp.css(descriptionCssParam).fadeIn();
											// show close button and zoom
											$iw_ribbon_close.show();
											$iw_ribbon_zoom.show();
									  });
							
						},
						// close the ribbon
						// when in full mode slides in the middle of the page
						// when not slides left
						closeRibbon			= function() {
							isRibbonShown 	= false
							
							$iw_ribbon_close.hide();
							$iw_ribbon_zoom.hide();
							
							if(!isFullMode) {
							
								// current wall image
								var $el	 		= $iw_thumbs.children('li').eq(current);
								
								resetWall($el);
								
								// slide out ribbon
								$iw_ribbon.stop()
										  .animate({width : '0%'}, ribbonAnim.speed, ribbonAnim.easing); 
									  
							}
							else {
								$iw_ribbon.stop().animate({
									opacity		: 0.8,
									height 		: '0px',
									marginTop	: w_dim.height/2 + 'px' // half of window height
								}, ribbonAnim.speed, function() {
									$iw_ribbon.css({
										'width'		: '0%',
										'height'	: '126px',
										'margin-top': '0px'
									}).children('img').remove();
								});
								
								isFullMode	= false;
							}
						},
						resetWall			= function($el) {
							var $img		= $el.children('img'),
								$descrp		= $img.next();
								
							$el.data('ribbon',false);
							
							// reset the image z-index and height
							$img.css('z-index',1).stop().animate({
								height 		: $img.data('originalHeight')
							}, imgAnim.speed,imgAnim.easing);
							
							// fadeOut the description
							$descrp.fadeOut();

							// fadeIn all the other images
							$iw_thumbs.children('li').not($el).animate({opacity : 1}, imgAnim.speed);								
						},
						showFullImage		= function($el) {
							isFullMode	= true;
							
							$iw_ribbon_close.hide();
							
							var	$img	= $el.children('img'),
								large	= $img.data('img'),
							
								// add a loading image on top of the image
								$loading = $('<span class="iw_loading"></span>');
							
							$el.append($loading);
							
							// preload large image
							$('<img/>').load(function() {
								var $largeImage	= $(this);
								
								$loading.remove();
								
								$iw_ribbon_zoom.hide();
								
								resizeImage($largeImage);
								
								// reset the current image in the wall
								resetWall($el);
								
								// animate ribbon in and out
								$iw_ribbon.stop().animate({
									opacity		: 1,
									height 		: '0px',
									marginTop	: '63px' // half of ribbons height
								}, ribbonAnim.speed, function() {
									// add the large image to the DOM
									$iw_ribbon.prepend($largeImage);
									
									$iw_ribbon_close.show();
									
									$iw_ribbon.animate({
										height 		: '100%',
										marginTop	: '0px',
										top			: '0px'
									}, ribbonAnim.speed);
								});
							}).attr('src',large);
								
						},
						resizeImage			= function($image) {
							var widthMargin		= 100,
								heightMargin 	= 100,
							
								windowH      	= w_dim.height - heightMargin,
								windowW      	= w_dim.width - widthMargin,
								theImage     	= new Image();
								
							theImage.src     	= $image.attr("src");
							
							var imgwidth     	= theImage.width,
								imgheight    	= theImage.height;

							if((imgwidth > windowW) || (imgheight > windowH)) {
								if(imgwidth > imgheight) {
									var newwidth 	= windowW,
										ratio 		= imgwidth / windowW,
										newheight 	= imgheight / ratio;
										
									theImage.height = newheight;
									theImage.width	= newwidth;
									
									if(newheight > windowH) {
										var newnewheight 	= windowH,
											newratio 		= newheight/windowH,
											newnewwidth 	= newwidth/newratio;
									
										theImage.width 		= newnewwidth;
										theImage.height		= newnewheight;
									}
								}
								else {
									var newheight 	= windowH,
										ratio 		= imgheight / windowH,
										newwidth 	= imgwidth / ratio;
									
									theImage.height = newheight;
									theImage.width	= newwidth;
									
									if(newwidth > windowW) {
										var newnewwidth 	= windowW,
											newratio 		= newwidth/windowW,
											newnewheight 	= newheight/newratio;
								
										theImage.height 	= newnewheight;
										theImage.width		= newnewwidth;
									}
								}
							}
								
							$image.css({
								'width'			: theImage.width + 'px',
								'height'		: theImage.height + 'px',
								'margin-left'	: -theImage.width / 2 + 'px',
								'margin-top'	: -theImage.height / 2 + 'px'
							});							
						};
						
					return {init : init};	
				})();
			
			ImageWall.init();
		});
	</script>
	
#### 3. 拷贝需要的4个js文件，到主题的js目录下
addphoto.js
jquery.min.js
jquery.masonry.min.js
jquery.easing.1.3.js
jquery-1.11.3.min.js

#### 4. 编辑layout下的文件head.ejs，引入js
	<!-- YPN Add 2019-03-25 增加相册所需js -->
	<script type="text/javascript" src="<%- config.root %>js/jquery-1.11.3.min.js"></script>

#### 5. 新建图片数据源配置文件data.json，保存到菜单目录photos下面，内容如下
	[
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E6%83%B3%E5%BF%B5.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E7%BE%81%E7%BB%8A.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E6%95%85%E4%BA%8B.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E5%AE%98%E5%9C%BA.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E5%8F%8D%E6%8A%97%E5%86%9B.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E7%89%A1%E4%B8%B9%E7%AC%91%E4%BA%86.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E7%88%B1%E4%BA%BA.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E7%89%A1%E4%B8%B9.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E7%BE%8E.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E6%88%90%E9%95%BF.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E6%9E%97%E4%B8%AD%E5%B0%8F%E5%B1%8B.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E6%98%A5%E5%B7%B2%E6%9A%AE.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E4%BA%BA%E9%9D%A2%E4%B8%8D%E7%9F%A5%E4%BD%95%E5%8E%BB.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E7%83%AD%E6%83%85.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E8%8B%A5%E9%9D%9E%E9%9D%92%E6%98%A5%E8%8B%A6%E7%9F%AD.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E5%BE%97%E6%88%90%E6%AD%A4%E7%9B%AE%E4%BD%95%E8%BE%9E%E6%AD%BB.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E7%94%9F%E5%91%BD%E5%8F%B3%E5%A4%AA%E5%A4%9A%E9%81%97%E6%86%BE.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E5%B0%91%E5%B9%B4.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E4%B8%96%E4%BA%8B%E9%83%BD%E6%95%8C%E4%B8%8D%E8%BF%87%E6%97%B6%E9%97%B4.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E6%97%85%E7%A8%8B.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E5%90%91%E6%9D%A5%E7%BC%98%E6%B5%85.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E5%A4%A9%E6%B6%AF%E6%B5%B7%E8%A7%92.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E4%B8%8E%E5%90%9B%E5%88%9D%E7%9B%B8%E8%AF%86.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E8%AF%AD%E8%A8%80.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E6%AC%B2%E6%A7%95%E8%BD%BB%E8%88%9F.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E4%B8%80%E9%A9%AC%E5%BD%93%E5%85%88.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E6%AD%BB%E5%85%9A.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E8%87%B4%E9%9D%92%E6%98%A5.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E6%80%BB%E6%9C%89%E8%BF%99%E6%A0%B7%E9%82%A3%E6%A0%B7.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E8%BF%BD%E5%AF%BB.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E6%9C%89%E4%BD%A0%E5%9C%A8.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E6%8B%A5%E6%9C%89.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"},
		{"url":"https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E5%8D%B4%E7%88%B1%E8%93%9D%E7%BD%97%E8%A3%99%E5%AD%90.jpg","title":"昜丿捺","desc":"2019-03-25 22:06:26"}
	]
其中，图片地址为网络地址，示例中图床由腾讯云提供。

#### 最后，重启hexo服务生效。
	hexo clean && hexo g && hexo s