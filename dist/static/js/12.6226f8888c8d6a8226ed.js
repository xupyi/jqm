webpackJsonp([12],{B4Ao:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});e("Fd2+");var a=e("7I1f"),s={data:function(){return{obj:{},default_:null,select_Province:[],province_name:"省/市",province_active:!1,select_City:[],city_name:"城市",city_active:!1,select_district:[],district_name:"所在城市",district_active:!1}},created:function(){var t=this;this.$store.commit("show_looding");var i=JSON.parse(window.sessionStorage.getItem("revise"));this.obj=i,this.default_=1==i.default,Object(a.a)({url:"/api/getAllProvince",method:"post"}).then(function(e){if(200==e.data.status){t.select_Province=e.data.data;for(var a=0;a<e.data.data.length;a++)e.data.data[a].region_id==i.province&&(t.province_name=e.data.data[a].region_name)}}),Object(a.a)({url:"/api/getAllCity",data:{province_id:i.province},method:"post"}).then(function(e){if(200==e.data.status){t.select_City=e.data.data;for(var a=0;a<e.data.data.length;a++)e.data.data[a].region_id==i.city&&(t.city_name=e.data.data[a].region_name)}}),Object(a.a)({url:"/api/getAllDistrict",data:{city_id:i.city},method:"post"}).then(function(e){if(200==e.data.status){t.select_district=e.data.data;for(var a=0;a<e.data.data.length;a++)e.data.data[a].region_id==i.district&&(t.district_name=e.data.data[a].region_name)}}),this.$store.commit("hide_looding")},methods:{checked_tap:function(){this.default_=!this.default_},province_tap:function(){this.province_active=!this.province_active},province_active_tap:function(t){this.city_name="城市",this.district_name="所在城市",this.obj.city=this.obj.district="",this.obj.province=this.select_Province[t].region_id,this.province_name=this.select_Province[t].region_name,this.province_active=!1,this.get_select_city()},city_tap:function(){console.log(this.province),""==this.obj.province||void 0==this.obj.province?this.$toast("请先选择省/市"):this.city_active=!this.city_active},city_active_tap:function(t){this.district_name="所在城市",this.district="",this.obj.city=this.select_City[t].region_id,this.city_name=this.select_City[t].region_name,this.city_active=!1,this.get_select_district()},district_tap:function(){""==this.obj.city?this.$toast("请先选择城市"):this.district_active=!this.district_active},district_active_tap:function(t){this.obj.district=this.select_district[t].region_id,this.district_name=this.select_district[t].region_name,this.district_active=!1},get_select_city:function(){var t=this;Object(a.a)({url:"/api/getAllCity",data:{province_id:this.obj.province},method:"post"}).then(function(i){console.log(i.data),200==i.data.status&&(t.select_City=i.data.data)})},get_select_district:function(){var t=this;Object(a.a)({url:"/api/getAllDistrict",data:{city_id:this.obj.city},method:"post"}).then(function(i){console.log(i.data),200==i.data.status&&(t.select_district=i.data.data)})},btn_tap:function(){var t=this;1==this.default_?Object(a.a)({url:"/api/setDefaultAddress",data:{id:this.obj.id},method:"post"}).then(function(i){console.log(i),200==i.data.status&&(t.obj.default=1)}):this.obj.default=0,""==this.obj.consignee?this.$toast("请输入收货人"):/^1[34578]\d{9}$/.test(this.obj.mobile)?""==this.obj.address?this.$toast("请输入详细地址"):(this.$store.commit("show_looding"),Object(a.a)({url:"/api/saveAddress",data:this.obj,method:"post"}).then(function(i){200==i.data.status?(t.$router.push("/personal/address"),t.$toast(i.data.msg)):(console.log(i),t.$toast(i.data.msg)),t.$store.commit("hide_looding")})):this.$toast("请输入正确的手机号")}}},o={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"add_address"},[a("h3",[t._v("添加收货地址")]),t._v(" "),a("p",[t._v("(手机和座机号码至少填一项，其余都是必填项)")]),t._v(" "),a("ul",[a("li",[t._v("收货人："),a("input",{directives:[{name:"model",rawName:"v-model",value:t.obj.consignee,expression:"obj.consignee"}],attrs:{type:"text",placeholder:"收货人"},domProps:{value:t.obj.consignee},on:{input:function(i){i.target.composing||t.$set(t.obj,"consignee",i.target.value)}}})]),t._v(" "),a("li",[t._v("手机号码："),a("input",{directives:[{name:"model",rawName:"v-model",value:t.obj.mobile,expression:"obj.mobile"}],attrs:{type:"number",placeholder:"手机号码"},domProps:{value:t.obj.mobile},on:{input:function(i){i.target.composing||t.$set(t.obj,"mobile",i.target.value)}}})]),t._v(" "),a("li",[t._v("座机号码："),a("input",{directives:[{name:"model",rawName:"v-model",value:t.obj.tel,expression:"obj.tel"}],attrs:{type:"number",placeholder:"座机号码"},domProps:{value:t.obj.tel},on:{input:function(i){i.target.composing||t.$set(t.obj,"tel",i.target.value)}}})]),t._v(" "),a("li",{staticClass:"add_city"},[a("span",[t._v("所在地区：")]),t._v(" "),a("div",{staticClass:"city"},[a("div",[a("span",{on:{click:t.province_tap}},[a("span",[t._v(t._s(t.province_name))]),t._v(" "),a("img",{attrs:{src:e("Px/p"),alt:""}})]),t._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:t.province_active,expression:"province_active"}]},t._l(t.select_Province,function(i,e){return a("li",{key:e,on:{click:function(i){return t.province_active_tap(e)}}},[t._v("\n              "+t._s(i.region_name))])}),0)]),t._v(" "),a("div",[a("span",{on:{click:t.city_tap}},[a("span",[t._v(t._s(t.city_name))]),t._v(" "),a("img",{attrs:{src:e("Px/p"),alt:""}})]),t._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:t.city_active,expression:"city_active"}]},t._l(t.select_City,function(i,e){return a("li",{key:e,on:{click:function(i){return t.city_active_tap(e)}}},[t._v("\n              "+t._s(i.region_name))])}),0)]),t._v(" "),a("div",[a("span",{on:{click:t.district_tap}},[a("span",[t._v(t._s(t.district_name))]),t._v(" "),a("img",{attrs:{src:e("Px/p"),alt:""}})]),t._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:t.district_active,expression:"district_active"}]},t._l(t.select_district,function(i,e){return a("li",{key:e,on:{click:function(i){return t.district_active_tap(e)}}},[t._v("\n              "+t._s(i.region_name))])}),0)])])]),t._v(" "),a("li",[t._v("详细地址：")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.obj.address,expression:"obj.address"}],attrs:{placeholder:"详细地址"},domProps:{value:t.obj.address},on:{input:function(i){i.target.composing||t.$set(t.obj,"address",i.target.value)}}})]),t._v(" "),a("div",{staticClass:"add"},[a("span",[t._v("设为默认地址：")]),t._v(" "),a("van-switch",{attrs:{change:"checked_tap","active-color":"#FF1284",size:"24px"},model:{value:t.default_,callback:function(i){t.default_=i},expression:"default_"}})],1),t._v(" "),a("div",{staticClass:"btn",on:{click:t.btn_tap}},[t._v("保存")])])},staticRenderFns:[]};var c=e("VU/8")(s,o,!1,function(t){e("V6J1")},"data-v-e6fcd6ce",null);i.default=c.exports},"Px/p":function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAcFJREFUSMftkT9o6lAYxc/Ny+Cm2KGEIkUQR5eiYye7FCJCqUuXLJJYcKmdi5C1SAaHixbqELJ1073aQRwMJXsKIsYWhIKoSNKYNxQdCkVt35/hvbPd7zv3/LjnAv/1l0UqSkWpKPH4YrgYLoYnJ38KzHAMx3B3d6zn83ye7/ERQQQRvL6GH374Dw9/G3mOOebtdoALcAHu6oos51WjalSN3V235/bcXreLAQYY7O39MnAGGWSen52W03JaBwf5dD6dT1sWs9xnY9lYNvby8n46PYUCBYptfxtsw4btOF7Ui3rRTGYJXn3FR7/ES7zEt9soooji5eV3+V7YC3vhi4vcKDfKjR4ePu7JugA6oRM6ub2FChWqIGxMLqCAgqZJU2kqTc/OPrMx63JmyVlyljw/RxNNNHV9nZ/IRCayYZASKZFSNrvWv+mDympZLav7+2yKTbGpbhcaNGg7OytDBBFEXl+JSUxixuOiKIqiaJobN7apaIiGaOjoiApUoMLbG+3QDu24Lk3QBE0cH2+b92PbC/VxfVwfPz3xhCc8IQR99NG/v5caUkNq3Nxsm8d+tQlLt3RLl+XVoIYaal9v9t/VT1WDsVCvdMz9AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA1LTE5VDE0OjUxOjEyKzA4OjAw7ecg7AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wNS0xOVQxNDo1MToxMiswODowMJy6mFAAAABGdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX2NjbGZ4M2VyMHY3L3hpYS5zdmdF8W6RAAAAAElFTkSuQmCC"},V6J1:function(t,i){}});
//# sourceMappingURL=12.6226f8888c8d6a8226ed.js.map