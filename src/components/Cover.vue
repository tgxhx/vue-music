<template>
    <div>

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
      this.$(() => {

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
    @import '../../assets/css/base';

</style>
