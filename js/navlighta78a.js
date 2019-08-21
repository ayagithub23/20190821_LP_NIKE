/*
 * Ghvzon
 * 導覽/選單高亮組件 navlight-v3.0
 */
 
 /*導覽/選單--置頂組件*/
$.fn.topSuction = function(option) {
	option = option || {};
	var navbox = option.navbox || '.Nav_box';		//置頂區塊Class
	var fixCls = option.fixCls || 'cate-fixed';		//置頂Class
	var fixend = option.fixend || 'body';			//結束置頂內容區塊ID或Class
	var fixedFunc = option.fixedFunc;
	var resetFunc = option.resetFunc;
	var $self = this;
	var $fixend = $(fixend);
	var $win  = $(window);
	if (!$self.length) return;
	var width = $self.width();
	var height = $self.height();
	var offset = $self.offset();
	var fTop   = offset.top;
	var fLeft  = offset.left;
	var feBottom =  $fixend.offset().top + $fixend.height()
	$self.css('z-index','200');
	if ( fixend == 'body' ){
		$self.attr('data-fix',true);
	}
	//$self.data('def', offset);
	//$win.resize(function() {
	//	$self.data('def', $self.offset());
	//});
	function fix(){
		dTop = $(document).scrollTop();	
		if ( fTop < dTop && feBottom > dTop) {
			$self.addClass(fixCls);
			$self.children(navbox).width( width );
			if ( feBottom - height < dTop ){
				var h =dTop - feBottom + height
				$self.find(navbox).css('top', h * -1 );
			} else {
				$self.find(navbox).css('top','' );
			}
			if (fixedFunc) {
				fixedFunc.call($self, fTop);
			};
		} else {
			$self.removeClass(fixCls);
			if (resetFunc) {
				resetFunc.call($self, fTop);
			};
		};
	};
	fix();
	$win.scroll(function() {
		fix();
	});
	$win.resize(function() {
		fix();
	});
	//【切換樣式】NavArea-fixed-bottom選單一開始就置底時，隱藏系統地
	if( $self.hasClass('NavArea-fixed-bottom') == true ){ $('.footerArea').hide() };
};

/*導覽/選單--展開組件*/
$.fn.navbtn = function(option, callback) {
	option = option || {};
	var navbtn = option.nav || '.Nav_Btn';						//展開按鈕Class
	var navopen = option.navopen || 'cate-open';				//展開Class	
	var $self = $(this);
	var $navbtn = $self.find(navbtn);
	//展開選單
	$self.delegate( navbtn , ' click', function(e) {
		$self.toggleClass(navopen);
		//$self.find('.cate-one').toggle()
		//$('html,body').animate({ scrollTop: $navs.offset().top },100);
		e.preventDefault();
	})
	//點黑屏選單展開收合
	$self.delegate('.Nav_bg' , ' click', function(e) {
		$self.removeClass(navopen);
		//$self.find('.cate-one').css('display','none')
		e.preventDefault();
	});
};

