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
        // document.write("<span id=s" + i + " ontouchstart=\"down(" + i + ")\" ontouchend=\"up(" + i + ")\">" + x[i] + "</span>");
        //  document.write("<span id=s" + i + " onmousedown=\"down(" + i + ")\" onmouseup=\"up(" + i + ")\"></span>");
        document.write("<span id=s" + i + " ontouchstart=\"down(" + i + ")\" ontouchend=\"up(" + i + ")\" onmousedown=\"down(" + i + ")\" onmouseup=\"up(" + i + ")\" ></span>");
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
        document.getElementById('s' + x).style.background = "#bbbbbb";
    }
    
};

function up(x){
    document.getElementById('s' + x).style.background = "gray";
    if (dian == 26) {
        clearTimeout(t);
        //document.getElementById("kongzhi").innerHTML = "重新开始"
		alert(document.getElementById('miaobiao').innerHTML);
		weixinfenxiang();
    }
    return false;
};

function dianjiluoji(x){
    if (document.getElementById("s" + x).innerHTML == dian) {
        dian++;
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
    dian = 1; //定义当前点的该是哪个数字
    var x = new Date();
    temp_time = x.getTime(); //定义当前时间点
    miaobiao_start();
    tianchong();
}


function weixinfenxiang(){
    if (typeof WeixinJSBridge == "undefined") {
        alert("请先添加好友再通过微信分享");
    }
    else {
        WeixinJSBridge.invoke('shareTimeline', {
            "title": "我在注意力测试游戏中的最好成绩为xxx秒",
            "link": "地址链接",
            "desc": "一款注意力测试的小游戏，小心上瘾哦",
            "img_url": "logo.jpg"
        });
    }
}
