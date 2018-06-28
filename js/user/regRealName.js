var regRealNameObj = new PageController({
    'name': 'regRealName',
    'tpl': 'template/user/regRealName.html'
});

/**
 * @override PageController.destroy
 */
regRealNameObj.destroy = function() {
    this.setDefConfig();
    $('#' + this.name).html('').remove();

    if (regRealNameObj.loading) Global.simpleLoading.close(regRealNameObj.loading);
};

regRealNameObj.createDomObj = function() {
    this.wrapObj = $('#regRealName_wrap');
    this.nameObj = $("#regRealName_nameObj");  //名字 user.account.regByRealName
    this.ucodeObj = $("#regRealName_ucodeObj"); //证件号码
    this.subObj = $("#regRealName_subObj");     //确定按钮
    this.tgObj = $("#regRealName_tgObj");
    this.backObj = $('#regRealName_back');
}

regRealNameObj.createEvent = function() {
    this.wrapObj.tap(function(e) {
        console.log(e)
        var spanObj = $.oto_checkEvent(e, "SPAN");
        if (spanObj) {
            var thisObj = $(spanObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT) {
                case "del":
                    regRealNameObj.delImg(thisObj);
                    return true;
            }
        }
        var divObj = $.oto_checkEvent(e, "DIV");
        if (divObj) {
            var thisObj = $(divObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT) {
                case "img":
                    regRealNameObj.getImage(thisObj);
                    return true;
            }
        }
        var aObj = $.oto_checkEvent(e, "A");
        if (aObj) {
            var thisObj = $(aObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT) {
                case "clearTip":
                    $('#regRealName_tip').hide();
                    return true;
                case "confirmTip":
                    $('#regRealName_tip').hide();
                    regRealNameObj.subUserName();
                    return true;
            }
        }

    });

    this.wrapObj.find("input").unbind('focus').focus(function() {
        $(this).parent().addClass('focus');
    });
    this.wrapObj.find("input").unbind('blur').blur(function() {
        $(this).parent().removeClass('focus');
    });

    this.subObj.unbind('tap').tap(function() {  //点击确定
        regRealNameObj.showTip();
        //regRealNameObj.subUserName();
    });
    $('#regRealName_cardType label').unbind('tap').tap(function() {
        if (!$(this).hasClass('selected')) {
            // 清空之前填写的数据
            $('#regRealName_ucodeObj').val('');
            $('#regRealName_nameObj').val('');
            [1, 2, 3].forEach(function(v) {
                var parentDiv = $('#regRealName_img_' + v);
                parentDiv.find('.js_upload_1').hide();
                parentDiv.find('.js_upload_2').show();
            });
        }
        $('#regRealName_cardType label').removeClass('selected');
        $(this).addClass('selected');
        var cardType = $(this).attr('data-v');
        if (cardType == 'passport') {
            [1, 2, 3].forEach(function(v, i) {
                $('#regRealName_picDesc_' + v).html(['证件主页', '签证页面', '手持证件'][i]);
                $('#regRealName_pic_' + v).attr('src', 'images/passport' + v + '.png');
            });
        } else {
            [1, 2, 3].forEach(function(v, i) {
                $('#regRealName_picDesc_' + v).html(['证件正面', '证件反面', '手持证件'][i]);
                $('#regRealName_pic_' + v).attr('src', 'images/z' + v + '.png');
            });
        }

    })
    this.tgObj.unbind('tap').tap(function() {
        Global.GC();
        loginObj.show();
    });

    // 只能输入合法的身份证
    var $cardInput = $('#regRealName_ucodeObj').on('input', function (e) {
        var $label = $('#regRealName_cardType label.selected');
        var v = $label.attr('data-v');
        // var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; 
        var card = $cardInput.val();
        // if(reg.test(card) === false) { 
            // console.log(reg.test)
            // console.log("身份证输入不合法"); 
            // return false; 
        // } 
        if (v === 'id_card') {
            // console.log(v)
            // console.log(124)
            // 身份证前 17 位只能是数字，最后一位只能是数字或者 Xx
            if (card.length < 18) card = card.replace(/[^\d]*/g, '');
            if (card.length = 18 && !/(\d|X|x)/.test(card[17])) card = card.substr(0, 17);
            if (card.length > 18) card = card.substr(0, 18);
        }
        $cardInput.val(card.toUpperCase());
    });

    this.backObj.unbind('tap').tap(function() {
        regRealNameObj.goBack();
    })
}

regRealNameObj.showTip = function() {
    var nameVal = $("#regRealName_nameObj").val();
    var userCode = $.trim($("#regRealName_ucodeObj").val());
    var account_name = this.accountName;
    console.log(nameVal)
    if (nameVal == '') {
        $.alertMsg('请填写姓名');
        return false;
    }
    if (userCode == '') {
        $.alertMsg('请填写证件号码');
        return false;
    }
    /* bcy
    if (this.imgArr.length < 3) {
        $.alertMsg('请上传证件照片');
        return false;
    }
    */
    $('#regRealName_name2').html($('#regRealName_nameObj').val());
    $('#regRealName_id2').html($('#regRealName_ucodeObj').val());
    $('#regRealName_tip').show();
}

