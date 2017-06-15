<template>
  <div class="play-list" :class="{showlist:showPlayList}">
    <div class="play-list-title">
      播放列表（447）
    </div>
    <div class="play-list-content">
      <ul>
        <li class="play-list-item" v-if="(item,index) in playList" :key="index">
          <div class="song-name">item.name - <span>林俊杰</span></div>
          <div class="song-del"><i class="iconfont icon-shanchu"></i></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState([
        'showPlayList','playList'
      ])
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
      hideCover() {
        this.$store.dispatch('showPlayList', false)
      }
    },
    filters: {},
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
      padding:0 pr(10);
      height: pr(46);
      font-size: pr(14);
      border-bottom: 1px solid #e0e0e0;
    }
    .play-list-content {
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
