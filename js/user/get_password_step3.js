// (function() {
// 	var login_on = new Vue({
//       el:"#login",
//       data:{
//            login:{
//                phone:'',
//                password:'',
//            }
//         }
//     });	

// //登录
// 	$(document).on("click","#login_home",function(){
// 		var url = config.API_GATEWAY + "/us/users/login";
// 		            	Api.post(url,login_on.login,function(e) {
// 		                     if (e.code==0){
// 		                     	        $.cookie("utk",e.data.token);
// 										alert("登录成功");
// 										window.location.href="index.html";
// 									}else{
// 										alert("账号与密码不匹配，请重新输入");
// 										// var error=JSON.stringify(login_on.login.phone);
// 										// console.log(error);
// 										$('#phone').val('');
// 										$('#password').val('');
// 									}
// 			            });	
// 		window.Api = Api;
// 	});
   
// })();