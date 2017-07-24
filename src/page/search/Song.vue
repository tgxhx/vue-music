<template>
    <ul id="search-song">
      <li class="search-song-item" v-for="(item,index) in songs">
        <div class="search-song-info" @click="playMusicFromSearch(item.id)">
          <p class="search-song-name">{{item.name}}</p>
          <p class="search-song-artist"><span v-for="(v,i) in item.artists">{{v.name}}<span v-show="i !== item.artists.length - 1">/</span></span> - {{item.album.name}}</p>
        </div>
        <div class="search-song-btn">
          <i class="iconfont icon-more1170511easyiconnet"></i>
        </div>
      </li>
    </ul>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'
  import url from '../../assets/js/api'

  export default {
    data() {
      return {
        word: '',
        songs: []
      }
    },
    props:{
      searchKey: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapState([])
    },
    mounted() {
      this.$nextTick(() => {
        this.getSong(this.searchKey)
      })
    },
    methods: {
      //点击播放
      getSong(key) {
        axios.get(`${url}/search?keywords=${key}`).then(res => {
          this.songs = res.data.result.songs
        })
      },
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
      }
    },
    filters: {
      //高亮搜索词
      lightWord(value) {
        console.log(this.searchKey)
        const length = this.searchKey.length
        const index = value.indexOf(this.searchKey)
        return value.substr(index, 2)
      }
    },
    watch: {
      searchKey(val, old) {
        this.word = val
        this.getSong(val)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
    @import '../../assets/css/base';

    #search-song {
      .search-song-item {
        display: flex;
        align-items: center;
        padding:pr(15) pr(7);
        border-bottom:1px solid #dee0e1;
        .search-song-info {
          flex:1;
        }
        .search-song-name {
          font-size:pr(14);
          @include ell;
        }
        .search-song-artist {
          margin-top:pr(10);
          font-size:pr(12);
          @include ell;
        }
        .iconfont {
          color:#888;
        }
      }
    }
</style>
