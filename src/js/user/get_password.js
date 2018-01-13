(function() {

	var getpassword = new Vue({
      el:"#back_password",
      data:{
           phone:'',//手机号
           code:'',//密码
        },
      methods:{
        //获取验证码
  			getphone:function(){
          if(/^1([3-8])+\d{9}$/.test($("#phone").val())){
  				var url = config.API_GATEWAY + "/us/users/forgetPassword/code?phone="+getpassword.phone;
                    Api.post(url,getpassword.phone,function(e) {  
                      if(e.data==0){ 
                          alert("验证码已发送");
                       }
                    }); 
             }else{
              alert("请输入正确的手机号！")
              }
            },
         //提交  
        subxinxi:function(){
          data1={
            phone:getpassword.phone,//手机号
            code:getpassword.code,//密码
          }
          // console.log(data1);
            var url = config.API_GATEWAY + "/us/users/forgetPassword/verify";
                    Api.post(url,data1,function(e) {  
                       if(e.data==true){ 
                           window.location.href="get_password_step2.html?phone="+getpassword.phone+"&code="+getpassword.code;
                       }else{
                        alert("请输入正确的验证码！")
                       }
                    }); 
          },
		    },
     });
   window.Api = Api;

})();