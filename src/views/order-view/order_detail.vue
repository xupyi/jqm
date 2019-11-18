<template>
  <div>
    <header_/>
    <div class="order_detail">
    <p v-if="type==2">精装套餐订单详情</p>
    <p v-if="type==3">施工订单详情</p>
    <p v-if="type==4">设计订单详情</p>
    <section class="address_info">
        <p>
          <img src="../../assets/dizhi.png" alt />
          <span>地址</span>
        </p>
        <div class="address">
          <p>
            {{order_detail.consignee}}
            <span>{{order_detail.mobile}}</span>
          </p>
          <p>{{order_detail.address_detail}}{{order_detail.address}}</p>
        </div>
      </section>
      <div class="line" ></div>
    <section class="order_number">
      <p>订单编号：{{order_detail.one_order_number}}</p>
      <span v-if="order_detail.goods_status==2" @click='confirm_tap(order_detail.one_order_number)'>确认收货</span>
    </section>
    <section class="order_time">订单时间：{{order_detail.created_at}}</section>
    <section  v-if="type==2" class="order_des">
      <p>{{order_detail.title}}：<span>￥{{order_detail.total_sum}}</span></p>
      <p>{{order_detail.title}}每平米单价：{{order_detail.price}}元</p>
      <p>房屋面积：{{order_detail.area}}平方米</p>
    </section>
    <section v-else class="order_des">
      <p>{{order_detail.title}}费：<span>￥{{order_detail.total_sum}}</span></p>
      <p>每平米{{order_detail.title}}费用：{{order_detail.price}}元</p>
      <p>待{{order_detail.title}}房屋面积：{{order_detail.area}}平方米</p>
    </section>
    
    <section class="xmnr" v-if="type==4||type==2&&order_detail.user_choice_show_image!=''">
      <p>项目内容：{{order_detail.user_choice_show_title}}</p>
      <ul>
        <li @click="big_pic(item)" v-for="(item, index) in order_detail.user_choice_show_image" :key="index">
          <img :src="item" alt="">
        </li>
      </ul>
    </section>
    <div class="line" v-if="type==4||type==2&&order_detail.user_choice_show_image!=''"></div>
    <section class="dis_people" v-if="type==4||type==2">
       <p>设计师：</p>
      <div v-if="design_user_info!=''">
        <p>姓名：<span>{{design_user_info.nickname}}</span></p>
        <div>
          <span>联系方式：</span>
          <p>
          <span>手机号 {{design_user_info.mobile}}</span>
        <span>微信号 {{design_user_info.weixin}}</span>
        </p>
        </div>
      </div>
      <div v-else>暂未指定设计师</div>
    </section>
    
    <div class="line" v-if="type==3||type==2" ></div>
    <section class="dis_people" v-if="type==3||type==2" >
      <p >施工长</p>
      <div v-if="constructor_user_info!=''">
        <p>姓名：<span>{{constructor_user_info.nickname}}</span></p>
        <div>
          <span>联系方式：</span>
           <p>
             <span>手机号 {{constructor_user_info.mobile}}</span>
             <span>微信号 {{constructor_user_info.weixin}}</span>
            </p>
        </div>
      </div>
      <div v-else>暂未指定施工长</div>
    </section>
    <div class="line" v-if="type==4||type==2" ></div>
    <section class="qj_720" v-if="type==4||type==2">
      <p>720°全景图：</p>
      <a v-if="quantity_room_info.jingzhuang_url" :href="quantity_room_info.jingzhuang_url">
        <img class="bac_img" src="../../assets/720).jpg" alt="">
        <img class="d_img" src="../../assets/bofang.png" alt="">
        </a>
        <div v-else>暂未上传720°全景图</div>
    </section>
    <div class="line" v-if="type==3||type==2"></div>
    <section class="shigong" v-if="type==3||type==2">
      <p>隐蔽工程图：</p>
      <div class="shigong_img" v-if="order_detail.construction_image!=''">
        <div v-for="(item, index) in order_detail.construction_image" :key="index">
          <a v-if="item.panorama_url!=null&&item.panorama_url!=''"  :href="item.panorama_url">
            <img class="img" :src="item.image_url" alt="">
            <img class="b_img" src="../../assets/bofang.png" alt="">
          </a>
          <p v-else @click="big_img(item.image_url)">
            <img class="img_1" :src="item.image_url" alt=""> 
            <img class="b_img_1" src="../../assets/zk.png" alt=""> 
          </p>
          
        </div>
      </div>
      <div v-else>暂未上传隐蔽施工图</div>
    </section>
    <div class="line"></div>
    <section class="house">
      <div>
        <p>量房预留信息：</p>
        <div class="house_detail" v-if="quantity_room_info!=null">
          <p>您的姓氏：<span>{{quantity_room_info.surname}}</span></p>
          <p>您的名字：<span>{{quantity_room_info.name}}</span></p>
          <p>手机号：<span>{{quantity_room_info.mobile}}</span></p>
          <p>微信号：<span>{{quantity_room_info.weixin}}</span></p>
          <p>您的性别：<span>{{quantity_room_info.gender==1?'男':'女'}}</span></p>
          <p>待量房屋地址：<span>{{quantity_room_info.city_address_datail}}</span></p>
          <p>待量房屋面积：<span>{{quantity_room_info.room_area}}平方米</span></p>
          <p>装修类型：<span>{{quantity_room_info.renovation_type==1?'新房':'翻新'}}</span></p>
          <p>期望装修风格：<span v-for="(item, index) in style_list" :key="index">{{item}}</span></p>
          <p>您的装修费用预算：<span>{{quantity_room_info.budget_min}}万元-{{quantity_room_info.budget_max}}万元</span></p>
          <p>
            计划开始时间：<span>{{quantity_room_info.renovation_start_year}}/{{quantity_room_info.renovation_start_month | month}}-{{quantity_room_info.renovation_end_year}}/{{quantity_room_info.renovation_end_month | month}}</span>
          </p>
          <p>
            希望入住时间：<span>{{quantity_room_info.check_in_start_year}}/{{quantity_room_info.check_in_start_month | month}}-{{quantity_room_info.check_in_end_year}}/{{quantity_room_info.check_in_end_month | month}}</span>
          </p>
          <p>您对房屋的装修有什么要求和期待：<span class="span">{{quantity_room_info.remark}}</span></p>
          <p v-if="quantity_room_info.renovation_picture!=''">户型图：
            <ul>
              <li @click="big_pic(item)" v-for="(item, index) in quantity_room_info.renovation_picture" :key="index"><img :src="item" alt="">
              </li>
            </ul>
          </p>
          <p v-if="quantity_room_info.apartment_picture!=''">您喜欢或期待的装修效果图：
            <ul>
              <li @click="big_pic(item)" v-for="(item, index) in quantity_room_info.apartment_picture" :key="index"><img :src="item" alt="">
              </li>
            </ul>
          </p>
        </div>
      </div>
    </section>
  </div>
  </div>
