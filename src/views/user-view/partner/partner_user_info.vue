
<template>
<!-- // 城市合伙人 -->
  <div class="info">
    <header class="user_header">
      <p :style="{background:user_obj.avatar?'':'#FEF8DA'}">
        <img :src="user_obj.avatar" alt />
      </p>
      <p>{{user_obj.xing}}{{user_obj.name}}</p>
    </header>
    <ul>
      <router-link tag="li" :to="{path:'supper_detail',query: {user_type:'partner'}}">
        <span>修改城市合伙人个人资料</span>
        <img src="../../../assets/home_img/you.png" alt />
      </router-link>
      <router-link tag="li" :to="{path:'/personal/partner_await_order',query: { status:1}}">
        <span>在处理订单</span>
        <img src="../../../assets/home_img/you.png" alt />
      </router-link>
      <router-link tag="li" :to="{path:'/personal/partner_await_order',query: { status:3}}">
        <span>已确认订单</span>
        <img src="../../../assets/home_img/you.png" alt />
      </router-link>
      <router-link tag="li" :to="{path:'/personal/partner_await_order',query: { status:4}}">
        <span>已结算订单</span>
        <img src="../../../assets/home_img/you.png" alt />
      </router-link>
    </ul>
  </div>
</template>
<script>
import request from "@/request";
export default {
  data() {
    return {
      user_obj: "",
    };
  },
  created() {
    this.$store.state.title_name ="城市合伙人个人中心";
    this.user_obj = JSON.parse(localStorage.getItem("user_info"));
    request({
      url: "/api/getSelfUserInfo",
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.data.status == 200) {
        this.user_obj = data.data.data;
      }
      this.$store.commit("hide_looding");
    });
  },
};
</script>
<style scoped>
.info {
  background: #f2f2f2;
}
.user_header {
  padding: 0.2rem 0;
  background: white;
  text-align: center;
  font-size: 0;
}

.user_header img {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
}
.user_header p:first-child {
  padding: 0.1rem;
  margin: 0 auto;
  border: 1px solid #f79646;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
}
.user_header p {
  box-sizing: content-box;
  font-size: 0.32rem;
  margin: 0.2rem 0;
}

.user_header span {
  display: inline-block;
  text-align: center;
  color: #000;
  font-weight: 600;
  font-size: 0.33rem;
}
ul li {
  background: white;
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 0.2rem 1rem 0.2rem 0.3rem;
  border-top: 0.5px solid #c2c2c2;
  border-bottom: 0.5px solid #c2c2c2;
  font-size: 0.3rem;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

a {
  color: #000;
}

ul li img {
  width: 0.3rem;
  height: 0.3rem;
}
</style>