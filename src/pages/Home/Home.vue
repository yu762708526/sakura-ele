<template>
  <div class="msite">
    <!--首页头部-->
    <header-top :title="address.name">
      <router-link to="/search" class="header_search" slot="left">
        <i class="iconfont searchIcon">&#xe6d1;</i>
      </router-link>

      <router-link :to="userinfo._id?'/userinfo':'/personal'" class="header_login" slot="right">
        <span class="header_login_text" v-if="!userinfo._id">登录|注册</span>
        <span class="iconfont userIcon" v-else>&#xe652;</span>
      </router-link>
    </header-top>
    <!--首页导航-->
    <div ref="bscrollDiv" class="divHeight">
      <div class="bscrollClass">
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <swiper ref="mySwiper" :options="swiperOptions" v-if="showSwiper">
                <swiper-slide v-for="(items, index) in Twofoodstype" :key="index">
                  <div class="swiper-slide">
                    <a href="javascript:" class="link_to_food" v-for="(item, index) in items" :key="index">
                      <div class="food_container">
                        <img :src="baseUrl+item.image_url">
                      </div>
                      <span>{{item.title}}</span>
                    </a>
                  </div>
                </swiper-slide>

                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
              <img class="lazyImg" src="./images/msite_back.svg" alt="" v-else>
            </div>
          </div>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont iconList">&#xe670;</i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <shop-list></shop-list>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import Bscroll from 'better-scroll'
import { mapState } from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'
export default {
  components: {
    HeaderTop,
    ShopList
  },
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true
      },
      baseUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.bscrollDiv, {
      click: true
    })
    this.$store.dispatch('getFoodsType')
    this.$store.dispatch('getShopList')
  },
  computed: {
    showSwiper () {
      return this.Twofoodstype.length // 解决轮播图的bug
    },
    // 生成二维数组
    Twofoodstype () {
      const { foodstype } = this
      const arr = []
      let minarr = []
      foodstype.forEach((item, index) => {
        if (minarr.length === 0) {
          arr.push(minarr)
        }
        minarr.push(item)
        if (minarr.length === 8) {
          minarr = []
        }
      })
      return arr
    },
    ...mapState(['address', 'foodstype', 'userinfo']) // 传入地址信息
    // 传入商品分类信息

  }
}
</script>
<style lang="stylus" scoped>
@import '~@/common/styles/mixins.styl'
.msite // 首页
  width 100%
  .divHeight
    position fixed
    top 45px
    bottom 46px
    width 100%
    .bscrollClass
      .msite_nav
        bottom-border-0 1px #e4e4e4
        height 200px
        background #fff
        .swiper-container
          width 100%
          height 100%
          .swiper-wrapper
            width 100%
            height 100%
            .lazyImg
              height 100%
              width 100%
            .swiper-slide
              display flex
              justify-content center
              align-items flex-start
              flex-wrap wrap
              .link_to_food
                width 25%
                .food_container
                  display block
                  width 100%
                  text-align center
                  padding-bottom 10px
                  font-size 0
                  img
                    display inline-block
                    width 50px
                    height 50px
                span
                  display block
                  width 100%
                  text-align center
                  font-size 13px
                  color #666
      .msite_shop_list
        top-border-0 0.0625rem #e4e4e4
        margin-top 0.625rem
        background #fff
        .shop_header
          padding 0.625rem 0.625rem 0
          .iconList
            margin-left 0.3125rem
            color #999
            margin-right 0.3125rem
            vertical-align middle
            height 1.25rem
            line-height 1.25rem
          .shop_header_title
            color #999
            font-size 0.875rem
            line-height 1.25rem
            height 1.25rem
            line-height 1.25rem
            vertical-align middle
</style>
