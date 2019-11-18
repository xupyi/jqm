<template>
  <div class="yinbi">
    <p>上传隐蔽工程图</p>
    <div class="section">
      <section v-for="(items, index) in datas" :key="index">
        <p>{{items.id}}、{{items.title}}</p>
        <ul>
          <li @click="big_pic(index,idx)" v-for="(item, idx) in items.data_lists" :key="idx">
            <img :src="item.image_url" alt />
          </li>
          <li class="up_img" @click="up_jia(index)">
            <img class="img_b" src="../../../assets/tj_i.png" alt />
            <p>添加</p>
          </li>
        </ul>
      </section>
    </div>
    <div class="btn_tap" @click="btn_tap">提交</div>
    <div class="shadow" v-if="shadow">
      <div>
        <div class="sha_title">
          <span>上传隐蔽施工图</span>
          <img @click="x_tap" src="../../../assets/home_img/x_1.png" alt />
        </div>
        <div class="up_img">
          <img class="img" v-if="val.image_url" :src="val.image_url" alt />
          <div v-else>
            <img class="img_b" src="../../../assets/tj_i.png" alt />
            <input type="file" @change="design_url($event,1)" />
            <p>添加</p>
          </div>
        </div>
        <div class="up_add" v-if="is_link">
          <p>链接地址：</p>
          <input type="text" v-model="val.panorama_url" placeholder="请输入3D链接地址" />
        </div>

        <div class="add_btn">
          <p @click="tj_tap()" class="add">添加</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/request";
