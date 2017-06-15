<template>
  <div class="play-list-wrap" :class="{hide: showPlayList}" @touchmove.prevent>
    <div class="play-list" :class="{hidelist:showPlayList}">
      <div class="play-list-title">
        随机播放（447）
      </div>
      <div class="play-list-content">
        <ul>
          <li class="play-list-item">
            <div class="song-name">无法克制 - <span>林俊杰</span></div>
            <div class="song-del"><i class="iconfont icon-shanchu"></i></div>
          </li>
        </ul>
      </div>
    </div>
    <div class="play-list-cover" :class="{hide: showPlayList}" @click="hideCover"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        hidePlayList: false
      }
    },
    computed: {
      ...mapState([
        'showPlayList'
      ])
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
      hideCover() {
        this.$store.dispatch('showPlayList', true)
      }
    },
    filters: {},
  }
</script>

<style lang="scss" type="text/scss">
  @import '../assets/css/base';

  .play-list-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1002;
    transition: all .5s;
    &.hide {
      transform: translate(0, 100%);
    }
    .play-list {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: pr(394);
      background-color: #fff;
      z-index: 1;
      transform: translate(0, 0);
      &.hidelist {
        transition: all .3s;
        transform: translate(0, 100%);
      }
      .play-list-title {
        display: flex;
        justify-content:space-between;
        align-items: center;
        height:pr(46);
        font-size:pr(14);
        border-bottom:1px solid #e0e0e0;
      }
      .play-list-content {
        .play-list-item {
          display: flex;
          justify-content:space-between;
          align-items: center;
          height:pr(42);
          padding:0 pr(10);
          border-bottom:1px solid #e0e0e0;
          .song-name {
            flex:1;
            font-size:pr(14);
            line-height:1.5;
            margin-right:pr(10);
            @include ell;
            span {
              color:#909090;
              font-size:pr(10);
            }
          }
          .song-del {
            .iconfont {
              font-size:pr(18);
            }
          }
        }
      }
    }
    .play-list-cover {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      opacity: 1;
      background-color: rgba(0, 0, 0, .5);
      transition: all .5s;
      &.hide {
        position: static;
        opacity: 0;
      }
    }
  }


</style>
