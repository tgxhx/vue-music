<template>
  <div class="root">
    <md-toolbar class="md-dense root">
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1"></h2>
      <md-button class="md-icon-button">
        <router-link to="/search">
          <md-icon>search</md-icon>
        </router-link>
      </md-button>
    </md-toolbar>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState([])
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
      toHome() {
        this.$router.push({path: '/root/home'})
      }
    },
    filters: {},
  }
</script>

<style lang="scss" type="text/scss">
  @import '../assets/css/base';

  .md-toolbar.root {
    position: fixed;
    top:0;
    left:0;
    right:0;
    z-index:1000;
    a {
      color:rgba(255,255,255,.87) !important;
    }
  }
</style>
