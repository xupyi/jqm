<template>
  <div class="info">
    <header class="user_header">
      <p :style="{background:user_obj.avatar?'':'#FEF8DA'}"><img :src="user_obj.avatar" alt /></p>
      <p>{{user_obj.xing}}{{user_obj.name}}</p>
    </header>
    <ul @click="no_li" v-if="a">
      <router-link v-if="order_type==4" tag="li" :to="{path:'supper_detail',query: {user_type:'designer'}}">
        <span>修改设计师个人资料</span>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link v-if="order_type==3" tag="li" :to="{path:'supper_detail',query: { user_type:'constructor'}}">
        <span>修改施工长个人资料</span>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link v-if="supper_name!='城市合伙人'&&supper_name!='业务员'"
        tag="li"
        :to="{path:'/personal/await_order',query: { status:1,order_type:order_type}}"
      >
        <span v-if="order_type==4">待设计订单</span>
        <span v-if="order_type==3">待施工订单</span>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link
        tag="li"
        :to="{path:'/personal/await_order',query: { status:2,order_type:order_type}}"
      >
      <span v-if="supper_name=='城市合伙人'||supper_name=='业务员'">在处理订单</span>
        <span v-else>待确认订单</span>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link
        tag="li"
        :to="{path:'/personal/await_order',query: { status:3,order_type:order_type}}"
      >
        <span>已确认订单</span>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link
        tag="li"
        :to="{path:'/personal/await_order',query: { status:4,order_type:order_type}}"
      >
        <span>已结算订单</span>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
    </ul>
  </div>
</template>
<script>
import request from "@/request";
export default {
  data() {
    return {
      a: true,
      order_type: "",
      user_obj:'',
      supper_name:'',
    };
  },
  created() {
    this.$store.state.title_name = this.$route.query.i+"个人中心";
    this.supper_name=this.$route.query.i
    if(this.$route.query.i=='设计师'){
      this.order_type = 4;
    }else if(this.$route.query.i=='施工长'){
      this.order_type = 3;
    }
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
  methods: {
    no_li() {
      this.a = false;
    }
  }
};
</script>
<style scoped>
.info{
  background: #F2F2F2;
}
.user_header {
  padding: 0.2rem 0;
  background: white;
  text-align: center;
  font-size: 0;
}

.user_header img {
  width:1.4rem;
  height: 1.4rem;
  border-radius: 50%;
}
.user_header p:first-child{
  padding: 0.1rem;
  margin: 0 auto;
  border: 1px solid #F79646;
  width:1.4rem;
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
  border-top: 1px solid #c2c2c2;
  border-bottom: 1px solid #c2c2c2;
  font-size: 0.32rem;
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