<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(item, index) in shopgoods" :key="index"
            :class="{current:index === currentIndex}" @click="toggleMenu(index)" ref="menuRef">
            <!-- :class="{current:index === currentIndex}" -->
            <span class="text">
              <img class="icon" :src="item.icon" v-if="item.icon">
              {{item.name}}
            </span>
          </li>
          <!-- <li class="menu-item">
            <span class="text bottom-border-1px">
              <img class="icon" src="https://fuss10.elemecdn.com/b/91/8cf4f67e0e8223931cd595dc932fepng.png">
              优惠
            </span>
          </li> -->
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(items, index) in shopgoods" :key="index" ref="foodsRef">
            <h1 class="title">{{items.name}}</h1>
            <ul>
              <li class="food-item" v-for="(item, index) in items.foods" :key="index" @click="showFood(item)">
                <div class="icon">
                  <img width="57" height="57" :src="item.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{item.name}}</h2>
                  <p class="desc">{{item.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{item.sellCount}} 份</span>
                    <span>好评率 {{item.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{item.price}}</span>
                    <span class="old" v-if="item.oldPrice">￥{{item.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <Cart :food="item"></Cart>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopCart></shopCart>
    </div>
    <Food :food="food" ref="food"></Food>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
import { mapState } from 'vuex'
import Cart from '../../../components/cart/cart'
import Food from '../../../components/food/food'
import shopCart from '../../../components/shopCart/shopCart'
export default {
  data () {
    return {

      scrollY: 0, // 鼠标滑动处的高度
      tops: [], // 右边每一个分类的高度
      touchstatus: false,
      food: {} // 商品信息

    }
  },
  components: {
    Cart,
    Food,
    shopCart
  },
  computed: {
    ...mapState(['shopgoods']),
    // 计算当前分类的下标
    currentIndex () {
      const { scrollY, tops } = this
      const index = tops.findIndex((item, index) => {
        return scrollY >= tops[index] && scrollY < tops[index + 1]
      })
      return index
    }
  },

  mounted () {
    this.$store.dispatch('getShopGoods', () => { // 数据更新后执行
      this.$nextTick(() => { // 列表数据更新显示后执行
        this._initScroll()
        this._initTops()
      })
    })
    // 列表显示之后创建
    this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
      click: true
    })
    this.foodsScroll = new Bscroll(this.$refs.foodsWrapper, {
      click: true,
      probeType: 2 // 惯性滑动不生效
    })
  },
  methods: {
    // 点击某一样商品展示详情
    showFood (food) {
      this.food = food
      this.$refs.food.handleClick()
    },
    // handTouchstart () {
    //   this.touchstatus = true
    // },
    // handTouchmove (e) {
    //   if (this.touchstatus) {
    //     const startY = this.$refs.menuRef[0].offsetTop
    //     const touchY = e.touches[0].clientY - 194
    //     const index = Math.floor((touchY - startY) / 53.6)
    //     const scrollY = this.tops[index]
    //     this.scrollY = scrollY
    //     this.foodsScroll.scrollTo(0, -scrollY, 300)
    //   }
    // },
    // handTouchend () {
    //   this.touchstatus = false
    // },
    // 点击左边列表跳转到右边
    toggleMenu (index) {
      // 得到目标的位置的scrollY
      const scrollY = this.tops[index]
      // 立即更新scrollY,让点击的分类成为当前的分类
      this.scrollY = scrollY
      // 平滑滚动到目标位置
      this.foodsScroll.scrollTo(0, -scrollY, 300)
    },
    // 初始化滚动

    _initScroll () {
      // 给右侧列表绑定scroll开始监听
      this.foodsScroll.on('scroll', ({ x, y }) => {
        this.scrollY = Math.abs(y)
        // console.log(y)
      })
      // 给右侧列表绑定scroll结束监听
      this.foodsScroll.on('scrollEnd', ({ x, y }) => {
        this.scrollY = Math.abs(y)
        // console.log('scrollEnd', y)
      })
    },
    // 初始化tops
    _initTops () {
      // 1. 初始化tops
      const tops = []
      let top = 0
      tops.push(top)
      // 2. 收集
      // 找到所有分类的li
      const lis = this.$refs.foodsRef
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })

      // 3. 更新数据
      this.tops = tops
      // console.log(tops)
    }
  }

}
</script>
<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.goods
  display flex
  position absolute
  top 195px
  bottom 46px
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color $green
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>
