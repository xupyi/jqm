webpackJsonp([68],{aEEp:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=i("7I1f"),o=i("8Vqo"),n=i("L/hj"),e={components:{Tabbar:o.a},data:function(){return{taocan_true:"",code:"",name:"",nav_index:"",is_shadow:!1,shop_lists:[],price:"0.00",is_radio:!1,active:i("FL6W"),nomore:i("PBIX"),all_data:"",total_num:0}},created:function(){this.$store.state.title_name="我的购物车",sessionStorage.activeid=3,this.$store.commit("show_looding"),sessionStorage.getItem("shop_index")?(this.nav_index=sessionStorage.getItem("shop_index"),this.get_list(sessionStorage.getItem("shop_index")),sessionStorage.removeItem("shop_index")):(this.nav_index=1,this.get_list(1))},methods:{big_img:function(t){this.$store.state.amplify_img=t},go_shop_detail:function(t){this.$router.push({path:"/shop_detail",query:{id:t}})},taocan_true_tap:function(t){this.taocan_true=this.taocan_true===t?"":t},sc_tap:function(t,s,i){var o=this;1==this.shop_lists[s].goods_list[i].is_collection?this.$toast("该商品已收藏"):Object(a.a)({url:"/api/addUserCollectionGoods",data:{goods_id:t},method:"post"}).then(function(t){console.log(t.data),o.$toast("收藏成功"),o.shop_lists[s].goods_list[i].is_collection=1})},nav_tap:function(t){this.nav_index=t,this.total_num=0,this.is_radio=!1,this.taocan_true="",this.get_list(t)},x_tap:function(){this.is_shadow=!1},customer_service:function(t,s){1==this.nav_index?(this.code=t,this.name="客服二维码"):(this.code=t,this.name=s),this.is_shadow=!this.is_shadow},select_tap:function(t,s,i){this.shop_lists[t].goods_list[s].is_add=!this.shop_lists[t].goods_list[s].is_add;for(var a=0,o=0;o<this.all_data.length;o++)this.all_data[o].is_add&&(a+=1);this.total_price(),this.is_radio=a==this.all_data.length},select_tap1:function(t){this.shop_lists[t].is_add=!this.shop_lists[t].is_add;for(var s=0,i=0;i<this.shop_lists.length;i++)this.shop_lists[i].is_add&&(s+=1);this.total_price(),this.is_radio=s==this.shop_lists.length},settle:function(){var t=this;if(0==this.total_num)this.$toast("请选择要购买的商品！");else{for(var s=[],i=1==this.nav_index?this.all_data:this.shop_lists,o=0;o<i.length;o++)i[o].is_add&&s.push(i[o].id);s.join();console.log(),Object(a.a)({url:"/api/cart/getCarListInfo",data:{cart_ids:s.join(),order_type:this.nav_index},method:"post"}).then(function(i){console.log(i.data),200==i.data.status?t.$router.push({path:"/settle",query:{cart_ids:s.join(),order_type:t.nav_index}}):t.$toast(i.data.msg)})}},all_select_tap:function(){if(this.is_radio=!this.is_radio,1==this.nav_index)if(this.is_radio)for(var t=0;t<this.all_data.length;t++)this.all_data[t].is_add=!0;else for(var s=0;s<this.all_data.length;s++)this.all_data[s].is_add=!1;else if(this.is_radio)for(var i=0;i<this.shop_lists.length;i++)this.shop_lists[i].is_add=!0;else for(var a=0;a<this.shop_lists.length;a++)this.shop_lists[a].is_add=!1;this.total_price()},chang:function(t,s,i,o){var n=this;console.log(t.target.value,111);var e=t.target.value;/^[1-9]{1,}[\d]*$/.test(e)||(this.$toast("最少选择一件商品"),e=1),Object(a.a)({url:"/api/changeCartNumber",data:{cart_id:s,status:1,num:e},method:"post"}).then(function(t){200==t.data.status&&(n.shop_lists[i].goods_list[o].num=e,n.total_price())})},order_jian:function(t,s,i){var o=this;Object(a.a)({url:"/api/changeCartNumber",data:{cart_id:t,status:0},method:"post"}).then(function(t){console.log(t.data),200==t.data.status&&(1==o.shop_lists[s].goods_list[i].num?o.$toast("最少选择一件商品！"):o.shop_lists[s].goods_list[i].num--,o.total_price())})},order_jia:function(t,s,i){var o=this;Object(a.a)({url:"/api/changeCartNumber",data:{cart_id:t,status:1},method:"post"}).then(function(t){console.log(t.data),200==t.data.status&&(o.shop_lists[s].goods_list[i].num++,o.total_price())})},total_price:function(){var t=0,s=0;if(1==this.nav_index){for(var i=0;i<this.all_data.length;i++)this.all_data[i].is_add&&(s++,t+=n.a.accMul(this.all_data[i].price,this.all_data[i].num));for(var a=0;a<this.shop_lists.length;a++){for(var o=0,e=0;e<this.shop_lists[a].goods_list.length;e++){var _=this.shop_lists[a].goods_list[e];_.is_add&&(o+=n.a.accMul(_.price,_.num))}this.shop_lists[a].all_total=n.a.jia1(o)}}else for(var l=0;l<this.shop_lists.length;l++)this.shop_lists[l].is_add&&(s++,t+=n.a.jia1(this.shop_lists[l].total_sum));this.total_num=s,console.log(t,11111),this.price=t.toFixed(2)},del_shop:function(t,s,i){var o=this;if(t)Object(a.a)({url:"/api/delCart",data:{cart_id:t},method:"post"}).then(function(t){if(console.log(t.data),200==t.data.status){if(o.$toast("删除成功"),o.total_price(),1==o.shop_lists[s].goods_list.length)return void o.shop_lists.splice(s,1);o.shop_lists[s].goods_list.splice(i,1)}});else{var n=[];if(1==this.nav_index)for(var e=0;e<this.all_data.length;e++)this.all_data[e].is_add&&n.push(this.all_data[e].id);else for(var _=0;_<this.shop_lists.length;_++)this.shop_lists[_].is_add&&n.push(this.shop_lists[_].id);console.log(n),""!=n?Object(a.a)({url:"/api/delCart",data:{cart_id:n.join()},method:"post"}).then(function(t){console.log(t.data),200==t.data.status&&(o.$toast("删除成功"),o.is_radio=!1,o.total_num=0,o.get_list(o.nav_index))}):this.$toast("请选择要删除的商品")}},del_shop1:function(t,s){var i=this;t&&Object(a.a)({url:"/api/delCart",data:{cart_id:t},method:"post"}).then(function(t){console.log(t.data),200==t.data.status&&(i.$toast("删除成功"),i.shop_lists.splice(s,1))})},get_list:function(t){var s=this;this.price="0.00",this.$store.commit("show_looding"),Object(a.a)({url:"/api/getUserCartList",data:{order_type:t},method:"post"}).then(function(i){if(console.log(i.data),s.$store.commit("hide_looding"),200==i.data.status){var a=[];if(""==i.data.data)s.shop_lists="";else for(var o=0;o<i.data.data.length;o++){var n=i.data.data[o];if(i.data.data[o].all_total="0",1==t)for(var e=0;e<n.goods_list.length;e++)n.goods_list[e].is_add=!1,a.push(n.goods_list[e]),s.all_data=a,s.shop_lists=i.data.data;else i.data.data[o].is_add=!1,s.shop_lists=i.data.data}}})}}},_={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("div",{staticClass:"shop"},[a("div",{staticClass:"nav"},[a("span",{class:1==t.nav_index?"fir":"",on:{click:function(s){return t.nav_tap(1)}}},[t._v("商品")]),t._v(" "),a("span",{class:4==t.nav_index?"fir":"",on:{click:function(s){return t.nav_tap(4)}}},[t._v("设计")]),t._v(" "),a("span",{class:3==t.nav_index?"fir":"",on:{click:function(s){return t.nav_tap(3)}}},[t._v("施工")]),t._v(" "),a("span",{class:2==t.nav_index?"fir":"",on:{click:function(s){return t.nav_tap(2)}}},[t._v("精装套餐")])]),t._v(" "),1==t.nav_index?a("section",{staticClass:"section_1"},[""==t.shop_lists?a("p",{staticClass:"iton"},[t._v("暂没有选购商品")]):a("ul",t._l(t.shop_lists,function(s,i){return a("li",{key:i},[a("div",{staticClass:"li_title"},[a("p",[t._v("\n              "+t._s(s.manufactor_name)+"\n              "),a("span",{on:{click:function(i){return t.customer_service(s.wx_qrcode)}}},[t._v("联系客服")])])]),t._v(" "),t._l(s.goods_list,function(s,o){return a("div",{key:o,staticClass:"li_cont",style:{background:s.is_add?"#FFF9E3":""}},[a("div",{staticClass:"goods_l"},[a("img",{staticClass:"select_img",attrs:{src:s.is_add?t.active:t.nomore},on:{click:function(a){return t.select_tap(i,o,s.id)}}}),t._v(" "),a("div",{staticClass:"goods_l_cont",on:{click:function(i){return t.go_shop_detail(s.good_id)}}},[a("img",{attrs:{src:s.gpics,alt:""}}),t._v(" "),a("div",{staticClass:"goods_cont"},[a("p",[t._v(t._s(s.show_title))]),t._v(" "),""!=s.subject_info.caizhi?a("p",[t._v("颜色/分类："+t._s(s.subject_info.caizhi))]):t._e(),t._v(" "),""!=s.subject_info.color?a("p",[t._v("尺寸："+t._s(s.subject_info.color))]):t._e(),t._v(" "),""!=s.subject_info.size?a("p",[t._v("材质："+t._s(s.subject_info.size))]):t._e(),t._v(" "),a("p",[a("span",[t._v("￥"+t._s(s.price))]),t._v(" "),a("span",[t._v("x "+t._s(s.num))])])])])]),t._v(" "),a("div",{staticClass:"goods_r"},[a("span",{on:{click:function(a){return t.sc_tap(s.good_id,i,o)}}},[t._v(t._s(1==s.is_collection?"已收藏":"移入收藏夹"))]),t._v(" "),a("span",{on:{click:function(a){return t.del_shop(s.id,i,o)}}},[t._v("删除")]),t._v(" "),a("div",{staticClass:"ipt"},[a("span",{staticClass:"number_j",on:{click:function(a){return t.order_jian(s.id,i,o)}}},[t._v("-")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:s.num,expression:"goods.num"}],attrs:{type:"number"},domProps:{value:s.num},on:{blur:function(a){return t.chang(a,s.id,i,o)},input:function(i){i.target.composing||t.$set(s,"num",i.target.value)}}}),t._v(" "),a("span",{staticClass:"number_j",on:{click:function(a){return t.order_jia(s.id,i,o)}}},[t._v("+")])])])])})],2)}),0)]):t._e(),t._v(" "),4==t.nav_index||3==t.nav_index||2==t.nav_index?a("section",{staticClass:"section_2"},[""==t.shop_lists&&4==t.nav_index?a("p",{staticClass:"iton"},[t._v("暂没有选购设计")]):t._e(),t._v(" "),""==t.shop_lists&&3==t.nav_index?a("p",{staticClass:"iton"},[t._v("暂没有选购施工")]):t._e(),t._v(" "),""==t.shop_lists&&2==t.nav_index?a("p",{staticClass:"iton"},[t._v("暂没有选购套餐")]):a("ul",t._l(t.shop_lists,function(s,i){return a("li",{key:i},[a("div",{staticClass:"li_title"},[a("div",{on:{click:function(s){return t.select_tap1(i)}}},[a("img",{attrs:{src:s.is_add?t.active:t.nomore,alt:""}}),t._v(" "),a("p",[t._v("\n                "+t._s(s.title)+"\n                "),a("span",{on:{click:function(i){return t.customer_service(s.customer_wx_qrcode,s.customer_name)}}},[t._v("联系客服")])])])]),t._v(" "),a("div",{staticClass:"li_cont"},[a("div",{style:{background:s.is_add?"#FFF9E3":""}},[a("div",{staticClass:"goods_l_cont"},[a("img",{attrs:{src:s.gpics,alt:""}}),t._v(" "),s.title?a("div",{staticClass:"goods_cont"},[a("p",[t._v(t._s(s.title)+"每平方米单价 "+t._s(parseInt(s.price))+" 元")]),t._v(" "),4==t.nav_index?a("p",[t._v("待设计房屋面积 "+t._s(s.area)+" 平方米")]):a("p",[t._v("待施工房屋面积 "+t._s(s.area)+" 平方米")]),t._v(" "),4==t.nav_index&&0!=s.design_user_id&&s.design_user_info?a("p",{staticClass:"zd_"},[a("span",[t._v("指定设计师：")]),t._v(" "),a("span",[a("span",[t._v(t._s(s.design_user_info.nickname))]),t._v(" "),a("span",[t._v(t._s(s.design_user_info.mobile))])])]):t._e()]):t._e()]),t._v(" "),a("div",{staticClass:"goods_r"},[a("span",{on:{click:function(a){return t.del_shop1(s.id,i)}}},[t._v("删除")]),t._v(" "),2==t.nav_index||4==t.nav_index?a("p",{on:{click:function(s){return t.taocan_true_tap(i)}}},[t._v("展开选项")]):t._e()])]),t._v(" "),t.taocan_true===i?a("div",{staticClass:"taocan_true",style:{background:s.is_add?"#FFF9E3":"white"}},[a("p",[t._v("项目内容："+t._s(s.user_choice_show_title))]),t._v(" "),a("div",t._l(s.user_choice_show_image,function(s,i){return a("img",{key:i,attrs:{src:s,alt:""},on:{click:function(i){return t.big_img(s)}}})}),0)]):t._e()])])}),0)]):t._e(),t._v(" "),t.is_shadow?a("div",{staticClass:"shadow",on:{touchmove:function(t){t.preventDefault()}}},[a("div",[a("p",{staticClass:"head"},[t._v("\n          "+t._s(t.name)+"\n          "),a("img",{attrs:{src:i("qw6E"),alt:""},on:{click:t.x_tap}})]),t._v(" "),a("div",{staticClass:"cont"},[a("img",{attrs:{src:t.code,alt:""}}),t._v(" "),a("p",[t._v("长按上面的二维码，关注客服微信号")])])])]):t._e()]),t._v(" "),a("footer",[a("div",{staticClass:"shop_l"},[a("img",{attrs:{src:t.is_radio?t.active:t.nomore,alt:""},on:{click:t.all_select_tap}}),t._v(" 全选\n      "),a("span",{on:{click:function(s){return t.del_shop()}}},[t._v("删除")])]),t._v(" "),a("div",{staticClass:"shop_r"},[a("div",{staticClass:"totle_price"},[a("span",[t._v("合计:")]),t._v(" "),a("span",[t._v("￥"+t._s(t.price))])]),t._v(" "),a("div",{staticClass:"settle",on:{click:t.settle}},[t._v("结算("+t._s(t.total_num)+")")])])]),t._v(" "),a("div",{staticClass:"foot"},[a("Tabbar")],1)])},staticRenderFns:[]};var l=i("VU/8")(e,_,!1,function(t){i("xBYJ")},"data-v-03a24461",null);s.default=l.exports},xBYJ:function(t,s){}});
//# sourceMappingURL=68.3411529798d3d63cb2e5.js.map