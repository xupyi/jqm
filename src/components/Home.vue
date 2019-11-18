<template>
  <div class="home">
    <main class="home_main">
      <nav class="home_nav">
        <ul @click="nav_tap">
          <router-link
            :data-index="index"
            v-for="(item, index) in nav_list"
            :key="index"
            :to="item.link"
            tag="li"
          >{{item.title}}</router-link>
        </ul>
      </nav>
      <router-view class="container" />
    </main>
    <div class="footer111">
      <Tabbar />
    </div>
  </div>
</template>
<script>
import Tabbar from "../views/Tabbar";
import request from '../request'
export default {
  components: {
    Tabbar
  },
  data() {
    return {
      left: "0",
      nav_list: [
        {
          title: "公司简介",
          link: "/home/about"
        },
        {
          title: "装修问答",
          link: "/home/answers"
        },
        {
          title: "风格案例(全景)",
          link: "/home/panorama?id=0"
        },
        {
          title: "量房预约(免费)",
          link: "/home/room"
        },
        {
          title: "设计",
          link: "/home/design"
        },
        {
          title: "施工",
          link: "/home/roadwork"
        },
        {
          title: "精装套餐",
          link: "/home/setmeal"
        },
        {
          title: "装饰商城",
          link: "/home/shopping"
        }
      ]
    };
  },
  created() {
    this.$store.state.title_name = "金秋梦装饰";
    sessionStorage.activeid = 1;
    console.log(this.$route.query.code,11);
    if (this.$route.query.code) {
      console.log(this.$route.query.code);
      request({
        url: "/api/wxLogin",
        data: {
          code: this.$route.query.code
        },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.$toast("登录成功");
        } else {
          this.$toast(data.data.msg);
        }
        this.$store.commit("hide_looding");
      });
    }
  },
  mounted() {
    // var container=document.querySelector('.container')
    // container.addEventListener('scroll',function(){
    //   sessionStorage.setItem('scrolltop',container.scrollTop)
    // })
    var home_nav = document.querySelector(".home_nav");
    // home_nav.addEventListener('scroll',function(){
    //   console.log(home_nav.scrollLeft)
    // })
    if (sessionStorage.getItem("scrollleft")) {
      home_nav.scrollLeft = sessionStorage.getItem("scrollleft");
    }
    // if(sessionStorage.getItem('scrolltop')){
    //   container.scrollTop=sessionStorage.getItem('scrolltop')
    // }
  },
  methods: {
    nav_tap(e) {
      var scrollLeft = document.querySelector(".home_nav").scrollLeft;
      console.log(scrollLeft);
      sessionStorage.setItem("scrollleft", scrollLeft);
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
}
.home_main {
  flex: 1;
  position: absolute;
  top: 0.9rem;
  bottom: 1rem;
  font-size: 0.24rem;
  overflow-y: auto;
}

.home_nav {
  background: white;
  position: fixed;
  top: 0.9rem;
  left: 0;
  right: 0;
  height: 0.8rem;
  overflow: auto;
}

.home_nav::-webkit-scrollbar {
  display: none;
}

.home_nav ul {
  position: absolute;
  height: 0.8rem;
  display: flex;
  flex-direction: row;
}

.home_nav ul li {
  border-bottom: 2px solid #000;
  white-space: nowrap;
  line-height: 0.85rem;
  padding: 0 0.3rem;
  font-size: 0.3rem;
  font-weight: bold;
}

.container {
  position: fixed;
  top: 1.7rem;
  left: 0;
  right: 0;
  bottom: 1rem;
  overflow-y: auto;
}

.router-link-active {
  transition: all 0.1s;
  border-bottom-color: #2fc145 !important;
  color: #2fc145;
}
</style>
