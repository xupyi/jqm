<template>
  <div class="assess">
    <ul>
      <li @click="get_type_data('','')" :class="nav_act==1?'act':''">全部 ({{evaluate.all_evaluate}})</li>
      <li @click="get_type_data('1','')" :class="nav_act==2?'act':''">有图 ({{evaluate.picture_evaluate}})</li>
      <li @click="get_type_data('','1')" :class="nav_act==3?'act':''">追评 ({{evaluate.append_evaluate}})</li>
    </ul>
    <section>
      <div v-for="(item, index) in deta_list" :key="index">
        <div class="des_view">
          <div class="avatar">
            <img :src="item.avatar" alt />
          </div>
          <div>
            <p class="time">
              {{item.xing}}{{item.name}}
              <span>{{item.created_at}}</span>
            </p>
            <p class="time">
              {{item.manufactor_name}} <span> {{item.show_title}}</span>
            </p>
            <p v-if="shop!='shop'">{{item.room_address_detail}}</p>
          </div>
        </div>
        <p class="des" v-if="shop!='shop'">
          面积：
          <span>{{item.area}}平米</span>
        </p>
        <div v-if="shop=='shop'&&item.subject_info" class="shop_des">
          颜色/分类：<span>{{item.subject_info.color}}</span>
          尺寸：<span>{{item.subject_info.size}}</span>
          材质：<span>{{item.subject_info.caizhi}} </span>
        </div>
        <div class="pingjia" v-if="shop=='taocan'">
          <p>评价：</p>
          <div>
            <p>
              <span>设计效果：</span>
              <img v-for="(item, index) in item.effect" :key="index" src="../assets/home_img/star_biu.png" alt />
            </p>
            <p>
              <span>施工队服务：</span>
              <img v-for="(item, index) in item.experience" :key="index" src="../assets/home_img/star_biu.png" alt />
            </p>
            <p>
              <span>施工效果：</span>
              <img v-for="(item, index) in item.service" :key="index" src="../assets/home_img/star_biu.png" alt />
            </p>

            <p>
              <span>软件体验：</span>
              <img v-for="(item, index) in item.goods_grade" :key="index" src="../assets/home_img/star_biu.png" alt />
            </p>
          </div>
        </div>
        <div class="pingjia" v-else-if="shop=='shop'">
          <p>评价：</p>
          <div>
            <p>
              <span>质量：</span>
              <img v-for="(item, index) in item.effect" :key="index" src="../assets/home_img/star_biu.png" alt />
            </p>
            <p>
              <span>外观：</span>
              <img v-for="(item, index) in item.experience" :key="index" src="../assets/home_img/star_biu.png" alt />
            </p>
            <p>
              <span>物流：</span>
              <img v-for="(item, index) in item.service" :key="index" src="../assets/home_img/star_biu.png" alt />
            </p>

            <p>
              <span>服务：</span>
              <img v-for="(item, index) in item.goods_grade" :key="index" src="../assets/home_img/star_biu.png" alt />
            </p>
          </div>
        </div>
        <div class="pingjia" v-else>
          <p>评价：</p>
          <div>
            <p>
              <span>设计效果：</span>
              <img v-for="(item, index) in item.effect" :key="index" src="../assets/home_img/star_biu.png" alt />
            </p>
            <p>
              <span>设计师服务：</span>
              <img v-for="(item, index) in item.service" :key="index" src="../assets/home_img/star_biu.png" alt />
            </p>
            <p>
              <span>软件体验：</span>
              <img v-for="(item, index) in item.experience" :key="index" src="../assets/home_img/star_biu.png" alt />
            </p>
          </div>
        </div>
        <p class="cont">{{item.evaluate_content}}</p>
        <ul class="pic_list" v-if="item.picture!=''||item.picture!=null">
          <li @click="big_pic(pic)" v-for="(pic, pic_index) in item.picture" :key="pic_index">
            <img :src="pic" alt />
          </li>
        </ul>
        <div class="zhuiping" v-if="item.append_evaluate_content">
          追评：<span>{{item.updated_at}}</span>
          <p class="cont">{{item.append_evaluate_content}}</p>
        </div>
        <ul class="pic_list" v-if="item.append_picture!=''||item.append_picture!=null">
          <li @click="big_pic(pic)" v-for="(pic, pic_index) in item.append_picture" :key="pic_index">
            <img :src="pic" alt />
          </li>

        </ul>
      </div>
      <p>没有更多评价了</p>
    </section>
  </div>
