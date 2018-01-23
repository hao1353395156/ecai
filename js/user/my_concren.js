(function() {
	var concren = new Vue({
      el:"#my_concren",
      data:{
          favoriate:'',//收藏商品列表
          favoriate_length:'',//商品数量
        },
      methods:{

        },
    });	
    //个人信息修改
	var url = config.API_GATEWAY + "/us/catalogs/favoriate?pn=1&ps=20";
	            	Api.get(url,function(e) {
	            		concren.favoriate = e.data.items;
	            		concren.favoriate_length = e.data.items.length;
		            });
//登录
	window.Api = Api;
   
})();