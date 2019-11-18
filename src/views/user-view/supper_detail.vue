<template>
  <div>
    <div>
      <h3>修改个人资料</h3>
      <div class="avatar_uplode">
        <div :style="{background:avatar?'':'#fef8da'}">
          <input type="file" @change="avatar_tap" />
          <img class="avatar_img" :src="avatar" alt />
        </div>
        <p>头像上传</p>
      </div>
      <ul class="guke">
        <li>
          <span>姓氏:</span>
          <input type="text" placeholder="姓氏" v-model="user_info_datas.xing" />
        </li>
        <li>
          <span>名字:</span>
          <input type="text" placeholder="名字" v-model="user_info_datas.name" />
        </li>
        <li>
          <span>手机号:</span>
          <p>{{user_info_datas.mobile}}</p>
        </li>
        <li>
          <span>微信号:</span>
          <input type="text" placeholder="微信号" v-model="user_info_datas.weixin" />
        </li>
        <li class="gender">
          <span>性别:</span>
          <div>
            <select name id @change="gender_tap" :value="user_info_datas.gender">
              <option value="1">男</option>
              <option value="2">女</option>
            </select>
          </div>
        </li>
        <li>
          <span>地区:</span>
          <div>
            <select @change="Province_change" :value="user_info_datas.province">
              <option selected value="0">请选择</option>
              <option
                v-for="(item, index) in select_Province"
                :key="index"
                :value="item.region_id"
              >{{item.region_name}}</option>
            </select>
            <select @change="City_change" @click="City_click" :value="user_info_datas.city">
              <option selected value="0">请选择</option>
              <option
                v-for="(item, index) in select_City"
                :value="item.region_id"
                :key="index"
              >{{item.region_name}}</option>
            </select>
            <select
              @change="district_change"
              @click="district_click"
              :value="user_info_datas.district"
            >
              <option selected value="0">请选择</option>
              <option
                v-for="(item, index) in select_district"
                :value="item.region_id"
                :key="index"
              >{{item.region_name}}</option>
            </select>
          </div>
        </li>
      </ul>
      <div class="succer">
        <ul>
          <li class="birthday">
            <span>出生年月：</span>
            <div>
              <select name id v-model="user_info_datas.birth_year">
                <option value disabled>请选择</option>
                <option :value="item" v-for="(item, index) in select_year" :key="index">{{item}}年</option>
              </select>
              <select name id v-model="user_info_datas.birth_month">
                <option value disabled>请选择</option>
                <option
                  :value="item"
                  v-for="(item, index) in 12"
                  :key="index"
                >{{item>9?item:'0'+item}}月</option>
              </select>
            </div>
          </li>
          <li class="GoodArea">
            <span>擅长：</span>
            <div>
              <span
                @click="goodarea_tap(item.style_id,index)"
                v-for="(item, index) in GoodArea"
                :key="index"
              >
                {{item.style_name}}
                <img v-if="item.is" src="../../assets/home_img/dui.png" alt />
              </span>
            </div>
          </li>
          <li style="font-weight: bold">工作经历：</li>
          <li class="work" v-if="work_list!=''">
            <div v-for="(work_item, index) in work_list" :key="index">
              <p>
                从业时间：
                <span>{{work_item.work_start_time}}</span> 至
                <span>{{work_item.work_end_time}}</span>
              </p>
              <p>
                任职公司：
                <span>{{work_item.work_company}}</span>
              </p>
              <p class="post">
                职务和工作内容：
                <span>{{work_item.work_post}}</span>
              </p>
              <p class="work_caozuo">
                <span @click="del_work(work_item.work_id,index)">删除</span>
              </p>
            </div>
          </li>
          <li @click="add_work" class="work_history">
            <img src="../../assets/icon/add_ic.png" alt />添加工作经历
          </li>
          <li class="id_card">
            <p>
              身份证正反面上传：
              <span>（照片要求能看清文字）</span>
            </p>
            <div>
              <div class="id_card_img">
                <div v-if="id_card0==''">
                  <img src="../../assets/home_img/up_img01.png" alt />
                  <span>正面照片上传</span>
                </div>
                <img v-else :src="id_card0" alt />
                <input type="file" accept="image/*" @change="id_card_tap" />
              </div>
              <div class="id_card_img">
                <div v-if="id_card1==''">
                  <img src="../../assets/home_img/up_img01.png" alt />
                  <span>反面照片上传</span>
                </div>
                <img v-else :src="id_card1" alt />
                <input type="file" accept="image/*" @change="invition_tap" />
              </div>
            </div>
          </li>
          <li class="say_to_user">
            <p>
              最想和业主说的一段话：
              <span>（20字以上）</span>
            </p>
            <textarea placeholder="请输入内容~" rows="3" v-model="user_info_datas.say_to_user"></textarea>
          </li>
        </ul>
      </div>

      <section>
        <div class="design_pic">
          <p>{{i_name}}作品：</p>
          <ul>
            <li v-for="(item, index) in design_pic_list" :key="index">
              <img @click="big_pic(item)" :src="item" alt />
              <img class="x_img" @click="x_tap(index)" src="../../assets/home_img/guanbi.png" alt />
            </li>
            <li class="design_up">
              <div>
                <img src="../../assets/home_img/up_img01.png" alt />
                <span>添加照片</span>
              </div>
              <input type="file" @change="design_pic_tap" />
            </li>
          </ul>
        </div>
        <!-- <div class="file_pics">
          <p>
            上传一张生活照片：
            <span>（全身照）</span>
          </p>
          <div>
            <div v-if="life_picture!=''">
              <img :src="life_picture" alt />
            </div>
            <div v-else>
              <img src="../../assets/home_img/up_img01.png" alt />
              <span>添加照片</span>
            </div>
            <input type="file" @change="life_picture_tap" />
          </div>
        </div>-->
      </section>
      <div class="btn" @click="btn_tap">提交</div>
      <div v-if="show" class="dialog" @touchmove.prevent>
        <div>
          <h3>添加工作经历</h3>
          <div class="work_cont">
            <p>
              从业开始时间：
              <input type="date" v-model="star_time" />
            </p>
            <p>
              从业结束时间：
              <input type="date" v-model="end_time" />
            </p>
            <p>
              任职公司：
              <input type="text" v-model="work_company" />
            </p>
            <div>
              职务和工作内容：
              <textarea cols="30" rows="3" v-model="work_post"></textarea>
            </div>
          </div>
          <div class="work_btn">
            <span @click="add_work">取消</span>
            <span @click="add_work_add">确定</span>
          </div>
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
      i_name: "",
      user_info_datas: {},
      // life_picture: "",
      avatar: "",
      select_Province: [],
      select_City: [],
      select_district: [],
      select_year: [], // 生日
      GoodArea: [],
      id_card0: "",
      id_card1: "",
      design_pic_list: [],
      flag: true,
      show: false,
      add_work_his: {},
      star_time: "",
      end_time: "",
      work_company: "",
      work_post: "",
      work_list: "",
      goodarea_true: [],
      user_type_: ""
    };
  },
  created() {
    this.user_type_ = this.$route.query.user_type;
    if (this.$route.query.user_type == "designer") {
      this.$store.state.title_name = "设计师个人资料";
    } else if (this.$route.query.user_type == "constructor") {
      this.$store.state.title_name = "施工长个人资料";
    } else if (this.$route.query.user_type == "partner") {
      this.$store.state.title_name = "城市合伙人个人资料";
    }
    // else if (this.$route.query.user_type) {
    //   this.$store.state.title_name = "个人资料";
    // } else if (this.$route.query.user_type) {
    //   this.$store.state.title_name = "个人资料";
    // } else if (this.$route.query.user_type) {
    //   this.$store.state.title_name = "个人资料";
    // } else if (this.$route.query.user_type) {
    //   this.$store.state.title_name = "个人资料";
    // }

    // 用户擅长
    var good_use = [];
    request({
      url: "/api/getUserGoodArea",
      method: "post"
    }).then(data => {
      console.log(data.data);
      if (data.data.status == 200) {
        for (let index = 0; index < data.data.data.length; index++) {
          data.data.data[index].is = false;
        }
        good_use = data.data.data;
      }
    });
    // 获取用户信息
    request({
      url: "/api/getUserStaffInfo",
      data: { user_type: this.$route.query.user_type },
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.data.status == 200) {
        if (data.data.data.identification_info != null) {
          this.id_card0 = data.data.data.identification_info[0];
          this.id_card1 = data.data.data.identification_info[1];
        }
        // if (data.data.data.life_picture == undefined) {
        //   this.life_picture = data.data.data.life_picture = "";
        // } else {
        //   this.life_picture = data.data.data.life_picture;
        // }
        data.data.data.say_to_user
          ? data.data.data.say_to_user
          : (data.data.data.say_to_user = "");
        this.user_info_datas = data.data.data;
        this.avatar = data.data.data.avatar == "" ? "" : data.data.data.avatar;
        if (data.data.data.show_picture != null) {
          this.design_pic_list = data.data.data.show_picture;
        }
        this.work_list = data.data.data.work_list;
        this.get_select_Province("once");
        this.get_select_city("once");

        var brr = data.data.data.goods_type
          ? data.data.data.goods_type.split(',')
          : [];
        console.log(brr, "brr");
        this.goodarea_true = brr;
        for (let index = 0; index < good_use.length; index++) {
          var style = good_use[index];
          if (brr != "") {
            for (let f = 0; f < brr.length; f++) {
              if (brr[f] == style.style_id) {
                style.is = true;
              }
            }
          }
          this.GoodArea = good_use;
        }
      }
    });
    var date = new Date().getFullYear();
    for (let index = 0; index < 80; index++) {
      this.select_year.push(date - index);
    }
  },
  methods: {
    gender_tap(e){
      // 性别选择
      console.log(e.target.value)
      this.user_info_datas.gender=e.target.value
    },
    //   图片放大
    big_pic(url) {
      this.$store.state.amplify_img = url;
    },
    back_tap() {
      this.$router.go(-1);
    },
    // 擅长
    goodarea_tap(i, index) {
      var a = this.goodarea_true.indexOf(String(i));
      if (a != -1) {
        this.goodarea_true.splice(a, 1);
        this.GoodArea[index].is = false;
      } else {
        this.GoodArea[index].is = true;
        this.goodarea_true.push(String(i));
      }
      console.log(this.goodarea_true)
    },
    // 头像上传
    async avatar_tap(e) {
      let data = e.target.files[0];
      if (data != undefined) {
        let a = await utils.uplodeimg(data);
        this.get_img(a, "avatar");
      }
    },
    // 工作经历
    add_work() {
      this.show = !this.show;
    },
    add_work_add() {
      var val = {
        work_start_time: this.star_time,
        work_end_time: this.end_time,
        work_company: this.work_company,
        work_post: this.work_post
      };
      console.log(val);
      if (val.work_start_time == "") {
        this.$toast("请选择从业开始时间！");
      } else if (val.work_end_time < val.work_start_time) {
        this.$toast("结束时间不能小于开始时间");
      } else if (val.work_end_time == "") {
        this.$toast("请选择从业结束时间！");
      } else if (val.work_company == "") {
        this.$toast("请填写任职公司！");
      } else if (val.work_post == "") {
        this.$toast("请填写职务和工作内容！");
      } else {
        val.user_type = this.user_type_;
        request({
          url: "/api/addUserWork",
          data: val,
          method: "post"
        }).then(data => {
          if (data.data.status == 200) {
            this.$toast("成功添加！");
            this.show = !this.show;
            request({
              url: "/api/getUserStaffInfo",
              data: { user_type: this.user_type_ },
              method: "post"
            }).then(data => {
              if (data.data.status == 200) {
                this.work_list = data.data.data.work_list;
              }
            });
          }
        });
      }
    },
    // 删除工作经历
    del_work(id, index) {
      request({
        url: "/api/delUserWork",
        data: { work_id: id },
        method: "post"
      }).then(res => {
        this.$toast("删除成功！");
        this.work_list.splice(index, 1);
      });
    },
    // 身份证上传
    async id_card_tap(e) {
      let data = e.target.files[0];
      if (data != undefined) {
        let a = await utils.uplodeimg(data);
        this.get_img(a, 0);
      }
    },
    // 反
    async invition_tap(e) {
      let data = e.target.files[0];
      if (data != undefined) {
        let a = await utils.uplodeimg(data);
        this.get_img(a, 1);
      }
    },
    // 设计作品
    async design_pic_tap(e) {
      let data = e.target.files[0];
      if (data != undefined) {
        let a = await utils.uplodeimg(data);
        this.get_img(a, "design_pic_list");
      }
    },
    x_tap(index) {
      this.design_pic_list.splice(index, 1);
    },
    // 生活照上传
    // async life_picture_tap(e) {
    //   let data = e.target.files[0];
    //   if (data != undefined) {
    //     let a = await utils.uplodeimg(data);
    //     this.get_img(a, "life_picture");
    //   }
    // },
    // 图片上传
    get_img(data, name) {
      var formData = new FormData();
      formData.append("file", data);
      this.$store.commit("show_looding");
      request({
        url: "/api/upload",
        method: "post",
        data: formData
      }).then(res => {
        this.$store.commit("hide_looding");
        console.log(res.data.data[0]);
        if (name == 0) {
          this.id_card0 = res.data.data[0];
        } else if (name == 1) {
          this.id_card1 = res.data.data[0];
        } else if (name == "design_pic_list") {
          this.design_pic_list.push(res.data.data[0]);
        }
        //  else if (name == "life_picture") {
        //   this.life_picture = this.user_info_datas.life_picture =
        //     res.data.data[0];
        // }
        else if (name == "avatar") {
          this.avatar = this.user_info_datas.avatar = res.data.data[0];
        }
      });
    },
    // 提交
    btn_tap() {
      // if (!/^1[34578]\d{9}$/.test(this.user_info_datas.mobile)) {
      //   this.$toast("请输入正确的手机号！");
      // } else
      if (
        !/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(this.user_info_datas.weixin)
      ) {
        this.$toast("请输入正确的微信号码！");
      } else if (
        this.user_info_datas.province == "" ||
        this.user_info_datas.city == ""
      ) {
        this.$toast("请选择地区！");
      } else if (
        this.user_info_datas.district == 0 &&
        this.select_district != ""
      ) {
        this.$toast("请选择区/县！");
        return;
      }
      this.user_info_datas.goods_type = this.goodarea_true.join();
      if (this.id_card0 == "") {
        this.$toast("请上传身份证正面照片！");
      } else if (this.id_card1 == "") {
        this.$toast("请上传身份证反面照片！");
      } else if (
        this.user_info_datas.say_to_user.length == "" ||
        this.user_info_datas.say_to_user.length < 20
      ) {
        this.$toast("请输入20字以上的内容！");
      } else if (
        this.user_info_datas.birth_month == "" ||
        this.user_info_datas.birth_year == ""
      ) {
        this.$toast("请选择出生年月！");
      } else if (this.goodarea_true == "") {
        this.$toast("请选择擅长的类型");
      } else {
        let arr = [this.id_card0, this.id_card1];
        this.user_info_datas.identification_info = JSON.stringify(arr);
        this.user_info_datas.show_picture = JSON.stringify(
          this.design_pic_list
        );
        this.user_info_datas.designer_works = JSON.stringify(
          this.user_info_datas.designer_works
        );
        this.user_info_datas.user_type = this.user_type_;
        this.$store.commit("show_looding");
        request({
          url: "/api/saveUserStaffInfo",
          data: this.user_info_datas,
          method: "post"
        }).then(data => {
          this.$store.commit("hide_looding");
          if (data.data.status == 200) {
            this.$toast("修改成功！");
            this.$router.go(-1);
          } else {
            this.$toast(data.data.msg);
          }
        });
      }
    },
    // 城市
    Province_change(e) {
      console.log(e);
      if (e.target.value != 0) {
        this.user_info_datas.province = e.target.value
        this.get_select_city();
      }
      this.select_City = this.select_district = [];
      this.user_info_datas.city = this.user_info_datas.district = 0;
    },
    City_change(e) {
      if (e.target.value != 0) {
        this.user_info_datas.city = e.target.value
        this.get_select_district();
        this.user_info_datas.district = 0;
      } else {
        this.select_district = [];
        this.user_info_datas.city = this.user_info_datas.district = 0;
      }
    },
    City_click() {
      if (this.user_info_datas.province == "") {
        this.$toast("请先选择省/市");
      }
    },
    district_change(e) {
      if (e.target.value != 0) {
        this.user_info_datas.district = e.target.value
      } else {
        this.user_info_datas.district = 0;
      }
    },
    district_click() {
      if (this.user_info_datas.city == "") {
        this.$toast("请先选择城市");
      }
    },
    get_select_Province(once) {
      request({
        url: "/api/getAllProvince",
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.select_Province = data.data.data;
          if (once) {
            this.get_select_city("once");
          }
        }
      });
    },
    get_select_city(once) {
      request({
        url: "/api/getAllCity",
        data: { province_id: this.user_info_datas.province },
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.select_City = data.data.data;
          if (once) {
            this.get_select_district(once);
          }
        }
      });
    },
    get_select_district() {
      request({
        url: "/api/getAllDistrict",
        data: { city_id: this.user_info_datas.city },
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.select_district = data.data.data;
        }
      });
    }
  }
};
</script>
<style scoped>
.head {
  height: 0.9rem;
  background-color: #2bbf4a;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.head h1 {
  font-size: 0.4rem;
  font-weight: bold;
}
.head > img {
  position: absolute;
  left: 0.2rem;
  width: 0.5rem;
  height: 0.5rem;
}
/* ------------------------------- */
h3 {
  font-size: 0.38rem;
  margin: 0.2rem 0;
  text-align: center;
  font-weight: bold;
}

