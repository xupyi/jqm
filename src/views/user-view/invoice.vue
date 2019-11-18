<template>
  <div id="invoice">
    <h3>我的发票</h3>
    <div class="nav1">
      <span @click="nav_tap(1)" :class="nav_index==1?'fir':''">已开发票</span>
      <span @click="nav_tap(2)" :class="nav_index==2?'fir':''">开票信息</span>
    </div>
    <section v-if="nav_index==1">
      <p v-if="yikai_list==''" class="wu">暂无发票</p>
      <ul v-else class="one_invoice">
        <li v-for="(item, index) in yikai_list" :key="index">
          <p>开票日期：{{item.invoice_time}}</p>
          <p>订单日期：{{item.order_time}}</p>
          <p>订单号码：{{item.one_order_number}}</p>
          <p>开票金额：￥{{Number(item.invoice_price).toFixed(2)}}</p>
          <p>发票类型：{{item.invoice_type==0?'普通发票':'专用发票'}}</p>
          <p class="ttin">发票抬头：{{item.invoice_name}}</p>
          <div>
            <span @click="order_de(item.one_order_number)">订单详情</span>
            <span @click="fujian(item.invoice_pic)">发票附件</span>
          </div>
        </li>
      </ul>
    </section>
    <section v-if="nav_index==2">
      <ul class="yi_invoice">
        <li v-for="(item, index) in invoice_list" :key="index">
          <div class="top">
            <p>{{item.invoice_name}}</p>
            <span>{{item.invoice_object==0?'个人':'企业'}}</span>
          </div>
          <div>
            <p class="yi_left" @click="moren_tap(item.id)">
              <img :src="moren_index===item.id?active:nomore" alt />
              <span>设为默认抬头</span>
            </p>
            <div class="caozuo">
              <p @click="xiugai_tap(item.id)">
                <img src="../../assets/xg_.png" alt />
                <span>修改</span>
              </p>
              <p @click="del_invoice_tap(index,item.id)">
                <img src="../../assets/sc_.png" alt />
                <span>删除</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div class="btn" @click="add_tap">
        <img src="../../assets/tianjia-yin.png" alt />
        <span>添加开票信息</span>
      </div>
    </section>
  </div>
