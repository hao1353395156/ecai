	/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var id=$.getUrlParam("id") || 0;
	// console.log(shopId);
	var li_pay_list = new Vue({
	      el:"#li_pay",
	      data:{
              li_paylist:{
              	address:{},
              	lineItems:{},

              },//订单详情
	        },
	        methods : {
	         },
	    });
//订单详情
		var url = config.API_GATEWAY + "/td/orders/"+id;
		            	Api.get(url,function(e) {
		            		if(e.code==0){
	                            li_pay_list.li_paylist = e.data;
		            		}else{
		            			alert("请求失败！");
		            		}
			            });
	window.Api = Api;
})();