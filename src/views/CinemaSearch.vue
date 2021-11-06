<template>
  <div class="cinema-search">
    <div class="cinema-header">
      <input
        type="text"
        v-model="mytext"
      >
      <p @click="handleCancel()">取消</p>
    </div>
    <ul class="cinema-show">
      <li
        v-for="(data,index) in getMyDataList"
        :key="index"
        @click="handleDetailClick(data.filmId)"
      >
        {{data.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import { cinemaAPI } from '@/api/cinemadata'
export default {
  data () {
    return {
      cinemaList: [],
      mytext: ''
    }
  },
  computed: {
    getMyDataList () {
      return this.cinemaList.filter((item) => item.name.indexOf(this.mytext) > -1)
    }
  },
  beforeMount () {
    this.$store.commit('SET_IS_HIDDEN_TABBAR', false)
  },
  mounted () {
    const cityId = localStorage.getItem('cityId')
    cinemaAPI(cityId).then(res => {
      this.cinemaList = [...res.data.data.cinemas]
      console.log(this.cinemaList)
    })
  },
  destroyed () {
    this.$store.commit('SET_IS_SHOW_TABBAR', true)
  },
  methods: {
    handleCancel () {
      this.$router.push('/cinema')
    }
  }
}
</script>

<style lang="scss" scoped>
.cinema-search {
  width: 100%;
  height: 100%;
  background-color: #fff;

  .cinema-header {
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 1px solid #eee;

    input {
      box-sizing: border-box;
      width: 540px;
      height: 80px;
      border: 1px solid #ccc;
      padding-left: 40px;
      outline: none;
      border-radius: 10px;
      background-color: #fafafa;
    }

    p {
      width: 80px;
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      color: #999;
      padding-left: 30px;
    }
  }

  .cinema-show {
    box-sizing: border-box;
    padding: 30px;

    li {
      height: 80px;
      line-height: 80px;
      padding-left: 20px;
    }

    li:nth-child(odd) {
      background-color: #f5f5f5;
    }

    li:nth-child(even) {
      background-color: #eee;
    }
  }
}
</style>
