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
      <section class="link">
        <router-link
          :to="{path:'/personal/add_address',query:{ path:this.$route.path,transaction:val.transaction}}"
        >新增收货地址</router-link>
        <router-link
          :to="{path:'/personal/address',query:{ path:this.$route.path,transaction:val.transaction}}"
        >选择收货地址</router-link>
      </section>
      <section class="order_goods">
        <ul v-if="type_is==1" class="shop_ul">
          <li v-for="(items, index) in data_detail" :key="index">
            <p>{{items.manufactor_name}}</p>
            <div v-for="(item, index) in items.goods_list" :key="index">
              <img :src="item.gpics" alt />
              <div>
                <p>
                  <span>{{item.show_title}}</span>
                </p>
                <p>
                  颜色/分类：
                  <span>{{item.subject_info.color}}</span>
                </p>
                <p>
                  尺寸：
                  <span>{{item.subject_info.size}}</span>
                </p>
                <p>
                  材质：
                  <span>{{item.subject_info.caizhi}}</span>
                </p>
                <p class="last_p">
                  <span>￥{{item.price}}</span>
                  <span>x {{item.num}}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
        <ul v-else class="other_cont">
          <li v-for="(item, index) in data_detail" :key="index">
            <!-- <p>{{item.manufactor_name}}</p> -->
            <div class="lin_cont">
              <div class="goods_l">
                <img :src="item.gpics[0]" alt />
                <div>
                  <p>
                    {{item.title}}每平方米单价
                    <span>{{item.price}}</span>元
                  </p>
                  <p v-if="type_is==3||type_is==4">
                    待{{item.title}}房屋面积
                    <span>{{item.area}}</span>平方米
                  </p>
                  <p v-if="type_is==2">
                    {{item.title}}房屋面积
                    <span>{{item.area}}</span>平方米
                  </p>
                  <!-- <p>
                  <span>￥{{item.total_sum}}</span>
                  </p>-->
                </div>
              </div>
              <div class="goods_r" v-if="type_is==2||type_is==4">
                <p @click="taocan_true_tap(index)">展开选项</p>
              </div>
            </div>
            <div class="taocan_true" v-if="taocan_true===index">
              <p>项目内容：{{item.user_choice_show_title}}</p>
              <div>
                <p v-for="(i_img, index) in item.user_choice_show_image" :key="index">
                  <img @click="big_img(i_img)" :src="i_img" alt />
                </p>
              </div>
            </div>
          </li>
        </ul>
        <div class="heji">
          <p>
            共
            <span>{{num}}</span>件商品
          </p>
          <p>
            合计：
            <span>￥{{total}}</span>
          </p>
        </div>
      </section>
      <section class="liuyan">
        <div>留言：</div>
        <textarea name id v-model="val.leaving_message" cols="30" rows="10"></textarea>
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
        <p>支付方式：</p>
        <ul>
          <li @click="pay_type1(2)">
            <div>
              <img src="../assets/Wechat.png" alt />
              <span>微信</span>
            </div>
            <img :src="val.pay_type==2?active:nomore" alt />
          </li>
          <p>
            *如您使用支付宝或者银联付款，请至PC端金秋梦装饰商城进行支付！
          </p>
          <!-- <li @click="pay_type1(1)">
            <div>
              <img src="../assets/zhifubao.png" alt />
              <span>支付宝</span>
            </div>
            <img :src="val.pay_type==1?active:nomore" alt />
          </li>
          <li @click="pay_type1(3)">
            <div>
              <img src="../assets/yinlian.png" alt />
              <span>银联</span>
            </div>
            <img :src="val.pay_type==3?active:nomore" alt />
          </li>-->
        </ul>
        <div class="btn">
          <button @click="btn_tap">确认并支付</button>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import header_ from "../views/back_header";
