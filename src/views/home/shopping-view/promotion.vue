<template>
  <div id="promotion">
    <div class="hear">
      <div @click="price_tap" class="price_sort" :style="{background:active==''?'#FF1284' : '#2FC145'}">
        <span>价格</span>
        <img :src="icon==''?top:bottom" alt />
      </div>
      <div class="search_s">
        <input v-model="val.keyword" type="text" />
        <div @click="search_tap" class="search">搜索</div>
      </div>
    </div>
    <main id="view1">
      <ul class="view">
        <li @click="item_tap(item.id)" v-for="(item, index) in promotion" :key="index">
          <img :src="item.gpics[0]" alt="1" />
          <div class="item_msg">
            <div>
              <h3>{{item.manufactor_name}}</h3>
              <span class="item_ti">{{item.show_title}}</span>
            </div>
            <div class="looks">
              <p>￥{{item.price}}</p>
              <div>
                <img src="../../../assets/home_img/chakan.png" alt="">
                <span>{{item.look_number}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <p v-if="is_get">上拉加载更多</p>
    </main>
  </div>
</template>
<script>
import request from "@/request.js";
export default {
  data() {
    return {
      active: '',
      icon:'',
      top: require("../../../assets/home_img/sort.png"),
      bottom: require("../../../assets/home_img/jiang.png"),
      promotion: [],
      val: {
        keyword: "",
        sort: "",
        is_promo: 1,
        page: 1
      },
      is_get: false
    };
  },
  created() {
    // 促销商品
    this.get_promotion({ is_promo: 1 });
  },
  mounted() {
    var sc = document.querySelector("main");
    var that = this;
    sc.addEventListener("touchend", function() {
      if (sc.scrollHeight - sc.clientHeight === sc.scrollTop && that.is_get) {
        that.val.page += 1;
        that.get_promotion();
        sc = document.querySelector("main");
      }
    });
  },
  methods: {
    item_tap(i) {
      console.log(i);
      this.$router.push({ path: "/shop_detail", query: { id: i } });
    },
    // 价格
    price_tap() {
      this.val.page = 1;
      this.promotion = [];
      if(this.val.sort ==''){
        this.val.sort ='asc'
        this.active = '1';
        this.icon=0
      }else if(this.val.sort == "asc"){
        this.val.sort = "desc"
        this.active = '1';
        this.icon='1'
      }else if(this.val.sort == "desc"){
        this.val.sort = ''
        this.active = '';
        this.icon=0
      }
      this.get_promotion();
    },
    // 搜索
    search_tap() {
      this.val.page = 1;
      this.promotion = [];
      this.get_promotion();
    },
    get_promotion(val) {
      this.$store.commit("show_looding");
      request({
        url: "/api/getGoodsList",
        data: val ? val : this.val,
        method: "post"
      }).then(data => {
        console.log(data.data);
        this.$store.commit("hide_looding");
        if (data.data.status == 200) {
          this.promotion = this.promotion.concat(data.data.data.data);
          if (this.val.page < data.data.data.last_page) {
            this.is_get = true;
          } else {
            this.is_get = false;
          }
        }
      });
    }
  }
};
</script>
<style scoped>
#promotion {
  position: fixed;
  top: 2.6rem;
  bottom: 1rem;
  left: 0;
  right: 0;
  overflow-y: auto;
}

#promotion .hear {
  margin:0.1rem 0.2rem 0;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-align: center;
}

#promotion .price_sort {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.2rem;
  background: #ff1284;
  color: white;
  border-radius: 0.1rem;
  margin-right: 0.15rem;
}

.price_sort img {
  width: 0.2rem;
  height: 0.22rem;
}
.search_s{
  flex: 1;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.search_s input {
  padding: 0.1rem;
  flex: 1;
}

.search_s .search {
  width: 1rem;
  background: #ff1284;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}


.view  {
  overflow: hidden;
  padding: 0.16rem 0.2rem 0;
}

.view li {
  float: left;
  box-sizing: border-box;
  font-size: 0;
  border: 0.55px solid #ddd;
  width: 48%;
  margin: 0 4% 4% 0;
}

.view li:nth-child(2n) {
  margin-right: 0;
}

.view li>img {
  padding: 0.55px;
  width: 100%;
  height: 2.25rem;
}

.item_msg {
  font-size: 0.3rem;
  padding: 0.1rem;
}
.item_msg>div:first-child{
  height:0.4rem ;
  line-height: 0.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
}
.item_msg div h3 {
  display: inline-block;
  font-size: 0.24rem;
  margin-right: 0.2rem;
}
.item_msg .item_ti{
  font-size: 0.24rem;
}
.item_msg div:last-child {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
}

.item_ti {
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;
}

.looks img{
  object-fit: contain;
  width: 0.25rem;
  height: 0.15rem;
}
.looks span{
  font-size: 0.26rem;
}
.item_msg p {
  font-size: 0.3rem;
  color: #ff1284;
}

.classify {
  background: white;
  width: 100%;
  position: absolute;
  padding: 0 0.1rem 0.1rem;
  box-shadow: 0px 0.06rem 0.22rem 0.02rem rgba(51, 51, 51, 0.08);
  border-radius: 0.1rem;
}

.classify > div {
  margin:0.2rem 0.1rem;
  font-size: 0.26rem;
  display: flex;
  flex-direction: row;
}

.classify p {
  padding-left:0.1rem ;
  border-left: 5px solid #fb98c5;
  white-space: nowrap;
}

.classify ul {
  overflow: hidden;
}

.classify ul li {
  float: left;
  margin-right: 0.4rem;
}
</style>