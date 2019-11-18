<template>
  <div id="app">
    <header_ />
    <router-view />
    <shadow_ss v-show="this.$store.state.shadow_ss" />
    <Looding />
    <unlogin />
    <amplify_img v-show="this.$store.state.amplify_img" />
  </div>
</template>

<script>
import header_ from "./views/Header.vue";
import Looding from "./views/Looding.vue";
import unlogin from "./views/unlogin.vue";
import amplify_img from "./views/amplify_img";
import shadow_ss from "./views/shadow.vue";
import request from '@/request'
export default {
  components: {
    header_,
    Looding,
    unlogin,
    amplify_img,
    shadow_ss
  },
  name: "App",
  data() {
    return {
      clientHeight: document.documentElement.clientHeight
    };
  },
  created() {
    const { userAgent: UA } = navigator;
    const UA_L = UA.toLowerCase();
    const Device = {
      trident: UA.includes("Trident"), //IE内核
      presto: UA.includes("Presto"), //opera内核
      iPad: UA.includes("iPad"), //是否iPad
      iPhone: UA.includes("iPhone"), //是否为iPhone或者QQHD浏览器
      webKit: UA.includes("AppleWebKit"), //苹果、谷歌内核
      webApp: UA.indexOf("Safari") === -1, //是否web应该程序，没有头部与底部
      mobile: !!UA.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: UA.includes("Android") || UA.includes("Linux"), //android终端或uc浏览器
      gecko: UA.includes("Gecko") && UA.indexOf("KHTML") === -1, //火狐内核
      wechat: UA_L.toLowerCase().match(/MicroMessenger/i) == "micromessenger", // 微信
      is: key => Device[key]
    };
    this.$store.state.is_wechat = Device.wechat;
  },
    
  mounted() {
    if (this.$route.query.code) {
      request({
        url: "/api/wxLogin",
        data: { code: this.$route.query.code },
        method: "post"
      }).then(data => {
        console.log(data.data.data, 1111111111111);
        if (data.data.status == 200) {
          localStorage.setItem("user_info", JSON.stringify(data.data.data));
          localStorage.setItem("token", data.data.data.token);
          this.$router.push("/home");
        } else {
          this.$toast(data.data.msg);
        }
        this.$store.commit("hide_looding");
      });
    }
    // window.οnlοad = function() {
    //   document.addEventListener("touchstart", function(event) {
    //     if (event.touches.length > 1) {
    //       event.preventDefault();
    //     }
    //   });
    //   var lastTouchEnd = 0;
    //   document.addEventListener(
    //     "touchend",
    //     function(event) {
    //       var now = new Date().getTime();
    //       if (now - lastTouchEnd <= 300) {
    //         event.preventDefault();
    //       }
    //       lastTouchEnd = now;
    //     },
    //     false
    //   );
    // };
    // window.addEventListener('clientHeight',function(){
    //    console.log( document.documentElement.clientHeight)
    // })
    // window.onresize = () => {
    //   console.log(this.clientHeight, document.documentElement.clientHeight);
    //   if (this.clientHeight > document.documentElement.clientHeight-100) {
    //     this.$store.state.key_pane = false;
    //   } else {
    //     this.$store.state.key_pane = true;
    //   }
    // };
  },
  methods: {}
};
</script>

<style>
#app {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  font-weight: 400;
}

img {
  object-fit: cover;
}

select,
input,
textarea {
  background: white;
  font-family: "Microsoft YaHei";
  color: #0066ff;
}

select {
  height: 28px;
  line-height: auto;
  vertical-align: middle;
  height: 22px\9;
  padding: 3px 0\9;
  box-sizing: content-box;
  font-size: 13px;
}

:root select {
  padding: 0;
  height: 24px;
}

html {
  touch-action: pan-y;
  font-size: 0;
  font-size: 13.33333vw;
  background: white;
}

* {
  box-sizing: border-box;
}

@media (min-width: 560px) {
  html {
    font-size: 54px;
  }
}

input,
html,
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
figure {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

input {
  outline: none;
  border: none;
  /* border: none !important; */
  -webkit-appearance: none;
  /*去除系统默认的样式*/
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  /* 点击高亮的颜色*/
}

.home_main {
  overflow: hidden;
}
</style>
