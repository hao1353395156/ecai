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
		       		uploadFile();
		       	var datatime=$('#user_date').val();
		       	},
	       },
	    });
	//上传头像阿里云
	function uploadFile(){
		var fileBase64=$(".bg-avatar").css("background");
		var index=fileBase64.lastIndexOf("data:");
    	fileBase64=fileBase64.substring(index+5,fileBase64.length);

    	var file = $('#avatar').val();
    	console.log(file);
    	var form = new FormData(); 
    	form.append("file",file);

    	var fileObj = document.getElementById("avatar").files[0]; // js 获取文件对象
               if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
                   alert("请选择图片");
                   return;
               }
               var formFile = new FormData();
               //formFile.append("action", "UploadVMKImagePath");  
               formFile.append("file", fileObj); //加入文件对象





		//console.log(fileBase64);
		var url = config.API_GATEWAY + "/share/upload";
		Api.post(url,form,function(e) {
			//profile.profile_chushi = e.data
			// console.log(profile.profile_chushi.avatar);
			//var search = e.target;//获取元素
		    
		});	

	}

	

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