webpackJsonp([42],{efsM:function(o,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var _=t("mvHQ"),d=t.n(_),e=t("7I1f"),a={components:{back_header:t("jnG1").a},data:function(){return{choice_id:"",is_shadow:!1,goodlist_data:{},title:"",active:t("FL6W"),normal:t("PBIX"),val:{good_id:"",goods_ceiling_molding_id:"",goods_ceramic_tile_id:"",goods_cupboard_id:"",goods_metope_modeling_id:""}}},created:function(){var o=this,i=this.$route.query.id;this.val.good_id=i,this.title=this.$route.query.title,sessionStorage.getItem("tc_select")&&(this.val=JSON.parse(sessionStorage.getItem("tc_select"))),console.log(i),this.$store.commit("show_looding"),Object(e.a)({url:"/api/getTranslateGoodList",data:{goods_id:i},method:"post"}).then(function(i){console.log(i),o.$store.commit("hide_looding"),200==i.status&&(o.goodlist_data=i.data.data)}),Object(e.a)({url:"/api/getUserTranslateGoodLog",method:"post"}).then(function(i){console.log(i),o.$store.commit("hide_looding"),200==i.data.status&&i.data.data.goods_ceiling_molding_id&&(o.val.goods_ceiling_molding_id=i.data.data.goods_ceiling_molding_id,o.val.goods_ceramic_tile_id=i.data.data.goods_ceramic_tile_id,o.val.goods_cupboard_id=i.data.data.goods_cupboard_id,o.val.goods_metope_modeling_id=i.data.data.goods_metope_modeling_id)})},methods:{big_pic:function(o){sessionStorage.setItem("tc_select",d()(this.val)),this.$router.push({path:"shop_detail",query:{id:o}})},qued_tap:function(){console.log(this.choice_id),this.is_shadow=!1,this.$router.push({path:"/home/setmeal",query:{choice_id:this.choice_id}})},goods_ceiling_molding_tap:function(o){this.val.goods_ceiling_molding_id=this.val.goods_ceiling_molding_id==o?"":o},goods_ceramic_tile_tap:function(o){this.val.goods_ceramic_tile_id=this.val.goods_ceramic_tile_id==o?"":o},goods_cupboard_tap:function(o){this.val.goods_cupboard_id=this.val.goods_cupboard_id==o?"":o},goods_metope_modeling_tap:function(o){this.val.goods_metope_modeling_id=this.val.goods_metope_modeling_id==o?"":o},btn_tap:function(){var o=this;console.log(this.val),""==this.val.goods_ceiling_molding_id?this.$toast("请选择客厅吊顶造型"):""==this.val.goods_ceramic_tile_id?this.$toast("请选择地板、瓷砖"):""==this.val.goods_cupboard_id?this.$toast("请选择橱柜"):""==this.val.goods_metope_modeling_id?this.$toast("请选择墙面"):(this.$store.commit("show_looding"),Object(e.a)({url:"/api/addTranslateGood",data:this.val,method:"post"}).then(function(i){o.$store.commit("hide_looding"),200==i.data.status&&(o.is_shadow=!0,o.choice_id=i.data.data.choice_id)}))}}},s={render:function(){var o=this,i=o.$createElement,t=o._self._c||i;return t("div",[t("back_header"),o._v(" "),t("div",{attrs:{id:"select_set_meal"}},[t("p",[o._v(o._s(o.title)+"选择地墙顶造型")]),o._v(" "),t("section",[t("p",[o._v("客餐厅吊顶造型")]),o._v(" "),t("ul",o._l(o.goodlist_data.goods_ceiling_molding,function(i,_){return t("li",{key:_},[t("img",{attrs:{src:i.picture_url,alt:""},on:{click:function(t){return o.big_pic(i.jump_goods_id)}}}),o._v(" "),t("div",{on:{click:function(t){return o.goods_ceiling_molding_tap(i.id)}}},[t("img",{attrs:{src:o.val.goods_ceiling_molding_id==i.id?o.active:o.normal,alt:""}}),o._v(" "),t("span",{style:{color:o.val.goods_ceiling_molding_id==i.id?"#ff1284":""}},[o._v(o._s(i.name))])])])}),0)]),o._v(" "),t("section",[t("p",[o._v("地板、瓷砖")]),o._v(" "),t("ul",o._l(o.goodlist_data.goods_ceramic_tile,function(i,_){return t("li",{key:_},[t("img",{attrs:{src:i.picture_url,alt:""},on:{click:function(t){return o.big_pic(i.jump_goods_id)}}}),o._v(" "),t("div",{on:{click:function(t){return o.goods_ceramic_tile_tap(i.id)}}},[t("img",{attrs:{src:o.val.goods_ceramic_tile_id==i.id?o.active:o.normal,alt:""}}),o._v(" "),t("span",{style:{color:o.val.goods_ceramic_tile_id==i.id?"#ff1284":""}},[o._v(o._s(i.name))])])])}),0)]),o._v(" "),t("section",[t("p",[o._v("橱柜")]),o._v(" "),t("ul",o._l(o.goodlist_data.goods_cupboard,function(i,_){return t("li",{key:_},[t("img",{attrs:{src:i.picture_url,alt:""},on:{click:function(t){return o.big_pic(i.jump_goods_id)}}}),o._v(" "),t("div",{on:{click:function(t){return o.goods_cupboard_tap(i.id)}}},[t("img",{attrs:{src:o.val.goods_cupboard_id==i.id?o.active:o.normal,alt:""}}),o._v(" "),t("span",{style:{color:o.val.goods_cupboard_id==i.id?"#ff1284":""}},[o._v(o._s(i.name))])])])}),0)]),o._v(" "),t("section",[t("p",[o._v("墙面")]),o._v(" "),t("ul",o._l(o.goodlist_data.goods_metope_modeling,function(i,_){return t("li",{key:_},[t("img",{attrs:{src:i.picture_url,alt:""},on:{click:function(t){return o.big_pic(i.jump_goods_id)}}}),o._v(" "),t("div",{on:{click:function(t){return o.goods_metope_modeling_tap(i.id)}}},[t("img",{attrs:{src:o.val.goods_metope_modeling_id==i.id?o.active:o.normal,alt:""}}),o._v(" "),t("span",{style:{color:o.val.goods_metope_modeling_id==i.id?"#ff1284":""}},[o._v(o._s(i.name))])])])}),0)]),o._v(" "),t("div",{staticClass:"btn",on:{click:o.btn_tap}},[o._v("提交完成")])]),o._v(" "),o.is_shadow?t("div",{staticClass:"shadow"},[t("div",[o._m(0),o._v(" "),t("span",{on:{click:o.qued_tap}},[o._v("确定")])])]):o._e()],1)},staticRenderFns:[function(){var o=this.$createElement,i=this._self._c||o;return i("div",{staticClass:"cont"},[i("h3",[this._v("顾客您好！")]),this._v(" "),i("p",[this._v("您选择的信息已被系统保存，您提交的信息将作为设计参考依据，设计之前设计师还会与您进行详细沟通。")])])}]};var c=t("VU/8")(a,s,!1,function(o){t("oSIu")},"data-v-47ca7d45",null);i.default=c.exports},oSIu:function(o,i){}});
//# sourceMappingURL=42.e067ad14f60037e368bd.js.map