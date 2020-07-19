<template>
  <div class="footer_guide">
    <router-link to="/home" tag="div" class="guide_item" :class="{on:'/home' === $route.path}" replace="">
      <span class="item_icon">
        <span class="iconfont">&#xe61f;</span>
      </span>
      <span>外卖</span>
    </router-link>
    <router-link to="/search" tag="div" class="guide_item" :class="{on:'/search' === $route.path}" replace>
      <span class="item_icon">
        <span class="iconfont">&#xe783;</span>
      </span>
      <span>搜索</span>
    </router-link>
    <router-link to="/order" tag="div" class="guide_item" :class="{on:'/order' === $route.path}" replace>
      <span class="item_icon">
        <span class="iconfont">&#xe611;</span>
      </span>
      <span>订单</span>
    </router-link>
    <router-link to="/personal" tag="div" class="guide_item" :class="{on:'/personal' === $route.path}" replace>
      <span class="item_icon">
        <span class="iconfont">&#xe60f;</span>
      </span>
      <span>我的</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'footerGuide',
  methods: {
    // goTo (path) {
    //   this.$router.replace(path)
    // }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/common/styles/mixins.styl'
.footer_guide // footer
  top-border-1px(#e4e4e4)
  position fixed
  z-index 100
  left 0
  right 0
  bottom 0
  background-color #fff
  width 100%
  height 50px
  display flex
  .guide_item
    display flex
    flex 1
    text-align center
    flex-direction column
    align-items center
    margin 5px
    color #999999
    &.on
      color #02a774
    span
      font-size 12px
      margin-top 2px
      margin-bottom 2px
      .iconfont
        font-size 22px
</style>
