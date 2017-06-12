/**
 * Created by 12 on 2017/6/8.
 */
import * as types from './mutation-type'

export default {
  [types.CUR_PLAYLIST_INFO](state, obj) {
    state.curPlaylistDetail = obj
  },
  [types.CUR_PLAY_MUSIC](state, arr) {
    console.log(arr)
    let obj = {
      url: arr[0].data.data[0].url,
      detail: arr[1].data.songs[0],
      lrc: arr[2].data.lrc
    }
    state.curPlayMusic = obj
  }
}
