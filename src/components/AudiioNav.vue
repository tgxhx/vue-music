<template>
  <div class="audio-nav">
    <div class="music-wrap">
      <div class="music-img" @click="showPlayer">
        <img :src="curPlayMusic.detail.al.picUrl" alt="">
      </div>
      <div class="music-con">
        <p class="music-name" v-if="curPlayMusic">{{curPlayMusic.detail.name}}</p>
        <p class="music-lyric">给你一张过去的cd</p>
      </div>
    </div>
    <div class="music-btn">
      <div class="nav-btn-play">
        <i class="iconfont icon-ttpodicon" v-if="!playing" @click="play"></i>
        <i class="iconfont icon-zanting" v-else @click="pause"></i>
      </div>
      <div class="nav-btn-list">
        <i class="iconfont icon-liebiao"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        url: ''
      }
    },
    computed: {
      ...mapState([
        'curPlayMusic', 'playing'
      ])
    },
    mounted() {
      this.$nextTick(() => {
        this.url = curPlayMusic.url
        var audioStatus = "paused";
        var audio = this.$refs.nav_music;
        audio.addEventListener("onplaying", function () {
          audioStatus = "playing";
          console.log(audioStatus)
        });
        audio.addEventListener("onpause", function () {
          audioStatus = "paused";
          console.log(audioStatus)
        });
      })
    },
    methods: {
      play() {
        document.getElementById('music').play()
        this.$store.dispatch('switchPlaying', true)
      },
      pause() {
        document.getElementById('music').pause()
        this.$store.dispatch('switchPlaying', false)
      },
      musicPlaying() {
        console.log('music playing')
      },
      showPlayer() {
        this.$store.state.showPlayer = true
      }
    },
    filters: {},
    watch: {
      url(val, old) {
        if (val == null) {
          alert('播放失败，该歌曲需要收费')
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../assets/css/base';

  .audio-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    height: pr(45);
    box-shadow: 0 -2px 8px #ccc;
    padding: pr(6);
    background-color: #fff;
    z-index: 1000;
    .music-wrap {
      display: flex;
      .music-img {
        width: pr(33);
        img {
          @include wh(100%);
        }
      }
      .music-con {
        margin-left: pr(10);
        margin-top: pr(3);
        p {
          &:first-of-type {
            font-size: pr(12);
          }
          &:nth-of-type(2) {
            margin-top: pr(5);
            font-size: pr(10);
            color: #666;
          }
        }
      }
    }
    .music-btn {
      display: flex;
      align-items: center;
      .nav-btn-play {
        display: flex;
        justify-content: center;
        align-items: center;
        @include wh(pr(24));
        border: 1px solid #666;
        border-radius: 50%;
        i {
          font-size: pr(12);
        }
      }
      .nav-btn-list {
        margin-left: pr(15);
        i {
          font-size: pr(18);
        }
      }
    }
  }
</style>
