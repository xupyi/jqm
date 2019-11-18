<template>
  <div class="address">
    <h3>我的收货地址</h3>
    <ul>
      <li v-for="(item, index) in address_list" :key="index">
        <div class="title">
          <div>
            <span>{{item.consignee}}</span>
            <span>{{item.mobile}}</span>
          </div>
          <p>{{item.user_detail_info}}{{item.address}}</p>
        </div>
        <div class="operate" v-if="address" @click="address_tap(item.id)">
          <div class="x_right">
            <span>选择</span>
          </div>
        </div>
        <div class="operate" v-else>
          <div @click="setting_tap(item.id)" class="operate_l">
            <img :src="item.default==1?active_img:normal_img" alt />
            <span>设为默认地址</span>
          </div>
          <div class="operate_r">
            <div @click="operate_tap(item.id)">
              <img src="../../assets/xg_.png" alt />
              <span>修改</span>
            </div>
            <div @click="del_tap(item.id)">
              <img src="../../assets/sc_.png" alt />
              <span>删除</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <router-link class="btn" to="/personal/add_address" v-if="!address">
      <img src="../../assets/tianjia-yin.png" alt />
      <span>新增收货地址</span>
    </router-link>
  </div>
</template>
<script>
import request from "@/request";
export default {
  data() {
    return {
      active_img: require("../../assets/home_img/dui.png"),
      normal_img: require("../../assets/home_img/yuan.png"),
      address_list: [],
      address: ""
    };
  },
  created() {
    if (this.$route.query.path) {
      console.log(this.$route.query.path);
      this.address = this.$route.query.path;
    }
    this.$store.commit("show_looding");
    request({
      url: "/api/getUserAddressList",
      method: "post"
    }).then(data => {
      if (data.data.status == 200) {
        console.log(data);
        this.address_list = data.data.data;
        
      } else {
        console.log(data);
        this.$toast(data.data.msg);
      }
      this.$store.commit("hide_looding");
    });
  },

  methods: {
    address_tap(i) {
      sessionStorage.setItem("address", i);
      this.$router.go(-1);
    },
    setting_tap(i) {
      this.$store.commit("show_looding");
      request({
        url: "/api/setDefaultAddress",
        data: { id: i },
        method: "post"
      }).then(data => {
        if (data.data.status == 200) {
          this.active = i;
          console.log(data);
          this.$toast(data.data.msg);
        } else {
          console.log(data);
          this.$toast(data.data.msg);
        }
        this.$store.commit("hide_looding");
      });
    },
    operate_tap(id) {
      this.$router.push({ path: "/personal/add_address", query: { id: id } });
    },
    del_tap(id) {
      this.$store.commit("show_looding");
      request({
        url: "/api/delAddress",
        data: { id: id },
        method: "post"
      }).then(data => {
        if (data.data.status == 200) {
          for (var i = 0; i < this.address_list.length; i++) {
            if (this.address_list[i].id == id) {
              this.address_list.splice(i, 1);
            }
          }
          console.log(data);
          this.$toast(data.data.msg);
        } else {
          console.log(data);
          this.$toast(data.data.msg);
        }
        this.$store.commit("hide_looding");
      });
    },
    btn_tap() {
      this.$router.push("/personal/add_address");
    }
  }
};
</script>
<style scoped>
.address {
  background: #f2f2f2;
}
h3 {
  background: white;
  font-weight: bold;
  font-size: 0.36rem;
  text-align: center;
  padding: 0.2rem 0;
}

ul li {
  background: white;
  font-size: 0.3rem;
  margin-bottom: 0.2rem;
  border-top: 0.3px solid #7f7f7f;
  border-bottom: 0.3px solid #7f7f7f;
}

.title {
  border-bottom: 0.1px solid #7f7f7f;
  padding: 0.2rem;
}
.title > p {
  font-size: 0.26rem;
  overflow-wrap: break-word;
}
.title div {
  line-height: 0.4rem;
  margin-bottom: 0.25rem;
  overflow: hidden;
}

.title div span:first-child {
  float: left;
  width: 4.8rem;
}

.title div span:last-child {
  float: right;
}

.operate {
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  height: 0.9rem;
  align-items: center;
}

.operate img {
  width: 0.3rem;
  height: 0.3rem;
}

.operate_l img {
  vertical-align: middle;
}

.operate_l span {
  vertical-align: middle;
}

.operate_r {
  display: flex;
  flex-direction: row;
}

.operate_r div {
  color: #ff1284;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 0.2rem;
}
.x_right{
  width: 100%;
  text-align: center;
  color: #ff1284;
}
/* ++++++++++++++++++++++++= */
.btn {
  margin: 0.6rem;
  padding: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.33rem;
  background: #ff1284;
  color: white;
  border-radius: 0.1rem;
}

.btn a {
  color: white;
}

.btn img {
  margin-right: 0.1rem;
  width: 0.5rem;
  height: 0.5rem;
}
</style>