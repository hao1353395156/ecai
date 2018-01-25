
(function() {
	var fight_alone = new Vue({
	      el:"#my_fight_alone",
	      data:{
	            order_list:[],///拼单列表
	            order_staus:0,//订单状态
	            order_status_list:
	            {
	             	dai:[],
	             	fa:[],
	             	shou:[],
	             	ping:[],
	            },

	        },
	        methods : {

	        },
	    });
	//拼单列表
	var url=config.API_GATEWAY + "/td/orders/groupon?pn=1&ps=20";
	             Api.get(url,function(e){
		            	if(e.code==0){
		            	    //order.order_list = e.data.items;
		            	    for (var i=0;i<e.data.items.length;i++){
			            	   	if(e.data.items[i].status==0){
			            	   		fight_alone.order_status_list.dai.push(e.data.items[i]);
			            	   		fight_alone.order_list.push(e.data.items[i]);
			            	   	}else if(e.data.items[i].status==200){
			            	   		fight_alone.order_status_list.fa.push(e.data.items[i]);
			            	   		fight_alone.order_list.push(e.data.items[i]);
			            	   	}else if(e.data.items[i].status==300){
			            	   		fight_alone.order_status_list.shou.push(e.data.items[i]);
			            	   		fight_alone.order_list.push(e.data.items[i]);
			            	   	}else if(e.data.items[i].status==400){
			            	   		fight_alone.order_status_list.ping.push(e.data.items[i]);
			            	   		fight_alone.order_list.push(e.data.items[i]);
			            	   	}
			            	   	
		            	   }
		            	   //console.log(order.order_status_list);
			            	   	//alert(order_status_list);

		            	}
		            });
	window.Api = Api;
})();