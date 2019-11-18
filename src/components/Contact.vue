<template>
  <div>
    <div class="contact">
      <section>
        <div class="contact_cont">
          <div>
            <div>
              <img src="../assets/icon/tj.png" alt />
              <span>总部：</span>
            </div>
            <p>{{list_datas.company_name}}</p>
          </div>
          <div>
            <div>
              <img src="../assets/icon/dw.png" alt />
              <span>地址：</span>
            </div>
            <p>{{list_datas.adress}}</p>
          </div>
        </div>
      </section>
      <section>
        <div class="contact_head customer">
          <h3>顾客咨询联系方式：</h3>
          <div>
            <img src="../assets/icon/shijian.png" alt />
            <span>上班时间：{{list_datas.work_time | help}}</span>
          </div>
        </div>
        <div class="contact_cont">
          <div>
            <div>
              <img src="../assets/icon/phone.png" alt />
              <span>电话：</span>
            </div>
            <p>{{list_datas.customer_tel}}</p>
          </div>
          <div>
            <div>
              <img src="../assets/icon/em.png" alt />
              <span>邮箱：</span>
            </div>
            <p>{{list_datas.customer_email}}</p>
          </div>
        </div>
      </section>
      <section>
        <div class="contact_head">
          <h3>厂商合作联系方式：</h3>
        </div>
        <div class="contact_cont">
          <div>
            <div>
              <img src="../assets/icon/phone.png" alt />
              <span>电话：</span>
            </div>
            <p>{{list_datas.company_tel}}</p>
          </div>
          <div>
            <div>
              <img src="../assets/icon/em.png" alt />
              <span>邮箱：</span>
            </div>
            <p>{{list_datas.company_email}}</p>
          </div>
        </div>
      </section>
      <section class="area">
        <div class="contact_head">
          <h3>已开通城市联系方式：</h3>
        </div>
        <div class="contact_cont1">
          <div v-for="(item, index) in list_datas.citylist" :key="index">
            <span>{{item.city_name}}：</span>

            <div class="area_list">
              <p>联系人：{{item.user_name}}</p>
              <p>手机：{{item.user_tel}}</p>
              <p>微信：{{item.user_weiixn}}</p>
              <div class="area_list_p">
                <span>负责区域：</span>
                <p>{{item.area}}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import request from "@/request";
export default {
  data() {
    return {
      list_datas: {}
    };
  },
  filters: {
    help(val) {
      if (val) {
        var array = val.split("~");
        return array[0] + ":00" + "~" + array[1] + ":00";
      }
    }
  },
  created() {
    this.$store.state.title_name = "金秋梦装饰";
    this.$store.state.sess=4
    this.$store.commit("show_looding");
    request({
      url: "/api/getContactOur",
      method: "post"
    }).then(data => {
      console.log(data);
      if (data.status == 200) {
        this.list_datas = data.data.data;
      }
      this.$store.commit("hide_looding");
    });
  }
};
</script>

<style scoped>
.contact {
  position: fixed;
  top: 0.9rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  padding: 0.25rem;
  color: #000;
  background: #fef8da;
}
.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.contact section {
  background: white;
  margin-bottom: 0.3rem;
  border: 0.5px solid #bfbfbf;
  border-radius: 0.1rem;
}

.contact_head {
  border-bottom: 0.5px solid #9e9e9e;
  padding: 0.1rem;
}

.contact_head h3 {
  font-size: 0.3rem;
}

.contact_cont {
  font-size: 0;
  padding: 0.2rem;
}

.contact_cont > div {
  display: flex;
  flex-direction: row;
}

.contact_cont > div > div {
  display: flex;
  flex-direction: row;
  line-height: 0.6rem;
}

.contact_cont img {
  background-color: #ff1284;
  border-radius: 50%;
  width: 0.48rem;
  height: 0.48rem;
  padding: 0.1rem;
  margin: 0.05rem 0.1rem 0 0;
}

.contact_cont span {
  font-size: 0.28rem;
  white-space: nowrap;
}

.contact_cont p {
  font-size: 0.28rem;
  line-height: 0.6rem;
}

.customer {
  border-bottom: 0.5px solid #9e9e9e;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.customer h3 {
  flex: 1;
  border-right: 0.5px solid #a0a0a0;
}

.customer img {
  background: #ff1284;
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 50%;
  padding: 0.04rem;
  margin: 0 0.1rem;
}

.customer div {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 0.26rem;
}
.contact_cont1{
  font-size: 0.26rem;
  padding: 0.2rem;
}
.contact_cont1>div{
  margin-bottom: 0.3rem;
  display: flex;
  flex-direction: row;
  line-height: 0.6rem;
}
.contact_cont1>div>span{
  white-space: nowrap;
}
.area_list_p{
  display: flex;
  flex-direction: row;
}
.area_list_p p{
  flex: 1;
}
.area_list {
  padding-left:0.2rem;
  display: flex;
  flex-direction: column;
}
</style>