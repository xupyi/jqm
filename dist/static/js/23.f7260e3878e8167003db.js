webpackJsonp([23],{aQUP:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("mvHQ"),n=e.n(s),o=e("Xxa5"),c=e.n(o),r=e("exGp"),_=e.n(r),p=e("bOdI"),d=e.n(p),l=e("7I1f"),u=e("L/hj"),v={components:{header_:e("jnG1").a},data:function(){var t;return t={code:"",is_shadow:!1,append:!1,shop_data:[],subject_info:{},up_imgdata:[],nomore:e("LFNM"),active:e("RnCc"),val:{one_order_number:"",picture:"",evaluate_content:"",effect:"",service:"",logistics:"",appearance:""},append_content:"",append_imgdata:[]},d()(t,"code",""),d()(t,"customer_service_qr_code_name",""),t},created:function(){var t=this;this.$store.commit("show_looding"),0==this.$route.query.type&&(this.append=!0),this.val.one_order_number=this.$route.query.id,Object(l.a)({url:"/api/order/getOneOrderDetailed",data:{one_order_number:this.$route.query.id},method:"post"}).then(function(a){console.log(a),200==a.data.status&&(t.shop_data=a.data.data,t.subject_info=a.data.data.subject_info),t.$store.commit("hide_looding")}),Object(l.a)({url:"/api/getContactOur",method:"post"}).then(function(a){console.log(a.data),t.code=a.data.data.customer_service_qr_code,t.customer_service_qr_code_name=a.data.data.customer_service_qr_code_name})},methods:{x_tap:function(){this.is_shadow=!1},customer_service:function(){this.is_shadow=!this.is_shadow},zhiliang_tap:function(t){this.val.effect=t+1},waiguan_tap:function(t){this.val.appearance=t+1},fuwu_tap:function(t){this.val.service=t+1},wuliu_tap:function(t){this.val.logistics=t+1},x_img_tap:function(t){this.up_imgdata.splice(t,1)},uplodeimg:function(t){var a=this;return _()(c.a.mark(function e(){var s,n,i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a.up_imgdata.length<5)){e.next=11;break}if(void 0==(s=t.target.files[0])){e.next=9;break}return console.log(s),n=a,e.next=7,u.a.uplodeimg(s);case 7:i=e.sent,n.up_img(i,"up_imgdata");case 9:e.next=12;break;case 11:a.$toast("最多上传5张图片！");case 12:case"end":return e.stop()}},e,a)}))()},up_img:function(t,a){var e=this,s=new FormData;s.append("file",t),Object(l.a)({url:"/api/upload",method:"post",data:s}).then(function(t){"append_imgdata"==a?e.append_imgdata.push(t.data.data[0]):e.up_imgdata.push(t.data.data[0])})},btn_tap:function(){var t=this;this.val.picture=n()(this.up_imgdata),console.log(this.val),""==this.val.evaluate_content?this.$toast("请输入评价内容！"):""==this.val.effect||""==this.val.service||""==this.val.logistics||""==this.val.appearance?this.$toast("请选择星级"):Object(l.a)({url:"/api/addComment",method:"post",data:this.val}).then(function(a){console.log(a),200==a.data.status&&t.$toast("评价成功"),404==a.data.status&&t.$toast("不能重复评价"),t.$router.push({path:"/order/shop_order"})})},append_uplodeimg:function(t){var a=this;return _()(c.a.mark(function e(){var s,n,i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a.up_imgdata.length<5)){e.next=11;break}if(void 0==(s=t.target.files[0])){e.next=9;break}return console.log(s),n=a,e.next=7,u.a.uplodeimg(s);case 7:i=e.sent,n.up_img(i,"append_imgdata");case 9:e.next=12;break;case 11:a.$toast("最多上传5张图片！");case 12:case"end":return e.stop()}},e,a)}))()},append_x_img_tap:function(){this.append_imgdata.splice(i,1)},append_btn_tap:function(){var t=this;if(""==this.val.append_content)this.$toast("请输入评价内容！");else{var a={one_order_number:this.val.one_order_number,append_picture:n()(this.append_imgdata),append_evaluate_content:this.append_content};Object(l.a)({url:"/api/addAppendComment",method:"post",data:a}).then(function(a){console.log(a),200==a.data.status&&t.$toast("追评成功"),404==a.data.status&&t.$toast("不能重复评价"),t.$router.push({path:"/order/shop_order"})})}}}},m={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("header_"),t._v(" "),s("div",{staticClass:"condition"},[6==t.shop_data.goods_status?s("p",[t._v("商品追加评价")]):t._e(),t._v(" "),3==t.shop_data.goods_status?s("p",[t._v("商品评价")]):t._e(),t._v(" "),s("div",{staticClass:"order_number"},[s("p",[t._v("订单号："+t._s(t.shop_data.one_order_number))]),t._v(" "),s("span",{on:{click:t.customer_service}},[t._v("联系客服")])]),t._v(" "),s("div",{staticClass:"order_time"},[t._v("订单时间："+t._s(t.shop_data.created_at))]),t._v(" "),s("div",{staticClass:"order_des"},[s("img",{attrs:{src:t.shop_data.gpics,alt:""}}),t._v(" "),s("div",[s("p",[t._v(t._s(t.shop_data.show_title))]),t._v(" "),s("p",[t._v("\n          颜色/分类：\n          "),s("span",[t._v(t._s(t.subject_info.color))])]),t._v(" "),s("p",[t._v("\n          尺寸：\n          "),s("span",[t._v(t._s(t.subject_info.size))])]),t._v(" "),s("p",[t._v("\n          材质：\n          "),s("span",[t._v(t._s(t.subject_info.caizhi))])]),t._v(" "),s("div",{staticClass:"des_cont"},[s("span",{staticClass:"des_price"},[t._v("￥ "+t._s(t.shop_data.price))]),t._v(" "),s("span",{staticClass:"des_num"},[t._v("x"+t._s(t.shop_data.num))])])])]),t._v(" "),0==t.append?s("div",{staticClass:"assess"},[s("p",[t._v("评价内容：")]),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.val.evaluate_content,expression:"val.evaluate_content"}],attrs:{placeholder:"请输入~",cols:"30",rows:"10"},domProps:{value:t.val.evaluate_content},on:{input:function(a){a.target.composing||t.$set(t.val,"evaluate_content",a.target.value)}}})]):s("div",{staticClass:"assess"},[s("p",[t._v("追评内容：")]),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.append_content,expression:"append_content"}],attrs:{placeholder:"请输入~",cols:"30",rows:"10"},domProps:{value:t.append_content},on:{input:function(a){a.target.composing||(t.append_content=a.target.value)}}})]),t._v(" "),0==t.append?s("div",{staticClass:"img_star"},[s("p",[s("span",[t._v("质量：")]),t._v(" "),t._l(5,function(a,e){return s("img",{key:e,attrs:{src:e<=t.val.effect-1?t.active:t.nomore,alt:""},on:{click:function(a){return t.zhiliang_tap(e)}}})}),t._v(" "),""!=t.val.effect?s("span",[t._v(t._s(t.val.effect)+"分")]):t._e()],2),t._v(" "),s("p",[s("span",[t._v("外观：")]),t._v(" "),t._l(5,function(a,e){return s("img",{key:e,attrs:{src:e<=t.val.appearance-1?t.active:t.nomore,alt:""},on:{click:function(a){return t.waiguan_tap(e)}}})}),t._v(" "),""!=t.val.appearance?s("span",[t._v(t._s(t.val.appearance)+"分")]):t._e()],2),t._v(" "),s("p",[s("span",[t._v("服务：")]),t._v(" "),t._l(5,function(a,e){return s("img",{key:e,attrs:{src:e<=t.val.service-1?t.active:t.nomore,alt:""},on:{click:function(a){return t.fuwu_tap(e)}}})}),t._v(" "),""!=t.val.service?s("span",[t._v(t._s(t.val.service)+"分")]):t._e()],2),t._v(" "),s("p",[s("span",[t._v("物流：")]),t._v(" "),t._l(5,function(a,e){return s("img",{key:e,attrs:{src:e<=t.val.logistics-1?t.active:t.nomore,alt:""},on:{click:function(a){return t.wuliu_tap(e)}}})}),t._v(" "),""!=t.val.logistics?s("span",[t._v(t._s(t.val.logistics)+"分")]):t._e()],2)]):t._e(),t._v(" "),0==t.append?s("div",{staticClass:"pics"},[s("p",[t._v("添加图片：")]),t._v(" "),s("ul",[t._l(t.up_imgdata,function(a,n){return s("li",{key:n},[s("img",{staticClass:"x_img",attrs:{src:e("QOOQ"),alt:""},on:{click:function(a){return t.x_img_tap(n)}}}),t._v(" "),s("img",{attrs:{src:a,alt:""}})])}),t._v(" "),s("li",{staticClass:"jia"},[s("input",{attrs:{name:"file",type:"file",accept:"image/jpeg, image/jpg, image/png",multiple:"multiple"},on:{change:t.uplodeimg}}),t._v(" "),s("img",{attrs:{src:e("gUz4"),alt:""}})])],2)]):s("div",{staticClass:"pics"},[s("p",[t._v("添加图片：")]),t._v(" "),s("ul",[t._l(t.append_imgdata,function(a,n){return s("li",{key:n},[s("img",{staticClass:"x_img",attrs:{src:e("QOOQ"),alt:""},on:{click:function(a){return t.append_x_img_tap(n)}}}),t._v(" "),s("img",{attrs:{src:a,alt:""}})])}),t._v(" "),s("li",{staticClass:"jia"},[s("input",{attrs:{name:"file",type:"file",accept:"image/jpeg, image/jpg, image/png",multiple:"multiple"},on:{change:t.append_uplodeimg}}),t._v(" "),s("img",{attrs:{src:e("gUz4"),alt:""}})])],2)]),t._v(" "),0==t.append?s("div",{staticClass:"btn",on:{click:t.btn_tap}},[t._v("提交")]):s("div",{staticClass:"btn",on:{click:t.append_btn_tap}},[t._v("提交")]),t._v(" "),t.is_shadow?s("div",{staticClass:"shadow",on:{touchmove:function(t){t.preventDefault()}}},[s("div",[s("p",{staticClass:"head"},[t._v("\n          "+t._s(t.customer_service_qr_code_name)+"\n          "),s("img",{attrs:{src:e("qw6E"),alt:""},on:{click:t.customer_service}})]),t._v(" "),s("div",{staticClass:"cont"},[s("img",{attrs:{src:t.code,alt:""}})])])]):t._e()])],1)},staticRenderFns:[]};var g=e("VU/8")(v,m,!1,function(t){e("fucy")},"data-v-b1e0c87c",null);a.default=g.exports},fucy:function(t,a){}});
//# sourceMappingURL=23.f7260e3878e8167003db.js.map