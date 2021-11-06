<template>
  <div>
    <div class="position">
      <div
        class="return iconfont icon-icon-test3"
        @click="handleClickPrev()"
      ></div>
      <div class="siteText">
        当前位置-{{siteText}}
      </div>
      <div class="search iconfont icon-icon-test"></div>
    </div>
    <van-index-bar style="margin-top: 50px;">
      <div
        v-for="data in datalist"
        :key="data.index"
      >
        <van-index-anchor :index="data.index"></van-index-anchor>
        <van-cell
          v-for="item in data.list"
          :key="item.cityId"
          :title="item.name"
          @click="handleClick(item.cityId,item.name)"
        ></van-cell>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      datalist: [],
      siteText: '广州'
    }
  },
  computed: {
    ...mapState(['cityFrom'])
  },
  beforeMount () {
    this.$store.commit('SET_IS_HIDDEN_TABBAR', false)
  },
  mounted () {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    axios({
      url: 'https://m.maizuo.com/gateway?k=3912119',
      method: 'GET',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16335854152126803380469761"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      this.datalist = this.handleCity(res.data.data.cities)
    })
    this.siteText = localStorage.getItem('cityName')
  },
  destroyed () {
    this.$store.commit('SET_IS_SHOW_TABBAR', true)
  },
  methods: {
    handleCity (datalist) {
      const letterArr = []
      for (let i = 65; i < 91; i++) {
        letterArr.push(String.fromCharCode(i))
      }
      const newlist = []
      for (let j = 0; j < letterArr.length; j++) {
        var arr = datalist.filter(item => item.pinyin.substring(0, 1) === letterArr[j].toLowerCase())
        if (arr.length > 0) {
          newlist.push({
            index: letterArr[j],
            list: arr
          })
        }
      }
      return newlist
    },
    handleClick (id, name) {
      localStorage.setItem('cityId', id)
      localStorage.setItem('cityName', name)
      if (this.cityFrom === 'film') {
        this.$router.push('/film')
      } else if (this.cityFrom === 'cinema') {
        this.$router.push('/cinema')
      }
    },
    handleClickPrev () {
      if (this.cityFrom === 'film') {
        this.$router.push('/film')
      } else if (this.cityFrom === 'cinema') {
        this.$router.push('/cinema')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.position {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  .return {
    width: 100px;
    height: 100px;
    font-size: 46px;
    text-align: left;
    box-sizing: border-box;
    padding-left: 25px;
  }

  .siteText {
    width: 300px;
    height: 100px;
    font-size: 34px;
    overflow: hidden;
    text-align: center;
  }

  .search {
    width: 100px;
    height: 100px;
    font-size: 46px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 30px;
  }
}
</style>
