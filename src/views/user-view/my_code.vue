<template>
  <div class="my_cord">
    <div>
      <h3>金秋梦装饰微信公众号</h3>
      <img :src="code_url" alt />
      <p>扫描上面的二维码，关注金秋梦装饰微信公众号</p>
    </div>
  </div>
</template>
<script>
import request from "@/request";
export default {
  data() {
    return {
      code_url: ""
    };
  },
  created() {
    request({
      url: "/api/getUserCode",
      method: "post"
    }).then(data => {
      if (data.data.status == 200) {
        console.log(data);
        this.code_url = data.data.data.qr_url;
      }
    });
  },
  methods: {}
};
</script>
<style scoped>
h3 {
  margin-top: 0.4rem;
  font-size: 0.5rem;
}
p {
  color: rgb(128, 127, 127);
  font-size: 0.22rem;
}
.my_cord {
  padding-top: 2rem;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fef8da;
}
.my_cord div {
  text-align: center;
  margin:0 auto 0;
  width: 6.8rem;
  height: 7rem;
  border: 1px solid #d9d9d9;
  background: white;
}
img {
  width: 4rem;
  height: 4rem;
  margin: 0.5rem 0;
}
</style>