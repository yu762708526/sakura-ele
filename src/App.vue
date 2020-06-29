<template>
  <div id="app">
    <router-view></router-view>
    <footer-guide v-show="$route.meta.ShowFooter"></footer-guide>
  </div>
</template>
<script>
import FooterGuide from '../src/components/FooterGuide/FooterGuide'
export default {
  components: {
    FooterGuide
  },
  mounted () {

  },
  methods: {
  }
}
</script>
<style lang="stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
