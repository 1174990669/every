var userInfoObj = new PageController({
    'name': 'userInfo',
    'tpl': 'template/user/userInfo.html'
});

userInfoObj.createDomObj = function() {
    this.sectionObj = $("#userInfo_sectionObj");
    this.backObj = $("#userInfo_backObj");
    this.modifyName = $('#userInfo_modifyName'); 
    // this.bindMobile = $('#userInfo_bindMobile');
    this.stationId = $('#userInfo_stationId');
    this.lastLoginTime = $('#userInfo_lastLoginTime');
    this.nameImg = $('#name_img');//用户头像#name_img  
    // console.log(1)
    this.dropload = undefined;
    $('#name_img').tap(function(){$('#div-butn').show()}) 
    $('#inp_but').tap(function(){$('#div-butn').hide()})

    $('#Photograph').tap(function(){console.log(1)})//拍照

    $('#Album').tap(function(){console.log(2)})//相册

    this.sectionObj.dropload({
        scrollArea: window, // 滑动区域，默认就是绑定元素自身
        distance: 200, // 拉动距离
        loadUpFn: function(me) { // 下拉刷新函数
            this.dropload = me;
            this.getData();
        }.bind(this)
    });

}

userInfoObj.createEvent = function() {
    this.sectionObj.unbind('tap').tap(function(e) {
        userInfoObj.sectionEvent(e);
    });

    this.backObj.unbind('tap').tap(function() {
        userInfoObj.goBack();
    });
}

userInfoObj.sectionEvent = function(e) {
    var dlObj = $.oto_checkEvent(e, "DL");
    if (dlObj) {
        var thisObj = $(dlObj);
        var thisT = thisObj.attr("data-t");
        switch (thisT) {
            case "href":
                this.hrefUserInfo(thisObj);
                break;
        }
        return true;
    }
}

userInfoObj.hrefUserInfo = function(obj) {
    var thisV = obj.attr("data-v");
//    console.log(thisV);
    switch (thisV) {
        case 'modifyusername':
            this.goModifyUserName();
            break;
        case 'modifyphone':
            this.goModifyPhone();
            break;
        case 'verify':
            this.goVerifyId();
            break;
        case 'mybanklist':
            this.goEbankList();
            break;
        case 'modifypwd':
            this.goModifyPwd();
            break;
        case 'stationinfo':
            this.goStationInfo();
            break;
        case 'setNoteName':
            this.goSetNoteName();
            break;
        case 'bindWX': this.bindSocial('wx'); break;
        case 'bindQQ': this.bindSocial('qq'); break;
    }
}

//修改用户名
userInfoObj.goModifyUserName = function() {
    modifyUserNameObj.goBack = function() {
        modifyUserNameObj.destroy();
        userInfoObj.show('reload');
    }
    modifyUserNameObj.show();
}

/**
 * 修改绑定手机号
 */
userInfoObj.goModifyPhone = function() {
//  //console.log(loginObj.userInfo);

    bindPhoneObj.goBack = function() {
        bindPhoneObj.destroy();
        userInfoObj.show(true);
    };

    if (loginObj.userInfo.is_mobile_bind == 'N') {
        // 之前没有绑定过手机号，直接绑定新的手机号

        bindPhoneObj.goBack = function () {
            bindPhoneObj.destroy();
            userInfoObj.show(true);
        };

        bindPhoneObj.show(true);
    } else if (loginObj.userInfo.is_mobile_bind == 'Y') {
        // 之前绑定过手机号，修改绑定手机号
        /*
            bindPhoneObj.show('reload', function () {
                bindPhoneObj.setDefConfig({preBindStatus: true});
                $('#bindPhone_head').html('修改手机');
            });
            */
        modifyPhoneObj.goBack = function() {
            modifyPhoneObj.destroy();
            userInfoObj.show(true);
        };
        modifyPhoneObj.show();
    }
};

//修改密码
userInfoObj.goModifyPwd = function() {

    modifyPwdObj.goBack = function() {
        modifyPwdObj.destroy();
        userInfoObj.show('reload');
    }
    modifyPwdObj.show();

}

//修改用户名
userInfoObj.goSetNoteName = function () {
    modifyUserNameObj.goBack = function() {
        modifyUserNameObj.destroy();
        userInfoObj.show('reload');
    }
    modifyUserNameObj.show();
};




