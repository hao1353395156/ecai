(function() {
	var user_log_on = new Vue({
      el:"#user_log_on",
      data:{
        phone:$("#phone").val(),//获取手机号
        phone_true:0,//手机号是否正确判断
        reference_phone_true:0,//判断推荐人手机号是否正确
        password:1,//判断密码是否输入
        checked:false,//判断是否勾选协议
        Submit_register:{
               code:'',
               userName:'',
               password:'',
               phone:'',
               reference:'',
            }//提交注册信息
        }
    });	

//判断手机号是否正确
   $("#phone").on("input propertychange",function(e){
		if(!/^1[3-9]{1}[0-9]{9}$/gi.test($("#phone").val())){
		   //alert("请输入正确的联系方式");
		    user_log_on.phone_true = 0;	
		 }
		 else{
		 	user_log_on.phone_true = 1;	
		 }
    });



   $("#reference").on("input propertychange",function(e){
		if(!/^1([3-8])+\d{9}$/.test($("#reference").val())){
		    user_log_on.reference_phone_true = 0;	
		 }
		 else{
		 	user_log_on.reference_phone_true = 1;
		 }
    });
//判断密码
   $("#password").on("input propertychange",function(e){
		if($("#password").val().length>6){
		    user_log_on.password = 0;	
		 }
		 else{
		 	user_log_on.password = 1;
		 }
		  // console.log(user_log_on.password);
    });
//获取手机验证码
	$(document).on("click","#get_phone",function(){
		var phone= $('#phone').val();
		var url = config.API_GATEWAY + "/us/users/register/code?phone="+phone;
		            	Api.post(url,{},function(e) {
		            		if(e.code==0){
										alert("验证码发送成功！");
									}else{
										alert("获取验证码失败！");
									}
			            });	
		window.Api = Api;
	});

//提交注册信息
	$(document).on("click","#Submit_register",function(){
     var userName=JSON.stringify(user_log_on.Submit_register.userName.length);
     if(user_log_on.checked){
		 if(user_log_on.phone_true==1 && user_log_on.password==0 && userName>1){	
			var url = config.API_GATEWAY + "/us/users/register"
			            	Api.post(url,user_log_on.Submit_register,function(e) {
								if(e.code==0){
										alert("注册成功");
										 window.location.href="login.html";
									}else{
										alert("请输入正确的验证码！");
									}
				            });	
			window.Api = Api;
		}else{
			alert("请填写完整的注册信息！");
		}
      }else{
			alert("请阅读仔细阅读协议内容");
		}
	});
   
})();