var kaijiangIndexObj = new PageController({
    'name': 'kaijiangIndex',
    'tpl': 'template/kaijiang/kaijiangIndex.html',
    'pullDistance': 220
});

kaijiangIndexObj.setDefConfig = function () {
    this.allLotteryType = ['ssq', 'dlt', 'jxk3','gxk3','gx11x5','hub11x5','jx11x5','ftspf', 'spf14', 'd3', 'pl3', 'pl5']; // 开奖首页所有彩种，按显示顺序
};

kaijiangIndexObj.createDomObj = function () {
    this.kaijiangIndexList = $('#kaijiangIndex_list');
};
 
kaijiangIndexObj.createEvent = function () {
    this.kaijiangIndexList.on('tap', '.kjli>a', function (e) {
        var aObj = $.oto_checkEvent(e, 'A');
        if (aObj) {
            aObj = $(aObj);
            var t = aObj.attr('data-t');
            var c = aObj.attr('data-c'); // 彩种名
            switch (t) {
                case 'goDetail': kaijiangIndexObj.goDetail(c); break;
            }
        }
    });

    $('#kaijiangIndex_showSet').tap(function () {
        if (loginObj.isLogin) {
            prizeNotifyObj.goBack = function () {
                prizeNotifyObj.destroy();
                kaijiangIndexObj.show();
            };
            prizeNotifyObj.show('reload', function () {
                prizeNotifyObj.getData();
            });
        } else {
            Global.msg('请登录后开启');
        }
    });
};

/**
 * 加载开奖详情页
 * @param c 彩种名
 */
kaijiangIndexObj.goDetail = function (c) {
    numKaijiangObj.goBack = function () {
        numKaijiangObj.destroy();
        kaijiangIndexObj.show();
    };

    numKaijiangObj.show('reload', null, c);

    Global.pv('kaijiang', {lotteryType: c});
};

kaijiangIndexObj.getData = function () {
    $.post(ConfigObj.localSite + '?version=1&m=lottery.prize.getInfo', function (data) {
        
        if (data.code != '0000') return false;
        data.info = $.parseJSON(Global.crypt(data.info));
//      console.log('开奖首页信息', data);
        kaijiangIndexObj.formatHtml(data.info.res_info);
    }, 'json');
};

kaijiangIndexObj.formatHtml = function (data) {
// console.log(data)
    var html = {};
    for (var k in data) {
        if (!data.hasOwnProperty(k)) continue;
        if (this.allLotteryType.indexOf(k) == -1) continue;

        var lotteryCn = data[k]['lottery_cn'];
        var lotteryNo = data[k]['lottery_no'];
        var lotteryTime = data[k]['time'] ? data[k]['time'] : data[k]['lottery_no'] + '' + data[k]['week'];
        var lotteryItem = data[k];
        var lotteryResult = data[k]['bet_result_arr'];

        var headStr = '<p class="new-kjtit mb15 clearfix">\
                           <span class="fl">' + lotteryCn + '</span>\
                           <span class="fl gray font12 center">第' + lotteryNo + '期</span>\
                           <span class="fr gray font12 right">' + lotteryTime + '</span>\
                       </p>';
        var contentStr = '';
        var linkStr = '<a data-t="goDetail" data-c="' + k + '"><span style="width:100%;" class="arrowbox"><em style="float:right;padding-right:6px;" class="rtarrow icon"></em></span></a>';
// console.log(headStr)
        if (k == 'spf14') {

            var ballStr = '';
            lotteryResult['red_ball'].forEach(function (ball) {
                ballStr += '<span class="block">' + ball + '</span>';
            });
            contentStr = '<div class="clearfix wid1">' + ballStr + '</div>'
            // console.log(contentStr)
        } else if (k == 'ftspf') {

            contentStr = '<div class="result_li clearfix">\
                              <p class="font12 gray">\
                                  <span>' + lotteryItem['leagueName'] + '</span>\
                                  <span> ' + lotteryItem['sno'] + ' ' + lotteryItem['betEndTime'] + '</span>\
                              </p>\
                              <p>' + lotteryItem['host_name_q'] + '</p>\
                              <p>\
                                  <sapn class="fontred">' + lotteryItem['scoreResult'] + '</sapn>\
                                  <span class="font12 gray">' + (lotteryItem['bqcResult'] ? '半全场：' + lotteryItem['bqcResult'] : '') + '</span>\
                              </p>\
                              <p>' + lotteryItem['guest_name_q'] + '</p>\
                          </div>';

            headStr = headStr.replace('第' + lotteryNo + '期', '主队VS客队');
        } else {
            var redBall = lotteryResult['red_ball'], blueBall = lotteryResult['blue_ball'];
            var redBallStr = '', blueBallStr = '';

            if (redBall) {
                redBall.forEach(function (ball) {
                    redBallStr += '<span class="ball redball">' + ball + '</span>';
                });
            }

            if (blueBall) {
                blueBall.forEach(function (ball) {
                    blueBallStr += '<span class="ball blueball">' + ball + '</span>';
                });
            }

            if (k == 'd3') {
                var sumStr = lotteryItem['bet_result_sum'] ? '<p class="w25">和值' + lotteryItem['bet_result_sum'] + '</p>' : '';
                var descStr = lotteryItem['bet_result_sum'] ? '<p class="w25">' + lotteryItem['bet_result_desc'] + '</p>' : '';
            } else {
                var sumStr = lotteryItem['bet_result_sum'] ? '<p class="w25">和值' + lotteryItem['bet_result_sum'] + '</p>' : '';
                var descStr = lotteryItem['bet_result_sum'] ? '<p class="w25">和值' + lotteryItem['bet_result_desc'] + '</p>' : '';
            }

            contentStr = '<div class="clearfix pl3">'
                + (lotteryItem['bet_result_sum'] ? '<p class="clearfix w50">' : '<p class="clearfix">')
                + redBallStr + blueBallStr + sumStr + descStr + '</p></div>'
        }

        html[k] = '<div class="kjli">' + headStr + contentStr + linkStr + '</div>';
        // console.log(html[k])
    }

    // 按序排列
    var htmlStr = '';
    this.allLotteryType.forEach(function (v) {
        htmlStr += html[v] ? html[v] : '';
    });

    this.kaijiangIndexList.html(htmlStr);
}.bind(kaijiangIndexObj);

kaijiangIndexObj.onloadExecution = function () {
    this.setDefConfig();
    this.createDomObj();
    this.createEvent();
    this.getData();
};


kaijiangIndexObj.init = function () {
    this.setDefConfig();
    this.onloadExecution();
};
