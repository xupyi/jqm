<template>
  <div>
    <div id="detail">
      <!-- <bheader /> -->
      <p v-if="details.is_promo==1">
        当前位置：促销商品 >
        <span>商品详情</span>
      </p>
      <p v-else>
        当前位置：热卖商品 >
        <span>商品详情</span>
      </p>
      <section class="img_list">
        <div class="gpics">
          <img
            v-if="status=='img'&&details.panorama!=''&&details.panorama!=null"
            @click="vr_tap"
            class="vr360"
            src="../../../assets/home_img/vr_icon_1.png"
            alt
          />
          <img v-if="status=='img'" @click="vr_tap" class="big_img" :src="img_src" alt />

          <video
            controls
            v-else
            :poster="details.video_pic_url"
            style="object-fit:contain"
            :src="details.video_url"
          ></video>
        </div>
        <div class="list_ul">
          <img @click="left_tap" src="../../../assets/home_img/zuo.png" alt />
          <ul>
            <li
              @click="img_tap(index)"
              :class="img_active==index?'img_bor':''"
              v-for="(item, index) in details.gpics"
              :key="index"
            >
              <img :src="item" alt />
            </li>
            <li
              v-if="details.video_pic_url"
              class="vr"
              @click="img_vr"
              :class="img_active=='vr'?'img_bor':''"
            >
              <img :src="details.video_pic_url" alt />
              <img class="bf_img" src="../../../assets/home_img/bf.png" alt />
            </li>
          </ul>
          <img @click="right_tap" src="../../../assets/home_img/you.png" alt />
        </div>
      </section>
      <section class="star">
        <span>推荐指数：</span>
        <img
          src="../../../assets/home_img/star_biu.png"
          alt
          v-for="(item, index) in details.rec_star"
          :key="index"
        />
      </section>
      <section class="shop_parm">
        <div class="shop_s">
          <div class="shop_parm_title">
            <span>{{details.manufactor_name}}</span>
            <span>{{details.show_title}}</span>
          </div>
        </div>
        <div class="shop_parm_cont">
          <div class="unit_price">
            <div v-if="details.is_promo==1" class="cx_p">
              <p>单价：</p>
              <del>￥{{Number(details.price).toFixed(2)}}</del>
            </div>
            <div class="dj_">
              <p v-if="details.is_promo==1">促销单价：</p>
              <p v-else>单价：</p>
              <span>￥{{total_p}}</span>
            </div>
            <div class="cx_time" v-if="details.is_promo==1">
              促销时间：
              <span>{{details.promo_start_time}}~{{details.promo_end_time}}</span>
            </div>
          </div>
          <div v-if="JSON.stringify(details.good_color) != '[]'" class="yanse">
            <p>颜色/分类：</p>
            <ul>
              <li
                @click="color_tap(item.color_id)"
                :class="item.color_id==val.color_id?'active':''"
                v-for="(item, index) in details.good_color"
                :key="index"
              >
                <p v-if="item.color_image">
                  <img :src="item.color_image" alt />
                </p>
                <span v-else>{{item.color_name}}</span>
              </li>
            </ul>
          </div>
          <div v-if="JSON.stringify(details.good_size) != '[]'" class="chicun">
            <p>尺寸：</p>
            <ul>
              <li
                @click="size_tap(item.size_id,index)"
                :class="item.size_id==val.size_id?'active':''"
                v-for="(item, index) in details.good_size"
                :key="index"
              >
                <span>{{item.size_name}}</span>
              </li>
            </ul>
          </div>
          <div v-if="JSON.stringify(details.good_caizhi) != '[]'" class="caizhi">
            <p>材质：</p>
            <ul>
              <li
                @click="caizhi_tap(item.caizhi_id,index)"
                :class="item.caizhi_id==val.caizhi_id?'active':''"
                v-for="(item, index) in details.good_caizhi"
                :key="index"
              >
                <span>{{item.caizhi_name}}</span>
              </li>
            </ul>
          </div>
          <div class="shop_num">
            <span>购买数量：</span>
            <p>
              <span @click="num_jian">-</span>
              <input type="number" v-model="val.num" @keyup="keyup" @afterpaste="afterpaste" />
              <span @click="num_jia">+</span>
            </p>
            {{details.danwei}}
            <div>({{details.stock |flter}})</div>
          </div>
        </div>
      </section>
      <div class="des">
        <div @click="show_tap(index)" v-for="(item, index) in promise_list" :key="index">
          <img src="../../../assets/home_img/dui.png" alt />
          <span>{{item.title}}</span>
        </div>
      </div>
      <div class="list_item">
        <ul>
          <li
            @click="list_item_tap(index)"
            :class="item_index==index?'fir':''"
            v-for="(item, index) in list_data"
            :key="index"
          >{{item}}</li>
        </ul>
      </div>
      <div class="list_content">
        <div v-if="item_index==0" v-html="details.content"></div>
        <div v-if="item_index==1">
          <assess :assess="val.good_id" shop="shop" />
        </div>
        <div v-if="item_index==2" v-html="details.introduce"></div>
        <div v-if="item_index==3" v-html="details.shop_guide"></div>
      </div>
    </div>
    <div class="btn1">
      <div @click="customer_service">
        <img src="../../../assets/tabbar/t5-h.png" alt />
        <span>客服</span>
      </div>
      <div @click="share_tap">
        <img src="../../../assets/fx.png" alt />
        <span>分享</span>
      </div>
      <div class="shop_star" @click="collect_tap">
        <img :src="collect?active:nomore" alt />
        <span>收藏</span>
      </div>

      <div @click="add_cart" class="ad_cart">
        <img src="../../../assets/home_img/gouwuche.png" alt />
        <span>加入购物车</span>
      </div>
    </div>
    <div v-if="is_show" class="shadow">
      <div>
        <p class="head">{{promise_des.title}}</p>
        <div class="cont" v-html="promise_des.content"></div>
        <p class="define" @click="show_tap">确定</p>
      </div>
    </div>
    <div v-if="is_shadow" class="kefu_shadow" @touchmove.prevent>
      <div>
        <p class="kefu_head">
          {{customer_service_qr_code_name}}
          <img
            @click="customer_service"
            src="../../../assets/home_img/x_1.png"
            alt
          />
        </p>
        <div class="kefu_cont">
          <img :src="code" alt />
          <p>手指长按二维码进行识别</p>
        </div>
      </div>
    </div>
    <div class="shadow1" v-if="shadow" @touchmove.prevent>
      <div>
        <div class="shadow_cont1">
          <img src="../../../assets/home_img/dui3.png" alt />
          <p>已成功加入购物车</p>
        </div>
        <div class="shadow_btn1">
          <span @click="x_shop_tap">留在本页</span>
          <div class="shadow_btn_line1"></div>
          <span @click="go_shop">去购物车结算</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/request.js";
