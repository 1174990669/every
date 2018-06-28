var sweepObj = new PageController({
    'name': 'sweep',
    'tpl': 'template/set/sweep.html'
});

sweepObj.createDom = function () {
    this.wrapObj = $('#sweep_wrapperObj');
    this.shareQrcodeObj = $('#sweep_shareqrcode');
};

sweepObj.createEvent = function () {
    this.wrapObj.tap(function (e) {
        var pObj = $.oto_checkEvent(e, 'P');
        if (pObj) {
            pObj = $(pObj);
            var t = pObj.attr('data-t');
            switch (t) {
                case 'back': sweepObj.goBack(); return true;
            }
        }

        var divObj = $.oto_checkEvent(e, 'DIV');
        if (divObj) {
            divObj = $(divObj);
            var t = divObj.attr('data-t');
            switch (t) {
                case 'cancelSave': sweepObj.shareQrcodeObj.hide(); break;
                case 'savePic': sweepObj.shareQrcodeObj.hide(); setTimeout(function () {sweepObj.savePic();}, 500); break;
                case 'sharePic': sweepObj.shareQrcodeObj.hide(); setTimeout(function () {sweepObj.sharePic()}, 500); break;
            }
        }
    });

    // 长按二维码
    var imgElem = document.getElementById('sweep_qrcode');
    imgElem.addEventListener('touchstart', sweepObj.touchQrIamge, false);
    imgElem.addEventListener('touchmove', sweepObj.touchQrIamge, false);
    imgElem.addEventListener('touchend', sweepObj.touchQrIamge, false);
};

sweepObj.touchQrIamge = function (e) {
    e = e || window.event;
    switch (e.type) {
        case "touchstart":
            sweepObj.touchQrIamgeTimeOut = setTimeout(function () {
                sweepObj.shareQrcodeObj.show();
            }, 800);
            break;
        case "touchend":
            clearTimeout(sweepObj.touchQrIamgeTimeOut);
            break;
        case "touchmove":
            clearTimeout(sweepObj.touchQrIamgeTimeOut);
            break;
    }
};

sweepObj.savePic = function () {
    var filename = 'aishi_' + Global.formatDate('yyyyMMdd_hhmmss') + '.jpg';
    if (ConfigObj.platForm === 'android' && typeof android_obj !== 'undefined') {
        android_obj.saveScreenShot(filename);
    } else if (ConfigObj.platForm === 'ios' && typeof ios_obj !== 'undefined') {
        ios_obj.saveScreenShot(filename);
    }
};

sweepObj.sharePic = function () {
    var obj = {
        domId: 'stationCode',
        sharefn: function (platform) {
            if (ConfigObj.platForm === 'android' && typeof android_obj !== 'undefined') {
                if (platform == 4) android_obj.shareContent(4, '客服二维码', '扫描二维码绑定专属客服', sweepObj.image, sweepObj.image, 'sweep');
                else setTimeout(function () {android_obj.shareScreenShot(platform, 'stationCode');}, 500);
            } else if (ConfigObj.platForm === 'ios' && typeof ios_obj !== 'undefined') {
                //if (sweepObj.stationId) ios_obj.shareContent('客服二维码', '扫描二维码绑定专属客服', shareUrl, imgUrl, 'sweep');
                //else setTimeout(function () {ios_obj.shareScreenShot(platform, 'stationCode');}, 500);
                setTimeout(function () {ios_obj.shareScreenShot(platform, 'stationCode');}, 500);
            }
        }
    };
    Global.socialShare2(obj);
};

sweepObj.onloadExecution = function () {
    this.createDom();
    this.createEvent();
};

sweepObj.init = function () {
    sweepObj.onloadExecution();
};

sweepObj.setDefConfig = function () {
    sweepObj.touchQrIamgeTimeOut = undefined;
};

sweepObj.setData = function (obj) {
    sweepObj.stationId = obj.stationId;
    sweepObj.image = obj.image;
    $('#sweep_qrcode').attr('src', obj.image);
};