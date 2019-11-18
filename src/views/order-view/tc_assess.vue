<template>
  <div>
    <header_ />
    <div class="condition">
      <p v-if="shop_data.goods_status==6">精装套餐订单追加评价</p>
      <p v-if="shop_data.goods_status==3">精装套餐订单评价</p>
      <div class="order_number">
        <p>订单号：{{shop_data.one_order_number}}</p>
        <span @click="customer_service(shop_data.customer_wx_qrcode,shop_data.customer_name)">联系客服</span>
      </div>
      <div class="order_time">订单时间：{{shop_data.created_at}}</div>
      <div class="order_des">
        <div>
          {{shop_data.title}}：
          <span>￥{{shop_data.total_sum}}</span>
        </div>
        <div>{{shop_data.title}}每平米单价：{{shop_data.price}}</div>
        <div>房屋面积：{{shop_data.area}}</div>
        <div>房屋地址：{{shop_data.room_address_detail}}</div>
      </div>
      <div class="assess" v-if="append==false">
        <p>评价内容：</p>
        <textarea placeholder="请输入~" cols="30" rows="10" v-model="val.evaluate_content"></textarea>
      </div>
      <div class="assess" v-else>
        <p>追评内容：</p>
        <textarea placeholder="请输入~" cols="30" rows="10" v-model="append_content"></textarea>
      </div>
      <div class="img_star" v-if="append==false">
        <p>
          <span>设计效果：</span>
          <img
            @click="zhiliang_tap(index)"
            v-for="(item, index) in 5"
            :key="index"
            :src="index<=val.effect-1?active:nomore"
            alt
          />
          <span v-if="val.effect!=''">{{val.effect}}分</span>
        </p>
        <p>
          <span>施工质量：</span>
          <img
            @click="waiguan_tap(index)"
            v-for="(item, index) in 5"
            :key="index"
            :src="index<=val.appearance-1?active:nomore"
            alt
          />
          <span v-if="val.appearance!=''">{{val.appearance}}分</span>
        </p>
        <p>
          <span>商品质量：</span>
          <img
            @click="fuwu_tap(index)"
            v-for="(item, index) in 5"
            :key="index"
            :src="index<=val.service-1?active:nomore"
            alt
          />
          <span v-if="val.service!=''">{{val.service}}分</span>
        </p>
        <p>
          <span>服务评价：</span>
          <img
            @click="wuliu_tap(index)"
            v-for="(item, index) in 5"
            :key="index"
            :src="index<=val.logistics-1?active:nomore"
            alt
          />
          <span v-if="val.logistics!=''">{{val.logistics}}分</span>
        </p>
      </div>
      <div class="pics" v-if="append==false">
        <p>添加图片：</p>
        <ul>
          <li v-for="(item, index) in up_imgdata" :key="index">
            <img class="x_img" @click="x_img_tap(index)" src="../../assets/home_img/guanbi.png" alt />
            <img :src="item" alt />
          </li>
          <li class="jia">
            <input
              name="file"
              type="file"
              @change="uplodeimg"
              accept="image/jpeg, image/jpg, image/png"
              multiple="multiple"
            />
            <img src="../../assets/home_img/up_img01.png" alt />
          </li>
        </ul>
      </div>
      <div class="pics" v-else>
        <p>添加图片：</p>
        <ul>
          <li v-for="(item, index) in append_imgdata" :key="index">
            <img
              class="x_img"
              @click="append_x_img_tap(index)"
              src="../../assets/home_img/guanbi.png"
              alt
            />
            <img :src="item" alt />
          </li>
          <li class="jia">
            <input
              name="file"
              type="file"
              @change="append_uplodeimg"
              accept="image/jpeg, image/jpg, image/png"
              multiple="multiple"
            />
            <img src="../../assets/home_img/up_img01.png" alt />
          </li>
        </ul>
      </div>
      <div v-if="append==false" class="btn" @click="btn_tap">提交</div>
      <div v-else class="btn" @click="append_btn_tap">提交</div>
      <div v-if="is_shadow" class="shadow" @touchmove.prevent>
        <div>
          <p class="head">
            {{name}}
            <img
              @click="customer_service"
              src="../../assets/home_img/x_1.png"
              alt
            />
          </p>
          <div class="cont">
            <img :src="code" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/request";
