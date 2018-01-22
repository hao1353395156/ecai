/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var cid=$.getUrlParam("cid") || 0;
	var shopId=$.getUrlParam("shopId") || 0;
	var pro_jingxuan_list = new Vue({
	      el:"#pro_jingxuan_list",
	      data:{
	          pro_xq:'',//商品详情
	          shop_item:'',//商铺信息
	          lbels:'',//商铺标签
	          skus:'',//商品规格
	          imgs:'',//商品图片
	          coupons:'',//商铺优惠卷
	          qieshow:0,//详情切换
	          comments:'',//评价信息
	          summary1:'',
	          address:'',//收货地址
	          sl:0,//购物车数量
	        },
	        methods:{
                basejian:function(e){
                	if(pro_jingxuan_list.sl>0){
                	pro_jingxuan_list.sl--;
                  }else{
                  	pro_jingxuan_list.sl=0;
                  }
                },
                
                 //加入购物车
                quotes:function (){

                	   var items={"quantity": quantity, "skuId":skuId};
	                   var data1={
						  addressId : 10068,
						  items : [items],
						  }
					console.log(data1);	  
                }
	        },
	        updata:function(){
             
	        },
	    });
	//商品详情
	var url = config.API_GATEWAY + "/mt/catalogs/"+cid;
	           Api.get(url,function(e) {
	            		if(e.code==0){
                            pro_jingxuan_list.pro_xq = e.data;
                            pro_jingxuan_list.skus = e.data.skus;
                            pro_jingxuan_list.imgs = e.data.imgs;
                            //setTimeout(function(){load_ad();},1000);
                            
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
		                            pro_jingxuan_list.shop_item = e.data;
		                         }
			                });

		           });

	           
 //商铺标签
   var url = config.API_GATEWAY + "/mt/shops/labels";
	            	Api.get(url,function(e) {
	            		if(e.code==0){
                            pro_jingxuan_list.lbels = e.data;
                         }
	            	});
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
		            });
	            	   	           	
	window.Api = Api;

})();