<template>
  <div>
    <shop-header></shop-header>
    <div class="tabs">
      <router-link :to="{path:'/shop/goods',query:{id:this.$route.query.id}}" tag="div" class="tab-item" replace>点餐
      </router-link>
      <router-link :to="{path:'/shop/info',query:{id:this.$route.query.id}}" tag="div" class="tab-item" replace>评价
      </router-link>
      <router-link :to="{path:'/shop/ratings',query:{id:this.$route.query.id}}" tag="div" class="tab-item" replace>商家
      </router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>7
<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'
export default {
  components: {
    ShopHeader
  },
  mounted () {
    this.$store.dispatch('getShopInfo')
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.tabs
  width 100%
  height 40px
  display flex
  align-items center
  background-color #fff
  .tab-item
    flex 1
    text-align center
    height 40px
    line-height 40px
    font-size 14px
    position relative
    &.router-link-active
      color $green
      &::after
        content ''
        position absolute
        left 50%
        bottom 1px
        width 35px
        height 2px
        transform translateX(-50%)
        background-color $green
</style>
