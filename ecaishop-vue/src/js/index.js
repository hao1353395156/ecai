(function() {
	var utk=$.cookie("utk"),
	    id=$.cookie("id"); 
      provinceid=$.cookie("provinceid"),
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
          level2:'',//2级目录
          level3:'',//3级分类
          block_pro:'',//板块商品
          blocks_data:[],
        },
      methods: function(){
      },
      watch : function(){
      },
      mounted : function(){
      },
      beforeUpdated : function(){
      },
      updated :function () {
        },
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
    //个人信息
    if(id){
		var url = config.API_GATEWAY + "/us/users/"+id;
		            	Api.get(url,function(e) {
		                  if(e.code==0){
                              index.user = e.data
		                  }
			            });	
			}
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