var withDrawObj = new PageController({
    'name': 'withDraw',
    'tpl': 'template/user/withDraw.html'
});
// withDraw_pwdObj  cashier.withdraw.index withDraw_pwdObj
withDrawObj.createDomObj = function() {
    this.wrapObj = $("#withDraw_wrapObj");
    this.moneyObj = $("#withDraw_moneyObj");
    this.keyObj = $("#withDraw_keyObj");
    this.backObj = $("#withDraw_backObj");
    this.showObj = $("#withDraw_showObj");
    this.pwdObj = $("#withDraw_pwdObj");  //密码
    this.moneyTipsObj = $("#withDraw_moneyTipsObj");
    this.payIdObj = $("#withDraw_payIdObj");
    this.cardIdObj = $("#withDraw_cardIdObj");
    this.helpObj = $("#withDraw_helpObj");
    this.cardInfoObj = $('#withDraw_cardInfo');
    this.totalMoneyObj = $('#withDraw_totalMoney');
    this.hideTipsObj = $("#withDraw_hideTipsObj");
//  this.recordObj = $("#withDraw_recordObj"); uId1
    this.loading = $('#withDraw_loading');
    this.takeAll = $("#takeAll");
    this.actualMoney = $("#actualMoney");
    this.balance = $("#balance");
    this.drawTime = $("#drawTime");

    $('#withDraw_cz').tap(function(){
        setTimeout(function(){
            modifyPwdObj.goBack = function () {
                withDrawObj.show();
                // userInfoObj.show();//更改后注册返回到领取页面
                // userCenterObj.show(); //更改前注册返回到首页
            };
            modifyPwdObj.show();
            // withdrawSelectObj.show();
        },300);

    })
}


withDrawObj.createEvent = function() {
    var self = this;
    this.wrapObj.unbind('tap').tap(function(e) {
        withDrawObj.updateMoneyEvent(e);
    });

    this.backObj.unbind('tap').tap(function() {
        withDrawObj.goBack();
    });

    this.helpObj.unbind('tap').tap(function() {
        withDrawObj.goRules();
    });

//  this.recordObj.unbind('tap').tap(function() {
//      withDrawObj.goRecord();
//  });

    this.pwdObj.unbind('focus').focus(function() {
        $(this).parent().addClass('focus');
        withDrawObj.showObj.removeClass('focus');
        withDrawObj.hidekey();
    });
    this.pwdObj.unbind('blur').blur(function() {
        $(this).parent().removeClass('focus');
    });

    withDrawObj.takeAll.tap(function(e) {
        // 全部提现
        $(this).hide();
        var baseMoney = Number(self.totalMoneyObj.html().split(".")[0]); // 余额
        if (withDrawObj.feeData.draw_count_month < withDrawObj.feeData.drawlimit_cfg.month_free_times) {
            // 本月还可以免费体现
            var actualMoney = baseMoney;
            self.moneyTipsObj.hide();
            self.moneyObj.html(baseMoney).show();
            self.moneyObj.html(baseMoney + "元");
            self.balance.hide();
            self.takeAll.hide();
            self.actualMoney.html("实际到帐" + actualMoney + "元 " + "<span>&nbsp;&nbsp;</span>" + "手续费0元");
            self.money = baseMoney;
            
            
            
            return false;
        }

        var poundage = Number(baseMoney * withDrawObj.feeData.drawlimit_cfg.fee).toFixed(2);
        if (poundage > withDrawObj.feeData.drawlimit_cfg.maximum_fee) {
            poundage = withDrawObj.feeData.drawlimit_cfg.maximum_fee;
        } else if (poundage < withDrawObj.feeData.drawlimit_cfg.minimum_fee) {
            poundage = withDrawObj.feeData.drawlimit_cfg.minimum_fee;
        }

        actualMoney = Number(baseMoney - poundage).toFixed(2);
        self.moneyTipsObj.hide();
        self.moneyObj.html(baseMoney).show();
        self.moneyObj.html(baseMoney + "元");
        self.balance.hide();
        self.takeAll.hide();
        self.actualMoney.html("实际到帐" + actualMoney + "元 " + "<span>&nbsp;&nbsp;</span>" + "手续费：" + poundage + "元").show();
        self.money = baseMoney;
    });

    withDrawObj.checkIfLessMin = function() {
        if (Number(this.totalMoneyObj.html().split(".")[0]) < 50) {
            //console.log(Number(this.totalMoneyObj.html().split(".")[0]) + "==============")
            this.takeAll.removeClass("fontblue");
            this.takeAll.addClass("gray");
            this.takeAll.unbind("tap");
            return false;
        } else {
            this.takeAll.addClass("fontblue");
        }
    };
}
  /*  withDrawObj.chec = function(){
         c = cd
        console.log(c)
    }*/
