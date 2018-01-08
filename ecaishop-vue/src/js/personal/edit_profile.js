/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var profile = new Vue({
	      el:"#edit_profile",
	      data:{
             
	       },
	    });
	//个人信息修改
	var url = config.API_GATEWAY + "/us/users";
	            	Api.put(url,{},function(e) {
	            		
		            });	

	window.Api = Api;
})();