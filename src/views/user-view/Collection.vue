<template>
  <div id="collection">
    <h3>我收藏的商品</h3>
    <ul>
      <li
        :style="{background:item.is_true?'#FEF8DA':''}"
        v-for="(item, index) in collection_list"
        :key="index"
      >
        <div class="left">
          <img @click="is_true(item.goods_id,index)" :src="item.is_true?active:nomore" alt />
          <div class="msg" @click="go_detail(item.goods_id)">
            <img :src="item.gpics[0]" alt />
            <div>
              <p>{{item.manufactor_name}} {{item.show_title}}</p>
              <span>￥{{item.price}}</span>
            </div>
          </div>
        </div>
        <div @click="del_tap(item.goods_id,index)" class="del">删除</div>
      </li>
    </ul>
    <div class="footer">
      <div class="foot_se" @click="foot_tap">
        <img :src="foot?active:nomore" alt />
        <span>全选</span>
      </div>
      <div class="foot_del" @click="dels_tap">删除</div> 
    </div>
  </div>
</template>
<script>
import request from "@/request";
export default {
  data() {
    return {
      foot: false,
      collection_list: [],
      active: require("../../assets/home_img/dui.png"),
      nomore: require("../../assets/home_img/yuan.png"),
      del_list: []
    };
  },
  created() {
    this.getdata();
  },
  watch: {
    collection_list() {
      if (this.collection_list == "") {
        this.foot = false;
      }
    }
  },
  methods: {
    is_true(i, ind) {
      let a = this.del_list.indexOf(i);
      if (a != -1) {
        this.del_list.splice(a, 1);
        this.collection_list[ind].is_true = false;
      } else {
        this.del_list.push(i);
        this.collection_list[ind].is_true = true;
      }
      if (this.del_list.length == this.collection_list.length) {
        this.foot = true;
      } else {
        this.foot = false;
      }
      console.log(this.del_list);
    },
    go_detail(i) {
      this.$router.push({ path: "/shop_detail", query: { id: i } });
    },
    foot_tap() {
      this.foot = !this.foot;
      this.del_list = [];
      if (this.foot) {
        for (let index = 0; index < this.collection_list.length; index++) {
          this.collection_list[index].is_true = true;
          this.del_list.push(this.collection_list[index].goods_id);
        }
      } else {
        for (let index = 0; index < this.collection_list.length; index++) {
          this.collection_list[index].is_true = false;
        }
      }
      console.log(this.del_list);
    },
    // 删除
    del_tap(i, index) {
      this.$store.commit("show_looding");
      if (i) {
        request({
          url: "/api/delCollectionGoods",
          data: { goods_id: i },
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.data.status == 200) {
            this.$toast("删除成功！");
            this.collection_list.splice(index, 1);
          } else {
            console.log(data);
          }
          this.$store.commit("hide_looding");
        });
      }
    },
    dels_tap() {
      console.log(this.del_list.join());
      if (this.del_list.join().length == 0) {
        this.$toast("请选择商品");
        return;
      }
      request({
        url: "/api/delCollectionGoods",
        data: { goods_id: this.del_list.join() },
        method: "post"
      }).then(data => {
        console.log(data);
        this.$toast("删除成功！");
        this.getdata();
      });
    },
    getdata() {
      this.$store.commit("show_looding");
      request({
        url: "/api/getUserCollectionGoods",
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          for (let index = 0; index < data.data.data.length; index++) {
            data.data.data[index].is_true = false;
          }
          this.collection_list = data.data.data;
          console.log(data.data.data);
        } else {
          console.log(data);
          this.$toast(data.data.msg);
        }
        this.$store.commit("hide_looding");
      });
    }
  }
};
</script>
<style scoped>
#collection > h3 {
  font-weight: bold;
  font-size: 0.36rem;
  text-align: center;
  padding: 0.2rem 0;
  border-bottom: 0.3px solid #7f7f7f;
}
ul{
  margin-bottom: 1rem;
}
li {
  font-size: 0.28rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.23rem;
  border-bottom: 0.3px solid #7f7f7f;
}
.left {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.left > img {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.2rem;
}
li .msg img {
  border: 0.3px solid #ccc;
  width: 1.75rem;
  height: 1.25rem;
}

li .del {
  font-size: 0.28rem;
  color: #eb1b84;
  padding: 0.05rem 0.1rem;
  border-radius: 0.1rem;
}

li .msg {
  display: flex;
  flex-direction: row;
}
.msg p{
  font-size: 0.26rem;
}
li span {
  color: #eb1b84;
  font-size: 0.34rem;
}

li .msg div {
  margin: 0.1rem 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.footer {
  background: #f2f2f2;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 0.3px solid #7f7f7f;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
.foot_se {
  font-size: 0.3rem;
  display: flex;
  align-items: center;
}
.foot_se img {
  width: 0.4rem;
  height: 0.4rem;
  margin: 0 0.1rem 0 0.23rem;
}
.foot_del {
  font-size: 0.3rem;
  background: #fd2692;
  padding: 0.2rem 0.5rem;
  color: white;
}
</style>