// import bheader from "../../back_header.vue";
import assess from "../../assess.vue";
import utils from "@/utils";
export default {
  components: {
    assess
  },
  data() {
    return {
      customer_service_qr_code_name: "",
      code: "",
      is_shadow: false,
      shadow: false,
      is_show: false,
      collect: "",
      active: require("../../../assets/home_img/xingx1.png"),
      nomore: require("../../../assets/home_img/xingx.png"),
      item_index: 0,
      img_index: 0, //img
      img_src: "",
      details: {},
      type_data_list: [],
      list_data: ["商品介绍", "顾客评价", "厂家介绍", "选购指南"],
      promise_list: [],
      promise_des: {},
      val: {
        good_id: "", //	是	string	商品id(设计介绍页面返回的id)
        order_type: "1",
        num: "1", //	是	string	数量, 默认传递1就行
        caizhi_id: "", //	是	int	材质id
        color_id: "", //	否	int	颜色id
        size_id: "" //大小
      },
      assess_index: 1,
      assess_list: [],
      pic_assess_list: [],
      zhui_assess_list: [],
      status: "img",
      img_active: "",
      price: "",
      s: "",
      c: "",
      total_p: "",
      status: "img",
      img_active: "",
      img_src: ""
    };
  },

  created() {
    this.$store.state.sess = 4;
    var newsID = this.$route.query.id;
    this.val.good_id = newsID;
    this.$store.commit("show_looding");
    request({
      url: "/api/getGoodsDetail",
      data: {
        goods_id: newsID
      },
      method: "post"
    }).then(data => {
      this.$store.commit("hide_looding");
      console.log(data.data);
      this.img_src = data.data.data.gpics == "" ? "" : data.data.data.gpics[0];
      if (data.data.status == 200) {
        this.details = data.data.data;
        this.img_src = data.data.data.gpics[0];
        this.collect = data.data.data.is_collection == 1 ? true : false;
        this.total_p = this.price =
          data.data.data.is_promo == 1
            ? data.data.data.promo_price
            : data.data.data.price;
      }
    });
    // 服务承诺
    request({
      url: "/api/getServiceArticleList",
      method: "post"
    }).then(data => {
      console.log(data.data);
      this.promise_list = data.data.data;
    });
    // 客服二维码
    request({
      url: "/api/getContactOur",
      method: "post"
    }).then(data => {
      console.log(data.data);
      this.code = data.data.data.customer_service_qr_code;
      this.customer_service_qr_code_name =
        data.data.data.customer_service_qr_code_name;
    });
  },
  filters: {
    flter(val) {
      if (val <= 0) {
        return "缺货";
      } else if (val > 0) {
        return "有货";
      } else {
        return "缺货";
      }
    }
  },
  watch: {
    is_show() {
      var over = document.querySelector("#detail");
      if (this.is_show) {
        over.style.overflow = "hidden";
      } else {
        over.style.overflow = "auto";
      }
      // 下面需要这两行代码，兼容不同浏览器
      document.body.scrollTop = this.pageScrollYoffset;
      window.scroll(0, this.pageScrollYoffset);
    }
  },
  methods: {
    go_shop() {
      // 去购物车结算
      sessionStorage.setItem("shop_index", 1);
      this.$router.push("/shop");
    },
    back_tap() {
      this.$router.back(-1);
    },
    // shop数量
    keyup() {
      if (this.val.num.length == 1) {
        this.val.num = this.val.num.replace(/[^1-9]/g, "");
      } else {
        this.val.num = this.val.num.replace(/\D/g, "");
      }
    },
    afterpaste() {
      if (this.val.num.length == 1) {
        this.val.num = this.val.num.replace(/[^1-9]/g, "0");
      } else {
        this.val.num = this.val.num.replace(/\D/g, "");
      }
    },
    num_jia() {
      this.val.num++;
    },
    num_jian() {
      if (this.val.num == 1) {
        this.$toast("最低选择一件商品");
      } else {
        this.val.num--;
      }
    },
    vr_tap() {
      if (this.details.panorama != "" && this.details.panorama != null) {
        window.location.href = this.details.panorama;
      }
    },
    img_tap(index) {
      this.status = "img";
      this.img_active = index;
      this.img_src = this.details.gpics[index];
    },
    img_vr() {
      this.img_active = this.status = "vr";
    },
    left_tap() {
      if (this.status == "img") {
        this.img_active = this.img_active == 0 ? 0 : this.img_active - 1;
        this.img_src = this.details.gpics[this.img_active];
      } else {
        this.status = "img";
        this.img_active = this.details.gpics.length - 1;
        this.img_src = this.details.gpics[this.img_active];
      }
    },
    right_tap() {
      if (
        this.img_active == this.details.gpics.length - 1 &&
        this.details.video_pic_url != ""
      ) {
        this.img_active = this.status = "vr";
        return;
      }
      if (
        this.status == "img" &&
        this.img_active != this.details.gpics.length - 1
      ) {
        this.img_active += 1;
        this.img_src = this.details.gpics[this.img_active];
      }
    },
    // 分享
    share_tap() {
      console.log(window.location.href)
       this.$store.dispatch('wx/updateShare',{link:localStorage.href});
      // request({
      //   url: "/api/wxShare",
      //   data: { codeUrl: window.location.href },
      //   method: "post"
      // }).then(data => {});
    },
    // 关闭弹窗
    x_shop_tap() {
      this.shadow = !this.shadow;
    },
    customer_service() {
      this.is_shadow = !this.is_shadow;
    },
    show_tap(i) {
      this.is_show = !this.is_show;
      this.promise_des = this.promise_list[i];
    },
    list_item_tap(i) {
      this.item_index = i;
    },
    // 收藏
    collect_tap() {
      if (this.collect == "") {
        request({
          url: "/api/addUserCollectionGoods",
          data: {
            goods_id: this.val.good_id
          },
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            console.log(data.data.msg);
            // if (this.collect) {
            //   this.$toast("取消收藏！");
            // } else {
            this.$toast("收藏成功！");
            // }
            this.collect = !this.collect;
          }
        });
      } else {
        this.$toast("已收藏");
      }
    },
    cancel_collect_tap() {},
    // 选择颜色
    color_tap(i) {
      this.val.color_id = i;
    },
    size_tap(i, index) {
      if (this.val.size_id != i) {
        this.val.size_id = i;
        this.s = this.details.good_size[index].price;
        this.total();
      }
    },
    caizhi_tap(i, index) {
      if (this.val.caizhi_id != i) {
        this.val.caizhi_id = i;
        this.c = this.details.good_caizhi[index].price;
        this.total();
      }
    },
    total() {
      this.total_p = utils.jia(this.price, this.s, this.c);
    },
    // 添加购物车
    add_cart() {
      console.log(this.val);
      if (
        JSON.stringify(this.details.good_color) != "[]" &&
        this.val.color_id == ""
      ) {
        this.$toast("请选择颜色");
      } else if (
        this.val.size_id == "" &&
        JSON.stringify(this.details.good_size) != "[]"
      ) {
        this.$toast("请选择尺寸");
      } else if (
        this.val.caizhi_id == "" &&
        JSON.stringify(this.details.good_caizhi) != "[]"
      ) {
        this.$toast("请选择材质");
      } else if (this.val.num == "") {
        this.$toast("请选择数量");
      } else {
        request({
          url: "/api/addCart",
          data: this.val,
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            this.shadow = true;
          }
        });
      }
    },
    assess_tap(index) {
      this.assess_index = index;
    }
  }
};
</script>
<style scoped>
.shop_num {
  padding: 0 0.25rem;
  display: flex;
  align-items: center;
}

