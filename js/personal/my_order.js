
(function() {
	var order = new Vue({
	      el:"#my_order",
	      data:{
             order_list:'',//消息列表
             order_staus:0,//订单状态
	        },
	        methods : {

	        },
	    });
	//订单列表
	var url=config.API_GATEWAY + "/td/orders?pn=1&ps=20";
	             Api.get(url,function(e){
		            	if(e.code==0){
		            	   order.order_list = e.data.items;
		            	 }
		            });
	window.Api = Api;
})();