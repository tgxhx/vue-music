<template>
  <div class="player animated fadeIn" :class="{show: showPlayer}">
    <audio :src="curPlayMusic.url"
           id="music"
           autoplay="autoplay"
           ref="audio"
           @timeupdate="timeProgress"
           @ended="ended"
           @play="startPlay"></audio>
    <div class="player-wrap">
      <md-toolbar class="md-dense player-header">
        <md-button class="md-icon-button">
          <md-icon @click.native="back">arrow_back</md-icon>
        </md-button>
        <h2 class="md-title" style="flex: 1">{{curPlayMusic.detail.name}}<br/><span
          v-for="(item,index) in curPlayMusic.detail.ar">{{item.name}}/</span></h2>
        <md-button class="md-icon-button">
          <md-icon>share</md-icon>
        </md-button>
      </md-toolbar>
      <div class="player-panel1">
        <div class="player-line"></div>
        <div class="record-cover">
          <div class="record-bg rotate-bg animated slideInRight">
            <div class="music-bg">
              <img :src="curPlayMusic.detail.al.picUrl" alt="">
            </div>
          </div>
        </div>
        <div class="player-bar">
          <div class="bar-item"><i class="iconfont icon-like"></i></div>
          <div class="bar-item"><i class="iconfont icon-download"></i></div>
          <div class="bar-item"><i class="iconfont icon-pinglun"></i><span
            class="comment-total">{{11111 | commentTotalFormat}}</span></div>
          <div class="bar-item"><i class="iconfont icon-more1170511easyiconnet"></i></div>
        </div>
      </div>
      <div class="player-panel2">
        <ul ref="lyric_wrap" :style="`marginTop: ${marginTop}px`">
          <li v-for="(value,key) in lyric">{{value}}{{key}}</li>
        </ul>
      </div>
      <div class="player-ctrl">
        <div class="progress">
          <span>{{currentTime | timeFormat}}</span>
          <div class="progress-bar">
            <div class="cur-progress" :style="`width:${curProgress}`"></div>
            <div class="idot" :style="`left:${curIdot}`"></div>
          </div>
          <span>{{allTime | timeFormat}}</span>
        </div>
        <div class="player-conctrl">
          <div class="play-mode"><i class="iconfont icon-suijibofang"></i></div>
          <div class="prev"><i class="iconfont icon-shangyishou1"></i></div>
          <div class="ctrl">
            <i class="iconfont icon-iconfontplay" v-if="!playing" @click="play"></i>
            <i class="iconfont icon-zanting" v-else @click="pause"></i>
          </div>
          <div class="next"><i class="iconfont icon-xiayishou1"></i></div>
          <div class="play-list"><i class="iconfont icon-liebiao"></i></div>
        </div>
      </div>
    </div>
    <div class="player-bg" :style="`backgroundImage:url(${curPlayMusic.detail.al.picUrl})`"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'
  import {mapGetters} from 'vuex'


  export default {
    data() {
      return {
        curProgress: '0',
        timer: null,
        currentTime: 0,
        allTime: 0,
        curIdot: 0,
        parsed: {},
        marginTop: 0
      }
    },
    computed: {
      ...mapState([
        'playing', 'showPlayer', 'curPlayMusic'
      ]),
      /*...mapGetters([
       'lyric'
       ]),*/
      lyric() {
        return this.parseLrc(this.$store.state.curPlayMusic.lrc.lyric)
      }
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    methods: {
      play() {
        this.$refs.audio.play()
//        this.timeProgress()
        this.$store.dispatch('switchPlaying', true)
//        console.log(this.$store.state.playing)
      },
      pause() {
        this.$refs.audio.pause()
        clearInterval(this.timer)
        this.$store.dispatch('switchPlaying', false)
//        console.log(this.$store.state.playing)
      },
      timeProgress() {
        /*this.timer = setInterval(() => {*/
        const audioid = document.getElementById('music')
        this.curProgress = ((audioid.currentTime / audioid.duration) * document.querySelector('.progress-bar').offsetWidth) + 'px'
        this.curIdot = ((audioid.currentTime / audioid.duration) * document.querySelector('.progress-bar').offsetWidth - 13) + 'px'
        this.currentTime = audioid.currentTime
        this.allTime = audioid.duration
        /*}, 1000)*/

        this.updateLyric(audioid)
      },
      updateLyric(audioid) {
        var text_temp;
        var data = this.parsed
        if (!data) return;
        let currentTime = Math.round(audioid.currentTime)
        var lrc = data[currentTime];
        if (!lrc)return;
        var text = lrc.text
        if (text != text_temp) {
//          locationLrc(lrc);
          var top = Math.min(0, -lrc.top);
          this.marginTop = top
          console.log(this.marginTop)
          text_temp = text;
        }

        var _this = this

        function locationLrc(lrc) {
          var top = Math.min(0, -lrc.top);
          //lyric.css({"-webkit-transform":"translate(0,-"+lrc.top+"px)"});
          _this.marginTop = top
//          document.querySelector('.lyric_wrap').style.marginTop = top + 'px'
        }
      },
      startPlay() {
        console.log('start')
        this.setParsed()
      },
      ended() {
        this.$store.dispatch('switchPlaying', false)
      },
      setParsed() {
        let i = 0
        var lyricLineHeight = 27,
          offset = 32
        for (let k in this.lyric) {
          this.parsed[k] = {
            index: i++,
            text: this.lyric[k],
            top: i * lyricLineHeight - offset
          }
        }
        console.log(this.parsed)
      },
      back() {
        this.$store.state.showPlayer = false
      },
      parseLrc(lrc) {
        var lyrics = lrc.split("\n");
        var lrcObj = {};
        for (var i = 0; i < lyrics.length; i++) {
          var lyric = decodeURIComponent(lyrics[i]);
          var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
          var timeRegExpArr = lyric.match(timeReg);
          if (!timeRegExpArr)continue;
          var clause = lyric.replace(timeReg, '');
          for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
              sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
          }
        }
        return lrcObj;
      },
    },
    filters: {
      timeFormat(value) {
        let min = parseInt(value / 60)
        let sec = parseInt(value % 60)
        min = min < 10 ? '0' + min : min
        sec = sec < 10 ? '0' + sec : sec
        return min + ':' + sec
      },
      commentTotalFormat(value) {
        if (parseInt(value) >= 1000) {
          return '999+'
        } else {
          return value
        }
      }
    },
    watch: {
      playing(val, old) {
        if (val) {
          console.log(this.$store.state.curPlayMusic)
        } else {
          console.log(this.playing)
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../assets/css/base';

  .player {
    position: fixed;
    left: 0;
    bottom: -2000px;
    right: 0;
    background-color: #fff;
    z-index: 1001;
    &.show {
      top: 0;
      bottom: 0;
    }
    &.animated {
      -webkit-animation-duration: .1s;
      -moz-animation-duration: .1s;
      -o-animation-duration: .1s;
      animation-duration: .1s;
    }
    .player-wrap {
      z-index: 1002;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .player-header {
    height: pr(56);
    background-color: transparent !important;
    h2 {
      line-height: 1.1;
      font-size: pr(16) !important;
      span {
        color: #ccc;
        font-size: pr(12);
      }
    }
  }

  .player-panel1 {
    position: absolute;
    left: 0;
    right: 0;
    top: pr(56);
    bottom: pr(110);
    display: none;
    .player-line {
      height: 1px;
      background-image: -webkit-linear-gradient(
          to right,
          rgba(0, 0, 0, 0),
          rgba(255, 255, 255, .3),
          rgba(0, 0, 0, 0)
      );
      background-image: linear-gradient(
          to right,
          rgba(0, 0, 0, 0),
          rgba(255, 255, 255, .3),
          rgba(0, 0, 0, 0)
      );
    }

    .record-cover {
      @include wh(pr(250));
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 50%;
      top: pr(80);
      border-radius: 50%;
      transform: translate(-50%, 0);
      background-color: rgba(255, 255, 255, .2);
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

    .player-bar {
      position: absolute;
      left: 50%;
      bottom: pr(10);
      transform: translate(-50%, 0);
      display: flex;
      width: 70%;
      justify-content: space-around;
      color: #fff;
      .bar-item:nth-child(3) {
        position: relative;
        .comment-total {
          position: absolute;
          top: pr(-5);
          right: pr(-12);
          font-size: pr(8);
          width: pr(21.5);
          height: pr(10);
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, .1);
        }
      }
      .iconfont {
        font-size: pr(18);
        &:nth-child(2) {
          font-size: pr(20);
        }
      }
    }
  }

  .player-panel2 {
    position: absolute;
    left: 0;
    right: 0;
    top: pr(56);
    bottom: pr(110);
    color: #fff;
    overflow: hidden;
    ul {
      padding-top: 50%;
      transition: all .5s;
      li {
        font-size: pr(14);
        padding: pr(10) 0;
        text-align: center;
        color: #ccc;
      }
    }
  }

  .player-ctrl {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: pr(110);
    color: #fff;
    background-color: transparent;
    .progress {
      display: flex;
      align-items: center;
      padding: 0 pr(19);
      margin-top: pr(15);
      span {
        font-size: pr(8);
      }
      .progress-bar {
        flex: 1;
        margin: 0 pr(5);
        height: pr(2);
        background-color: #9f9f9f;
        .cur-progress {
          width: 50%;
          height: 100%;
          background-color: $baseColor;
        }
        .idot {
          position: relative;
          @include wh(13px);
          border-radius: 50%;
          background-color: #fff;
          top: pr(-8);
        }
      }
    }
    .player-conctrl {
      margin-top: pr(22);
      padding: 0 pr(15);
      display: flex;
      align-items: center;
      justify-content: space-around;
      > div i {
        font-size: pr(20);
      }
      .ctrl {
        display: flex;
        justify-content: center;
        align-items: center;
        @include wh(pr(40));
        border: 1px solid #fff;
        border-radius: 50%;
        i {
          margin-top: pr(3);
          margin-left: pr(3);
          font-size: pr(18);
          &.icon-zanting {
            margin-top: 0;
            margin-left: 0;
          }
        }
      }
    }
  }

  .player-bg {
    position: absolute;
    left: -30%;
    top: -30%;
    width: 180%;
    height: 180%;
    z-index: 1001;
    background-image: url("http://p1.music.126.net/y1JN20Yevr4e8j75QeWtQA==/1771313232347170.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    filter: blur(70px) brightness(70%);
  }
</style>
