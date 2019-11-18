<template>
  <div id="shop_order">
    <header_ />
    <div class="order_detail">
      <p>商品详情</p>
      <section class="address_info">
        <p>
          <img src="../../../assets/dizhi.png" alt />
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
      <!-- <section class="logistics_info">
        <div v-if="logistics_info==''">暂无物流信息</div>
        <div v-if="logistics_info!=''" class="log_you">
          <div class="log_title">【{{logistics_code}}】 <span>{{order_detail.logistics}}</span></div>
          <div v-for="(item, index) in logistics_info.Traces" :key="index">
            <p>{{item.AcceptStation}}</p>
          </div>
        </div>
      </section>-->
      <section class="order_number">
        <p>订单号：{{order_detail.one_order_number}}</p>
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
            <del v-if="order_detail.is_promo==1">￥{{order_detail.original_price}}</del>
            <span>￥{{order_detail.price}}</span>
            x {{order_detail.num}}
            <p v-if="order_detail.goods_status==5">退款中</p>
            <p v-if="order_detail.goods_status==8">已退款</p>
          </div>
        </div>
      </section>
      <!-- <div class="total_price">
        <p>
          共
          <span>{{num}}</span>件商品
        </p>
        <p>
          总价：
          <span>￥{{order_detail.surplus_total_price}}</span>
        </p>
      </div>-->
      <!-- <div class="invoice" v-if="order_detail.order_status==2">
        <p v-if="order_detail.is_invoice==1">发票已开</p>
        <p v-else>不要发票</p>
        <div v-if="order_detail.is_invoice==1">
          <p>开票日期：</p>
          <p>开票金额：</p>
          <p>发票类型：</p>
          <p>发票抬头：</p>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
import request from "@/request";
import header_ from "../../back_header";
export default {
  components: { header_ },
  data() {
    return {
      logistics_info: "",
      order_detail: {},
      num: "",
      logistics_code: "",
      subject_info:"",
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
        this.subject_info=data.data.data.subject_info
        // this.num=data.data.data.goods_list.length
        // this.logistics_info = data.data.data.logistics_info
        //   ? data.data.data.logistics_info
        //   : "";
        // // 获取物流编码
        // request({
        //   url: "/api/order/getWuliuList",
        //   method: "post"
        // }).then(res => {
        //   console.log(data);
        //   if (res.data.status == 200) {
        //     for (let name in res.data.data) {
        //       if (name == data.data.data.logistics_code) {
        //         console.log(name);
        //         this.logistics_code = res.data.data[name];
        //       }
        //     }
        //   }
        // });
      }
    });
  },
  methods: {}
};
</script>
<style scoped>
.order_detail {
  font-size: 0.3rem;
  line-height: 0.5rem;
  background: #a7d6e3;
}

.order_detail > p {
  font-weight: 600;
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
/* +++++++++++++++++++++ */
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
</style>