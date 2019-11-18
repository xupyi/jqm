<template>
  <div>
    <div>
      <h3>修改个人资料</h3>
      <div class="avatar_uplode">
        <div :style="{background:avatar?'':'#fef8da'}">
          <input type="file" @change="avatar_tap" />
          <img class="avatar_img" :src="avatar" alt />
        </div>
        <p>头像上传</p>
      </div>
      <ul class="guke">
        <li>
          <span>姓氏:</span>
          <input type="text" placeholder="姓氏" v-model="user_info_datas.xing" />
        </li>
        <li>
          <span>名字:</span>
          <input type="text" placeholder="名字" v-model="user_info_datas.name" />
        </li>
        <li>
          <span>手机号:</span>
          <p>{{user_info_datas.mobile}}</p>
        </li>
        <li>
          <span>微信号:</span>
          <input type="text" placeholder="微信号" v-model="user_info_datas.weixin" />
        </li>
        <li class="gender">
          <span>性别:</span>
          <div>
            <select name id @change="gender_tap" :value="user_info_datas.gender">
              <option value="1">男</option>
              <option value="2">女</option>
            </select>
          </div>
        </li>
        <li>
          <span>地区:</span>
          <div>
            <select @change="Province_change" :value="user_info_datas.province">
              <option selected value="0">请选择</option>
              <option
                v-for="(item, index) in select_Province"
                :key="index"
                :value="item.region_id"
              >{{item.region_name}}</option>
            </select>
            <select @change="City_change" @click="City_click" :value="user_info_datas.city">
              <option selected value="0">请选择</option>
              <option
                v-for="(item, index) in select_City"
                :value="item.region_id"
                :key="index"
              >{{item.region_name}}</option>
            </select>
            <select
              @change="district_change"
              @click="district_click"
              :value="user_info_datas.district"
            >
              <option selected value="0">请选择</option>
              <option
                v-for="(item, index) in select_district"
                :value="item.region_id"
                :key="index"
              >{{item.region_name}}</option>
            </select>
          </div>
        </li>
      </ul>
      <div class="succer">
        <ul>
          <li class="birthday">
            <span>出生年月：</span>
            <div>
              <select name id v-model="user_info_datas.birth_year">
                <option value disabled>请选择</option>
                <option :value="item" v-for="(item, index) in select_year" :key="index">{{item}}年</option>
              </select>
              <select name id v-model="user_info_datas.birth_month">
                <option value disabled>请选择</option>
                <option
                  :value="item"
                  v-for="(item, index) in 12"
                  :key="index"
                >{{item>9?item:'0'+item}}月</option>
              </select>
            </div>
          </li>
          <li class="GoodArea">
            <span>擅长：</span>
            <div>
              <span
                @click="goodarea_tap(item.style_id,index)"
                v-for="(item, index) in GoodArea"
                :key="index"
              >
                {{item.style_name}}
                <img v-if="item.is" src="../../../assets/home_img/dui.png" alt />
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="btn" @click="btn_tap">提交</div>
    </div>
  </div>
