<template>
  <ul id="search-artist"
      @touchstart="touchStart"
      @touchmove="touchMove">
    <li class="search-artist-item" v-for="(item,index) in artists">
      <div class="s-artist-avatar">
        <img :src="item.picUrl" alt="">
      </div>
      <div class="s-artist-name">
        {{item.name}}<span v-if="item.alias.length > 0">（{{item.alias[0]}}）</span>
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
        artists: []
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
        this.getArtist(this.searchKey)
      })
    },
    methods: {
      //艺术家信息
      getArtist(key) {
        axios.get(`${url}/search?keywords=${key}&type=100`).then(res => {
          this.artists = res.data.result.artists
        })
      }
    },
    filters: {},
    watch: {
      searchKey(val, old) {
        this.getArtist(val)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../../assets/css/base';

  .search-artist-item {
    display: flex;
    align-items: center;
    padding: pr(3) pr(6);
    border-bottom: 1px solid #e0e0e0;
    .s-artist-avatar {
      @include ava(pr(50))
    }
    .s-artist-name {
      flex: 1;
      padding-left: pr(10);
      font-size: pr(14);
      span {
        color: #888;
      }
    }
  }

</style>
