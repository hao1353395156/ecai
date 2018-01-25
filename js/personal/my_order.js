
(function() {
	var order = new Vue({
	      el:"#my_order",
	      data:{
	            order_list:[],//消息列表
	            order_staus:0,//订单状态
	            order_status_list:
	            {
<<<<<<< Updated upstream
	             	dai:0,
	             	fa:0,
	             	shou:0,
	             	ping:0,
=======
	             	dai:[],
	             	fa:[],
	             	shou:[],
	             	ping:[],
>>>>>>> Stashed changes
	            },

	        },
	        methods : {

	        },
	    });
	//订单列表
	var url=config.API_GATEWAY + "/td/orders?pn=1&ps=20";
	             Api.get(url,function(e){
		            	if(e.code==0){
<<<<<<< Updated upstream
		            	    //order.order_list = e.data.items;
		            	    for (var i=0;i<e.data.items.length;i++){
			            	   	if(e.data.items[i].status==0){
			            	   		order.order_status_list.dai++;
			            	   		order.order_list.push(e.data.items[i]);
			            	   	}else if(e.data.items[i].status==200){
			            	   		order.order_status_list.fa++;
			            	   		order.order_list.push(e.data.items[i]);
			            	   	}else if(e.data.items[i].status==300){
			            	   		order.order_status_list.shou++;
			            	   		order.order_list.push(e.data.items[i]);
			            	   	}else if(e.data.items[i].status==400){
			            	   		order.order_status_list.ping++;
			            	   		order.order_list.push(e.data.items[i]);
=======
		            	    order.order_list = e.data.items;
		            	    for (var i=0;i<e.data.items.length;i++){
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

>>>>>>> Stashed changes
			            	   	}
			            	   	
		            	   }
		            	   console.log(order.order_status_list);
			            	   	//alert(order_status_list);

		            	}
		            });
	window.Api = Api;
})();