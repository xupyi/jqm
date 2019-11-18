<template>
  <div class="contact" id="contact">
    <header>
      <div class="search">
        <input v-model="value" type="text" />
        <span @click="search_Tap">搜索</span>
      </div>
      <nav>
        <ul>
          <li @click="sm" class="sm">申明</li>
          <li @click="nav_Tap(index)" v-for="(item,index) in nav_list" :key="index" :class="index==type?'active':''">
            {{item}}</li>
        </ul>
      </nav>
    </header>
    <main>
      <ul class="list">
        <li v-for="(item, index) in list_datas" :key="index">
          <div @click="item_Tap(index)" :style="{background:item.is?'#F2F2F2': '#FFF8E1'}">
            <h2>
              <span>{{index+1}}问：</span>
              {{item.question}}
            </h2>
            <img :src="item.is?active_img:hide_img" alt />
          </div>
          <div @click="item_Tap(index)" class="da" v-show="item.is">
            <p>
              <span>
                <span style="opacity:0">{{index+1}}</span>答：
              </span>
              {{item.answer}}
            </p>
            <img src="../../assets/home_img/shang.png" />
          </div>
        </li>
      </ul>
    </main>
    <div v-if="is_show" class="shadow">
      <div>
        <p class="head">
          {{des.title}}
          <img @click="x_tap" src="../../assets/home_img/x_1.png" alt />
        </p>
        <div class="cont" v-html="des.content"></div>
        <p class="define">
          <span @click="x_tap">确定</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import request from "@/request.js";
  import axios from "axios";
  export default {
    data() {
      return {
        active_img: require("../../assets/home_img/shang.png"),
        hide_img: require("../../assets/home_img/xia.png"),
        value: "",
        type: 0,
        nav_list: ["全部", "装修前", "装修中", "装修后"],
        is_show: false,
        list_datas: [],
        des: "",
        a: 0
      };
    },
    created() {
      this.get_list_datas();
      request({
        url: "/api/getArticleDetaild?type=affirming",
        method: "post"
      }).then(data => {
        if (data.status == 200) {
          this.des = data.data.data;
        }
      });
    },
    watch: {
      is_show() {
        if (this.is_show) {
          let cssStr = "overflow-y: hidden; height: 100%;position:fixed;";
          document.getElementById("contact").style.cssText = cssStr;
          document.body.style.cssText = cssStr;
        } else {
          let cssStr = "overflow-y: auto; height: auto;";
          document.getElementById("contact").style.cssText = cssStr;
          document.body.style.cssText = cssStr;
        }
      }
    },
    methods: {
      // 申明
      sm() {
        this.is_show = !this.is_show;
      },
      search_Tap() {
        if (this.value == "") {
          this.$dialog.alert({
            message: "请输入搜索的内容",
            confirmButtonColor: "#4A8AFD"
          });
        } else {
          this.get_list_datas({
            search: this.value
          });
        }
      },
      x_tap() {
        this.is_show = !this.is_show;
        this.type = this.a;
      },
      nav_Tap(i) {
        console.log(i);
        this.type = this.a = i;
        if (i == 0) {
          this.get_list_datas({
            search: this.value
          });
        } else {

          this.get_list_datas({
            type: i - 1,
            search: this.value
          });
        }
      },
      item_Tap(index) {
        this.list_datas[index].is = !this.list_datas[index].is

      },
      get_list_datas(val) {
        this.$store.commit("show_looding");
        request({
          url: "/api/getQuestionsAnswersList",
          data: val,
          method: "post"
        }).then(data => {
          console.log(data.data);
          this.$store.commit("hide_looding");
          if (data.status == 200) {
            for (let index = 0; index < data.data.data.length; index++) {
              data.data.data[index].is = false
            }
            this.list_datas = data.data.data;
          }
        });
      }
    }
  };

</script>

<style scoped>
  .contact header {
    padding: 0.25rem;
  }

  .search {
    display: flex;
    border: 1px solid #fd2691;
    border-radius: 0.1rem;
    margin-bottom: 0.2rem;
  }

  .search input {
    padding: 0.1rem;
    flex: 4;
    font-size: 0.3rem;
    border-radius: 0.1rem 0 0 0.1rem;
  }

  .search span {
    line-height: 0.6rem;
    font-size: 0.3rem;
    text-align: center;
    flex: 1;
    color: white;
    background: #fd2691;
  }

  .contact nav ul {
    display: flex;
    justify-content: space-between;
  }

  .contact nav ul li {
    font-size: 0.24rem;
    padding: 0.06rem 0.23rem 0.08rem;
    border: 1px solid #29be46;
    border-radius: 0.16rem;
  }

  .sm {
    background: #fd2691;
    color: white;
    border: 1px solid #fd2691 !important;
  }

  .active {
    color: white;
    background-color: #29be46 !important;
  }

  .list li {
    position: relative;
    margin-bottom: 0.2rem;
  }
  .list li::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 0.5px;
    background-color: #ccc;
    content: ' ';
    display: block;
    transform: scaley(0.5);
  }
  .list li:after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.5px;
    background-color: #ccc;
    content: ' ';
    display: block;
    transform: scaley(0.5);
  }

  .list li>div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.17rem 0.25rem;
  }

  .list li h2 {
    font-weight: 400;
    max-width: 7rem;
    font-size: 0.26rem;
  }

  .list li h2 span {
    color: #ff0168;
  }

  .list li>div img {
    width: 0.2rem;
    height: 0.2rem;
    margin-left: 0.2rem;
  }

  .list li .da {
    position: relative;
    font-size: 0.26rem;
    color: #000;
    background: white;
    padding: 0.15rem 0.6rem 0.15rem 0.25rem;
  }

  .list .da p span {
    color: #ff0168;
  }

  .list li .da img {
    position: absolute;
    right: 0.25rem;
    bottom: 0.2rem;
    width: 0.2rem;
    height: 0.2rem;
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
    width: 6rem;
    margin: 3rem auto;
    border-radius: 0.12rem;
    overflow: hidden;
  }

  .shadow .head {
    position: relative;
    padding: 0.08rem 0.05rem;
    text-align: center;
    font-size: 0.36rem;
    background: #ff1284;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shadow .head img {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    top: 0.2rem;
    right: 0.3rem;
  }

  .shadow .cont {
    text-align: justify;
    height: 6rem;
    overflow-y: auto;
    padding: 0.3rem 0.3rem 0;
    background: white;
    font-size: 0.33rem;

  }

  .shadow .define {
    text-align: center;
    font-size: 0.3rem;
    background: white;
  }

  .shadow .define span {
    display: inline-block;
    border-radius: 0.1rem;
    margin: 0.3rem auto;
    width: 1.78rem;
    padding: 0.07rem 0 0.09rem;
    color: white;
    background-color: #ff1284;
  }

</style>