</template>
<script>
  import request from '@/request'
  import header_ from '../back_header'
  export default {
    components:{header_},
    data() {
      return {
        order_detail: {},
        quantity_room_info: {},
        constructor_user_info:"",
        design_user_info:'',
        style_list: [],
        type: '',
        one_order_number:"",
      }
    },
    created() {
       this.$store.state.title_name = "我的订单";
      var newID = this.$route.query.id
      this.one_order_number=newID
      this.type = this.$route.query.type
      this.$store.commit('show_looding')
      request({
        url: '/api/order/getOneOrderDetailed',
        data: { one_order_number: newID },
        method: "post",
      }).then(data => {
        this.$store.commit('hide_looding')
        console.log(data)
        if (data.data.status == 200) {
            this.order_detail = data.data.data
            this.quantity_room_info = data.data.data.quantity_room_info
            if( data.data.data.quantity_room_info){var st=JSON.parse(data.data.data.quantity_room_info.style_type_id)}
            
            console.log(st)
            // 获取装修风格
            var arr=[]
            request({
              url: '/api/getStyleList',
              method: "post",
            }).then(data => {
              if (data.data.status == 200) {
                console.log(data.data)
                var style = data.data.data
                for (let index = 0; index < style.length; index++) {
                    for (let i = 0; i < st.length; i++) {
                      const element = st[i];
                      if (style[index].style_id == element) {
                      arr.push(style[index].style_name)
                    }
                    }
                }
              }this.style_list=arr
            })
          this.constructor_user_info=data.data.data.constructor_user_info?data.data.data.constructor_user_info:''
          this.design_user_info=data.data.data.design_user_info?data.data.data.design_user_info:''
        }
        this.$store.commit('hide_looding')
      })
    },
    filters: {
      month(val) {
        return Number(val).length < 2 ? ('0' + val) : val
      }
    },
    methods: {
      big_img(src){
        this.$store.state.amplify_img = src
      },
      confirm_tap(){
        // 确认收货
      request({
        url: "/api/order/ConfirmReceipt",
        data: { one_order_number: this.one_order_number },
        method: "post"
      }).then(data => {
        console.log(data);
        if (data.data.status == 200) {
          this.$toast("已确认收货");
          this.$router.go(-1);
          
        }
      });
      },
      //   图片放大
    big_pic(url) {
        this.$store.state.amplify_img=url
    },
    }
  }
</script>
<style scoped>
  .order_detail {
    margin: 0.9rem 0 1.05rem;
    font-size: 0.26rem;
    line-height: 0.6rem;
  }
.span{
  display: block;
}
  .order_detail>p {
    border-bottom: 1px solid #7f7f7f;
    text-align: center;
    padding: 0.1rem 0 ;
    font-weight: bold;
    font-size: 0.32rem;
  }

  .order_detail .line {
    height: 0.2rem;
    background: #A7D6E3;
  }
  .xmnr{
    padding:0 0.2rem;
  }
  .xmnr ul{
    overflow: hidden;
  }
