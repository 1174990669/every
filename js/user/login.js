
  var loginObj = new PageController({
     'name': 'login',
     'tpl' : 'template/user/login.html'
  });

  
  loginObj.setDefConfig = function(){
    loginObj.userInfo = '';
      loginObj.access_token = '';
    loginObj.imToken = '';
      loginObj.isLogin = false;
      loginObj.needImgCode = false;
      loginObj.last_time = '';
  }

  loginObj.createDomObj = function(){ 
    this.showPwdObj = $("#login_showPwdObj");
    this.pwdDivObj = $("#register_smsCode"); //请输入密码改为短信验证码
    // this.pwdDivObj = $("#login_pwdDivObj"); //请输入密码
    this.userNameObj = $("#login_userNameObj"); //手机号码
    this.submitloginObj = $("#login_submitlogin"); //登录按钮
    this.switchObj = $("#login_switchObj");
  this.regBtn = $('#login_regBtn');
  this.backBtn = $('#login_backBtn');
  this.findPwd = $('#login_findPwd');
  this.wrapperObj = $('#login_wrapperObj');
     console.log(170) 
  $('#regist_updateMsg').unbind('tap').tap(function(){
      // console.log(179) 
        loginObj.getMsg()
    })
  }

  loginObj.getMsg = function () { //regist_updateMsg
      if ($('#regist_updateMsg').hasClass('alreadysend')) return;  
        var userName = $('#login_userNameObj').val();
        // console.log(userName)
        if (userName.length == 0) {$.alertMsg('请先填写手机号码'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手机号码格式错误'); return false;}

        $('#regist_updateMsg').html('发送中');

        console.log(userName)
        Global.post('?version=1&m=cashier.excep.ali_message', {mobile: userName,summary: 'register'}, function (req) {
            if (req.code == '0000') $.alertMsg('短信验证码发送成功', true);
            else $.alertMsg(req.code_str);
//socialAuthCallBack updateMsg
            $('#regist_updateMsg').html('60秒后再次发送');

            var i = 60;
            registerObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(registerObj.msgInterval);
                    $('#regist_updateMsg').removeClass('alreadysend').html('获取短信验证码');
                    return;
                }
                $('#regist_updateMsg').addClass('alreadysend').html(--i + '秒后再次发送');
            }, 1000);
            /*if (req.code == '0000') $.alertMsg('短信验证码发送成功', true);
            else $.alertMsg(req.code_str);
            $('#regist_updateMsg').html('60秒后再次发送');

            var i = 60;
            loginObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(loginObj.msgInterval);
                    console.log(55)
                    $('#regist_updateMsg').removeClass('alreadysend').html('获取短信验证码');
                    return;
                }
                $('#regist_updateMsg').addClass('alreadysend').html(--i + '秒后再次发送');
            }, 1000);*/
        }, function () {})
    }
