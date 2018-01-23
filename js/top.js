(function() {
	var utk=$.cookie("utk"),
      username=$.cookie("nickName"),
      avatar=$.cookie("avatar"),
      cityname=$.cookie("cityname"),  
      provinceid=$.cookie("provinceid") || 86,
      swiper_loop=0;
     // console.log(cityname);
     var top = new Vue({
      el:"#top",
      data:{
          id:$.cookie("id") || 0,//用户id
          user:username,//用户信息
          cityname:cityname,//城市名
        },
      // methods:{
      //   out_user : function(){
      //   $.cookie("utk",'',{domain: config.COOKIE_DOMAIN, expires: 30, path: "/"});
      //   $.cookie("id",'',{domain: config.COOKIE_DOMAIN, expires: 30, path: "/"});
      //   },
      // },
    });
      $(document).on("click","#out_user",function(){
         $.cookie("utk",'',{domain: config.COOKIE_DOMAIN, expires: 30, path: "/"});
         $.cookie("id",'',{domain: config.COOKIE_DOMAIN, expires: 30, path: "/"});
    });
     var top = new Vue({
      el:"#user_muen",
      data:{
          user:username,//用户信息
          avatar:avatar,//用户头像
        },
    }); 
      //个人信息
    // if(id){
    // var url = config.API_GATEWAY + "/us/users/"+id;
    //               Api.get(url,function(e) {
    //                   if(e.code==0){
    //                     top.user = e.data
    //                   }
    //               }); 
    //   }
// //组件
// var templateHeader = {
//     template:
//     `<div class="yd-head-l">
//             <div>
//                 <img src="../assets/首页.png" alt="">
//                 <a href="##">首页</a>
//             </div>
//             <div>
//                 <a href="choose_add.html"><span>切换城市</span></a>
//             </div>
//             <div class="yd-head-l-add">
//                 <img src="../assets/坐标.png" alt="">
//                 <a href="choose_add.html">全国</a>
//             </div>
//       </div>`,
//     data:function(){
//         return {
        
//         }
//     }
// };
// // 全局注册组件
// Vue.component('my-header',  templateHeader);

// //组件
// var templateHeader1 = {
//     template:
//     `<div class="yd-head-r">
//             <div>
//                 <div>
//                     <span><a href="personal/edit_profile.html">欢迎</a></span>
//                     <span style="margin-left: 12px"> <a href="user/login.html" @click="out_user">退出</a></span>
//                 </div>
//             </div>
//             <div>
//                 <span style="font-size: 12px">|</span>
//             </div>
//             <a href="我的订单.html">
//                 <span>我的订单</span>
//             </a>
//             <a href="我的e采.html">
//                 <span>我的e采</span>
//             </a>
//             <a href="#" style="display:none">
//                 <span>客户服务</span>
//             </a>
//             <a href="#">
//                 <span>手机e采</span>
//             </a>
//         </div>`,
//     data:function(){
//         return {
        
//         }
//     }
// };
// // 全局注册组件
// Vue.component('my-top',  templateHeader1);
   
  window.Api = Api;  
})();