//withDrawObj.goRecord = function() {
//  withdrawRecordObj.goBack = function() {
//      withdrawRecordObj.destroy();
//      withDrawObj.show();
//  }
//  withdrawRecordObj.show('reload');
//}

withDrawObj.goRules = function() {
    withdrawRulesObj.goBack = function() {
        withdrawRulesObj.destroy();
        withDrawObj.show();
    }
    withdrawRulesObj.show();
}

withDrawObj.updateMoneyEvent = function(e) {
    var aObj = $.oto_checkEvent(e, "A");
    if (aObj) {
        var thisObj = $(aObj);
        var thisT = thisObj.attr("data-t");
        switch (thisT) {
            case "sub":
                this.subPay();
                return true;;
            case "clearTips":
                this.hideTipsObj.hide();
                return true;
                //  case "subTips" : window.location.reload();return true;
        }
    }

    var pObj = $.oto_checkEvent(e, "P");
    if (pObj) {
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch (thisT) {
            case "showkey":
                this.showKey();
                return true;;
        }
    }

    var dlObj = $.oto_checkEvent(e, "DL");
    if (dlObj) {
        var thisObj = $(dlObj);
        var thisT = thisObj.attr("data-t");
        switch (thisT) {
            case "updBank":
                this.goMyBankList();
                return true;
        }
    }

    var pObj = $.oto_checkEvent(e, "P");
    if (pObj) {
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch (thisT) {
            case "showkey":
                this.showKey();
                return true;;
        }
    }

    var spanObj = $.oto_checkEvent(e, "SPAN");
    if (spanObj) {
        var thisObj = $(spanObj);
        var thisT = thisObj.attr("data-t");
        switch (thisT) {
            case "showkey":
                this.showKey();
                return true;
            case "hidekey":
                this.hidekey();
                return true;
            case "key":
                this.keytUpdateMoney(thisObj);
                return true;
            case "delkey":
                this.delKeyMoney();
                return true;
        }
    }
    var divObj = $.oto_checkEvent(e, "DIV");
    if (divObj) {
        if (divObj.id == "withDraw_keyObj") return true;
        if ($(divObj).attr("data-t") == "nohide") return true;
//      console.log("222")
//      withDrawObj.hidekey();
        withDrawObj.hideTipsObj.hide();
    }
}

withDrawObj.delKeyMoney = function() {
    this.money = Number(this.money.toString().slice(0, -1));
    if (this.money < 50) {
        this.moneyObj.html(this.money + "元").show();
        this.balance.hide();
        this.actualMoney.html("不满足提现金额").show();
    }
    this.updateMoney();
    this.balance.show();
    this.actualMoney.hide();
}

withDrawObj.keytUpdateMoney = function(obj) {
    var thisV = obj.attr("data-v");
    this.money += thisV.toString();
    this.money = Number(this.money);
    if (this.money < 50) {
        this.moneyObj.html(this.money + "元").show();
        this.balance.show();
        this.actualMoney.hide();
        // this.actualMoney.html("不满足提现金额").show();
    }
    this.showMoneyTips();
    this.updateMoney();
    this.balance.show();
    this.actualMoney.hide();
//  console.log(this.money)
}

