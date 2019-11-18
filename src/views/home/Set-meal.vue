<template>
  <div id="set_meal">
    <nav>
      <ul>
        <li @click="nav_tap(item.id,index)" :class="nav_index==index?'fir':''" v-for="(item, index) in set_meal_datas"
          :key="index">
          <span>{{item.title}}</span>
        </li>
      </ul>
    </nav>
    <main>
      <section class="img_list">
        <div class="gpics">
          <img v-if="status=='img'&&item_data.panorama!=''&&item_data.panorama!=null" @click="vr_tap" class="vr360"
            src="../../assets/home_img/vr_icon_1.png" alt />
          <img v-if="status=='img'" @click="vr_tap" class="big_img" :src="img_src" alt />

          <video controls v-else :poster="item_data.video_pic_url" style="object-fit:fill"
            :src="item_data.video_url"></video>
        </div>
        <div class="list_ul">
          <img @click="left_tap" src="../../assets/home_img/zuo.png" alt />
          <ul>
            <li @click="img_tap(index)" :class="img_active==index?'img_bor':''" v-for="(item, index) in item_data.gpics"
              :key="index">
              <img :src="item" alt />
            </li>
            <li v-if="item_data.video_pic_url" class="vr" @click="img_vr" :class="img_active=='vr'?'img_bor':''">
              <img :src="item_data.video_pic_url" alt />
              <img class="bf_img" src="../../assets/home_img/bf.png" alt />
            </li>
          </ul>
          <img @click="right_tap" src="../../assets/home_img/you.png" alt />
        </div>
      </section>
      <section class="star">
        <span>推荐指数：</span>
        <img v-for="(item, index) in item_data.rec_star" :key="index" src="../../assets/home_img/star_biu.png" alt />
      </section>
      <section class="show_title">{{item_data.show_title}}</section>
      <section class="yuan_mi">
        {{item_data.title}}：
        <span>{{parseInt(item_data.price)}}</span> 元/平米
      </section>
      <section class="brief_introduction">{{item_data.brief_introduction}}</section>
      <section class="area">
        房屋面积：<input type="number" v-model="val.area" />平米
      </section>
      <section class="select_home">
        选择房屋：<p v-if="house_List==''" @click="house_tap">
          <span>请先提交量房预约</span>
          <img src="../../assets/xia_.png" alt />
        </p><select v-else v-model="val.quantity_room_id">
          <option value disabled>请选择</option>
          <option :value="item.id" v-for="(item, index) in house_List" :key="index">{{item.address}}</option>
        </select>
      </section>
      <section class="amount_price">
        <p>
          精装套餐费合计：RMB ￥
          <span>{{total}} </span>元
        </p>
      </section>
      <section class="by_stages">
        <!-- 分期 -->
        <p v-for="(item, index) in getByStagesList" :key="index" @click="by_stages_tap(item.stage_number)">
          <img :src="val.stage_number==item.stage_number?active:normal" alt />
          <span>
            第{{item.stage_number}}期 {{item.stage_number | stage}}{{Number(item.stages_proportion)}}%：RMB ￥
            <span>{{item.stages_proportion | total_3(total)}}</span> 元
          </span>
        </p>
      </section>
      <section class="point">
        <p>友情提示：</p>
        <p>点击“加入购物车”之前，请您仔细阅读“套餐介绍”。</p>
      </section>
      <section class="set_btn">
        <p>
          <span @click="sele">选择地墙顶造型和商品</span>
        </p>
        <p>
          <span @click="btn_tap">加入购物车</span>
        </p>
      </section>
      <section class="footer">
        <ul>
          <li @click="footer_tap(1)" :style="{background:foot_index==1?'#2FC145':''}">套餐介绍</li>
          <li @click="footer_tap(2)" :style="{background:foot_index==2?'#2FC145':''}">顾客评价</li>
        </ul>
        <div>
          <div class="foot_cont" v-html="item_data.content" v-if="foot_index==1"></div>
          <div v-else>
            <assess :assess="item_data.id" shop="taocan" />
          </div>
        </div>
      </section>
    </main>
    <div class="shadow" v-if="shadow" @touchmove.prevent>
      <div>
        <div class="shadow_cont">
          <img src="../../assets/home_img/dui3.png" alt />
          <p>已成功加入购物车</p>
        </div>
        <div class="shadow_btn">
          <span @click="x_shop_tap">留在本页</span>
          <div class="shadow_btn_line"></div>
          <span @click="go_shop">去购物车结算</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import request from "@/request";
  import utils from "@/utils";
  import assess from "../assess.vue";
  export default {
    components: {
      assess
    },
    data() {
      return {
        active: require("../../assets/home_img/dui.png"),
        normal: require("../../assets/home_img/yuan.png"),
        getByStagesList: '',
        set_meal_datas: [],
        item_data: {},
        nav_index: 0,
        house_List: [],
        val: {
          good_id: "", //	是	string	商品id (设计介绍页面返回的id)
          order_type: "2", //	是	string	订单类型(1正常商品,2套餐商品,3施工,4设计)
          num: "1", //是	string	数量,默认传递1就行
          area: "", //	是	string	房屋面积
          quantity_room_id: "", //	是	int	预约房屋id,从获取预约列表中获取得到
          stage_number: "",
          choice_id: ""
        },
        shadow: false,
        foot_index: 1,
        status: "img",
        img_active: "",
        img_src: ""
      };
    },
    created() {
      this.$store.commit("show_looding");
      request({
        url: "/api/getTranslateList",
        method: "post"
      }).then(data => {
        console.log(data);
        this.$store.commit("hide_looding");
        if (data.data.status == 200) {
          this.set_meal_datas = data.data.data;
          if (sessionStorage.getItem("sele")) {
            let sele = JSON.parse(sessionStorage.getItem("sele"));
            for (let index = 0; index < data.data.data.length; index++) {
              if (data.data.data[index].id == sele.good_id) {
                this.nav_index = index;
                this.img_src = data.data.data[index].gpics[0];
                this.item_data = data.data.data[index];
                this.val = sele;
                if (this.$route.query.choice_id) {
                  this.val.choice_id = this.$route.query.choice_id;
                }
              }
              sessionStorage.removeItem("sele");
            }
          } else {
            this.img_src = data.data.data[0].gpics[0];
            this.item_data = data.data.data[0];
            this.val.good_id = data.data.data[0].id;
          }
        }
      });
      // 获取房屋列表
      request({
        url: "/api/getQuantityRoom",
        method: "post"
      }).then(data => {
        console.log(data);
        this.$store.commit("hide_looding");
        if (data.data.status == 200) {
          this.house_List = data.data.data;
        }
      });
      // 获取分期列表
      request({
        url: "/api/getByStagesList",
        method: "post"
      }).then(data => {
        console.log(data);
        this.$store.commit("hide_looding");
        if (data.status == 200) {
          this.getByStagesList = data.data.data;
        }
      });
    },
    computed: {
      total() {
        if (this.val.price == "" || this.val.area == "") {
          return "0";
        } else if (/^[0-9]*[1-9][0-9]*$/.test(this.val.area) == false) {
          this.$toast("请输入整数！");
          this.val.area = "";
          return "0";
        } else {
          console.log(this.item_data, this.item_data.price, this.val.area);
          return utils.accMul(this.item_data.price, this.val.area);
        }
      }
    },
    filters: {

      stage(val) {
        if (val == 1) {
          return '首付款'
        } else if (val == 5) {
          return '后期款'
        } else {
          return '中期款'
        }
      },
      total_3(val, total) {
        return utils.accMul(total, Number(val) / 100);
      }
    },
    mounted() {
      window.addEventListener("onscroll", function () {
        //为了保证兼容性，这里取两个值，哪个有值取哪一个
        //scrollTop就是触发滚轮事件时滚轮的高度
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        console.log("滚动距离" + scrollTop);
      });
    },
    methods: {
      go_shop() {
        // 去购物车结算
        sessionStorage.setItem('shop_index', 2)
        this.$router.push('/shop')
      },
      vr_tap() {
        if (this.item_data.panorama != "" && this.item_data.panorama != null) {
          window.location.href = this.item_data.panorama;
        }
      },
      img_tap(index) {
        this.status = "img";
        this.img_active = index;
        this.img_src = this.item_data.gpics[index];
      },
      img_vr() {
        this.img_active = this.status = "vr";
      },
      left_tap() {
        if (this.status == "img") {
          this.img_active = this.img_active == 0 ? 0 : this.img_active - 1;
          this.img_src = this.item_data.gpics[this.img_active];
        } else {
          this.status = "img";
          this.img_active = this.item_data.gpics.length - 1;
          this.img_src = this.item_data.gpics[this.img_active];
        }
      },
      right_tap() {
        if (
          this.img_active == this.item_data.gpics.length - 1 &&
          this.item_data.video_pic_url != ""
        ) {
          this.img_active = this.status = "vr";
          return;
        }
        if (
          this.status == "img" &&
          this.img_active != this.item_data.gpics.length - 1
        ) {
          this.img_active += 1;
          this.img_src = this.item_data.gpics[this.img_active];
        }
      },
      // 量房预约
      house_tap() {
        if (this.$store.state.is_login) {
          this.$router.push("/home/room");
        } else {
          this.$toast("暂未登录，请先登录");
          this.$router.push("/login");
        }
      },
      footer_tap(i) {
        this.foot_index = i;
      },
      x_shop_tap() {
        this.shadow = !this.shadow;
      },
      // 分期
      by_stages_tap(i) {
        this.val.stage_number = i;
      },
      nav_tap(i, index) {
        this.foot_index = 1;
        this.status = "img";
        this.img_active = 0;
        this.nav_index = index;
        this.val.good_id = i;
        this.item_data = this.set_meal_datas[index];
        this.img_src = this.set_meal_datas[index].gpics[0];
      },
      sele() {
        this.$router.push({
          path: "/select_set_meal",
          query: {
            id: this.val.good_id,
            title: this.set_meal_datas[this.nav_index].title
          }
        });
        sessionStorage.setItem("sele", JSON.stringify(this.val));
      },
      btn_tap() {
        console.log(this.val);
        if (this.val.quantity_room_id == "") {
          this.$toast("请选择房屋");
        } else if (this.val.area == "" || this.val.area == 0) {
          this.$toast("请输入房屋面积");
        } else if (this.val.stage_number == "") {
          this.$toast("请选择分期");
        } else if (this.val.choice_id == "" && this.val.stage_number == "1") {
          this.$toast("请选择地墙顶造型");
        } else {
          console.log(this.val);
          request({
            url: "/api/addCart",
            data: this.val,
            method: "post"
          }).then(data => {
            console.log(data);
            this.$store.commit("hide_looding");
            if (data.data.status == 200) {
              this.shadow = !this.shadow;
              sessionStorage.removeItem("tc_select");
            } else {
              this.$toast(data.data.msg);
            }
          });
        }
      }
    }
  };

