<template>
  <div class="film">
    <div
      class="position"
      :class="isShow?'bj-color':''"
    >
      <div
        class="site"
        @click="handleClickCity()"
      >
        <p>{{siteText}}</p>
        <span class="iconfont icon-icon-test4"></span>
      </div>
      <div
        class="title"
        v-show="isShow"
      >
        电影
      </div>
      <div
        class="search iconfont icon-icon-test"
        v-show="isShow"
        @click="handleFilmSearch()"
      ></div>
    </div>
    <FilmSwipe ref="filmswipe"></FilmSwipe>
    <FilmHeader :class="isFixed?'fixed':''"></FilmHeader>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import FilmSwipe from '@/views/film/FilmSwipe.vue'
import FilmHeader from '@/views/film/FilmHeader.vue'
export default {
  components: { FilmHeader, FilmSwipe },
  data () {
    return {
      isFixed: false,
      isShow: false,
      siteText: '广州'
    }
  },
  methods: {
    handleonscroll () {
      // 滑动距离
      const moveDis = document.documentElement.scrollTop
      // 轮播图高度
      const swpieHeight = this.$refs.filmswipe.$el.offsetHeight
      if (moveDis >= swpieHeight) {
        this.isFixed = true
        this.isShow = true
      } else {
        this.isFixed = false
        this.isShow = false
      }
    },
    handleClickCity () {
      this.$router.push('/city')
      this.$store.commit('SET_CITY_FROM', 'film')
    },
    handleFilmSearch () {
      this.$router.push('/filmsearch')
    }
  },
  mounted () {
    window.onscroll = this.handleonscroll
    this.siteText = localStorage.getItem('cityName')
  },
  beforeDestroy () {
    window.onscroll = null
  }
}
</script>

<style lang="scss" scoped>
.film {
  .position {
    position: fixed;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    z-index: 99;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    .site {
      position: relative;
      width: 200px;
      height: 100px;
      color: #fff;
      overflow: hidden;

      p {
        position: absolute;
        left: 40px;
        width: 80px;
        font-size: 30px;
      }

      span {
        position: absolute;
        right: 50px;
        font-size: 30px;
      }
    }

    .title {
      width: 200px;
      height: 100px;
      font-size: 34px;
    }

    .search {
      box-sizing: border-box;
      width: 200px;
      height: 100px;
      font-size: 46px;
      text-align: right;
      padding-right: 30px;
    }
  }

  .bj-color {
    background-color: #fff;

    .site {
      color: #333;
    }
  }

  main {
    padding-bottom: 100px;
  }
}

</style>
