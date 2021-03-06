show_msg.timer = null;

function show_msg(msg, timeOut) {
    var c = $("#msg_dis_container");
    timeOut = timeOut || 1000;
    if (c.length == 0) {
        $(document.body).append('<div class="motify" style="display:none" id="msg_dis_container"><div class="motify-inner" id="msg_dis_content"></div></div>');
        c = $("#msg_dis_container");
    }
    $("#msg_dis_content").html(msg);
    c.css("display", "block");
    clearTimeout(show_msg.timer);
    show_msg.timer = setTimeout(function() {
        c.css("display", "none");
    }, timeOut);
}
jQuery.support.cors = true; //跨越解决数据渲染
//ajax
function ajax(url, data, method, oneVisitKey, mutiDealFun) {
    var visitStatus = visitStatus || {};
    data = data || {};
    method = method || "GET";
    var affix = "";
    if (method == "GET") {
        var affix = "?" + $.param($.extend({ '_': new Date().getTime() }, data));
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
        data: method == 'POST' ? (data ? data : null) : null,
        headers: { Accept: "application/json; charset=UTF-8" },
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
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }

    if (today < 10) {
        today = "0" + today;
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
    return date.getFullYear() + "-" + month + "-" + today;
}

//时间组件
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

function changeDate(days) {
    var today = new Date(); // 获取今天时间
    var begin;
    var end;
    if (days == 0) {
        today.setTime(today.getTime() - 0 * 24 * 3600 * 1000);
        begin = today.format('yyyy-MM-dd');
        end = new Date().format('yyyy-MM-dd');
    } else if (days == 1) {
        today.setTime(today.getTime() - 1 * 24 * 3600 * 1000);
        begin = today.format('yyyy-MM-dd');
        end = today.format('yyyy-MM-dd');
    } else if (days == 6) {
        today.setTime(today.getTime() - 6 * 24 * 3600 * 1000);
        begin = today.format('yyyy-MM-dd');
        end = new Date().format('yyyy-MM-dd');
    } else if (days == 29) {
        today.setTime(today.getTime() - 29 * 24 * 3600 * 1000);
        begin = today.format('yyyy-MM-dd');
        end = new Date().format('yyyy-MM-dd');
    }

    $("#dateTime").val(begin + " 至 " + end);
}

// changeDate(0);

var transformNumber = function(value) {
    value = value.toString();
    if (value.length <= 3) {
        return value;
    } else {
        return transformNumber(value.substr(0, value.length - 3)) + ',' + value.substr(value.length - 3);
    }
}


function transFloat(floatNum){
    return parseFloat(floatNum).toFixed(2);
}


window.onscroll = function() {
    var scrollTop = document.body.scrollTop;
    if (scrollTop >= 100) {
        $(".toTop").show();
    } else {
        $(".toTop").hide();
    }
}
$(".toTop").click(function() {
    $('body,html').animate({ scrollTop: 0 }, 500);
    return false;
})

//public.js
//var pageSize =$('.pageChangeSize').val();

function loadingCover() {
    var $loadingCover = $("body >.loader-wapper");
    var html = '<div class="loader-wapper">' +
        '<div class="loader-inner line-spin-fade-loader">' +
        '<div></div>' +
        '<div></div>' +
        '<div></div>' +
        '<div></div>' +
        '<div></div>' +
        '<div></div>' +
        '<div></div>' +
        '<div></div>' +
        '</div>' +
        '</div>'
    $("body").append(html);
    return $loadingCover;
}
loadingCover();
$(".loader-wapper").show();


$(".home-game").click(function() {
    var $this = $(this);
    var index = $this.index() - 1;
    if ($this.hasClass("on")) {
        $this.removeClass("on");
        $(".selectdiv").eq(index).addClass("hide");
    } else {
        $this.addClass("on");
        $(".selectdiv").eq(index).removeClass("hide")
    }

})

$("#gameText li").click(function() {
    var $this = $(this);
    var text = $this.find("span").text();
    var value = $this.attr("data-value");
    $(".home-game").eq(0).removeClass("on");
    $this.addClass("active");
    $this.find(".checkbox").addClass("active");
    $this.siblings().removeClass("active");
    $this.siblings().find(".checkbox").removeClass("active");
    $this.parent(".selectdiv").addClass("hide");
    $("#allGame").find("span").text(text);
    $("#allGame").attr("data-value", value);
})

$("#phoneText li").click(function() {
    var $this = $(this);
    var text = $this.find("span").text();
    var value = $this.attr("data-value");

    $(".home-game").eq(1).removeClass("on");
    $this.addClass("active");
    $this.find(".checkbox").addClass("active");
    $this.siblings().removeClass("active");
    $this.siblings().find(".checkbox").removeClass("active");
    $this.parent(".selectdiv").addClass("hide");
    $("#allPhone").find("span").text(text);
    $("#allPhone").attr("data-value", value);
})

var _getGamePlate = function(id) {
    return $(id).attr("data-value");
}

var _getValue = function(newobj) {
    //1.var hasDataResult=$(newobj).val();
    var hasDataResult = $(newobj).attr("data-value");
    var dataOneSaveResult = [];
    if (hasDataResult) {
        $(newobj).each(function(index, obj) {
            //1.dataOneSaveResult.push($(obj).val());
            dataOneSaveResult.push($(obj).attr("data-value"));
        })
        dataOneSaveResult = dataOneSaveResult.join(",");
    } else {
        hasDataResult = "";
    }
    return dataOneSaveResult;
}

// $(".accordion h3:first").addClass("active");
// $(".accordion ul:not(:first)").hide();
// $(".accordion h3").eq(1).addClass("active");
// $(".accordion ul").eq(1).show().siblings("ul").hide();

$(".accordion h3").click(function() {
    $(this).next("ul").slideToggle("slow").siblings("ul:visible").slideUp("slow");
    $(this).toggleClass("active");
    $(this).siblings("h3").removeClass("active");
});


$(".tabNav li").click(function() {
    $(".tabNav li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
    $(".tabCon ul").hide().eq($(this).index()).show();
})

$(".index-search").click(function() {
    var $this = $(this);
    if ($this.hasClass("on")) {
        $this.removeClass("on");
        $(".search-select-box").addClass("hide");
    } else {
        $this.addClass("on");
        $(".search-select-box").removeClass("hide")
    }
})



//配置地址


function initParams(startDate, endDate, id, value, pagesize) {
    //1.way
    // var channelResult=$(".line-box-list[data-key='1']").find("input");
    // var versionResult=$(".line-box-list[data-key='2']").find("input");
    // var areaResult=$(".line-box-list[data-key='3']").find("input");

    //2.way

    var channelResult = $(".tabCon ul li[data-key='1'].active");
    var versionResult = $(".tabCon ul li[data-key='2'].active");
    var areaResult = $(".tabCon ul li[data-key='3'].active");

    var channelField = _getValue(channelResult);
    var versionField = _getValue(versionResult);
    var areaField = _getValue(areaResult);
    var gameField = _getGamePlate("#allGame");
    var plateField = _getGamePlate("#allPhone");

    for (var i = 0; i < resultTableObj.option.length; i++) {
        var tempObj = resultTableObj.option[i];
        if (tempObj.id == id) {
            tempObj.page = resultTableObj.option[i].page;
            tempObj.pageSize = pagesize ? pagesize : resultTableObj.option[i].pageSize;
            tempObj.channel = gameField;
            tempObj.platform = plateField;
            tempObj.begintime = startDate ? startDate : resultTableObj.option[i].begintime;
            tempObj.endtime = endDate ? endDate : resultTableObj.option[i].endtime;
            tempObj.channelField = channelField;
            tempObj.versionField = versionField;
            tempObj.areaField = areaField;
            tempObj.selectField = value ? value : resultTableObj.option[i].selectField;
            resultTableObj.option[i].cacheUrl = initParamsHref(tempObj);
        }
    }
}

//时间切换数据
$(".times").click(function() {
    var $this = $(this);
    $this.addClass("active").siblings().removeClass("active");
    var num = $this.attr("data-num");
    changeDate(num);

    var startDate = $(".index-date").val().split(" 至 ")[0];
    var endDate = $(".index-date").val().split(" 至 ")[1];

    for (var i = 0; i < resultTableObj.option.length; i++) {
        $("#" + resultTableObj.option[i].id).find(".table-box").find(".no-data-text").remove();
        $("#" + resultTableObj.option[i].id).find(".page-list").show();
        initParams(startDate, endDate, resultTableObj.option[i].id, "", "");
        pageData(resultTableObj.option[i].id);
    }

    resizePaintChart();

})

var dateRange1 = new pickerDateRange('dateTime', {
    isTodayValid: true,
    needCompare: false,
    defaultText: ' 至 ',
    autoSubmit: true,
    //inputTrigger: 'input_trigger',
    theme: 'ta',
    success: function(obj) {
        $("#result").parents(".table-box").find(".no-data-text").remove();
        $(".page-list").show();
        var startDate = obj.startDate;
        var endDate = obj.endDate;

        for (var i = 0; i < resultTableObj.option.length; i++) {
            $("#" + resultTableObj.option[i].id).find(".table-box").find(".no-data-text").remove();
            $("#" + resultTableObj.option[i].id).find(".page-list").show();
            initParams(startDate, endDate, resultTableObj.option[i].id, "", "");
            pageData(resultTableObj.option[i].id);
        }

        resizePaintChart();

    }
});

$("#dateTime").on("focus", function() {
    $(".times").removeClass("active");
})

//tab切换数据

$(".tabCon ul li").click(function() {
    var $this = $(this);
    var text = $this.find("span").text();
    var dataKey = $this.attr("data-key");
    var dataValue = $this.attr("data-value");
    var changeObj = $(".line-box-list[data-key='" + dataKey + "']");

    if ($this.hasClass("active")) {
        $this.removeClass("active");
        $this.find(".checkbox").removeClass("active");
        changeObj.find("input[value='" + dataValue + "']").remove();
        var inputLength = changeObj.children('input').length;
        if (inputLength < 1) {
            changeObj.addClass("hide");
        }
    } else {

        var inputLength = changeObj.children('input').length;
        if (inputLength < 1) {
            changeObj.removeClass("hide");
        }
        $this.addClass("active");
        $this.find(".checkbox").addClass("active");
        var inputText = '<input type="text" class="list-text" readonly="readonly" value="' + dataValue + '" placeholder="对应的版本编号" />';
        changeObj.append(inputText);
    }
})


$(".line-box-list").on("click", "input", function(e) { //有个坑

    var x = e.pageX;
    var y = e.pageY;

    var offLeftX = $(this).offset().left;
    var offTopY = $(this).offset().top;
    if (x <= offLeftX + 140 && x > offLeftX + 109 && y > offTopY && y <= offTopY + 28) {
        //alert("offLeftX:"+offLeftX+"offTopY:"+offTopY);
        var $this = $(this);
        var dataKey = $this.parents(".line-box-list").attr("data-key");
        var dataValue = $this.val();
        $(".tabCon ul li[data-value='" + dataValue + "'][data-key='" + dataKey + "']").removeClass("active");
        $(".tabCon ul li[data-value='" + dataValue + "'][data-key='" + dataKey + "']").find(".checkbox").removeClass("active");
        var inputLength = $this.parents(".line-box-list").children('input').length;
        if (inputLength <= 1) {
            $this.parents(".line-box-list").addClass('hide');
        }
        $this.remove();

    }
})

$(".list-clear").click(function() {
    var $this = $(this);
    $this.parents(".line-box-list").find("input").remove();
    var dataKey = $this.parents(".line-box-list").attr("data-key");
    $(".tabCon ul li[data-key='" + dataKey + "']").find(".checkbox").removeClass("active");
    $this.parents(".line-box-list").addClass('hide');
})



$(".checkbox-btn-box .checkbox-cancel").click(function() {
    $(".index-search").removeClass("on");
    $(".search-select-box").addClass("hide");

})


$(".checkbox-btn-box .checkbox-sure").click(function() {
    $(".index-search").removeClass("on");
    $(".search-select-box").addClass("hide");

    for (var i = 0; i < resultTableObj.option.length; i++) {
        $("#" + resultTableObj.option[i].id).find(".table-box").find(".no-data-text").remove();
        $("#" + resultTableObj.option[i].id).find(".page-list").show();
        initParams("", "", resultTableObj.option[i].id, "", "");
        pageData(resultTableObj.option[i].id);
    }

    resizePaintChart();

})



$(".table-select-right span").click(function() {
    var $this = $(this);
    var text = $this.text();
    if (!$this.hasClass("active")) {
        $this.addClass("active");
        $this.parent().find("ul").removeClass("hide");
    } else {
        $this.removeClass("active");
        $this.parent().find("ul").addClass("hide");
    }
})



$(".table-select-right ul li").click(function() {
    var $this = $(this);
    var text = $this.text();
    var value = $this.attr("data-value");
    $this.parent().parent().find("span").removeClass("active");
    $this.addClass("active");
    $this.siblings().removeClass("active");
    $this.parents(".table-select-right").find("span").text(text);
    $this.parents(".table-select-right").find("span").attr("data-value", value);
    $this.parent().addClass("hide");
    var fid = $this.parents('.table-box').attr('id');

    for (var i = 0; i < resultTableObj.option.length; i++) {
        if (fid == resultTableObj.option[i].id) {
            $("#" + fid).find(".table-box").find(".no-data-text").remove();
            $("#" + fid).find(".page-list").show();
            initParams("", "", fid, value, "");
            pageData(fid);
            paintChart(fid);
        }
    }
    // resizePaintChart();

})


var pageData = function(id) {
    $(".loader-wapper").show();
    $("#" + id).find("table").empty();
    $("#" + id).find(".no-data-text").remove();
    for (var i = 0; i < resultTableObj.option.length; i++) {
        if (id == resultTableObj.option[i].id) {
            var tempObj = resultTableObj.option[i];
            ajax(tempObj.cacheUrl, {}, "get", "LOGIN__CHECK").done(function(resp) {
                if (!resp || resp.data.length == 0) {
                    $("#" + id).find(".page-list").hide();
                    $("#" + id).find("table").after("<p class='no-data-text'>没有找到相关数据，请重新检索！</p>");
                    return;
                }
                tempObj.chartTotal = resp.total;
                // console.log(resultTableObj)
                htmlPageText(resp, id);
                showPage(1, resp.total, tempObj.cacheUrl, id);
                // console.log(tempObj.cacheUrl);                    

            }).fail(function(resp) {
                show_msg("网络异常，请稍后重试！");
            }).always(function() {
                $(".loader-wapper").hide();
            });
        }
    }
}


function init() {
    for (var i = 0; i < resultTableObj.option.length; i++) {
        $("#" + resultTableObj.option[i].id).find(".table-box").find(".no-data-text").remove();
        $("#" + resultTableObj.option[i].id).find(".page-list").show();
        initParams("", "", resultTableObj.option[i].id, "", "");
        pageData(resultTableObj.option[i].id);

    }
}

init();


// function getbasicTotal(tempObj){
//     $(".game-detail-tab").find(".game-detail-num").text(0);
//     ajax(tempObj.cacheUrl, {}, "get", "LOGIN__CHECK").done(function (resp) {
//         if (!resp || resp.data["0"].length == 0) {
//             $("#"+tempObj.id).find(".game-detail-num").hide();
//             return;
//         }

//         htmlBasicText(resp,tempObj.id);
//         console.log(tempObj.cacheUrl);

//     }).fail(function (resp) {
//         show_msg("网络异常，请稍后重试！");
//     }).always(function() {
//         $(".loader-wapper").hide();
//     });
// }

// function initDate () {
//     for (var i = 0; i < resultTableObj.option.length; i++) {
//         initParams("", "", resultTableObj.option[i].id, "", "");
//         if (resultTableObj.option[i].id == "basicTotal") {
//             getbasicTotal(resultTableObj.option[i]);
//         }else {
//             $("#" + resultTableObj.option[i].id).find(".table-box").find(".no-data-text").remove();
//             $("#" + resultTableObj.option[i].id).find(".page-list").show();
//             pageData(resultTableObj.option[i].id);
//         }
//     }
// }
// initDate();

//public.js end


//数据平台分页
$('.pageChangeSize').change(function() {
    var newpageSize = $(this).val();
    var fid = $(this).parents('.table-box').attr('id');

    for (var i = 0; i < resultTableObj.option.length; i++) {
        if (fid == resultTableObj.option[i].id) {
            $("#" + fid).find(".table-box").find(".no-data-text").remove();
            $("#" + fid).find(".page-list").show();
            initParams("", "", fid, "", newpageSize);
            pageData(fid);
        }
    }

})



$(".page-list-go").on("click", "a", function() {
    var attrPage = $(this).attr("page");
    var fid = $(this).parents('.table-box').attr('id');
    var href = $(this).attr("data");
    if (attrPage == null) { /* 分页打点处数据异常报错 bug20160727 */
        return;
    }

    $(".loader-wapper").show();
    ajax(href, {}, "get", "LOGIN__CHECK1")
        .done(function(resp) {

            $("#" + fid).find("table").empty();
            htmlPageText(resp, fid);
            showPage(attrPage, resp.total, href, fid);
        }).fail(function(resp) {

            show_msg("网络异常，请稍后重试！");
        }).always(function() {
            $(".loader-wapper").hide();
        });
})

//多table数据组装



var htmlPageText = function(resp, id) {
    for (var i = 0; i < resultTableObj.option.length; i++) {
        var tempObj = resultTableObj.option[i];
        if (tempObj.id == id) {
            $("#" + id).find("table").html(tempObj.tableTh);
            var cacheHtml = '';

            $.each(resp.data, function(i, item) {
                cacheHtml += "<tr>";
                $.each(tempObj.tableTd, function(k, v) {
                    var fn = window[v];
                    if (typeof fn === 'function') {

                        cacheHtml += "<td>" + fn(item[k]) + "</td>";
                    } else {
                        cacheHtml += "<td>" + item[k] + "</td>";
                    }
                })
                cacheHtml += "</tr>";

            });
            $("#" + id).find("table").append(cacheHtml);
            // console.log(cacheHtml)
        }
    }
}

var configInit = function(data, obj) {

        var res = [];
        for (var i = 1; i < data.length; i++) {
            res.push({
                name: obj.chartDataWord[i],
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'right'
                    }
                },
                areaStyle: { normal: {

                } },
                markPoint : {
                          data : [
                              {type : 'max', name: '最大值'},
                              {type : 'min', name: '最小值'}
                          ]
                      },
                // areaStyle: {
                //     normal: {
                //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //             offset: 0,
                //             color: 'rgba(30,144,255,0.8)' // 0% 处的颜色
                //         }, {
                //             offset: 1,
                //             color: 'rgba(138,43,226,0.8)' // 100% 处的颜色
                //         }], false),
                //         shadowColor: 'rgba(0, 0, 0, 0.5)',
                //         shadowBlur: 10


                //     }
                // },
                data: data[i]
            })
        }
        return res;
    }
    //多chart数据组装