/*導覽/選單--高亮組件*/
$.debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
$.throttle = function(func, wait) {
	var context, args, timeout, throttling, more, result;
	var whenDone = $.debounce(function() {
		more = throttling = false;
	}, wait);
	return function() {
		context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (more) func.apply(context, args);
			whenDone();
		};
		if (!timeout) timeout = setTimeout(later, wait);
		
		if (throttling) {
			more = true;
		} else {
			result = func.apply(context, args);
		};
		whenDone();
		throttling = true;
		return result;
	};
};
$.fn.navLight = function(option, callback) {
	option = option || {};
	var navarea = option.navarea || '.NavArea';					//最大包Class
	var navs = option.navs || '.Nav';							//區塊Class
	var nav_wrapper = option.nav_wrapper || '.Nav-wrapper';		//內容包Class
	var nav = option.nav || '.Nav-slide';						//內容Class
	var nav_toptext = option.nav_toptext || '.Nav_toptext';		//前置標Class
	var content = option.content || '.js-navlight_content';		//選單對應內容區塊Class
	var diffTop = option.diffTop || 100;						//距離頂部的誤差值
	var diffBottom = option.diffBottom || 0;					//距離底部的誤差值
	var lightCls = option.lightCls || 'cate-hover';				//高亮Class
	var navopen = option.navopen || 'cate-open';				//展開Class	
	var top_i = option.top_i || 0;								//錨點偏移
	var open_light = option.open_light;
	var open_navlightcenter = option.open_navlightcenter;		
	var open_toptext = option.open_toptext;
	var $self = $(this);
	var $navarea = $self.find(navarea);
	var $navs = $navarea.find(navs);
	var $nav = $navarea.find(nav);
	var $content = $self.find(content);
	// 記錄每個選單的位置
	var navPosi = $nav.map(function(idx, elem) {
		var $cont = $(elem);
		var left = $cont.offset().left;
		var width = $cont.outerWidth(true);
		return {
			left: left,
			width: width,
			jq: $cont
		};
	});
	//console.log(navPosi);
	// 記錄每個內容區塊的位置
	var contentPosi = $content.map(function(idx, elem) {
		var $cont = $(elem);
		var top = $cont.offset().top;
		var bottom = $cont.offset().top;
		var height = $cont.height();
		return {
			top: top-diffTop,
			bottom: top+height+diffBottom,
			jq: $cont
		};
	});
	//console.log(contentPosi);
	var $win = $(window);
	var $doc = $(document);
	var handler = $.throttle(function(e) {
		var dTop = $doc.scrollTop();
		highLight(dTop);
		//console.log(dTop);
	}, 100);
	function highLight(docTop) {
		if (open_light) {
			//觸發高亮對應區塊
			contentPosi.each(function(idx, posi) {
				if ( posi.top < docTop && posi.bottom > docTop ) {
					//高亮
					$nav.removeClass(lightCls);
					$nav.eq(idx).addClass(lightCls).siblings();		
					//高亮置中
					var left = navPosi[idx].left;
					var center = ( $win.width() - navPosi[idx].width )/2;
					$navs.stop().animate({ scrollLeft: left - center },100);
					if (callback) {
						callback($nav, $content);
					}
				};
			});
		}
	};
	
	//點選單錨點
	if (open_light) {
		$nav.eq(0).addClass(lightCls);	
		$navarea.delegate( nav , ' click', function(e) {
			var $na = $(this);
			var idx = $nav.index($na);
			var $cont = $content.eq(idx);
			var top = $cont.offset().top;
			var height = $nav.outerHeight(true);
			$navarea.removeClass(navopen);
			//【切換樣式】NavArea-fixed-bottom選單一開始就置底時，不算選單高度
			if( $navarea.hasClass('NavArea-fixed-bottom') == true ){ height = 0 };
			//錨點到指定區塊
			$('html,body').animate({ scrollTop: top - height - top_i + 'px' });
			e.preventDefault();
		});
	};

	//前置標抓目前高亮資料
	if(open_toptext){
		var oneCls = 'cate-one';	//高亮移到最前面Class
		//前置標設定
		var oneHtml = '<a href="javascript:goTop(' + "'" + navarea + "'" + ');">' + $navarea.find('.' + lightCls +' a').html() + '</a>';	//前置標的HTML
		$navarea.find(nav_toptext).html( oneHtml );
		//判斷是否打開前置標
		if( $navarea.attr('data-toptext') !== 'on' ){
			//高亮移到最前面設定
			var cateone = '<li class="' + oneCls +' '+  lightCls + '">' + oneHtml + '</li>';	//高亮移到最前面的HTML
			$navarea.find('.' + lightCls).hide();
			$navarea.find(nav_wrapper).prepend( cateone );
		}
	};

	//自動控制選單數量寬度比例
	var datanum =$navarea.attr('data-num');
	if( datanum > ' ' ){
		$nav.css('float','left');
		$nav.css('width',  ($navs.width() ) / datanum)
	};
	
	//高亮預設置中
	if(open_navlightcenter){
		var idx = $navs.find('li.'+ lightCls ).index();
		var left = navPosi[idx].left;
		var center = ( $win.width() - navPosi[idx].width )/2;
		$navs.stop().animate({ scrollLeft: left - center },100);
	}

	$win.scroll(handler)
};


/* 
 * -------------------------------------------
 * 多選單互動(勿動)fNavChange()
 * -------------------------------------------
 */
function fNavChange(){
	var $navarea = $('.NavArea[data-fix="true"]')
	// 記錄每個內容區塊的位置
	var NavboxPosi = $navarea.map(function(idx, elem) {
		var $cont = $(elem);
		var top = $cont.offset().top;
		var bottom = $cont.offset().top;
		var height = $cont.height();
		var fix    = $cont.attr('data-fix');
		return {		
			top: top,
			bottom: top + height,
			height: height,
			fix: fix,
			jq: $cont
		};
	});
	//console.log(NavboxPosi);
	//只有1個選單時不使用
	if ( NavboxPosi.length != 1){
		var $win = $(window);
		var $doc = $(document);
		$win.scroll(function(){
			var dTop = $doc.scrollTop();
			NavboxPosi.each(function(idx, posi) {
				if (idx != 0){
					var touch = posi.top - posi.height;
					if ( touch < dTop  && posi.bottom > dTop ) {
						var h = dTop - touch
						$navarea.find('.Nav_box').eq(idx-1).css('top', h * -1 );
					} else {
						$navarea.find('.Nav_box').eq(idx-1).css('top','');
					};

				};
			});	
		});	
	}
};




