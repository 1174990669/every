var payStatusObj = new PageController({
    'name': 'payStatus',
    'tpl': 'template/user/payStatus.html'
});

payStatusObj.createDomObj = function () {
    this.progressCon = $('#payStatus_progressCon'); //扣款过程进度条容器
    this.progressEnd = $('#payStatus_progressEnd');  //扣款完成标志
    this.backBtn = $('#payStatus_backbtn');
    this.topTit = $('#payStatus_topTit');
    this.botLink = $('#payStatus_botLink');
    this.payStatusContinueLink = $('#payStatus_continue');
    this.payStatusContinue = $('#payStatus_contin');
    this.payStatusOrderLink = $('#payStatus_order');
    this.recordLink = $('#payStatus_record');
    this.projectLink = $('#payStatus_project');
    this.refreshBtn = $('#payStatus_refreshBtn');
    this.tryBtn = $('#payStatus_tryBtn');
    // this.comp = $('#a_complete');//完成支付 payStatus_contin payStatus_contin
    
    //console.log('progressCon', this.progressCon); wechatpayApp_loading
    
//  ConfigObj.pay_id = ""; a_complete
//  //console.log(ConfigObj.pay_id);
    if(ConfigObj.pay_id == undefined){
    	var payUrl = window.location.search;
    	var payCon = payUrl.split("?");
    	var payInfo = payCon[1].split("&");
    	ConfigObj.pay_id = payInfo[1];
    	ConfigObj.pay_channel = payInfo[2];
    };
    payStatusObj.startTimer(); 
    
}

payStatusObj.createEvent = function () {
    this.backBtn.unbind('tap').tap(function () {
        payStatusObj.goBack();
    })

    // 继续充值
    this.payStatusContinueLink.unbind('tap').tap(function () {
        payStatusObj.goBack()
        // console.log(40) payStatus_backbtn
        /*Global.GC();
        wechatpayAppObj.goBack=function(){
            payStatusObj.destroy();
            // wechatpayAppObj.destroy();
            wechatpayWebObj.show();
        };
        // console.log(48) cashier.check.status
        wechatpayWebObj.show('reload')*/
        // wechatpayAppObj.show('reload');
    });

    this.payStatusContinue.unbind('tap').tap(function () {
        payStatusObj.goBack()
        // console.log(40) payStatus_backbtn
        /*Global.GC();
        wechatpayAppObj.goBack=function(){
            payStatusObj.destroy();
            // wechatpayAppObj.destroy();
            wechatpayWebObj.show();
        };
        // console.log(48) cashier.check.status
        wechatpayWebObj.show('reload')*/
        // wechatpayAppObj.show('reload');
    });

    //充值完成
    $('#a_complete').tap(function(){
        payStatusObj.goBack()
        // wechatpayWebObj.goBack();
        // userCenterObj.goBack()  
    })
    $('#a_compl').tap(function(){
        payStatusObj.goBack()
        // wechatpayWebObj.goBack();
        // userCenterObj.goBack()  a_compl
    })
    /*this.comp.unbind('tap').tap(function (){
        console.log(56)
        // userCenterObj.show()
    }*/
    // 显示充值详情
    this.payStatusOrderLink.unbind('tap').tap(function () {
        if (payStatusObj.target_type == 'order' && payStatusObj.target_id) {
            rechargeStatusObj.goBack = function () {
                rechargeStatusObj.destroy();
                rechargeRecordObj.goBack = function () {
                    rechargeRecordObj.destroy();
                    wechatpayAppObj.show(true);
                };
                rechargeRecordObj.show();
            };

            rechargeStatusObj.show('reload', function () {
                rechargeStatusObj.getData(payStatusObj.target_id);
            });
        }

        if (payStatusObj.target_type == 'project') {
            // 方案，直接跳到订单详情
            Global.open('?pageName=projectDetail&pid=' + payStatusObj.target_id);
        }

        if (payStatusObj.target_type == 'plan') {
            // 方案，直接跳到追号详情
            Global.open('?pageNam=planDetail&plan_id=planId' + payStatusObj.target_id);
        }
    });

    this.projectLink.unbind('tap').tap(function () {
        payStatusObj.goProjectDetail()
    })
    this.refreshBtn.unbind('tap').tap(function () {
        payStatusObj.delayRefresh();
    })
    this.tryBtn.unbind('tap').tap(function () {  //继续付款
        payStatusObj.tryAgain();
    })
}

payStatusObj.goBack = function(){
	Global.GC();
	payStatusObj.destroy();
	homeObj.show();
}

payStatusObj.delayRefresh = function () {
    this.count = 0;
    this.refreshBtn.hide();
    this.startTimer();
}

payStatusObj.startTimer = function () {
    setTimeout(function () {
        payStatusObj.getPayStatus('first');
    }, 200);
    payStatusObj.ticket_timer = setInterval(function () {
        payStatusObj.getPayStatus();
        
    }, 6000);
}

