if (ConfigObj) {
    ConfigObj.local = false;

    ConfigObj.appName = 'wangwangzhongcai';
    ConfigObj.appEnname = '';
    ConfigObj.version = '';	//内核版本（HTML、JS）
    ConfigObj.umengChannel = '';		//从app获取
    ConfigObj.appVersionCode = '';	//app的版本代码( ios ?)
    ConfigObj.appVersionName = '';	//app的版本名称( ios ?)
	ConfigObj.stationId='';			//从app获取
    ConfigObj.tel = "13318747935";
	// ConfigObj.tel = "13318747935";
	ConfigObj.a1 = "";
	ConfigObj.a2 = "";
	ConfigObj.display = true;
	ConfigObj.last_time = 3; //登录错误次数
        //ConfigObj.platForm

    // 正式环境接口
    ConfigObj.zdid = '1B5D8A-D5C9-90298B'; //测试 ConfigObj.umengChannel
    // ConfigObj.zdid = 'FCC476-D0C2-DCE8AF'; //
    // ConfigObj.zdid = ''; //酷派
    // ConfigObj.zdid = '10D4E6-A17E-97D364';  //资讯版本
    // ConfigObj.zdid = '0F267B-2DF3-D646F5';
    // console.log(ConfigObj.zdid)
    ConfigObj.appkey = '854984B0-0879-BE9C-9124-81D243C673EB'; //旺旺中彩
    // ConfigObj.appkey = '87FA6A75-D68B-1A36-FF72-6E2EF0179960'; //豪中彩
    // ConfigObj.appkey = 'B6017483-9096-6D4B-D1F7-0E62E6A07650'; //土豪彩


    // ConfigObj.localSite = 'http://cptest.xxyya.cn:9527/api';  //测试环境
    ConfigObj.localSite = 'https://a.xxyya.cn/api';
    // ConfigObj.localSite = 'http://a.xxyya.cn:8269/api';
    // ConfigObj.localSite = 'http://caipiao.91zibo.com/';
    // ConfigObj.localSite = 'https://cpo.weiweigogo.cn/api';
    // ConfigObj.localSite = 'http://lucky.jjda.pub:8269/api';  //
    /*var secretData = {
          'type' : 2
        };
        $.ajax({
          url : 'http://lucky.jjda.pub:8269/api?version=1&m=cashier.excep.color_type',
          data : secretData,
          type : "post",
          dataType : "json",
          async:false,
          success:function(obj){
            // console.log(43)
            ConfigObj.localSite = 'http://lucky.jjda.pub:8269/api';
            // ConfigObj.localSite = '';
          },
          error:function(ob){
            // console.log(48)
            // ConfigObj.localSite = 'http://lucky.jjda.pub:8269/api';
            ConfigObj.localSite = 'http://cpo.weiweigogo.cn:8269/api';
          }
        });*/
        
    // ConfigObj.localSite = 'http://a.xxyya.cn:8269/api';
    // ConfigObj.localSite = 'http://cp.aisili.cc:8269/api';

    ConfigObj.ht=function(){
        ConfigObj.localSite =ConfigObj.localSite
        // console.log(ConfigObj.localSite)
    }
    // cp.aisili.cc    cpo.weiweigogo.cn
    // console.log(ConfigObj.localSite)
    // ConfigObj.touchWebSite = 'http://caipiao.91zibo.com/';
    ConfigObj.appDLUrl = 'http://outershare.huohuotuan.cn'; // 下载页
	// 测试环境接口
//	ConfigObj.zdid = '6EEE91-9860-98F347';
//	ConfigObj.appkey = 'EF0D1335-20C7-1993-F970-A69DEE4A253F';
//  ConfigObj.localSite = 'http://a.91zbl.cn:8080/api';
//	ConfigObj.touchWebSite = 'http://caipiao.91zbl.cn:8080/';
//  ConfigObj.appDLUrl = 'http://caipiao.91zbl.cn:8080/System/DownLoad/page?sharefrom=app'; // 下载页

    if (ConfigObj.local) ConfigObj.localSite = 'p.js';

    ConfigObj.fastLotType = 'gd11x5';
    ConfigObj.fastLotApi = {
        'tjsyy': {
            scheme: '?version=1&m=lottery.Tjsyy.index',
            chart: '?version=1&m=Lottery.Tjsyy.getChartData'
        },
        'gd11x5': {
            scheme: '?version=1&m=lottery.Gd11x5.index',
            chart: '?version=1&m=Lottery.Gd11x5.getChartData'
        },
        'sd11x5': {
            scheme: '?version=1&m=lottery.sd11x5.index',
            chart: '?version=1&m=Lottery.sd11x5.getChartData'
        },        
        'xj11x5': {
            scheme: '?version=1&m=lottery.xj11x5.index',
            chart: '?version=1&m=Lottery.xj11x5.getChartData'
        },
        'gx11x5': {
            scheme: '?version=1&m=lottery.gx11x5.index',
            chart: '?version=1&m=Lottery.gx11x5.getChartData'
        },
        'hub11x5': {
            scheme: '?version=1&m=lottery.Hub11x5.index',
            chart: '?version=1&m=Lottery.Hub11x5.getChartData'
        },
        'jx11x5': {
            scheme: '?version=1&m=lottery.jx11x5.index',
            chart: '?version=1&m=Lottery.jx11x5.getChartData'
        }
    };

    // ConfigObj.fastK3Type = 'gxk3';
    ConfigObj.fastK3Type = 'jxk3';
    ConfigObj.fastK3Api = {
        'jxk3':{
            scheme:'?version=1&m=lottery.jxk3.index',
            chart:'?version=1&m=Lottery.jxk3.getChartData'
        },
        'gxk3': {
            scheme: '?version=1&m=lottery.gxk3.index',
            chart: '?version=1&m=Lottery.gxk3.getChartData'
        },
        'jlk3':{
        	scheme:'?version=1&m=lottery.jlk3.index',
        	chart:'?version=1&m=Lottery.jlk3.getChartData'
        }
    };

    ConfigObj.syx5Type = ['gd11x5', 'xj11x5', 'sd11x5', 'gx11x5','jx11x5','hub11x5']; // 各省 11选5
    
    
    if (ConfigObj.platForm === 'android' && typeof android_obj !== 'undefined') {
        ConfigObj.umengChannel = android_obj.getUmengChannel();	//友盟ID
        ConfigObj.version = android_obj.getAppVersionName(); // 安卓应用管理上显示的版本
        ConfigObj.stationId = android_obj.getStationId();
        ConfigObj.zdid = android_obj.getStationId();
    } else if (ConfigObj.platForm === 'ios' && typeof ios_obj !== 'undefined') {
        ios_obj.upLoadUMengChanelIdForLottery();  //友盟ID
        ConfigObj.zdid = '';    //ios渠道号
    }   
}
