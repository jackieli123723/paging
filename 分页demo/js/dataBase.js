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
jQuery.support.cors = true; //跨越解决数据渲染
//ajax
function ajax(url, data, method, oneVisitKey, mutiDealFun) {
  var visitStatus = visitStatus || {};
  data = data || {};
  method = method || "GET";
  var affix = "";
  if(method == "GET") {
    var affix = "?" + $.param($.extend({'_':new Date().getTime()}, data));
  }
  if (oneVisitKey) {
    if (visitStatus[oneVisitKey]) {
      var deferred = $.Deferred();
      if (mutiDealFun) {
        mutiDealFun();
      }
      return deferred.promise();
    } else {
      visitStatus[oneVisitKey] = true;
    }
  }
   

  return $.ajax({
    type: method,
    //GET防止缓存
    crossDomain: true, 
    url: url + affix,
    data:  method == 'POST' ? (data ? data: null) : null,
    headers : {Accept: "application/json; charset=UTF-8"},
    contentType: "application/x-www-form-urlencoded; application/json; charset=UTF-8"
  }).done(function(res) {
    //todo
  }).fail(function() {
    //todo
  }).always(function() {
       
        if (oneVisitKey) {
          visitStatus[oneVisitKey] = null;
        }
  });
}
//时间转换
function getDateSplit(timstamp) {
  var date = new Date(timstamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var today = date.getDate();
  var hour=date.getHours();     
  var minute=date.getMinutes();     
  var second=date.getSeconds(); 
 if(month<10){
    month="0"+month;
    }

  if(today<10){
    today="0"+today;
  }
  //  if(hour<10){
  //   hour="0"+hour;
  // }

  // if(minute<10){
  //   minute="0"+minute;
  // }
  // if(second<10){
  //   second="0"+second;
  // }

  //return date.getFullYear() + "-"+ month + "-"+ today + "-"+ hour+ "：" + minute + "："+ second; 
  return date.getFullYear() + "-"+ month + "-"+today;
}

//时间组件
Date.prototype.format = function(format){
  var o = {
  "M+" : this.getMonth()+1, //month
  "d+" : this.getDate(),    //day
  "h+" : this.getHours(),   //hour
  "m+" : this.getMinutes(), //minute
  "s+" : this.getSeconds(), //second
  "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
  "S" : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
  (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
  format = format.replace(RegExp.$1,
  RegExp.$1.length==1 ? o[k] :
  ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
}

function changeDate(days){
   var today=new Date(); // 获取今天时间
   var begin;
   var end;
  if(days == 0){
      today.setTime(today.getTime()-0*24*3600*1000);
      begin = today.format('yyyy-MM-dd');
      end =new Date().format('yyyy-MM-dd');
  }else if(days == 1){
      today.setTime(today.getTime()-1*24*3600*1000);
      begin = today.format('yyyy-MM-dd');
      end = today.format('yyyy-MM-dd');
  }else if(days == 6){
        today.setTime(today.getTime()-6*24*3600*1000);
      begin = today.format('yyyy-MM-dd');
      end =new Date().format('yyyy-MM-dd');
  }else if(days == 29){
        today.setTime(today.getTime()-29*24*3600*1000);
      begin = today.format('yyyy-MM-dd');
      end =new Date().format('yyyy-MM-dd');
  }

  $("#dateTime").val(begin+" 至 "+end);
} 

// changeDate(0);

var transformNumber=function(value){ 
    value = value.toString(); 
    if (value.length <= 3) { 
        return value; 
    } else { 
        return transformNumber(value.substr(0, value.length - 3)) + ',' + value.substr(value.length - 3); 
    } 
}   


window.onscroll = function(){
  var scrollTop = document.body.scrollTop;
  if(scrollTop >= 100){
    $(".toTop").show();
   }else{
    $(".toTop").hide();
   }
}
$(".toTop").click(function(){ $('body,html').animate({scrollTop:0},500); return false; })

//public.js
var pageSize =$('.pageChangeSize').val();

function loadingCover () {
    var $loadingCover = $("body >.loader-wapper");
    var html = '<div class="loader-wapper">'+
          '<div class="loader-inner line-spin-fade-loader">'+
        '<div></div>'+
        '<div></div>'+
        '<div></div>'+
        '<div></div>'+
        '<div></div>'+
        '<div></div>'+
        '<div></div>'+
        '<div></div>'+
          '</div>'+
          '</div>'
    $("body").append(html);
   return $loadingCover;
}
loadingCover();
$(".loader-wapper").show();



$(".home-game").click(function(){
    var $this=$(this);
    var index=$this.index()-1;   
   if($this.hasClass("on")){
     $this.removeClass("on");
    $(".selectdiv").eq(index).addClass("hide");
   }else{
     $this.addClass("on");
    $(".selectdiv").eq(index).removeClass("hide")
   }
   
  })

  $("#gameText li").click(function(){
     var $this=$(this);
    var text=$this.find("span").text();
    var value=$this.attr("data-value");
     $(".home-game").eq(0).removeClass("on");
    $this.addClass("active");
    $this.find(".checkbox").addClass("active");
    $this.siblings().removeClass("active");
     $this.siblings().find(".checkbox").removeClass("active");
    $this.parent(".selectdiv").addClass("hide");
    $("#allGame").find("span").text(text);
    $("#allGame").attr("data-value",value);
  })

  $("#phoneText li").click(function(){
    var $this=$(this);
    var text=$this.find("span").text();
    var value=$this.attr("data-value");

    $(".home-game").eq(1).removeClass("on");
     $this.addClass("active");
    $this.find(".checkbox").addClass("active");
    $this.siblings().removeClass("active");
     $this.siblings().find(".checkbox").removeClass("active");
    $this.parent(".selectdiv").addClass("hide");
    $("#allPhone").find("span").text(text);
    $("#allPhone").attr("data-value",value);
  })

  var _getGamePlate=function(id){
    return $(id).attr("data-value");
  }

  var _getValue=function(newobj){
      //var hasDataResult=$(newobj).val();
       var hasDataResult=$(newobj).attr("data-value");
      var dataOneSaveResult=[];
      if(hasDataResult){
          $(newobj).each(function(index,obj){
                 //dataOneSaveResult.push($(obj).val());
                 dataOneSaveResult.push($(obj).attr("data-value"));
            })
            dataOneSaveResult=dataOneSaveResult.join(",");
      }else{
        hasDataResult="";
      }
      return dataOneSaveResult;
    }

   // $(".accordion h3:first").addClass("active");
   // $(".accordion ul:not(:first)").hide();
   // $(".accordion h3").eq(1).addClass("active");
   // $(".accordion ul").eq(1).show().siblings("ul").hide();

    $(".accordion h3").click(function () {
      $(this).next("ul").slideToggle("slow").siblings("ul:visible").slideUp("slow");
      $(this).toggleClass("active");
      $(this).siblings("h3").removeClass("active");
   });


    $(".tabNav li").click(function(){
      $(".tabNav li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
      $(".tabCon ul").hide().eq($(this).index()).show();
    })

    $(".index-search").click(function(){
       var $this=$(this);
      if($this.hasClass("on")){
         $this.removeClass("on");
        $(".search-select-box").addClass("hide");
       }else{
         $this.addClass("on");
        $(".search-select-box").removeClass("hide")
       }
    })

     

      //配置地址
    
       function initDataHref(){
        return optionData.baseHref+"&page="+optionData.page+"&pageSize="+optionData.pageSize+"&channel="+optionData.channel+"&platform="+optionData.platform+"&begintime="+optionData.begintime+"&endtime="+optionData.endtime+"&channelField="+optionData.channelField+"&versionField="+optionData.versionField+"&areaField="+optionData.areaField+"&selectField="+optionData.selectField;
      }

  

      //时间切换数据
      $(".times").click(function(){
        var $this=$(this);
        $this.addClass("active").siblings().removeClass("active");
        var num=$this.attr("data-num");
        changeDate(num);
      
        $("#result").parents(".table-box").find(".no-data-text").remove();
        $(".page-list").show();

        var startDate=$(".index-date").val().split(" 至 ")[0];
        var endDate=$(".index-date").val().split(" 至 ")[1];

        var versionResult=$(".line-box-list[data-key='2']").find("input");
        var areaResult=$(".line-box-list[data-key='3']").find("input");
        var channelResult=$(".tabCon ul li[data-key='1'].active");
        var versionResult=$(".tabCon ul li[data-key='2'].active");
        var areaResult=$(".tabCon ul li[data-key='3'].active");

        var channelField=_getValue(channelResult);
        var versionField=_getValue(versionResult);
        var areaField=_getValue(areaResult);
        var gameField=_getGamePlate("#allGame");
        var plateField=_getGamePlate("#allPhone");

        optionData.channel=gameField;
        optionData.platform=plateField;
        optionData.begintime=startDate;
        optionData.endtime=endDate;
        optionData.channelField=channelField;
        optionData.versionField=versionField;
        optionData.areaField=areaField;
     
        
        var changeHref=initDataHref();
        console.log(changeHref)
        pageData(changeHref);
      })
      
      var dateRange1 = new pickerDateRange('dateTime', {
          isTodayValid: true,
          needCompare: false,
          defaultText: ' 至 ',
          autoSubmit: true,
          inputTrigger: 'input_trigger',
          theme: 'ta',
          success: function(obj) {
          $("#result").parents(".table-box").find(".no-data-text").remove();
          $(".page-list").show(); 
          var startDate=obj.startDate;  
          var endDate=obj.endDate; 

 
          var channelResult=$(".tabCon ul li[data-key='1'].active");
          var versionResult=$(".tabCon ul li[data-key='2'].active");
          var areaResult=$(".tabCon ul li[data-key='3'].active");
          
          var channelField=_getValue(channelResult);
          var versionField=_getValue(versionResult);
          var areaField=_getValue(areaResult);
          var gameField=_getGamePlate("#allGame");
          var plateField=_getGamePlate("#allPhone");

          optionData.channel=gameField;
          optionData.platform=plateField;
          optionData.begintime=startDate;
          optionData.endtime=endDate;
          optionData.channelField=channelField;
          optionData.versionField=versionField;
          optionData.areaField=areaField;
          
       

          var changeHref=initDataHref();
          console.log(changeHref)
          pageData(changeHref);
       
          }
      });

      $("#dateTime").on("focus",function(){
        $(".times").removeClass("active");
      })

      //tab切换数据
    
      $(".tabCon ul li").click(function(){
        var $this=$(this);
        var text=$this.find("span").text();
        var dataKey=$this.attr("data-key");
        var dataValue=$this.attr("data-value");
        var changeObj=$(".line-box-list[data-key='"+dataKey+"']");

        if($this.hasClass("active")){
           $this.removeClass("active");
           $this.find(".checkbox").removeClass("active");
           changeObj.find("input[value='"+dataValue+"']").remove();
           var inputLength=changeObj.children('input').length;
             if(inputLength<1){
              changeObj.addClass("hide");
             }
         }else{
           
           var inputLength=changeObj.children('input').length;
             if(inputLength<1){
              changeObj.removeClass("hide");
             }
           $this.addClass("active");
           $this.find(".checkbox").addClass("active");
           var inputText='<input type="text" class="list-text" readonly="readonly" value="'+dataValue+'" placeholder="对应的版本编号" />';
           changeObj.append(inputText);
         }
      })


    $(".line-box-list").on("click","input",function(e){//有个坑

            var x = e.pageX;
            var y = e.pageY;

            var offLeftX= $(this).offset().left;
            var offTopY= $(this).offset().top;
            if(x<=offLeftX+140&&x>offLeftX+109&&y>offTopY&&y<=offTopY+28){
               //alert("offLeftX:"+offLeftX+"offTopY:"+offTopY);
                var $this=$(this);
                var dataKey=$this.parents(".line-box-list").attr("data-key");
                var dataValue=$this.val();
                 $(".tabCon ul li[data-value='"+dataValue+"'][data-key='"+dataKey+"']").removeClass("active");
               $(".tabCon ul li[data-value='"+dataValue+"'][data-key='"+dataKey+"']").find(".checkbox").removeClass("active");
                var inputLength=$this.parents(".line-box-list").children('input').length;
               if(inputLength<=1){
                 $this.parents(".line-box-list").addClass('hide');
               }
               $this.remove();
            
            }
      })

     $(".list-clear").click(function(){
        var $this=$(this);
        $this.parents(".line-box-list").find("input").remove();
        var dataKey=$this.parents(".line-box-list").attr("data-key");
        $(".tabCon ul li[data-key='"+dataKey+"']").find(".checkbox").removeClass("active");
        $this.parents(".line-box-list").addClass('hide');
      })

    

       $(".checkbox-btn-box .checkbox-cancel").click(function(){
        $(".index-search").removeClass("on");
        $(".search-select-box").addClass("hide");
        
      })

 
      $(".checkbox-btn-box .checkbox-sure").click(function(){
        $(".index-search").removeClass("on");
        $(".search-select-box").addClass("hide");
        var startDate=$(".index-date").val().split(" 至 ")[0];
        var endDate=$(".index-date").val().split(" 至 ")[1];


        var channelResult=$(".tabCon ul li[data-key='1'].active");
        var versionResult=$(".tabCon ul li[data-key='2'].active");
        var areaResult=$(".tabCon ul li[data-key='3'].active");

        var channelField=_getValue(channelResult);
        var versionField=_getValue(versionResult);
        var areaField=_getValue(areaResult);
        var gameField=_getGamePlate("#allGame");
        var plateField=_getGamePlate("#allPhone");

        optionData.channel=gameField;
        optionData.platform=plateField;
        optionData.begintime=startDate;
        optionData.endtime=endDate;
        optionData.channelField=channelField;
        optionData.versionField=versionField;
        optionData.areaField=areaField;
        

        //ajax 调用分页
        
       $("#result").parents(".table-box").find(".no-data-text").remove();
       $(".page-list").show();
        var changeHref=initDataHref();
        console.log(changeHref)
        pageData(changeHref);
      })

        // $(".table-select-right span").click(function(){
        //    var $this=$(this);
        //    if(!$this.hasClass("active")){
        //      $this.addClass("active");
        //      $(".table-select-right ul").removeClass("hide");
        //    }else{
        //      $this.removeClass("active");
        //      $(".table-select-right ul").addClass("hide");
        //    }
        // })
        // 
        
      $(".table-select-right span").each(function(index,item){
         var $this=$(item);
         $this.click(function(){
           if(!$this.hasClass("active")){
           $this.addClass("active");
           $this.parents(".table-select-right").find("ul").removeClass("hide");
         }else{
           $this.removeClass("active");
           $this.parents(".table-select-right").find("ul").addClass("hide");
         }
         });
      })

      $(".table-select-right ul li").click(function(){
         var $this=$(this);
         var text=$this.text();
         var value=$this.attr("data-value");
        $(".table-select-right span").removeClass("active");
         $this.addClass("active");
         $this.siblings().removeClass("active");
        $(".table-select-right span").text(text);
        $(".table-select-right span").attr("data-value",value);
        $this.parent().addClass("hide");

        var startDate=$(".index-date").val().split(" 至 ")[0];
        var endDate=$(".index-date").val().split(" 至 ")[1];

      
        var channelResult=$(".tabCon ul li[data-key='1'].active");
        var versionResult=$(".tabCon ul li[data-key='2'].active");
        var areaResult=$(".tabCon ul li[data-key='3'].active");

        var channelField=_getValue(channelResult);
        var versionField=_getValue(versionResult);
        var areaField=_getValue(areaResult);
        var gameField=_getGamePlate("#allGame");
        var plateField=_getGamePlate("#allPhone");

        optionData.channel=gameField;
        optionData.platform=plateField;
        optionData.begintime=startDate;
        optionData.endtime=endDate;
        optionData.channelField=channelField;
        optionData.versionField=versionField;
        optionData.areaField=areaField;
        optionData.selectField=value;
        
        //ajax 调用分页
        $("#result").parents(".table-box").find(".no-data-text").remove();
        $(".page-list").show();
        var changeHref=initDataHref();
        console.log(changeHref)
        pageData(changeHref);
     
      })


  var pageData=function(url){
      $(".loader-wapper").show();
       ajax(url, {}, "get", "LOGIN__CHECK").done(function (resp) {
        console.log(resp.data.length);
        if (!resp || resp.data.length == 0) {
              $("#result").html("");
              $(".page-list").hide();
              $("#result").after("<p class='no-data-text'>没有找到相关数据，请重新检索！</p>");
            return;
        }
        showPage(1,resp.total,url);
        $("#totalPage").text(resp.total);
     
        htmlPageText(resp);

      }).fail(function (resp) {
        show_msg("网络异常，请稍后重试！");
      }).always(function() {
         $(".loader-wapper").hide();
      });
    }

//public.js end


//数据平台分页
 $('.pageChangeSize').change(function(){  
        var newpageSize=$(this).val();    
       
        var startDate=$(".index-date").val().split(" 至 ")[0];
        var endDate=$(".index-date").val().split(" 至 ")[1];
        
    
        var channelResult=$(".tabCon ul li[data-key='1'].active");
        var versionResult=$(".tabCon ul li[data-key='2'].active");
        var areaResult=$(".tabCon ul li[data-key='3'].active");

        var channelField=_getValue(channelResult);
        var versionField=_getValue(versionResult);
        var areaField=_getValue(areaResult);
        var gameField=_getGamePlate("#allGame");
        var plateField=_getGamePlate("#allPhone");

        optionData.channel=gameField;
        optionData.platform=plateField;
        optionData.begintime=startDate;
        optionData.endtime=endDate;
        optionData.channelField=channelField;
        optionData.versionField=versionField;
        optionData.areaField=areaField;
        optionData.pageSize=newpageSize;

        var changeHref=initDataHref();
        console.log(changeHref)
        pageData(changeHref);
 })   



$(".page-list-go").on("click","a",function(){
   var attrPage=$(this).attr("page");
   var href=$(this).attr("data");
   var newpageSize=$(".pageChangeSize").val(); 

   console.log(href)
    if(attrPage==null){ /* 分页打点处数据异常报错 bug20160727 */
      return;
   }
   
   $(".loader-wapper").show();
   ajax(href, {}, "get", "LOGIN__CHECK1")
      .done(function (resp) {
      $("#result").empty();
      console.log(resp.data.length);
       showPage(attrPage,resp.total,href);
       htmlPageText(resp);

    }).fail(function (resp) {
        show_msg("网络异常，请稍后重试！");
    }).always(function() {
        $(".loader-wapper").hide();
    });
})


//修复首页和尾页点击加载失败20160704
function showPage(nowPage,totalCell,pageurl){
  console.log(pageurl);
   nowPage=parseInt(nowPage);
    var newPages=$('.pageChangeSize').val();
    var totalPage = Math.ceil(totalCell / newPages);
    var phtml = '';
    if(nowPage==1){
      var surl =  pageurl.replace(/page=(\d+)/,"page="+0);
      phtml +="<li class='first'><a href='javascript:;' data='"+surl+"' page='1' >首页</a></li>";
      //phtml +="<li class='first'><a href='javascript:;'>首页</a></li>";
    }else{
      var surl =  pageurl.replace(/page=(\d+)/,"page="+0);
      phtml +="<li class='first'><a href='javascript:;' data='"+surl+"' page='1' >首页</a></li>";
      //phtml +="<li class='first'><a href='javascript:;' data='"+pageurl+"' page='0' >首页</a></li>";
    }



    if(totalPage <= 7){
        for (var i = 1; i <= totalPage; i++) {
           var nurl =  pageurl.replace(/page=(\d+)/,"page="+(i-1));
           if(nowPage == i){
                phtml +="<li class='active'><a href='javascript:;'  data='"+nurl+"' page='"+i+"' >"+i+"</a></li>";
           }else{
                phtml +="<li><a href='javascript:;' data='"+nurl+"' page='"+i+"'>"+i+"</a></li>";
           }
            
        }
    }else{
        if(nowPage-3<=1){
            for (var i = 1; i <= 5; i++) {
                var nurl =  pageurl.replace(/page=(\d+)/,"page="+(i-1));
               if(nowPage == i){
                    phtml +="<li class='active'><a href='javascript:;'  data='"+nurl+"' page='"+i+"'>"+i+"</a></li>";
               }else{
                    phtml +="<li><a href='javascript:;' data='"+nurl+"' page="+i+">"+i+"</a></li>";
               }
            }
            phtml +="<li><a href='javascript:;'>…</a></li>";
            var endurl = pageurl.replace(/page=(\d+)/,"page="+(totalPage-1));
            phtml +="<li><a href='javascript:;' data='"+endurl+"' page="+totalPage+">"+totalPage+"</a></li>";
        }else{
            console.log(nowPage+"====="+totalPage);
            if((nowPage+4) > totalPage){
               var starturl = pageurl.replace(/page=(\d+)/,"page=1");
               phtml +="<li><a href='javascript:;' data='"+starturl+"' page=1>1</a></li>";
               phtml +="<li><a href='javascript:;'>…</a></li>";
                for (var i = totalPage - 4; i <= totalPage; i++) {
                     var nurl =  pageurl.replace(/page=(\d+)/,"page="+(i-1));
                    if(nowPage == i){
                         phtml +="<li class='active'><a href='javascript:;'  data='"+nurl+"' page='"+i+"' >"+i+"</a></li>";
                    }else{
                        phtml +="<li><a href='javascript:;' data='"+nurl+"' page="+i+">"+i+"</a></li>";
                    }
                }
            }else{

                var starturl = pageurl.replace(/page=(\d+)/,"page=1");
                phtml +="<li><a href='javascript:;' data='"+starturl+"' page=1>1</a></li>";
                phtml +="<li><a href='javascript:;'>…</a></li>";
                for (var i = nowPage - 1; i <= nowPage+1; i++) {
                     var nurl =  pageurl.replace(/page=(\d+)/,"page="+(i-1));
                    if(nowPage == i){
                         phtml +="<li class='active'><a href='javascript:;'  data='"+nurl+"' page='"+i+"'>"+i+"</a></li>";
                    }else{
                        phtml +="<li><a href='javascript:;' data='"+nurl+"' page="+i+">"+i+"</a></li>";
                    }
                }
                phtml +="<li><a href='javascript:;'>…</a></li>";
                var endurl = pageurl.replace(/page=(\d+)/,"page="+(totalPage-1));
                phtml +="<li><a href='javascript:;' data='"+endurl+"' page="+totalPage+">"+totalPage+"</a></li>";
            }
        }
    }
     if(nowPage==totalPage){
    //phtml +="<li class='last'><a href='javascript:;'>尾页</a></li>";
      var nurl =  pageurl.replace(/page=(\d+)/,"page="+(totalPage-1));
      phtml +="<li class='last'><a href='javascript:;' data='"+nurl+"' page='"+totalPage+"' >尾页</a></li>";
    }else{
       var nurl =  pageurl.replace(/page=(\d+)/,"page="+(totalPage-1));
      phtml +="<li class='last'><a href='javascript:;' data='"+nurl+"' page='"+totalPage+"' >尾页</a></li>";
    }
$(".page-list-go").html(phtml);
    
}