.avatar_uplode {
  font-size: 0.3rem;
}
.avatar_uplode div {
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  border: 1px solid #f79646;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  box-sizing: content-box;
  padding: 0.1rem;
}

.avatar_uplode input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.avatar_uplode p {
  margin-top: 0.1rem;
  text-align: center;
}
.avatar_img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.succer ul li {
  border-bottom: 0.3px solid #7f7f7f;
  font-size: 0.3rem;
  padding: 0.2rem 0.4rem;
}

/* 性别 */
.gender {
  display: flex;
  align-items: center;
}
/* +++++++++++++++++++++++++++++++++++++++++++ */
.guke {
  margin-bottom: 0.6rem;
}
.guke span {
  font-weight: bold;
  white-space: nowrap;
}
.guke li {
  display: flex;
  flex-direction: row;
  margin: 0.2rem 0.4rem;
  font-size: 0.3rem;
}
.guke li input {
  margin-left: 0.1rem;
  width: 100%;
  border-bottom: 0.3px solid #7f7f7f !important;
}
.guke li p {
  margin-left: 0.1rem;
  width: 100%;
  border-bottom: 0.3px solid #7f7f7f !important;
}
.guke select {
  border: none;
}
.guke div {
  margin-left: 0.1rem;
  border-bottom: 0.3px solid #7f7f7f;
  width: 100%;
}
/* 生日 */
.active {
  background: rgb(105, 105, 109);
  color: white;
}

