<template>
  <div class="panorama">
    <nav>
      <ul>
        <li
          @click="nav_Tap(index)"
          v-for="(item,index) in nav_list"
          :key="index"
          :class="index==active_nav?'active':''"
        >{{item}}</li>
      </ul>
    </nav>
    <main>
      <section v-if="active_nav==0">
        <style_introduce />
      </section>
      <section v-if="active_nav==1">
        <panorama_3D />
      </section>
      <section v-if="active_nav==2">
        <plane_effect />
      </section>
      <section v-if="active_nav==3">
        <style_test />
      </section>
    </main>
  </div>
</template>

<script>
import panorama_3D from "./panorama-view/panorama-3D.vue";
import plane_effect from "./panorama-view/plane-effect.vue";
import style_introduce from "./panorama-view/style-introduce.vue";
import style_test from "./panorama-view/style-test.vue";

export default {
  components: { panorama_3D, plane_effect, style_introduce, style_test },
  data() {
    return {
      active_nav: 0,
      nav_list: ["风格介绍", "3D全景图集", "平面效果图", "风格测试"]
    };
  },
  watch: {
    $route(to, from) {
      this.active_nav = this.$route.query.id;
    }
  },
  created() {
    this.active_nav =this.$route.query.id;
  },
  methods: {
    nav_Tap(index) {
      console.log(index);
      this.active_nav = index;
    }
  }
};
</script>

<style scoped>
.panorama nav ul {
  padding: 0.3rem 0.2rem 0.1rem;
  display: flex;
  justify-content: space-between;
}

.panorama nav ul li {
  padding: 0.1rem 0;
  width: 1.6rem;
  text-align: center;
  border: 1px solid #2fc145;
  border-radius: 0.1rem;
  font-size: 0.24rem;
}
.active {
  background: #2fc145;
  color: white;
}
</style>