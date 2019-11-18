<template>
  <div class="shadow_ss" @touchmove.prevent>
    <div>
      <div class="shadow_cont1">
        <p>{{msg}}</p>
      </div>
      <div @click='yes_tap' class="shadow_btn">
        <span>确定</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: '',
      }
    },
    created() {
      if (window.localStorage.token) {
        this.msg = '登录过期，请重新登录！'
      } else {
        this.msg = '请先登录！'
      }
    },
    methods: {
      yes_tap() {
        this.$store.state.shadow_ss = false
        this.$router.push('/login');
        window.localStorage.token = ''

      }
    },
  }

</script>
<style scoped>
  .shadow_ss {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  .shadow_ss>div {
    font-size: 0.28rem;
    background: white;
    border-radius: 0.1rem;
    overflow: hidden;
    width: 5.4rem;
    margin: 4rem auto;
  }

  .shadow_cont1 {
    text-align: center;
    padding: 1rem 0;
    font-size: 0.34rem;
  }

  .shadow_btn {
    text-align: center;
    padding: 0.2rem;
    color: white;
    background: #ff1284;
  }

</style>
