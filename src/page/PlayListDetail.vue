<template>
  <div id="playlist_detail" ref="playlistdetail"><!-- v-if="JSON.stringify(playlist) !== '{}'"-->
    <div>
      <md-toolbar class="md-dense songlist">
        <md-button class="md-icon-button">
          <md-icon @click.native="back">arrow_back</md-icon>
        </md-button>
        <h2 class="md-title" style="flex: 1">歌单</h2>
        <md-button class="md-icon-button">
          <!--<md-icon @click.native="toHome">search</md-icon>-->
        </md-button>
      </md-toolbar>
      <div class="songlist-bg-wrap gradient-wrap">
        <div class="songlist-info">
          <div class="songlist-img">
            <img class="gradient-img" :src="curPlaylistDetail.picUrl || playlist.creator.backgroundUrl" alt="">
            <div class="play-views" v-if="playlist.playCount"><i
              class="iconfont icon-erjiline"></i>{{playlist.playCount | playCount}}万
            </div>
          </div>
          <div class="songlist-title">
            <h3>{{curPlaylistDetail.name || playlist.name}}</h3>
            <div class="songlist-avatar">
              <div class="songlist-avatar-img">
                <img :src="playlist.creator.avatarUrl" alt="" v-if="JSON.stringify(playlist) !== '{}'">
                <img src="../assets/images/playlist-avatar.png" alt="" v-else>
              </div>
              <span v-if="JSON.stringify(playlist) !== '{}'">{{playlist.creator.nickname}} </span><i
              class="iconfont icon-jiantou"></i>
            </div>
          </div>
        </div>
        <div class="songlist-operating">
          <div class="songlist-op-item"><i
            class="iconfont icon-wenjianjia"></i><span>{{playlist.subscribedCount || '收藏'}}</span>
          </div>
          <div class="songlist-op-item"><i
            class="iconfont icon-pinglun"></i><span>{{playlist.commentCount || '评论'}}</span>
          </div>
          <div class="songlist-op-item"><i
            class="iconfont icon-icglobaltitlebar48iconfontshare"></i><span>{{playlist.shareCount || '分享'}}</span></div>
          <div class="songlist-op-item"><i class="iconfont icon-download"></i><span>下载</span></div>
        </div>
        <div class="songlist-bg" ref="songlist_bg"
             :style="`backgroundImage: url(${this.curPlaylistDetail.picUrl});`"></div>
      </div>
      <div class="song-list">
        <div class="play-bar">
          <div class="play-bar-btn"><i
            class="iconfont icon-iconfont31"></i>播放全部<span
            v-if="JSON.stringify(playlist) !== '{}'">(共{{playlist.tracks.length}}首)</span></div>
        </div>
        <div class="song-item" v-for="(item,index) in playlist.tracks">
          <div class="song-index">{{index + 1}}</div>
          <div class="song-info" @click="playMusic(item.id)">
            <p class="song-name">{{item.name}}<span class="song-desc" v-show="item.alia[0]">{{item.alia[0]}}</span></p>
            <p class="song-singer"><span v-for="(itemname,index) in item.ar">{{itemname.name}}/</span> - {{item.al.name}}
            </p>
          </div>
          <div class="song-option">
            <i class="iconfont icon-more1170511easyiconnet"></i>
          </div>
        </div>
      </div>
      <div class="playlist-loading" v-if="loading">
        <md-spinner :md-size="40" md-indeterminate></md-spinner>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'
  import url from '../assets/js/api'
  import Grade from 'grade-js'
  import filters from '../assets/js/filters'

  export default {
    data() {
      return {
        playlist: {},
        playListPanel: [], //存放播放列表
        loading: true
      }
    },
    computed: {
      ...mapState([
        'curPlaylistDetail'
      ]),
    },
    created() {
      this.fetchSongList()
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
//      歌单详情
      fetchSongList() {
        axios.get(`${url}/playlist/detail?id=${this.$route.params.id}`).then(res => {
          //获取完毕隐藏loading
          this.loading = false
          this.playlist = res.data.playlist
          let songObj
          //添加当前歌单到播放列表面板
          this.playlist.tracks.forEach((val) => {
            songObj = {
              id: val.id,
              name: val.name,
              artist: val.ar
            }
            this.playListPanel.push(songObj);
          })
//          console.log(this.playListPanel)
        }).catch(err => {
          console.error(err)
        })
      },
      back() {
        this.$router.go(-1)
      },
      playMusic(id) {
        this.$store.state.showPlayer = true
        function getUrl() {
          return axios.get(`${url}/music/url?id=${id}`)
        }

        function getDetail() {
          return axios.get(`${url}/song/detail?ids=${id}`)
        }

        function getLyric() {
          return axios.get(`${url}/lyric?id=${id}`)
        }
        //获取歌曲信息，并统一存入vuex中
        axios.all([getUrl(), getDetail(), getLyric()])
          .then(axios.spread((res1, res2, res3) => {
            const arr = [res1, res2, res3]
            this.$store.dispatch('curPlayMusic', arr)
            this.$store.dispatch('switchPlaying', true)
            this.$store.dispatch('playList', this.playListPanel)
//            console.log(this.playListPanel)
          }))
      },
    },
    //歌单播放次数过滤器
    filters: filters,
  }
