window.onload = function () {
    //获取DOM元素
    var arrowEl = document.querySelector("#head .headMain > .arrow");
    var liNodes = document.querySelectorAll("#head .headMain > .nav > .list > li");
    var upNodes = document.querySelectorAll("#head .headMain > .nav > .list > li .up");
    var firstLiNode  = liNodes[0];
    var firstUpNode  = firstLiNode.querySelector(".up");

    var head = document.querySelector("#head")
    var content = document.querySelector("#content")
    var cLiNodes = document.querySelectorAll("#content .list > li");
    var cList = document.querySelector("#content .list")

    var now = 0;//now同步当前屏的索引
    var timer = 0;

    window.onresize = function(){
        /*
         调整分辨率
            1.没有点击的时候视口只能出现一屏  contentBind();
            2.点击后视口只能出现一屏  在1的基础上对每一屏的偏移量进行重新调整
            3.小箭头的位置也需要头部
        */
        contentBind();
        cList.style.top = -now*(document.documentElement.clientHeight - head.offsetHeight)+"px";
        arrowEl.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth/2 - arrowEl.offsetWidth/2+"px";
    }
    //内容区的交互

    if (content.addEventListener){
        content.addEventListener("DOMMouseScroll",function (ev) {
            ev=ev||event;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn(ev)
            },200)
        });
    }
    content.onmousewheel=function (ev) {
        ev=ev||event;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn(ev)
        },200)
    };
    function fn(ev) {
        ev=ev||event;

        var dir="";
        if (ev.wheelDelta){
            dir = ev.wheelDelta>0?"up":"down";
        }else if(ev.detail){
            dir = ev.detail<0?"up":"down";
        }

        switch (dir) {
            case "up":
                if (now>0){
                    now--;
                    move(now);
                }
                break;
            case "down":
                if (now<cLiNodes.length-1){
                    now++;
                    move(now);
                }
                break
        }
    }

    contentBind();
    function  contentBind(){
        content.style.height = document.documentElement.clientHeight - head.offsetHeight+"px";
        for (var i=0;i<cLiNodes.length;i++){
            cLiNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight+"px";
        }
    }

    //头部的交互
    headBind()
    function headBind(){
        firstUpNode.style.width = "100%";
        arrowEl.style.left = firstLiNode.offsetLeft + firstLiNode.offsetWidth/2 - arrowEl.offsetWidth/2+"px";
        for(var i=0;i<liNodes.length;i++){
            //转绑很重要
            liNodes[i].index = i;
            liNodes[i].onclick=function(){
                //i:liNodes.length 5
                move(this.index);
                now = this.index;
            }
        }
    }
    //动画核心函数
    move(1)
    function move(index) {
        for(var i=0;i<upNodes.length;i++){
            //upNodes[i].style.width="0";
            upNodes[i].style.width="";
        }
        upNodes[index].style.width="100%";
        arrowEl.style.left = liNodes[index].offsetLeft + liNodes[index].offsetWidth/2 - arrowEl.offsetWidth/2+"px";
        cList.style.top = -index*(document.documentElement.clientHeight - head.offsetHeight)+"px";
    }


}
