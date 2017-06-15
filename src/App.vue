<template>
  <div id="app">
    <router-view></router-view>
    <player></player>
    <audio-nav></audio-nav>
    <play-list></play-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import AudioNav from './components/AudiioNav'
  import Player from './components/Player'
  import PlayList from './components/PlayList.vue'

  export default {
    data() {
      return {}
    },
    components: {
      AudioNav,Player,PlayList
    }
  }
</script>

<style>
  #app {

  }
</style>
