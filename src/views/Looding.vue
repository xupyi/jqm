<template>
  <div>
    <div id='lod' v-show="this.$store.state.looding"><img src="../assets/looding.gif" alt=""></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        
      }
    },
  }
</script>
<style scoped>
  #lod {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    line-height: 100vh;
    text-align: center;
    color: white;
    z-index: 100;
    font-size: 0.36rem;
    transition: all 0.2s;
  }
  #lod img{
    width: 1rem;
    height: 1rem;
  }
</style>