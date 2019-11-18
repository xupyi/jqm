<template>
  <div class="set_plane">
    <h3 v-if="!page">您刚才选择的是:</h3>
    <h3 v-else>选择您喜欢的：</h3>

    <section v-if="page">
      <h4>1、沙发(点击图片可放大)</h4>
      <div class="list">
        <div class="data_list" v-for="(item, index) in sofa_list" :key="index">
          <div @click="sofa_tap(index)" class="item_img">
            <img class="backimg" :src="item.show_image" alt />
            <img class="floatimg" src="../../../assets/zk.png" />
          </div>
          <div class="item_cont" @click="sofa_active_tap(index)">
            <p v-if="sofa_active==index">
              <img src="../../../assets/home_img/dui.png" alt />
              <span style="color:#FD2691">{{item.type_name}}</span>
            </p>
            <p v-if="sofa_active!=index">
              <img src="../../../assets/home_img/yuan.png" alt />
              <span>{{item.show_name}}</span>
            </p>
          </div>
        </div>
      </div>
      <h4>2、椅子(点击图片可放大)</h4>
      <div class="list">
        <div class="data_list" v-for="(item, index) in chair_list" :key="index">
          <div @click="chair_tap(index)" class="item_img">
            <img class="backimg" :src="item.show_image" alt />
            <img class="floatimg" src="../../../assets/zk.png" />
          </div>
          <div class="item_cont" @click="chair_active_tap(index)">
            <p v-if="chair_active==index">
              <img src="../../../assets/home_img/dui.png" alt />
              <span style="color:#FD2691">{{item.type_name}}</span>
            </p>
            <p v-if="chair_active!=index">
              <img src="../../../assets/home_img/yuan.png" alt />
              <span>{{item.show_name}}</span>
            </p>
          </div>
        </div>
      </div>
      <div @click="chair_next_tap" class="next">提交</div>
    </section>
    <section class="order" v-if="!page">
      <div class="list">
        <div class="data_list">
          <div class="item_img" @click="img_tap(sofa_list[sofa_active].show_image)">
            <img class="backimg" :src="sofa_list[sofa_active].show_image" alt />
          </div>
          <p class="item_cont">{{sofa_list[sofa_active].type_name}}</p>
        </div>
        <div class="data_list">
          <div class="item_img" @click="img_tap(chair_list[chair_active].show_image)">
            <img class="backimg" :src="chair_list[chair_active].show_image" alt />
          </div>
          <p class="item_cont">{{chair_list[chair_active].type_name}}</p>
        </div>
      </div>
      <div @click="ascer_tap" class="next">确定</div>
    </section>
  </div>
</template>
<script>
import request from "@/request.js";
export default {
  data() {
    return {
      page: true,
      sofa_active: null,
      chair_active: null,
      sofa_list: [],
      chair_list: []
    };
  },
  created() {
    this.$store.commit("show_looding");
    request({
      url: "/api/getUserGuessList",
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.status == 200) {
        this.$store.commit("hide_looding");
        var res = data.data.data;
        for (let index = 0; index < res.length; index++) {
          if (res[index].type == 1) {
            this.sofa_list.push(res[index]);
          }
          if (res[index].type == 2) {
            this.chair_list.push(res[index]);
          }
        }
      }
    });
  },
  methods: {
    sofa_tap(i) {
      this.$store.state.amplify_img = this.sofa_list[i].show_image;
    },
    sofa_active_tap(i) {
      this.sofa_active = i==this.sofa_active?null:i;
    },
    chair_tap(i) {
      this.$store.state.amplify_img = this.chair_list[i].show_image;
    },
    chair_active_tap(i) {
      this.chair_active = i;
    },
    chair_next_tap() {
      if (this.sofa_active == null || this.chair_active == null) {
        this.$toast("请选择一个你喜欢的选项");
      } else {
        this.page = false;
      }
    },
    img_tap(i) {
      this.$store.state.amplify_img = i;
    },
    ascer_tap() {
      this.page = true;
      this.sofa_active = this.chair_active = null;
    }
  }
};
</script>
<style scoped>
.set_plane {
  margin: 0 0.2rem;
}

.set_plane h3 {
  font-weight: 500;
  font-size: 0.3rem;
  margin-bottom: 0.1rem;
  padding:  0.1rem 0;
}

.set_plane h4 {
  margin-bottom: 0.1rem;
  font-size: 0.24rem;
}

.list {
  overflow: hidden;
  margin-bottom: -0.1rem;
}

.data_list {
  float: left;
  margin: 0 0.2rem 0.25rem 0;
  width: 3.4rem;
  font-size: 0;
  border: 0.55px solid #ddd;
  background: white;
}

.data_list:nth-child(2n) {
  margin-right: 0;
}

.item_img {
  position: relative;
}

.item_img .backimg {
  padding: 0.55px;
  width: 100%;
  height: 2.4rem;
}

.item_img .floatimg {
  position: absolute;
  bottom: 0.1rem;
  right: 0.1rem;
  width: 0.3rem;
  height: 0.3rem;
}

.item_cont {
  text-align: center;
  font-size: 0.3rem;
  line-height: 0.9rem;
}
.item_cont p {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item_cont p img {
  width: 0.4rem;
  height: 0.4rem;
  margin-bottom: 0.03rem;
}

.item_cont p span {
  
  margin-left: 0.1rem;
  font-size: 0.28rem;
}

/* -------------------- */
.next {
  font-size: 0.32rem;
  color: white;
  background: #fd2691;
  padding: 0.15rem;
  margin: 0.4rem 0.4rem 0.5rem;
  text-align: center;
  border-radius: 4px;
}
.order p {
  color: #fd2691;
}
</style>