</template>
<script>
import request from "@/request";
export default {
  data() {
    return {
      nav_index: 1,
      active: require("../../assets/home_img/dui.png"),
      nomore: require("../../assets/home_img/yuan.png"),
      invoice_list: [],
      moren_index: "",
      yikai_list: [],
    };
  },
  created() {
    if (sessionStorage.getItem("invoice")) {
      this.nav_index = sessionStorage.getItem("invoice");
      this.get_data(sessionStorage.getItem("invoice"));
    }
    this.get_data(1);
  },
  methods: {
    order_de(id) {
      if (id) {
        this.$router.push({ path: "/shop_order_detail", query: { id: id } });
      }else{
        this.$toast("没有订单id");
      }
    },
    // 发票附件
    fujian(invoice_pic) {
      if (invoice_pic == "") {
        this.$toast("暂未发票信息！");
      } else {
        this.$store.state.amplify_img= invoice_pic;
      }
    },
    nav_tap(i) {
      this.nav_index = i;
      this.get_data(i);
      sessionStorage.setItem("invoice", i);
    },
    moren_tap(i) {
      request({
        url: "/api/UserInvoice/setDefault",
        data: { id: i },
        method: "post"
      }).then(data => {
        this.moren_index = i;
        this.$toast("设置成功！");
      });
    },
    del_invoice_tap(index, id) {
      request({
        url: "/api/UserInvoice/del",
        data: { id: id },
        method: "post"
      }).then(data => {
        if (data.data.status == 200) {
          this.$toast("删除成功！");
          this.invoice_list.splice(index, 1);
        }
        this.$store.commit("hide_looding");
      });
    },
    xiugai_tap(id) {
      this.$router.push({ path: "add_invoice", query: { id: id } });
    },
    add_tap() {
      this.$router.push("add_invoice");
    },
    get_data(i) {
      this.$store.commit("show_looding");
      request({
        url: "/api/getList",
        data: { status: i },
        method: "post"
      }).then(data => {
        if (data.data.status == 200) {
          console.log(data);
          if (i === 1) {
            this.yikai_list = data.data.data;
            for (let index = 0; index < data.data.data.length; index++) {
              if (data.data.data[index].is_default == 1) {
                this.moren_index = data.data.data[index].id;
              }
            }
          } else {
            this.invoice_list = data.data.data;
          }
        } else {
          console.log(data);
          this.$toast(data.data.msg);
        }
        this.$store.commit("hide_looding");
      });
    }
  }
};
</script>
<style scoped>
.fir {
  background: #2fc145;
  color: white;
}
#invoice {
  background: #F2F2F2;
}
#invoice h3 {
  background: white;
  font-weight: bold;
  font-size: 0.36rem;
  text-align: center;
  padding: 0.2rem 0;
  margin: 0;
}
#invoice .nav1 {
  background: white;
  overflow: hidden;
  padding: 0.2rem;
}
#invoice .nav1 span {
  float: left;
  margin-right: 0.2rem;
  border: 1px solid #00cc00;
  padding: 0.05rem 0.2rem;
  border-radius: 0.1rem;
  font-size: 0.3rem;
}
.yi_invoice {
  font-size: 0.3rem;
}
.yi_invoice li {
  background: white;
  margin-top: 0.2rem;
}
.top {
  border-bottom: 0.3px solid #999999;
}
.yi_invoice li .top span {
  color: #000;
}
.yi_invoice li>div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 0.2rem;
}
#invoice nav div {
  font-size: 0.3rem;
  padding: 0.1rem 0.2rem;
  border-radius: 0.1rem;
  border: 1px solid #2fc145;
}
.del {
  padding: 0.1rem;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
  color: #ff1284;
}
.btn img {
  margin-right: 0.1rem;
  width: 0.5rem;
  height: 0.5rem;
}
#invoice .btn {
  font-size: 0.3rem;
  text-align: center;
  margin: 0.6rem;
  background: #ff1284;
  color: white;
  padding: 0.1rem;
  border-radius: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.caozuo{
  
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.caozuo p {
  color: #ff1284;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 0.2rem;
}
.caozuo p img {
  
  width: 0.3rem;
  height: 0.31rem;
  margin-right: 0.02rem;
}
.yi_left{
  display: flex;
  align-items: center;
  
}
.yi_left img {
  margin-right: .05rem;
  width: 0.33rem;
  height: 0.33rem;
}

.wu {
  margin-top: 0.2rem;
  padding: 0.2rem;
  font-size: 0.3rem;
  text-align: center;
  background: white;
}
.one_invoice {
  border-top: 1px solid #7f7f7f;
  font-size: 0.26rem;
}
.one_invoice li {
  border-bottom: 0.15rem solid #7f7f7f;
  line-height: 0.5rem;
  padding: 0.2rem 0.4rem;
  background: white;
}
.one_invoice li > p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.one_invoice div {
  display: flex;
  justify-content: space-around;
  padding: 0.2rem 0.5rem;
}
.one_invoice span {
  line-height: normal;
  font-size: 0.3rem;
  display: inline-block;
  padding: 0.05rem 0.2rem;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
}
/* +++++++++++++++++++++++++++++++++= */
.big_img {
  border: 1px solid #ccc;
  background: white;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.view {
  position: fixed;
  top: 0.9rem;
  left: 0;
  right: 0;
  bottom: 1rem;
  background: white;
}

.view .x_img {
  position: absolute;
  width: 0.4rem;
  height: 0.4rem;
  right: 0.2rem;
  top: 0.2rem;
}

.order p {
  color: #fd2691;
}
.ttin{
  white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
}
</style>