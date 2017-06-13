/**
 * Created by 12 on 2017/6/8.
 */
import * as types from './mutation-type'

export default {
  curPlaylistDetail({commit}, obj) {
    commit(types.CUR_PLAYLIST_INFO, obj)
  },
  curPlayMusic({commit}, arr) {
    commit(types.CUR_PLAY_MUSIC, arr)
  },
  switchPlaying({commit}, status) {
    commit(types.SWITCH_PLAYING, status)
  }
}
