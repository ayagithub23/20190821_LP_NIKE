momoj(document).ready(function(){
  if(typeof momoAppBridge == 'undefined'){
    momoj.getScript("//m.momoshop.com.tw/js/momo-app-bridge-min.js");
  }
  
  momoj('.lineShare').click(edmShare.line);
  momoj('.fbShare').click(edmShare.fb);
  
  if(edmShare.isApp()){
    momoj('.appHide').hide();
  }
  
});

var edmShare = {
  //透過app分享
  app: function(title, content, url){
        var shop = new momoAppBridge("shop");
        var obj = {shareTitle: title,
                   shareContent: content,
                   shareUrl: url};
        shop.notifyApp("shareEdm", JSON.stringify(obj));
  },
  
  //透過line分享
  line: function(){
          if(edmShare.isApp()){
            edmShare.app(edmShare.getTitle(), edmShare.getDescription(), edmShare.getUrl());
          }else{
            window.open('http://line.naver.jp/R/msg/text/?'.concat(encodeURIComponent(edmShare.getTitle()))
                                                           .concat(' ')
                                                           .concat(encodeURIComponent(edmShare.getDescription()))
                                                           .concat(encodeURIComponent(edmShare.getUrl())));
          }
  },
  
  //透過FB分享
  fb: function (){
        if(edmShare.isApp()){
          edmShare.app(edmShare.getTitle(), edmShare.getDescription(), edmShare.getUrl());
        }else{
          window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(edmShare.getUrl())));
        }
  },
  
  //取得edm title
  getTitle: function(){
    return momoj('META[property="og:title"]').attr('content');
  },
  
  //取得edm Description
  getDescription: function(){
    return momoj('META[property="og:description"]').attr('content');
  },
  
  //取得edm url
  getUrl: function(){
    var url = location.href;
    return url.replace(/(\?)token[^&]*|&token[^&]*/gi, '$1');
  },
  
  //是否app裝置
  isApp: function(){
    return /momoshop/i.test(navigator.userAgent);
  }
}