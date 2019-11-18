<template>
  <div class="run_work">
    <p>用工管理</p>
    <div class="tj">
      添加：
      <span v-for="(item, index) in run" :key="index" @click="run_tap(item.type)">{{item.name}}</span>
    </div>
    <div class="div_ul">
      <div class="div_li" v-for="(item, index) in data_lists" :key="index">
        <p>工种：{{item.user_type_code |help}}</p>
        <p>地区：{{item.user_address.province_name}} {{item.user_address.city_name}} {{item.user_address.district_name}}</p>
        <p>姓名：{{item.xing}}{{item.name}}</p>
        <p>电话：{{item.mobile}}</p>
        <div>
          承包费用：
          <p>
            ￥
            <input type="number" v-model="item.construction_money" @blur="chang($event)" />
          </p>
        </div>
        <div class="assess">
          评价：
          <div>
            <p @click="ul_true(index)">{{item.evaluate_value |help1}}</p>
            <ul v-if="item.is_true">
              <li @click="assess(1,index)">好评</li>
              <li @click="assess(2,index)">中评</li>
              <li @click="assess(3,index)">差评</li>
            </ul>
          </div>
        </div>
        <div class="border">
          费用结算：
          <span @click="settle_tap(item.worker_id, item.evaluate_value)">确认结算</span>
        </div>
        <div class="border">
          操作：
          <span @click="is_del(item.worker_id,index)">删除</span>
        </div>
      </div>
    </div>
    <footer>
      <p>
        合计：
        <span>￥{{total}}</span>
      </p>
      <div @click="btn_tap" class="btn">确定提交</div>
    </footer>
    <div class="shadow" v-if="is_shadow">
      <div>
        <div class="shadow_title">
          <span>警报提示</span>
          <img @click="gb" src="../../../assets/home_img/x_1.png" alt />
        </div>
        <div class="shadow_cont">
          <span>工长您好！</span>
          <p>您输入的施工费用超过预算，无法正常提交，请您仔细确认各项承包费用再提交。</p>
          <p>如果预算过低请您与总部施工总监联系。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/request";
