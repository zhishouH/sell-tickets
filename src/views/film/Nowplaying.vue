<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没了,再滑给你一拳！"
    @load="onLoad"
    offset=30
  >
    <van-cell
      v-for="item in list"
      :key="item.filmId"
    >
      <li
        class="film-data"
        @click="handleClickDetail(item.filmId)"
      >
        <!-- {{item.name}} -->
        <div class="film-poster">
          <img :src="item.poster">
        </div>
        <div class="film-info">
          <p class="title">
            {{item.name}}
            <span>
              {{item.filmType.name}}
            </span>
          </p>
          <p
            class="grade"
            v-if="item.grade"
          >
            观众评分: <span>{{item.grade}}</span>
          </p>
          <p v-else>暂无评分</p>
          <p
            class="actors"
            v-if="item.actors"
          >
            主演：{{item.actors | actorfilter}}
          </p>
          <p class="nation">
            {{item.nation | nationfilter}} | {{item.runtime}}分钟
          </p>
        </div>
        <button @click.stop="handleClickBuy()">购票</button>
      </li>
    </van-cell>
  </van-list>
</template>

<script>
import { nowplayingAPI } from '@/api/nowplayingdata'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      pageNum: 1,
      total: 0
    }
  },
  filters: {
    actorfilter (data) {
      const actorlist = data.map(item => item.name)
      return actorlist.join(' ')
    },
    nationfilter (data) {
      const nationlist = data.split(',')
      return nationlist[0]
    }
  },
  beforeMount () {
    this.$store.commit('SET_IS_SHOW_TABBAR', true)
  },
  mounted () {
    nowplayingAPI(this.pageNum).then(res => {
      this.total = res.data.data.total
    })
  },
  methods: {
    onLoad () {
      // 异步更新数据
      nowplayingAPI(this.pageNum).then(res => {
        this.list = [...this.list, ...res.data.data.films]
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= this.total - 1) {
          this.finished = true
        }
        console.log('nowplaying-数据请求成功')
      })
      this.pageNum++
    },
    handleClickDetail (id) {
      this.$router.push(`/detail/${id}`)
      this.$store.commit('SET_DETAIL_FROM', 'nowplaying')
    },
    handleClickBuy () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.film-data {
  width: 100%;
  height: 188px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  .film-poster {
    width: 122px;
    height: 197px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .film-info {
    width: 418px;
    height: 162px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    p {
      width: 100%;
      height: 38px;
      line-height: 38px;
      color: #999;
    }

    .title {
      font-size: 34px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333;

      span {
        font-size: 24px;
        color: #fff;
        background-color: #d2d6dc;
        padding: 5px 10px;
        border-radius: 10px;
      }
    }

    .grade {
      font-size: 30px;

      span {
        color: #ffb232;
      }
    }

    .actors {
      font-size: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .nation {
      font-size: 30px;
    }
  }

  button {
    width: 100px;
    height: 50px;
    font-size: 26px;
    color: #ff5f16;
    border: 1px solid #ff5f16;
    background-color: #fff;
  }
}
</style>
