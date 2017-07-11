import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  curPlaylistDetail: {},
  curPlayMusic: {},
  playing: false,
  showPlayer: false,
  curLyric: '',
  showPlayList: false,
  playList: [],
  showCover: false,
  commentId: null,
  showComment: false,
  curMusicIndex: 0
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