.shop_num div {
  margin-left: 0.2rem;
}

.shop_num p {
  margin-right: 0.1rem;
  border: 1px solid #ccc;
}

.shop_num p span {
  height: 100%;
  font-size: 0.4rem;
  display: inline-block;
  text-align: center;
  line-height: 0.6rem;
  color: #ff1284;
  width: 0.6rem;
}

.shop_num p span:first-child {
  border-right: 1px solid #ccc;
}

.shop_num p span:last-child {
  border-left: 1px solid #ccc;
}

.shop_num input {
  font-size: 0.28rem;
  width: 0.8rem;
  text-align: center;
}

#detail {
  margin: 0.9rem 0;
  top: 0;
  width: 100%;
  bottom: 0;
  position: fixed;
  overflow-y: auto;
}

#detail > p {
  background: white;
  width: 100%;
  font-size: 0.28rem;
  padding: 0.2rem;
}

#detail > p span {
  color: #2fc145;
}

.shop_s {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.shop_star {
  display: flex;
  align-items: center;
  font-size: 0.28rem;
}

.shop_star img {
  width: 0.35rem;
  height: 0.35rem;
}

.star {
  padding: 0.26rem 0.24rem;
  display: flex;
  align-items: center;
  border-bottom: 3px solid #eeeeee;
}

.star span {
  font-size: 0.28rem;
}

.star img {
  width: 0.3rem;
  height: 0.3rem;
}

/* ---------------------- */
.yanse,
.chicun,
.caizhi {
  padding: 0 0.25rem;
}

.yanse li {
  display: flex;
  align-items: center;
  justify-content: center;
}

.yanse li p {
  margin: 0.1rem 0;
  height: 0.6rem;
  width: 0.8rem;
  background: white;
}

.yanse li img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.shop_parm {
  padding: 0 0 0.2rem;
}

.shop_parm_title {
  padding: 0.2rem 0.25rem 0.1rem;
  font-size: 0.28rem;
}

.shop_parm_title span {
  margin-right: 0.3rem;
}

.cx_p {
  display: flex;
  align-items: center;
}

.dj_ {
  display: flex;
  align-items: center;
}

.unit_price {
  margin: 0 0 0.2rem 0 !important;
  padding: 0.2rem 0.25rem;
  background: #fef8da;
  flex-direction: column !important;
}

.dj_ span {
  font-size: 0.34rem;
  margin: 0.06rem 0;
  color: #fe2191;
}

.shop_parm_cont > div {
  font-size: 0.24rem;
  display: flex;
  flex-direction: row;
}

.shop_parm_cont > div p {
  white-space: nowrap;
  line-height: 0.4rem;
}

.shop_parm_cont ul {
  overflow: hidden;
}

.cx_time span {
  color: #666;
}

.active {
  color: white;
  background: #2fc145;
  border-color: #2fc145 !important;
}

.shop_parm_cont ul li {
  float: left;
  border: 1px solid #ff1284;
  border-radius: 0.05rem;
  line-height: 0.4rem;
  padding: 0 0.2rem;
  margin: 0 0.15rem 0.15rem 0;
}

.des {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0.22rem;
  padding: 0.2rem;
  background: #f1f1f1;
  color: #ff1284;
}

.des > div {
  display: flex;
  align-items: center;
}

.des img {
  object-fit: fill;
  width: 0.26rem;
  height: 0.26rem;
}

.des span {
  margin: 0 0.1rem;
}

.list_item {
  padding: 0.2rem 0.25rem;
}

.fir {
  background: #2fc145 !important;
}

.list_item ul {
  display: flex;
  flex-direction: row;
  font-size: 0.24rem;
  justify-content: space-around;
}

.list_item ul li {
  margin-right: 0.2rem;
  padding: 0.12rem 0.25rem;
  background: #ff1284;
  color: white;
  border-radius: 0.15rem;
}

.list_item ul li:last-child {
  margin-right: 0;
}

.list_content {
  font-size: 0.3rem;
  margin: 0 0.25rem 0.3rem;
}
.list_content >>>img{
  width: 100%;
}
.list_content > div {
  border: 0.5px solid #c0c0c0;
  width: 100%;
  padding: 0.1rem;
  overflow: hidden;
  text-align: justify;
}

.btn1 {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  font-size: 0.3rem;
  height: 0.9rem;
}

.btn1 div {
  border-top: 0.5px solid #c0c0c0;
  flex: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
  font-size: 0.22rem;
  align-items: center;
  background: white;
}

.btn1 div:last-child {
  border: 0;
  flex: 1.4;
  flex-direction: row;
  background: #ff1284;
  color: white;
}

.ad_cart span {
  margin-left: 0.1rem;
}

.btn1 img {
  width: 0.36rem;
  height: 0.36rem;
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

.shadow > div {
  border-radius: 0.1rem;
  overflow: hidden;
  width: 5.8rem;
  margin: 3rem auto;
  background: white;
}

.shadow .head {
  margin: 0 0.2rem;
  padding: 0.3rem 0 0.1rem;
  text-align: center;
  font-size: 0.36rem;
  border-bottom: 1px solid #666;

  color: black;
}

.shadow .cont {
  text-align: justify;
  line-height: 0.5rem;
  height: 6rem;
  overflow-y: auto;
  padding: 0.4rem;
  font-size: 0.33rem;
}

.shadow .define {
  text-align: center;
  font-size: 0.3rem;
  background: #ff1284;
  color: white;
  padding: 0.2rem;
}

/* shadow--------------------------------】 */

.kefu_shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.kefu_shadow > div {
  overflow: hidden;
  border-radius: 0.1rem;
  width: 5.8rem;
  margin: 3rem auto;
}

.kefu_shadow .kefu_head {
  position: relative;
  padding: 0.12rem;
  text-align: center;
  font-size: 0.32rem;
  background: #ff1284;
  color: white;
}

.kefu_head img {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  right: 0.3rem;
  top: 0.21rem;
}

.kefu_cont {
  padding: 0.4rem;
  background: white;
  text-align: center;
}

.kefu_cont p {
  font-size: 0.3rem;
  text-align: center;
}

.kefu_cont img {
  width: 3rem;
  height: 3rem;
}

/* 提示 */
.shadow1 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
}

.shadow1 > div {
  font-size: 0.28rem;
  background: white;
  border-radius: 0.1rem;
  overflow: hidden;
  width: 5.4rem;
  margin: 4rem auto;
}

.shadow_cont1 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 1rem 0;
  font-size: 0.34rem;
}