//type==first 表示是第一次请求
payStatusObj.getPayStatus = function (type) {
    var self = this;
    var dataObj = {
        'pay_id': ConfigObj.pay_id,
        'channel': ConfigObj.pay_channel
    };
    var secretData = {
			'para' : Global.encrypt(dataObj)
		};
    self.count = self.count + 1;
    // console.log(Global.crypt('1524019326112054005ad6b07e1b615'))
    $.ajax({
        url: ConfigObj.localSite + '?version=1&m=cashier.check.status',
        type: 'post',
        data: secretData,
        dataType: 'json',
        success: function (obj) {
            // alert('1'+obj.info)
        	// console.log(obj);
            // $('#onLin').css('display','none');
            // payStatusObj.show();
            if (obj.code == '0000') {
                obj.info = $.parseJSON(Global.crypt(obj.info));
                // alert('2'+ obj.info)
                $('#onLin').css('display','none');
                // alert(1)
                if (obj.info.status == 'not') {
                    if (type == 'first') {
                        self.startPoint = 0;
                        self.endPoint = 100;
                        self.totalTime = 0;
                    } 
                    var tempObj = {
                        time: 0
                    };
                    self.updateStatus('process', obj.info);
                    if (self.count > 10) {
                     if (self.ticket_timer) {
                     clearInterval(self.ticket_timer);
                     self.ticket_timer = '';
                     }
                     self.updateStatus('delay', tempObj);
                     } else {
                     self.updateProgress(tempObj);
                     self.updateStatus('process', tempObj);
                     }
                    // if (self.ticket_timer) {
                    //     clearInterval(self.ticket_timer);
                    //     self.ticket_timer = '';
                    // }
                }if (obj.info.status == 'succ') {
                    // alert(2)
                    self.updateStatus('success', obj.info);
                    if (self.ticket_timer) {
                        clearInterval(self.ticket_timer);
                        self.ticket_timer = '';
                    }

                    if (ConfigObj.platForm === 'android') {
                        var timeOut = self.timeOut, timeOutBack = self.timeOutBack;
                        var source = '';
                        var money = "";
                        if(obj.info.channel == "alipayWap"){
                        	source = "2";
                        	money = obj.info.package_list.alipaywap.channel_amount;
                        }else if(obj.info.channel == "wechatpayWap"){
                        	source = "1";
                        	money = obj.info.package_list.wechatpaywap.channel_amount;
                        }
                        // alert(source)
						android_obj.payStatistics(money,source);
						
                        if (timeOut && timeOutBack) {
                            // 自动跳转
                            $('#payStatus_autoJumpTip').show();
                            setTimeout(function () {
                                self.setDefConfig();
                                Global.open(timeOutBack);
                            }, timeOut);
                        }
                    } else if (ConfigObj.platForm === 'ios') {
                        // 自动跳转
                        $('#payStatus_autoJumpTip').show();
                        setTimeout(function () {
                            if (self.from === 'account') {
                                accountObj.show(true);
                            } else if (self.from === 'userCenter') {
                                userCenterObj.show(true);
                            } else if (self.from === 'buyConfirm') {
                                var data = buyConfirmObj.data;
                                buyConfirmObj.show(true, function () {
                                    buyConfirmObj.setData(data);
                                });
                            }
                        }, 2000);
                    }
                } else if (obj.info.status == 'fail') {
                    // alert(3)
                    self.updateStatus('fail', obj.info);
                    if (self.ticket_timer) {
                        clearInterval(self.ticket_timer);
                        self.ticket_timer = '';
                    }
                } else if (obj.info.status == 'delay') {
                    // alert(4)
                    self.updateStatus('delay', obj.info);
                    if (self.ticket_timer) {
                        clearInterval(self.ticket_timer);
                        self.ticket_timer = '';
                    }
                } 
            } else {
                // $.alertMsg(obj.code_str);
            }
        }
    })
}

//obj.time //还剩下多少时间完成 payStatus_autoJumpTip
payStatusObj.updateProgress = function (obj) {
    /*if(obj.time == 0){
     clearInterval(payStatusObj.ticket_timer);
     }*/
    if (!payStatusObj.progress) {
        payStatusObj.progress = new CircularProgress({
            radius: 60,
            lineWidth: 10,
            strokeStyle: '#ff2c01'
        });
        payStatusObj.progressCon.find('.outer').get(0).appendChild(payStatusObj.progress.el);
    }
    var passTime = payStatusObj.totalTime - parseInt(obj.time);
    payStatusObj.endPoint = (payStatusObj.totalTime == 0) ? 100 : Math.abs((passTime / payStatusObj.totalTime) * 100);
    // //console.log('过去的时间: '+ passTime);
    // //console.log('当前开始的百分比: '+ payStatusObj.startPoint);
    // //console.log('当前结束的百分比: '+ payStatusObj.endPoint);
    payStatusObj.progress.run(payStatusObj.startPoint, payStatusObj.endPoint, function () {
        payStatusObj.startPoint = payStatusObj.endPoint;
        if (payStatusObj.endPoint == 100) {
            payStatusObj.progressCon.find('canvas').remove();
            payStatusObj.progress = null;
            payStatusObj.startPoint = 0; 
        }
    })
}

