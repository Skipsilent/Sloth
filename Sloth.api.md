# Sloth v-0.0.3 API---需要jq库
#### 这次改动删除了一些简单的方法，保留一些被依赖的方法；使用本插件库需要加载Jq才可以正常运行；
这次增加了扩展方法的编写方式
若使用了构造函数

    (function($,Sloth){
        var Sloth=Sloth||{};
        function YouPlagin () {
        }
        YouPlagin.prototype.log=function  (v) {
        }
        Sloth.YouPlagin=YouPlagin;
    })(jQuery,Sloth)
记得在使用时用new关键字声明：例如

    var sloth=new Sloth.YouPlagin();

或

    (function($,Sloth){
        var Sloth=Sloth||{};
        varYouPlagin={}
        YouPlagin.log=function  () {}
        Sloth.YouPlagin=YouPlagin;
    })(jQuery,Sloth)

---
### 1、Sloth.autoWidth(obj,b)
    据子集自动宽度a是父级，b是子集

---
### 2、Sloth.WinW 
    窗体宽度

---
### 3、Sloth.WinH 
    窗体高度

---
### 4、Sloth.autoWinW（obj）
    自动为窗口宽度 ~obj是元素

---
### 5、Sloth.autoWinH （obj）
       自动为窗口高度~ obj是元素

---
### 6、Sloth.goTop（obj,b）
    滚动到设定的距离显示回到顶部按钮，点击回到顶部~a是元素，b是距离比
    
    `Sloth.goTop('#gotop','0.6');`    
 
---
### 7、Sloth.scrollShow（obj,b）
    滚动到某个位置显示元素~obj是元素，b是距离比是整屏的比例；
    `Sloth.scrollShow('.scrollShow','0.6')`

---
### 8、Sloth.scrollFixed(a,b,c)
    滚动距离来判定添加减少类型~a是元素，b是距离；c是变换的类名（当到某个位置会添加这个类名）
    `Sloth.scrollFixed('.scrollShow','0.6'，'fixed')`
    
---
### 9、Sloth.scrollTop
    获取滚动条高度
### 10、Sloth.banFade(a,b,c,d)
     a 是容器，b是容器内变化的子集，c是间隔时间，d是从第几个开始
     （需要自己规定样式；这个仅仅是一个小的js，原本被去掉的，但有的项目使用过，为了维护暂存起来了）

---
### 11、Sloth.setCookie (name,val,time,path)
    简单的写入cookie ~name是名称；val是值，time是存活时间'd1'是一天,'h12'是12小时,path默认是根目录
    `Sloth.setCookie ('user','Sloth','d30','/login')`

---
### 12、Sloth.getCookie（name）
    简单获取cookie~name是名称;

---
### 13、Sloth.removeCookie（name）
    简单移除cookie~name是名称

---
### 15、Sloth.clickShow (a, b, c, d)
    点击显示隐藏~a是点击显示按钮，b是点击隐藏按钮，c是执行元素(数组形式)，d是回调函数

---
### 16、Sloth.Agent是判断浏览器类型；里面有两个对象{isMobile,isAndroid,isIos}
    Sloth.moborpc()
    判断是否是移动端：true是移动端；

---
### 17、Sloth.timeAuto(Fun,b);
    (为了避免有时候程序执行时没有准确获取到数据)
    延时执行，并且重复执行，时间大于3000秒后停止执行~Fun是回调函数，b是时间间隔默认为300；

---
### 18、Sloth.download(Fun,time)
    当所有资源都OK后执行；~Fun是回调函数,time是超过多长时间会会自动执行；

---
### 19、Sloth.slideItem(obj, options)
    banner滚动一=>obj是滚动元素;options是配置文档内有函数：

            autoplay: false, //是否自动播放
            times: 3000, //自动播放间隔时间
            hoverstop: true, //鼠标悬浮停留
            flag: null, //
            container: null, //slide容器的类名
            slide: null, //滚动的类名
            item: null, //子集的类名
            itemindex:3,//滚动数量
            media: false, //是否在什么尺寸进行地洞滚动；
            min_width: 0, //滚动失效的最小尺寸；
            next: null, //下一个按钮的类名
            prev: null //前一个按钮的类名



