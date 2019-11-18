<template>
  <div id="shop_order">
    <header_ />
    <div class="order_detail">
      <p>商品详情</p>
      <section class="address_info">
        <p>
          <img src="../../assets/dizhi.png" alt />
          <span>地址</span>
        </p>
        <div class="address">
          <p>
            {{order_detail.consignee}}
            <span>{{order_detail.mobile}}</span>
          </p>
          <p>{{order_detail.address_detail}}{{order_detail.address}}</p>
        </div>
      </section>
      <section class="logistics_info">
        <div v-if="logistics_info==''">暂无物流信息</div>
        <div v-if="logistics_info!=''" class="log_you">
          <div class="log_title">
            【{{logistics_code}}】
            <span>{{order_detail.logistics}}</span>
          </div>
          <div v-for="(item, index) in logistics_info.Traces" :key="index">
            <p>{{item.AcceptStation}}</p>
          </div>
        </div>
      </section>
      <section class="order_number">
        <p>订单编号：{{order_detail.one_order_number}}</p>
        <!-- <span @click="confirm_tap(order_detail.id)" v-if="order_detail.goods_status==2">确认收货</!-->
      </section>
      <section class="order_time">订单时间：{{order_detail.created_at}}</section>

      <section class="good_view">
        <img :src="order_detail.gpics" alt="图片加载失败" />
        <div>
          <p>{{order_detail.manufactor_name}} {{order_detail.show_title}}</p>

          <p v-if="subject_info.color">
            颜色/分类：
            <span>{{subject_info.color}}</span>
          </p>
          <p v-if="subject_info.size">
            尺寸：
            <span>{{subject_info.size}}</span>
          </p>
          <p v-if="subject_info.caizhi">
            材质：
            <span>{{subject_info.caizhi}}</span>
          </p>
          <div class="price_">
            <del
              style="color:#7f7f7f"
              v-if="order_detail.is_promo==1"
            >￥{{order_detail.original_price}}</del>
            <span>￥{{order_detail.price}}</span>
            x {{order_detail.num}}
            <p v-if="order_detail.goods_status==5">退款中</p>
            <p v-if="order_detail.goods_status==8">已退款</p>
          </div>
        </div>
      </section>
      <div class="total_price">
        <p>
          共<span>{{order_detail.num}}</span>件商品
        </p>
        <p>
          总价：
          <span>￥{{order_detail.total_sum}}</span>
        </p>
      </div>
      <div v-if="order_detail.leaving_message" class="message">
        <div>留言：</div>
        <p>{{order_detail.leaving_message}}</p>
      </div>
      <div class="invoice" v-if="order_detail.order_status==2">
        <p v-if="order_detail.is_invoice==1">发票已开</p>
        <p v-else>不要发票</p>
        <div v-if="order_detail.is_invoice==1">
          <p>开票日期：</p>
          <p>开票金额：</p>
          <p>发票类型：</p>
          <p>发票抬头：</p>
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
      logistics_info: "",
      order_detail: {},
      subject_info: "",
      num: "",
      logistics_code: ""
    };
  },
  created() {
    var newID = this.$route.query.id;
    this.$store.commit("show_looding");
    request({
      url: "/api/order/getOneOrderDetailed",
      data: { one_order_number: newID },
      method: "post"
    }).then(data => {
      this.$store.commit("hide_looding");
      console.log(data);
      if (data.data.status == 200) {
        this.order_detail = data.data.data;
        this.subject_info = data.data.data.subject_info;
        this.logistics_info = data.data.data.logistics_info
          ? data.data.data.logistics_info
          : "";
        // 获取物流编码
        request({
          url: "/api/order/getWuliuList",
          method: "post"
        }).then(res => {
          console.log(data);
          if (res.data.status == 200) {
            for (let name in res.data.data) {
              if (name == data.data.data.logistics_code) {
                console.log(name);
                this.logistics_code = res.data.data[name];
              }
            }
          }
        });
      } else if (data.data.status == 10003) {
        this.$dialog
          .alert({
            title: "提示",
            message: "身份已过期，请重新登录！",
            showCancelButton: true
          })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {});
      }
    });
  },
  methods: {
    // 确认收货
    confirm_tap() {
      this.$dialog
        .alert({
          title: "确认收货",
          message: "请确认收到货物\n点击确定后订单完成 ",
          showCancelButton: true
        })
        .then(() => {
          request({
            url: "/api/order/ConfirmReceipt",
            data: { one_order_number: this.order_detail.one_order_number },
            method: "post"
          }).then(data => {
            this.$store.commit("hide_looding");
            console.log(data);
            if (data.data.status == 200) {
              this.$toast("已确认收货");
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
#shop_order {
  padding: 0.9rem 0;
}
.order_detail {
  font-size: 0.3rem;
  line-height: 0.5rem;
  background: #a7d6e3;
}

.order_detail > p {
  border-bottom: 1px solid #808080;
  background: white;
  text-align: center;
  padding: 0.2rem;
}

.order_detail .line {
  height: 0.25rem;
  background: #7f7f7f;
}

/* ==============地址========== */
.address_info {
  background: white;
  padding: 0.2rem 0.3rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  line-height: 0.5rem;
}

.address_info > p {
  height: 100%;
  padding-right: 0.2rem;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}

.address_info p img {
  margin: 0 auto;
  width: 0.43rem;
  height: 0.43rem;
}
section {
  background: white;
}
.address_info p span {
  white-space: nowrap;
}

.address {
  display: flex;
  flex-direction: column;
  padding-left: 0.2rem;
  border-left: 1px solid #000;
  word-wrap: break-word;
  max-width: 6rem;
}

.address p span {
  margin-left: 0.2rem;
  color: #000;
}
/* ++++++++++++++物流+++++++++++++++ */
.logistics_info {
  margin-top: 0.2rem;
  padding: 0.1rem 0.2rem;
}
.log_you .log_title {
  padding-bottom: 0.1rem;
  border-bottom: 0.5px solid #808080;
}
/* =----------------------------- */
.good_view {
  font-size: 0.26rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: #808080 0.5px solid;
}
.good_view img {
  width: 2rem;
  height: 2rem;
}
.good_view > div {
  margin-left: 0.2rem;
}
.price_ span {
  margin: 0 0.2rem;
  color: #ff1284;
}
.price_ p {
  display: inline-block;
  margin-left: 0.5rem;
  color: red;
}
.order_number {
  margin-top: 0.2rem;
  font-size: 0.28rem;
  overflow: hidden;
  padding: 0.1rem 0.2rem;
  background: #fdeef3;
}

.order_number span {
  margin-top: 0.1rem;
  float: right;
  color: #ff1284;
  border: 2px solid #ff1284;
  border-radius: 0.1rem;
  padding: 0 0.2rem;
}

.order_time {
  font-size: 0.28rem;
  background: #fee4f1;
  padding: 0.1rem 0.2rem;
}

.order_des {
  padding: 0.1rem 0.2rem;
}

.order_des span {
  color: #db247b;
}
.total_price {
  background: white;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
}
.total_price p {
  margin-left: 0.3rem;
}
.total_price span {
  color: #ff1284;
}
.message {
  background: white;
  margin-top: 0.2rem;
}
.message div {
  padding: 0.1rem 0.2rem;
  border-bottom: 0.5px solid #808080;
}
.message p {
  text-align: justify;
  padding: 0.1rem 0.2rem;
}
.invoice {
  margin-top: 0.2rem;
  padding: 0.1rem 0.2rem;
  background: white;
}
.house {
  padding: 0.2rem;
}

.house > p {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}

.house > p img {
  width: 0.3rem;
  height: 0.3rem;
}

.house > ul {
  overflow: hidden;
  font-size: 0;
}

.house > ul li {
  margin: 0 0.2rem 0.2rem 0;
  float: left;
  width: 1.32rem;
  height: 1.32rem;
}

.house > ul li img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.house > div > p {
  padding: 0.1rem 0.2rem;
}

.house_detail p span {
  margin-right: 0.2rem;
}

.house_detail {
  padding: 0 0.2rem;
  border-top: 1px solid #d2d2d2;
}

.house_detail ul {
  overflow: hidden;
}

.house_detail ul li {
  text-align: center;
  line-height: 1.2rem;
  width: 1.2rem;
  height: 1.2rem;
  font-size: 0;
  float: left;
  margin: 0 0.2rem 0.2rem 0;
}

.house_detail li img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-width: 100%;
}
</style>