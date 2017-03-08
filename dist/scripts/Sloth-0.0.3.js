
;(function($) {
	$.fn.imgfall=function (settings) {//照片墙瀑布流
		var ops={
			itemsize:2,//排几列
			pc:false,
			mob:true
		};
		if(settings) $.extend(ops, settings);
		var $this=$(this);
		if(XQ.moborpc()){
			if(!ops.mob){
				return;
			}
		}else {
			if(!ops.pc){
				return;
			}
		}
		var pos=[];
		var w = $(window).width() ;
		var size=2;
		function resize_ () {
			pos=[];
		if( 'object ' == typeof ops.itemsize){
			if (w > 1200) {
				size=ops.itemsize[0];
			}else if (w > 992 && w < 1200) {
				size=ops.itemsize[1];
			}else if (w < 992 && w > 768) {
				size=ops.itemsize[2];
			}else if (w < 768) {
				size=ops.itemsize[3];
			}
		}else{
			size=ops.itemsize;
		}
		 $this.each(function  (i) {
			 if(i<size){
			 	 pos[i] = $this.eq(i).height()+parseInt($this.eq(i).css('margin-top'))+parseInt($this.eq(i).css('margin-bottom'))+parseInt($this.eq(i).css('padding-top'))+parseInt($this.eq(i).css('padding-bottom'));
			 	 
			 }else{
			 	 var minh = Math.min.apply({},pos);
			 	 //获取高度最小的键名
       				 var mink = getMinKey(pos,minh);
       				  //获取高度最小的距离左边的距离
			        var minl = $this[mink].offsetLeft;
			        //定位元素位置
			        $this.eq(i).css({
			          position:'absolute',
			          top:minh,
			          left:minl
			        });
			        //将加入的元素与其上面元素的高度相加，为下面元素排列做准备
			        pos[mink] += $this.eq(i).height()+parseInt($this.eq(i).css('margin-top'))+parseInt($this.eq(i).css('margin-bottom'))+parseInt($this.eq(i).css('padding-top'))+parseInt($this.eq(i).css('padding-bottom'));		
			 }
		});
		var maxh = Math.max.apply({},pos)+20;
    		$this.parent().css({'height':maxh,'position':'relative'});
		}
		var size2=$this.parent().children().size()-1;
		$this.parent().bind('DOMNodeInserted', function(e) {
			var $$this=$this.parent().children();
			if(size2==$this.parent().children().size()-1)return;
			$$this.each(function(i){
				 if(i>size2){
				 	 var minh = Math.min.apply({},pos);
				 	 //获取高度最小的键名
	       				 var mink = getMinKey(pos,minh);
	       				  //获取高度最小的距离左边的距离
				        var minl = $$this[mink].offsetLeft;
				        //定位元素位置
				        $$this.eq(i).css({
				          position:'absolute',
				          top:minh,
				          left:minl
				        });
				        //将加入的元素与其上面元素的高度相加，为下面元素排列做准备
				        pos[mink] += $$this.eq(i).height()+parseInt($$this.eq(i).css('margin-top'))+parseInt($$this.eq(i).css('margin-bottom'))+parseInt($$this.eq(i).css('padding-top'))+parseInt($$this.eq(i).css('padding-bottom'));	
				 }
			});
			maxh = Math.max.apply({},pos)+20;
    			$this.parent().css({'height':maxh,'position':'relative'});
			size2=$this.parent().children().size()-1;
		});
		resize_();
		$(window).resize(resize_);
    		 function getMinKey(arr,min){
		      for(var key in arr){
		        if(arr[key]==min){
		          return key;
		        }
		      }
		    }	
	};
	$.fn.getDate=function(settings){
		var ops={
			height:200,//滚到那里触发事件
			url:'',//加载链接
			attribute:undefined,//父级属性值中获取参数
			time:1500,//请求间隔
			fun:function(){}
		};
		var flag=true,$this=$(this),attrs='';
		if(settings) $.extend(ops, settings);
		$(window).scroll(function  () {
			if ($(document).scrollTop() >= $(document).height() - $(window).height() - ops.height) {
				if(flag){
					if(ops.attribute!=undefined){
						attrs='';
						if('Object' == typeof ops.attribute || 'object' == typeof ops.attribute ||'OBJECT' == typeof ops.attribute){
							if(ops.attribute instanceof Array){
								for(var i=0;i<ops.attribute.length;i++ ){
									attrs+=$this.attr(ops.attribute[i]);
								}
							}
						} else{
							attrs+=$this.attr(ops.attribute);
						}
					}
					flag=false;
					$.ajax({url:ops.url+attrs,
						success:function  (data) {
							ops.fun($this,data);
							setTimeout(function  () {
							flag=true;
							}, ops.time);},
						error:function (e){
							setTimeout(function  () {
							flag=true;
							}, ops.time);
						}
						});
					
				}
			}
		});

	};
	function supportCss3(style) {
		var prefix = ['webkit', 'Moz', 'ms', 'o'],
			i,
			humpString = [],
			htmlStyle = document.documentElement.style,
			_toHumb = function(string) {
				return string.replace(/-(\w)/g, function($0, $1) {
					return $1.toUpperCase();
				});
			};

		for (i in prefix)
			humpString.push(_toHumb(prefix[i] + '-' + style));

		humpString.push(_toHumb(style));

		for (i in humpString)
			if (humpString[i] in htmlStyle) return true;

		return false;
	}
	var css3 = supportCss3('transform') || supportCss3('-webkit-transform');
	function transform (obj,options) {
		var config = {
			perspective:1000,
			times:0,//
			rotateX:0,//X旋转
			rotateY:0,//Y旋转
			rotateZ:0,//Z旋转
			translateX:0,
			translateY:0,
			translateZ:0,
			boxshadow:'none',
			call:function  () {}
		};
		if (options) $.extend(config, options);
		obj.css({
			'transform': 'perspective('+config.perspective+'px) translate3d(' +config.translateX + 'px,'+config.translateY+'px,'+config.translateZ+'px) rotateX('+config.rotateX+'deg) rotateY('+config.rotateY+'deg) rotateZ('+config.rotateZ+'deg)',
			'-webkit-transform':  'perspective('+config.perspective+'px) translate3d(' +config.translateX + 'px,'+config.translateY+'px,'+config.translateZ+'px) rotateX('+config.rotateX+'deg) rotateY('+config.rotateY+'deg) rotateZ('+config.rotateZ+'deg)',
			'transition':'transform '+config.times/1000+'s linear',
			'-webkit-transition':'transform '+config.times/1000+'s linear',
			'box-shadow':config.boxshadow
		});
	}
	$.fn.hoverTrans=function(settings){
		var ops={
			hoverchild:null,//划过元素
			child:null,
			time:500,
			image:null,
			txt:null,
			fade:false,//使用渐隐渐现；
			boxshadow:'none'
		};
		if(settings) $.extend(ops, settings);
		$$this=$(this);
		//$(this).find(ops.hoverchild).each(function  () {$this=$(this).find(ops.hoverchild),
			var $this2,inhover,outhover;
			if(ops.child){
			$this2=$(this).find(ops.child);
			}else{
			$this2=$this;
			} 
			//初始化
			if(css3 && !ops.fade){
				if(ops.txt){
					transform($(this).find(ops.txt),{rotateY:180});
					$(this).find(ops.txt).css('display','none');
				}
			}else{
				if(ops.txt){
					$(this).find(ops.txt).css('display','none');
				}
			}
			$$this.on('mouseenter ',ops.hoverchild,function  () {
				var $this=$(this);
				if(css3 && !ops.fade){
					clearTimeout(outhover);
					transform($(this).find(ops.child),{rotateY:-180,times:ops.time,boxshadow:ops.boxshadow});
					inhover=setTimeout(function  () {
						$this.find(ops.image).css('visibility','hidden');
						$this.find(ops.txt).css('display','table').css('visibility','visible').children().css('visibility','visible');
					}, ops.time/2);
				}else{
					$(this).find(ops.txt).fadeIn().children().css('visibility','visible');
				}
				$(this).css('z-index',5);
				
			});
			$$this.on('mouseleave ',ops.hoverchild,function  () {
				var $this=$(this);
				if(css3 && !ops.fade){
					clearTimeout(inhover);
					transform($(this).find(ops.child),{rotateY:0,times:ops.time});
					outhover=setTimeout(function  () {
						$this.find(ops.image).css('visibility','visible');
						$this.find(ops.txt).css('display','none');
					}, ops.time/2);
				}else{
					$(this).find(ops.txt).stop(true,true).fadeOut();
				}
				$(this).css('z-index','auto');
				

			});
		//});
		return this;
	};
	$.fn.touchwipe = function(settings) {
		var config = {
			min_move_x: 20, //x最小移动距离
			min_move_y: 20, //y最小移动距离
			live: false, //是否同步
			moving: function() {
				return true;
			}, //移动过程中的判定；
			push: false, //拉动刷新
			direct: 'down', //方向up down
			minlength: 20, //下拉最小距离
			pushid: 'push-refresh', //拉动刷新生成div的id
			pushclass: 'push-refresh', //拉动刷新生成div的class
			pushaddclass: 'push-refresh-acive', //拉动刷新d达到目标后给生成div的增加的class
			pushcontent: '刷新中。。。。', //刷新处文字
			pushcontainer: 'body', //放刷新的位置
			succee: function() {},
			wipeLeft: function() {},
			wipeRight: function() {},
			wipeUp: function() {},
			wipeDown: function() {},
			preventDefaultEvents: false
		};
		if (settings) $.extend(config, settings);
		this.each(function() {
			var startX;
			var startY;
			var endX;
			var endY;
			var dx;
			var dy;
			var $this = $(this);
			var isMoving = false,
				pushisok = false;
			var startX_, startY_, endX_, endY_, begin = false,
				pushdiv = false,
				x_1 = 0,
				y_1 = 0,
				x_2 = 0,
				y_2 = 0;
			function cancelTouch() {
				this.removeEventListener('touchmove', onTouchMove);
				this.removeEventListener('onmousemove', onTouchMove);
				startX = null;
				isMoving = false;
			}
			function onTouchMove(e) {
				if (config.preventDefaultEvents) {
					e.preventDefault();
				}
				if (isMoving) {
					endX = e.touches[0].pageX;
					endY = e.touches[0].pageY;
					dx = startX - endX;
					dy = startY - endY;
					//console.log(begin,dx,dy)
					//config.moving(dx, dy);
					//console.log(dx,dy);
					if (config.push) {
						if (pushmoving(dx, dy)) {
							pushisok = true;
						} else {
							pushisok = false;
						}
					}
					if (config.live && css3) {
						liveing(dx,dy);
					}
				}
			}
			function liveing(dx,dy) {
				if (css3) {
					//console.log( $this.attr('offset')-dx);
					$this.css({
						'transform': 'translate3d(' + ($this.attr('offset')-dx) + 'px,0,0)',
						'-webkit-transform': 'translate3d(' + ($this.attr('offset')-dx) + 'px,0,0)'
					});
				}
				//$this.css('margin-left', -dx + 'px');
			}
			function onTouchStart(e) {
				if (e.touches.length == 1) {
					startX = e.touches[0].pageX;
					startY = e.touches[0].pageY;
					isMoving = true;
					this.addEventListener('touchmove', onTouchMove, false);
					//this.addEventListener('onmousemove', onTouchMove, false);
					this.addEventListener('touchend', onTouchEnd, false);
					//this.addEventListener('onmouseup', onTouchEnd, false);
					pushdiv = false;
					pushisok = false;
				}
				x_1 = 0, y_1 = 0, x_2 = 0, y_2 = 0;
			}
			function onTouchEnd(e) {
				isMoving = false;
				if (Math.abs(dx) >= config.min_move_x) {
					cancelTouch();
					if (dx > 0) {
						config.wipeLeft(dx,dy);
					} else {
						config.wipeRight(dx,dy);
					}
				} else if (Math.abs(dy) >= config.min_move_y) {
					cancelTouch();
					if (dy < 0) {
						config.wipeDown();
						if (pushisok && config.direct == 'down') {
							$('.push-refresh').height('35px');
							config.succee();
						} else {
							$('#' + config.pushid).remove();
						}
					} else {
						config.wipeUp();
						if (pushisok && config.direct == 'up') {
							$('.push-refresh').height('35px');
							//alert(1)
							config.succee();
						} else {
							$('#' + config.pushid).remove();

						}
					}
				}
			}
			if ('ontouchstart' in document.documentElement) {
				this.addEventListener('touchstart', onTouchStart, false);
				//this.addEventListener('onmousedown', onTouchStart, false);
			}
			/*以下是下上拉刷新==待调试*/
			var html = '<div style="position:relative;clear:both;max-height:50px" id="' + config.pushid + '" class="' + config.pushclass + '"><img src="http://y.dobit.top/upload/demo/20150828100555937500/touchlrtb/img/refresh.gif"/>' + config.pushcontent + '<\/div>';

			function scroll_() {
				if ($(document).scrollTop() <= 70) {
					return 'top';
				}

				if ($(document).scrollTop() >= $(document).height() - $(window).height() - 90) {
					return 'bottom';
				}
				return false;
			}
			//滑动时执行判断
			function pushmoving(x, y) {
				if (pushdiv) {
					return true;
				}
				!scroll_() ? begin = false : begin = true;
				if (begin) {
					x_1 = Math.abs(x);
					y_1 = Math.abs(y);

					if (config.direct == 'down' && scroll_() == 'top') {
						if (!$(config.pushcontainer).children().first().hasClass(config.pushclass)) {
							$(config.pushcontainer).prepend(html);
						}
					}
					if (config.direct == 'up' && scroll_() == 'bottom') {
						if (!$(config.pushcontainer).children().last().hasClass(config.pushclass)) {
							$(config.pushcontainer).append(html);
						}
					}
					$('#' + config.pushid).height(y_1 - y_2);
					if ((y_1 - y_2) > config.minlength) {
						$('.' + config.pushid).addClass(config.pushaddclass);

						return true;
					} else {
						$('.' + config.pushid).removeClass(config.pushaddclass);
						return false;
					}
				} else {
					x_2 = Math.abs(x);
					y_2 = Math.abs(y);
					$('#' + config.pushid).remove();
					return false;
				}

			}
			//方向判断
		});
		return this;
	};
	//img全屏显示图片缩放
	$.fn.fullimg = function(options) {
		var dft = {
			classs: 'fullimg', //图片新建容器的类名
			width: null, //图片缩放宽度，可以是'auto' 'window'
			height: null, //图片缩放高度，可以是'auto' 'window'
			fullScreen: false, //是否是整屏
			resize: false, //是否随屏幕尺寸改变时改变
			align: 'center', //对齐方式,显示图片的 center、left、right
			vertical: 'mid', //垂直对齐方式，显示图片的top mid  bottom
			stretch: false, //是否拉伸
			call: function() {
				return false;
			}
		};
		var ops = $.extend(dft, options);
		var i = 0;
		this.each(function() {
			var _this = $(this),width_img, height_img;
			if (ops.fullScreen === false) {
				_this.parent().prepend('<div class="' + ops.classs + i + '"><div></div></div>');
			}
			//非全屏显示
			function no_fullscr() { //非全屏下图片显示
				ops.width == 'window' ? width_img = $(window).width() : width_img = ops.width;
				ops.height == 'window' ? height_img = $(window).height() : height_img = ops.height;
				var _width = _this.width(),
					_height = _this.height(),
					width_ = _width - width_img,
					height_ = _height - height_img;

				if (!(ops.width == 'auto' || ops.height == 'auto')) {
					//console.log(width_,height_);
					if (width_ <= height_) {
						_this.width(width_img);
						_this.height('auto');
					} else if (height_ < width_) {
						_this.height(height_img);
						_this.width('auto');
					}
					if (width_ <= 0 || height_ <= 0) {
						if (ops.stretch) {
							_this.css('min-height', height_img);
							_this.css('min-width', width_img);
						}
					}
				} else {
					_this.height(height_img);
					_this.width(width_img);
				}
				if (!ops.fullScreen) { //非全屏显示时的图的容器尺寸；
					$('.' + ops.classs + i).css({
						'width': width_img,
						'height': height_img,
						'overflow': 'hidden',
						'position': 'relative'
					}).find('div').css({
						'width': _this.width(),
						'height': _this.height(),
						'position': 'absolute'
					}).html('').append(_this);
					switch (ops.align) {
						case 'left':
							$('.' + ops.classs + i).find('div').css({
								'left': '0'
							});
							break;
						case 'center':
							$('.' + ops.classs + i).find('div').css({
								'left': '50%',
								'margin-left': -_this.width() / 2
							});
							break;
						case 'right':
							$('.' + ops.classs + i).find('div').css({
								'right': '0'
							});
							break;
					}
					switch (ops.vertical) {
						case 'top':
							$('.' + ops.classs + i).find('div').css({
								'top': '0'
							});
							break;
						case 'mid':
							$('.' + ops.classs + i).find('div').css({
								'top': '50%',
								'margin-top': -_this.height() / 2
							});
							break;
						case 'bottom':
							$('.' + ops.classs + i).find('div').css({
								'bottom': '0'
							});
							break;
					}
					_this.css({
						'margin-left': (_this.parent().width() - _this.width()) / 2
					}); //,'margin-top':(_this.parent().height()-_this.height())/2
				}

			}
			//全屏显示
			function fullscr() { //全屏显示时的尺寸
				ops.width = ops.height = 'window';
				no_fullscr();
			}
			//(ops.width==null && ops.height==null)||(ops.width==$(window).width() && ops.width==$(window).height())   判断正屏显示
			if ((ops.width === null && ops.height === null) || (ops.width == $(window).width() && ops.width == $(window).height()) || ops.fullScreen === true) {
				fullscr();
				size(fullscr);
				ops.call();
			} else {
				no_fullscr();
				size(no_fullscr);
				ops.call();
			}
			function size(b) {
				var time_ = 300;

				function runagine() {
					if (time_ > 1000) {
						return;
					}
					time_ += time_;
					b();
					setTimeout(runagine, time_);
				}
				runagine();
				if (ops.resize) {
					$(window).resize(b);
					ops.call();
				}
			}
			i++;
		});
		return this;
	};
	//等比例缩放
	$.fn.extend({
		scale: function(x, options) {
			var dft = {
				x: 1,
				y: 1,
				error: 0,
				call: function() {
					return false;
				}
			};
			var ops = $.extend(dft, options);
			this.each(function() {
				var i = ops.x / ops.y;
				if (x == 'height') {
					$(this).height($(this).width() / i);
				} else if (x == 'width') {
					$(this).width($(this).height() * i);
				}
				ops.call(this);
			});
		}
	});
	//居下显示
	$.fn.alignBottom = function(options) {
		var dft = {
			ways: 'margin-top',
			error: 0,
			call: function() {
				return false;
			}
		};
		var ops = $.extend(dft, options);
		this.each(function(){
			var h = $(this).height();
			var h_0 = $(this).parent().height();
			$(this).css(ops.ways, (h_0 - h) + ops.error);
		});
		ops.call(this);
		return this;
	};
		//上下居中
	$.fn.alignMid = function(options) { //定义插件的名称，这里为userCp
		var dft = {
			//以下为该插件的属性及其默认值
			borderbox: false,
			ways: 'margin-top', //
			minwidth: 0, //执行范围当宽度小于某个值不执行；
			error: 0, //误差
			time: 300, //多次延时执行间隔
			call: function() {
				return false;
			}
		};
		var ops = $.extend(dft, options);
		var time = ops.time;
		this.each(function() {
			var _this = $(this),h_2, h_1;
			function do_it() {
				if ($(window).width() > ops.minwidth) {
					if (!ops.borderbox) {
						h_2 = _this.height();
					} else {
						h_2 = parseInt(_this.css('padding-top')) + parseInt(_this.css('padding-bottom')) + _this.height();
					}
					h_1 = _this.parent().height();
					_this.css(ops.ways, (h_1 - h_2) / 2 + ops.error);
					if (time >= 3000) {
						return;
					}
					time += time;
					setTimeout(do_it, time);
				} else {
					_this.css(ops.ways, 0 + ops.error);
				}

			}
			do_it();
			XQ.resize(do_it);
		});
		ops.call();
		return this;
	};
		//两边居中
	$.fn.alignCenter = function(options) { //定义插件的名称，这里为userCp
		var dft = {
			//以下为该插件的属性及其默认值
			float: 'left',
			children: false, //是否有子元素
			position: false, //是否定位显示
			error: 0, //误差
			vertical: false, //是否上下居中
			midways: 'margin-top', //要是上下居中的方式
			call: function() {
				return false;
			}
		};
		var ops = $.extend(dft, options);
		this.each(function() {
			var _this = $(this);
			//有子元素的情况下
			if (ops.children) {
				_this.children().css('float', ops.float);
				if (ops.float == 'left') {
					_this.children(':first-child').css('margin-left', '0');
					_this.children(':last-child').css('margin-right', '0');
				} else if (ops.float == 'right') {
					_this.children(':first-child').css('margin-right', '0');
					_this.children(':last-child').css('margin-left', '0');
				}
				var w = 0;
				_this.children().each(function() {
					w += XQ.itwidth($(this));
				});
				var w_ = w + ops.error;
				_this.width(w_);
			}
			if (!ops.position) {
				_this.css({
					'display': 'block',
					'margin-left': 'auto',
					'margin-right': 'auto'
				});
				if (ops.vertical) {
					_this.alignMid({
						ways: ops.midways
					});
				}
			} else {
				_this.css({
					'left': '50%',
					'margin-left': -_this.width() / 2,
					'position': 'absolute'
				}).parent().css('position', 'relative');
				if (ops.vertical) {
					_this.css({
						'top': '50%',
						'margin-top': -_this.height() / 2
					});
				}
			}
		});
		ops.call();
		return this;
	};
		//弹性盒子；水平均分width；way:
	$.fn.flexbox = function(options) {
		var dtf = {
			width: false,
			autowidth: true,
			way: 'margin',
			resize: false,
			call: function() {
				return false;
			}
		};
		var ops = $.extend(dtf, options);
		this.each(function() {
			var obj = $(this);
			var w_, w_num = 0,a;
			ops.width ? w_ = ops.width : w_ = $(this).width();
			$(this).css({
				'box-sizing': 'border-box',
				'margin': 0
			});
			var child_w_max = 0;
			$(this).children().each(function() {
				if (child_w_max < $(this).width()) {
					child_w_max = $(this).width();
				}
				w_num += parseInt($(this).width());
			});
			$(this).children().css('text-align', 'center');
			var child_size = $(this).children().size();
			if (ops.autowidth) {
				$(this).children().width(child_w_max);
				a = (w_ - child_size * child_w_max) / child_size / 2;
			} else {
				a = (w_ - w_num) / child_size / 2;
			}
			if (ops.way == 'padding') {
				obj.children().css({
					'padding-left': a,
					'padding-right': a
				});
			} else if (ops.way == 'margin') {
				obj.children().css({
					'margin-left': a,
					'margin-right': a
				});
			}
			if (ops.resize) {
				$(window).resize(function() {
					obj.flexbox();
				});
			}
		});
		return this;
	};
		//图片加载
	$.fn.imgLoad = function(options) {
			var opts = $.extend({
				time: 4000, ///等待载入时间，如果超过这个时间就直接执行回调  
				callback: function() {} //默认回调  
			}, options);
			var $this = this,
				i = 0,
				j = 0,
				len = this.length;
			$this.each(function() {
				var _this = this,
					dateSrc = $(_this).attr('date-src'),
					imgsrc = dateSrc ? dateSrc : _this.src;
				var img = new Image();
				img.onload = function() {
					img.onload = null;
					_this.src = imgsrc;
					i++;
				};
				img.src = imgsrc;
			});
			var t = window.setInterval(function() {
				j++;
				// $("#msg").html(i);  
				if (i == len || j * 200 >= opts.time) {
					window.clearInterval(t);
					opts.callback();
				}
			}, 200);
		};
		//视差
	$.fn.parallax = function(options) {
		var ops = $.extend({
			ratio: 0.5, //移动比例
			direct: 'down', //移动方向
			max_top: 600, //范围最大值
			min_top: 0, //范围最小值
			mid_top:0,//中间值
			Screen:false,//是否已屏幕
			maxScreen:2,//第几瓶结束
			minScreen:1,//第几瓶开始
			addclass:'',//达到最大小于最小是添加的class
			call: function() {}
		}, options);
		ops.mid_top=((ops.mid_top>=ops.min_top) && (ops.mid_top<=ops.max_top))?ops.mid_top:(ops.max_top+ops.min_top)/2;
		this.each(function() {
			var $this = $(this);
			var scr_top = $(window).scrollTop();
			var scr_Height = $(window).height();
			$(window).scroll(scrol);
			function scrol() {
				scr_top = $(window).scrollTop();
				scr_Height = $(window).height();
				if(ops.Screen){
					if ((ops.minScreen-1)*scr_Height < scr_top && scr_top < (ops.maxScreen)*scr_Height) {
						$this.removeClass(ops.addclass);
						run(scr_top-(ops.minScreen)*scr_Height);
					} else {
						$this.addClass(ops.addclass);
						return;
					}
				}else{
					if (ops.min_top < scr_top && scr_top < ops.max_top) {
						$this.removeClass(ops.addclass);
						run(scr_top-ops.mid_top);
					} else {
						$this.addClass(ops.addclass);
						return;
					}
				}

			}
			function run(v) {
				switch (ops.direct) {
					case 'down':
						css($this, 0, v * ops.ratio, 0);
						break;
					case 'up':
						css($this, 0, -v * ops.ratio, 0);
						break;
					case 'left':
						css($this, -v * ops.ratio, 0, 0);
						break;
					case 'right':
						css($this, v * ops.ratio, 0, 0);
						break;
					case 'leftdown':
						css($this, -v * ops.ratio, v * ops.ratio, 0);
						break;
					case 'leftup':
						css($this, -v * ops.ratio, -v * ops.ratio, 0);
						break;
					case 'rightdown':
						css($this, v * ops.ratio, v * ops.ratio, 0);
						break;
					case 'rightup':
						css($this, v * ops.ratio, -v * ops.ratio, 0);
						break;
				}
			}
			function css(a, x, y, z) {
				a.css({
					'-webkit-transform':'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)',
					'-moz-transform':'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)',
					'-ms-transform':'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)',
					'-o-transform':'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)',
					'transform':'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)'
				});
			}
			scrol();
		});
		return this;
	};



	//滑动事件
	$.fn.swipeLeft = function(options) {
		var opts = $.extend({
			call: function() {}
		}, options);
		var $this = $(this);
		var a = new LSwiperMaker({
			bind: this, // 绑定的DOM对象
			dire_h: true, //true 判断左右， false 判断上下
			backfn: function(o) { //回调事件
				//document.getElementById("dire").innerHTML = "向"+ o.dire + "滑";  
				//alert(1);
				opts.call();
				if (o.dire == 'L') {
					opts.call();
				}
			}
		});
	};
	$.fn.swipe = function(a, options) {
		var ops = $.extend({
			call: function() {},
			dire_h: true
		}, options);
		var control = false;
		var sPos = {};
		var mPos = {};
		var dire;
		var $this = $(this);

		$this.on('touchstart', function(e) {
			start(e);
		}, false);
		$this.on('touchmove', function(e) {
			move(e);
		}, false);
		$this.on('touchend', function(e) {
			end(e);
		}, false);

		function start(e) {
			var point = e.touches ? e.touches[0] : e;
			sPos.x = point.screenX;
			sPos.y = point.screenY;
		}

		function move(e) {
			var point = e.touches ? e.touches[0] : e;
			control = true;
			mPos.x = point.screenX;
			mPos.y = point.screenY;
			//alert()
		}

		function end() {
			ops.dire_h && (!control ? dire = null : mPos.x > sPos.x ? dire = 'R' : dire = 'L');
			ops.dire_h || (!control ? dire = null : mPos.y > sPos.y ? dire = 'D' : dire = 'U');
			control = false;
			ops.call();
		}
	};
})(jQuery);
;(function(window,document){
    /*
     *(new Sloth.Shake()).start().bind(shakeEventDidOccur);
    *
     */
     var Sloth=window.Sloth||{};
    'use strict';
    function Shake(options) {
        //feature detect
        this.hasDeviceMotion = 'ondevicemotion' in window;
        this.options = {
            threshold: 15, //default velocity threshold for shake to register
            timeout: 1000 //default interval between events
        };

        if (typeof options === 'object') {
            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }
        }

        //use date to prevent multiple shakes firing
        this.lastTime = new Date();

        //accelerometer values
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;

        //create custom event
        if (typeof document.CustomEvent === 'function') {
            this.event = new document.CustomEvent('shake', {
                bubbles: true,
                cancelable: true
            });
        } else if (typeof document.createEvent === 'function') {
            this.event = document.createEvent('Event');
            this.event.initEvent('shake', true, true);
        } else {
            return false;
        }
    }

    //reset timer values
    Shake.prototype.reset = function () {
        this.lastTime = new Date();
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    };

    //start listening for devicemotion
    Shake.prototype.start = function () {
        this.reset();
        if (this.hasDeviceMotion) {
            window.addEventListener('devicemotion', this, false);
        }
        return this;
    };

    //stop listening for devicemotion
    Shake.prototype.stop = function () {
        if (this.hasDeviceMotion) {
            window.removeEventListener('devicemotion', this, false);
        }
        this.reset();
    };
    //calculates if shake did occur
    Shake.prototype.devicemotion = function (e) {
        var current = e.accelerationIncludingGravity;
        var currentTime;
        var timeDifference;
        var deltaX = 0;
        var deltaY = 0;
        var deltaZ = 0;

        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }

        deltaX = Math.abs(this.lastX - current.x);
        deltaY = Math.abs(this.lastY - current.y);
        deltaZ = Math.abs(this.lastZ - current.z);
        if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();
            if (timeDifference > this.options.timeout) {
                window.dispatchEvent(this.event);
                this.lastTime = new Date();
            }
        }

        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;

    };

    //event handler
    Shake.prototype.handleEvent = function (e) {
        if (typeof (this[e.type]) === 'function') {
            return this[e.type](e);
        }
    };
    //扩展
    Shake.prototype.bind = function (fun) {
       window.addEventListener('shake', fun, false);
       return this;
    };
    Sloth.Shake=Shake;
   window.Sloth=Sloth;
})(window,document);


