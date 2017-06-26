<template>
  <div>
    {{word}}
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        word: ''
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
      getArtist(key) {
        this.word = key + 'artist'
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

</style>