.birthday {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.succer li>span{
  font-weight: bold;
}
.birthday > div {
  flex: 1;
  display: flex;
  flex-direction: row;
}
.birthday select {
  font-size: 0.3rem;
  margin-right: 0.2rem;
}

.GoodArea {
  line-height: 0.6rem;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
}

.GoodArea div {
  display: flex;
  flex-wrap: wrap;
}

.GoodArea div span {
  position: relative;
  padding: 0 0.15rem;
  border: 1px solid #ff1284;
  border-radius: 0.1rem;
  margin: 0 0.17rem 0.17rem 0;
}
.GoodArea span img {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  bottom: -0.1rem;
  right: -0.1rem;
}
/* 职务 */
.post span {
  word-break: break-word;
}

/* 工作经历 */
.work_history {
  color: #ff1284;
  display: flex;
  align-items: center;
  justify-content: center;
}

.work_history img {
  margin-right: 0.2rem;
  width: 0.5rem;
  height: 0.5rem;
}
.work > div {
  position: relative;
  line-height: 0.6rem;
  border-bottom: 0.3px solid #7f7f7f;
}
.work > div:last-child {
  border: none;
}
.work div img {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  right: 0;
  top: 0;
}
.work_caozuo {
  text-align: right;
}
.work_caozuo span {
  color: #ff1284 !important;
  margin-left: 0.2rem;
  border: 1px solid #ff1284;
  padding: 0.02rem 0.1rem;
  border-radius: 0.1rem;
}
/* 身份证上传 */
.id_card p{
  font-weight: bold;
}
.id_card p span {
  font-weight: normal;
  color: #000;
}

.id_card > div {
  display: flex;
  flex-direction: row;
  margin-top: 0.3rem;
  justify-content: space-between;
}

.id_card_img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.11rem;
  height: 2.17rem;
  border-radius: 0.4rem;
  overflow: hidden;
  position: relative;
  border: 0.3px solid #7f7f7f;
}