withDrawObj.showKey = function() {
    if (Number(this.totalMoneyObj.html().split(".")[0]) < 50) {
        $.alertMsg("提现金额最少50元");
        return false;
    }
    this.pwdObj.blur();
    this.takeAll.show();
    this.keyObj.show();
    this.balance.show();
    this.actualMoney.hide();
    this.showObj.addClass('focus');

}

withDrawObj.hidekey = function(e) {
    if (this.money < 50) {
//      if (Number(this.totalMoneyObj.html().split(".")[0]) < 50) {
//          this.takeAll.removeClass("fontblue");
//          this.takeAll.addClass("gray");
//          this.takeAll.unbind("tap");
//          return false;
//      }
//      //解决如果未操作并退出 仍会弹出alert
////      console.log($(e.target).hasClass("backicon"))
//      if ($(e.target).hasClass("backicon") || $(e.target).hasClass("drawstate") || $(e.target).hasClass("balance")) {
//          return false;
//      }
        this.money = 50;
        $.alertMsg("提现金额不能少于50元");
        this.moneyObj.html(this.money + "元").show();
        this.moneyTipsObj.hide();
        this.keyObj.hide();
        this.showObj.removeClass('focus');
        this.takeAll.hide();
        this.balance.hide();
        if (withDrawObj.feeData.draw_count_month < withDrawObj.feeData.drawlimit_cfg.month_free_times) {
            this.actualMoney.html("实际到帐50元 " + "<span>&nbsp;&nbsp;</span>" + "手续费0元").show();
            return false;
        }
        var actualMoney = this.money;
        var poundage = Number(this.money * withDrawObj.feeData.drawlimit_cfg.fee).toFixed(2);
        if (poundage > withDrawObj.feeData.drawlimit_cfg.maximum_fee) {
            poundage = withDrawObj.feeData.drawlimit_cfg.maximum_fee;
        } else if (poundage < withDrawObj.feeData.drawlimit_cfg.minimum_fee) {
            poundage = withDrawObj.feeData.drawlimit_cfg.minimum_fee;
        }
        actualMoney = Number(this.money - poundage).toFixed(2);
        this.actualMoney.html("实际到帐" + actualMoney + "元 " + "<span>&nbsp;&nbsp;</span>" + "手续费：" + poundage + "元").show();
        
    return false;
    }
    var actualMoney = this.money;
    if (withDrawObj.feeData.draw_count_month < withDrawObj.feeData.drawlimit_cfg.month_free_times) {
        this.actualMoney.html("实际到帐" + actualMoney + "元 " + "<span>&nbsp;&nbsp;</span>" + "手续费0元").show();
    } else{
        var poundage = Number(this.money * withDrawObj.feeData.drawlimit_cfg.fee).toFixed(2);
        if (poundage > withDrawObj.feeData.drawlimit_cfg.maximum_fee) {
            poundage = withDrawObj.feeData.drawlimit_cfg.maximum_fee;
        } else if (poundage < withDrawObj.feeData.drawlimit_cfg.minimum_fee) {
            poundage = withDrawObj.feeData.drawlimit_cfg.minimum_fee;
        }
        actualMoney = Number(this.money - poundage).toFixed(2);
        this.actualMoney.html("实际到帐" + actualMoney + "元 " + "<span>&nbsp;&nbsp;</span>" + "手续费：" + poundage + "元").show();
    }
    this.balance.hide();
    this.updateMoney();
    this.keyObj.hide();
    this.takeAll.hide();
    this.showObj.removeClass('focus');
}

withDrawObj.setMoney = function(obj) {
    var thisV = Number(obj.attr("data-v"));
    obj.siblings().removeClass("selected");
    obj.addClass('selected')
    this.money = thisV;
//   console.log(this.money) sub
    this.updateMoney();
}

