<template>
  <div>
    <h3>顾客资料</h3>
    <main>
      <div>姓氏：{{data.surname}}</div>
      <div>名字：{{data.name}}</div>
      <div>手机号：{{data.mobile}}</div>
      <div>微信号：{{data.weixin}}</div>
      <div>性别：{{data.gender==1?'男':'女'}}</div>
      <div>房屋地址：{{data.city_address_datail}}</div>
      <div>房屋面积：{{data.room_area}}</div>
      <div>装修类型：{{data.renovation_type==1?'新房':'翻修'}}</div>
      <div>
        期望装修风格：
        <span v-for="(item, index) in style_datas" :key="index">{{item}}</span>
      </div>
      <div>装修费用预算：{{data.budget_min}}万 ~ {{data.budget_max}}万</div>
      <div>计划开始时间：{{data.renovation_start_year}}/{{data.renovation_start_month>=10?data.renovation_start_month:0+data.renovation_start_month}} ~ {{data.renovation_end_year}}/{{data.renovation_end_month>=10?data.renovation_end_month:0+data.renovation_end_month}}</div>
      <div>希望入住时间：{{data.check_in_start_year}}/{{data.check_in_start_month>=10?data.check_in_start_month:0+data.check_in_start_month}} ~ {{data.check_in_end_year}}/{{data.check_in_end_month>=10?data.check_in_end_month:0+data.check_in_end_month}}</div>
      <div>业主通过什么方式知道我们：{{channel_datas}}</div>
      <div>业主房屋的装修有什么期待：{{data.remark}}</div>
      <div>
        <p>户型图：</p>
        <ul>
          <li @click="big_pic(index)" v-for="(item, index) in renovation_picture" :key="index">
            <img :src="item" alt />
          </li>
        </ul>
      </div>
      <div>
        <p>业主喜欢的装修效果图：</p>
        <ul>
          <li @click="big_pic1(index)" v-for="(item, index) in apartment_picture" :key="index">
            <img :src="item" alt />
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import request from "@/request.js";
export default {
  data() {
    return {
      data: {},
      channel_datas: "",
      style_datas: "",
      renovation_picture: [],
      apartment_picture: []
    };
  },
  created() {
    var val = (this.data = JSON.parse(
      window.sessionStorage.getItem("gkzl_data")
    ));
    if (val.apartment_picture != "" && val.apartment_picture != "[]") {
      this.apartment_picture = val.apartment_picture;
    }
    if (val.renovation_picture != "" && val.renovation_picture != "[]") {
      this.renovation_picture = val.renovation_picture;
    }
    // 获取装修风格
    request({
      url: "/api/getStyleList",
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.data.status == 200) {
        var a = [];
        for (let index = 0; index < data.data.data.length; index++) {
          const element = data.data.data[index];
          for (let i = 0; i < val.style_type_id.length; i++) {
            if (element.style_id == val.style_type_id[i]) {
              a.push(data.data.data[index].style_name);
            }
          }
        }
        console.log(a)
        this.style_datas = a;
      }
    }),
      // 获取渠道
      request({
        url: "/api/getChannelList",
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.status == 200) {
          for (let index = 0; index < data.data.data.length; index++) {
            if (data.data.data[index].id == val.channel_id) {
              this.channel_datas = data.data.data[index].channel_name;
            }
          }
        }
      });
  },
  methods: {
    big_pic(index) {
      this.$store.state.amplify_img = this.renovation_picture[index];
    },
    big_pic1(index) {
      this.$store.state.amplify_img = this.apartment_picture[index];
    }
  }
};
</script>

<style scoped>
h3 {
  font-weight: bold;
  text-align: center;
  margin: 0.2rem 0;
  font-size: 0.36rem;
}
main {
  line-height: 0.5rem;
  border-top: 1px solid #7f7f7f;
  margin: 0 0.3rem;
  padding: 0.1rem 0;
  font-size: 0.28rem;
}
ul {
  overflow: hidden;
}
main li {
  float: left;
  width: 23%;
  height: 1rem;
  margin: 0 2.5% 2.5% 0;
  font-size: 0;
  border: 1px solid #7f7f7f;
}
main li:nth-child(4n) {
  margin-right: 0;
}
ul li img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>