<template>
  <h3 class="list-title">{{title}} <i class="iconfont icon-jiantou"></i></h3>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['title']
  }
</script>

<style lang="scss" type="text/scss">
  @import '../assets/css/base';

  .list-title {
    margin:pr(13) 0;
    border-left:pr(3) solid $baseColor;
    text-indent: pr(10);
    font-size:pr(14);
    .iconfont {
      position: relative;
      top:pr(-1);
      height:100%;
      font-size:pr(12);
    }
  }
</style>
