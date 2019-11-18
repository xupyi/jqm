<template>
  <div>
    <header_ />
    <div class="settle">
      <h3>结算支付</h3>
      <section class="address_info">
        <div>
          <p>
            <img src="../assets/dizhi.png" alt />
            <span>地址</span>
          </p>
          <div class="address" v-if="address!=''">
            <p>{{address.user_detail_info}}{{address.address}}</p>
            <p>
              {{address.consignee}}
              <span>{{address.mobile}}</span>
            </p>
          </div>
          <div v-else class="adre">暂无地址，请添加</div>
        </div>
      </section>
      <!-- <section class="link">
        <router-link
          :to="{path:'/personal/add_address',query:{ path:this.$route.path,transaction:val.one_order_number}}"
        >新增收货地址</router-link>
        <router-link
          :to="{path:'/personal/address',query:{ path:this.$route.path,transaction:val.one_order_number}}"
        >管理收货地址</router-link>
      </section> -->
      <section class="order_goods">
        <p class="order_num">订单号：{{val.one_order_number}}</p>
        <p class="order_time">订单时间：{{data_detail.created_at}}</p>
        <!-- !-- 品牌 -->
        <div v-if="data_detail.order_type==1" class="order_type1">
          <p>品牌</p>
          <div class="order_type1_content">
            <img :src="data_detail.gpics" alt />
            <div>
              <p class="title">{{data_detail.show_title}}</p>
              <p>
                材质：
                <span>{{data_detail.subject_info.caizhi}}</span>
              </p>
              <p>
                颜色/分类：
                <span>{{data_detail.subject_info.color}}</span>
              </p>
              <p>
                尺寸：
                <span>{{data_detail.subject_info.size}}</span>
              </p>
              <p>
                <span>￥{{data_detail.price}}</span>
                <span>x{{data_detail.num}}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 套餐 -->
        <div v-if="data_detail.order_type==2" class="order_type2">
          <p>
            <!-- <img src="../assets/icon/shop01.png" alt /> -->
            <span>{{data_detail.title}}</span>
          </p>
          <div class="order_type2_content">
            <!-- <img :src="data_detail.pics" alt /> -->
            <div>
              <div class="item_des">
                <div>
                  <p>
                    {{data_detail.title}}每平方米单价
                    <span>{{data_detail.price}}</span>元
                  </p>
                  <p>
                    待施工房屋面积
                    <span>{{data_detail.area}}</span>平方米
                  </p>
                  <p>
                    <span>￥{{data_detail.total_sum}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 施工和设计 -->
        <div v-if="data_detail.order_type==3||data_detail.order_type==4" class="order_type2">
          <p>
            <!-- <img v-if="data_detail.order_type==3" src="../assets/icon/shop02.png" alt />
            <img v-if="data_detail.order_type==4" src="../assets/icon/shop03.png" alt />-->
            <span>{{data_detail.title}}</span>
          </p>
          <div class="order_type2_content">
            <img :src="data_detail.pics" alt />
            <div>
              <p>
                {{data_detail.title}}每平方米单价
                <span>{{data_detail.price}}</span>元
              </p>
              <p>
                待{{data_detail.title}}房屋面积
                <span>{{data_detail.area}}</span>平方米
              </p>
              <p>
                <span>￥{{data_detail.total_sum}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="heji">
          <p>
            共
            <span>1</span>件商品
          </p>
          <p>
            合计：
            <span>￥{{data_detail.total_sum}}</span>
          </p>
        </div>
      </section>
      <section class="invoice">
        <div>
          <span>发票选择：</span>
          <p @click="active_tap(1)">
            <img :src="val.is_invoice===1?active:nomore" alt />
            <span>需要发票</span>
          </p>
          <p @click="active_tap(0)">
            <img :src="val.is_invoice===0?active:nomore" alt />
            <span>不要发票</span>
          </p>
        </div>
        <ul class="invoice_list" v-show="val.is_invoice===1">
          <li v-for="(item, index) in invoice_list" :key="index">
            <div>
              <span>发票抬头：</span>
              <span>{{item.invoice_name}}</span>
            </div>
            <div>
              <span>收票地址：</span>
              <span>{{item.address}}</span>
            </div>
            <div>
              <p @click="invoice_1(item.id,index)">
                <img :src="item.is_default===1?active:nomore" alt />
                <span>设为默认抬头</span>
              </p>
              <p @click="invoice_2">
                <img src="../assets/icon/add_ic.png" alt />
                <span>添加开票信息</span>
              </p>
              <p @click="invoice_3(item.id)">
                <img src="../assets/xg_.png" alt />
                <span>修改</span>
              </p>
            </div>
          </li>
        </ul>
      </section>
      <section class="pay_type">
        <p>支付方式</p>
        <ul>
          <li v-if="is_wechat">
            <div>
              <img src="../assets/Wechat.png" alt />
              <span>微信</span>
            </div>
            <img src="../assets/home_img/dui.png" alt />
          </li>
          <li v-else>
            <div>
              <img src="../assets/zhifubao.png" alt />
              <span>支付宝</span>
            </div>
            <img src="../assets/home_img/dui.png" alt />
          </li>
        </ul>
        <div class="btn">
          <button @click="btn_tap">提交订单</button>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import request from "@/request";
import header_ from "../views/back_header";
export default {
  components: { header_ },
  data() {
    return {
      active: require("../assets/home_img/dui.png"),
      nomore: require("../assets/home_img/yuan.png"),
      address: "",
      data_detail: {},
      is_wechat: "",
      val: {
        one_order_number: "",
        pay_type: "",
        address_id: "",
        request_type: "h5",
        is_invoice: 0,
        invoice_id: ""
      },
      invoice_list: []
    };
  },
  created() {
    var one_order_number = this.$route.query.transaction;
    this.val.one_order_number = one_order_number;
    this.is_wechat = this.$store.state.is_wechat;
    this.val.pay_type = this.$store.state.is_wechat ? 1 : 2;
    this.$store.commit("show_looding");
    request({
      url: "/api/order/getOneOrderDetailed",
      data: { one_order_number: one_order_number },
      method: "post"
    }).then(data => {
      this.$store.commit("hide_looding");
      console.log(data.data);
      this.data_detail = data.data.data;
    });
    // 获取收货地址
    var address = sessionStorage.getItem("address");
    sessionStorage.removeItem("address");
    request({
      url: "/api/getUserAddressList",
      method: "post"
    }).then(data => {
      console.log(data.data);
      for (let index = 0; index < data.data.data.length; index++) {
        if (data.data.data[index].id == address) {
          this.address = data.data.data[index];
          this.val.address_id = data.data.data[index].id;
          return
        } else if (data.data.data[index].default == 1) {
          this.address = data.data.data[index];
          this.val.address_id = data.data.data[index].id;
           return
        }
      }
    });
    // 获取发票列表
    request({
      url: "/api/getList",
      data: { status: 0 },
      method: "post"
    }).then(data => {
      console.log(data.data);
      if (data.data.status == 200) {
        this.invoice_list = data.data.data;
      }
    });
  },
  methods: {
    // 选择发票
    invoice_1(i, index) {
      this.val.invoice_id = i;
      request({
        url: "/api/UserInvoice/setDefault",
        data: { id: i },
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.val.invoice_id = i;
          for (let f = 0; f < this.invoice_list.length; f++) {
            this.invoice_list[f].is_default = 0;
          }
          this.invoice_list[index].is_default = 1;
        }
      });
    },
    // 添加发票信息
    invoice_2() {
      this.$router.push({ path: "/personal/add_invoice" });
    },
    // 修改
    invoice_3(id) {
      this.$router.push({ path: "/personal/add_invoice", query: { id: id } });
    },
    pay_type1(i) {
      this.val.pay_type = this.val.pay_type == "" ? i : "";
    },
    active_tap(i) {
      this.val.is_invoice = i;
    },
    btn_tap() {
      console.log(this.val);
      if (this.address_id == "") {
        this.$toast("请选择地址！");
      } else if (this.val.is_invoice == 1 && this.val.invoice_id == "") {
        this.$toast("请选择发票地址！");
      } else {
        request({
          url: "/api/order/PayOneOrder",
          data: this.val,
          method: "post"
        }).then(data => {
          console.log(data.data, this.is_wechat);
          if (data.data.status == 200) {
            console.log(data.data.data.Url);
            // if (this.is_wechat) {
            window.location.href = data.data.data.Url;
            // } else {
            //   window.location.href = data.data.data.url;
            // }
            this.initList(data.data.data.orderid);
          } else {
            this.$toast(data.data.msg);
          }
        });
      }
    }, // 轮询查询
    initList(orderid) {
      this.myInterval = window.setInterval(() => {
        setTimeout(() => {
          request({
            url: "/api/order/getOrderStatus",
            method: "post",
            data: {
              orderid: orderid
            }
          }).then(data => {
            console.log(data.data.msg);
            if (data.data.status == 200) {
              this.destroyed();
              this.$router.push("/order");
            } else {
            }
          });
        }, 1);
      }, 3000);
    },
    // 清除轮询
    destroyed() {
      clearInterval(this.myInterval);
    }
  },
  // 销毁前清空轮旋
  beforeDestroy() {
    this.destroyed();
  }
};
</script>
<style scoped>
.settle {
  font-size: 0.3rem;
  margin: 0.9rem 0 0;
  background: #eeeeee;
}
.settle > h3 {
  padding: 0.2rem;
  text-align: center;
  background: white;
  border-bottom: 1px solid #ccc;
  font-size: 0.32rem;
}
section {
  background: white;
  margin-bottom: 0.2rem;
}

section > p {
  border-bottom: 1px solid #eeeeee;
  padding: 0.2rem 0.3rem;
}

.address_info {
  border-bottom: 1px solid #ccc;
  padding: 0.3rem;
  margin: 0;
}

.address_info > div > p {
  padding-right: 0.3rem;
  display: flex;
  flex-direction: column;
}
.address_info div p span {
  white-space: nowrap;
}
.address_info div p img {
  margin: 0 auto;
  width: 0.43rem;
  height: 0.43rem;
}
.link {
  padding: 0.2rem;
  text-align: right;
}
.link a {
  color: #ff1284;
  font-size: 0.28rem;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
  margin-left: 0.2rem;
  padding: 0.05rem 0.15rem;
}
.address_info > div {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.address {
  border-left: 1px solid #d2d2d2;
  padding-left: 0.3rem;
  color: #000;
}

.address p {
  word-break: break-all;
}
.address p span {
  margin-left: 0.2rem;
}

.adre {
  width: 100%;
  text-align: center;
}

.adre a {
  color: #006be8;
}

/* ---------------------------------- */
.order_num {
  border: none;
  background: #fdeef3;
}
.order_time {
  border: none;
  background: #fee4f1;
}
.order_type1 {
  padding: 0.2rem 0.3rem;
}
.order_type2 {
  padding: 0.2rem 0.3rem;
}
.order_type1 > p {
  margin-bottom: 0.1rem;
  padding: 0.1rem 0;
  border-bottom: 1px solid #ccc;
}

.order_type1_content {
  font-size: 0.28rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.order_type1_content img {
  margin-right: 0.2rem;
  width: 1.5rem;
  height: 1.5rem;
}

.order_type1_content p span {
  margin-right: 0.2rem;
  color: #ff1284;
}

.select_img {
  width: 0.42rem;
  height: 0.42rem;
}

.order_type2 > p {
  padding: 0.1rem 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0.1rem;
  display: flex;
  align-items: center;
}

.order_type2 p img {
  margin-right: 0.1rem;
  width: 0.42rem;
  height: 0.42rem;
}

.order_type2_content {
  font-size: 0.28rem;
  display: flex;
  flex-direction: row;
}

.order_type2_content img {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.2rem;
}

.order_type2_content > div {
  line-height: 0.5rem;
}

.order_type2_content div p span {
  color: #ff1284;
}

/* -------------------------------------- */
.pay_type {
  padding-bottom: 0.4rem;
}
.pay_type > p {
  padding: 0.2rem 0.3rem;
}
.pay_type ul {
  padding: 0.2rem 0.3rem;
  border-bottom: 1px solid #ccc;
}

.pay_type li {
  margin-bottom: 0.1rem;
  font-size: 0.32rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pay_type li:last-child {
  margin-bottom: 0;
}

.pay_type li > img {
  box-sizing: content-box;
  padding: 0.1rem;
  width: 0.32rem;
  height: 0.32rem;
}

.pay_type li div {
  display: flex;
}

.pay_type li div img {
  margin-right: 0.2rem;
  width: 0.4rem;
  height: 0.4rem;
}

/* ----------------------------- */
.heji {
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: flex-end;
  padding: 0.2rem 0.3rem;
}
.heji p {
  margin-left: 0.4rem;
  padding: 0;
  border: none;
}
.heji span {
  color: #ff1284;
}
.invoice {
  padding: 0.2rem 0.3rem;
}
.invoice > div:first-child {
  display: flex;
  align-items: center;
}
.invoice > div:first-child p {
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
}
.invoice > div:first-child p span {
  margin-left: 0.2rem;
}
.invoice img {
  width: 0.35rem;
  height: 0.35rem;
}
.invoice_list li {
  border-top: 1px solid #7f7f7f;
  margin: 0.2rem 0;
  padding-top: 0.2rem;
}
.invoice_list li div {
  line-height: 0.5rem;
  display: flex;
  flex-direction: row;
}
.invoice_list li div > span:first-child {
  white-space: nowrap;
}
.invoice_list li div > span:last-child {
  color: #7f7f7f;
}
.invoice_list li div:last-child {
  color: #ff1284;
  justify-content: space-between;
}
.invoice_list li div p:first-child {
  color: #7f7f7f;
}
.invoice_list li p {
  display: flex;
  align-items: center;
}
.invoice_list li p span {
  margin-left: 0.056rem;
}
.btn {
  text-align: center;
  background: white;
  padding: 0.5rem 0.2rem 0;
}

button {
  font-size: 0.36rem;
  color: white;
  background: #ff1284;
  border-radius: 0.1rem;
  border: none;
  width: 90%;
  height: 0.8rem;
  line-height: 0.8rem;
}
</style>