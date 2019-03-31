/**
 * Created by admin on 2017/12/4.
 */
//tab 切换
(function(){
    var Tabs = function(ele,opt){
        this.$element=ele,
            defaults = {
                outBox:'',//最外层div类名
                tabTitle:'',//操作tab层
                content:'',//切换tab外出
                checkStyle:'active',//tab选中样式类名
                eve:'click'//触发事件,只有click与hover这两个参数
            }
        this.options=$.extend({}, defaults,opt)
    };
    Tabs.prototype = {
        start:function(){
            var outBox=$(this.$element).selector,
                content=this.options.content,
                tabTitle=this.options.tabTitle,
                eve=this.options.eve,
                checkStyle=this.options.checkStyle;
            $(this.$element).each(function(){
                var i=0;
                var ishas=$(this).children(tabTitle).children().hasClass(checkStyle);
                $(this).children(tabTitle).children().each(function(){
                    if(ishas) {
                        if($(this).hasClass(checkStyle)==true) {
                            $(this).parent().parent(outBox).find(content).children().hide();
                            $(this).parent().parent(outBox).find(content).children().eq(i).show();
                        }
                    }else{
                        $(this).parent().children().eq(0).addClass(checkStyle);
                        $(this).parent().parent(outBox).find(content).children().hide();
                        $(this).parent().parent(outBox).find(content).children().eq(0).show();
                    }
                    $(this).attr('data-num',i);
                    i++;
                });
            });
            if(eve=="hover") {
                $(this.$element).children(tabTitle).children().hover(function(){
                    var opt_num=$(this).attr('data-num');
                    $(this).parent().parent(outBox).children(content).children().hide();
                    $(this).parent().parent(outBox).children(content).children().eq(opt_num).show();
                    $(this).parent().children().removeClass(checkStyle);
                    $(this).addClass(checkStyle);
                });
            }
            else if(eve=="click") {
                $(this.$element).children(tabTitle).children().click(function(){
                    //remove();
                    var opt_num=$(this).attr('data-num');
                    $(this).parent().parent(outBox).children(content).children().hide();
                    $(this).parent().parent(outBox).children(content).children().eq(opt_num).show();
                    $(this).parent().children().removeClass(checkStyle);
                    $(this).addClass(checkStyle);
                });
            }
        }
    };
    $.fn.myTab = function(options) {
        var tabs = new Tabs(this,options);
        return tabs.start();
    };
})();
$(function(){
    var searchEle = $(".search-condition-group"),
        typeGroup = $(".search-condition-group>.type-group"),
        typeList = $(".search-condition-group .type-lists"),
        searchType = $(".search-condition-group>.search-type"),
        searchTypeL = $(".search-type-lists");
    typeGroup.find(".type-lists>ul>li").click(function(){
        typeList.addClass("hidePiece");
        if(!$(this).hasClass("not-know")){
            typeGroup.find(".type-lists>ul>li").removeClass("light");
            $(this).addClass("light");
            var typeText = $(this).text();
            typeGroup.children("span").html(typeText);
        }
    });
    typeGroup.mouseenter(function(){
        typeList.removeClass("hidePiece");
    });
    searchType.find(".search-type-lists>ul>li").click(function(){
        searchTypeL.addClass("hidePiece");
        searchTypeL.find("ul>li").removeClass("light");
        $(this).addClass("light");
        var typeText = $(this).text();
        searchType.find("span>span").html(typeText);
    });
    searchType.mouseenter(function(){
        searchTypeL.removeClass("hidePiece");
    });
});
//弹窗
//样式  标题栏为灰色
function purepop(tit,id){
    var wi=$(id).width()+'px';
    var index=layer.open({
        title:[tit],
        type:1,
        area:'wi',
        content: $(id),
        skin: 'pure-public-pop',
        shade: [0.5, '#000'],
        success: function(){

        }
    });
}
function del(){
    layer.confirm('是否确认删除？', {
        btn: ['确认','取消'] //按钮
    }, function(){
        layer.msg('删除成功', {icon: 1});
    }, function(){
        layer.msg('已经取消', {
            icon:1
        });
    });
    $(".layui-layer-title").html("友情提示");
}
//判断浏览器
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var ua = window.navigator.userAgent;
    var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
    if (isSafari) {
        return "Safari";
    } //判断是否Safari浏览器
    return false;
}
var mb = myBrowser();
if ("Safari" == mb) {
    $("select").each(function(){
        if(!$(this).hasClass("beautify")){
            var thisW = parseFloat($(this).css("width"));
            console.log(thisW);
            $(this).width(thisW-30);
        }
    });
}