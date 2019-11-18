<template>
  <div>
    <back_header />
    <div id="select_set_meal">
      <p>{{title}}选择地墙顶造型</p>
      <section>
        <p>客餐厅吊顶造型</p>
        <ul>
          <li v-for="(item, index) in goodlist_data.goods_ceiling_molding" :key="index">
            <img @click="big_pic(item.jump_goods_id)" :src="item.picture_url" alt />
            <div @click="goods_ceiling_molding_tap(item.id)">
              <img :src="val.goods_ceiling_molding_id==item.id?active:normal" alt />
              <span :style="{color:val.goods_ceiling_molding_id==item.id?'#ff1284':''}">{{item.name}}</span>
            </div>
          </li>
        </ul>
      </section>
      <section>
        <p>地板、瓷砖</p>
        <ul>
          <li v-for="(item, index) in goodlist_data.goods_ceramic_tile" :key="index">
            <img @click="big_pic(item.jump_goods_id)" :src="item.picture_url" alt />
            <div @click="goods_ceramic_tile_tap(item.id)">
              <img :src="val.goods_ceramic_tile_id==item.id?active:normal" alt />
              <span :style="{color:val.goods_ceramic_tile_id==item.id?'#ff1284':''}">{{item.name}}</span>
            </div>
          </li>
        </ul>
      </section>
      <section>
        <p>橱柜</p>
        <ul>
          <li v-for="(item, index) in goodlist_data.goods_cupboard" :key="index">
            <img @click="big_pic(item.jump_goods_id)" :src="item.picture_url" alt />
            <div @click="goods_cupboard_tap(item.id)">
              <img :src="val.goods_cupboard_id==item.id?active:normal" alt />
              <span :style="{color:val.goods_cupboard_id==item.id?'#ff1284':''}">{{item.name}}</span>
            </div>
          </li>
        </ul>
      </section>
      <section>
        <p>墙面</p>
        <ul>
          <li v-for="(item, index) in goodlist_data.goods_metope_modeling" :key="index">
            <img @click="big_pic(item.jump_goods_id)" :src="item.picture_url" alt />
            <div @click="goods_metope_modeling_tap(item.id)">
              <img :src="val.goods_metope_modeling_id==item.id?active:normal" alt />
              <span :style="{color:val.goods_metope_modeling_id==item.id?'#ff1284':''}">{{item.name}}</span>
            </div>
          </li>
        </ul>
      </section>
      <div class="btn" @click="btn_tap">提交完成</div>
    </div>
    <div v-if="is_shadow" class="shadow">
      <div>
        <div class="cont">
          <h3>顾客您好！</h3>
          <p>您选择的信息已被系统保存，您提交的信息将作为设计参考依据，设计之前设计师还会与您进行详细沟通。</p>
        </div>
        <span @click="qued_tap">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
  import request from "@/request";
  import back_header from "../back_header.vue";
  export default {
    components: {
      back_header
    },
    data() {
      return {
        choice_id: "",
        is_shadow: false,
        goodlist_data: {},
        title: "",
        active: require("../../assets/home_img/dui.png"),
        normal: require("../../assets/home_img/yuan.png"),
        val: {
          good_id: "", //	是	string	商品id
          goods_ceiling_molding_id: "", //	是	string	所选吊顶对应的id
          goods_ceramic_tile_id: "", //	否	string	所选瓷砖对应的id
          goods_cupboard_id: "", //	是	string	所选橱柜对应的id
          goods_metope_modeling_id: ""
        }
      };
    },
    created() {
      var newsID = this.$route.query.id;
      this.val.good_id = newsID;
      this.title = this.$route.query.title;
      if (sessionStorage.getItem("tc_select")) {
        this.val = JSON.parse(sessionStorage.getItem("tc_select"));
      }
      // this.goods_id=newsID
      console.log(newsID);
      this.$store.commit("show_looding");
      request({
        url: "/api/getTranslateGoodList",
        data: {
          goods_id: newsID
        },
        method: "post"
      }).then(data => {
        console.log(data);
        this.$store.commit("hide_looding");
        if (data.status == 200) {
          this.goodlist_data = data.data.data;
        }
      });

      request({
        url: "/api/getUserTranslateGoodLog",
        method: "post"
      }).then(data => {
        console.log(data);
        this.$store.commit("hide_looding");
        if (data.data.status == 200) {
          if (data.data.data.goods_ceiling_molding_id) {
            this.val.goods_ceiling_molding_id = data.data.data.goods_ceiling_molding_id
            this.val.goods_ceramic_tile_id = data.data.data.goods_ceramic_tile_id,
              this.val.goods_cupboard_id = data.data.data.goods_cupboard_id,
              this.val.goods_metope_modeling_id = data.data.data.goods_metope_modeling_id
          }

        }
      });
    },
    methods: {
      //   商品链接
      big_pic(id) {
        sessionStorage.setItem("tc_select", JSON.stringify(this.val));
        this.$router.push({
          path: "shop_detail",
          query: {
            id: id
          }
        });
      },
      qued_tap() {
        console.log(this.choice_id);
        this.is_shadow = false;
        this.$router.push({
          path: "/home/setmeal",
          query: {
            choice_id: this.choice_id
          }
        });
      },
      // 吊顶
      goods_ceiling_molding_tap(id) {
        this.val.goods_ceiling_molding_id =
          this.val.goods_ceiling_molding_id == id ? "" : id;
      },
      // 瓷砖
      goods_ceramic_tile_tap(id) {
        this.val.goods_ceramic_tile_id =
          this.val.goods_ceramic_tile_id == id ? "" : id;
      },
      // 橱柜
      goods_cupboard_tap(id) {
        this.val.goods_cupboard_id = this.val.goods_cupboard_id == id ? "" : id;
      },
      goods_metope_modeling_tap(id) {
        this.val.goods_metope_modeling_id =
          this.val.goods_metope_modeling_id == id ? "" : id;
      },
      btn_tap() {
        console.log(this.val);
        if (this.val.goods_ceiling_molding_id == "") {
          this.$toast("请选择客厅吊顶造型");
        } else if (this.val.goods_ceramic_tile_id == "") {
          this.$toast("请选择地板、瓷砖");
        } else if (this.val.goods_cupboard_id == "") {
          this.$toast("请选择橱柜");
        } else if (this.val.goods_metope_modeling_id == "") {
          this.$toast("请选择墙面");
        } else {
          this.$store.commit("show_looding");
          request({
            url: "/api/addTranslateGood",
            data: this.val,
            method: "post"
          }).then(data => {
            this.$store.commit("hide_looding");
            if (data.data.status == 200) {
              this.is_shadow = true;
              this.choice_id = data.data.data.choice_id;
            }
          });
        }
      }
    }
  };

