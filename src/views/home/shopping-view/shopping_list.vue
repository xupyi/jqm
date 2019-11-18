<template>
  <div class="shopping_list">
    <div class="hear">
      <nav>
        <div
          @click="classify_tap()"
          :style="{background:active1==1? '#2FC145' : '#FF1284'}"
          class="search_type"
        >分类筛选</div>
        <div
          @click="price_tap()"
          :style="{background:active==1? '#2FC145' : '#FF1284'}"
          class="price_sort"
        >
          <span>价格</span>
          <img :src="icon==''?top:bottom" alt />
        </div>
        <div class="search_s">
          <input v-model="val.keyword" type="text" />
          <div @click="search_tap" class="search">搜索</div>
        </div>
      </nav>
    </div>
    <main id="view1">
      <!-- 一级分类 -->
      <div v-show="classify_show" class="classify">
        <div v-for="(item, index) in category_list.children" :key="index">
          <p>{{item.category_name}}：</p>
          <ul>
            <li
              @click="keyword_tap(children_item.id)"
              v-for="(children_item, index1) in item.children"
              :key="index1"
              :class="val.category_id==children_item.id?'key_active':''"
            >{{children_item.category_name}}</li>
          </ul>
        </div>
      </div>
      <!-- 二级分类 -->
      <div v-show="classify_show1&&classify_list!=''" class="classify">
        <div v-for="(item, index) in classify_list" :key="index">
          <p>{{item.category_name}}：</p>
          <ul>
            <li
              @click="child_tap(index,index1,children_item.category_name)"
              v-for="(children_item, index1) in item.children"
              :key="index1"
              :class="children_item.is?'key_active':''"
            >{{children_item.category_name}}</li>
          </ul>
        </div>
        <p class="q_xuan">
          已选：
          <span
            @click="key_word_tap(item.parent_index, item.child_index,index)"
            v-for="(item, index) in key_words"
            :key="index"
          >
            <span>{{item.category_name}}</span>
            <img src='../../../assets/xx.png' alt />
          </span>
        </p>
      </div>
      <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++ -->
      <ul id="view">
        <li @click="shop_detail_tap(item.id)" v-for="(item, index) in shop_datas" :key="index">
          <img :src="item.gpics[0]" alt="1" />
          <div class="item_msg">
            <div>
              <h3 v-if="item.manufactor_name">{{item.manufactor_name}}</h3>
              <span class="item_ti">{{item.show_title}}</span>
            </div>
            <div class="looks">
              <p>￥{{item.price}}</p>
              <div>
                <img src="../../../assets/home_img/chakan.png" alt />
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
  name: "test-123",
  data() {
    return {
      key_words: [], //关键词
      classify_list: "", //耳机分类数据
      classify_show1: false,
      classify_show: false,
      shop_datas: [],
      category_list: [],
      active: 0,
      icon:'',
      active1: 0,
      top: require("../../../assets/home_img/sort.png"),
      bottom: require("../../../assets/home_img/jiang.png"),
      val: {
        keyword: "",
        sort: "asc",
        category_id: "",
        page: 1,
        cate: ""
      },
      shop_list_id: "",
      is_get: false
    };
  },
  created() {
    var newsID = this.$route.query.id;
    console.log(newsID);
    this.val.category_id = this.shop_list_id = newsID;
    this.val.sort = "";
    this.get_data({
      category_id: newsID,
      keyword: "",
      sort: ""
    });
    // 获取分类信息
    this.get_category(newsID);
  },
  watch: {
    $route(to, from) {
      console.log(to.query.id);
      this.shop_datas = [];
      this.key_words = [];
      this.classify_show1 = this.classify_show = false;
      this.active=this.active1 = this.val.keyword = this.val.cate = this.classify_list = "";
      this.val.page = 1;
      this.val.category_id = this.shop_list_id = to.query.id;
      this.get_data();
      this.get_category(to.query.id);
    }
  },
  mounted() {
    var sc = document.querySelector(".shopping_list");
    var that = this;
    sc.addEventListener("touchend", function() {
      if (sc.scrollHeight - sc.clientHeight === sc.scrollTop && that.is_get) {
        console.log(11);
        that.val.page += 1;
        that.get_data();
        sc = document.querySelector(".shopping_list");
      }
    });
  },
  methods: {
    classify_tap(i) {
      this.active1 == i ? (this.active1= 0) : (this.active1 = i);
      this.classify_show = !this.classify_show;
      this.classify_show1=false
    },
    // 价格排序
    price_tap(i) {
      this.val.page = 1;
      this.shop_datas = [];
      if(this.val.sort ==''){
        this.val.sort ='asc'
        this.active = '1';
        this.icon=''
      }else if(this.val.sort == "asc"){
        this.val.sort = "desc"
        this.active = '1';
        this.icon='1'
      }else if(this.val.sort == "desc"){
        this.val.sort = ''
        this.active = '';
        this.icon=''
      }
      this.get_data();
    },
    // 商品详情
    shop_detail_tap(i) {
      this.$router.push({ path: "/shop_detail", query: { id: i } });
    },
    // 关键字搜索
    search_tap() {
      this.val.page = 1;
      this.shop_datas = [];
      this.get_data();
    },
    // 分类搜索
    keyword_tap(key_id) {
      this.active = "";
      this.val.page = 1;
      this.val.keyword = "";
      this.shop_datas = [];
      this.key_words=[]
      this.val.cate=''
      if(this.val.category_id == key_id){
        this.val.category_id = this.shop_list_id
        this.classify_show1=false
      }else{
        this.val.category_id = key_id
        this.classify_show1 = true;
      }
      this.get_data();
      this.classify_show = false;
      request({
        url: "/api/getGoodsCategory_other",
        data: { category_id: key_id },
        method: "post"
      }).then(data => {
        console.log(data.data);
        this.$store.commit("hide_looding");
        if (data.data.status == 200) {
          for (let index = 0; index < data.data.data.length; index++) {
            const element = data.data.data[index];
            for (let i = 0; i < element.children.length; i++) {
              element.children[i].is = false;
            }
          }
          this.classify_list = data.data.data;
        }
      });
    },
    // 子分类11
    child_tap(parent_index, child_index) {
      const element = this.classify_list[parent_index];
      var a = this.classify_list[parent_index].children[child_index].is;
      for (
        let index = 0;
        index < this.classify_list[parent_index].children.length;
        index++
      ) {
        element.children[index].is = false;
      }
      if (a) {
        element.children[child_index].is = false;
      } else {
        element.children[child_index].is = true;
      }
      this.keyqqqq();
    },
    key_word_tap(parent_index, child_index, idx) {
      // 关键词删除
      console.log(this.key_words);
      this.key_words.splice(idx, 1);
      this.classify_list[parent_index].children[child_index].is = false;
    },
    keyqqqq() {
      let cate_arr = [],
        category_name = [];
      for (let index = 0; index < this.classify_list.length; index++) {
        const element = this.classify_list[index];
        for (let i = 0; i < element.children.length; i++) {
          if (element.children[i].is) {
            var obj = {
              parent_index: index,
              child_index: i,
              category_name: element.children[i].category_name
            };
            category_name.push(obj);
            cate_arr.push(element.children[i].id);
          }
        }
      }
      this.key_words = category_name;
      this.val.cate = cate_arr.join();
      this.get_data();
    },
    // 获取商品列表
    get_data() {
      console.log(this.val);
      this.$store.commit("show_looding");
      request({
        url: "/api/getGoodsList",
        data: this.val,
        method: "post"
      }).then(data => {
        console.log(data.data);
        this.$store.commit("hide_looding");
        if (data.data.status == 200) {
          this.shop_datas = data.data.data.data;
          // this.shop_datas = this.shop_datas.concat(data.data.data.data);
          // if (this.val.page < data.data.data.last_page) {
          //   this.is_get = true;
          // } else {
          //   this.is_get = false;
          // }
        }
      });
    },
    // 获取分类信息
    get_category(newsID) {
      request({
        url: "/api/getGoodsCategory",
        method: "post"
      }).then(data => {
        if (data.data.status == 200) {
          for (let index = 0; index < data.data.data.length; index++) {
            if (data.data.data[index].id == newsID) {
              this.category_list = data.data.data[index];
            }
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.shopping_list {
  position: fixed;
  top: 2.6rem;
  bottom: 1rem;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.shopping_list .hear nav {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-align: center;
  margin: 0.1rem 0.2rem 0;
}
.shopping_list nav > div {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}
.search_type {
  margin-right: 0.15rem;
  padding: 0 0.1rem;
  border-radius: 0.1rem;
  color: white;
}
.price_sort {
  margin-right: 0.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.2rem;
  background: #ff1284;
  color: white;
  border-radius: 0.1rem;
}

.price_sort img {
  width: 0.2rem;
  height: 0.22rem;
}
.search_s {
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
  padding: 0.1rem;
  background: #ff1284;
  color: white;
}

.shopping_list #view {
  overflow: hidden;
  padding: 0.16rem 0.2rem 0;
}

.shopping_list #view li {
  float: left;
  box-sizing: border-box;
  font-size: 0;
  border: 0.55px solid #ddd;
  width: 48%;
  margin: 0 4% 4% 0;
}

.shopping_list main #view li:nth-child(2n) {
  margin-right: 0;
}

.shopping_list main li > img {
  padding: 0.55px;
  width: 100%;
  height: 2.25rem;
}

.item_msg {
  font-size: 0.3rem;
  padding: 0.1rem;
}
.item_msg > div:first-child {
  height: 0.4rem;
  line-height: 0.4rem;
}
.item_msg div h3 {
  max-width: 50%;
  font-size: 0.24rem;
  margin-right: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
}
.item_msg .item_ti {
  font-size: 0.24rem;
}
.item_msg div:first-child {
  display: flex;
  flex-direction: row;
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
.looks {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.looks div{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.looks img {
  object-fit: contain;
  width: 0.25rem;
  height: 0.15rem;
}
.looks span {
  font-size: 0.26rem;
}
.item_msg p {
  font-size: 0.3rem;
  color: #ff1284;
}

.classify {
  margin-top: 0.1rem;
  background: white;
  width: 100%;
  padding: 0.1rem 0.2rem;
  /* border-top: 0.5px solid #000;
  border-bottom: 0.5px solid #000; */
}

.classify > div {
  margin: 0.2rem 0;
  font-size: 0.26rem;
  display: flex;
  flex-direction: row;
}

.classify div p {
  padding: 0 0.15rem 0 0.1rem;
  border-left: 5px solid #fb98c5;
  white-space: nowrap;
}

.classify ul {
  overflow: hidden;
}

.classify ul li {
  float: left;
  margin-right: 0.3rem;
}
.q_xuan>span {
  position: relative;
  margin-right: 0.3rem;
}
.q_xuan>span img{
  position: absolute;
  width: 0.15rem;
  height: 0.15rem;
  right: -0.12rem;
  top: -0.05rem;
}
.key_active {
  color: #2fc145;
}

main > p {
  color: #000;
  text-align: center;
  margin-bottom: 0.2rem;
  font-size: 0.3rem;
}
</style>