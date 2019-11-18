<template>
  <div class="jqm">
    <header class="user_header" v-if="user_obj">
      <p :style="{background:user_obj.avatar?'':'#fef8da'}">
        <img :src="user_obj.avatar" alt />
      </p>
      <p v-if="user_obj.xing">{{user_obj.xing}}{{user_obj.name}}</p>
    </header>
    <div class="link">
      <!-- +++++++++++++++++++++++++++++++++ -->
      <router-link to="/personal/constructor_user_info" v-if="constructor">
        <div>
          <img src="../../assets/u_2_l.png" alt />
          <span style="color: #0066ff">施工长个人中心</span>
        </div>
        <img src="../../assets/you-l.png" alt />
      </router-link>
      <router-link to="/personal/desgin_user_info" v-if="designer">
        <div>
          <img src="../../assets/u_2_l.png" alt />
          <span style="color: #0066ff">设计师个人中心</span>
        </div>
        <img src="../../assets/you-l.png" alt />
      </router-link>
      <router-link to="/personal/partner_user_info" v-if="partner">
        <div>
          <img src="../../assets/u_2_l.png" alt />
          <span style="color: #0066ff">城市合伙人个人中心</span>
        </div>
        <img src="../../assets/you-l.png" alt />
      </router-link>
      <router-link
        :to="{path:'/personal/xiaogong_user_info',query:{i:xiaogong}}"
        v-if="xiaogong!=''"
      >
        <div>
          <img src="../../assets/u_2_l.png" alt />
          <span style="color: #0066ff">{{xiaogong_name}}个人中心</span>
        </div>
        <img src="../../assets/you-l.png" alt />
      </router-link>
      <router-link to="/personal/salesman_user_info" v-if="salesman">
        <div>
          <img src="../../assets/u_2_l.png" alt />
          <span style="color: #0066ff">业务员个人中心</span>
        </div>
        <img src="../../assets/you-l.png" alt />
      </router-link>
      <div @click="wx_login" v-show="is_wx">
        <div>
          <img src="../../assets/icon/u_2.png" alt />
          <span>绑定微信</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </div>
      <router-link to="/personal/user_info">
        <div>
          <img src="../../assets/icon/u_2.png" alt />
          <span>修改个人资料</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link to="/personal/house_info">
        <div>
          <img src="../../assets/icon/u_5.png" alt />
          <span>我的房屋信息</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link to="/personal/change_password">
        <div>
          <img src="../../assets/icon/mima.png" alt />
          <span>修改密码</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link to="/personal/address">
        <div>
          <img src="../../assets/icon/u_3.png" alt />
          <span>我的收货地址</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link to="/personal/collection">
        <div>
          <img src="../../assets/icon/u_4.png" alt />
          <span>我的收藏商品</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>

      <router-link to="/shop">
        <div>
          <img src="../../assets/icon/u_7.png" alt />
          <span>我的购物车</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <div @click="order_tap">
        <div>
          <img src="../../assets/tabbar/t3-h.png" alt />
          <span>我的订单</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </div>
      <router-link to="/personal/invoice">
        <div>
          <img src="../../assets/icon/u_6.png" alt />
          <span>我的发票</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link to="/message">
        <div>
          <img src="../../assets/icon/u_9.png" alt />
          <span>我的消息</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link to="/personal/my_complaints">
        <div>
          <img src="../../assets/icon/u_10.png" alt />
          <span>我的建议投诉</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link to="/contact">
        <div>
          <img src="../../assets/icon/u_10.png" alt />
          <span>联系我们</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <router-link to="/personal/my_code">
        <div>
          <img src="../../assets/icon/u_11.png" alt />
          <span>金秋梦微信二维码</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </router-link>
      <div class="unlogin" @click="unlogin_tap">
        <div>
          <img src="../../assets/icon/u_12.png" alt />
          <span>退出登录</span>
        </div>
        <img src="../../assets/home_img/you.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/request";
