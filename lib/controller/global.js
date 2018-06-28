var Global = {

    cache: {},

    lotteryTypeCn: { 'dlt': '大乐透', 'pl3': '排列三', 'pl5': '排列五', 'qxc': '七星彩', 'ftbrqspf': '竞彩足球胜平负', 'ftspf': '竞彩足球胜平负', 'ftfh': '竞足混投', 'spf14': '胜负彩', 'spf9': '任选9', 'tjsyy': '11选5', 'gd11x5': '广东11选5', 'hub11x5': '湖北11选5', 'jx11x5': '江西11选5', 'gx11x5': '广西11选5','hn4j1': '海南4+1' },
    //全局页面回收，重置页面变量，删除页面内容 加密 天天
    GC: function(arr) {
        var extArr = ['home', 'login']; //保留页面，目前只是首页与登录页
        if (arr && arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                if ($.inArray(arr[i], extArr) == -1) {
                    extArr.push(arr[i]);
                }
            }
        }
        //socialAuthCallBack
        var pages = $(document.body).children('div.page');
        // console.log(pages)
        var tempArr = [];
        for (var i = 0; i < pages.length; i++) {
            var itm = pages[i];
            if (itm.getAttribute('id')) {
                var pageId = itm.getAttribute('id');
                if ($.inArray(pageId, extArr) == -1) {
                    if (window[pageId + 'Obj']) {
                        if ($('#' + pageId).length > 0 && window[pageId + 'Obj'].destroy) {
                            window[pageId + 'Obj'].destroy();
                            tempArr.push(pageId);
                        }
                    }
                }
            }
        }
//      //console.log('Global.GC销毁页面', tempArr);
    },

    //获取当前显示的一级页面[class=page]
    getActivePage: function() {
        var pages = $(document.body).children('.page');
        var arr = [];
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].style.display != 'none') {
                arr.push(pages[i]);
        // console.log(54)
                $('#onLin').css('display','none');
                //return pages[i];	
            }
        }
