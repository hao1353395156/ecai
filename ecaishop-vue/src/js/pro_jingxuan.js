/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var aid=$.getUrlParam("aid") || 0;
	console.log(aid);
	var pro_block = new Vue({
	      el:"#pro_block",
	      data:{
	          block_pro:'',
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