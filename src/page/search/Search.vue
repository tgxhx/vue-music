<template>
  <div id="search">
    <md-toolbar class="md-dense search">
      <md-button class="md-icon-button">
        <md-icon @click.native="back">arrow_back</md-icon>
      </md-button>
      <input type="text"
             placeholder="搜索音乐、歌手、歌词、用户"
             @keydown="searchData"
             @focus="showSuggest = searchKey !== '' ? true: false"
             v-model="searchKey">
      <i class="iconfont icon-search" @click="toChild"></i>
    </md-toolbar>
    <div class="hot-search" :style="{height:windowHeight + 'px'}">
      <p>热门搜索</p>
      <ul class="hot-search-list">
        <li v-for="(item,index) in hotSearch" @click="searchHotKey(item)">{{item}}</li>
      </ul>
    </div>
    <md-button-toggle md-single class="search-button-toggle" v-if="showSearchType">
      <md-button class="md-toggle" @click.native="searchTab('song')">单曲</md-button>
      <md-button @click.native="searchTab('artist')">歌手</md-button>
      <md-button @click.native="searchTab('album')">专辑</md-button>
      <md-button @click.native="searchTab('list')">歌单</md-button>
    </md-button-toggle>
    <div class="search-suggest" v-show="showSuggest">
      <div class="search-key" @click="toChild">搜索“{{searchKey}}”</div>
      <ul v-if="suggestSongs.length !== 0">
        <li v-for="(item,index) in suggestSongs"
            @click="playMusicFromSearch(item.id)"><i
          class="iconfont icon-sousuo"></i>{{item.name}} - {{item.artists[0].name}}
        </li>
      </ul>
    </div>
    <transition :name="transitionName">
      <keep-alive>
        <router-view
          class="search-child-view"
          :search-key="searchKeyProps"
        ></router-view>
        <!--通过props传递搜索词给搜索结果组件-->
      </keep-alive>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'
  import url from '../../assets/js/api'

  export default {
    data() {
      return {
        transitionName: '',
        showSuggest: false,
        searchKey: '',
        searchKeyProps: '',
        suggestSongs: [],
        searching: false,
        showSearchType: false,
        hotSearch: ['跨界歌王', '老大', '暧昧', '告白气球', '演员', '薛之谦', '因你', '张碧晨', '杨宗纬', '凉凉'],
        windowHeight: 0
      }
    },
    computed: {
      ...mapState([])
    },
    mounted() {
      this.$nextTick(() => {
        this.windowHeight = document.documentElement.clientHeight
      })
    },
    methods: {
      searchTab(tab) {
        this.$router.replace({path: `/search/${tab}`})
      },
      //按键的时候搜索显示推荐内容
      searchData(e) {
        if (e.keyCode === 13) {
          this.toChild()
        } else {
          axios.get(`${url}/search/suggest?keywords=${this.searchKey}`).then(res => {
            this.showSuggest = true
            if (res.data.code === 200) {
              this.suggestSongs = res.data.result.songs
            } else if (res.data.code === 400) {
              this.suggestSongs = []
              this.showSuggest = false
            }
          })
        }
      },
      //下拉搜索推荐点击播放
      playMusicFromSearch(id) {
        function getUrl() {
          return axios.get(`${url}/music/url?id=${id}`)
        }

        function getDetail() {
          return axios.get(`${url}/song/detail?ids=${id}`)
        }

        function getLyric() {
          return axios.get(`${url}/lyric?id=${id}`)
        }

        axios.all([getUrl(), getDetail(), getLyric()])
          .then(axios.spread((res1, res2, res3) => {
            const arr = [res1, res2, res3]
            this.$store.dispatch('curPlayMusic', arr)
            this.$store.state.showPlayer = true
          }))
      },
      //跳转到歌曲搜索结果页，由于通过props传递了搜索词，song组件会加载时就获取信息
      toChild() {
        this.$router.push({path: '/search/song'})
        this.searchKeyProps = this.searchKey
        this.showSuggest = false
        this.showSearchType = true
      },
      //点击伪热搜词也会跳转到结果页
      searchHotKey(key) {
        this.searchKey = key
        this.toChild()
      },
      back() {
        this.$router.go(-1)
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
    > ul {
      min-height:pr(400);
    }
    .md-toolbar {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      z-index: 1000;
      input {
        flex: 1;
        margin-right: pr(5);
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
      .iconfont {
        display: inline-block;
        font-size: pr(20)
      }
    }
    .hot-search {
      box-sizing: border-box;
      padding: pr(100) pr(10);
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
      position: fixed;
      top: pr(48);
      left: 0;
      right: 0;
      display: flex;
      z-index: 1000;
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

    .search-suggest {
      position: fixed;
      z-index: 1001;
      top: pr(48);
      left: pr(15);
      right: pr(33);
      background-color: #f3f3f3;
      box-shadow: 3px 3px 10px #ccc, -1px 3px 10px #ccc;
      transition: all .3s;
      .search-key {
        padding: pr(15) pr(13);
        color: #679dc5;
      }
      ul {
        li {
          padding: pr(15) pr(13);
          border-top: 1px solid #e5e5e5;
          color: #666;
          font-size: pr(14);
          @include ell;
          .iconfont {
            margin-right: pr(8);
          }
        }
      }
    }

    .search-child-view {
      position: absolute;
      top: pr(86.4);
      left: 0;
      width: 100%;
      transition: all .3s cubic-bezier(.55, 0, .1, 1);
      background-color: #f2f4f5;
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
