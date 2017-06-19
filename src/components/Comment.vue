<template>
    <div class="comment">
      <md-toolbar class="md-dense">
        <md-button class="md-icon-button">
          <md-icon >arrow_back</md-icon>
        </md-button>
        <h2 class="md-title" style="flex: 1">评论</h2>
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
          <li>
            <div class="comment-avatar">
              <div><img src="http://articles.csdn.net/uploads/allimg/121116/28_121116100507_1.jpg" alt=""></div>
            </div>
            <div class="comment-body">

            </div>
          </li>
        </ul>
      </div>
      <div class="recent-comments">
        <div class="comment-title">
          最新评论
        </div>
        <ul class="comment-content">
          <li></li>
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
      ...mapState([])
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
      toHome() {
        this.$router.push({path: '/root/home'})
      }
    },
    filters: {},
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
    .music-info {
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
      background-color: #e7e9e9;
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
      }
    }
  }
</style>
