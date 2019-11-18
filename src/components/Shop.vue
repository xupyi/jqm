<template>
  <div>
    <div class="shop">
      <div class="nav">
        <span @click="nav_tap(1)" :class="nav_index==1?'fir':''">商品</span>
        <span @click="nav_tap(4)" :class="nav_index==4?'fir':''">设计</span>
        <span @click="nav_tap(3)" :class="nav_index==3?'fir':''">施工</span>
        <span @click="nav_tap(2)" :class="nav_index==2?'fir':''">精装套餐</span>
      </div>
      <!-- 商品 -->
      <section v-if="nav_index==1" class="section_1">
        <p class="iton" v-if="shop_lists==''">暂没有选购商品</p>
        <ul v-else>
          <li v-for="(item, index) in shop_lists" :key="index">
            <div class="li_title">
              <p>
                {{item.manufactor_name}}
                <span @click="customer_service(item.wx_qrcode)">联系客服</span>
              </p>
            </div>
            <div
              class="li_cont"
              :style="{background:goods.is_add?'#FFF9E3':''}"
              v-for="(goods, goods_index) in item.goods_list"
              :key="goods_index"
            >
              <div class="goods_l">
                <img
                  class="select_img"
                  @click="select_tap(index,goods_index,goods.id)"
                  :src="goods.is_add?active:nomore"
                />
                <div class="goods_l_cont" @click="go_shop_detail(goods.good_id)">
                  <img :src="goods.gpics" alt />
                  <div class="goods_cont">
                    <p>{{goods.show_title}}</p>
                    <p v-if="goods.subject_info.caizhi!=''">颜色/分类：{{goods.subject_info.caizhi}}</p>
                    <p v-if="goods.subject_info.color!=''">尺寸：{{goods.subject_info.color}}</p>
                    <p v-if="goods.subject_info.size!=''">材质：{{goods.subject_info.size}}</p>
                    <p>
                      <span>￥{{goods.price}}</span>
                      <span>x {{goods.num}}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="goods_r">
                <span
                  @click="sc_tap(goods.good_id,index,goods_index)"
                >{{goods.is_collection==1?'已收藏':"移入收藏夹"}}</span>
                <span @click="del_shop(goods.id,index,goods_index)">删除</span>
                <div class="ipt">
                  <span class="number_j" @click="order_jian(goods.id,index,goods_index)">-</span>
                  <input
                    type="number"
                    v-model="goods.num"
                    @blur="chang($event,goods.id,index,goods_index)"
                  />
                  <span class="number_j" @click="order_jia(goods.id,index,goods_index)">+</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <!-- 设计和施工套餐 -->
      <section class="section_2" v-if="nav_index==4||nav_index==3||nav_index==2">
        <p class="iton" v-if="shop_lists==''&&nav_index==4">暂没有选购设计</p>
        <p class="iton" v-if="shop_lists==''&&nav_index==3">暂没有选购施工</p>
        <p class="iton" v-if="shop_lists==''&&nav_index==2">暂没有选购套餐</p>
        <ul v-else>
          <li v-for="(item, index) in shop_lists" :key="index">
            <div class="li_title">
              <div @click="select_tap1(index)">
                <img :src="item.is_add?active:nomore" alt />
                <p>
                  {{item.title}}
                  <span @click="customer_service(item.customer_wx_qrcode,item.customer_name)">联系客服</span>
                </p>
              </div>
            </div>
            <div class="li_cont">
              <div :style="{background:item.is_add?'#FFF9E3':''}">
                <div class="goods_l_cont">
                  <img :src="item.gpics" alt />
                  <div class="goods_cont" v-if="item.title">
                    <p>{{item.title}}每平方米单价 {{parseInt(item.price)}} 元</p>
                    <p v-if="nav_index==4">待设计房屋面积 {{item.area}} 平方米</p>
                    <p v-else>待施工房屋面积 {{item.area}} 平方米</p>
                    <p class="zd_" v-if="nav_index==4&&item.design_user_id!=0&&item.design_user_info">
                      <span>指定设计师：</span>
                      <span>
                        <span>{{item.design_user_info.nickname}}</span>
                        <span>{{item.design_user_info.mobile}}</span>
                      </span>
                    </p>
                  </div>
                </div>
                <div class="goods_r">
                  <span @click="del_shop1(item.id,index)" >删除</span>
                  <p @click="taocan_true_tap(index)" v-if="nav_index==2||nav_index==4">展开选项</p>
                </div>
              </div>
              <div
                class="taocan_true"
                :style="{background:item.is_add?'#FFF9E3': 'white'}"
                v-if="taocan_true===index"
              >
                <p>项目内容：{{item.user_choice_show_title}}</p>
                <div>
                  <img
                    @click="big_img(i_img)"
                    v-for="(i_img, index) in item.user_choice_show_image"
                    :key="index"
                    :src="i_img"
                    alt
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <div v-if="is_shadow" class="shadow" @touchmove.prevent>
        <div>
          <p class="head">
            {{name}}
            <img @click="x_tap" src="../assets/home_img/x_1.png" alt />
          </p>
          <div class="cont">
            <img :src="code" alt />
            <p>长按上面的二维码，关注客服微信号</p>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="shop_l">
        <img @click="all_select_tap" :src="is_radio?active:nomore" alt /> 全选
        <span @click="del_shop()">删除</span>
      </div>
      <div class="shop_r">
        <div class="totle_price">
          <span>合计:</span>
          <span>￥{{price}}</span>
        </div>
        <div @click="settle" class="settle">结算({{total_num}})</div>
      </div>
    </footer>
    <div class="foot">
      <Tabbar />
    </div>
  </div>
