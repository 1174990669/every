
    var dltnewBounObj = new PageController({
       'name': 'dltnewBoun',
       'tpl' : 'template/activity/dltnewBoun.html'
    }); 

    dltnewBounObj.createDomObj = function () {
        // this.backBtn = $('#regnewBonus_backbtn'); 
        this.backBtn = $('#dltBonus_backbtn'); //返回 regnewBonus_backbtn
        this.shareObj = $('#regsendBlt_shareObj'); //分享 
    }

    dltnewBounObj.createEvent = function(){
        dl = '1';
        //regnewBonus_act  user.activity.activityInfo   
        $('#regnewBonus_act').unbind('tap').tap(function(e){
            // console.log(e)
            dltnewBounObj.getReg();
        })
        
        $('#p_click').tap(function () { //投注
            // homeObj.gotoDltBet();
            dltObj.goBack=function(){
                dltnewBounObj.show()
            }
            dltObj.show()
            
        })
        /*$('#regnewBonus_backbtn').tap(function () {
            dltnewBounObj.goBack();
        })*/

    dltnewBounObj.goBack = function() {
        dltnewBounObj.destroy();
        homeObj.show();
    }

        $('#dltBonus_backbtn').tap(function () {
            // dltnewBounObj.destroy();
            dltnewBounObj.goBack();
        })
    
        $('#regsendBlt_shareObj').tap( function () {
            // dltnewBounObj.destroy();
            dltnewBounObj.share();
        });
    }
    
    dltnewBounObj.share = function () {
        Global.socialShare({
            'domId': 'dltnewBoun',
            'title': '新人礼688元红包免费领',
            'content': '上旺旺中彩，领新人红包，中百万大奖，享美好人生',
            'url': "",
            'imagePath': ""
        });
    };
    
    dltnewBounObj.getReg = function(){
        if (!loginObj.isLogin) {
            // console.log(40)
            // 用户未登录，先跳到注册页面
            // $.alertMsg('请注册后领取红包');
            setTimeout(function(){
                loginObj.goBack = function () {
                    dltnewBounObj.show();//更改后注册返回到领取页面
                    // userCenterObj.show(); //更改前注册返回到首页
                };
                // registerObj.show();
                loginObj.show();
            },300);
            return;
        }
    //  //console.log(loginObj.userInfo.mobile)
        if(loginObj.userInfo.mobile == ""){
            // $.alertMsg('请绑定手机后领取红包');
            setTimeout(function(){
                bindPhoneObj.goBack = function () {
                    userCenterObj.show();
                };
                bindPhoneObj.show();
            },2000)
            return;
        }
        
        var postData = {
            'access_token': loginObj.access_token
        };
        $.ajax({
        url: ConfigObj.localSite + '?version=1&m=user.activity.activityInfo',
        data: postData,
        type: "post",
        dataType: "json",
        success: function (data) {
                // regsendBonusObj.getSucc();
                $.alertMsg(data.code_str, true);
                setTimeout(function () {
                   Global.GC();
                   homeObj.show();
                }, 2000);
               
            
        }
    });
    }


    dltnewBounObj.onloadExecution = function(){
        this.createEvent();
        this.createDomObj();
    }

    dltnewBounObj.init = function(){
        dltnewBounObj.onloadExecution();
    }
    
  

