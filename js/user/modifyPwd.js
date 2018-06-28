var modifyPwdObj = new PageController({
    'name': 'modifyPwd',
    'tpl': 'template/user/modifyPwd.html'
});

modifyPwdObj.createDomObj = function () {
    modifyPwdObj.getSmsCodeObj = $('#findPwd_getsmscode');
    // this.backObj = $("#modifyPwd_backObj");  //modifyPwd_backObj
}

modifyPwdObj.createEvent = function () {
    $('#findPwd_backObj').unbind('tap').tap(function () {modifyPwdObj.goBack();});
    $('#findPwd_getsmscode').unbind('tap').tap(function () {modifyPwdObj.getSmsCode();});
    $('#findPwd_submitObj').unbind('tap').tap(function () {modifyPwdObj.submitData();});
    $('#modifyPwd_backObj').tap(function(){
            modifyPwdObj.goBack();
            // console.log(117) 
        });
}

modifyPwdObj.submitData = function () { 
    var phone = $('#findPwd_phone').val();
    var smscode = $('#findPwd_smscode').val();
    var password1 = $('#findPwd_password1').val();
    // var password2 = $('#findPwd_password2').val();

 console.log(phone);
    // 验证
    if (phone.length == 0) {$.alertMsg('请先填写手机号码'); return false;}
    if (!/^1\d{10}$/g.test(phone)) {$.alertMsg('手机号码格式错误'); return false;}
    if (smscode.length < 1) {$.alertMsg('请填写短信验证码'); return false;}
    if (password1.length == 0) {$.alertMsg('请输入密码'); return false;}
    if (!/^\w{6,16}$/g.test(password1)) {$.alertMsg('密码格式错误'); return false;}
    // if (password2.length == 0) {$.alertMsg('请再次确认密码'); return false;}
    // if (password1 != password2) {$.alertMsg('两次密码不一致'); return false;}
 // console.log(phone);
 // console.log(smscode);
 // console.log(password1); user.account.findPwd
 // console.log(password2);
    
    Global.post('?m=user.account.findPwd', {
        'mobile': phone,
        'smsCode': smscode,
        'passWord1': hex_md5(password1),
        'passWord2': hex_md5(password1)
    }, function (req) {
        console.log(req)
        
        if (req.code == '0000') {
            // $.alertMsg(req.code_str || req.msg);
            $.alertMsg('您的密码已重置',true);

            setTimeout(function () {
                userCenterObj.show()
               /* loginObj.goBack = function () {
                    userCenterObj.show();
                };
                loginObj.show();*/
            }, 1000);

        } else {
            $.alertMsg(req.code_str || req.msg);
        }
    }, function () {
    })
}

modifyPwdObj.getSmsCode = function () {
    var uId2 = localStorage.getItem("lastId")
    console.log(uId2)
    var $s = modifyPwdObj.getSmsCodeObj;

    if ($s.hasClass('alreadysend')) return;

    var phone = $('#findPwd_phone').val();
    if (phone.length == 0) {$.alertMsg('请先填写手机号码'); return false;}
    if (!/^1\d{10}$/g.test(phone)) {$.alertMsg('手机号码格式错误'); return false;}

    $s.html('发送中');

    Global.post('?m=user.account.sendMobileCode', {phone: phone, user_id:uId2}, function (req) {
        if (req.code == '0000') $.alertMsg('短信验证码发送成功', true);
        else $.alertMsg(req.code_str || req.msg);

        $s.html('60秒后再次发送');

        var i = 60;
        modifyPwdObj.msgCodeInterval = setInterval(function () {
            if (i == 0) {
                clearInterval(modifyPwdObj.msgCodeInterval);
                $s.removeClass('alreadysend').html('获取短信验证码');
                return;
            }
            $s.addClass('alreadysend').html(--i + '秒后再次发送');
        }, 1000);
    }, function () {});
}
//user.account.findPwd
modifyPwdObj.setData = function (obj) {}

modifyPwdObj.onloadExecution = function () {
    this.createDomObj();
    this.createEvent();
}

modifyPwdObj.init = function () {
    modifyPwdObj.setDefConfig();
    modifyPwdObj.onloadExecution();
}

modifyPwdObj.setDefConfig = function () {
    modifyPwdObj.defSetTime = 120;
    modifyPwdObj.setTime = 120;
    if (modifyPwdObj.msgCodeInterval) {
        clearTimeout(modifyPwdObj.msgCodeInterval);
        modifyPwdObj.msgCodeInterval = '';
    }
    this.realInfo = {};
    this.userName = '';
    this.type = '';
}


