
(function() {
	var order = new Vue({
	      el:"#my_order",
	      data:{
	            order_list:[],//消息列表
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
               //取消订单
               del_order : function(e){
                    var dom=e.target;
                    var id = $(dom).attr("orderid");
                     var url = config.API_GATEWAY + "/td/orders/"+id+"/cancel";
                     Api.put(url,{},function(e) {  
                        if(e.code==0){
                            swal({
                              title:"",
                              text:"<span style='color:red;font-size:24px;'>已成功取消订单！</span>",
                              //type:"warning",
                              confirmButtonText:"确认",
                              html:true
                            });
                          }
                     window.location.reload();
                     });
               },
               //提醒发货
               tixing_order : function(e){
                    var dom=e.target;
                    var id = $(dom).attr("orderid");
                     var url = config.API_GATEWAY + "/td/orders/"+id+"/remind";
                     Api.put(url,{},function(e) {  
                        if(e.code==0){
                            swal({
                              title:"",
                              text:"<span style='color:red;font-size:24px;'>您已成功提醒，请耐心等待！</span>",
                              //type:"warning",
                              confirmButtonText:"确认",
                              html:true
                            });
                          }else{
                          	swal({
                              title:"",
                              text:"<span style='color:red;font-size:24px;'>亲，您近一天内已经提醒卖家发货了，请耐心等候！</span>",
                              //type:"warning",
                              confirmButtonText:"确认",
                              html:true
                            });
                          }
                     });
               },
	        },
	    });
	//订单列表
	var url=config.API_GATEWAY + "/td/orders?pn=1&ps=20";
	             Api.get(url,function(e){
		            	if(e.code==0){
		            	    //order.order_list = e.data.items;
		            	    for (var i=0;i<e.data.items.length;i++){
			            	   	if(e.data.items[i].status==0){
			            	   		order.order_status_list.dai.push(e.data.items[i]);
			            	   		order.order_list.push(e.data.items[i]);
			            	   	}else if(e.data.items[i].status==200){
			            	   		order.order_status_list.fa.push(e.data.items[i]);
			            	   		order.order_list.push(e.data.items[i]);
			            	   	}else if(e.data.items[i].status==300){
			            	   		order.order_status_list.shou.push(e.data.items[i]);
			            	   		order.order_list.push(e.data.items[i]);
			            	   	}else if(e.data.items[i].status==400){
			            	   		order.order_status_list.ping.push(e.data.items[i]);
			            	   		order.order_list.push(e.data.items[i]);
			            	   	}
			            	   	
		            	   }
		            	   console.log(order.order_status_list);
			            	   	//alert(order_status_list);

		            	}
		            });
	window.Api = Api;
})();