<template>
  <div class="order">
    <header-top title="订单列表"></header-top>
    <section class="order_no_login">
      <div class="imgHeight">
        <img class="imgLogo" src="./images/person.png">

      </div>
      <h3>登录后查看外卖订单</h3>
      <button>立即登陆</button>
    </section>
  </div>
</template>
<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
export default {
  components: {
    HeaderTop
  }
}
</script>
<style lang="stylus" scoped>
.order // 订单
  width 100%
  height 100%
  .order_no_login
    padding-top 140px
    height 0
    width 60%
    margin 0 auto
    text-align center
    // left 50%
    // transform translateX(-50%)
    .imgHeight
      padding-bottom 100%
      height 0
      .imgLogo
        display block
        width 100%
    >h3
      padding 10px 0
      font-size 17px
      color #6a6a6a
    >button
      display inline-block
      background #02a774
      font-size 14px
      color #fff
      border 0
      outline none
      border-radius 5px
      padding 10px 20px
</style>
