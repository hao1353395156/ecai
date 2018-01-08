/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var add = new Vue({
	      el:"#address",
	      data:{
             address:'',
	       },
	    });
	//个人信息修改
	var url = config.API_GATEWAY + "/us/users/addresses";
	            	Api.get(url,function(e) {
	            		add.address = e.data;
		            });	

	window.Api = Api;
})();