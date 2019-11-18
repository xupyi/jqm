<template>
  <div id="my_complaints">
    <div class="complaints_header">
      <h3>投诉建议</h3>
      <router-link to="/complaints">添加投诉建议</router-link>
    </div>
    <div>
      <p class="no_data" v-if="complaints_list==''">0条投诉建议信息</p>
      <ul class="complaints_main">
        <li v-for="(item, index) in complaints_list" :key="index">
          <div>
            <span>类别：</span>
            <p>{{item.complaint_type |liaft}}</p>
          </div>
          <div>
            <span>时间：</span>
            <p>{{item.created_at}}</p>
          </div>
          <div>
            <span>对象：</span>
            <p>{{item.complaint_object}}</p>
          </div>
          <div>
            <span>内容：</span>
            <p>{{item.content}}</p>
          </div>
          <div v-if="item.picture_urls!=''">
            <span>图片：</span>
          </div>
          <div v-if="item.picture_urls!=''">
            <ul class="picture_urls">
              <li v-for="(item_img, item_index) in item.picture_urls" :key="item_index">
                <img @click="big_pic(index,item_index)" :src="item_img" alt />
              </li>
            </ul>
          </div>
          <div class="del" @click="del_tap(item.id,index)">删除</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import request from "@/request";
export default {
  data() {
    return {
      page: 1,
      complaints_list: [],
      alluser_list: []
    };
  },
  created() {
    this.$store.commit("show_looding");
    // 获取投诉列表
    request({
      url: "/api/getComplaint",
      method: "post"
    }).then(data => {
      if (data.data.status == 200) {
        console.log(data);
        this.complaints_list = data.data.data.data;
      } else {
        console.log(data);
        this.$toast(data.data.msg);
      }
    });
    // 获取投诉对象列表
    request({
      url: "/api/getComplaint",
      method: "post"
    }).then(data => {
      if (data.data.status == 200) {
        console.log(data);
        this.alluser_list = data.data.data.data;
      } else {
        console.log(data);
        this.$toast(data.data.msg);
      }
    });
    this.$store.commit("hide_looding");
  },
  filters:{
    liaft(val){
      if(val==1){
        return '投诉'
      }else if(val==2){
        return '建议'
      }else if(val==3){
        return '举报'
      }else if(val==4){
        return '咨询'
      }
    }
  },
  methods: {
    big_pic(i,index) {
      this.$store.state.amplify_img= this.complaints_list[i].picture_urls[index];
    },
    del_tap(i, index) {
      request({
        url: "/api/delComplaint",
        method: "post",
        data: { id: i }
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.complaints_list.splice(index, 1);
          this.$toast("删除成功");
        }
      });
    }
  }
};
</script>
<style scoped>
.no_data{
  padding:  0.2rem 0;
  font-size: 0.3rem;
}
#my_complaints {
  font-size: 0.3rem;
  margin: 0 0.15rem;
}

.complaints_header {
  overflow: hidden;
  border-bottom: 0.5px solid #7d7d7d;
}

.complaints_header h3 {
  font-weight: bold;
  font-size: 0.36rem;
  text-align: center;
  padding: 0.2rem 0;
}

.complaints_header a {
  float: right;
  font-size: 0.28rem;
  color: white;
  background: #ff1284;
  border-radius: 0.15rem;
  padding: 0.15rem 0.35rem;
  margin: 0.15rem;
}
.complaints_main{
  margin-bottom: 0.8rem;
}
.complaints_main > li {
  font-size: 13px;
  overflow: hidden;
  padding: 0.2rem;
  border-bottom: 0.5px solid #7d7d7d;
}

.complaints_main > li div {
  display: flex;
  flex-direction: row;
  line-height: 0.6rem;
}
.complaints_main > li div span {
  white-space: nowrap;
}
.complaints_main > li div p {
  word-break:break-word;
  color: blue;
}
.picture_urls {
  margin-top: 0.2rem;
  overflow: hidden;
}
.picture_urls li {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid #7d7d7d;
  margin: 0 0.2rem 0.2rem 0;
  float: left;
  width: 1.5rem;
  height: 1.5rem;
}
.picture_urls li:nth-child(4n){
  margin-right: 0;
}
.picture_urls li img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.del {
  line-height: 0.5rem !important;
  float: right;
  padding: 0.06rem 0.4rem 0;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
}
</style>