</template>
<script>
import request from "@/request";
import utils from "@/utils";
export default {
  data() {
    return {
      i_name: "",
      user_info_datas: {},
      // life_picture: "",
      avatar: "",
      select_Province: [],
      select_City: [],
      select_district: [],
      select_year: [], // 生日
      GoodArea: [],
      flag: true,
      show: false,
      add_work_his: {},
      star_time: "",
      end_time: "",
      work_company: "",
      work_post: "",
      work_list: "",
      goodarea_true: [],
      user_type_: ""
    };
  },
  created() {
    this.user_type_ = this.$route.query.user_type;
    if (this.$route.query.user_type == "designer") {
      this.$store.state.title_name = "设计师个人资料";
    } else if (this.$route.query.user_type == "plumber_and_electrician") {
      this.$store.state.title_name = "水电工个人资料";
    }
    // else if (this.$route.query.user_type) {
    //   this.$store.state.title_name = "个人资料";
    // } else if (this.$route.query.user_type) {
    //   this.$store.state.title_name = "个人资料";
    // } else if (this.$route.query.user_type) {
    //   this.$store.state.title_name = "个人资料";
    // } else if (this.$route.query.user_type) {
    //   this.$store.state.title_name = "个人资料";
    // }
    // 用户擅长
    var good_use = [];
    request({
      url: "/api/getUserGoodArea",
      method: "post"
    }).then(data => {
      console.log(data.data);
      if (data.data.status == 200) {
        for (let index = 0; index < data.data.data.length; index++) {
          data.data.data[index].is = false;
        }
        good_use = data.data.data;
      }
    });
    // 获取用户信息
    request({
      url: "/api/getUserStaffInfo",
      data: { user_type: this.$route.query.user_type },
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.data.status == 200) {
        if (data.data.data.identification_info != null) {
          this.id_card0 = data.data.data.identification_info[0];
          this.id_card1 = data.data.data.identification_info[1];
        }
        // if (data.data.data.life_picture == undefined) {
        //   this.life_picture = data.data.data.life_picture = "";
        // } else {
        //   this.life_picture = data.data.data.life_picture;
        // }
        data.data.data.say_to_user
          ? data.data.data.say_to_user
          : (data.data.data.say_to_user = "");
        this.user_info_datas = data.data.data;
        this.avatar = data.data.data.avatar == "" ? "" : data.data.data.avatar;

        this.work_list = data.data.data.work_list;
        this.get_select_Province("once");
        this.get_select_city("once");

        var brr = data.data.data.goods_type
          ? data.data.data.goods_type.split(',')
          : [];
        console.log(brr, "brr");
        this.goodarea_true = brr;
        for (let index = 0; index < good_use.length; index++) {
          var style = good_use[index];
          if (brr != "") {
            for (let f = 0; f < brr.length; f++) {
              if (brr[f] == style.style_id) {
                style.is = true;
              }
            }
          }
          this.GoodArea = good_use;
        }
      }
    });
    var date = new Date().getFullYear();
    for (let index = 0; index < 80; index++) {
      this.select_year.push(date - index);
    }
  },
  methods: {
    gender_tap(e) {
      // 性别选择
      console.log(e.target.value);
      this.user_info_datas.gender = e.target.value;
    },
    //   图片放大
    big_pic(url) {
      this.$store.state.amplify_img = url;
    },
    back_tap() {
      this.$router.go(-1);
    },
    // 擅长
    goodarea_tap(i, index) {
      var a = this.goodarea_true.indexOf(String(i));
      if (a != -1) {
        this.goodarea_true.splice(a, 1);
        this.GoodArea[index].is = false;
      } else {
        this.GoodArea[index].is = true;
        this.goodarea_true.push(String(i));
      }
      console.log(this.GoodArea)
    },
    // 头像上传
    async avatar_tap(e) {
      let data = e.target.files[0];
      if (data != undefined) {
        let a = await utils.uplodeimg(data);
        this.get_img(a);
      }
    },

    // 图片上传
    get_img(data) {
      var formData = new FormData();
      formData.append("file", data);
      this.$store.commit("show_looding");
      request({
        url: "/api/upload",
        method: "post",
        data: formData
      }).then(res => {
        this.$store.commit("hide_looding");
        console.log(res.data.data[0]);
        this.avatar = this.user_info_datas.avatar = res.data.data[0];
      });
    },
    // 提交
    btn_tap() {
      //   if (!/^1[34578]\d{9}$/.test(this.user_info_datas.mobile)) {
      //     this.$toast("请输入正确的手机号！");
      //   } else
      if (
        !/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(this.user_info_datas.weixin)
      ) {
        this.$toast("请输入正确的微信号码！");
      } else if (
        this.user_info_datas.province == "" ||
        this.user_info_datas.city == ""
      ) {
        this.$toast("请选择地区！");
      } else if (
        this.user_info_datas.district == 0 &&
        this.select_district != ""
      ) {
        this.$toast("请选择区/县！");
        return;
      }
      this.user_info_datas.goods_type =this.goodarea_true.join()
      if (
        this.user_info_datas.birth_month == "" ||
        this.user_info_datas.birth_year == ""
      ) {
        this.$toast("请选择出生年月！");
      } else if (this.goodarea_true == "") {
        this.$toast("请选择擅长的类型");
      } else {
        console.log(this.user_info_datas);
        this.user_info_datas.user_type = this.user_type_;
        this.$store.commit("show_looding");
        this.user_info_datas.designer_works = JSON.stringify(
          this.user_info_datas.designer_works
        );
        request({
          url: "/api/saveUserStaffInfo",
          data: this.user_info_datas,
          method: "post"
        }).then(data => {
          this.$store.commit("hide_looding");
          if (data.data.status == 200) {
            this.$toast("修改成功！");
            this.$router.go(-1);
          } else {
            this.$toast(data.data.msg);
          }
        });
      }
    },
    // 城市
    Province_change(e) {
      console.log(e);
      if (e.target.value != 0) {
        this.user_info_datas.province = e.target.value;
        this.get_select_city();
      }
      this.select_City = this.select_district = [];
      this.user_info_datas.city = this.user_info_datas.district = 0;
    },
    City_change(e) {
      if (e.target.value != 0) {
        this.user_info_datas.city =  e.target.value
        this.get_select_district();
        this.user_info_datas.district = 0;
      } else {
        this.select_district = [];
        this.user_info_datas.city = this.user_info_datas.district = 0;
      }
    },
    City_click() {
      if (this.user_info_datas.province == "") {
        this.$toast("请先选择省/市");
      }
    },
    district_change(e) {
      if (e.target.value != 0) {
        this.user_info_datas.district = e.target.value
      } else {
        this.user_info_datas.district = 0;
      }
    },
    district_click() {
      if (this.user_info_datas.city == "") {
        this.$toast("请先选择城市");
      }
    },
    get_select_Province(once) {
      request({
        url: "/api/getAllProvince",
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.select_Province = data.data.data;
          if (once) {
            this.get_select_city("once");
          }
        }
      });
    },
    get_select_city(once) {
      request({
        url: "/api/getAllCity",
        data: { province_id: this.user_info_datas.province },
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.select_City = data.data.data;
          if (once) {
            this.get_select_district(once);
          }
        }
      });
    },
    get_select_district() {
      request({
        url: "/api/getAllDistrict",
        data: { city_id: this.user_info_datas.city },
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.select_district = data.data.data;
        }
      });
    }
  }
};
</script>
<style scoped>
.head {
  height: 0.9rem;
  background-color: #2bbf4a;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.head h1 {
  font-size: 0.4rem;
  font-weight: bold;
}
.head > img {
  position: absolute;
  left: 0.2rem;
  width: 0.5rem;
  height: 0.5rem;
}
/* ------------------------------- */
h3 {
  font-size: 0.38rem;
  margin: 0.2rem 0;
  text-align: center;
  font-weight: bold;
}