</script>
<style scoped>
  #select_set_meal {
    padding: 0 0.25rem 0.4rem;
    top: 0.9rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }

  #select_set_meal>p {
    color: #fd2391;
    padding: 0.2rem 0;
    font-size: 0.3rem;
  }

  section>p {
    margin-bottom: 0.2rem;
    font-size: 0.28rem;
  }

  section ul {
    overflow: hidden;
  }

  section li {
    font-size: 0;
    width: 48%;
    margin: 0 4% 4% 0;
    float: left;
    border: 0.5px solid #bfbfbf;
  }

  section li:nth-child(2n) {
    margin-right: 0;
  }

  section li>img {
    width: 100%;
    height: 2.26rem;
  }

  section li div {
    height: 0.7rem;
    justify-content: center;
    font-size: 0.26rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  section li div img {
    margin-right: 0.1rem;
    width: 0.33rem;
    height: 0.33rem;
  }

  .btn {
    margin: 0.4rem 00.2rem 1rem;
    padding: 0.15rem 0;
    background: #ff1284;
    color: white;
    font-size: 0.32rem;
    text-align: center;
    border-radius: 0.1rem;
  }

  .shadow {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  .shadow>div {
    border-radius: 0.1rem;
    width: 6rem;
    margin: 4rem auto;
    background: white;
    overflow: hidden;
  }

  .shadow .cont {
    padding: 0.3rem 0.4rem;
    justify-content: center;
    display: flex;
    text-align: center;
    flex-direction: column;
  }

  .shadow .cont h3 {
    margin-bottom: 0.2rem;
    font-size: 0.36rem;
  }

  .shadow .cont p {
    line-height: 0.5rem;
    text-align: left;
    font-size: 0.3rem;
  }

  .shadow span {
    display: block;
    width: 100%;
    padding: 0.15rem 0;
    text-align: center;
    color: white;
    font-size: 0.34rem;
    background: #ff1284;
  }

  .order p {
    color: #fd2691;
  }

</style>
