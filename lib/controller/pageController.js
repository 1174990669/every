function PageController(obj) {

    this.name = obj.name; //页面名字 必选项
    this.tpl = obj.tpl; //模板路径 必选项
    this.initScrollTop = obj.initScrollTop ? obj.initScrollTop : false; //页面初始化是否滑动到头部
    this.pullDistance = obj.pullDistance ? obj.pullDistance : 200;
// console.log(obj.name)
    // console.log(this.tpl)
    this.setDefConfig = function() {

    }

    this.init = function() {

    }

    this.destroy = function() {  //销毁
        var self = this;
        self.setDefConfig();
        $('#' + self.name).html('').remove();
        // console.log($('#' + self.name).html('').remove())
    }

    //isReload 是否需要页面重新加载
    //callback 页面回调函数
    this.showFlag = true;
    this.show = function(isReload, callback) {
        // console.log("这是28"+callback)
        //解决快速点击 页面乱加载bug
        if (!this.showFlag) {
            return;
        }
        this.showFlag = false;
        var self = this;
        // console.log(self)
        /* bcy*/
        if (self.initScrollTop) {
            window.scrollTo(0, 0);
        }
        var activePage = Global.getActivePage();
        // console.log(activePage)
        var pageDom = $('#' + self.name);
        // console.log(pageDom)
        if (pageDom.length == 0 || isReload) {
            // console.log(12)
            //解决tap点击穿透问题--1.发卡银行浮层页面无法停留；2.密码框焦点问题;3.键盘不回弹问题
            // setTimeout(function() {
                $.ajax({
                    url: self.tpl,
                    data: 't=' + new Date().getTime(),
                    dataType: 'text',
                    success: function(obj) {
                        // console.log(obj)
                        var rx = /<body[^>]*>([\s\S]+?)<\/body>/i
                        var m = rx.exec(obj);
                        // console.log(m)
                        if (m) m = m[1];
                        if (pageDom.length > 0) {
                            pageDom.remove();
                            // console.log(12)
                        }
                        var tplHtml = '<div class="page" style="display:none" id="' + self.name + '">' + m + '</div>';
                        $(document.body).append(tplHtml);
                        // console.log(tplHtml)
                        Global.pageSwitch($('#' + self.name), $(activePage));
                        // console.log(self.name)
                        self.init();
                        if (callback) callback();
                        if (ConfigObj.platForm == 'ios' && Global.fixIos10Flag == 1) {
                            self.fixIos10();
                        }
                        self.showFlag = true;
                        //解决键盘无法回弹问题
                        if ($("textarea").length > 0) {
                            objBlur("textarea");
                        }
                        if ($("input").length > 0) {
                            objBlur("input");
                        }

                        // 特殊需求 Hack
                        if (self.name == 'd3') d3Obj.funObj.updateBonusTips('IP');

                        self.pv();
                        // console.log(self.pv())
                    }
                })
//          }, 320)
        } else {
            // console.log(123)
            Global.pageSwitch($('#' + self.name), $(activePage));
            // console.log(Global.pageSwitch($('#' + self.name), $(activePage)))
            self.showFlag = true;
            var recordArr = ['betRecord', 'planRecord', 'searchBetResult', 'cashRecord', 'searchCashResult', 'freezeRecord', 'handselRecord', 'scoreRecord', 'searchScoreResult', 'getTicketRecord', 'rechargeRecord', 'withdrawRecord'];
            if ($.inArray(self.name, recordArr) != -1) {
                if (self.scrollTop > 0) {
                    window.scrollTo(0, self.scrollTop);
                }
            }
        }
        //setTimeout(function(){
        // self.pv();
        // },300)
    }

    this.dirShow = function() {
        this.show();
        // console.log(1)
    }

    this.pushRoute = function(fun) {
        var self = this;
        if (!self.routeArr) self.routeArr = [];
        self.routeArr.push(fun);
        // console.log(2)
    }

    this.popRoute = function() {
        var self = this;
        // console.log(3)
        if (self.routeArr.length >= 1) {
            var fun = self.routeArr.pop();
            fun();
            // console.log(1)
            if (self.routeArr.length == 0) {
                self.destroy();
                // console.log(2)
            }
        } else {
            Global.GC();
            homeObj.show();
            // console.log(3)
            //console.log(self.name + '---不应该到此处[除非是程序url直接进入]------------------------');
        }
    }

    this.fixIos10 = function() {
        if (ConfigObj.platForm != 'ios') return;
        var self = this;
        var checkIosVer = function() {
            var ver = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            ver = parseInt(ver[1], 10);
            return Number(ver);
        }
        var version = checkIosVer();
        if (version >= 10) {
            var dom = $('#' + self.name).find('.centerWrap');
            if (dom.length > 0) {
                var oldH = parseInt(dom.css('margin-top'), 10);
                //alert(oldH);
                var newH = oldH - 20;
                dom.css('margin-top', newH);
            }
        }
        //修复ios下input输入的时候header乱飘的bug
        setHeaderPosition()
    }

    // 统计
    this.pv = function () {
        // console.log(4)
        var name = this.name; // 页面名称
        var lt = this.lotteryType;
        console.log(name)
        // 选号
        var xh = ['ssq', 'dlt', 'soccerMix', 'soccer2x1', 'basketMix', 'soccerToto', 'soccerR9', 'd3', 'pl3', 'pl5', 'fastK3', 'fastBet'];

        if (xh.indexOf(name) !== -1) Global.pv('xuanhao', {lotteryType: lt}); // 选号
        if (name === 'buyConfirm') Global.pv('buyConfirm', {lotteryType: lt}); // 支付确认
        if (name === 'numKaijiang') Global.pv('kaijiang', {}); // 开奖
        if (name === 'redBag') Global.pv('hongbao', {}); // 红包
        if (name === 'newsIdx') Global.pv('news', {}); // 资讯首页
        // console.log(Global.pv('news', {}))
    }
}