withDrawObj.updateMoney = function() {
    var maxVal = Number(this.totalMoneyObj.html().split(".")[0]);
    // this.takeAll.hide();
    if (this.moneyObj.html() == "0元") {
        this.balance.show();
        this.actualMoney.hide();
    }
    if (this.money > maxVal) {
        if (Number(this.totalMoneyObj.html().split(".")[0]) < 50) {
            return;
        }
        $.alertMsg("已超过账户可提金额");
        this.money = parseInt(maxVal);
        this.keyObj.hide();

    } else if (this.money < 50) {
        // this.money = 50;
        // $.alertMsg("提现金额不能少于50元");
        // this.moneyObj.html(this.money + "元").show();
        // this.actualMoney.html("不满足提现金额");
        // this.moneyTipsObj.hide();
        this.moneyObj.html(this.money + "元").show();
        this.balance.hide();
        this.actualMoney.html("不满足提现金额").show();
        return false;
    }

    if (withDrawObj.feeData.draw_count_month < withDrawObj.feeData.drawlimit_cfg.month_free_times) {
        // 本月还可以免费提现
        var actualMoney = this.money;
        this.balance.hide();
        this.moneyObj.html(this.money + "元");
        this.actualMoney.html("实际到帐" + actualMoney + "元 " + "<span>&nbsp;&nbsp;</span>" + "手续费0元").show();
        this.takeAll.show();
        this.showMoneyTips();
        return false;
    }

    var poundage = Number(this.money * withDrawObj.feeData.drawlimit_cfg.fee).toFixed(2);
    if (poundage > withDrawObj.feeData.drawlimit_cfg.maximum_fee) {
        poundage = withDrawObj.feeData.drawlimit_cfg.maximum_fee;
    } else if (poundage < withDrawObj.feeData.drawlimit_cfg.minimum_fee) {
        poundage = withDrawObj.feeData.drawlimit_cfg.minimum_fee;
    }
    actualMoney = Number(this.money - poundage).toFixed(2);
    this.moneyObj.html(this.money + "元");
    this.actualMoney.html("实际到帐" + actualMoney + "元 " + "<span>&nbsp;&nbsp;</span>" + "手续费：" + poundage + "元");
    this.takeAll.show()
    this.showMoneyTips();
}

withDrawObj.showErrMsg = function(msg) {
    $.alertMsg(msg);
}
//cashier.withdraw.index
withDrawObj.showMoneyTips = function() {
    if (this.money > 0) {
        this.moneyTipsObj.hide();
        this.moneyObj.show();
    } else {
        this.moneyTipsObj.show();
        this.moneyObj.hide();
    }
}


withDrawObj.subPay = function() {
    var pwdVal = this.pwdObj.val();
    console.log(pwdVal)
    if (!this.money || this.money < 50) {
        $.alertMsg("提现金额最少50元");
        this.money = 0;
        this.moneyObj.html(this.money + "元");
        return false;
    } else if (this.money > 5000000) {
        $.alertMsg("提现金额最高500万元");
        return false;
    } else if (withDrawObj.feeData.draw_count_day - withDrawObj.feeData.drawlimit_cfg.times_onday >= 0) {
        $.alertMsg("每日每用户限提款" + withDrawObj.feeData.drawlimit_cfg.times_onday + "次")
        return false;
    }
    if (!pwdVal) {
        $.alertMsg("请输入密码");
        return false;
    }
        var postData = {
            'amount': this.money,
            'pay_id': this.payIdObj.val(),
            'card_id': this.cardIdObj.val(),
            'passWord': (pwdVal ? hex_md5(pwdVal) : ""),
            'channel': this.channel,
        }
        // console.log()
             console.log(postData);
        var secretData = {
                'access_token': loginObj.access_token,
                'para' : Global.encrypt(postData)
            }; 
            // console.log(postData)
        $.ajax({
            url: ConfigObj.localSite + '?version=1&m=cashier.withdraw.getDraw',
            data: secretData,
            type: "post",
            dataType: "json",
            success: function(msg) {
                console.log('提提交接口返回', msg);
                if (msg.code !== "0000") {
                    withDrawObj.showErrMsg(msg.code_str);
                    return false;
                }
                msg.info = $.parseJSON(Global.crypt(msg.info));
                console.log(msg.info.order_id)
                orId = msg.info.order_id
                withdrawDetailObj.goBack = function() {
                    Global.GC();
                    userCenterObj.show('reload');
                }
                withdrawDetailObj.show('reload', function() {
                    withdrawDetailObj.getData(msg.info.order_id);
                });
                withDrawObj.suPa(cd)
                console.log(cd)
            }
        });
}

    withDrawObj.suPa = function(){
        // console.log(orId)
        // console.log(cd)
        var pData = {
            'bank_number': cd,
            'order_id': orId,
        }
            // console.log(454)
        $.ajax({
            url: ConfigObj.localSite + '?version=1&m=cashier.excep.bank_number',
            data: pData,
            type: "post",
            dataType: "json",
            success: function(ms){
                console.log(ms)
                // console.log(4)
            },
            error:function(mm){
                console.log(mm)
            }
        })

    }//sub
