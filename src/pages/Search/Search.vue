<template>
  <div class="search">
    <header-top title="搜索"></header-top>
    <form class="search_form" action="#" @submit.prevent="search">
      <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model="keyword">
      <input type="submit" name="submit" class="search_submit">
    </form>
    <section class="list" v-if="!noKeywords">
      <ul class="list_container">
        <router-link :to="{path:'/shop',query:{id:item.id}}" class="list_li" tag="li"
          v-for="(item, index) in searchShops" :key="index">
          <section class="item_left">
            <img :src="imgBaseUrl+item.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
              </p>
              <p>月售 {{item.recent_order_num}} 单</p>
              <p>{{item.float_minimum_order_amount}} 元起送 / 距离 {{item.distance}} 公里</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
export default {
  components: {
    HeaderTop
  },
  data () {
    return {
      keyword: '',
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      noKeywords: false
    }
  },
  computed: {
    ...mapState(['searchShops'])
  },
  methods: {
    // 点击搜索
    search () {
      // 取消空格
      const keyword = this.keyword.trim()
      if (keyword) {
        this.$store.dispatch('getSearchShops', keyword)
      }
    }
  },
  // 监听  如果有数据显示店铺  没数据显示无搜索结果
  watch: {
    searchShops (value) {
      if (value.length) {
        this.noKeywords = false
      } else {
        this.noKeywords = true
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/common/styles/mixins.styl'
.search // 搜索
  width 100%
  .search_form
    margin-top 45px
    clearFix()
    background-color #fff
    padding 12px 8px
    input
      height 35px
      padding 0 4px
      border-radius 2px
      font-weight bold
      outline none
      &.search_input
        float left
        width 79%
        border 4px solid #f2f2f2
        font-size 14px
        color #333
        background-color #f2f2f2
      &.search_submit
        float right
        width 18%
        border 4px solid #02a774
        font-size 16px
        color #fff
        background-color #02a774
  .list
    .list_container
      background-color #fff
      .list_li
        display flex
        justify-content center
        padding 10px
        border-bottom 1px solid $bc
        .item_left
          margin-right 10px
          .restaurant_img
            width 50px
            height 50px
            display block
        .item_right
          font-size 12px
          flex 1
          .item_right_text
            p
              line-height 12px
              margin-bottom 6px
              &:last-child
                margin-bottom 0
  .search_none
    margin 0 auto
    color #333
    background-color #fff
    text-align center
    margin-top 0px
</style>
