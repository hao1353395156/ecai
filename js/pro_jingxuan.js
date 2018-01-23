/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var aid=$.getUrlParam("aid") || 0;
	var provinceid=$.cookie("provinceid") || 86;
	console.log(aid);
	var pro_block = new Vue({
	      el:"#pro_block",
	      data:{
	          block_pro:'',
            brands:'',
	          blocks:'',//板块名
              focus:'',//滚动广告图
              aid:aid,
	        }
	    });
	 //首页元素
	 function swg(){
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
   		var url = config.API_GATEWAY + "/cms/sites/"+provinceid+"/home";
		            	Api.get(url,function(e) {
                    if(e.data.focus.length>=0){
                      for(var i=0;i<e.data.focus.length;i++){
                        e.data.focus[i].pcImg = config.ALI_OSS_GATEWAY + '/' + e.data.focus[i].pcImg + '?x-oss-process=image/resize,w_1200,h_450';
                            // console.log(e.data.focus[i].pcImg);
                       }
                    }
		                  if(e.code==0){
                              pro_block.adverts = e.data.adverts;
                              pro_block.categories = e.data.categories;
                              pro_block.blocks = e.data.blocks;
                              pro_block.focus =  e.data.focus;
                              pro_block.brands =  e.data.brands;
                              setTimeout(function(){swg()},1000);
                              
                               // console.log(JSON.stringify(index.blocks_list));
		                  }

			            });

	var url = config.API_GATEWAY + "/cms/blocks/"+aid+"/items?pn=1&ps=200";
	            	Api.get(url,function(e) {
	            		if(e.code==0){
                            pro_block.block_pro = e.data.items;
                            // console.log(JSON.stringify(pro_block.block_pro));
	            		}else{
	            			alert("请求失败！");
	            		}
		            });	            	
	window.Api = Api;
})();