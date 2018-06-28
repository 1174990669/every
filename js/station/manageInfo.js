var manageInfoObj = new PageController({
    'name': 'stationCode',
    'tpl': 'template/station/manageInfo.html'
});


manageInfoObj.createDom = function () {
    this.wrapObj = $('#manageInfo_wrapperObj');
};

manageInfoObj.createEvent = function () {
    this.wrapObj.on('tap', function (e) {
        var t = '';
        var pObj = $.oto_checkEvent(e, 'P');
        if (pObj) {
            pObj = $(pObj);
            t = pObj.attr('data-t');
            switch (t) {
                case 'back': manageInfoObj.goBack(); break;
            }
        }

        var aObj = $.oto_checkEvent(e, 'A');
        if (aObj) {
            aObj = $(aObj);
            t = aObj.attr('data-t');
            switch (t) {
                case 'submit': manageInfoObj.submit(); break;
            }
        }
    });

    $('.manageInfo').each(function () {
        $(this).on('focus', function (e) {
            // 设置选中状态
            if (!e.target.readOnly)
                e.target.parentNode.style.borderColor = '#30a1f7';
        }).on('blur', function (e) {
            // 去掉选中状态
            console.dir(e.target);
            // if (!e.target.readOnly)
                e.target.parentNode.style.borderColor = 'transparent';
        });
    });
};

manageInfoObj.getData = function () {
    var url = ConfigObj.localSite + '?version=1&m=user.station.getCustomerInfo';
    $.post(url, {access_token: loginObj.access_token}, function (data) {
        //console.log('代理管理资料返回', data);
        if (data.code == '0000') {
            manageInfoObj.info = data.info;
            manageInfoObj.setInfoVal(data.info);
        } else {
            $.alertMsg(data.msg);
        }
    }, 'json');
};

manageInfoObj.setInfoVal = function (info) {
    this.wrapObj.find('.manageInfo').each(function (i, el) {
        el = $(el);
        el.val(info[el.attr('name')]);
    });
    
};

manageInfoObj.submit = function () {
    var postData = {};
    this.wrapObj.find('.manageInfo').each(function (i, el) {
        el = $(el);
        postData[el.attr('name')] = el.val()
    });

    var qq = postData.qq;
    var wx = postData.wx;

    if (qq == manageInfoObj.info.qq && wx == manageInfoObj.info.wx)
        return true;

    $.post(ConfigObj.localSite + '?version=1&m=user.station.editInfo', {
        qq: qq,
        wx: wx,
        access_token: loginObj.access_token
    }, function (data) {
        if (data.code == '0000') {
            $.alertMsg(data.msg, true);
            setTimeout(function () {
                // manageInfoObj.getData();
                serviceObj.show(true, function () {
                    serviceObj.getData(loginObj.userInfo.s_id);
                });
            }, 2000);
        } else {
            $.alertMsg(data.msg);
        }
    }, 'json');
};

manageInfoObj.onloadExecution = function () {
    this.createDom();
    this.createEvent();
    this.getData();
};

manageInfoObj.init = function () {
    this.onloadExecution();
};

manageInfoObj.setData = function (obj) {
};