//        //console.log(arr);
        return arr;
    },
    /* ------------------------------------ 多级路由相关 ---------------------------------- */

    getAddGoBackNum: function(controllerobj) {
        for (var i = 1; i <= 10000; i++) {
            if (controllerobj['goBack' + i] == undefined || controllerobj['goBack' + i] == null) {
                break;
            }
        }
        return i; //返回结果为当前可以添加的多级goBack函数序号
    },

    getDelGoBackNum: function(controllerobj) {
        for (var i = 10000; i >= 1; i--) {
            if (controllerobj['goBack' + i] == undefined || controllerobj['goBack' + i] == null) {

            } else {
                break;
            }
        }
        return i; //如果返回为0，则当前没有设置过多级goBack函数
    },

    clearAllGoBackNum: function(controllerobj) {
        for (var i = 1; i <= 10000; i++) {
            controllerobj['goBack' + i] = null;
        }
    },

    /* ------------------------------------ 多级路由相关 END ---------------------------------- */

    //判断token是否有效 [免登陆功能]
    checkToken: function(func) {
        var token = localStorage[ConfigObj.appName + 'access_token'];
        if (token && token != "") {
//          //console.log('[App checkToken]token已存');
            loginObj.access_token = token;
            loginObj.getUserInfo();
            loginObj.goForward = function() {
                loginObj.tokenWin(token);
                if (func) {
                    func();
                }
            };
        } else {
            if (func) func();
        }
    }, 
	
    checkUpdate: function(isTip) {
        var postData = {
            'version' : ConfigObj.version,
            'appKey': ConfigObj.appkey,
            'channel_number': ConfigObj.zdid
        }
        $.ajax({
            // url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getapp_new',
            url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getApp',
            data: postData,
            type: "post",
            dataType: "json",
            success: function(msg) {
                if (msg.code == '0000') {
                    // msg.info.package.version 是要升级的版本\  hot_down_url
                    if(msg.info.package.service_mb){
                    	ConfigObj.tel = msg.info.package.service_mb;
                    }
                    var versionText = msg.info.package.desc ? msg.info.package.desc :'点击确认升级到最新版本';
                   var overlayerStr = '';		
                   overlayerStr += '<div class="overlayer" id="getVersionLayer" data-t="hideLog">'+
									'<div class="bottomcon" data-t="nohide">'+
										'<div class="playtip">'+
											'<h3>升级版本</h3>'+
											'<p class="font14 center">'+versionText+'</p>'+
										'</div>'+
										'<p class="btn_simple">'+
											'<a href="javascript:void(0);" id="overlayerCancel" class="w50"><span class="first">取消</span></a><a href="javascript:void(0);" id="overlayerOk" class="w50"><span>确定</span></a>'+
										'</p>'+
									'</div>'+
								'</div>'
                                // console.log(overlayerStr)
					
//					if(){
//						
//						overlayerStr += '<div class="overlayer" id="getVersionLayer" data-t="hideLog">'+
//									'<div class="bottomcon" data-t="nohide">'+
//										'<div class="playtip">'+
//											'<h3>升级版本</h3>'+
//											'<p class="font14 center">'+versionText+'</p>'+
//										'</div>'+
//										'<p class="btn_simple">'+
//											'<a href="javascript:void(0);" id="overlayerOk" class="w100"><span>确定</span></a>'+
//										'</p>'+
//									'</div>'+
//								'</div>'
//						
//					}else{
//						
//						overlayerStr += '<div class="overlayer" id="getVersionLayer" data-t="hideLog">'+
//									'<div class="bottomcon" data-t="nohide">'+
//										'<div class="playtip">'+
//											'<h3>升级版本</h3>'+
//											'<p class="font14 center">'+versionText+'</p>'+
//										'</div>'+
//										'<p class="btn_simple">'+
//											'<a href="javascript:void(0);" id="overlayerCancel" class="w50"><span class="first">取消</span></a><a href="javascript:void(0);" id="overlayerOk" class="w50"><span>确定</span></a>'+
//										'</p>'+
//									'</div>'+ 1
//								'</div>'
//						
//					}
								
                    if (msg.info.package.version > ConfigObj.version) {
                    	$("body").append(overlayerStr)
                    	setTimeout(function(){
                    		//关闭的方法
                    		$("#getVersionLayer,#overlayerCancel").unbind("tap").bind("tap",function(){
					        	$(".overlayer").remove()
					        })
                    		//跳转的方法
	                    	$("#overlayerOk").unbind("tap").bind("tap",function(){
	                    		Global.getNewPackage(msg.info.package.version, msg.info.package.down_url);
	                    		$(".overlayer").remove()
	                    	})
	                    	//阻止冒泡，删除后点击弹窗的任何地方都会关闭！！
                    		$("#getVersionLayer .bottomcon").unbind("tap").bind("tap",function(){
                    			return false;
                    		})
                    	},200)
//                      layer.open({
//                          title: '升级新版本',
//                          content: "<div style='width:240px'>" + msg.info.package.desc ? msg.info.package.desc : '点击确认升级到最新版本' + "</div>",
//                          btn: ['确认', '取消'],
//                          shadeClose: false,
//                          yes: function() {
//                              layer.closeAll();
//                              
//                          },
//                          no: function() {
//                              layer.close();
//                          }
//                      })
                    } else {
                        if (isTip) {
                            $.alertMsg('已经是最新版本', true);
                        }
                    }
                } else {
                    $.alertMsg(msg.code_str);
//                  var aaa=android_obj.getAesKey();
                }
                $('#onLin').css('display','none')
            },
            error:function(ms){
                $('#onLin').css('display','block')
                // console.log($('#onLin').find('img'))
                setTimeout(function(){
                    Global.checkUpdate(isTip)
                },5000)
                // ConfigObj.localSite = 'http://a.91zibo.com/api'
            }
        });
    },

    /**
     * 获取最新包
     * @param newVersion 版本号
     * @param url 应用地址   
     */
    getNewPackage: function (newVersion, url) {
        if (!url) return;
        if (typeof android_obj != 'undefined') android_obj.downLoadApk(newVersion, url);
        else if (typeof ios_obj != 'undefined') ios_obj.callbrowser(url);
        else Global.openUrl(url);
    },



    /**
     * 打开页面，自动区分内链和外链
     * @param url
     * @param show 打开操作，重写以替换默认操作
     * @param back 返回操作，重写以替换默认操作
     */
    open: function (url, show, back) {//cashier.excep.immediate_match
        var seta = {
            'channel_number': ConfigObj.zdid,
            'examine_edit': 1.6,
        }
        url = (!url || url === null) ? window.location.href : url;
        $.ajax({
            url: ConfigObj.localSite + '?version=1&m=cashier.excep.examine_display',
            data: seta,
            type: "post",
            dataType: "json",
            success: function(msg) {
                if (msg.code == 0000) {
                    // console.log(1) system.AppInfo.getAppAuto
                     if(msg.info.examine_display == '1') {//购彩
                        ConfigObj.showWhere = true;
                    } else if(msg.info.examine_display == '2'){  //资讯
                        ConfigObj.showWhere = false;
                        android_obj.sendNative('Uid','1'); 
                    } else if(msg.info.examine_display == '3'){
                        ConfigObj.display = false;
                        ConfigObj.showWhere = true;
                    };
                    var parseSimpleUrl = function (url) {
                    var tmp = url.split('?');
                    var path = tmp[0];
                    var args = {};
        
                    if (tmp[1] && tmp[1].length) {
                        var tmp2 = tmp[1].split('&');
                        tmp2.forEach(function (v) {
                            var tmp3 = v.split('=');
                            args[tmp3[0]] = tmp3[1] ? tmp3[1] : null;
                        })
                    }
                    return {path: path, args: args};
                    };
                    var ret = parseSimpleUrl(url);
                    // base64 编码后传递过来的 JSON 串，用于特殊逻辑
                    if (ret.args._base64obj) {
                        try {
                            ret.args = unserialize(ret.args._base64obj);

                        } catch (e) {
                            ret.args.pageName = 'home';
                        }
                    }
            
                    if (ret.args && ret.args.pageName) {
                        Global.GC();
                        Global.checkToken();
                        // APP 内部链接处理
                        var page = ret.args.pageName;
                        if (window[page + 'Obj']) {
                            var pageObj = window[page + 'Obj'];
            
                            delete ret.args.pageName;
                            (back && typeof back === 'function') ? pageObj.goBack = function () {
                                back(pageObj);
                            } : pageObj.goBack = function () {
                                pageObj.destroy();
                                homeObj.show();
                            };
            
                            show = (show && typeof show === 'function') ? function () {
                                show(pageObj);
                            } : function () {
                                pageObj.dirShow(ret.args); // 显示 app 页面，需要页面配置 dirShow
                            };
                            show();
                        } else {
                            // 对应的页面没有 JS 控制器
                            homeObj.show();
                        }
                    } else if (ret.path && (ret.path.indexOf('127.0.0.1') !== -1 || ret.path.indexOf('http://') === -1 || ret.path.indexOf('https://') === -1)) {
                                if (ConfigObj.showWhere) {
                                    homeObj.show();
                                } else{
                                    indexNewsObj.show();
                                };
                    } else if (ret.path.indexOf('http://') === 1 || ret.path.indexOf('https://') === 1) Global.openUrl(url);
                }else{
                     // console.log(328)
                        var platFormNo = 1;
                        if (ConfigObj.platForm === 'ios') {
                            platFormNo = 3
                        } else if(ConfigObj.platForm === 'android'){
                            platFormNo = 2
                        }else(
                            platFormNo = 1
                        );
                        var postData = {
                            'channel_number': ConfigObj.zdid,
                            'terminal_id': platFormNo,
                        };
                        var secretData = {
                            'para' : Global.encrypt(postData)
                        };
                        $.ajax({
                            url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getAppAuto',
                            data: secretData,
                            type: "post",
                            dataType: "json",
                            success: function(msg) {
                                if (msg.code == "0000") {
                                    msg.info = $.parseJSON(Global.crypt(msg.info));
                                // console.log("版本控制返回",msg) 
                                    if(msg.info.egis == '1') {  //购彩版本
                                        // ConfigObj.showWhere = false;
                                        ConfigObj.showWhere = true;
                                    } else if(msg.info.egis == '2'){//资讯版本
                                        ConfigObj.showWhere = false;
                                        android_obj.sendNative('Uid','1');
                                    } else if(msg.info.egis == '3'){
                                        ConfigObj.display = false;
                                        ConfigObj.showWhere = true;
                                    };
                                    var parseSimpleUrl = function (url) {
                                    var tmp = url.split('?');
                                    var path = tmp[0];
                                    var args = {};
                        
                                    if (tmp[1] && tmp[1].length) {
                                        var tmp2 = tmp[1].split('&');
                                        tmp2.forEach(function (v) {
                                            var tmp3 = v.split('=');
                                            args[tmp3[0]] = tmp3[1] ? tmp3[1] : null;
                                        })
                                    }
                                    return {path: path, args: args};
                                    };
                                    var ret = parseSimpleUrl(url);
                                    // base64 编码后传递过来的 JSON 串，用于特殊逻辑
                                    if (ret.args._base64obj) {
                                        try {
                                            ret.args = unserialize(ret.args._base64obj);

                                        } catch (e) {
                                            ret.args.pageName = 'home';
                                        }
                                    }
                            
                                    if (ret.args && ret.args.pageName) {
                                        Global.GC();
                                        Global.checkToken();
                                        // APP 内部链接处理
                                        var page = ret.args.pageName;
                                        if (window[page + 'Obj']) {
                                            var pageObj = window[page + 'Obj'];
                            
                                            delete ret.args.pageName;
                                            (back && typeof back === 'function') ? pageObj.goBack = function () {
                                                back(pageObj);
                                            } : pageObj.goBack = function () {
                                                pageObj.destroy();
                                                homeObj.show();
                                            };
                            
                                            show = (show && typeof show === 'function') ? function () {
                                                show(pageObj);
                                            } : function () {
                                                pageObj.dirShow(ret.args); // 显示 app 页面，需要页面配置 dirShow
                                            };
                                            show();
                                        } else {
                                            // 对应的页面没有 JS 控制器
                                            homeObj.show();
                                        }
                                    } else if (ret.path && (ret.path.indexOf('127.0.0.1') !== -1 || ret.path.indexOf('http://') === -1 || ret.path.indexOf('https://') === -1)) {
                                                if (ConfigObj.showWhere) {
                                                    homeObj.show();
                                                } else{
                                                    indexNewsObj.show();
                                                };
                                    } else if (ret.path.indexOf('http://') === 1 || ret.path.indexOf('https://') === 1) Global.openUrl(url);
                                    
                                } else{
                                    $.alertMsg(msg.code_str);
                                }
                            }
                        });
                }
            }
        })
   // console.log(url)
//      //console.log('----', url);
        /*url = (!url || url === null) ? window.location.href : url;
		var platFormNo = 1;
		if (ConfigObj.platForm === 'ios') {
			platFormNo = 3
		} else if(ConfigObj.platForm === 'android'){
			platFormNo = 2
		}else(
			platFormNo = 1
		);
		var postData = {
			'channel_number': ConfigObj.zdid,
			'terminal_id': platFormNo,
		};
		var secretData = {
			'para' : Global.encrypt(postData)
		};
		$.ajax({
            url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getAppAuto',
            data: secretData,
            type: "post",
            dataType: "json",
            success: function(msg) {
                // console.log(msg) examine_display 
            	if (msg.code == "0000") {
            		msg.info = $.parseJSON(Global.crypt(msg.info));
         		console.log("版本控制返回",msg)
//					msg.info.egis = "0";
	            	if(msg.info.egis == '1') {
                        //购彩版本
	            		ConfigObj.showWhere = true;
                        // android_obj.sendNative(Uid,'2');

	            	} else if(msg.info.egis == '2'){
                        //资讯版本
	            		ConfigObj.showWhere = false;
                        // android_obj.sendNative(Uid,'1');
                        // android_obj.toast('退出')
                        // console.log(4)
	            	} else if(msg.info.egis == '3'){
	            		ConfigObj.display = false;
	            		ConfigObj.showWhere = true;
	            	};
//	            	ConfigObj.display = msg.info.display;
	            	
	            	var parseSimpleUrl = function (url) {
		            var tmp = url.split('?');
		              // console.log(url)
		            var path = tmp[0];
		            var args = {};
		
		            if (tmp[1] && tmp[1].length) {
		                var tmp2 = tmp[1].split('&');
		                tmp2.forEach(function (v) {
		                    var tmp3 = v.split('=');
		                    args[tmp3[0]] = tmp3[1] ? tmp3[1] : null;
		                })
		            }
		
		            return {path: path, args: args};
			        };
			
			        var ret = parseSimpleUrl(url);
			
			        // base64 编码后传递过来的 JSON 串，用于特殊逻辑
			        if (ret.args._base64obj) {
			            try {
			                ret.args = unserialize(ret.args._base64obj);
                            // console.log(1)

			            } catch (e) {
			                ret.args.pageName = 'home';
                            // console.log(2)
			            }
			        }
			
                  //console.log('----', ret);
			        if (ret.args && ret.args.pageName) {
			            Global.GC();
			            Global.checkToken();
			
			            // APP 内部链接处理
			            var page = ret.args.pageName;
			            if (window[page + 'Obj']) {
			                var pageObj = window[page + 'Obj'];
			
			                delete ret.args.pageName;
			                (back && typeof back === 'function') ? pageObj.goBack = function () {
			                    back(pageObj);
			                } : pageObj.goBack = function () {
			                    pageObj.destroy();
			                    homeObj.show();
			                };
			
			                show = (show && typeof show === 'function') ? function () {
			                    show(pageObj);
			                } : function () {
			                    pageObj.dirShow(ret.args); // 显示 app 页面，需要页面配置 dirShow
			                };
			                show();
			            } else {
			                // 对应的页面没有 JS 控制器 
			                homeObj.show();
			            }
			        } else if (ret.path && (ret.path.indexOf('127.0.0.1') !== -1 || ret.path.indexOf('http://') === -1 || ret.path.indexOf('https://') === -1)) {
						        if (ConfigObj.showWhere) {
						        	homeObj.show();
						        } else{
						        	indexNewsObj.show();
						        };
			        } else if (ret.path.indexOf('http://') === 1 || ret.path.indexOf('https://') === 1) Global.openUrl(url);
	            	
            	} else{
            		$.alertMsg(msg.code_str);
            	}
            }
		});*/
        
    },
	openUrl: function(_url) {
        if (ConfigObj.isPcWeb) {
            window.open(_url, '_blank');
        } else {
            if (ConfigObj.platForm == 'web') { //网页
                window.open(_url, '_blank');
            }
            if (ConfigObj.platForm == 'ios') { //苹果
                window.open(_url, '_blank', 'location=no');
            }
            if (ConfigObj.platForm == 'android') { //安卓
                navigator.app.loadUrl(_url, { openExternal: true });
            }
        }
    },
    checkConnect: function() {
        if (navigator.network) {
            var networkState = navigator.network.connection.type;
            //			var states = {};
            //			states[Connection.UNKNOWN]  = 'Unknown connection';
            //			states[Connection.ETHERNET] = 'Ethernet connection';
            //			states[Connection.WIFI]     = 'WiFi connection';
            //			states[Connection.CELL_2G]  = 'Cell 2G connection';
            //			states[Connection.CELL_3G]  = 'Cell 3G connection';
            //			states[Connection.CELL_4G]  = 'Cell 4G connection';
            //			states[Connection.NONE]     = 'No network connection';
            if (networkState == Connection.NONE) {
                $.alertMsg('请检查您的网络');
            }
        }
    },

    'pageSwitch': function(pageIn, pageOut) {
    	
//      //console.log(pageIn, pageOut);
        // var navArr = ['home','numKaijiang','discover','userCenter'];
        var navArr = ['home', 'kaijiangIndex', 'newsIdx', 'userCenter','hemaiIndex','searchSite'];
        // console.log(navArr)
        if ($.inArray(pageIn.attr('id'), navArr) != -1) {
     	// console.log(ConfigObj.showWhere)
			if(ConfigObj.showWhere){
    			$('#home_navObj').show();
			};
            var pageName = pageIn.attr('id');
            $('#home_navObj li').removeClass('on');
            $('#home_navObj a[data-t="' + pageName + '"]').parents('li').addClass('on');
        } else {
        // console.log(ConfigObj.showWhere)
            
            $('#home_navObj').hide();
        }

        /**
         * 干掉其他页面，每次只能显示一个页面
         */
        var clearOtherPages = function() {
            var pages = Global.getActivePage();
//          //console.log(pages);
            if (pages.length > 1) {
                for (var i = 0; i < pages.length - 1; i++) {
                    pages[i].style.display = 'none';
                }
            }
        };

        if (pageOut.length > 1) {
            $(pageOut).hide();
            $(pageIn).show();
            clearOtherPages();
        } else {
            if (pageIn.length == 1 && pageOut.length == 1 && pageIn.attr('id') == pageOut.attr('id')) {} else {
            		/* bcy
                $(pageOut).fadeOut(200, function() {
                    $(pageIn).fadeIn(400, function() {
                        clearOtherPages();
                    });
                });
                */
                 $(pageOut).fadeOut(1, function() {
                    $(pageIn).fadeIn(1, function() {
                        clearOtherPages();
                    });
                });
            }
        }

        // setTimeout(function(){ socialAuthCallBack
        //     console.warn('pageSwitch setTimeout');
        // 		//防止点击过快产生的动画异常效果
        // 		var pages = Global.getActivePage();
        // 		////console.log(pages);
        // 		if(pages.length > 0){
        // 			for(var i=0;i<pages.length;i++){
        // 				$(pages[i]).css({'transform':''})
        // 			}
        // 		}else{
        // 			Global.GC();
        // 			homeObj.show();
        // 		}
        // },1700)
    },

    //页面slide切换
    'pageSlide': function(pageIn, pageOut) {
        var id_out = pageOut.attr('id');
        var id_in = pageIn.attr('id');
        var outObj = window[id_out + 'Obj'];
        var inObj = window[id_in + 'Obj'];
        var back = false;
        if (outObj.fromPage == id_in) {
            back = true;
        }
        if (back) {
            pageIn.css({ 'display': 'block', '-webkit-transform': 'translate3d(-100%,0,0)' });
        } else {
            pageIn.css({ 'display': 'block', '-webkit-transform': 'translate3d(100%,0,0)' });
        }

        setTimeout(function() {
            if (back) {
                pageOut.css({ '-webkit-transform': 'translate3d(100%,0,0)', '-webkit-transition': '-webkit-transform 100ms ease-out 0ms' });
            } else {
                pageOut.css({ '-webkit-transform': 'translate3d(-100%,0,0)', '-webkit-transition': '-webkit-transform 100ms ease-out 0ms' });
            }
            pageIn.css({ '-webkit-transform': 'translate3d(0,0,0)', '-webkit-transition': '-webkit-transform 200ms ease-out 0ms' });
        }, 20);

        //滑动发生后重置样式
        setTimeout(function() {
            pageIn.css({ '-webkit-transform': '', '-webkit': '' });
            pageOut.css({ 'display': 'none', '-webkit-transform': '', '-webkit-transition': '' });
        }, 300);

    },

    'initNav': function() {
        $('#home_navObj').unbind('tap').tap(function(e) {
            Global.navEvent(e);
        });
    },

    'navEvent': function(e) {
        var aObj = $.oto_checkEvent(e, "A");
        if (aObj) {
            var thisObj = $(aObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT) {
                case "userCenter":
                    this.goUserCenter(thisObj.parents('li'));
                    return true;
                case "kaijiangIndex":
                    this.kaijiangIndex(thisObj.parents('li'));
                    return true;
                case "hemaiIndex":
                    this.goHemai(thisObj.parents('li'));
                    return true;
                case "newsIdx":
                    this.goDiscover(thisObj.parents('li'));
                    return true;
                case "searchSite":
                    this.goFind(thisObj.parents('li'));
                    return true;
                case "home":
                    this.goHome(thisObj.parents('li'));
                    return true;

            }
            return false;
        }
    },

    'goHome': function(obj) {
        if (obj.hasClass('on')) return;
        Global.GC();
        homeObj.show();
    },
    // 站点改为发现 wx
    'goFind': function(obj) {
            if (obj.hasClass('on')) return;
            searchSiteObj.goBack = function(){
                searchSiteObj.destroy();
                homeObj.show();
            }
            searchSiteObj.show();
        },
    'goUserCenter': function(obj) {

        if (obj.hasClass('selected')) return;
        userCenterObj.goBack = function() {
            userCenterObj.destroy();
            homeObj.show();
        }
        userCenterObj.show();
        /*if(loginObj.isLogin){
			userCenterObj.goBack = function(){
				userCenterObj.destroy();
				homeObj.show();	
			}
			userCenterObj.show();
		 }else{
			 loginObj.goForward = function(){
				userCenterObj.goBack=function(){
					userCenterObj.destroy();
					homeObj.show();	
				}
				setTimeout(function(){
					userCenterObj.show('reload');
				},500)
			 }
			 loginObj.goBack = function(){
				homeObj.show(); 
			 }
			 loginObj.show();
		 }*/
    },

    'goHemai': function(obj) {
    		if (obj.hasClass('on')) return;
    		hemaiIndexObj.goBack = function() {
                hemaiIndexObj.destroy();
                homeObj.show();
            }
            hemaiIndexObj.show(true,function(){
//          	hemaiIndexObj.getData();
            });
    	},

    'kaijiangIndex': function(obj) {
        if (obj.hasClass('on')) return;
        /*
        numKaijiangObj.goBack=function(){
          numKaijiangObj.destroy();
          homeObj.show(); 
        }
        numKaijiangObj.show();
        */

        // 显示开奖一级页面
        kaijiangIndexObj.goBack = function() {
            kaijiangIndexObj.destroy();
            homeObj.show();
        };
        kaijiangIndexObj.show();
    },

    'goDiscover': function(obj) {
        if (obj.hasClass('on')) return;
        newsIdxObj.goBack = function() {
            newsIdxObj.destroy();
            homeObj.show();
        }
        newsIdxObj.show();
    },

