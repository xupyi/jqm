<template>
  <div class="amplify" @touchmove.prevent @click="big_imgtap">
    <div>
      <img class="big_img" :src="this.$store.state.amplify_img" alt />
      <img class="xx_img" src="../assets/gb.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    big_imgtap() {
        this.$store.state.amplify_img=''
    }
  }
};
</script>
<style scope>
/* +++++++++++++++++++++++++++++++++= */

.amplify {
    z-index: 999999999;
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0rem;
  background: white;
}
.amplify div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.big_img {
  background: white;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.xx_img {
  position: absolute;
  width: 0.4rem;
  height: 0.4rem;
  right: 0.2rem;
  top: 0.2rem;
}
</style>