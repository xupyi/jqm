<template>
  <div class="house">
    <p>我的房屋信息</p>
    <ul>
      <p v-if="house_info==''">暂没有房屋信息，请先提交量房预约！</p>
      <li v-else v-for="(item, index) in house_info" :key="index">
        <p>{{item.city_address_datail}}</p>
        <div class="house_xg">
          <p>
            <img @click="link_tap(item.id,index)" src="../../assets/xg_.png" alt />
            <span>修改</span>
          </p>
          <p>
            <img @click="del_tap(item.id,index)" src="../../assets/sc_.png" alt />
            <span>删除</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import request from "@/request";
export default {
  data() {
    return {
      condition: true,
      house_info: []
    };
  },
  created() {
    this.$store.state.title_name = "我的个人中心";
    this.$store.commit("show_looding");
    request({
      url: "/api/getQuantityRoom",
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.data.status == 200) {
       
        this.house_info =data.data.data
      } else {
        console.log(data);
        this.$toast(data.data.msg);
      }
      this.$store.commit("hide_looding");
    });
  },
  methods: {
    
    link_tap(id,index) {
      if (this.house_info[index].is_edit == 1) {
        this.$toast("房屋正在施工或设计中，不能修改");
      } else{
        this.$router.push({ path: "house_detail", query: { id: id } });
      }
    },
    del_tap(id, index) {
      if (this.house_info[index].is_edit == 1) {
        this.$toast("房屋正在施工或设计中，不能删除");
      } else {
        this.$store.commit("show_looding");
        request({
          url: "/api/delQuantityRoom",
          data: { id: id },
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.data.status == 200) {
            this.house_info.splice(index, 1);
            this.$toast("删除成功");
          }
          this.$store.commit("hide_looding");
        });
      }
    }
  }
};
</script>
<style scoped>
.house > p {
  font-weight: bold;
  font-size: 0.36rem;
  text-align: center;
  padding: 0.2rem 0;
}
.house ul {
  border-top: 0.5px solid #bfbfbf;
}

.house ul > p {
  padding: 0.2rem 0;
  font-size: 0.28rem;
  color: #000;
  text-align: center;
}

.house ul > p a {
  color: #ff1284;
}

.house ul li {
  line-height: 0.5rem;
  border-bottom: 0.5px solid #bfbfbf;
  padding:0.1rem 0.2rem;
  font-size: 0.28rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}


.house_xg {
  font-size: 0.24rem;
  display: flex;
  align-items: center;
  flex-direction: row;
}
.house_xg p {
  color: #ff258e;
  line-height: 0.3rem;
  margin-left: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.house_xg img {
  width: 0.35rem;
  height: 0.35rem;
  margin-bottom: 0.05rem;
}

/* ----------------------------------------- */
</style>