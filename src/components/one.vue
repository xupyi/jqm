<template>
  <div>
    <div class="sh">
      <img @load="settime" src="http://111.231.74.213:88/upload/images/splash.png"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {   
  },
  methods: {
    settime(){
      var that=this
      setTimeout(()=>{
          that.$router.push('/home')
      },1500)
    }
  }
};
</script>
<style>
.sh {
    z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.sh img{
  width: 100%;
  height: 100%;
}
</style>