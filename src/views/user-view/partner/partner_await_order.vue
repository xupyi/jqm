<template>
  <div>
    <div class="order_detail">
      <p v-if="status==1">在处理订单</p>
      <p v-if="status==3">已确认订单</p>
      <p v-if="status==4">已结算订单</p>
      <div v-if="order_list==''">暂没有订单~</div>
      <ul v-else>
        <li v-for="(item, index) in order_list" :key="index">
          <div class="order_number">订单号：{{item.one_order_number}}</div>
          <div class="order_time">订单时间：{{item.created_at}}</div>
          <div class="order_des">
            <img :src="item.gpics" alt />
            <div>
              <p>{{item.manufactor_name}} {{item.show_title}}</p>
              <p v-if="item.subject_info.color">颜色/分类：{{item.subject_info.color}}</p>
              <p v-if="item.subject_info.size">尺寸：{{item.subject_info.size}}</p>
              <p v-if="item.subject_info.caizhi">材质：{{item.subject_info.caizhi}}</p>
              <p>
                <span>￥{{item.price}}</span>
                x {{item.num}}
              </p>
            </div>
          </div>
          <div class="more">
            <p v-if="status!=1" @click="btn_tap(item.one_order_number,index)">顾客评价</p>
            <!-- <p @click="btn_tap(item.one_order_number,index)">顾客资料</p> -->
            <p @click="order_des_tap(item.one_order_number)">订单详情</p>
          </div>
          <div class="tk" v-if="item.staff_order_status==8">退款成功：-￥{{22}}</div>
          <div class="order_status">
            交易状态：{{item.staff_order_status | help}}
            <span v-if="item.staff_order_status==8">退款成功</span>
          </div>
          <div class="order_bot">
            <div>
              1件佣金：
              <span>￥{{item.partner_share_money}}</span>
            </div>
            <div>
              1件服务费：
              <span>￥{{item.service_price==null?'0.00':item.service_price}}</span>
            </div>
            <div class="source">
              <div>
                顾客来源：
                <p v-if="item.salesman_user_id==0">非业务员</p>
                <p v-else>{{item.salesman_info.nickname}}</p>
              </div>
              <p v-if="item.salesman_user_id!=0" @click="partner(item.salesman_user_id)">业务员资料</p>
            </div>
            <div class="total">
              <p>
                共
                <span>{{item.num}}</span> 件商品
              </p>
              <p>
                服务费和佣金合计：
                <span>￥{{item.num |total(item.partner_share_money,item.service_price)}}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import request from "@/request";
import utils from "@/utils";
export default {
  data() {
    return {
      order_list: "",
      status: "",
      propel_msg: {},
      name: ""
    };
  },
  created() {
    this.$store.state.title_name = "城市合伙人个人中心";
    this.status = this.$route.query.status;
    this.get_data();
  },
  filters: {
    total(num,sever,yong) {
      var t = 0;
      var a= utils.jia2(sever,yong)
      t+=utils.accMul(num,a)
      // for (let index = 0; index < this.order_list.length; index++) {
      //   total += Number(this.order_list[index].partner_share_money);
      // }
      return t;
    },
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
    partner(id){
      this.$router.push({path:'/personal/salesman_info',query:{id:id}})
    },
    // 订单详情
    order_des_tap(id) {
      this.$router.push({
        path: "/personal/one_order_detail",
        query: { id: id }
      });
      // if (this.order_list[index].quantity_room_info) {
      //   window.sessionStorage.setItem(
      //     "gkzl_data",
      //     JSON.stringify(this.order_list[index].quantity_room_info)
      //   );
      //   this.$router.push("/personal/gkzl");
      // }
    },
    // 获取订单列表
    get_data() {
      this.$store.commit("show_looding");
      request({
        url: "/api/order/getPartnerOrder",
        data: {
          status: this.$route.query.status
        },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.order_list = data.data.data;
        }
        this.$store.commit("hide_looding");
      });
    }
  }
};
</script>
<style scoped>
.order_des1 img {
  width: 1.8rem;
  height: 1.8rem;
}
.order_des1 {
  display: flex;
  align-items: center;
}
.order_detail {
  font-size: 0.28rem;
}

.order_detail ul li {
  margin-bottom: 0.2rem;
  background: white;
}
.order_detail ul {
  background: #b7dee8;
}

.order_detail > p {
  font-weight: bold;
  text-align: center;
  padding: 0.2rem;
  font-size: 0.36rem;
  border-bottom: 1px solid #7f7f7f;
}
.order_detail > div {
  padding: 0.2rem;
  font-size: 0.32rem;
  color: #000;
  text-align: center;
}
.order_detail ul > p {
  background: white;
  padding: 0.2rem;

  font-size: 0.32rem;
  text-align: right;
}
.order_detail ul > p span {
  color: #ff1284;
}
.order_number {
  padding: 0.2rem;
  background: #fdeef3;
}
.order_time {
  background: #fee4f1;
  padding: 0.2rem;
}

.order_des {
  padding: 0.2rem;
  line-height: 0.5rem;
  font-size: 0.26rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.order_des span {
  font-size: 0.32rem;
  margin-right: 0.2rem;
  color: #ff1284;
}
.order_des > img {
  margin-right: 0.2rem;
  width: 2.2rem;
  height: 2.2rem;
}
.jg span {
  color: #ff1284;
  margin-right: 0.1rem;
}
.order_total {
  border-top: 1px solid #7f7f7f;
  padding: 0.2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.order_total p span:last-child {
  font-size: 0.34rem;
  color: #ff1284 !important;
}
.order_status {
  padding: 0.2rem;
  font-size: 0.28rem;
  border-top: 1px solid #7f7f7f;
}
.order_status span {
  color: red;
  margin-left: 0.5rem;
}
.more {
  border-top: 1px solid #7f7f7f;
  padding: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.more p {
  margin-left: 0.15rem;
  text-align: center;
  padding: 0.05rem 0.1rem;
  color: #ff1284;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
}
.tk {
  color: red;
}
.order_bot > div {
  border-top: 1px solid #7f7f7f;
  padding: 0.2rem;
}
.order_bot div span {
  color: red;
}
.source {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.source div {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.source > p {
  color: #ff1284;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
  padding: 0.05rem 0.15rem;
}
.total {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.total p {
  margin-left: 0.3rem;
}
.total span {
  color: #ff1284;
}
</style>