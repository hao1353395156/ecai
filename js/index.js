(function() {
	var utk=$.cookie("utk"),
	    id=$.cookie("id"); 
      provinceid=$.cookie("provinceid") || 86,
      swiper_loop=0; 
     // console.log(utk);
     var index = new Vue({
      el:"#index",
      data:{
          id:$.cookie("id") || 0,//用户id
          user:'',//用户信息
          adverts:'',//顶部广告图
          categories:'',//目录
          blocks:'',//板块名
          focus:'',//滚动广告图
          brands:'',//品牌列表
          blockList:[], 
          level2:'',//2级目录
          level3:'',//3级分类
          block_pro:'',//板块商品
          blocks_data:[],
          groupGoods:[], //拼单商品
        },
      methods:{
        search : function (e){
           var key=$("#search_key").val();
           if(key.length<1){
            swal("请输入关键字！");
            return;
           }
           var url="search.html?cn="+escape(key);

           window.location.href=url;
            
        },
        timeFromat : function(i,time){
          //建立定时器
         setInterval(function(){
            getTimeFromat(i,time);
         },1000);
         function getTimeFromat(i,time){
            var now= Date.parse(new Date());
            var day= Math.floor((time-now)/1000/3600/24); //天
            var hours= Math.floor((time-now)/1000/3600)-(day*24); //时
            var minute=Math.floor((time-now)/1000/60)-(day*24*60)-(hours*60); //分
            var second=Math.floor((time-now)/1000)-(day*24*3600)-(hours*3600)-(minute*60); //秒      
            $(".time_unshelfTime").eq(i).html("<span>"+day+"天</span>：<span>"+index.ten(hours)+"</span>：<span>"+index.ten(minute)+"</span>：<span>"+index.ten(second)+"</span>"); 
         }
         //加载时间倒计时
         getTimeFromat(i,time);
        },
        ten:function(num){
          if(num<10)
            return "0"+num;
          else
            return num;
        }
        // out_user : function(){
        // $.cookie("utk",'',{domain: config.COOKIE_DOMAIN, expires: 30, path: "/"});
        // $.cookie("id",'',{domain: config.COOKIE_DOMAIN, expires: 30, path: "/"});
        // }
      },
    });
     

    //拼单商品接入GET 
    var url = config.API_GATEWAY + "/mt/sites/"+provinceid+"/groupon?pn=1&ps=20";
    Api.get(url,function(e) {
      if(e.code==0){
        index.groupGoods=e.data.items;
      }
    });

function loading_brands(){
  console.log("blocks start");
  var block_id,
      url;
  for (var n=0;n<index.blocks.length;n++){
    block_id = index.blocks[n].id;
    console.log(block_id);
    url = config.API_GATEWAY + "/cms/blocks/"+block_id+"/items?pn=1&ps=200";
    Api.get(url,function(e) {
      console.log(e.data.items);
      if(e.code==0){
       index.blocks_data.push(e.data.items);
      }
    });
  }
  console.log(index.blocks_data);
}


function swg(){
  var swiper = new Swiper("#swg_banner", {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: 3000,
    autoplayDisableOnInteraction: true,
    allowTouchMove: false,
    loop:true,
  });
}
  //   //个人信息
  //   if(id){
		// var url = config.API_GATEWAY + "/us/users/"+id;
		//             	Api.get(url,function(e) {
		//                   if(e.code==0){
  //                             index.user = e.data
		//                   }
		// 	            });	
		// 	}
   //首页元素
   		var url = config.API_GATEWAY + "/cms/sites/"+provinceid+"/home";
                  Api.get(url,function(e) {
                    if(e.data.focus.length>=0){
                      for(var i=0;i<e.data.focus.length;i++){
                        e.data.focus[i].pcImg = config.ALI_OSS_GATEWAY + '/' + e.data.focus[i].pcImg + '?x-oss-process=image/resize,w_1200,h_450';
                            // console.log(e.data.focus[i].pcImg);
                       }
                    }
                      if(e.code==0){
                              index.adverts = e.data.adverts;
                              index.categories = e.data.categories;
                              index.blocks = e.data.blocks;
                              index.focus =  e.data.focus;
                              index.brands =  e.data.brands;
                              loading_brands();
                              setTimeout(function(){swg()},1000);
                              
                              
                              var blockTitle = e.data.blocks;
                              for (var i=0;i<blockTitle.length;i++){    
                                var url = config.API_GATEWAY + "/cms/blocks/"+blockTitle[i].id+"/items?pn=1&ps=200";
                                //console.log(url);
                                //同步获取数据  //封装中无同步
                                $.ajax({
                                  type : "GET",
                                  url : url,
                                  dataType : 'json',
                                  async: false,
                                  beforeSend : function(XMLHttpRequest) {
                                    XMLHttpRequest.setRequestHeader("utk", $.cookie("utk"));
                                    XMLHttpRequest.setRequestHeader("appId", config.APP_ID);
                                    XMLHttpRequest.setRequestHeader("atk", config.ACCESS_TOKEN);
                                  },
                                  success : function(msg) {
                                    if(msg.code==0){
                                        index.blockList.push({  //板块及数据
                                          "blocksTitle":blockTitle[i].title,
                                          "blocksId":blockTitle[i].id,
                                          "blocksData" :msg.data.items,
                                        });
                                        console.log("blockList:>>>>>>>>>"+blockTitle[i].id+"<<<"+blockTitle[i].title+">>>");
                                        //console.log(index.blockList); 
                                    }
                                  } 
                                }); 
                              }


                              
                               // console.log(JSON.stringify(index.blocks_list));
                      }

                  });
       //获取2级目录           
       $(document).on("mouseover",".sel-nav-item",function(){
         $(this).children().eq(2).addClass('show-second-nav')
         var cgid=$(this).attr("id");
         var url = config.API_GATEWAY + "/mt/categories/"+cgid+"/withChildren";
            Api.get(url,function(e) {
                   if(e.code==0){
                       index.level2 = e.data.level2[cgid];
                   }
             });
    }); 
     //获取3级目录  
    $(document).on("mouseover",".sel-nav-item1",function(){
        $(this).find(".th-nav").show();
        var tid=$(this).attr("id");
        var url = config.API_GATEWAY + "/mt/categories?cgid="+tid;
          Api.get(url,function(e) {
                     if(e.code==0){
                         index.level3 = e.data;
                     }
        });
          });
     $(document).on("mouseout",".sel-nav-item1",function(){
       $(this).find(".th-nav").hide();
       });
     //点击跳转搜索页
      $(document).on("click",".level3meun",function(){ 
       var  ca=$(this).attr('id');
           window.location="search.html?ca="+ca;
           alert("abc");
       });
     //板块1  
        
     
      // var url = config.API_GATEWAY + "/cms/blocks/"+aid1+"/items?pn=1&ps=200";
      //           Api.get(url,function(e) {
      //             if(e.code==0){
      //                       index.block_pro1 = e.data.items;
      //                       // console.log(JSON.stringify(pro_block.block_pro));
      //             }else{
      //               alert("请求失败！");
      //             }
      //           });                   	  
     
  window.Api = Api;
})();