import request from "@/request";
import utils from "@/utils";
export default {
  components: { header_ },
  data() {
    return {
      taocan_true: "",
      num: "",
      total: "",
      no_invoice_total: "",
      type_is: "",
      address: "",
      data_detail: [],
      order_info: {},
      invoice_tax_point: "",
      active: require("../assets/home_img/dui.png"),
      nomore: require("../assets/home_img/yuan.png"),
      val: {
        car_ids: "", //	是	string	购物车id,多个,号分割
        pay_type: "2",
        address_id: "",
        request_type: "h5",
        is_invoice: "",
        invoice_id: "",
        leaving_message: "",
        return_url: "http://www.baidu.com"
      },
      is_wechat: "",
      invoice_list: [],
      is_invoice: ""
    };
  },
  created() {
    console.log(this.$route);
    this.val.car_ids = this.$route.query.cart_ids;
    this.is_wechat = this.$store.state.is_wechat;
    this.type_is = this.$route.query.order_type;
    this.$store.commit("show_looding");
    request({
      url: "/api/cart/getCarListInfo",
      data: {
        cart_ids: this.$route.query.cart_ids,
        order_type: this.$route.query.order_type
      },
      method: "post"
    }).then(data => {
      this.$store.commit("hide_looding");
      console.log(data.data);
      if (data.data.status == 200) {
        this.data_detail = data.data.data;
        this.invoice_tax_point = data.data.invoice_tax_point;
        var n = 0,
          p = 0;
        if (this.$route.query.order_type == 1) {
          for (let index = 0; index < data.data.data.length; index++) {
            const element = data.data.data[index];
            for (let i = 0; i < element.goods_list.length; i++) {
              const item = element.goods_list[i];
              p += utils.jia1(item.total_sum);
              n++;
            }
          }
        } else {
          for (let i = 0; i < data.data.data.length; i++) {
            const item = data.data.data[i];
            p += utils.jia1(item.total_sum);
            n++;
          }
        }
        this.num = n;
        this.no_invoice_total = this.total = p;
      } else {
        this.$toast(data.data.msg);
      }
    });
    // 获取收货地址
    const address_Id = sessionStorage.getItem("address");
    request({
      url: "/api/getUserAddressList",
      method: "post"
    }).then(data => {
      console.log(data.data);
      for (let index = 0; index < data.data.data.length; index++) {
        if (data.data.data[index].id == address_Id) {
          this.address = data.data.data[index];
          this.val.address_id = data.data.data[index].id;
          return;
        }
        if (data.data.data[index].default == 1) {
          this.address = data.data.data[index];
          this.val.address_id = data.data.data[index].id;
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
    // 图片放大
    big_img(url) {
      this.$store.state.amplify_img = url;
    },
    taocan_true_tap(index) {
      // 展开选项
      // 套餐详情
      this.taocan_true = this.taocan_true === index ? "" : index;
    },
    // 选择发票
    invoice_1(i, index) {
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
    // 支付方式
    pay_type1(i) {
      this.val.pay_type = i;
    },
    // 是否需要发票
    active_tap(i) {
      this.val.is_invoice = i;
      for (let f = 0; f < this.invoice_list.length; f++) {
        if (this.invoice_list[f].is_default == 1) {
          this.val.invoice_id = this.invoice_list[f].id;
        }
      }
      if (i == 1) {
        var p = utils.accMul(Number(this.invoice_tax_point) / 100, this.total);
        console.log(p);
        this.total += utils.jia1(p);
      } else {
        this.total = this.no_invoice_total;
        this.val.invoice_id = "";
      }
    },
    btn_tap() {
      console.log(this.val);
      if (this.val.address_id == "") {
        this.$toast("请选择收货地址！");
      } else if (this.val.is_invoice == 1 && this.val.invoice_id == "") {
        this.$toast("请选择发票地址！");
      } else if (this.val.pay_type == "") {
        this.$toast("请选择支付方式！");
      } else {
        request({
          url: "/api/order/addOrderPay",
          data: this.val,
          method: "post"
        }).then(data => {
          if (data.data.status == 200) {
            console.log(data.data.data);
            console.log("====================");

            // if (this.is_wechat) {
              window.location.href = data.data.data.billQRCode;
            // } else {
              // window.location.href = data.data.data.billQRCode;
            // }
            // this.$toast(data.data.data.pay_info);
            // this.initList(data.data.data.orderid);
          } else {
            this.$toast(data.data.msg);
          }
        });
      }
    },
    // 轮询查询
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
            console.log(data);
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
  background: #a7d6e3;
}
.settle > h3 {
  font-weight: bold;
  background: white;
  font-size: 0.36rem;
  text-align: center;
  padding: 0.2rem 0;
}
section {
  background: white;
  margin-bottom: 0.2rem;
}

.address_info {
  border-top: 1px solid #7f7f7f;
  border-bottom: 1px solid #7f7f7f;
  padding: 0.2rem 0.3rem;
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
  font-size: 0.26rem;
}

.address {
  border-left: 1px solid #000;
  padding-left: 0.3rem;
  color: #000;
  word-wrap: break-word;
  max-width: 6rem;
  line-height: 0.4rem;
}
.address p {
  font-size: 0.28rem;
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
/* ++++++++++设计 施工 套餐+展开+++++++++++++ */

.lin_cont {
  padding: 0.2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.lin_cont img {
  margin-right: 0.2rem;
  width: 1.6rem;
  height: 1.6rem;
}
.goods_l {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.goods_r {
  color: #ff1284;
}
.taocan_true {
  text-align: left;
  display: flex;
  flex-direction: column;
}
.taocan_true div {
  margin-top: 0.1rem;
}
.taocan_true div p {
  font-size: 0;
  display: inline-block;
  width: 1.3rem;
  height: 1rem;
  margin: 0 0.1rem 0.1rem 0;
}
.taocan_true div p img {
  width: 100%;
  height: 100%;
}
.taocan_true div img:nth-child(5n) {
  margin-right: 0;
}
/* -------------------商品-设计-施工------------------- */
.order_goods > p {
  padding: 0.2rem 0.3rem;
}
.order_num {
  background: #fbeff3;
}
.order_time {
  background: #fbe1ec;
}
.order_goods li {
  padding: 0 0.3rem;
  border-bottom: 5px solid #7f7f7f;
}
.shop_ul li > p {
  padding: 0.2rem 0;
  border-bottom: 1px solid #7f7f7f;
}
.order_goods li:last-child {
  border: none;
}
.shop_ul li > div {
  padding: 0.2rem 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #7f7f7f;
}
.shop_ul li > div:last-child {
  border-bottom: 0;
}
.shop_ul li > div > img {
  width: 1.8rem;
  height: 1.8rem;
}
.shop_ul li > div > div {
  line-height: 0.45rem;
  font-size: 0.26rem;
  margin-left: 0.2rem;
}
.last_p span {
  margin-right: 0.2rem;
}
.last_p span:first-child {
  color: #ff1284;
}
/* +-------------- */
.liuyan {
  padding: 0.1rem 0.3rem;
}
.liuyan textarea {
  font-size: 0.28rem;
  padding: 0.1rem;
  margin-top: 0.1rem;
  width: 100%;
  border-radius: 0.1rem;
  height: 1.5rem;
}
/* -------------------------------------- */
.pay_type > p {
  padding: 0.2rem 0.3rem 0;
}
.pay_type ul {
  padding: 0.2rem 0.3rem;
  border-bottom: 1px solid #7f7f7f;
}

.pay_type li {
  margin-bottom: 0.2rem;
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
  border-top: 1px solid #7f7f7f;
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
  font-weight: bold;
  font-size: 0.3rem;
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
  padding: 0.5rem 0.2rem 0.4rem;
}
.pay_type ul p{
  color: red;
  font-size: 0.24rem;
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