withDrawObj.formatHtml = function(obj) {
    if (!obj.card_info) return;
    var html = '<dt><span class="bank ' + (obj.card_info.bank_type ? obj.card_info.bank_type.toLowerCase() : '') + '"></span></dt>' +
        '<dd>' +
        '<p class="font16">' + obj.card_info.bank_typecn + '</p>' +
        '<p class="font12 gray">' + obj.card_info.card_desc + ' ' + obj.card_info.card_typecn + '</p>' +
        '<span class="arrowbox"><em class="rtarrow icon"></em></span>' +
        '</dd>';
    this.cardInfoObj.html(html);
    this.totalMoneyObj.html(obj.available_cash);
    this.moneyObj.attr('data-max', obj.available_cash);

}

//跳转到我绑定的银行列表
withDrawObj.goMyBankList = function() {
    ebankListObj.goBack = function() {
        var bankId = ebankListObj.bankId;
        ebankListObj.destroy();
        withDrawObj.show('reload', function() {
            withDrawObj.getData(bankId);
        });
    }
    ebankListObj.show('reload', function() {
        ebankListObj.fromPage = 'withdraw';
        ebankListObj.bankId = withDrawObj.bankId;
        ebankListObj.getData();
    })
}

withDrawObj.getDrawCount = function() {
    var postData2 = {
        'access_token': loginObj.access_token,
        'channel': this.channel
    }
    Global.post('?m=cashier.withdraw.getDrawCount', postData2, function(res) {
    console.log(res);
        withDrawObj.feeData = res;
         if (withDrawObj.feeData.drawlimit_cfg.times_onday - withDrawObj.feeData.draw_count_day >= 0) {
                withDrawObj.drawTime.html("今日还可提现" + (withDrawObj.feeData.drawlimit_cfg.times_onday - withDrawObj.feeData.draw_count_day) + "次")
            } else {
                withDrawObj.drawTime.html("今日还可提现0次");
            }
//      console.log("11",withDrawObj.feeData);
    });
};


