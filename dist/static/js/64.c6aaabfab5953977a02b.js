webpackJsonp([64],{"C+qK":function(t,s){},RB2d:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var _=e("7I1f"),r=e("L/hj"),a={data:function(){return{order_list:"",status:"",propel_msg:{},name:""}},created:function(){this.$store.state.title_name="城市合伙人个人中心",this.status=this.$route.query.status,this.get_data()},filters:{total:function(t,s,e){var _=0,a=r.a.jia2(s,e);return _+=r.a.accMul(t,a)},help:function(t){return 0==t?"待支付":1==t?"待发货":2==t?"待收货":3==t?"待评价":4==t?"退货中":5==t?"退货成功":6==t?"评价完成":7==t?"拒绝退货":8==t?"退款完成":9==t?"交易关闭":10==t?"订单已取消":11==t?"追评完成":""}},methods:{partner:function(t){this.$router.push({path:"/personal/salesman_info",query:{id:t}})},order_des_tap:function(t){this.$router.push({path:"/personal/one_order_detail",query:{id:t}})},get_data:function(){var t=this;this.$store.commit("show_looding"),Object(_.a)({url:"/api/order/getPartnerOrder",data:{status:this.$route.query.status},method:"post"}).then(function(s){console.log(s),200==s.data.status&&(t.order_list=s.data.data),t.$store.commit("hide_looding")})}}},n={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"order_detail"},[1==t.status?e("p",[t._v("在处理订单")]):t._e(),t._v(" "),3==t.status?e("p",[t._v("已确认订单")]):t._e(),t._v(" "),4==t.status?e("p",[t._v("已结算订单")]):t._e(),t._v(" "),""==t.order_list?e("div",[t._v("暂没有订单~")]):e("ul",t._l(t.order_list,function(s,_){return e("li",{key:_},[e("div",{staticClass:"order_number"},[t._v("订单号："+t._s(s.one_order_number))]),t._v(" "),e("div",{staticClass:"order_time"},[t._v("订单时间："+t._s(s.created_at))]),t._v(" "),e("div",{staticClass:"order_des"},[e("img",{attrs:{src:s.gpics,alt:""}}),t._v(" "),e("div",[e("p",[t._v(t._s(s.manufactor_name)+" "+t._s(s.show_title))]),t._v(" "),s.subject_info.color?e("p",[t._v("颜色/分类："+t._s(s.subject_info.color))]):t._e(),t._v(" "),s.subject_info.size?e("p",[t._v("尺寸："+t._s(s.subject_info.size))]):t._e(),t._v(" "),s.subject_info.caizhi?e("p",[t._v("材质："+t._s(s.subject_info.caizhi))]):t._e(),t._v(" "),e("p",[e("span",[t._v("￥"+t._s(s.price))]),t._v("\n              x "+t._s(s.num)+"\n            ")])])]),t._v(" "),e("div",{staticClass:"more"},[1!=t.status?e("p",{on:{click:function(e){return t.btn_tap(s.one_order_number,_)}}},[t._v("顾客评价")]):t._e(),t._v(" "),e("p",{on:{click:function(e){return t.order_des_tap(s.one_order_number)}}},[t._v("订单详情")])]),t._v(" "),8==s.staff_order_status?e("div",{staticClass:"tk"},[t._v("退款成功：-￥"+t._s(22))]):t._e(),t._v(" "),e("div",{staticClass:"order_status"},[t._v("\n          交易状态："+t._s(t._f("help")(s.staff_order_status))+"\n          "),8==s.staff_order_status?e("span",[t._v("退款成功")]):t._e()]),t._v(" "),e("div",{staticClass:"order_bot"},[e("div",[t._v("\n            1件佣金：\n            "),e("span",[t._v("￥"+t._s(s.partner_share_money))])]),t._v(" "),e("div",[t._v("\n            1件服务费：\n            "),e("span",[t._v("￥"+t._s(null==s.service_price?"0.00":s.service_price))])]),t._v(" "),e("div",{staticClass:"source"},[e("div",[t._v("\n              顾客来源：\n              "),0==s.salesman_user_id?e("p",[t._v("非业务员")]):e("p",[t._v(t._s(s.salesman_info.nickname))])]),t._v(" "),0!=s.salesman_user_id?e("p",{on:{click:function(e){return t.partner(s.salesman_user_id)}}},[t._v("业务员资料")]):t._e()]),t._v(" "),e("div",{staticClass:"total"},[e("p",[t._v("\n              共\n              "),e("span",[t._v(t._s(s.num))]),t._v(" 件商品\n            ")]),t._v(" "),e("p",[t._v("\n              服务费和佣金合计：\n              "),e("span",[t._v("￥"+t._s(t._f("total")(s.num,s.partner_share_money,s.service_price)))])])])])])}),0)])])},staticRenderFns:[]};var i=e("VU/8")(a,n,!1,function(t){e("C+qK")},"data-v-0a48b000",null);s.default=i.exports}});
//# sourceMappingURL=64.c6aaabfab5953977a02b.js.map