</script>

<style scoped>
  #set_meal {
    font-size: 0.26rem;
  }

  #set_meal nav ul {
    padding: 0.2rem 0.2rem 0;
    overflow: hidden;
  }

  #set_meal nav li {
    border: 1px solid #2fc145;
    border-radius: 0.1rem;
    padding: 0.1rem 0;
    text-align: center;
    width: 32%;
    margin: 0 2% 2% 0;
    font-size: 0.24rem;
    float: left;
  }

  #set_meal nav li:nth-child(3n) {
    margin-right: 0;
  }

  #set_meal section {
    margin: 0 0.4rem 0.2rem;
  }

  .star {
    display: flex;
    align-items: center;
  }

  .star img {
    margin-right: 0.05rem;
    width: 0.25rem;
    height: 0.25rem;
  }

  .show_title {
    color: red;
  }

  .brief_introduction {
    font-size: 0.24rem;
    color: #666;
  }

  select {
    border: 0.5px solid #aaa;
    flex: 1;
    font-size: 0.26rem;
    color: #0066FF;
    height: 0.6rem;
    padding: 0 0.1rem;
    border-radius: 0.1rem;
  }

  .select_home p {
    color: #0066FF;
    border: 0.5px solid #a6a6a6;
    border-radius: 4px;
    padding: 0.1rem 0.2rem;
    display: flex;
    align-items: center;
  }

  .select_home p img {
    margin-left: 0.1rem;
    width: 0.25rem;
    height: 0.25rem;
  }

  .select_home {
    display: flex;
    align-items: center;
  }


  .amount_price span {
    font-size: 0.36rem;
    color: #f10072;
    padding: 0 0.1rem;
  }

  .area input {
    margin-right: 0.1rem;
    width: 2rem;
    height: 0.5rem;
    line-height: 0.46rem;
    border: 0.5px solid rgb(169, 169, 169);
    padding: 0.1rem;
    border-radius: 0.1rem;
  }

  .point p {
    color: red;
  }

  .set_btn p {
    padding: 0.2rem 0;
  }

  .set_btn p span {
    display: block;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 0.1rem;
    color: white;
    background: #ff1284;
    text-align: center;
  }

  /* --------------------- */
  .footer {
    margin: 0.4rem 0 0 !important;
  }

  .footer>ul {
    padding: 0 0.36rem;
    background: #343434;
    overflow: hidden;
  }

  .footer>ul li {
    padding: 0.18rem 0 0.2rem;
    color: white;
    width: 50%;
    text-align: center;
    float: left;
  }

  .footer>div {
    margin: 0.2rem 0.26rem;
    text-align: justify;
  }
