<template>
  <div id="app">
    <router-view></router-view>
    <audio-nav></audio-nav>
  </div>
</template>

<script type="text/ecmascript-6">
  import AudioNav from './components/AudiioNav'

  export default {
    data() {
      return {}
    },
    components: {
      AudioNav
    }
  }
</script>

<style>
  #app {

  }
</style>
