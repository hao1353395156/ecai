/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	// var shopId=$.getUrlParam("shopId") || 0;
	// console.log(shopId);
	var sumary = new Vue({
	      el:"#my_coupon",
	      data:{
              sumary_sl:'',//优惠卷数量
              coupon_wei:'',//未使用
              coupon_yi:'',//已使用
              coupon_guo:'',//已过期
              qieshow:1,
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
	//优惠卷摘要
		var url = config.API_GATEWAY + "/us/coupons/summary";
		            	Api.get(url,function(e) {
		            		if(e.code==0){
	                            sumary.sumary_sl = e.data
		            		}else{
		            			alert("请求失败！");
		            		}
			            });
    //未使用
    	var url = config.API_GATEWAY + "/us/coupons?st=0&pn=1&ps=20";
              	        Api.get(url,function(e) {
		            		if(e.code==0){
	                            sumary.coupon_wei = e.data.items;
	                            // console.log(sumary.coupon_wei);
		            		}else{
		            			alert("请求失败！");
		            		}
			            });
    //已使用
    	var url = config.API_GATEWAY + "/us/coupons?st=1&pn=1&ps=20";
              	        Api.get(url,function(e) {
		            		if(e.code==0){
	                            sumary.coupon_yi = e.data.items;
	                            // console.log(sumary.coupon_yi);
		            		}else{
		            			alert("请求失败！");
		            		}
			            });
    //已过期
    	var url = config.API_GATEWAY + "/us/coupons/expired?pn=1&ps=20";
              	        Api.get(url,function(e) {
		            		if(e.code==0){
	                            sumary.coupon_guo = e.data.items;
	                            // console.log(sumary.coupon_yi);
		            		}else{
		            			alert("请求失败！");
		            		}
			            });
	window.Api = Api;
})();