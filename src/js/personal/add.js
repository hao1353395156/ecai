/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */

(function() {
	var id=$.cookie("id") || 0; 
	var add = new Vue({
	      el:"#address",
	      data:{
             address:'',//收货地址
             country:'',//省
             province:'',//市
             city:'',//区
             phone_true:0,//手机号是否正确判断
             news_address:{
               	     areaId:'',
                     contacter:'',
                     mobile:'',
                     street:'',
                     userId:id,
                  },
             address_xiang:'',//地址详细信息
	       },
	       methods:{
             addressnews : function(e){
             	$('.newsadd').show();
             },
             none_xiao : function(e){
             	$('.newsadd').hide();
             	$('.oldadd').hide();
             },
             del_add : function(e){
                // var address = e.target;//获取元素
                // $(address).parent.parent('div')[0].style.display='none';
                var addressid = $(e.target).attr("id");
                // console.log(addressid);
                var url = config.API_GATEWAY + "/us/users/addresses/"+addressid;
	            	Api.del(url,function(e) {
	            		if(e.code==0){
	            			alert("删除成功！");
	            			window.location.reload();
	            		}
		            });	
             },
             moren : function(e){
             	var defaultid =  $(e.target).attr("id");
             	// console.log(defaultid);
                var url = config.API_GATEWAY + "/us/users/addresses/"+defaultid+"/default";
	            	Api.put(url,{},function(e) {
	            		console.log(e.code);
	            		if(e.code==0){
	            			window.location.reload();
	            		}
		            });	  
             },
             xiugai : function(e){
             	$('.oldadd').show();
             	var id =  $(e.target).attr("id");
             	var url = config.API_GATEWAY + "/us/users/addresses/"+id;
	            	Api.get(url,function(e) {
	            	      add.address_xiang = e.data
		            });	  
             }
	       },
	    });
	//收货地址
	var url = config.API_GATEWAY + "/us/users/addresses";
	            	Api.get(url,function(e) {
	            		add.address = e.data;
		            });	
	//省
	var url = config.API_GATEWAY + "/us/countries/86/provinces";
	           Api.get(url,function(e){
	           	     if(e.code==0){
                        add.country = e.data;
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
                        add.province = e.data;
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
                        add.city = e.data;
                    }
	           });
      }

     //判断手机号是否正确
   $("#phone").on("keyup",function(e){
		if(!/^1([3-8])+\d{9}$/.test($("#phone").val())){
		   //alert("请输入正确的联系方式");
		    add.phone_true = 0;	
		 }
		 else{
		 	add.phone_true = 1;	
		 }
    });
      //新增收货地址
     $(document).on("click","#Submit_register",function (){
       var contacter = JSON.stringify(add.news_address.contacter.length);
	       if(add.phone_true == 1 && contacter>3){
                var url = config.API_GATEWAY + "/us/users/addresses";
	           Api.post(url,add.news_address,function(e){
	           	     if(e.code==0){
                       alert('添加成功');
                    }else{
                       alert('请填写完整的收货地址！');
                    }
	           });
	       }else{
	       	alert('请填写完整的收货地址！');
	       }

     });
     //删除地址

     
window.Api = Api;
})();