var htmlChartData = function(resp, id) {
    var dataDate = [];
    for (var i = 0; i < resultTableObj.option.length; i++) {
        var tempObj = resultTableObj.option[i];

        if (tempObj.id == id) {

            var index = 0;
            $.each(tempObj.chartDataLine, function(k, v) {
                dataDate[index] = new Array();
                $.each(resp.data, function(j, item) {
                    var fn = window[v];
                    if (typeof fn === 'function') {
                        var da = fn(item[k]);
                        dataDate[index].push(da);

                    } else {
                        var das = item[k];
                        dataDate[index].push(das);
                    }


                });
                dataDate[index].reverse();
                index++;



            })
            resdata = configInit(dataDate, tempObj);
            var option = {
                title: {
                    text: tempObj.chartText,
                    subtext: '来源统计数据',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: tempObj.chartDataWord
                },
                backgroundColor: ["#fff"],
                toolbox: {
                    show: true,
                    feature: {
                        // dataView: { show: true, readOnly: false },
                        dataView: { show: false, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                        restore: { show: false },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                grid: {
                    left: '2%',
                    right: '2%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    show: true,
                    boundaryGap: false,
                    splitLine: {
                        lineStyle: {
                            // 使用深浅的间隔色
                            color: ['rgba(0, 0, 0, 0)'],

                        }
                    },
                    data: dataDate[0]
                }],
                yAxis: [{
                        type: 'value',
                    },

                ],
                series: resdata
            }

            var myChart = echarts.init($("#" + id).find(".chart").get(0), "macarons");
            myChart.setOption(option);
        }
    }

}


function paintChart(id) {

    for (var i = 0; i < resultTableObj.option.length; i++) {
        var tempObj = resultTableObj.option[i]
        if (id == tempObj.id) {
            resultTableObj.option[i].isChartOpen = 1;
            var href = tempObj.cacheUrl;
            var chartTotal = tempObj.chartTotal;
            console.log(tempObj.isChartOpen);
            if (tempObj.isChartOpen != 0) {

                var surl = href.replace(/pageSize=(\d+)/, "pageSize=" + chartTotal);
                surl = surl.replace(/page=(\d+)/, "page=0");
            } else {
                surl = href;
            }


            console.log("画图" + surl)

            ajax(surl, {}, "get", "LOGIN__CHECK").done(function(resp) {
                if (!resp || resp.data.length == 0) {
                    console.log(resp.data)
                        //show_msg("数据异常");/*init bug*/

                    $("#" + id).find(".chart").empty();

                    return;
                }


                if (tempObj.isChartOpen != 0) {
                    htmlChartData(resp, id);

                } else {
                    htmlPageText(resp, id);
                }

            }).fail(function(resp) {
                show_msg("网络异常，请稍后重试！");
            }).always(function() {


            });
        }
    }
}


//chart table 切换


$(".table-select-right-change span").click(function() {
    var $this = $(this);
    var text = $this.text();
    if (!$this.hasClass("active")) {
        $this.addClass("active");
        $this.parent().find("ul").removeClass("hide");
    } else {
        $this.removeClass("active");
        $this.parent().find("ul").addClass("hide");
    }
})



$(".table-select-right-change ul li").click(function() {
    var $this = $(this);
    var text = $this.text();
    $this.parent().parent().find("span").removeClass("active");
    if (text == "图表展示") {
        //切换初始化图标所有数据

        // resultTableObj.option[0].isChartOpen=1;
        // paintChart("activeLogin");


        var fid = $this.parents('.table-box').attr('id');

        for (var i = 0; i < resultTableObj.option.length; i++) {
            if (fid == resultTableObj.option[i].id) {
                resultTableObj.option[i].isChartOpen = 1;
                paintChart(fid);
            }
        }

        $this.parents(".table-box").find(".table-box-chart").removeClass("hide");
        $this.parents(".table-box").find(".table-box-list").hide();
    } else {

        $this.parents(".table-box").find(".table-box-chart").addClass("hide");
        $this.parents(".table-box").find(".table-box-list").show();
    }


    $this.addClass("active");
    $this.siblings().removeClass("active");
    $this.parents(".table-select-right-change").find("span").text(text);
    $this.parent().addClass("hide");

})


var resizePaintChart = function() {
    for (var i = 0; i < resultTableObj.option.length; i++) {
        if (fid = resultTableObj.option[i].id) { /*不用严格模式*/
            resultTableObj.option[i].isChartOpen = 1;
            paintChart(fid);
        }
    }
}

$(window).on("resize", function() {
    resizePaintChart();
})


//chart end

//修复首页和尾页点击加载失败20160704,修复首页点击高亮选中第一页码
function showPage(nowPage, totalCell, pageurl, fid) {
    console.log(pageurl);
    nowPage = parseInt(nowPage);
    var newPages = $("#" + fid).find('.pageChangeSize').val();
    var totalPage = Math.ceil(totalCell / newPages);
    $("#" + fid).find(".page-total").text(totalCell);
    var phtml = '';
    if (nowPage == 1) {
        var surl = pageurl.replace(/page=(\d+)/, "page=" + 0);
        phtml += "<li class='first'><a href='javascript:;' data='" + surl + "' page='1'>首页</a></li>";

    } else {
        var surl = pageurl.replace(/page=(\d+)/, "page=" + 0);
        phtml += "<li class='first'><a href='javascript:;' data='" + surl + "' page='" + 1 + "' >首页</a></li>";

    }


    if (totalPage <= 7) {
        for (var i = 1; i <= totalPage; i++) {
            var nurl = pageurl.replace(/page=(\d+)/, "page=" + (i - 1));
            if (nowPage == i) {
                phtml += "<li class='active'><a href='javascript:;'  data='" + nurl + "' page='" + i + "' >" + i + "</a></li>";
            } else {
                phtml += "<li><a href='javascript:;' data='" + nurl + "' page='" + i + "'>" + i + "</a></li>";
            }

        }
    } else {
        if (nowPage - 3 <= 1) {
            for (var i = 1; i <= 5; i++) {
                var nurl = pageurl.replace(/page=(\d+)/, "page=" + (i - 1));
                if (nowPage == i) {
                    phtml += "<li class='active'><a href='javascript:;'  data='" + nurl + "' page='" + i + "'>" + i + "</a></li>";
                } else {
                    phtml += "<li><a href='javascript:;' data='" + nurl + "' page=" + i + ">" + i + "</a></li>";
                }
            }
            phtml += "<li><a href='javascript:;'>…</a></li>";
            var endurl = pageurl.replace(/page=(\d+)/, "page=" + (totalPage - 1));
            phtml += "<li><a href='javascript:;' data='" + endurl + "' page=" + totalPage + ">" + totalPage + "</a></li>";
        } else {
            console.log(nowPage + "=====" + totalPage);
            if ((nowPage + 4) > totalPage) {
                var starturl = pageurl.replace(/page=(\d+)/, "page=1");
                phtml += "<li><a href='javascript:;' data='" + starturl + "' page=1>1</a></li>";
                phtml += "<li><a href='javascript:;'>…</a></li>";
                for (var i = totalPage - 4; i <= totalPage; i++) {
                    var nurl = pageurl.replace(/page=(\d+)/, "page=" + (i - 1));
                    if (nowPage == i) {
                        phtml += "<li class='active'><a href='javascript:;'  data='" + nurl + "' page='" + i + "' >" + i + "</a></li>";
                    } else {
                        phtml += "<li><a href='javascript:;' data='" + nurl + "' page=" + i + ">" + i + "</a></li>";
                    }
                }
            } else {

                var starturl = pageurl.replace(/page=(\d+)/, "page=1");
                phtml += "<li><a href='javascript:;' data='" + starturl + "' page=1>1</a></li>";
                phtml += "<li><a href='javascript:;'>…</a></li>";
                for (var i = nowPage - 1; i <= nowPage + 1; i++) {
                    var nurl = pageurl.replace(/page=(\d+)/, "page=" + (i - 1));
                    if (nowPage == i) {
                        phtml += "<li class='active'><a href='javascript:;'  data='" + nurl + "' page='" + i + "'>" + i + "</a></li>";
                    } else {
                        phtml += "<li><a href='javascript:;' data='" + nurl + "' page=" + i + ">" + i + "</a></li>";
                    }
                }
                phtml += "<li><a href='javascript:;'>…</a></li>";
                var endurl = pageurl.replace(/page=(\d+)/, "page=" + (totalPage - 1));
                phtml += "<li><a href='javascript:;' data='" + endurl + "' page=" + totalPage + ">" + totalPage + "</a></li>";
            }
        }
    }
    if (nowPage == totalPage) {
        //phtml +="<li class='last'><a href='javascript:;'>尾页</a></li>";
        var nurl = pageurl.replace(/page=(\d+)/, "page=" + (totalPage - 1));
        phtml += "<li class='last'><a href='javascript:;' data='" + nurl + "' page='" + totalPage + "' >尾页</a></li>";
    } else {
        var nurl = pageurl.replace(/page=(\d+)/, "page=" + (totalPage - 1));
        phtml += "<li class='last'><a href='javascript:;' data='" + nurl + "' page='" + totalPage + "' >尾页</a></li>";
    }

    $("#" + fid).find(".page-list-go").html(phtml);

}
