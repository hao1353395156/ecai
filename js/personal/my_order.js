/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var shopId=$.getUrlParam("shopId") || 0;
	// console.log(shopId);
	var order = new Vue({
	      el:"#my_order",
	      data:{
             wuliiu_news:'',//消息列表
	        },
	        methods : {

	         },
	    });
	// 
	var url = config.API_GATEWAY + "/us/users/messages?pn=1&ps=20";
	            	Api.get(url,function(e){
	            		if(e.data.records>0){
	            	   order.wuliiu_news = e.data.items;
	            	 }else{
	            	 	order.wuliiu_news = 0;
	            	 	// console.log(news.wuliiu_news);
	            	 }

		            });
	window.Api = Api;
})();