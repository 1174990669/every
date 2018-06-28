	var userCenterObj = new PageController({
	   'name': 'userCenter',
	   'tpl' : 'template/user/userCenter.html',
	   'initScrollTop': true
    }); 
// userCenterObj.goBack share huodong 立即登录 余额 
	userCenterObj.createDomObj = function(){
		this.wrapperObj = $("#userCenter_wrapperObj");
		this.userNameObj = $('#userCenter_userName'); //用户登录、名字
		this.wrapA = $('#userCenter_wrapA');
		this.wrapB = $('#userCenter_wrapB');
		this.kefuObj = $('#userCenter_kefu');
	}
	 
	userCenterObj.createEvent = function(){
		this.wrapperObj.unbind('tap').tap(function(e){
			userCenterObj.sectionEvent(e);
			
		});

	    $('#userCenter_droploadWrap').dropload({  //下拉刷新
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				if(loginObj.isLogin){
                    userCenterObj.pullLoad = me;
					userCenterObj.getData();
				}else{
					me.resetload();
					userCenterObj.destroy();
					userCenterObj.goLogin();
				}
				//me.resetload(); 
			}
	    })
	}

	userCenterObj.sectionEvent = function(e){
		var pObj = $.oto_checkEvent(e,"P");
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			switch (thisT){
				case "backbtn" : userCenterObj.goBack();return true;
				case "set" : userCenterObj.goSetting();return true;
				case "ye" : userCenterObj.goCashRecord();return true;
				case "hb" : userCenterObj.goBonusRecord();return true;  //红包
				case "jf" : userCenterObj.goScoreRecord();return true;  //积分
				case "launchlist" : userCenterObj.goBetRecord();return true;
				case "dj" : userCenterObj.goFreezeRecord();return true;
				case 'ticketList' : userCenterObj.goOpenTicketRecord();return true;
				case 'buyTicket' : userCenterObj.goBuyOpenTicket();return true;
			
			}
		}

		var liObj = $.oto_checkEvent(e,"LI");
		if(liObj){
			var thisObj = $(liObj);
			var thisT = thisObj.attr("data-t");
			switch (thisT){
				case "recharge" : this.goRecharge();return true;
				case "withdraw" : this.goWithDraw();return true;
				case "launchType" : this.goSubBetRecord(thisObj);return true;
				case "qupiao" : this.goGetTicketRecord(thisObj);return true;
			}
		}
		

		var dlObj = $.oto_checkEvent(e,"DL"); 
		if(dlObj){
			var thisObj = $(dlObj);
			var thisT = thisObj.attr("data-t");
			switch (thisT){
				case "userinfo" : this.goUserInfo();return true;
				case 'message' : this.goIm();return true;
				case 'security' : $.alertMsg('正在建设中');return true;
				case 'station' : this.goStation();return true;
				case 'memberBet' : this.goMemberBet();return true;
				case 'service': this.goService(thisObj);return true;
				case 'account': this.goAccount();return true;
				case "huodong" : this.goActivity();return true;
				case 'feedback': this.goFeedback();return true;
				case "hemai" : this.goHemai();return true;
				case 'share': Global.socialShare({'domId': 'userCenter'}); return true;
			}
		}
		
		var aObj = $.oto_checkEvent(e,"A");
		if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "clearAuthTips": $('#userCenter_authTipsObj').hide();return true;
		        case "toAuthTips": this.checkReal();return true;
		        case "clearAuthPhone": $('#userCenter_authPhoneObj').hide();return true;
		        case "toAuthPhone": this.checkPhone();return true;
				case 'login' : this.goLogin();return true;
				case 'register' : this.goRegister();return true;
			}
		}
		
	}
	
	userCenterObj.checkLogin = function(){
		if(!loginObj.isLogin){
			userCenterObj.goLogin();
			return false;		
		}
	}

    userCenterObj.goLogin = function () {
        loginObj.goBack = function () {
            userCenterObj.show(true);
        };
        loginObj.goForward = function () {
            userCenterObj.show(true);
        };
        
        loginObj.show(true);
    }
	
	userCenterObj.goRegister = function(){
		registerObj.goBack = function(){
			userCenterObj.show();	
		}
		registerObj.goForward = function(){
			// userCenterObj.show();	
			userCenterObj.show(true);	
		}
		loginObj.goBack = function(){
			userCenterObj.show();	
		}
		loginObj.goForward = function(){
			userCenterObj.show();	
		}
		registerObj.show(true);
	}
	
	//及开票订单列表
	userCenterObj.goOpenTicketRecord = function(){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		 openTicketRecordObj.show('',function(){
			   openTicketRecordObj.pushRoute(function(){
				 	userCenterObj.show();  
			   })
		  });
	}
	
	//购买即开票
	userCenterObj.goBuyOpenTicket = function(){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
	        /*buyOpenTicketObj.goBack = function(){
			buyOpenTicketObj.destroy();
			userCenterObj.show('reload');	
		}*/
		buyOpenTicketObj.show('',function(){
				buyOpenTicketObj.pushRoute(function(){
					userCenterObj.show('reload');
				})
		});
	}
	//userCenterObj.show()
	userCenterObj.goIm = function(){
		//聊天
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		if(ConfigObj.platForm == 'android'){
			if(typeof android_obj != 'undefined'){
				android_obj.intentConversationlist();
			}
		}else if(ConfigObj.platForm == 'ios'){
			if(typeof ios_obj != 'undefined'){
				ios_obj.chatClick(loginObj.access_token)
			}
		}
	}
	
	// 专属客服 或者 代理开通/管理
    userCenterObj.goService = function (obj) {
        if (!loginObj.isLogin) {
            userCenterObj.goLogin();
            return false;
        }
        var val = obj.attr('data-v');
        if (val == 'service') {
            serviceObj.goBack = function () {
                serviceObj.destroy();
                userCenterObj.show();
            };
            serviceObj.show('', function () {
            	// :)
                serviceObj.getData(userCenterObj.userInfo.sid || loginObj.userInfo.s_id);
            });
        } else if (val == 'serviceCode') {
            serviceCodeObj.goBack = function () {
                serviceCodeObj.destroy();
                userCenterObj.show();
            };
            serviceCodeObj.show();
        } else if (val == 'signProtocol') {
            signProtocalObj.goBack = function () {
                signProtocalObj.destroy();
                userCenterObj.show(true);
            };
            signProtocalObj.show();
        } else if (val == 'manageInfo') {
            manageInfoObj.goBack = function () {
                manageInfoObj.destroy();
                userCenterObj.show();
            };
            manageInfoObj.show();
		}
    };
	
	userCenterObj.goMemberBet = function(){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		memberBetRecordObj.goBack = function(){
			memberBetRecordObj.destroy();
			userCenterObj.show();	
		}
		memberBetRecordObj.show('reload')	
	}
	
	userCenterObj.goAccount = function(){
		var self = this;
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		accountObj.goBack = function(){
			accountObj.destroy();
			self.show();	
		}
		accountObj.show('reload',function(){
			accountObj.getData();
		})	
	}
	
	userCenterObj.goHemai = function(){
		var self = this;
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		myHemaiObj.goBack = function(){
			myHemaiObj.destroy();
			self.show();
		}
		myHemaiObj.show();
		
	}
	
	userCenterObj.goActivity = function(){
		var self = this;
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		activityIdxObj.goBack = function(){
			activityIdxObj.destroy();
			self.show();
		}
		activityIdxObj.show('reload',function(){
			activityIdxObj.getData();
		})
		
	}
	//nums
	userCenterObj.goFeedback = function(){
		var self = this;
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		feedbackObj.goBack = function(){
			feedbackObj.destroy();
			self.show();
		}
		feedbackObj.show('',function(){
				feedbackObj.pushRoute(function(){
					userCenterObj.show();
				})
		 })	
		
	}
	
	userCenterObj.goStation = function(){
		var self = this;
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		stationDetailObj.goBack = function(){
			stationDetailObj.destroy();
			self.show();	
		}
		stationDetailObj.show('reload',function(){
			stationDetailObj.getData(loginObj.userInfo.s_id);
		})	
	}
	
	
	//跳转到积分页面
	userCenterObj.goScoreRecord = function(){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		scoreRecordObj.goBack = function(){
			scoreRecordObj.destroy();
			userCenterObj.show();	
		}
		scoreRecordObj.show();
	}
	
	
	//跳转到冻结资金页面
	userCenterObj.goFreezeRecord = function(){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		freezeRecordObj.goBack = function(){
			freezeRecordObj.destroy();
			userCenterObj.show();	
		}
		freezeRecordObj.show();
	}
	
	//跳转到取票记录列表页
	userCenterObj.goGetTicketRecord = function(obj){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		getTicketRecordObj.goBack = function(){
			getTicketRecordObj.destroy();
			userCenterObj.show();	
		}
		getTicketRecordObj.show();
		
	}
	
	userCenterObj.goSubBetRecord = function(obj){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		var type = obj.attr('data-v');
		if(type == 'dqp'){  //待取票
			getTicketRecordObj.goBack = function(){
				getTicketRecordObj.destroy();
				userCenterObj.show()	
			}
			getTicketRecordObj.show();
		}else{
			betRecordObj.goBack = function(){
				betRecordObj.destroy();
				userCenterObj.show();	
			}
			betRecordObj.show('reload',function(){
				betRecordObj.getData(type);
			})
		}
		
	}
	
	userCenterObj.goUserInfo = function(){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		userInfoObj.goBack = function(){
			userInfoObj.destroy();
			userCenterObj.show();	
		}
		userInfoObj.show();
	}
	
	//跳转到投注记录页
	userCenterObj.goBetRecord = function(){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		betRecordObj.goBack = function(){
			betRecordObj.destroy();
			planRecordObj.destroy();
			userCenterObj.show('reload');	
		}
		planRecordObj.goBack = function(){
			planRecordObj.destroy();
			betRecordObj.destroy();
			userCenterObj.show('reload');	
		}
		betRecordObj.show();
	}
	
	//跳转到礼金记录页面
	userCenterObj.goBonusRecord = function(){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		bonusRecordObj.goBack = function(){
			bonusRecordObj.destroy();
			userCenterObj.show();	
		}
		bonusRecordObj.show();
	}
	
	//跳转到现金记录页面
	userCenterObj.goCashRecord = function(){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		cashRecordObj.goBack = function(){
			cashRecordObj.destroy();
			userCenterObj.show();	
		}
		cashRecordObj.show();
	}

    //跳转到充值页面
    userCenterObj.goRecharge = function () {
    	
    	
    	
    	
    	
        if (!loginObj.isLogin) {
            userCenterObj.goLogin();
            return false;
        }

        if (loginObj.userInfo) {

            var rs = loginObj.userInfo.real_status;
						
						/*  bcy
            if (rs == 'Y') {
                wechatpayWebObj.goBack = function () {
                    wechatpayWebObj.destroy();
                    userCenterObj.show(true);
                };
                // 来源为 用户中心
                wechatpayWebObj.dirShow({'from': 'userCenter'});
            } else if (rs === 'Ing') {
                $.alertMsg('您的实名认证正在审核中');
            } else if (rs === 'N' || rs === 'Fail') {
                $('#userCenter_authTipsObj').show();
            }
            */
                wechatpayWebObj.goBack = function () {
                    wechatpayWebObj.destroy();
                    userCenterObj.show(true);
                };
                // 来源为 用户中心
                wechatpayWebObj.dirShow({'from': 'userCenter'});            
        }
    }
	
	//跳转到提款页面
	userCenterObj.goWithDraw = function(){
		if(!loginObj.isLogin ){
            userCenterObj.goLogin();
            return false;
        }

        if (loginObj.userInfo) {
            var rs = userCenterObj.userInfo.real_status;
            var mb = userCenterObj.userInfo.is_mobile_bind;
            if (rs === 'Ing') {
                $.alertMsg('您的实名认证正在审核中');
                return false;
            } else if (rs === 'N' || rs === 'Fail') {
                $('#userCenter_authTipsObj').show();
                return false;
            } else if(mb === "N"){
            	$('#userCenter_authPhoneObj').show();
            	return false;
            }
            withdrawSelectObj.goBack = function () {
                    withdrawSelectObj.destroy();
                    userCenterObj.show('reload');
                };
            withdrawSelectObj.show(true);
        }

	}
	
	userCenterObj.checkReal = function(){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		var self = this;
		 $('#userCenter_authTipsObj').hide();
		 regRealNameObj.goBack=function(){
			 regRealNameObj.destroy();
			 self.show();  
		  }
		  regRealNameObj.show('reload',function(){
			  var data = {
				'accountName': loginObj.userInfo.user_name,
				'from' : 'buy',  
			  }
			  regRealNameObj.setData(data);
		  });	
	}
	userCenterObj.checkPhone = function(){
		if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}
		var self = this;
		 $('#userCenter_authPhoneObj').hide();
		 bindPhoneObj.goBack = function () {
            bindPhoneObj.destroy();
            userCenterObj.show(true);
        };

        bindPhoneObj.show(true);
	}

	userCenterObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		$('#userCenter_kefuObj').attr("href","tel:"+ConfigObj.tel);
		if(loginObj.isLogin){
			this.getData();
		}else{
			this.formatNoLoginHtml();
		};
		if (ConfigObj.display) {
			$('#userCenter_money').show();
		} else{
			$('#userCenter_money').hide();
		}
	}

	userCenterObj.init = function(){
		userCenterObj.setDefConfig();
		userCenterObj.onloadExecution();
	}
	
	userCenterObj.setDefConfig = function(){
		userCenterObj.pullLoad = '';
	}
	
	userCenterObj.getData = function(){
        function updatePage(obj) {
        	/*$.ajax({
      			url : ConfigObj.localSite + "?version=1&m=user.account.login",
			    data : secretData,
			    type : "post",
			    dataType : "json",
			    success : function(obj){
			    	console.log(obj)
        		}
        	})*/
        	// $('.back1-img').html(localStorage.getItem("lastname"))
        	// console.log(localStorage.getItem("lastname"))
        	// document.getElementById("result").innerHTML = ;
			// console.log(obj)
			// $('#img_html').html('<p>shfjsdhj</p>')
			// var Img = undefined
			/*if (Img == undefined) {
				console.log(1)
			}else{*/
				/*var Img = ''
				// loginObj.subImg(str)
				if (Img == undefined) {
					console.log(1)
				}else{console.log(2)}*/
				// console.log(578)
				// loginObj.subImg = function(){
					// console.log(Img)
					//  nam_Img = obj.info.info.image
          			// loginObj.subImg(nam_Img)
          			// localStorage.setItem("lastname", nam_Img);
					var imgHtl = [];
        			var Img = localStorage.getItem("lastname")
					imgHtl.push('<img class="back1-img" src="'+Img+'" alt="" />')
					// console.log(imgHtl.push('<img class="back1-img" src="'+Img+'" alt="" />'))
					$('#img_html').html(imgHtl.join(''))
					// var htmA ='<img src="'+img+'" alt="" />';
	          		// console.log(imgHtl)
	          		// $('#img_html').html(htmA)
	          		// $('.back1-img').attr('src',img)
	          		// $('.back1-img').before('<img class="back1-img" src="'+img+'" alt="" />')
	          		// console.log($('.back1-img').attr('src',img))

				// }
				// loginObj.subImg()
				// console.log(Img)
				// var htmA ='<img src="'+Img+'" alt="" />'
				/*loginObj.subImg(Img)
				// console.log(Img)
				var htmA ='<img src="'+Img+'" alt="" />';
	          	console.log(htmA)
	          	$('#img_html').html(htmA)*/
			// }
			
            if (obj.code == '0000') {
            	obj.info = $.parseJSON(Global.crypt(obj.info));
                userCenterObj.userInfo = obj.info;
                userCenterObj.formatHtmlA(obj.info);
                userCenterObj.formatHtmlB(obj.info);
          		// console.log(obj.info.uId)

          		nam_Id = obj.info.uId
          		// loginObj.subImg(nam_Img) withdraw
          		localStorage.setItem("lastId", nam_Id);
                /*Sname = obj.info.showName;
                Uname = obj.info.user_name;
			console.log(Sname)
			console.log(Uname)*/

				/*if(obj.info.user_type == 'Station'){ 
				 $('#userCenter_todayBet').html('今日' + obj.info.tostationCount + '单');
				 $('#userCenter_memberBet').show();
				 //$('#userCenter_openTicket').show();
				 }else{
				 $('#userCenter_memberBet').hide();
				 $('#userCenter_openTicket').hide();
				 }*/
                userCenterObj.formatService(obj.info);
                if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
                    setTimeout(function () {  //获取新信息数
                        //android_obj.getUnreadCount();
                    }, 500)
                } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
                    setTimeout(function () {  //获取新信息数
                        //ios_obj.getUnreadCount();
                    }, 500)
                }
            } else {
                loginObj.tokenFail();
                loginObj.show();
                loginObj.goForward = function () {
                    userCenterObj.show('reload');
                }
                loginObj.goBack = function () {
                    // homeObj.show();  //原版
                    loginObj.show();
                    // userCenterObj.show('reload')
                }
            }
            if (userCenterObj.pullLoad) {
                userCenterObj.pullLoad.resetload();
            }
        }

        Global.getDataPrefCache('?version=1&m=user.account.center', {access_token: loginObj.access_token}, function (res) {
        	// console.log(res)
        	// $('.div_logo').css('display','none')
        	loginObj.goFrd()
        	 // nam_Id = res.info.uId
        	 // console.log(res.info)
          			// loginObj.subImg(nam_Img)
          			// localStorage.setItem("lastname", nam_Img);
					var imgHtl = [];
        			var Img = localStorage.getItem("lastname")
        	// var 
        	// loginObj.getUserInfo()
            updatePage(res);
        });
	}

    userCenterObj.formatService = function (obj) {
        if (obj.user_type == 'Station') {
            if (obj.station_status == 'Not') {
                $('#userCenter_service').attr('data-v', 'signProtocol');
                $('#userCenter_serviceName').html('<span class="rtlink gray">开通</span><span class="rtarrow icon"></span>');
            } else {
                $('#userCenter_service').attr('data-v', 'service');
                $('#userCenter_serviceName').html('<span class="rtlink gray">NO.' + obj.station_id + '</span><span class="rtarrow icon"></span>');
            }
        } else {
            if (obj.station_user_id && obj.station_user_id != '0') {
                $('#userCenter_service').attr('data-v', 'service');
                $('#userCenter_serviceName').html('<span class="rtlink gray">NO.' + obj.station_id + '</span><span class="rtarrow icon"></span>');
            } else {
                $('#userCenter_service').attr('data-v', 'serviceCode');
                $('#userCenter_serviceName').html('<span class="rtlink gray">添加</span><span class="rtarrow icon"></span>');
            }
        }
    }
	
	userCenterObj.formatHtmlA = function(obj){
		//bcy ,obj.user_name是字符串，用户体验差，先屏蔽掉 userCenter_wrapB back1-im
		//this.userNameObj.html(obj.user_name);
//		this.userNameObj.html('<p class="user_id">'+obj.union_id+'</p><p class="user_phone">'+(obj.showName ? obj.showName : '暂未绑定手机')+'</p>');
		// this.userNameObj.html('<p class="user_id">ID :'+obj.user_name+'</p><p class="user_phone">'+(obj.showName ? obj.showName : '暂未绑定手机')+'</p>');
		this.userNameObj.html('<p class="user_id">'+obj.user_name+'</p><p class="user_phone">'+(obj.showName ? obj.showName : '暂未绑定手机')+'</p><p style="color:transparent;padding-top:20px;">45</p>');
		// this.userNameObj.html('<p class="user_id">'+obj.user_name+'</p>'); //用户名展示
//		var html_lo = 
		var html = /*
					'<li>'+
						'<p ' +  (obj.freezingMoney ? 'data-t="dj"' : '')+ '>'+
							'<span class="font16">'+ (obj.freezingMoney ? obj.freezingMoney : '-') + '</span>'+
							'<span class="font12">冻结</span>'+
						'</p>'+
					'</li>'+*/
					'<li>'+
						'<p class="money_btn" data-t="ye">'+
							'<span class="font16 yw">' + (obj.moneyInfo.Cash ? obj.moneyInfo.Cash : '-') + '</span>'+
							'<span class="font12 bw">余额</span>'+
						'</p>'+
					'<i class="li_icon"></i></li>'+
					'<li >'+
						'<p class="money_btn" data-t="hb">'+  
							'<span class="font16 yw">'+ (obj.moneyInfo.Bonus ? obj.moneyInfo.Bonus : '-') + '</span>'+
							'<span class="font12 bw">红包</span>'+
						'</p>'+
					'</li>'
					/*'<li >'+
						'<p class="money_btn" data-t="jf">'+  user_phone 
							'<span class="font16 yw">'+ (Number(obj.moneyInfo.Score) >=0 ? obj.moneyInfo.Score : '-') + '</span>'+
							'<span class="font12 bw">积分</span>'+
						'</p>'+
					'</li>'*/;
		this.wrapA.html(html);	
	}
	
	userCenterObj.formatHtmlB = function(obj){
		/*if (obj.myBet.waitPay.nums=='0') {
			console.log(1) //注册
			$('.i_back').addClass('i_back1')
			$('#i_back1').css('background','transparent')
		}else{console.log(2)}*/
		/*if (obj.myBet.waitPrint.nums==0) {
			// $('.circle002').find('i').css('background','red')
			// $('.i_back').addClass('i_back2')
			// console.log(736)
			// $('.i_back2').css('background-color','red')
		}else{console.log(2)}*/
		/*if (obj.myBet.fail.nums==0) {
			$('.i_back').addClass('i_back3')
			$('#i_back3').css('background','transparent')
		}else{console.log(2)}
		if (obj.myBet.waitOpen.nums==0) {
			$('.i_back').addClass('i_back4')

			$('#i_back4').css('background','transparent')
		}else{console.log(2)}
		if (obj.myBet.waitPrize.nums==0) {
			$('.i_back').addClass('i_back5')

			$('#i_back5').css('background','transparent')
			console.log($('#i_back5'))
		}else{console.log(2)}*/
		var html = '<li data-t="launchType" data-v="dfk">'+
					'<span class="circle ' +  (obj.myBet.waitPay.nums == 0 ? 'c0' : '') + '"><em ' +
					'style="height:' + (obj.myBet.waitPay.rate >0 ? obj.myBet.waitPay.rate : '0') + '%;margin-top:'+ (obj.myBet.waitPay.rate >0 ? 100-obj.myBet.waitPay.rate : '100')  +'%"></em><i class="i_back">'+
					(obj.myBet.waitPay.nums > 0 ? obj.myBet.waitPay.nums : '0') +'</i></span>'+
					'<span class="font12 gray">待付款</span>'+
				'</li>'+
				'<li data-t="launchType" data-v="dcp" >'+ 
					'<span  class="circle ' +  (obj.myBet.waitPrint.nums == 0 ? 'c0' : '') + '"><em ' +
					'style="height:' + (obj.myBet.waitPrint.rate >0 ? obj.myBet.waitPrint.rate : '0') + '%;margin-top:'+ (obj.myBet.waitPrint.rate >0 ? 100-obj.myBet.waitPrint.rate : '100')  +'%"></em><i class="i_back1">'+
					(obj.myBet.waitPrint.nums > 0 ? obj.myBet.waitPrint.nums : '0') + '</i></span>'+
					'<span class="font12 gray">待出票</span>'+
				'</li>'+	
				'<li data-t="launchType" data-v="cpsb" >'+
					'<span  class="circle ' +  (obj.myBet.fail.nums == 0 ? 'c0' : '') + '"><em ' +
					'style="height:' + (obj.myBet.fail.rate >0 ? obj.myBet.fail.rate : '0') + '%;margin-top:'+ (obj.myBet.fail.rate >0 ? 100-obj.myBet.fail.rate : '100')  +'%"></em><i class="i_back ">'+
					(obj.myBet.fail.nums > 0 ? obj.myBet.fail.nums : '0') + '</i></span>'+
					'<span class="font12 gray">出票失败</span>'+
				'</li>'+
				'<li data-t="launchType" data-v="dkj" >'+ 
					'<span  class="circle ' +  (obj.myBet.waitOpen.nums == 0 ? 'c0' : '') + '"><em ' +
					'style="height:' + (obj.myBet.waitOpen.rate >0 ? obj.myBet.waitOpen.rate : '0') + '%;margin-top:'+ (obj.myBet.waitOpen.rate >0 ? 100-obj.myBet.waitOpen.rate : '100')  +'%"></em><i class="i_back ">'+
					(obj.myBet.waitOpen.nums > 0 ? obj.myBet.waitOpen.nums : '0') + '</i></span>'+
					'<span class="font12 gray">待开奖</span>'+
				'</li>'+
				'<li data-t="launchType" data-v="yzj">'+   //waitPrize
					'<span class="circle ' +  (obj.myBet.waitPrize.nums == 0 ? 'c0' : '') + '"><em ' +
					'style="height:' + (obj.myBet.waitPrize.rate >0 ? obj.myBet.waitPrize.rate : '0') + '%;margin-top:'+ (obj.myBet.waitPrize.rate >0 ? 100-obj.myBet.waitPrize.rate : '100')  +'%"></em><i class="i_back ">'+
					(obj.myBet.waitPrize.nums > 0 ? obj.myBet.waitPrize.nums : '0') +'</i></span>'+
					'<span class="font12 gray">已中奖</span>'+
				'</li>';
				/*'<li data-t="launchType" data-v="dqp">'+  //waitCollect
					'<span class="circle ' +  (obj.myBet.waitCollect.nums == 0 ? 'c0' : '') + '"><em ' +
					'style="height:' + (obj.myBet.waitCollect.rate >0 ? obj.myBet.waitCollect.rate : '0') + '%;margin-top:'+ (obj.myBet.waitCollect.rate >0 ? 100-obj.myBet.waitCollect.rate : '100')  +'%"></em><i>'+
					(obj.myBet.waitCollect.nums > 0 ? obj.myBet.waitCollect.nums : '0') +'</i></span>'+
					'<span class="font12 gray">待取票</span>'+
				'</li>'*/
		this.wrapB.html(html);	
		var em = this.wrapB.find('i');
		for(var i=0;i<em.length;i++){   //为了解决安卓低端机的兼容问题，对这个类进度条圆形相关东西做了较大修改 zhangw
			var itm = $(em[i]);
			var left = itm.parents('li').width()/2 - itm.width()/2;
//			//console.log(itm);

            var left = getComputedStyle(itm.parents('li')[0]).width/2 - getComputedStyle(itm[0]).width/2;

//          //console.log(left);

			//bcy
			//itm.css({'left': left > 0 ? left  + 'px' : '41%'})
			itm.css({'left': left > 0 ? left  + 'px' : '0%'})
		}
	}
	
	userCenterObj.goSetting = function(){
		settingObj.goBack=function(){
			settingObj.destroy();
			userCenterObj.show('reload');	
		}
		settingObj.show();
	}
	
	userCenterObj.formatNoLoginHtml = function(){
		$('#userCenter_userName').html('<a href="javascript:void(0)" data-t="login">立即登录</a>');	
		var htmlA  =   '<li>'+
							'<p class="money_btn" data-t="ye">'+
								'<span class="font16 yw">0</span>'+
								'<span class="font12 bw">余额</span>'+
							'</p>'+
						'<i class="li_icon"></i></li>'+
						'<li >'+
							'<p class="money_btn" data-t="hb">'+
								'<span class="font16 yw">0</span>'+
								'<span class="font12 bw">红包</span>'+
							'</p>'+
						'</li>'
						/*'<li >'+
							'<p class="money_btn" data-t="jf">'+  
								'<span class="font16 yw">0</span>'+
								'<span class="font12 bw">积分</span>'+
							'</p>'+
						'</li>'*/;
		$('#userCenter_wrapA').html(htmlA);
		var htmlB = '<li data-t="launchType" data-v="dfk">'+
						'<span  class="circle c0 "><em style="height:0%;margin-top:100%"></em><i >0</i></span>'+
						'<span class="font12 gray">待付款</span>'+
					'</li>'+
					 '<li data-t="launchType" data-v="dcp">'+
						'<span  class="circle c0 "><em style="height:0%;margin-top:100%"></em><i >0</i></span>'+
						'<span class="font12 gray">待出票</span>'+
					'</li>'+
					'<li data-t="launchType" data-v="cpsb" >'+
						'<span  class="circle c0 "><em style="height:0%;margin-top:100%"></em><i >0</i></span>'+
						'<span class="font12 gray">出票失败</span>'+
					'</li>'+
		           '<li data-t="launchType" data-v="dkj" >'+
						'<span  class="circle c0 "><em style="height:0%;margin-top:100%"></em><i >0</i></span>'+
						'<span class="font12 gray">待开奖</span>'+
					'</li>'+
					'<li data-t="launchType" data-v="yzj">'+
						'<span  class="circle c0 "><em style="height:0%;margin-top:100%"></em><i >0</i></span>'+
						'<span class="font12 gray">已中奖</span>'+
					'</li>';
		$('#userCenter_wrapB').html(htmlB);
	}
	
	
