<template>
    <div>
      <md-toolbar class="md-dense">
        <md-button class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>
        <h2 class="md-title" style="flex: 1"></h2>
        <md-button class="md-icon-button">
          <md-icon @click.native="toHome">search</md-icon>
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
    @import '../assets/css/common';

</style>
