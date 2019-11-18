<template>
  <div>
    <back_header />
    <div class="select_design">
      <p>
        当前位置：设计 >
        <span>选择地墙顶的造型</span>
      </p>
      <div class="hard_nav">
        <ul>
          <li v-for="(item, index) in parent_data" :key="index">
            <span>{{item.name}}：</span>
            <div>
              <span :class="nav_li_index==index&nav_children_index==childrenindex?'fir':''"
                @click="nav_tap(index,childrenindex)" v-for="(children, childrenindex) in item.children"
                :key="childrenindex">{{children.name}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="data_main">
        <ul>
          <li v-for="(item, index) in children_list" :key="index">
            <img @click="img_tap(item.show_image)" :src="item.show_image" alt="图片加载失败" />
            <div @click='item_tap(item.id)'>
              <img :src="is==item.id?active:normal" alt="">
              <span :style="{color:is==item.id?'#ff1284':''}">{{item.name}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="foot">
        <div @click="tp" v-show="nav_li_index!=0||nav_children_index!= 0">返回上页</div>
        <div v-if="condition" @click="next">下一页</div>
        <div @click="shadow" v-else>提交完成</div>
      </div>
    </div>
    <div v-if="is_shadow" class="shadow">
      <div>
        <div class="cont">
          <h3>顾客您好！</h3>
          <p>您选择的信息将作为设计参考依据，</p>
          <p>已被系统保存，设计师会与您联系。</p>
        </div>
        <span @click="qued_tap">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
  import request from "@/request";
  import back_header from '../../back_header.vue'
  export default {
    components: {
      back_header
    },
    data() {
      return {
        active: require("../../../assets/home_img/dui.png"),
        normal: require("../../../assets/home_img/yuan.png"),
        parent_data: '',
        nav_li_index: 0, //父级下标
        nav_children_index: 0, //子级下标
        children_list: '',
        is: '',
        is_shadow: false,
        condition: true,
        choice_id: '',
      }
    },
    created() {
      request({
        url: "/api/getGoodsDesignList",
        method: "post"
      }).then(data => {
        console.log(data);
        this.parent_data = data.data.data;
        let array = this.children_list = data.data.data[0].children[0].children
        this.get_chioce(array)
      });
    },
    methods: {
      //   图片放大
      img_tap(url) {
        this.$store.state.amplify_img = url;
      },
      //   一级
      nav_tap(partent_id, id) {
        this.nav_li_index = partent_id
        this.nav_children_index = id
        if (
          this.nav_li_index == this.parent_data.length - 1 &&
          this.nav_children_index ==
          this.parent_data[this.nav_li_index].children.length - 1
        ) {
          this.condition = false;
        } else {
          this.condition = true;
        }
        this.get_chioce()
      },
      //   item
      item_tap(id) {
        this.is = id
        request({
          url: "/api/oneDesignSave",
          data: {
            style: id
          },
          method: "post"
        }).then(res => {
          console.log(res.data);

        });
      },
      get_chioce() {
        var array = this.parent_data[this.nav_li_index].children[this.nav_children_index].children
        this.children_list = array
        request({
          url: "/api/getUserChoice",
          method: "post"
        }).then(res => {
          console.log(res.data);
          if (res.data.data != null) {
            let choice = res.data.data.choice.split(',')
            for (let index = 0; index < array.length; index++) {
              const element = array[index];
              for (let index = 0; index < choice.length; index++) {
                if (element.id == choice[index]) {
                  console.log(choice[index])
                  this.is = choice[index]
                }
              }
            }
          }
        });
      },
      tp() {
        this.condition = true;
        if (this.nav_li_index == 0 && this.nav_children_index == 0) {
          this.nav_children_index = 0;
        } else {
          if (this.nav_children_index == 0) {
            this.nav_li_index = this.nav_li_index - 1;
            this.nav_children_index =
              this.parent_data[this.nav_li_index].children.length - 1;
          } else {
            this.nav_children_index = this.nav_children_index - 1;
          }
        }
        this.get_chioce()
      },
      next() {
        if (
          this.nav_children_index >=
          this.parent_data[this.nav_li_index].children.length - 1
        ) {
          this.nav_li_index = this.nav_li_index + 1;
          this.nav_children_index = 0;
        } else {
          this.nav_children_index = this.nav_children_index + 1;
        }
        this.get_chioce()
        if (
          this.nav_li_index == this.parent_data.length - 1 &&
          this.nav_children_index ==
          this.parent_data[this.nav_li_index].children.length - 1
        ) {
          this.condition = false;
        }
      },
      shadow() {
        var num = 0
        for (let i = 0; i < this.parent_data.length; i++) {
          for (let index = 0; index < this.parent_data[i].children.length; index++) {
            num++
          }
        }
        request({
          url: "/api/getUserChoice",
          method: "post"
        }).then(res => {
          if (res.data.data != null) {
            let ae = res.data.data.choice.split(',')
            console.log(ae.length, num)
            if (ae.length == num) {
              this.add_info(res.data.data.choice)
            } else {
              this.$toast("还有选项未选择");
            }
          }else{
            this.$toast("请选择地墙顶造型");
          }

        });
      },
      x_tap() {
        this.is_shadow = false;
      },
      add_info(arr) {
        request({
          url: "/api/addDesignInfo",
          data: {
            style: arr
          },
          method: "post"
        }).then(data => {
          this.$store.commit("hide_looding");
          if (data.data.status == 200) {
            console.log(data.data.data.choice_id);
            this.choice_id = data.data.data.choice_id;
            this.is_shadow = true;
          } else {
            this.$toast(data.data.msg);
          }
        });
      },
      qued_tap() {
        this.is_shadow = false;
        this.$router.push({
          path: "/home/design",
          query: {
            ch_id: this.choice_id
          }
        });
      }
    },
  }

</script>
<style scoped>
  .fir {
    background: #2fc145;
    border-color: #2fc145 !important;
    color: white;
  }

  .select_design {
    top: 0.9rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }

  .select_design>p {
    font-size: 0.27rem;
    padding: 0.2rem 0.25rem;
  }

  .select_design>p span {
    color: #2fc145;
  }

  .hard_nav li {
    font-size: 0.26rem;
    display: flex;
    flex-direction: row;
    margin: 0 0.24rem;
  }

  .hard_nav li>span {
    line-height: 0.55rem;
    white-space: nowrap;
  }

  .hard_nav li div {
    width: 100%;
  }

  .hard_nav li div span {
    border: 1px solid #d2d2d2;
    text-align: center;
    display: inline-block;
    width: 32%;
    padding: 0.1rem 0 0.1rem;
    margin: 0 2% 2% 0;
    white-space: nowrap;
    overflow: hidden;
  }

  .hard_nav li div span:nth-child(3n) {
    margin-right: 0;
  }

  /* +++++++++++++++++++++++++++++++++++ */
  .data_main ul {
    margin: 0.24rem;
    overflow: hidden;
  }

  .data_main li {
    font-size: 0;
    float: left;
    border: 0.5px solid #bfbfbf;
    box-sizing: border-box;
    width: 48%;
    margin: 0 4% 4% 0;
  }

  .data_main li>img {
    width: 100%;
    height: 2.26rem;
  }

  .data_main li>div {
    font-size: 0.29rem;
    display: flex;
    align-items: center;
    padding: 0.2rem;
    justify-content: center;
  }

  .data_main li>div img {
    margin-right: 0.1rem;
    width: 0.33rem;
    height: 0.33rem;
  }

  .data_main li:nth-child(2n) {
    margin-right: 0;
  }

  /* +++++++++++++++++++++++++++++++++++++++++++ */
  .foot {
    padding: 0.24rem 0.24rem 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
  }

  .foot div:first-child {
    margin-right: 0.24rem;
  }

  .foot div {
    width: 50%;
    padding: 0.15rem;
    background: #ff1284;
    font-size: 0.3rem;
    color: white;
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
    width: 5.5rem;
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
    font-size: 0.34rem;
  }

  .shadow .cont p {
    line-height: 0.5rem;
    font-size: 0.28rem;
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
