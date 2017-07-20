<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,index) in banners" :key="index">
        <img :src="item.pic" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="today-recommend">
      <div class="recommend-item animated pulse">
        <div class="circle-b">
          <div class="circle-t">
            <i class="iconfont icon-501"></i>
          </div>
        </div>
        <div class="item-name">私人FM</div>
      </div>
      <div class="recommend-item animated pulse">
        <div class="circle-b">
          <i class="iconfont icon-rili"></i>
        </div>
        <div class="item-name">每日歌曲推荐</div>
      </div>
      <div class="recommend-item animated pulse">
        <div class="circle-b">
          <div class="circle-t">
            <i class="iconfont icon-paixing"></i>
          </div>
        </div>
        <div class="item-name">云音乐热歌榜</div>
      </div>
    </div>
    <div class="reco-list">
      <list-title :title="'推荐歌单'"></list-title>
      <ul class="recl-list3">
        <li class="reco-list-item3" v-for="(item,index) in recommendList" @click="toSongListDetail(item.id, item)">
          <div><img :src="item.picUrl" alt=""></div>
          <p>{{item.name }}</p>
        </li>
      </ul>
    </div>
    <div class="reco-list">
      <list-title :title="'独家放送'"></list-title>
      <ul class="recl-list2">
        <li class="reco-list-item2" v-for="(item,index) in dujiaList">
          <div>
            <img :src="item.sPicUrl" alt="" v-if="index < 2">
            <img :src="item.picUrl" alt="" v-else>
          </div>
          <p>{{item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'
  import url from '../../assets/js/api'
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
        banners: [],
        recommendList: [],
        dujiaList: []
      }
    },
    computed: {
      ...mapState([
        'url'
      ])
    },
    created() {
      this.fetchBanner()
      this.fetchRecommendList()
      this.fetchDujia()
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
      //获取banner图
      fetchBanner() {
        axios.get(`${url}/banner`).then(res => {
          this.banners = res.data.banners
        })
      },
      //获取推荐歌单
      fetchRecommendList() {
        axios.get(`${url}/personalized`).then(res => {
          this.recommendList = res.data.result
        })
      },
      //独家放送
      fetchDujia() {
        axios.get(`${url}/personalized/privatecontent`).then(res => {
          this.dujiaList = res.data.result
          this.dujiaList = this.dujiaList.reverse()
        })
      },
      //点击获取歌单详情
      toSongListDetail(id, obj) {
        this.$router.push({path: '/playlistdetail/' + id})
        this.$store.dispatch('curPlaylistDetail',obj)
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
    height: pr(146);
    .swiper-slide {
      img {
        @include wh(100%);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .swiper-pagination-bullet {
      background-color: #fff;
      opacity: .5;
    }
    .swiper-pagination-bullet-active {
      background: $baseColor;
      opacity: 1;
    }
  }

  .today-recommend {
    display: flex;
    align-items: center;
    height: pr(93);
    border-bottom: 1px solid #eee;

    .recommend-item {
      @include dfcc;
      flex-direction: column;
      flex: 1;
      .circle-b {
        @include dfcc;
        @include wh(pr(95/2));
        border-radius: 50%;
        border: 1px solid $baseColor;
        .iconfont {
          font-size: pr(24);
          color: $baseColor;
        }
      }
    }
    .item-name {
      margin-top: pr(8);
      font-size: pr(12);
    }
  }

  .reco-list {
    .recl-list3 {
      display: flex;
      flex-wrap: wrap;
      .reco-list-item3 {
        width: pr(248/2);
        margin-bottom: pr(10);
        margin-right: pr(1);
        &:nth-child(3n) {
          margin-right: 0;
        }
        div {
          height: pr(248/2);
          img {
            @include wh(100%)
          }
        }
        p {
          padding: pr(5);
          font-size: pr(12);
          line-height: 1.6;
          @include overhide(2)
        }
      }
    }
    .recl-list2 {
      display: flex;
      flex-wrap: wrap;
      .reco-list-item2 {
        width: pr(374/2);
        margin-bottom: pr(10);
        margin-right: pr(1);
        &:nth-child(2n) {
          margin-right: 0;
        }
        &:nth-child(3n) {
          width: 100%;
        }
        div {
          height: pr(248/2);
          img {
            @include wh(100%)
          }
        }
        p {
          padding: pr(5);
          font-size: pr(12);
          line-height: 1.6;
          @include overhide(2)
        }
      }
    }
  }
</style>
