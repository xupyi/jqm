<template>
  <div class="main" v-show="this.$store.state.unlogin_shadow">
    <transition name='unlogin'>
      <div class="unlogin_shadow" v-show="this.$store.state.unlogin_shadow">
        <div>
          <h3>真的要退出吗？</h3>
          <p @click='un_tap'>退出登录</p>
        </div>
        <p @click='remove_tap'>取消</p>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      un_tap() {
        localStorage.removeItem('user_info')
        localStorage.removeItem('token')
        this.$router.replace('/login')
        this.$store.state.unlogin_shadow = false
      },
      remove_tap() {
        this.$store.state.unlogin_shadow = false
      }
    }
  }
</script>
<style scoped>
  .unlogin-enter {
    transform: translateY(5rem);
    opacity: 0;
  }

  .unlogin-leave-to {
    transform: translateY(5rem);
    opacity: 0;
  }

  .unlogin-enter-active {
    transition: translateY(0rem);
    transition: all 0.2s;
  }

  .unlogin-leave-active {
    transition: translateY(0rem);
    transition: all 0.2s;
  }

  .main {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  .unlogin_shadow {
    position: absolute;
    bottom: 0.2rem;
    left: 0.2rem;
    right: 0.2rem;
  }

  .unlogin_shadow>div {

    margin-bottom: 0.2rem;
    text-align: center;
    line-height: 1.2rem;
    background: white;
    border-radius: 0.26rem;
  }

  .unlogin_shadow h3 {
    font-size: 0.33rem;
    color: #000;
  }

  .unlogin_shadow div p {
    border-top: 1px solid #BFBFBF;
    color: #F61A34;
    font-size: 0.42rem;
  }

  .unlogin_shadow>p {
    text-align: center;
    opacity: 1;
    height: 1.2rem;
    line-height: 1.2rem;
    background: white;
    border-radius: 0.26rem;
    font-size: 0.42rem;
    color: #0069FF;
  }
</style>