regRealNameObj.subUserName = function() {
    var self = this;
    var nameVal = $("#regRealName_nameObj").val();
    var userCode = $.trim($("#regRealName_ucodeObj").val());
    var account_name = this.accountName;

    var postData = {
        'type': $('#regRealName_cardType label.selected').attr('data-v'),
        'real_name': nameVal,
        'id_card': userCode,
        'account_name': account_name
    }
	var secretData = {
			'para' : Global.encrypt(postData)
		};
    // 显示加载层
    var loading = Global.simpleLoading.open();
    Global.post('?version=1&m=user.account.regByRealName', secretData, function(msg) {
        console.log(msg);
//      Global.delCache();
		
        Global.simpleLoading.close(loading);
        if (msg.code != "0000") {
            $.alertMsg(msg.code_str);
            return false;
        }
        msg.info = $.parseJSON(Global.crypt(msg.info));
        console.log(msg.info)
        setTimeout(function() {
            $.alertMsg(msg.code_str, true);
        }, 0)
        if (self.from == 'buy') { //从购买确认页等需要验证实名的页面过来
            loginObj.addScore('real'); //增加积分
            loginObj.goForward = function() {}
            loginObj.getUserInfo(); //刷新用户信息
            setTimeout(function() {
                self.goBack();
            }, 1500)
        }
        else if (self.from == 'cashier') { //从购买完成后的页面过来
            loginObj.addScore('real'); //增加积分
            loginObj.goForward = function() {}
            loginObj.getUserInfo(); //刷新用户信息
            setTimeout(function() {
                self.goBack();
            }, 1500)
        }
         else if (self.from == 'userInfo') {
            //在用户资料页面进行实名认证
            loginObj.addScore('real'); //增加积分
            loginObj.goForward = function() {};
            loginObj.getUserInfo(); //刷新用户信息
            $.alertMsg(msg.code_str);
            setTimeout(function() {
                    self.goBack();
                }, 1500)
                //点石彩不是实时，有审核，原流程注释
                /*verifyInfoObj.goBack = function(){
                 self.destroy();
                 verifyInfoObj.destroy();
                 userInfoObj.show();
                 }
                 setTimeout(function(){
                 verifyInfoObj.show();
                 }, 1500)*/
        } else if (self.from == 'scoreAct') {
            loginObj.addScore('real'); //增加积分
            loginObj.goForward = function() {}
            loginObj.getUserInfo(); //刷新用户信息
            setTimeout(function() {
                self.destroy();
                scoreActObj.show('reload', function() {
                    scoreActObj.getData();
                })
            }, 1500)
        } else {
            loginObj.goForward = function() {
                loginObj.addScore('real'); //增加积分
                userCenterObj.goBack = function() {
                    userCenterObj.destroy();
                    homeObj.show();
                }
                setTimeout(function() {
                    userCenterObj.show();
                }, 1500)
            }
            setTimeout(function() {
                Global.GC();
                loginObj.show();
            }, 1500)
        }
    }, function() {
        Global.simpleLoading.close(loading);
        $.alertMsg('请求失败！请检查您的网络连接。');
    });
}

regRealNameObj.getImgSource = function(num) {
    var str = '';
    for (var i = 0; i < this.imgArr.length; i++) {
        if (this.imgArr[i].num == num) {
            str = this.imgArr[i].img;
        }
    }
    return str;
}
regRealNameObj.getImage = function(obj) {
    var parNode = obj.parents('.paper-item');
    var val = parNode.attr('data-v');
    var type = obj.attr('data-v');

    regRealNameObj.loading = Global.simpleLoading.open({
        //疑问 为什么要加延时器 //暂时减少时间 
        //怀疑：用户操作超出原定延时器的时间 在图片数据获取成功后 调用的close方法中的参数变为空 产生冲突造成卡死现象
        timeOut: 2000
    });

    if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
        android_obj.getCamraImage(type, val);
    } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
        ios_obj.getCamraImage(type, val);
    }
}

regRealNameObj.addImg = function(img, num) {
    var parDiv = $('#regRealName_img_' + num);
    //console.log(num, img)
        // 把处理的好的图片给用户看看呗（可选）
    parDiv.find('.js_upload_1').show();
    parDiv.find('.js_upload_2').hide();
    parDiv.find('.js_upload_1').find('img').attr('src', img);
    var data = {
        num: num,
        img: img
    }
    regRealNameObj.imgArr.push(data);
    // Global.simpleLoading.close(regRealNameObj.loading);
}

regRealNameObj.delImg = function(obj) {
    var num = obj.attr('data-v');

    var parDiv = obj.parents('.paper-item');
    parDiv.find('.js_upload_1').hide();
    parDiv.find('.js_upload_1').find('img').attr('src', '');
    parDiv.find('.js_upload_2').show();
    var idx = -1;
    for (var i = 0; i < this.imgArr.length; i++) {
        var itm = this.imgArr[i];
        if (itm.num == num) {
            idx = i;
        }
    }
    if (idx != -1) {
        this.imgArr.splice(idx, 1)
    }
}

regRealNameObj.setData = function(obj) {
    this.accountName = obj.accountName;
    this.from = obj.from;
    /* if(!this.from){
    	$('#regRealName_tgObj').show();   
     }else{  //必须实名的流程不能显示跳过
    	$('#regRealName_tgObj').hide();
     }*/
}

regRealNameObj.setDefConfig = function() {
    this.accountName = '';
    this.from = '';
    this.imgArr = [];
}

regRealNameObj.onloadExecution = function() {
    this.setDefConfig();
    this.createDomObj();
    this.createEvent();
}

regRealNameObj.init = function() {
    regRealNameObj.onloadExecution();
}