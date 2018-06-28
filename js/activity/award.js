var awardObj = new PageController({
    'name': 'award'
});

/**
 * 显示页面，这个页面的内容和其中执行的脚本都是动态获取的
 */
awardObj.show = function (reload) {
    // 解决快速点击 页面乱加载 bug
    if (!this.showFlag) return;
    this.showFlag = false;

    var self = this;

    var activePage = Global.getActivePage();
    var pageDom = $('#' + self.name);
    if (pageDom.length === 0 || reload) {
        // 页面尚不存在
        if (self.url) {
            $.post(self.url, function (resa) {
                if (pageDom.length > 0) pageDom.remove();

                var tplHtml = '<div class="page" style="display:none" id="' + self.name + '">' + resa + '</div>';
                $(document.body).append(tplHtml);
                Global.pageSwitch($('#' + self.name), $(activePage));
                self.showFlag = true;

                if (self.jsurl) {
                    $.post(self.jsurl, function (resb) {
                        var script = document.createElement('script');
                        script.text = resb;
                        script.setAttribute('type', 'text/javascript');
                        document.body.appendChild(script);
                    }, 'text');
                }
            }, 'text');
        }
    } else {
        Global.pageSwitch($('#' + self.name), $(activePage));
        self.showFlag = true;
    }

    Global.pv('award', {});
};

awardObj.dirShow = function (obj) {
    for (var p in obj) {
        if (obj.hasOwnProperty(p))
            this[p] = obj[p];
    }
    awardObj.show(true);
};
