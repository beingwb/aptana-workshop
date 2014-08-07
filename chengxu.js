/**
 * 所有用到的函数
 */
/* 给定一个数组，将里面的元素随机排序并返回 */
function paixu(){
    var v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x) 
        ;
    return v;
};

function chushihua(){
    document.write("<div id=\"qipan\">");
    for (var i = 0; i < 25; i++) {
        document.write("<span id=s" + i + " ontouchstart=\"down(" + i + ")\" ontouchend=\"up(" + i + ")\"></span>");
        //  document.write("<span id=s" + i + " onmousedown=\"down(" + i + ")\" onmouseup=\"up(" + i + ")\"></span>");
        // document.write("<span id=s" + i + " ontouchstart=\"down(" + i + ")\" ontouchend=\"up(" + i + ")\" onmousedown=\"down(" + i + ")\" onmouseup=\"up(" + i + ")\" ></span>");
    }
    document.write("</div>");
    tianchong();
};

function tianchong(){
    var x = paixu();
    for (var i = 0; i < 25; i++) {
        document.getElementById('s' + i).innerHTML = x[i];
    }
}

function down(x){

    if (dianjiluoji(x)) {
        document.getElementById('s' + x).style.border = " 2px gray inset";
    }
    else {
        document.getElementById('s' + x).style.color = "red";
    }
};

function up(x){
    document.getElementById('s' + x).style.color = "#fff";
    
    document.getElementById('s' + x).style.border = " 2px gray outset";
    
    
    if (now_dianji >= 26) {
        clearTimeout(t);
        chengji = document.getElementById('miaobiao').innerHTML;
        weixinfenxiang();
        if (confirm("您的本局" + chengji + "是否再来一局？")) {
            kaishiwan();
        }
        else {
			alert("赶紧点右上角来分享到朋友圈吧!");
            return false;
        }
        
    
    }
    return false;
};

function dianjiluoji(x){
    if (document.getElementById("s" + x).innerHTML == now_dianji) {
        now_dianji++;
        return true;
    }
    return false;
}

function miaobiao_start(){
    var x = new Date();
    var dd = x.getTime();
    var xx = dd - temp_time;
    ss = xx / 1000;
    
    if (ss < 10) {
        document.getElementById('miaobiao').innerHTML = "耗时:" + "0" + ss.toFixed(2);
    }
    else {
        document.getElementById('miaobiao').innerHTML = "耗时:" + ss.toFixed(2);
    }
    
    t = setTimeout('miaobiao_start()', 10)
    
}

function kaishiwan(){
    now_dianji = 1; //定义当前点的该是哪个数字
    var x = new Date();
    temp_time = x.getTime(); //定义当前时间点
    miaobiao_start();
    tianchong();
}


function weixinfenxiang(){


    // 需要分享的内容，请放到ready里
    WeixinApi.ready(function(Api){
    
    
        // 微信分享的数据
        var wxData = {
            "appId": "", // 服务号可以填写appId
            "imgUrl": 'http://moxamax.wicp.net/logo.jpg',
            "link": 'http://moxamax.wicp.net/',
            "desc": '从1数到25我只'+chengji + '秒，你也来试试吧：）',
            "title": "注意力训练小游戏"
        };
        
        
        // 分享的回调
        var wxCallbacks = {
            // 分享操作开始之前
            ready: function(){
                // 你可以在这里对分享的数据进行重组
                //  alert("准备分享");
            },
            // 分享被用户自动取消
            cancel: function(resp){
                // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                //   alert("分享被取消");
            },
            // 分享失败了
            fail: function(resp){
                // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
                //    alert("分享失败");
            },
            // 分享成功
            confirm: function(resp){
                // 分享成功了，我们是不是可以做一些分享统计呢？
                //window.location.href='http://192.168.1.128:8080/wwyj/test.html';
                //  alert("分享成功");
            },
            // 整个分享过程结束
            all: function(resp){
                // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                //   alert("分享结束");
            }
        };
        
        
        // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
        Api.shareToFriend(wxData, wxCallbacks);
        
        
        // 点击分享到朋友圈，会执行下面这个代码
        Api.shareToTimeline(wxData, wxCallbacks);
        
        
        // 点击分享到腾讯微博，会执行下面这个代码
        Api.shareToWeibo(wxData, wxCallbacks);
        
        
    });
    
    
    
}
