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
            <div class="order_cont">
              <p>
                <span>施工长：</span>
                <span>{{item.constructor_user_info.nickname}}</span>
              </p>
              <p>
                <span>施工长手机号：</span>
                <span>{{item.constructor_user_info.mobile}}</span>
              </p>
              <p>
                <span>房屋面积：</span>
                <span>{{item.room_area}}平方米</span>
              </p>
              <p>
                <span>房屋地址：</span>
                <span>{{item.city_address_datail}}</span>
              </p>
            </div>
            <div class="order_status">交易状态：{{item.staff_order_status | help(type)}}</div>
            <div class="order_more">
              <span @click="btn_tap(item.quantity_room_info.yingzhuang_url)">硬装全景</span>
            </div>
            <div class="order_cb">
              承包费用：
              <span>￥{{item.order_workers_info.construction_money}}</span>
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
        pic_url: "",
        pic_3d_url: "",
        one_order_number: "",
        name: ""
      };
    },
    created() {
      if ((this.$route.query.user_type == "plumber_and_electrician")) {
        this.$store.state.title_name = "水电工订单";
      } else if ((this.$route.query.user_type == "oil_worker")) {
        this.$store.state.title_name = "油工订单";
      } else if ((this.$route.query.user_type == "carpentry")) {
        this.$store.state.title_name = "木工订单";
      } else if ((this.$route.query.user_type == "bricklayer")) {
        this.$store.state.title_name = "瓦工订单";
      } else if ((this.$route.query.user_type == "coolie_worker")) {
        this.$store.state.title_name = "小工订单";
      }
      this.$store.commit("show_looding");
      this.type = this.$route.query.order_type;
      this.status = this.$route.query.status;

      request({
        url: "/api/order/getOrder",
        data: {
          user_type_code: this.$route.query.user_type,
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
          return "正在施工";
        } else if (val == 2) {
          return "待确认";
        } else if (val == 3) {
          return "已确认";
        } else if (val == 4) {
          return "已结算";
        } else return "";
      }
    },
    methods: {
      propel_des_tap(index) {
        if (this.order_list[index].quantity_room_info) {
          window.sessionStorage.setItem(
            "gkzl_data",
            JSON.stringify(this.order_list[index].quantity_room_info)
          );
          this.$router.push("/personal/gkzl");
        }
      },
      design_url(e) {
        console.log(e);
        var formData = new FormData();
        formData.append("file", e.target.files[0]);
        this.$store.commit("show_looding");
        request({
          url: "/api/upload",
          method: "post",
          data: formData
        }).then(res => {
          this.$store.commit("hide_looding");
          console.log(res.data);
          if (res.data.status == 200) {
            this.pic_url = res.data.data[0];
          }
        });
      },
      // 全景
      btn_tap(url) {
        if (url && url != '') {
          window.location.href = url
        } else {
          this.$toast("暂未上传硬装全景");
        }
      }
    }
  };

</script>
<style scoped>
  .order_detail {
    font-size: 0.3rem;
  }

  .order_detail ul li {
    margin-bottom: 0.2rem;
    background: white;
  }

  .order_detail ul {
    background: #b7dee8;
  }

  .order_detail>p {
    font-weight: bold;
    text-align: center;
    padding: 0.2rem;
    font-size: 0.36rem;
  }

  .order_detail>div {
    padding: 0.2rem;
    font-size: 0.3rem;
    color: #000;
    text-align: center;
  }

  .order_detail ul>p {
    background: white;
    padding: 0.2rem;
    border-top: 1px solid #7f7f7f;
    font-size: 0.3rem;
    text-align: right;
  }

  .order_detail ul>p span {
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
    font-size: 0.28rem;
    padding: 0 0.2rem;
    line-height: 0.5rem;
  }

  .order_cont {
    padding: 0.2rem 0;
  }

  .order_total {
    margin-top: 0.1rem;
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
    font-size: 0.3rem;
    border-top: 1px solid #7f7f7f;
    border-bottom: 1px solid #7f7f7f;
  }

  .order_total1 {
    border-top: 1px solid #7f7f7f;
    border-bottom: 1px solid #7f7f7f;
    padding: 0.2rem 0;
  }

  .order_total1 span:last-child {
    color: #ff1284 !important;
  }

  /* ----------------------------------- */
  .order_more {
    padding: 0.2rem 0;
    font-size: 0.28rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .order_more a {
    margin-left: 0.2rem;
    color: #ff428d;
    padding: 0.05rem 0.1rem;
    border-radius: 0.1rem;
    border: 1px solid #ff428d;
  }

  .order_more span {
    margin-left: 0.2rem;
    color: #ff428d;
    padding: 0.05rem 0.1rem;
    border-radius: 0.1rem;
    border: 1px solid #ff428d;
  }

  .order_cb {
    border-top: 1px solid #7f7f7f;
    padding: 0.2rem 0;
    text-align: right;
  }

  .order_cb span {
    color: #ff428d;
  }

</style>
