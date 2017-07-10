<template>
  <div class="play-list" :class="{showlist:showPlayList}">
    <div class="play-list-title">
      播放列表（{{playList.length}}）{{curMusicIndex}}
    </div>
    <div class="play-list-content">
      <ul>
        <li class="play-list-item" v-for="(item,index) in playList" :key="index">
          <div
            class="song-name"
            :class="{current: item.id === curId}"
            @click="playMusicFromList(item.id)">
            <i class="iconfont icon-iconfonthuodonggonggao"></i>{{item.name}} -
            <span v-for="(value,i) in item.artist">{{value.name}}
              <span v-if="i !== item.artist.length - 1"> / </span>
            </span>
          </div>
          <div class="song-del"><i class="iconfont icon-shanchu"></i></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState,mapGetters} from 'vuex'
  import url from '../assets/js/api'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState([
        'showPlayList', 'playList','curPlayMusic','curMusicIndex'
      ]),
      ...mapGetters([
        'curId'
      ]),
      curMusicIndexComputed() {
        if (this.playList.length > 0) {
          return this.playList.findIndex((ele) => {
            return ele.id === this.curId
          })
        } else {
          return 0
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$store.dispatch('curMusicIndex', this.curMusicIndexComputed)
      })
    },
    methods: {
      hideCover() {
        this.$store.dispatch('showPlayList', false)
      },
      playMusicFromList(id) {
        function getUrl() {
          return axios.get(`${url}/music/url?id=${id}`)
        }

        function getDetail() {
          return axios.get(`${url}/song/detail?ids=${id}`)
        }

        function getLyric() {
          return axios.get(`${url}/lyric?id=${id}`)
        }
        axios.all([getUrl(), getDetail(), getLyric()])
          .then(axios.spread((res1, res2, res3) => {
            const arr = [res1, res2, res3]
            this.$store.dispatch('curPlayMusic', arr)
            this.$store.dispatch('switchPlaying', true)
          }))
      }
    },
    filters: {},
    watch: {
      curMusicIndex(val, old) {
        this.playMusicFromList(this.playList[val].id)
        console.log(this.playList[val].id)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../assets/css/base';

  .play-list {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    height: pr(394);
    background-color: #fff;
    z-index: 1003;
    transform: translate(0, 100%);
    &.showlist {
      transition: all .3s;
      transform: translate(0, 0);
    }
    .play-list-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 pr(10);
      height: pr(40);
      font-size: pr(14);
      border-bottom: 1px solid #e0e0e0;
    }
    .play-list-content {
      height:pr(354);
      overflow-y: auto;
      ul {
      }
      .play-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: pr(42);
        padding: 0 pr(10);
        border-bottom: 1px solid #e0e0e0;
        .song-name {
          flex: 1;
          font-size: pr(14);
          line-height: 1.5;
          margin-right: pr(10);
          @include ell;
          .iconfont {
            display: none;
          }
          &.current {
            color:$baseColor;
            .iconfont {
              display: inline;
              margin-top:pr(2);
              margin-right:pr(5);
              font-size:pr(14);
            }
            span {
              color:$baseColor;
            }
          }
          span {
            color: #909090;
            font-size: pr(10);
          }
        }
        .song-del {
          .iconfont {
            font-size: pr(18);
          }
        }
      }
    }
  }


</style>
