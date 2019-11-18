<template>
  <div class="add_address">
    <h3 v-show="val.id==''">新增收货地址</h3>
    <h3 v-show="val.id!=''">修改收货地址</h3>
    <p>(手机和座机号码至少填一项，其余都是必填项)</p>
    <ul>
      <li>
        收货人：
        <input type="text" placeholder="请输入收货人真实姓名" v-model="val.consignee" />
      </li>
      <li>
        手机号码：
        <input type="number" placeholder="请输入收货人手机号" v-model="val.mobile" />
      </li>
      <li>
        座机号码：
        <input type="number" placeholder="区号-电话号码-分机" v-model="val.tel" />
      </li>
      <li class="add_city">
        <div class="city">
          <span>所在地区：</span>
          <select @change="Province_change" :value="val.province">
            <option selected value="0">请选择</option>
            <option
              v-for="(item, index) in select_Province"
              :key="index"
              :value="item.region_id"
            >{{item.region_name}}</option>
          </select>
          <select @change="City_change" @click="City_click" :value="val.city">
            <option selected value="0">请选择</option>
            <option
              v-for="(item, index) in select_City"
              :value="item.region_id"
              :key="index"
            >{{item.region_name}}</option>
          </select>
          <select @change="district_change" @click="district_click" :value="val.district">
            <option selected value="0">请选择</option>
            <option
              v-for="(item, index) in select_district"
              :value="item.region_id"
              :key="index"
            >{{item.region_name}}</option>
          </select>
        </div>
      </li>
      <li class="xx_add">
        <span>详细地址：</span>
        <textarea placeholder="详细地址" v-model="val.address"></textarea>
      </li>
    </ul>
    <div class="add">
      <img @click="checked_tap" :src="this.val.default==1?active:normal" alt />
      <span @click="checked_tap">设为默认地址</span>
    </div>
    <div v-if="val.id==''" class="btn" @click="btn_tap">保存</div>
    <div v-if="val.id!=''" class="btn" @click="btn_tap">确认修改</div>
  </div>
</template>
<script>
import { Slider } from "vant";
import request from "@/request";
export default {
  data() {
    return {
      normal: require("../../assets/home_img/yuan.png"),
      active: require("../../assets/home_img/dui.png"),
      val: {
        consignee: "", //是	string	联系人
        mobile: "", //是	string	手机号
        address: "", //是	string	详细地址
        tel: "", //否	string	座机电话
        id: "",
        province: "0",
        city: "0",
        district: 0,
        default: ""
      },
      select_Province: [],

      select_City: [],

      select_district: []
    };
  },
  created() {
    if (this.$route.query.id) {
      request({
        url: "/api/getUserAddressList",
        method: "post"
      }).then(data => {
        if (data.data.status == 200) {
          console.log(data);
          this.address_list = data.data.data;
          for (var i = 0; i < data.data.data.length; i++) {
            if (data.data.data[i].id == this.$route.query.id) {
              console.log(data.data.data[i]);
              (this.val.consignee = data.data.data[i].consignee), //是	string	联系人
                (this.val.mobile = data.data.data[i].mobile), //是	string	手机号
                (this.val.address = data.data.data[i].address), //是	string	详细地址
                (this.val.tel = data.data.data[i].tel), //否	string	座机电话
                (this.val.id = data.data.data[i].id),
                (this.val.province = data.data.data[i].province),
                (this.val.city = data.data.data[i].city),
                (this.val.district = data.data.data[i].district),
                (this.val.default = data.data.data[i].default);
              this.get_select_Province("once");
              this.get_select_city("once");
            }
          }
        } else {
          console.log(data);
          this.$toast(data.data.msg);
        }
      });
    } else {
      this.get_select_Province();
    }
  },
  methods: {
    checked_tap() {
      this.val.default = this.val.default == 1 ? 0 : 1;
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
        this.val.city =e.target.value
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
    btn_tap() {
      if (!/^1[34578]\d{9}$/.test(this.val.mobile)) {
        this.$toast("请输入正确的手机号");
      } else if (this.val.consignee == "") {
        this.$toast("请输入收货人");
      } else if (this.val.address == "") {
        this.$toast("请输入详细地址");
      } else if (this.val.city == 0) {
        this.$toast("请选择城市");
      } else if (this.select_district != "" && this.val.district == 0) {
        this.$toast("请选择区/县");
      } else {
        request({
          url: "/api/saveAddress",
          data: this.val,
          method: "post"
        }).then(data => {
          if (data.data.status == 200) {
            console.log(data);
            if (this.$route.query.path) {
              sessionStorage.setItem("address", data.data.data.address_id);
              this.$router.go(-1);
            } else {
              this.$router.go(-1);
            }

            this.$toast(data.data.msg);
          } else {
            console.log(data);
            this.$toast(data.data.msg);
          }
          this.$store.commit("hide_looding");
        });
      }
    }
  }
};
</script>
<style scoped>
.add_address {
  background: #f2f2f2;
}
.add_address h3 {
  background: white;
  font-weight: bold;
  font-size: 0.36rem;
  text-align: center;
  padding: 0.2rem 0;
}

.add_address p {
  background: white;
  padding-left: 0.3rem;
  font-size: 0.24rem;
}

.add_address ul {
  background: white;
  padding: 0 0.15rem;
  border-bottom: 0.3px solid #7d7d7d;
}

.add_address li {
  font-size: 0.28rem;
  padding: 0.2rem 0.1rem;
  border-bottom: 0.3px solid #7d7d7d;
}

.add_address select {
  width: 1.5rem;
  margin-right: 0.1rem;
}
/* 
.add_address input {
  width: 100%;
} */

.add_address textarea {
  margin-top: 0.1rem;
  height: 1.8rem;
  padding: 0.1rem;
  line-height: 0.4rem;
  font-size: 0.28rem;
  width: 100%;
  border: 0.5px solid #7d7d7d;
  border-radius: 0.1rem;
}

.add {
  background: white;
  display: flex;
  align-items: center;
  font-size: 0.28rem;
  margin-top: 0.5rem;
  padding: 0.2rem 0.3rem;
  border-top: 0.3px solid #7d7d7d;
  border-bottom: 0.3px solid #7d7d7d;
}

.add img {
  display: inline-block;
  margin-right: 0.1rem;
  width: 0.4rem;
  height: 0.4rem;
}
.add_address .btn {
  border-radius: 0.1rem;
  color: white;
  margin: 0.6rem;
  padding: 0.1rem;
  font-size: 0.33rem;
  text-align: center;
  background: #ff1284;
}
.xx_add{
  border: none !important;
}
.xx_add span {
  padding: 0.1rem 0;
  line-height: 0.4rem;
  white-space: nowrap;
}
/* 城市列表 */
.add_city {
  display: flex;
  flex-direction: column;
}
.city {
  white-space: nowrap;
  margin-top: 0.1rem;
  width: 100%;
  font-size: 0.28rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.city select {
  border: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: -1%;
  font-size: 0.26rem;
  color: blue;
}
</style>