/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var shopId=$.getUrlParam("shopId") || 0;
	// console.log(shopId);
	var shop_index = new Vue({
	      el:"#shopindex",
	      data:{
	          block_pro:'',
	          pcCarousel:'',//pc轮播图
	          block:'',//板块名称
	          blockspro:[],//板块商品
	          summary:'',//评分
              xiala:'1',
              pcAd:'',//广告图
	        },
	        methods : {
                point : function(){
  
                if(shop_index.xiala>1){
	               shop_index.xiala--;
	                }else{
	               shop_index.xiala++;

                 }
                }
	         },
	    });
	//
	var url = config.API_GATEWAY + "/mt/shops/"+shopId;
	            	Api.get(url,function(e) {
	            		if(e.code==0){
                            shop_index.block_pro = e.data;
                            shop_index.pcAd = e.data.pcAd;//广告图
                            shop_index.pcCarousel = e.data.pcCarousel;//pc轮播图
                            setTimeout(function(){shop_pcCarousel();},1000);
                            shop_index.block = e.data.tags;//板块名称
                            shop_blockid();
                            // console.log(JSON.stringify(pro_block.block_pro));
	            		}else{
	            			alert("请求失败！");
	            		}
		            });
     function shop_pcCarousel(){
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        });
     }
     //首页板块商品
     function shop_blockid(){
     for(var n=0;n<shop_index.block.length;n++){
     	// console.log(shop_index.block[n].id);
     	var tg = shop_index.block[n].id;
     var url = config.API_GATEWAY + "/mt/shops/"+shopId+"/catalogs?pn=1&ps=20&tg="+tg+"&rk=1";
	            	Api.get(url,function(e) {
	            		if(e.code==0){
                         shop_index.blockspro.push(e.data.items);    
	            		}else{
	            			alert("请求失败！");
	            		}
		            });
	     } 
	     console.log(shop_index.blockspro); 
	   }
	 //商铺摘要
	  var url = config.API_GATEWAY + "/mt/shops/"+shopId+"/summary";
	            	Api.get(url,function(e) {
	            		if(e.code==0){
                          shop_index.summary = e.data;
	            		}else{
	            			alert("请求失败！");
	            		}
		            });

	window.Api = Api;
})();