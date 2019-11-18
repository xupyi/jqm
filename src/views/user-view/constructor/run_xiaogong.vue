<template>
  <div class="run_work">
    <p>选择{{title_name}}</p>
    <div class="address">
      <div>
        所在地区：
        <select @change="Province_change" :value="province">
          <option selected value="0">请选择</option>
          <option
            v-for="(item, index) in select_Province"
            :key="index"
            :value="item.region_id"
          >{{item.region_name}}</option>
        </select>
        <span>省</span>
        <select @change="City_change" @click="City_click" :value="city">
          <option selected value="0">请选择</option>
          <option
            v-for="(item, index) in select_City"
            :value="item.region_id"
            :key="index"
          >{{item.region_name}}</option>
        </select>
        <span>市</span>
      </div>
      <p @click="search">点击搜索</p>
    </div>
    <ul>
      <li v-for="(item, index) in data_lists" :key="index" @click="xiaogong_detail(item.id)">
        <p class="img">
          <img :src="item.avatar" alt />
        </p>
        <div>
          <span>{{item.xing}}{{item.name}}</span>
          <p>
            <img src="../../../assets/home_img/dw.png" alt />
            <span>{{item.province_name}}{{item.city_name}}</span>
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
      data_lists: [],
      title_name: "",
      province: "0", //	否	int	省id
      city: "0",
      select_Province: [], //省
      select_City: [] //省
    };
  },
  created() {
    if (this.$route.query.name == "plumber_and_electrician") {
      this.title_name = "水电工";
    } else if (this.$route.query.name == "oil_worker") {
      this.title_name = "油工";
    } else if (this.$route.query.name == "carpentry") {
      this.title_name = "木工";
    } else if (this.$route.query.name == "bricklayer") {
      this.title_name = "瓦工";
    } else if (this.$route.query.name == "coolie_worker") {
      this.title_name = "小工";
    }
    this.get_data("", "");
    this.get_select_Province()
    this.$store.state.title_name = "施工长个人中心";
  },
  methods: {
    //   小工详情
      xiaogong_detail(id){
          this.$router.push({path:'/personal/se_xiaogong_detail',query:{id:id,name:this.$route.query.name,order_id:this.$route.query.order_id}})
      },
    //   搜索
    search() {
      this.get_data(this.province, this.city);
    },
    // 省份
    Province_change(e) {
        if(e.target.value<2){
            this.city=this.province=0
            this.select_City=[]
        }else{
           this.province=this.select_Province[e.target.value-2].region_id
        }
        this.get_select_city()
    },
    // 城市
    City_change() {},
    City_click(){
        if(this.province==''){
            this.$toast("请先选择省份");
        }
    },
    // 获取小工列表
    get_data(province, city) {
      this.$store.commit("show_looding");

      request({
        url: "/api/getUserList",
        data: { type: this.$route.query.name, province: province, city: city },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.data_lists = data.data.data.data;
        }
        this.$store.commit("hide_looding");
      });
    },
    // 获取城市
    get_select_Province(once) {
      request({
        url: "/api/getAllProvince",
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.select_Province = data.data.data;
          if (once) {
            this.get_select_city("once");
          }
        }
      });
    },
    get_select_city() {
      request({
        url: "/api/getAllCity",
        data: { province_id: this.province },
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.select_City = data.data.data;
        }
      });
    },
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
}

.address {
  padding: 0.2rem;
  border-top: 1px solid #808080;
  border-bottom: 1px solid #808080;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.address div {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.address span{
    margin: 0 0.2rem 0 0.1rem;
}
.address p {
  font-size: 0.28rem;
  background: #ff1284;
  color: white;
  padding: 0.08rem 0.2rem;
}
ul {
  overflow: hidden;
  padding: 0.2rem;
}
ul li {
  border: 0.55px solid #ddd;
  float: left;
  width: 3.4rem;
  /* height: 3rem; */
  margin: 0 0.3rem 00.3rem 0;
}
ul li:nth-child(2n) {
  margin-right: 0;
}
ul li > .img {
  height: 2.5rem;
}
.img img {
  padding: 0.55px;
  width: 100%;
  height: 100%;
}
li div {
  border-top: 0.5px solid #808080;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.1rem;
  font-size: 0.28rem;
}
li div p {
  display: flex;
  align-items: center;
}
li div p img {
  width: 0.3rem;
  height: 0.3rem;
}
</style>