/**
 * 绑定社交账号
 * @param {string} platform 平台，wx, qq
 */
userInfoObj.bindSocial = function (platform) {
    console.log(454)
    var id = userInfoObj.social[platform][0];
    var secret = userInfoObj.social[platform][1];

    if (ConfigObj.platForm == 'android') {
        android_obj.getPlatformInfo('bind', platform, id, secret);
    } else if (ConfigObj.platForm == 'ios') {
		ios_obj.getAuthWithUserInfoFromWechat('bind');		
    }
};

/**
 * 绑定社交账号
 * @param platform
 * @param uid
 * @param name
 * @param iconurl
 */
userInfoObj.doBindSocial = function (platform, uid, name, iconurl) {
    var postData = {
        access_token: loginObj.access_token,
        platform: platform,
        uid: uid,
        name: name,
        iconurl: iconurl
    };

    Global.post('?version=1&m=user.account.socialBind', postData, function (res) {
        // console.log(res)
        if (res.code == '0000') {
            $.alertMsg(res.code_str, true);
            
            userInfoObj.getData(); // 重新加载
        }
        else $.alertMsg(res.code_str);
    });
};

//银行信息 secret
userInfoObj.goEbankList = function() {
    Global.checkRealStatus({
        yes: function() {
            ebankListObj.goBack = function() {
                ebankListObj.destroy();
                userInfoObj.show(true);
            };
            ebankListObj.show(true, function() {
                ebankListObj.getData();
            });
        },
        realAuthBack: function() {
            ebankListObj.destroy();
            userInfoObj.show(true);
        }
    });
}

//身份验证
userInfoObj.goVerifyId = function() {
    var self = this;
    if (self.real_status == 'Y') {
        /*
			verifyIdObj.goBack = function(){
				verifyIdObj.destroy();
				userInfoObj.show('reload');	
			}
            verifyIdObj.setConfigData({realType: loginObj.userInfo.real_type});
			verifyIdObj.show();
			*/
        // 直接显示实名信息
        verifyInfoObj.goBack = function() {
            verifyIdObj.destroy();
            userInfoObj.show(true);
        }

        verifyInfoObj.show();
    } else if (self.real_status == 'Ing') {
        verifyInfoObj.goBack = function() {
            verifyIdObj.destroy();
            userInfoObj.show(true);
        }

        verifyInfoObj.show();
    } else if (self.real_status == 'N') {
        regRealNameObj.goBack = function() {
            regRealNameObj.destroy();
            self.show('reload');
        }
        regRealNameObj.show('', function() {
            var data = {
                'accountName': loginObj.userInfo.user_name,
                'from': 'userInfo',
            }
            regRealNameObj.setData(data);
        });
    }
}

//站点信息
userInfoObj.goStationInfo = function() {
    /*stationInfoObj.goBack = function(){
    	stationInfoObj.destroy();
    	userInfoObj.show('reload');	
    }
    stationInfoObj.show('reload',function(){
    	stationInfoObj.getData(loginObj.userInfo.s_id);	
    });*/

    var self = this;
    stationDetailObj.goBack = function() {
        stationDetailObj.destroy();
        self.show();
    }
    stationDetailObj.show('reload', function() {
        stationDetailObj.getData(loginObj.userInfo.s_id);
    })
}

//获取用户信息
userInfoObj.getData = function() {
    var self = this;
    var postData = {
    	'appKey':ConfigObj.appkey,
    	'channel_number': ConfigObj.zdid,
    }
    var secretData = {
        'access_token': loginObj.access_token,
        'para': Global.encrypt(postData)
    }
    $.ajax({
        url: ConfigObj.localSite + '?version=1&m=user.account.user_Info',
        data: secretData,
        type: "post",
        dataType: "json",
        success: function(obj) {
        	console.log(obj);
        	
            if (self.dropload) {
                // 重置下拉刷新
                self.dropload.resetload();
                self.dropload = undefined;
            }
            userInfoObj.hideLoading();
            if (obj.code == '0000') {
            	obj.info = $.parseJSON(Global.crypt(obj.info));
               console.log('用户资料返回：', obj.info);
                loginObj.userInfo = obj.info;
                userInfoObj.social = obj.info.social;
                //console.log(obj.info.social);
                localStorage.setItem('social', JSON.stringify(obj.info.social));
                self.formatHtml(obj.info);
            } else {}

            var imgHt = [];
                    var Img = localStorage.getItem("lastname")
                    console.log(Img)
                    imgHt.push('<img class="back1-img" src="'+Img+'" alt="" />')
                    // console.log(imgHtl.push('<img class="back1-img" src="'+Img+'" alt="" />'))
                    $('#img_html').html(imgHt.join(''))
        },
        error: function() {
            if (self.dropload) {
                // 重置下拉刷新
                self.dropload.resetload();
                self.dropload = undefined;
            }
            userInfoObj.hideLoading();
        }
    });
}