---
### 20、Sloth.switchOver(obj, options)
        点击切换列表~obj是一个字符串，多个元素以逗号“,options是配置项：
                classs: 'dq', //切换当前的选中状态的class
                switchs: false, //是否切换相应的内容
                obj2: false, //切换的内容/可以是其父级的类、id，按照索引值进行切换，或者是数组(类名或id组成)，按照索引值对应数组进行切换
                call: function() {} //你懂得...

---
### 21、Sloth.popup(option)
        弹出框~options是配置项：


            obj: '', //点击
            popup_zc: '', //弹出遮层
            popup: '', //弹出框
            closes: '', //关闭按钮
            mobile: true, //手机上执行
            ways: 'fade', //出现方式可以是fade可以是左右上下
            num: 0, //若是左右上下那就输入相应数值
            showbefore: function() {
                return true
            }, //打开前执行...
            showafter: function() {}, //打开后执行...
            closebefore: function() {
                return true
            }, //关闭后执行...
            closeafter: function() {}, //关闭后执行...
            call: function() {}



---
### 22、Sloth.trim(a)
        去除空格 ~a是字符串

---
### 23、Sloth.placeholer()
        判断是否支持placeholer

---
### 24、Sloth.autoSlide (options)一般不单独用
        自动生成导航小点点~options是配置项：


            obj: '', //自动生成导航点点的父级元素，
            obj_ul: '', //自动生成的个数父级；
            obj_class: 'switch', //点点class
            obj_class_active: 'switch-active', //点点class
            obj_code: '' //点点的代码



---
### 25、Sloth.itwidth(a)
        一个元素的宽度:~a是元素包含内外边距

---
### 26、Sloth.slide (options)


        banner滚动二~配置项：
                obj: '', //滚动元素
        // item:'',//子集的类名（已移除）
        way:'slide',//转变形式 有fade upDown
        radio: null, //分页符==俗称小点点的父级
        next: null, //下一个按钮的类名
        prev: null, //前一个按钮的类名
        minitem: null,//最小个数
        parent: 'body',//需要传一个父级元素，当一个页面同时有两种共同滚动时；
        autotime: 5000, //自动播放时间，0时为不滚动
        ways: 'linear', //动画效果；
        fullScreen: false, //整屏显示 整屏显示 宽度是窗口宽度，高度为窗口高度
        autoHeight: 0,//自动获取高度 0 为自动获取父级高度
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
        syncSlide:{
            way: 'fade',//连同变换的方式
            durTime:600,//变化单个时间
            delayTime:0,//延迟时间
            width:null,
            height:null,
            obj: null//连同主要对象
        },
        syncClassOnOff:false,//同步变化class的开关
        syncClass:{
            obj:null,
            classs:[]
        },//同步变化class的开关
        call: function () { }
                
                
            此方法有动画在需要动画上元素上添加parallax为true  元素上添加 
                data-x  x方向动的范围；
                data-opacity  透明度
                data-y  y方向动的范围
                data-delay  延迟时间


                例子：


                    
               < div class="modul modul-banner-3 banner-container w100">
                   < div class="banner-ul-2 swiper-container pos-r">
                       < ul class="swiper-wrapper">
                           < li class="swiper-slide pos-r" style="background:url()">
                               < div class="img pos-a">
                                   < img src="../resource/images/movie-banner.jpg" alt="" />               
                               < /div>
                               < div class="w1000 margin pos-r">
                                   < div class="row">
                                       < div class="col-md-12 col-sm-12 col-xs-12 text-center">
                                           < p data-delay='0s' data-opacity='0'  data-y=0.3 >
                                               < img src="../resource/images/movie-banner-img-1.png" alt="" />               
                                           < /p>
                                       < /div>
                                   < /div>
                               < /div>
                           < /li>
                       < /ul>
                       < span class="pos-a next rounded but iconfont icon-right">⁢/span>
                       < span class="pos-a prev but rounded iconfont icon-left">⁢/span>
                       < div class="ppp">⁢/div>
                   < /div>
               < /div>
            Sloth.slide({ //第三版banner
                    obj: '.modul-banner-3 .banner-ul-2 > ul',
                    fortime:400,
                    autotime: 000,
                    next: '.banner-ul-2 .next',
                    radio:'.modul-banner-3  .ppp',
                    size: true,
                    prev: '.banner-ul-2 .prev'
                });



