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

var a = {
  loginType: 1,
  code: 200,
  account: {
    id: 46909653,
    userName: '0_wo460520803@163.com',
    type: 0,
    status: 0,
    whitelistAuthority: 0,
    createTime: 0,
    salt: '',
    tokenVersion: 0,
    ban: 0,
    baoyueVersion: -2,
    donateVersion: 0,
    vipType: 0,
    viptypeVersion: 0,
    anonimousUser: false
  }
}
