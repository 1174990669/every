
  var sportteryBonus = new Object();
  sportteryBonus.moneyVal = 0;
  sportteryBonus.bonusVal = 0;
  sportteryBonus.zhushuVal = 0;
  sportteryBonus.betName = ["spf","rqspf","zjq","bqc","bf"];

  sportteryBonus.setDefConfig = function(){
    this.maxZS = 100000;
    this.oneMoney = 2;
    this.bJBetWagerCount = this.getBJBetWagerCount();
  }

  sportteryBonus.createDomObj = function(){
    this.moneyObj = $("#soccerMix_moneyObj");
    this.bonusObj = $("#soccerMix_bonusObj");
    this.zhushuObj = $("#soccerMix_zhushuObj");
  }

  sportteryBonus.viewHtml = function(multipleVal){
    if(this.moneyObj === false){
      this.moneyObj.html("超过20万元");
      this.bonusObj.html("最高奖金0元");
      this.zhushuObj.html("注数过大");
      return false;
    }
    this.moneyObj.html(this.moneyVal*multipleVal*this.oneMoney);
	//console.log(this.bonusVal);
	////console.log(multipleVal);
	////console.log(this.oneMoney);
	//console.log((this.bonusVal*multipleVal*this.oneMoney).toFixed(2));
    this.bonusObj.html((this.bonusVal*multipleVal*this.oneMoney).toFixed(2));
    this.zhushuObj.html(this.zhushuVal+"注");
	//this.bonusObj.get(0).innerHTML = (this.bonusVal*multipleVal*this.oneMoney).toFixed(2); //zhangw
  }

  sportteryBonus.getMoney = function(ggVal,datas,multipleVal){
	//console.log(arguments);
    if(!ggVal || ggVal.length==0){
      sportteryBonus.moneyVal = 0;
      sportteryBonus.bonusVal = 0;
      sportteryBonus.zhushuVal = 0;
      sportteryBonus.viewHtml(multipleVal);
      return false;
    }
    var sa=[],sb=[],bsa=[],bsb=[];
    for(var i in datas){
      if(!datas[i])continue;
      if(!datas[i][1])continue;
      //计算注数
      var betData = [];
      for(var t=0,tlen=datas[i][1].length;t<tlen;t++){
        if(!datas[i][3][t])continue;
        betData.push(sportteryBonus.betName[t]+"-"+datas[i][3][t]);
      }
      //计算奖金
      var betValArr = sportteryBonus.getBetVal(datas[i][10]);
      var maxVal=0;//缓存最大值
      var temArr=[];//用于获取当前可能的最大sp值
      var maxBetValARr = [];
      for(var p=0,plen=betValArr.length;p<plen;p++){
        var thisPVal=0;
        temArr[p]=[];//清空当前可能的sp值
        for(var pk=0,pklen=betValArr[p].length;pk<pklen;pk++){
          if(!datas[i][3][pk])continue;
          var spArr= datas[i][2][pk];
          temArr[p][pk]="min-0";
          var pkVal=betValArr[p][pk];
          var maxSp=0;
          for(var bk=0,bklen=pkVal.length;bk<bklen;bk++){
              var thisBK=pkVal[bk];
              if(sportteryBonus.betName[pk]==="rqspf"){
                 thisBK = thisBK>0?0:(thisBK<0?2:1);
              }
              if(datas[i][1][pk][thisBK] && maxSp<spArr[thisBK]){
                maxSp=Number(spArr[thisBK]);
                temArr[p][pk]=sportteryBonus.betName[pk]+"-"+maxSp;
              }
          }
          thisPVal+=maxSp;
        }
        if(maxVal<=thisPVal){
          maxVal=thisPVal;
          maxBetValARr=temArr[p];
        }
      }
      //清理空选项
      var clearSP=[];
      for(var c=0,clen=maxBetValARr.length;c<clen;c++){
          if(maxBetValARr[c])clearSP.push(maxBetValARr[c]);
      }
      maxBetValARr=clearSP;

      if(datas[i][9]){
          sb.push(betData);
          bsb.push(maxBetValARr);
      }else{
          sa.push(betData);
          bsa.push(maxBetValARr);
      }
    }
    if(sa.length==0 && sb.length==0){
      sportteryBonus.moneyVal = 0;
      sportteryBonus.bonusVal = 0;
      sportteryBonus.zhushuVal = 0;

      sportteryBonus.viewHtml(multipleVal);
      return false;
    }
    var ggString=ggVal.join(",");
    var sportterybonusDate={ggWay:ggString,sa:sa,sb:sb,minabs:sb.length,maxabs:sb.length};
    var sportterybonusBDate={ggWay:ggString,sa:bsa,sb:bsb,minabs:sb.length,maxabs:sb.length};
    sportteryBonus.moneyVal=sportteryBonus.getMyCalc(sportterybonusDate);
    sportteryBonus.bonusVal=sportteryBonus.getMyCalc(sportterybonusBDate);
    sportteryBonus.zhushuVal = sportteryBonus.getMyCalc(sportterybonusDate);
    sportteryBonus.viewHtml(multipleVal);
    return (sportteryBonus.moneyVal*multipleVal*sportteryBonus.oneMoney)+"_"+(sportteryBonus.bonusVal*multipleVal*sportteryBonus.oneMoney).toFixed(2);//单元测试使用
  }


  sportteryBonus.getBJBetWagerCount = function(){
    var bJBetWagerCount = new Array(17);
    for(var i=0;i<bJBetWagerCount.length;i++)
    {
    bJBetWagerCount[i] = new Array(17);
    }
    bJBetWagerCount[1][1] = "1";

    bJBetWagerCount[2][1] = "1,2";
    bJBetWagerCount[2][2] = "1/2";

    bJBetWagerCount[3][1] = "1,2,3";
    bJBetWagerCount[3][2] = "1/2,1/3,2/3";
    bJBetWagerCount[3][3] = "1/2/3";

    bJBetWagerCount[4][1] = "1,2,3,4";
    bJBetWagerCount[4][2] = "1/2,1/3,2/3,1/4,2/4,3/4";
    bJBetWagerCount[4][3] = "1/2/3,1/2/4,1/3/4,2/3/4";
    bJBetWagerCount[4][4] = "1/2/3/4";

    bJBetWagerCount[5][1] = "1,2,3,4,5";
    bJBetWagerCount[5][2] = "1/2,1/3,2/3,1/4,2/4,3/4,1/5,2/5,3/5,4/5";
    bJBetWagerCount[5][3] = "1/2/3,1/2/4,1/3/4,2/3/4,1/2/5,1/3/5,2/3/5,1/4/5,2/4/5,3/4/5";
    bJBetWagerCount[5][4] = "1/2/3/4,1/2/3/5,1/2/4/5,1/3/4/5,2/3/4/5";
    bJBetWagerCount[5][5] = "1/2/3/4/5";

    bJBetWagerCount[6][1] = "1,2,3,4,5,6";
    bJBetWagerCount[6][2] = "1/2,1/3,2/3,1/4,2/4,3/4,1/5,2/5,3/5,4/5,1/6,2/6,3/6,4/6,5/6";
    bJBetWagerCount[6][3] = "1/2/3,1/2/4,1/3/4,2/3/4,1/2/5,1/3/5,2/3/5,1/4/5,2/4/5,3/4/5,1/2/6,1/3/6,2/3/6,1/4/6,2/4/6,3/4/6,1/5/6,2/5/6,3/5/6,4/5/6";
    bJBetWagerCount[6][4] = "1/2/3/4,1/2/3/5,1/2/4/5,1/3/4/5,2/3/4/5,1/2/3/6,1/2/4/6,1/3/4/6,2/3/4/6,1/2/5/6,1/3/5/6,2/3/5/6,1/4/5/6,2/4/5/6,3/4/5/6";
    bJBetWagerCount[6][5] = "1/2/3/4/5,1/2/3/4/6,1/2/3/5/6,1/2/4/5/6,1/3/4/5/6,2/3/4/5/6";
    bJBetWagerCount[6][6] = "1/2/3/4/5/6";
        
    bJBetWagerCount[7][1] = "1,2,3,4,5,6,7";
    bJBetWagerCount[7][2] = "1/2,1/3,2/3,1/4,2/4,3/4,1/5,2/5,3/5,4/5,1/6,2/6,3/6,4/6,5/6,1/7,2/7,3/7,4/7,5/7,6/7";
    bJBetWagerCount[7][3] = "1/2/3,1/2/4,1/3/4,2/3/4,1/2/5,1/3/5,2/3/5,1/4/5,2/4/5,3/4/5,1/2/6,1/3/6,2/3/6,1/4/6,2/4/6,3/4/6,1/5/6,2/5/6,3/5/6,4/5/6,1/2/7,1/3/7,2/3/7,1/4/7,2/4/7,3/4/7,1/5/7,2/5/7,3/5/7,4/5/7,1/6/7,2/6/7,3/6/7,4/6/7,5/6/7";
    bJBetWagerCount[7][4] = "1/2/3/4,1/2/3/5,1/2/4/5,1/3/4/5,2/3/4/5,1/2/3/6,1/2/4/6,1/3/4/6,2/3/4/6,1/2/5/6,1/3/5/6,2/3/5/6,1/4/5/6,2/4/5/6,3/4/5/6,1/2/3/7,1/2/4/7,1/3/4/7,2/3/4/7,1/2/5/7,1/3/5/7,2/3/5/7,1/4/5/7,2/4/5/7,3/4/5/7,1/2/6/7,1/3/6/7,2/3/6/7,1/4/6/7,2/4/6/7,3/4/6/7,1/5/6/7,2/5/6/7,3/5/6/7,4/5/6/7";
    bJBetWagerCount[7][5] = "1/2/3/4/5,1/2/3/4/6,1/2/3/5/6,1/2/4/5/6,1/3/4/5/6,2/3/4/5/6,1/2/3/4/7,1/2/3/5/7,1/2/3/6/7,1/2/4/5/7,1/2/4/6/7,1/2/5/6/7,1/3/4/5/7,1/3/4/6/7,1/3/5/6/7,1/4/5/6/7,2/3/4/5/7,2/3/4/6/7,2/3/5/6/7,2/4/5/6/7,3/4/5/6/7";
    bJBetWagerCount[7][6] = "1/2/3/4/5/6,1/2/3/4/5/7,1/2/3/4/6/7,1/2/3/5/6/7,1/2/4/5/6/7,1/3/4/5/6/7,2/3/4/5/6/7";
    bJBetWagerCount[7][7] = "1/2/3/4/5/6/7";        

    bJBetWagerCount[8][1] = "1,2,3,4,5,6,7,8";
    bJBetWagerCount[8][2] = "1/2,1/3,2/3,1/4,2/4,3/4,1/5,2/5,3/5,4/5,1/6,2/6,3/6,4/6,5/6,1/7,2/7,3/7,4/7,5/7,6/7,1/8,2/8,3/8,4/8,5/8,6/8,7/8";
    bJBetWagerCount[8][3] = "1/2/3,1/2/4,1/3/4,2/3/4,1/2/5,1/3/5,2/3/5,1/4/5,2/4/5,3/4/5,1/2/6,1/3/6,2/3/6,1/4/6,2/4/6,3/4/6,1/5/6,2/5/6,3/5/6,4/5/6,1/2/7,1/3/7,2/3/7,1/4/7,2/4/7,3/4/7,1/5/7,2/5/7,3/5/7,4/5/7,1/6/7,2/6/7,3/6/7,4/6/7,5/6/7,1/2/8,1/3/8,2/3/8,1/4/8,2/4/8,3/4/8,1/5/8,2/5/8,3/5/8,4/5/8,1/6/8,2/6/8,3/6/8,4/6/8,5/6/8,1/7/8,2/7/8,3/7/8,4/7/8,5/7/8,6/7/8";
    bJBetWagerCount[8][4] = "1/2/3/4,1/2/3/5,1/2/4/5,1/3/4/5,2/3/4/5,1/2/3/6,1/2/4/6,1/3/4/6,2/3/4/6,1/2/5/6,1/3/5/6,2/3/5/6,1/4/5/6,2/4/5/6,3/4/5/6,1/2/3/7,1/2/4/7,1/3/4/7,2/3/4/7,1/2/5/7,1/3/5/7,2/3/5/7,1/4/5/7,2/4/5/7,3/4/5/7,1/2/6/7,1/3/6/7,2/3/6/7,1/4/6/7,2/4/6/7,3/4/6/7,1/5/6/7,2/5/6/7,3/5/6/7,4/5/6/7,1/2/3/8,1/2/4/8,1/3/4/8,2/3/4/8,1/2/5/8,1/3/5/8,2/3/5/8,1/4/5/8,2/4/5/8,3/4/5/8,1/2/6/8,1/3/6/8,2/3/6/8,1/4/6/8,2/4/6/8,3/4/6/8,1/5/6/8,2/5/6/8,3/5/6/8,4/5/6/8,1/2/7/8,1/3/7/8,2/3/7/8,1/4/7/8,2/4/7/8,3/4/7/8,1/5/7/8,2/5/7/8,3/5/7/8,4/5/7/8,1/6/7/8,2/6/7/8,3/6/7/8,4/6/7/8,5/6/7/8";
    bJBetWagerCount[8][5] = "1/2/3/4/5,1/2/3/4/6,1/2/3/5/6,1/2/4/5/6,1/3/4/5/6,2/3/4/5/6,1/2/3/4/7,1/2/3/5/7,1/2/3/6/7,1/2/4/5/7,1/2/4/6/7,1/2/5/6/7,1/3/4/5/7,1/3/4/6/7,1/3/5/6/7,1/4/5/6/7,2/3/4/5/7,2/3/4/6/7,2/3/5/6/7,2/4/5/6/7,3/4/5/6/7,1/2/3/4/8,1/2/3/5/8,1/2/3/6/8,1/2/3/7/8,1/2/4/5/8,1/2/4/6/8,1/2/4/7/8,1/2/5/6/8,1/2/5/7/8,1/2/6/7/8,1/3/4/5/8,1/3/4/6/8,1/3/4/7/8,1/3/5/6/8,1/3/5/7/8,1/3/6/7/8,1/4/5/6/8,1/4/5/7/8,1/4/6/7/8,1/5/6/7/8,2/3/4/5/8,2/3/4/6/8,2/3/4/7/8,2/3/5/6/8,2/3/5/7/8,2/3/6/7/8,2/4/5/6/8,2/4/5/7/8,2/4/6/7/8,2/5/6/7/8,3/4/5/6/8,3/4/5/7/8,3/4/6/7/8,3/5/6/7/8,4/5/6/7/8";
    bJBetWagerCount[8][6] = "1/2/3/4/5/6,1/2/3/4/5/7,1/2/3/4/6/7,1/2/3/5/6/7,1/2/4/5/6/7,1/3/4/5/6/7,2/3/4/5/6/7,1/2/3/4/5/8,1/2/3/4/6/8,1/2/3/4/7/8,1/2/3/5/6/8,1/2/3/5/7/8,1/2/3/6/7/8,1/2/4/5/6/8,1/2/4/5/7/8,1/2/4/6/7/8,1/2/5/6/7/8,1/3/4/5/6/8,1/3/4/5/7/8,1/3/4/6/7/8,1/3/5/6/7/8,1/4/5/6/7/8,2/3/4/5/6/8,2/3/4/5/7/8,2/3/4/6/7/8,2/3/5/6/7/8,2/4/5/6/7/8,3/4/5/6/7/8";
    bJBetWagerCount[8][7] = "1/2/3/4/5/6/7,1/2/3/4/5/6/8,1/2/3/4/5/7/8,1/2/3/4/6/7/8,1/2/3/5/6/7/8,1/2/4/5/6/7/8,1/3/4/5/6/7/8,2/3/4/5/6/7/8";
    bJBetWagerCount[8][8] = "1/2/3/4/5/6/7/8";

    bJBetWagerCount[9][9] = "1/2/3/4/5/6/7/8/9";
    bJBetWagerCount[10][10] = "1/2/3/4/5/6/7/8/9/10";
    bJBetWagerCount[11][11] = "1/2/3/4/5/6/7/8/9/10/11";
    bJBetWagerCount[12][12] = "1/2/3/4/5/6/7/8/9/10/11/12";
    bJBetWagerCount[13][13] = "1/2/3/4/5/6/7/8/9/10/11/12/13";
    bJBetWagerCount[14][14] = "1/2/3/4/5/6/7/8/9/10/11/12/13/14";
    bJBetWagerCount[15][15] = "1/2/3/4/5/6/7/8/9/10/11/12/13/14/15";

    return bJBetWagerCount;
  }

  sportteryBonus.getVotetype = function(typevote){
    switch(typevote){
      case "1_1":
          return "1";
      case "2_1": 
          return "2";
      case "2_3": 
          return "1 2";
      case "3_1": 
          return "3";
      case "3_3": 
          return "2";
      case "3_4": 
          return "2 3";
      case "3_7": 
          return "1 2 3";
      case "4_1": 
          return "4";
      case "4_2":
          return "2";
      case "4_4":
          return "3";
      case "4_5":
          return "3 4";
      case "4_6":
          return "2";
      case "4_11":
          return "2 3 4";
      case "4_15":
          return "1 2 3 4";
      case "5_1":
          return "5";
      case "5_2":
          return "2";
      case "5_5":
          return "4";
      case "5_6":
          return "4 5";
      case "5_10":
          return "2";
      case "5_16":
          return "3 4 5";
      case "5_20":
          return "2 3";
      case "5_26":
          return "2 3 4 5";
      case "5_31":
          return "1 2 3 4 5";
      case "6_1":
          return "6";
      case "6_2":
          return "2";
      case "6_6":
          return "5";
      case "6_7":
          return "5 6";
      case "6_15":
          return "2";
      case "6_20":
          return "3";
      case "6_22":
          return "4 5 6";
      case "6_35":
          return "2 3";
      case "6_42":
          return "3 4 5 6";
      case "6_50":
          return "2 3 4";
      case "6_57":
          return "2 3 4 5 6";
      case "6_63":
          return "1 2 3 4 5 6";
      case "7_1":
          return "7";
      case "7_7":
          return "6";
      case "7_8":
          return "6 7";
      case "7_21":
          return "5";
      case "7_35":
          return "4";
      case "7_120":
          return "2 3 4 5 6 7";
      case "8_1":
          return "8";
      case "8_8":
          return "7";
      case "8_9":
          return "7 8";
      case "8_28":
          return "6";
      case "8_56":
          return "5";
      case "8_70":
          return "4";
      case "8_247":
          return "2 3 4 5 6 7 8";
      case "9_1":
          return "9";
      case "10_1":
          return "10";
      case "11_1":
          return "11";
      case "12_1":
          return "12";
      case "13_1":
          return "13";
      case "14_1":
          return "14";
      case "15_1":
          return "15";
      default: return "0";
    }
  }

  sportteryBonus.ComputeCombineNum = function(){
    var FirstValue=1;
    var SecondValue=1;
    if(y > x)return(0);
    for(var i=0;i<y;i++){ 
        FirstValue *= x-i;
        SecondValue *= i+1; 
    }
    var ResultNum = FirstValue/SecondValue;
    return(ResultNum);
  }

  sportteryBonus.arrcl = function(arr, n, z){
    var r = [];
    fn([], arr, n);
    return r;
    function fn(t, a, n) {
        if (n === 0 || z && r.length == z) {
            return r[r.length] = t;
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
            if (!z || r.length < z) {
                var b = t.slice();
                b.push(a[i]);
                fn(b, a.slice(i + 1), n - 1);
            }
        }
    }
  }

  sportteryBonus.arral = function(A2, fn){
    var n = 0,codes = [],code = [],isTest = typeof fn == 'function',stop; 
    each(A2, n);
    function each(A2, n){
      if(stop || n >= A2.length) {
        if (isTest && false === fn(code)){
            stop = true;
        }else{
            codes.push(code.slice());
            code.length = n - 1;        
        }
      }else{
        var cur = A2[n];
        for(var i = 0, j = cur.length; i < j; i++) {
            code.push(cur[i]);
            each(A2, n+1);
        }
        if(n){
            code.length = n - 1;
        }
      }
    }
    return codes;
  }

  sportteryBonus.zhuHeGetZuShu = function(ggWay,zuHe,c){
    var zhus=0;
    //按照过关方式获取矩阵中的过关方式拆分对应过关
    var voteType=this.getVotetype(ggWay);
    //将对应过关方式分为数组
    var voteArr=voteType.split(" ");

    //循环投注选项组合,计算各种组合下的注数
    for(var sai=0,slen=zuHe.length;sai<slen;sai++){
      //当前组合
      var thisZuHe=zuHe[sai];
      //过关方式组合循环
      for(var v=0,vlen=voteArr.length;v<vlen;v++){
        var vVal=voteArr[v];
        //获取当前过关方式组合对应的排列列表
        var thisBetWagerCount=this.bJBetWagerCount[c][vVal];
        var thisBetWagerCountArr=thisBetWagerCount.split(",");
        for(var betV=0,blen=thisBetWagerCountArr.length;betV<blen;betV++){
          var betZuHeVal=thisBetWagerCountArr[betV];
          //将各个排列元素拿出来
          var betZuHeArr=betZuHeVal.split("/");
          var zc=1;
          for(var bz=0,bzlen=betZuHeArr.length;bz<bzlen;bz++){
            //按照排列元素取选择场次相乘
            var thisVal=thisZuHe[Number(betZuHeArr[bz])-1].split("-");
            zc*=Number(thisVal[1]);
          }
          zhus+=zc;
        }
      }
    }
    return zhus;
  }

  sportteryBonus.myCalc = function(ggWay,sa,sb,minabs,maxabs){
    var ggArr=ggWay.split("_");
    var c=Number(ggArr[0]);
    var macthNum=sa.length+sb.length;
    var zuShu=0;

    if(sb.length==0){
      if(macthNum>15 && this.ComputeCombineNum(sa.length,c)>this.maxZS){
          return false;
      }
      var saZh=this.arrcl(sa,c);
      for(var i=0,ilen=saZh.length;i<ilen;i++){
          var thispl=this.arral(saZh[i]);
          zuShu+=this.zhuHeGetZuShu(ggWay,thispl,c);
      }
    }else{
      //定胆算法
      for(var d=minabs;d<=maxabs;d++){
        //根据模糊定胆获取定胆场次的组合
        if(macthNum>15 && this.ComputeCombineNum(sb.length,d)>this.maxZS){
            return false;
        }
        var sbZuHe=this.arrcl(sb,d);
        var saZuHeVal=c-d;
        if(sa.length>0){
          if(saZuHeVal>=0){
            if(macthNum>15 && this.ComputeCombineNum(sa.length,saZuHeVal)>this.maxZS)return false;

            saZuHe=this.arrcl(sa,saZuHeVal);
            if(sbZuHe.length*saZuHe.length>this.maxZS)return false;

            var temSbZuHe=[];
            for(var sk in sbZuHe){
                for(var ak in saZuHe){
                    temSbZuHe.push(sbZuHe[sk].concat(saZuHe[ak]));
                }
            }
            sbZuHe=temSbZuHe;
          }else{
            continue;
          }
        }
        for(var z=0,zlen=sbZuHe.length;z<zlen;z++){
            var thispl=this.arral(sbZuHe[z]);
            zuShu+=this.zhuHeGetZuShu(ggWay,thispl,c);
        }
      }
    }
    return zuShu;
  }

  sportteryBonus.getMyCalc=function(arg){
    arg = arg || {};
    var ggWay=arg.ggWay;
    var sa=arg.sa;
    var sb=arg.sb;
    var minabs=arg.minabs;
    var maxabs=arg.maxabs;
    var ggWayArr=ggWay.split(",");

    var zs=0;
    for(var i=0,ilen=ggWayArr.length;i<ilen;i++){
      if(!ggWayArr[i])continue;
        var thisVal=this.myCalc(ggWayArr[i],sa,sb,minabs,maxabs);
        if(thisVal===false){
          return false;
        }
        zs+=thisVal
      }
      return zs;
  }

  sportteryBonus.getBetVal = function(n){
    n=-1*Number(n);
    if(Math.abs(n)==1){
      var zsArr=n>0?[1,0]:[1];
      var zfArr=n<0?[0,-1]:[-1];
    }else{
      var zsArr=n>0?[1,0,-1]:[1];
      var zfArr=n<0?[1,0,-1]:[-1];
    }
    var spArr=[
      [[0],[1-0-n],[1],[0,3],[0]],
      [[0],[2-0-n],[2],[0,3],[1]],
      [[0],[2-1-n],[3],[0,3,6],[2]],
      [[0],[3-0-n],[3],[0,3],[3]],
      [[0],[3-1-n],[4],[0,3,6],[4]],
      [[0],[3-2-n],[5],[0,3,6],[5]],
      [[0],[4-0-n],[4],[0,3],[6]],
      [[0],[4-1-n],[5],[0,3,6],[7]],
      [[0],[4-2-n],[6],[0,3,6],[8]],
      [[0],[5-0-n],[5],[0,3],[9]],
      [[0],[5-1-n],[6],[0,3,6],[10]],
      [[0],[5-2-n],[7],[0,3,6],[11]],
      [[0],zsArr,[7],[0,3,6],[12]],
      [[1],[0-0-n],[0],[4],[13]],
      [[1],[1-1-n],[2],[1,4,7],[14]],
      [[1],[2-2-n],[4],[1,4,7],[15]],
      [[1],[3-3-n],[6],[1,4,7],[16]],
      [[1],[-1*n],[7],[1,4,7],[17]],
      [[2],[0-1-n],[1],[5,8],[18]],
      [[2],[0-2-n],[2],[5,8],[19]],
      [[2],[1-2-n],[3],[2,5,8],[20]],
      [[2],[0-3-n],[3],[5,8],[21]],
      [[2],[1-3-n],[4],[2,5,8],[22]],
      [[2],[2-3-n],[5],[2,5,8],[23]],
      [[2],[0-4-n],[4],[5,8],[24]],
      [[2],[1-4-n],[5],[2,5,8],[25]],
      [[2],[2-4-n],[6],[2,5,8],[26]],
      [[2],[0-5-n],[5],[5,8],[27]],
      [[2],[1-5-n],[6],[2,5,8],[28]],
      [[2],[2-5-n],[7],[2,5,8],[29]],
      [[2],zfArr,[7],[2,5,8],[30]]
    ];
    return spArr;
  }

  sportteryBonus.empty=function (v){
    switch (typeof v){
      case 'undefined' : return true;
      case 'string' : if(v.trim().length == 0) return true; break;
      case 'boolean' : if(!v) return true; break;
      case 'number' : if(0 === v) return true; break;
      case 'object' :
        if(null === v) return true;
        if(undefined !== v.length && v.length==0) return true;
        for(var k in v){
          return false;
        }
        return true;
        break;
    }
    return false;
  }

  sportteryBonus.setConfig = function(bonusConfig){
    for(var k in bonusConfig){
      this[k] = bonusConfig[k];
    }
  }

  sportteryBonus.onloadExecution = function(){
    this.createDomObj();
  }

  sportteryBonus.init = function(obj){
    this.setDefConfig();
	if(obj){
      this.setConfig(obj);
	}
    sportteryBonus.onloadExecution();
  }

  this.getBonusData = function(){
    return {
      zhushuVal : sportteryBonus.zhushuVal,
      bonusVal : (sportteryBonus.bonusVal*sportteryBonus.oneMoney).toFixed(2),
      moneyVal : sportteryBonus.moneyVal*sportteryBonus.oneMoney
    }
  }
