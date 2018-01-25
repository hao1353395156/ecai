
(function() {
	var fan = new Vue({
	      el:"#my_fan",
	      data:{
               fan_list:[],//返修列表
               fan_refund:'',//
               fan_status:1,//返修状态
	        },
	        methods : {

	        },
	    });
	//订单列表
	var url=config.API_GATEWAY + "/td/orders/exception?pn=1&ps=20";
	             Api.get(url,function(e){
		            	if(e.code==0){
		            	    fan.fan_list = e.data.items;
		            	    console.log(e.data.items);
		            	    for(var i=0;i<e.data.items.length;i++){

		            	   		console.log(e.data.items[i].refund);
		            		}
		            	    //fan.fan_refund = e.data.items.refund;
		            	    //console.log(fan.fan_refund.applyTime); 
		            	    // alert(e.data.items[0].refund.applyTime);	
		            	   }
		            });
	window.Api = Api;
})();