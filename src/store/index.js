import Vue from 'vue'
import Vuex from 'vuex'

// 导入api
import { filmswipeAPI } from '@/api/filmswiperdata'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filmswipedata: [], // 轮播图数据
    isShowTabbar: true, // 底部导航显示
    detailFrom: '', // 详情页数据从正在热映还是即将上映来
    cityFrom: '' // 城市数据从电影还是影院来

  },
  mutations: {
    SET_FILM_SWIPE_DATA (state, data) {
      state.filmswipedata = data
    },
    SET_IS_SHOW_TABBAR (state, data) {
      state.isShowTabbar = data
    },
    SET_IS_HIDDEN_TABBAR (state, data) {
      state.isShowTabbar = data
    },
    SET_DETAIL_FROM (state, data) {
      state.detailFrom = data
    },
    SET_CITY_FROM (state, data) {
      state.cityFrom = data
    }
  },
  actions: {
    getFilmSwipeData ({ commit }) { // 请求轮播图数据
      filmswipeAPI().then(res => {
        commit('SET_FILM_SWIPE_DATA', res.data.data)
      })
    }
  },
  modules: {
  }
})
