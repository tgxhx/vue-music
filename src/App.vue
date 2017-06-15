<template>
  <div id="app">
    <router-view></router-view>
    <player></player>
    <audio-nav></audio-nav>
    <play-list></play-list>
    <cover></cover>
  </div>
</template>

<script type="text/ecmascript-6">
  import AudioNav from './components/AudiioNav'
  import Player from './components/Player'
  import PlayList from './components/PlayList.vue'
  import Cover from './components/Cover.vue'

  export default {
    data() {
      return {}
    },
    components: {
      AudioNav,Player,PlayList,Cover
    }
  }
</script>

<style>
  #app {

  }
</style>
