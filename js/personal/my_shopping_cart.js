/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
	var cart_list = new Vue({
	      el:"#cart_list",
	      data:{
	          cart_info:[], //购物车信息
	          check_pro:[], //已选中的商品
	          address:'',//收货地址
	          checked_pro_arr:{
	          	idGroup:[], //id组
	          	len:0,//
	          	cash:0,
	          	addressId:0,
	          	items:[],//当用选中的数据
	          },

	          
	        },
	        methods:{
	        	//全选
                ckeck_all_pro:function(e){
                	var dom=e.target;
                	if(dom.checked){
                		$(".check_all").prop("checked",true);
                		$(".check_pro").prop("checked",true);
                		$(".check_shop").prop("checked",true);
                		
                	}
                	else{
                		$(".check_pro").prop("checked",false);
                		$(".check_all").prop("checked",false);
                		$(".check_shop").prop("checked",false);
                	}
                	get_i();
     
                },
                //商铺全选
                check_shop:function(e){
                	var dom=e.target;
                	var n= $(".check_shop").index(dom);
                	if(dom.checked){
                		$(".check_shop_dom").eq(n).find("input").prop("checked",true);
                	}else{
                		$(".check_shop_dom").eq(n).find("input").prop("checked",false);
                	}
                	get_i();
                	
                },
                //单个选择
                check_pro_in:function(e){
                	var dom=e.target;
                	var id = dom.value;
                	get_i();
                	//var cash = dom.cash;
                	//alert(id);

                },
                //下单
                orderIn : function(e){
                	var addressId=this.checked_pro_arr.addressId,
                		id = this.cart_info.id,
                		invoiceId=null,
                		items=this.checked_pro_arr.items;

                	var obj={
                			addressId:addressId,
                			id:id,
                			invoiceId:invoiceId,
                			items:items,
                		}
                		console.log(obj);

                	//var orderIds=this.checked_pro_arr.idGroup;
                	if(addressId<=0){
            			alert("请选择地址，或新增地址！");
            			return ;
            		}
            		if(items.length<=0){
            			alert("请选择要结算的商品！");
            			return ;
            		}
            		var url = config.API_GATEWAY + "/td/orders/h5";
    				Api.post(url,obj,function(e) {
    					if(e.code==0){
    						window.location="my_order.html";

    					}else{
    						alert(e.message);
    					}
    					console.log(e);
            		});

                },
                //选择地址
                changeAddress:function(e){
                	var dom=e.target;
                	var n = dom.value;
                	console.log("addressid:"+n);
                	this.addressId=n;
                },
            }
	    });

// 		var temp={
//   "addressId": 10001,
//   "id": 0,
//   "invoiceId": 0,
//   "items": [
//     {
//       "key": {
//         "couponId": 0,
//         "id": 0,
//         "remark": "string"
//       },
//       "value": [
//         {
//           "id": 10000,
//           "quantity": 0,
//           "skuId": 10000
//         }
//       ]
//     }
//   ],
//   "payMethod": "string",
//   "returnUrl": "http://www.360ecmall.com/",
//   "userId": 0
// }
		//我的收获地址
		var url = config.API_GATEWAY + "/us/users/addresses";
    	Api.get(url,function(e) {
    		cart_list.address = e.data;
    		if (e.data.length>0){
    			cart_list.checked_pro_arr.addressId = e.data[0].id;
    			console.log("addressid:"+cart_list.checked_pro_arr.addressId);
    		}else{
    			cart_list.checked_pro_arr.addressId = 0;
    		}
        });
		//得到勾选的产品列表
		function get_i(){
			var checkedDom=$(".check_pro:checked");
			var arr=[];
			var items=[];
			var cash_all=0;
                for(var i=0;i<checkedDom.length;i++){
                	var id=parseInt(checkedDom[i].value); //得到当前选中的id
                	var cash=parseFloat($(checkedDom[i]).attr("cash")); //得到当前选中的id
                	var shop_index= $(checkedDom[i]).attr("index");
                	var pro_index= $(checkedDom[i]).attr("i");
                	arr.push(id);
                	console.log(cash)
                	cash_all+=parseFloat(cash);
                	var temp_item={
				      key: {
				        couponId: 0,
				        id: cart_list.cart_info.lineItems[shop_index].key.id,
				        remark: "",
				      },
				      value: [
				        {
				          id: id,
				          quantity: cart_list.cart_info.lineItems[shop_index].value[pro_index].quantity,
				          skuId: cart_list.cart_info.lineItems[shop_index].value[pro_index].skuId,
				        }
				      ]
				    }
				    items.push(temp_item);
				    console.log(temp_item);
                }
            cart_list.checked_pro_arr.idGroup=arr;
            cart_list.checked_pro_arr.items=items;
            cart_list.checked_pro_arr.len=arr.length;
            cart_list.checked_pro_arr.cash=cash_all;
            console.log(cart_list.checked_pro_arr);
		}
		//得到购物车信息
		var url = config.API_GATEWAY + "/td/quotes";
			Api.get(url,function(e) {
				if(e.code==0){
					cart_list.cart_info = e.data;
					console.log(e);
				}else{
					alert(e.message);
				}
			});

	            	   	           	
	window.Api = Api;

})();