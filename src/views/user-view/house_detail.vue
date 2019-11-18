<template>
  <div id="room_reservations">
    <main>
      <section class="one_view">
        <p>修改房屋信息</p>
        <div>
          {{val.surname}}{{val.gender==1?'先生':'女士'}}您好！
          <span>(带✲号为必填项)</span>
        </div>
      </section>
      <section>
        <h3>
          <span>✲</span>您的姓氏：
        </h3>
        <input v-model="val.surname" maxlength="5" placeholder="姓氏" type="text" />
      </section>
      <section>
        <h3>
          <span>✲</span>您的名字：
        </h3>
        <input v-model="val.name" maxlength="10" placeholder="名字" type="text" />
      </section>
      <section>
        <h3>
          <span>✲</span>您的性别：
        </h3>
        <span @click="sex_tap(1)">
          <img :src="val.gender==1?active:normal" alt />
          <span>男</span>
        </span>
        <span @click="sex_tap(2)">
          <img :src="val.gender==2?active:normal" alt />
          <span>女</span>
        </span>
      </section>
      <section class="add_city">
        <h3>
          <span>✲</span>待量房屋地址：
        </h3>
        <div class="city">
          <select @change="Province_change" :value="val.province">
            <option selected value="0">请选择</option>
            <option
              v-for="(item, index) in select_Province"
              :key="index"
              :value="item.region_id"
            >{{item.region_name}}</option>
          </select>
          <span>省/市</span>
          <select @change="City_change" @click="City_click" :value="val.city">
            <option selected value="0">请选择</option>
            <option
              v-for="(item, index) in select_City"
              :value="item.region_id"
              :key="index"
            >{{item.region_name}}</option>
          </select>
          <span>城市</span>
          <select @change="district_change" @click="district_click" :value="val.district">
            <option selected value="0">请选择</option>
            <option
              v-for="(item, index) in select_district"
              :value="item.region_id"
              :key="index"
            >{{item.region_name}}</option>
          </select>
          <span>区/县</span>
        </div>
      </section>
      <section>
        <h3>
          <span style="opacity:0">✲</span>详细地址：
        </h3>
        <input v-model="val.address" placeholder="详细到几栋几单元几室多少号" type="text" />
      </section>
      <section class="area">
        <h3>
          <span>✲</span>待装修房屋面积：
        </h3>
        <span>
          <input v-model="val.room_area" type="number" />平米
        </span>
      </section>
      <section>
        <h3>
          <span>✲</span>装修类型：
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
      <div class="style">
        <h3>
          <span>✲</span>期望装修风格：
        </h3>
        <ul>
          <li
            :class="item.is?'fir':''"
            @click="style_item(item.style_id,index)"
            v-for="(item, index) in style_datas"
            :key="index"
          >
            {{item.style_name}}
            <img v-if="item.is" src="../../assets/home_img/dui.png" alt />
          </li>
        </ul>
      </div>
      <section class="budget_area">
        <h3>
          <span>✲</span>您的装修费用预算：
          <span class="budget_span">(不含家具软装及家电)</span>
        </h3>
        <div>
          <span>
            <input type="number" @change="budget_area" v-model="val.budget_min" /> 万元
          </span>
          <span>~</span>
          <span>
            <input type="number" @change="budget_area" v-model="val.budget_max" />万元
          </span>
        </div>
      </section>
      <section class="time">
        <h3>
          <span>✲</span>计划装修时间：
        </h3>
        <div>
          <select v-model="val.renovation_start_year" @change="renovation_tap">
            <option value selected disabled>年</option>
            <option :value="item" v-for="(item, index) in date" :key="index">{{item}}年</option>
          </select>
          <select v-model="val.renovation_start_month" @change="renovation_tap">
            <option value selected disabled>月</option>
            <option :value="item" v-for="(item, index) in 12" :key="index">{{item}}月</option>
          </select>
          <span>至</span>
          <select v-model="val.renovation_end_year" @change="renovation_tap">
            <option value selected disabled>年</option>
            <option :value="item" v-for="(item, index) in date" :key="index">{{item}}年</option>
          </select>
          <select v-model="val.renovation_end_month" @change="renovation_tap">
            <option value selected disabled>月</option>
            <option :value="item" v-for="(item, index) in 12" :key="index">{{item}}月</option>
          </select>
        </div>
      </section>
      <section class="time">
        <h3>
          <span>✲</span>计划入住时间：
        </h3>
        <div>
          <select v-model="val.check_in_start_year" @change="check_tap">
            <option value selected disabled>年</option>
            <option :value="item" v-for="(item, index) in date" :key="index">{{item}}年</option>
          </select>
          <select v-model="val.check_in_start_month" @change="check_tap">
            <option value selected disabled>月</option>
            <option :value="item" v-for="(item, index) in 12" :key="index">{{item}}月</option>
          </select>
          <span>至</span>
          <select v-model="val.check_in_end_year" @change="check_tap">
            <option value selected disabled>年</option>
            <option :value="item" v-for="(item, index) in date" :key="index">{{item}}年</option>
          </select>
          <select v-model="val.check_in_end_month" @change="check_tap">
            <option value selected disabled>月</option>
            <option :value="item" v-for="(item, index) in 12" :key="index">{{item}}月</option>
          </select>
        </div>
      </section>
      <section class="channel">
        <h3>
          <span>✲</span>您是通过什么方式知道我们：
        </h3>
        <ul>
          <li @click="channel_tap(item.id)" v-for="(item, index) in channel_datas" :key="index">
            <img :src="val.channel_id==item.id?active:normal" alt />
            <span>{{item.channel_name}}</span>
          </li>
        </ul>
        <h3 class="remark_h3">您对房屋装修的要求和期待(10字以上)</h3>
        <textarea placeholder="请输入内容~" v-model="val.remark" name id cols="10" rows="5"></textarea>
      </section>
      <div class="uplode">
        <h3>上传户型图：(能看清标准的尺寸)</h3>
        <div class="photo">
          <ul>
            <li
              class="photo_li"
              v-show="val.renovation_picture!='[]'"
              v-for="(item, index) in val.renovation_picture"
              :key="index"
            >
              <img class="up_img" @click="renovation(item)" :src="item" alt />
              <img
                class="x_img"
                @click="renovation_x_tap(index)"
                src="../../assets/home_img/guanbi.png"
                alt
              />
            </li>
            <li class="photo_li photo_jia">
              <input name="file" type="file" @change="renovation_datas_tap" multiple="multiple" />
              <img class="jia_img" src="../../assets/home_img/up_img03.png" alt />
              <span>添加照片</span>
            </li>
          </ul>
        </div>
        <h3>上传几张您喜欢的装修效果图：(最多允许上传10张图片)</h3>
        <div class="photo">
          <ul>
            <li
              class="photo_li"
              v-show="val.apartment_picture!='[]'"
              v-for="(item, index) in val.apartment_picture"
              :key="index"
            >
              <img class="up_img" @click="renovation(item)" :src="item" alt />
              <img
                class="x_img"
                @click="apart_x_tap(index)"
                src="../../assets/home_img/guanbi.png"
                alt
              />
            </li>
            <li class="photo_li photo_jia">
              <input name="file" type="file" @change="apart_data_tap" multiple="multiple" />
              <img class="jia_img" src="../../assets/home_img/up_img03.png" alt />
              <span>添加照片</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="submit" @click="submit">提交完成</div>
    </main>
  </div>
