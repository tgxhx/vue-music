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
        this.getList(this.searchKey)
      })
    },
    methods: {
      getList(key) {
        this.word = key + 'list'
      }
    },
    filters: {},
    watch: {
      searchKey(val, old) {
        this.getList(val)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../../assets/css/base';

</style>
