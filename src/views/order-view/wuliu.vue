<template>
  <div>
    <header_/>
    <div class="wuliu">
      <p>查看物流</p>
      <div class="wiliu_msg">
        <div>
          物流状态
          <span>{{wuliu.State | status}}</span>
        </div>
        <p>承运公司：{{wuliu.logistics_company}}</p>
        <p>运单编号：{{wuliu.EBusinessID}}</p>
      </div>
      <div v-if="wuliu.Traces==''"  class="proper_msg">暂无物流信息~</div>
      <ul v-else >
        <li  v-for="(item, index) in wuliu.Traces" :key="index">
          <span>{{item.AcceptTime}}</span>
          <p>{{item.AcceptStation}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import header_ from "../back_header";
import request from "@/request";
export default {
  components: { header_ },
  data() {
    return {
      wuliu: {},
    };
  },
  filters:{
    status(val){
      if(val==1){
        return '揽货中'
      }else if(val==2){
        return '在途中'
      }else if(val==3){
        return '已签收'
      }else if(val==4){
        return '问题件'
      }
    }
  },
  created() {
    this.$store.commit("show_looding");
    request({
      url: "/api/order/get_wuliu",
      data: { one_order_number: this.$route.query.id },
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.data.status == 200) {
        this.wuliu = data.data.data;
      }
      this.$store.commit("hide_looding");
    });
  },
  methods: {}
};
</script>
<style>
.wuliu {
  margin: 0.9rem 0 1.05rem;
  line-height: 0.6rem;
  font-size: 0.3rem;
}
.wuliu > p {
  padding: 0.2rem;
  font-size: 0.36rem;
  text-align: center;
  font-weight: 500;
}
.wiliu_msg {
  padding: 0 0.2rem;
  border-bottom: 1px solid #808080;
}
.wiliu_msg > div span {
  color: #62bd5a;
}
.wiliu_msg > p {
  color: #000;
}
.proper_msg {
  margin: 0.2rem 0;
  padding: 0.2rem;
  border-bottom: 1px solid #808080;
  display: flex;
  align-items: center;
  color: #000;
}
.proper_msg img {
  width: 0.61rem;
  height: 0.61rem;
  padding: 0.1rem;
  border-radius: 50%;
  border: 1px solid #808080;
  margin-right: 0.2rem;
}
.wuliu ul {
  padding: 0.2rem;
  color: #000;
}
.wuliu li{
  border-bottom: 1px solid #999999;
  margin: 0.1rem 0;
}
.wuliu li:last-child{
  border: none;
}
</style>