<template>
  <div
    class="detail"
    v-if="list.length != 0"
  >
    <div
      class="detail-header"
      :class="isShow?'detail-header-bj-color':''"
    >
      <span
        class="iconfont icon-icon-test3"
        @click="handleClickReturn()"
      ></span>
      <p v-show="isShow">
        {{list.name}}
      </p>
    </div>
    <div class="detail-poster">
      <img :src="list.poster">
    </div>
    <div class="detail-info">
      <div class="intro">
        <p class="title">
          {{list.name}}
          <span class="type">{{list.filmType.name}}</span>
          <span
            class="grade"
            v-if="list.grade"
          >{{list.grade}}<i>分</i></span>
          <span
            class="grade"
            v-else
          >暂无评分</span>
        </p>
        <p class="category">
          {{list.category | categoryfilter}}
        </p>
        <p class="nation-time">{{list.nation}} | {{list.runtime}}分钟</p>
        <div
          class="synopsis"
          :class="{'drop-down':isIconClick}"
        >
          <p>{{list.synopsis}}</p>
          <span
            :class="[iconfont,isIconClick?icon2:icon1]"
            @click="handleDropDown()"
          ></span>
        </div>
      </div>
      <div class="actor-show">
        <p class="actor-title">演职人员</p>
        <ActorShow>
          <div
            slot="actorbox"
            class="actorbox"
            v-for="(item,index) in list.actors"
            :key="index"
          >
            <div class="actor-avatar">
              <img
                :src="item.avatarAddress"
                @click="getActorImg(list.actors,index)"
              >
            </div>
            <p class="actor-name">
              {{item.name | actornamefilter}}
            </p>
          </div>
        </ActorShow>
      </div>
      <div class="stills-show">
        <p class="stills-title">剧照</p>
        <StillsShow v-if="list.photos">
          <div
            slot="stillsbox"
            class="stillsbox"
            v-for="(still,index) in list.photos"
            :key="index"
          >
            <img
              :src="still"
              @click="getStillImg(list.photos,index)"
            >
          </div>
        </StillsShow>
        <div
          v-else
          class="still-none"
        >暂无电影剧照</div>
      </div>
    </div>
    <button
      class="seat"
      @click="handleBuyClick()"
    >选座购票</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { detaildataAPI } from '@/api/detaildata'
import ActorShow from '@/views/detail/ActorShow.vue'
import StillsShow from '@/views/detail/StillsShow.vue'
import { ImagePreview } from 'vant'
export default {
  data () {
    return {
      isShow: false,
      isPresale: false,
      list: [],
      isIconClick: false,
      iconfont: 'iconfont',
      icon1: 'icon-icon-test4',
      icon2: 'icon-icon-test2'
    }
  },
  components: {
    ActorShow,
    StillsShow,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  computed: {
    ...mapState(['detailFrom'])
  },
  filters: {
    categoryfilter (data) {
      return data.split('|').join(' | ')
    },
    actornamefilter (data) {
      return data.split('·')[0]
    }
  },
  methods: {
    handledetailonscroll () {
      const moveDis = document.documentElement.scrollTop
      if (moveDis >= 50) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    handleClickReturn () {
      if (this.detailFrom === 'nowplaying') {
        this.$router.push('/film/nowplaying')
      } else if (this.detailFrom === 'comingsoon') {
        this.$router.push('/film/comingsoon')
      } else {
        this.$router.push('/film/nowplaying')
      }
    },
    handleDropDown () {
      this.isIconClick = !this.isIconClick
    },
    handleBuyClick () {
      this.$router.push('/login')
    },
    getActorImg (data, index) {
      const arr = []
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].avatarAddress)
      }
      // eslint-disable-next-line no-undef
      ImagePreview({
        images: arr,
        closeable: true,
        startPosition: index
      })
    },
    getStillImg (data, index) {
      ImagePreview({
        images: data,
        closeable: true,
        startPosition: index
      })
    }
  },
  beforeMount () {
    this.$store.commit('SET_IS_HIDDEN_TABBAR', false)
  },
  mounted () {
    window.onscroll = this.handledetailonscroll
    // 加载提示
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    // 数据请求
    const id = this.$route.params.id
    detaildataAPI(id).then(res => {
      this.list = res.data.data.film
      this.isPresale = res.data.data.film.isPresale
      console.log('detail-数据请求成功')
    }).then(res => {
      this.$toast.clear()
    })
    // 判断影片是否排期
    if (this.isPresale) {
      this.$dialog.confirm({
        message: '该影片暂未排期,去看看其他电影吧！'
      }).then(() => {
        if (this.detailFrom === 'nowplaying') {
          this.$router.push('/film/nowplaying')
        } else if (this.detailFrom === 'comingsoon') {
          this.$router.push('/film/comingsoon')
        }
      }).catch(() => {

      })
    }
  },
  destroyed () {
    window.onscroll = null
    this.$store.commit('SET_IS_SHOW_TABBAR', true)
  }
}
</script>

