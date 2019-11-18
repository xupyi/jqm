<template>
  <div class="effect">
    <nav>
      <div>
        <span>档次:</span>
        <ul>
          <li
            :class="area_active==index?'fir':''"
            @click="area_tap(index)"
            v-for="(item, index) in choice_data.arealist"
            :key="index"
          >{{item.area_name}}</li>
        </ul>
      </div>
      <div>
        <span>风格:</span>
        <ul>
          <li
            :class="style_active==index?'fir':''"
            @click="style_tap(index)"
            v-for="(item, index) in choice_data.stylelist"
            :key="index"
          >{{item.style_name}}</li>
        </ul>
      </div>
    </nav>
    <main>
      <div class="data_list" v-for="(item, index) in list_data" :key="index">
        <div class="pos">
          <img @click="big_pic(index)" class="backimg" :src="item.picture_url" alt />
          <img @click="big_pic(index)" class="zk" src="../../../assets/zk.png" alt />
        </div>
        <div class="item_cont">{{item.style_name}}/{{item.title}}</div>
      </div>
    </main>
  </div>
</template>

<script>
import request from "@/request.js";
export default {
  data() {
    return {
      choice_data: [],
      list_data: [],
      area_active: null,
      style_active: null,
      styleid: "",
      areaid: ""
    };
  },
  created() {
    this.$store.commit("show_looding");
    this.get_list_data();
    //平面分类
    request({
      url: "/api/getPlanCategory",
      method: "post"
    }).then(data => {
      console.log(data);
      this.$store.commit("hide_looding");
      if (data.status == 200) {
        this.choice_data = data.data.data;
      }
    });
  },
  methods: {
    big_pic(index) {
      this.$store.state.amplify_img = this.list_data[index].picture_url;
      // this.big_isshow = true;
      // this.big_img = this.list_data[index].picture_url;
    },
    get_data() {
      var val = {
        p_area_id: this.areaid == null ? "" : this.areaid,
        p_style_id: this.styleid == null ? "" : this.styleid
      };
      this.get_list_data(val);
    },
    area_tap(i) {
      if (this.area_active == i) {
        this.area_active = this.areaid = null;
      } else {
        this.areaid = this.choice_data.arealist[i].area_id;
        this.area_active = i;
      }
      this.get_data();
    },
    style_tap(i) {
      if (this.style_active == i) {
        this.style_active = this.styleid = null;
      } else {
        this.style_active = i;
        this.styleid = this.choice_data.stylelist[i].style_id;
      }
      this.get_data();
    },
    get_list_data(val) {
      this.$store.commit("show_looding");
      request({
        url: "/api/getPlanList",
        data: val,
        method: "post"
      }).then(data => {
        this.$store.commit("hide_looding");
        if (data.status == 200) {
          this.list_data = data.data.data;
        }
      });
    }
  }
};
</script>

<style scoped>
.effect nav {
  font-size: 0.24rem;
  margin-top: 0.05rem;
  padding: 0 0.2rem;
}

.effect nav > div {
  display: flex;
  flex-direction: row;
}

.effect nav > div span {
  font-weight: 600;
  white-space: nowrap;
  margin-top: 0.1rem;
}

.effect nav ul {
  overflow: hidden;
}

.effect nav ul li {
  margin: 0.1rem 0.2rem;
  float: left;
  font-size: 0.24rem;
  border-bottom: 1px solid white;
}

.fir {
  border-color: #2fc145 !important;
  color: #2fc145;
}

.effect main {
  overflow: hidden;
  padding: 0.2rem;
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

.data_list .backimg {
  padding: 0.55px;
  width: 100%;
  height: 2.4rem;
}

.item_cont {
  padding: 0 0.1rem;
  text-align: center;
  font-size: 0.24rem;
  line-height: 0.6rem;
  height: 0.6rem;
}

.choice_t {
  color: black;
}
.pos {
  position: relative;
}
.zk {
  position: absolute;
  bottom: 0.1rem;
  right: 0.1rem;
  width: 0.3rem;
  height: 0.3rem;
}

.order p {
  color: #fd2691;
}
</style>