</template>
<script>
  import request from "@/request.js";
  export default {
    props: ["assess", "shop"],
    data() {
      return {
        evaluate: '',
        deta_list: [],
        nav_act: "1",
        url: '',
      };
    },
    watch: {
      assess() {
        this.get_type_data("", "");
      }
    },
    mounted() {
      if (this.shop == "sheji") {
        this.url = "/api/getDesignerEvaluateList"

      } else {
        this.url = "/api/getTranslateCommentList";
      }
      this.get_type_data("", "");
    },
    methods: {
      big_pic(pic_url) {
        this.$store.state.amplify_img = pic_url;
      },
      get_type_data(is_picture, is_append) {
        if(is_picture==1){
          this.nav_act=2
        }else if(is_append==1){
          this.nav_act=3
        }else{
          this.nav_act=1
        }
        request({
          url: this.url,
          data: {
            goods_id: this.assess,
            is_picture: is_picture,
            is_append: is_append
          },
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            this.evaluate = data.data.evaluate
            this.deta_list = data.data.data.data;
          }
        });
      }
    }
  };

</script>
<style scoped>
  /* 评价---------------------------------- */
  .assess>ul {
    display: flex;
    justify-content: space-between;
  }

  .act {
    border: 1px solid #4ab63f !important;
    color: #4ab63f;
  }

  .assess>ul>li {
    border: 1px solid #ccc;
    font-size: 0.26rem;
    width: 2.13rem;
    text-align: center;
    height: 0.6rem;
    line-height: 0.6rem;
    background: #FEF8DA;
  }

  section>div {
    font-size: 0.24rem;
    border-bottom: 8px solid #bdd7ee;
  }

  .avatar>img {
    width: 100%;
    height: 100%;
  }

  .avatar {
    border: 1px solid #FFC000;
    border-radius: 50%;
    margin-right: 0.2rem;
    width: 0.8rem;
    height: 0.8rem;
    overflow: hidden;
    background: #FEF8DA;
  }

  .des_view {
    margin: 0.2rem 0 0.1rem;
    display: flex;
    flex-direction: row;
  }

  .des_view>div {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }

  .des_view>div>p>span {
    margin-right: 1rem;
  }

  .time span {
    color: #888;
    margin-left: 0.2rem;
  }

  .des span {
    color: #999;
    margin-right: 0.5rem;
  }

  .pingjia {
    margin-top: 0.1rem;
    display: flex;
  }

  .pingjia div {
    line-height: 0.4rem;
    color: #000;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }

  .pingjia p span {
    color: #888;
  }

  .pingjia div p {
    display: flex;
    align-items: center;
    flex-direction: row;
    min-width: 3rem;
  }

  .pingjia div img {
    width: 0.25rem;
    height: 0.25rem;
  }

  .shop_des span {
    color: #666;
    margin-right: 0.2rem;
  }

  .assess .pic_list img {
    width: 100%;
    height: 100%;
  }

  .cont {
    margin-top: 0.1rem;
  }

  .pic_list {
    overflow: hidden;
    margin: 0.1rem 0 0;
  }

  .pic_list li {
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #999;
    width: 1.55rem;
    height: 1.5rem;
    margin: 0 2% 2% 0;
  }

  .zhuiping {
    padding-top: 0.1rem;
    border-top: 0.2px solid #999999;
  }

  .zhuiping span {
    color: #888;
  }

  section>p {
    text-align: center;
    padding: 0.3rem;
  }

</style>
