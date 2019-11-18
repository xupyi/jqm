<template>
  <div class="order">
    <ul class="order_ul">
      <li @click="li_tap(1)" :class="type_i==1?'router-link-active':''">购物订单</li>
      <li @click="li_tap(4)" :class="type_i==4?'router-link-active':''">设计订单</li>
      <li @click="li_tap(3)" :class="type_i==3?'router-link-active':''">施工订单</li>
      <li @click="li_tap(2)" :class="type_i==2?'router-link-active':''">精装套餐订单</li>
    </ul>
    <router-view class="order_view" />
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "../views/Tabbar";
import request from "@/request";
export default {
  components: { Tabbar },
  data() {
    return { type_i: "1" };
  },
  created() {
    this.type_i=sessionStorage.getItem('order_li')?sessionStorage.getItem('order_li'):'1'
    sessionStorage.activeid = 2;
    this.$store.state.title_name = "我的订单";
    request({
      url: "/api/getUserCartList",
      method: "post"
    }).then(data => {
      this.$store.commit("hide_looding");
    });
  },
  methods: {
    li_tap(i) {
      this.type_i=i
      sessionStorage.setItem('order_li',i)
      if (i == 1) {
        this.$router.push({
          path: "shop_order"
        });
      } else {
        this.$router.push({
          path: "other_order",
          query: { type: this.type_i }
        });
      }
    }
  },
};
</script>

<style scoped>
.router-link-active {
  border-color: #2fc145 !important;
  background: #2fc145;
  color: white;
}

.order_ul {
  position: fixed;
  top: 0.9rem;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  justify-content: space-around;
  padding: 0.2rem 0.2rem;
  align-items: center;
}

.order_ul li {
  margin-right: 0.15rem;
  font-size: 0.24rem;
  padding: 0.1rem 0;
  flex: 1;
  text-align: center;
  border: 1px solid #00cc00;
  border-radius: 0.1rem;
}
.order_ul li:last-child {
  margin-right: 0;
  flex: 1.3;
}

.order_view {
  position: fixed;
  top: 1.8rem;
  bottom: 1rem;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>