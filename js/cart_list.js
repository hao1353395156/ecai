/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var cart_list = new Vue({
	      el:"#cart_list",
	      data:{
	          cart_info:[], //购物车信息
	          
	        },
	        methods:{
                basejian:function(e){
                	var dom=e.target;
                 	var n = $(".sku_jian").index(dom);
                 	if(this.skus[n].quantity>0)
                 		this.skus[n].quantity--;
                }
            }
	    });
		//得到购物车信息
		var url = config.API_GATEWAY + "/td/quotes";
			Api.get(url,function(e) {
				if(e.code==0){
					cart_list.cart_info = e.data;
					console.log(e);
				}else{
					alert(e.message);
				}
			});

	
 



	            	   	           	
	window.Api = Api;

})();