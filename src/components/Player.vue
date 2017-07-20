<template>
  <div class="player animated fadeIn"
       :class="{show: showPlayer}"
       @touchmove="moveProgress">
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
        <h2 class="md-title" style="flex: 1" v-if="JSON.stringify(curPlayMusic) !== '{}'">
          {{curPlayMusic.detail.name}}<br/>
          <span
            v-for="(item,index) in curPlayMusic.detail.ar" v-if="curPlayMusic">{{item.name}}
            <span v-if="index !== curPlayMusic.detail.ar.length - 1">/ </span>
          </span></h2>
        <md-button class="md-icon-button">
          <md-icon>share</md-icon>
        </md-button>
      </md-toolbar>
      <div class="player-panel1" v-show="showPanel" @click="showPanelF">
        <div class="player-line"></div>
        <div class="player-needle"><img src="../assets/images/player-needle.png" alt=""></div>
        <div class="record-cover">
          <div class="record-bg rotate-bg animated slideInRight">
            <div class="music-bg">
              <!--判断curPlayMusic不为空-->
              <img :src="curPlayMusic.detail.al.picUrl" alt="" v-if="JSON.stringify(curPlayMusic) !== '{}'">
            </div>
          </div>
        </div>
        <div class="player-bar">
          <div class="bar-item"><i class="iconfont icon-like"></i></div>
          <div class="bar-item"><i class="iconfont icon-download"></i></div>
          <div class="bar-item" @click.stop="openComment(curPlayMusic.detail.id)"
               v-if="JSON.stringify(curPlayMusic) !== '{}'"><i class="iconfont icon-pinglun"></i><span
            class="comment-total">{{11111 | commentTotalFormat}}</span></div>
          <div class="bar-item"><i class="iconfont icon-more1170511easyiconnet"></i></div>
        </div>
      </div>
      <div class="player-panel2" v-show="!showPanel" @click="showPanelF">
        <ul ref="lyric_wrap" class="lyric-wrap" v-if="lyric" :style="`transform: translateY(${marginTop}px)`">
          <li v-for="(value,key) in lyric">{{value}}</li>
        </ul>
        <ul v-else class="lyric-wrap">
          <li>暂无歌词</li>
        </ul>
      </div>
      <div class="player-ctrl">
        <div class="progress">
          <span>{{currentTime | timeFormat}}</span>
          <div class="progress-bar" ref="progress" @click.stop="touchProgress"
               @touchend.stop="moveProgressEnd">
            <div class="cur-progress" :style="`width:${curProgress}`"></div>
            <div class="idot" :style="`left:${curIdot}`" @touchstart.stop="isMove = true"></div>
          </div>
          <span>{{allTime | timeFormat}}</span>
        </div>
        <div class="player-conctrl">
          <div class="play-mode" @click="switchMode">
            <i class="iconfont"
               :class="{
              'icon-shunxubofang': mode === 1,
              'icon-suijibofang': mode === 2,
              'icon-danquxunhuan': mode === 3}
            "></i>
          </div>
          <div class="prev" @click="prevMusic"><i class="iconfont icon-shangyishou1"></i></div>
          <div class="ctrl">
            <i class="iconfont icon-iconfontplay" v-if="!playing" @click="play"></i>
            <i class="iconfont icon-zanting" v-else @click="pause"></i>
          </div>
          <div class="next" @click="nextMusic"><i class="iconfont icon-xiayishou1"></i></div>
          <div class="play-list-btn"><i class="iconfont icon-liebiao" @click="showPlayList"></i></div>
        </div>
      </div>
    </div>
    <div class="player-bg" :style="`backgroundImage:url(${curPlayMusic.detail.al.picUrl || bg})`"
         v-if="JSON.stringify(curPlayMusic) !== '{}'"></div>
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
        parsed: {}, //临时哈希表，保存播放进度和偏移位置
        marginTop: 0,
        showPanel: true,
        mode: 1,  //播放模式，1-顺序，2-随机，3-循环
        bg: '../assets/images/bg.jpg',
        isMove: false  //
      }
    },
    computed: {
      ...mapState([
        'playing', 'showPlayer', 'curPlayMusic', 'curMusicIndex', 'playList'
      ]),
      /*...mapGetters([
       'lyric'
       ]),*/
      lyric() {
        if (this.curPlayMusic.lrc !== undefined) {
          return this.parseLrc(this.curPlayMusic.lrc.lyric) || null
        } else {
//          debugger
          return false
        }
      },
      //随机播放随机id
      randomId() {
        let length = this.playList.length
        let id
        do {
          id = Math.round(Math.random() * length)
        } while (id === this.curMusicIndex)
        return id
      }
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    methods: {
      //播放
      play() {
        this.$refs.audio.play()
//        this.timeProgress()
        this.$store.dispatch('switchPlaying', true)
//        console.log(this.$store.state.playing)
      },
//      暂停
      pause() {
        this.$refs.audio.pause()
//        clearInterval(this.timer)
        this.$store.dispatch('switchPlaying', false)
//        console.log(this.$store.state.playing)
      },
      //audio的timeupdate事件触发
      timeProgress() {
        //拖动时不执行
        if (this.isMove) return
        /*this.timer = setInterval(() => {*/
//        const audioid = document.getElementById('music')
        const audioid = this.$refs.audio
        var cur = (audioid.currentTime / audioid.duration) * this.$refs.progress.offsetWidth
        this.curProgress = cur + 'px'
        this.curIdot = (cur - 13) + 'px'
        this.currentTime = audioid.currentTime
        this.allTime = audioid.duration
        /*}, 1000)*/
        this.updateLyric(audioid)
      },
      //歌词滚动
      updateLyric(audioid) {
        let text_temp;
        let data = this.parsed
        if (!data) return;
        let currentTime = Math.round(audioid.currentTime)
        let lrc = data[currentTime];
        if (!lrc)return;
        let text = lrc.text
        if (text != text_temp) {
//          locationLrc(lrc);
          document.querySelectorAll('.lyric-wrap .on').forEach((v, i) => {
            v.classList.remove('on')
          })
          let num = document.querySelector('.lyric-wrap').querySelectorAll('li:nth-child(' + (lrc.index + 1) + ')')[0]
          num.classList.add('on')
          this.$store.dispatch('showCurLyric', num.innerText)
          let top = Math.min(0, -lrc.top);
          this.marginTop = top
          /*console.log(this.marginTop)
           console.log(lrc.index + 1)*/
          text_temp = text;
        }
      },
      //audio触发play事件，开始播放
      startPlay() {
        if (this.lyric.length <= 0) {
          return
        }
//        console.log('start')
        this.$store.dispatch('switchPlaying', true)
        this.setParsed()
      },
      //audio触发ended事件，播放完毕
      ended() {
        this.$store.dispatch('switchPlaying', false)
        this.nextMusic()
      },
      //保存歌词索引内容偏移位置
      setParsed() {
        let i = 0
        if (this.lyric.length <= 0) {
          return
        }

        //用数组保存lyric的键并排序
        var arr = []
        for (let k in this.lyric) {
          /*this.parsed[k] = {
           index: i++,
           text: this.lyric[k],
           top: (i * 30) * 0.9
           }*/
          arr.push(parseInt(k))
        }
        //循环数组来为parsed赋值
        arr.sort((a, b) => a - b).forEach((v, i) => {
          this.parsed[v] = {
            index: i++,
            text: this.lyric[v],
            top: (i * 30) * 1
          }
        })
        /*console.log(arr.sort((a, b) => a - b))
         console.log(this.parsed)*/

//        console.log(this.parsed)
      },
      //隐藏播放器
      back() {
        this.$store.state.showPlayer = false
      },
      //解析歌词
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
      //切换两个面板
      showPanelF() {
        this.showPanel = !this.showPanel
      },
      //显示播放列表
      showPlayList() {
        this.$store.dispatch('showPlayList', true)
      },
      //打开评论
      openComment(id) {
        this.$store.dispatch('commentId', id)
        this.$store.state.showComment = true
      },
      //下一首
      nextMusic() {
        if (this.mode === 1) {
          this.$store.dispatch('curMusicIndex', this.curMusicIndex + 1)
        } else if (this.mode === 2) {
          this.$store.dispatch('curMusicIndex', this.randomId)
        }
      },
      //上一首
      prevMusic() {
        if (this.mode === 1) {
          !this.curMusicIndex
            ? this.$store.dispatch('curMusicIndex', 0)
            : this.$store.dispatch('curMusicIndex', this.curMusicIndex - 1)
        } else if (this.mode === 2) {
          this.$store.dispatch('curMusicIndex', this.randomId)
        }
      },
      //切换播放模式
      switchMode() {
        this.mode < 3 ? this.mode++ : this.mode = 1
      },
      //拖动进度条
      moveProgress(e) {
        if (this.isMove) {
          const pro = this.$refs.progress
          const curWidth = (e.touches[0].clientX - pro.offsetLeft)
          this.curProgress = curWidth - 5 + 'px'
          this.curIdot = curWidth - 5 + 'px'
          console.log(curTime)
        }
      },
      //拖动进度条完毕
      moveProgressEnd(e) {
        this.isMove = false
        const pro = this.$refs.progress
        const curTime = (e.changedTouches[0].clientX - pro.offsetLeft) * pro.offsetWidth / this.allTime
        this.$refs.audio.currentTime = curTime
      },
      //点击进度条更改播放进度
      touchProgress(e) {
        const curTime = (e.clientX - this.$refs.progress.offsetLeft) * this.$refs.progress.offsetWidth / this.allTime
        console.log(curTime)
        this.$refs.audio.currentTime = curTime
      }
    },
    filters: {
      //播放时间格式化
      timeFormat(value) {
        let min = parseInt(value / 60)
        let sec = parseInt(value % 60)
        min = min < 10 ? '0' + min : min
        sec = sec < 10 ? '0' + sec : sec
        return min + ':' + sec
      },
      //评论总数大于999时显示999+
      commentTotalFormat(value) {
        if (parseInt(value) >= 1000) {
          return '999+'
        } else {
          return value
        }
      }
    },
    watch: {}
  }
</script>

<style lang="scss" type="text/scss">
  @import '../assets/css/base';

  .player {
    position: fixed;
    left: 0;
    bottom: -2000px;
    right: 0;background: url('../assets/images/bg.jpg');
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
    /*display: none;*/
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

    .player-needle {
      position: absolute;
      z-index: 1;
      top: -1px;
      left: 46%;
      height: pr(140);
      img {
        height: 100%;
      }
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
      padding-top: 65%;
      transition: all .8s;
      li {
        font-size: pr(14);
        /*padding: 5px 0;*/
        line-height: 30px;
        text-align: center;
        color: #ccc;
        &.on {
          color: #fff;
        }
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
      .play-list-btn {

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
