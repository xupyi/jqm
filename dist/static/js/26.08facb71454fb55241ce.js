webpackJsonp([26],{K5Ug:function(t,s){},TDgH:function(t,s,o){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var _=o("7I1f"),e={data:function(){return{code:"",ul_lists:["全部","待付款","待发货","待收货"],num:0,order_list:"",is_shadow:!1,qr_isshadow:!1,tk_shadow:!1,del_shadow1:!1,one_order_number:"",qx_shadow:!1,price:"",i:"",brand_customer:"",wx_qrcode:""}},created:function(){this.$route.query.status?(this.num=this.$route.query.status,this.get_data(this.$route.query.status)):this.get_data("")},filters:{help:function(t){return 0==t?"待支付":1==t?"待发货":2==t?"待收货":3==t?"待评价":4==t?"退货中":5==t?"退货成功":6==t?"评价完成":7==t?"拒绝退货":8==t?"退款完成":9==t?"交易关闭":10==t?"订单已取消":11==t?"追评完成":""}},methods:{qr_shadow:function(t){this.one_order_number=t,this.qr_isshadow=!0},confirm:function(){this.tk_shadow=!1,2==this.i?this.$router.push({path:"/refund",query:{id:this.one_order_number,is:!0,price:this.price}}):this.$router.push({path:"/refund",query:{id:this.one_order_number,price:this.price}})},tk_show:function(t,s,o){this.tk_shadow=!0,this.i=s,this.price=o,this.one_order_number=t},qx_order_tap:function(t){this.qx_shadow=!0,this.one_order_number=t},x_tap:function(){this.is_shadow=!1},customer_service:function(t,s){this.brand_customer=s,this.wx_qrcode=t,this.is_shadow=!this.is_shadow},li_tap:function(t){this.num=t,this.get_data(0==t?"":t-1)},get_data:function(t){var s=this;this.$store.commit("show_looding"),Object(_.a)({url:"/api/order/UserOrderList",data:{order_type:1,status:t},method:"post"}).then(function(t){s.$store.commit("hide_looding"),console.log(t.data.data),200==t.data.status&&(s.order_list=t.data.data)})},settle_tap:function(t){var s=this;Object(_.a)({url:"/api/order/getOnePayParameter",data:{id:t,request_type:"pc"},method:"post"}).then(function(t){console.log(t),200==t.data.status?window.location.href=t.data.data.billQRCode:s.$toast("支付失败")})},quxiao:function(){var t=this;this.$store.commit("show_looding"),Object(_.a)({url:"/api/order/cancelOrder",data:{one_order_number:this.one_order_number},method:"post"}).then(function(s){console.log(s),200==s.data.status&&(t.$toast("订单已取消"),t.get_data(""),t.qx_shadow=!1),t.$store.commit("hide_looding")})},confirm_tap:function(){var t=this;Object(_.a)({url:"/api/order/ConfirmReceipt",data:{one_order_number:this.one_order_number},method:"post"}).then(function(s){console.log(s),200==s.data.status?(t.$toast("已确认收货"),t.$router.push({path:"/shop_assess",query:{id:t.one_order_number}})):t.$toast(s.data.msg)})},no_show:function(){this.qr_isshadow=!1,this.qx_shadow=!1,this.tk_shadow=!1,this.del_shadow1=!1,this.one_order_number="",this.price="",this.i=""},del_tap:function(t,s){this.one_order_number=t,this.i=s,this.del_shadow1=!0},del_qd_tap:function(){var t=this;Object(_.a)({url:"/api/order/deleteUserOrder",data:{one_order_number:this.one_order_number},method:"post"}).then(function(s){console.log(s),200==s.data.status&&(t.$toast("订单已删除"),t.get_data(""),t.del_shadow1=!1),t.$store.commit("hide_looding")})}}},n={render:function(){var t=this,s=t.$createElement,_=t._self._c||s;return _("div",{staticClass:"shop_order"},[_("nav",[_("ul",t._l(t.ul_lists,function(s,o){return _("li",{key:o,class:o==t.num?"fir":"",on:{click:function(s){return t.li_tap(o)}}},[t._v(t._s(s))])}),0)]),t._v(" "),_("main",[""==t.order_list?_("p",{staticClass:"condition"},[t._v("您还没有相关的订单哦~")]):_("ul",t._l(t.order_list,function(s,o){return _("li",{key:o},[_("div",{staticClass:"shop_number"},[_("p",[t._v("订单号："+t._s(s.one_order_number))]),t._v(" "),_("span",{on:{click:function(o){return t.customer_service(s.wx_qrcode,s.brand_customer)}}},[t._v("联系客服")])]),t._v(" "),_("div",{staticClass:"shop_time"},[t._v("订单时间："+t._s(s.created_at))]),t._v(" "),_("div",{staticClass:"shop_des"},[_("img",{attrs:{src:s.gpics,alt:""}}),t._v(" "),s.subject_info?_("div",[_("p",[t._v(t._s(s.manufactor_name)+" "+t._s(s.show_title))]),t._v(" "),s.subject_info.color?_("p",[t._v("\n              颜色/分类：\n              "),_("span",[t._v(t._s(s.subject_info.color))])]):t._e(),t._v(" "),s.subject_info.size?_("p",[t._v("\n              尺寸：\n              "),_("span",[t._v(t._s(s.subject_info.size))])]):t._e(),t._v(" "),s.subject_info.caizhi?_("p",[t._v("\n              材质：\n              "),_("span",[t._v(t._s(s.subject_info.caizhi))])]):t._e(),t._v(" "),_("div",{staticClass:"price_"},[1==s.is_promo?_("del",[t._v("￥"+t._s(s.original_price))]):t._e(),t._v(" "),_("span",[t._v("￥"+t._s(s.price))]),t._v("\n              x "+t._s(s.num)+"\n            ")])]):t._e()]),t._v(" "),8==s.goods_status?_("div",{staticClass:"shop_tkg"},[_("span",[t._v("退款成功：-￥"+t._s(s.refund_price))])]):t._e(),t._v(" "),_("div",{staticClass:"shop_status"},[_("p",[t._v("\n            交易状态："+t._s(t._f("help")(s.goods_status))+"\n            "),8==s.goods_status?_("span",[t._v("退款成功")]):t._e()])]),t._v(" "),_("div",{staticClass:"shop_more"},[0==s.goods_status?_("span",{on:{click:function(o){return t.settle_tap(s.id)}}},[t._v("立即付款")]):t._e(),t._v(" "),0==s.goods_status?_("span",{on:{click:function(o){return t.qx_order_tap(s.one_order_number)}}},[t._v("取消订单")]):t._e(),t._v(" "),2==s.goods_status?_("span",{on:{click:function(o){return t.qr_shadow(s.one_order_number)}}},[t._v("确认并评价")]):t._e(),t._v(" "),6==s.goods_status&&0==s.is_thirty_evaluate?_("router-link",{attrs:{to:{path:"/shop_assess",query:{id:s.one_order_number,type:0}}}},[t._v("追加评论")]):t._e(),t._v(" "),2==s.goods_status?_("router-link",{attrs:{to:{path:"/wuliu",query:{id:s.one_order_number}}}},[t._v("查看物流")]):t._e(),t._v(" "),1==s.goods_status?_("span",{on:{click:function(o){return t.tk_show(s.one_order_number,s.goods_status,s.total_sum)}}},[t._v("申请退款")]):t._e(),t._v(" "),2==s.goods_status?_("span",{on:{click:function(o){return t.tk_show(s.one_order_number,s.goods_status,s.total_sum)}}},[t._v("退货退款")]):t._e(),t._v(" "),3==s.goods_status&&0==s.is_thirty_evaluate?_("router-link",{attrs:{to:{path:"/shop_assess",query:{id:s.one_order_number}}}},[t._v("去评价")]):t._e(),t._v(" "),0==s.goods_status||1==s.goods_status||2==s.goods_status||3==s.goods_status?_("router-link",{attrs:{to:{path:"/shop_order_detail",query:{id:s.one_order_number}}}},[t._v("订单详情")]):t._e(),t._v(" "),5==s.goods_status||6==s.goods_status||8==s.goods_status||9==s.goods_status||10==s.goods_status||11==s.goods_status?_("span",{on:{click:function(o){return t.del_tap(s.one_order_number)}}},[t._v("删除订单")]):t._e()],1),t._v(" "),_("div",{staticClass:"shop_total"},[_("p",[t._v("\n            共\n            "),_("span",[t._v(t._s(s.num))]),t._v(" 件商品\n          ")]),t._v(" "),_("p",[t._v("\n            合计：\n            "),_("span",[t._v("￥"+t._s(s.total_sum))])])])])}),0)]),t._v(" "),t.is_shadow?_("div",{staticClass:"shadow",on:{touchmove:function(t){t.preventDefault()}}},[_("div",[_("p",{staticClass:"head"},[t._v("\n        "+t._s(t.brand_customer)+"\n        "),_("img",{attrs:{src:o("qw6E"),alt:""},on:{click:t.customer_service}})]),t._v(" "),_("div",{staticClass:"cont"},[_("img",{attrs:{src:t.wx_qrcode,alt:""}}),t._v(" "),_("p",[t._v("长按上面的二维码，关注客服微信号")])])])]):t._e(),t._v(" "),t.qr_isshadow?_("div",{staticClass:"shadow",on:{touchmove:function(t){t.preventDefault()}}},[_("div",[t._m(0),t._v(" "),_("div",{staticClass:"shadow_btn"},[_("span",{on:{click:t.no_show}},[t._v("取消")]),t._v(" "),_("div",{staticClass:"shadow_btn_line"}),t._v(" "),_("span",{on:{click:function(s){return t.confirm_tap()}}},[t._v("确定")])])])]):t._e(),t._v(" "),t.qx_shadow?_("div",{staticClass:"shadow",on:{touchmove:function(t){t.preventDefault()}}},[_("div",[t._m(1),t._v(" "),_("div",{staticClass:"shadow_btn"},[_("span",{on:{click:t.no_show}},[t._v("取消")]),t._v(" "),_("div",{staticClass:"shadow_btn_line"}),t._v(" "),_("span",{on:{click:function(s){return t.quxiao()}}},[t._v("确定")])])])]):t._e(),t._v(" "),t.tk_shadow?_("div",{staticClass:"shadow",on:{touchmove:function(t){t.preventDefault()}}},[_("div",[_("div",{staticClass:"cont qx_cont"},[2==t.i?_("p",[t._v("确定要退货退款吗？")]):_("p",[t._v("确定要退款吗？")])]),t._v(" "),_("div",{staticClass:"shadow_btn"},[_("span",{on:{click:t.no_show}},[t._v("取消")]),t._v(" "),_("div",{staticClass:"shadow_btn_line"}),t._v(" "),_("span",{on:{click:t.confirm}},[t._v("确定")])])])]):t._e(),t._v(" "),t.del_shadow1?_("div",{staticClass:"shadow",on:{touchmove:function(t){t.preventDefault()}}},[_("div",[t._m(2),t._v(" "),_("div",{staticClass:"shadow_btn"},[_("span",{on:{click:t.no_show}},[t._v("取消")]),t._v(" "),_("div",{staticClass:"shadow_btn_line"}),t._v(" "),_("span",{on:{click:t.del_qd_tap}},[t._v("确定")])])])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"cont qx_cont"},[s("p",[this._v("请确认收到货物")]),this._v(" "),s("p",[this._v("点击确定后订单完成")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"cont qx_cont"},[s("p",[this._v("您确定要取消该订单吗？")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"cont qx_cont"},[s("p",[this._v("确定要删除该订单吗？")])])}]};var i=o("VU/8")(e,n,!1,function(t){o("K5Ug")},"data-v-99f3beb2",null);s.default=i.exports}});
//# sourceMappingURL=26.08facb71454fb55241ce.js.map