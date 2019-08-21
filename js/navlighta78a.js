/*
 * Ghvzon
 * ����/��氪�G�ե� navlight-v3.0
 */
 
 /*����/���--�m���ե�*/
$.fn.topSuction = function(option) {
	option = option || {};
	var navbox = option.navbox || '.Nav_box';		//�m���϶�Class
	var fixCls = option.fixCls || 'cate-fixed';		//�m��Class
	var fixend = option.fixend || 'body';			//�����m�����e�϶�ID��Class
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
	//�i�����˦��jNavArea-fixed-bottom���@�}�l�N�m���ɡA���èt�Φa
	if( $self.hasClass('NavArea-fixed-bottom') == true ){ $('.footerArea').hide() };
};

/*����/���--�i�}�ե�*/
$.fn.navbtn = function(option, callback) {
	option = option || {};
	var navbtn = option.nav || '.Nav_Btn';						//�i�}���sClass
	var navopen = option.navopen || 'cate-open';				//�i�}Class	
	var $self = $(this);
	var $navbtn = $self.find(navbtn);
	//�i�}���
	$self.delegate( navbtn , ' click', function(e) {
		$self.toggleClass(navopen);
		//$self.find('.cate-one').toggle()
		//$('html,body').animate({ scrollTop: $navs.offset().top },100);
		e.preventDefault();
	})
	//�I�«̿��i�}���X
	$self.delegate('.Nav_bg' , ' click', function(e) {
		$self.removeClass(navopen);
		//$self.find('.cate-one').css('display','none')
		e.preventDefault();
	});
};

/*����/���--���G�ե�*/
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
	var navarea = option.navarea || '.NavArea';					//�̤j�]Class
	var navs = option.navs || '.Nav';							//�϶�Class
	var nav_wrapper = option.nav_wrapper || '.Nav-wrapper';		//���e�]Class
	var nav = option.nav || '.Nav-slide';						//���eClass
	var nav_toptext = option.nav_toptext || '.Nav_toptext';		//�e�m��Class
	var content = option.content || '.js-navlight_content';		//���������e�϶�Class
	var diffTop = option.diffTop || 100;						//�Z���������~�t��
	var diffBottom = option.diffBottom || 0;					//�Z���������~�t��
	var lightCls = option.lightCls || 'cate-hover';				//���GClass
	var navopen = option.navopen || 'cate-open';				//�i�}Class	
	var top_i = option.top_i || 0;								//���I����
	var open_light = option.open_light;
	var open_navlightcenter = option.open_navlightcenter;		
	var open_toptext = option.open_toptext;
	var $self = $(this);
	var $navarea = $self.find(navarea);
	var $navs = $navarea.find(navs);
	var $nav = $navarea.find(nav);
	var $content = $self.find(content);
	// �O���C�ӿ�檺��m
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
	// �O���C�Ӥ��e�϶�����m
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
			//Ĳ�o���G�����϶�
			contentPosi.each(function(idx, posi) {
				if ( posi.top < docTop && posi.bottom > docTop ) {
					//���G
					$nav.removeClass(lightCls);
					$nav.eq(idx).addClass(lightCls).siblings();		
					//���G�m��
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
	
	//�I������I
	if (open_light) {
		$nav.eq(0).addClass(lightCls);	
		$navarea.delegate( nav , ' click', function(e) {
			var $na = $(this);
			var idx = $nav.index($na);
			var $cont = $content.eq(idx);
			var top = $cont.offset().top;
			var height = $nav.outerHeight(true);
			$navarea.removeClass(navopen);
			//�i�����˦��jNavArea-fixed-bottom���@�}�l�N�m���ɡA�����氪��
			if( $navarea.hasClass('NavArea-fixed-bottom') == true ){ height = 0 };
			//���I����w�϶�
			$('html,body').animate({ scrollTop: top - height - top_i + 'px' });
			e.preventDefault();
		});
	};

	//�e�m�Ч�ثe���G���
	if(open_toptext){
		var oneCls = 'cate-one';	//���G����̫e��Class
		//�e�m�г]�w
		var oneHtml = '<a href="javascript:goTop(' + "'" + navarea + "'" + ');">' + $navarea.find('.' + lightCls +' a').html() + '</a>';	//�e�m�Ъ�HTML
		$navarea.find(nav_toptext).html( oneHtml );
		//�P�_�O�_���}�e�m��
		if( $navarea.attr('data-toptext') !== 'on' ){
			//���G����̫e���]�w
			var cateone = '<li class="' + oneCls +' '+  lightCls + '">' + oneHtml + '</li>';	//���G����̫e����HTML
			$navarea.find('.' + lightCls).hide();
			$navarea.find(nav_wrapper).prepend( cateone );
		}
	};

	//�۰ʱ�����ƶq�e�פ��
	var datanum =$navarea.attr('data-num');
	if( datanum > ' ' ){
		$nav.css('float','left');
		$nav.css('width',  ($navs.width() ) / datanum)
	};
	
	//���G�w�]�m��
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
 * �h��椬��(�Ű�)fNavChange()
 * -------------------------------------------
 */
function fNavChange(){
	var $navarea = $('.NavArea[data-fix="true"]')
	// �O���C�Ӥ��e�϶�����m
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
	//�u��1�ӿ��ɤ��ϥ�
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




