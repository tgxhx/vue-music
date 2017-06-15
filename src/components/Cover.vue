<template>
  <div class="bg-cover" :class="{hide:!showCover}" @touchmove.prevent @click="hideCover">

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
      ...mapState([
        'showCover'
      ])
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
      hideCover() {
        this.$store.dispatch('showPlayList', false)
      }
    },
    filters: {},
  }
</script>

<style lang="scss" type="text/scss">
  @import '../assets/css/base';

  .bg-cover {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 1;
    z-index:1002;
    background-color: rgba(0, 0, 0, .5);
    transition: all .5s;
    &.hide {
      position: static;
      opacity: 0;
    }
  }
</style>
