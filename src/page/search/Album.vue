<template>
  <ul id="search-albums">
    <li class="search-album-item" v-for="(item,index) in albums">
      <div class="s-album-avatar">
        <img :src="item.picUrl" alt="">
      </div>
      <div class="s-album-avatar-bg">
        <img src="../../assets/images/search-artist-bg.png" alt="">
      </div>
      <div class="s-album-name">
        <p>{{item.artist.name}}</p>
        <p>{{item.name}}</p>
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
        albums: []
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

      })
    },
    methods: {
      getAlbum(key) {
        axios.get(`${url}/search?keywords=${key}&type=10`).then(res => {
          this.albums = res.data.result.albums
        })
      }
    },
    filters: {},
    watch: {
      searchKey(val, old) {
        this.getAlbum(val)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../../assets/css/base';

  .search-album-item {
    display: flex;
    align-items: center;
    padding: pr(3) pr(6);
    border-bottom: 1px solid #e0e0e0;
    .s-album-avatar {
      @include ava(pr(50))
    }
    .s-album-avatar-bg {
      height: pr(46);
      img {
        height: 100%;
      }
    }
    .s-album-name {
      flex: 1;
      padding-left: pr(10);
      p {
        &:first-of-type {
          font-size: pr(14);
        }
        &:nth-of-type(2) {
          margin-top: pr(8);
          font-size: pr(10);
          color: #666;
        }
      }
    }
  }
</style>