</template>
<script>
import request from "@/request";
import Tabbar from "../views/Tabbar";
import utils from "@/utils";
export default {
  components: { Tabbar },
  data() {
    return {
      taocan_true: "",
      code: "",
      name:'',
      nav_index: "",
      is_shadow: false,
      shop_lists: [],
      price: "0.00",
      is_radio: false,
      active: require("../assets/home_img/dui.png"),
      nomore: require("../assets/home_img/yuan.png"),
      all_data: "",
      total_num: 0,
    };
  },
  created() {
    this.$store.state.title_name = "我的购物车";
    sessionStorage.activeid = 3;
    this.$store.commit("show_looding");
    if (sessionStorage.getItem("shop_index")) {
      this.nav_index = sessionStorage.getItem("shop_index");
      this.get_list(sessionStorage.getItem("shop_index"));
      sessionStorage.removeItem("shop_index");
    } else {
      this.nav_index = 1;
      this.get_list(1);
    }
  },
  methods: {
    // 图片放大
    big_img(url) {
      this.$store.state.amplify_img = url;
    },
    go_shop_detail(id) {
      // 去商品页面
      this.$router.push({ path: "/shop_detail", query: { id: id } });
    },
    // 套餐详情
    taocan_true_tap(index) {
      this.taocan_true = this.taocan_true === index ? "" : index;
    },
    // 收藏
    sc_tap(i, idx, index) {
      if (this.shop_lists[idx].goods_list[index].is_collection == 1) {
        this.$toast("该商品已收藏");
      } else {
        request({
          url: "/api/addUserCollectionGoods",
          data: { goods_id: i },
          method: "post"
        }).then(data => {
          console.log(data.data);
          this.$toast("收藏成功");
          this.shop_lists[idx].goods_list[index].is_collection = 1;
        });
      }
    },
    nav_tap(i) {
      this.nav_index = i;
      this.total_num=0
      // this.shop_lists = [];
      this.is_radio = false;
      this.taocan_true = "";
      this.get_list(i);
    },
    // 关闭客服
    x_tap() {
      this.is_shadow = false;
    },
    // 联系客服
    customer_service(wx_qrcode,name) {
      
      if(this.nav_index==1){
        this.code =wx_qrcode
        this.name='客服二维码'
      }else{
        this.code =wx_qrcode
        this.name=name
      }
      this.is_shadow = !this.is_shadow;
    },
    // 单个商品选中
    select_tap(idx, index, shop_id) {
      this.shop_lists[idx].goods_list[index].is_add = !this.shop_lists[idx]
        .goods_list[index].is_add;
      let num = 0;
      for (let i = 0; i < this.all_data.length; i++) {
        if (this.all_data[i].is_add) {
          num += 1;
        }
      }
      this.total_price();
      this.is_radio = num == this.all_data.length ? true : false;
    },
    select_tap1(index) {
      // console.log(this.shop_lists[index]);
      this.shop_lists[index].is_add = !this.shop_lists[index].is_add;
      let num = 0;
      for (let i = 0; i < this.shop_lists.length; i++) {
        if (this.shop_lists[i].is_add) {
          num += 1;
        }
      }
      this.total_price();
      this.is_radio = num == this.shop_lists.length ? true : false;
    },
    // 结算
    settle() {
      if (this.total_num == 0) {
        this.$toast("请选择要购买的商品！");
      } else {
        let car_ids = [];
        var data = this.nav_index == 1 ? this.all_data : this.shop_lists;

        for (let index = 0; index < data.length; index++) {
          if (data[index].is_add) {
            car_ids.push(data[index].id);
          }
        }
        let val = car_ids.join();
        console.log();
        request({
          url: "/api/cart/getCarListInfo",
          data: { cart_ids: car_ids.join(), order_type: this.nav_index },
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            this.$router.push({
              path: "/settle",
              query: {
                cart_ids: car_ids.join(),
                order_type: this.nav_index
              }
            });
          } else {
            this.$toast(data.data.msg);
          }
        });
      }
    },
    // 全选
    all_select_tap() {
      this.is_radio = !this.is_radio;
      if (this.nav_index == 1) {
        if (this.is_radio) {
          for (let index = 0; index < this.all_data.length; index++) {
            this.all_data[index].is_add = true;
          }
        } else {
          for (let index = 0; index < this.all_data.length; index++) {
            this.all_data[index].is_add = false;
          }
        }
      } else {
        if (this.is_radio) {
          for (let index = 0; index < this.shop_lists.length; index++) {
            this.shop_lists[index].is_add = true;
          }
        } else {
          for (let index = 0; index < this.shop_lists.length; index++) {
            this.shop_lists[index].is_add = false;
          }
        }
      }

      this.total_price();
    },
    chang(e, order_id, idx, index) {
      console.log(e.target.value, 111);
      var num = e.target.value;
      if (!/^[1-9]{1,}[\d]*$/.test(num)) {
        this.$toast("最少选择一件商品");
        num = 1;
      }
      request({
        url: "/api/changeCartNumber",
        data: { cart_id: order_id, status: 1, num: num },
        method: "post"
      }).then(data => {
        if (data.data.status == 200) {
          this.shop_lists[idx].goods_list[index].num = num;
          this.total_price();
        }
      });
    },
    // 商品数量减
    order_jian(order_id, idx, index) {
      request({
        url: "/api/changeCartNumber",
        data: { cart_id: order_id, status: 0 },
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.shop_lists[idx].goods_list[index].num == 1
            ? (1, this.$toast("最少选择一件商品！"))
            : this.shop_lists[idx].goods_list[index].num--;
          this.total_price();
        }
      });
    },
    // 商品数量加
    order_jia(order_id, idx, index) {
      request({
        url: "/api/changeCartNumber",
        data: { cart_id: order_id, status: 1 },
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.shop_lists[idx].goods_list[index].num++;
          this.total_price();
        }
      });
    },
    // 总价
    total_price() {
      var abx = 0,
        num = 0;
      if (this.nav_index == 1) {
        for (let index = 0; index < this.all_data.length; index++) {
          if (this.all_data[index].is_add) {
            num++;
            abx += utils.accMul(
              this.all_data[index].price,
              this.all_data[index].num
            );
          }
        }
        for (let index = 0; index < this.shop_lists.length; index++) {
          var al = 0;
          for (let f = 0; f < this.shop_lists[index].goods_list.length; f++) {
            const element = this.shop_lists[index].goods_list[f];
            if (element.is_add) {
              al += utils.accMul(element.price, element.num);
            }
          }
          this.shop_lists[index].all_total = utils.jia1(al);
        }
      } else {
        for (let index = 0; index < this.shop_lists.length; index++) {
          if (this.shop_lists[index].is_add) {
            num++;
            abx += utils.jia1(this.shop_lists[index].total_sum);
          }
        }
      }
      this.total_num = num;
      console.log(abx, 11111);
      this.price = abx.toFixed(2);
    },
    // 商品删除、
    del_shop(id, idx, index) {
      // 单个商品
      if (id) {
        request({
          url: "/api/delCart",
          data: { cart_id: id },
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            this.$toast("删除成功");
            this.total_price();
            if (this.shop_lists[idx].goods_list.length == 1) {
              this.shop_lists.splice(idx, 1);
              return;
            } else {
              this.shop_lists[idx].goods_list.splice(index, 1);
            }
          }
        });
      } else {
        // 多个商品
        var list_Id = [];
        if (this.nav_index == 1) {
          for (let index = 0; index < this.all_data.length; index++) {
            if (this.all_data[index].is_add) {
              list_Id.push(this.all_data[index].id);
            }
          }
        } else {
          for (let index = 0; index < this.shop_lists.length; index++) {
            if (this.shop_lists[index].is_add) {
              list_Id.push(this.shop_lists[index].id);
            }
          }
        }
        console.log(list_Id);
        if (list_Id != "") {
          request({
            url: "/api/delCart",
            data: { cart_id: list_Id.join() },
            method: "post"
          }).then(data => {
            console.log(data.data);
            if (data.data.status == 200) {
              this.$toast("删除成功");
              this.is_radio = false;
              this.total_num = 0;
              this.get_list(this.nav_index);
            }
          });
        } else {
          this.$toast("请选择要删除的商品");
        }
      }
    },
    // 设计施工套餐删除
    del_shop1(id, index) {
      if (id) {
        request({
          url: "/api/delCart",
          data: { cart_id: id },
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            this.$toast("删除成功");
            this.shop_lists.splice(index, 1);
          }
        });
      }
    },
    get_list(i) {
      this.price = "0.00";
      this.$store.commit("show_looding");
      request({
        url: "/api/getUserCartList",
        data: { order_type: i },
        method: "post"
      }).then(data => {
        console.log(data.data);
        this.$store.commit("hide_looding");
        if (data.data.status == 200) {
          // 添加一条属性判断多选
          // i==1 商品/ ==2  套餐 /==3 施工 / ==4 设计
          var array = [];
          if (data.data.data == "") {
            this.shop_lists = "";
          } else {
            for (let index = 0; index < data.data.data.length; index++) {
              const element = data.data.data[index];
              data.data.data[index].all_total = "0";
              if (i == 1) {
                for (let i = 0; i < element.goods_list.length; i++) {
                  element.goods_list[i].is_add = false;
                  array.push(element.goods_list[i]);
                  this.all_data = array;
                  this.shop_lists = data.data.data;
                }
              } else {
                data.data.data[index].is_add = false;
                this.shop_lists = data.data.data;
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.nav {
  background: white;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  align-items: center;
}
.nav span {
  font-size: 0.24rem;
  padding: 0.1rem 0;
  width: 23%;
  text-align: center;
  border: 1px solid #00cc00;
  border-radius: 0.1rem;
}
.fir {
  color: white !important;
  background: #00cc00 !important;
}
.iton {
  text-align: center;
  color: #000;
  padding: 0.2rem;
  background: white;
}

.shop {
  margin: 0.9rem 0 1.8rem;
  position: fixed;
  top: 0rem;
  bottom: 0rem;
  left: 0;
  right: 0;
  font-size: 0.3rem;
  overflow-y: auto;
}
/* ========================内容=============================== */
.section_1 {
  background: #a7d6e3;
  padding: 0.2rem 0;
}
.section_2 {
  background: #a7d6e3;
  padding: 0.2rem 0;
}
.section_1 li {
  margin-bottom: 0.2rem;
  background: white;
}
.section_1 li:last-child {
  margin-bottom: 0;
}
.section_1 .li_title {
  background: white;
  padding: 0.1rem 0.3rem 0.1rem 0.2rem;
}
.li_title p {
  color: #000;
  font-size: 0.28rem;
  flex: 1;
}
.li_title p span {
  margin-left: 0.5rem;
  color: #ff349d;
}
.section_1 .li_cont {
  padding: 0.2rem;
  border-top: 1px solid #a6a6a6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.section_1 .li_cont > div:first-child {
  height: 100%;
  font-size: 0.26rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.goods_l {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.goods_l > img {
  width: 0.42rem;
  height: 0.42rem;
}
.section_1 .goods_l_cont {
  margin-left: 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.section_2 .goods_l_cont {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.goods_l_cont img {
  background: white;
  width: 1.8rem;
  height: 1.8rem;
}
.goods_cont {
  line-height: 0.4rem;
  margin-left: 0.2rem;
}
.section_1 .goods_cont span:first-child {
  font-weight: bold;
  color: #ff349d;
  font-size: 0.3rem;
}
.section_1 .goods_cont span {
  margin-right: 0.2rem;
}
.zd_>span:first-child{
  white-space: nowrap;
}
.zd_>span:last-child{
  display: flex;
  flex-direction: column;
}
.zd_{
  display: flex;
  flex-direction: row;
}
.goods_r {
  font-size: 0.26rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.goods_r > span {
  color: #ff349d;
  margin-bottom: 0.4rem;
}
.goods_r>span:last-child{
  margin-bottom: 0 !important;
}
.goods_r p {
  color: #ff349d;
}
.goods_r > div {
  /* width: 1.5rem; */
  display: flex;
  align-items: center;
}
.ipt {
  border: 1px solid #7f7f7f;
  border-radius: 0.1rem;
}
.number_j {
  line-height: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.4rem;
}
.ipt input {
  line-height: 0.4rem;
  width: 0.8rem;
  text-align: center;
  border-left: 1px solid #7f7f7f;
  border-right: 1px solid #7f7f7f;
}
.section_2 .li_title div {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.li_title div p {
  margin-left: 0.3rem;
}
.section_2 .li_title {
  background: white;
  display: flex;
  padding: 0.1rem 0.2rem;
}
.section_2 .li_cont > div:first-child {
  background: white;
  height: 100%;
  font-size: 0.26rem;
  border-top: 1px solid #a6a6a6;
  padding: 0.2rem 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.section_2 li {
  margin-bottom: 0.2rem;
}
.section_2 li:last-child {
  margin-bottom: 0;
}
.section_2 .li_title img {
  width: 0.42rem;
  height: 0.42rem;
}
.section_2 .goods_cont {
  line-height: 0.6rem;
}
.section_2 .goods_l_cont img {
  width: 1.8rem;
  height: 1.8rem;
}

.taocan_true {
  padding: 0 0.2rem 0.1rem;
}
.taocan_true div {
  margin-top: 0.1rem;
}
.taocan_true div img {
  width: 19%;
  height: 19%;
  margin: 0 1.25% 0.1rem 0;
}
.taocan_true div img:nth-child(5n) {
  margin-right: 0;
}
/* ----------------------------------------------- */
footer {
  border-top: 0.3px solid #a6a6a6;
  background: #f2f2f2;
  height: 0.8rem;
  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;
  font-size: 0.28rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

footer span {
  color: #ff349d;
}

.shop_l {
  display: flex;
  align-items: center;
}

.shop_l img {
  margin: 0 0.2rem 0;
  width: 0.42rem;
  height: 0.42rem;
}

.shop_l span {
  margin-left: 0.4rem;
}

.shop_r {
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 0.8rem;
}

.shop_r span:first-child {
  color: #000 !important;
}

.shop_r .totle_price {
  display: flex;
  align-items: center;
  max-width: 3rem;
  overflow: hidden;
  white-space: nowrap;
}

.settle {
  height: 0.8rem;
  margin-left: 0.2rem;
  width: 1.6rem;
  background: #ff349d;
  color: white;
  text-align: center;
}

/* shadow--------------------------------】 */

.shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.shadow > div {
  width: 5.4rem;
  margin: 4rem auto;
  border-radius: 0.1rem;
  overflow: hidden;
}

.shadow .head {
  position: relative;
  height: 0.76rem;
  line-height: 0.76rem;
  text-align: center;
  font-size: 0.36rem;
  background: #ff349d;
  color: white;
}

.shadow .head img {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  right: 0.3rem;
  top: 0.2rem;
}

.shadow .cont {
  padding: 0.4rem;
  background: white;
  text-align: center;
}
.shadow .cont img {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
}
.shadow .cont p {
  padding-top: 0.1rem;
  font-size: 0.28rem;
  text-align: center;
  color: #666;
}
.yin {
  padding: 0 0.2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
}
.yin p {
  padding: 0.1rem 0;
  font-size: 0.26rem;
}
.yin div {
  line-height: normal;
  font-size: 0;
}
.yin img {
  margin: 0 0.2rem 0.2rem 0;
  width: 1rem;
  height: 1rem;
}
</style>