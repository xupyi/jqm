<template>
  <div class="about">
    <ul>
      <li
        v-for="(item, index) in tab_list"
        :key="index"
        @click="tab_Tap(index)"
        :class='num==index?"active":""'
      >{{item}}</li>
    </ul>
    <div id="view">
      <section class="one_view" v-if="num==0">
        <video controls autoplay  x5-video-player-type="h5"  :src="about.video_url"></video>
        <div class="content" v-html="about.content">{{about.content}}</div>
      </section>
      <section class="two_view" v-if="num==1">
        <div v-html="cooperate_data.content">{{cooperate_data.content}}</div>
      </section>
      <section class="three_view" v-if="num==2">
        <div class="item">
          <div @click="prev_Tap">
            <img src="../../assets/home_img/zuo.png" alt />
          </div>
          <figure>
            <img @click="big_pic(picture_url)" :src="picture_url" />
            <figcaption>{{describe}}</figcaption>
          </figure>
          <div @click="next_Tap">
            <img src="../../assets/home_img/you.png" alt />
          </div>
        </div>
        <div class="list">
          <ul>
            <li
              @click="img_Tap(index)"
              v-for="(item, index) in img_list"
              :key="index"
              :style='{borderColor:tap_index==index?"#fd2692":""}'
            >
              <img :src="item.picture_url" alt />
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import request from "@/request.js";
export default {
  data() {
    return {
      num: 0,
      tap_index: 0,
      picture_url: "",
      img_list: [],
      describe: "",
      about: {},
      cooperate_data: {},
      tab_list: ["关于我们", "合作品牌", "公司证照"]
    };
  },
  created() {
    // about
    this.$store.commit("show_looding");
    request({
      url: "/api/getArticleDetaild?type=about",
      method: "post"
    }).then(data => {
      this.$store.commit("hide_looding");
      if (data.status == 200) { 
        // let content = data.data.data.content;
        // window.content = content;
        this.about = data.data.data;
      }
    });
    // 合作
    request({
      url: "/api/getArticleDetaild?type=cooperative_brand",
      method: "post"
    }).then(data => {
      if (data.status == 200) {
       
        this.cooperate_data = data.data.data;
      }
    }),
      // 证件照
      request({
        url: "/api/getConpanyPicture",
        method: "post"
      }).then(data => {
        if (data.status == 200) {
          this.img_list = data.data.data;
          this.describe = data.data.data[0].describe;
          this.picture_url = data.data.data[0].picture_url;
        }
      });
  },
  methods: {
    //   图片放大
    big_pic(picture_url) {
      this.$store.state.amplify_img= picture_url;
    },
    tab_Tap(index) {
      this.num = index;
    },
    img_Tap(i) {
      this.picture_url = this.img_list[i].picture_url;
      this.tap_index = i;
      this.describe = this.img_list[i].describe;
    },
    prev_Tap() {
      if (this.tap_index <= this.img_list.length) {
        this.tap_index = 0;
      } else {
        this.tap_index = this.tap_index - 1;
      }
      this.describe = this.img_list[this.tap_index].describe;
      this.picture_url = this.img_list[this.tap_index].picture_url;
    },
    next_Tap() {
      console.log(this.tap_index);
      if (this.tap_index >= this.img_list.length - 1) {
        this.tap_index = this.tap_index;
      } else {
        this.tap_index = this.tap_index + 1;
      }
      this.describe = this.img_list[this.tap_index].describe;
      this.picture_url = this.img_list[this.tap_index].picture_url;
    }
  }
};
</script>
<style scoped>
.about > ul {
  background: white;
  width: 100%;
  position: fixed;
  padding: 0.2rem ;
  overflow: hidden;
  z-index: 99;
}

.about > ul li {
  transition: all 0.1s;
  margin-right: 0.1rem;
  float: left;
  padding: 0.1rem 0.3rem;
  text-align: center;
  font-size: 0.24rem;
  border: 1px solid #2bbf4a;
  border-radius: 0.11rem;
}
.active {
  color: white !important;
  background-color: #2bbf4a !important;
}

#view {
  margin:0rem 0 0.2rem;
  padding: 1rem 0 0;
}

.one_view > div {
  text-align: center;
  padding:0rem 0.2rem 0.3rem;
}

.one_view img {
  width: 100%;
  height: 100%;
  margin-bottom: 0.4rem;
}
.one_view video{
  /* height: 3rem; */
  width: 100%;
}
.one_view .content {
  text-align: justify;
  line-height: 0.5rem;
  color: #000;
  font-size: 0.28rem;
}

.two_view {
  padding: 0.2rem 0.2rem 0;
}

.two_view div {
  border: 1px solid #d8d8d8;
  font-size: 0;
}
.two_view div img {
  width: 100%;
  height: 100%;
}

.three_view .item {
  padding: 0.2rem 0.2rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.item div > img {
  width: 0.5rem;
  height: 0.5rem;
}
.item figure {
  border: 1px solid #d8d8d8;
  width: 5rem;
  height: 7rem;
}

.item figure img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.item figcaption {
  margin: 0.2rem 0;
  text-align: center;
  font-size: 0.3rem;
  font-weight: bold;
}

.list {
  margin-top: 0.5rem;
  padding: 0.4rem 0 0;
  text-align: center;
}

.list ul {
  display: inline-block;
}

.list ul li {
  width: 1.4rem;
  height: 2rem;
  border: 2px solid #d8d8d8;
  margin-right: 0.2rem;
  float: left;
}

.list ul li:last-child {
  margin: 0;
}

.list ul li img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>