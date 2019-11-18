<template>
  <div class="add_address">
    <h3>添加收货地址</h3>
    <p>(手机和座机号码至少填一项，其余都是必填项)</p>
    <ul>
      <li>收货人：<input type="text" placeholder="收货人" v-model="obj.consignee"></li>
      <li>手机号码：<input type="number" placeholder="手机号码" v-model="obj.mobile"></li>
      <li>座机号码：<input type="number" placeholder="座机号码" v-model="obj.tel"></li>
      <li class="add_city">
        <span>所在地区：</span>
        <div class="city">
          <div>
            <span @click='province_tap'><span>{{province_name}}</span>
              <img src="../../assets/icon/xia.png" alt="">
            </span>
            <ul v-show="province_active">
              <li @click='province_active_tap(index)' v-for="(item, index) in select_Province" :key="index">
                {{item.region_name}}</li>
            </ul>
          </div>
          <div>
            <span @click='city_tap'><span>{{city_name}}</span>
              <img src="../../assets/icon/xia.png" alt="">
            </span>
            <ul v-show="city_active">
              <li @click='city_active_tap(index)' v-for="(item, index) in select_City" :key="index">
                {{item.region_name}}</li>
            </ul>
          </div>
          <div>
            <span @click='district_tap'><span>{{district_name}}</span>
              <img src="../../assets/icon/xia.png" alt="">
            </span>
            <ul v-show="district_active">
              <li @click='district_active_tap(index)' v-for="(item, index) in select_district" :key="index">
                {{item.region_name}}</li>
            </ul>
          </div>
        </div>
      </li>
      <li>详细地址：</li>
      <textarea placeholder="详细地址" v-model="obj.address"></textarea>
    </ul>
    <div class="add">
      <span>设为默认地址：</span>
      <van-switch change='checked_tap' active-color='#FF1284' v-model="default_" size="24px" />
    </div>
    <div class="btn" @click='btn_tap'>保存</div>
  </div>
