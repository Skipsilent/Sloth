(function($,Sloth){
  var Sloth=Sloth||{};
Sloth.http=function(data){
    $.ajax({
      url:'https://www.jollybox.cn/Api/Index/'+data.api||'',
      type:data.type||'post',
      dataType:data.dataType||'json',
      data:data.data||{},
      success:data.success,
      error:data.error
    });
  };
Sloth.checkCode=function(data,success,error,txt){
    if(data.code==='200'){
      success(data.data)
    }else if(data.code==='400'){
      error&&error(data.message);
    }
  };
})(jQuery,Sloth)