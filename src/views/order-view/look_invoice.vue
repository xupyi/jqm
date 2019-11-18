<template>
  <div>
    <header_/>
    <div class="look">
      <p>查看发票</p>
      <div>
        <p v-if="condition==''">暂无发票信息~</p>
        <p v-else>
          <img :src='condition' alt>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import header_ from "../back_header";
export default {
  components: { header_ },
  data() {
    return {
      condition: ""
    };
  },
  created() {
      this.condition=this.$route.query.url
  },
  methods: {}
};
</script>
<style>
.look {
  margin: 0.9rem 0 1.05rem;
}
.look>p {
  font-size: 0.36rem;
  text-align: center;
  padding: 0.2rem;
}
.look div p{
    font-size: 0.3rem;
    text-align: center;
    padding: 0.2rem;
    color: #000;
}
.look img {
  width: 100%;
  height: 100%;
}
</style>