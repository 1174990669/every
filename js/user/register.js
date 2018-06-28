
	var registerObj = new PageController({
	   'name': 'register',
	   'tpl' : 'template/user/register.html'
    }); 

	registerObj.createDomObj = function(){
		this.wrapperObj = $("#register_wrapperObj"); 
		this.showPwdObj = $("#register_showPwdObj");
		this.switchObj = $("#register_switchObj");
		this.pwdDivObj = $("#register_pwdDivObj");
		this.toggleObj = $('#register_toggle');
        loginObj.setSocialLogin();
	}
//register_updateMsg back
	registerObj.createEvent = function(){
		this.wrapperObj.unbind('tap').tap(function(e){
			var pObj = $.oto_checkEvent(e,"P");
			if(pObj){
				var thisObj = $(pObj);
				var thisT = thisObj.attr("data-t");
                // console.log(thisT)
				switch(thisT){
					case "back" : registerObj.goBack();return true; 
					case "help" : $.alertMsg("正在建设中");return true;
					case "login" : registerObj.goLogin();return true;
					case 'proto' : registerObj.goProtocol();return true;
				}
			}

			var aObj = $.oto_checkEvent(e,"A");
			if(aObj){
				var thisObj = $(aObj);
				var thisT = thisObj.attr("data-t");
				switch(thisT){
					case 'subReg' :  registerObj.subFun();return true;
					
					case 'showTel' : $('#register_telTip').show();return true;
					case "clearTelTip": $('#register_telTip').hide();return true;
					
				}
			}
			
			var spanObj = $.oto_checkEvent(e,"SPAN");
			if(spanObj){
				var thisObj = $(spanObj);
				var thisT = thisObj.attr("data-t");
				switch(thisT){
					case 'updateCode': registerObj.getData();return true;
                    case 'updateMsg': registerObj.getMsg(); return true;
				}
			}
		});
		
        /*$('#login_wx').on('tap', function () {
        // console.log('微信登录')
          // loginObj.setSocialLogin();
          var $img = $('#login_wx img');
          if ($img.hasClass('igray')) return;
          $img.addClass('igray');

          setTimeout(function () {$img.removeClass('igray')}, 5000);
          if (ConfigObj.platForm === 'android') {
              // console.log(auth)
            // console.log(loginObj.social.wx[0])
            // console.log(loginObj.social.wx[1])
              android_obj.getPlatformInfo('auth', 'wx', loginObj.social.wx[0], loginObj.social.wx[1]);
              // userCenterObj.getData()
              // userCenterObj.show()
              //socialAuthCallBack
          } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
                            ios_obj.getAuthWithUserInfoFromWechat('auth');  
              console.log(2)
          }
          // console.log(auth)
          // setTimeout(function () {userCenterObj.show()},3000);
              // userCenterObj.show()

      });*/


		this.showPwdObj.unbind('tap').tap(function(){
		  registerObj.showPwd();
		});

		/* 获得焦点时显示蓝色边框 */
        var $input = this.wrapperObj.find('input');
        $input.unbind('focus').focus(function () {
            $input.parent().parent().find('li').removeClass('focus');
            $(this).parent().addClass('focus');
        });
        $input.unbind('blur').blur(function () {
            $input.parent().parent().find('li').removeClass('focus');
        });

		/**
		$('#register_userName').blur(function(){
            var userName = $(this).val();
            if (userName.length === 0) {$.alertMsg('请输入用户名'); return false}

			Global.post('?m=user.account.verifyUserName', {userName: userName}, function (data) {
                if (data.code != '0000') {
                    $.alertMsg(data.code_str);
                }
            }, function () {
            }, 2000);
        });
		**/

		/**
        $('#register_password').blur(function () {
            var password = $(this).val();
			if (password.length === 0) {$.alertMsg('请输入密码'); return false}
            if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {$.alertMsg('密码格式错误'); return false};
        });
         **/

		//扫描
		$('#register_scan').unbind('tap').tap(function(){
			registerObj.scan();
		})
	}

    registerObj.checkUserName = function (name) {
        if (name.search(/\d/) == 0) {
            $.alertMsg('用户名不能以数字开头');
            return false;
		} /*else if (!/^[\w\u4e00-\u9fa5]{2,18}$/g.test(name)) {
            $.alertMsg('用户只能使用2-18位字符/字母/数字/下划线');
            return false;
        }*/
        return true;
    };

	registerObj.showPwd = function(){
		if(this.switchObj.hasClass('move')){
		  var val = $('#register_password').val();
		  this.pwdDivObj.html('<input type="password" placeholder="6-16位字母/数字" id="register_password" value="'+val+'">');
		  this.switchObj.removeClass('move');
		  this.switchObj.prev().hide();
		  this.switchObj.next().show();
		}else{
		  var val = $('#register_password').val();
		  this.pwdDivObj.html('<input type="text" placeholder="6-16位字母/数字" id="register_password" value="'+val+'">');
		  this.switchObj.addClass('move');
		  this.switchObj.prev().show();
		  this.switchObj.next().hide();
		}
		this.pwdDivObj.find("input").focus(function() {
		  registerObj.pwdDivObj.parents('.act_box').addClass('focus');
		});
		this.pwdDivObj.find("input").blur(function() {
		  registerObj.pwdDivObj.parents('.act_box').removeClass('focus');
		});
	}
	
	registerObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}
	
	registerObj.setSid = function(sid){
		 $('#register_code2').val(sid) 	
	}
	
	registerObj.goLogin = function(){
		loginObj.goBack = function(){
			userCenterObj.show();	
		}
		loginObj.show();  	
	}

    /**
	 * 生成 uuid，用于获取验证码图片
     */
	registerObj.genUuid = function () {
		var uuid = String(Math.random()).slice(2) + String(Math.random()).slice(2);
        registerObj.uuid = uuid;
//      //console.log(uuid);
        return uuid;
    };

    registerObj.autoRefreshRegImgCode = function () {
    	/**
        registerObj.refreshRegImgCodeInterval = setInterval(function () {
            $('#register_img').attr('src', ConfigObj.localSite + '/user/account/getRegImgCode?m=user.account.getRegImgCode&uuid=' + registerObj.genUuid());
        }, 60000);  alreadysend
		**/
    };
	
	registerObj.getData = function(){
        $('#register_img').attr('src', ConfigObj.localSite + '?version=1&m=user.account.getRegImgCode&uuid=' + registerObj.genUuid());
        clearInterval(registerObj.refreshRegImgCodeInterval);
	}

    registerObj.getMsg = function () {//regist_updateMsg register_updateMsg
	    if ($('#register_updateMsg').hasClass('alreadysend')) return;
        var userName = $('#register_userName').val();
        if (userName.length == 0) {$.alertMsg('请先填写手机号码'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手机号码格式错误'); return false;}

        $('#register_updateMsg').html('发送中');

        Global.post('?m=user.account.sendMobileCode', {phone: userName, summary: 'register'}, function (req) {
        	console.log(req);
            if (req.code == '0000') $.alertMsg('短信验证码发送成功', true);
            else $.alertMsg(req.code_str);
//socialAuthCallBack updateMsg
            $('#register_updateMsg').html('120秒后再次发送');

            var i = 120;
            registerObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(registerObj.msgInterval);
                    $('#register_updateMsg').removeClass('alreadysend').html('获取短信验证码');
                    return;
                }
                $('#register_updateMsg').addClass('alreadysend').html(--i + '秒后再次发送');
            }, 1000);
        }, function () {});
    }
	
	registerObj.subFun = function(){
		var mobile = $('#register_userName').val();
		var passWord = $('#register_password').val();
		var repassWord = $('#register_repwdDivObj').val();
        var smsCode = $('#register_smsCode').val();

        // 无聊检验，balabala
        if (mobile.length == 0) {$.alertMsg('请输入手机号码'); return;}
        if (!/^1\d{10}$/.test(mobile)) {$.alertMsg('手机号码格式错误'); return;}
        if (passWord.length == 0) {$.alertMsg('请输入密码'); return;}
        if (!/^\w{6,16}$/.test(passWord)) {$.alertMsg('密码只能是6-16位字母数字'); return;}
        var windowWidth = $(window).width();
            if(windowWidth > 481){
                if (passWord != repassWord) {$.alertMsg('两次密码不一致'); return;}
            }
            /*if(windowWidth <= 480){
                // console.log(1)
            }*/
        if (smsCode.length == 0) {$.alertMsg('请输入短信验证码'); return;}

        var postData = {
            mobile: mobile,
            login_pwd: passWord,
            source: ConfigObj.umengChannel,
            re_login_pwd: repassWord,
            sms_code: smsCode,
            channel_number: ConfigObj.zdid,   //渠道号
        };
		var secretData = {
			'para' : Global.encrypt(postData)
		};
        var loading = Global.simpleLoading.open();
        $.ajax({
            url: ConfigObj.localSite + '?version=1&m=user.account.regByAstv',
            data: secretData,
            type: 'post',
            dataType: 'json',
            success: function (msg) {
                console.log(msg)
                // confirm.afterLoginCreatePid(self.wid)
                // console.log(self.wid)
//          	msg.info = $.parseJSON(Global.crypt(msg.info));
                Global.simpleLoading.close(loading);
                
                if (msg.code == '0000') {

                    // 注册成功直接调用登录接口，用于自动登录 
                    var loginPostData = {
                        userName: mobile,
                        passWord: hex_md5(passWord)
                    };
					var secretloginData = {
						'para': Global.encrypt(loginPostData)
					}
                    $.ajax({
                        url: ConfigObj.localSite + '?version=1&m=user.account.login',
                        data: secretloginData,
                        type: 'post',
                        dataType: 'json',
                        success: function (obj) {
                            console.log(obj)
                            if (obj.code == '0000') {
                            	obj.info = $.parseJSON(Global.crypt(obj.info));
                                loginObj.destroy();
                                loginObj.isLogin = true;
                                loginObj.tokenWin(obj.info.token.access_token);
                                // loginObj.isLogin
                                /*loginObj.goForward = function () {
                                    console.log(1)
                                };*/
                                // loginObj.goForward();
                                loginObj.goForward();
                                registerObj.getUserInfo(); 
                                /*confirm.afterLoginCreatePid =function(){
                                };*/
                                // console.log(1)
                                // console.log(confirm.afterLoginCreatePid())
                                // 用户中心页重新获取数据 
                                userCenterObj.getData();
                            }
                        }
                    });

                    $.alertMsg(msg.code_str, true);
                    setTimeout(function () {
//                      regSuccessObj.goBack = function () {
//                          Global.GC();
//                          homeObj.show();
//                      }
//                      regSuccessObj.show(true, function () {
//                          var data = {
//                              'accountName': $('#register_userName').val()
//                          }
//                          regSuccessObj.setData(data);
//                      });
						buyConfirmObj.show();
                    }, 1500)
                } else {
                    $.alertMsg(msg.code_str || msg.msg);
                }
            },
            error: function () {
                Global.simpleLoading.close(loading);
            }
        });
	}

    /**
	 * 注册时扫描二维码，获得代理邀请码
     */
    registerObj.scan = function () {
        if (ConfigObj.platForm == 'ios') {
            ios_obj.scanQRCode('register');
            /*
			alert('cordova 插件，typeof barcodeScanner: ' + typeof cordova.plugins.barcodeScanner);
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    alert(result.text);
                    if (result.text) {
                        var sid = '';
                        var arr = result.text.split('?')[1];
                        var arr2 = arr.split('&');
                        for (var i = 0; i < arr2.length; i++) {
                            var itm = arr2[i].split('=')[0];
                            if (itm == 'station_id') {
                                sid = arr2[i].split('=')[1]
                            }
                        }
                        registerObj.setSid(sid);
                    }
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
            */
        } else if (ConfigObj.platForm === 'android') {
            android_obj.scanQRCode('register');
        }
  }
  
   registerObj.goProtocol = function(){
		protocolObj.goBack=function(){
			protocolObj.destroy();
			registerObj.show();	
		}
		protocolObj.show();
   }
	

	registerObj.init = function(){
		registerObj.onloadExecution();
		this.getData();
	}
	
	registerObj.setDefConfig = function(){
	}
	
	registerObj.dirShow = function(obj){
	  registerObj.show();
	  if(obj.sid){
		  setTimeout(function(){
			  registerObj.setSid(obj.sid);
		  },500)
	  }
    }
	//user.account.sendMobileCode
  
