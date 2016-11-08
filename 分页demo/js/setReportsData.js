function isSwitch() {
    return $(".switch").hasClass("on") ? 1 : 0;
}


$(".switch").click(function() {
    $(this).toggleClass("on");
})

function isEmail(strEmail) {
    if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
        return true;
}

var _hasEmail = function() {
    var res = [];
    var emailLength = $(".get-email-box input").length;
    for (var i = 0; i < emailLength; i++) {
        res.push($(".get-email-box input").eq(i).val());
    }
    return res;
}

$(".email-add-img").click(function() {

    var sendEmail = $(".send-email");
    var emailVal = sendEmail.val();
    var getEmailBox = $(".get-email-box");

    if (!isSwitch()) {
        show_msg("订阅后才能操作");
        return;
    }

    if (emailVal == "") {
        show_msg('接收邮件不能为空');
        return;
    }

    if (!isEmail(emailVal)) {
        show_msg('接收邮件格式不对，请核对');
        return;
    }

    if ($.inArray(emailVal, _hasEmail()) > -1) { /* 》-1存在 */
        show_msg('邮箱重复，请核对');
        return;
    }

    var inputText = '<input type="text"  readonly="readonly" value="' + emailVal + '" placeholder="对应的版本编号" />';
    getEmailBox.append(inputText);
    sendEmail.val('');
    console.log(_hasEmail())
})

$(".send-email").keydown(function(e) {
    if (e.keyCode == "13") {
        $(".email-add-img").click();
    }
});

$(".get-email-box").on("click", "input", function(e) {
    var $this = $(this);
    var x = e.pageX;
    var y = e.pageY;
    var offLeftX = $(this).offset().left;
    var offTopY = $(this).offset().top;
    var delInputFlag = x <= offLeftX + 259 && x > offLeftX + 219 && y > offTopY && y <= offTopY + 28;
    if (delInputFlag) {
        $this.remove();
    }
})

$(".select-channel-btn").click(function() {
    $(".channel-mask-box-content").show();
});

$("#reportsSureChannel").click(function() {
    $(".channel-mask-box-content").hide();
});
$("#reportsCancelChannel").click(function() {
    $(".channel-mask-box-content").hide();
});

$(".mask").click(function() {
    $(".channel-mask-box-content").hide();
});


$("#reportsSureChannelUpdate").click(function() {
    $(".channel-mask-box-content").hide();

    //ajax
    show_msg("更新数据")
});




// check相关
$(".config-data-item-box .config-data-item").each(function(index, el) {

    var $this = $(this);
    var $tableCheck = $(this).find("li").find('.checkbox');
    var $allCheck = $(this).find("h2").find('.checkbox');

    $tableCheck.click(function(e) {
        $this = $(this);
        var hasChecked = $this.hasClass("active");
        if (hasChecked) {
            $this.removeClass("active");
        } else {
            $this.addClass("active");
        }

        var $allCheck = $this.parents(".config-data-item").find("h2").find('.checkbox');
        var $tableCheck = $this.parents(".config-data-item").find("li").find('.checkbox');

        if ($tableCheck.hasClass("active")) { //*单选模式--只要小选项checkbox勾线一个总览的checkbox就勾选，全部不勾则也不勾*/
            $allCheck.addClass("active");
        } else {
            $allCheck.removeClass("active");
        }

    })

    $allCheck.click(function() {
        $this = $(this);
        var hasChecked = $this.hasClass("active");
        if (hasChecked) {
            $this.removeClass("active");
            $tableCheck.removeClass("active");
        } else {
            $this.addClass("active");
            $tableCheck.addClass("active");
        }

    })


});


//mask channel check
//动态添加删除渠道 同步更新
$(".channel-mask-box").each(function(index, el) {

    var $this = $(this);
    var $tableCheck = $(this).find(".config-data-item li").find('.checkbox');
    var $allCheck = $(this).find("h2").find('.checkbox');

    var _addJustAllCheckAdd = function() {
        $allCheck.addClass("active");
        $tableCheck.each(function(i, o) {
            if (!$(o).hasClass("active")) {
                $allCheck.removeClass("active");
            }
        });
    }
    _addJustAllCheckAdd();


    $(".channel-mask-box").on("click",".checkbox",function(){
            $this = $(this);
            var hasChecked = $this.hasClass("active");
            var dataValue = $this.attr("data-value");
            var changeObj = $(".set-channel-box");
            var inputText = '<input type="text"  readonly="readonly" value="' + dataValue + '" placeholder="对应的版本编号" />';
            if (hasChecked) {
                $this.removeClass("active");
                changeObj.find("input[value='" + dataValue + "']").remove();
            } else {
                $this.addClass("active");
                changeObj.append(inputText);
            }
            _addJustAllCheckAdd(); /*switch all checked*/
    }) 
     



    $allCheck.click(function() {
        $this = $(this);
        var hasChecked = $this.hasClass("active");
        var dataValue = $this.attr("data-value");
        var changeObj = $(".set-channel-box");
        var inputText = '<input type="text"  readonly="readonly" value="' + dataValue + '" placeholder="对应的版本编号" />';
        var addAllChanel = function() {
            console.log("add all");
            $(".set-channel-box").find("input").remove();
            $(".channel-mask-box li").find(".checkbox.active").each(function(index, item) {
                var dataValue = $(item).attr("data-value");
                var temp = '';
                temp += '<input type="text"  readonly="readonly" value="' + dataValue + '" placeholder="对应的版本编号" />';
                changeObj.append(temp);

            })

        }

        var delAllChanel = function() {
            console.log("del all");
            $(".set-channel-box").find("input").remove();
        }

        if (hasChecked) {
            $this.removeClass("active");
            $tableCheck.removeClass("active");
            delAllChanel();
        } else {
            $this.addClass("active");
            $tableCheck.addClass("active");
            addAllChanel();
        }

    })


});

$(".set-channel-box").on("click", "input", function(e) {
    var $this = $(this);
    var x = e.pageX;
    var y = e.pageY;
    var offLeftX = $(this).offset().left;
    var offTopY = $(this).offset().top;
    var delInputFlag = x <= offLeftX + 259 && x > offLeftX + 219 && y > offTopY && y <= offTopY + 28;
    if (delInputFlag) {
        // var dataKey = $this.attr("data-key");  /*预留功能 多个渠道*/
        var dataValue = $this.val();
        $(".channel-mask-box ul li").find(".checkbox[data-value='" + dataValue + "']").removeClass("active");
        $this.remove();

    }

    var $allCheck = $(".channel-mask-box").find("h2").find('.checkbox');

    $allCheck.removeClass("active"); /*只要执行删除肯定不是全选 所以要取消选中 注意这个逻辑 */


})

$("#reportsSure").click(function() {

    //依次添加自定义数据参数
    var setBasicData = $(".basicData li .checkbox.active");
    console.log(_getValue(setBasicData));
    show_msg("选中" + _getValue(setBasicData));

    //ajax

})

$("#reportsCancel").click(function() {
    //重置
    $(".main-box").find(".checkbox").removeClass("active");
    $(".channel-mask-box").find(".checkbox").removeClass("active");
    $(".get-email-box input,.set-channel-box input").remove();

})
