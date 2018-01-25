/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	$("#showbox img").hide();
	var cid=$.getUrlParam("cid") || 0;
	var shopId=$.getUrlParam("shopId") || 0;
	var provinceid=$.cookie("provinceid") || 86;
  var pay_type=$.getUrlParam("group") || 0;
  var utk = $.cookie("utk");
	var pro_jingxuan_list = new Vue({
	      el:"#pro_jingxuan_list",
	      data:{
	          pro_xq:'',//商品详情
	          categories:'', //分类
	          shop_item:'',//商铺信息
	          lbels:'',//商铺标签
	          skus:'',//商品规格
	          imgs:'',//商品图片
	          coupons:'',//商铺优惠卷
	          qieshow:0,//详情切换
	          comments:'',//评价信息
	          summary1:'',
	          address:'',//收货地址
	          blocks:'',
	          addressId:0,
            pay_type:pay_type,//支付类型
	        },
	        methods:{
                basejian:function(e){
                	var dom=e.target;
                 	var n = $(".sku_jian").index(dom);
                 	if(this.skus[n].quantity>0)
                 		this.skus[n].quantity--;
                },
                basejia:function (e){
                 	var dom=e.target;
                 	var n = $(".sku_jia").index(dom);
                 	this.skus[n].quantity++;
                 	console.log(this.skus[n]);

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
                  var data1 = this.get_products_info();
                  if(data1.code==0){
                    data=data1.data;
                  }else{
                    return;
                  }
                  // data.catalogId = this.pro_xq.categoryId;
                  // data.couponId = 0;
                  // data.invoiceId = this.pro_xq.invoice;
                  // data.payMethod="";
                  // data.remark="";
                  // data.returnUrl="http://www.360ecmall.com/";
                  // data.shopId = this.pro_xq.shopId;
                  var id=this.pro_xq.id;//商品id

                  // var url = config.API_GATEWAY + "/td/groupon/quick/h5";
                  // Api.post(url,data,function(e) {
                  //   if(e.code==0){
                  //     //window.location.href="personal/my_shopping_groupon.html";
                  //     console.log(e);
                  //   }else{
                  //     alert(e.message);
                  //   }
                  // })
                  var pInfo="";
                  for(var i=0;i<data.items.length;i++){
                    if(pInfo){
                      pInfo+="|"+data.items[i].skuId+"_"+data.items[i].quantity;

                    }else{
                      pInfo=data.items[i].skuId+"_"+data.items[i].quantity;
                    }
                  }
                  window.location.href="personal/my_shopping_balance.html?act=groupon&id="+id+"&info="+pInfo+"&shopId="+shopId;

                },
                quick :function(e){
                  //得到商sku品基础信息
                  var data1 = this.get_products_info();
                  if(data1.code==0){
                    data=data1.data;
                  }else{
                    return;
                  }
                  // data.catalogId = this.pro_xq.categoryId;
                  // data.shopId = this.pro_xq.shopId;
                  // data.couponId = 0;
                  // data.invoiceId = this.pro_xq.invoice;
                  // data.payMethod="";
                  // data.remark="";
                  // data.returnUrl="http://www.360ecmall.com/";
                  var id=this.pro_xq.id;//商品id

                  // var url = config.API_GATEWAY + "/td/catalogs/"+id+"/prepare";
                  // Api.post(url,data,function(e) {
                  //   if(e.code==0){
                  //     //window.location.href="personal/my_shopping_balance.html";
                  //     console.log(e);
                  //   }else{
                  //     alert(e.message);
                  //   }
                  // })
                  var pInfo="";
                  for(var i=0;i<data.items.length;i++){
                    if(pInfo){
                      pInfo+="|"+data.items[i].skuId+"_"+data.items[i].quantity;

                    }else{
                      pInfo=data.items[i].skuId+"_"+data.items[i].quantity;
                    }
                  }
                  window.location.href="personal/my_shopping_balance.html?act=quick&id="+id+"&info="+pInfo;
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
                 //加入购物车
                quotes:function (e){
                  var data=this.get_products_info();
              		//得到sku 商品数量
                  if(data.code==0){
                    data1=data.data;
                  }else{
                    return;
                  }
	                
      						var url = config.API_GATEWAY + "/td/quotes";
      	 					Api.post(url,data1,function(e) {
      	 						if(e.code==0){
                      swal({ 
                        title: "成功加入购物车！", 
                        //text: "2秒后自动关闭。", 
                        timer: 1000, 
                        showConfirmButton: false 
                      });
      	 							//window.location.href="personal/my_shopping_cart.html";
      	 							console.log(e);
      	 						}else{
      	 							alert(e.message);
      	 						}
      	 					})
						  
				        	console.log(data1);	  
                },
                //关注商品
                payshop:function(){
                	
                }
                
	        },
	        updata:function(){
             
	        },
	    });
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
var url = config.API_GATEWAY + "/mt/v2/shops/"+shopId+"/coupons";
	            	Api.get(url,function(e) {
	            		if(e.code==0){
                            pro_jingxuan_list.coupons = e.data.fullCutDirectCoupons;
                         }
	            	}); 
//评价
 var url = config.API_GATEWAY + "/mt/catalogs/"+cid+"/comments?pn=1&ps=20";
    	Api.get(url,function(e) {
    		if(e.code==0){
                pro_jingxuan_list.comments = e.data.items;
             }
    	}); 

  var url = config.API_GATEWAY + "/mt/catalogs/"+cid+"/comments/summary";
    	Api.get(url,function(e) {
    		if(e.code==0){
                pro_jingxuan_list.summary1 = e.data;
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