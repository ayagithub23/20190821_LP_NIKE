/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
 *
 */

/*
 * Ghvzon v3.0
 *******************************************************************
 *  --2019.03.22-v3.0 修正撐圖片尺寸的方法,改用padding-bottom
 *  --2018.09.12-v2.0 針對非正方型尺寸圖片新增data-size
 *******************************************************************
 */


(function($, window, document, undefined) {

	/* 2019.03.22--針對非正方型尺寸圖片新增data-size */
	$('body').before('<style>.articleList img.lazy_off { min-width:1px; min-height:1px; background-size: contain; background-repeat:no-repeat; background-position: center center; background-image:url(data:image/png;charset=utf-8;base64,R0lGODlhTAFMAcQSAO7u7v39/fDw8Pj4+P7+/vn5+fT09PX19ff39+/v7/Pz8/////b29vLy8vHx8fv7+/z8/Pr6+v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERTdBNDIxMjg1NDkxMUU2ODJCRDkxNzcwQjZDQjcxNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERTdBNDIxMzg1NDkxMUU2ODJCRDkxNzcwQjZDQjcxNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRFN0E0MjEwODU0OTExRTY4MkJEOTE3NzBCNkNCNzE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRFN0E0MjExODU0OTExRTY4MkJEOTE3NzBCNkNCNzE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJy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);}</style>')
	
    var $window = $(window);
	
    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            //placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
			//placeholder   : "images/loadinggif.gif",
			placeholder     : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",  //20180912--1px空白gif
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {				
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

			/* 2019.03.22--針對非正方型尺寸圖片新增data-size */
			var size = $self.attr('data-size');
			var width;
			var height;
			if (size){
				var sizeArr = size.split(','); //拆字串轉陣列
				$self.addClass('lazy_off');	
				//轉換%取寬高比算高度
				height = ( sizeArr[3] / sizeArr[2] )*100;
				$self.css({'width':'100%','height':'0','padding-bottom':height+'%' });
			}

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
					
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);				
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
				
					/* 2018.09.12--針對非正方型尺寸圖片新增data-size */
					var size = $self.attr('data-size');
					if (size){
						$self.removeClass('lazy_off'); //取消背景
						$self.css({'width':'','height':'','padding-bottom':'' });//取消寬高比
					}

                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {	
            update();
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        /* 2019.03.22--頁面讀取完成後再update()一次,針對指定時間開關物件 */
        $(window).load(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
