<template>
  <div class="player animated fadeIn" v-show="showPlayer">
    <md-toolbar class="md-dense player-bar">
      <md-button class="md-icon-button">
        <md-icon @click.native="back">arrow_back</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">因为爱情<br/><span>王菲</span></h2>
      <md-button class="md-icon-button">
        <md-icon>share</md-icon>
      </md-button>
    </md-toolbar>
    <div class="record-cover">
      <div class="record-bg rotate-bg animated slideInRight">
        <div class="music-bg">
          <img src="http://p1.music.126.net/y1JN20Yevr4e8j75QeWtQA==/1771313232347170.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="player-ctrl">
      <div class="progress">
        <span>00:00</span>
        <div class="progress-bar"></div>
        <span>04:00</span>
      </div>
      <div class="player-conctrl">
        <div class="play-mode"><i class="iconfont icon-suijibofang"></i></div>
        <div class="prev"><i class="iconfont icon-shangyishou1"></i></div>
        <div class="ctrl">
          <i class="iconfont icon-iconfontplay" v-if="playing" @click="play"></i>
          <i class="iconfont icon-zanting" v-else @click="pause"></i>
        </div>
        <div class="next"><i class="iconfont icon-xiayishou1"></i></div>
        <div class="play-list"><i class="iconfont icon-liebiao"></i></div>
      </div>
    </div>
    <div class="player-bg"></div>
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
        'playing','showPlayer'
      ])
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
      play() {
        document.getElementById('nav-music').play()
        this.$store.dispatch('switchPlaying', true)
      },
      pause() {
        document.getElementById('nav-music').pause()
        this.$store.dispatch('switchPlaying', false)
      },
      back() {
        this.$store.state.showPlayer = false
      }
    },
    filters: {},
  }
</script>

<style lang="scss" type="text/scss">
  @import '../assets/css/base';

  .player {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    z-index: 1001;
    &.animated {
      -webkit-animation-duration: .1s;
      -moz-animation-duration: .1s;
      -o-animation-duration: .1s;
      animation-duration: .1s;
    }
  }

  .player-bar {
    background-color: transparent !important;
    h2 {
      line-height:1.1;
      font-size:pr(16) !important;
      span {
        font-size:pr(12);
      }
    }
  }

  .record-cover {
    @include wh(pr(250));
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left:50%;
    top:40%;
    border-radius: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(255,255,255,.2);
    .record-bg {
      @include wh(pr(246));
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url("../assets/images/record-bg.png");
      background-size: 100% 100%;
      &.rotate-bg {
        animation: rotatebg 20s linear infinite;
      }
      @keyframes rotatebg {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(180deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .music-bg {
        @include wh(pr(168));
        border-radius: 50%;
        overflow: hidden;
        img {
          @include wh(100%);
        }
      }
    }
  }

  .player-ctrl {
    position: absolute;
    left:0;
    bottom:0;
    right:0;
    height:pr(110);
    color:#fff;
    background-color: transparent;
    .progress {
      display: flex;
      align-items: center;
      padding:0 pr(19);
      margin-top:pr(15);
      span {
        font-size:pr(10);
      }
      .progress-bar {
        flex:1;
        margin:0 pr(5);
        height:pr(3);
        background-color: #9f9f9f;
      }
    }
    .player-conctrl {
      margin-top:pr(22);
      padding:0 pr(15);
      display: flex;
      align-items: center;
      justify-content:space-around;
      > div i {
        font-size:pr(20);
      }
      .ctrl {
        display: flex;
        justify-content: center;
        align-items: center;
        @include wh(pr(40));
        border:1px solid #fff;
        border-radius: 50%;
        i {
          margin-top:pr(3);
          margin-left:pr(3);
          font-size:pr(18);
        }
      }
    }
  }

  .player-bg {
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    z-index:-1;
    background-image: url("http://p1.music.126.net/y1JN20Yevr4e8j75QeWtQA==/1771313232347170.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    filter: blur(80px);
  }
</style>
