<template>
  <div>
    <div class="avatar_uplode">
      <div style="background:#fef8da">
        <img class="avatar_img" :src="user_info_datas.avatar" alt />
      </div>
    </div>
    <ul class="guke">
      <li>
        <span>姓氏：</span>
        <span>{{user_info_datas.xing}}</span>
      </li>
      <li>
        <span>名字：</span>
        <span>{{user_info_datas.name}}</span>
      </li>
      <li>
        <span>手机号：</span>
        <span>{{user_info_datas.mobile}}</span>
      </li>
      <li>
        <span>微信号：</span>
        <span>{{user_info_datas.weixin}}</span>
      </li>
      <li class="gender">
        <span>性别：</span>
        <span>{{user_info_datas.gender==1?"男":"女"}}</span>
      </li>
      <li>
        <span>地区：</span>
        <span>{{user_info_datas.province_name}} {{user_info_datas.city_name}} {{user_info_datas.district_name}}</span>
      </li>
      <li>
        <span>出生年月：</span>
        <span>{{user_info_datas.birth_year}}年{{user_info_datas.birth_month}}月</span>
      </li>
    </ul>
  </div>
</template>

<script>
import request from "@/request";
export default {
  data() {
    return {
      user_info_datas: {}
    };
  },
  created() {
    this.$store.state.title_name = "城市合伙人个人中心";
    request({
      url: "/api/getUserInfo",
      data: {
        user_id: this.$route.query.id
      },
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.data.status == 200) {
        this.user_info_datas = data.data.data;
      }
      this.$store.commit("hide_looding");
    });
  },
  methods: {}
};
</script>
<style scope>
.head {
  height: 0.9rem;
  background-color: #2bbf4a;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.head h1 {
  font-size: 0.4rem;
  font-weight: bold;
}
.head > img {
  position: absolute;
  left: 0.2rem;
  width: 0.5rem;
  height: 0.5rem;
}
/* ------------------------------- */
.avatar_uplode {
  margin: 0.4rem 0;
}
.avatar_uplode div {
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  border: 1px solid #f79646;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  box-sizing: content-box;
  padding: 0.1rem;
}

.avatar_img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.succer ul li {
  border-bottom: 1px solid #7f7f7f;
  font-size: 0.3rem;
  padding: 0.2rem 0.4rem;
}
/* +++++++++++++++++++++++++++++++++++++++++++ */
.guke {
  margin-bottom: 0.6rem;
}
.guke span {
  white-space: nowrap;
}
.guke li {
  display: flex;
  flex-direction: row;
  margin: 0.2rem 0.4rem;
  font-size: 0.3rem;
}
.guke li input {
  margin-left: 0.1rem;
  width: 100%;
  border-bottom: 1px solid #7f7f7f !important;
}
.guke li p {
  margin-left: 0.1rem;
  width: 100%;
  border-bottom: 1px solid #7f7f7f !important;
}
.guke select {
  border: none;
}
.guke div {
  margin-left: 0.1rem;
  border-bottom: 1px solid #7f7f7f;
  width: 100%;
}
/* 生日 */
.active {
  background: rgb(105, 105, 109);
  color: white;
}

.birthday {
  border-top: 1px solid #7f7f7f;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.birthday > div {
  flex: 1;
  display: flex;
  flex-direction: row;
}
.birthday select {
  font-size: 0.3rem;
  margin-right: 0.2rem;
}

.GoodArea {
  line-height: 0.6rem;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
}

.GoodArea div {
  display: flex;
  flex-wrap: wrap;
}

.GoodArea div span {
  position: relative;
  padding: 0 0.15rem;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
  margin: 0 0.17rem 0.17rem 0;
}
.GoodArea span img {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  bottom: -0.1rem;
  right: -0.1rem;
}

.x_img {
  position: absolute;
  top: -0.1rem;
  right: -0.1rem;
  width: 0.3rem !important;
  height: 0.3rem !important;
}
</style>