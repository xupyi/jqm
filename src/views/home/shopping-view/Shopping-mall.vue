<template>
  <div id="shopping_mall">
    <nav>
      <ul>
        <li @click='nav_tap(0)' :class='active==0?"fir":""'>促销商品</li>
        <li @click='nav_tap(item.id)' :class='active==item.id?"fir":""' v-for="(item, index) in goodscategory"
          :key="index">{{item.category_name}}</li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
  import request from '@/request.js'
  export default {
    data() {
      return {
        active: 0,
        goodscategory: [],
      }
    },
    created() {
      if (this.$route.query.id) {
        this.active = this.$route.query.id
      }
      this.$store.commit('show_looding')
      request({
        url: '/api/getGoodsCategory',
        method: "post",
      }).then(data => {
        this.$store.commit('hide_looding')
        console.log(data)
        if (data.data.status == 200) {
          this.goodscategory = data.data.data
        }
      })
    },
    methods: {
      cuxiao_tap() {
        this.active = null

      },
      nav_tap(i) {
        this.active = i
        if (i == 0) {
          this.$router.push({ path: "/home/shopping/promotion", query: { id: i } })
        } else {
          this.$router.push({ path: 'shopping_list', query: { id: i } })
        }

      }
    },
  }
</script>

<style scoped>
  #shopping_mall nav{
    background: white;
    position: fixed;
    top: 1.7rem;
    left: 0;
    right: 0;
    
  }
  #shopping_mall nav ul {
    overflow: hidden;
    padding: 0.15rem 0;
    margin: 0 0.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .fir {
    color: white !important;
    background: #2FC145;
  }

  #shopping_mall nav li {
    float: left;
    color: #000;
    font-size: 0.24rem;
    border-radius: 0.1rem;
    border: 1px solid #2FC145;
    flex: 1;
    text-align: center;
    padding: 0.11rem 0 0.09rem;
    margin-left: 0.15rem;
  }
   #shopping_mall nav li:first-child{
     margin-left: 0;
   }
</style>