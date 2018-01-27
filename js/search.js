(function() {
var sid=$.cookie("provinceid");
var pn = $.getUrlParam("pn") || 1,
    ps = 20,      //页码
    cn = unescape($.getUrlParam("cn")),    //名称
    lp = $.getUrlParam("lp"),    //价格小 n-100
    tp = $.getUrlParam("tp"),    //价格大 0-n
    bd = $.getUrlParam("bd"), //品牌
    st = $.getUrlParam("st"),         //0普通 200 自营
    ca = $.getUrlParam("ca"), //分类
    tg = $.getUrlParam("tg"),     //标签
    sca = $.getUrlParam("sca"),   //店铺分类
    sp = $.getUrlParam("sp"),   //店铺id
    rk = $.getUrlParam("rk"),   //综合排序
    sn = $.getUrlParam("sn"), //销量排序
    pe = $.getUrlParam("pe");  //价格 0 底到高  1 高到底
    if(cn=="null")
      cn="";
 var search_fen = new Vue({
      el:"#search",
      data : {
          brands:'',//品牌
          categories:'',//一级分类
          level2:'',//2级分类
          prolist:'',//商品列表
          search_key:[],//搜索条件
          search_sql:{
                pn :  pn,
                ps : 20,      //页码
                cn : cn,    //名称
                lp : lp,    //价格小 n-100
                tp : tp,    //价格大 0-n
                bd : bd,     //品牌
                st : st,     //0普通 200 自营
                ca : ca,     //分类
                tg : tg,     //标签
                sca :sca,   //店铺分类
                sp : sp,   //店铺id
                rk : rk,   //综合排序
                sn : sn, //销量排序
                pe : pe,  //价格 0 底到高  1 高到底
          },//搜索url
        },
      methods : {
        search : function (e){
           var key=escape($("#search_key").val());
           if(key.length<1 ){
            swal("请输入关键字！");
            return;
           }
           window.location="search.html?cn="+key;
            
        },
        add_parse : function(name,value,index=0){
          //排序
          if(name=="rk" || name=="sn" || name=="pe"){
            this.search_sql.rk=0;
            this.search_sql.sn=0;
            this.search_sql.pe=null;
            $(".px_order").removeClass("selected");
            $(".px_order").eq(index).addClass("selected");
          }
          this.search_sql[name]=value;

          //价格范围
          if(name=="lp"){
            this.search_sql.lp=$("#lp").val();
          }
          if(name=="tp"){
            this.search_sql.tp=$("#tp").val();
          }

          this.ajax();
        },
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
                pn : this.search_sql.pn || 1,
                ps : this.search_sql.ps || 20,      //页码
                cn : this.search_sql.cn || null,    //名称
                lp : this.search_sql.lp || null,    //价格小 n-100
                tp : this.search_sql.tp || null,    //价格大 0-n
                bd : this.search_sql.bd || null, //品牌
                st : this.search_sql.st || null,         //0普通 200 自营
                ca : this.search_sql.ca || null, //分类
                tg : this.search_sql.tg || null,     //标签
                sca : this.search_sql.sca || null,   //店铺分类
                sp : this.search_sql.sp || null,   //店铺id
                rk : this.search_sql.rk || 1,   //综合排序
                sn : this.search_sql.sn || null, //销量排序
                pe : this.search_sql.pe || null,  //价格 0 底到高  1 高到底
             }
               //console.log(this.search_sql);
            var purl = "";
            var d=this.search_sql;
              for(var n in d){
                if (d[n] && d[n]!="null") {
                 purl+="&"+n+"="+d[n];
                 };
              }
              console.log(purl);
              var url = config.API_GATEWAY + "/mt/sites/"+sid+"/catalogs?"+purl;
                   Api.get(url,function(e) {
                         if(e.code==0){
                             search_fen.prolist = e.data.items;
                         }
              });
        }
      },
    });
search_fen.ajax();
//GET /mt/v2/catalogs

 
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