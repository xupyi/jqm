<template>
  <div>
    <div class="tabbar">
      <div @click="tab_tap(1)">
        <img v-if="1==active" src="../assets/tabbar/t1.png" />
        <img v-else src="../assets/tabbar/t1-h.png" />
        <span :style="{color:1==active?'#2bbf4a':''}">金秋梦</span>
      </div>
      <div @click="tab_tap(2)">
        <img v-if="2==active" src="../assets/tabbar/dd_g.png" />
        <img v-else src="../assets/tabbar/t3-h.png" />
        <span :style="{color:2==active?'#2bbf4a':''}">订单</span>
      </div>
      <div @click="tab_tap(3)">
        <img v-if="3==active" src="../assets/tabbar/t2.png" />
        <img v-else src="../assets/tabbar/t2-h.png" />
        <span :style="{color:3==active?'#2bbf4a':''}">购物车</span>
      </div>
      <div @click="my_tap" class="my_tap">
        <img v-if="4==active" src="../assets/tabbar/my_g.png" />
        <img v-else src="../assets/tabbar/my.png" />
        <span :style="{color:4==active?'#2bbf4a':''}">我的</span>
      </div>
      <div @click="classfiy" class="classfiy_tap">
        <img v-if="5==active" src="../assets/tabbar/fl_g.png" />
        <img v-else src="../assets/icon/fenlei.png" />
        <span :style="{color:5==active?'#2bbf4a':''}">分类</span>
      </div>
    </div>
    <div class="my_box" @click="my_tap" v-if="my_box">
      <div @click="order">
        <p>
          <img src="../assets/icon/icon-.png" alt />
        </p>
        <span>我的订单</span>
      </div>
      <router-link to="/shop">
        <p>
          <img src="../assets/icon/u_7.png" alt />
        </p>
        <span>我的购物车</span>
      </router-link>
      <router-link to="/personal">
        <p>
          <img src="../assets/icon/yduigerenzhongxin.png" alt />
        </p>
        <span>个人中心</span>
      </router-link>
      <router-link to="/complaints">
        <p>
          <img src="../assets/icon/tousu.png" alt />
        </p>
        <span>投诉建议</span>
      </router-link>
      <router-link to="/message">
        <p>
          <img src="../assets/icon/xiaoxi.png" alt />
        </p>
        <span>我的消息</span>
      </router-link>
      <router-link to="/contact">
        <p>
          <img src="../assets/icon/kefu.png" alt />
        </p>
        <span>联系我们</span>
      </router-link>
    </div>
    <div class="classfiy" @click="classfiy" v-if="classfiy_box">
      <router-link to="/home/room">
        <p>
          <img src="../assets/icon/liangfang.png" alt />
        </p>
        <span>量房预约</span>
      </router-link>
      <router-link to>
        <p>
          <img src="../assets/tabbar/t1-h.png" alt />
        </p>
        <span>进入我家</span>
      </router-link>
      <router-link to="/home/shopping/promotion">
        <p>
          <img src="../assets/icon/shangcheng.png" alt />
        </p>
        <span>装饰商城</span>
      </router-link>
      <router-link to="/home/setmeal">
        <p>
          <img src="../assets/icon/taocan1.png" alt />
        </p>
        <span>精装套餐</span>
      </router-link>
      <router-link to="/home/roadwork">
        <p>
          <img src="../assets/icon/shigong.png" alt />
        </p>
        <span>施工下单</span>
      </router-link>
      <router-link to="/home/design">
        <p>
          <img src="../assets/icon/sheji.png" alt />
        </p>
        <span>设计下单</span>
      </router-link>
      <router-link to="/home/panorama?id=0">
        <p>
          <img src="../assets/icon/jieshao.png" alt />
        </p>
        <span>风格介绍</span>
      </router-link>
      <router-link to="/home/panorama?id=2">
        <p>
          <img src="../assets/icon/taocan.png" alt />
        </p>
        <span>平面效果图</span>
      </router-link>
      <router-link to="/home/panorama?id=1">
        <p>
          <img src="../assets/icon/fullview-off.png" alt />
        </p>
        <span>全景效果图</span>
      </router-link>
      <router-link to="/home/panorama?id=3">
        <p>
          <img src="../assets/icon/fenggeceshi.png" alt />
        </p>
        <span>测试风格</span>
      </router-link>
      <router-link to="/home/answers">
        <p>
          <img src="../assets/icon/kefu.png" alt />
        </p>
        <span>装修问答</span>
      </router-link>
      <router-link to="/home">
        <p>
          <img src="../assets/icon/gongsijianjie.png" alt />
        </p>
        <span>公司简介</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "1",
      my_box: false,
      classfiy_box: false,
      coor: ""
    };
  },
  created() {
    if (window.sessionStorage.activeid) {
      this.$store.state.sess = this.active = window.sessionStorage.activeid;
    } else {
      this.active = 1;
    }
  },
  watch: {
    $route(to, from) {
      this.$store.state.sess = this.active = window.sessionStorage.activeid;
    }
  },
  methods: {
    order() {
      if (sessionStorage.getItem('activeid')  != 2) {
        this.$router.push("/order");
      }
    },
    tab_tap(i) {
      if (this.active == i) {
        return;
      } else {
        this.active == i;
      }
      if (i == 1) {
        this.$router.replace("/home");
      } else if (i == 2) {
        sessionStorage.removeItem("order_li");
        this.$router.replace("/order");
      } else if (i == 3) {
        this.$router.replace("/shop");
      }
    },
    my_tap(event) {
      this.coor == "" ? (this.coor = this.active) : "";
      this.my_box = !this.my_box;
      this.classfiy_box = false;
      if (this.my_box) {
        this.active = 4;
      } else {
        this.active = this.coor;
        this.coor = "";
      }
    },
    classfiy() {
      this.coor == "" ? (this.coor = this.active) : "";
      this.classfiy_box = !this.classfiy_box;
      this.my_box = false;
      if (this.classfiy_box) {
        this.active = 5;
      } else {
        this.active = this.coor;
        this.coor = "";
      }
    }
  },
  mounted() {
    document.addEventListener("click", e => {
      // console.log(e.target);
      if (!event.target.closest(".my_box, .my_tap")) {
        this.my_box = false;
      }
      if (!event.target.closest(".classfiy_tap, .classfiy")) {
        this.classfiy_box = false;
      }
    });
  }
};
</script>
<style scoped>
img {
  object-fit: fill;
}
.tabbar {
  background: white;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 1rem;
  border-top: 0.3px solid #000;
}

