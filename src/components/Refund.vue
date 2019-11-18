<template>
  <div>
    <header_ />
    <div class="refund">
      <p>申请退款</p>
      <div>
        <span>退款原因：</span>
        <textarea v-model="val.refund_content" cols="30" rows="3" placeholder="请输入退款原因~"></textarea>
      </div>
      <div>
        <span>退款金额：</span>
        <input v-model="val.refund_price" type="number" :placeholder="'请输入退款金额,最多'+price+'元'" />
      </div>
      <div v-if="is">
        <span>退货快递/物流：</span>
        <select name id v-model="val.logistics_code">
          <option value>请选择</option>
          <option
            :value="Object.keys(item)[0]"
            v-for="(item, index) in wuliu_list"
            :key="index"
          >{{Object.values(item)[0]}}</option>
        </select>
      </div>
      <div v-if="is">
        <span>快递/物流单号：</span>
        <input type="number" v-model="val.refund_logistics" placeholder="快递/物流单号！" />
      </div>
      <div class="btn" @click="btn">提交</div>
    </div>
  </div>
</template>
<script>
import request from "@/request";
import header_ from "../views/back_header.vue";
export default {
  components: { header_ },
  data() {
    return {
      is: false,
      val: {
        one_order_number: "", //	是	string	订单号标示
        refund_content: "", //	是	string	退款原因
        refund_logistics: "", //	是	string	退货物流
        logistics_code: "", //	是	string	物流编码, 从获取物流编码中获取得到
        refund_price: "" //
      },
      wuliu_list: [],
      price: ""
    };
  },
  created() {
    this.is = this.$route.query.is ? true : false;
    this.val.one_order_number = this.$route.query.id;
    this.price = this.$route.query.price;
    request({
      url: "/api/order/getWuliuList",
      method: "post"
    }).then(data => {
      console.log(data.data);
      if (data.data.status == 200) {
        for (var i in data.data.data) {
          var o = {};
          o[i] = data.data.data[i];
          this.wuliu_list.push(o);
        }
      }
    });
  },
  methods: {
    btn() {
      console.log(this.val);
      if (this.val.refund_price == "") {
        this.$toast("请输入退款金额！");
      } else if (this.price < this.val.refund_price) {
        this.$toast("退款金额不能大于订单金额！");
      } else {
        if (this.is) {
          if (this.val.logistics_code == "") {
            this.$toast("请选择退货快递/物流！");
            return
          } else if (this.val.refund_logistics == "") {
            this.$toast("请填写快递/物流单号！");
            return
          }
        }
        request({
          url: "/api/order/addGoodsRefund",
          data: this.val,
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            this.$toast("退款申请提交成功！");
            this.$router.go(-1);
          } else {
            this.$toast(data.data.msg);
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.refund {
  position: fixed;
  left: 0;
  right: 0;
  top: 0.9rem;
  bottom: 1.05rem;
  overflow-y: auto;
  padding: 0 0.2rem;
}

.refund > p {
  text-align: center;
  font-size: 0.36rem;
  margin-top: 0.4rem;
}

.refund > div {
  margin-top: 0.3rem;
  font-size: 0.3rem;
  display: flex;
  flex-direction: row;
}

.refund span {
  line-height: 0.7rem;
}

.refund textarea {
  border: 1px solid #a0a0a0;
  border-radius: 0.05rem;
  flex: 1;
  padding: 0.1rem;
}

.refund input {
  padding: 0 0.1rem;
  border: 1px solid #a0a0a0;
  border-radius: 0.1rem;
  flex: 1;
}

.btn {
  background: #ff1284;
  font-size: 0.36rem !important;
  color: white;
  height: 0.9rem;
  line-height: 0.9rem;
  justify-content: center;
  margin: 1rem auto 0 !important;
  width: 90%;
  border-radius: 0.1rem;
}
</style>