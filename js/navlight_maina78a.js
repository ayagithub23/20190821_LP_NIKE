
$(window).load(function(){
	//�w�q�϶�Class
	var $WRAPPER = $('.WRAPPER'); //�̤j�]

	/* 
	 * -------------------------------------------
	 * Phone���M��iNavArea_tabbar�������I���ҡj
	 * -------------------------------------------
	 */ 
	//�m��
	$WRAPPER.find('.NavArea_tabbar').topSuction({
	});
	//�i�}
	$WRAPPER.find('.NavArea_tabbar').navbtn({
	});
	//���G
	$WRAPPER.navLight({
		navarea: '.NavArea_tabbar',        //�̤j�]Class�C�w�].NavArea
		//content: '.layout_640_2x2_7b_C02',  //���������e�϶�Class�C�w�].js-navlight_content
		top_i: 15,                        //���I����
		
		//�}��
		open_light: true,                 //�Ұ�--���G�����϶��C
	});
	
	 
	/* 
	 * -------------------------------------------
	 * PC���M��
	 * -------------------------------------------
	 */ 
	//���G
	$WRAPPER.navLight({
		navarea: '.fixed_Area',        //�̤j�]Class�C�w�].NavArea
		navs: '.box',                     //�϶�Class�C�w�].Nav
		//nav_wrapper: '.fixedBox_1',      //���e�]Class�C�w�].Nav-wrapper
		content: '.js-PC',  //���������e�϶�Class�C�w�].js-navlight_content
		//top_i: 15,                        //���I����
		
		//�}��
		open_light: true,                 //�Ұ�--���G�����϶��C
	});
	

	/*�h��椬�ʱҰ�(�Ű�)
	fNavChange()*/

});



 
 