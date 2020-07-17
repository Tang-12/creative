// 封装一函数用来获取ID
function byId(id){
    return typeof(id)==="string"?document.getElementById(id):id;
}
// 全局变量
var index=0, 
timer=null,
pics=byId("banner").getElementsByTagName("div"),
dots=byId("dots").getElementsByTagName("span"),
len=pics.length,
prev=byId("prev"),
next=byId("next"),
subMenu=byId("sub-menu"),
innerBox=subMenu.getElementsByClassName("inner-box"),
menu=byId("menu-content"),
menuItem=menu.getElementsByClassName("menu-item");
function slideImg(){
    var main=byId('main');
    // 滑过清除定时器，离开继续
    main.onmouseover=function(){
        // 滑过清除定时器
        if(timer)clearInterval(timer);
    }
    main.onmouseout=function(){
        timer=setInterval(function(){
            index++;
            if(index>=len){
                index=0;
            }
            // 切换图片
            changeImg();
        },2000)
    }
    main.onmouseout();  
    // 遍历所有圆点
    for(var d=0;d<len;d++){
        // 给所有span添加一个id属性，值为d,作为span的索引
        dots[d].id=d;
        dots[d].onclick=function(){
            // 改变index当前span值
            index=this.id;
            // 调用changeImg切换图片
            changeImg();
        }
    }
    // 下一张图片
    next.onclick = function(){
        index++;
        if(index>=len) index=0;
        changeImg();
     }
    // 上一张图片
    prev.onclick=function(){
        index--;
        if(index<0) index=len-1;
        // 切换图片
        changeImg();
    }
       // 导航菜单
    // 遍历主菜单，且绑定事件
    for(var m=0; m<menuItem.length;m++){
        // 每一个menu-item定义一个data-index;作为索引
        menuItem[m].setAttribute("data-index",m);
        menuItem[m].onmouseover=function(){
            subMenu.className="sub-menu";
           var idx=this.getAttribute("data-index");
        //    遍历所以子菜单，将其隐藏
           for(var x=0;x<innerBox.length;x++){
               innerBox[x].style.display="none";
               menuItem[x].style.background="none";
           }
           menuItem[idx].style.background="rgba(0 0 0 0 1)";
           innerBox[idx].style.display='block';
        }
    }
    menu.onmouseout=function(){
        subMenu.className="sub-menu hide";
    }
    subMenu.onmouseover=function(){
        this.className="sub-menu";
    }
    subMenu.onmouseout=function(){
        this.className="sub-menu"
    }
}
function changeImg(){
    // 遍历banner下所有的div和span,并将其隐藏
    for(i=0;i<len;i++){
        pics[i].style.display="none";
        dots[i].className="";
    }
    pics[index].style.display="block";
    dots[index].className="active";
}
slideImg();