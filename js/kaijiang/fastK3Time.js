var fastK3TimeObj = new Object();

fastK3TimeObj.setDefConfig = function () {
    fastK3TimeObj.lotteryNo = "";

    fastK3TimeObj.nowTime = new Date().getTime();
    fastK3TimeObj.syTime = 0;
    fastK3TimeObj.fastK3TimeObjCG = 3000; // 获取上一期走势数据延迟
    fastK3TimeObj.fastK3TimeObjCGInterval = 3000; // 获取上一期走势数据定时间隔
    fastK3TimeObj.fastK3TimeObjNoInterval = 3000; // 获取最新期号间隔
    fastK3TimeObj.correctInterval = 10000; // 校正本地时间间隔
    fastK3TimeObj.errorTime = 100000;

    fastK3TimeObj.nowTimeObj = "";
    fastK3TimeObj.getTimeObj = "";

    clearTimeout(fastK3TimeObj.getCGObj);
    clearInterval(fastK3TimeObj.syTimeObj);
    clearInterval(fastK3TimeObj.correctTimeInterval);
    fastK3TimeObj.syTimeObj = "";
    fastK3TimeObj.getCGObj = "";
    fastK3TimeObj.correctTimeInterval = '';

    fastK3TimeObj.getCGInvoked = false;
    fastK3TimeObj.getCGInvokedTimes = 0;

    fastK3TimeObj.stop = false;

    window.fastK3TimeObjMyScroll = "";
    fastK3TimeObj.lotteryNoChangeRec = {};
};

fastK3TimeObj.createDom = function () {
    this.qhObj = $("#qhObj");
    this.subObj = $("#subObj");
}

fastK3TimeObj.getClientTime = function () {
    return new date().getTime();
}

fastK3TimeObj.setLotteryNoTipsHtml = function () {
    var html = '正在获取新的期号';
    this.qhObj.html(html);
}

fastK3TimeObj.getLotteryData = function (tips) {
	////console.log(tips);
    $.ajax({
        url: ConfigObj.localSite + ConfigObj.fastK3Api[ConfigObj.fastK3Type].scheme,
        data: "",
        type: "post",
        dataType: "json",
        success: function (msg) {
//			//console.log(msg);
			
            if (msg.code !== '0000') {
            	//console.log("222");
                $.alertMsg(msg.msg || msg.code_str);
                fastK3TimeObj.getTimeObj = setTimeout(function () {
                    fastK3TimeObj.getLotteryData();
                }, fastK3TimeObj.fastK3TimeObjNoInterval);
                return false;
            }
				msg.info = $.parseJSON(Global.crypt(msg.info));
            var retStop = msg.info.data.stop;
            var retLotteryNo = msg.info.data.lotteryNo;
            var retData = msg.info.data;

            if (retStop === 'Y') {
                fastK3TimeObj.stop = true;
                fastK3TimeObj.qhObj.html("每天09:00-23:00销售");
                fastK3TimeObj.setData(retData);
                fastK3TimeObj.resetSetTime();
                fastK3TimeObj.subObj.attr("data-stop", "1");
                return false;
            } else {
                fastK3TimeObj.subObj.removeAttr('data-stop');
                fastK3TimeObj.stop = false;
            }
            if (fastK3TimeObj.getTimeObj) {
                clearTimeout(fastK3TimeObj.getTimeObj);
                fastK3TimeObj.getTimeObj = "";
            }
            if (!tips && retLotteryNo !== fastK3TimeObj.lotteryNo) {
                // 只能在当前页弹出
                var apage = Global.getActivePage();
                if (!apage.length) return;
                if (apage[0].id != 'fastK3Trend') return;
                $.alertMsg("当前期已经结束，自动切换到可购买期");
            }

            var postData = fastK3TrendObj.getPostData();

//          //console.log('getLotteryData postData: ' + JSON.stringify(postData));

            var r1 = fastK3TrendObj.lotteryNoResult[retData.preLotteryNo + postData.trendName + postData.trendType];
            var r2 = fastK3TimeObj.lotteryNoChangeRec[retData.preLotteryNo + postData.trendName + postData.trendType];

            if (!r1 && !r2) {
                // 期号改变
                fastK3TimeObj.setData(retData);
                fastK3TimeObj.resetSetTime();
                fastK3TrendObj.lotteryNoChange(retData);
                fastK3TimeObj.lotteryNoChangeRec[retData.preLotteryNo + postData.trendName + postData.trendType] = true; // 记录已经改变过的期号
            } else {
                fastK3TimeObj.setData(retData);
                fastK3TimeObj.resetSetTime();
            }

            // if (fastK3TrendObj.lotteryNoChange && fastK3TimeObj.lotteryNo !== '' && retLotteryNo !== fastK3TimeObj.lotteryNo) {
            //     // 期号改变
            //     fastK3TimeObj.setData(retData);
            //     fastK3TimeObj.resetSetTime();
            //     fastK3TrendObj.lotteryNoChange(retData);
            // } else {
            //     fastK3TimeObj.setData(retData);
            //     fastK3TimeObj.resetSetTime();
            // }
        }
    });
}

