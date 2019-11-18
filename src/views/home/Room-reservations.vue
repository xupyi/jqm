<template>
  <div id="room_reservations">
    <main>
      <section class="one_view">
        <p>量房是免费项目,无需交定金，请填写个人资料提交完成，工作人员会联系您，预约上门量房时间。</p>
        <div>
          您好！
          <span>(带✲号为必填项)</span>
        </div>
      </section>
      <section>
        <h3>
          <span>✲</span> 您的姓氏：
        </h3>
        <input v-model="val.surname" placeholder="姓氏" type="text" />
      </section>
      <section>
        <h3>
          <span>✲</span> 您的名字：
        </h3>
        <input v-model="val.name" placeholder="名字" type="text" />
      </section>
      <section>
        <h3>
          <span>✲</span> 您的性别：
        </h3>
        <span>
          <img @click="sex_tap(1)" :src="val.gender==1?active:normal" alt />
          <span>男</span>
        </span>
        <span>
          <img @click="sex_tap(2)" :src="val.gender==2?active:normal" alt />
          <span>女</span>
        </span>
      </section>
      <section class="add_city">
        <h3>
          <span>✲</span> 待量房屋地址：
        </h3>
        <div class="city">
          <select @change="Province_change">
            <option value="0" selected>请选择</option>
            <option v-for="(item, index) in select_Province" :key="index" :value="item.region_id">{{item.region_name}}
            </option>
          </select>
          <span>省/市</span>
          <select name id @change="City_change" @click="City_click">
            <option value="0">请选择</option>
            <option v-for="(item, index) in select_City" :key="index" :value="item.region_id">{{item.region_name}}
            </option>
          </select>
          <span>城市</span>
          <select @change="district_change" @click="district_click">
            <option value="0">请选择</option>
            <option v-for="(item, index) in select_district" :key="index" :value="item.region_id">{{item.region_name}}
            </option>
          </select>
          <span>区/县</span>
        </div>
      </section>
      <section class="detail_address">
        <h3>
          <span>✲</span> 详细地址：
        </h3>
        <input v-model="val.address" placeholder="详细到几栋几单元几室/什么路多少号" type="text" />
      </section>
      <section class="area">
        <h3>
          <span>✲</span> 待装修房屋面积：
        </h3>
        <span>
          <input v-model="val.room_area" pattern="/d" type="number" />平米
        </span>
      </section>
      <section>
        <h3>
          <span>✲</span> 装修类型：
        </h3>
        <span @click="type_tap(1)">
          <img :src="val.renovation_type==1?active:normal" alt />
          <span>翻新装修</span>
        </span>
        <span @click="type_tap(2)">
          <img :src="val.renovation_type==2?active:normal" alt />
          <span>新屋装修</span>
        </span>
      </section>
      <section class="style">
        <h3>
          <span>✲</span> 期望装修风格：
        </h3>
        <ul>
          <li :class="item.is?'act':''" @click="style_item(item.style_id,index)" v-for="(item, index) in style_datas"
            :key="index">
            {{item.style_name}}
            <img v-if="item.is" :src="active" alt />
          </li>
        </ul>
      </section>
      <section class="budget_area">
        <h3>
          <span>✲</span> 您的装修费用预算：
          <span class="budget_span">(不含家具软装及家电)</span>
        </h3>
        <div>
          <span>
            <input type="number" v-model="val.budget_min" @blur="budget_area" /> 万元
          </span>
          <span>~</span>
          <span>
            <input type="number" v-model="val.budget_max" @blur="budget_area" />万元
          </span>
        </div>
      </section>
      <section class="time">
        <h3>
          <span>✲</span> 计划装修时间：
        </h3>
        <div>
          <select v-model="val.renovation_start_year" @change="renovation_tap">
            <option value selected>年</option>
            <option :value="item" v-for="(item, index) in date" :key="index">{{item}}年</option>
          </select>
          <select v-model="val.renovation_start_month" @change="renovation_tap">
            <option value selected>月</option>
            <option :value="item" v-for="(item, index) in 12" :key="index">{{item}}月</option>
          </select>
          <span>至</span>
          <select v-model="val.renovation_end_year" @change="renovation_tap">
            <option value selected>年</option>
            <option :value="item" v-for="(item, index) in date" :key="index">{{item}}年</option>
          </select>
          <select v-model="val.renovation_end_month" @change="renovation_tap">
            <option value selected>月</option>
            <option :value="item" v-for="(item, index) in 12" :key="index">{{item}}月</option>
          </select>
        </div>
      </section>
      <section class="time">
        <h3>
          <span>✲</span> 计划入住时间：
        </h3>
        <div>
          <select v-model="val.check_in_start_year" @change="check_tap">
            <option value selected>年</option>
            <option :value="item" v-for="(item, index) in date" :key="index">{{item}}年</option>
          </select>
          <select v-model="val.check_in_start_month" @change="check_tap">
            <option value selected>月</option>
            <option :value="item" v-for="(item, index) in 12" :key="index">{{item}}月</option>
          </select>
          <span>至</span>
          <select v-model="val.check_in_end_year" @change="check_tap">
            <option value selected>年</option>
            <option :value="item" v-for="(item, index) in date" :key="index">{{item}}年</option>
          </select>
          <select v-model="val.check_in_end_month" @change="check_tap">
            <option value selected>月</option>
            <option :value="item" v-for="(item, index) in 12" :key="index">{{item}}月</option>
          </select>
        </div>
      </section>
      <section class="channel">
        <h3>
          <span>✲</span> 您是通过什么方式知道我们：
        </h3>
        <ul>
          <li @click="channel_tap(item.id)" v-for="(item, index) in channel_datas" :key="index">
            <img :src="val.channel_id==item.id?active:normal" alt />
            <span>{{item.channel_name}}</span>
          </li>
        </ul>
        <h3 class="remark_h3">您对房屋装修的要求和期待（10字以上）</h3>
        <textarea placeholder="请输入内容~" v-model="val.remark" name id cols="10" rows="5"></textarea>
      </section>
      <section class="up">
        <div class="uplode">
          <h3>上传户型图：(上传照片要能看清标注尺寸)</h3>
          <div class="photo">
            <ul>
              <li class="photo_li" v-for="(item, index) in val.renovation_picture" :key="index">
                <img @click="big_pic(item)" class="up_img" :src="item" alt />
                <img class="x_img" @click="renovation_x_tap(index)" src="../../assets/home_img/guanbi.png" alt />
              </li>
              <li class="photo_li photo_jia">
                <input name="file" type="file" accept="image/*" @change="renovation_datas_tap" />
                <img class="jia_img" src="../../assets/home_img/up_img01.png" alt />
                <span>添加照片</span>
              </li>
            </ul>
          </div>
          <h3>上传几张您喜欢的装修效果图：(最多允许上传10张图片)</h3>
          <div class="photo">
            <ul>
              <li class="photo_li" v-for="(item, index) in val.apartment_picture" :key="index">
                <img @click="big_pic(item)" class="up_img" :src="item" alt />
                <img class="x_img" @click="apart_x_tap(index)" src="../../assets/home_img/guanbi.png" alt />
              </li>
              <li class="photo_li photo_jia">
                <input name="file" type="file" accept="image/*" @change="apart_data_tap" />
                <img class="jia_img" src="../../assets/home_img/up_img01.png" alt />
                <span>添加照片</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div class="submit" @click="submit">提交完成</div>
    </main>
    <div v-if="is_show" class="shadow" @touchmove.prevent>
      <div>
        <div class="cont">
          <h3>顾客您好！</h3>
          <p><span>您已经提交过量房预约信息，修改已提交的</span><span>量房预约信息，请点击 “进入个人中心” ，</span><span>如果您还有其房屋需要预约量房，请点击</span> <span>
              “新房预约” 。</span></p>
        </div>
        <p class="define">
          <router-link to="/personal">进入个人中心</router-link>
          <a @click="show_tap">新房预约</a>
        </p>
      </div>
    </div>
    <div class="shadow" v-if="shadow" @touchmove.prevent>
      <div class="link1">
        <div v-if="nowtime" class="cont1">感谢您对我们的信任，稍后会有我们的工作人员和您联系。</div>
        <div v-else class="cont1">感谢您对我们的信任，我们的工作人员会在上班时间与您联系</div>
        <p class="define1" @click="bbtn">确定</p>
      </div>
    </div>
  </div>
