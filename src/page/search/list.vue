<template>
  <ul id="search-list">
    <li class="search-album-item"
        v-for="(item,index) in list"
        @click="toSongListDetail(item.id, item)">
      <div class="s-album-avatar">
        <img :src="item.coverImgUrl" alt="">
      </div>
      <div class="s-album-name">
        <p>{{item.name}}</p>
        <p>{{item.trackCount}}首 by {{item.creator.nickname}} 播放 {{item.playCount | playCount}}次</p>
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
        list:[]
      }
    },
    props: {
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
        this.getList(this.searchKey)
      })
    },
    methods: {
      //获取歌单信息
      getList(key) {
        axios.get(`${url}/search?keywords=${key}&type=1000`).then(res => {
          this.list = res.data.result.playlists
        })
      },
      //跳转到歌单详情页
      toSongListDetail(id, obj) {
        this.$router.push({path: '/playlistdetail/' + id})
        this.$store.dispatch('curPlaylistDetail',obj)
      }
    },
    filters: {
      playCount(value) {
        if (value < 100000) {
            return value
        } else {
          return (value / 10000).toFixed(1)  + '万'
        }
      }
    },
    watch: {
      searchKey(val, old) {
        this.getList(val)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../../assets/css/base';

</style>