userInfoObj.hideLoading = function() {
    $('#userInfo_loading').hide();
    $('#userInfo_sectionObj').show();
}


userInfoObj.formatHtml = function(obj) {
	//console.log(obj.social);
    var html = '';
    html += '<dl class="clearfix" data-t="href" data-v="setNoteName">' +
        ' <dt><span class="info-icon info-name"></span></dt>' +
        '<dd> ' +
        '<p class="font16">用户昵称</p>' +
        '<p class="font12 gray">' + obj.user_name + '</p>' +
        '</dd>';
// 	html += '<dl class="clearfix">' +
//      ' <dt><span class="info-icon info-name"></span></dt>' +
//      '<dd> ' +
//      '<p class="font16">用户ID</p>' +
//      '<p class="font12 gray">' + obj.union_id + '</p>' +
//      '</dd>';
    if (obj.status_cn == '冻结' || obj.effective == 'N') {
        html += '<span class="rtbox"><em class="fontred">冻结</em></span>';
    } else {
        html += '<span class="rtbox"><em class="fontblue">正常</em></span>';
    }
    html += '</dl>';
    this.modifyName.html(html);
	
    // 不是使用手机号注册，不显示登录密码，然后显示绑定手机项目  doBindSocial
    if (obj.mobile.length == 11) {
        $('#userInfo_password_dl').show();
        $('#userInfo_bindMobile_mobile').text(obj.mobile);
        $('#userInfo_bindMobile_text').text('更换');
    }else{
    	$('#userInfo_bindMobile_text').text('绑定');
    }

//  if (obj.is_mobile_bind == 'Y') {
//      $('#userInfo_bindMobile_mobile').html(obj.mobile.substr(0, 3) + '****' + obj.mobile.substr(7));
//      $('#userInfo_bindMobile_text').html('修改');
//  }
    if (!obj.social || !obj.social.wx || !obj.social.wx.length) $('#userInfo_bindWX_dl').hide(); // 没有配置社交平台账号
    else {
        if (!obj.wx_uid || obj.wx_uid == '') {
        	$('#userInfo_bindWX_text').text('绑定');
       } else {
       	$('#userInfo_bindWX_text').text('更换');
       	$('#userInfo_bindWX_r').text('已绑定，可直接用微信登录')
       }
    }

    this.lastLoginTime.html('上次登录 : ' + obj.loginTime);
    this.stationId.html('No.' + obj.station_id);
    this.real_status = obj.real_status;
    if (obj.real_status == 'Y') {
        $('#userInfo_verifyText').html('<em class="gray">查看</em><em class="rtarrow icon"></em>');
    } else if (obj.real_status == 'N') {
        $('#userInfo_verifyText').html('<em class="gray">认证</em><em class="rtarrow icon"></em>');
    } else if (obj.real_status == 'Ing') {
        $('#userInfo_verifyText').html('<em class="gray">审核中</em><em class="rtarrow icon"></em>');
    } else if (obj.real_status == 'Fail') {
        // TODO 兼容原来逻辑，将 审核失败 作为 未实名
        this.real_status = 'N';
        $('#userInfo_verifyText').html('<em class="gray">不通过</em><em class="rtarrow icon"></em>');
    }
    if (obj.bank_card_num > 0) {
        $('#userInfo_bankcardText').html('<em class="gray">查看</em><em class="rtarrow icon"></em>');
    } else {
        $('#userInfo_bankcardText').html('<em class="gray">添加</em><em class="rtarrow icon"></em>');
    }
}



userInfoObj.onloadExecution = function() {
    this.createDomObj();
    this.createEvent();
    this.getData();
}

userInfoObj.init = function() {
    userInfoObj.setDefConfig();
    userInfoObj.onloadExecution();
}

userInfoObj.setDefConfig = function() {
    this.real_status = '';
}