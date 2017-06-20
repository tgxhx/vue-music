<template>
  <div
    class="comment"
    :class="{show: showComment}"
    ref="comment"
    v-if="JSON.stringify(curPlayMusic) !== '{}'">
    <md-toolbar class="md-dense" :class="{show: showComment}">
      <md-button class="md-icon-button">
        <md-icon @click.native="hideComment">arrow_back</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1" @click="changeId">评论</h2>
      <md-button class="md-icon-button">
      </md-button>
    </md-toolbar>
    <div class="music-info">
      <div class="music-pic">
        <img :src="curPlayMusic.detail.al.picUrl" alt="" v-if="JSON.stringify(curPlayMusic) !== '{}'">
      </div>
      <div class="music-name">
        <p
          v-if="JSON.stringify(curPlayMusic) !== '{}'">{{curPlayMusic.detail.name}}</p>
        <p>
            <span
              v-for="(item,index) in curPlayMusic.detail.ar"
            >{{item.name}}
            <span v-if="index !== curPlayMusic.detail.ar.length - 1">/
            </span>
          </span>
        </p>
      </div>
    </div>
    <div class="wonderful-comments" v-show="!showLoading">
      <div class="comment-title">
        精彩评论
      </div>
      <ul class="comment-content">
        <li v-for="(item,index) in hotComments">
          <div class="comment-avatar">
            <div><img :src="item.user.avatarUrl" alt=""></div>
          </div>
          <div class="comment-body">
            <div class="comment-body-title">
              <p>{{item.user.nickname}} <br/><span>2017年7月7日</span></p>
              <p>{{item.likedCount}} <i class="iconfont icon-dianzan"></i></p>
            </div>
            <div class="comment-body-content">
              <p>{{item.content}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="recent-comments" v-show="!showLoading">
      <div class="comment-title">
        最新评论
      </div>
      <ul class="comment-content">
        <li v-for="(item,index) in comments">
          <div class="comment-avatar">
            <div><img :src="item.user.avatarUrl" alt=""></div>
          </div>
          <div class="comment-body">
            <div class="comment-body-title">
              <p>{{item.user.nickname}} <br/><span>2017年7月7日</span></p>
              <p>{{item.likedCount}} <i class="iconfont icon-dianzan"></i></p>
            </div>
            <div class="comment-body-content">
              <p>{{item.content}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="comment-loading" v-show="showLoading">
      <md-spinner :md-size="40" md-indeterminate></md-spinner>
    </div>
     <div class="comment-b-loading" v-show="bottomLoading">
       <md-spinner :md-size="30" md-indeterminate></md-spinner>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'
  import url from '../assets/js/api'

  export default {
    data() {
      return {
        hotComments: [],
        comments: [],
        showLoading: false,
        bottomLoading: false,
        offset: 1
      }
    },
    computed: {
      ...mapState([
        'commentId', 'showComment', 'curPlayMusic'
      ])
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
      fetHotComment(id) {
        axios.get(`${url}/comment/music?id=${id}&limit=0`).then(res => {
          this.hotComments = res.data.hotComments
          this.showLoading = false
        })
      },
      fetComment(id, offset) {
        axios.get(`${url}/comment/music?id=${id}&limit=20&offset=${offset}`).then(res => {
          this.comments = res.data.comments
        })
      },
      changeId() {
        this.$store.dispatch('commentId', 23212)
      },
      hideComment() {
        this.$store.state.showComment = false
      }
    },
    filters: {},
    watch: {
      commentId(val, old) {
        this.$store.state.showComment = true
        this.showLoading = true
        this.fetHotComment(val)
        this.fetComment(val,1)
      },
      offset(val, old) {
        this.fetComment(commentId, val)
      },
      showComment(val, old) {
        if (val) {
          const ele = this.$refs.comment
          ele.addEventListener('scroll', () => {
            const scrollTop = ele.scrollTop
            const clientHeight = ele.clientHeight
            const scrollHeight = ele.scrollHeight
            if (scrollTop + clientHeight >= scrollHeight - 1) {
              this.bottomLoading = true
              console.log('到底')
              /*this.offset++*/
            }
            console.log('scroll')
          })
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../assets/css/base';

  .comment {
    position: static;
    left: 0;
    bottom: -2000px;
    right: 0;
    background-color: #fff;
    z-index: 1004;
    overflow-y: auto;
    &.show {
      position: fixed;
      top: 0;
      bottom: 0;
    }
    .md-toolbar {
      position: static;
      left: 0;
      top: 0;
      right: 0;
      &.show {
        position: fixed;
      }
    }
    .music-info {
      margin-top: pr(48);
      display: flex;
      align-items: center;
      height: pr(81);
      padding: 0 pr(8);
      .music-pic {
        @include wh(pr(65));
        img {
        }
      }
      .music-name {
        flex: 1;
        margin-left: pr(10);
        p {
          &:nth-child(2) {
            margin-top: pr(6);
            font-size: pr(12);
            color: #626262;
          }
        }
      }
    }
    .comment-title {
      display: flex;
      align-items: center;
      height: pr(24);
      padding-left: pr(10);
      color: #626262;
      font-size: pr(12);
      background-color: #f0f0f0;
    }
    .comment-content {
      li {
        display: flex;
        padding-top: pr(10);
      }
      .comment-avatar {
        display: flex;
        justify-content: center;
        width: pr(46);
        div {
          @include wh(pr(28));
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .comment-body {
        flex: 1;
        .comment-body-title {
          display: flex;
          justify-content: space-between;
          padding-right: pr(10);
          p {
            &:nth-of-type(1) {
              color: #616262;
              font-size: pr(12);
              line-height: 1.3;
              span {
                color: #acacac;
                font-size: pr(10);
              }
            }
            &:nth-of-type(2) {
              margin-top: pr(3);
              color: #616261;
              font-size: pr(12);
            }
          }
        }
        .comment-body-content {
          padding: pr(10);
          padding-left: 0;
          border-bottom: 1px solid #e0e0e0;
          p {
            font-size: pr(14);
            line-height: 1.5;
            color: #333;
          }
        }
      }
    }
    .comment-loading {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-40%, -50%);
    }
    .comment-b-loading {
      display: flex;
      height:pr(40);
      justify-content: center;
    }
  }
</style>
