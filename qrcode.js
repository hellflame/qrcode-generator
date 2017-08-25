javascript:(function(){
  /* 显示/隐藏二维码 */
  var qrcode = function (hs, src) {
    var ele = document.createElement('img'),
    target = document.getElementById(hs);
    if (target){
      document.body.removeChild(target)
    }else{
      ele.setAttribute('src', src);
      var h = window.screen.availHeight,
      w = window.screen.availWidth,
      r_h = 0;
      if (h > 150 && w > 150)
        r_h = (h < w ? h : w) - 150;
      else
        r_h = h;
      ele.setAttribute('style', 'margin:0 auto;display:block;z-index:9999999;position:relative;width:auto;max-height:' + r_h + 'px');
      ele.setAttribute('id', hs);
      document.body.insertBefore(ele, document.body.firstChild);
      window.scrollTo(0, 0)
    }
  };
  /* 二维码保存 */
  var store = function (id, src) {
    if(window.localStorage){
      var target = 'qrcode_' + id;
      var freq = localStorage['freq'];
      if(freq){
        freq = JSON.parse(freq)
      }else{
        freq = []
      }
      if(localStorage[target] && src === undefined){
        var index = freq.indexOf(id);
        if(index>0){
          freq = [id].concat(freq.slice(0, index), freq.slice(index + 1));
          localStorage['freq'] = JSON.stringify(freq);
        }
        return localStorage[target]
      }else if(!localStorage[target] && src){
        if(freq.length<20){
          /*平均一个二维码图片大小为1k，总缓存大概20k*/
          freq = [id].concat(freq)
        }else{
          localStorage.removeItem('qrcode_' + freq.slice(-1)[0]);
          freq = [id].concat(freq.slice(0, -1))
        }
        localStorage['freq'] = JSON.stringify(freq);
        localStorage[target] = src
      }
    }
  };
  /* 请求二维码 */
  var request = function (hs) {
    var a = new XMLHttpRequest();
    a.onreadystatechange = function () {
      if(a.readyState===4 && a.status===200){
        var data = JSON.parse(a.responseText);
        if(data.msg){
          alert(data.msg)
        }else{
          qrcode(hs, data.src);
          store(hs, data.src);
      }
    }
    };
    a.open('GET','http://localhost:5000/qrcode/generator?href=' + encodeURIComponent(window.location.href));
    /* <-- 注释这一行和上一行
    // 压缩使用时切换服务
    a.open('GET','https://static.hellflame.net/qrcode/generator?href=' + encodeURIComponent(window.location.href));
    //*/
    a.send()
  };
  /* 计算链接hash */
  function hash(str){
    var result = 0, tab = [0x1234, 0x2345, 0x3456, 0x4567, 0x5678, 0x789a, 0x89ab, 0x9abc, 0xabcd, 0xbcde, 0xcdef];
    for(var i=0;i<str.length;i++){
    result = 33 * result + str.charCodeAt(i) ^ (i > 0 ? str.charCodeAt(i-1): 66) + tab[i % tab.length];
    }
    return Math.abs(result).toString(16)
  }

  /* 开始 */
  var hs = hash(encodeURIComponent(window.location.href));
  if(store(hs)){
    qrcode(hs, store(hs))
  }else{
    request(hs)
  }
})();

/* 在浏览器书签中添加以上js，作为本地测试，默认服务地址为 http://localhost:5000/qrcode/generator */