loginObj.goForward = function(){
    console.log(696)
      userCenterObj.show(); 
    }
  loginObj.showPwd = function(){
    if(this.switchObj.hasClass('move')){
    var val = $('#login_pwdM').val();
      this.pwdDivObj.html('<input type="password" placeholder="请输入密码" id="login_pwdA" value="'+ val +'">');
      this.switchObj.removeClass('move');
      this.switchObj.prev().hide();
      this.switchObj.next().show();
    }else{
    var val = $('#login_pwdA').val();
      this.pwdDivObj.html('<input type="text" placeholder="请输入密码" id="login_pwdM" value="'+ val +'">');
      this.switchObj.addClass('move');
      this.switchObj.prev().show();
      this.switchObj.next().hide();
    }
    /*this.pwdDivObj.find("input").focus(function() {
      loginObj.pwdDivObj.parent().addClass('focus');
    });*/
    /*this.pwdDivObj.find("input").blur(function() {
      loginObj.pwdDivObj.parent().removeClass('focus');
    });*/
  }
  
  loginObj.addScore = function(type, page,callback){  
    //点石彩不知道是否有此活动，暂时注释
  /* var postData = {
    scene : type,
    args : page,
    access_token : loginObj.access_token 
   }
   $.ajax({
      url : ConfigObj.localSite + "?m=user.activity.addScore",
      data : postData,
      type : "post",
      dataType : "json",
      success : function(obj){
    //console.log(type + '积分增加:',obj);
    if(obj.code == '0000'){
      var txtObj = {
        'register' : '注册奖励',
        'firstDown' : '客户端首次登录奖励',
        'everydayLogin' :'今日登录奖励',
        'login7': '连续7天登录奖励',
        'real' : '实名注册奖励',
        'share' : '分享奖励' 
      }
          var arr = [];
      //var arr = [{name: 'login7', info:{'status':1,'display':'1','score':'100'}},
//                 {name: 'everydayLogin',   info:{'status':1,'display':'1','score':'100'}},
//             {name: 'real',info:{'status':1,'display':'1','score':'100'}}
//             ];
      for(var k in obj.info){
        if(obj.info[k] && obj.info[k]['status'] == 1 && obj.info[k]['display'] == 1){
          var tempObj = {
            'name' : k,
            'info': obj.info[k] 
          }
          arr.push(tempObj) 
        }
      }//cashier.excep.ali_message
      if(arr.length > 0){
        for(var i=0;i<arr.length;i++){
          (function(i){
            var itm = arr[i];
            var html = '<p>' + txtObj[itm.name] + '<br>' + '+' + itm.info.score + '积分</p>';
            if(i>0){
              setTimeout(function(){
                $.alertMsg(html,true);
              }, 2000 * i)
            }else{
              $.alertMsg(html,true);
            }
          })(i)
        }
      }
      setTimeout(function(){
        if(callback) callback();
      },2000)
    }else{
       //console.log(obj.code_str)
    }
      }
    });  */
  }

  /**
   * 生成 uuid，用于获取验证码图片
   */
  loginObj.genUuid = function () {
      var uuid = String(Math.random()).slice(2) + String(Math.random()).slice(2);
      loginObj.uuid = uuid;
      return uuid;
  };

  loginObj.updateImgCode = function(){
      $('#login_img').attr('src', ConfigObj.localSite + '?version=1&m=user.account.getRegImgCode&uuid=' + loginObj.genUuid());
  }

  /*loginObj.subImg=function(img){
    console.log(img)
    if (img == undefined) {
      console.log(129)
    }else{console.log(130)}
  },*/
  // loginObj.subImg=function(){
    // var Img= ''
    // console.log(nam_Img)
    /*var nam_Img 
    if (nam_Img == undefined) {
      console.log(128)
    }else{
      console.log(130)
    }
    Img = nam_Img
    console.log(Img)*/
  // }
