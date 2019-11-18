<template>
  <div id="login">
    <header>
      <img @click="back_tap" src="../assets/home_img/fh.png" alt />
      <h1>金秋梦装饰</h1>
      <router-link to="/regist">注册</router-link>
    </header>
    <main>
      <img src="../assets/login_ban.png" alt />
      <div class="from_login">
        <p>
          <img src="../assets/icon/tel.png" alt />
          <input v-model="mobile" placeholder="输入手机号" type="number" />
        </p>
        <!-- <span v-if="is_mobile">请输入正确的手机号</span> -->
        <p>
          <img src="../assets/icon/suo.png" alt />
          <input v-model="password" placeholder="输入密码" type="password" />
        </p>
        <div class="wx_login" @click="wx_login">
          微信
          <span>登录</span>
          <img src="../assets/wx.png" alt />
        </div>
        <!-- <span>请输入至少6位密码</span> -->
        <div class="j_pwd">
          <div @click="is_active_tap">
            <img :src="is_active?active:nomore" alt />记住密码
          </div>
          <router-link class="forget" to="/forget_pwd">忘记密码？</router-link>
        </div>
      </div>
      <div @click="login_tap" class="login">登录</div>
    </main>
    <footer>
      <p>
        没有账号？
        <transition name="linkto">
          <router-link to="/regist">去免费注册</router-link>
        </transition>
      </p>
    </footer>
  </div>
</template>
<script>
import request from "@/request.js";
import wx_login from "@/wxLogin.js";
export default {
  data() {
    return {
      is_active: false,
      nomore: require("../assets/xz_pwd.png"),
      active: require("../assets/xz_pwd1.png"),
      mobile: "",
      password: "",
      is_mobile: false
    };
  },
  created() {
    if (localStorage.getItem("mobile")) {
      this.mobile = localStorage.getItem("mobile");
    }
    if (localStorage.getItem("pwd")) {
      this.is_active = true;
      this.password = this.uncompileStr(localStorage.getItem("pwd"));
    }
  },

  methods: {
    is_active_tap() {
      // 记住密码
      this.is_active = !this.is_active;
    },
    // 微信登录
    wx_login() {
      let redirect_uri = encodeURIComponent("http://192.168.1.11:8080/#/login");
      wx_login({ });
    },
    aside_tap() {
      this.$store.state.select_city = true;
    },
    back_tap() {
      if (window.localStorage.getItem("token") == ""||this.$route.query.page) {
        this.$router.replace("/");
        window.sessionStorage.removeItem("scrollleft");
      } else {
        this.$router.go(-1);
      }
    },
    login_tap() {
      var sha1 = require("js-sha1");
      var val = { mobile: this.mobile, password: this.password };
      if (val.mobile == "" || val.password == "") {
        this.$toast("手机号或密码不能为空");
      } else if (!/^1[34578]\d{9}$/.test(val.mobile)) {
        this.$toast("请输入正确的手机号");
        this.is_mobile = true;
      } else if (val.password.length < 6) {
        this.$toast("密码不能小于6位");
      } else {
        this.$store.commit("show_looding");
        val.password = sha1(val.password);
        console.log(val);
        request({
          url: "/api/login",
          data: val,
          method: "post"
        }).then(data => {
          if (data.data.status == 200) {
            localStorage.setItem("user_info", JSON.stringify(data.data.data));
            localStorage.setItem("token", data.data.data.token);
            localStorage.setItem("mobile", val.mobile);
            if (this.is_active) {
              console.log(this.compileStr(this.password));
              localStorage.setItem("pwd", this.compileStr(this.password));
            } else {
              localStorage.removeItem("pwd");
            }
            this.$store.state.is_login = true;
            // if (this.$route.query.page) {
            this.$router.push("/home");
            // } else {
            // console.log(111111111)
            // this.$router.go(-1);
            // }
          } else {
            this.$toast(data.data.msg);
          }
          this.$store.commit("hide_looding");
        });
      }
    },
    // 加密
    compileStr(code) {
      var c = String.fromCharCode(code.charCodeAt(0) + code.length);
      console.log(c);
      for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
      }
      return escape(c);
    },
    // 解密
    uncompileStr(code) {
      code = unescape(code);
      var c = String.fromCharCode(code.charCodeAt(0) - code.length);
      for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
      }
      return c;
    },
    forget_tap() {
      console.log("wangjimima");
    }
  }
};
</script>

<style scoped>
/* 动画 */
.linkto-enter-active,
.linkto-leave-active {
  transition: all 2s;
}

.linkto-leave-active,
.linkto-enter {
  transform: translateX(1000px);
}

#login header {
  z-index: 2;
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

#login header h1 {
  font-size: 0.4rem;
  font-weight: bold;
}

#login header > a {
  color: #fff;
  font-size: 0.26rem;
  position: absolute;
  right: 0.2rem;
  padding: 0 0.2rem;
  height: 0.9rem;
  line-height: 0.9rem;
}
.wx_login {
  padding: 0.2rem 0;
  display: flex;
  align-items: center;
}
.wx_login span {
  text-decoration: underline;
  margin-right: 0.1rem;
  color: #3bbe00;
}
header > a:active {
  color: #ffffff88;
}

header > img {
  position: absolute;
  left: 0.2rem;
  width: 0.5rem;
  height: 0.5rem;
}

main {
  margin: 0.9rem 0 0.3rem;
}

main > img {
  width: 100%;
}

.from_login {
  font-size: 0.3rem;
  margin: 0 0.4rem;
}

.from_login p {
  margin: 0.2rem 0;
  padding: 0.1rem 0.2rem;
  border: 0.5px solid #7f7f7f;
  border-radius: 0.1rem;
  color: #000;
}

.from_login img {
  width: 0.5rem;
  height: 0.5rem;
  vertical-align: middle;
}

.from_login p input {
  font-size: 0.33rem;
  margin: 0.1rem;
  padding: 0rem 0rem 0rem 0.2rem;
  border-left: 0.5px solid #7f7f7f !important;
  width: 85%;
  border-radius: 0;
  background: none;
  border: none;
  outline: none;
  vertical-align: middle;
}
.from_login .forget {
  display: block;
  margin-right: 0.2rem;
  line-height: 0.8rem;
  height: 0.8rem;
  color: #000;
  font-size: 0.33rem;
  text-align: right;
}

.from_login > span {
  padding: 0.1rem 0.4rem 0.1rem 0;
  color: #488aff;
}
.j_pwd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.j_pwd img {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.1rem;
}
.j_pwd div {
  display: flex;
  align-items: center;
}
.login {
  text-align: center;
  font-size: 0.32rem;
  height: 0.8rem;
  line-height: 0.8rem;
  background: #ff1284;
  border-radius: 4px;
  margin: 0.1rem 0.5rem 0;
  color: #fff;
  border: none;
}

footer {
  margin-bottom: 1.4rem;
}

footer p {
  font-size: 0.3rem;
  text-align: center;
}

footer a {
  color: #fd2691;
}
</style>