//  'checkBack': function() {
//      //if($('#home').length == 0)return;
//      var pageId = Global.getActivePage()[0].id;
//      switch (pageId){
//          case 'home':
//				clickCount++;
//				currentTime = new Date();
//				if (clickCount == 1) {
//					firstTime=currentTime.getSeconds()+currentTime.getMinutes()*60+currentTime.getHours()*3600;
//				} else if(clickCount == 2){
//					secondTime=currentTime.getSeconds()+currentTime.getMinutes()*60+currentTime.getHours()*3600;
//					if(secondTime-firstTime<2){  
//						navigator.app.exitApp();
//		            }else {  
//		                clickCount=0;  
//		            }; 
//				};
//              break;
//          default:
//              if (window[pageId + 'Obj']) {
//                  window[pageId + 'Obj'].goBack();
//              } else {
//                  homeObj.show();
//              }
//              break;
//      }
//  },

    'backLottery': function(type) {
        var nameObj = {
            '超级大乐透': 'dlt',
            '排列三': 'pl3',
            '排列五': 'pl5',
            '七星彩': 'qxc',
            '11选5': 'tjsyy',
            '海南4+1': 'hn4j1',
            '竞足混投': 'soccerMix',
            '竞足-2选1': 'soccer2x1',
            '任选九': 'soccerR9',
            '胜负彩': 'soccerToto',
            '11选5': 'fastBet',
            '广东11选5': 'fastBet',
            '竞篮混投': 'basketMix'
        }
        if (ConfigObj.from == 'ios') {
            ConfigObj.from = '';
            var pageName = nameObj[type] ? nameObj[type] : 'home';
            location.href = ConfigObj.iosAppSite + '?pageName=' + pageName; //跳回到iosApp 
        } else {
            Global.GC();
            var pageName = nameObj[type] ? nameObj[type] : 'home';
            if (type == '竞足混投' || type == '竞足-2选1' || type == '任选九' || type == '胜负彩') {
                window[pageName + 'Obj'].show('reload', function() {
                    window[pageName + 'Obj'].getData();
                });
            } else {
                window[pageName + 'Obj'].show('reload');
            }
        }
    },

    checkRoute: function () {
        Global.checkToken();
//      console.log(location.href)
        Global.open(location.href);
    },

    checkScrollEnd: function() {
        var scrollTop = document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight;
        if (scrollTop + clientHeight > scrollHeight - 1) {
            return true;
        } else {
            return false;
        }
    },

    socialShare: function(obj) {
        var pageId = (obj && obj.domId) ? obj.domId : '';
        var message = {
            'title': obj.title ? obj.title : '旺旺中彩-千万梦想，触手可及',
            'content': obj.content ? obj.content : '彩种玩法精彩纷呈，赛事数据全面覆盖，让梦想成为可能。',
            //'url': obj.url ? obj.url : ConfigObj.touchWebSite  + 'System/DownLoad/page?sharefrom=app',
            'url': obj.url ? obj.url + (obj.url.indexOf('?') >= 0 ? '&tpid=' + ConfigObj.appName : '?tpid=' + ConfigObj.appName) : ConfigObj.appDLUrl,
            'imagePath': obj.imagePath ? obj.imagePath : ConfigObj.touchWebSite + 'Public/images/aishishareicon.jpg'
        }
            // console.log(url)

        Global.shareMessage = message;

//        console.log(message);

        /**
        if (ConfigObj.platForm == 'ios') {
            // ShareSDK.share(message,function(){loginObj.addScore('share',pageId);},null);
            ios_obj.shareContent(message.title, message.content, message.url, message.imagePath, message.pageId);
            return false;
        } else {
            message.pageId = pageId;
        }
        **/

        message.pageId = pageId;

        var parent = $('#' + obj.domId);
        var html = '<div class="share-bot socialshare" style="display:none;" id="global_shareWrap">' +
            '<ul class="share-list clearfix">' +
            '<li data-t="wx">' +
            '<p><span class="share weixin" ></span></p>' +
            '<p>微信好友</p>' +
            '</li>' +
            '<li data-t="wxq">' +
            '<p><span class="share friend"></span></p>' +
            '<p>朋友圈</p>' +
            '</li>' +
//          '<li data-t="qq">' +
//          '<p><span class="share qq"></span></p>' +
//          '<p>QQ好友</p>' +
//          '</li>' +
//          '<li data-t="qzone">' +
//          '<p><span class="share qqzone"></span></p>' +
//          '<p>QQ空间</p>' +
//          '</li>' +
            '</ul>' +
            '<p class="paybot paybot1">' +
            '<a data-t="close" href="javascript:void(0)">取消</a>' +
            '</p>' +
            '</div>';
        var shareWrap = parent.find('#global_shareWrap');
        if (shareWrap.length > 0) {
            if (shareWrap.css('display') == 'none') {
                addBgLayer();
                shareWrap.show();
            } else {
                $('#global_shareWrap').hide();
                $('#global_bgLayer').remove();
            }
        } else {
            shareWrap = $(html);
            parent.append(shareWrap);
            shareWrap.show();
            addBgLayer();
            $('#global_shareWrap').unbind('tap').tap(function(e) {
                var liObj = $.oto_checkEvent(e, "LI");
                if (liObj) {
                    var thisObj = $(liObj);
                    var thisT = thisObj.attr("data-t");
                    switch (thisT) {
                        case 'wx':
                            shareFun('wx');
                            return true;
                        case 'wxq':
                            shareFun('wxq');
                            return true;
                        case 'qq':
                            shareFun('qq');
                            return true;
                        case 'qzone':
                            shareFun('qzone');
                            return true;
                    }
                }
                var aObj = $.oto_checkEvent(e, 'A');
                if (aObj) {
                    var thisObj = $(aObj);
                    var thisT = thisObj.attr('data-t');
                    switch (thisT) {
                        case 'close':
                            $('#global_shareWrap').hide();
                            $('#global_bgLayer').remove();
                            return true;
                    }
                }
            });
        }

        function shareFun(type) {
            var obj = { 'wx': 1, 'wxq': 2, 'qq': 3, 'qzone': 4 }
            var num = obj[type];
            //if(typeOf(android_obj) != 'undefined'){

            ////console.log(message);
            //loginObj.addScore('share',pageId); 
            $('#global_shareWrap').hide();
            $('#global_bgLayer').remove();
            var message = Global.shareMessage;
            if (ConfigObj.platForm == 'android') android_obj.shareContent(num, message.title, message.content, message.url, message.imagePath, message.pageId);
            else if (ConfigObj.platForm == 'ios') ios_obj.shareContent(num, message.title, message.content, message.url, message.imagePath, message.pageId);
            //}  
        };

        function addBgLayer() {
            var bg = '<div style="width:100%;height:100%;background:transparent;position:absolute;left:0;top:0;z-index:90" id="global_bgLayer"></div>';
            if ($('#global_bgLayer').length == 0) {
                parent.append(bg);
                $('#global_bgLayer').css({ 'height': document.documentElement.scrollHeight || document.body.scrollHeight })
                $('#global_bgLayer').unbind('tap').tap(function() {
                    $('#global_shareWrap').hide();
                    $('#global_bgLayer').remove();
                })
            }
        }

    },
