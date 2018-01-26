/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	$("#showbox img").hide();
	var cid=$.getUrlParam("id") || 0;
	var provinceid=$.cookie("provinceid") || 86;
  var pay_type=$.getUrlParam("group") || 0;
  var utk = $.cookie("utk");
  var act = $.getUrlParam("act") || "pay";
  var pInfo = $.getUrlParam("info");

  var proArr=pInfo.split("|");
  

	var pro_jingxuan_list = new Vue({
	      el:"#my_shopping_balance",
	      data:{
	          pro_xq:'',//商品详情
	          categories:'', //分类
	          shop_item:'',//商铺信息
	          lbels:'',//商铺标签
	          skus:'',//商品规格
	          imgs:'',//商品图片
	          coupons:[],//商铺优惠卷
	          qieshow:0,//详情切换
	          comments:'',//评价信息
	          summary1:'',
	          address:'',//收货地址
	          blocks:'',
	          addressId:0,
            pay_type:pay_type,//支付类型
            count_cash:0,
            count_coupon:0,
            act:act, //支付方式  quick 快速支付   groupon  开团支付  pay  正常付款，一般不会调用
	        },
	        methods:{
                basejian:function(e){
                	var dom=e.target;
                 	var n = $(".sku_jian").index(dom);
                 	if(this.skus[n].quantity>0)
                 		this.skus[n].quantity--;
                  this.get_cash();
                },
                basejia:function (e){
                 	var dom=e.target;
                 	var n = $(".sku_jia").index(dom);
                 	this.skus[n].quantity++;
                 	console.log(this.skus[n]);
                  this.get_cash();
                },
                //选择sku商品
                changeNum: function(e){
                	var dom=e.target;
                	var num= dom.value;
                	var n = $(".sku_input").index(dom);
                	console.log(num);
                	if(num>=0)
                		this.skus[n].quantity=num;
                	else{
                		this.skus[n].quantity=0;
                		swal({
                			title:"出错了",
                			text:"<span style='color:red;font-size:24px;'>数量不能为负数</span>",
                			//type:"warning",
                			confirmButtonText:"aaa",
                			html:true
                		});
						// swal("ssss");
                	}
                		
                },
                //得到总价格
                get_cash:function(){
                  count_cash=0;
                            
                  if(this.skus.length>=1){
                    for(var i=0;i<proArr.length;i++){
                      count_cash+=this.skus[i].quantity*this.skus[i].price/100
                    }
                  }
                  this.count_cash=count_cash;
                  if(this.coupons.length>=1){
                    this.count_coupon =0;
                    for(var i=0;i<this.coupons.length;i++){
                      if(this.count_cash>this.coupons[i].limitFee/100){
                        couponid= this.coupons[i].id;
                        this.count_coupon = this.coupons[i].fee/100;
                      }
                    } 
                  }
                            
                  // setTimeout(function(){
                  //   var cash=0;
                  //   console.log ("????>>>>>>skus");
                  //   console.log (this.skus);
                  //   for(var i=0;i<this.skus.length;i++){
                  //     cash+= this.skus[i].quantity * this.skus[i].price;
                  //   }
                  //   console.log(cash);
                  // },500)
                },
                //是否登录
                isLogin:function(){
                  if(!utk){
                    window.location="user/login.html";
                  }
                },
                //选择地址
                changeAddress:function(e){
                  this.isLogin();
                	var dom=e.target;
                	var n = dom.value;
                	console.log("addressid:"+n);
                	this.addressId=n;
                },
                //预定
                groupon:function(e){
                  //得到商sku品基础信息
                  var data1 = this.get_products_info_groupon();
                  if(data1.code==0){
                    data=data1.data;
                  }else{
                    return;
                  }
                  data.catalogId = this.pro_xq.categoryId;
                  var couponid=0;
                  if(this.coupons.length>=1){
                    for(var i=0;i<this.coupons.length;i++){
                      if(this.count_cash>this.coupons[i].limitFee/100){
                        couponid= this.coupons[i].id;
                        this.count_coupon = this.coupons[i].fee/100;
                      }
                    } 
                  }
                    
                  data.couponId = couponid;
                  data.invoiceId = this.pro_xq.invoice;
                  data.payMethod="";
                  data.remark="";
                  data.returnUrl="http://www.360ecmall.com/";
                  data.shopId = this.pro_xq.shopId;
                  var id=this.pro_xq.id;//商品id

                  var url = config.API_GATEWAY + "/td/orders/h5";
                  Api.post(url,data,function(e) {
                    console.log(e);
                    if(e.code==0){
                      if(e.data.yijiPayUrl)
                        window.location.href=e.data.yijiPayUrl;
                    }else{
                      alert(e.message);
                    }
                  })
                },

                sku_pay : function(e){

                },
                quick :function(e){
                  //得到商sku品基础信息
                  var data1 = this.get_products_info();
                  if(data1.code==0){
                    data=data1.data;
                  }else{
                    return;
                  }
                  data.catalogId = this.pro_xq.categoryId;
                  data.shopId = this.pro_xq.shopId;
                  var couponid=0;
                  var couponid=0;
                  if(this.coupons.length>=1){
                    for(var i=0;i<this.coupons.length;i++){
                      if(this.count_cash>this.coupons[i].limitFee/100){
                        couponid= this.coupons[i].id;
                        this.count_coupon = this.coupons[i].fee/100;
                      }
                    } 
                  }
                  data.couponId = couponid;
                  data.invoiceId = this.pro_xq.invoice;
                  data.payMethod="";
                  data.remark="";
                  data.returnUrl="http://www.360ecmall.com/";
                  var id=this.pro_xq.id;//商品id

                  var url = config.API_GATEWAY + "/td/orders/quick/h5";
                  Api.post(url,data,function(e) {
                    console.log(e);
                    if(e.code==0){
                      if(e.data.yijiPayUrl)
                        window.location.href=e.data.yijiPayUrl;
                    }else{
                      alert(e.message);
                    }
                  })
                },
                get_products_info_groupon: function(){

                  // {
                  //   "addressId": 10001,
                  //   "id": 0,
                  //   "invoiceId": 0,
                  //   "items": [
                  //     {
                  //       "key": {
                  //         "couponId": 0,
                  //         "id": 0,
                  //         "remark": "string"
                  //       },
                  //       "value": [
                  //         {
                  //           "id": 10000,
                  //           "quantity": 0,
                  //           "skuId": 10000
                  //         }
                  //       ]
                  //     }
                  //   ],
                  //   "payMethod": "string",
                  //   "returnUrl": "http://www.360ecmall.com/",
                  //   "userId": 0
                  // }


                  this.isLogin();
                  var items=[];
                  for(var i=0;i<this.skus.length;i++){
                    if(this.skus[i].quantity>0){
                      items.push({"quantity":this.skus[i].quantity,"skuId":this.skus[i].id})
                    }
                  }
                  if(this.addressId<=0){
                    swal("请选择地址，或新增地址！");
                    return {code:-1001,data:"请选择地址，或新增地址！"};
                  }
                  if(items.length<=0){
                    swal("请选择型号！");
                    return {code:-1002,data:"请选择型号！"};
                  }
                  var data1={
                    addressId : this.addressId,
                    items : items,
                  }
                  return {code:0,data:data1};

                },
                get_products_info:function(e){
                  this.isLogin();
                  var items=[];
                  for(var i=0;i<this.skus.length;i++){
                    if(this.skus[i].quantity>0){
                      items.push({"quantity":this.skus[i].quantity,"skuId":this.skus[i].id})
                    }
                  }
                  if(this.addressId<=0){
                    swal("请选择地址，或新增地址！");
                    return {code:-1001,data:"请选择地址，或新增地址！"};
                  }
                  if(items.length<=0){
                    swal("请选择型号！");
                    return {code:-1002,data:"请选择型号！"};
                  }
                  var data1={
                    addressId : this.addressId,
                    items : items,
                  }
                  return {code:0,data:data1};

                },
                //关注商品
                payshop:function(){
                	
                }
                
	        },
	        updata:function(){
             
	        },
	    });
  //sku商品
  $("#pay_submit").click(function(){
    if(act=="pay"){
      pro_jingxuan_list.sku_pay();
    }else if(act=="quick"){
      pro_jingxuan_list.quick();
    }else if(act=="groupon"){
      pro_jingxuan_list.groupon();
    }

  })
  
	//板块
	var url = config.API_GATEWAY + "/cms/sites/"+provinceid+"/home";
	 Api.get(url,function(e) {
	 	if(e.code==0){
          pro_jingxuan_list.categories = e.data.categories;
          pro_jingxuan_list.blocks = e.data.blocks;
        }
     });
	//商品详情
	var url = config.API_GATEWAY + "/mt/catalogs/"+cid;
	           Api.get(url,function(e) {
	            		if(e.code==0){
                            pro_jingxuan_list.pro_xq = e.data;
                            pro_jingxuan_list.skus = e.data.skus;
                            pro_jingxuan_list.imgs = e.data.imgs;
                            count_cash=0;
                            count_coupon=0;
                            
                              if(proArr.length>=1){
                                for(var i=0;i<proArr.length;i++){
                                  pro_jingxuan_list.skus[i].quantity=proArr[i].split("_")[1];
                                  count_cash+=pro_jingxuan_list.skus[i].quantity*pro_jingxuan_list.skus[i].price/100

                                }
                              }
                              pro_jingxuan_list.count_cash=count_cash;
                              pro_jingxuan_list.get_cash();

                            
                                                        // pro_skus();                         
	            		}else{
	            			alert("请求失败！");
	            		}
			            //商铺信息	
			            var id = pro_jingxuan_list.pro_xq.merchantId,
			                url1 = config.API_GATEWAY + "/mt/merchants/"+id+"/shops";
			                // console.log(id);
			            	Api.get(url1,function(e) {	
		                         if(e.code==0){
		                         	console.log(">>>>>>>>>>>>分类222:"+id)
		                            pro_jingxuan_list.shop_item = e.data;
		                            console.log(e.data);
		                         }
			                });
			            //商铺分类
			            get_merchant(id);

		           });
 //商铺标签
   var url = config.API_GATEWAY + "/mt/shops/labels";
	            	Api.get(url,function(e) {
	            		if(e.code==0){
                            pro_jingxuan_list.lbels = e.data;
                         }
	            	});
	//店铺分类
	function get_merchant(merchantId){
		var url = config.API_GATEWAY + "/mt/merchants/"+merchantId+"/categories";
    	Api.get(url,function(e) {
    		if(e.code==0){
                pro_jingxuan_list.categories = e.data;
                console.log(">>>>>>>>>>>>分类:"+merchantId)
                console.log(e.data);
             }
    	});
	}

//商铺优惠卷
                var url = config.API_GATEWAY + "/us/coupons?st=0&pn=1&ps=20";
                Api.get(url,function(e) {
                  if(e.code==0){

                            pro_jingxuan_list.coupons =  e.data.items;
                         }
                }); 


  //我的收获地址
	var url = config.API_GATEWAY + "/us/users/addresses";
	            	Api.get(url,function(e) {
	            		pro_jingxuan_list.address = e.data;
	            		if (e.data.length>0){
	            			pro_jingxuan_list.addressId = e.data[0].id;
	            			console.log("addressid:"+pro_jingxuan_list.addressId);
	            		}else{
	            			pro_jingxuan_list.addressId = 0;
	            		}
		            });



	            	   	           	
	window.Api = Api;

})();