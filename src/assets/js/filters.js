/**
 * Created by 12 on 2017/6/11.
 */

const filters = {
  //歌单播放数
  playCount(value) {
    if (value < 10000) {
      return value
    } else {
      value = value + ''
      return value.slice(0, value.length - 4)
    }
  }
}

export default filters