.avatar_uplode {
  font-size: 0.3rem;
}
.avatar_uplode div {
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  border: 1px solid #f79646;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  box-sizing: content-box;
  padding: 0.1rem;
}

.avatar_uplode input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.avatar_uplode p {
  margin-top: 0.1rem;
  text-align: center;
}
.avatar_img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.succer ul li {
  border-bottom: 1px solid #7f7f7f;
  font-size: 0.3rem;
  padding: 0.2rem 0.4rem;
}

/* 性别 */
.gender {
  display: flex;
  align-items: center;
}
/* +++++++++++++++++++++++++++++++++++++++++++ */
.guke {
  margin-bottom: 0.6rem;
}
.guke span {
  white-space: nowrap;
}
.guke li {
  display: flex;
  flex-direction: row;
  margin: 0.2rem 0.4rem;
  font-size: 0.3rem;
}
.guke li input {
  margin-left: 0.1rem;
  width: 100%;
  border-bottom: 1px solid #7f7f7f !important;
}
.guke li p {
  margin-left: 0.1rem;
  width: 100%;
  border-bottom: 1px solid #7f7f7f !important;
}
.guke select {
  border: none;
}
.guke div {
  margin-left: 0.1rem;
  border-bottom: 1px solid #7f7f7f;
  width: 100%;
}
/* 生日 */
.active {
  background: rgb(105, 105, 109);
  color: white;
}

.birthday {
  border-top: 1px solid #7f7f7f;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.birthday > div {
  flex: 1;
  display: flex;
  flex-direction: row;
}
.birthday select {
  font-size: 0.3rem;
  margin-right: 0.2rem;
}

.GoodArea {
  line-height: 0.6rem;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
}

.GoodArea div {
  display: flex;
  flex-wrap: wrap;
}

.GoodArea div span {
  position: relative;
  padding: 0 0.15rem;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
  margin: 0 0.17rem 0.17rem 0;
}
.GoodArea span img {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  bottom: -0.1rem;
  right: -0.1rem;
}
/* 职务 */
.post span {
  word-break: break-word;
}

/* 工作经历 */
.work_history {
  color: #ff1284;
  display: flex;
  align-items: center;
  justify-content: center;
}

.work_history img {
  margin-right: 0.2rem;
  width: 0.5rem;
  height: 0.5rem;
}
.work > div {
  position: relative;
  line-height: 0.6rem;
  border-bottom: 1px solid #7f7f7f;
}
.work > div:last-child {
  border: none;
}
.work div img {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  right: 0;
  top: 0;
}
.work_caozuo {
  text-align: right;
}
.work_caozuo span {
  color: #ff1284 !important;
  margin-left: 0.2rem;
  border: 1px solid #ff1284;
  padding: 0.02rem 0.1rem;
  border-radius: 0.1rem;
}
/* 身份证上传 */
.id_card p span {
  color: #000;
}

.id_card > div {
  display: flex;
  flex-direction: row;
  margin-top: 0.3rem;
  justify-content: space-between;
}

.id_card_img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.11rem;
  height: 2.17rem;
  border-radius: 0.4rem;
  position: relative;
  border: 1px solid #7f7f7f;
}

.id_card_img input {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.id_card_img > div {
  height: 2.17rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.id_card_img > img {
  border-radius: 0.4rem;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.id_card_img > div img {
  margin-bottom: 0.1rem;
  width: 0.5rem;
  height: 0.5rem;
}

/* 话 */
.say_to_user > p {
  line-height: 0.5rem;
  margin-bottom: 0.1rem;
}

.say_to_user span {
  color: #000;
}

textarea {
  border-color: #7f7f7f;
  width: 100%;
  height: auto;
  border-radius: 0.1rem;
  padding: 0.1rem;
}
.x_img {
  position: absolute;
  top: -0.1rem;
  right: -0.1rem;
  width: 0.3rem !important;
  height: 0.3rem !important;
}

.btn {
  text-align: center;
  color: white;
  font-size: 0.3rem;
  background: #ff1284;
  margin: 0.5rem;
  border-radius: 0.1rem;
  padding: 0.15rem 0;
}
</style>