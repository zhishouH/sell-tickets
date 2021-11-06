<template>
  <van-swipe
    :autoplay="3000"
    indicator-color="#fff"
    class="van-swipe"
  >
    <van-swipe-item
      v-for="item in filmswipedata"
      :key="item.bannerId"
      @click="handleDetailClick(item.actionData)"
    >
      <img v-lazy="item.imgUrl" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['filmswipedata'])
  },
  mounted () {
    if (this.filmswipedata.length === 0) {
      this.$store.dispatch('getFilmSwipeData')
    }
  },
  methods: {
    handleDetailClick (data) {
      const id = data.match(/[0-9]*/g)[15]
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-swipe {
  width: 100vw;
  height: 420px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
