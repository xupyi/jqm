webpackJsonp([30],{"Mo/B":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("7I1f"),n={data:function(){return{data_lists:[],title_name:"",province:"0",city:"0",select_Province:[],select_City:[]}},created:function(){"plumber_and_electrician"==this.$route.query.name?this.title_name="水电工":"oil_worker"==this.$route.query.name?this.title_name="油工":"carpentry"==this.$route.query.name?this.title_name="木工":"bricklayer"==this.$route.query.name?this.title_name="瓦工":"coolie_worker"==this.$route.query.name&&(this.title_name="小工"),this.get_data("",""),this.get_select_Province(),this.$store.state.title_name="施工长个人中心"},methods:{xiaogong_detail:function(t){this.$router.push({path:"/personal/se_xiaogong_detail",query:{id:t,name:this.$route.query.name,order_id:this.$route.query.order_id}})},search:function(){this.get_data(this.province,this.city)},Province_change:function(t){t.target.value<2?(this.city=this.province=0,this.select_City=[]):this.province=this.select_Province[t.target.value-2].region_id,this.get_select_city()},City_change:function(){},City_click:function(){""==this.province&&this.$toast("请先选择省份")},get_data:function(t,e){var i=this;this.$store.commit("show_looding"),Object(a.a)({url:"/api/getUserList",data:{type:this.$route.query.name,province:t,city:e},method:"post"}).then(function(t){console.log(t),200==t.data.status&&(i.data_lists=t.data.data.data),i.$store.commit("hide_looding")})},get_select_Province:function(t){var e=this;Object(a.a)({url:"/api/getAllProvince",method:"post"}).then(function(i){console.log(i.data),200==i.data.status&&(e.select_Province=i.data.data,t&&e.get_select_city("once"))})},get_select_city:function(){var t=this;Object(a.a)({url:"/api/getAllCity",data:{province_id:this.province},method:"post"}).then(function(e){console.log(e.data),200==e.data.status&&(t.select_City=e.data.data)})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"run_work"},[a("p",[t._v("选择"+t._s(t.title_name))]),t._v(" "),a("div",{staticClass:"address"},[a("div",[t._v("\n      所在地区：\n      "),a("select",{domProps:{value:t.province},on:{change:t.Province_change}},[a("option",{attrs:{selected:"",value:"0"}},[t._v("请选择")]),t._v(" "),t._l(t.select_Province,function(e,i){return a("option",{key:i,domProps:{value:e.region_id}},[t._v(t._s(e.region_name))])})],2),t._v(" "),a("span",[t._v("省")]),t._v(" "),a("select",{domProps:{value:t.city},on:{change:t.City_change,click:t.City_click}},[a("option",{attrs:{selected:"",value:"0"}},[t._v("请选择")]),t._v(" "),t._l(t.select_City,function(e,i){return a("option",{key:i,domProps:{value:e.region_id}},[t._v(t._s(e.region_name))])})],2),t._v(" "),a("span",[t._v("市")])]),t._v(" "),a("p",{on:{click:t.search}},[t._v("点击搜索")])]),t._v(" "),a("ul",t._l(t.data_lists,function(e,n){return a("li",{key:n,on:{click:function(i){return t.xiaogong_detail(e.id)}}},[a("p",{staticClass:"img"},[a("img",{attrs:{src:e.avatar,alt:""}})]),t._v(" "),a("div",[a("span",[t._v(t._s(e.xing)+t._s(e.name))]),t._v(" "),a("p",[a("img",{attrs:{src:i("Jjwm"),alt:""}}),t._v(" "),a("span",[t._v(t._s(e.province_name)+t._s(e.city_name))])])])])}),0)])},staticRenderFns:[]};var o=i("VU/8")(n,s,!1,function(t){i("mhXP")},"data-v-75f8d44a",null);e.default=o.exports},mhXP:function(t,e){}});
//# sourceMappingURL=30.26a4b460d05195b6940e.js.map