/**
 * 更新充值状态
 * @param type
 * @param itm 扣款数据对象
 */
payStatusObj.updateStatus = function (type, itm) {
    // alert(5)
    // alert(type)
    var self = this;
    var html = '';
    if (type == 'success') {
        // alert(6)
        if (this.dirPay) itm.status_cn = '支付成功';
        else itm.status_cn = '充值成功';
        // 成功
        this.progressCon.hide();
        this.progressEnd.show();

        html = '<p class="state2"><span class="succeed statebg">' + itm.status_cn + '</span></p>';
        this.progressEnd.find('.inner').html(html);
        this.progressEnd.children('div').removeClass('circle_fail').addClass('circle_succeed');

        this.botLink.show();
    } else if (type == 'process') {
        // alert(7)
        if (this.dirPay) itm.status_cn = '正在支付';
        else itm.status_cn = '正在充值';
 
        // 正在进行
        this.progressEnd.hide();
        this.progressCon.show();

        html = '<p class="state1 pt25"><span>' + itm.status_cn + '</span></p>';
        this.progressCon.find('.inner').html(html);
    } else if (type == 'fail') {
        if (this.dirPay) itm.status_cn = '支付失败';
        else itm.status_cn = '充值失败';

        // 失败
        this.progressCon.hide();
        html = '<p class="state2"><span class="fail statebg">' + itm.status_cn + '</span></p>';
        this.progressEnd.show();
        this.progressEnd.find('.inner').html(html);
        this.progressEnd.children('div').removeClass('circle_succeed').addClass('circle_fail');

        this.botLink.show();
        this.refreshBtn.hide();
        this.tryBtn.show();
    } else if (type == 'delay') {
        if (this.dirPay) itm.status_cn = '正在支付';

        // 延迟
        this.progressEnd.hide();

        this.progressCon.show();
        html = '<p class="state1 pt25"><span>' + itm.status_cn + '</span></p>';
        this.progressCon.find('.inner').html(html);

        this.refreshBtn.show();
        this.tryBtn.hide();
    }
    // console.log(344)
    payStatusObj.show();
    // return false;
    // console.log(347)

}

payStatusObj.onloadExecution = function () {
    this.createDomObj();
    this.createEvent();

}

payStatusObj.init = function () {
    payStatusObj.setDefConfig();
    payStatusObj.onloadExecution();
}

payStatusObj.setDefConfig = function () {
    this.pay_id = '';
    this.channel = ""
    this.target_type = '';
    this.target_id = '';
    this.dirPay = false;
    this.from = '';

    // 支付跳转相关
    this.timeOut = '';
    this.timeOutBack = '';
    this.back = '';

    this.count = 0;    //单个流程中取状态的次数,超过10个即认为是延迟状态
    this.startPoint = 0;
    this.endPoint = 100;
    this.progress = '';   //进度条实例
    if (payStatusObj.ticket_timer) {
        clearInterval(payStatusObj.ticket_timer);
        payStatusObj.ticket_timer = '';
    }
};

payStatusObj.setData = function (obj) {
    payStatusObj.pay_id = obj.pay_id;
    payStatusObj.target_type = obj.target_type;
    payStatusObj.target_id = obj.target_id;
    payStatusObj.channel = obj.channel;
//  payStatusObj.startTimer();
}

payStatusObj.setDirPay = function () {
    this.dirPay = true;
    $('#payStatus_backbtn').hide();
    $('#payStatus_botLinkB').show();

    $('#payStatus_title').text('支付状态');
    $('#payStatus_desc1').text('支付成功');
    $('#payStatus_desc2').text('正在支付');
};

/**
 * 设置取消充值状态
 */
payStatusObj.setCancelStatus = function () {
    payStatusObj.updateStatus('fail', {status_cn: '充值失败'});
    if (payStatusObj.ticket_timer) {
        clearInterval(payStatusObj.ticket_timer);
        payStatusObj.ticket_timer = '';
    }
}

payStatusObj.dirShow = function (obj) {
    //console.log('----', obj);
    this.show(true, function () {
        obj = obj || {};
        for (var p in obj) {
            if (!obj.hasOwnProperty(p)) continue;

            this[p] = obj[p]; // 设置属性
            if (p === 'pay_id') this.startTimer(); // 转圈
            if (p === 'back') {
                this.goBack = function () {
                    Global.open(obj['back']);
                }
            }
            if (p === 'direct') {
                this.setDirPay();
                var d = window.localStorage.getItem('directPayStatusData');
                if (d) {
                    d = JSON.parse(d);
                    this.setData(d);
                    window.localStorage.removeItem('directPayStatusData');
                }
            }
        }
    }.bind(this));
};