<template>
  <div class="complaints">
    <div>
      <section class="callback">
        <h3>投诉建议联系方式：</h3>
        <p>
          <img src="../assets/icon/phone.png" alt />
          电话：
          <span>{{list_datas.mobile}}</span>
        </p>
        <p>
          <img src="../assets/icon/em.png" alt />邮箱：
          <span>{{list_datas.email}}</span>
        </p>
        <p>
          <img src="../assets/icon/weixin.png" alt />微信：
          <span>{{list_datas.weixin}}</span>
        </p>
      </section>
      <section class="view">
        <div class="from_type">
          <h4>选择类别：</h4>
          <ul>
            <li @click="comp_tap(1)">
              <img :src="active_index==1?active_img:normal_img" alt />
              <span>投诉</span>
            </li>
            <li @click="comp_tap(2)">
              <img :src="active_index==2?active_img:normal_img" alt />
              <span>建议</span>
            </li>
            <li @click="comp_tap(3)">
              <img :src="active_index==3?active_img:normal_img" alt />
              <span>举报</span>
            </li>
            <li @click="comp_tap(4)">
              <img :src="active_index==4?active_img:normal_img" alt />
              <span>咨询</span>
            </li>
          </ul>
        </div>
        <div class="from_taget">
          <h4>对象：</h4>
          <ul>
            <li @click="taget_tap(index)" v-for="(item, index) in target_list" :key="index">
              <img :src="comp_active==index?active_img:normal_img" alt />
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
        <div class="from_cont">
          <p>内容：</p>
          <textarea name id cols="20" rows="4" v-model="content"></textarea>
        </div>
      </section>
      <div class="uplode">
        <p>图片：</p>
        <div class="photo">
          <ul>
            <li class="photo_li" v-for="(item, index) in img_lists" :key="index">
              <img @click="big_pic(index)" class="up_img" :src="item" alt />
              <img class="x_img" @click="x_tap(index)" src="../assets/home_img/guanbi.png" alt />
            </li>
            <li class="photo_li photo_jia">
              <input
                name="file"
                type="file"
                accept="image/*"
                @change="uplodeimg"
                multiple="multiple"
              />
              <img class="jia_img" src="../assets/home_img/up_img01.png" alt />
              <span>添加照片</span>
            </li>
          </ul>
        </div>
      </div>
      <div @click="big_imgtap" @touchmove.prevent class="view1" v-show="big_isshow">
        <div>
          <img class="big_img" :src="big_img" alt />
          <img class="xx_img" src="../assets/gb.png" alt />
        </div>
      </div>
      <div class="commit" @click="commit_tap">提交完成</div>
    </div>
  </div>
</template>

