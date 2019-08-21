/*
 *
 * 登記送共用JS-多顆登記按鈕版
 * ecchao 2018.05.29
 * 
 */

//Ready 
momoj(document).ready(function() {
  momoj.each(registerPromo, function(index, value){
    regButtonClick(index, value);
  });
});

//登記按鈕功能
function regButtonClick(promoIndex, promo){

  var m_promoNo = promo.m_promoNo;
  var dt_promoNo = promo.dt_promoNo;
  var gift_code = promo.gift_code;
  
  momoj.each(dt_promoNo, function(dtIndex, dtValue){
    var pc_regButton_id = '#promo' + promoIndex + '_' + dtIndex ;
    var mo_regButton_id = '#m_promo' + promoIndex + '_' + dtIndex;

    dt_promoNo = promo.dt_promoNo[dtIndex];
    gift_code = promo.gift_code[dtIndex];
  
    //大網按鈕
    momoj(pc_regButton_id).attr('href', 'javascript:reg(\'' + promoIndex + '\',\'' + m_promoNo + '\',\'' + dt_promoNo + '\',\'' + gift_code + '\');');
    //小網按鈕
    momoj(mo_regButton_id).attr('href', 'javascript:reg(\'' + promoIndex + '\',\'' + m_promoNo + '\',\'' + dt_promoNo + '\',\'' + gift_code + '\');');
  });
  
  cnt(promoIndex, promo);//登記人數功能
  listButton(promoIndex, promo);//查詢功能

}

//Ajax
var serviceUrl = '/ajax/promoMech.jsp';
var promoAjaxKey = false;
function promoAjax(data) {
  if(promoAjaxKey == false) {
    promoAjaxKey = true;
    var result = '-1';

    momoj.ajax({
      url : serviceUrl,
      async : false,
      cache : false,
      type : 'POST',
      dataType : 'json',
      contentType : 'application/x-www-form-urlencoded; charset=big5',
      data : data,
      timeout : 30000,
      success : function(rtnData) {
        result = rtnData;
        promoAjaxKey = false;
      },
      error : function(err, msg1, msg2) {
        promoAjaxKey = false;
        alert("ERROR\n很抱歉!伺服器暫時無法連線，請稍候再試");
      }
    });
    return result;
  }
}

//顯示目前登記人數
function cnt(promoIndex, promo) {
  
  var m_promoNo = promo.m_promoNo;
  var dt_promoNo = promo.dt_promoNo;
  var cntType = promo.cntType;
  if(cntType == '1007' || cntType == '1003'){
    var data = {
      doAction : 'cnt',
      m_promo_no : m_promoNo,
      dt_promo_no : '',
      cnt_type : cntType
    };
    
    var rtnData = promoAjax(data);
    
    if(rtnData != '-1') {
      var returnMsg = rtnData.returnMsg;
      if(returnMsg == 'OK') {
        momoj.each(dt_promoNo, function(dtIndex, dtValue){
          var pc_cntButton_id = '#promo' + promoIndex + '_' + dtIndex + 'Count';
          var mo_cntButton_id = '#m_promo' + promoIndex + '_' + dtIndex + 'Count';
          momoj(pc_cntButton_id + ',' + mo_cntButton_id).html(rtnData[dtValue]);
        });
      }else {
        alert('很抱歉，伺服器暫時無法連線，請稍候再試');
      }
    }
  }
}