</template>
<script>
  import { Slider } from 'vant';
  import request from '@/request'
  export default {
    data() {
      return {
        obj: {},
        default_: null,
        select_Province: [],
        province_name: '省/市',
        province_active: false,
        select_City: [],
        city_name: '城市',
        city_active: false,
        select_district: [],
        district_name: '所在城市',
        district_active: false,
      }
    },
    created() {
      this.$store.commit('show_looding')
      var obj = JSON.parse(window.sessionStorage.getItem('revise'))
      this.obj = obj
      this.default_ = obj.default == 1 ? true : false
      // 获取省份
      request({
        url: '/api/getAllProvince',
        method: "post",
      }).then(data => {
        if (data.data.status == 200) {
          this.select_Province = data.data.data
          for (let i = 0; i < data.data.data.length; i++) {
            if (data.data.data[i].region_id == obj.province) {
              this.province_name = data.data.data[i].region_name
            }
          }
        }
      })
      // 获取城市
      request({
        url: '/api/getAllCity',
        data: { province_id: obj.province },
        method: "post",
      }).then(data => {
        if (data.data.status == 200) {
          this.select_City = data.data.data
          for (let i = 0; i < data.data.data.length; i++) {
            if (data.data.data[i].region_id == obj.city) {
              this.city_name = data.data.data[i].region_name
            }
          }
        }
      })
      // 获取所在城市
      request({
        url: '/api/getAllDistrict',
        data: { city_id: obj.city },
        method: "post",
      }).then(data => {
        if (data.data.status == 200) {
          this.select_district = data.data.data
          for (let i = 0; i < data.data.data.length; i++) {
            if (data.data.data[i].region_id == obj.district) {
              this.district_name = data.data.data[i].region_name
            }
          }
        }
      })
      this.$store.commit('hide_looding')
    },
    methods: {
      checked_tap() {
        this.default_ = !this.default_
      },
      province_tap() {
        this.province_active = !this.province_active
      },
      province_active_tap(i) {
        this.city_name = '城市',
          this.district_name = '所在城市',
          this.obj.city = this.obj.district = ''
        this.obj.province = this.select_Province[i].region_id
        this.province_name = this.select_Province[i].region_name
        this.province_active = false
        this.get_select_city()
      },
      city_tap() {
        console.log(this.province)
        if (this.obj.province == '' || this.obj.province == undefined) {
          this.$toast('请先选择省/市')
        } else {
          this.city_active = !this.city_active
        }
      },
      city_active_tap(i) {
        this.district_name = '所在城市',
          this.district = ''
        this.obj.city = this.select_City[i].region_id
        this.city_name = this.select_City[i].region_name
        this.city_active = false
        this.get_select_district()
      },
      district_tap() {
        if (this.obj.city == '') {
          this.$toast('请先选择城市')
        } else {
          this.district_active = !this.district_active
        }
      },
      district_active_tap(i) {
        this.obj.district = this.select_district[i].region_id
        this.district_name = this.select_district[i].region_name
        this.district_active = false
      },
      get_select_city() {
        request({
          url: '/api/getAllCity',
          data: { province_id: this.obj.province },
          method: "post",
        }).then(data => {
          console.log(data.data)
          if (data.data.status == 200) {
            this.select_City = data.data.data
          }
        })
      },
      get_select_district() {
        request({
          url: '/api/getAllDistrict',
          data: { city_id: this.obj.city },
          method: "post",
        }).then(data => {
          console.log(data.data)
          if (data.data.status == 200) {
            this.select_district = data.data.data
          }
        })
      },
      btn_tap() {

        if (this.default_ == 1) {
          request({
            url: '/api/setDefaultAddress',
            data: { id: this.obj.id },
            method: "post",
          }).then(data => {
            console.log(data)
            if (data.data.status == 200) {
              this.obj.default = 1
            }
          })
        } else {
          this.obj.default = 0
        }
        if (this.obj.consignee == '') {
          this.$toast('请输入收货人')
        } else if (!(/^1[34578]\d{9}$/.test(this.obj.mobile))) {
          this.$toast('请输入正确的手机号')
        } else if (this.obj.address == '') {
          this.$toast('请输入详细地址')
        } else {
          this.$store.commit('show_looding')
          request({
            url: '/api/saveAddress',
            data: this.obj,
            method: "post",
          }).then(data => {
            if (data.data.status == 200) {
              this.$router.push('/personal/address')
              this.$toast(data.data.msg)
            } else {
              console.log(data)
              this.$toast(data.data.msg)
            }
            this.$store.commit('hide_looding')
          })
        }
      }
    }
  }
</script>
<style scoped>
  .add_address h3 {
    margin: 0.2rem 0 0.1rem;
    font-size: 0.36rem;
    text-align: center;
  }

  .add_address p {
    margin-left: 0.15rem;
    font-size: 0.24rem;
  }

  .add_address ul {
    padding: 0 0.15rem;
    border-bottom: 1px solid #7d7d7d;
  }

  .add_address li {
    font-size: 0.3rem;
    padding: 0.3rem 0 0.3rem 0.17rem;
    border-bottom: 1px solid #7d7d7d;
  }

  .add_address select {
    width: 1.5rem;
    margin-right: 0.1rem;
  }

  .add_address input {
    padding: 0 0.1rem;
    min-width: 5.4rem;
  }

  .add_address textarea {
    line-height: 0.5rem;
    padding: 0.2rem;
    font-size: 0.3rem;
    width: 100%;
    border: none;
  }

  .add_address .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.33rem;
    margin-top: 0.5rem;
    padding: 0.2rem 0.3rem;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }

  .add_address .btn {
    border-radius: 0.1rem;
    color: white;
    height: 0.9rem;
    font-size: 0.36rem;
    text-align: center;
    background: #FF1284;
    line-height: 0.9rem;
    margin: 0.5rem 0.2rem;
  }

  /* 城市列表 */
  .add_city {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .add_city>span {
    white-space: nowrap;
  }

  .add_address .city {
    width: 100%;
    font-size: 0.33rem;
    display: flex;
    flex-direction: row;
  }

  .city>div {
    position: relative;
    text-align: center;
    width: 1.8rem;
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

  .city>div:last-child {
    border: none;
  }

  .city img {
    width: 0.2rem;
    height: 0.2rem;
  }
</style>