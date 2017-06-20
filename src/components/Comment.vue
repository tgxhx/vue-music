<template>
    <div class="comment">
      <md-toolbar class="md-dense">
        <md-button class="md-icon-button">
          <md-icon >arrow_back</md-icon>
        </md-button>
        <h2 class="md-title" style="flex: 1" @click="changeId">评论</h2>
        <md-button class="md-icon-button">
        </md-button>
      </md-toolbar>
      <div class="music-info">
        <div class="music-pic">
          <img src="http://articles.csdn.net/uploads/allimg/121116/28_121116100507_1.jpg" alt="">
        </div>
        <div class="music-name">
          <p>手心的蔷薇</p>
          <p><span>林俊杰<span>/</span></span></p>
        </div>
      </div>
      <div class="wonderful-comments">
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
      <div class="recent-comments">
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
        comments: []
      }
    },
    computed: {
      ...mapState([
        'commentId'
      ])
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
      fetComment(id) {
        axios.get(`${url}/comment/music?id=186016&limit=20`).then(res => {
          this.hotComments = res.data.hotComments
          this.comments = res.data.comments
        })
      },
      changeId() {
        this.$store.dispatch('commentId',23212)
      }
    },
    filters: {},
    watch: {
      commentId(val,old) {
        this.fetComment()
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
    @import '../assets/css/base';

  .comment {
    position: fixed;
    top:0;
    left: 0;
    bottom: 0px;
    right: 0;
    background-color: #fff;
    z-index: 1004;
    overflow-y: auto;
    .md-toolbar {
      position: fixed;
      left:0;
      top:0;
      right:0;
    }
    .music-info {
      margin-top:pr(48);
      display: flex;
      align-items: center;
      height:pr(81);
      padding:0 pr(8);
      .music-pic {
        @include wh(pr(65));
        img {
        }
      }
      .music-name {
        flex:1;
        margin-left:pr(10);
        p {
          &:nth-child(2) {
            margin-top:pr(6);
            font-size:pr(12);
            color:#626262;
          }
        }
      }
    }
    .comment-title {
      display: flex;
      align-items: center;
      height:pr(24);
      padding-left:pr(10);
      color:#626262;
      font-size:pr(12);
      background-color: #f0f0f0;
    }
    .comment-content {
      li {
        display: flex;
        padding-top:pr(10);
      }
      .comment-avatar {
        display: flex;
        justify-content: center;
        width:pr(46);
        div {
          @include wh(pr(28));
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .comment-body {
        flex:1;
        .comment-body-title {
          display: flex;
          justify-content:space-between;
          padding-right:pr(10);
          p {
            &:nth-of-type(1) {
              color:#616262;
              font-size:pr(12);
              line-height:1.3;
              span {
                color:#acacac;
                font-size:pr(10);
              }
            }
            &:nth-of-type(2) {
              margin-top:pr(3);
              color:#616261;
              font-size:pr(12);
            }
          }
        }
        .comment-body-content {
          padding:pr(10);
          padding-left:0;
          border-bottom:1px solid #e0e0e0;
          p {
            font-size:pr(14);
            line-height:1.5;
            color:#333;
          }
        }
      }
    }
  }
</style>
