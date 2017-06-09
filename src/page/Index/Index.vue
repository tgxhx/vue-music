<template>
  <div class="index">
    <!--<ul class="index-tab">
      <li>
        <router-link to="/root/index/recommend"><md-button>Default</md-button></router-link>
      </li>
      <li>
        <router-link to="/root/index/songlist">歌单</router-link>
      </li>
      <li>
        <router-link to="/root/index/radio">主播电台</router-link>
      </li>
      <li>
        <router-link to="/root/index/top">排行榜</router-link>
      </li>
    </ul>-->
    <md-button-toggle md-single>
      <md-button @click.native="indexTab('recommend')">个性推荐</md-button>
      <md-button class="md-toggle" @click.native="indexTab('songlist')">歌单</md-button>
      <md-button @click.native="indexTab('radio')">主播电台</md-button>
      <md-button @click.native="indexTab('top')">排行榜</md-button>
    </md-button-toggle>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        transitionName: ''
      }
    },
    computed: {
      ...mapState([])
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
//      切换顶部标签
      indexTab(tab) {
        this.$router.push({path: `/root/index/${tab}`})
      }
    },
    filters: {},
    watch: {
      $route(to, from) {
//        获取path的最后路由，比较在arr中的索引位置，
        const arr = ['recommend','songlist','radio','top']
        const toIndex = arr.indexOf(to.path.split('/').pop())
        const fromIndex = arr.indexOf(from.path.split('/').pop())
        this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
        console.log(this.transitionName)
//      取到路由的最后
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../../assets/css/common';

  .index-tab {
    display: flex;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0 !important;
      height: pr(35);
      flex: 1;
      a:not(.md-button) {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: pr(14);
        color: #666;
        border-bottom: 2px solid #fff;
        &:hover {
          color: $baseColor;
          text-decoration: none;
          border-bottom-color: $baseColor;
        }
      }
    }
  }

  .md-theme-default.md-button-toggle {
    display: flex;
    .md-button {
      flex: 1;
      border-bottom: 2px solid #fff;
    }
    .md-toggle {
      color: $baseColor;
      background-color: #fff !important;
      border-bottom: 2px solid $baseColor;
    }
  }

  /* 上面是为了保证滑动的时候不出现抖动情况 */
  .child-view {
    position: absolute;
    left:0;
    top: pr(100);
    height: 100%;
    width: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
    background-color: #f2f2f2;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  /* 当child-view的内容过多时会撑开child-view使得内部能够滚动 */
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(7.5rem, 0);
    transform: translate(7.5rem, 0);
    transition-delay: .5s;
    -webkit-transition-delay: .5s;
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-7.5rem, 0);
    transform: translate(-7.5rem, 0);
    transition-delay: .5s;
    -webkit-transition-delay: .5s;
  }
  .slide-enter-active {
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
  }
  .slide-leave-active {
    -webkit-transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

</style>
