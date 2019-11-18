<template>
  <div class="shop_order">
    <nav>
      <ul>
        <li
          @click="li_tap(index)"
          :class="index==num?'fir':''"
          v-for="(item, index) in ul_lists"
          :key="index"
        >{{item}}</li>
      </ul>
    </nav>
    <main>
      <p class="condition" v-if="order_list==''">您还没有相关的订单哦~</p>
      <ul v-else>
        <li v-for="(item, index) in order_list" :key="index">
          <div class="shop_number">
            <p>订单号：{{item.one_order_number}}</p>
            <span @click="customer_service(item.wx_qrcode,item.brand_customer)">联系客服</span>
          </div>
          <div class="shop_time">订单时间：{{item.created_at}}</div>
          <div class="shop_des">
            <img :src="item.gpics" alt />
            <div v-if="item.subject_info">
              <p>{{item.manufactor_name}} {{item.show_title}}</p>
              <p v-if="item.subject_info.color">
                颜色/分类：
                <span>{{item.subject_info.color}}</span>
              </p>
              <p v-if="item.subject_info.size">
                尺寸：
                <span>{{item.subject_info.size}}</span>
              </p>
              <p v-if="item.subject_info.caizhi">
                材质：
                <span>{{item.subject_info.caizhi}}</span>
              </p>
              <div class="price_">
                <del v-if="item.is_promo==1">￥{{item.original_price}}</del>
                <span>￥{{item.price}}</span>
                x {{item.num}}
              </div>
            </div>
          </div>
          <div class="shop_tkg" v-if="item.goods_status==8">
            <span>退款成功：-￥{{item.refund_price}}</span>
          </div>
          <div class="shop_status">
            <p>
              交易状态：{{item.goods_status | help}}
              <span v-if="item.goods_status==8">退款成功</span>
            </p>
          </div>
          <div class="shop_more">
            <span v-if="item.goods_status==0" @click="settle_tap(item.id)">立即付款</span>
            <span v-if="item.goods_status==0" @click="qx_order_tap(item.one_order_number)">取消订单</span>
            <!-- <router-link
              v-if="item.order_status==0"
              :to="{path: '/setter',query: { transaction:item.transaction,time:item.created_at}}"
            >立即付款</router-link>-->
            <span v-if="item.goods_status==2" @click="qr_shadow(item.one_order_number)">确认并评价</span>
            <router-link
              v-if="item.goods_status==6&&item.is_thirty_evaluate==0"
              :to="{ path: '/shop_assess', query: { id: item.one_order_number, type: 0 } }"
            >追加评论</router-link>
            <router-link
              v-if="item.goods_status==2"
              :to="{path:'/wuliu',query:{id:item.one_order_number}}"
            >查看物流</router-link>
            <span
              v-if="item.goods_status==1"
              @click="tk_show(item.one_order_number,item.goods_status,item.total_sum)"
            >申请退款</span>
            <span
              v-if="item.goods_status==2"
              @click="tk_show(item.one_order_number,item.goods_status,item.total_sum)"
            >退货退款</span>
            <router-link
              v-if="item.goods_status==3&&item.is_thirty_evaluate==0"
              :to="{ path: '/shop_assess', query: { id: item.one_order_number}}"
            >去评价</router-link>

            <router-link
              v-if="item.goods_status==0||item.goods_status==1||item.goods_status==2||item.goods_status==3"
              :to="{ path: '/shop_order_detail', query: { id: item.one_order_number}}"
            >订单详情</router-link>
            <!-- <router-link
              v-if="item.is_invoice==1&&item.invoice_pic!=''||item.goods_status==3|| item.goods_status==4"
              :to="{ path: '/look_invoice', query: { url: item.invoice_pic}}"
            >查看发票</router-link>-->
            <span
              v-if="item.goods_status==5||item.goods_status==6||item.goods_status==8||item.goods_status==9||item.goods_status==10||
            item.goods_status==11"
              @click="del_tap(item.one_order_number)"
            >删除订单</span>
          </div>

          <div class="shop_total">
            <p>
              共
              <span>{{item.num}}</span> 件商品
            </p>
            <p>
              合计：
              <span>￥{{item.total_sum}}</span>
            </p>
          </div>
        </li>
      </ul>
    </main>
    <div v-if="is_shadow" class="shadow" @touchmove.prevent>
      <div>
        <p class="head">
          {{brand_customer}}
          <img @click="customer_service" src="../../assets/home_img/x_1.png" alt />
        </p>
        <div class="cont">
          <img :src="wx_qrcode" alt />
          <p>长按上面的二维码，关注客服微信号</p>
        </div>
      </div>
    </div>
    <div class="shadow" v-if="qr_isshadow" @touchmove.prevent>
      <div>
        <div class="cont qx_cont">
          <p>请确认收到货物</p>
          <p>点击确定后订单完成</p>
        </div>
        <div class="shadow_btn">
          <span @click="no_show">取消</span>
          <div class="shadow_btn_line"></div>
          <span @click="confirm_tap()">确定</span>
        </div>
      </div>
    </div>
    <div class="shadow" v-if="qx_shadow" @touchmove.prevent>
      <div>
        <div class="cont qx_cont">
          <p>您确定要取消该订单吗？</p>
        </div>
        <div class="shadow_btn">
          <span @click="no_show">取消</span>
          <div class="shadow_btn_line"></div>
          <span @click="quxiao()">确定</span>
        </div>
      </div>
    </div>
    <div class="shadow" v-if="tk_shadow" @touchmove.prevent>
      <div>
        <div class="cont qx_cont">
          <p v-if="i==2">确定要退货退款吗？</p>
          <p v-else>确定要退款吗？</p>
        </div>
        <div class="shadow_btn">
          <span @click="no_show">取消</span>
          <div class="shadow_btn_line"></div>
          <span @click="confirm">确定</span>
        </div>
      </div>
    </div>
    <div class="shadow" v-if="del_shadow1" @touchmove.prevent>
      <div>
        <div class="cont qx_cont">
          <p>确定要删除该订单吗？</p>
        </div>
        <div class="shadow_btn">
          <span @click="no_show">取消</span>
          <div class="shadow_btn_line"></div>
          <span @click="del_qd_tap">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/request";
