/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var shopId=$.getUrlParam("shopId") || 0,
	    sp=$.getUrlParam("sp") || 0;
	console.log(shopId);
	var shop_index = new Vue({
	      el:"#shopindexlist",
	      data:{
	          block_pro:'',
	          block:'',//板块名称
	          blockspro:'',//板块商品
	          summary:'',//评分
              xiala:'1',
              shopId:shopId,
              sp:sp,
	        },
	        methods : {
	         },
	    });
	//
	var url = config.API_GATEWAY + "/mt/shops/"+shopId;
	            	Api.get(url,function(e) {
	            		if(e.code==0){
                            shop_index.block_pro = e.data;
                            shop_index.block = e.data.tags;//板块名称
                            // console.log(JSON.stringify(pro_block.block_pro));
	            		}else{
	            			alert("请求失败！");
	            		}
		            });
    //  //首页板块商品
    //  function shop_blockid(){

     var url = config.API_GATEWAY + "/mt/shops/"+shopId+"/catalogs?pn=1&ps=20&tg="+sp+"&rk=1";
	            	Api.get(url,function(e) {
	            		if(e.code==0){
                         shop_index.blockspro = e.data.items;    
	            		}else{
	            			alert("请求失败！");
	            		}
		            });
	   //   console.log(shop_index.blockspro); 
	   // }

	window.Api = Api;
})();