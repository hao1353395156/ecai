/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var id=$.getUrlParam("id") || 0;
	// console.log(shopId);
	var order_list = new Vue({
	      el:"#my_order_list",
	      data:{
              order_xxlist:{
              	address:{},

              },//订单详情
	        },
	        methods : {
              // coupon_wei : function(){
              // 	var url = config.API_GATEWAY + "/us/coupons?st=0&pn=1&ps=20";
              // 	        Api.get(url,function(e) {
		            // 		if(e.code==0){
	             //                sumary.coupon_wei = e.data.items
		            // 		}else{
		            // 			alert("请求失败！");
		            // 		}
			           //  });
              //     },
	         },
	    });
	//订单详情
		var url = config.API_GATEWAY + "/td/orders/"+id;
		            	Api.get(url,function(e) {
		            		if(e.code==0){
	                            order_list.order_xxlist = e.data;
		            		}else{
		            			alert("请求失败！");
		            		}
			            });
	window.Api = Api;
})();