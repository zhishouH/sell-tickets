<template>
  <div
    v-if="filmsList"
    class="film-search"
  >
    <div class="search-header">
      <input
        type="text"
        v-model="mytext"
      >
      <p @click="handleCancel()">取消</p>
    </div>
    <ul class="film-show">
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
import { nowplayingAPI } from '@/api/nowplayingdata'
import { comingsoonAPI } from '@/api/comingsoondata'
export default {
  data () {
    return {
      filmsList: [],
      mytext: ''
    }
  },
  computed: {
    getMyDataList () {
      return this.filmsList.filter((item) => item.name.indexOf(this.mytext) > -1)
    }
  },
  methods: {
    handleDetailClick (id) {
      this.$router.push(`/detail/${id}`)
    },
    handleCancel () {
      this.$router.push('/film/nowplaying')
    }
  },
  beforeMount () {
    this.$store.commit('SET_IS_HIDDEN_TABBAR', false)
  },
  mounted () {
    for (let num = 1; num <= 4; num++) {
      nowplayingAPI(num).then(res => {
        this.filmsList = [...this.filmsList, ...res.data.data.films]
      })
    }
    for (let num = 1; num <= 2; num++) {
      comingsoonAPI(num).then(res => {
        this.filmsList = [...this.filmsList, ...res.data.data.films]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.film-search {
  width: 100%;
  height: 100%;
  background-color: #fff;

  .search-header {
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

  .film-show {
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
