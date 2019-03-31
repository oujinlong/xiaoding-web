//banner 
	$(".inside-banner").slide({
	    titCell:".hd ul",
	    mainCell:".bd .banner-box",
	    trigger:"mouseover",	
	    autoPlay:true,
	    autoPage:true,
	    delayTime:800,			
	    titOnClassName:"on",
	    effect:"leftLoop"
	});
	//banner信息滚动
	$(".txtMarquee-top").slide({
		mainCell:".bd ul",
		autoPlay:true,
		effect:"topMarquee",
		vis:4,
		interTime:100,
		trigger:"click"
		});
	
	//线下服务中心
	//在data中填写信息.
	var data = {
		"重庆":[
			{
				name:"重庆服务中心",
				address:"重庆市渝北区红锦大道57号嘉州协信中心A栋20层",
				lng:"106.530705",//经度
				lat:"29.59544"//纬度
			}
		],
		"成都":[
			{
				name:"世外桃源广场服务中心",
				address:"成都市武侯区科华北路65号世外桃源2-3层、27层",
				lng:"104.083695",
				lat:"30.63579"
			},
			{
				name:"顶呱呱政企服务中心",
				address:"科华南路1号",
				lng:"104.084321",
				lat:"30.617712"
			},
			{
				name:"保利服务中心",
				address:"武侯区锦绣路1号保利中心c座",
				lng:"104.078698",
				lat:"30.630548"
			},
			{
				name:"世外桃源广场服务中心",
				address:"",
				lng:"104.099569",
				lat:"30.648643"
			}
		],
		"北京":[
			{
				name:"朝阳区服务中心",
				address:"北京市朝阳区东三环北路38号民生大厦21层",
				lng:"116.469398",//经度
				lat:"39.926583"//纬度
			},
			{
				name:"海淀区服务中心",
				address:"北京市海淀区马甸东路17号金澳国际26楼整层-750号",
				lng:"116.385049",//经度
				lat:"39.97757"//纬度
			}
		],
		"深圳":[
			{
				name:"深圳服务中心",
				address:"广东省深圳市福田区深南大道2003号华嵘大厦9楼",
				lng:"114.072542",//经度
				lat:"22.544629"//纬度
			}
		],
		"武汉":[
			{
				name:"武汉服务中心",
				address:"湖北省武汉市武昌区中北路9号长城汇T1-7楼",
				lng:"114.344923",//经度
				lat:"30.555406"//纬度
			}
		],
		"广州":[
			{
				name:"广州服务中心",
				address:"广东省广州市天河区东路67号丰兴广场A幢21楼整层",
				lng:"113.340466",//经度
				lat:"23.138143"//纬度
			}
		],
		"杭州":[
			{
				name:"杭州服务中心",
				address:"浙江省杭州市上城区定安路68号定安名都大厦7楼",
				lng:"120.173561",//经度
				lat:"30.251165"//纬度
			}
		]
	}
	//点击切换城市，显示所有城市
	$("#qiehuan").click(function(){
		$("#citys").css("zIndex",15);
	})
	//新建一个地图对象
	var map = new BMap.Map("allmap");
	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();
	//城市改变
	$(".city").click(function(){
		var city = $(this).data("value");
		$("#cityName").html(city);
		var centers = data[city];//获取这个城市下的中心
		map.clearOverlays();//清除所有点
		var html = "";
		//循环读取所有的中心信息
		for(var x in centers){
			//新建点
			var point = new BMap.Point(centers[x].lng, centers[x].lat);
			if(x==0){
				map.centerAndZoom(point, 15);//把第一个点设置为地图中心,设置地图缩放级别为15（8-18级别可调整试试）
			}
			var marker = new BMap.Marker(point);// 创建标注
			map.addOverlay(marker);//添加点
			marker.disableDragging();//点禁止拖拽
			//设置点上的文字
			var label = new BMap.Label(centers[x].name,{offset:new BMap.Size(20,-10)});
			marker.setLabel(label);
			//生成#center的内容
			html += '<option lng="'+centers[x].lng+'" lat="'+centers[x].lat+'">'+centers[x].name+'</option>'
		}
		//改变#center的内容
		$("#center").html(html);
		$("#citys").css("zIndex",-1);
		return false;
	})
	//中心改变时，移动地图
	$("#center").change(function(){
		var lng = $("#center").find("option:selected").attr("lng");
		var lat = $("#center").find("option:selected").attr("lat");
		map.panTo(new BMap.Point(lng,lat))
	})
	//初始化选择成都（点击一次）
	$("#citys").find("a").eq(0).click();
	
	
	
	//成功案例
	$(".case-box").slide({
	    titCell:".hd ul",
	    mainCell:".bd ul",
	    trigger:"mouseover",	
	    autoPlay:true,
	    autoPage:true,
	    delayTime:800,			
	    titOnClassName:"on",
	    effect:"leftLoop"
	});
	
//实力见证右
	   $(".media-tt .media-tab").on("click",function(){
		var data_nun = $(this).attr("data-num");
		$(".media-tt .media-tab").removeClass("cur");
		$(this).addClass("cur");
		$(".media-box").find(".media-list").hide(30);
		$(".media-box").find(".media-list").eq(data_nun).show(30);
	});
	//时间轴
	$(".time-line-warp").slide({
        mainCell:".time-list-main ul",
        vis:6,
        scroll:1,
        easing:'swing',
        effect:"left",
       	autoPage:true,
        pnLoop:false,
        startFun:function( i, c){
        	$('.time-line').append('<div class="full-time"></div>');
        	$('.time-txt').hide();
        	if(i==0) {
        		$('.time-p-n.prev').hide();
        	}else {
        		$('.time-p-n.prev').show();
        	}
        	if(i==(c-1)) {
        		$('.time-p-n.next').hide();
        	}else {
        		$('.time-p-n.next').show();
        	}
        },endFun:function(){
        	$('.full-time').remove();
        }
    });
    var $left=$('.time-list-main li').first().offset().left-55;
    var txt=$('.time-list-main li').first().attr('data-content');
    var src=$('.time-list-main li').first().attr('data-src');
    $('.time-txt').find('p').html(txt);
    $('.time-txt').find('.time-img').empty().append('<img src="'+src+'">');
	$('.time-txt').show();
	$('.time-txt').animate({"left":$left},300);
	$('.time-list-main li').first().addClass('active');
    $('.time-list-main li').mouseenter(function(){
    	$('.time-list-main li').removeClass('active');
    	$(this).addClass('active');
    	txt=$(this).attr('data-content');
    	src=$(this).attr('data-src');
    	$('.time-txt').find('.time-img').empty();
    	var $left=$(this).offset().left-55;
    	$('.time-txt').stop().animate({"left":$left},300);
    	if(src!=""&&src!=null&&src!=undefined) {
    		$('.time-txt').find('.time-img').append('<img src="'+src+'">');
    	}
    	if(txt!=""&&txt!=null&&txt!=undefined) {
        	$('.time-txt').find('p').html(txt);
        	$('.time-txt').find('img').attr('src',src);
    		$('.time-txt').show();
    	}else {
    		$('.time-txt').hide();
    	}
    })
    
    
    var videoObject = {
		container: '#a1',//“#”代表容器的ID，“.”或“”代表容器的class
		autoplay:false,//是否自动播放
		volume:"0.6",//初始音量大小
		flashplayer:false,//是否强制使用flashplayer播放,flase=播放器自动判断，优先使用html5播放器，true=仅使用flashplayer播放
		variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
		video:'./statics/images/ptw3/veido/vidio.mp4'//视频地址
	};
	var player=new ckplayer(videoObject);

	

	
	

	