.tabbar > a {
  flex: 1;
  height: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tabbar > div {
  flex: 1;
  height: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

span {
  margin-top: 0.05rem;
  font-size: 0.22rem;
  color: #000;
}

.tabbar img {
  width: 0.35rem;
  height: 0.35rem;
}
.my_box {
  position: fixed;
  bottom: 1rem;
  width: 100%;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  padding: 0.2rem 0.4rem;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0;
  text-align: center;
}
.my_box a {
  margin: 0.2rem 0.3rem;
}
.my_box span {
  font-weight: bold;
  color: #2f8495;
}
.my_box p {
  background: white;
  border: 2px solid #2f8495;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  margin-bottom: 0.12rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.my_box img {
  width: 0.65rem;
  height: 0.65rem;
}
.my_box > div {
  margin: 0.2rem;
}
.classfiy {
  position: fixed;
  bottom: 1rem;
  width: 100%;
  background: #2f8495;
  display: flex;
  align-items: center;
  padding: 0.2rem 0.4rem;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0;
  text-align: center;
}
.classfiy a {
  margin: 0.2rem 0.3rem;
}
.classfiy span {
  font-weight: 600;
  color: white;
}
.classfiy p {
  background: white;
  border: 2px solid white;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  margin-bottom: 0.12rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.classfiy p img {
  width: 0.65rem;
  height: 0.65rem;
}
.classfiy > div {
  margin: 0.2rem;
}
</style>