.xmnr ul li{
  line-height: normal;
  font-size: 0;
  margin:0 2% 2% 0;
  float: left;
  width: 23%;
  height: 1rem;
}
.xmnr ul li:nth-child(4n){
  margin-right: 0;
}
.xmnr li img{
  width: 100%;
  height: 100%;
}
/* ==============地址========== */
.address_info {
  background: white;
  padding: 0.2rem 0.3rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  line-height: 0.5rem;
}

.address_info > p {
  height: 100%;
  padding-right: 0.2rem;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}

.address_info p img {
  margin: 0 auto;
  width: 0.43rem;
  height: 0.43rem;
}
section {
  background: white;
}
.address_info p span {
  white-space: nowrap;
}

.address {
  display: flex;
  flex-direction: column;
  padding-left: 0.2rem;
  border-left: 1px solid #000;
  word-wrap:break-word;
  max-width: 6rem;
}
.address p span {
  margin-left: 0.2rem;
  color: #000;
}
/* +++++++++++++++++++++++++++++++ */
.dis_people>p{
  padding: 0 0.2rem;
  border-bottom: 1px solid #7f7f7f;
}
.dis_people>div{
  margin-left: 0.2rem;
}
.dis_people>div div{
  display: flex;
  flex-direction: row;
}
.dis_people div div p{
  
  display: flex;
  flex-direction: column;
}
.dis_people div p span{
  color: #6e6e6e;
}
  /* =----------------------------- */
  .order_number {
    background: #fdeef3;
    overflow: hidden;
    padding:0.1rem 0.2rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  .order_number span {
    margin-top: 0.1rem;
    float: right;
    color: #ff428d;
    border: 1px solid #ff428d;
    border-radius: 0.1rem;
    padding: 0 0.2rem;
  }

  .order_time {
  background: #fee4f1;
    padding: 0.1rem 0.2rem;
  }

  .order_des {
    padding: 0.1rem 0.2rem 0;
  }

  .order_des span {
    color: #DB247B;
  }

  .house>div>p{
      padding: 0 0.2rem;
  }
  .house img{
    width: 100%;
    height: 100%;
  }

  .house>p img {
    width: 0.3rem;
    height: 0.3rem;
  }

  .house>ul {
    overflow: hidden;
    font-size: 0;
  }

  .house>ul li {
    margin: 0 0.2rem 0.2rem 0;
    float: left;
    width: 1.32rem;
    height: 1.32rem;
  }

  .house>ul li img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }


  .house_detail p span {
    margin-right: 0.2rem;
    color: blue;
  }

  .house_detail {
    line-height: 0.6rem;
    font-size: 0.24rem;
    padding:0 0.2rem;
    border-top: 1px solid #7f7f7f;
  }

  .house_detail ul {
    overflow: hidden;
  }

  .house_detail ul li {
    border: 1px solid #ccc;
    text-align: center;
    line-height: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    font-size: 0;
    float: left;
    margin: 0 0.2rem 0.2rem 0;
  }

  .house_detail li img {
    object-fit: contain;
  }
  .qj_720 p{
    padding:0.1rem 0.2rem ;
    border-bottom: 1px solid #7f7f7f;
  }
  .qj_720 .bac_img{
    opacity:0.6; filter: alpha(opacity=60);
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .qj_720 a{
    background: #000;
    border: 1px solid #7f7f7f;
    margin:0.1rem 0.2rem ;
    display:flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 2rem;
    position: relative;
  }
  .qj_720 div{
    margin: 0 0.2rem;
  }
  .qj_720 a .d_img{
    position: absolute;
    width: 0.6rem;
  }
  .shigong>p{
    padding:0.1rem 0.2rem;
    border-bottom: 1px solid #7f7f7f;
  }
  .shigong>div{
    padding: 0 0.2rem;
  }
  .shigong_img{
    margin: 0.2rem 0 0.1rem ;
    overflow: hidden;
  }
  .shigong_img p{
    border: 1px solid #7f7f7f;
    float: left;
    margin: 0 0.2rem 0.1rem 0;
    width: 1.5rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .shigong_img p .img_1{
    /* object-fit: contain; */
    width: 100%;
    height: 100%;
  }
  .shigong_img p .b_img_1{
    position: absolute;
    right: 0.05rem;
    width: 0.2rem;
    height: 0.2rem;
    bottom: 0.05rem
  }
  .shigong_img a{
    z-index: 66;
    background: #000;
    border: 1px solid #7f7f7f;
    float: left;
    margin: 0 0.2rem 0.1rem 0;
    width: 1.5rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .shigong_img .img{
    opacity:0.6; filter: alpha(opacity=60);
    width: 100%;
    height: 100%;
  }
  .b_img{
    position: absolute;
    width: 0.6rem;
  }

</style>