<script>
import request from "@/request.js";
export default {
  data() {
    return {
      big_isshow: false,
      big_img: "",
      active: null,
      target_list: ["设计师", "施工长", "本地客服", "在线客服", "其他"],
      list_datas: {},
      active_img: require("../assets/home_img/dui.png"),
      normal_img: require("../assets/home_img/yuan.png"),
      img_lists: [], //图片列表
      active_index: "", //建议、投诉
      comp_active: null, //投诉对象
      content: "" //	是	string	投诉内容
    };
  },
  created() {
    this.$store.state.title_name = "金秋梦装饰";
    this.$store.state.sess=4
    this.$store.commit("show_looding");
    request({
      url: "/api/getComplaintConfig",
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.status == 200) {
        this.list_datas = data.data.data;
      } else {
        console.log(data);
      }
    });
    // request({
    //   url: "/api/getUserType",
    //   method: "post"
    // }).then(data => {
    //   console.log(data);
    //   if (data.status == 200) {
    //     this.target_list = data.data.data;
    //   }
    // });
    this.$store.commit("hide_looding");
  },
  methods: {
    big_imgtap() {
      this.big_isshow = false;
    },
    big_pic(index) {
      this.big_isshow = true;
      this.big_img = this.img_lists[index];
    },
    comp_tap(i) {
      this.active_index = i;
    },
    uplodeimg(e) {
      console.log(e);
      if (this.img_lists.length > 8) {
        this.$toast("最多上传8张图片");
      } else {
        let data = e.target.files[0];
        if (data.size > 1000000) {
          var this_=this
          let reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onload = function(e) {
            let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
            image.src = e.target.result;
            image.onload = function() {
              let canvas = document.createElement("canvas"),
                context = canvas.getContext("2d"),
                imageWidth = image.width / 2, //压缩后图片的大小
                imageHeight = image.height / 2,
                data = "";
              canvas.width = imageWidth;
              canvas.height = imageHeight;
              // context.clearRect(0, 0, imageWidth, imageHeight);
              context.drawImage(image, 0, 0, imageWidth, imageHeight);
              var dataurl = canvas.toDataURL("image/jpeg", 0.8);
              var arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              var newFile = new Blob([u8arr], { type: mime });
              //压缩完成
              this_.get_img(newFile);
            };
            // this.img_lists.push(data)
            
          };
        } else {
          this.get_img(data);
        }
      }
    },
    get_img(data) {
      var formData = new FormData();
      formData.append("file", data);
      request({
        url: "/api/upload",
        method: "post",
        data: formData
      }).then(res => {
        console.log(res.data.data[0]);
        this.img_lists.push(res.data.data[0]);
      });
    },
    x_tap(i) {
      this.img_lists.splice(i, 1);
    },
    taget_tap(i) {
      this.comp_active = i;
      console.log(i);
    },
    commit_tap() {
      var val = {
        complaint_type: this.active_index,
        complaint_object:this.target_list[this.comp_active] ,
        title: this.title,
        content: this.content,
        picture_urls: JSON.stringify(this.img_lists)
      };
      console.log(val);
      if (val.complaint_type == "") {
        this.$toast("请选择类别");
      } else if (val.complaint_object == null) {
        this.$toast("请选择投诉对象");
      } else if (val.content == "") {
        this.$toast("请输入投诉内容");
      } else if (val.picture_urls == "") {
        this.$toast("请上传图片");
      } else {
        this.$store.commit("show_looding");
        request({
          url: "/api/SaveComplaint",
          data: val,
          method: "post"
        }).then(data => {
          console.log(data);
          this.$store.commit("hide_looding");
          if (data.status == 200) {
            this.$toast('投诉/建议提交成功，我们会尽快处理');
            this.list_datas = data.data.data;
            this.$router.go(-1)
          } else {
            this.$toast(data.data.msg);
            console.log();
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.complaints {
  overflow: auto;
  position: fixed;
  top: 0.9rem;
  left: 0;
  right: 0;
  bottom:0;
}
.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.callback {
  background: white;
}

.callback h3 {
  font-weight: bold;
  padding:  0.25rem 0.3rem;
  font-size: 0.3rem;
}

.callback p {
  border-top: 0.5px solid #7d7d7d;
  padding: 0.2rem 0.3rem;
  font-size: 0.33rem;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.callback p img {
  background-color: #fd2691;
  border-radius: 50%;
  width: 0.48rem;
  height: 0.48rem;
  padding: 0.06rem;
  margin-right: 0.1rem;
}

/* 表单 */
.view h4 {
  font-size: 0.3rem;
  white-space: nowrap;
  line-height: 0.6rem;
}

.from_type {
  padding: 0.2rem 0.3rem;
  border-bottom: 0.5px solid #7d7d7d;
  font-size: 0.3rem;
  display: flex;
  flex-direction: row;
}
.from_type li {
  margin-right: 0.3rem;
  display: flex;
  align-items: center;
}
.from_type li img {
  margin-right: 0.1rem;
}
.view ul {
  overflow: hidden;
}

.view li img {
  width: 0.33rem;
  height: 0.33rem;
  vertical-align: middle;
}

.view li span {
  vertical-align: middle;
}

.view li {
  float: left;
  line-height: 0.6rem;
  margin-right: 0.2rem;
  font-size: 0.3rem;
}

.from_taget {
  padding: 0.2rem 0.3rem;
  display: flex;
  flex-direction: row;
}
.from_taget li {
  width: 1.8rem;
}
.from_cont {
  font-size: 0.3rem;
  padding: 0 0.3rem;
}

.from_cont p {
  margin-bottom: 0.1rem;
}

.from_cont textarea {
  width: 100%;
  padding: 0.1rem;
  border-radius: 0.1rem;
  border-color: #7d7d7d;
}
/* 上传图片 */
.uplode {
  margin: 0.1rem 0 0.2rem;
}

.uplode p {
  font-size: 0.3rem;
  margin: 0 0.3rem;
}

.photo ul {
  overflow: hidden;
  padding: 0.2rem 0.3rem 0;
}

.photo ul li:nth-child(4n) {
  margin-right: 0;
}

.x_img {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: -0.15rem;
  right: -0.15rem;
}

.photo_li {
  float: left;
  position: relative;
  border-radius: 0.1rem;
  width: 1.5rem;
  height: 1.25rem;
  margin: 0 0.2rem 0.2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid #7d7d7d;
}

.photo_jia {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.photo_jia img {
  width: 0.5rem;
  height: 0.5rem;
}

.photo_jia span {
  margin-top: 0.1rem;
  font-size: 0.2rem;
}

.up_img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.photo_li input {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.commit {
  margin: 0 0.3rem 0.6rem;
  font-size: 0.36rem;
  padding: 0.18rem;
  color: white;
  background: #ff1284;
  text-align: center;
  border-radius: 0.1rem;
}
/* +++++++++++++++++++++++++++++++++++++== */
.big_img {
  background: white;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.view1 {
  position: fixed;
  top: 0.9rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
}
.view1 div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.view1 .xx_img {
  position: absolute;
  width: 0.4rem;
  height: 0.4rem;
  right: 0.2rem;
  top: 0.2rem;
}

.order p {
  color: #fd2691;
}
</style>