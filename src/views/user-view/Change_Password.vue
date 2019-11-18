<template>
  <div id="change_password">
    <h3>修改密码</h3>
    <p>
      <img src="../../assets/icon/mima.png" alt="">
      <input type="password" v-model="old_password" placeholder="请输入您的旧密码"></p>
    <p>
      <img src="../../assets/icon/mima.png" alt="">
      <input type="password" v-model="new_password" placeholder="请输入您的新密码"></p>
    <p>
      <img src="../../assets/icon/qrmm.png" alt="">
      <input type="password" v-model="er_password" placeholder="请再次输入您的新密码"></p>
    <div @click='keep_tap'>保存</div>
    <router-link to="/forget_pwd">忘记密码？</router-link>
  </div>
</template>
<script>
  import request from '@/request'
  export default {
    data() {
      return {
        old_password: '',
        new_password: '',
        er_password: ''
      }
    },
    methods: {
      keep_tap() {
        if (this.old_password.length < 6 || this.new_password.length < 6) {
          this.$toast('请输入至少6位密码')
        } else if (this.new_password != this.er_password) {
          this.$toast('两次密码不一致')
        } else {
          this.$store.commit('show_looding')
          request({
            url: '/api/editPassword',
            data: {
              old_password: this.old_password,
              password: this.new_password,
              repeat_password: this.er_password
            },
            method: "post",
          }).then(data => {
            if (data.data.status == 200) {
              console.log(data)
              this.$toast(data.data.msg)
              this.$router.push('/personal/')
            } else {
              console.log(data)
              this.$toast(data.data.msg)
            }
            this.$store.commit('hide_looding')
          })
        }

      }
    }
  }
</script>
<style scoped>
  #change_password h3 {
    font-weight: bold;
  font-size: 0.36rem;
  text-align: center;
  padding: 0.2rem 0;
  }

  #change_password p {
    border: 0.5px solid #7d7d7d;
    border-radius: 0.1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin:0 0.2rem 0.2rem;
    padding: 0.1rem 0;
  }

  #change_password p img {
    margin: 0 0.2rem 0 0.2rem;
    width: 0.5rem;
    height: 0.5rem;
  }

  #change_password p input {
    width: 5rem;
    border-left: 1px solid #7D7D7D;
    font-size: 0.33rem;
    padding: 0.1rem 0.2rem;
  }

  #change_password div {

    height: 0.74rem;
    line-height: 0.74rem;
    font-size: 0.33rem;
    margin: 1rem 0.4rem 0.3rem;
    color: white;
    background: #FF1284;
    text-align: center;
    border-radius: 0.1rem;
  }

  #change_password a {
    height: 0.74rem;
    line-height: 0.74rem;
    display: block;
    font-size: 0.33rem;
    color: #FF1284;
    border: 1px solid #FF1284;
    border-radius: 0.1rem;
    text-align: center;
    margin: 0 0.4rem;
  }
</style>