 $(function(){
   var oWindowWidth= $(window).width();
   var oWindowHeight= $(window).height();     
  $(".login_img_bg").width(oWindowWidth);
  $(".login_img_bg").height(oWindowHeight);


  $(window).resize(function(){

   //throttle(autoMiddle,window,300);
   throttle(autoMiddle,300);
   //autoMiddle();
 

  })

  //封装节流函数
  // function throttle(method,context,time){
  //     clearTimeout(method.throttle);
  //     method.throttle = setTimeout(function(){
  //         method();
  //     },time);
  // }
  
  function throttle(method,delay){
    var timer = null;
    return function(){
        clearTimeout(timer);
        var context = this, args = Array.prototype.slice.call(arguments);
        timer = setTimeout(function(){
            method.apply(context,args);
        },delay);
    }
}


  //auto
  function autoMiddle(){
       oWindowWidth= $(window).width();
       oWindowHeight= $(window).height();     
      $(".login_img_bg").width(oWindowWidth);
      $(".login_img_bg").height(oWindowHeight);
   
  }


  

  show_msg.timer = null;
  function show_msg(msg, timeOut) {
    var c = $("#msg_dis_container");
    timeOut = timeOut || 1000;
    if(c.length==0){
      $(document.body).append('<div class="motify" style="display:none" id="msg_dis_container"><div class="motify-inner" id="msg_dis_content"></div></div>');
      c = $("#msg_dis_container");
    }
    $("#msg_dis_content").html(msg);
    c.css("display","block");
    clearTimeout(show_msg.timer);
    show_msg.timer = setTimeout(function(){
      c.css("display","none");
    },timeOut);
  }


  $(".login_check").click(function(){
    $this=$(this);
    if($this.hasClass("active")){
      $this.removeClass("active");
    }else{
      $this.addClass("active")
    }
  })

   var bLogining = false;
  $("#btn-submit").on("click", function(){
    if($("#user").val().length<1){
      show_msg("登录账号不能为空");
      return ;
    }
    if($("#pwd").val().length<1){
      show_msg("登录密码不能为空");
      return ;
    }
    
    if (bLogining) {
      show_msg("正在登录，请稍等……");
      return;
    }
    
    bLogining = true;
    

    //ajax 请求
    
    // ajax("/doLogin", {account:$("#mobile").val(), pwd:$("#pwd").val()}, "GET", "do_login").done(function(resp) {
    //   if(resp.success){
    //     var oriUrl = $("#return_url").val();
    //     if (oriUrl == "") {
    //       location.href="/location?bFlash=true";
    //     } else {
    //       location.href=oriUrl;
    //     }
    //   }else{
    //     show_msg(resp.data);
    //   }
    // }).fail(function(resp) {
    //   alert(resp);
    // }).always(function() {
    //   bLogining = false;
    // });
  });

})