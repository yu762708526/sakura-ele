<template>
  <div id="app">
    <router-view></router-view>
    <footer-guide v-show="$route.meta.ShowFooter"></footer-guide>
  </div>
</template>
<script>
import FooterGuide from '../src/components/FooterGuide/FooterGuide'
import { mapActions } from 'vuex'
export default {
  components: {
    FooterGuide
  },
  mounted () {
    this.getAddress()
    this.$store.dispatch('updataUserInfo') // 刷新自动登陆账户
  },
  methods: {
    // 从actions中获取接口数据传入mutations再传入state中
    ...mapActions(['getAddress'])
  }

}
</script>
<style lang="stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
