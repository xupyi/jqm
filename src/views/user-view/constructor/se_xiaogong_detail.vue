<template>
  <div class="run_work">
    <p>{{title_name}}详细资料</p>
    <section>
      <div class="sec_1">
        <img :src="datas.avatar" alt />
        <div>
          <span @click="is_arrange" v-if="datas.is_arrange==0" class="anp">安排他</span>
          <span @click="is_yes" v-else class="no_anp">已安排</span>
          <p @click="yes_tap">确定</p>
        </div>
      </div>
      <div>工作城市：{{datas.province_name}}{{datas.city_name}}</div>
      <div>姓名：{{datas.xing}}{{datas.name}}</div>
      <div>性别：{{datas.gender==1?'男':'女'}}</div>
      <div>手机号：{{datas.mobile}}</div>
      <div>微信号：{{datas.weixin}}</div>
      <div>出生年月：{{datas.birth_year}}年{{datas.birth_month}}月</div>
      <div>擅长：{{datas.goods_types_detail?datas.goods_types_detail:"暂未选择擅长风格"}}</div>
    </section>
  </div>
</template>
<script>
import request from "@/request";
export default {
  data() {
    return {
      datas: {},
      title_name: ""
    };
  },
  created() {
    this.$store.state.title_name = "施工长个人中心";
    if (this.$route.query.name == "plumber_and_electrician") {
      this.title_name = "水电工";
    } else if (this.$route.query.name == "oil_worker") {
      this.title_name = "油工";
    } else if (this.$route.query.name == "carpentry") {
      this.title_name = "木工";
    } else if (this.$route.query.name == "bricklayer") {
      this.title_name = "瓦工";
    } else if (this.$route.query.name == "coolie_worker") {
      this.title_name = "小工";
    }
    this.get_data();
  },
  methods: {
    //   取消安排
    is_yes() {
      request({
        url: "/api/order/delOrderWorker",
        data: {
          worker_id: this.datas.worker_id
        },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.get_data();
        }
        this.$store.commit("hide_looding");
      });
    },
    //   安排
    is_arrange() {
      request({
        url: "/api/order/saveOrderWorkers",
        data: {
          user_type_code: this.$route.query.name,
          user_id: this.$route.query.id,
          one_order_number: this.$route.query.order_id
        },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.get_data();
        }
        this.$store.commit("hide_looding");
      });
    },
    yes_tap() {
      this.$router.go(-1);
    },
    get_data() {
      request({
        url: "/api/user/getSmallUserStaffInfo",
        data: {
          user_type: this.$route.query.name,
          user_id: this.$route.query.id,
          one_order_number: this.$route.query.order_id
        },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.datas = data.data.data;
        }
        this.$store.commit("hide_looding");
      });
    }
  }
};
</script>
<style scoped>
.run_work {
  font-size: 0.3rem;
}
.run_work > p {
  border-bottom: 1px solid #808080;
  font-size: 0.32rem;
  text-align: center;
  padding: 0.2rem;
  font-weight: bold;
}
section {
  padding: 0.2rem;
  line-height: 0.5rem;
}
.sec_1 {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.sec_1 img {
  padding: 0.55px;
  border: 0.55px solid #ccc;
  width: 2.6rem;
  height: 2.6rem;
}
.sec_1 div {
  font-weight: 600;
  margin-left: 0.3rem;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.sec_1 span {
  margin: 0.2rem 0;
  padding: 0.1rem 0.4rem;
  border-radius: 0.1rem;
}
.anp {
  color: #ff1284;
  border: 1px solid #ff1284;
}
.no_anp {
  background: #ff1284;
  background: #f2f2f2;
  border: 1px solid rgb(36, 36, 36);
}
.sec_1 p {
  border-radius: 0.1rem;
  color: white;
  margin: 0.2rem 0;
  padding: 0.1rem 0.4rem;
  background: #ff1284;
  border: 1px solid #ff1284;
}
</style>