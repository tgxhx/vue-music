<template>
  <ul id="search-albums">
    <list-item :item="album" v-for="(album,index) in albums" :key="index"></list-item>
  </ul>
</template>

<script type="text/ecmascript-6"  >
  import axios from 'axios'
  import {mapState} from 'vuex'
  import url from '../../assets/js/api'
  import ListItem from './ListItem'

  export default {
    data() {
      return {
        word: '',
        albums: []
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
        this.getAlbum(this.searchKey)
      })
    },
    methods: {
      //专辑组件
      getAlbum(key) {
        axios.get(`${url}/search?keywords=${key}&type=10`).then(res => {
          this.albums = res.data.result.albums
        })
      }
    },
    filters: {},
    components: {ListItem},
    watch: {
      searchKey(val, old) {
        this.getAlbum(val)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import '../../assets/css/base';

</style>
