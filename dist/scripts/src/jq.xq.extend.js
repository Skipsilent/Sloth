
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