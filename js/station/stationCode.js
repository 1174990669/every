var stationCodeObj = new PageController({
    'name': 'stationCode',
    'tpl': 'template/station/stationCode.html'
});

stationCodeObj.createDom = function () {
    this.backObj = $('#stationCode_backbtn');
};

stationCodeObj.createEvent = function () {
    this.backObj.tap(function () {
        stationCodeObj.goBack();
    });

    $('#stationCode_share').tap(function () {
        Global.socialShare({'domId': 'stationCode'});
    });
};

stationCodeObj.onloadExecution = function () {
    this.createDom();
    this.createEvent();
};

stationCodeObj.init = function () {
    stationCodeObj.onloadExecution();
};

stationCodeObj.setData = function (obj) {
    $('#stationCode_img').attr('src', obj.image);
};