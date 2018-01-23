/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var profile = new Vue({
	      el:"#edit_profile",
	      data:{
             profile_chushi:'',//初始信息
	       },
	       methods:{
	       	    touxiang : function(){
		       		
		       	},
		       	submit_zl : function(){
		       	var datatime=$('#user_date').val();
		       	},
	       },
	    });
	//上传头像阿里云
	var url = config.API_GATEWAY + "/share/upload";
	//个人信息修改
	var url = config.API_GATEWAY + "/us/users";
	            	Api.put(url,{},function(e) {
	            		profile.profile_chushi = e.data
	            		// console.log(profile.profile_chushi.avatar);
	            		var search = e.target;//获取元素
                        
		            });	

 //    jQuery(function () { 
	// 	$("._box").click(function () { 
	// 	return $("#avatar").click(); 
	// 	}); 
	// }); 
	window.Api = Api;
})();