---
### 27、Sloth.addcss (a)
        在页面中增加css样式表 style  ~a是样式

---
### 28、Sloth.getTime(a)
        把时间戳转为日期年月日,返回一个对象：


        {
           "year":年,
        "moon": 月 ,
        "day": 日,
        "hours": 时,
        "mins":分，
        "dayTime(v)":年月日,
        "minTime(v)":年月日 十分
        "secTime(v)":年月日 时分秒
        "moonTime(v)":月日//v是连接符；
        em:是英文下显示；英文下的年月日与上述一样
        }
        


---
### 29、Sloth.animated(a,b)
        做页面特效用；a是总的元素；b是变换的类名；仅仅支持css3属性
        在需要的元素上添加Sloth-animated类名；将针对所有类名Sloth-animated进行操作；
         变量有：


            data-Sloth-opacity 透明度
            data-Sloth-x、data-Sloth-y、data-Sloth-z 三个方向的变化
            data-Sloth-rotateX、data-Sloth-rotateY 、data-Sloth-rotateZ 三个方向的角度
            data-Sloth-scale 缩放
            data-Sloth-delay 延迟时间
            data-Sloth-duration 持续时间

---
### 30、Sloth.transform(obj,options)
        css变化的东西 主要是辅助其他程序 obj 是操作的元素；options 配置项


                    opacity:1,
                    perspective:1000,
                    times:0,//
                    rotateX:0,//X旋转
                    rotateY:0,//Y旋转
                    rotateZ:0,//Z旋转
                    translateX:0,
                    translateY:0,
                    translateZ:0,
                    boxshadow:'none',
                    delay:0,
                    duration:1,
                    call:function  () {}



---
### 31、Sloth.amouse(obj,options);
        鼠标跟随效果；


        obj滑动元素
        show:'ele',//可选值==bk,为bk时，子集可不选
        moveChild: null,
        ratio: 100,
        x:0,
        y:0,
        call: function () { }


---
### 32、XQ.resize()
        类似window.resize();
        加入缓存机制，节省性能

---
### 33、XQ.getParm(url)
        获取链接的参数以json形式返回；
        
---       
### 34、XQ.Toast()
    吐司提示信息；
    showShortBottom()在底部显示信息
    showShortTop()在顶部显示信息
    showShortCenter()在中间显示信息
    
## 集成方法
### FUN，对象
#### showImg(config)
    点击查看大图

     {
     obj:'showbigimg',
     auto:true/自动适应高宽
     
     }
     
#### inputInit();
    初始化input框，兼容ie7的holdplaer
    
#### selectInit();
    初始化select框，美化select框
    
#### formTest(ops)    
    form表单的输入判断
    需要传入正则;
    默认有（加入类名即可）
    SlothTel，电话正则
    SlothMail，邮箱正则
    SlothNum，数字正则
    SlothFoolr，浮点数正则
    SlothNull，为空正则
    属性内部
    nullMsg:为空提示信息
    errMsg:为空提示信息
    nullMsg:为空提示信息
    
#### AutoWrite()
    文字打印字
##### begin(arrStr, obj, times)
        开始使用
        arrStr是要打印的字符串
        obj是要在哪个容器中打印
        times次数
##Jq.Sloth V-1.0.1 ||(c) 2016 
Jq 扩展插件--基于JQuery
 
---
### 1、    $().imgfall(setting)
        （*）照片墙瀑布流，检测元素是否添加。配置项setting有：


            itemsize:2,//排几列
            pc:false, pc是否支持
            mob:true  手机是否支持

            例子：
                $(obj).imgfall();



---
### 2、  $().getDate(set)
            页面滚动底部加载数据：配置：


                height:200,//滚到那里触发事件
                url:'',//加载链接
                attribute:undefined,//父级属性值中获取参数
                time:1500,//请求间隔
                call:function(){}

                例子：
                $(obj).getDate({
                      url:'list.htm?id=5',
                      call:function(){
                            console.log('数据请求完毕');
                      }
                })


