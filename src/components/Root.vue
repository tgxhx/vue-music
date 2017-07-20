<template>
  <div class="root">
    <md-toolbar class="md-dense root">
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">
        <i class="iconfont"
           :class="{
              'icon-yinyue': i === 0,
              'icon-wangyiyunyinlezizhi': i === 1,
              'icon-shejiao': i === 2,
              'active': i === cur
            }"
           @click="switchTab(i)"
           v-for="(n,i) in 3"></i>
      </h2>
      <md-button class="md-icon-button">
        <router-link to="/search">
          <md-icon>search</md-icon>
        </router-link>
      </md-button>
    </md-toolbar>
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="root-child-view"></router-view>
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
        cur: 1,
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
      //切换标签，当前高亮
      switchTab(index) {
        this.cur = index
        switch (index) {
          case 0:
            this.$router.push({path: '/root/home'})
            break
          case 1:
            this.$router.push({path: '/root/index'})
            break
        }
      }
    },
    filters: {},
    watch: {
      //路由切换动画
      $route(to,from) {
        const arr = ['home','index','social']
        const toIndex = arr.indexOf(to.path.split('/')[3])
        const fromIndex = arr.indexOf(from.path.split('/')[3])
        this.transitionName = toIndex < fromIndex ? 'root-slide-right':'root-slide-left'
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../assets/css/base';

  .md-toolbar.root {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    a {
      color: rgba(255, 255, 255, .87) !important;
    }
    .md-title {
      display: flex;
      justify-content: center;
      .iconfont {
        color: #e58983;
        &.active {
          color: #fff;
        }
        &:not(:last-of-type) {
          margin-right: pr(15);
        }
        &:nth-of-type(1) {
          font-size: pr(20);
        }
        &:nth-of-type(2) {
          font-size: pr(26);
        }
        &:nth-of-type(3) {
          font-size: pr(24);
        }
      }
    }
  }

  .root-child-view {
    transition: all .3s cubic-bezier(.55, 0, .1, 1);
    overflow: auto;
  }

  .root-slide-left-enter, .root-slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(7.5rem, 0);
    transform: translate(7.5rem, 0);
    transition-delay: .3s;
    -webkit-transition-delay: .3s;
  }

  .root-slide-left-leave-active, .root-slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-7.5rem, 0);
    transform: translate(-7.5rem, 0);
    transition-delay: .3s;
    -webkit-transition-delay: .3s;
  }
  .root-slide-enter-active {
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
  }
  .root-slide-leave-active {
    -webkit-transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
</style>