</template>

<script>
import request from "@/request.js";
export default {
  data() {
    return {
      normal: require("../../assets/home_img/yuan.png"),
      active: require("../../assets/home_img/dui.png"),
      val: {},
      channel_datas: [], //渠道列表
      style_datas: [], //装修风格列表
      select_Province: [],
      select_City: [],
      style_active_datas: [],
      select_district: [],
      date: []
    };
  },
  created() {
    // 获取装修风格
    var style_array = "";
    request({
      url: "/api/getStyleList",
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.status == 200) {
        for (let index = 0; index < data.data.data.length; index++) {
          data.data.data[index].is = false;
        }
        console.log(data.data.data);
        style_array = data.data.data;
      }
    }),
      // 获取房屋信息
      this.$store.commit("show_looding");
    request({
      url: "/api/getQuantityRoomDetail",
      data: { id: this.$route.query.id },
      method: "post"
    }).then(data => {
      this.$store.commit("hide_looding");
      console.log(data);
      if (data.status == 200) {
        // 获取渠道
        request({
          url: "/api/getChannelList",
          method: "post"
        }).then(data => {
          console.log(data);
          if (data.status == 200) {
            this.channel_datas = data.data.data;
          }
        });
        this.val = data.data.data;
        this.get_select_Province("once");
        this.get_select_city("once");
        var brr = JSON.parse(data.data.data.style_type_id);
        this.style_active_datas = brr;
        for (let index = 0; index < style_array.length; index++) {
          var style = style_array[index];
          for (let f = 0; f < brr.length; f++) {
            if (brr[f] == style.style_id) {
              style.is = true;
            }
          }
        }
        this.style_datas = style_array;
      }
    });

    var time = new Date();
    var year = time.getUTCFullYear();
    for (let index = year; index < year + 10; index++) {
      this.date.push(index);
    }
  },
  methods: {
    
    // 图片放大
    renovation(i) {
      this.$store.state.amplify_img = i;
    },
    sex_tap(i) {
      this.val.gender = i;
    },
    type_tap(i) {
      this.val.renovation_type = i;
    },
    channel_tap(i) {
      this.val.channel_id = i;
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
    up_img(data, name) {
      var formData = new FormData();
      formData.append("file", data);
      request({
        url: "/api/upload",
        method: "post",
        data: formData
      }).then(res => {
        console.log(res.data.data[0]);
        this.val[name].push(res.data.data[0]);
      });
    },
    // 户型图
    renovation_datas_tap(e) {
      let data = e.target.files[0];
      this.up_img(data, "renovation_picture");
    },
    renovation_x_tap(i) {
      this.val.renovation_picture.splice(i, 1);
    },
    // 上传几张您喜欢的装修效果图：
    apart_data_tap(e) {
      let data = e.target.files[0];
      this.up_img(data, "apartment_picture");
    },
    apart_x_tap(i) {
      this.val.apartment_picture.splice(i, 1);
    },
    // 提交完成
    submit() {
      console.log(this.val);
      if (this.val.remark == null) {
        this.val.remark = "";
      }
      if (
        this.val.name == "" ||
        this.val.area == "" ||
        this.val.province == "" ||
        this.val.city == "" ||
        this.val.district == ""
      ) {
        this.$toast("请完善信息");
      } else if (this.val.remark != "" && this.val.remark.length < 10) {
        this.$toast("不能少于10字");
      } else if (this.style_active_datas == "") {
        this.$toast("请选择期待的装修风格");
      } else {
        this.val.apartment_picture = JSON.stringify(this.val.apartment_picture);
        this.val.renovation_picture = JSON.stringify(
          this.val.renovation_picture
        );
        this.val.style_type_id = JSON.stringify(this.style_active_datas);
        this.$store.commit("show_looding");
        request({
          url: "/api/SaveQuantityRoom",
          data: this.val,
          method: "post"
        }).then(data => {
          console.log(data.data);
          this.$store.commit("hide_looding");
          if (data.data.status == 200) {
            this.$toast("房屋信息修改成功");
            this.$router.go(-1);
          } else {
            this.$toast(data.data.msg);
          }
        });
      }
    },
    Province_change(e) {
      console.log(e);
      if (e.target.value != 0) {
        this.val.province = e.target.value
        this.get_select_city();
      }
      this.select_City = this.select_district = [];
      this.val.city = this.val.district = 0;
    },
    City_change(e) {
      if (e.target.value != 0) {
        this.val.city = e.target.value
        this.get_select_district();
        this.val.district = 0;
      } else {
        this.select_district = [];
        this.val.city = this.val.district = 0;
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
        this.val.district = 0;
      }
    },
    district_click() {
      if (this.val.city == "") {
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
        data: { province_id: this.val.province },
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
        data: { city_id: this.val.city },
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status == 200) {
          this.select_district = data.data.data;
        }
      });
    },
    // _______________判断时间________________________----
    renovation_tap() {
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
        if (Number(this.val.budget_min) > Number(this.val.budget_max)) {
          console.log(1);
          this.val.budget_min = this.val.budget_max = "";
          this.$toast("最小预算不能大于最大预算！");
        }
      }
    }
  }
};
</script>

