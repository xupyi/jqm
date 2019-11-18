<template>
    <div id="personal">
      <header_/>
      <router-view class="user_view"></router-view>
    </div>
</template>
<script>
import header_ from '../views/back_header'
  export default {
    components:{header_},
    data() {
      return {
      }
    },
    
  }
</script>
<style scoped>
  .user_view {
    position: fixed;
    top: 0.9rem;
    left: 0;
    right: 0;
    bottom: 0rem;
    overflow-y: auto;
  }
  
 
</style>