<template>
  <div class="design">
    <main>
      <section class="designer">
        <div class="des_div">
          <span>选择：</span>
          <div class="city">
            <select @change="Province_change" :value="user_val.province">
              <option selected value="0">省/市</option>
              <option
                v-for="(item, index) in select_Province"
                :key="index"
                :value="item.region_id"
              >{{item.region_name}}</option>
            </select>
            <select @change="City_change" @click="City_click" :value="user_val.city">
              <option selected value="0">城市</option>
              <option
                v-for="(item, index) in select_City"
                :value="item.region_id"
                :key="index"
              >{{item.region_name}}</option>
            </select>
            <div class="sex">
              <img @click="sex_tap(1)" :src="user_val.gender==1?sex_img_active:sex_img_normal" alt />
              <span class="sex_fir">男</span>
              <img @click="sex_tap(2)" :src="user_val.gender==2?sex_img_active:sex_img_normal" alt />
              <span>女</span>
            </div>
          </div>
        </div>
        <ul>
          <li @click="designer_tap(item.id,index)" v-for="(item, index) in UserList" :key="index">
            <img :src="item.avatar" alt="图片加载失败" />
            <div>
              <span>{{item.xing}}{{item.name}}</span>
              <div>
                <img src="../../../assets/home_img/dw.png" alt />
                <span>{{item.province_name}}{{item.city_name}}</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <div class="di">已经到底啦</div>
    </main>
  </div>
</template>

<script>
import request from "@/request.js";
export default {
  data() {
    return {
      sex_img_active: require("../../../assets/home_img/dui.png"),
      sex_img_normal: require("../../../assets/home_img/yuan.png"),
      UserList: [],
      assess_index: 1,
      assess_list: [],
      pic_assess_list: [],
      zhui_assess_list: [],
      select_Province: [],
      select_City: [],
      user_val: {
        type: "constructor",
        province: "0",
        city: "0",
        gender: "",
        page: 1
      }
    };
  },
  created() {
    // 获取省份
    request({
      url: "/api/getAllProvince",
      method: "post"
    }).then(data => {
      console.log(data.data);
      if (data.data.status == 200) {
        this.select_Province = data.data.data;
      }
    });
    this.get_UserList("");
  },
  methods: {
    City_click() {
      if (this.select_City == "") {
        this.$toast("请先选择省份");
      }
    },
    sex_tap(i) {
      this.user_val.gender = this.user_val.gender == i ? "" : i;
      this.get_UserList();
    },
    designer_tap(shop_id, index) {
      this.$router.push({ path: "/designer_detail", query: { id: shop_id,type:'constructor' } });
    },
    // 城市
    Province_change(e) {
      console.log(e);
      if (e.target.selectedIndex == 0) {
        this.select_City = "";
        this.user_val.province = this.user_val.city = "0";
      } else {
        this.user_val.province = this.select_Province[
          e.target.selectedIndex - 1
        ].region_id;
      }
      this.get_select_city();
      this.get_UserList();
    },

    City_change(e) {
      if (e.target.selectedIndex == 0) {
        this.user_val.city = "0";
        this.get_UserList("");
        return;
      }
      this.user_val.city = this.select_City[
        e.target.selectedIndex - 1
      ].region_id;
      this.get_UserList();
    },

    get_select_city() {
      this.$store.commit("show_looding");
      request({
        url: "/api/getAllCity",
        data: { province_id: this.user_val.province },
        method: "post"
      }).then(data => {
        this.$store.commit("hide_looding");
        console.log(data.data);
        if (data.data.status == 200) {
          this.select_City = data.data.data;
        }
      });
    },
    get_UserList() {
      console.log(this.user_val);
      this.$store.commit("show_looding");
      request({
        url: "/api/getUserList",
        data: this.user_val,
        method: "post"
      }).then(data => {
        console.log(data);
        this.$store.commit("hide_looding");
        if (data.status == 200) {
          this.UserList = data.data.data.data;
        }
      });
    }
  }
};
</script>

<style scoped>
.designer > div {
  font-size: 0.3rem;
  margin: 0 0.2rem 0.1rem;
  display: flex;
  flex-direction: row;
}

.designer > div > div {
  flex: 1;
}
.sex {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.sex img {
  margin: 0 0.1rem;
  width: 0.34rem;
  height: 0.34rem;
}

.sex .sex_fir {
  margin-right: 0.3rem;
}

.designer > ul {
  padding: 0.1rem 0.2rem;
  overflow: hidden;
}

.designer > ul li {
  font-size: 0;
  border: 0.55px solid #bfbfbf;
  float: left;
  width: 3.4rem;
  margin: 0 0.2rem 0.25rem 0;
}

.designer > ul li > img {
  padding: 0.55px;
  width: 100%;
  height:2.5rem;
}

.designer > ul li > div {
  font-size: 0.23rem;
  padding: 0.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.designer > ul li > div > div {
  display: flex;
  align-items: center;
}

.designer > ul li > div img {
  width: 0.3rem;
  height: 0.3rem;
}

.designer > ul li:nth-child(2n) {
  margin-right: 0;
}
/* 选择城市 */
.city {
  width: 100%;
  font-size: 0.3rem;
  display: flex;
  flex-direction: row;
}

.city > div {
  position: relative;
  text-align: center;
  width: 30%;
}
.city select {
  color: #0066ff;
  margin-right: 0.2rem;
  border: none;
}
.city span span {
  max-width: 1.5rem;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

.di {
  text-align: center;
  padding: 0 0 0.2rem 0;
}
</style>