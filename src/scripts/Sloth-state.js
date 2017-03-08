(function(Sloth){
  var Sloth=Sloth||{};
  Sloth.state={
        config:{},//缓存数值
        setConfig:function(option){
          var type_=typeof option;
          var that=this;
            if(type_ =='object'){
              //获取本页页面名字
               var pathname_=window.location.pathname;
              pathname_=pathname_.split('/');
              pathname_=pathname_[pathname_.length-1];
              /*写入页面简单路由配置到缓存*/
              for(var key in option){
                  that.config[key]={
                    template:option[key].template||'',
                    paramFormat:option[key].param||'',
                    param:_paramtoJson(option[key].param||''),
                  };
                  /*判断当前页面的参数值*/
                  if(pathname_==option[key].template){
                    _getParamFormatJson(that.config[key].param);
                  }
              }
            }else{
              console.warn(new Error('使用state.setConfig函数去设置页面跳转需要 传入{}对象，而不是'+type_));
            }
            function _paramtoJson(val){
              var s_=val.split('\/');
              var p_=[];
              for (var i=0;i<s_.length;i++){
                if(s_[i]!=''){
                    p_.push(s_[i]);
                }
              }
              return p_;
            }
            function _getParamFormatJson(arry){
              var hash_=window.location.hash;
              log(pathname_);
              if(hash_!=''){
                var s_=hash_.split('/');
                for(var i=0;i<arry.length;i++){
                    that.params[arry[i]]=s_[i+1]||'';
                }
              }else{
                return {}
              }
            }
        },
        params:{},
        go:function(url,param){
          var config=this.config[url];
          param=param||{};
          if(config){
            var url_str='';
            for(var key in config.param){
                 url_str+='/'+param[key]||'';
            }
           var url_=config.template+'#'+url_str;
             window.location.href=url_;
          }else{
            console.warn(new Error('您没有设置“'+url+'”这个相关的跳转配置项'));
          }
        }
      };
})(Sloth)