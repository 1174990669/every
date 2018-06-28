var signProtocalObj = new PageController({
    'name': 'stationCode',
    'tpl': 'template/station/signProtocol.html'
});


signProtocalObj.createDom = function () {
    this.wrapObj = $('#signProtocol_wrapperObj');
};

signProtocalObj.createEvent = function () {
    this.wrapObj.on('tap', function (e) {
        var pObj = $.oto_checkEvent(e, 'P');
        if (pObj) {
            pObj = $(pObj);
            var t = pObj.attr('data-t');
            switch (t) {
                case 'back': signProtocalObj.goBack(); break;
            }
        }

        var aObj = $.oto_checkEvent(e, 'A');
        if (aObj) {
            aObj = $(aObj);
            t = aObj.attr('data-t');
            switch (t) {
                case 'sign': signProtocalObj.sign(e.target); break;
            }
        }
    });
};

signProtocalObj.sign = function (el) {
    Global.tips({
        text: '确认开通代理吗？',
        confirm: function () {
            el = $(el);
            el.addClass('gray');
            $.post(ConfigObj.localSite + '?version=1&m=user.station.signProtocol', {sign: 'Y', access_token: loginObj.access_token}, function (data) {
                el.removeClass('gray');
                if (data.code == '0000') {
                    $.alertMsg('开通成功', true);
                    setTimeout(function () {
                        serviceObj.goBack = function () {
                            serviceObj.destroy();
                            Global.delCache('?version=1&m=user.account.center');
                            userCenterObj.show(true);
                        };
                        serviceObj.show(true, function () {
                            serviceObj.getData(loginObj.userInfo.s_id);
                        });
                    }, 2000);
                } else {
                    $.alertMsg(data.msg);

                    if (data.code == '-2205') {
                        // 已经开通，回到用户中心
                        setTimeout(function () {
                            userCenterObj.show(true);
                        }, 2000);
                    }
                }
            }, 'json')
        }
    });
};

signProtocalObj.onloadExecution = function () {
    this.createDom();
    this.createEvent();
};

signProtocalObj.init = function () {
    this.onloadExecution();
};

signProtocalObj.setData = function (obj) {
};