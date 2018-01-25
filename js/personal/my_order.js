
(function() {
	var order = new Vue({
	      el:"#my_order",
	      data:{
	            order_list:'',//消息列表
	            order_staus:0,//订单状态
	            order_status_list:
	            {
	             	dai:0,
	             	fa:0,
	             	shou:0,
	             	ping:0,
	            },

	        },
	        methods : {

	        },
	    });
	//订单列表
	var url=config.API_GATEWAY + "/td/orders?pn=1&ps=20";
	             Api.get(url,function(e){
		            	if(e.code==0){
		            	    order.order_list = e.data.items;
		            	    for (var i=0;i<e.data.items.length;i++){
			            	   	if(e.data.items.status==0){
			            	   		order.order_status_list.dai++;
			            	   	}
			            	   	if(e.data.items.status==200){
			            	   		order.order_status_list.fa++;

			            	   	}
			            	   	if(e.data.items.status==300){
			            	   		order.order_status_list.shou++;

			            	   	}
			            	   	if(e.data.items.status==400){
			            	   		order.order_status_list.ping++;

			            	   	}

		            	   }
		            	}
		            });
	window.Api = Api;
})();