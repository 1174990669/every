var invsendBonusDetailObj = new PageController({
    'name': 'invsendBonusDetail',
    'tpl': 'template/activity/invsendBonusDetail.html'
});


invsendBonusDetailObj.createDomObj = function () {
    this.wrapObj = $('#invsendBonusDetail_wrapper');
    this.tbodyObj = $('#invsendBonusDetail_tbody');
    this.wrapObj[0].style.backgroundColor = '#fff7ec';
};

invsendBonusDetailObj.createEvent = function () {
    this.wrapObj.on('tap', function (e) {
        var pObj = $.oto_checkEvent(e, 'P');
        var t;
        if (pObj) {
            pObj = $(pObj);
            t = pObj.attr('data-t');
            switch (t) {
                case 'back': this.goBack(); break;
                case 'myBonus': this.goBonusRecord(); break;
                case 'invite': this.invite(); break;
            }
        }

        var liObj = $.oto_checkEvent(e, 'LI');
        if (liObj) {
            liObj = $(liObj);
            t = liObj.attr('data-t');
            var v = liObj.attr('data-v');
            switch (t) {
                case 'changeStatus': this.changeStatus(liObj, v); break;
            }
        }

        var aObj = $.oto_checkEvent(e, 'A');
        if (aObj) {
            aObj = $(aObj);
            t = aObj.attr('data-t');
            switch (t) {
                case 'invite': this.invite(); break;
                case 'receive': this.goInvSendBonusDetail(); break;
            }
        }

        var divObj = $.oto_checkEvent(e, 'DIV');
        if (divObj) {
            divObj = $(divObj);
            t = divObj.attr('data-t');
            switch (t) {
                case 'receive': this.receive(divObj.attr('data-eid'), divObj.attr('data-uid')); break;
            }
        }

        var tdObj = $.oto_checkEvent(e, 'TD');
        if (tdObj) {
            tdObj = $(tdObj);
            t = tdObj.attr('data-t');
            switch (t) {
                case 'receive': this.receive(tdObj.attr('data-eid'), tdObj.attr('data-uid')); break;
            }
        }

    }.bind(this));

    window.onscroll = function () {
        if (window.scrollY !== 0) this.scrollTop = window.scrollY;

        if (!this.checkPage) return false;

        this.updatePage();
    }.bind(this);

    var self = invsendBonusDetailObj;
    $('#invsendBonusDetail_wrapper').dropload({
        scrollArea: window,
        distance: 200,
        loadUpFn:function(me) {
            self.getData(self.eid);
            self.changeStatus(self.curTab, self.status, true);
            setTimeout(function () {
                me.resetload();
            }, 2000);
        }
    });
};

invsendBonusDetailObj.updatePage = function () {
    var scrollTop = document.body.scrollTop;
    var bodyHeight = this.wrapObj.height();
    if (scrollTop + this.clientHeight > bodyHeight - this.clientHeight / 2) {
        this.page += 1;
        this.getListData();
    }
};

/**
 * 改变状态
 * @param {$} el
 * @param status
 * @param force
 */
invsendBonusDetailObj.changeStatus = function (el, status, force) {
    this.curTab = el; // 当前选择的标签

    if (el.hasClass('on') && !force) return;

    el.parent().find('li').removeClass('on');
    el.addClass('on');

    // 清空内容，重新请求数据
    status = status || '';
    this.tbodyObj.empty();
    this.page = 1;
    this.status = status;

    this.getListData(this.eid, status);
};

invsendBonusDetailObj.goBonusRecord = function () {
    if (!loginObj.isLogin) {
        userCenterObj.goLogin();
        return false;
    }

    // 恢复原来背景颜色
    document.body.style.backgroundColor = Global.bgColor ? Global.bgColor : '#f2f3f7';

    bonusRecordObj.goBack = function () {
        bonusRecordObj.destroy();
        invsendBonusDetailObj.show();
    };
    bonusRecordObj.show();
};

invsendBonusDetailObj.receive = function (eid, uid) {
    //console.log(eid, uid);
    if (eid && uid) {
        var url = ConfigObj.localSite + '?version=1&m=user.activity.inviteReceive';
        var postData = {
            event_id: eid,
            invitee_uid: uid,
            access_token: loginObj.access_token
        };
        $.post(url, postData, function (data) {
            if (data.code == '0000') {
                this.dirShow(eid, this.inviteUrl);
                $.alertMsg(data.code_str, true);
            } else {
                $.alertMsg(data.code_str);
            }
        }.bind(this), 'json');
    }
};

invsendBonusDetailObj.share = function () {
    Global.socialShare({
        'domId': 'invsendBonusDetail',
        'title': this.shareInfo.share_title,
        'content': this.shareInfo.share_text,
        'url': this.shareInfo.share_url,
        'imagePath': this.shareInfo.share_pic_url
    });
};

invsendBonusDetailObj.invite = function () {
    this.share();
};

invsendBonusDetailObj.goInvSendBonusDetail = function () {
};

invsendBonusDetailObj.getData = function (eid) {
    var postData = {
        'event_id': eid,
        'access_token': loginObj.access_token
    };

    $.post(ConfigObj.localSite + '?version=1&m=user.activity.inviteManagement', postData, function (data) {
        if (data.code == '0000') {
            if (data.data_info.share_info) this.shareInfo = data.data_info.share_info;
            this.formatPageHtml(data.data_info);
        }
    }.bind(this), 'json');
};