fastK3TimeObj.getCG = function (time, type) {
    fastK3TimeObj.getCGInvokedTimes++;
    fastK3TimeObj.fastK3TimeObjCGInterval += 1000;
    if (fastK3TimeObj.getCGInvokedTimes > 100) return;
    time = time ? time : this.fastK3TimeObjCG;
    fastK3TimeObj.getCGObj = setTimeout(function () {
        var lotteryData = fastK3TrendObj.getPostData();

        var dataObj = {
            lottery_type: lotteryData.lottery_type,
            trendType: lotteryData.trendType,
            trendName: lotteryData.trendName,
            num: lotteryData.num
        };

        if (type && type === 'append') dataObj.lotteryNoVal = fastK3TimeObj.preLotteryNo;

        if (fastK3TrendObj.lotteryNoResult[fastK3TimeObj.preLotteryNo + lotteryData.trendName + lotteryData.trendType]) return false; // 前一期已有数据，返回

//      //console.log('getCG fastK3TimeObj.syTime: ' + fastK3TimeObj.syTime + ' postData: ' + JSON.stringify(dataObj));
		
		var secretData = {
			'para' : Global.encrypt(dataObj)
		};
		
       Global.post(ConfigObj.fastK3Api[ConfigObj.fastK3Type].chart, secretData, function (data) {
       		
       		
           if (data.trendType !== lotteryData.trendType) return false;
           if (data.code !== '0000') {
               $.alertMsg(data.code_str);
               fastK3TimeObj.getCG(fastK3TimeObj.fastK3TimeObjCGInterval, type);
               return false;
           }
					 data.info = $.parseJSON(Global.crypt(data.info));
           if (!data.info || !data.info.list || !data.info.list.length) {
               fastK3TimeObj.getCG(fastK3TimeObj.fastK3TimeObjCGInterval, type);
               return false;
           }

           if (fastK3TimeObj.getCGObj) {
               clearTimeout(fastK3TimeObj.getCGObj);
               fastK3TimeObj.getCGObj = '';
               fastK3TimeObj.fastK3TimeObjCGInterval = 3000;
           }

           fastK3TrendObj.createNewCG(data.info);
           fastK3TrendObj.lotteryNoResult[fastK3TimeObj.preLotteryNo + lotteryData.trendName + lotteryData.trendType] = true;


           return true;
       }, function () {});
    }, time);
}

fastK3TimeObj.setData = function (data) {
    this.nowTime = data.nowTime;
    this.syTime = data.syTime;
    this.lotteryNo = data.lotteryNo;
    this.preLotteryNo = data.preLotteryNo; // 上一期期号
}

fastK3TimeObj.resetSetTime = function () {
    if (this.nowTimeObj) clearTimeout(this.nowTimeObj);
    if (this.syTimeObj) clearTimeout(this.syTimeObj);
    fastK3TimeObj.getCGInvoked = false;
    fastK3TimeObj.getCGInvokedTimes = 0;
    this.nowTimeObj = "";
    this.syTimeObj = "";
    this.updateNowTime();
    this.setSytimeDom();
}

fastK3TimeObj.updateNowTime = function () {
    this.nowTimeObj = setInterval(function () {
        fastK3TimeObj.nowTime += 1000;
    }, 5000);
}

fastK3TimeObj.correctTime = function () {

    fastK3TimeObj.correctTimeInterval = setInterval(function () {
        // TODO 不能使用本地时间
        // var nowTime = new Date().getTime();
        // if (!fastK3TimeObj.syTime) return false;
        // if (Math.abs(nowTime - fastK3TimeObj.nowTime) > fastK3TimeObj.errorTime) {
            // fastK3TimeObj.getLotteryData();
        // }
        fastK3TimeObj.getLotteryData();
    }, 5000);
}

fastK3TimeObj.setSytimeDom = function () {
    var thisSyTime = this.syTime;
    this.syTimeObj = setInterval(function () {
        if (thisSyTime == 0) {
            if (fastK3TimeObj.syTimeObj) clearTimeout(fastK3TimeObj.syTimeObj);
            fastK3TimeObj.syTimeObj = "";
            fastK3TimeObj.setLotteryNoTipsHtml();
            fastK3TimeObj.getLotteryData();
            return false;
        }

        // 获取上一期的走势数据
        if (thisSyTime < 600 && !fastK3TimeObj.getCGInvoked) {
            fastK3TimeObj.getCG(fastK3TimeObj.fastK3TimeObjCG, 'append');
            fastK3TimeObj.getCGInvoked = true;
        }

        if (!fastK3TimeObj.stop) {
            var miao = thisSyTime % 60;
            var fen = ((thisSyTime - miao) / 60) % 60;
            var shi = (thisSyTime - miao - fen * 60) / 3600;
            miao = miao < 10 ? "0" + miao : miao;
            fen = fen < 10 ? "0" + fen : fen;
            shi = shi < 10 ? "0" + shi : shi;

            if (Number(shi) > 0) {
                var html = fastK3TimeObj.lotteryNo.slice(-3) + '期离截止<span class="fontred">' + shi + ":" + fen + ':' + miao + '</span>';
            } else {
                var html = fastK3TimeObj.lotteryNo.slice(-3) + '期离截止<span class="fontred">' + fen + ':' + miao + '</span>';
            }
            fastK3TimeObj.qhObj.html(html);
        }
        thisSyTime--;
    }, 1000);
}

fastK3TimeObj.init = function () {
    this.setDefConfig();
    this.createDom();
    this.updateNowTime();
    this.correctTime();
    this.setLotteryNoTipsHtml();
    this.getLotteryData(true);
};