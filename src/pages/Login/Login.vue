<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">外卖</h2>
        <div class="login_header_title">
          <!-- <a href="javascript:;" :class="{on:showOn == 1}" @click="showOn = 1">短信登录</a>
          <a href="javascript:;" :class="{on:showOn == 2}" @click="showOn = 2">密码登录</a> -->
          <a href="javascript:;" :class="{on:loginLight}" @click="loginLight = true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginLight}" @click="loginLight = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginLight}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}"
                @click.prevent="getCode">{{countdown>0?`已发送${countdown}s`: '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册南航外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginLight}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input class="inputTwo" type="password" maxlength="8" placeholder="密码" :class="{on:showPwd}"
                  v-model="pwd">
                <input class="inputTwo" type="tel" maxlength="8" placeholder="密码" :class="{on:!showPwd}" v-model="pwd">
                <div class="switch_button" :class="showPwd?'off':'on'" @click="showPwd = !showPwd">
                  <div class="switch_circle" :class="{right:!showPwd}"></div>
                  <span class="switch_text">{{showPwd?'...':'abc'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha"
                  ref="imgRef">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2">&#xe606;</i>
      </a>
    </div>
    <alert-tip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"></alert-tip>
  </section>
</template>
<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import { reqLogin, reqSendcode, reqLoginSms } from '../../api/index'
import { mapActions } from 'vuex'
export default {
  data () {
    return {

      // 切换高亮初始值
      showOn: 1,
      // true代表短信登陆,false代表用户名登陆
      loginLight: true,
      // 手机号
      phone: '',
      // 验证码
      code: '',
      // 倒计时
      countdown: 0,
      // 切换密码是否显示
      showPwd: true,
      // 用户名
      name: '',
      // 双向绑定密码输入框
      pwd: '',
      // 一次性验证码
      captcha: '',
      // 提示信息
      alertText: '',
      // 是否显示提示框
      showAlert: false

    }
  },
  components: {
    AlertTip
  },
  computed: {
    rightPhone () {
      return /^1[3456789]\d{9}$/.test(this.phone)
    }
  },
  methods: {
    // 提交表单
    async login () {
      let result
      if (this.loginLight) { // 手机号登陆 //loginLight跟前面切换登陆方式是同一个
        const { rightPhone, phone, code } = this
        if (!this.rightPhone) {
          // 手机号不正确
          this.showTip('手机号不正确')
          return
        } else if (!/^\d{6}$/.test(code)) {
          // 请输入6位验证码
          this.showTip('请输入6位验证码')
          return
        }
        // 手机号登陆请求
        result = await reqLoginSms(phone, code)
      } else { // 用户名登陆
        const { name, pwd, captcha } = this
        if (!this.name) {
          // 请输入用户名
          this.showTip('请输入用户名')
          return
        } else if (!this.pwd) {
          // 请输入密码
          this.showTip('请输入密码')
          return
        } else if (!this.captcha) {
          // 请输入一次性验证码
          this.showTip('请输入一次性验证码')
          return
        }
        // 用户名登陆请求
        result = await reqLogin({ name, pwd, captcha })
      }
      // 取消定时器
      if (this.countdown) {
        this.countdown = 0
        clearInterval(this.clearInterval)
        this.intervalId = undefined
      }
      // 登陆成功或者失败
      if (result.code === 0) {
        const user = result.data
        this.$store.dispatch('getUserInfo', user)// 存到action中
        this.$router.replace('/personal')
      } else if (result.code === 1) {
        const msg = result.msg
        this.showTip(msg)
        // 清空验证码
        this.captcha = ''
        // 登陆失败就更新一次性验证码
        this.getCaptcha()
      }
    },
    // 发送短信验证码
    async getCode () {
      if (this.countdown === 0) {
        this.countdown = 30
        this.setintervalId = setInterval(() => {
          this.countdown--
          if (this.countdown <= 0) {
            clearInterval(this.setintervalId)
          }
        }, 1000)
        const result = await reqSendcode(this.phone)
        if (result.code === 1) {
          // 显示提示
          this.showTip(result.msg)
          // 停止计时
          if (this.countdown) {
            this.countdown = 0
            clearInterval(this.setintervalId)
            this.intervalId = undefined
          }
        }
      }
    },
    // 打开提示框
    showTip (alertText) {
      this.showAlert = true
      this.alertText = alertText
    },
    // 点击确定关闭提示框
    closeTip () {
      this.showAlert = false
      this.alertText = ''
    },
    // 更新一次性验证码
    getCaptcha () {
      this.$refs.imgRef.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/common/styles/mixins.styl'
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 3.75rem
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 2.5rem
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 2.5rem
        text-align center
        >a
          color #333
          font-size 0.875rem
          padding-bottom 0.25rem
          &:first-child
            margin-right 2.5rem
          &.on
            color #02a774
            font-weight 700
            border-bottom 0.125rem solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 0.625rem
            box-sizing border-box
            border 0.0625rem solid #ddd
            border-radius 0.25rem
            outline 0
            font 400 0.875rem Arial
            &:focus
              border 0.0625rem solid #02a774
          .login_message
            position relative
            margin-top 1rem
            height 3rem
            font-size 0.875rem
            background #fff
            .get_verification
              position absolute
              top 50%
              right 0.625rem
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 0.875rem
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 1rem
            height 3rem
            font-size 0.875rem
            background #fff
            .inputTwo
              display none
              &.on
                display block
            .switch_button
              font-size 0.75rem
              border 0.0625rem solid #ddd
              border-radius 0.5rem
              transition background-color 0.3s, border-color 0.3s
              padding 0 0.375rem
              width 1.875rem
              height 1rem
              line-height 1rem
              color #fff
              position absolute
              top 50%
              right 0.625rem
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                &.right
                  transform translateX(1.6875rem)
                // transform translateX(1.6875rem)
                position absolute
                top -0.0625rem
                left -0.0625rem
                width 1rem
                height 1rem
                border 0.0625rem solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
          .login_hint
            margin-top 0.75rem
            color #999
            font-size 0.875rem
            line-height 1.25rem
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 2.625rem
          margin-top 1.875rem
          border-radius 0.25rem
          background #4cd96f
          color #fff
          text-align center
          font-size 1rem
          line-height 2.625rem
          border 0
      .about_us
        display block
        font-size 0.75rem
        margin-top 1.25rem
        text-align center
        color #999
    .go_back
      position absolute
      top 0.3125rem
      left 0.3125rem
      width 1.875rem
      height 1.875rem
      >.iconfont
        font-size 1.25rem
        color #999
</style>
