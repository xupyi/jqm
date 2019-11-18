<template>
  <div>
    <div class="order_detail">
      <p v-if="status==1">待施工订单</p>
      <p v-if="status==2">在施工订单</p>
      <p v-if="status==3">已确认订单</p>
      <p v-if="status==4">已结算订单</p>
      <div v-if="order_list==''">暂没有订单~</div>
      <ul v-else>
        <li v-for="(item, index) in order_list" :key="index">
          <section class="order_number">订单号：{{item.one_order_number}}</section>
          <section class="order_time">订单时间：{{item.created_at}}</section>
          <section class="order_des">
            <div>
              <span>施工费：</span>
              <span>￥{{item.total_sum}}</span>
            </div>
            <p>
              <span>施工长：</span>
              <span>{{item.constructor_user_info.nickname}}</span>
            </p>
            <p>
              <span>施工长手机号：</span>
              <span>{{item.constructor_user_info.mobile}}</span>
            </p>
            <p>
              <span>每平米施工费用：</span>
              <span>{{item.price}}元</span>
            </p>
            <p>
              <span>房屋面积：</span>
              <span>{{item.area}}平方米</span>
            </p>
            <p>
              <span>房屋地址：</span>
              <span>{{item.room_address_detail}}</span>
            </p>
            <p>
              <span>业主：</span>
              <span>{{item.quantity_room_info.surname}}{{item.quantity_room_info.name}}</span>
            </p>
            <p>
              <span>业主电话：</span>
              <span>{{item.quantity_room_info.mobile}}</span>
            </p>
            <p>
              <span>希望完工日期：</span>
              <span>{{item.quantity_room_info.renovation_end_year}}</span> 年
              <span>{{item.quantity_room_info.renovation_end_month>9?item.quantity_room_info.renovation_end_month:'0'+item.quantity_room_info.renovation_end_month}}</span> 月
            </p>
            <div class="order_status">交易状态：{{item.staff_order_status | help}}</div>
            <div class="sheji">
              <div class="xq">
                <p v-if="status==3||status==4" @click="gk_assess(item.one_order_number,index)">顾客评价</p>
                <p
                  v-if="status==2||status==3||status==4"
                  @click="link(item.one_order_number,status)"
                >隐蔽工程图</p>
                <p @click="btn_tap(item.quantity_room_info.yingzhuang_url)">硬装全景</p>
                <p v-if="status==1" @click="agree(item.one_order_number,index)">同意接单</p>
                <p v-if="status==1" @click="propel_des_tap(item.one_order_number)">订单详情</p>
                <p
                  v-if="status==2||status==3||status==4"
                  @click="run_work(item.one_order_number,status)"
                >用工管理</p>
              </div>
            </div>
            <div class="order_total">
              <p>
                <span>第{{item.stage_number}}期施工费合计：</span>
                <span>￥{{item.total_sum}}</span>
              </p>
            </div>
          </section>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import request from "@/request";
export default {
  data() {
    return {
      order_list: [],
      type: "",
      status: "",
      propel_msg: {},
      one_order_number: "",
      name: ""
    };
  },
  created() {
    this.$store.state.title_name = "施工长订单";
    this.$store.commit("show_looding");
    this.type = this.$route.query.order_type;
    this.status = this.$route.query.status;

    request({
      url: "/api/order/getOrder",
      data: {
        status: this.$route.query.status,
        order_type: 3
      },
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.data.status == 200) {
        console.log(1111111111);
        this.order_list = data.data.data;
      }
      this.$store.commit("hide_looding");
    });
  },
  computed: {
    yj_total() {
      var total = 0;
      for (let index = 0; index < this.order_list.length; index++) {
        total += Number(this.order_list[index].partner_share_money);
      }
      console.log(total);
      return total;
    }
  },
  filters: {
    help(val, type) {
      if (val == 1) {
        return "待接单";
      } else if (val == 2) {
        return "正在施工";
      } else if (val == 3) {
        return "已确认";
      } else if (val == 4) {
        return "已结算";
      } else return "";
    }
  },
  methods: {
    // 顾客评价
    gk_assess(id, index) {
      this.$router.push({ path: "cinstructor_aassess", query: { id: id,type:3 } });
    },
    // 用工管理、
    run_work(id, status) {
      this.$router.push({ path: "run_work", query: { id: id } });
    },
    // 确认接单
    agree(id, index) {
      request({
        url: "/api/order/constructionConfirmReceipt",
        method: "post",
        data: {
          one_order_number: id
        }
      }).then(data => {
        if (data.data.status == 200) {
          this.$toast("已确认接单");
          this.order_list.splice(index, 1);
        } else {
          console.log(data.data);
        }
      });
    },
    propel_des_tap(id) {
      this.$router.push({
        path: "/order_detail",
        query: { id: id, type: 3 }
      });
    },
    link(id) {
      this.$router.push({ path: "/personal/yinbi", query: { id: id } });
    },
    btn_tap(url) {
      if (url == "" || url == null) {
        this.$toast("暂未上传硬装全景");
      } else {
        window.location.href = url;
      }
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
  border-top: 1px solid #7f7f7f;
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
  font-size: 0.26rem;
  padding: 0.1rem 0.2rem 0;
  line-height: 0.5rem;
}
.order_des div span:last-child {
  color: #ff428d;
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
  padding: 0.2rem 0;
  margin-top: 0.1rem;
  font-size: 0.3rem;
  border-top: 1px solid #7f7f7f;
}
/* ----------------------------------- */
.sheji {
  border-top: 1px solid #7f7f7f;
  padding: 0.2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.sheji .xq {
  display: flex;
  justify-content: flex-end;
}
.sheji p {
  margin-left: 0.15rem;
  text-align: center;
  padding: 0.05rem 0.1rem;
  color: #ff1284;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
}
.sheji p:first-child {
  margin-left: 0;
}
.up_img {
  border: 1px solid #7f7f7f;
  border-radius: 0.1rem;
  color: #ff1284;
  margin: 0.1rem 0;
  width: 2rem;
  height: 1.5rem;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.up_img img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.up_3d {
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
}
.up_3d input {
  flex: 1;
  border-bottom: 1px solid #7f7f7f !important;
  padding: 0 0.1rem;
}
.up_img input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  top: 0;
  left: 0;
}
.van-dialog__content p {
  line-height: 0.5rem;
  padding: 0.2rem 0.3rem;
}
</style>