---
### 3、$().hoverTrans();
        划过图片翻转：


              hoverchild:null,//划过元素
                child:null,//旋转元素
                time:500,
                image:null,图片
                txt:null,文字
                fade:false,//使用渐隐渐现；
                boxshadow:'none'

                结构是


                  <div class="row hoverTrans"  >
                   <div class=" image-txt" data-wow-delay='0.6s'>
                               <div class=" image-txt">
                                       <div class="abc-div pos-r">
                                            <img src="../resource/images/movie-img2.jpg" alt=""  class="img" />
                                            <div class="pos-a content wh100  txt pos-a tl0 one">
                                                    <div class="two">
                                                            <a class="three" href="">
                                                            <p class="title">《敢死队2》The Expendables2  </p>
                                                            <p>在此次第三部的故事中，巴尼（史泰龙饰）与克里斯马斯（杰森·斯坦森饰）领衔的敢死队将正面迎战昔日战友、如今</p>
                                                        </a>    
                                                    </div>
                                            </div>      
                                    </div>
                               </div>
                    </div>
               </div>
                $('.hoverTrans').hoverTrans({
                        hoverchild:'.image-txt',
                        child:'.abc-div',
                        image:'.img',
                        fade:true,
                        txt:'.txt',
                        time:700
                    });
   

   ---
 ### 4、 $().fullimg ()
        图片缩放，拉伸；配置：


                classs: 'fullimg', //图片新建容器的类名
                width: null, //图片缩放宽度，可以是'auto' 'window'
                height: null, //图片缩放高度，可以是'auto' 'window'
                fullScreen: false, //是否是整屏
                resize: false, //是否随屏幕尺寸改变时改变 true 、false
                align: 'center', //对齐方式,显示图片的 center、left、right
                vertical: 'mid', //垂直对齐方式，显示图片的top mid  bottom
                stretch: false, //是否拉伸
                call: function() {
                    return false
                }
            
            例子：
                需要仅显示 图片大小直接配置高宽位置
            $('.modul-banner-2 .banner-ul-2 ul li .img img').fullimg({
                    resize: true,
                    fullScreen: true
                })
    

---
### 5、$().alignBottom(opa)
        居下显示；配置：


            ways: 'margin-top', 方式
            error: 0, 误差
            call: function() {
                return false
            }


---
### 6、$().alignMid(ops)
        居中显示    
        以下为该插件的属性及其默认值


            borderbox: false,
            ways: "margin-top", //
            minwidth: 0, //执行范围当宽度小于某个值不执行；
            error: 0, //误差
            time: 300, //多次延时执行间隔
            call: function() {
                return false
            }


---
### 7、$().alignCenter(opa)
        两边居中，配置


            float: 'left',
            children: false, //是否有子元素
            position: false, //是否定位显示
            error: 0, //误差
            vertical: false, //是否上下居中
            midways: 'margin-top', //要是上下居中的方式
            call: function() {
                return false
                }


---
### 8、    $().flexbox(oap)
        平均分配子集的位置；


                     width: false,
            autowidth: true,
            way: 'margin',
            resize: false,
            call: function() {
                return false
            }


---
### 9、   $().imgLoad(ops)


        time: 4000, ///等待载入时间，如果超过这个时间就直接执行回调  
                callback: function() {} //默认回调  
        图片加载完后执行   
---
### 10、   $().parallax()
        视滚动差效果


             ratio: 0.5, //移动比例
            direct: 'down', //移动方向-可选up/down/left/right/leftdown/leftup/rightup/rightdown
            max_top: 600, //范围最大值
            min_top: -1, //范围最小值
            Screen:false,//是否已屏幕
            maxScreen:2,//第几瓶结束
            minScreen:1,//第几瓶开始
            addclass:'',//达到最大小于最小是添加的class
            call: function() {}
    
        例子：
        $('.modul-nav-2').parallax({
        ratio:0,
        max_top:600,
        addclass:'bk-nav'
        })

