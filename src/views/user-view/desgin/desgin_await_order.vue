<template>
  <div>
    <div class="order_detail">
      <p v-if="status==1">待设计订单</p>
      <p v-if="status==2">待确认订单</p>
      <p v-if="status==3">已确认订单</p>
      <p v-if="status==4">已结算订单</p>
      <div v-if="order_list==''">暂没有订单~</div>
      <ul v-else>
        <li v-for="(item, index) in order_list" :key="index">
          <section class="order_number">订单号：{{item.one_order_number}}</section>
          <section class="order_time">订单时间：{{item.created_at}}</section>
          <section class="order_des">
            <div>
              <span>设计费：</span>
              <span>￥{{item.total_sum}}</span>
            </div>
            <p>
              <span>设计师：</span>
              <span>{{item.design_user_info.nickname}}</span>
            </p>
            <p>
              <span>设计师手机号：</span>
              <span>{{item.design_user_info.mobile}}</span>
            </p>
            <p>
              <span>每平米设计费用：</span>
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
            <div class="order_status">交易状态：{{item.staff_order_status | help}}</div>
            <div class="sheji">
              <p v-if="status==3||status==4" @click="de_assess(item.one_order_number)">顾客评价</p>
              <p @click="btn_tap(item.one_order_number,index,1)">硬装全景</p>
              <p @click="btn_tap(item.one_order_number,index,2)">精装全景</p>
              <p @click="propel_des_tap(item.one_order_number)">订单详情</p>
            </div>
            <div class="order_total">
              <p>
                <span>设计费合计：</span>
                <span>￥{{item.total_sum}}</span>
              </p>
            </div>
          </section>
        </li>
      </ul>
    </div>
    <div class="shadow" v-if="shadow">
      <div>
        <div class="sha_title">
          <span v-if="shadow_is==1">上传硬装全景图</span>
          <span v-if="shadow_is==2">上传精装全景图</span>
          <img @click="x_tap" src="../../../assets/home_img/x_1.png" alt />
        </div>
        <div class="up_add">
          <p>链接地址：</p>
          <input type="text" v-model="pic_3d_url" placeholder="请输入3D链接地址" />
        </div>
        <div class="add_btn">
          <p @click="tj_tap()" class="add">确认添加</p>
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
      order_list: [],
      status: "",
      propel_msg: {},
      name: "",
      shadow: false,
      pic_3d_url: "",
      url_img: "",
      shadow_is: "",
      one_order_number: ""
    };
  },
  created() {
     this.$store.state.title_name ="设计师订单";
    this.status = this.$route.query.status;
    this.get_data(this.$route.query.status);
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
    help(val) {
      if (val == 1) {
        return "正在设计";
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
    // 顾客评价
    de_assess(id) {
      this.$router.push({path:'cinstructor_aassess',query:{id:id,type:4}})
    },
    // 关闭弹窗
    x_tap() {
      this.shadow = false;
      this.pic_3d_url = this.one_order_number = "";
    },
    // 顾客资料
    propel_des_tap(id) {
      this.$router.push({
        path: "/order_detail",
        query: { id: id, type: 4 }
      });
    },
    // 弹窗
    btn_tap(id, house_i, i) {
      this.shadow = true;
      this.one_order_number = id;
      this.shadow_is = i;
    },
    // 提交3d链接
    tj_tap() {
      var re = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
      if (!re.test(this.pic_3d_url)) {
        this.$toast("请填写正确的3D链接地址");
      } else {
        if (this.shadow_is == 1) {
          var val = {
            one_order_number: this.one_order_number,
            yingzhuang_url: this.pic_3d_url
          };
        }
        if (this.shadow_is == 2) {
          var val = {
            one_order_number: this.one_order_number,
            jingzhuang_url: this.pic_3d_url
          };
        }
        console.log(val);
        request({
          url: "/api/order/upload_design_chart",
          method: "post",
          data: val
        }).then(data => {
          if (data.data.status == 200) {
            this.$toast("上传成功");
            this.shadow=false
            this.get_data(this.status);
          } else {
            console.log(data.data);
          }
        });
      }
    },
    get_data(status) {
      console.log(status);
      this.$store.commit("show_looding");
      request({
        url: "/api/order/getOrder",
        data: {
          status: status,
          order_type: 4,
          user_type_code:'desginer',
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
  font-size: 0.3rem;
}

.order_detail ul li {
  border-top: 1px solid #7f7f7f;
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
  padding: 0.1rem 0.2rem 0;
  line-height: 0.5rem;
  font-size: 0.26rem;
}
.order_des div span:last-child {
  color: #ff1284;
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
.sheji {
  border-top: 1px solid #7f7f7f;
  padding: 0.2rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.sheji p {
  margin-left: 0.15rem;
  text-align: center;
  padding: 0.05rem 0.15rem;
  color: #ff1284;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
}
/* ----------------------------------- */
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(34, 34, 34, 0.37);
}
.shadow > div {
  font-size: 0.3rem;
  background: white;
  margin: 3rem auto;
  width: 5rem;
  border-radius: 0.1rem;
  overflow: hidden;
}
.sha_title {
  text-align: center;
  background: #ff1284;
  margin-bottom: 0.2rem;
  padding: 0.15rem;
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sha_title img {
  position: absolute;
  right: 0.2rem;
  width: 0.3rem;
  height: 0.3rem;
}
.up_add {
  padding: 0.1rem 0.2rem;
}
.up_add input {
  margin-top: 0.2rem;
  width: 100%;
  border-bottom: 1px solid #808080;
}

.add_btn {
  text-align: center;
  padding: 0.2rem;
}
.add {
  color: #fff;
  background: #ff1284;
  border-radius: 0.1rem;
  display: inline-block;
  padding: 0.1rem 0.4rem;
}
</style>