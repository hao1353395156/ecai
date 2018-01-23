(function() {
    var code=$.getUrlParam("code") || 0;
     var phone=$.getUrlParam("phone") || 0;
	var getpassword = new Vue({
      el:"#get_password_step2",
      data:{
          password:'',
          password_ture:'',
        },
      methods:{
           ture:function(){
           data1={
				  code: code,
				  password: getpassword.password_ture,
				  phone: phone,
		     }
		    if(getpassword.password_ture != getpassword.password){ 
               var url = config.API_GATEWAY + "/us/users/forgetPassword";
                    Api.post(url,data1,function(e) {  
                       if(e.code==0){ 
                           window.location.href="get_password_step3.html";
                       }else{
                        alert("验证失败！请重新输入")
                          window.location.href="get_password.html";
                       }
                    });  
                }else{
                	alert("请保证密码一致！")
                }
            }
		  },
     });
	console.log(getpassword.password);
//判断密码是否6位已上
   $("#password").on("blur",function(e){
		if(!/^[\w]{6,12}$/.test($("#password").val())){
		   alert("请输入6-12位密码，含数字、字母和特殊字符");
		   $("#password").val("");
		 }
    });

   window.Api = Api;

})();