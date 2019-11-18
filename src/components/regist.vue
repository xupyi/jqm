<template>
  <div>
    <header>
      <img @click="back_tap" src="../assets/home_img/fh.png" alt />
      <h1>金秋梦装饰</h1>
      <router-link :to="{path:'/login',query:{page:'login'}}">登录</router-link>
    </header>
    <main>
      <img src="../assets/login_ban.png" alt />
      <div class="from_login">
        <p>
          <img src="../assets/icon/tel.png" alt />
          <input v-model="mobile" placeholder="输入手机号" type="number" />
        </p>
        <p class="code">
          <input placeholder="请输入你的验证码" v-model="code" type="number" />
          <span>
            <span @click="code_tap">{{codemsg}}</span>
            <span v-if="shadow" class="code_shadow"></span>
          </span>
        </p>
        <p>
          <img src="../assets/icon/suo.png" alt />
          <input v-model="password" placeholder="请输入你的密码" type="password" />
        </p>
        <p>
          <img src="../assets/icon/suo.png" alt />
          <input v-model="password_" placeholder="请再次输入你的密码" type="password" />
        </p>
        <div class="city">
          <div>
            <select @change="Province_change">
              <option value="0" selected>省/市</option>
              <option v-for="(item, index) in select_Province" :key="index" :value="item.region_id">{{item.region_name}}
              </option>
            </select>
          </div>
          <div>
            <select name id @change="City_change" @click="City_click">
              <option value="0">城市</option>
              <option v-for="(item, index) in select_City" :value="item.region_id" :key="index">{{item.region_name}}
              </option>
            </select>
          </div>
          <div>
            <select @change="district_change" @click="district_click">
              <option value="0">所在城市</option>
              <option v-for="(item, index) in select_district" :key="index" :value="item.region_id">{{item.region_name}}
              </option>
            </select>
          </div>
        </div>
        <div class="agree_on">
          <img @click="agree_ty" :src="agree_on?active:normal" alt />
          我已同意并阅读
          <span @click="is_show=true">"协议内容"</span>
        </div>
      </div>
      <div @click="regist_tap" class="regist">立即注册</div>
      <div class="re_foot">
        <div class="wx_login" @click='wx_login'>
          <span>微信快速登录</span>
          <img src="../assets/wx.png" alt />
        </div>
        <div>
          已有账号？
          <router-link :to="{path:'/login',query:{page:'login'}}">马上登录</router-link>
        </div>
      </div>
    </main>
    <div v-if="is_show" class="shadow">
      <div>
        <p class="head">
          {{ArticleDetaild.title}}
        </p>
        <div class="cont" v-html="ArticleDetaild.content"></div>
        <p class="define">
          <span @click="show_tap">确定</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import request from "@/request";
  import wx_login from "@/wxLogin.js";
  export default {
    data() {
      return {
        is_show: false,
        agree_on: false,
        shadow: false,
        code: "",
        codemsg: "获取验证码",
        mobile: "",
        password: "",
        password_: "",
        active: require("../assets/home_img/dui.png"),
        normal: require("../assets/home_img/yuan.png"),
        select_Province: [],
        select_City: [],
        select_district: [],
        province: "", //省份id
        city: "", //市id
        district: "", //区id
        ArticleDetaild: "",
        select_Province: [], //省列表
        select_City: [], //城市列表
        select_district: [] //区县列表
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
      request({
        url: "/api/getArticleDetaild?type=agreement",
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.ArticleDetaild = data.data.data;
        }
      });
    },
    methods: {
      // 微信登录
      wx_login() {
        wx_login();
      },
      code_tap() {
        if (!/^1[34578]\d{9}$/.test(this.mobile)) {
          this.$toast("请输入正确的手机号");
        } else {
          // 15037167069
          request({
            url: "/api/sendMsg",
            data: {
              send_type: "register",
              mobile: this.mobile
            },
            method: "post"
          }).then(data => {
            console.log(data.data);
            if (data.data.status == 200) {
              var time = 180;
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
      back_tap() {
        this.$router.go(-1);
      },
      agree_ty() {
        this.agree_on = !this.agree_on;
      },
      regist_tap() {
        var val = {
          mobile: this.mobile,
          code: this.code,
          password: this.password,
          repeat_password: this.password_,
          province: this.province,
          city: this.city,
          district: this.district,
          type: this.type
        };
        console.log(val);
        if(this.$route.query.invitation_code){
          val.invitation_code=this.$route.query.invitation_code
        }
        if (!/^1[34578]\d{9}$/.test(val.mobile)) {
          this.$toast("请输入正确的手机号");
        } else if (val.code == "") {
          this.$toast("请输入验证码");
        } else if (val.password.length < 6) {
          this.$toast("密码不能小于6位");
        } else if (val.password != val.repeat_password) {
          this.$toast("两次密码不一致");
        } else if (this.agree_on == false) {
          this.$toast('请勾选同意并阅读"协议内容"');
        } else {
          request({
            url: "/api/register",
            data: val,
            method: "post"
          }).then(data => {
            console.log(data.data);
            if (data.data.status == 200) {
              console.log(data.data);
              this.$store.state.is_login = true;
              this.$dialog
                .alert({
                  title: "提示",
                  message: "注册成功，立即登录！"
                })
                .then(() => {
                  this.$router.push({
                    path: "/login",
                    query: {
                      page: "login"
                    }
                  });
                });
            } else {
              this.$toast(data.data.msg);
            }
          });
        }
      },
      Province_change(e) {
        if (e.target.value != 0) {
          this.province = e.target.value
          this.select_City = this.select_district = [];
          this.city = this.district = "";
          this.get_select_city();
        }
      },
      City_change(e) {
        if (e.target.value != 0) {
          this.city = e.target.value
          this.select_district = [];
          this.district = "";
          this.get_select_district(1);
        } else {
          this.select_district = [];
          this.city = this.district = "";
        }
      },
      City_click() {
        if (this.province == "") {
          this.$toast("请先选择省/市");
        }
      },
      district_change(e) {
        if (e.target.value != 0) {
          this.district = e.target.value
        } else {
          this.district = "";
        }
      },
      district_click() {
        if (this.city == "") {
          this.$toast("请先选择城市");
        }
      },
      get_select_city(i) {
        request({
          url: "/api/getAllCity",
          data: {
            province_id: this.province
          },
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            this.select_City = data.data.data;
            if (i) {
              this.get_select_district();
            }
          }
        });
      },
      get_select_district() {
        console.log("district");
        request({
          url: "/api/getAllDistrict",
          data: {
            city_id: this.city
          },
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

  header a {
    color: white;
    font-size: 0.26rem;
    position: absolute;
    right: 0.2rem;
    padding: 0 0.2rem;
    height: 0.9rem;
    line-height: 0.9rem;
  }

  header a:active {
    color: #ffffff88;
  }

  header>img {
    position: absolute;
    left: 0.2rem;
    width: 0.5rem;
    height: 0.5rem;
  }

  main {
    margin: 0.9rem 0 1.4rem;
  }

  main>img {
    width: 100%;
  }

  .from_login {
    font-size: 0.3rem;
    margin: 0 0.4rem;
  }

  .from_login .code {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .from_login .code input {
    border-left: 0;
    border-right: 0.5px solid #7f7f7f;
    width: 70%;
  }

  .from_login .code>span {
    text-align: center;
    white-space: nowrap;
    position: relative;
    font-size: 0.28rem;
    width: 30%;
    color: #4184e3;
  }

  .code_shadow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff73;
  }

  .from_login p {
    margin: 0.2rem 0;
    padding: 0.1rem 0.2rem;
    border: 0.5px solid #7f7f7f;
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
    border-left: 0.5px solid #7f7f7f;
    padding: 0 0.2rem;
    width: 80%;
    background: none;
    outline: none;
    vertical-align: middle;
  }

  .regist {
    text-align: center;
    font-size: 0.32rem;
    height: 0.8rem;
    background: #ff1284;
    color: white;
    margin: 0.3rem 0;
    line-height: 0.8rem;
  }

  .agree_on {
    display: flex;
    align-items: center;
  }

  .agree_on span {
    color: #ff1284;
  }

  .agree_on img {
    margin-right: 0.1rem;
    width: 0.35rem;
    height: 0.35rem;
    vertical-align: middle;
  }

  .re_foot {
    font-size: 0.3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.4rem;
  }

  .re_foot .wx_login {
    display: flex;
    align-items: center;
  }

  .wx_login img {
    margin-left: 0.2rem;
    width: 0.5rem;
    height: 0.5rem;
  }

  .re_foot a {
    color: #ff1284;
  }

  /* +++++++++++++++++city++++++++ */
  .city {
    border-radius: 0.1rem;
    margin-bottom: 0.3rem;
    border: 0.5px solid #7f7f7f;
    padding: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .city select {
    border: none;
  }

  .city div {
    text-align: center;
    border-right: 0.5px solid #7f7f7f;
    flex: 1;
  }

  .city div:last-child {
    border: none;
  }

  /* shadow--------------------------------】 */

  .shadow {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  .shadow>div {
    padding-top: 0.2rem;
    width: 5.8rem;
    margin: 2rem auto;
    background: white;
    border-radius: 0.2rem;
    overflow: hidden;
  }

  .shadow .head {
    position: relative;
    height: 0.76rem;
    line-height: 0.76rem;
    text-align: center;
    font-size: 0.36rem;
  }

  .shadow .cont {
    border-top: 0.5px solid #7f7f7f;
    margin: 0 0.2rem;
    text-align: justify;
    line-height: 0.5rem;
    height: 7rem;
    overflow-y: auto;
    padding: 0.2rem;

    font-size: 0.33rem;
  }

  .shadow .define {
    text-align: center;
    font-size: 0.36rem;
    background-color: #ff1284;
    padding: 0.2rem;
    color: white;
  }

</style>
