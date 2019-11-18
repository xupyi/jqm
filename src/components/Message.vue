<template>
  <div class="msg">
    <back_header></back_header>
    <p>我的消息</p>
    <div v-if="msg_list==''" class="no_pecords">
      <p>你有0条消息</p>
    </div>
    <div v-else class="msg_list">
      <ul>
        <li :style="{fontWeight:item.look_status==0?'bold':'' }" v-for="(item, index) in msg_list" :key="index" @click="xia_tap(index,item.id)">
          <p><span>状态：</span><span :style="{color:item.look_status==0?'#000':'#0066ff'}">{{item.look_status==0?'未读':'已读'}}</span></p>
          <p><span>接收时间：</span>{{item.created_at}}</p>
          <p><span>发件人：</span>{{item.send_user_name}}</p>
          <div>
            <p :class='xia==index?"active":"nomore"'><span>消息内容：</span><span :style="{color:item.look_status==0?'#000':'#0066ff'}">{{item.message_content}}</span></p>
            <img :src="xia ==index?xia_img:you_img" alt />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import request from "@/request.js";
import back_header from '../views/back_header.vue'
export default {
  components:{back_header},
  data() {
    return {
      msg_list: [],
      xia: null,
      xia_img: require("../assets/xiamsg.png"),
      you_img: require("../assets/shaang.png")
    };
  },
  created() {
    this.$store.state.title_name = "我的个人中心";
    this.$store.state.sess=4
    this.$store.commit("show_looding");
    request({
      url: "/api/getUserMessage",
      method: "post"
    }).then(data => {
      console.log(data.data);
      this.$store.commit("hide_looding");
      if (data.data.status == 200) {
        this.msg_list = data.data.data
      }
    });
  },
  methods: {
    xia_tap(index, id) {
      this.xia = this.xia == index ? null : index;
      request({
        url: "/api/changeMessageStstus",
        data: { message_id: id },
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.msg_list[index].look_status = 1;
        }
      });
    }
  }
};
</script>

<style scoped>
.msg {
  font-size: 0.26rem;
  position: absolute;
  top: 0.9rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  padding: 0.25rem;
  color: #000;
}

.no_pecords {
  font-size: 0.3rem;
  font-weight: bold;
}
.no_pecords p{
  padding:0.1rem 0.2rem ;
}
.msg > p {
  font-weight: bold;
  text-align: center;
  font-size: 0.32rem;
  padding:0 0 0.2rem;
  border-bottom: 0.3px solid #7d7d7d;
}

.msg_list li {
  line-height: 0.5rem;
  border-bottom: 0.5px solid #7d7d7d;
  padding: 0.2rem;
}
.msg_list li>p >span:first-child{
  font-weight: bold;
}
.msg_list li div p>span:first-child{
  font-weight: bold;
}
.msg_list li div {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.msg_list li div p{
  width: 93%;
}
.nomore {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 5rem;
}

.active {
  width: 100%;
}

.msg_list li div img {
  position: absolute;
  top: 0.1rem;
  right: 0;
  width: 0.2rem;
  height: 0.2rem;
}
</style>