invsendBonusDetailObj.getListData = function (eid, status) {
    var postData = {
        'event_id': eid,
        'status': status ? status : '',
        'page': this.page,
        'pageSize': this.pageSize,
        'access_token': loginObj.access_token
    };

    var self = this;

    if (this.page > this.maxPage) return;

    $.post(ConfigObj.localSite + '?version=1&m=user.activity.getInfoByInviter', postData, function (data) {
        //console.log(this.status, data.data_info.status);
        if (data.data_info.status != this.status) return;
        if (data.code == '0000') {

            this.maxPage = Math.ceil(data.data_info.count / this.pageSize);
            if (this.maxPage == 0) this.maxPage = 1;

            self.formatIvTableHtml(status, data.data_info);

            if (this.page == this.maxPage && Number(data.data_info.count) !== 0) {
                // 已显示全部
                this.tbodyObj.append('<tr><td colspan="6"><p class="all-text gray">已显示全部</p></td></tr>');
            }
        } else {}
    }.bind(this), 'json');
};

invsendBonusDetailObj.formatPageHtml = function (data) {
    if (Number(data.betting_count) < 1) {
        $('#invsendBonusDetail_top').addClass('iv-none');
        var str = '<div class="center iv-slogan"><p class="iv-none-txt"><img src="images/activity/iv-none-txt.png"></p><p class="mb15">邀请大家一起领红包！</p><p data-t="invite"><a href="#" class="iv-btn iv-icon">立即邀请</a></p></div>';
        $('#invsendBonusDetail_bubble').html(str);
        $('#invsendBonusDetail_num').html('可领取');

    } else {
        var bettingCount = data.betting_info.count;
        var bettingData = data.betting_info.info;
        if (Number(bettingCount)) {
            $('#invsendBonusDetail_num').append('<em class="dot">' + bettingCount + '</em>');
            var pos = [[130, 100], [60, 120], [50, 20]];

            var bubbles = [];
            bettingData.forEach(function (v, i) {
                var str = '<div class="bubble-item" style="top: ' + pos[i][0] + 'px; left: ' + pos[i][1] + 'px;"><div class="bubble iv-icon"><div class="vcenter" data-t="receive" data-eid="' + v.activity_id + '" data-uid="' + v.invitee_uid + '"><span class="vcenter-child">' + v.invitee_name + '</span></div></div><span class="txt">可领取</span></div>';
                bubbles.push(str);
            });
            $('#invsendBonusDetail_bubble').html(bubbles.join(''));
        }
    }
};

invsendBonusDetailObj.formatIvTableHtml = function (status, data) {
    var statusCn = {
        betting: '可领取',
        receive: '已领取',
        expired: '已过期'
    };
    var txt = status ? statusCn[status] : '已邀请';
    this.status = status;
    $('#invsendBonusDetail_inviteNum').html(txt + data.count + '个');

    if (this.page == 1 && Number(data.count) == 0) {
        this.tbodyObj.append('<tr><td colspan="6"><p class="no-text gray">暂无记录</p></td></tr>');

        return;
    }

    var tr = [];

    data.info.forEach(function (v, i) {

        var allStatus = ['register', 'recharge', 'betting', 'receive', 'expired'];
        var statusN = allStatus.indexOf(v.status) + 1;
        var td1 = '<td>' + (i + 1) + '</td>';
        var td2 = '<td>' + v.invitee_name + '</td>';
        var td3 = '<td><em>' + (statusN > 0 ? '√' : '×') + '</em></td>';
        var td4 = '<td><em>' + (statusN > 1 ? '√' : '×') + '</em></td>';
        var td5 = '<td><em>' + (statusN > 2 ? '√' : '×') + '</em></td>';
        var td6 = '<td><em>×</em></td>';

        if (statusN == 3) td6 = '<td data-t="receive" data-eid="' + v.activity_id + '" data-uid="' + v.invitee_uid + '"><em><span>可领</span><span class="font10 gray">30日内有效</span> <i class="iv-hand iv-icon"></i></em></td>';
        else if (statusN == 4) td6 = '<td><em>√</em></td>';
        else if (statusN == 5) td6 = '<td><em><span class="gray">过期</span></em></td>';

        tr.push('<tr>' + td1 + td2 + td3 + td4 + td5 + td6 + '</tr>');
    });

    if (data.page == 1) this.tbodyObj.html(tr.join(''));
    else this.tbodyObj.append(tr.join(''));
};

invsendBonusDetailObj.onloadExecution = function () {
    this.createDomObj();
    this.createEvent();
};

invsendBonusDetailObj.init = function () {
    this.onloadExecution();
};

invsendBonusDetailObj.setConfigData = function (obj) {
    this.eid = obj.eid ? obj.eid : ''; // 活动 id
    this.inviteUrl = obj.inviteUrl;
    this.status = obj.status ? obj.status : '';
    this.curTab = '';
    this.checkPage = true;
    this.clientHeight = document.documentElement.clientHeight;
    this.page = 1;
    this.pageSize = 20;
    this.maxPage = 1;
};

invsendBonusDetailObj.dirShow = function (eid, inviteUrl, inviteIamgeUrl, status) {
    this.setConfigData({eid: eid, inviteUrl: inviteUrl, inviteIamgeUrl: inviteIamgeUrl, status: status});
    this.getData(eid);
    this.changeStatus($('#invsendBonusDetail_statusA'));
};