<template>
  <div>
    <header>
      <img @click="back_tap" src="../assets/home_img/fh.png" alt />
      <h1>我的个人中心</h1>
    </header>
    <main>
      <p>忘记密码</p>
      <div class="from_login">
        <p>
          <img src="../assets/icon/tel.png" alt />
          <input placeholder="输入手机号" type="number" v-model="val.mobile" />
        </p>
        <p class="code">
          <input placeholder="请输入你的验证码" v-model="val.code" type="number" />
          <span>
            <span @click="code_tap">{{codemsg}}</span>
            <span v-if="shadow" class="code_shadow"></span>
          </span>
        </p>
        <p>
          <img src="../assets/icon/mima.png" alt />
          <input placeholder="新密码" type="password" v-model="val.password" />
        </p>
        <p>
          <img src="../assets/icon/qrmm.png" alt />
          <input placeholder="确认密码" type="password" v-model="val.repeat_password" />
        </p>
      </div>
      <div @click="regist_tap" class="regist">保存</div>
    </main>
  </div>
</template>
  <script>
import request from "@/request";
export default {
  data() {
    return {
      shadow: false,
      codemsg: "获取验证码",
      val: {
        mobile: "",
        code: "",
        password: "",
        repeat_password: ""
      }
    };
  },
  created() {},
  methods: {
    aside_tap() {
      this.$store.state.select_city = true;
    },
    back_tap() {
      this.$router.go(-1);
    },
    code_tap() {
      if (!/^1[34578]\d{9}$/.test(this.val.mobile)) {
        this.$toast("请输入正确的手机号");
      } else {
        request({
          url: "/api/sendMsg",
          data: { send_type: "findpwd", mobile: this.val.mobile },
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            var time = 60;
            this.shadow = true;
            var t = setInterval(() => {
              this.codemsg = "重新获取(" + time + ")";
              time--;
              if (time == 0) {
                this.shadow = false;
                this.codemsg = "获取验证码";
                clearInterval(t);
              }
            }, 1000);
          } else {
            this.$toast(data.data.msg);
          }
        });
      }
    },
    regist_tap() {
      console.log(this.val);
      if (!/^1[34578]\d{9}$/.test(this.val.mobile)) {
        this.$toast("请输入正确的手机号");
      } else if (this.val.code == "") {
        this.$toast("请输入验证码");
      } else if (this.val.password.length < 6) {
        this.$toast("密码不能小于6位");
      } else if (this.val.password != this.val.repeat_password) {
        this.$toast("两次密码不一致");
      } else {
        request({
          url: "/api/codeMobileEditPassword",
          data: this.val,
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            this.$store.state.is_login = true;
            this.$dialog
              .alert({
                title: "提示",
                message: "修改成功，请重新登录！"
              })
              .then(() => {
                this.$router.replace({ path: "/login", query: { page: "login" } });
              });
          } else {
            this.$toast(data.data.msg);
          }
        });
      }
    }
  }
};
</script>
  
  <style scoped>
  main>p {
    font-weight: bold;
  font-size: 0.36rem;
  text-align: center;
  padding: 0.2rem 0;
  }
header {
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
header h1 {
  font-size: 0.4rem;
  font-weight: bold;
}

header > span {
  font-size: 0.26rem;
  position: absolute;
  right: 0.2rem;
  padding: 0 0.2rem;
  height: 0.9rem;
  line-height: 0.9rem;
}

header > img {
  position: absolute;
  left: 0.2rem;
  width: 0.5rem;
  height: 0.5rem;
}

main {
  margin: 0.9rem 0 1.2rem;
}
main h3{
  font-size: 0.36rem;
  text-align: center;
  padding:0.3rem 0 0.1rem;
}
main > img {
  width: 100%;
}

.from_login {
  font-size: 0.3rem;
  overflow: hidden;
  margin: 0 0.2rem;
}

.from_login .code input {
  box-shadow: 1px 0 0 #7d7d7d;
  width: 68%;
}
.from_login .code > span {
  position: relative;
  font-size: 0.28rem;
  width: 30%;
  margin-left: 0.1rem;
  color: #4184e3;
}
.from_login p {
  margin: 0.2rem 0;
  padding: 0.1rem 0.2rem;
  border: 0.5px solid #7d7d7d;
  border-radius: 4px;
  color: #000;
}

.from_login img {
  width: 0.5rem;
  height: 0.5rem;
  vertical-align: middle;
}

.from_login p input {
  margin: 0.1rem;
  box-shadow: -1px 0 0 #c4b9bf;
  padding: 0 0.1rem;
  width: 80%;
  background: none;
  border: none;
  outline: none;
  vertical-align: middle;
}

.code_shadow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff73;
}

.regist {
  text-align: center;
  font-size: 0.33rem;
  margin: 0.6rem;
  padding: 0.15rem;
  background: #ff1284;
  color: white;
  border-radius: 0.1rem;
}
</style>