/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var apply = new Vue({
	      el:"#apply_shop2",
	      data:{
	         country:'',//省
             province:'',//市
             city:'',//区
	        },
	        methods : {
	         },
	    });
	//
  //   var input = document.getElementById("c_pic");
		// input.addEventListener('change',readFile,false);
		//  
		// function readFile(){ 
		// var file = this.files[0];
		// var file_json = JSON.stringify(file);
		// console.log(file_json); //打印出来是: {}
	 //   }
  //省
	var url = config.API_GATEWAY + "/us/countries/86/provinces";
	           Api.get(url,function(e){
	           	     if(e.code==0){
                        apply.country = e.data;
                    }
	           });

	 $('.cmbProvince').on('change',function(){
        var provinceId=parseInt($(this).val());
        // console.log(provinceId);
        if(provinceId)
          getCity(provinceId);      
     });
     //市
     function getCity(provinceId){
     var url = config.API_GATEWAY + "/us/provinces/"+provinceId+"/cities";
	           Api.get(url,function(e){
	           	     if(e.code==0){
                        apply.province = e.data;
                    }
	           });
     }

      $('.cmbCity').on('change',function(){
        var cityId=parseInt($(this).val());
        if(cityId)
          getArea(cityId);
     });

      //区
      function getArea(cityId){
      	 var url = config.API_GATEWAY + "/us/provinces/"+cityId+"/areas";
	           Api.get(url,function(e){
	           	     if(e.code==0){
                        apply.city = e.data;
                    }
	           });
      }
	window.Api = Api;
})();