export default {
  data() {
    return {
      code: "",
      ul_lists: ["全部", "待付款", "待发货", "待收货"],
      num: 0,
      order_list: "",
      is_shadow: false,
      qr_isshadow: false,
      tk_shadow: false,
      del_shadow1: false,
      one_order_number: "",
      qx_shadow: false,
      price: "",
      i: "",
      brand_customer: "", //客服标题
      wx_qrcode: "" //客服二维码
    };
  },
  created() {
    if (this.$route.query.status) {
      this.num = this.$route.query.status;
      this.get_data(this.$route.query.status);
    } else {
      this.get_data("");
    }
  },
  filters: {
    help(val) {
      if (val == 0) {
        return "待支付";
      } else if (val == 1) {
        return "待发货";
      } else if (val == 2) {
        return "待收货";
      } else if (val == 3) {
        return "待评价";
      } else if (val == 4) {
        return "退货中";
      } else if (val == 5) {
        return "退货成功";
      } else if (val == 6) {
        return "评价完成";
      } else if (val == 7) {
        return "拒绝退货";
      } else if (val == 8) {
        return "退款完成";
      } else if (val == 9) {
        return "交易关闭";
      } else if (val == 10) {
        return "订单已取消";
      } else if (val == 11) {
        return "追评完成";
      } else return "";
    }
  },
  methods: {
    // 确认收货
    qr_shadow(id) {
      this.one_order_number = id;
      this.qr_isshadow = true;
    },
    confirm() {
      this.tk_shadow = false;
      if (this.i == 2) {
        this.$router.push({
          path: "/refund",
          query: { id: this.one_order_number, is: true, price: this.price }
        });
      } else {
        this.$router.push({
          path: "/refund",
          query: { id: this.one_order_number, price: this.price }
        });
      }
    },
    tk_show(id, i, price) {
      this.tk_shadow = true;
      this.i = i;
      this.price = price;
      this.one_order_number = id;
    },
    qx_order_tap(id) {
      this.qx_shadow = true;
      this.one_order_number = id;
    },
    // 关闭客服
    x_tap() {
      this.is_shadow = false;
    },
    // 联系客服
    customer_service(code, name) {
      this.brand_customer = name;
      this.wx_qrcode = code;
      this.is_shadow = !this.is_shadow;
    },
    li_tap(i) {
      this.num = i;
      this.get_data(i == 0 ? "" : i - 1);
    },
    get_data(val) {
      this.$store.commit("show_looding");
      request({
        url: "/api/order/UserOrderList",
        data: { order_type: 1, status: val },
        method: "post"
      }).then(data => {
        this.$store.commit("hide_looding");
        console.log(data.data.data);
        if (data.data.status == 200) {
          this.order_list = data.data.data;
        }
      });
    },
    // 立即支付
    settle_tap(id) {
      request({
        url: "/api/order/getOnePayParameter",
        data: { id: id,request_type:'pc'},
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          window.location.href = data.data.data.billQRCode;
        }else{
          this.$toast("支付失败");
        }
      });
    },
    // 取消订单
    quxiao() {
      this.$store.commit("show_looding");
      request({
        url: "/api/order/cancelOrder",
        data: { one_order_number: this.one_order_number },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.$toast("订单已取消");
          this.get_data("");
          this.qx_shadow = false;
        }
        this.$store.commit("hide_looding");
      });
    },
    // 确认收货
    confirm_tap() {
      request({
        url: "/api/order/ConfirmReceipt",
        data: { one_order_number: this.one_order_number },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.$toast("已确认收货");
          this.$router.push({
            path: "/shop_assess",
            query: { id: this.one_order_number }
          });
        } else {
          this.$toast(data.data.msg);
        }
      });
    },
    no_show() {
      this.qr_isshadow = false;
      this.qx_shadow = false;
      this.tk_shadow = false;
      this.del_shadow1 = false;
      this.one_order_number = "";
      this.price = "";
      this.i = "";
    },
    del_tap(id, index) {
      this.one_order_number = id;
      this.i = index;
      this.del_shadow1 = true;
    },
    del_qd_tap() {
      request({
        url: "/api/order/deleteUserOrder",
        data: { one_order_number: this.one_order_number },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.$toast("订单已删除");
          this.get_data("");
          this.del_shadow1 = false;
        }
        this.$store.commit("hide_looding");
      });
    }
  }
};
</script>
<style scoped>
.condition {
  text-align: center;
  padding-top: 0.2rem;
  background: white;
  font-size: 0.28rem;
}