.foot_cont>>>img{
  width: 100%;
}
  /*---------------------------- 分期--------------------------- */
  .by_stages {
    margin: 0 0 0.2rem 0.7rem;
  }

  .by_stages img {
    width: 0.33rem;
    height: 0.33rem;
    margin-right: 0.1rem;
  }

  .by_stages p {
    padding: 0.1rem 0;
    display: flex;
    align-items: center;
  }

  .by_stages p span span {
    color: #f10072;
  }

  /* 提示 */
  .shadow {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  .shadow>div {
    background: white;
    border-radius: 0.1rem;
    overflow: hidden;
    width: 5.4rem;
    margin: 4rem auto;
  }

  .shadow_cont {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 1rem 0;
    font-size: 0.3rem;
  }

  .shadow_cont img {
    margin-right: 0.1rem;
    width: 0.38rem;
    height: 0.38rem;
  }

  .shadow p {
    text-align: center;
  }

  .shadow_btn {
    display: flex;
    color: white;
    background: #ff1284;
  }

  .yuan_mi span {
    color: #ff1284;
  }

  .shadow .shadow_btn span {
    flex: 1;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
  }

  .shadow_btn_line {
    width: 1px;
    height: 0.7rem;
    background: white;
  }

  .shadow .shadow_btn a {
    flex: 1;
    color: white;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
  }

  /* +++++++++++++++++++++++++++++++++++/ */
  video {
    height: 4rem;
    width: 100%;
  }

  .fir {
    background: #2fc145;
    color: white;
  }

  .img_list {
    margin: 0 !important;
  }

  .gpics {
    position: relative;
    margin: 0 0 0.2rem 0 !important;
    font-size: 0;
    background: #eeeeee;
  }

  .vr360 {
    position: absolute;
    bottom: 0.2rem;
    height: 0.6rem;
    right: 0.2rem;
  }

  .vr {
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .bf_img {
    position: absolute;
    width: 0.4rem !important;
    height: 0.4rem !important;
  }

  .gpics .big_img {
    object-fit: cover;
    width: 100%;
    height: 5rem;
  }

  video {
    width: 100%;
    height: 5rem;
  }

  .list_ul {
    padding: 0.2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .list_ul ul {
    overflow: hidden;
    width: 6rem;
  }

  .img_bor {
    border: 1px solid #f10072 !important;
  }

  .list_ul ul li {
    font-size: 0;
    border: 1px solid #fff;
    margin-right: 0.1rem;
    float: left;
  }

  .img_list div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .list_ul>img {
    width: 0.35rem;
    height: 0.4rem;
  }

  .list_ul li>img {
    padding: 1px 0;
    width: 1.05rem;
    height: 0.7rem;
  }

</style>
