<template>
  <div id="app">
    <router-view></router-view>
    <player></player>
    <audio-nav></audio-nav>
  </div>
</template>

<script type="text/ecmascript-6">
  import AudioNav from './components/AudiioNav'
  import Player from './components/Player'

  export default {
    data() {
      return {}
    },
    components: {
      AudioNav,Player
    }
  }
</script>

<style>
  #app {

  }
</style>