/**
 * !Sloth V-0.0.4-bate ||(c) 2016
 * This is created by Sloth ,this is building...I need you help!
 * this viersion changes:
 *delete some function that is used to test  this JS,exmple as hasClass addClass ;
 *if you want wo add fun you should use this demo:
 *(function($,Sloth){
	var Sloth=Sloth||{};
	function YouPlagin () {
		
	}
	YouPlagin.prototype.log=function  (v) {
		
	}
Sloth.YouPlagin=YouPlagin;
})(jQuery,Sloth)
 */
;(function(window,$){
 'use stric'; 
var XQ =window.Sloth||{};  
XQ.version='0.0.3';
XQ.debug=false;
function ltie9() {
	return !(navigator.appName == 'Microsoft Internet Explorer' && navigator.appVersion.split(';')[1].replace(/[ ]/g,'') == 'MSIE6.0' || navigator.appName == 'Microsoft Internet Explorer' && navigator.appVersion.split(';')[1].replace(/[ ]/g, '') == 'MSIE7.0' || navigator.appName == 'Microsoft Internet Explorer' && navigator.appVersion.split(';')[1].replace(/[ ]/g, '') == 'MSIE8.0' || navigator.appName == 'Microsoft Internet Explorer' && navigator.appVersion.split(';')[1].replace(/[ ]/g,'') == 'MSIE9.0');
}
function supportCss3(style) { //判断是否支持css3的某个属性
	var prefix = ['webkit', 'Moz', 'ms', 'o'],
		i,
		humpString = [],
		htmlStyle = document.documentElement.style,
		_toHumb = function (string) {
			return string.replace(/-(\w)/g, function ($0, $1) {
				return $1.toUpperCase();
			});
		};
	for ( i in prefix)
		humpString.push(_toHumb(prefix[i] + '-' + style));
		humpString.push(_toHumb(style));
	for ( i in humpString)
		if (humpString[i] in htmlStyle) return true;
	return false;
}
XQ.CSS3 = (supportCss3('transform') || supportCss3('-webkit-transform')) && ltie9();
XQ.log=function(val){XQ.debug&&((window.console&&window.console.log)?console.log(val):'');}
// 1,设置宽度随子集变化
XQ.autoWidth = function (a, b) { //a是父级,b是子集;
	setTimeout(function () {
		var num = 0;
		var $a = $(a);
		if (b) {
			var $b = $(b);
			$b.each(function () {
				num += $b.width() + parseInt($b.css('margin-left')) + parseInt($b.css('margin-right')) + parseInt($b.css('padding-left')) + parseInt($b.css('padding-right'));
			});
			$a.width(num + 10);
			num = 0;
		} else {
			$a.children().each(function () {
				num += $(this).width() + parseInt($(this).css('margin-left')) + parseInt($(this).css('margin-right')) + parseInt($(this).css('padding-left')) + parseInt($(this).css('padding-right'));
			});
			$a.width(num + 10);
			num = 0;
		}

	}, 20);
};
//2,窗体宽度
XQ.WinW = function () {
	var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	return w;
};
//6,窗体高度
XQ.WinH = function () {
	var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	return h;
};
//7, 赋值窗口宽度
XQ.autoWinW = function (a) { //a是元素
	$(a).width(XQ.WinW());
};
// 8,赋值窗口高度
XQ.autoWinH = function (a) {
	$(a).height(XQ.WinH());
};
//9,回顶部
XQ.goTop = function (a, b) { //a是元素，b是距离；
	XQ.scrollShow(a, b);
	$(a).on('click', function () {
		$('html,body').animate({
			'scrollTop': '0'
		}, 500);
	});
};
//9.1,回顶部
XQ.scrollShow = function (a, b) { //a是元素，b是距离；
	var height_ = $(a).height();
	$(a).css({
		'transition': 'all 0.3s linear',
		'-webkit-transition': 'all 0.3s linear'
	});
	$(a).css({
		'height': 0
	});
	var c;
	b ? c = b : c = 0.5;
	$(window).on('scroll', function () {
		var S_t = $(window).scrollTop();
		if (S_t >= XQ.WinH() * c) {
			$(a).css({
				'height': height_
			});
		} else {
			$(a).stop(true, true).css({
				'height': 0
			});
		}
	});
};
XQ.scrollFixed = function (a, b, c) {
	$(window).on('scroll', function () {
		var S_t = $(window).scrollTop();
		if (S_t >= b) {
			$(a).addClass(c);
		} else {
			$(a).removeClass(c);
		}
	});
};
//9,获取滚动条高度
XQ.scrollTop = function () {
	var scrollTop = 0;
	if (document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
	} else if (document.body) {
		scrollTop = document.body.scrollTop;
	}
	return scrollTop;
};
//10,banner渐隐渐现
XQ.banFade = function (a, b, c, d) { //a 是父级，b是子集，c是间隔时间，d是从第几个开始
	var leng = $(a).find(b).size();
	var i = 0;
	if (d) {
		i = d;
	}
	setTimeout(function () {
		ban(i);
	}, c);
	function ban(e) {
		$(a).find(b).eq(e).fadeOut(800);
		if (e >= leng - 1) {
			e = 0;
		} else {
			e++;
		}
		$(a).find(b).eq(e).delay(400).fadeIn(800);
		setTimeout(function () {
			ban(e);
		}, c);
	}
};

//10多选框(移除)
XQ.checkbox = function (a, aa, b, c, d, dd, ddd, e, f, g, h) { //a=父级 aa=label的父级 b=label（label 子集是input）  c=数量 d=全选 dd=总额 ddd=总数量 e=label选中class f=label取消calss g=是否全选 h=回调函数（课返回返回选中的index值）
	//初始化是否全选

	if (g) {
		$(a).find(b).each(function () {
			$(this).removeClass(f).addClass(e).find('input').attr('checked', true);
		});
		$(d).removeClass(f).addClass(e).find('input').attr('checked', true);
	}
	fuzhi();
	//单选单则
	$(a).find(aa).find(b).on('tap', function () {
		if ($(this).find('input').is(':checked')) {
			$(this).removeClass(e).addClass(f);
		} else {
			$(this).removeClass(f).addClass(e);
		}
		fuzhi();
	});
	$(d).on('click', function () {
		if (!$(this).find('input').is(':checked')) {
			$(this).removeClass(e).addClass(f);
			$(a).find(aa).find(b).removeClass(e).addClass(f);
			$(a).find(aa).find(b).find('input').prop('checked', false);
		} else {
			$(this).removeClass(f).addClass(e);
			$(a).find(aa).find(b).removeClass(f).addClass(e);
			$(a).find(aa).find(b).find('input').prop('checked', true);
		}
		fuzhi();
	});
	//赋值
	function fuzhi() {
		var ab = 0,
			ac = 0,
			ad = 0,
			ae = [];
		$(a).find(aa).each(function () {
			ad++;
			if ($(this).find(b).hasClass(e)) {
				ab += parseInt($(this).find(c).text());
				ac++;
				ae[ac - 1] = $(this).index();
			}
			$(dd).text(ab.toFixed(2));
			$(ddd).text(ac);
		});
		if (ac == ad && ac !== 0) {
			$(d).removeClass(f).addClass(e);
			$(d).find('input').prop('checked', true);
		} else {
			$(d).removeClass(e).addClass(f);
			$(d).find('input').prop('checked', false);
		}
		if (h) {
			h(ae);
		} //返回选中的index值
	}
};
//11设置cookie
XQ.setCookie =  function(name,value,time,path){
          var strsec = getsec(time||'h3');
          var exp = new Date();
          path=path||'/';
          exp.setTime(exp.getTime() + strsec*1);
          document.cookie = name + '='+ escape (value) + ';expires=' + exp.toGMTString()+';path='+path;
           function getsec(str){
          var str1=str.substring(1,str.length)*1;
          var str2=str.substring(0,1);
          if (str2=='s'){
            return str1*1000;
          }else if (str2=='h'){
            return str1*60*60*1000;
          }else if (str2=='d'){
            return str1*24*60*60*1000;
          }
        }
 };
//12获取cookie
XQ.getCookie = function (name) {
	  var arr,reg=new RegExp('(^| )'+name+'=([^;]*)(;|$)');
          if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
          }else{
            return null;
          }
};
//13移除cookie
XQ.removeCookie = function (name) {
	 var exp = new Date();
          	exp.setTime(exp.getTime() - 1);
          var cval=XQ.getCookie(name);
          if(cval!==null){
            document.cookie= name + '='+'0'+';expires='+exp.toGMTString();
        }
};
//14综合cookie
XQ.Cookie = function (name, value, options) { //name是cookie的名字；value是cookie内容信息；iDay是存活时间
	// 如果第二个参数存在
	if (typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			// 设置失效时间
			options.expires = -1;
		}
		var expires = '';
		// 如果存在事件参数项，并且类型为 number，或者具体的时间，那么分别设置事件
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		var path = options.path ? '; path=' + options.path : '', // 设置路径
			domain = options.domain ? '; domain=' + options.domain : '', // 设置域 
			secure = options.secure ? '; secure' : ''; // 设置安全措施，为 true 则直接设置，否则为空

		// 把所有字符串信息都存入数组，然后调用 join() 方法转换为字符串，并写入 Cookie 信息
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // 如果第二个参数不存在
		var CookieValue = null;
		if (document.cookie && document.cookie !=='') {
			var Cookie = document.cookie.split(';');
			for (var i = 0; i < Cookies.length; i++) {
				 Cookie = (Cookie[i] || '').replace(/^\s+|\s+$/g, '');
				if (Cookie.substring(0, name.length + 1) == (name + '=')) {
					CookieValue = decodeURIComponent(Cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return CookieValue;
	}
};
//16、点击显示隐藏；（移除）
XQ.clickShow = function (a, b, c, d) { //a是点击显示按钮，b是点击隐藏按钮，c是执行元素，d是回调函数
	var flag = false;
	$(a).click(function () {
		if (!flag) {
			for (var arr in c) {
				$(c[arr]).fadeIn();
			}
			flag = true;
			if (d) setTimeout(d, 400);
		}
	});
	$(b).click(function () {
		if (flag) {
			for (var arr in c) {
				$(c[arr]).fadeOut();
			}
			flag = false;
			if (d) setTimeout(d, 400);
		}
	});
};
//17判断手机或者pc
XQ.Agent=(function  () {
	var agent=navigator.userAgent;
	return {
		isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent),
		idAndroid:/Android/i.test(agent),
		isIos:/iphone|ipad|ipod/.test(agent)
	};
})();
XQ.moborpc =XQ.Agent.isMobile;//兼容老版本
//18延时重排
XQ.timeAuto = function (call, time) {
	time=time ? time :300;
	(function auto() {
		if (time >= 3000) {
			return;
		}
		time += time;
		call();
		setTimeout(auto, time);
	})();
	XQ.resize(call);
};
//19所有资源加载完成后出发事件；
XQ.download = function (fun,time) {
	var flag=true;
	if(ltie9()){
		document.onreadystatechange = function () {
			if (document.readyState == 'complete') {
				flag&&fun&&fun();
				flag=false;
			}
		};
		time=time||4000;
		setTimeout(function (){
			flag&&fun&&(fun(),flag=false);
		},time);
	}else{
		setTimeout(function (){
			fun&&fun();
		},2000);
	}
};
//20banner滚动

XQ.slideItem = function (obj, options) {
	var dft = {
		autoplay: false, //是否自动播放
		times: 3000, //自动播放间隔时间
		hoverstop: true, //鼠标悬浮停留
		flag: null, //
		container: null, //slide容器的类名
		slide: null, //滚动的类名
		item: null, //子集的类名
		itemindex: 3,//滚动数量
		media: false, //是否在什么尺寸进行地洞滚动；
		min_width: 0, //滚动失效的最小尺寸；
		next: null, //下一个按钮的类名
		prev: null //前一个按钮的类名
	};
	var ops = $.extend(dft, options);
	var i = 0;
	$(obj).each(function () {
		var $this = $(this);
		var flag_ = ops.flag ? ops.flag : '.';
		var slide_ = ops.silde ? ops.silde : flag_ + 'xq-slide';
		var setime;
		var container_ = ops.silde ? ops.silde : flag_ + 'xq-container';
		var item_ = ops.itme ? ops.itme : flag_ + 'xq-item';
		var next_ = ops.next ? ops.next : flag_ + 'xq-next';
		var prev_ = ops.prev ? ops.prev : flag_ + 'xq-prev';
		var step_ = $(item_).eq(0).width() + parseInt($(item_).eq(0).css('margin-left')) + parseInt($(item_).eq(0).css('padding-left')) + parseInt($(item_).eq(0).css('margin-right')) + parseInt($(item_).eq(0).css('padding-right'));
		var flag = false;
		function resize() {
			if ($(window).width() > ops.min_width) {
				XQ.autoWidth(slide_);
				if ($this.find(slide_).find(item_).size() <= ops.itemindex) {
					$this.find(next_).remove(); $this.find(prev_).remove();
					flag = true;
					return;
				} else {
					flag = false;
					autoplay(); XQ.log($this.index() + '>>' + $(window).width());
					return;
				}
			} else {
				flag = true;
				$this.find(slide_).width('100%'); XQ.log($this.index() + '>==>>>' + $(window).width())
				clearTimeout(setime);
			}
		}
		function judge() {
			if (!flag) {
				XQ.autoWidth(slide_);
				$this.find(slide_).find(item_).css({
					'float': 'left'
				});
				$this.find(container_).css({
					'overflow': 'hidden'
				});
				$this.find(next_).click(go_next);
				$this.find(prev_).click(go_prev);
				autoplay();
				if (ops.hoverstop) {
					$this.find(slide_).find(item_).hover(cancelplay, autoplay);
				}
			}
		}
		function go_next() {

			if (!$this.find(slide_).is(':animated')) {
				cancelplay();
				//              if(XQ.CSS3 ){
				//              	$(slide_).animate({'transform':'translate3d('+-step_+'px,0,0)'},600,function(){
				//	                $(item_).first().appendTo(slide_);
				//	                $(slide_).css('transform','translate3d(0,0,0)');               
				//	                    autoplay();
				//	          		  });
				//              }else{
				$this.find(slide_).animate({
					'marginLeft': -step_
				}, 600, function () {
					$this.find(slide_).find(item_).first().appendTo($this.find(slide_));
					$this.find(slide_).css('margin-left', '0');
					autoplay();
				});
				//  }
			}
		}
		function go_prev() {
			if (!$this.find(slide_).is(':animated')) {
				cancelplay();
				$this.find(slide_).find(item_).last().prependTo($this.find(slide_));
				$this.find(slide_).css('margin-left', -step_);
				$this.find(slide_).animate({
					'marginLeft': 0
				}, 600, function () {
					autoplay();
				});
			}
		}
		function cancelplay() {
			if (ops.autoplay) {
				clearTimeout(setime);
			}
		}
		function autoplay() {
			cancelplay();
			if (ops.autoplay && !flag) {
				setime = setTimeout(go_next, ops.times);
			}
		}
		resize();
		judge();

		$(window).resize(resize);
		i++;
	}); 
	return ops;
};
//21 点击切换列表
XQ.switchOver = function (obj, options) {
	var dft = {
		classs: 'dq', //切换当前的选中状态的class
		switchs: false, //是否切换相应的内容
		obj2: false, //切换的内容/可以是其父级的类、id，按照索引值进行切换，或者是数组(类名或id组成)，按照索引值对应数组进行切换
		call: function () { } //你懂得...
	};
	var ops = $.extend(dft, options);
	var arry = obj.split(','),
		i = 0;
	for (i in arry) {
		var $this = $(arry[i]);

		var flag = 0,
			index;
		if (ops.switchs) {
			if ('string' ==typeof ops.obj2 ) {
				flag = 1;
			}
			if ('object' == typeof ops.obj2  ) {
				flag = 2;
			}
			if ('boolean'==ops.obj2 && typeof ops.obj2) {
				flag = 3;
			}
			if (!ops.obj2) {
				flag = 0;
			}
		}
		$this.parent().on('click', '>' + $this.prop('tagName'), function () {
			$(this).addClass(ops.classs).siblings().removeClass(ops.classs);
			index = $(this).index();
			switchto(flag, index,$this);
		});
	}
	function switchto(o, i,obj) {
			switch (o) {
				case 0:
					break;
				case 1:
					$(ops.obj2).children().eq(i).fadeIn().siblings().css('display', 'none');
					break;
				case 2:
					for (var y in ops.obj) {
						$(ops.obj2[i]).css('display', 'none');
					}
					$(ops.obj2[i]).fadeIn();
					break;
				case 3:
					obj.parent().siblings().children().eq(i).fadeIn().siblings().css('display', 'none');
					break;
			}
			ops.call(i);
		}
};
//21 点击弹出box进行赋值
XQ.popup = function (options) {
	var dft = {
		obj: '', //点击
		popup_zc: '', //弹出遮层
		popup: '', //弹出框
		closes: '', //关闭按钮
		mobile: true, //手机上执行
		ways: 'fade', //出现方式可以是fade可以是左右上下
		num: 0, //若是左右上下那就输入相应数值
		showbefore: function () {
			return true;
		}, //打开前执行...
		showafter: function () { }, //打开后执行...
		closebefore: function () {
			return true;
		}, //关闭后执行...
		closeafter: function () { }, //关闭后执行...
		call: function () { }
	};
	var ops = $.extend(dft, options);

	var one = {
		'opacity': '1'
	};
	one[ops.ways] = ops.num;
	var two = {
		'opacity': '0'
	};
	two[ops.ways] = '-100%';
	var arry = ops.obj.split(','),
		i = 0;
	for (i in arry) {
		if ($(arry[i]).size() <= 0) continue;
		var $this = $(arry[i]);
		if (!XQ.moborpc || ops.mobile) {
			switch (ops.ways) {
				case 'fade':
					$(ops.popup).css({ 'top': '0', 'left': '0', 'right': 'auto', 'bottom': 'auto', 'display': 'none' });
					break;
				case 'right':
					$(ops.popup).css({ 'top': '0', 'right': '-200%', 'left': 'auto', 'bottom': 'auto', 'display': 'none' });
					break;
				case 'left':
					$(ops.popup).css({ 'top': '0', 'left': '-200%', 'right': 'auto', 'bottom': 'auto', 'display': 'none' });
					break;
				case 'top':
					$(ops.popup).css({ 'top': '-200%', 'left': '0', 'right': 'auto', 'bottom': 'auto', 'display': 'none' });
					break;
				case 'bottom':
					$(ops.popup).css({ 'top': 'auto', 'left': '0', 'right': 'auto', 'bottom': '-200%', 'display': 'none' });
					break;
			}
		} else {
			switch (ops.ways) {
				default:
					$(ops.popup).css({ 'top': '0', 'right': '-100%', 'left': 'auto', 'bottom': 'auto', 'visibility': 'visible' });
					break;
			}
		}
		$this.parent().on('click', '>' + $this.prop('tagName'), function () {
			if (!ops.showbefore($(this))) {
				return;
			}
			if (!XQ.moborpc || ops.mobile) {
				if (ops.ways == 'fade') {
					$(ops.popup).fadeIn(function () {
						ops.showafter();
					});
					$(ops.popup_zc).fadeIn();
				} else {
					if (!$(ops.popup).is(':animated')) {
						$(ops.popup).css('display', 'block');
						$(ops.popup).animate(one, 600, function () {
							ops.showafter();
						});
						$(ops.popup_zc).fadeIn();
						$('body').css('overflow-y', 'hidden');

					}
				}
			} else {
				$(ops.popup).addClass('show');
				window.location.hash = '#show',
					ops.showafter();
			}
		});
		$('body').on('click', ops.closes, function () {
			if (!ops.closebefore()) {
				return;
			}
			if (!XQ.moborpc || ops.mobile) {
				if (ops.ways == 'fade') {
					$(ops.popup).fadeOut();
					$(ops.popup_zc).fadeOut(function () {
						ops.closeafter();
					});
				} else {
					if (!$(ops.popup).is(':animated')) {
						$(ops.popup).animate(two, 600, function () {
							$(ops.popup).css('display', 'none');
							$('body').css('overflow-y', 'auto');
						});
						$(ops.popup_zc).fadeOut(function () {
							ops.closeafter();
						});
					}
				}
			} else {
				$(ops.popup).removeClass('show');
				ops.closeafter();
			}
		});
		if (!$(ops.popup).hasClass('popup')) $(ops.popup).addClass('popup');
	}
	window.onhashchange = function () {
		if (window.location.hash.replace('#', '') != 'show') {
			$('.popup').removeClass('show');
		}
	};
	ops.call();
};
XQ.trim = function (str) {
	str = str.replace(/(^\s*)|(\s*$)/g, '');
	str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
	str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
	str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
	return str;
};
//判断是否支持placeholer
XQ.placeholer = function () {
	var input = document.createElement('input');
	return 'placeholder' in input;
};
//22 判断是否支持css3某个属性
XQ.autoSlide = function (options) {
	/*obj:自动生成导航点点的总父级元素，
obj-ul:自动生成的个数父级；
obj-span:点点的父级元素；
obj-class:点点class
    */
	var ops = $.extend({
		obj: '', //自动生成导航点点的父级元素，
		obj_ul: '', //自动生成的个数父级；
		obj_class: 'switch', //点点class
		obj_class_active: 'switch-active', //点点class
		obj_index:0,
		obj_code: '' //点点的代码
	}, options);
	if ($(ops.obj).size() <= 0) return;
	$(ops.obj).eq(ops.obj_index).html('');
	var a_ = '';
	var size_ = $(ops.obj_ul).eq(ops.obj_index).children().size(); //取到小圆点的个数
	var span = '<span class="' + ops.obj_class + '" ></span>';
	var code = ops.obj_code || span;
	for (var i = 1; i <= size_; i++) { //循环生成小点点
		$(ops.obj).eq(ops.obj_index).append(code);
	}
	//	$(ops.obj).children().css({
	//		'cursor': 'pointer',
	//		
	//		'border-radius':'50%',
	//
	//	});
	$(ops.obj).eq(ops.obj_index).children().eq(0).addClass(ops.obj_class_active);
setTimeout(function(){
	$(ops.obj).eq(ops.obj_index).alignCenter({ //左右居中函数见jq.xq.extend.js；
		children: true,
		error: 20,
		position: true
	});
}, 1000);
	
};
XQ.itwidth = function (obj) {
    return obj.width() + (parseInt(obj.css('margin-left')) || 0) + (parseInt(obj.css('margin-right')) || 0) + (parseInt(obj.css('padding-left')) || 0) + (parseInt(obj.css('padding-right')) || 0) + (parseInt(obj.css('border-left-width')) || 0) + (parseInt(obj.css('border-right-width')) || 0);
};
XQ.itheight = function (obj) {
    return obj.height() + (parseInt(obj.css('margin-top')) || 0) + (parseInt(obj.css('margin-bottom')) || 0) + (parseInt(obj.css('padding-top')) || 0) + (parseInt(obj.css('padding-bottom')) || 0) + (parseInt(obj.css('border-top-width')) || 0) + (parseInt(obj.css('border-bottom-width')) || 0);
};
//滚动pc
XQ.slide = function (options) {
	var ops = $.extend({
		obj: '', //滚动元素
		// item:'',//子集的类名
		way:'slide',//转变形式 有fade upDown  slide
		radio: null, //分页符==俗称小点点的父级
		next: null, //下一个按钮的类名
		prev: null, //前一个按钮的类名
		minitem: null,//最小个数
		parent: 'body',//需要传一个父级元素，当一个页面同时有两种共同滚动时；
		autotime: 5000, //自动播放时间
		ways: 'linear', //动画效果；
		fullScreen: false, //整屏显示 整屏显示 宽度是窗口宽度，高度为窗口高度
		autoHeight: 0,//自动获取高度 0 为自动获取父级高度
		slideHeightAuto:false,
		mediascreenwidth: false, //响应式的宽度,true时为窗口宽度；false为父级的父级宽度；fullScreen为true,默认为ture
		mediashow: null, //响应式方案,特大，大，中，小屏显示个数[3,3,2,1],
		itemshow: 1, //非响应式方案，显示个数,与mediashow不能同时存在，同时存在一响应式为准
		//size: false, //true是需要自动获取，也就是false是自定义尺寸 
		hoverstop: false,
		parallax: false,
		time: 800, //动画时间
		fortime: 0,//动画前的时间
		radio_item: 'switch', //分页符==俗称小点点
		radio_item_active: 'switch-active', //分页符==俗称小点点
		radio_item_code: null,///小点点代码
		syncSlideOnOff: false,//同步显示的开关
		itembegin:0,//从第一个在那个位置显示,可选0123，必须小于itemshow；
		rebegin:0,//真是开始
		syncSlide:{
			way: 'fade',//连同变换的方式
			durTime:800,//变化单个时间
			delayTime:0,//延迟时间
			width:null,
			height:null,
			obj: null//连同主要对象
		},
		syncClassOnOff:false,//同步变化class的开关
		syncClass:{
			obj:null,
			activeclass:'activesync',
			classs:[,,]
		},//同步变化class的开关
		callback: function () { },//每次运行后,参数有id
                    afterLoad:function(){}//装载完毕后
	}, options);
	ops.itembegin=ops.itembegin<ops.itemshow-1?ops.itembegin:ops.itemshow-1;
	ops.rebegin=ops.itemshow-ops.itembegin;
	var ii = 0;
	if ($(ops.obj).size() <= 0) return;//如果本页不存在这个对象，就直接跳出，针对多个页面的调用js同事调用产生的误会
	$(ops.obj).each(function () {
		if (ops.radio) { //是否有分页符==俗称小点点的父级
			XQ.autoSlide({
				obj: ops.radio,
				obj_ul: ops.obj,
				obj_class: ops.radio_item,
				obj_class_active: ops.radio_item_active,
				obj_code: ops.radio_item_code,
				obj_index:ii
			});
		}
		var obj = $(this);
		var item = obj.children();
		var radio = $(ops.radio).eq(ii);
		var next_ = $(ops.next).eq(ii);
		var prev_ = $(ops.prev).eq(ii);
		var syncSlide, syncSlideChild, syncSlideParent,syncClass,syncClassChild,syncClassParent;
		ops.syncSlideOnOff && (syncSlide = $(ops.syncSlide.obj).eq(ii), syncSlideChild = syncSlide.children(), syncSlideParent = syncSlide.parent());XQ.log()
		ops.syncSlideOnOff && (ops.syncSlide.way=='fade') && (syncSlideParent.css('position','relative'),syncSlideChild.css({'position':'absolute','left':'0','top':'0'}));
		ops.syncClassOnOff && (syncClass = $(ops.syncClass.obj).eq(ii), syncClassChild = syncClass.children(), syncClassParent = syncClass.parent(),ops.syncClass.activeclass=ops.syncClass.activeclass||'activesync');XQ.log()
		var play;
		var index_111 = 0;
		var css3play = true, itemwidth,fadeTime=true,itemheight;
		obj.parent().css('overflow', 'hidden');
		item.each(function() {//给子集添加顺序，以便调试
			$(this).attr('a', $(this).index());
		});

		//this.random=Math.random();
		//调试用的
		//为了让收个出现；
		var con={};
		if (ops.fullScreen) {//如果是是全屏显示，那么久至少有一个子集才能进行滚动；
			ops.minitem = ops.minitem ||1;
		}
		function  initItem () {
			 con.first=[];//item.first().clone(true);
			 con.last=[];//item.last().clone(true);
			 for(var i=0;i<ops.itemshow;i++){
			 	con.first[i]=item.eq(i).clone(true);
			 	con.last[i]=item.eq(item.size()-1-i).clone(true);
			 }
			 for(var i=0;i<ops.itemshow;i++){
			 	 obj.append(con.first[i]);
				 obj.prepend(con.last[i]);
			 }
			 con.leng=item.size()-1;
			  item=obj.children();
			   
		}
		function initWay(){
			switch(ops.way){//这里需要调试
			 	case 'slide':
			 		item.css({
						'float': 'left'
					});
					 if (XQ.CSS3 ) {
						obj.css({
							'transition-duration': '0s',
							'-webkit-transition-duration': '0s',
							'transform': 'translate3d(' + (-1*(ops.rebegin)*XQ.itwidth(item)) + 'px,0,0)',
							'-webkit-transform': 'translate3d(' + (-1*(ops.rebegin)*XQ.itwidth(item)) + 'px,0,0)'
						});
					    }else{
					    	obj.css('margin-left',-1*ops.rebegin*XQ.itwidth(item));
					    }
			 	break;
			 	case 'upDown':
					 if (XQ.CSS3 ) {
						obj.css({
							'transition-duration': '0s',
							'-webkit-transition-duration': '0s',
							'transform': 'translate3d(0,' + (-1*ops.itemshow*XQ.itheight(item)) + 'px,0)',
							'-webkit-transform': 'translate3d(0,' + (-1*XQ.itheight(item)) + 'px,0)'
						});
					    }else{
					    	obj.css('margin-top',-1*ops.itemshow*XQ.itheight(item));
					    }
			 	break;
			 	case 'fade':

			 	break;
			 }
		}
		function size() { //初始化尺寸大小
			var h = $(window).height();
			if (ops.fullScreen) { //是否全屏；
				obj.height(h).css('margin-right', '-10px').parent().height(h).siblings().height(h);
				ops.minitem = ops.minitem || 1;
				ops.mediascreenwidth=true;
			}
			var w = ops.fullScreen || ops.mediascreenwidth ? $(window).width() : obj.parent().width();//宽度是否是响应
			//syncslidesize(item.width(),item.height())
			if (ops.mediashow !== null) { //是否具有响应式分配尺寸，高度居内容变换
				if (w > 1200) {
					item.width(parseInt(w / ops.mediashow[0]));
				} else if (w > 992 && w < 1200) {
					item.width(parseInt(w / ops.mediashow[1]));
				} else if (w < 992 && w > 768) {
					item.width(parseInt(w / ops.mediashow[2]));
				} else if (w < 768) {
					item.width(parseInt(w / ops.mediashow[3]));
				}
				syncslidesize(item.width(),item.height());
				return;
			} else if (ops.itemshow > 1) {
				item.width(parseInt(w / ops.itemshow));
				syncslidesize(item.width(),item.height());
				return;
			} else {
				item.css({
					'width': w
				}); //自动尺寸
				syncslidesize(item.width(),item.height());
				return;
			}
			function syncslidesize(a,b){
				if(ops.autoHeight=='auto'){
					
					ops.slideHeightAuto=true;
				}else{
					item.css({
						'height':  ops.autoHeight || obj.height()//自定义尺寸，高度以父级为准，宽度自定义
					});
				}
				b=item.height();
				(ops.way=='slide') && (itemwidth = XQ.itwidth(item),obj.width(itemwidth * (item.size() + 2) + 10));
				(ops.way=='upDown') &&(itemheight=XQ.itheight(item),obj.width(w));
				(ops.way=='fade')  && (item.css({'top':0,'left':0,'position':'absolute'}),obj.css('position','relative'));
				ops.syncSlideOnOff && (ops.syncSlide.width?(syncSlideChild.width(ops.syncSlide.width)): (syncSlideChild.width(a)),ops.syncSlide.height?syncSlideChild.height(ops.syncSlide.height):syncSlideChild.height(b));
				ops.syncClassOnOff && (syncClassChild.width(a),syncClassChild.height(b),syncClass.width(a),syncClass.height(b),syncClassChild.eq(index_111).addClass(ops.syncClass.activeclass));
				
			}
		}
		function resize  () {
			size();
		 	play_(0);
		}
		if (item.size() <= ops.itemshow) {
			size();
			ii++;
			return;
		}
		  initItem();
		  size();
		  initWay();
		if(ops.mediascreenwidth){XQ.resize(resize)};
		//$(window).resize(size); //窗口改变尺寸改变
		
		
		if (ops.parallax) { /*若是需要一些视差，过度效果*/
			var csstext = '[data-x],[data-y]{transition: transform 1s cubic-bezier(0.215, 0.61, 0.355, 1),opacity 1s cubic-bezier(0.215, 0.61, 0.355, 1)  ;-webkit-transition: -webkit-transform 0.5s ease-out,opacity 0.5s ease-out ;}.active [data-x],.active [data-y]{transform:translate3d(0,0,0)!important;-webkit-transform:translate3d(0,0,0)!important;}.active [data-opacity]{opacity:1!important;filter:Alpha(opacity=100)!important;}';
			XQ.addcss(csstext);
			item.each(function () {
				/*若是需要一些视差，过度效果， data-delay是延迟属性，data-x/data-y是水平/垂直方向的比例取值范围（-1,1），data-opacity透明度变化*/
				$(this).find('[data-delay]').each(function () {
					$(this).css({
						'transition-delay': $(this).attr('data-delay'),
						'-webkit-transition-delay': $(this).attr('data-delay')
					});
				});
				$(this).find('[data-x]').each(function () {
					$(this).css({
						'transform': 'translate3d(' + $(this).attr('data-x') * item.width() + 'px,0,0)',
						'-webkit-transform': 'translate3d(' + $(this).attr('data-x') * item.width() + 'px,0,0)'
					});
				});
				$(this).find('[data-opacity]').each(function () {
					$(this).css({
						'opacity': $(this).attr('data-opacity'),
						'filter': 'Alpha(opacity=' + $(this).attr('data-opacity') * 100 + ')'
					});
				});
				$(this).find('[data-y]').each(function () {
					$(this).css({
						'transform': 'translate3d(0,' + $(this).attr('data-y') * item.height() + 'px,0)',
						'-webkit-transform': 'translate3d(0,' + $(this).attr('data-y') * item.height() + 'px,0)'
					});
				});
			});
		}
		//主程序
		if (XQ.CSS3 ) {
			obj.css({
				'transition': 'transform 0s cubic-bezier(0.215, 0.61, 0.355, 1)',
				'-webkit-transition': 'transform 0s cubic-bezier(0.215, 0.61, 0.355, 1)'
			});
		} else {
			ops.fortime = 0;
		}
		index_111=0;
		function play_(a, b) {
			if (!obj.is(':animated') && css3play) {
				if (ops.autotime > 0) { //判断是否自动滚动
					clearTimeout(play);
				}
			 	 var innerFlag=0;//作为判定0时不做判定，等于1是证明是到最后；需要往回转，等于-1时则是到了最前端，需要往后走；
			         item.removeClass('active');
			         index_111+=a;
			       var index=index_111+ops.rebegin-1;
			        ((index_111==con.leng+1)&& (a==1)) && (innerFlag=1,index_111=0);
			        ((index_111==-1)&& (a==-1)) && (innerFlag=-1,index_111=con.leng);
			        radio.children().eq(index_111).addClass(ops.radio_item_active).siblings().removeClass(ops.radio_item_active); //小点点的变换；
			        	setTimeout(function () {
			        		
				 innerFlag==-1 && item.eq(ops.itemshow-1).addClass('active');
				 innerFlag==1 && item.eq(ops.itemshow+con.leng+1).addClass('active');
				 ops.syncSlideOnOff && (setTimeout(function(){
					syncSlideChild.eq(index_111).css('z-index',1).fadeIn(ops.syncSlide.durTime);
					setTimeout(function(){syncSlideChild.eq(index_111).siblings().css('z-index',0).fadeOut(ops.syncSlide.durTime);},ops.syncSlide.durTime);
				},ops.syncSlide.delayTime));
				 try{
				ops.syncClassOnOff && syncClass.removeClass(ops.syncClass.classs.join(' ')||'').addClass(ops.syncClass.classs[index_111]||'syncObj');//同步加在class
			}catch(e){}
				ops.syncClassOnOff && syncClassChild.eq(index_111).addClass(ops.syncClass.activeclass).siblings().removeClass(ops.syncClass.activeclass);//同步加在class
				}, ops.fortime/2);
				setTimeout(function () {
					//index_111 = a ? index_111 + a : index_111 + 1; //三元判断，判断a是否存在给index——111赋值
					//b&&XQ.log(index_111+ops.itemshow)
					 item.eq(index_111+ops.itemshow).addClass('active'); //小点点的变换；
						//index_111 = index_111 >= item.size() ? 0 : index_111; //三元判断，判断index——111是是否在滚动数量范围内
						//newRun(a);
						//return;
					if(ops.way=='slide' || ops.way=='upDown'){
						if(ops.slideHeightAuto){
							obj.animate({height:item.eq(index+ops.itemshow).height()}, ops.time);
							obj.parent().animate({height:item.eq(index+ops.itemshow).height()}, ops.time);
						}

					 //判断是否在滚动中，不在，继续；
						if (XQ.CSS3) { //如果支持css3效果就用css3的效果来轮播不支持还用js来轮播,css3动画就是在需要动画时，规定transition-duration时间；不需要动画规定时间为0
							css3play = false; item.width();
							if(ops.way=='slide'){
								obj.css({
									'transition-duration': ops.time / 1000 + 's',
									'-webkit-transition-duration': ops.time / 1000 + 's',
									'transform': 'translate3d(' + (-1*itemwidth*(index+1)) + 'px,0,0)',
									'-webkit-transform': 'translate3d(' + (-1*itemwidth*(index+1)) + 'px,0,0)'
								});
							}else{
								obj.css({
									'transition-duration': ops.time / 1000 + 's',
									'-webkit-transition-duration': ops.time / 1000 + 's',
									'transform': 'translate3d(0,' + (-1*itemheight*(index+1)) + 'px,0)',
									'-webkit-transform': 'translate3d(0,' + (-1*itemheight*(index+1)) + 'px,0)'
								});
							}
							setTimeout(function () {
								obj.css({'transition-duration': '0s','-webkit-transition-duration': '0s'});
								if(ops.way=='slide'){
									 (innerFlag==-1) && (obj.css({
										'transform': 'translate3d(' + (-1*(con.leng+ops.rebegin)*itemwidth) + 'px,0,0)',
										'-webkit-transform': 'translate3d(' + (-1*(con.leng+ops.rebegin)*itemwidth) + 'px,0,0)'
									}));
						           			 (innerFlag==1) && (obj.css({
										'transform': 'translate3d(' + (-1*ops.rebegin*itemwidth) + 'px,0,0)',
										'-webkit-transform': 'translate3d(' + (-1*ops.rebegin*itemwidth) + 'px,0,0)'
									}));
						           	}else{
										(innerFlag==-1) && (obj.css({
										'transform': 'translate3d(0,' + (-1*(con.leng+ops.rebegin)*itemheight) + 'px,0)',
										'-webkit-transform': 'translate3d(0,' + (-1*(con.leng+ops.rebegin)*itemheight) + 'px,0)'
									}));
						           			 (innerFlag==1) && (obj.css({
										'transform': 'translate3d(0,' + (-1*ops.rebegin*itemheight) + 'px,0)',
										'-webkit-transform': 'translate3d(0,' + (-1*ops.rebegin*itemheight) + 'px,0)'
									}));
						           	}
								css3play = true;
                                                                                                        ops.callback&&ops.callback(index_111);
								if (ops.autotime > 0) { //判断是否自动滚动
									play = setTimeout(function(){play_(1);}, ops.autotime);
								}
							}, ops.time);

						} else { ////老版浏览器
							var dt=ops.way=='slide'?itemwidth:itemheight;
								var str=ops.way=='slide'?{'marginLeft':-1*itemwidth*(index+1)}:{'marginTop':-1*itemwidth*(index+1)};
								var stsr=ops.way=='slide'?'margin-left':'margin-top';
					        			obj.animate(str,function(){
							            /*如果索引值等于零；证明是处于开始的第二个*/
							            (innerFlag==-1) && (obj.css(stsr,-1*(con.leng+ops.rebegin)*itemwidth));
							            (innerFlag==1) && (obj.css(stsr,-1*ops.rebegin*itemwidth));
                                                                                                          ops.callback&&ops.callback(index_111);
								            if (ops.autotime > 0) { //判断是否自动滚动
										play = setTimeout(function(){play_(1);}, ops.autotime);
									}
							      	  });
						}
						
				      }else if(ops.way=='fade'){
				      	if(!fadeTime)return;
				      	fadeTime=false;
				      	//radio.children().eq(index_111).addClass(ops.radio_item_active).siblings().removeClass(ops.radio_item_active); //小点点的变换；
	 				obj.children().fadeOut(ops.time);
	 				obj.children().eq(index_111+ops.itemshow).delay(ops.time).fadeIn(ops.time,function(){
                                                                              ops.callback&&ops.callback(index_111);
	 					fadeTime=true;
	 					if (ops.autotime > 0) { //判断是否自动滚动
							play = setTimeout(function(){play_(1);}, ops.autotime);
						}
	 				});
				      }
				}, ops.fortime);
		      }
			
		}
		if (item.size() > ops.minitem && item.size() > ops.itemshow) {
			if (ops.autotime > 0) { //判断是否自动滚动
				play = setTimeout(function(){play_(1);}, ops.autotime);
				if (ops.hoverstop) {
					obj.hover(function () { //鼠标划上停止滚动
						clearTimeout(play);
					}, function () {
						play = setTimeout(function(){play_(1);}, ops.autotime);
					});
				}
			}
			//点击
			$(ops.next).eq(ii).click(function () {
				play_(1,true);
				//alert(obj.random)
			}); //点击下一个
			$(ops.prev).eq(ii).click(function () { //点击上一个
				play_(-1);
			});
			obj.touchwipe({ //手机上触控函数；在jq.xq.extend.js上；
				wipeLeft: function () {
					play_(1);
				},
				wipeRight: function () {
					play_(-1);
				},
				preventDefaultEvents: false
			});
			radio.on('click', '.' + ops.radio_item, function () { //给小点点绑定点击事件
				// if (ops.autotime > 0) {
				// 	clearTimeout(play);
				// }
				index_111=$(this).index();
				play_(0);
				// if (ops.autotime > 0) {
				// 	play = setTimeout(play_, ops.autotime);
				// }
			});
		} else {
			$(ops.prev).eq(ii).hide();
			$(ops.next).eq(ii).hide();
		}
		obj.children().eq(ops.itemshow).addClass('active').siblings().removeClass('active');
		if(ops.slideHeightAuto){
			radio.children().eq(0).trigger('click');
		}
                    ops.afterLoad&&ops.afterLoad();
		ii++;
	});
};
XQ.addcss = function (cssText) {
	var style = document.createElement('style'), //创建一个style元素
		head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
	style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
	if (style.styleSheet) { //IE
		var func = function () {
			try { //防止IE中stylesheet数量超过限制而发生错误
				style.styleSheet.cssText = cssText;
			} catch (e) {

			}
		};
		//如果当前styleSheet还不能用，则放到异步中则行
		if (style.styleSheet.disabled) {
			setTimeout(func, 10);
		} else {
			func();
		}
	} else { //w3c
		//w3c浏览器中只要创建文本节点插入到style元素中就行了
		var textNode = document.createTextNode(cssText);
		style.appendChild(textNode);
	}
	head.appendChild(style); //把创建的style元素插入到head中    
};
//吧时间戳转为日期年月日
XQ.getTime = function (nS) {
	var date = new Date(nS * 1000);
	var enMoon=['January','February','March','April','May','June','July','August','September','October','November','December'];
	var enMoonJ=['Jan.','Feb.','Mar.','Apr.','May.','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
	return {
		year: date.getFullYear(),
		moon: (date.getMonth() - 0 + 1),
		day: date.getDate(),
		hours: date.getHours(),
		mins: date.getMinutes(),
		secs: date.getSeconds(),
		dayTime: function (v) {
			v = v ? v : '-';
			return this.year + v + this.moon + v + this.day;
		},
		minTime: function (v) {
			v = v ? v : '-';
			return this.year + v + this.moon + v + this.day + ' ' + this.hours + v + this.mins;
		},
		secTime: function (v) {
			v = v ? v : '-';
			return this.year + v + this.moon + v + this.day + ' ' + this.hours + v + this.mins+ v + this.secs;
		},
		moonTime: function (v) {
			v = v ? v : '-';
			return this.moon + v + this.day;
		},
		en:function () {
			return{
				year:date.getFullYear(),
				moon:enMoon[date.getMonth()],
				moonJ:enMoonJ[date.getMonth()],
				day: date.getDate()+'th',
				hours: date.getHours(),
				mins: date.getMinutes(),
				dayTime: function (v) {
					v = v ? v : '  ';
					return this.year + v + this.moon + v + this.day;
				},
				minTime: function (v) {
					v = v ? v : '  ';
					return this.year + v + this.moon + v + this.day + v + this.hours + v + this.mins;
				},
				moonTime: function (v) {
					v = v ? v : '  ';
					return this.moon + v + this.day;
				},
				secTime: function (v) {
					v = v ? v : '-';
					return this.year + v + this.moon + v + this.day + ' ' + this.hours + v + this.mins+ v + this.secs;
				},

			};
		}
	};
};
XQ.animated = function (obj, cls) {
	var $this = $(obj);
	if ($this.find('.xq-animated').size() < 1) return;
	$this.find('.xq-animated').each(function () {
		var $$this = $(this);
		var opacity = $(this).attr('data-xq-opacity') ? $(this).attr('data-xq-opacity') : 1;
		var dx = $(this).attr('data-xq-x') ? $(this).attr('data-xq-x') : 0;
		var dy = $(this).attr('data-xq-y') ? $(this).attr('data-xq-y') : 0;
		var dz = $(this).attr('data-xq-z') ? $(this).attr('data-xq-z') : 0;
		var rotateX = $(this).attr('data-xq-rotateX') ? $(this).attr('data-xq-rotateX') : 0;
		var rotateY = $(this).attr('data-xq-rotateY') ? $(this).attr('data-xq-rotateY') : 0;
		var rotateZ = $(this).attr('data-xq-rotateZ') ? $(this).attr('data-xq-rotateZ') : 0;
		var scale = $(this).attr('data-xq-scale') ? $(this).attr('data-xq-scale') : 1;
		var delay = $(this).attr('data-xq-delay') ? $(this).attr('data-xq-delay') : 0;
		var duration = $(this).attr('data-xq-duration') ? $(this).attr('data-xq-duration') : 1;
		XQ.transform($$this, {
			opacity: opacity,
			translateX: dx,
			translateY: dy,
			translateZ: dz,
			rotateX: rotateX,
			rotateY: rotateY,
			rotateZ: rotateZ,
			scale: scale,
			delay: delay,
			duration: duration
		});

	});

	if ($this.find('.xq-animated').size() > 0) { /*若是需要一些视差，过度效果*/
		var csstext = '.xq-animated{transition: transform 1s cubic-bezier(0.215, 0.61, 0.355, 1),opacity 1s cubic-bezier(0.215, 0.61, 0.355, 1) ;-webkit-transition: -webkit-transform 1s ease-out,opacity 1s ease-out ;}' + cls + ' .xq-animated{transform:translate3d(0,0,0)!important;-webkit-transform:translate3d(0,0,0)!important;opacity:1!important;filter:Alpha(opacity=100)!important;}';
		XQ.addcss(csstext);
	}

};
XQ.transform = function (obj, options) {
	var config = {
		opacity: 1,
		scale:1,
		perspective: 1000,
		times: 0,//
		rotateX: 0,//X旋转
		rotateY: 0,//Y旋转
		rotateZ: 0,//Z旋转
		translateX: 0,
		translateY: 0,
		translateZ: 0,
		boxshadow: 'none',
		delay: 0,
		duration: 1,
		call: function () { }
	};
	if (options) $.extend(config, options);XQ.log(config.translateX)
	obj.css({ 
	        'transform':'perspective(' + config.perspective + 'px) translate3d(' + config.translateX + 'px,' + config.translateY + 'px,' + config.translateZ + 'px) rotateX(' + config.rotateX + 'deg) rotateY(' + config.rotateY + 'deg) rotateZ(' + config.rotateZ + 'deg) scale(' + config.scale + ')',
	        '-webkit-transform': 'perspective(' + config.perspective + 'px) translate3d(' + config.translateX + 'px,' + config.translateY + 'px,' + config.translateZ + 'px) rotateX(' + config.rotateX + 'deg) rotateY(' + config.rotateY + 'deg) rotateZ(' + config.rotateZ + 'deg) scale(' + config.scale + ')',
	        'transitionDelay': config.delay + 's',
	        '-webkit-transition-delay': config.delay + 's',
	        'transitionDuration': config.duration + 's',
	        '-webkit-transition-duration': config.duration + 's',
	        '-webkit-transition-property':'-webkit-transform',
	         'transitionProperty':'transform',
	        //'opacity': config.opacity,
	        'box-shadow': config.boxshadow
	    });
	    if(options.opacity){
	        obj.css({'opacity':config.opacity,
	        '-webkit-transition-property':'-webkit-transform,opacity',
	         'transitionProperty':'transform,opacity'});
	    }
};
XQ.amouse = function (obj, options) {//鼠标位置交互
	var config = {
		show:'ele',//可选值==bk,为bk时，子集可不选
		moveChild: null,
		ratio: 100,
		x:0,
		y:0,
		call: function () { }
	};
	if(!ltie9())return;
	if (options) $.extend(config, options);
	if ($(obj).size() <= 0) return;
	$(obj).each(function () {
		var fala=true;
		var $this = $(this);
		var moveChild = config.moveChild ? $this.find(config.moveChild) : 0;
		var starX,starY;
		$this.mousemove(function (e) {
			var moveX = parseInt((e.clientX - starX) / window.innerWidth * config.ratio);
			var moveY = parseInt((e.clientY - starY) / window.innerHeight * config.ratio);	
			runmove(moveX,moveY);
		});
		$this.mouseleave (function(){
			runmove(0,0,0.5,0.1);
			if(moveChild){
				moveChild.css({'transition':'background 0.35s,  transform 0.35s','-webkit-transition':'background 0.35s,  transform 0.35s'});
			}else{
				$this.css({'transition':'background 0.35s,  transform 0.35s','-webkit-transition':'background 0.35s,  transform 0.35s'});
			}
		});
		$this.mouseenter(function(e){
			  starX = parseInt(e.clientX );
			  starY = parseInt(e.clientY);
			  if(moveChild){
				moveChild.css({'transition':'background  0s, transform 0s','-webkit-transition':'background 0s,  transform 0s'});
			}else{
				$this.css({'transition':'background 0s,  transform 0s','-webkit-transition':'background 0s,  transform 0s'});
			}
		});
		
		function runmove (a,b,c,d){
			if(config.show=='ele' && moveChild){
				if(XQ.CSS3){
				XQ.transform(moveChild, {
					translateX: a,
					translateY: b,
					duration:c || 0,
					delay:d || 0
				});
				}else{
					moveChild.css({'left':a,'right':b});
				}
			}else{
				if(moveChild){
					moveChild.css({'background-position':(a-config.x)+'px '+(b-config.y)+'px'});
				}else{
					$this.css({'background-position':(a-config.x)+'px '+(b-config.y)+'px'});
				}
			}
		}
	});
};
XQ.resize=function  (fun,context) {
	var size=function (){
	 		clearTimeout(fun.tId);
		 	fun.tId=setTimeout(function  () {
		 		fun.call(context);
		 	},200);
	 	};
	 $(window).resize(size);
};
XQ.Parallax =function(options){//多组
	var config = {
		objs:'.xq-parallax',//有obj:对象,ri
		call: function () { }
	};
		/*data-xq-ratio: 1,//比例
		data-xq-min:,//最小高默认半屏
		data-xq-max:,//最大高默认半屏
		data-xq-addclass:'.xq-parallax-active'*/
	if (options) $.extend(config, options);
	if($(config.objs).length<1)return;
	$(config.objs).each(function(){
		var $this=$(this);
		var $config={
			ratio:($this.attr('data-xq-ratio')||0.3)-0,
			dirctive:$this.attr('data-xq-dirctive')||'none',
			min:$this.attr('data-xq-min')?($this.offset().top-($this.attr('data-xq-min')-0)):($this.offset().top-$(window).height()*2)-0,
			mid:$this.attr('data-xq-mid')?($this.offset().top-($this.attr('data-xq-mid')-0)+$this.height()/2):($this.offset().top-$(window).height()/2+$this.height()/2)-0,
			max:$this.attr('data-xq-max')?($this.offset().top-$(window).height()/2+$this.height()/2+($this.attr('data-xq-max')-0)):($this.offset().top+$this.height())-0,
			addclass:$this.attr('data-xq-addclass')||'xq-parallax-active',
                                duration:$this.attr('data-xq-duration')||0
		};
		$config.ratiox=($this.attr('data-xq-ratiox')||$config.ratio)-0,
		$config.ratioy=($this.attr('data-xq-ratioy')||$config.ratio)-0,
		$(window).resize(function(){
			$config.min=$this.attr('data-xq-min')?($this.offset().top-($this.attr('data-xq-min')-0)):($this.offset().top-$(window).height()*2)-0;
			$config.mid=$this.attr('data-xq-mid')?($this.offset().top-($this.attr('data-xq-mid')-0)+$this.height()/2):($this.offset().top-$(window).height()/2+$this.height()/2)-0;
			$config.max=$this.attr('data-xq-max')?($this.offset().top-$(window).height()/2+$this.height()/2+($this.attr('data-xq-max')-0)):($this.offset().top+$this.height())-0;
			$config.addclass=$this.attr('data-xq-addclass')||'xq-parallax-active';
			scrollauto();
		});
		function scrollauto(){
			var scrTop=$(window).scrollTop();
			if(scrTop>$config.min && scrTop<$config.max){
				$this.addClass($config.addclass);
				var y= (scrTop-$config.mid)*$config.ratioy;
				var x=(scrTop-$config.mid)*$config.ratiox;
				if(XQ.CSS3){
					css3dirct($this,$config.duration,$config.dirctive,x,y);
				}else{
					//iedirct($this,$config.dirctive,x,y);
				}
			}else{
				$this.removeClass($config.addclass);
			}
		}
		$(window).scroll(scrollauto);
		scrollauto();
	});
	function css3dirct(obj,duration,dirc,x,y){
		switch(dirc){
			case 'up':
				XQ.transform(obj,{duration:duration,translateX:x,translateY:Math.abs(y)*-1});
				break;
			case 'down':
				XQ.transform(obj,{duration:duration,translateX:x,translateY:Math.abs(y)});
				break;
			case 'vertical':
				XQ.transform(obj,{duration:duration,translateY:y});
				break;
			case 'left':
				XQ.transform(obj,{duration:duration,translateX:Math.abs(x)*-1,translateY:y});
				break;
			case 'right':
				XQ.transform(obj,{duration:duration,translateX:Math.abs(x),translateY:y});
				break;
			case 'horizontal':
				XQ.transform(obj,{duration:duration,translateX:x});
				break;
			case 'none':
				XQ.transform(obj,{duration:duration,translateX:x,translateY:y});
				break;
			default:break;
		}
	}
	function iedirct(obj,dirc,x,y){
		switch(dirc){
			case 'up':
				obj.css({top:Math.abs(y)*-1});
				break;
			case 'down':
				obj.css({top:Math.abs(y)});
				break;
			case 'vertical':
				obj.css({top:y});
				break;
			case 'left':
				obj.css({left:Math.abs(x)*-1});
				break;
			case 'right':
				obj.css({left:Math.abs(x)});
				break;
			case 'horizontal':
				obj.css({left:x});
				break;
			case 'none':
				obj.css({top:y,left:x});
				break;
			default:break;

		}
	}
};
XQ.getParm=function (url){
      var u=url.split('?')[1];
      if(u){
        return this._getParmJSON(u);
      }else{
        return false;
      }
    }
XQ.getParmJSON=function(par){
      var arry=par.split('&');
      var JSON={};
      for(var i=0;i<arry.length;i++){
          var a=arry[i].split('=');
          JSON[a[0]]=a[1];
      }
      return JSON;
}
function Fun(){
	if(!this instanceof Fun){
		return new Fun();f
	}
	this.version='0.0.1';
}
Fun.prototype={//todo yincangshi 
	showImg:function(config){
		config=config||{};
		config.auto=config.auto||true;
		config.obj=config.obj||'.showbigimg';
		if($(config.obj).size()<1)return;
		$(config.obj).css('cursor','-webkit-zoom-in');
		$(config.obj).click(function(){
			var $this=$(this);
			var imgOffsetLeft=$(this).offset().left;
			var imgOffetTop=$(this).offset().top-$(window).scrollTop();
			var imgwidth=$(this).width();
			var imgheight=$(this).height();
			$('body').append('<div id="showBigImgzc" style="display:none"></div><img style="cursor:-webkit-zoom-out" id="showBigImg" src="" alt="" />');
			$('#showBigImgzc').css({position:'fixed',top:0,left:0,width:$(window).width()>$('body').width()?$(window).width():$('body').width(),height:$(window).height(),zIndex:'222',background:'#000',opacity:'0.5',filter:'Alpha(opacity=50)'});
			$('#showBigImg').css({width:$(this).width,height:$(this).height(),left:imgOffsetLeft,top:imgOffetTop,position:'fixed',zIndex:'333'}).attr('src',$(this).attr('src'));
			var realWidth,realHeight,r;
			$('<img/>').attr('src', $this.attr('src')).load(function() {
					realWidth=this.width;realHeight=this.height;
					r=realWidth/realHeight;
					if(!!config.auto){
						var wobj=getMax(realWidth,realHeight,r);
						show(wobj.width,wobj.height);
					}else if(!config.imgWidth){
						show(realWidth,realHeight);
					}else{
						config.imgHeight=config.imgWidth/r;
						show(config.imgWidth,config.imgHeight);
					}
			});
			
			function show(w,h){
				$('#showBigImg').animate({width:w+'px',height:h+'px',top:'50%',left:'50%',marginLeft:-w/2+'px',marginTop:-h/2+'px'},500).fadeIn();
				$('#showBigImgzc').fadeIn(500);
			}
			function getMax(w,h,i){
				var ww=$(window).width(),wh=$(window).height();
				var rw=w/ww,rh=h/wh;
				if(rw>=rh){
					w=ww;
					h=ww/i;
				}else{
					h=wh;
					w=wh*i;
				}
				return {height:h,width:w};
			}
			$('#showBigImgzc,#showBigImg').click(function(){
				$('#showBigImg').animate({width:imgwidth,height:imgheight,left:$this.offset().left,top:$this.offset().top-$(window).scrollTop(),marginTop:0,marginLeft:0},500,function(){
					$('#showBigImg').remove();
				});
				$('#showBigImgzc').fadeOut(500,function(){
					$('#showBigImgzc').remove();
				});
			});
			
		});
	},
	ltie9:(function(){
		        return !!(navigator.appName == 'Microsoft Internet Explorer' && navigator.appVersion.split(';')[1].replace(/[ ]/g, '') == 'MSIE6.0' || navigator.appName == 'Microsoft Internet Explorer' && navigator.appVersion.split(';')[1].replace(/[ ]/g, '') == 'MSIE7.0' || navigator.appName == 'Microsoft Internet Explorer' && navigator.appVersion.split(';')[1].replace(/[ ]/g,'') == 'MSIE8.0' || navigator.appName == 'Microsoft Internet Explorer' && navigator.appVersion.split(';')[1].replace(/[ ]/g, '') == 'MSIE9.0');
	})(),
	inputInit:function(){
		 if(this.ltie9){
		$('input[type="text"],textarea').each(function(){
			var $this=$(this);
			$this.parent().css('position','relative');
			var $span=$('<span></span>');
			 $span.css({
				display:'block',
				width: $this.width(),
				height:$this.height(),
				position:'absolute',
				left:$this.position().left,
				lineHeight:$this.css('line-height'),
				color:'#999',
				zIndex:1,
				textAlign:$this.css('text-align'),
				background:$this.css('background'),
				fontSize:$this.css('font-size'),
				padding:$this.css('padding'),
				marginTop:$this.css('margin-top'),
				marginLeft:$this.css('margin-left'),
				textIndent:$this.css('text-indent'),
				top:$this.position().top
			}).text($this.attr('placeholder'));
			$this.before( $span);
			$this.css({zIndex:2,position:'relative',background:'none'});
		})
		$('input[type="text"],textarea').keyup(function(){
			if($.trim($(this).val())==''){
				$(this).prev().css('color','#999');
			}else{
				$(this).prev().css('color',$(this).prev().css('background-color'));
			}
		})

		 }
	},
	selectInit:function(options){
		var span="<span></span>";
		options=options||{border:'1px #ccc solid',borderRadius:'5px'};
		var $select=$('select');
		$select.each(function(){
			var $this=$(this);
			XQ.log($this.outerWidth(true) - $this.outerWidth() )
			var width_=$this.width();
			var height_=$this.height();
			$this.parent().css('position','relative');
			var left_=$this.position().left;
			var top_=$this.position().top;
			var val=$this.val();
			var $span=$('<span></span>');
			$span.css({width:width_,height:height_,position:'absolute',left:left_,top:top_,marginTop:$this.css('margin-top'),
				marginLeft:$this.css('margin-left'),fontSize:$this.css('font-size'),
				padding:$this.css('padding'),textIndent:$this.css('text-indent'),textAlign:'center',lineHeight:height_+'px'}).css(options).html(val);
			$this.css({opacity:0,filter:'Alpha(opacity=0)'});
			$this.before($span);
			$span.click(function(){
				$this.trigger('click');
			})
		});
		$select.change(function(){
			$(this).prev().html($(this).find('option:checked').html());
		})
	},
	alert:function(text,fun) {
	        //var text='输入错误，请从新输入'
	        var message='';
	        var title='网页提醒！';
	        var top_='50%';
	        var Bcolor='#ccc';
	        var Fcolor='#333';
	        if('string'==typeof text ){
	            message=text;
	        }else{
	            message=text.text;
	            title=text.title||title;
	            Bcolor=title.Bcolor||Bcolor;
	            Fcolor=title.Fcolor||Fcolor;
	            switch(text.position){
	                case 'top': 
	                top_='30%';
	                break;
	                case 'center':
	                top_='50%';
	                break;
	                default :
	                top_='50%';
	                break;
	            }
	        }
	        var str='<div id="showAlert" style="position:fixed;top:50%;left:50%;z-index:88888888888;max-width:440px;min-width:300px;border:1px solid #eee;padding:0 0 20px;background-color:#fff;border-radius:3px;opacity:0;"><p style="display:block;margin:0 auto;height:46px;line-height:46px;text-align:center;font-size:16px;color:'+Fcolor+';background-color:'+Bcolor+';">'+title+'</p><div style="padding:36px 20px;margin:0 auto;"><p style="display:block;margin:0 auto;font-size:12px;color:'+Fcolor+';text-align:center;">'+message+'</p></div><span id="closeAlert" style="width:100px;height:36px;line-height:36px;font-size:14px;color:'+Fcolor+';display:block;margin:0px auto;border-radius:3px;text-align:center;background-color:'+Bcolor+';border:1px solid #eee;cursor:pointer;">确定</span></div>';
	        $('body').append(str);
	        $('#showAlert').css({marginTop:-$('#showAlert').height(),marginLeft:-$('#showAlert').height()/2});
	        $('#showAlert').animate({'marginTop':-$('#showAlert').height()/2,opacity:1});
	        $('#closeAlert').click(function (){
	            $('#showAlert').animate({'marginTop':-$('#showAlert').height(),opacity:0},function () {
	                $('#showAlert').remove();
	                fun&&fun();
	            });
	        });
	    },
	 formTest:function (ops) {//需要加SlothTest类
	 	var defaultOps={SlothTel: /^1[34578][0-9]{9}$/,
	 			SlothMail:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	 			SlothNum:/^[1-9]\d*|0$/,
	 			SlothFoolr:/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/,
	 			SlothNull:''
	 			};
	 	var config=$.extend(defaultOps,ops);
	 	  for(var key in config){
		            (function (i) {
		                $('.'+i).on('blur',function () {
		                var $this=$(this);
		                var val=$.trim($this.val());
		               if(val===''){
				checkFail($this,$this.attr('nullMsg'));
		               }else{
		                    if(typeof(config[i])=='object' && !isOk(config[i],val)){
		                       checkFail($this,$this.attr('errMsg'));
		                    }else{
		                        checkOk($this);
		                    }
		               }
		               
		             });
		            })(key);
		            
		        }
	 	function isOk (reg,txt) {
	 		return reg.test(txt);
	 	}
	 	function checkFail (obj,text) {
	 		 if(!obj.next().hasClass('SlothInfo')){
	 		 	obj.attr('SlothFormTest','false').after('<span class="SlothInfo" style="color:red;font-size:14px;margin-left:5px;">'+(text||'')+'</span>');
	 		 }else{
	 		 	obj.next('.SlothInfo').html(text||'');
	 		 }
	 	}
	 	function checkOk (obj) {
	 		obj.attr('SlothFormTest','true').next('.SlothInfo').remove();
	 	}
	 	return{
	 		check:function  (o) {
	 			var obj=o||'body';
	 			var SlothFlag=true;
	 			$(obj).find('.SlothTest').each(function  (i) {
	 				if($(this).val()===''){
	 					checkFail($(this),$(this).attr('nullMsg'));
	 					SlothFlag=false;
	 				}
	 				if($(this).attr('SlothFormTest')=='false') {
	 					checkFail($(this),$(this).attr('errMsg'));
	 					SlothFlag=false;
	 				}
	 			});
	 			return SlothFlag;
	 		}
	 	};
	 },
	 resize:function (fun,context) {
	 	var size=function (){
	 		clearTimeout(fun.tId);
		 	fun.tId=setTimeout(function  () {
		 		fun.call(context);
		 	},100);
	 	};
	 	size();
	 	$(window).resize(size);
	 	
	 },
	 AutoWrite:function  () {
	 	var AutoWrite = function () {
		  this.fun = '自动打印字';
		  this.i = 0;
		  this.loop = false;
		  this.times = 1;
		  this.doWork = function (str, i) {
		    var this_ = this;
		    i = i || 0;
		    var str1 = this.isArry ? str[i] : str;
		    this.obj.html(str1.substr(0, this_.i));
		    if (this_.i == str1.length) {
		      if (i == this_.l) {
		        return this_.autoLoop();
		      }
		      i++;
		      this_.i = 0;
		      this_.nextTimeDo(str, i);
		    } else {
		      this_.i++;
		      this_.timeDo(str, i);
		    }
		  };
		  this.timeDo = function (str, i) {
		    var this_ = this;
		    setTimeout(function () {
		      this_.doWork(str, i);
		    }, 300);
		  };
		  this.nextTimeDo = function (str, i) {
		    var this_ = this;
		    setTimeout(function () {
		      this_.doWork(str, i);
		    }, 2000);
		  };
		  this.begin = function (arrStr, obj, times) {
		    this.obj = $(obj);
		    this.arry = arrStr;
		    'string' == typeof arrStr ? this.isArry = false : this.isArry = true;
		    this.l = this.isArry ? (arrStr.length - 1)  : 0;
		    if (times) {
		      if ('number' == typeof times) {
		        this.times = times;
		        this.agotime = 1;
		      } else if (times == 'infinate') {
		        this.loop = true;
		        this.stopLoop = function () {
		          this.loop = false;
		        };
		      }
		    }
		    this.doWork(arrStr);
		    return this;
		  };
		  this.autoLoop = function () {
		    var this_ = this;
		    if (this.loop) {
		      this.i = 0;
		      setTimeout(function () {
		        this_.doWork(this_.arry);
		      }, 1000);
		    } else if (this.times && (this.agotime < this.times)) {
		      this.i = 0;
		      this.agotime++;
		      setTimeout(function () {
		        this_.doWork(this_.arry);
		      }, 1000);
		    }
		  };
		  if (!(this instanceof AutoWrite)) {
		    return new AutoWrite();
		  }
		  return this;
		};
		return AutoWrite;
	 }()
};
XQ.Fun=Fun;
XQ.Toast=(function(win,doc){
      var code1='<div id="toast" style="max-width:250px;line-height: 22px;transition:opacity 0.2s  ease,bottom 0.4s cubic-bezier(0.65, 0.5, 0.55, 1.3),top 0.4s  cubic-bezier(0.65, 0.5, 0.55, 1.3);bottom:0;top:0;position:fixed;background:#000;color:#fff;padding:10px 20px;background:rgba(0,0,0,.8);border-radius:5px;-webkit-transition::opacity 0.2s  ease,bottom 0.4s cubic-bezier(0.65, 0.5, 0.55, 1.3),top 0.4s  cubic-bezier(0.65, 0.5, 0.55, 1.3);font-size:14px;text-align:center;z-index:1000000;opacity:0;visibility:hidden;box-sizing:content-box;">';
      var code2='</div>';
      function  Toast() {
        this.author='SlothSilence';
        this.body=doc.getElementsByTagName('body')[0];
      }
      function getStyle (obj,styles) {
        return parseInt(obj.currentStyle? obj.currentStyle : win.getComputedStyle(obj, null)[styles]);
      }
      function animate (obj,styles,val) {
        var a=parseInt(obj.currentStyle? obj.currentStyle : win.getComputedStyle(obj, null)[styles]);
        var i;
        XQ.log(a);
        if(styles &&styles=='opacity'){
          i=a>val?-0.1:0.1;
        }else{
          i=a>val?-1:1;
        }
        var j=a-val;
      }
      Toast.prototype={
        show:function  (val,vertical) {
          var str=code1+val+code2,_=this;
          var d=doc.createElement('div');
          d.innerHTML=str;
          _.body=_.body?_.body:doc.getElementsByTagName('body')[0];
          _.body.appendChild(d);
          var div=d.getElementsByTagName('div')[0];
          var width_=getStyle(div,'width')+40;
          div.style.marginLeft=-width_/2+'px';
          div.style.left='50%';
          if(vertical=='bottom'){
            div.style.bottom='50px';
            div.style.top='auto';
          }else if(vertical=='top'){
            div.style.bottom='auto';
            div.style.top='50px';
          }else{
            div.style.bottom='auto';
            div.style.top='50%';
          }
          div.style.opacity=1;
          div.style.visibility='visible';
          setTimeout(function  () {
            div.style.opacity=0;
            setTimeout(function  () {
             _.body.removeChild(d);
            }, 1000);
          },2000);
        },
        showShortBottom:function  (val) {
          this.show(val,'bottom');
        },
        showShortTop:function  (val) {
          this.show(val,'top');
        },
        showShortCenter:function  (val) {
          this.show(val);
        }
      };
      return new Toast();
    })(window,document);
window.Sloth=XQ;
(window.console&&window.console.log)?console.log('This SlothJs version is "'+Sloth.version+'",thanks you can use it '):'';
})(window,jQuery);
$('body').append('<script language=javascript src="http://cdn.bootcss.com/jquery-easing/1.3/jquery.easing.min.js"></script>'); 
;(function(window,$){
	var Sloth=window.Sloth||{};
	function autoa () {
		
	}
	autoa.prototype.log=function  (v) {
		XQ.log(v);
		XQ.log('asd'+v);
		return this;
	} ;
	Sloth.autoa=autoa;
	window.Sloth=Sloth;
})(window,jQuery);
var XQ=Sloth;