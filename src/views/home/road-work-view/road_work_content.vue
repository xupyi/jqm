<template>
  <div>
    <section class="work">
      <section class="img_list">
        <div class="gpics">
          <img v-if="status=='img'&&work_datas.panorama!=''&&work_datas.panorama!=null" @click="vr_tap" class="vr360"
            src="../../../assets/home_img/vr_icon_1.png" alt />
          <img v-if="status=='img'" @click="vr_tap" class="big_img" :src="img_src" alt />

          <video controls v-else :poster="work_datas.video_pic_url" style="object-fit:fill"
            :src="work_datas.video_url"></video>
        </div>
        <div class="list_ul">
          <img @click="left_tap" src="../../../assets/home_img/zuo.png" alt />
          <ul>
            <li @click="img_tap(index)" :class="img_active==index?'img_bor':''"
              v-for="(item, index) in work_datas.gpics" :key="index">
              <img :src="item" alt />
            </li>
            <li v-if="work_datas.video_pic_url" class="vr" @click="img_vr" :class="img_active=='vr'?'img_bor':''">
              <img :src="work_datas.video_pic_url" alt />
              <img class="bf_img" src="../../../assets/home_img/bf.png" alt />
            </li>
          </ul>
          <img @click="right_tap" src="../../../assets/home_img/you.png" alt />
        </div>
      </section>
      <p>
        <span>推荐指数：</span>
        <img v-for="(item, index) in work_datas.rec_star" :key="index" src="../../../assets/home_img/star_biu.png"
          alt />
      </p>
      <div class="work_title">{{work_datas.show_title}}</div>
      <ul class="work_ul">
        <li @click="work_price_tap(index,item.construction_price)"
          v-for="(item, index) in work_datas.good_construction_price" :key="index">
          <img :src="work_price_index==index?work_price_active:work_price_normal" alt />
          <div>
            <p>
              每平米施工费单价
              <span>{{parseInt(item.construction_price)}}</span> 元
            </p>
          </div>
        </li>

        <li>
          <div>
            <div class="area">
              待施工房屋面积：
              <input v-model="val.area" type="number" />平米
            </div>

            <div class="select_home">
              <span>选择房屋：</span>
              <p v-if="house_List==''" @click="house_tap">
                <span>请先提交量房预约</span>
                <img src="../../../assets/xia_.png" alt />
              </p>
              <select v-else v-model="val.quantity_room_id">
                <option value disabled>请选择</option>
                <option :value="item.id" v-for="(item, index) in house_List" :key="index">{{item.address}}</option>
              </select>
            </div>
          </div>
        </li>
      </ul>
      <p class="amount_price">
        设计费用合计￥
        <span>{{total}} </span>元
      </p>
      <!-- 分期 -->
      <div class="by_stages">
        <p @click="by_stages_tap(1)">
          <img :src="val.stage_number==1?work_price_active:work_price_normal" alt />
          <span>
            第1期 首付款{{parseInt(stage1)}}%：RMB ￥
            <span>{{total | total_1(total_,stage1)}}</span>元
          </span>
        </p>
        <p @click="by_stages_tap(2)">
          <img :src="val.stage_number==2?work_price_active:work_price_normal" alt />
          <span>
            第2期 中期款{{parseInt(stage2)}}%：RMB ￥
            <span>{{total | total_1(total_,stage2)}}</span>元
          </span>
        </p>
        <p @click="by_stages_tap(3)">
          <img :src="val.stage_number==3?work_price_active:work_price_normal" alt />
          <span>
            第3期 中期款{{parseInt(stage3)}}%：RMB ￥
            <span>{{total | total_1(total_,stage3)}}</span>元
          </span>
        </p>
      </div>
      <div class="point">
        <p>友情提示：</p>
        <p>点击“加入购物车”之前，请您仔细阅读“施工介绍”。</p>
      </div>
      <div class="road_btn" @click="add_shop_tap">加入购物车</div>
      <div class="footer">
        <p>施工介绍</p>
        <div class="foot_cont" v-html="work_datas.content"></div>
      </div>
    </section>
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
  import request from "@/request";
  import utils from "@/utils";
  export default {
    data() {
      return {
        work_datas: {},
        work_price_active: require("../../../assets/home_img/dui.png"),
        work_price_normal: require("../../../assets/home_img/yuan.png"),
        work_price_index: null,
        desgin_price_index: null,
        house_List: [],
        val: {
          good_id: "",
          order_type: 3,
          num: 1,
          area: "",
          price: "",
          quantity_room_id: "",
          stage_number: ""
        },
        shadow: false,
        status: "img",
        img_active: "",
        img_src: "",
        getByStagesList: "",
        total_: "",
        stage1: "",
        stage2: "",
        stage3: ""
      };
    },
    computed: {
      total() {
        if (this.val.price == "" || this.val.area == "") {
          return "0.00";
        } else {
          // if (/^[0-9]*[1-9][0-9]*$/.test(this.val.area) == false) {
          //   this.$toast("请输入整数！");
          //   this.val.area = "";
          //   this.total_ = "";
          //   return "0.00";
          // } else {
          this.total_ = utils.accMul(this.val.price, this.val.area);
          return utils.accMul(this.val.price, this.val.area);
          // }
        }
      }
    },
    filters: {
      total_1(val, price, bystage) {
        return utils.accMul(price, Number(bystage) / 100);
      }
    },
    created() {
      this.$store.commit("show_looding");
      request({
          url: "/api/getConstruction",
          method: "post"
        }).then(data => {
          console.log(data);
          this.$store.commit("hide_looding");
          if (data.status == 200) {
            this.work_datas = data.data.data;
            this.val.good_id = data.data.data.id;
            this.img_src =
              data.data.data.gpics == "" ? "" : data.data.data.gpics[0];
          }
        }),
        // 设计师
        request({
          url: "/api/getUserList",
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.status == 200) {
            this.UserList = data.data.data.data;
          }
        }),
        // 获取房屋列表
        request({
          url: "/api/getQuantityRoom",
          method: "post"
        }).then(data => {
          console.log(data);
          this.$store.commit("hide_looding");
          if (data.status == 200) {
            this.house_List = data.data.data;
          }
        });
      // 获取分期列表
      request({
        url: "/api/construction/getByStagesList",
        method: "post"
      }).then(data => {
        console.log(data);
        this.$store.commit("hide_looding");
        if (data.status == 200) {
          // this.getByStagesList = data.data.data;
          this.stage1 = data.data.data[0].stages_proportion;
          this.stage2 = data.data.data[1].stages_proportion;
          this.stage3 = data.data.data[2].stages_proportion;
        }
      });
    },
    methods: {
      go_shop() {
        // 去购物车结算
        sessionStorage.setItem('shop_index', 3)
        this.$router.push('/shop')
      },
      vr_tap() {
        if (this.work_datas.panorama != "" && this.work_datas.panorama != null) {
          window.location.href = this.work_datas.panorama;
        }
      },
      img_tap(index) {
        this.status = "img";
        this.img_active = index;
        this.img_src = this.work_datas.gpics[index];
      },
      img_vr() {
        this.img_active = this.status = "vr";
      },
      left_tap() {
        if (this.status == "img") {
          this.img_active = this.img_active == 0 ? 0 : this.img_active - 1;
          this.img_src = this.work_datas.gpics[this.img_active];
        } else {
          this.status = "img";
          this.img_active = this.work_datas.gpics.length - 1;
          this.img_src = this.work_datas.gpics[this.img_active];
        }
      },
      right_tap() {
        if (
          this.img_active == this.work_datas.gpics.length - 1 &&
          this.work_datas.video_pic_url != ""
        ) {
          this.img_active = this.status = "vr";
          return;
        }
        if (
          this.status == "img" &&
          this.img_active != this.work_datas.gpics.length - 1
        ) {
          this.img_active += 1;
          this.img_src = this.work_datas.gpics[this.img_active];
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
      // 分期
      by_stages_tap(i) {
        this.val.stage_number = i;
      },
      navList_tap(i) {
        this.active = i;
      },
      work_price_tap(i, price) {
        this.work_price_index = i;
        this.val.price = price;
      },
      add_shop_tap() {
        console.log(this.val);
        if (this.val.area == "" || this.val.area == 0) {
          this.$toast("请输入房屋面积");
        } else if (this.val.quantity_room_id == "") {
          this.$toast("请选择房屋");
        } else if (this.val.price == "") {
          this.$toast("请选择施工费");
        } else if (this.val.stage_number == "") {
          this.$toast("请选择分期");
        } else {
          request({
            url: "/api/addCart",
            data: this.val,
            method: "post"
          }).then(data => {
            console.log(data);
            if (data.data.status == 200) {
              this.$store.commit("hide_looding");
              this.shadow = true;
            } else {
              this.$toast(data.data.msg);
            }
          });
        }
      },
      // 关闭弹窗
      x_shop_tap() {
        this.shadow = false;
      },
      work_detail_tap(shop_id, index) {
        this.$router.push({
          path: "/designer_detail",
          query: {
            id: shop_id,
            price: this.UserList[index].price,
            type: ""
          }
        });
      }
    }
  };

</script>

<style scoped>
  .work {
    font-size: 0.26rem;
  }

  .work>img {
    width: 100%;
    height: auto;
  }

  .work>p {
    display: flex;
    align-items: center;
    margin: 0.1rem 0.3rem;
  }

  .work>p img {
    margin-right: 0.05rem;
    width: 0.25rem;
    height: 0.25rem;
  }

  .work_title {
    margin-left: 0.3rem;
    color: red;
    font-size: 0.28rem;
  }

  .work_ul li {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
    /* border-bottom: 0.3px solid #bfbfbf; */
    margin: 0 0.45rem 0 0.33rem;
    padding: 0.2rem 0.2rem 0.2rem 0;
  }
  .work_ul li::after {
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
  .work_ul li p span {
    color: #f72691;
  }

  select {
    border: 0.5px solid #bfbfbf;
    flex: 1;
    padding: 0.05rem;
    border-radius: 0.1rem;
    color: #0066ff;
  }

  .work_ul li img {
    width: 0.33rem;
    height: 0.33rem;
  }

  .work_ul li>div {
    margin-left: 0.1rem;
  }

  .work_ul li .desc {
    margin-top: 0.15rem;
    color: #000;
  }

  .area {
    margin-left: 0.3rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
  }

  .area input {
    padding-left: 0.1rem;
    border: 0.5px solid #bfbfbf;
    border-radius: 0.07rem;
    width: 2rem;
    height: 0.5rem;
    margin: 0 0.1rem;
  }

  .select_home {
    margin-left: 0.3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .select_home p {
    border: 0.5px solid #a6a6a6;
    border-radius: 4px;
    padding: 0.1rem 0.2rem;
    display: flex;
    align-items: center;
    color: #0066ff;
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

  .amount_price {
    padding-left: 0.4rem;
  }

  .amount_price span {
    font-size: 0.36rem;
    color: #f10072;
    padding: 0 0.1rem;
  }

  .point {
    margin-left: 0.4rem;
    color: red;
  }

  .road_btn {
    margin: 0.3rem 0.4rem;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    background: #ff1284;
    color: white;
    border-radius: 0.1rem;
  }

  /*---------------------------- 分期--------------------------- */
  .by_stages {
    margin: 0 0 0.2rem 0.3rem;
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
    font-size: 0.3rem;
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
    margin-top: 0.6rem;
  }

  .footer p {
    padding: 0 0.36rem;
    background: #343434;
    overflow: hidden;
  }

  .footer p {
    padding: 0.18rem 0 0.2rem;
    color: white;
    text-align: center;
  }

  .footer>div {
    margin: 0.2rem 0.26rem;
    text-align: justify;
    line-height: 0.4rem;
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
