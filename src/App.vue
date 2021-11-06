<template>
  <div id="app">
    <Tabbar v-show="isShowTabbar"></Tabbar>
    <router-view></router-view>
  </div>
</template>
<script>
import Tabbar from '@/components/Tabbar.vue'
import { mapState } from 'vuex'
export default {
  components: { Tabbar },
  computed: {
    ...mapState(['isShowTabbar'])
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  color: #333;
  font-size: 28px;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #333;
}

a.router-link-active {
  color: #f66;
}

</style>
