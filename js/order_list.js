/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var cart_list = new Vue({
	      el:"#cart_list",
	      data:{
	          
	      	abc:"",
	          
	        },
	        methods:{
	        	//全选
                ckeck_all_pro:function(e){
                	
     
                },
            }
	    });

		//我的收获地址
		// var url = config.API_GATEWAY + "/us/users/addresses";
  //   	Api.get(url,function(e) {
  //   		cart_list.address = e.data;
  //   		if (e.data.length>0){
  //   			cart_list.checked_pro_arr.addressId = e.data[0].id;
  //   			console.log("addressid:"+cart_list.checked_pro_arr.addressId);
  //   		}else{
  //   			cart_list.checked_pro_arr.addressId = 0;
  //   		}
  //       });
		
	            	   	           	
	window.Api = Api;

})();