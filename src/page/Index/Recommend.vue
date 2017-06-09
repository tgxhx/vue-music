<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,index) in banners" :key="index">
        <img :src="item.pic" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="today-recommend">
      <div class="recommend-item">
        <div class="circle-b">
          <div class="circle-t">
            <i class="iconfont icon-501"></i>
          </div>
        </div>
        <div class="item-name">私人FM</div>
      </div>
      <div class="recommend-item">
        <div class="circle-b">
            <i class="iconfont icon-rili"></i>
        </div>
        <div class="item-name">每日歌曲推荐</div>
      </div>
      <div class="recommend-item">
        <div class="circle-b">
          <div class="circle-t">
            <i class="iconfont icon-paixing"></i>
          </div>
        </div>
        <div class="item-name">云音乐热歌榜</div>
      </div>
    </div>
    <list-title :title="'推荐歌单'"></list-title>
    1111
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'
  import ListTitle from '@/components/ListTitle'


  export default {
    data() {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay: 3000,
          loop: true
        },
        banners: []
      }
    },
    computed: {
      ...mapState([
        'url'
      ])
    },
    mounted() {
      this.$nextTick(() => {
        this.fetchBanner()
      })
    },
    methods: {
      fetchBanner() {
        axios.get(`${this.url}/banner`).then(res => {
          this.banners = res.data.banners
        })
      }
    },
    filters: {},
    components: {
      ListTitle
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../../assets/css/base';

  .swiper-container {
    height:pr(146);
    .swiper-slide {
      img {
        @include wh(100%)
      }
    }
  }

  .today-recommend {
    display: flex;
    align-items: center;
    height:pr(93);
    border-bottom:1px solid #eee;
    .recommend-item {
      @include dfcc;
      flex-direction: column;
      flex:1;
      .circle-b {
        @include dfcc;
        @include wh(pr(95/2));
        border-radius: 50%;
        border:1px solid $baseColor;
        .iconfont {
          font-size:pr(24);
          color: $baseColor;
        }
      }
    }
    .item-name {
      margin-top:pr(8);
      font-size:pr(12);
    }
  }
  @include onepx('.today-recommend');

</style>
