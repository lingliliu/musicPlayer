var oAudio = document.getElementById("audio");
var proActive = document.getElementsByClassName("pro-active")[0];
var iconMiddle = document.getElementById("middle");
var oradioBox = document.getElementsByClassName("radio-box")[0];
var oproBg = document.getElementsByClassName("pro-bg")[0];
var timer;
// 资源加载完
var long;
var currentTime = document.getElementsByClassName('current-time')[0];
var allTime = document.getElementsByClassName('all-time')[0];
// 资源加载完成事件
oAudio.ondurationchange = function(){
    long = this.duration;
    currentTime.innerHTML =conversion(0);
    allTime.innerHTML = conversion(long);
}
// Window.oncanplay = function(){
//         long = oAudio.duration;
//         currentTime.innerHTML =conversion(0);
//         allTime.innerHTML = conversion(long);
//     }
// 时间格式转换函数
function conversion(time){
    var f = parseInt(time/60) < 10 ? '0' +parseInt(time/60) :parseInt(time/60);
    var m = parseInt(time%60) < 10 ? '0' +parseInt(time%60) :parseInt(time%60);
    return f + ":" + m;
}
//实现进度条自动向前走

//进度条移动
function movePro(){
    var ct = oAudio.currentTime;
    currentTime.innerHTML =conversion(ct);
    //注意这里是390不是400的原因
    var owidth = ct*390/long;
    //这一块再看看，可能错了
    proActive.style.width = owidth + 10 + 'px';
}
var timertwo;
// 播放函数
function musicPlay(){
    oAudio.play();
    iconMiddle.href.baseVal = '#icon-zanting';
    timer = setInterval(movePro,200);
    timertwo = setInterval(rotate,160);
}
// 暂停函数
function musicPause(){
    oAudio.pause();
    iconMiddle.href.baseVal = '#icon-bofang';
    clearInterval(timer);
    clearInterval(timertwo);
}
//这里是onmouseup
iconMiddle.onmouseup = function(){
    if(oAudio.paused){
        musicPlay();
    }else{
        musicPause();
    }
}

//循环，单曲，随机图标切换
var Iconchange = document.getElementById("change");
var Iconch = document.getElementById("chicon");
// var nowicon = Iconch.href.baseVal;
var nowicon;
Iconchange.onclick=function(){
    nowicon = Iconch.href.baseVal;
    // var nowicon = Iconch.href.baseVal;
    if(nowicon == '#icon-xunhuan'){
        Iconch.href.baseVal = '#icon-xunhuan1';
    }
    if(nowicon == '#icon-xunhuan1'){
        Iconch.href.baseVal = '#icon-suijibofang';
    }
    if(nowicon == '#icon-suijibofang'){
        Iconch.href.baseVal = '#icon-xunhuan';
    }
}

//循环播放新
function Loop(){
    oAudio.load();
    findIndex();
    if(j<2){  
        allChange(j+1); 
    }
    else if(j=2){
        allChange(0);
    }
}

//单曲循环
function Single(){
    oAudio.load();
    findIndex();
    allChange(j); 
}

//随机播放
function Random(){
    oAudio.load();
    findIndex();    
    if(j>0){  
        allChange(j-1); 
    }
    else{
        allChange(2);
    }   
}

//播放结束事件
var cs ;
var csllice;
oAudio.onended = function(){
     cs = oAudio.currentSrc;
     csllice = cs.slice(-5);
    musicPause();
    currentTime.innerHTML =conversion(0);
    //这一块再看看，记得初始宽度为10
    proActive.style.width = 10 + 'px';
    oAudio.currentTime = 0;
    nowicon = Iconch.href.baseVal;
    //如果图标是循环
    if(nowicon == '#icon-xunhuan'){
        Loop();
    };
    //如果图标是单曲
    if(nowicon == '#icon-xunhuan1'){
        Single();
    }
    //如果图标是随机
    if(nowicon == '#icon-suijibofang'){
        Random();
    }
    musicPlay();
}

