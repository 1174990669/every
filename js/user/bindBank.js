
	var bindBankObj = new PageController({
	   'name': 'bindBank',
	   'tpl' : 'template/user/bindBank.html'
    });
//bindBank_bankiphoneObj //bindBank_bankCardPwdObj
	bindBankObj.createDomObj = function(){
		this.bankLIistObj = $("#bindBank_bankLIistObj");
		this.bankAddressObj = $("#bindBank_bankAddressObj");
		this.bankCardNumObj = $("#bindBank_bankCardNumObj");
		this.bankCardPwdObj = $("#bindBank_bankCardPwdObj");
		this.bankCariphoneObj = $("#bindBank_bankiphoneObj"); //手机号码 
		this.bankccObj = $("#bindBank_ssObj"); //姓名 
		this.submitObj = $("#bindBank_submitObj");
		this.backObj = $("#bindBank_backObj");
		this.shwoBankListObj = $("#bindBank_shwoBankListObj");
		this.cardWrap = $('#bindBank_cardWrap');
		this.cityPickerCtrl = $('#cityPickerCtrl');

		$('#bindBank_cz').tap(function(){
	        setTimeout(function(){
	            modifyPwdObj.goBack = function () {
	                bindBankObj.show();
	                // userInfoObj.show();//更改后注册返回到领取页面 
	                // userCenterObj.show(); //更改前注册返回到首页
	            };
	            modifyPwdObj.show();
	            // withdrawSelectObj.show();
	        },300);
	    })
	}

	bindBankObj.createEvent = function(){
		var self = this;
		this.bankAddressObj.add(this.bankCardNumObj).add(this.bankCardPwdObj).unbind('focus').focus(function(){
			$(this).parent().addClass('focus');
		});
		this.bankAddressObj.add(this.bankCardNumObj).add(this.bankCardPwdObj).unbind('blur').blur(function(){
			$(this).parent().removeClass('focus');
		});

		this.submitObj.unbind('tap').tap(function(){
			bindBankObj.submitData();
		});

		this.backObj.unbind('tap').tap(function(){
			bindBankObj.goBack();
		});

		//shwo触发li
		this.shwoBankListObj.unbind('tap').tap(function(){
			//解决tap点击穿透问题--1.发卡银行浮层页面无法停留；2.密码框焦点问题;3.键盘不回弹问题
			setTimeout(function(){
				//display设置为bottom 需要输入框为焦点状态
				bindBankObj.bankLIistObj.focus();
				bindBankObj.bankLIistObj.attr('autofocus','autofocus');
//				bindBankObj.bankLIistObj.mobiscroll('show');
			},320)
			
		});
		
		this.bankCardNumObj.unbind('keyup').keyup(function(){
			var thisV = this.value.replace(/\s/g,"");
			if(isNaN(thisV)){
				thisV = thisV.replace(/[^0-9]*/g,"");
			}
			if(thisV.length>19){
				$.alertMsg("银行卡号最多19位");
				thisV = thisV.substr(0,19);
			}
			var newV = new Array();
			var temV = [];
			for(var i=0,ilen=thisV.length;i<ilen;i++){
				temV.push(thisV[i]);
				if(temV.length == 4){
					newV.push(temV.join(""));
					temV = [];
				}
			}
			if(temV.length){
				newV.push(temV.join(""));
			}

			this.value = newV.join(" ");
		});
//		this.cityPickerCtrl.unbind('tap').tap(function(){ //展示选择地址的弹窗及渲染省份列表
//			cityPicker.showPicker($(this));
//      })
	}
	bindBankObj.submitData = function(){
		var self = this;
		var bankName = bindBankObj.bank;
		var bankAddressVal = this.bankAddressObj.val();
		var bankProvinceVal = bindBankObj.province;
		var bankCityVal = bindBankObj.city;
		var bankCardNumVal = this.bankCardNumObj.val().replace(/\s/g,"");
		var bankCardPwdVal = this.bankCardPwdObj.val();
		var bankCardiphoneVal = this.bankCariphoneObj.val();//手机号码 
		var bankccVal = this.bankccObj.val();//姓名 
		//console.log(bankProvinceVal,bankCityVal);
        if(bankCardNumVal.length<16 || bankCardNumVal.length>19){
			$.alertMsg("银行卡格式为16位到19位");
			return false;
		}
		if(bankAddressVal===""){
			$.alertMsg("开户行名称不能为空");
			return false;
		}else if(!bankProvinceVal||!bankCityVal){
			$.alertMsg("请选择省份城市");
			return false;
		}else if(bankCardNumVal===""){
			$.alertMsg("银行卡号不能为空");
			return false;
		}else if(bankCardPwdVal===""){
			$.alertMsg("登录密码不能为空");
			return false;
		}else if(bankCardiphoneVal===""){
			$.alertMsg("手机号码不能为空");
			return false;
		}
		else if(bankccVal===""){ //
			$.alertMsg("姓名不能为空");
			return false;
		}
		var postData = {
			'para':Global.encrypt({
				'bankCode': bankName,
				'subBranch' : bankAddressVal,
				'province': bankProvinceVal,
				'city': bankCityVal,
				'cardNo' : bankCardNumVal,
				'passWord' : hex_md5(bankCardPwdVal),
				'user_name': bankccVal,
				'user_phone':bankCardiphoneVal
				}),
			'access_token': loginObj.access_token
		}
		//console.log(postData) user.account.bindBankCard
		$.ajax({
			url : ConfigObj.localSite + '?version=1&m=user.wallet.addBankCard',
			data : postData,
			dataType : "json",
			type : "post",
			success : function(msg){
				console.log(msg)
				if(msg.code=='0000'){
					$.alertMsg("绑定银行卡成功",true);
					setTimeout(function(){
						if(bindBankObj.fromPage == 'withDraw'){
							withDrawObj.goBack = function(){
								Global.GC();
								userCenterObj.show('reload');	
							}
							withDrawObj.show('reload',function(){
								withDrawObj.getData();	
							});
						}else{
							self.goBack();
						}
					},2100);
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});
	}
	
	bindBankObj.getBankData = function(){
		var self = this;
		var postData = {
			'access_token': loginObj.access_token	
		}
		$.ajax({
			url : ConfigObj.localSite +  '?version=1&m=user.account.bindBankCard',
			data : postData,
			dataType : "json",
			type : "post",
			success : function(msg){
				console.log('可绑定的银行卡列表数据 ', msg);
				if(msg.code=='0000'){
					msg.info = $.parseJSON(Global.crypt(msg.info));
					var html = '<option>--请选择--</option>';
					for(var i in msg.info){
						html += '<option value="'+ i +'">'+ msg.info[i]  +'</option>';
					}
					self.cardWrap.html(html);
//					self.bindScroll();
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});	
	}
	
//	bindBankObj.bindScroll = function(){
//		this.bankLIistObj.mobiscroll().select({
//	        theme: 'mobiscroll',
//	        lang: 'zh',
//	        display: 'modal',
//	        tap:true
//	    });
//	}

	bindBankObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		//this.bindScroll();
		this.getBankData();
	}

	bindBankObj.init = function(){
		bindBankObj.onloadExecution();
//		cityPicker.init(ConfigObj.localSite+"?m=user.account.getLocationInfo")
	}
	
	bindBankObj.setDefConfig = function(){
		bindBankObj.fromPage = '';
	}
	
	bindBankObj.setData = function(obj){
		bindBankObj.fromPage = obj.fromPage;		
	}
	
//	省份城市下拉框
	var arr = new  Array();
	arr[0 ]= ""
	arr[1 ]="东城,西城,崇文,宣武,朝阳,丰台,石景山,海淀,门头沟,房山,通州,顺义,昌平,大兴,平谷,怀柔,密云,延庆" 
	arr[2 ]="黄浦,卢湾,徐汇,长宁,静安,普陀,闸北,虹口,杨浦,闵行,宝山,嘉定,浦东,金山,松江,青浦,南汇,奉贤,崇明" 
	arr[3 ]="和平,东丽,河东,西青,河西,津南,南开,北辰,河北,武清,红挢,塘沽,汉沽,大港,宁河,静海,宝坻,蓟县" 
	arr[4 ]="万州,涪陵,渝中,大渡口,江北,沙坪坝,九龙坡,南岸,北碚,万盛,双挢,渝北,巴南,黔江,长寿,綦江,潼南,铜梁,大足,荣昌,壁山,梁平,城口,丰都,垫江,武隆,忠县,开县,云阳,奉节,巫山,巫溪,石柱,秀山,酉阳,彭水,江津,合川,永川,南川" 
	arr[5 ]="石家庄,邯郸,邢台,保定,张家口,承德,廊坊,唐山,秦皇岛,沧州,衡水" 
	arr[6 ]="太原,大同,阳泉,长治,晋城,朔州,吕梁,忻州,晋中,临汾,运城" 
	arr[7 ]="呼和浩特,包头,乌海,赤峰,呼伦贝尔盟,阿拉善盟,哲里木盟,兴安盟,乌兰察布盟,锡林郭勒盟,巴彦淖尔盟,伊克昭盟" 
	arr[8 ]="沈阳,大连,鞍山,抚顺,本溪,丹东,锦州,营口,阜新,辽阳,盘锦,铁岭,朝阳,葫芦岛" 
	arr[9 ]="长春,吉林,四平,辽源,通化,白山,松原,白城,延边" 
	arr[10 ]="哈尔滨,齐齐哈尔,牡丹江,佳木斯,大庆,绥化,鹤岗,鸡西,黑河,双鸭山,伊春,七台河,大兴安岭" 
	arr[11 ]="南京,镇江,苏州,南通,扬州,盐城,徐州,连云港,常州,无锡,宿迁,泰州,淮安" 
	arr[12 ]="杭州,宁波,温州,嘉兴,湖州,绍兴,金华,衢州,舟山,台州,丽水" 
	arr[13 ]="合肥,芜湖,蚌埠,马鞍山,淮北,铜陵,安庆,黄山,滁州,宿州,池州,淮南,巢湖,阜阳,六安,宣城,亳州" 
	arr[14 ]="福州,厦门,莆田,三明,泉州,漳州,南平,龙岩,宁德" 
	arr[15 ]="南昌市,景德镇,九江,鹰潭,萍乡,新馀,赣州,吉安,宜春,抚州,上饶" 
	arr[16 ]="济南,青岛,淄博,枣庄,东营,烟台,潍坊,济宁,泰安,威海,日照,莱芜,临沂,德州,聊城,滨州,菏泽" 
	arr[17 ]="郑州,开封,洛阳,平顶山,安阳,鹤壁,新乡,焦作,濮阳,许昌,漯河,三门峡,南阳,商丘,信阳,周口,驻马店,济源" 
	arr[18 ]="武汉,宜昌,荆州,襄樊,黄石,荆门,黄冈,十堰,恩施,潜江,天门,仙桃,随州,咸宁,孝感,鄂州" 
	arr[19 ]="长沙,常德,株洲,湘潭,衡阳,岳阳,邵阳,益阳,娄底,怀化,郴州,永州,湘西,张家界" 
	arr[20 ]="广州,深圳,珠海,汕头,东莞,中山,佛山,韶关,江门,湛江,茂名,肇庆,惠州,梅州,汕尾,河源,阳江,清远,潮州,揭阳,云浮" 
	arr[21 ]="南宁,柳州,桂林,梧州,北海,防城港,钦州,贵港,玉林,南宁地区,柳州地区,贺州,百色,河池" 
	arr[22 ]="海口,三亚" 
	arr[23 ]="成都,绵阳,德阳,自贡,攀枝花,广元,内江,乐山,南充,宜宾,广安,达川,雅安,眉山,甘孜,凉山,泸州" 
	arr[24 ]="贵阳,六盘水,遵义,安顺,铜仁,黔西南,毕节,黔东南,黔南" 
	arr[25 ]="昆明,大理,曲靖,玉溪,昭通,楚雄,红河,文山,思茅,西双版纳,保山,德宏,丽江,怒江,迪庆,临沧" 
	arr[26 ]="拉萨,日喀则,山南,林芝,昌都,阿里,那曲" 
	arr[27 ]="西安,宝鸡,咸阳,铜川,渭南,延安,榆林,汉中,安康,商洛" 
	arr[28 ]="兰州,嘉峪关,金昌,白银,天水,酒泉,张掖,武威,定西,陇南,平凉,庆阳,临夏,甘南" 
	arr[29 ]="银川,石嘴山,吴忠,固原" 
	arr[30 ]="西宁,海东,海南,海北,黄南,玉树,果洛,海西" 
	arr[31 ]="乌鲁木齐,石河子,克拉玛依,伊犁,巴音郭勒,昌吉,克孜勒苏柯尔克孜,博 尔塔拉,吐鲁番,哈密,喀什,和田,阿克苏" 
	arr[32 ]="香港" 
	arr[33 ]="澳门" 
	arr[34 ]="台北,高雄,台中,台南,屏东,南投,云林,新竹,彰化,苗栗,嘉义,花莲,桃园,宜兰,基隆,台东,金门,马祖,澎湖" 	

	function getProvince()
	{    
	    var pro = document.getElementById("province");
	    var city = document.getElementById("city");    
	    var provinceIndex = pro.selectedIndex;
	    bindBankObj.province = pro.options[provinceIndex].text;
	    var cityArr = arr[provinceIndex].split(",");   
	    city.length = 0;
	    //将城市数组中的值填充到城市下拉框中
	    for(var i=0;i<cityArr.length;i++)
	    {
	             city[i]=new Option(cityArr[i],cityArr[i]);
	         }
	    var cityIndex = city.selectedIndex;
	    bindBankObj.city = city.options[cityIndex].text;
	};	
	function getCity(){
		var city = document.getElementById("city");    
		var cityIndex = city.selectedIndex;
	    bindBankObj.city = city.options[cityIndex].text;
	};
	function getBank(){
		var bank = document.getElementById("bindBank_cardWrap")
		var bankIndex = bank.selectedIndex;
		bindBankObj.bank = bank.options[bankIndex].value;
	}
	