//登記鈕
function reg(promoIndex, m_promo_no, dt_promo_no, gift_code) {
  momoj().MomoLogin({flag:false, LoginSuccess:function() {
    var data = {
      doAction : 'reg',
      m_promo_no : m_promo_no,
      dt_promo_no : dt_promo_no,
      gift_code : gift_code
    };

    var rtnData = promoAjax(data);

    if(rtnData != '-1') {
      var returnMsg = rtnData.returnMsg;

      if(returnMsg == 'D') {
        alert('請於活動時間內參加活動');
      }
      else if(returnMsg == 'NOT_USED') {
        alert('很抱歉，活動暫不開放');
      }
      else if(returnMsg == 'W') {
        alert('請於指定星期參加活動');
      }
      else if(returnMsg == 'WP') {
        alert('競標金額錯誤');
      }
      else if(returnMsg == 'L') {
        alert('請先登入會員');
      }
      else if(returnMsg == 'NOT_APP') {
        alert('請在momo APP參加活動');
      }
      else if(returnMsg == 'NOT_WEB') {
        alert('請在momo網頁版參加活動');
      }
      else if(returnMsg == 'A') {
        alert('您已登記過此活動');
      }
      else if(returnMsg == 'FULL') {
        alert('登記已額滿');
      }
      else if(returnMsg == 'A_EX') {
        alert('您已登記過其他活動');
      }
      else if(returnMsg == 'NOT_NC') {
        alert('您非活動期間新客');
      }
      else if(returnMsg == 'NOT_WFB') {
        alert('您非活動期間首購');
      }
      else if(returnMsg == 'EA') {
        alert('您不符合登記資格');
      }
      else if(returnMsg == 'NO_PT') {
        alert('點數不足');
      }
      else if(returnMsg == 'INS') {
        alert('登記成功，感謝您對本活動的支持');
        cnt(promoIndex, registerPromo[promoIndex]);
      }
      else {
        alert('很抱歉，伺服器暫時無法連線，請稍候再試');
      }
    }
  }});
}


//查詢按鈕
function listButton(promoIndex, promo){
  var pc_listButton_id = '#promo' + promoIndex + 'List';
  var mo_listButton_id = '#m_promo' + promoIndex + 'List';
  momoj(pc_listButton_id + ',' + mo_listButton_id).attr('href', 'javascript:list(\'' + promoIndex + '\');');
}

//查詢
function list(promoIndex) {
  
  var promo = registerPromo[promoIndex];
  var m_promoNo = promo.m_promoNo;
  var dt_promoNo = promo.dt_promoNo;
  var gift_code = promo.gift_code;
  var gift_content = promo.gift_content;
  var listType = promo.listType;
  
  
  momoj().MomoLogin({GoCart:false, LoginSuccess:function() {
    if(listType == '1003'){
      var data = {
        doAction : 'qry',
        m_promo_no : m_promoNo,
        dt_promo_no : '',
        qry_type : listType
      };
      
      var rtnData = promoAjax(data);
      if(rtnData != '-1') {
        var returnMsg = rtnData.returnMsg;
        if(returnMsg == 'OK') {
          var _tempVal = '';
          var resultSet = '';
          resultSet += '<div class="ref"> '+
                       '<div class="blackBox" style="display:block">'+
                         '<div class="agreeArea">'+
                           '<div class="box">'+
                             '<h3>登記紀錄查詢</h3>'+
                             '<div class="agree_table">'+
                               '<table cellspacing="0" cellpadding="0">'+
                                 '<tbody>'+
                                   '<tr>'+
                                     '<th>登錄時間</th>'+
                                     '<th>登記項目</th>'+
                                   '</tr>'+
                                 '</tbody>'+
                               '</table>'+
                             '</div>'+
                             '<div class="button but-close">'+
                               '<a href="javascript:void(0);" onclick="javascript:closeDiv();">關閉</a>'+
                             '</div>'+
                           '</div>'+
                         '</div>'+
                       '</div>'+
                     '</div>';
          
          for(var i = 0, ltLenth = rtnData.dt_promo_no.length; i < ltLenth; i++) {
            if(rtnData.dt_promo_no[i] != '') {
              _tempVal += '<tr><td>' + rtnData.insert_date[i] + '</td><td>' + gift_content[rtnData.dt_promo_no[i]] + '-登記成功' + '</td></tr>';
            }
          }
          
          top.momoj().LayerMask({contentWidth:'100%', contentHeight:'auto'}).open();
          top.momoj('#MoMoLMContent').empty();
          top.momoj('#MoMoLMContent').html(resultSet).css({ position:"absolute", background:"transparent"});
          top.momoj('#MoMoLMContent .blackBox .agreeArea .box .agree_table table tr:last').after(_tempVal);
          top.momoj('#MoMoLMContent .blackBox').css("display","block");
        }else {
          alert('很抱歉，伺服器暫時無法連線，請稍候再試');
        }
      }
    }
  }});
}

//關閉查詢
function closeDiv() {
  top.momoj().LayerMask().close();
}



