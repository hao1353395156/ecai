/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var choose= new Vue({
      el:"#choose_add",
      data:{
        country:'',
        description:'',
        },
       methods:{
       
       }, 
    });	
	var url = config.API_GATEWAY + "/us/countries/86/provinces";
	            	Api.get(url, function(e) {
	            		if(e.code==0){
                            choose.country = e.data;
	            		}
		            });
	$(document).on("click","#countryid",function(){
            var pid=$(this).attr("countryid");
			var url = config.API_GATEWAY + "/cms/provinces/"+pid+"/sites";
				            	Api.get(url, function(e) {
				            		if(e.code==0){
			                          choose.description = e.data;
                                  // $.cookie("provinceid",e.data.id,{domain: config.COOKIE_DOMAIN, expires: 30, path: "/"});
				            		}
					            });	
		
	});	
	  $(document).on("click",".provinceid",function(){
               var provinceid=$(this).attr("provinceid");
               $.cookie("provinceid",provinceid,{domain: config.COOKIE_DOMAIN, expires: 30, path: "/"});
               window.location.href="index.html";
	  });       	
	window.Api = Api;
})();