//登录  短信验证码登录
  loginObj.submitlogin = function(){
    var userData = this.createUserData();
    // console.log()
    if (!this.checkUserName(userData[0])) return;
    if (!this.checkPassword(userData[1])) return;

    // var pwd = hex_md5(userData[1]);  //加密屏蔽
    // 
    // 
//  var postData = "userName="+userData[0]+"&passWord="+pwd;
    
    var postData = {
      userName: userData[0],
      smsCode: userData[1],
      channel_number : ConfigObj.zdid
    }

    if (loginObj.needImgCode) {
        if (userData[2].length < 1) {$.alertMsg('请输入验证码'); return false;}
//      postData += '&loginLock=true&img_code=' + userData[2] + '&uuid=' + loginObj.uuid;
        postData = {
          userName: userData[0],
          smsCode: userData[1],
          loginLock: true,
          img_code: userData[2],
          uuid: loginObj.uuid,
          channel_number : ConfigObj.zdid
        };
    }
    // console.log(postData)

      
    

  $('#login_submitlogin').text('正在登录中...');
  // return false;
//    //console.log(ConfigObj.localSite + "?m=user.account.login");
    var secretData = {
      'para' : Global.encrypt(postData)
    };
    $.ajax({
      url : ConfigObj.localSite + "?version=1&m=cashier.excep.login_message",
      // url : ConfigObj.localSite + "?version=1&m=user.account.login",
      data : secretData,
      type : "post",
      dataType : "json",
      success : function(obj){
          if(obj.code == 0000){
            obj.info = $.parseJSON(Global.crypt(obj.info));
            // console.log(obj.info)
            nam_Img = obj.info.info.image
            localStorage.setItem("lastname", nam_Img);
            loginObj.isLogin = true;
            loginObj.pwdDivObj.children('input').val('');   // 清空密码域
            loginObj.tokenWin(obj.info.token.access_token);
            loginObj.getUserInfo();
            // loginObj.needImgCode = false;
          }else{
                //loginObj.pwdDivObj.children('input').val('');   // 清空密码域
                $('#login_submitlogin').text('登录');
                $.alertMsg(obj.code_str)
            /*if (obj.last_time && Number(obj.last_time) < 0) {
                    // 错误次数过多，需要使用验证码登录
                    ConfigObj.last_time = obj.last_time;
                    loginObj.needImgCode = true;
                    $('#login_imgWrap').show();
                    $('#login_img').attr('src', ConfigObj.localSite + '?version=1&m=user.account.getRegImgCode&uuid=' + loginObj.genUuid());
                }*/
          }
    // loginObj.socialAuth()
      },
    error : function(obj){
      alert('登录失败'+ obj)
      $('#login_submitlogin').text('登录');
    }
    });
  }

  /**
   * 社交账号认证登录
   * @param platform
   * @param uid
   * @param name
   * @param iconurl
   */
  // socialAuth()
  loginObj.socialAuth = function (platform, uid, name, iconurl) {
    // console.log(ConfigObj.showWhere)
      // console.log(uid)
      var postData = {
          'platform': platform,
          'channel_number': ConfigObj.zdid,
          'data': {
              'uid': uid,
              'name': name,
              'iconurl': iconurl,
          },
          'appInfo': {
              'stationId': ConfigObj.umengChannel,     //代理即是渠道  请输入密码
              'source': ConfigObj.umengChannel,       //代理即是渠道
              'terminalId': ConfigObj.platForm == 'android' ? 2 : 3, 
          }
      };
      // console.log(postData);  
      
      Global.post('?version=1&m=user.account.socialAuth', postData, function (res) {
        // console.log(res);
          if (res.code != '0000') {
              $.alertMsg(res.code_srt);
              return;
          }
          res.info = $.parseJSON(Global.crypt(res.info));
          loginObj.isLogin = true;
          loginObj.tokenWin(res.info.token.access_token);
          loginObj.getUserInfo();
          setTimeout(function () {$('.div_logo').css('display','none')},3000);
          // $('.div_logo').css('display','none')  login_submitlogin
          // android_obj.sendNative('Uid','33');
      });
  };
 //self.createWid();  goForward setSocialLogin
  loginObj.createUserData = function(){
    var userName = this.userNameObj.val();
    console.log(userName)
    var passWord = this.pwdDivObj.val();
    console.log(passWord)
    // var imgCode = $('#login_code').val(); 
    return new Array(userName,passWord);
  }

  loginObj.loginEvent = function(){
  this.regBtn.unbind('tap').tap(function(){
    loginObj.goRegister();
  })
  this.backBtn.unbind('tap').tap(function(){
    loginObj.goBack();
  })
    this.showPwdObj.unbind('tap').tap(function(){
      loginObj.showPwd();
    });

    /* 获得焦点时显示蓝色边框 */
      var $input = this.wrapperObj.find('input');
      $input.unbind('focus').focus(function () {
          $input.parent().parent().parent().find('dl').removeClass('focus');
          $(this).parent().parent().addClass('focus');
      });
      $input.unbind('blur').blur(function () {
          $input.parent().parent().parent().find('li').removeClass('focus');
      });

    // 检查用户名
    $('#login_pwdA').focus(function () {
      if (ConfigObj.platForm !== 'ios') {
        // ios 不检查用户名
            //loginObj.checkUserName(loginObj.userNameObj.val());
    }
    });

  $('#login_updateCode').unbind('tap').tap(function () {
        loginObj.updateImgCode();
    });

    this.submitloginObj.unbind('tap').tap(function(){ //登录 login_wxlogin
      loginObj.submitlogin();
      // console.log(353)
    });
  this.findPwd.unbind('tap').tap(function(){
    if(ConfigObj.from == 'ios'){
      findPwdObj.goBack = function(){
        ConfigObj.from = '';
        location.href = ConfigObj.iosAppSite + '?pageName=home';  //跳回到iosApp 
      }
    }else{
      findPwdObj.goBack = function(){
        findPwdObj.destroy();
        loginObj.show(true);
      }
    }
    findPwdObj.show(true,function(){
      findPwdObj.setData({'type':'findPwd'})  
    });
  })

      // 微信登录 socialAuth user.account.user_Info
      $('#login_wxlogin').on('tap', function () {
          var $img = $('#login_wxlogin img');
          if ($img.hasClass('igray')) return;
          $img.addClass('igray');
          setTimeout(function () {$img.removeClass('igray')}, 5000);
          if (ConfigObj.platForm === 'android') {
              android_obj.getPlatformInfo('auth', 'wx', loginObj.social.wx[0], loginObj.social.wx[1]);
          // loginObj.setSocialLogin()  //添加唤起微信登录接口请求的方法
          $('.div_logo').css('display','block');
          // setTimeout(function () {$('.div_logo').css('display','block')},2000);
          } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
              ios_obj.getAuthWithUserInfoFromWechat('auth');  
              // console.log(2)
          }
          // console.log(auth)
          // loginObj.socialAuth()
      });

      // QQ 登录 socialAuth
      $('#login_qqlogin').on('tap', function () {
          var $img = $('#login_qqlogin img');
          if ($img.hasClass('igray')) return;
          $img.addClass('igray');
          setTimeout(function () {$img.removeClass('igray')}, 5000);

          if (ConfigObj.platForm === 'android') {
            //socialAuthCallBack
              android_obj.getPlatformInfo('auth', 'qq', loginObj.social.qq[0], loginObj.social.qq[1]);
          } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {

          }
      });
  }

  /**
   * 设置社交账号登录
   */
  loginObj.setSocialLogin = function () {
      // 显示 微信/QQ 登录
      // console.log(454)
      var s = localStorage.getItem('social');
// console.log(s) user.account.socialAuth
      if (s) {
          s = JSON.parse(s);
          loginObj.social = s;
          set(s);
      }
      var postData = {
        appKey: ConfigObj.appkey
      }
      var secretData = {
      'para' : Global.encrypt(postData)
      };
      // console.log(secretData)  user.account.socialAuth
      Global.post('?version=1&m=system.appInfo.getSocial', secretData, function (res) {
    console.log(res);
          if (res.code == '0000') {
              res.info = $.parseJSON(Global.crypt(res.info));
              localStorage.setItem('social', JSON.stringify(res.info));
              loginObj.social = res.info;
              // console.log(res.info)
              set(res.info);
          }
      });
      function set(social) {
    // console.log(social); 

          $('#login_s').hide();
          if (social.wx && social.wx.length === 2) {
            // console.log(406)
              $('#login_s').show();
              $('#login_wxlogin').show();
          } else {
            // console.log(410)
              $('#login_wxlogin').hide();
          }
//        if (social.qq && social.qq.length === 2) {
//            $('#login_s').show();
//            $('#login_qqlogin').show();
//        } else {
//            $('#login_qqlogin').hide();
//        }
      }
  };

  loginObj.checkUserName = function (name) {
      if (name.length == 0) {
          $.alertMsg('请输入用户名');
          return false;
      } else if (!/^1\d{10}$/g.test(name)) {
          $.alertMsg('手机号码格式错误');
          return false;
      } /*else if (!/^(\w{2,18}|[\u4e00-\u9fa5]{1,6})$/g.test(name)) {
          $.alertMsg('用户只能使用2-18位字符/字母/数字/下划线');
          return false;  login_submitlogin
      }*/
      return true;
  };

  loginObj.checkPassword = function (password) {
    // console.log(478)
      if (password.length === 0) {
          $.alertMsg('请输入验证码'); //login_submitlogin
          return false;
      } else if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {
          $.alertMsg('验证码格式错误');
          return false;
      } /*else if (!/^(\w{2,18}|[\u4e00-\u9fa5]{1,6})$/g.test(name)) {
     $.alertMsg('用户只能使用2-18位字符/字母/数字/下划线');
     return false; loginObj.goForward
     }*/
      return true;
  };

  //获取用户信息  goForward goFrd
  loginObj.getUserInfo = function (fn) {
      var postData = {
          'channel_number': ConfigObj.zdid
      }
      
      var secretData = {
        'para':Global.encrypt(postData),
        'access_token': loginObj.access_token
      }
      $.ajax({
          url: ConfigObj.localSite + '?version=1&m=user.account.user_Info',
          data: secretData,
          type: "post",
          dataType: "json",
          success: function (obj) {
              if (obj.code == '0000') {
                  obj.info = $.parseJSON(Global.crypt(obj.info));
                  loginObj.isLogin = true;
                  loginObj.userInfo = obj.info;
                  loginObj.userId = obj.info.user_id;   
                  // console.log(obj.info.user_id)
                  // TODO 兼容原来逻辑，将实名认证 审核失败 视为 未实名，谁让又加了一种状态呢
                  if (obj.info.real_status === 'Fail') loginObj.userInfo.real_status = 'N';
                  // console.log(521)
                  // console.log(loginObj.access_token)
                  // console(loginObj.tokenWin(token))
                  loginObj.addScore('login'); //增加积分
                  loginObj.goForward();
                  // userCenterObj.show();
                  // return false;
                  if (fn && typeof fn == 'function') fn();
                  // console.log(444)
                  if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
                      android_obj.getPushClientId();
                  } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
                      //ios_obj.getPushClientId(); 
                  }
                  //loginObj.getImToken();
              } else {
                // alert(5)
                // console.log(404) goForward user.account.login
                  loginObj.tokenFail();
              }
          },
        error : function(obj){
          // alert('登录失败')
          // $('#login_submitlogin').text('登录');
        }
      });
  }
  loginObj.goFrd=function(){
    
  }
  loginObj.getImToken = function(){
     var postData = {
      access_token:loginObj.access_token,
    }
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.chat.getToken',  
      data : postData,
      type : "post",
      dataType : "json",
      success : function(obj){
//       //console.log('获取im token 接口返回',obj);
       if(obj.code == '0000'){
        loginObj.imToken = obj.info.token;
        if(ConfigObj.platForm == 'android' && typeof android_obj != 'undefined'){
          ////console.log(loginObj.userInfo.user_id,loginObj.access_token,loginObj.imToken);
          //android_obj.imLogin(loginObj.userInfo.user_id,loginObj.access_token,loginObj.imToken );
          setTimetout(function(){  //获取新信息数
            //android_obj.getUnreadCount();  
          },3000)
        }else if(ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined'){
          //ios_obj.getRCUserInfoWith(loginObj.access_token,loginObj.userInfo.user_id,loginObj.imToken);
          setTimetout(function(){  //获取新信息数
            //ios_obj.getUnreadCount();  
          },3000)
        }
       }else{
        //console.log('获取im token失败')
       }
      }
    }); 
  }

  loginObj.setClientId = function(id){
     var postData = {
           access_token: loginObj.access_token,
           terminal: ConfigObj.platForm,
           clientId: id
    }
    $.ajax({
      url : ConfigObj.localSite +  '?version=1&m=user.account.setClientId',
      data : postData,
      type : "post",
      dataType : "json",
      success : function(obj){

//       //console.log('设置clientid',obj);
       if(obj.code == 0){

       }else{

       }
      }
    });
  }
  loginObj.goRegister = function(){
    registerObj.goBack = function(){
      registerObj.destroy();
      loginObj.show('reload');
    }
    registerObj.show('reload');
  }
  
  // loginObj.goForward = function(){console.log(527)} user.account.user_Info 
  
  loginObj.tokenFail = function(){
    console.log(1)
   try { 
    localStorage[ConfigObj.appName + 'access_token'] = "";
    console.log(2)
   } catch (e) {
    console.log('存储异常');
   }
   loginObj.setDefConfig();
         if(ConfigObj.platForm == 'android' && typeof android_obj != 'undefined'){
        //android_obj.exitImLogin();
   }else if(ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined'){
        //ios_obj.exitImLogin() 
   }
  }
  
  loginObj.tokenWin=function(str){
    // alert(2)
    // console.log(2)
    console.log(str)
    try { 
      localStorage[ConfigObj.appName + 'access_token'] = str;
      // console.log(1)
    } catch (e) {
      if(e.name == 'QuotaExceededError'){
        console.log('存储数据容量超出');
      }
    }
    loginObj.access_token = str;
    loginObj.isLogin = true;
//    //console.log('login**********token:'+loginObj.access_token);
  },
  
  //注销
  loginObj.logout = function(){
  $.ajax({
    url : ConfigObj.localSite + '?version=1&m=user.account.logout',   
      data : {'access_token':loginObj.access_token},
      type : "post",
      dataType : "json",
      success : function(msg){
        //console.log(msg);
        if(msg.code!=='0000'){
          $.alertMsg(msg.code_str);
          return false;
        }
    loginObj.tokenFail();
    if(ConfigObj.from == 'ios'){
      loginObj.goBack = function(){
        ConfigObj.from = '';
        location.href = ConfigObj.iosAppSite + '?pageName=home';  //跳回到iosApp   
      }
      loginObj.goForward = function(){        
        // alert(665)
        // console.log(577)
        ConfigObj.from = '';
        location.href = ConfigObj.iosAppSite + '?pageName=home';  //跳回到iosApp   
      }
      loginObj.show();
    }else{
      loginObj.goBack = function(){
        homeObj.show('reload'); 
      }
      loginObj.goForward = function(){
        // alert(676)
        homeObj.show(); 
        // console.log(588) user.account.user_Info
      }
      loginObj.show();
    
    }
                getImNumCallBack(0);
      }
    });
  }
  loginObj.goForward=function(){
    console.log(630)
    userCenterObj.show()
  }

  loginObj.getReg = function(){
    
    if (Number(ConfigObj.last_time) < 0) {
                // 错误次数过多，需要使用验证码登录 loginObj.getUserInfo
                loginObj.needImgCode = true;
                $('#login_imgWrap').show();
                $('#login_img').attr('src', ConfigObj.localSite + '?version=1&m=user.account.getRegImgCode&uuid=' + loginObj.genUuid());
            }
    
  }

  loginObj.onloadExecution = function(){
    this.createDomObj();
    this.loginEvent();
    this.setSocialLogin();
    this.getReg();
  }

  loginObj.init = function(){
     loginObj.onloadExecution();
  }

  loginObj.userNameFocus = function () {
      setTimeout(function () {
          try {
              // document.getElementById('login_userNameObj').focus();
          } catch (e) {
          }
      }, 100);
  }
  

