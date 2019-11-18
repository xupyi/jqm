<template>
  <div>
    <p class="condition" v-if="order_list==''">您还没有相关的订单哦~</p>
    <ul v-else>
      <li v-for="(item, index) in order_list" :key="index">
        <div class="order_number">
          <p>订单号：{{item.one_order_number}}</p>
          <span @click="customer_service(item.customer_wx_qrcode,item.customer_name)">联系客服</span>
        </div>
        <div class="order_time">订单时间：{{item.created_at}}</div>
        <div class="one_good">
          <div class="order_des">
            <div>
              <h5 v-if="type==4">设计费：</h5>
              <h5 v-if="type==3">施工费：</h5>
              <h5 v-if="type==2">{{item.title}}：</h5>
              <span>￥{{item.total_sum}}</span>
            </div>
            <div v-if="type==2">
              <h5>{{item.title}}每平米价格：</h5>
              <span>{{item.price}}</span>
            </div>
            <div>
              <h5 v-if="type==4">设计师：</h5>
              <h5 v-if="type==3">施工长：</h5>
              <p v-if="type==4">{{item.design_user_info.nickname}}</p>
              <p v-if="type==3">{{item.constructor_user_info.nickname}}</p>
            </div>
            <div>
              <h5 v-if="type==4">设计师手机号：</h5>
              <h5 v-if="type==3||type==2">施工长手机号：</h5>
              <p v-if="type==4">{{item.design_user_info.mobile}}</p>
              <p v-if="type==3||type==2">{{item.constructor_user_info.mobile}}</p>
            </div>
            <div>
              <h5 v-if="type==4">每平米设计费：</h5>
              <h5 v-if="type==3">每平米施工费：</h5>
              <p v-if="type==4||type==3">{{item.price}}</p>
            </div>
            <div>
              <h5>房屋面积：</h5>
              <p>{{item.area}}平方米</p>
            </div>
            <div>
              <h5>房屋地址：</h5>
              <p>{{item.room_address_detail}}</p>
            </div>
          </div>
          <div class="tkcg" v-if="item.goods_status==8">退款成功：-￥{{item.refund_price}}</div>
          <div class="order_status">
            交易状态：{{item.goods_status | help(type)}}
            <span v-if="item.goods_status==8">退款成功</span>
          </div>
          <div class="order_more">
            <span v-if="item.goods_status==0" @click="settle_tap(item.id)">立即付款</span>
            <span v-if="item.goods_status==0" @click="qx_order_tap(item.one_order_number,index)">取消订单</span>
            <!-- <router-link
              v-if="items.is_invoice==1&&items.invoice_pic!==''"
              :to="{ path: '/look_invoice', query: { url: items.invoice_pic}}"
            >查看发票</router-link>-->
            <span v-if="item.goods_status==5||item.goods_status==6||item.goods_status==8||item.goods_status==9||item.goods_status==10||
            item.goods_status==11" @click="del_tap(item.one_order_number,index)">删除订单</span>
            <span v-if="item.goods_status==2" @click="pj__tap(item.one_order_number)">确认并评价</span>
            <a :href="item.quantity_room_info.jingzhuang_url" v-if="item.goods_status==2">精装全景</a>
            <span v-if="item.goods_status==1" @click="tk_show(item.one_order_number,item.total_sum)">申请退款</span>
            <router-link :to="{path: '/order_assess',query: { id: item.one_order_number}}"
              v-if="item.goods_status==6&&item.is_thirty_evaluate==0">追加评论</router-link>
            <router-link :to="{path: '/order_assess',query: { id: item.one_order_number}}"
              v-if="item.goods_status==3&&item.is_thirty_evaluate==0">待评价</router-link>
            <!-- 订单详情 -->
            <router-link :to="{path:'/order_detail',query:{id:item.one_order_number,type:type}}">订单详情</router-link>
          </div>
        </div>
        <div class="order_total" v-if="type==4">
          设计费合计：
          <span>￥{{item.total_sum}}</span>
        </div>
        <div class="order_total" v-if="type==3">
          第{{item.stage_number}}期施工费合计：
          <span>￥{{item.total_sum}}</span>
        </div>
        <div class="order_total" v-if="type==2">
          第{{item.stage_number}}期套餐费合计：
          <span>￥{{item.total_sum}}</span>
        </div>
      </li>
    </ul>
    <div v-if="is_shadow" class="shadow" @touchmove.prevent>
      <div>
        <p class="head">
          {{name}}
          <img @click="customer_service" src="../../assets/home_img/x_1.png" alt />
        </p>
        <div class="cont">
          <img :src="customer_wx_qrcode" alt="图片加载失败" />
          <p>长按上面的二维码，关注客服微信号</p>
        </div>
      </div>
    </div>
    <div class="shadow" v-if="qx_shadow" @touchmove.prevent>
      <div>
        <div class="cont qx_cont">
          <p>您确定要取消该订单吗？</p>
        </div>
        <div class="shadow_btn">
          <span @click="qx_order_tap">取消</span>
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
    <div class="shadow" v-if="pj_shadow" @touchmove.prevent>
      <div>
        <div class="cont qx_cont">
          <p v-if="type==4">请确认设计已完成</p>
          <p v-else>请确认施工已完成</p>
          <p>点击确定后订单完成</p>
        </div>
        <div class="shadow_btn">
          <span @click="no_show">取消</span>
          <div class="shadow_btn_line"></div>
          <span @click="pj_shop_tap">确定</span>
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
        i: "",
        order_list: [],
        is_show: false,
        is_shadow: false,
        qx_shadow: false,
        tk_shadow: false,
        del_shadow1: false,
        pj_shadow: false,
        one_order_number: "",
        price: "",
        name: "",
        customer_wx_qrcode: "",
        type: ""
      };
    },
    created() {
      this.type = this.$route.query.type;
      this.get_data(this.$route.query.type);
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
    watch: {
      $route(to, from) {
        console.log(to);
        this.order_list = [];
        this.get_data(to.query.type);
        this.type = to.query.type;
      }
    },
    filters: {
      help(val, type) {
        if (val == 0) {
          return "等待支付";
        } else if (val == 1 && type == 4) {
          return "正在设计";
        } else if (val == 1) {
          return "正在施工";
        } else if (val == 2) {
          return "等待确认";
        } else if (val == 3) {
          return "交易完成";
        } else if (val == 4) {
          return "退款中";
        } else if (val == 5) {
          return "退货成功";
        } else if (val == 6) {
          return "评价完成";
        } else if (val == 7) {
          return "拒绝退货";
        } else if (val == 8) {
          return "退款完成";
        } else if (val == 9) {
          return "关闭订单";
        } else if (val == 10) {
          return "用户主动关闭";
        } else if (val == 11) {
          return "追评完成";
        } else return "";
      }
    },
    methods: {
      // 评？价
      assess_tap(id) {
        if (this.type == 2) {
          this.$router.push({
            path: "/tc_assess",
            query: {
              id: id,
              is: 0
            }
          });
        } else {
          this.$router.push();
        }
      },
      // 追评
      append_assess_tap(id) {
        if (this.type == 2) {
          this.$router.push({
            path: "/tc_assess",
            query: {
              id: id,
              is: 0
            }
          });
        } else {
          this.$router.push({
            path: "/order_assess",
            query: {
              id: id
            }
          });
        }
      },
      //   图片放大
      big_pic(url) {
        this.$store.state.amplify_img = url;
      },
      confirm() {
        // 评价
        this.tk_shadow = false;
        this.$router.push({
          path: "/refund",
          query: {
            id: this.one_order_number,
            price: this.price
          }
        });
      },
      tk_show(id, price) {
        this.tk_shadow = true;
        this.price = price;
        this.one_order_number = id;
      },
      qx_order_tap(id, index) {
        this.qx_shadow = !this.qx_shadow;
        this.one_order_number = id;
      },
      // 关闭客服
      x_tap() {
        this.is_shadow = false;
      },
      // 联系客服
      customer_service(code, name) {
        this.name = name;
        this.customer_wx_qrcode = code;
        this.is_shadow = !this.is_shadow;
      },
      // 立即支付
      settle_tap(id) {
        request({
          url: "/api/order/getOnePayParameter",
          data: {
            id: id,
            request_type: 'pc'
          },
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.data.status == 200) {
            window.location.href = data.data.data.billQRCode;
          }
        });
      },
      no_show() {
        this.del_shadow1 = false;
        this.tk_shadow = false;
        this.pj_shadow = false;
        this.price = "";
        this.one_order_number = "";
      },
      pj__tap(id) {
        this.one_order_number = id ? id : "";
        this.pj_shadow = true;
      },
      // 确认收货
      pj_shop_tap() {
        request({
          url: "/api/order/ConfirmReceipt",
          data: {
            one_order_number: this.one_order_number
          },
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.data.status == 200) {
            this.$toast("已确认收货");
            this.pj_shadow = false;
            // 设计评价

            this.$router.push({
              path: "/order_assess",
              query: {
                id: this.one_order_number,
                order_type: 4
              }
            });
            // 施工评价
            this.$router.push({
              path: "/order_assess",
              query: {
                id: this.one_order_number,
                order_type: 3
              }
            });
          }
        });
      },
      // 获取订单列表
      get_data(val) {
        this.$store.commit("show_looding");
        request({
          url: "/api/order/UserOrderList",
          data: {
            order_type: val
          },
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.data.status == 200) {
            this.order_list = data.data.data;
          }
          this.$store.commit("hide_looding");
        });
      },
      // 取消订单
      quxiao() {
        this.$store.commit("show_looding");
        request({
          url: "/api/order/cancelOrder",
          data: {
            one_order_number: this.one_order_number
          },
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.data.status == 200) {
            this.get_data(this.type);
            this.$toast("订单已取消");
            this.qx_shadow = false;
          }
          this.$store.commit("hide_looding");
        });
      },
      del_tap(id, index) {
        this.one_order_number = id;
        this.del_shadow1 = true;
      },
      del_qd_tap() {
        request({
          url: "/api/order/deleteUserOrder",
          data: {
            one_order_number: this.one_order_number
          },
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.data.status == 200) {
            this.$toast("订单已删除");
            this.get_data(this.type);
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
    margin-top: 1rem;
    font-size: 0.26rem;
    color: #000;
  }

  .order_number span {
    padding: 0.1rem 0.2rem;
    border: 1px solid #ff3399;
    border-radius: 0.1rem;
    color: #ff3399;
  }

  ul li {
    margin-bottom: 0.2rem;
    background: white;
  }

  ul {
    background: #a7d6e3;
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

  .order_number a {
    line-height: normal;
    padding: 0.1rem 0.2rem;
    border: 1px solid #ff428d;
    border-radius: 0.1rem;
    color: #ff428d;
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
    margin: 0 0.2rem;
    padding: 0.1rem 0;
    font-size: 0.26rem;
  }

  .order_des div {
    line-height: 0.6rem;
    display: flex;
    flex-direction: row;
  }

  .order_des h5 {
    font-size: 0.26rem;
    white-space: nowrap;
  }

  .order_des span {
    color: #ff428d;
  }

  /* --------------- */
  .order_total {
    padding: 0.2rem;
    text-align: right;
    border-top: 0.5px solid #808080;
    font-size: 0.26rem;
  }

  .order_total span {
    color: #ff428d;
    font-size: 0.3rem;
  }

  .tkcg {
    border-top: 1px solid #808080;
    color: red;
    padding: 0.2rem;
    font-size: 0.28rem;
  }

  .order_status {
    padding: 0.2rem;
    font-size: 0.3rem;
    border-top: 0.5px solid #808080;
    border-bottom: 0.5px solid #808080;
  }

  .order_status span {
    color: red;
    margin-left: 0.4rem;
  }

  .order_more {
    margin: 0 0.2rem;
    font-size: 0.28rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .order_more a {
    margin: 0.1rem 0 0.1rem 0.15rem;
    color: #ff428d;
    padding: 0.1rem 0.15rem;
    border-radius: 0.1rem;
    border: 1px solid #ff428d;
  }

  .order_more span {
    margin: 0.1rem 0 0.1rem 0.15rem;
    color: #ff428d;
    padding: 0.1rem 0.15rem;
    border-radius: 0.1rem;
    border: 1px solid #ff428d;
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

  .shadow>div {
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
    line-height: 0.5rem;
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
