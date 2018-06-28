var verifyInfoObj = new PageController({
    'name': 'verifyInfo',
    'tpl': 'template/user/verifyInfo.html'
});

verifyInfoObj.createDomObj = function () {
    this.backObj = $('#verifyInfo_backbtn');

    $('#verifyInfo_realName').html(loginObj.userInfo.real_name);

    // 证件号码显示前后 2 位，中间用 *
    var cardNo = loginObj.userInfo.passport || loginObj.userInfo.idcard;

    if (loginObj.userInfo.real_type == 'passport') {
        // 前2后3
        cardNo = cardNo.substr(0, 2) + '*'.repeat(cardNo.length - 5) + cardNo.substr(cardNo.length - 3, 3);
        $('#verifyInfo_realType').html('护照');
        $('#verifyInfo_cardNo').html(cardNo);
    } else{
        // 前3后4
        cardNo = cardNo.substr(0, 3) + '*'.repeat(cardNo.length - 7) + cardNo.substr(cardNo.length - 4, 4);
        $('#verifyInfo_realType').html('身份证');
        $('#verifyInfo_cardNo').html(cardNo);
    }

}

verifyInfoObj.createEvent = function () {
    this.backObj.unbind('tap').tap(function () {
        verifyInfoObj.goBack();
    })
}


verifyInfoObj.onloadExecution = function () {
    this.createDomObj();
    this.createEvent();
}

verifyInfoObj.init = function () {
    verifyInfoObj.onloadExecution();
}
	