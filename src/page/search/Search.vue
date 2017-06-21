<template>
  <div id="search">
    <md-toolbar class="md-dense search">
      <md-button class="md-icon-button">
        <md-icon>arrow_back</md-icon>
      </md-button>
      <input type="text" placeholder="搜索音乐、歌手、歌词、用户">
    </md-toolbar>
    <div class="hot-search" style="display: none;">
      <p>热门搜索</p>
      <ul class="hot-search-list">
        <li>我想和你唱</li>
        <li>异形</li>
        <li>我想唱</li>
        <li>异形</li>
        <li>我想和你</li>
        <li>异形</li>
        <li>我想唱</li>
        <li>异形</li>
      </ul>
    </div>
    <md-button-toggle md-single class="search-button-toggle">
      <md-button class="md-toggle" @click.native="searchTab('song')">单曲</md-button>
      <md-button @click.native="searchTab('artist')">歌手</md-button>
      <md-button @click.native="searchTab('album')">专辑</md-button>
      <md-button @click.native="searchTab('list')">歌单</md-button>
    </md-button-toggle>
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="search-child-view"></router-view>
      </keep-alive>
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
      searchTab(tab) {
        this.$router.push({path: `/search/${tab}`})
      }
    },
    filters: {},
    watch: {
      $route(to, from) {
        const arr = ['song', 'artist', 'album', 'list']
        const toIndex = arr.indexOf(to.path.split('/').pop())
        const fromIndex = arr.indexOf(from.path.split('/').pop())
        this.transitionName = toIndex < fromIndex ? 'search-slide-right' : 'search-slide-left'
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../../assets/css/base';

  #search {
    .md-toolbar {
      input {
        flex: 1;
        margin-right: pr(25);
        height: pr(30);
        background-color: transparent;
        border: none;
        padding-bottom: 0;
        border-bottom: 1px solid #fff;
        color: #fff;
        &::-webkit-input-placeholder {
          color: #e07770;
        }
        &:focus {
          outline: none;
        }
      }
    }
    .hot-search {
      padding: pr(20) pr(10);
      p {
        font-size: pr(12);
        color: #666;
        margin-bottom: pr(11);
      }
      .hot-search-list {
        display: flex;
        flex-wrap: wrap;
        li {
          padding: pr(7) pr(11);
          margin: pr(0) pr(8) pr(8) 0;
          border: 1px solid #dcdcdc;
          border-radius: pr(25);
          font-size: pr(14);
        }
      }
    }
    .md-button-toggle.search-button-toggle {
      display: flex;
      .md-button {
        flex: 1;
        font-size: pr(13);
        border-bottom: 3px solid #fff;
        background-color: #fff;
      }
      .md-toggle {
        color: $baseColor;
        background-color: #fff !important;
        border-bottom: 3px solid $baseColor;
      }
    }

    .search-child-view {
      position: absolute;
      top: pr(86.4);
      left: 0;
      width: 100%;
      transition: all .3s cubic-bezier(.55,0,.1,1);
      background-color: #fff;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .search-slide-left-enter, .search-slide-right-leave-active {
      opacity: 0;
      -webkit-transform: translate(7.5rem, 0);
      transform: translate(7.5rem, 0);
      transition-delay: .3s;
      -webkit-transition-delay: .3s;
    }
    .search-slide-left-leave-active, .search-slide-right-enter {
      opacity: 0;
      -webkit-transform: translate(-7.5rem, 0);
      transform: translate(-7.5rem, 0);
      transition-delay: .3s;
      -webkit-transition-delay: .3s;
    }
    .search-slide-enter-active {
      -webkit-transition: all .3s ease;
      transition: all .3s ease;
    }
    .search-slide-leave-active {
      -webkit-transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
  }
</style>
