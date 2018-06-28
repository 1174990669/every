var cityPicker ={
	pickerIndex:0,
	provinceJson : "",
	cityJson:"",
	provinceStr:"",
	cityStr:"",
	apiPath:"",
	pageInit:function(){ //页面加载的时候先将省份渲染出来
		//从localStorage中获取数据，如果有就展示没有的话就
		var self = this;
		self.provinceJson = JSON.parse(localStorage.getItem("province"));
		if(!self.provinceJson){
			this.getData("",function(data){
				self.provinceJson = data.info;
				localStorage.setItem("province",JSON.stringify(self.provinceJson));
				//渲染页面
			})
		}
	},
	showPicker:function(ele){
		var params ={location_type:"city"} ;
		//选中的城市和省份
		this.provinceStr = ele.data("province");
		this.cityStr = ele.data("city");
		//渲染省份
		this.renderList(this.provinceJson,$("#province"),this.provinceStr);
		this.mobileScroll($("#province"),"选择省份");
		//如果城市存在的话就渲染城市
		//console.log(this.cityStr);
		if(this.cityStr){
			for(var i in this.provinceJson){
				if(this.provinceJson[i]==this.provinceStr){
					params.parent_id=i;
				}
			}
			this.pickerIndex=1;
			this.showCity(params);
		}
		// 展示弹窗
		this.cityPickerEle.addClass("show");
		if(this.provinceStr){
			this.cityPickerHead.find("span").eq(0).html(this.provinceStr);
		}
	},
	getData:function(params,callBack){
		var self = this;
		if(!params){
			params ="";
		}
		$.ajax({
            url: self.apiPath,
            data:params,
            dataType: "json",
            type: "post",
            success: function(msg) {
            	if(msg.code==0000){
            		callBack(msg);
            	}
            }
        });
	},
	mobileScroll:function(ele,title){
		ele.mobiscroll().select({
            theme: 'mobiscroll',
            headerText: title,
            lang: 'zh',
            rows: 4,
            display: 'inline',
        });
	},
	renderList:function(data,ele,selector,key){ //接收4个参数：渲染的数据，填充到的dom，选中的option，是否根据key来取值（这个是因为接口返回数据格式不统一所以得处理下）
		var html ="";
		if(key){
			data=data[key]
		}
		for(var i in data){
			if(data[i]==selector){
				html+="<option value= '"+ i +"'selected='selected'>"+data[i]+"</option>";
			}else{
				html+="<option value= '"+ i +"'>"+data[i]+"</option>";
			}
			
		}
		ele.empty().append(html);
	},
	showCity:function(params){ //展示的时候如果默认有值，需要将之前的值请求到并且默认选中
		var self = this;
		self.cityPickerBody[0].style.transform="translate3d("+(-25)+"%, 0px, 0px)";
		self.getData(params,function(data){
			//渲染页面
			self.renderList(data.info,$("#city"),self.cityStr,params.parent_id);
			self.mobileScroll($("#city"),"选择城市");
		})
	},
	submitPicker:function(){ //确定按钮
		var self = this;
		var params ="";
		var id,name;
		this.cityPickerBody.find(".item").eq(self.pickerIndex).find(".dw-li").each(function(){
			if($(this).attr("aria-selected")=="true"){
				id = $(this).data("val");
				name = $(this).find(".dw-i").text();
				params = {parent_id:id,location_type:"city"};
				self.cityPickerHead.find("span").eq(self.pickerIndex).html(name);
			}
		})
		switch(self.pickerIndex){
			case 0: //0就是准备请求市
				self.showCity(params);
				self.provinceStr=name;
				self.pickerIndex+=1;
				break;
			case 1:
				self.cityPickerEle.removeClass("show");
				self.cityStr=name;
				$("#cityPickerCtrl").attr({
					"data-province":self.provinceStr,
					"data-city":self.cityStr
				})
				$("#cityPickerCtrl").find("input").val(self.provinceStr+" "+self.cityStr);
				self.pickerIndex=0;
				break;
		}
	},
	cancelPicker:function(flag){
		var self = this;
		switch(self.pickerIndex){
			case 0: //0关闭
				if(flag){
					this.cityPickerEle.removeClass("show");
				}
				break;
			case 1:
				//修复页面直接切换导致获取数据为undefined的问题
				self.pickerIndex=0;
				self.cityStr="";
				self.provinceStr="";
				self.cityPickerHead.find("span").eq(1).html("城市");
				self.cityPickerBody[0].style.transform="translate3d(0, 0px, 0px)";
				break;
		}
	},
	docmCtrl:function(){
		var self = this;
		//确定
		$("#pickerSubmit").unbind("tap").bind("tap",function(){
			self.submitPicker();
		})
		//取消
		$("#pickerCancel").unbind("tap").bind("tap",function(){
			self.cancelPicker(1);
		})
		//选择的头部点击
		self.cityPickerHead.find("span").eq(0).unbind("tap").bind("tap",function(){
			self.cancelPicker();
		})
		//点击阴影关闭
		$(".city-picker-cover").unbind("tap").bind("tap","",function(){
			self.cityPickerEle.removeClass("show");
		})
	},
	init:function(apiPath){
		this.pickerIndex=0;
		this.apiPath=apiPath;
		this.cityPickerEle = $("#cityPicker");
		this.cityPickerHead = $("#pickerHead");
		this.cityPickerBody = $("#pickerBody");
		this.pageInit();
		this.docmCtrl();
	}
};