import header_ from "../back_header";
export default {
  components: { header_ },
  data() {
    return {
      is_shadow: false,
      append: false,
      shop_data: [],
      up_imgdata: [],
      quantity_room_info: "",
      nomore: require("../../assets/home_img/star_biu01.png"),
      active: require("../../assets/home_img/star_biu.png"),
      val: {
        one_order_number: "", //	是	int	评论订单
        picture: "",
        evaluate_content: "", //	是	string	评价内容
        effect: "", //	是	int	质量星级
        service: "", //	是	int	服务星级
        logistics: "", //	是	int	物流星级
        appearance: "" //外观
      },
      // 追评
      append_content: "",
      append_imgdata: [],
      code: "",
      customer_service_qr_code_name: ""
    };
  },
  created() {
    this.$store.state.title_name = "我的订单";
    this.$store.commit("show_looding");
    if (this.$route.query.is == 0) {
      this.append = true;
    }
    this.val.one_order_number = this.$route.query.id;
    request({
      url: "/api/order/getOneOrderDetailed",
      data: { one_order_number: this.$route.query.id },
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.data.status == 200) {
        this.shop_data = data.data.data;
        this.quantity_room_info = data.data.data.quantity_room_info;
      }
      this.$store.commit("hide_looding");
    });
  },
  methods: {
    // 联系客服
    customer_service(code,name) {
      this.code=code
      this.name=name
      this.is_shadow = !this.is_shadow;
    },
    zhiliang_tap(i) {
      this.val.effect = i + 1;
    },
    waiguan_tap(i) {
      this.val.appearance = i + 1;
    },
    fuwu_tap(i) {
      this.val.service = i + 1;
    },
    wuliu_tap(i) {
      this.val.logistics = i + 1;
    },
    x_img_tap(i) {
      this.up_imgdata.splice(i, 1);
    },
    uplodeimg(e) {
      if (this.up_imgdata.length < 8) {
        let data = e.target.files[0];
        let config = {};
        var formData = new FormData();
        formData.append("file", data);
        this.$store.commit("show_looding");
        request({
          url: "/api/upload",
          method: "post",
          data: formData
        }).then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.up_imgdata.push(res.data.data[0]);
          }

          this.$store.commit("hide_looding");
        });
      } else {
        this.$toast("最多上传8张图片！");
      }
    },

    btn_tap() {
      this.val.picture = JSON.stringify(this.up_imgdata);
      console.log(this.val);
      if (this.val.evaluate_content == "") {
        this.$toast("请输入评价内容！");
      } else if (
        this.val.effect == "" ||
        this.val.service == "" ||
        this.val.logistics == "" ||
        this.val.appearance == ""
      ) {
        this.$toast("请选择星级");
      } else {
        request({
          url: "/api/addComment",
          method: "post",
          data: this.val
        }).then(data => {
          console.log(data);
          if (data.data.status == 200) {
            this.$toast("评价成功");
          }
          if (data.data.status == 404) {
            this.$toast("不能重复评价");
          }
          this.$router.go(-1);
        });
      }
    },
    // 追评
    append_uplodeimg(e) {
      if (this.up_imgdata.length < 4) {
        let data = e.target.files[0];
        let config = {};
        var formData = new FormData();
        formData.append("file", data);
        request({
          url: "/api/upload",
          method: "post",
          data: formData
        }).then(res => {
          console.log(res);
          console.log(res.data.data[0]);
          this.append_imgdata.push(res.data.data[0]);
        });
      } else {
        this.$toast("最多上传4张图片！");
      }
    },
    append_x_img_tap() {
      this.append_imgdata.splice(i, 1);
    },
    append_btn_tap() {
      if (this.val.append_content == "") {
        this.$toast("请输入评价内容！");
      } else {
        var data = {
          one_order_number: this.val.one_order_number,
          append_picture: JSON.stringify(this.append_imgdata),
          append_evaluate_content: this.append_content
        };
        request({
          url: "/api/addAppendComment",
          method: "post",
          data: data
        }).then(data => {
          console.log(data);
          if (data.data.status == 200) {
            this.$toast("追评成功");
          }
          if (data.data.status == 404) {
            this.$toast("不能重复评价");
          }
          this.$router.push({ path: "/order/taocan_order" });
        });
      }
    }
  }
};
</script>
<style scoped>
.condition {
  margin: 0.9rem 0 1.05rem;
}
.condition > p {
  text-align: center;
  padding: 0.2rem;
  font-size: 0.36rem;
}
.order_number {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.28rem;
  padding: 0 0.2rem;
  height: 0.9rem;
  background: #fdeef3;
}