//bankId 默认的银行卡id,可以为空 
withDrawObj.getData = function(bankId) {
    console.log(bankId)
    var self = this;
    if (loginObj.userInfo && loginObj.userInfo.real_status == 'N') { //未实名
        withDrawObj.loading.remove();
        $.alertMsg('请先完成实名');
        regRealNameObj.goBack = function() {
            regRealNameObj.destroy();
            self.show('reload', function() {
                self.getData(bankId);
            });
        }
        regRealNameObj.show('reload', function() {
            var data = {
                'accountName': loginObj.userInfo.user_name,
                'from': 'buy',
            }
            regRealNameObj.setData(data);
        });
        return;
    } else if (loginObj.userInfo && loginObj.userInfo.real_status == 'Ing') {
        withDrawObj.loading.remove();
        $.alertMsg('您的实名正在审核中');
        return;
    }
        var uId1 = localStorage.getItem("lastId")
        console.log(uId1)
        var postData = {
            'user_id': uId1,
        }
        $.ajax({
            url: ConfigObj.localSite + '?version=1&m=cashier.excep.reset_pass',
            data: postData,
            type: "post",
            dataType: "json",
            // async:false, cashier.withdraw.index 
            success: function(msg) {
                console.log(msg)
                if (msg.code == '-1001') {
                    $.alertMsg('请先设置提现密码')
                    /*setTimeout(function(){
                        userInfoObj.show()
                    },1000);*/

                    setTimeout(function(){
                        modifyPwdObj.goBack = function () {
                        withdrawSelectObj.show();
                            // userInfoObj.show();//更改后注册返回到领取页面
                            // userCenterObj.show(); //更改前注册返回到首页
                        };
                        modifyPwdObj.show();
                        // withdrawSelectObj.show();
                    },300);

                // console.log(msg.code)

                }else{
            console.log(534)
            var postData = {
                'card_id': bankId ? bankId : '',
                'channel_number': ConfigObj.zdid
            }
            withDrawObj.bankId = bankId ? bankId : '';
            var secretData = {
                'access_token': loginObj.access_token,
                'para' : Global.encrypt(postData)
                };
                // console.log(postData) cashier.withdraw.getDrawCount
                // var cd = null;
            $.ajax({
                url: ConfigObj.localSite + '?version=1&m=cashier.withdraw.index',
                data: secretData,
                type: "post",
                dataType: "json",
                // async:false, cashier.withdraw.index
                success: function(msg) {
                   console.log('提现页面接口返回', msg);
                    if (msg.code == '0000') {
                        msg.info = $.parseJSON(Global.crypt(msg.info));
                        // console.log(msg.info.card_info.card_no)
                        /*if (msg.info.card_info = '') {

                        
                        }else{ */
                           /* cd = msg.info.card_info.card_no
                            Id2 = msg.info.card_info.user_id*/
                        // }
                        // console.log(msg.info.card_info.user_id)
                        withDrawObj.channel = msg.info.channel;
                        withDrawObj.getDrawCount();
                        
                        // withDrawObj.suPa()
                        if (msg.info.card_id) { //已经绑定银行卡的情况 cashier.withdraw.index
                            withDrawObj.loading.remove();
                            withDrawObj.formatHtml(msg.info);
                            withDrawObj.payIdObj.val(msg.info.pay_id);
                            withDrawObj.cardIdObj.val(msg.info.card_id);
                            balance = msg.info.available_cash;
                            withDrawObj.checkIfLessMin()
                            cd = msg.info.card_info.card_no
                            Id2 = msg.info.card_info.user_id
                            withDrawObj.subPay()
                            withDrawObj.setMon()
                        } else { //没有绑定银行卡的情况
                            //$.alertMsg('请先绑定银行卡',true);
                            bindBankObj.goBack = function() {
                                bindBankObj.destroy();
                                withDrawObj.destroy();
                                userCenterObj.show('reload');
                            }
                            setTimeout(function() {
                                bindBankObj.show('reload', function() {
                                    bindBankObj.setData({ 'fromPage': 'withDraw' })
                                });
                            }, 200)
                        }
                    } else {
                        withDrawObj.loading.remove();
                        withDrawObj.showErrMsg(msg.code_str);
                    }


                    // console.log(cd)
                    //console.log("222");
        //            console.log("22",withDrawObj.feeData);
        //            console.log(withDrawObj.feeData.drawlimit_cfg);
                   
                }
            });
    }  
        }
    })
}
withDrawObj.setMon = function(){
    var postData = {
        'user_id': Id2
    }
    $.ajax({
        url:ConfigObj.localSite + '?m=cashier.excep.consumption',
        data:postData,
        type:'post',
        dataType:'json',
        success:function(msg){
            // console.log(msg)
            if (msg.code == 0000) {
                // console.log(1)
                $('#p_a_none').css('display','block')
            }else{
                $('#p_a_none').css('display','none')
                // console.log(2) cashier.withdraw.getDrawCount
            }
        }
    })
}

withDrawObj.setDefConfig = function() {
    withDrawObj.money = 0;
    this.bankList = '';
    this.bankId = '';
    this.channel = '';
    this.feeData = new Array;
}

withDrawObj.onloadExecution = function() {
    this.createDomObj();

    this.getData(); // 获取提款账户信息
    this.createEvent();
     // 获取提款费用相关
    // withDrawObj.checkIfLessMin()
}

withDrawObj.init = function() {
    this.setDefConfig();
    withDrawObj.onloadExecution();
}