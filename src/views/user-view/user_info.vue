<template>
  <div>
    <div>
      <h3>修改个人资料</h3>
      <div class="avatar_uplode">
        <div  :style="{background:avatar?'':'#fef8da'}">
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
            <select @change='gender_tap' name id :value="user_info_datas.gender">
              <option value="1">男</option>
              <option value="2">女</option>
            </select>
          </div>
        </li>
        <li>
          <span>地区:</span>
          <div class="city">
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

      <div class="btn" @click="btn_tap">提交</div>
    </div>
  </div>
</template>
<script>
import request from "@/request";
import utils from "@/utils.js";
export default {
  data() {
    return {
      user_info_datas: {},
      avatar: "",
      select_Province: [],
      select_City: [],
      select_district: []
    };
  },
  created() {
    this.$store.state.title_name = "我的个人资料";
    // 获取用户信息
    request({
      url: "/api/getSelfUserInfo",
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.data.status == 200) {
        this.user_info_datas = data.data.data;
        this.avatar = data.data.data.avatar == "" ? "" : data.data.data.avatar;
        this.get_select_Province("once");
        this.get_select_city("once");
      }
    });
  },
  methods: {
    gender_tap(e){
      // 性别选择
      console.log(e.target.value)
      this.user_info_datas.gender=e.target.value
    },
    back_tap() {
      this.$router.go(-1);
    },
    // 头像上传
    async avatar_tap(e) {
      let data = e.target.files[0];
      if (data != undefined) {
        var that = this;
        let a = await utils.uplodeimg(data);
        that.up_img(a);
      }
    },
    // 图片上传
    up_img(data) {
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
        console.log(this.avatar);
      });
    },
    // 提交
    btn_tap() {
      console.log(this.user_info_datas);
      // if (!/^1[34578]\d{9}$/.test(this.user_info_datas.mobile)) {
      //   this.$toast("请输入正确的手机号！");
      // } else 
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
      } else {
        request({
          url: "/api/editUserInfo",
          data: this.user_info_datas,
          method: "post"
        }).then(data => {
          this.$store.commit("hide_looding");
          if (data.data.status == 200) {
            this.$toast("修改成功！");
            this.$router.push("/personal");
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
        this.user_info_datas.province = e.target.value
        this.get_select_city();
      }
      this.select_City = this.select_district = [];
      this.user_info_datas.city = this.user_info_datas.district = 0;
    },
    City_change(e) {
      if (e.target.value != 0) {
        this.user_info_datas.city = e.target.value
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
        this.user_info_datas.district =  e.target.value
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
  text-align: center;
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
li>p{
  padding-left: 0.2rem;
}
.avatar_img {
  
  border-radius: 50%;
  width: 1.4rem;
  height: 1.4rem;
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
  display: inline-block;
  margin: 0.1rem auto 0;
  border: 0.5px solid #7f7f7f;
  padding:0.05rem 0.1rem;
  border-radius: 0.1rem;
  text-align: center;
}


.succer ul li {
  border-bottom: 0.3px solid #7f7f7f;
  padding: 0.2rem 0.4rem;
}
/* 性别 */
.gender {
  display: flex;
  align-items: center;
}
.gender div {
  padding-left: 0.2rem;
  margin-left: 0.1rem;
  border-bottom: 0.3px solid #7f7f7f;
  width: 100%;
}
.gender select {
  border: none;
}

/* 城市列表 */
.add_city {
  display: flex;
  flex-direction: row;
  font-size: 0.3rem;
  padding: 0.2rem 0.4rem;
}
.add_city span {
  white-space: nowrap;
}
.city {
  padding-left: 0.2rem;
  margin-left: 0.1rem;
  border-bottom: 0.3px solid #7f7f7f;
  white-space: nowrap;
  width: 100%;
  font-size: 0.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.city select {
  border: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* +++++++++++++++++++++++++++++++++++++++++++ */
.guke span {
  white-space: nowrap;
  font-weight: bold;
}
.guke li {
  display: flex;
  flex-direction: row;
  margin: 0.2rem 0.4rem;
  font-size: 0.3rem;
}
.guke li input {
  padding-left: 0.2rem;
  margin-left: 0.1rem;
  width: 100%;
  border-bottom: 0.3px solid #7f7f7f !important;
}
.guke li p{
  margin-left: 0.1rem;
  width: 100%;
  border-bottom: 0.3px solid #7f7f7f !important;
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