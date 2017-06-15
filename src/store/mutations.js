/**
 * Created by 12 on 2017/6/8.
 */
import * as types from './mutation-type'

export default {
  [types.CUR_PLAYLIST_INFO](state, obj) {
    state.curPlaylistDetail = obj
  },
  [types.CUR_PLAY_MUSIC](state, arr) {
    const obj = {
      url: arr[0].data.data[0].url,
      // url: 'http://localhost/static/%E5%91%A8%E6%9D%B0%E4%BC%A6%20-%20%E6%99%B4%E5%A4%A9.mp3',
      detail: arr[1].data.songs[0],
      lrc: arr[2].data.lrc
    }
    state.curPlayMusic = obj
  },
  [types.SWITCH_PLAYING](state, status) {
    state.playing = status
  },
  [types.SHOW_CUR_LYRIC](state, lyric) {
    state.curLyric = lyric
  },
  [types.SHOW_PLAY_LIST](state, status) {
    state.showPlayList = status
  },
  [types.PLAY_LIST](state, arr) {
    state.playList = arr
  }
}
