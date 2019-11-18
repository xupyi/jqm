<template>
  <div class="design">
    <nav>
      <router-link to="/home/roadwork/road_work_content">施工下单和介绍</router-link>
      <router-link to="/home/roadwork/road_work_list">施工长</router-link>
    </nav>
    <router-view></router-view>

  </div>
</template>

<script>
  import request from '@/request.js'
  export default {
    data() {
      return {}
    },
  }

</script>

<style scoped>
 nav {
    padding: 0.2rem;
  }

  .router-link-active {
    color: white;
    background: #2fc145;
  }

  nav a {
    color: black;
    font-size: 0.24rem;
    border-radius: 0.1rem;
    margin-right: 0.16rem;
    display: inline-block;
    padding: 0.1rem 0.2rem;
    border: 1px solid #2fc145;
  }

</style>