import Wx_Login from "@/wxLogin.js";
export default {
  data() {
    return {
      user_obj: {},
      partner: "",
      salesman: "",
      xiaogong: "",
      xiaogong_name: "",
      constructor: "",
      designer: "",
      is_wx:true,
    };
  },
  created() {
    this.$store.state.title_name = "我的个人中心";
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    if (localStorage.getItem("user_info")) {
      this.is_wx=user_info.unionid?false:true
      console.log(user_info.type);
    } else {
    }

    if (user_info != null) {
      if (user_info.type.indexOf("salesman") != -1) {
        this.salesman = true;
      }
      if (user_info.type.indexOf("constructor") != -1) {
        this.constructor = true;
      }
      if (user_info.type.indexOf("designer") != -1) {
        this.designer = true;
      }
      if (user_info.type.indexOf("plumber_and_electrician") != -1) {
        this.xiaogong = "plumber_and_electrician";
        this.xiaogong_name = "水电工";
      }
      if (user_info.type.indexOf("bricklayer") != -1) {
        this.xiaogong = "bricklayer";
        this.xiaogong_name = "瓦工";
      }
      if (user_info.type.indexOf("carpentry") != -1) {
        this.xiaogong = "carpentry";
        this.xiaogong_name = "木工";
      }
      if (user_info.type.indexOf("oil_worker") != -1) {
        this.xiaogong = "oil_worker";
        this.xiaogong_name = "油工";
      }
      if (user_info.type.indexOf("coolie_worker") != -1) {
        this.xiaogong = "coolie_worker";
        this.xiaogong_name = "小工";
      }
      // +++++++++++
      if (user_info.type.indexOf("bricklayer") != -1) {
        this.xiaogong = "bricklayer";
        this.xiaogong_name = "瓦工";
      }
      // +++++++++++
      if (user_info.type.indexOf("partner") != -1) {
        this.partner = true;
      }
    }
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
  mounted() {
    let { code } = this.$route.query;
    console.log("code", code);
    if (code) {
      request({
        url: "/api/bindingWx",
        data: {
          code: code,
          token: localStorage.getItem("token")
        },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.$toast("绑定成功！");
        }
        this.$store.commit("hide_looding");
      });
    }
  },
  methods: {
    wx_login() {
      let redirect_uri = encodeURIComponent('http://192.168.1.11:8080/#/personal')
      Wx_Login({redirect_uri});
    },
    unlogin_tap() {
      this.$store.state.unlogin_shadow = true;
    },
    order_tap() {
      sessionStorage.removeItem("order_li");
      this.$router.push("/order");
    }
  }
};
</script>
<style scoped>
.jqm {
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
  margin: 0 auto;
  border: 1px solid #f79646;
  padding: 0.1rem;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
}

.user_header p {
  box-sizing: content-box;
  font-size: 0.32rem;
  margin: 0.1rem 0 0;
}

.user_header span {
  display: inline-block;
  text-align: center;
  color: #000;
  font-weight: 600;
  font-size: 0.33rem;
}

.link {
  padding-top: 0.2rem;
  border-top: 0.5px solid #bdbdbd;
}

.link a {
  margin-bottom: 0.2rem;
  background: white;
  padding: 0 0.6rem 0 0.3rem;
  font-size: 0.3rem;
  border-bottom: 0.5px solid #bdbdbd;
  border-top: 0.5px solid #bdbdbd;
  height: 0.8rem;
  flex-direction: row;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link > div {
  margin-bottom: 0.2rem;
  background: white;
  padding: 0 0.6rem 0 0.3rem;
  font-size: 0.3rem;
  border-bottom: 0.5px solid #bdbdbd;
  border-top: 0.5px solid #bdbdbd;
  height: 0.8rem;
  flex-direction: row;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link > a div img {
  object-fit: contain;
  margin-right: 0.1rem;
  width: 0.35rem;
  height: 0.35rem;
}

.link > a div {
  display: flex;
  align-items: center;
}

.link > a > img {
  margin-right: 0.3rem;
  width: 0.3rem;
  height: 0.3rem;
}

.link > div div img {
  object-fit: contain;
  margin-right: 0.1rem;
  width: 0.35rem;
  height: 0.35rem;
}

.link > div > div {
  display: flex;
  align-items: center;
}

.link > div > img {
  margin-right: 0.3rem;
  width: 0.3rem;
  height: 0.3rem;
}

.unlogin {
  margin-bottom: 1rem !important;
}
</style>