</script>

<style lang="scss" type="text/scss">
  @import '../assets/css/base';

  .md-toolbar.songlist {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.05);
    z-index: 1;
    h2 {
      font-size: pr(14);
    }
  }

  .songlist-bg-wrap {
    position: relative;
    height: pr(220);
    background-color: rgba(64, 46, 32, 0.58);
    padding: pr(50) pr(20) pr(10);
    color: #fff;
    overflow: hidden;
    .songlist-info {
      display: flex;
      .songlist-img {
        position: relative;
        @include wh(pr(116));
        img {
          @include wh(100%)
        }
        .play-views {
          display: flex;
          align-items: center;
          position: absolute;
          right: pr(5);
          top: pr(5);
          font-size: pr(10);
          i {
            margin-right: pr(3);
            font-size: pr(10);
          }
        }
      }
      .songlist-title {
        flex: 1;
        margin-left: pr(20);
        padding-top: pr(10);
        h3 {
          line-height: 1.4;
          font-size: pr(14);
        }
        .songlist-avatar {
          display: flex;
          align-items: center;
          margin-top: pr(25);
          .songlist-avatar-img {
            overflow: hidden;
            border-radius: 50%;
            @include ava(pr(24))
          }
          span {
            margin-left: pr(10);
            font-size: pr(12);
          }
          .iconfont {
            font-size: pr(10);
          }
        }
      }
    }
    .songlist-operating {
      display: flex;
      align-items: center;
      margin-top: pr(5);
      height: pr(48);
      .songlist-op-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        i {
          font-size: pr(16);
        }
        span {
          margin-top: pr(3);
          font-size: pr(12);
        }
      }
    }
    .songlist-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      filter: blur(35px)
    }
  }

  .song-list {
    $border_b: #e6e6e6;
    $c888: #888;
    .play-bar {
      display: flex;
      height: pr(46);
      padding: 0 pr(15);
      align-items: center;
      border-bottom: 1px solid $border_b;
      .play-bar-btn {
        font-size: pr(14);
        .iconfont {
          font-size: pr(18);
          margin-right: pr(10);
        }
        span {
          margin-left: pr(5);
          font-size: pr(12);
          color: $c888;
        }
      }
    }
    .song-item {
      display: flex;
      height: pr(50);
      border-bottom: 1px solid $border_b;
      .song-index {
        display: flex;
        justify-content: center;
        align-items: center;
        width: pr(45);
      }
      .song-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        overflow: hidden;
        .song-name {
          line-height: 1.2;
          font-size: pr(14);
          @include ell;
          .song-desc {
            color: $c888;
            font-size: pr(12);
          }
        }
        .song-singer {
          line-height: 1.2;
          margin-top: pr(3);
          color: $c888;
          font-size: pr(10);
          @include ell;
        }
      }
      .song-option {
        display: flex;
        justify-content: center;
        align-items: center;
        width: pr(45);
        color: $c888;
      }
    }
  }

  .playlist-loading {
    text-align: center;
    margin-top:pr(80);
  }
</style>