.shop_order nav ul {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.shop_order nav ul li {
  box-sizing: border-box;
  padding: 00.1rem 0.2rem;
  flex: 1;
  text-align: center;
  font-size: 0.28rem;
  border-bottom: 2px solid white;
}

.fir {
  color: #2fc145;
  border-color: #2fc145 !important;
}

main {
  margin-top: 0.1rem;
  overflow-y: auto;
}
main ul {
  background: #a7d6e3;
}
main li {
  font-size: 0.28rem;
  background: white;
  margin-bottom: 0.2rem;
}
main li:last-child {
  margin-bottom: 0;
}
.shop_number {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.28rem;
  padding: 0 0.2rem;
  height: 0.9rem;
  background: #fdeef3;
}

.shop_number span {
  padding: 0.1rem;
  border: 1px solid #ff3399;
  border-radius: 0.1rem;
  color: #ff3399;
}

.shop_time {
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.28rem;
  background: #fee4f1;
  padding: 0 0.2rem;
}

/* ---------------------------------------------- */
.shop_des {
  background: white;
  padding: 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.shop_des img {
  width: 2.19rem;
  height: 2.21rem;
}
.shop_des div > p {
  font-size: 0.24rem;
}
.shop_des > div {
  margin-left: 0.2rem;
  line-height: 0.5rem;
}
.shop_des div div span {
  margin-right: 0.2rem;
}
.shop_total {
  text-align: right;
  padding: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.shop_total p {
  margin-left: 0.3rem;
}
.shop_total span {
  color: #ff1284;
  font-size: 00.33rem;
}
.shop_tkg {
  border-top: 0.5px solid #808080;
  padding: 0.2rem;
  color: red;
}
.shop_status {
  padding: 0.2rem;
  border-top: 0.5px solid #808080;
  border-bottom: 0.5px solid #808080;
}
.shop_status span {
  margin-left: 0.4rem;
  color: red;
}
.shop_more {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 0.2rem;
  border-bottom: 0.5px solid #808080;
}
.shop_more a {
  margin: 0.1rem 0;
  text-align: center;
  margin-left: 0.15rem;
  padding: 0.1rem;
  color: #ff1284;
  border: 1px solid #ff1284;
  font-size: 0.28rem;
  border-radius: 0.1rem;
}
.shop_more span {
  margin: 0.1rem 0;
  text-align: center;
  margin-left: 0.15rem;
  padding: 0.1rem;
  color: #ff1284;
  border: 1px solid #ff1284;
  font-size: 0.28rem;
  border-radius: 0.1rem;
}
.price_ del {
  color: #808080;
  font-size: 0.24rem;
}
.price_ span {
  font-size: 0.28rem;
  color: #ff1284;
}
/* shadow--------------------------------】 */

.shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
}
.shadow > div {
  width: 5.8rem;
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
  background: #ff1284;
  color: white;
}

.shadow .head img {
  width: 0.35rem;
  height: 0.35rem;
  position: absolute;
  right: 0.3rem;
  top: 0.2rem;
}

.shadow .cont {
  font-size: 0.3rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  background: white;
  text-align: center;
}
.qx_cont {
  padding: 1rem 0 !important;
}
.shadow .cont img {
  width: 3rem;
  height: 3rem;
}
.shadow_btn {
  font-size: 0.3rem;
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
</style>