.order_number span {
  padding: 0.1rem 0.2rem;
  border: 1px solid #ff3399;
  border-radius: 0.1rem;
  color: #ff3399;
}

.order_time {
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.28rem;
  background: #fee4f1;
  padding: 0 0.2rem;
}

/* ---------------------------------------------- */
.order_des {
  padding: 0.3rem 0.2rem 0;
  font-size: 0.3rem;
}
.order_des > div {
  line-height: 0.5rem;
}

.order_des span {
  color: #ff1284;
}

.assess {
  font-size: 0.3rem;
  padding: 0.2rem;
}
.assess textarea {
  margin-top: 0.1rem;
  padding: 0.1rem;
  width: 100%;
  height: 1.53rem;
}
.img_star p {
  padding: 0 0.2rem;
  line-height: 0.6rem;
  font-size: 0.3rem;
  display: flex;
  align-items: center;
}
.img_star p span:first-child {
  width: 1.8rem;
}
.img_star p span:last-child {
  margin-left: 0.2rem;
  color: rgb(29, 216, 29);
}
.img_star img {
  margin-right: 0.06rem;
  width: 0.35rem;
  height: 0.35rem;
}
.pics {
  font-size: 0.3rem;
  padding: 0.2rem;
}
.pics ul {
  overflow: hidden;
  padding: 0.2rem 0;
}
.pics ul li {
  position: relative;
  float: left;
  margin: 0 0.2rem 0.2rem 0;
  width: 1.52rem;
  height: 1.17rem;
  text-align: center;
  line-height: 1.17rem;
  border: 1px solid #999999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pics ul li .x_img {
  position: absolute;
  right: -0.17rem;
  top: -0.17rem;
  width: 0.34rem;
  height: 0.34rem;
}

.pics li img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.pics .jia {
  background: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pics .jia img {
  width: 0.42rem;
  height: 0.38rem;
}
.jia input {
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
}
.btn {
  color: white;
  background: #ff1284;
  width: 6.75rem;
  height: 0.8rem;
  text-align: center;
  margin: 0 auto 1.5rem;
  line-height: 0.8rem;
  border-radius: 0.1rem;
  font-size: 0.36rem;
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
  width: 5.4rem;
  margin: 4rem auto;
  border-radius: 0.1rem;
  overflow: hidden;
}

.shadow .head {
  position: relative;
  height: 0.76rem;
  line-height: 0.76rem;
  text-align: center;
  font-size: 0.36rem;
  background: #ff349d;
  color: white;
}

.shadow .head img {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  right: 0.3rem;
  top: 0.2rem;
}

.shadow .cont {
  padding: 0.4rem;
  background: white;
  text-align: center;
}
.shadow .cont img {
  width: 3rem;
  height: 3rem;
}
</style>