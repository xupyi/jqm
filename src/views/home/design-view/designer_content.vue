<template>
  <div>
    <main class="design1">
      <!-- 设计 -->
      <section class="img_list">
        <div class="gpics">
          <img v-if="status=='img'&&Designdata.panorama!=''&&Designdata.panorama!=null" @click="vr_tap" class="vr360"
            src="../../../assets/home_img/vr_icon_1.png" alt />
          <img v-if="status=='img'" @click="vr_tap" class="big_img" :src="img_src" alt />

          <video controls v-else :poster="Designdata.video_pic_url" style="object-fit:fill"
            :src="Designdata.video_url"></video>
        </div>
        <div class="list_ul">
          <img @click="left_tap" src="../../../assets/home_img/zuo.png" alt />
          <ul>
            <li @click="img_tap(index)" :class="img_active==index?'img_bor':''"
              v-for="(item, index) in Designdata.gpics" :key="index">
              <img :src="item" alt />
            </li>
            <li v-if="Designdata.video_pic_url" class="vr" @click="img_vr" :class="img_active=='vr'?'img_bor':''">
              <img :src="Designdata.video_pic_url" alt />
              <img class="bf_img" src="../../../assets/home_img/bf.png" alt />
            </li>
          </ul>
          <img @click="right_tap" src="../../../assets/home_img/you.png" alt />
        </div>
      </section>
      <p>
        <span>推荐指数：</span>
        <img v-for="(item, index) in Designdata.rec_star" :key="index" src="../../../assets/home_img/star_biu.png"
          alt />
      </p>
      <ul class="design_ul">
        <li v-for="(item, index) in Designdata.good_desgin_price" :key="index"
          @click="desgin_price_tap(item.id,item.price)">
          <div>
            <img :src="desgin_price_index==item.id?desgin_price_active:desgin_price_normal" alt />
            <p>
              每平米设计费单价
              <span>{{parseInt(item.price)}}</span> 元
            </p>
          </div>
          <span class="desc">{{item.desc}}</span>
        </li>
        <li>
          <div class="appoint_designer">
            <img @click="on_yuan" :src="desgin_price_index==30?desgin_price_active:desgin_price_normal" alt />
            <div>
              <p class="appoint_designer_l">
                每平米设计费单价
                <span>{{desgin_price!=''?parseInt(desgin_price):''}}</span>元
              </p>
              <p class="appoint_designer_btn" @click="appoint_designer_tap">
                <span v-if="designer_detail==''" style="background:#ff1284 ">指定设计师</span>
                <span style="background:#2fc145;text-align: left " v-else>{{designer_detail.province_name}}
                  {{designer_detail.xing}}{{designer_detail.name}}</span>
              </p>
            </div>
          </div>
          <p class="desc">(无增项,费用包含设计、施工、主材和家具)</p>
        </li>
        <li>
          <div class="area">
            待设计房屋面积：
            <input type="number" v-model="val.area" @change="area_ipt" />平米
          </div>
          <div class="select_home">
            选择房屋：
            <p v-if="house_List==''" @click="house_tap">
              <span>请先提交量房预约</span>
              <img src="../../../assets/xia_.png" alt />
            </p>
            <select v-else v-model="val.quantity_room_id">
              <option value disabled>请选择</option>
              <option :value="item.id" v-for="(item, index) in house_List" :key="index">{{item.address}}</option>
            </select>
          </div>
        </li>
      </ul>
      <p class="amount_price">
        设计费用合计￥
        <span>{{Number(total).toFixed(2)}}</span>元
      </p>
      <div class="point">
        <p>友情提示：</p>
        <p>点击“加入购物车”之前，请您仔细阅读“设计介绍”。</p>
      </div>
      <div class="designer_btn">
        <p @click="select_wall_tap">
          <span>选择地墙顶的造型</span>
        </p>
        <p @click="add_shop_tap">
          <span>加入购物车</span>
        </p>
      </div>
      <div class="footer">
        <ul>
          <li @click="footer_tap(1)" :style="{background:foot_index==1?'#2FC145':''}">设计介绍</li>
          <li @click="footer_tap(2)" :style="{background:foot_index==2?'#2FC145':''}">顾客评价</li>
        </ul>
        <div>
          <div class="foot_cont" v-html="Designdata.content" v-if="foot_index==1"></div>
          <div v-else>
            <assess :assess="val.good_id" />
          </div>
        </div>
      </div>
    </main>
    <div class="shadow" v-if="shadow" @touchmove.prevent>
      <div>
        <div class="shadow_cont">
          <img src="../../../assets/home_img/dui3.png" alt />
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
  import request from "@/request.js";
  import utils from "@/utils";
  import assess from "../../assess.vue";
  export default {
    components: {
      assess
    },
    data() {
      return {
        shadow: false,
        active: 0,
        foot_index: 1,
        desgin_price_active: require("../../../assets/home_img/dui.png"),
        desgin_price_normal: require("../../../assets/home_img/yuan.png"),
        desgin_price_index: null,
        Designdata: {},
        price: "",
        desgin_price: "",
        UserList: [],
        house_List: [],
        val: {
          good_id: "",
          order_type: 4,
          num: 1,
          area: "",
          price: "",
          quantity_room_id: "",
          design_user_id: "",
          choice_id: ""
        },
        designer_detail: "",
        status: 'img',
        img_active: "",
        img_src: "",
        total: '0',
      };
    },
    mounted() {
      window.addEventListener('onscroll', function () {
        // var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        console.log('scrollTop');
      })
    },
    // beforeRouteLeave(to, from, next) {
    //   var top=document.querySelector('.design1')
    //   let position = top.event
    //   console.log(position)
    //   this.$store.commit('SAVE_POSITION', position) //离开路由时把位置存起来
    //   next()
    // },
    // updated() {
    //   this.$nextTick(function () {
    //     let position = this.$store.state.position //返回页面取出来
    //     window.scroll(0, 500)
    //   })
    // },
    created() {
      this.$store.commit("show_looding");
      if (sessionStorage.getItem("design_data")) {
        this.val = JSON.parse(sessionStorage.getItem("design_data"));
        this.desgin_price_index = sessionStorage.getItem("design_data_num");
        this.total_tun()
        this.total = utils.accMul(this.val.price, this.val.area);
        sessionStorage.removeItem("design_data");
        sessionStorage.removeItem("design_data_num");
      }
      if (this.$route.query.ch_id) {
        this.val.choice_id = this.$route.query.ch_id;
      }
      // 设计
      request({
        url: "/api/getDesignInfo",
        method: "post"
      }).then(data => {
        console.log(data);
        this.$store.commit("hide_looding");
        if (data.status == 200) {
          this.val.good_id = data.data.data.id;
          this.Designdata = data.data.data;
          this.img_src = data.data.data.gpics == '' ? '' : data.data.data.gpics[0]
        }
      });
      // 获取房屋列表
      request({
        url: "/api/getQuantityRoom",
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.house_List = data.data.data;
        }
      });
      // 设计师
      if (this.$route.query.designer_id || this.val.design_user_id) {
        request({
          url: "/api/getUserInfo",
          data: {
            user_id: this.$route.query.designer_id ?
              this.$route.query.designer_id : this.val.design_user_id
          },
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.data.status == 200) {
            this.designer_detail = data.data.data;
            this.val.design_user_id = data.data.data.id;
            this.val.price = this.desgin_price = data.data.data.design_price;
            this.desgin_price_index = 30;
            this.total_tun()
          }
        });
      }

    },
    methods: {
      go_shop() {
        // 去购物车结算
        sessionStorage.setItem('shop_index', 4)
        this.$router.push('/shop')
      },
      area_ipt() {
        this.total_tun()
      },
      total_tun() {
        if (this.desgin_price_index == 30) {
          if (this.desgin_price == "" || this.val.area == "") {
            this.total = "0.00";
          } else {
            // if (/^[0-9]*[1-9][0-9]*$/.test(this.val.area) == false) {
            //   this.$toast("请输入整数！");
            //   this.val.area = "";
            //   return "0.00";
            // } else {
            this.total = utils.accMul(this.desgin_price, this.val.area);
            // }
          }
        } else {
          if (this.price == "" || this.val.area == "") {
            this.total = "0.00";
          } else {
            // if (/^[0-9]*[1-9][0-9]*$/.test(this.val.area) == false) {
            //   this.$toast("请输入整数！");
            //   this.val.area = "";
            //   return "0.00";
            // } else {
            this.total = utils.accMul(this.price, this.val.area);
            // }
          }
        }
      },
      vr_tap() {
        if (this.Designdata.panorama != '' && this.Designdata.panorama != null) {
          window.location.href = this.Designdata.panorama
        }
      },
      img_tap(index) {
        this.status = "img";
        this.img_active = index;
        this.img_src = this.Designdata.gpics[index];
      },
      img_vr() {
        this.img_active = this.status = "vr";
      },
      left_tap() {
        if (this.status == "img") {
          this.img_active = this.img_active == 0 ? 0 : this.img_active - 1;
          this.img_src = this.Designdata.gpics[this.img_active];
        } else {
          this.status = "img";
          this.img_active = this.Designdata.gpics.length - 1;
          this.img_src = this.Designdata.gpics[this.img_active];
        }
      },
      right_tap() {
        if (
          this.img_active == this.Designdata.gpics.length - 1 &&
          this.Designdata.video_pic_url != ""
        ) {
          this.img_active = this.status = "vr";
          return;
        }
        if (
          this.status == "img" &&
          this.img_active != this.Designdata.gpics.length - 1
        ) {
          this.img_active += 1;
          this.img_src = this.Designdata.gpics[this.img_active];
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
      on_yuan() {
        if (this.desgin_price == "") {
          this.$toast("请指定设计师");
        } else {
          this.val.design_user_id = this.designer_detail.id;
          this.desgin_price_index = 30;
          this.val.price = this.desgin_price;
        }
      },
      desgin_price_tap(i, price) {
        this.val.design_user_id = "";
        this.desgin_price_index = i;
        this.val.price = this.price = price;
        this.total_tun()
      },
      appoint_designer_tap() {
        sessionStorage.setItem("design_data", JSON.stringify(this.val));
        sessionStorage.setItem("design_data_num", this.desgin_price_index);
        this.$router.push("/home/design/designer_list");
      },
      select_wall_tap() {
        sessionStorage.setItem("design_data", JSON.stringify(this.val));
        sessionStorage.setItem("design_data_num", this.desgin_price_index);
        this.$router.push("/select_design");
      },
      x_shop_tap() {
        this.shadow = !this.shadow;
      },
      // select_tap(e) {
      //   this.val.area = this.house_List[e.target.selectedIndex - 1].room_area;
      // },
      add_shop_tap() {
        console.log(this.val);
        if (this.val.area == "" || this.val.area == '0') {
          this.$toast("请输入房屋面积");
          return
        } else if (this.val.quantity_room_id == "") {
          this.$toast("请选择房屋");
        } else if (!this.$route.query.ch_id) {
          this.$toast("请选择地墙顶造型");
        } else {
          if (this.val.design_user_id != "") {
            this.val.price = "";
          }
          console.log(this.val);
          this.$store.commit("show_looding");
          request({
            url: "/api/addCart",
            data: this.val,
            method: "post"
          }).then(data => {
            console.log(data);
            this.$store.commit("hide_looding");
            if (data.data.status == 200) {
              request({
                url: "/api/delUserChoice",
                method: "post"
              }).then(data => {
                console.log(data);
              });
              this.shadow = !this.shadow;
            }
          });
        }
      },
      footer_tap(i) {
        this.foot_index = i;
      }
    }
  };

</script>

<style scoped>
  .design1 {
    font-size: 0.26rem;
  }

  .design1>img {
    width: 100%;
    height: 100%;
  }

  .design1>p {
    display: flex;
    align-items: center;
    margin: 0.1rem 0.3rem;
  }

  .design1>p img {
    margin-right: 0.05rem;
    width: 0.25rem;
    height: 0.25rem;
  }

  .design_ul li {
    position: relative;
    font-size: 0.26rem;
    /* border-bottom: 0.3px solid #bfbfbf; */
    margin: 0 0.33rem;
    padding: 0.2rem 0;
  }
.design_ul li::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.5px;
    background-color: #ccc;
    content: ' ';
    display: block;
    transform: scaley(-0.5);
  }
  .design_ul li img {
    margin-right: 0.1rem;
    height: 0.33rem;
    width: 0.33rem;
  }

  .design_ul li div {
    margin-bottom: 0.04rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .design_ul li>span {
    margin-left: 0.43rem;
  }

  .design_ul li>div p>span {
    color: #f10072;
  }

  .design_ul li .desc {
    margin: 0.05rem 0 0 0.43rem;
    font-size: 0.24rem;
    color: #7f7f7f;
  }

  .appoint_designer {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .appoint_designer p:first-child {
    white-space: nowrap;
    display: flex;
    align-items: center;
  }

  .appoint_designer>div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }

  .appoint_designer_l>span {
    display: inline-block;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.28rem;
    background: #ddd;
    min-width: 0.95rem;
    text-align: center;
    margin: 0 0.1rem;
    border: 0.5px solid #aaa;
    border-radius: 0.07rem;
    padding: 0 0.1rem;
  }

  .appoint_designer_btn {
    font-size: 0;
    flex: 1;
    margin-left: 0.3rem;
  }

  .appoint_designer_btn span {
    padding: 0.08rem 0.08rem;
    width: 100%;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: 0.07rem;
    font-size: 0.24rem;
    text-align: center;
    border-radius: 0.07rem;
    color: white !important;
  }

  .area {
    display: flex;
    align-items: center;
    padding-left: 0.4rem !important;
    margin-bottom: 0.2rem !important;
  }

  .area input {
    padding: 0.08rem 0.1rem;
    border: 0.5px solid #aaa;
    border-radius: 0.07rem;
    width: 2rem;
    margin: 0 0.1rem;
  }

  select {
    border: 0.5px solid #aaa;
    flex: 1;
    font-size: 0.26rem;
    color: #0066FF;
    height: 0.6rem;
    line-height: 0.5rem;
    padding: 0 0.1rem;
    border-radius: 0.1rem;
    min-width: 2rem;
  }

  .select_home p {
    color: #0066FF;
    border: .5px solid #a6a6a6;
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
    padding-left: 0.4rem !important;
  }

  .amount_price {
    padding-left: 0.4rem;
  }

  .amount_price span {
    font-size: 0.36rem;
    color: #f10072;
    padding: 0 0.1rem;
    max-width: 4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
  }

  .point {
    margin-top: 0.2rem;
    margin-left: 0.4rem;
    color: red;
  }

  .designer_btn p {
    padding: 0.2rem 0.4rem;
    text-align: center;
    font-size: 0.36rem;
    color: white;
  }

  .designer_btn p span {
    border-radius: 0.1rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    width: 100%;
    display: inline-block;
    background: #ff1284;
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

  /* --------------------- */
  .footer {
    margin-top: 0.4rem;
  }

  .footer>ul {
    padding: 0 0.36rem;
    background: #343434;
    overflow: hidden;
  }

  .footer>ul li {
    padding: 0.18rem 0 0.2rem 0.1rem;
    color: white;
    width: 50%;
    text-align: center;
    float: left;
  }

  .footer>div {
    margin: 0.2rem 0.26rem;
    text-align: justify;
    /* line-height: 0.5rem; */
  }
.foot_cont >>>img{
  width: 100%;
}
  /* +++++++++++++++头部图片-视频+++++++++++++++++++++/ */
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
    padding: 0.2rem 0.2rem 0.1rem;
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
    border: 1px solid #eeeeee;
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
