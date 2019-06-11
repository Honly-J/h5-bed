<template>
  <div class="bg" v-show="vshow">
    <div class="box" id="min-img">
    </div>
    <div class="btn-press"></div>
    <img id="save-img">
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      vshow: false
    }
  },
  computed: {
    ...mapState({
      codeStr: state => state.codeStr,
      finishTime: state => state.finishTime,
      formData: state => state.formData
    })
  },
  mounted () {
    console.log('this.formData', this.formData)
    setTimeout(() => {
      this.$funcs.resetHtmlFontSize()
      this.vshow = true
      this.createBoxPng()
      this.createPoster()
    }, 500)
  },
  methods: {
    // 生成
    async createBoxPng () {
      const that = this
      const shopObj = this.formData
      const bg1 = require('@/assets/imgs/6-box.png')
      const bg2 = window.userInfo.headImg
      const cv = document.createElement('canvas')
      const ctx = cv.getContext('2d')
      cv.height = 1051 // * ratio
      cv.width = 631 // * ratio
      function drawText (ctx) {
        // 昵称
        ctx.font = '16px "Helvetica Neue",Helvetica,sans-serif'
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'center'
        ctx.fillText(window.userInfo.nickName, 170, 464)
        // 到店描述
        ctx.font = 'bold 16px "Helvetica Neue",Helvetica,sans-serif'
        ctx.fillStyle = '#3b585e'
        ctx.textAlign = 'left'
        let text1 = ''
        let text2 = ''
        if (shopObj.adress) {
          text1 = '门店地址:' + shopObj.adress
          text2 = '联系电话:' + shopObj.tel
        } else {
          text1 = '请关注官方微信公众号【金可儿床具】领奖'
        }
        if (text1.length > 24) {
          ctx.fillText(text1.substring(0, 24), 135, 855)
          ctx.fillText(text1.substring(24), 135, 878)
          ctx.fillText(text2, 135, 905)
        } else {
          ctx.fillText(text1, 135, 865)
          ctx.fillText(text2, 135, 898)
        }
        // 兑换码
        ctx.font = 'normal lighter 28px Helvetica'
        ctx.fillStyle = '#000004'
        ctx.textAlign = 'center'
        ctx.fillText('兑换码: ' + that.codeStr, 315, 800)
      }
      // 大背景
      try {
        await this.drawImg(ctx, bg1, 0, 0, 631, 1051, 0, 0, cv.width, cv.height)
        ctx.save()
        await this.setRadus(ctx, 120, 332, 14, 100, 100)
        await this.drawImg(ctx, bg2, 0, 0, 0, 0, 120, 332, 100, 100)
        ctx.restore()
        drawText(ctx)
        // 成绩
        let [n1, n2] = (this.finishTime + '').split('')
        console.log('n1n2', n1, n2)
        if (n1 && n2) {
          const n1bg = require('@/assets/imgs/n-' + n1 + '.png')
          const n2bg = require('@/assets/imgs/n-' + n2 + '.png')
          await this.drawImg(ctx, n1bg, 0, 0, 0, 0, 332, 371, 50, 50)
          await this.drawImg(ctx, n2bg, 0, 0, 0, 0, 363, 371, 50, 50)
        } else if (n1) {
          const n1bg = require('@/assets/imgs/n-' + n1 + '.png')
          await this.drawImg(ctx, n1bg, 0, 0, 0, 0, 347, 371, 50, 50)
        }
        // 图片
        const _imgSrc = cv.toDataURL('image/png', 1)
        const saveImg = document.getElementById('min-img')
        saveImg.style.background = `url(${_imgSrc}) no-repeat 50% 50%`
        saveImg.style.backgroundSize = 'cover'
      } catch (e) {
        alert(e.name + ': ' + e.message)
      }
    },
    setRadus (ctx, x, y, r, w, h) {
      return new Promise(resolve => {
        ctx.beginPath()
        ctx.moveTo(x + r, y)
        ctx.arcTo(x + w, y, x + w, y + h, r)
        ctx.arcTo(x + w, y + h, x, y + h, r)
        ctx.arcTo(x, y + h, x, y, r)
        ctx.arcTo(x, y, x + w, y, r)
        ctx.closePath()
        ctx.clip()
        resolve()
      })
    },
    drawImg (ctx, img, x1, y1, w1, h1, x2, y2, w2, h2) {
      return new Promise((resolve, reject) => {
        let oimg = new Image()
        // oimg.setAttribute('crossOrigin','*')
        oimg.setAttribute('crossOrigin', 'Anonymous')
        oimg.onload = function () {
          console.log(x1, y1, w1 || oimg.width, h1 || oimg.height, x2, y2, w2, h2)
          ctx.drawImage(oimg, x1, y1, w1 || oimg.width, h1 || oimg.height, x2, y2, w2, h2)
          resolve()
        }
        oimg.onerror = function () {
          alert('加载图片错误了:' + img)
          reject(new Error('error'))
        }
        oimg.src = img
      })
    },
    // 生成分享海报
    async createPoster () {
      const that = this
      const shopObj = this.formData
      const bg1 = require('@/assets/imgs/save-bg.jpg')
      const bg2 = window.userInfo.headImg
      const cv = document.createElement('canvas')
      const ctx = cv.getContext('2d')
      cv.height = 1333 // * ratio
      cv.width = 750 // * ratio
      function drawText (ctx) {
        // 昵称
        ctx.font = '20px "Helvetica Neue",Helvetica,sans-serif'
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'center'
        ctx.fillText(window.userInfo.nickName, 134, 464)

        // 成绩
        // ctx.font = 'oblique bold 120px Arial'
        // ctx.fillStyle = '#bce2f4'
        // ctx.fillText(that.finishTime, 458, 428)

        // 到店描述
        ctx.font = 'bold 24px "Helvetica Neue",Helvetica,sans-serif'
        ctx.fillStyle = '#3b585e'
        ctx.textAlign = 'left'
        let text1 = ''
        let text2 = ''
        if (shopObj.adress) {
          text1 = '门店地址:' + shopObj.adress
          text2 = '联系电话:' + shopObj.tel
        } else {
          text1 = '请关注官方微信公众号【金可儿床具】领奖'
        }
        if (text1.length > 26) {
          ctx.fillText(text1.substring(0, 26), 100, 1113)
          ctx.fillText(text1.substring(26), 100, 1140)
          ctx.fillText(text2, 100, 1174)
        } else {
          ctx.fillText(text1, 100, 1130)
          ctx.fillText(text2, 100, 1164)
        }
        // 成绩
        ctx.font = 'normal lighter 36px Helvetica'
        ctx.fillStyle = '#000004'
        ctx.textAlign = 'center'
        ctx.fillText('兑换码: ' + that.codeStr, 375, 1030)
      }
      // 大背景
      try {
        await this.drawImg(ctx, bg1, 0, 0, 750, 1333, 0, 0, cv.width, cv.height)
        ctx.save()
        await this.setRadus(ctx, 70, 304, 14, 128, 128)
        await this.drawImg(ctx, bg2, 0, 0, 0, 0, 70, 304, 128, 128)
        ctx.restore()
        drawText(ctx)
        // 成绩
        let [n1, n2] = (this.finishTime + '').split('')
        console.log('n1n2', n1, n2)
        if (n1 && n2) {
          const n1bg = require('@/assets/imgs/n-' + n1 + '.png')
          const n2bg = require('@/assets/imgs/n-' + n2 + '.png')
          await this.drawImg(ctx, n1bg, 0, 0, 0, 0, 420, 354, 70, 70)
          await this.drawImg(ctx, n2bg, 0, 0, 0, 0, 470, 354, 70, 70)
        } else if (n1) {
          const n1bg = require('@/assets/imgs/n-' + n1 + '.png')
          await this.drawImg(ctx, n1bg, 0, 0, 0, 0, 430, 354, 70, 70)
        }
        // 图片
        const _imgSrc = cv.toDataURL('image/png', 1)
        const saveImg = document.getElementById('save-img')
        saveImg.setAttribute('src', _imgSrc)
      } catch (e) {
        alert(e.name + ': ' + e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/func';
.bg{
  @include pos(0,0);
  width:100%;
  height: 100%;
  z-index: 1;
  background:rgba(0,0,0,.8) url('../assets/imgs/6-bg.jpg') no-repeat 50% 50%;
  background-size: auto 100%;
  overflow: hidden;
}
.box{
  @include bg('6-box.png',631px, 1051px);
  @include poc(-631/2+0px, -620px);
  background-size:cover;
}
#save-img{
  @include pos(0,0);
  width:100%;
  height: 100%;
  z-index: 99;
  opacity: 0.01;
}
.btn-press{
  @include bg('5-press-btn.png',378px,128px);
  @include poc(-378/2+0px,460px);
  animation: jello 0.8s 1s ease-in-out forwards;
}
</style>
