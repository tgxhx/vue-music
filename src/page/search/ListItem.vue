<template>
  <li class="search-album-item">
    <div class="s-album-avatar">
      <img :src="item.picUrl" alt="">
    </div>
    <div class="s-album-avatar-bg">
      <img src="../../assets/images/search-artist-bg.png" alt="">
    </div>
    <div class="s-album-name">
      <p>{{item.name}}</p>
      <p>{{item.name || null}}</p>
    </div>
  </li>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {}
    },
    props: {
      item: {
        type: Object,
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

    },
    filters: {},
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
        overflow: hidden;
        padding-left: pr(10);
        p {
          @include ell;
          line-height:1.2;
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
