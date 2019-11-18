<template>
  <div class="invoice">
    <p v-if="this.$route.query.id">修改开票信息</p>
    <p v-else>添加开票信息</p>
    <section>
      <span>开票对象：</span>
      <div class="invoice_obj">
        <p @click="invoice_object(0)">
          <img :src="val.invoice_object===0?active:nomore" alt />
          <span>个人</span>
        </p>
        <p @click="invoice_object(1)">
          <img :src="val.invoice_object==1?active:nomore" alt />
          <span>企业</span>
        </p>
      </div>
    </section>
    <section class="invoice_type" v-if="val.invoice_object==1">
      <span>开票类型：</span>
      <div>
        <p @click="invoice_type(0)">
          <img :src="val.invoice_type===0?active:nomore" alt />
          <span>增值普通发票</span>
        </p>
        <p @click="invoice_type(1)">
          <img :src="val.invoice_type==1?active:nomore" alt />
          <span>增值税专用发票</span>
        </p>
      </div>
    </section>
    <section>
      <span>发票抬头：</span>
      <input type="text" v-model="val.invoice_name" />
    </section>
    <section v-if="val.invoice_object==1">
      <span>公司税号：</span>
      <input type="text" v-model="val.tax_number" />
    </section>
    <section v-if="val.invoice_type==1">
      <span>公司地址：</span>
      <textarea name id cols="30" rows="4" v-model="val.company_address"></textarea>
    </section>

    <section v-if="val.invoice_type==1">
      <span>公司电话：</span>
      <input type="number" v-model="val.tel" />
    </section>
    <section v-if="val.invoice_type==1">
      <span>开户银行：</span>
      <input type="text" v-model="val.corporation_deposit_bank" />
    </section>

    <section v-if="val.invoice_type==1">
      <span>银行账号：</span>
      <input type="number" v-model="val.bank_account" />
    </section>
    <section>
      <span>收票地址：</span>
      <textarea name id cols="30" rows="4" v-model="val.address"></textarea>
    </section>
    <div v-if="this.$route.query.id" class="btn" @click="btn_tap">确认修改</div>
    <div v-else class="btn" @click="btn_tap">提交</div>
  </div>
</template>

<script>
import request from "@/request";
export default {
  data() {
    return {
      active: require("../../assets/home_img/dui.png"),
      nomore: require("../../assets/home_img/yuan.png"),
      val: {
        company_address: "", //公司地址
        invoice_object: 0, //	是	int	0 个人 1 企业
        invoice_type: 0, //	是	int	0 普通发票 1 专用发票
        invoice_name: "", //	是	string	发票抬头
        tax_number: "", //r	是	string	公司税号
        address: "", //	是	string	收票地址
        tel: "", //	否	string	公司电话号码
        corporation_deposit_bank: "", //	否	string	开户银行
        bank_account: "" //
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      this.$store.commit("show_looding");
      request({
        url: "/api/getList",
        data: { status: 2 },
        method: "post"
      }).then(data => {
        if (data.data.status == 200) {
          console.log(data);
          for (let index = 0; index < data.data.data.length; index++) {
            if (data.data.data[index].id == this.$route.query.id) {
              this.val = data.data.data[index];
            }
          }
        } else {
          this.$toast(data.data.msg);
        }
        this.$store.commit("hide_looding");
      });
    }
  },
  methods: {
    invoice_object(i) {
      console.log(i);
      this.val.invoice_object = i;
    },
    invoice_type(i) {
      this.val.invoice_type = i;
    },
    btn_tap() {
      console.log(this.val);
      if (this.val.invoice_object == null) {
        this.$toast("请选择开票对象");
        return;
      }
      if (this.val.invoice_name == "") {
        this.$toast("请填写发票抬头！");
        return;
      }
      if (this.val.address == "") {
        this.$toast("请填写收票地址！");
        return;
      }
      if (this.val.invoice_type == null && this.invoice_object == 1) {
        this.$toast("请选择开票类型");
        return;
      }
      if (this.val.tax_number == "" && this.invoice_object == 1) {
        this.$toast("请填写公司税号！");
        return;
      }
      if (
        this.val.invoice_type == 1 &&
        this.val.corporation_deposit_bank == ""
      ) {
        this.$toast("请填写开户银行！");
      } else if (this.val.invoice_type == 1 && this.val.bank_account == "") {
        this.$toast("请填写银行账号！");
      }else if (this.val.invoice_type == 1 && this.val.tel == "") {
        this.$toast("请填写公司电话！");
      } else if (this.val.invoice_type == 1 && this.val.company_address == "") {
        this.$toast("请填写公司地址！");
      } else if (this.val.invoice_type == 1 && this.val.tax_number == "") {
        this.$toast("请填写公司税号！");
      } else {
        this.$store.commit("show_looding");
        request({
          url: "/api/saveInvoiceData",
          data: this.val,
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.data.status == 200) {
            this.$toast("保存成功");
            this.$router.go(-1);
          } else {
            this.$toast(data.data.msg);
          }
          this.$store.commit("hide_looding");
        });
      }
    }
  }
};
</script>
<style scope>
.invoice {
  font-size: 0.3rem;
}
.invoice > p {
  font-weight: bold;
  font-size: 0.36rem;
  text-align: center;
  padding: 0.2rem 0;
}
.invoice section {
  font-size: 0.26rem;
  padding: 0.2rem 0.3rem;
  display: flex;
  align-items: center;
  flex-direction: row;
}
.invoice_type {
  line-height: 0.6rem;
  padding: 0.1rem 0.2rem;
  display: flex;
  flex-direction: row;
}
.invoice_type img {
  margin-right: 0.1rem;
  width: 0.3rem;
  height: 0.3rem;
}
.invoice_type p {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.invoice_obj img {
  margin-right: 0.1rem;
  width: 0.3rem;
  height: 0.3rem;
}
.invoice_obj {
  display: flex;
  flex-direction: row;
}
.invoice_obj p {
  margin-right: 0.4rem;
  display: flex;
  align-items: center;
}
.invoice input {
  border: 0.5px solid #7f7f7f;
  border-radius: 0.1rem;
  padding: 0.1rem;
  flex: 1;
}
.invoice textarea {
  border: 0.5px solid #7f7f7f;
  border-radius: 0.1rem;
  padding: 0.1rem;
  flex: 1;
}
.btn {
  margin: 0.6rem 0.3rem;
  text-align: center;
  background: white;
  padding: 0.15rem;
  background: #ff1284;
  color: white;
  font-size: 0.32rem;
  border-radius: 0.1rem;
}
</style>