</template>

<script>
  import request from "@/request.js";
  import utils from "@/utils.js";
  export default {
    data() {
      return {
        shadow: false,
        is_show: true,
        normal: require("../../assets/home_img/yuan.png"),
        active: require("../../assets/home_img/dui.png"),
        val: {
          id: "",
          surname: "", //是	string 姓
          name: "", //是	string	名
          gender: 0, //是	int	性别(0保密,1男,2女)
          address: "", //是	string	详细地址
          room_area: "", //是	int	房屋面积
          budget_min: "", //是	int	最小预算
          budget_max: "", //是	int	最大预算
          renovation_end_month: "", //是	int	希望装修结束月份
          renovation_end_year: "", //是	int	希望装修结束年份
          renovation_start_month: "", //是	int	希望装修开始月份
          renovation_start_year: "", //	是	int	希望装修开始年份
          style_type_id: "", //是	int	装修风格id(多个请使用, 号拼接)
          renovation_type: "", //是	int	装修类型(1新房,2翻修)
          remark: "", //是	string	要求和期待
          renovation_picture: [], //是	string	户型图, 请将多个图片使用数组格式 JSON.stringify(）格式
          apartment_picture: [], //是	string	装修效果图
          check_in_end_month: "", //是	int	希望入住结束月份
          check_in_end_year: "",
          check_in_start_month: "",
          check_in_start_year: "",
          province: "", //省份id
          city: "", //市id
          district: "", //区id
          channel_id: "" //是	int	渠道id
        },
        channel_datas: [], //渠道列表
        style_datas: [], //装修风格列表
        style_active_datas: [],
        select_Province: [], //省列表
        select_City: [], //城市列表
        select_district: [], //区县列表
        date: [],
        nowtime: ""
      };
    },
    created() {
      // 获取装修风格
      request({
          url: "/api/getStyleList",
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.status == 200) {
            for (let index = 0; index < data.data.data.length; index++) {
              data.data.data[index].is = false;
            }
            this.style_datas = data.data.data;
          }
        }),
        // 获取渠道
        request({
          url: "/api/getChannelList",
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.status == 200) {
            this.channel_datas = data.data.data;
          }
        }),
        // 获取省份
        request({
          url: "/api/getAllProvince",
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            this.select_Province = data.data.data;
          }
        });
      var time = new Date();
      var year = time.getUTCFullYear();
      for (let index = year; index < year + 10; index++) {
        this.date.push(index);
      }
    },

    methods: {
      big_pic(url) {
        this.$store.state.amplify_img = url;
      },
      // 判断装修时间是否大于入住时间
      renovation_tap() {
        if (this.val.check_in_start_year != "" && this.val.renovation_end_year != "") {
          if (this.val.check_in_start_year == this.val.renovation_end_year) {
            if (
              this.val.check_in_start_month != "" &&
              this.val.renovation_end_month != ""
            ) {
              if (this.val.check_in_start_month < this.val.renovation_end_month) {
                this.$toast("装修结束时间不能大于计划入住时间！");
                this.val.check_in_start_month = "";
                this.val.renovation_end_month = "";
              }
            }
          } else if (
            Number(this.val.check_in_start_year) <
            Number(this.val.renovation_end_year)
          ) {
            this.$toast("装修结束时间不能大于计划入住时间！");
            this.val.check_in_start_year = "";
            this.val.renovation_end_year = "";
          }
        }
        if (
          this.val.renovation_start_year != "" &&
          this.val.renovation_end_year != ""
        ) {
          if (this.val.renovation_start_year == this.val.renovation_end_year) {
            if (
              this.val.renovation_start_month != "" &&
              this.val.renovation_end_month != ""
            ) {
              if (
                this.val.renovation_start_month > this.val.renovation_end_month
              ) {
                this.$toast("开始时间不能大于结束时间！");
                this.val.renovation_start_month = "";
                this.val.renovation_end_month = "";
              }
            }
          } else if (
            Number(this.val.renovation_start_year) >
            Number(this.val.renovation_end_year)
          ) {
            this.$toast("开始时间不能大于结束时间！");
            this.val.renovation_start_year = "";
            this.val.renovation_end_year = "";
          }
        }
      },
      check_tap() {
        if (this.val.check_in_start_year != "" && this.val.renovation_end_year != "") {
          if (this.val.check_in_start_year == this.val.renovation_end_year) {
            if (
              this.val.check_in_start_month != "" &&
              this.val.renovation_end_month != ""
            ) {
              if (this.val.check_in_start_month < this.val.renovation_end_month) {
                this.$toast("装修结束时间不能大于计划入住时间！");
                this.val.check_in_start_month = "";
                this.val.renovation_end_month = "";
              }
            }
          } else if (
            Number(this.val.check_in_start_year) <
            Number(this.val.renovation_end_year)
          ) {
            this.$toast("装修结束时间不能大于计划入住时间！");
            this.val.check_in_start_year = "";
            this.val.renovation_end_year = "";
          }
        }
        if (
          this.val.check_in_start_year != "" &&
          this.val.check_in_end_year != ""
        ) {
          if (this.val.check_in_start_year == this.val.check_in_end_year) {
            if (
              this.val.check_in_start_month != "" &&
              this.val.check_in_end_month != ""
            ) {
              if (this.val.check_in_start_month > this.val.check_in_end_month) {
                this.$toast("开始时间不能大于结束时间！");
                this.val.check_in_start_month = "";
                this.val.check_in_end_month = "";
              }
            }
          } else if (
            Number(this.val.check_in_start_year) >
            Number(this.val.check_in_end_year)
          ) {
            this.$toast("开始时间不能大于结束时间！");
            this.val.check_in_start_year = "";
            this.val.check_in_end_year = "";
          }
        }
      },
      budget_area(e) {
        console.log(e.target.value);
        if (this.val.budget_min != "" && this.val.budget_max != "") {
          console.log(this.val.budget_min, this.val.budget_max);
          console.log(1);
          this.val.budget_min = this.val.budget_max = "";
          this.$toast("最小预算不能大于最大预算！");
                if (Number(this.val.budget_min) > Number(this.val.budget_max)) {
          }
        }
      },
      // 友情提醒
      bbtn() {
        this.shadow = false;
        this.$router.push("./design");
      },
      show_tap() {
        this.is_show = false;
      },
      sex_tap(i) {
        this.val.gender = i;
      },
      type_tap(i) {
        this.val.renovation_type = i;
      },
      channel_tap(i) {
        this.val.channel_id = this.val.channel_id == i ? '' : i;
      },
      // 选择装修风格
      style_item(i, index) {
        var a = this.style_active_datas.indexOf(i);
        if (a > -1) {
          this.style_active_datas.splice(a, 1);
          this.style_datas[index].is = false;
        } else {
          if (this.style_active_datas.length >= 2) {
            this.$toast("最多选择两项");
          } else {
            this.style_datas[index].is = true;
            this.style_active_datas.push(i);
          }
        }
      },
      // 上传图片
      up_img(data, name) {
        var formData = new FormData();
        formData.append("file", data);
        this.$store.commit("show_looding");
        request({
          url: "/api/upload",
          method: "post",
          data: formData
        }).then(res => {
          this.$store.commit("hide_looding");
          if (res) {
            console.log(res.data.data[0]);
            this.val[name].push(res.data.data[0]);
          } else {
            console.log(err);
          }
        });
      },
      // 户型图
      async renovation_datas_tap(e) {
        if (this.val.renovation_picture.length > 10) {
          this.$toast("最多上传10张图片");
        } else {
          let data = e.target.files[0];
          if (data != undefined) {
            console.log(data);
            var that = this;
            let a = await utils.uplodeimg(data);
            that.up_img(a, "renovation_picture");
          }
        }
      },
      renovation_x_tap(i) {
        this.val.renovation_picture.splice(i, 1);
      },
      // 上传几张您喜欢的装修效果图：
      async apart_data_tap(e) {
        if (this.val.apartment_picture.length > 10) {
          this.$toast("最多上传10张图片");
        } else {
          let data = e.target.files[0];
          if (data != undefined) {
            console.log(data);
            var that = this;
            let a = await utils.uplodeimg(data);
            that.up_img(a, "apartment_picture");
          }
        }
      },
      apart_x_tap(i) {
        this.val.apartment_picture.splice(i, 1);
      },
      // 提交完成
      submit() {
        console.log(this.val);
        this.nowtime = 8 < new Date().getHours() < 17 ? true : false;
        if (this.val.name == "" || this.val.surname == "") {
          this.$toast("请输入姓名");
          return;
        }
        if (this.val.area == "") {
          this.$toast("请输入房屋面积");
          return;
        }
        if (
          this.val.province == "" ||
          this.val.city == "" ||
          this.val.district == ""
        ) {
          this.$toast("请填写地址");
          return;
        }

        if (this.val.remark != "" && this.val.remark.length < 10) {
          this.$toast("要求和期待不能少于10字！");
        } else {
          this.val.renovation_picture =
            this.val.renovation_picture == "" ?
            "" :
            JSON.stringify(this.val.renovation_picture);
          this.val.style_type_id =
            this.style_active_datas == "" ?
            "" :
            JSON.stringify(this.style_active_datas);
          this.val.apartment_picture =
            this.val.apartment_picture == "" ?
            "" :
            JSON.stringify(this.val.apartment_picture);
          this.$store.commit("show_looding");
          request({
            url: "/api/SaveQuantityRoom",
            data: this.val,
            method: "post"
          }).then(data => {
            console.log(data.data);
            this.$store.commit("hide_looding");
            if (data.data.status == 200) {
              this.val.renovation_picture = [];
              this.val.apartment_picture = [];
              this.shadow = true;
            }
          });
        }
      },
      Province_change(e) {
        console.log(e);
        if (e.target.value != 0) {
          this.val.province = e.target.value
          this.select_City = this.select_district = [];
          this.val.city = this.val.district = "";
          this.get_select_city();
        }
      },
      City_change(e) {
        if (e.target.value != 0) {
          this.val.city = e.target.value
          this.select_district = [];
          this.val.district = "";
          this.get_select_district();
        } else {
          this.select_district = [];
          this.val.city = this.val.district = "";
        }
      },
      City_click() {
        if (this.val.province == "") {
          this.$toast("请先选择省/市");
        }
      },
      district_change(e) {
        if (e.target.value != 0) {
          this.val.district = e.target.value
        } else {
          this.val.district = "";
        }
      },
      district_click() {
        if (this.val.city == "") {
          this.$toast("请先选择城市");
        }
      },
      get_select_city() {
        request({
          url: "/api/getAllCity",
          data: {
            province_id: this.val.province
          },
          method: "post"
        }).then(data => {
          console.log(data.data);
          if (data.data.status == 200) {
            this.select_City = data.data.data;
            this.get_select_district();
          }
        });
      },
      get_select_district() {
        console.log("district");
        request({
          url: "/api/getAllDistrict",
          data: {
            city_id: this.val.city
          },
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
  .van-uploader {
    width: 1rem;
    border: 1px solid red;
    height: 1rem;
  }

  .act {
    border-color: #fd2691 !important;
    color: #fd2691;
  }

  /* shadow--------------------------------】 */

  .shadow {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99;
  }

  .shadow>div {
    border-radius: 0.1rem;
    overflow: hidden;
    width: 6rem;
    margin: 4rem auto;
  }

  .shadow .cont {
    font-size: 0.26rem;
    padding: 0.4rem;
    background: white;
    text-align: center;
  }

  .shadow .cont h3 {
    font-size: 0.28rem;
    margin-bottom: 0.2rem;
  }

  .shadow .cont p {
    line-height: 0.4rem;
    text-align: justify;
    display: flex;
    flex-direction: column;
  }

  .shadow .define {
    display: flex;
    justify-content: center;
    font-size: 0.26rem;
    align-items: center;
    background-color: #ff1284;
  }

  .define a {
    flex: 1;
    padding: 0.15rem 0;
  }

  .define a:last-child {
    border-left: 1px solid #fff;
  }

  .shadow .define a {
    text-align: center;
    color: white;
  }

  /* main */
  #room_reservations section {
    font-size: 0.3rem;
    border-bottom: 0.3px solid #ccc;
    padding: 0.15rem 0.3rem;
  }

  #room_reservations .channel {
    border: none;
  }

  .one_view p {
    font-size: 0.28rem;
    color: red;
  }

  .one_view div {
    padding: 0.2rem 0 0;
    font-size: 0.3rem;
  }

  .one_view div span {
    color: #ff1284;
  }

  #room_reservations section h3 span {
    color: #ff1284;
    margin-right: 0.1rem;
    font-size: 0.32rem;
  }

  section>span img {
    vertical-align: middle;

    width: 0.4rem;
    height: 0.4rem;
  }

  section>span>span {
    vertical-align: middle;
  }

  section>span {
    margin-right: 0.4rem;
  }

  .item_cont p span {
    font-size: 0.26rem;
  }

  #room_reservations section>h3 {
    display: inline-block;
    font-size: 0.28rem;
  }

  #room_reservations section>input {
    font-size: 0.28rem;
    width: 70%;
  }

  /* x详详细地址 */
  .detail_address {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .detail_address input {
    flex: 1;
  }

  /* 面积 */
  .area input {
    margin-right: 0.15rem;
    border: 1px solid #9c9c9c;
    border-radius: 0.1rem;
    width: 2rem;
    padding: 0.05rem 0.1rem;
  }

  .style ul {
    overflow: hidden;
    padding: 0.1rem;
  }

  .style li {
    font-size: 0.26rem;
    text-align: center;
    float: left;
    border: 1px solid #9c9c9c;
    padding: 0.1rem 0;
    width: 23%;
    margin: 1%;
    border-radius: 0.1rem;
    position: relative;
  }

  .style li img {
    position: absolute;
    right: -0.15rem;
    bottom: -0.15rem;
    width: 0.3rem;
    height: 0.3rem;
  }

  .budget_span {
    font-size: 0.28rem !important;
  }

  .budget_area div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-weight: bold;
    margin-top: 0.2rem;
  }

  .budget_area span {
    font-weight: normal;
  }

  .budget_area input {
    text-align: center;
    margin-right: 0.15rem;
    border: 1px solid #9c9c9c;
    border-radius: 0.1rem;
    width: 1.8rem;
    padding: 0.1rem;
  }

  /* 时间 */
  .time {
    overflow: hidden;
  }

  .time>div {
    margin-top: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .time select {
    color: #0066ff;
    font-size: 0.24rem;
  }

  .channel {
    padding: 0.2rem 0.3rem 0.1rem !important;
  }

  .channel h3 {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .channel ul {
    margin-left: 0.3rem;
    overflow: hidden;
    line-height: 0.6rem;
  }

  .channel li {
    float: left;
    width: 33.3%;
    display: flex;
    align-items: center;
  }

  .channel li img {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.05rem;
  }

  .channel textarea {
    font-size: 0.24rem;
    padding: 0.1rem;
    border-radius: 0.1rem;
    width: 100%;
  }

  .remark_h3 {
    margin: 0.1rem 0 0;
  }

  /* 上传图片 */
  .up {
    padding-top: 0 !important;
    border-bottom: 0 !important;
  }

  .uplode h3 {
    font-size: 0.28rem;
  }

  .uplode p {
    font-size: 0.28rem;
    margin: 0 0.18rem;
  }

  .photo ul {
    overflow: hidden;
    padding-top: 0.2rem;
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
    width: 22%;
    height: 1.25rem;
    margin: 0 2.5% 0.2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #9c9c9c;
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

  /* 提交 */
  .submit {
    text-align: center;
    background: #ff1284;
    color: white;
    padding: 0.2rem;
    border-radius: 0.1rem;
    margin: 0 0.4rem 0.8rem;
    font-size: 0.3rem;
  }

  /* 城市列表 */
  .add_city {
    display: flex;
    flex-direction: column;
  }

  .city {
    margin-top: 0.1rem;
    width: 100%;
    font-size: 0.3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .city span {
    font-size: 0.26rem;
  }

  .city select {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: -1%;
    font-size: 0.26rem;
    color: #0066ff;
  }

  /* +++++++++++++++++++++++++++++++++++++++++++= */
  .cont1 {
    font-size: 0.3rem;
    padding: 0.8rem;
    background: white;
  }

  .define1 {
    font-size: 0.3rem;
    text-align: center !important;
    background: #ff1284;
    color: white;
    padding: 0.2rem;
  }

  .order p {
    color: #fd2691;
  }

</style>
