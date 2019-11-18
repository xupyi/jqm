<template>
  <div>
    <header_ />
    <div id="designer">
      <p v-if="condition">
        当前位置：施工 > 施工长 >
        <span>施工长详情</span>
      </p>
      <p v-else>
        当前位置：设计 > 设计师 >
        <span>设计师详情</span>
      </p>
      <img :src="designer_datas.avatar" alt="" />
      <main>
        <section class="designer_des">
          <div class="space_div1">
            <span>{{designer_datas.xing}}{{designer_datas.name}}</span>
         
              <span>{{designer_datas.province_name}} {{designer_datas.city_name}}</span>
            
          </div>
          <div class="roule_div">
            <span>擅长：</span>
            <div>
              <span v-for="(item, index) in GoodArea" :key="index">{{item}}</span>
            </div>
          </div>
          <div v-if="!condition" class="space_div">
            <span>收费标准：</span>
            <p>
              <span>
                <span>￥{{parseInt(designer_datas.design_price)}} </span>元/平米
              </span>
              <span class="select" @click="select_tap">选择指定</span>
            </p>
          </div>
        </section>
        <section class="designer_cv">
          <!-- <div v-if="!condition">
            <p @click="designer_nav_tap(1)" :style="{background:designer_nav==1?'#2fc145':''}">详细简历</p>
            <p @click="designer_nav_tap(2)" :style="{background:designer_nav==2?'#2fc145':''}">顾客评价</p>
          </div>-->
          <div>详细简历</div>
          <ul>
            <li>
              <span>工作城市：</span>
              {{designer_datas.province_name}}{{designer_datas.city_name}}
            </li>
            <li>
              <span>真实姓名：</span>
              {{designer_datas.xing}}{{designer_datas.name}}
            </li>
            <li>
              <span>联系方式：</span>
              {{designer_datas.mobile}}
            </li>
            <li class="roule_div">
              <span>擅长：</span>

              <div>
                <span v-for="(item, index) in GoodArea" :key="index">{{item}}</span>
              </div>
            </li>
            <li v-if="designer_datas.say_to_user!=''">
              <span>最想和顾客说的一句话：</span>
              <p>{{designer_datas.say_to_user}}</p>
            </li>
            <li v-if="designer_datas.show_picture!=''">
              <span v-if="condition">施工作品：</span>
              <span v-else>设计作品：</span>
              <div class="show_pics">
                <img
                  @click="big_pic(index)"
                  v-for="(item, index) in designer_datas.show_picture"
                  :key="index"
                  :src="item"
                  alt
                />
              </div>
            </li>
          </ul>
          <!-- <div v-else>
              <assess  :assess="designer_datas.id" :shop='"sheji"' />
          </div>-->
        </section>
      </main>
    </div>
  </div>
</template>
<script>
import request from "@/request.js";
import header_ from "../back_header.vue";
import assess from "../assess.vue";
export default {
  components: { header_, assess },
  data() {
    return {
      condition: "",
      designer_datas: {},
      GoodArea: [],
      designer_nav: 1
    };
  },
  created() {
    var newsID = this.$route.query.id;
    this.goods_ = newsID;
    if (this.$route.query.type == "constructor") {
      this.condition = true;
    }
    request({
      url: "/api/getUserInfo",
      data: { user_id: newsID ,user_type:this.$route.query.type},
      method: "post"
    }).then(data => {
      console.log(data.data);
      if (data.data.status == 200) {
        this.designer_datas = data.data.data;
        this.GoodArea=data.data.data.goods_types_detail?data.data.data.goods_types_detail.split(','):''
      }
    });
  },
  methods: {
    big_pic(index) {
      this.$store.state.amplify_img=this.designer_datas.show_picture[index];
    },
    designer_nav_tap(i) {
      this.designer_nav = i;
    },
    select_tap() {
      console.log(this.designer_datas.price);
      this.$router.push({
        path: "home/design",
        query: { designer_id: this.$route.query.id }
      });
    }
  }
};
</script>
<style scoped>
#designer {
  top: 0.9rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}

#designer > p {
  font-size: 0.26rem;
  padding: 0.2rem 0.22rem;
}

#designer > p span {
  color: #2fc145;
}

#designer > img {
  object-fit: contain;
  display: block;
  width: 100%;
  height: 5rem;
}

.designer_des {
  padding: 0.22rem 0.22rem 0.25rem;
  font-size: 0.28rem;
  line-height: 0.5rem;
}

.designer_des .roule_div {
  padding: 0.1rem 0;
  display: flex;
  flex-direction: row;
}
.designer_des .space_div1 {
  display: flex;
  align-items: center;
}
.space_div1 span{
  margin-right: 0.5rem;
}
.roule_div {
  display: flex;
  flex-direction: row;
}
.roule_div>span{
  white-space: nowrap;
}
.roule_div div span{
  font-size: 0.28rem;
  margin-right: 0.4rem;
}
.designer_des .space_div {
  display: flex;
  align-items: center;
}
/* .designer_des > p {
  display: flex;
  justify-content: space-between;
  align-items: center;
} */
.space_div > span {
  white-space: nowrap;
}
.space_div p {
  align-items: center;
  width: 100%;
  display: flex;
}
.space_div p span span {
  color: #f10072;
  font-size: 0.36rem;
}

.space_div .select {
  margin-left: 0.5rem;
  background: #f10072;
  color: white;
  border-radius: 0.14rem;
  padding: 0.05rem 0.3rem 0.01rem;
}

.designer_cv > div {
  font-size: 0.3rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: #494949;
  padding: 0.18rem 0.4rem;
}
.designer_cv ul {
  padding: 0.3rem 0.22rem;
  font-size: 0.28rem;
}

.designer_cv li {
  line-height: 0.6rem;
}

.designer_cv li > p {
  font-size: 0.24rem;
  line-height: 0.4rem;
}

.show_pics {
  margin-top: 0.1rem;
}
.show_pics img {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0.2rem 0.2rem 0;
}

</style>