import utils from "@/utils";
export default {
  data() {
    return {
      index: "",
      datas: [
        {
          title: "客厅",
          id: "1",
          data_lists: [],
          i: 0
        },
        {
          title: "餐厅",
          data_lists: [],
          id: "2",
          i: 0
        },
        {
          title: "厨房",
          data_lists: [],
          id: "3",
          i: 0
        },
        {
          title: "卫生间",
          data_lists: [],
          id: "4",
          i: 0
        },
        {
          title: "卧室",
          data_lists: [],
          id: "5",
          i: 0
        },
        {
          title: "衣帽间",
          data_lists: [],
          id: "6",
          i: 0
        },
        {
          title: "书房",
          data_lists: [],
          id: "7",
          i: 0
        },
        {
          title: "多功能餐厅",
          data_lists: [],
          id: "8",
          i: 0
        },
        {
          title: "地下室",
          data_lists: [],
          id: "9",
          i: 0
        },
        {
          title: "阁楼",
          data_lists: [],
          id: "10",
          i: 0
        },

        {
          title: "其他房间",
          data_lists: [],
          id: "11",
          i: 0
        }
      ],
      propel_msg: {},
      name: "",
      id: "",
      val: {
        construction_position: "",
        panorama_url: "",
        image_url: ""
      },
      shadow: false,
      is_link: true,
    };
  },
  created() {
    this.$store.state.title_name = "施工长订单";
    this.id = this.$route.query.id;
    request({
      url: "/api/order/getConstructionImage",
      data: {
        one_order_number: this.$route.query.id
      },
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.data.status == 200) {
        for (let index = 0; index < data.data.data.length; index++) {
          const element = data.data.data[index];
          this.datas[element.construction_position-1].data_lists.push(element)
          
        }
        this.order_list = data.data.data;
      }
      this.$store.commit("hide_looding");
    });
  },
  methods: {
    // 放大图片
    big_pic(index,idx) {
      this.$store.state.amplify_img = this.datas[index].data_lists[idx].image_url;
    },
    x_tap() {
      this.shadow = false;
      this.index = this.val.image_url = this.val.panorama_url = "";
    },
    tj_tap() {
      var re = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
      if (this.val.image_url == "") {
        this.$toast("请选择图片");
        return;
      }
      if (this.val.panorama_url !== "" && !re.test(this.val.panorama_url)) {
        this.$toast("地址有误，请检查");
        return;
      }
      this.val.construction_position = this.datas[this.index].id;
      var a = JSON.stringify(this.val);
      this.datas[this.index].data_lists.push(JSON.parse(a));
      this.index = this.val.image_url = this.val.panorama_url = "";
      this.shadow = false;
    },
    up_jia(i) {
      this.index = i;
      this.is_link = this.datas[i].i >= 3 ? false : true;
      this.shadow = true;
    },
    async design_url(e, index) {
      let data = e.target.files[0];
      if (data != undefined) {
        console.log(data);
        var that = this;
        let a = await utils.uplodeimg(data);
        that.up_img(a, index);
      }
    },
    // 上传图片
    up_img(data, index) {
      var formData = new FormData();
      formData.append("file", data);
      this.$store.commit("show_looding");
      request({
        url: "/api/upload",
        method: "post",
        data: formData
      }).then(res => {
        this.$store.commit("hide_looding");
        if (res.data.status == 200) {
          this.val.image_url = res.data.data[0];
        }
      });
    },
    btn_tap() {
      console.log(this.datas);
      var a = [];
      for (let index = 0; index < this.datas.length; index++) {
        var cont = this.datas[index].data_lists;
        if (this.datas[index].data_lists != "") {
          for (let i = 0; i < cont.length; i++) {
            if (cont[i] != "") {
              a.push(cont[i]);
            }
          }
        }
      }
      if (a == "") {
        this.$toast("请上传隐蔽施工图");
        return;
      }
      var da = {
        one_order_number: this.id,
        construction_image: a
      };
      request({
        url: "/api/order/saveConstructionImage",
        method: "post",
        data: da
      }).then(res => {
        console.log(res);
        this.$store.commit("hide_looding");
        if (res.data.status == 200) {
          this.$router.go(-1);
        }
      });
    }
  }
};
</script>
<style scoped>
.yinbi > p {
  font-size: 0.32rem;
  text-align: center;
  padding: 0.2rem;
  border-bottom: 1px solid #808080;
}
.section {
  padding: 0.2rem;
  font-size: 0.3rem;
}
section > p {
  margin-bottom: 0.1rem;
}
section ul {
  overflow: hidden;
}
section li {
  float: left;
  border: 1px solid #eeeeee;
  background: #eeeeee;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.1rem 0.1rem 0;
}
li img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.btn_tap {
  text-align: center;
  margin: 0.4rem 0.4rem 0.8rem;
  font-size: 0.32rem;
  color: white;
  background: #ff1284;
  padding: 0.15rem;
  border-radius: 0.1rem;
}
/* +}}}}}}}}}}}}}}}}}}}}}}}}}}}}} */
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(34, 34, 34, 0.37);
}
.shadow > div {
  font-size: 0.3rem;
  background: white;
  margin: 3rem auto;
  width: 5rem;
  border-radius: 0.1rem;
  overflow: hidden;
}
.sha_title {
  text-align: center;
  background: #ff1284;
  margin-bottom: 0.2rem;
  padding: 0.15rem;
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sha_title img {
  position: absolute;
  right: 0.2rem;
  width: 0.3rem;
  height: 0.3rem;
}
.shadow .up_img {
  margin: 0 auto;
  width: 1.5rem;
  height: 1.5rem;
}
.up_img {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0;
  flex-direction: column;
  position: relative;
  border: 1px solid #eeeeee;
}
.up_img .img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.up_img .img_b {
  width: 0.6rem;
  height: 0.6rem;
}
.up_img p {
  font-size: 0.3rem;
  color: #808080;
}
.up_img input {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.up_add {
  padding: 0.1rem 0.2rem;
}
.up_add input {
  border-bottom: 1px solid #808080;
  width: 100%;
}

.add_btn {
  text-align: center;
  padding: 0.2rem;
}
.add {
  color: #fff;
  background: #ff1284;
  border-radius: 0.1rem;
  display: inline-block;
  padding: 0.1rem 0.4rem;
}
</style>