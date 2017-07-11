/**
 * Created by 12 on 2017/6/14.
 */

export default {
  curId(state) {
    return state.curPlayMusic.detail ? state.curPlayMusic.detail.id : null
  }
}
