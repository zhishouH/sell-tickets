<template>
  <div class="cinema">
    <div
      class="cinema-header"
      ref="cinemaHeader"
    >
      <div
        class="site"
        @click="handleClickCity()"
      >
        <p>{{siteText}}</p>
        <span class="iconfont icon-icon-test4"></span>
      </div>
      <div class="title">影院</div>
      <div
        class="search iconfont icon-icon-test"
        @click="handleCinemaClick()"
      ></div>
    </div>
    <div
      class="cinema-main"
      :style="cinemaMainHeight"
      v-if="cinemaList"
    >
      <ul>
        <li
          v-for="item in cinemaList"
          :key="item.cinemaId"
        >
          <div class="cinema-info">
            <p class="cinema-name">{{item.name}}</p>
            <p class="cinema-address">{{item.address}}</p>
          </div>
          <div class="cinema-check">
            <button>查看</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { cinemaAPI } from '@/api/cinemadata'
import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      siteText: '广州',
      cinemaList: [],
      cinemaMainHeight: {
        height: '0px'
      }
    }
  },
  mounted () {
    this.siteText = localStorage.getItem('cityName')
    const cityId = localStorage.getItem('cityId')
    const cinemaHeader = this.$refs.cinemaHeader.clientHeight
    this.cinemaMainHeight.height = document.documentElement.clientHeight - cinemaHeader - 50 + 'px'
    // 加载提示
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    cinemaAPI(cityId).then(res => {
      this.cinemaList = res.data.data.cinemas
      console.log('cinema-数据请求成功')
      this.$nextTick(() => {
        return new Promise((resolve, reject) => {
           new BetterScroll('.cinema-main', {// eslint-disable-line
            scrollbar: {
              fade: true,
              interactive: false
            }
          })
          resolve()
        }).catch(err => {
          // eslint-disable-next-line no-undef
          reject(err)
        })
      })
    })
  },
  methods: {
    handleClickCity () {
      this.$router.push('/city')
      this.$store.commit('SET_CITY_FROM', 'cinema')
    },
    handleCinemaClick () {
      this.$router.push('/cinemasearch')
    }
  }
}
</script>

<style lang="scss" scoped>
.cinema {
  .cinema-header {
    width: 100%;
    height: 100px;
    background-color: #fff;
    line-height: 100px;
    text-align: center;
    z-index: 99;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    border-bottom: 1px solid #eee;

    .site {
      position: relative;
      height: 100px;
      width: 200px;

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
      height: 100px;
      width: 200px;
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

  .cinema-main {
    background-color: #fff;
    position: relative;
    overflow: hidden;

    ul {
      padding: 20px;

      li {
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #eee;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        margin: 10px 0 20px 0;
        padding: 10px 0;

        .cinema-info {
          width: 500px;
          height: 100px;

          .cinema-name {
            width: 100%;
            height: 60px;
            font-size: 32px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .cinema-address {
            width: 100%;
            height: 40px;
            font-size: 26px;
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .cinema-check {
          width: 100px;
          height: 100px;
          line-height: 100px;

          button {
            width: 100%;
            height: 50px;
            background-color: #fff;
            border: 1px solid tomato;
            text-align: center;
            line-height: 50px;
            color: tomato;
            font-size: 26px;
          }
        }
      }
    }
  }
}
</style>
