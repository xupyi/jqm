<template>
  <div class="style_intro">
    <nav>
      <span>风格：</span>
      <ul>
        <li @click='li_tap(index)' :class='num==index?"fir":""' v-for="(item, index) in list_data" :key="index">
          {{(item.title).split('--')[1]}}
        </li>
      </ul>
    </nav>
    <div class="box">
      <div v-html='content'></div>
    </div>
  </div>
</template>
<script>
  import request from '@/request'
  export default {
    data() {
      return {
        num: 0,
        list_data: [],
        content: '',
      }
    },
    created() {
      this.$store.commit('show_looding')
      request({
        url: '/api/getArticleList',
        data: { type: "style" },
        method: "post",
      }).then(data => {
        console.log(data)
        this.$store.commit('hide_looding')
        if (data.status == 200) {
          this.list_data = data.data.data
          this.content = this.list_data[this.num].content
        }
      })
    },
    methods: {
      li_tap(i) {
        this.num = i
        this.content = this.list_data[this.num].content
      }
    },
  }
</script>
<style scoped>
  .style_intro nav {
    margin-top: 0.05rem;
    display: flex;
    flex-direction: row;
    padding: 0 0.2rem;
  }

  .style_intro nav span {
    font-weight: 600;
    white-space: nowrap;
    margin-top: 0.1rem;
  }

  .style_intro ul {
    overflow: hidden;
  }

  .style_intro ul li {
    margin: 0.1rem 0.15rem;
    float: left;
    font-size: 0.24rem;
    border-bottom: 1px solid white;
  }

  .fir {
    border-color: #2FC145 !important;
    color: #2FC145;
  }

  .style_intro .box {
    font-weight: 400;
    line-height: 0.5rem;
    font-size: 0.3rem;
    text-align: justify;
    margin-top: 0.2rem;
    padding: 0 0.2rem 0.3rem;
  }
</style>