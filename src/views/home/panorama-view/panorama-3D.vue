<template>
  <div class="choice">
    <nav>
      <div>
        <span>户型:</span>
        <ul>
          <li :class="Apartment_active==index?'fir':''" @click="Apartment_tap(index)"
            v-for="(item, index) in choice_data.ApartmentList" :key="index">{{item.apartment_name}}</li>
        </ul>
      </div>

      <div>
        <span>风格:</span>
        <ul>
          <li :class="style_active==index?'fir':''" @click="style_tap(index)"
            v-for="(item, index) in choice_data.stylelist" :key="index">{{item.style_name}}</li>
        </ul>
      </div>
    </nav>
    <main>
      <div class="data_list" v-for="(choice_item, index) in list_data" :key="index">
        <a class="item_img" :href="choice_item.panorama_link">
          <img class="backimg" :src="choice_item.picture_url" alt />
          <img class="floatimg" src="../../../assets/home_img/vr_icon_1.png" alt />
        </a>
        <div class="item_cont">
          <div>
            <h3>{{choice_item.style_name}}</h3>
            <span>{{choice_item.all_price}}</span>
          </div>
          <div class="cont_p2">
            <p class="p">
              <span>{{choice_item.title}}</span>
              <span>{{choice_item.apartment_name}}</span>
            </p>
            <p>
              <img src="../../../assets/home_img/chakan.png" alt />
              <span>{{choice_item.look_number}}</span>
            </p>
          </div>
        </div>
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
        Apartmentid: "", //户型
        Gradeid: "", //档次
        styleid: "", //风格
        Apartment_active: null,
        Grade_active: null,
        style_active: null
      };
    },
    created() {
      this.get_list_data();
      // 获取3d分类
      request({
        url: "/api/getThreeCaseEffectCategory",
        method: "post"
      }).then(data => {
        console.log(data.data.data);
        this.$store.commit("hide_looding");
        if (data.status == 200) {
          this.choice_data = data.data.data;
        }
      });
    },
    methods: {
      Apartment_tap(i) {
        if (this.Apartment_active == i) {
          this.Apartment_active = this.Apartmentid = null;
        } else {
          this.Apartment_active = i;
          this.Apartmentid = this.choice_data.ApartmentList[i].apartment_id;
        }
        this.get_data();
      },
      Grade_tap(i) {
        if (this.Grade_active == i) {
          this.Grade_active = this.Gradeid = null;
        } else {
          this.Gradeid = this.choice_data.GradeList[i].grade_id;
          this.Grade_active = i;
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
      get_data() {
        var val = {
          p_apartment_id: this.Apartmentid == null ? "" : this.Apartmentid,
          p_style_id: this.styleid == null ? "" : this.styleid,
          p_grade_id: this.Gradeid == null ? "" : this.Gradeid
        };
        console.log(val);
        this.get_list_data(val);
      },
      // 3d图集列表
      get_list_data(val) {
        this.$store.commit("show_looding");
        request({
          url: "/api/getThreeCaseEffectList",
          data: val,
          method: "post"
        }).then(data => {
          console.log(data);
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
  .choice nav {
    font-size: 0.24rem;
    margin-top: 0.05rem;
    padding: 0 0.2rem;
  }

  .choice nav>div {
    display: flex;
    flex-direction: row;
  }

  .choice nav>div span {
    font-weight: 600;
    white-space: nowrap;
    margin-top: 0.1rem;
  }

  .choice nav ul {
    overflow: hidden;
  }

  .choice nav ul li {
    margin: 0.1rem 0.2rem;
    float: left;
    font-size: 0.24rem;
    border-bottom: 1px solid white;
  }

  .fir {
    border-color: #2fc145 !important;
    color: #2fc145;
  }

  .choice main {
    overflow: hidden;
    padding: 0.2rem 0.2rem;
  }

  .data_list {
    float: left;
    margin: 0 0.2rem 0.25rem 0;
    width: 3.45rem;
    border: 0.55px solid #ddd;
    background: white;
  }

  .data_list:nth-child(2n) {
    margin-right: 0;
  }

  .item_img {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item_img .backimg {
    padding: 0.55px;
    width: 100%;
    height: 2.4rem;
  }

  .item_img .floatimg {
    height: 0.6rem;
    position: absolute;
  }

  .item_cont {
    padding: 0 0.1rem;
    font-size: 0.23rem;
    line-height: 0.5rem;
  }


  .item_cont>div {
    white-space: nowrap;
    overflow:hidden ;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .item_cont h3 {
    font-size: 0.23rem;
  }

  .item_cont div img {
    object-fit: contain;
    width: 0.25rem;
    height: 0.15rem;
  }

  .item_t {
    color: black;
  }

  .cont_p2 p{
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
  }
.cont_p2 p:first-child{
  max-width: 70%;
}
  .cont_p2 span {
    max-width: 1.5rem;
  }

  .cont_p2 .p span:last-child {
    margin-left: 0.12rem;
  }

  .cont_p2 p img {
    margin-right: -0.04rem;
  }

</style>
