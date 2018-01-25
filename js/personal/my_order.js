
(function() {
	var order = new Vue({
	      el:"#my_order",
	      data:{
	            order_list:'',//消息列表
	            order_staus:0,//订单状态
	            order_status_list:
	            {
	             	all:[],
	             	dai:[],
	             	fa:[],
	             	shou:[],
	             	ping:[],
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
		            	    for (var i=0;i<e.data.items.length;){
			            	   	if(e.data.items.status==0){
			            	   		order.order_status_list.dai.push(e.data.items[i]);

			            	   	}
			            	   	if(e.data.items.status==200){
			            	   		order.order_status_list.fa.push(e.data.items[i]);

			            	   	}
			            	   	if(e.data.items.status==300){
			            	   		order.order_status_list.shou.push(e.data.items[i]);

			            	   	}
			            	   	if(e.data.items.status==400){
			            	   		order.order_status_list.ping.push(e.data.items[i]);

			            	   	}

		            	   }
		            	}
		            });
	window.Api = Api;
})();