<style scoped>
/* main */
#room_reservations section {
  font-size: 0.3rem;
  border-bottom: 0.3px solid #9c9c9c;
  padding: 0.15rem 0.3rem;
}

#room_reservations .channel {
  border: none;
}

.one_view > p {
  font-weight: bold;
  font-size: 0.36rem;
  text-align: center;
  padding: 0.2rem 0;
}
.one_view div {
  padding: 0.3rem 0 0;
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
section > span img {
  vertical-align: middle;
  width: 0.4rem;
  height: 0.4rem;
}
section > span > span {
  vertical-align: middle;
}
section > span {
  margin-right: 0.4rem;
}
.item_cont p span {
  font-size: 0.26rem;
}

#room_reservations section > h3 {
  display: inline-block;
  font-size: 0.28rem;
}

#room_reservations section > input {
  font-size: 0.28rem;
  width: 70%;
}
/* 面积 */
.area input {
  margin-right: 0.15rem;
  border: 1px solid #bfbfbf;
  border-radius: 0.1rem;
  width: 2rem;
  padding: 0.05rem;
}
.style {
  font-size: 0.3rem;
  border-bottom: 1px solid #9c9c9c;
}
.style span{
  color: #ff1284;
  margin-right: 0.1rem;
  font-size: 0.32rem;
}
.style h3{
  display: inline-block;
  font-size: 0.28rem;
  padding:  0.15rem 0.3rem 0;
}
.style ul {
  padding: 0.1rem 0.3rem 0.15rem;
  overflow: hidden;
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
.fir {
  color: white;
  color: #ff1284;
  border-color: #ff1284 !important;
}

.budget_span {
  font-size: 0.3rem !important;
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
  border: 1px solid #bfbfbf;
  border-radius: 0.1rem;
  width: 1.8rem;
  padding: 0.1rem;
}

/* 时间 */
.time {
  overflow: hidden;
}

.time > div {
  margin-top: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.channel {
  padding: 0.2rem 0.3rem 0.1rem !important ;
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
}

.channel li img {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.1rem;
  vertical-align: middle;
}

.channel li span {
  vertical-align: middle;
}

.channel textarea {
  padding: 0.1rem;
  border-radius: 0.1rem;
  width: 100%;
}

.remark_h3 {
  margin: 0.1rem 0;
}
/* 上传图片 */
.uplode {
  padding: 0 0.3rem;
}
.uplode h3 {
  font-size: 0.28rem;
}
.uplode p {
  font-size: 0.3rem;
  margin: 0 0.18rem;
}

.photo ul {
  overflow: hidden;
  padding: 0.2rem 0.2rem 0;
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
  width: 1.35rem;
  height: 1.12rem;
  margin: 0 0.2rem 0.2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #dbdbdb;
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
  font-size: 0.21rem;
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
  margin: 0 0.4rem 0.4rem;
  font-size: 0.3rem;
}

/* 城市列表 */
.add_city {
  display: flex;
  flex-direction: column;
}

.add_city .city {
  margin-top: 0.1rem;
  width: 100%;
  font-size: 0.28rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.city > div {
  position: relative;
  text-align: center;
  flex: 1;
}

.city span span {
  max-width: 1.5rem;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

.city span img {
  vertical-align: middle;
}

.city ul {
  overflow-y: auto;
  text-align: left;
  padding: 0.1rem;
  border: 1px solid #e6e6e6;
  background: white;
  position: absolute;
  max-height: 3rem;
  top: 0.6rem;
  left: 0;
  right: 0;
}
select {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: -1%;
  font-size: 0.26rem;
}
.city ul li {
  padding: 0.1rem 0;
  border-bottom: 1px solid #e6e6e6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.city ul li:last-child {
  border: none;
}

.city > div:last-child {
  border: none;
}

.city img {
  width: 0.2rem;
  height: 0.2rem;
}
</style>