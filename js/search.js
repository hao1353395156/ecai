(function() {
var sid=$.cookie("provinceid");
 var search_fen = new Vue({
      el:"#search",
      data : {
          brands:'',//品牌
          categories:'',//一级分类
          level2:'',//2级分类
          prolist:'',//商品列表
          search_key:[],//搜索条件
          search_sql:{
              bd:'',//品牌搜索
              ca:'',//分类搜索
              rk:'1',//综合排序
              sn:'',//销量排序
              pe:'',//价格排序 0低到高，1高到低  
          },//搜索url
        },
      methods : {
        addkey : function(e){
             var search = e.target;//获取元素
             var type = $(search).attr("type");
             var id = $(search).attr("id");
             //console.log(id);
             this.search_sql[type] = id;
             //var obj = {name:search.innerHTML,type:id};
             var obj = JSON.parse('{\"name\":\"'+search.innerHTML+'\",\"'+type+'\":\"'+id+'\"}');
             
             //console.log($.inArray(obj,this.search_key));
             passErr=false;
             for(var i=0;i<this.search_key.length;i++){
               // console.log(this.search_key[i][type]);
                if(id=this.search_key[i][type]){
                  passErr=true;
                  this.search_key[i][type]=id;
                  this.search_key[i]["name"]=search.innerHTML;
                }
             }
             if(!passErr)
             this.search_key.push(obj);
              //console.log(this.search_key.length);
             //this.search_sql[type] = eval('obj.'+type);
             //console.log(JSON.stringify(this.search_key.type2));
             //console.log("this.search_sql[type]"+this.search_sql[type]);
             this.ajax();
         },
        delkey : function(e){
             var search = e.target;//获取元素
             var type = $(search).attr("type");
             console.log(type);
             this.search_sql[type]=null;

             this.ajax();
             search.remove(); 
         },
        ajax : function(e){
             var data={
                 bd : this.search_sql.bd || null,
                 ca : this.search_sql.ca || null,
             }
               //console.log(this.search_sql);
            var purl = "";
            var d=this.search_sql;
              for(var n in d){
                if (d[n]) {
                 purl+="&"+n+"="+d[n];
                 };
              }
              console.log(purl);
              var url = config.API_GATEWAY + "/mt/sites/"+sid+"/catalogs?pn=1&ps=20&"+purl;
                   Api.get(url,function(e) {
                         if(e.code==0){
                             search_fen.prolist = e.data.items;
                         }
         });
        }
      },
    });


 
//品牌
 var url = config.API_GATEWAY + "/mt/brands";
        	Api.get(url,function(e) {
              if(e.code==0){
                  search_fen.brands = e.data
               }
            });	
//商品一级分类
 var url = config.API_GATEWAY + "/mt/categories";
        	Api.get(url,function(e) {
              if(e.code==0){
                  search_fen.categories = e.data
               }
            });	
//点击一级获取2级分类         
   $(document).on("click",".level2_list",function(){
     var cgid=$(this).attr("id");
     var url = config.API_GATEWAY + "/mt/categories?cgid="+cgid;
        Api.get(url,function(e) {
               if(e.code==0){
                   search_fen.level2 = e.data;
               }
         });
    });
//点击事件
//  $(document).on("click",".brandslist",function(){
//     var bd=$(this).attr("bd");
//          //获取商品列表
//     var url = config.API_GATEWAY + "/mt/sites/"+sid+"/catalogs?pn=1&ps=20&rk=1&bd="+bd;
//     console.log(url);
//          Api.get(url,function(e) {
//                if(e.code==0){
//                    search_fen.prolist = e.data.items;
//                }
//          });

// //   }); 
window.Api = Api;
})(window);