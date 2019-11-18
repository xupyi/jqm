<template>
  <div class="header">
    <div v-if="this.$store.state.sess==0" class="point" @click="point">
      <img src="../assets/dingwei1.png" alt />
      <span v-if="poi">{{region}}.{{city}}</span>
      <span v-else>正在定位...</span>
    </div>
    <img v-if="this.$store.state.sess==4" class="back" @click="back_tap" src="../assets/home_img/fh.png" alt>
    <h1>{{this.$store.state.title_name}}</h1>
    <p v-if="this.$store.state.sess!=4">
      <router-link v-if="this.$store.state.is_login" to="/personal">个人中心</router-link>
      <router-link v-if="!this.$store.state.is_login" to="/login">登录</router-link>
    </p>
  </div>
</template>

<script>
  import request from "@/request";
  export default {
    data() {
      return {
        city: "",
        region: "",
        poi: false,
      };
    },
    created() {
      this.get_point();
    },
    methods: {
      back_tap() {
        this.$router.go(-1);
      },
      point() {
        this.get_point();
        this.poi = false
      },
      get_point() {
        request({
          url: "/api/getIpCity",
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            this.city = data.data.data.city;
            this.region = data.data.data.region;
            setTimeout(() => {
              this.poi = true
            }, 1000);
          }
        });
      }
    }
  };

</script>

<style scoped>
  .header {
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

  .header h1 {
    font-size: 0.4rem;
    font-weight: bold;
  }

  .header>p {
    font-size: 0.26rem;
    position: absolute;
    right: 0.2rem;
    padding: 0 0.2rem;
  }

  .header a {
    color: white;
  }

  header>span:active {
    color: #ffffff88;
  }

  .point img {
    width: 0.45rem;
    height: 0.45rem;
  }

  .point {
    display: flex;
    align-items: center;
    color: white;
    font-size: 0.26rem;
    position: absolute;
    left: 0rem;
    padding: 0 0.2rem;
    height: 0.9rem;
    line-height: 0.9rem;
  }

  .back {
    position: absolute;
    left: 0.2rem;
    width: 0.5rem;
    height: 0.5rem;
  }

</style>