<style lang="scss" scoped>
.detail {
  position: relative;
  width: 100%;
  height: 100%;

  .detail-header {
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 100px;
    line-height: 100px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: start;
    transition: background-color 0.5s;

    span {
      font-size: 60px;
      margin-left: 10px;
    }

    p {
      width: 500px;
      font-size: 30px;
      text-align: center;
      overflow: hidden;
      margin-left: calc(50% - 320px);
    }
  }

  .detail-header-bj-color {
    background-color: #fff;
    height: 100px;
  }

  .detail-poster {
    position: absolute;
    top: -300px;
    width: 100%;
    height: 1050px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .detail-info {
    position: absolute;
    top: 420px;
    width: 100%;
    background-color: #f4f4f4;
    padding-bottom: 120px;

    .intro {
      box-sizing: border-box;
      padding: 20px;
      width: 100%;
      // height: 400px;
      background-color: #fff;
      padding-bottom: 40px;

      p {
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin-bottom: 4px;
      }

      .title {
        position: relative;
        font-size: 34px;

        .type {
          position: absolute;
          top: 5px;
          height: 40px;
          line-height: 40px;
          color: #fff;
          background-color: #d2d6dc;
          font-size: 22px;
          padding: 0 5px;
          margin-left: 10px;
          border-radius: 8px;
          text-align: center;
        }

        .grade {
          position: absolute;
          right: 10px;
          font-size: 38px;
          font-style: italic;
          color: #ffb232;

          i {
            font-size: 18px;
          }
        }
      }

      .category {
        font-size: 28px;
        color: #999;
      }

      .nation-time {
        font-size: 28px;
        color: #999;
      }

      .synopsis {
        position: relative;
        width: 100%;
        height: 120px;

        p {
          color: #999;
          line-height: 50px;
          font-size: 26px;
          height: 100px;
          // // 多行文本溢出
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        span {
          position: absolute;
          font-size: 40px;
          left: calc(50% - 20px);
        }
      }

      .drop-down {
        height: initial;

        p {
          height: initial;
          display: block;
        }
      }
    }

    .actor-show {
      width: 100%;
      background-color: #fff;
      margin-top: 20px;

      .actor-title {
        box-sizing: border-box;
        width: 100%;
        height: 100px;
        line-height: 100px;
        font-size: 30px;
        padding-left: 20px;
        background-color: #fff;
      }
    }

    .stills-show {
      width: 100%;
      background-color: #fff;
      margin-top: 20px;
      padding-bottom: 20px;

      .stills-title {
        box-sizing: border-box;
        width: 100%;
        height: 100px;
        line-height: 100px;
        font-size: 30px;
        padding-left: 20px;
        background-color: #fff;
      }

      .still-none {
        width: 100%;
        height: 200px;
        line-height: 200px;
        text-align: center;
        color: #999;
        font-size: 28px;
      }
    }
  }

  .seat {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: #ff5f16;
    border: 1px solid #ff5f16;
    color: #fff;
    font-size: 32px;
  }
}
</style>