.id_card_img input {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.id_card_img > div {
  height: 2.17rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.id_card_img > img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.id_card_img > div img {
  margin-bottom: 0.1rem;
  width:1rem;
  height: 1rem;
}

/* 话 */
.say_to_user > p {
  font-weight: bold;
  line-height: 0.5rem;
  margin-bottom: 0.1rem;
}

.say_to_user span {
  font-weight: normal;
  color: #000;
}

.say_to_user textarea {
  border: 0.3px solid #7f7f7f;
  width: 100%;
  height: auto;
  border-radius: 0.1rem;
  padding: 0.1rem;
}

/* 设计作品 */
.design_pic {
  padding: 0.2rem 0 0;
  margin-left: 0.4rem;
}

.design_pic p {
  font-size: 0.3rem;
  font-weight: bold;
}

.design_pic ul {
  overflow: hidden;
}

.design_pic li {
  border: none;
  position: relative;
  background: #f2f2f2;
  border-radius: 0.1rem;
  padding: 0;
  float: left;
  width: 1.51rem;
  height: 1.2rem;
  margin: 0.2rem 0.2rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.design_pic li > img {
  border-radius: 0.1rem;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.x_img {
  position: absolute;
  top: -0.1rem;
  right: -0.1rem;
  width: 0.3rem !important;
  height: 0.3rem !important;
}
.design_pic li:nth-child(4n) {
  margin-right: 0;
}

.design_up {
  position: relative;
}

.design_up div {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.design_up div img {
  width: 0.65rem;
  height: 0.65rem;
}

.design_up div span {
  color: #000;
  font-size: 0.3rem;
  white-space: nowrap;
}

.design_up input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

/* 生活照 */
.file_pics {
  padding: 0.2rem 0;
  margin-left: 0.4rem;
}

.file_pics p {
  margin-bottom: 0.2rem;
  font-size: 0.3rem;
}

.file_pics p span {
  color: #000;
}
.file_pics > div {
  position: relative;
  overflow: hidden;
  width: 1.54rem;
}
.file_pics div > div {
  height: 1.24rem;
  font-size: 0.28rem;
  color: #000;
  background: #f2f2f2;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 0.1rem;
}

.file_pics > div > img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.file_pics div div img {
  width: 0.65rem;
  height: 0.65rem;
}

.file_pics input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dialog {
  position: fixed;
  top: 0.9rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(44, 44, 44, 0.5);
}
.dialog > div {
  line-height: 0.6rem;
  overflow: hidden;
  border-radius: 0.1rem;
  font-size: 0.3rem;
  width: 5.8rem;
  margin: 2rem auto;
  background: white;
}
.work p span {
  color: #0066ff;
}
.dialog h3 {
  padding: 0.2rem 0 0.1rem;
  margin: 0;
}
.dialog input {
  width: 100%;
  padding: 0 0.1rem;
  font-size: 0.3rem;
  border-radius: 0.1rem;
  border: 0.3px solid #7f7f7f;
}
.dialog textarea {
  line-height: 0.4rem;
  border: 0.3px solid #7f7f7f;
  width: 100%;
  padding: 0.1rem;
  border-radius: 0.1rem;
}
.work_cont {
  margin: 0 0.3rem;
}
.work_cont input {
  height: 0.6rem;
}
.work_btn {
  background: #ff1284;
  display: flex;
  align-items: center;
}
.work_btn span {
  line-height: 0.8rem;
  flex: 1;
  text-align: center;
  color: white;
}
.work_btn span:first-child {
  border-right: 0.3px solid white;
}
.btn {
  text-align: center;
  color: white;
  font-size: 0.3rem;
  background: #ff1284;
  margin: 0.5rem;
  border-radius: 0.1rem;
  padding: 0.15rem 0;
}
</style>