import utils from "@/utils";
export default {
  data() {
    return {
      is_shadow: false,
      total: "0.00",
      run: [
        { name: "水电工", type: "plumber_and_electrician" },
        { name: "瓦工", type: "bricklayer" },
        { name: "木工", type: "carpentry" },
        { name: "油工", type: "oil_worker" },
        { name: "小工", type: "coolie_worker" }
      ],
      data_lists: [],
    };
  },
  created() {
    // this.$store.state.title_name = "施工长个人中心";
    request({
      url: "/api/order/getOrderWorker",
      data: { one_order_number: this.$route.query.id },
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.data.status == 200) {
        for (let index = 0; index < data.data.data.length; index++) {
          data.data.data[index].is_true = false;
        }
        this.data_lists = data.data.data;
      }
      this.$store.commit("hide_looding");
    });
  },
  filters: {
    help(val) {
      if (val == "plumber_and_electrician") {
        return "水电工";
      } else if (val == "bricklayer") {
        return "瓦工";
      } else if (val == "carpentry") {
        return "木工";
      } else if (val == "oil_worker") {
        return "油工";
      } else if (val == "coolie_worker") {
        return "小工";
      }
    },
    help1(val) {
      if (val == 0) {
        return "未评价";
      } else if (val == 1) {
        return "好评";
      } else if (val == 2) {
        return "中评";
      } else if (val == 3) {
        return "差评";
      }
    }
  },
  methods: {
    //   关闭弹窗
    gb() {
      this.is_shadow = false;
    },
    //   input失去焦点计算价格
    chang(e) {
      // console.log
      this.get_total();
    },
    // 总价
    get_total() {
      var a = 0;
      for (let index = 0; index < this.data_lists.length; index++) {
        const element = this.data_lists[index];
        if (element.construction_money != "") {
          a += utils.jia1(element.construction_money);
        }
      }
      this.total = a.toFixed(2);
    },
    //   结算
    settle_tap(worker_id, evaluate_value) {
      if (evaluate_value == 0) {
        this.$toast("请先评价");
        return;
      }
      request({
        url: "/api/order/evaluateUser",
        data: {
          worker_id: worker_id,
          evaluate_value: evaluate_value
        },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.$toast("结算完成");
        } else {
          this.$toast(data.data.msg);
        }
        this.$store.commit("hide_looding");
      });
    },
    //   删除小工
    is_del(worker_id, index) {
      request({
        url: "/api/order/delOrderWorker",
        data: {
          worker_id: worker_id
        },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.data_lists.splice(index, 1);
        }
        this.$store.commit("hide_looding");
      });
    },
    //   展开选项
    ul_true(index) {
      this.data_lists[index].is_true = !this.data_lists[index].is_true;
    },
    //   评价
    assess(i, index) {
      this.data_lists[index].evaluate_value = i;
      this.data_lists[index].is_true = false;
    },
    //   添加小工
    run_tap(type) {
      this.$router.push({
        path: "/personal/run_xiaogong",
        query: { name: type, order_id: this.$route.query.id }
      });
    },
    btn_tap() {
      var arr = [];
      for (let index = 0; index < this.data_lists.length; index++) {
        const element = this.data_lists[index];
        let val = {
          worker_id: element.worker_id,
          construction_money: element.construction_money,
          is_settlement: element.is_settlement,
          evaluate_value: element.evaluate_value
        };
        arr.push(val);
      }
      console.log(arr);
      //   return;
      request({
        url: "/api/order/saveMultipleOrderWorkers",
        data: {
          one_order_number: this.$route.query.id,
          data: arr
        },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.$toast("提交成功");
          this.$router.go(-1);
        } else if (data.data.status == 400) {
          this.is_shadow = true;
        } else {
          this.$toast(data.data.msg);
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
  font-size: 0.32rem;
  text-align: center;
  padding: 0.2rem;
  font-weight: bold;
  border-bottom: 1px solid #808080;
}

.tj {
  border-bottom: 1px solid #808080;
  
  padding: 0.2rem;
}
.tj span {
  margin-right: 0.1rem;
  padding: 0.05rem 0.15rem;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
  display: inline-block;
}
.div_ul {
  padding-bottom: 0.8rem;
}
.div_li {
  padding: 0.2rem;
  line-height: 0.5rem;
  font-size: 0.26rem;
  border-bottom: 1px solid #808080;
}
.div_li:last-child {
  border-bottom: 0;
}
.div_li > div {
  padding: 0.1rem 0;
}
.border span {
  border: 1px solid #ff1284;
  color: #ff1284;
  border-radius: 0.1rem;
  padding: 0.03rem 0.2rem;
}
input {
  width: 1.5rem;
}
.div_li div p {
  padding: 0 0.1rem;
  display: inline-block;
  border: 1px solid #808080;
}
.assess {
  display: flex;
  flex-direction: row;
}
.assess div {
  position: relative;
}
.assess div p {
  border: 1px solid #808080;
  width: 1.5rem;
  text-align: center;
}
ul {
  text-align: center;
  position: absolute;
  background: white;
  width: 100%;
  border: 1px solid #808080;
}
ul li {
  border-bottom: 1px solid #808080;
  background: #eddbcc;
}
ul li:last-child {
  border-bottom: 0;
}
footer {
  border-top: 1px solid #808080;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f2f2f2;
}
footer p {
  margin-left: 0.2rem;
}
footer p span {
  color: red;
}
footer .btn {
  background: #ff1284;
  padding: 0.2rem 0.4rem;
  color: white;
}
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0000006b;
}
.shadow > div {
  background: white;
  width: 6rem;
  border-radius: 5px;
  overflow: hidden;
  margin: 3rem auto;
}
.shadow_title {
  padding: 0.2rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff1284;
  color: white;
}
.shadow_title img {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  right: 0.3rem;
}
.shadow_cont {
    font-size: 0.28rem;
  padding: 0.3rem;
}
.shadow_cont span{
    font-weight: bold;
}
.shadow_cont p{
    margin-top: 0.3rem;
}
</style>