//user.activity.regSendBonus
    socialShare2: function (obj) {
        var height = document.documentElement.scrollHeight || document.body.scrollHeight;
        var html = '<div class="share-bot socialshare"><ul class="share-list clearfix"><li data-t="wx"><p><span class="share weixin" ></span></p><p>微信好友</p></li><li data-t="wxq"><p><span class="share friend"></span></p><p>朋友圈</p></li><li data-t="qq"><p><span class="share qq"></span></p><p>QQ好友</p></li><li data-t="qzone"><p><span class="share qqzone"></span></p><p>QQ空间</p></li></ul><p class="paybot paybot1"><a data-t="close">取消</a></div>' +
                   '<div data-t="close" style="width: 100%; background: transparent; position: absolute; left: 0px; top: 0px; z-index: 102; height: ' + height + 'px;"></div>';

        var sharefn = obj.sharefn || function () {};

        var elem = document.createElement('DIV');
        elem.innerHTML = html;
        document.body.appendChild(elem);

        var plaftorm = {wx: 1, wxq: 2, qq: 3, qzone: 4};

        $(elem).on('tap', function (e) {
            var liObj = $.oto_checkEvent(e, 'LI');
            if (liObj) {
                liObj = $(liObj);
                var t = liObj.attr('data-t');
                switch (t) {
                    case 'wx': sharefn(plaftorm.wx); if (elem.parentNode)  elem.parentNode.removeChild(elem); break;
                    case 'wxq': sharefn(plaftorm.wxq); if (elem.parentNode) elem.parentNode.removeChild(elem); break;
                    case 'qq': sharefn(plaftorm.qq); if (elem.parentNode) elem.parentNode.removeChild(elem); break;
                    case 'qzone': sharefn(plaftorm.qzone); if (elem.parentNode) elem.parentNode.removeChild(elem); break;
                }
            }

            var aObj = $.oto_checkEvent(e, 'A');
            if (aObj) {
                aObj = $(aObj);
                var t = aObj.attr('data-t');
                switch (t) {
                    case 'close': if (elem.parentNode) elem.parentNode.removeChild(elem); break;
                }
            }

            var divObj = $.oto_checkEvent(e, 'DIV');
            if (divObj) {
                divObj = $(divObj);
                var t = divObj.attr('data-t');
                switch (t) {
                    case 'close': if (elem.parentNode) elem.parentNode.removeChild(elem); break;
                }
            }
        });
    },

    /**
     * 优先从缓存中获取数据
     * get data preferring from sessionStorage
     * @param url
     * @param data 请求参数
     * @param getCacheFn 从缓存中获取数据后的回调函数
     * @param diffFn 缓存数据和接口返回数据不同时的处理函数，没有设置时默认调用 getCacheFn
     * @param cacheType 缓存类型，0 window.sessionStorage，1 window.localStorage
     */
    getDataPrefCache: function(url, data, getCacheFn, diffFn, cacheType) {
     // console.log(url);
        var ss = cacheType == 0 ? window.sessionStorage : window.localStorage;
        var sslen = 0; // 已缓存字符数

        for (var i in ss) {
            if (ss.hasOwnProperty(i))
                sslen += ss[i].length;
        }
        var item = ss.getItem(url);
        if (item) {
            if (getCacheFn && typeof getCacheFn == 'function') getCacheFn(JSON.parse(item));
        }
		// console.log(ConfigObj.localSite + url);
        $.ajax({
            url: ConfigObj.localSite + url,
            type: 'post',
            data: data,
            dataType: 'text',
            timeout: 10000,
            success: function(data, status, xhr) {
                if (data != item) {
                    if (diffFn && typeof diffFn == 'function') diffFn(JSON.parse(data));
                    else if (getCacheFn && typeof getCacheFn == 'function') getCacheFn(JSON.parse(data));

                    // 2097152 字符，避免超出大小
                    if (sslen + data.length < 2097152) ss.setItem(url, data);
                }
            },
            error: function(xhr, type) {
                $.alertMsg('请求失败！请检查您的网络连接。');
            }
        });
    },
    
    
     /**
     * 设置缓存
     * @param key
     * @param value
     * @param cacheType 缓存类型，0 window.sessionStorage，1 window.localStorage
     */
    setCache: function (key, value, cacheType) {
        var ss = cacheType === 0 ? window.sessionStorage : window.localStorage;
        var sslen = 0; // 已缓存字符数

        for (var i in ss) {
            if (ss.hasOwnProperty(i))
                sslen += ss[i].length;
        }

        if (key) {
            var v = value || {};
            v = JSON.stringify(v);

            // 2097152 字符，避免超出大小
            if (sslen + v.length < 2097152) ss.setItem(key, v);
            else console.error('out of cache size');
        }
    },

    /**
     * 获取缓存
     * @param key 缓存的 key
     * @param cacheType 缓存类型，0 window.sessionStorage，1 window.localStorage
     * @returns {*}
     */
    getCache: function (key, cacheType) {
        var ss = cacheType === 0 ? window.sessionStorage : window.localStorage;
        var v;
        if (key) v = JSON.parse(ss.getItem(key));
        return v;
    },   
    
    
    
    

    /**
     * 干掉缓存
     * @param key 缓存的 key
     * @param cacheType 缓存类型，0 window.sessionStorage，1 window.localStorage
     */
    delCache: function(key, cacheType) {
        var ss = cacheType === 0 ? window.sessionStorage : window.localStorage;
        if (key) ss.removeItem(key);
        else ss.clear();
    },

    /**
     * post 数据
     * @param url
     * @param data
     * @param sucFn
     * @param errFn
     * @param timeOut
     */
    post: function(url, data, sucFn, errFn, timeOut) {
        $.ajax({
            url: ConfigObj.localSite + url,
            type: 'post',
            data: data,
            dataType: 'json',
            timeout: timeOut || 30000,
            success: function(data, status, xhr) {
//              //console.log('接口数据', data);
                if (sucFn && typeof sucFn == 'function')
                    sucFn(data);
            },
            error: function(xhr, type) {
                if (errFn && typeof errFn == 'function') errFn(xhr, type);
                else $.alertMsg('请求失败！请检查您的网络连接。');
            }
        });
    },

    /**
     * 检查实名状态
     * @param {{}} obj
     * obj.yes 已实名的回调函数
     * obj.ing 审核中的回调函数，默认操作是提示实名认证正在审核中
     * obj.not 未实名的回调函数，默认操作是在底部显示认证对话框
     * obj.fail 审核失败的回调函数，默认操作和 obj.not 相同
     * obj.reload 设为 true 时将会重新获取用户信息
     * obj.realAuthBack 从实名认证页面返回时的回调函数
     * obj.from 用于指示进入实名认证页面的状态
     */
    checkRealStatus: function(obj) {
        loginObj.goForward = function() {};

        if (!loginObj.userInfo) return;

        if (!obj) obj = {};
        if (obj.reload) {
            loginObj.getUserInfo(function() {
                handle(loginObj.userInfo.real_status, obj);
            });
        } else {
            handle(loginObj.userInfo.real_status, obj);
        }

        function not() {
            if (Global.isShowRealAuthDiv) return;

            var realAuthDiv = document.createElement('DIV');

            realAuthDiv.innerHTML = '' +
                '<div class="overlayer">' +
                '<div class="bottomcon" data-t="nohide">' +
                '<div class="playtip">' +
                '<h3>提示</h3>' +
                '<p class="font14 center">请完善实名认证，才可以继续操作！</p>' +
                '</div>' +
                '<p class="btn_simple">' +
                '<a data-t="clearAuthTips" class="w50"><span class="first">取消</span></a>' +
                '<a data-t="toAuthTips" class="w50"><span>确定</span></a>' +
                '</p>' +
                '</div>' +
                '</div>';

            document.body.appendChild(realAuthDiv);

            Global.isShowRealAuthDiv = true;

            $(realAuthDiv).on('tap', function(e) {
                var aObj = $.oto_checkEvent(e, 'A');
                if (!aObj) return;
                aObj = $(aObj);
                var t = aObj.attr('data-t');
                if (t == 'clearAuthTips') {
                    realAuthDiv.parentNode.removeChild(realAuthDiv);
                    Global.isShowRealAuthDiv = false;
                }
                if (t == 'toAuthTips') {
                    realAuthDiv.parentNode.removeChild(realAuthDiv);
                    Global.isShowRealAuthDiv = false;

                    regRealNameObj.goBack = function() {
                        regRealNameObj.destroy();
                        if (obj.realAuthBack && typeof obj.realAuthBack == 'function') obj.realAuthBack();
                    };

                    regRealNameObj.show(true, function() {
                        regRealNameObj.setData({
                            'accountName': loginObj.userInfo.user_name,
                            'from': obj.from ? from : 'buy'
                        });
                    });
                }
            });
        }

        function handle(realStatus) {
            if (realStatus == 'Y') {
                if (obj.yes && typeof obj.yes == 'function') obj.yes();
            } else if (realStatus == 'Ing') {
                if (obj.ing && typeof obj.ing == 'function') obj.ing();
                else $.alertMsg('您的实名认证正在审核中');
            } else if (realStatus == 'N') {
                if (obj.not && typeof obj.not == 'function') obj.not();
                else not();
            } else if (realStatus == 'Fail') {
                if (obj.fail && typeof obj.fail == 'function') obj.fail();
                else not();
            }
        }
    },

    tips: function(obj) {
        if (Global.isShowTipsDiv) return;

        obj = obj || {};
        var tipsDiv = document.createElement('DIV');

        tipsDiv.innerHTML = '' +
            '<div class="overlayer">' +
            '<div class="bottomcon" data-t="nohide">' +
            '<div class="playtip">' +
            '<h3>提示</h3>' +
            '<p class="font14 center">' + (obj.text ? obj.text : '确认继续吗？') + '</p>' +
            '</div>' +
            '<p class="btn_simple">' +
            '<a data-t="cancel" class="w50"><span class="first">取消</span></a>' +
            '<a data-t="confirm" class="w50"><span>确定</span></a>' +
            '</p>' +
            '</div>' +
            '</div>';

        document.body.appendChild(tipsDiv);

        Global.isShowTipsDiv = true;

        $(tipsDiv).on('tap', function(e) {

            var aObj = $.oto_checkEvent(e, 'A');
            if (!aObj) return;
            aObj = $(aObj);
            var t = aObj.attr('data-t');
            if (t == 'cancel') {
                Global.isShowTipsDiv = false;
                tipsDiv.parentNode.removeChild(tipsDiv);
            }
            if (t == 'confirm') {
                Global.isShowTipsDiv = false;
                tipsDiv.parentNode.removeChild(tipsDiv);
                if (obj.confirm && typeof obj.confirm == 'function') obj.confirm();
            }
        });
    },

    /**
     * 简单加载层
     */
    simpleLoading: {
        /**
         * 显示加载层
         * @param {Object} [obj] 配置对象
         *				   obj.timeOut 自动关闭时间，默认不会自动关闭
         * @returns {Element}
         */
        open: function(obj) {
            obj = obj || {};

            var img = 'data:image/gif;base64,R0lGODlhNgA3APMAAP///zAyOJKTlkdJTzw+RN/g4XV2euPj5M/Q0WtscaChpDAyODAyODAyODAyODAyOCH5BAkKAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAANgA3AAAEzBDISau9OOvNu/9gKI5kaZ4lkhBEgqCnws6EApMITb93uOqsRC8EpA1Bxdnx8wMKl51ckXcsGFiGAkamsy0LA9pAe1EFqRbBYCAYXXUGk4DWJhZN4dlAlMSLRW80cSVzM3UgB3ksAwcnamwkB28GjVCWl5iZmpucnZ4cj4eWoRqFLKJHpgSoFIoEe5ausBeyl7UYqqw9uaVrukOkn8LDxMXGx8ibwY6+JLxydCO3JdMg1dJ/Is+E0SPLcs3Jnt/F28XXw+jC5uXh4u89EQAh+QQJCgAAACwAAAAANgA3AAAEzhDISau9OOvNu/9gKI5kaZ5oqhYGQRiFWhaD6w6xLLa2a+iiXg8YEtqIIF7vh/QcarbB4YJIuBKIpuTAM0wtCqNiJBgMBCaE0ZUFCXpoknWdCEFvpfURdCcM8noEIW82cSNzRnWDZoYjamttWhphQmOSHFVXkZecnZ6foKFujJdlZxqELo1AqQSrFH1/TbEZtLM9shetrzK7qKSSpryixMXGx8jJyifCKc1kcMzRIrYl1Xy4J9cfvibdIs/MwMue4cffxtvE6qLoxubk8ScRACH5BAkKAAAALAAAAAA2ADcAAATOEMhJq7046827/2AojmRpnmiqrqwwDAJbCkRNxLI42MSQ6zzfD0Sz4YYfFwyZKxhqhgJJeSQVdraBNFSsVUVPHsEAzJrEtnJNSELXRN2bKcwjw19f0QG7PjA7B2EGfn+FhoeIiYoSCAk1CQiLFQpoChlUQwhuBJEWcXkpjm4JF3w9P5tvFqZsLKkEF58/omiksXiZm52SlGKWkhONj7vAxcbHyMkTmCjMcDygRNAjrCfVaqcm11zTJrIjzt64yojhxd/G28XqwOjG5uTxJhEAIfkECQoAAAAsAAAAADYANwAABM0QyEmrvTjrzbv/YCiOZGmeaKqurDAMAlsKRE3EsjjYxJDrPN8PRLPhhh8XDMk0KY/OF5TIm4qKNWtnZxOWuDUvCNw7kcXJ6gl7Iz1T76Z8Tq/b7/i8qmCoGQoacT8FZ4AXbFopfTwEBhhnQ4w2j0GRkgQYiEOLPI6ZUkgHZwd6EweLBqSlq6ytricICTUJCKwKkgojgiMIlwS1VEYlspcJIZAkvjXHlcnKIZokxJLG0KAlvZfAebeMuUi7FbGz2z/Rq8jozavn7Nev8CsRACH5BAkKAAAALAAAAAA2ADcAAATLEMhJq7046827/2AojmRpnmiqrqwwDAJbCkRNxLI42MSQ6zzfD0Sz4YYfFwzJNCmPzheUyJuKijVrZ2cTlrg1LwjcO5HFyeoJeyM9U++mfE6v2+/4PD6O5F/YWiqAGWdIhRiHP4kWg0ONGH4/kXqUlZaXmJlMBQY1BgVuUicFZ6AhjyOdPAQGQF0mqzauYbCxBFdqJao8rVeiGQgJNQkIFwdnB0MKsQrGqgbJPwi2BMV5wrYJetQ129x62LHaedO21nnLq82VwcPnIhEAIfkECQoAAAAsAAAAADYANwAABMwQyEmrvTjrzbv/YCiOZGmeaKqurDAMAlsKRE3EsjjYxJDrPN8PRLPhhh8XDMk0KY/OF5TIm4qKNWtnZxOWuDUvCNw7kcXJ6gl7Iz1T76Z8Tq/b7/g8Po7kX9haKoAZZ0iFGIc/iRaDQ40Yfj+RepSVlpeYAAgJNQkIlgo8NQqUCKI2nzNSIpynBAkzaiCuNl9BIbQ1tl0hraewbrIfpq6pbqsioaKkFwUGNQYFSJudxhUFZ9KUz6IGlbTfrpXcPN6UB2cHlgfcBuqZKBEAIfkECQoAAAAsAAAAADYANwAABMwQyEmrvTjrzbv/YCiOZGmeaKqurDAMAlsKRE3EsjjYxJDrPN8PRLPhhh8XDMk0KY/OF5TIm4qKNWtnZxOWuDUvCNw7kcXJ6gl7Iz1T76Z8Tq/b7yJEopZA4CsKPDUKfxIIgjZ+P3EWe4gECYtqFo82P2cXlTWXQReOiJE5bFqHj4qiUhmBgoSFho59rrKztLVMBQY1BgWzBWe8UUsiuYIGTpMglSaYIcpfnSHEPMYzyB8HZwdrqSMHxAbath2MsqO0zLLorua05OLvJxEAIfkECQoAAAAsAAAAADYANwAABMwQyEmrvTjrzbv/YCiOZGmeaKqurDAMAlsKRE3EsjjYxJDrPN8PRLPhfohELYHQuGBDgIJXU0Q5CKqtOXsdP0otITHjfTtiW2lnE37StXUwFNaSScXaGZvm4r0jU1RWV1hhTIWJiouMjVcFBjUGBY4WBWw1A5RDT3sTkVQGnGYYaUOYPaVip3MXoDyiP3k3GAeoAwdRnRoHoAa5lcHCw8TFxscduyjKIrOeRKRAbSe3I9Um1yHOJ9sjzCbfyInhwt3E2cPo5dHF5OLvJREAOw==';
            var loadDiv = document.createElement('DIV');
            loadDiv.innerHTML = '<div style="position: fixed; top: 44px; left: 0; width: 100vw; height: 100vh; text-align: center; z-index: 9999; background-color: rgba(220,220 , 220, 0.5); "><img src="' + img + '" style="margin-top: 50%; width: 15%;"><p>' + (obj.content || '') + '</p></div>';

            // 下载更新时禁止页面滚动
            document.body.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, true);
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            document.body.appendChild(loadDiv);

            if (obj.timeOut) {
                setTimeout(function() {
                    if (loadDiv.parentNode) loadDiv.parentNode.removeChild(loadDiv);
                }, Number(obj.timeOut));
            }

            return loadDiv;
        },
        close: function(loading) {
            document.body.style.overflow = 'visible';
            if (loading.parentNode) loading.parentNode.removeChild(loading);
        }
    },

    /**
     * 提示消息
     */
    msg: function() {
        var msg = '';
        var timeOut = 2000;
        var a0 = arguments[0];
        var a1 = arguments[1];
        if (typeof a0 === 'string') msg = a0;
        if (typeof a1 === 'number') timeOut = a1;
        var msgDiv = document.createElement('DIV');
        msgDiv.innerHTML = '' +
            '<div style="position: fixed; top: 40vh; height: 40px; width: 100vw; text-align: center">' +
            '<span style="display: inline-block; width: 60vw; height: 40px; line-height :40px; color: #fff; background-color: rgba(0, 0, 0, 0.6); border-radius: 3px">' + msg + '</span>' +
            '</div>';

        document.body.appendChild(msgDiv);

        setTimeout(function() {
            msgDiv.parentNode.removeChild(msgDiv);
        }, timeOut);
    },

    /**
     * 日期事件格式化
     * @example formatDate(); formatDate('yyyyMMdd_hhmmss'); formatDate('yyyyMMdd_hhmmss', '2006-07-02 08:09:04')
     * @param fmt
     * @param dateStr
     * @returns {*|string}
     */
    formatDate: function (fmt, dateStr) {
        var date = dateStr ? new Date(Date.parse(dateStr.replace(/-/g, '/'))) : new Date();

        fmt = fmt || 'yyyy-MM-dd hh:mm:ss';

        var o = {
            "M+": date.getMonth() + 1, // 月份
            "d+": date.getDate(), // 日
            "h+": date.getHours(), // 小时
            "m+": date.getMinutes(), // 分
            "s+": date.getSeconds(), // 秒
            "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
            "S": date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    iosBuy: function(obj) {
//      //console.log(obj);
        var buyStr = '';
        buyStr += '&product_id=' + obj.product_id +
            '&product_type=' + obj.product_type +
            '&lotteryType=' + obj.lotteryType +
            '&lotteryNo=' + obj.lotteryNo +
            '&access_token=' + loginObj.access_token +
            '&from=' + 'ios' +
            '&appName=' + ConfigObj.appName +
            '&iosAppSite=' + ConfigObj.iosAppSite +
            '&version=' + ConfigObj.version +
            '&rnd=' + new Date().getTime()
            //window.open(ConfigObj.iosWebSite + '?pageName=buyConfirm' + encodeURI(buyStr),'_system');  //测试代码 zhangw
            //cordova.InAppBrowser.open(ConfigObj.iosWebSite + '?pageName=buyConfirm' + encodeURI(buyStr),'_blank','location=no,closebuttoncaption=返回');
        cordova.InAppBrowser.open(ConfigObj.iosWebSite + '?pageName=buyConfirm' + encodeURI(buyStr), '_system');
    },

    //统计
    pv: function(type, obj) {
        //console.log('pv', type, obj);
        if (ConfigObj.platForm == 'android') {
            if (typeof android_obj != 'undefined') {
                android_obj.onEventValue(type, JSON.stringify(obj));
            }
        } else if (ConfigObj.platForm == 'ios') {
            if (typeof ios_obj != 'undefined') {
                ios_obj.onEventValue(type, JSON.stringify(obj));
            }
        }
    },
    encrypt:function(data){ //最新版12.20
        // console.log(data)
		var postData = JSON.stringify(data);
	    var srcs = CryptoJS.enc.Utf8.parse(postData);
	    var encrypted = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse("yMDE4LUAlLTM0ODA"), { iv: CryptoJS.enc.Utf8.parse("4MTAyLWlhYy15ZWs"),mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
	    var postDataHexStr = CryptoJS.enc.Hex.parse(encrypted.ciphertext.toString().toUpperCase());
        var postDataEnd = CryptoJS.enc.Base64.stringify(postDataHexStr);
	    return postDataEnd;
    },
    crypt:function(data){
        // console.log(data)
        var decrypt = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse("yMDE4LUAlLTM0ODA"), { iv: CryptoJS.enc.Utf8.parse("4MTAyLWlhYy15ZWs"),mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8); 
        return decryptedStr.toString();
    }
    /*encrypt:function(data){   //加密  版本1
        // console.log(data)
        var postData = JSON.stringify(data);
        var srcs = CryptoJS.enc.Utf8.parse(postData);
        var encrypted = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"), { iv: CryptoJS.enc.Utf8.parse("5UsiSUIyUkJHGui7"),mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
        var postDataHexStr = CryptoJS.enc.Hex.parse(encrypted.ciphertext.toString().toUpperCase());
        var postDataEnd = CryptoJS.enc.Base64.stringify(postDataHexStr);
        // console.log(postDataEnd)
        return postDataEnd;
    },
    crypt:function(data){ //解密
        // console.log(data)
        var decrypt = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"), { iv: CryptoJS.enc.Utf8.parse("5UsiSUIyUkJHGui7"),mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8); 
        return decryptedStr.toString();
    }*/
}

/* 
从浏览器跳到 app上的url处理函数

*/
function handleOpenURL(url) {
//  //console.log(url);
    //if(ConfigObj.platForm != 'ios') return;
    setTimeout(function() {
        if (url.indexOf('?') != -1) { //特定页面网址
            var arr = url.split('?');
            var paramObj = {};
            if (arr[1]) {
                var paramArr = arr[1].split('&');
                for (var i = 0, len = paramArr.length; i < len; i++) {
                    var itm = paramArr[i];
                    var key = itm.split('=')[0];
                    var value = itm.split('=')[1];
                    paramObj[key] = value;
                }
//              //console.log(paramObj);
            }
            var keepArr = [];
            if (paramObj.pageName && paramObj.pageName == 'regByMobile') {
                keepArr.push(paramObj.pageName);
            }
            Global.GC(keepArr);
            //Global.GC();
            if (paramObj.pageName) {
                var page = paramObj.pageName;
                if (window[page + 'Obj']) {
                    window[page + 'Obj'].goBack = function() {
                        window[page + 'Obj'].destroy();
                        if (page == 'stationDetail') { //根据需求，特殊处理
                            userCenterObj.show();
                        } else {
                            homeObj.show();
                        }

                    }
                    var func = function() {
                        window[page + 'Obj'].dirShow(paramObj); //直接从网址导入显示 ，需要可以直接跳转的页面配置dirShow函数	
                    }
                    Global.checkToken(func);
                }
            } else {
                homeObj.show('reload');
                Global.checkToken();
            }
        }
    }, 0)
}

//分享成功后加积分,用于安卓原生回调
function shareSucAddScore(pageId) {
    loginObj.addScore('share', pageId);
}

// 从原生获取 clientId
function getPushClientIdCallBack(id) {
    if (id) {
        loginObj.setClientId(id);
    }
}

//获取wifi状态回调
function getWifiStatusCallBack(isWifi, wifiName) {
    //alert(wifiName);
    /*
    if(isWifi == 1){
    	if($('#home_wifiStatus').length == 1){
    		$('#home_wifiStatus').html('<span class="wifiIcon"></span> 已连接: '+ wifiName).show();
    		$('#home_wifiStatus').parents('header').addClass('header_1');
    	}
    }else{
    	$('#home_wifiStatus').hide();	
    	$('#home_wifiStatus').parents('header').removeClass('header_1');
    }
    */
}

//获取聊天数量回调
function getImNumCallBack(num) {
    if (loginObj.isLogin) {
        if (num > 0) {
            $('#home_imNum').html(num).show();
            $('#userCenter_imNum').html(num).show();
        } else {
            $('#home_imNum').html('').hide();
            $('#userCenter_imNum').html('').hide();
        }
    } else {
        $('#home_imNum').html('').hide();
        $('#userCenter_imNum').html('').hide();
    }
}

//type:station修改站点信息 type:card|photo实名认证
function getCamraImageCallback(img, num, type) {
    if (type == 'card' || type == 'photo') {
        regRealNameObj.addImg(img, num);
    } else if (type == 'station') {
        modifyStationInfoObj.addImg(img, num);
    }
}

/**
 * 微信充值回调
 * @param {String} errcode 微信返回状态，0 成功，-1 失败，-2 用户取消
 */
function getPayWeixinCallback(errcode) {
    // alert('errcode:' + errcode);
    $.post(ConfigObj.localSite + '?version=1&m=cashier.return.interrupt', {
        pay_id: ConfigObj.pay_id,
        status_code: errcode,
        third_channel: 'wechatpayApp'
    }, function() {});

    if (errcode == '-2') {
        // 用户取消时先直接改变充值状态页面
        payStatusObj.setCancelStatus()
    }

}

/**
 * 微信 web 支付充值回调
 */
function wechatPayWebReturnCallback(args) {}

/**
 * 扫描二维码后的回调函数
 * @param type 类型，register 注册
 * @param value 站点/代理编号
 */
function getScanQRCodeCallback(type, value) {
    if (type === 'register') {
        registerObj.setSid(value);
    }

}

/**
 * 第三方认证回调，获取用户信息后进行第三方登录
 * @param platform 平台
 * @param uid 用户唯一标识
 * @param name name 用户昵称
 * @param iconurl iconurl 用户头像
 */

function socialAuthCallBack(type, platform, uid, name, iconurl) {
// console.log(123)
    if (type == 'auth') loginObj.socialAuth(platform, uid, name, iconurl);  //登录
    if (type == 'bind') userInfoObj.doBindSocial(platform, uid, name, iconurl);  //绑定
}
/**
 * ios的友盟渠道id回调
 * @param id 友盟渠道id
 */
function getUmengCallBack(id) {
   ConfigObj.umengChannel = id;
}

/**
 * ios的回调
 * @param a1 k的值
 * @param a2 v的值
 */
function getAesKeyAndIv(a1, a2) {
	ConfigObj.a1 = a1;
	ConfigObj.a2 = a2;
}

function setHeaderPosition(){
	$("input,textarea").off("blur,focus")
	$(document).on("focus","input,textarea",function(){
		$(".header").css({"position":"absolute"})
	})
	$(document).on("blur","input,textarea",function(){
		 $(".header").css({"position":"fixed"})
	})
}
// 元素失去焦点隐藏iphone的软键盘
function objBlur(tagName, time) {
    if (typeof tagName != 'string') throw new Error('objBlur()参数错误');
    var obj = document.getElementsByTagName(tagName);
    // //console.log(obj);
    time = time || 0;
    docTouchend = function(event) {
        if (event.target != obj) {
            for (var i = 0; i < obj.length; i++) {
                obj[i].blur();
                // //console.log("blur======================")
            }
            document.removeEventListener('touchend', docTouchend, false);
        }
    };
    if (obj) {
        for (var i = 0; i < obj.length; i++) {
            obj[i].addEventListener('focus', function() {
                document.addEventListener('touchend', docTouchend, false);
            }, false);
        }
    } else {
        throw new Error('objBlur()没有找到元素');
    }
}

/**
 * 序列化
 * @param obj
 * @returns {string}
 */
function serialize(obj) {
    var base64str = btoa(JSON.stringify(obj));
    return base64str.replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '.');
}

/**
 * 反序列化
 * @param str
 * @returns {*}
 */
function unserialize(str) {
    str = str.replace(/_/g, '/').replace(/-/g, '+').replace(/\./g, '=');
    return JSON.parse(atob(str));
}

/**
 * 在控制台打印消息并退出
 * @param msg
 */
function exit(msg) {
    // 屏蔽错误
    window.onerror = function () {
        return true;
    };

    console.clear();
    for (var i = 0; i < arguments.length; i++) {
        //console.log(JSON.stringify(arguments[i]));
    }

    throw new Error('Ending execution');
}

/**
 * canvas画圆环
 * @param option
 */
function drawCircle(_options){
    var options = _options || {};    
    options.angle = options.angle || 1;   
    options.color = options.color || '#fff';    
    options.lineWidth = options.lineWidth || 10;    
    options.lineCap = options.lineCap || 'round';    
 
    var oBoxOne = document.getElementById(options.id);
    var sCenter = oBoxOne.width / 2;   
    var ctx = oBoxOne.getContext('2d');
    var nBegin = Math.PI / 2;    
    var nEnd = Math.PI * 2;   
 
    ctx.textAlign = 'center';    
    ctx.font = 'normal normal bold 20px Arial';    
    ctx.fillStyle = options.color;
    ctx.lineCap = options.lineCap;
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.lineWidth;
 
    ctx.beginPath();   
    ctx.strokeStyle = '#f8ba61';
    ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, nEnd, false);
    ctx.stroke();
 
    var imd = ctx.getImageData(0, 0, 240, 240);
    function draw(current) {  
        ctx.putImageData(imd, 0, 0);
        ctx.beginPath();
        ctx.strokeStyle = options.color;
        ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, (nEnd * current) - nBegin, false);
        ctx.stroke();
    }
 
    var t = 0;
    var timer = null;
    function loadCanvas(angle) {   
        timer = setInterval(function(){
            if (t > angle) {
                draw(options.angle);
                clearInterval(timer);
            }else{
                draw(t);
                t += 0.02;
            }
        }, 20);
    }
    loadCanvas(options.angle);  
    timer = null;
}



