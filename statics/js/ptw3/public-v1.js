//ie兼容placeholder
var browserSupport = {
    placeholder: 'placeholder' in document.createElement('input')
}
/*var url = getRootPath();*/
$(function () {
    //模拟placeholder
    if (!browserSupport.placeholder) {
        $('input[placeholder],textarea[placeholder]').each(function () {
            var that = $(this),
                text = that.attr('placeholder'),
                oldType;
            if (that.val() === "") {
                that.val(text).addClass('placeholder');
            }
            that.focus(function () {
                //ie8下readonly依然可以上焦点的处理
                if (that.attr('readonly')) {
                    that.blur();
                    return;
                }

                that.removeClass('placeholder');

                if (that.val() === text) {
                    that.val("");
                }
            }).blur(function () {
                if (that.val() === "") {
                    that.val(text).addClass('placeholder');
                    //防止异常情况：当有placeholder类，且值不为空（代码设置值时容易出现）
                } else {
                    that.removeClass('placeholder');
                }
            }).closest('form').submit(function () {
                if (that.val() === text) {
                    that.val('');
                }
            });
        });
    }
    //搜索
    $("#queryType,#query_type").submit(function (e) {
        e.preventDefault;
        var $type = $(this).attr("id");
        var $id;
        var $var;
        if ($type == "queryType") {
            $id = $(this).find("ul").find("li[class='active']").attr("id");
            $var = $(this).find("input").val();
        } else {
            $id = $(this).find("select").val();
            $var = $(this).find("input[class='fix-search-input']").val();
        }

        var $urls = window.location.href;
        if ($id == 1) {
            if ($urls.indexOf("/search.htm") > 0) {
                window.location.href = url + "/service/search.htm?key=" + $var;
            } else {
                window.open(url + "/service/search.htm?key=" + $var);
            }
            return false;
        } else if ($id == 2) {
            window.open(url + "/icsite/company/search.htm?type=&keyword=" + $var);
            return false;
        } else if ($id == 3) {
            // $(this).attr("action",url+"/brand/query_brand.htm");
            window.open(url + "/tmbrandsearch/search.htm?type=&searchType=&city=&keyword=" + $var);
            return false;
        } else if ($id == 4) {
            window.open(url + "/adviser/list.htm?viserName=" + $var);
            return false;
        }
    });
});
//ie兼容placeholder end

//layer  标题栏为白色
function purepop(tit, id) {
    var name = $("#name").val("");
    var contacts = $("#contacts").val("");
    var mobile = $("#mobile").val("");
    var area = $("#area").val("");
    var address = $("#address").val("");
    var statutoryName = $("#statutoryName").val("");
    var createTime = $("#createTime").val("");
    var business = $("#business").val("");

    //清除地区
    $(".clearfix dd a").attr("class", "");
    $(".title span").remove();
    $("#area").attr("placeholder", "选择省/市/区");
    $(".title").text("");
    $(".placeholder").show();

    setsize();
    var wi = $(id).width() + 'px';
    var index = layer.open({
        title: [tit, "background:#fff;color:#555;font-size:16px;line-height:50px;height:50px;margin:0 20px; padding:0;"],
        type: 1,
        area: 'wi',
        move: false,
        scrollbar: false,
        content: $(id)
    });
    $(".myclose").on("click", function () {
        layer.close(index);
    });
}
	//返回顶部JS
// $(".toTop").click(function(){
//  //顶部为一个<div id="theTop"></div>空标签
//  var targetOffset = $("#theTop").offset().top;
//      $("html,body").animate({
//          scrollTop: targetOffset
//      },
//      800);
//})
 	//搜索tab
 	$(".search-tab a").click(function(){
		$(".search-tab a").removeClass("cur");
		$(this).addClass("cur")
	})
	//水平导航点击
	$(".center-nav li").click(function(){
		$(".center-nav li").removeClass("active");
		$(this).addClass("active")
	})
	$(".hide-tab a").click(function(){
		$(".hide-tab a").removeClass("on");
		$(this).addClass("on")
	})
 	//footer
 	$(".footer-tab-tt a").on("click",function(){
		var data_nun = $(this).attr("data-num");
		$(".footer-tab-tt a").removeClass("cur");
		$(this).addClass("cur");
		$(".footer-list").find(".footer-bd-text").hide(30);
		$(".footer-list").find(".footer-bd-text").eq(data_nun).show(30);
	});
//侧边导航栏js
	$('.zu-btn').click(function(){
	if ($(".move-nav").css("display") != "none"){
		$(".move-nav").hide(300)
    	$(".fix-sidenav > a").addClass("avtive-btn")
 	}else{
  		$(".move-nav").show(300);
    	$(".fix-sidenav > a").removeClass("avtive-btn")	
 	 }
	});	
//分页
	$(".page-box span a").click(function(){
		$(".page-box span a").removeClass("cur")
		$(this).addClass("cur")
	})

