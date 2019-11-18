<template>
  <div>
    <header>
      <img @click="back_tap" src="../assets/home_img/fh.png" alt>
      <h1>{{this.$store.state.title_name}}</h1>
      <!-- <router-link v-if='this.$store.state.is_login' to="/personal">个人中心</router-link>
      <router-link v-else to="/login">登录</router-link> -->
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    back_tap() {
      this.$router.back(-1);
    }
  }
};
</script>
<style scoped>
header {
  z-index: 9999;
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

header > a {
  color: white;
  font-size: 0.26rem;
  position: absolute;
  right: 0.2rem;
  padding: 0 0.2rem;
  height: 0.9rem;
  line-height: 0.9rem;
}

header > span:active {
  color: #ffffff88;
}

header > img {
  position: absolute;
  left: 0.2rem;
  width: 0.5rem;
  height: 0.5rem;
}
</style>