.shadow_cont1 img {
  margin-right: 0.1rem;
  width: 0.45rem;
  height: 0.45rem;
}

.shadow1 p {
  text-align: center;
}

.shadow_btn1 {
  display: flex;
  color: white;
  background: #ff1284;
}

.shadow1 .shadow_btn1 span {
  flex: 1;
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
}

.shadow_btn_line1 {
  width: 1px;
  height: 0.7rem;
  background: white;
}

.shadow1 .shadow_btn1 a {
  flex: 1;
  color: white;
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
}

/* +++++++++++++头部图片-视频++++++++++++++++++++++/ */
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
  /* object-fit: cover; */
  width: 100%;
  height: 5rem;
}

video {
  width: 100%;
  height: 5rem;
}

.list_ul {
  background: #edefee;
  padding: 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.list_ul ul {
  overflow-y: auto;
  width: 6rem;
}

.img_bor {
  border: 1px solid #f10072 !important;
}

.list_ul ul li {
  font-size: 0;
  border: 1px solid #edefee;
  margin-right: 0.1rem;
  float: left;
  box-sizing: border-box;
}

.img_list div {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.list_ul > img {
  width: 0.35rem;
  height: 0.4rem;
}

.list_ul li > img {
  padding: 1px 0;
  /* object-fit: cover; */
  width: 1.05rem;
  height: 0.7rem;
}
</style>
