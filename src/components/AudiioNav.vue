<template>
  <div class="audio-nav">
    <audio :src="curPlayMusic.url" id="nav-music" autoplay="autoplay"></audio>
    <div class="nav-music-wrap">
      <div class="nav-music-img">
        <img src="http://p1.music.126.net/t1zXkn0YifMbrs-xjC7Lvg==/109951162945442238.jpg" alt="">
      </div>
      <div class="nav-music-con">
        <p class="nav-music-name">{{curPlayMusic.detail.name}}</p>
        <p class="nav-music-lyric">给你一张过去的cd</p>
      </div>
    </div>
    <div class="nav-music-btn">
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
        playing: false,
        url: ''
      }
    },
    computed: {
      ...mapState([
        'curPlayMusic'
      ])
    },
    mounted() {
      this.$nextTick(() => {
        this.url = curPlayMusic.url
      })
    },
    methods: {
      play() {
        document.getElementById('nav-music').play()
        this.playing = true
      },
      pause() {
        document.getElementById('nav-music').pause()
        this.playing = false
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
    .nav-music-wrap {
      display: flex;
      .nav-music-img {
        width: pr(33);
        img {
          @include wh(100%);
        }
      }
      .nav-music-con {
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
    .nav-music-btn {
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