//实现进度条拖拽
oradioBox.onmousedown = function(){
    //鼠标按下时要清除计时器
    clearInterval(timer);
    clearInterval(timertwo);
    var c = oAudio.currentTime;
    document.body.onmousemove = function(e){
        var widthdis = e.clientX - oproBg.getBoundingClientRect().left;
        if(widthdis<10){
            widthdis = 10;
        };
        if(widthdis>400){
            widthdis=400;
        };
        proActive.style.width = widthdis + 'px';
        var deta = widthdis - 10;
        c = deta * long /390;
        currentTime.innerHTML = conversion(c);
       //移动的时候音乐不要跟着拖动变
    }
    document.body.onmouseup = function(){
        document.body.onmousemove = null;
        document.body.onmouseup = null;
        musicPlay();
        oAudio.currentTime = c;
    }
}
//切换歌曲
var obj = {
    music:['./music/1.mp3','./music/2.mp3','./music/3.mp3'],
    name:['Relax (Take It Easy)','La Vie En Rose','Drenched'],
    moving:["./img/7.jpg","./img/8.jpg","./img/9.jpg"],
    bg:["./img/2.jpg","./img/1.jpg","./img/3.jpg",]
}
var oImg = document.getElementById("img");
var iconPre = document.getElementById("pre");
var iconNext = document.getElementById("next");



//判断当前索引
function findIndex(){
    var curSrc = oAudio.currentSrc;
    var curSrcslice = curSrc.slice(-5);
    var nowSrc = "./music/"+curSrcslice;
    j = obj.music.indexOf(nowSrc);
    return j;    
}
//点击下一首
iconNext.onclick = function(){ 
    musicPause(); 
    oAudio.load();
    findIndex();
    if(j<2){  
        allChange(j+1); 
    }
    else if(j=2){
        allChange(0);
    }
    musicPlay();
}
//点击上一首
iconPre.onclick = function(){ 
    musicPause();
    oAudio.load();
    findIndex();     
    if(j>0){  
        allChange(j-1); 
    }
    else {
        allChange(2);
        
    }   
    musicPlay();
}
var Song = document.getElementById('song');


//将歌名，海报，背景，音乐都对应起来
function allChange(i){
    oAudio.src = obj.music[i];
    Song.innerHTML = obj.name[i];
    oImg.src = obj.moving[i];
    document.body.style.backgroundImage = "url("+obj.bg[i]+")";
}

//声音进度条
var ovoiceNum = document.getElementsByClassName('voice-num')[0];
var ovoiceBg = document.getElementsByClassName('voice-bg')[0];
var ovoiceActive = document.getElementsByClassName('voice-active')[0];
var ovoiceBox = document.getElementsByClassName('voice-box')[0];
var curruentv;
var max = 10;
curruentv = oAudio.volume;
var oVoice = document.getElementsByClassName("voice")[0];
var oproVoice = document.getElementsByClassName("pro-voice")[0];
//点击喇叭显示，鼠标移走消失
oVoice.onclick = function(){
    oproVoice.style.display = 'block';
}
oproVoice.onmouseleave=function(){

    oproVoice.style.display='none';

}

ovoiceNum.innerHTML = curruentv;
ovoiceActive.style.height = curruentv*100 +'px';
//这一块鼠标为什么不能始终指着小条
ovoiceBox.onmousedown = function(){
    document.body.onmousemove = function(e){
        var m = -(e.clientY - ovoiceBg.getBoundingClientRect().bottom - 6);
        if(m<6){
            m=6;
        };
        if(m>100){
            m=100;
        };
        // ovoiceActive.style.height = m + 6 +'px';
        ovoiceActive.style.height = m+'px';
        // h = (10*m/94)/10;  
        h = (10*m/100)/10;     
        oAudio.volume = count(h);
        //这里音量要跟着拖动变
        curruentv = oAudio.volume;
        // console.log(curruentv);
        ovoiceNum.innerHTML = curruentv;
    }
    document.body.onmouseup = function(){
        document.body.onmousemove = null;
        document.body.onmouseup = null;

    }
}
function count(x){
    return x.toFixed(1)*10/10;
}

//海报旋转
var rotateVal = 0;
function rotate(){
    rotateVal += 4;
    oImg.style.transform = "rotate(" +rotateVal+ "deg)";
    oImg.style.transition = '0.01s linear';
}
var Footer = document.getElementsByClassName('footer')[0];
var oView = document.getElementsByClassName('view')[0];
Footer.onmouseover=function(){
    oView.style.display = 'block';
}
Footer.onmouseout=function(){

   oView.style.display='none';

}