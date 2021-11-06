<template>
  <ul class="film-header">
    <li>
      <router-link to="nowplaying">正在热映</router-link>
    </li>
    <li>
      <router-link to="comingsoon">即将上映</router-link>
    </li>
  </ul>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.film-header {
  width: 100vw;
  height: 90px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  z-index: 99;

  li {
    line-height: 90px;
    font-size: 30px;
  }
}

.fixed {
  position: fixed;
  top: 98px;
}
</style>
