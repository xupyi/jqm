<template>
  <div class="one_order_assess">
    <h4>用户评价</h4>
    <section class="order_number">订单号：{{datas.one_order_number}}</section>
    <section class="order_time">订单时间：{{datas.created_at}}</section>
    <section class="order_des">
      <div>
        <span>{{type==3?"施工":"设计"}}费：</span>
        <span>￥{{datas.total_sum}}</span>
      </div>
      <p>
        <span>{{type==3?"施工长：":"设计师："}}</span>
        <span>{{user_info.nickname}}</span>
      </p>
      <p>
        <span>{{type==3?"施工长":"设计师"}}手机号：</span>
        <span>{{user_info.mobile}}</span>
      </p>
      <p>
        <span>每平米{{type==3?"施工":"设计"}}费用：</span>
        <span>{{datas.price}}元</span>
      </p>
      <p>
        <span>房屋面积：</span>
        <span>{{datas.area}}平方米</span>
      </p>
      <p>
        <span>房屋地址：</span>
        <span>{{datas.room_address_detail}}</span>
      </p>
    </section>
    <section class="assess" v-if="evaluate==''||evaluate==null">暂无评价</section>
    <section v-else class="assess">
      <div>
        <p>评价内容：</p>
        <div class="textarea">{{evaluate.evaluate_content}}</div>
      </div>
      <p>
        <span>{{type==3?'施工质量：':'设计效果：'}}</span>
        <img
          v-for="(item, index) in evaluate.effect"
          :key="index"
          src="../../../assets/home_img/star_biu.png"
        />

        <span>{{evaluate.effect}}分</span>
      </p>
      <p>
        <span>{{type==3?"施工长服务：":"设计师服务："}}</span>
        <img
          v-for="(item, index) in evaluate.service"
          :key="index"
          src="../../../assets/home_img/star_biu.png"
        />
        <span>{{evaluate.service}}分</span>
      </p>
      <p>
        <span>综合体验：</span>
        <img
          v-for="(item, index) in evaluate.experience"
          :key="index"
          src="../../../assets/home_img/star_biu.png"
        />
        <span>{{evaluate.experience}}分</span>
      </p>
      <div>
        <p>评价图片：</p>
        <ul>
          <li v-for="(item, index) in evaluate.picture" :key="index">
            <img @click="big_pic(item)" :src="item" />
          </li>
        </ul>
      </div>
      <div v-if="evaluate.append_evaluate_content!=null">
        <p>追评内容：</p>
        <div class="textarea">{{evaluate.append_evaluate_content}}</div>
      </div>
      <div v-if="evaluate.append_picture!=null">
        <p>追评图片：</p>
        <ul>
          <li v-for="(item, index) in evaluate.append_picture" :key="index">
            <img @click="big_pic(item)" :src="item" />
          </li>
        </ul>
      </div>
    </section>
    <div class="btn" @click="btn">确定</div>
  </div>
</template>
<script>
import request from "@/request";
export default {
  data() {
    return {
      datas: {},
      title_name: "",
      evaluate: '',
      type: "",
      user_info: ""
    };
  },
  created() {
    this.type = this.$route.query.type;
    request({
      url: "/api/order/getOneOrderDetailed",
      method: "post",
      data: { one_order_number: this.$route.query.id }
    }).then(data => {
      if (data.data.status == 200) {
        this.datas = data.data.data;
        this.evaluate = data.data.data.evaluate;
        this.user_info =
          this.$route.query.type == 3
            ? data.data.data.constructor_user_info
            : data.data.data.design_user_info;
      } else {
        console.log(data.data);
      }
    });
  },
  methods: {
    big_pic(url) {
      this.$store.state.amplify_img = url;
    },
    btn() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.one_order_assess {
  font-size: 0.3rem;
}
.one_order_assess h4 {
  text-align: center;
  padding: 0.2rem 0;
  font-weight: 600;
  font-size: 0.32rem;
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
  padding: 0.1rem 0.2rem;
  line-height: 0.5rem;
  font-size: 0.26rem;
}
.assess {
  font-size: 0.26rem;
  padding: 0.1rem 0.2rem;
  border-top: 1px solid #808080;
}
.assess p {
  display: flex;
  align-items: center;
  line-height: 0.5rem;
}
.assess p img {
  width: 0.35rem;
  height: 0.35rem;
}
.assess p span:last-child {
  color: green;
  margin-left: 0.2rem;
}
.assess div img {
  width: 1.6rem;
  height: 1.6rem;
}
.assess .textarea {
  border: 1px solid #808080;
  min-height: 1.6rem;
  margin-top: 0.1rem;
  border-radius: 0.1rem;
  padding: 0.1rem;
  width: 100%;
}
.assess ul {
  margin-top: 0.1rem;
  overflow: hidden;
}
.assess ul li {
  float: left;
  margin: 0 0.2rem 0.1rem 0;
}
.assess ul li:nth-child(4n) {
  margin-right: 0;
}
.btn {
  text-align: center;
  background: #ff1284;
  color: white;
  border-radius: 0.1rem;
  padding: 0.15rem;
  margin: 0.2rem 0.5rem 1rem;
}
</style>