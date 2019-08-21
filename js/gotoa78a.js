/* goTop*/ 
function goTop(val) {
	jQuery('html,body').animate({scrollTop:jQuery(val).offset().top},700);
}

/* 回版頭 */
jQuery(function(){
	jQuery("#gotop").click(function(){
		jQuery("html,body").stop(true,false).animate({scrollTop:0},700); //設定回頁面頂端
		return false;	
	});
    jQuery(window).scroll(function() {
        if ( jQuery(this).scrollTop() > 300){ //設定大於300px才顯示浮層
            jQuery('#gotop').fadeIn("fast");
        } else {
            jQuery('#gotop').stop().fadeOut("fast");
        }
    });
});



/* mouseover 
function MM_swapImgRestore() { //v3.0
	var i,x,a=document.MM_sr;
	for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++){
		x.src=x.oSrc;
	}
}

function MM_preloadImages() { //v3.0
	var d=document;
	if(d.images){
		if(!d.MM_p){
			d.MM_p=new Array();
		}
	}
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments;
	for(i=0; i<a.length; i++){
		if (a[i].indexOf("#")!=0){
			d.MM_p[j]=new Image;
			d.MM_p[j++].src=a[i];
		}
	}
}

function MM_findObj(n, d) { //v4.01
	var p,i,x;
	if(!d){
		d=document;
	}
	if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);
	}
	if(!(x=d[n])&&d.all){
		x=d.all[n];
	}
	for (i=0;!x&&i<d.forms.length;i++){
		x=d.forms[i][n];
	}
	for(i=0;!x&&d.layers&&i<d.layers.length;i++){
		x=MM_findObj(n,d.layers[i].document);
	}
	if(!x && d.getElementById){
		x=d.getElementById(n);
	}
	return x;
	
}

function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments;
	document.MM_sr=new Array;
	for(i=0;i<(a.length-2);i+=3) {
		if ((x=MM_findObj(a[i]))!=null) {
			document.MM_sr[j++]=x;
			if(!x.oSrc) {
				x.oSrc=x.src;
				x.src=a[i+2];
			}
		}
	}
}*/

/*goto打開*/
$(window).scroll(function() {
	//假如寬度大於1285
	var width = window.screen.availWidth;
	
	if ( width <= 640 ) {
		　　var top_position1 = $(this).scrollTop();
		　　if ( top_position1 > 200){
		　　　　// Let the item move with scrolling.
		　　　　$("#gotop").show('slow');
		　　} else {
		　　　　// Reset the position to default.
		　　　　$("#gotop").hide();
		　　}
	}
}); 

jQuery(function(){
	jQuery("#gotop").click(function(){
		jQuery("html,body").stop(true,false).animate({scrollTop:0},700); //設定回頁面頂端
		return false;	
	});

});


/*組出影片iframe連結*/
$(function(){
	$(".viedo > .imgArea").remove();
	$(".viedo > .viedobg").remove();
	$(".viedo").each(function() {
		var youtubeID = $(this).find('.youtubeArea').attr('data-id');
		$(this).find('.youtubeArea iframe').attr('data-src','https://www.youtube.com/embed/' + youtubeID + '?rel=0');
	});
});



/**iframe自動高度**/
function SetCwinHeight(){
	var iframeid=document.getElementById("mainframe"); //iframe id
	if (document.getElementById){   
		if (iframeid && !window.opera){   
			if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight){   
				iframeid.height = iframeid.contentDocument.body.offsetHeight;   
			}else if(iframeid.Document && iframeid.Document.body.scrollHeight){   
				iframeid.height = iframeid.Document.body.scrollHeight;   
			}   
		}
	}
}

/**iframe自動高度2**/
function SetCwinHeight2(){
	var iframeid=document.getElementById("mainframe2"); //iframe id
	if (document.getElementById){   
		if (iframeid && !window.opera){   
			if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight){   
				iframeid.height = iframeid.contentDocument.body.offsetHeight;   
			}else if(iframeid.Document && iframeid.Document.body.scrollHeight){   
				iframeid.height = iframeid.Document.body.scrollHeight;   
			}   
		}
	}
}

/**iframe自動高度3**/
function SetCwinHeight3(){
	var iframeid=document.getElementById("mainframe3"); //iframe id
	if (document.getElementById){   
		if (iframeid && !window.opera){   
			if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight){   
				iframeid.height = iframeid.contentDocument.body.offsetHeight;   
			}else if(iframeid.Document && iframeid.Document.body.scrollHeight){   
				iframeid.height = iframeid.Document.body.scrollHeight;   
			}   
		}
	}
}

/**iframe自動高度4**/
function SetCwinHeight4(){
	var iframeid=document.getElementById("mainframe4"); //iframe id
	if (document.getElementById){   
		if (iframeid && !window.opera){   
			if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight){   
				iframeid.height = iframeid.contentDocument.body.offsetHeight;   
			}else if(iframeid.Document && iframeid.Document.body.scrollHeight){   
				iframeid.height = iframeid.Document.body.scrollHeight;   
			}   
		}
	}
}

/**iframe自動高度5**/
function SetCwinHeight5(){
	var iframeid=document.getElementById("mainframe5"); //iframe id
	if (document.getElementById){   
		if (iframeid && !window.opera){   
			if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight){   
				iframeid.height = iframeid.contentDocument.body.offsetHeight;   
			}else if(iframeid.Document && iframeid.Document.body.scrollHeight){   
				iframeid.height = iframeid.Document.body.scrollHeight;   
			}   
		}
	}
}



/* 浮層區*/
function agree(val) {
	$(val).fadeIn();
	var winST =  jQuery(window).scrollTop(); //目前位置
	var winH =  jQuery(window).height(); //裝置高度
	//浮層高度
	$(val).find('.agreeArea .txtArea').css('height', winH * 60 / 100 );
	var this_agreeH = $(val).find('.agreeArea').height();
	//浮層top定位
	$('.agreeArea').css('top', winST + winH/2 - this_agreeH/2 );
}
$(function(){
	var blackBox = $(".blackBox");
	var blackBox_close = $(".blackBox .close , .blackBox .but-close");
	var blackBox_BOXclose = ".Boxclose , .fixedfooterArea_B ";
	//點按鈕關閉
	blackBox_close.delegate( "a" ,"touchstart click",function(e){
		$(blackBox).fadeOut();
		e.preventDefault();
	});
	//點黑區關閉
	blackBox.delegate( blackBox_BOXclose ,"touchstart click",function(e){
		$(blackBox).fadeOut();
		e.preventDefault();
	});
});
 


/*開關PC黏人精*/
$(function(){
	var $fixed_Area = $('.fixed_Area');
	//預設進場
	setTimeout( function(){ $fixed_Area.toggleClass('fixed_Area_hide') } ,1500)
	//點擊切換
	$fixed_Area.find('.js-fixed_Area_hide').click(function(){
		$fixed_Area.toggleClass('fixed_Area_hide');
	})
});



