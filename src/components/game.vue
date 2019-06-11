<template>
  <div>
    <div class="mans-wrapper">
      <span
        v-for="(item,ind) in mansArr2"
        :key="ind"
        :class="{active: item === 1}"></span>
    </div>
    <div class="game-wrapper">
      <div class="card-wrapper">
        <div :class="'bg-' + cardIndex" @click.stop.prevent="showErrorIcon">
          <span
            v-for="(item,ind) in mansArr[cardIndex]"
            :key="ind"
            :class="{active: item === 1}"
            @click="findedOne(cardIndex,ind)"></span>
        </div>
        <div class="mark-bg-0" v-show="!hideMark && cardIndex === 0 "></div>
        <div class="mark-bg-1" v-show="!hideMark && cardIndex === 1 "></div>
        <div class="mark-bg-2" v-show="!hideMark && cardIndex === 2 "></div>
        <div class="error-icon" :style="errorStyle"></div>
      </div>
    </div>
    <div class="process">
      <div class="text" v-text="lastTime">00:00</div>
      <div class="inline-box">
        <span :style="{'width': gressPercent + '%'}"></span>
      </div>
    </div>
    <div class="fail-mark" v-show="failFlag" @click="resetGame"></div>
  </div>
</template>

<script>
import conf from '@/config'

export default {
  watch: {
    mansArr (oldArr, newArr) {
      const temp = newArr[this.cardIndex].filter(item => item === 1)
      if (temp.length >= 5) {
        this.pause = true
        setTimeout(() => {
          this.cardIndex++
          this.hideMark = false
          this.mansArr2 = []
          console.log('下一关', this.cardIndex)
          if (this.cardIndex >= 3) {
            this.$store.commit('SET_FINISHTIME', this.hasCountSec)
            this.$store.commit('SET_COMPONENT', 'Result')
          } else {
            setTimeout(() => {
              this.nextCard(this.cardIndex)
              console.log('trigger nextCard', this.cardIndex)
            }, 2000)
          }
        }, 1000)
      }
    }
  },
  data () {
    return {
      errorStyle: {},
      cardIndex: 0,
      hideMark: false,
      lastTime: '00:' + conf.totalTime,
      countSec: conf.totalTime,
      hasCountSec: 0,
      failFlag: false,
      gressPercent: 0,
      pause: true,
      mansArr2: [],
      mansArr: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]
    }
  },
  mounted () {
    // 重置比例
    this.resetRate()
    this.timeCount().catch(() => {
      this.showFailResult()
    })
    setTimeout(() => {
      this.nextCard(0)
    }, 2000)
  },
  beforeDestroy () {
    // 返回原来的比例
    document.querySelector('html').style.fontSize = this.htmlFontSize
  },
  methods: {
    resetRate () {
      this.htmlFontSize = document.querySelector('html').style.fontSize
      this.$funcs.resetHtmlFontSize()
      setTimeout(() => {
        const $p = document.querySelector('.process')
        const $m = document.querySelector('.mans-wrapper')
        const rate = `scale(${parseFloat(this.htmlFontSize) / parseFloat(document.querySelector('html').style.fontSize)})`
        $p.style.WebkitTransform = $p.style.transform = rate
        $m.style.WebkitTransform = $m.style.transform = rate
      }, 300)
    },
    showErrorIcon (e) {
      if (e.target.tagName.toUpperCase() === 'SPAN') {
        return
      }
      let { pageX, pageY } = e
      this.errorStyle = {
        left: pageX + 'px',
        top: pageY + 'px',
        display: 'block'
      }
      let t = null
      t = setTimeout(() => {
        this.errorStyle.display = 'none'
        clearTimeout(t)
      }, 500)
    },
    resetGame () {
      this.$store.commit('SET_COMPONENT', 'Blank')
    },
    findedOne (i, ii) {
      if (this.mansArr[i][ii] > 0) {
        return
      }
      this.$set(this.mansArr[i], ii, 1)
      this.mansArr2.push(1)
    },
    nextCard (i) {
      this.pause = false
      this.cardIndex = i
      this.hideMark = true
    },
    showFailResult () {
      this.failFlag = true
    },
    // 倒计时
    timeCount () {
      return new Promise((resolve, reject) => {
        let timer = null
        timer = setInterval(() => {
          if (this.pause) {
            return
          }
          if (this.countSec <= 0) {
            this.gressPercent = 100
            timer && clearInterval(timer)
            timer = null
            reject(new Error('end'))
          } else {
            this.countSec--
            this.hasCountSec++
            this.gressPercent = (conf.totalTime - this.countSec) / conf.totalTime * 100
            this.lastTime = this._num2time(this.countSec)
          }
        }, 1000)
      })
    },
    _num2time (n) {
      const m = parseInt(n / 60)
      const s = n % 60
      const db = i => i > 9 ? i : '0' + i
      return db(m) + ':' + db(s)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/func';
.mans-wrapper{
  @include bg('3-top-box.png',485px,41px);
  @include poc(-435/2 + 0px,-513 + 0px,8);
  margin-top: 0;
  top:60px;
  /* overflow: hidden; */
  span{
    position: absolute;
    @include bg('3-min-man.png',36px,41px);
    z-index: 8;
    opacity: 0;
    &.active{
      opacity: 1;
      animation: jump 0.5s 0s ease-in-out forwards;
    }
  }
  span:nth-of-type(1){left:79px;}
  span:nth-of-type(2){left:133px;}
  span:nth-of-type(3){left:188px;}
  span:nth-of-type(4){left:242px;}
  span:nth-of-type(5){left:297px;}
}
.process{
  position: absolute;
  @include bg('3-box.png',536px,51px);
  @include poc(-536/2 + 0px,0,3)
  top:auto;
  bottom:75px;
  .text{
    position: absolute;
    top:-40px;
    z-index: 2;
    width:100%;
    font-size:28px;
    text-align:center;
  }
  .inline-box{
    position: absolute;
    width:455px;
    height: 18px;
    top:16px;
    left:46px;
    overflow: hidden;
    border-radius: 8px;
    span{
      position: absolute;
      height: 100%;
      background: green;
      @include gradient(top,#22eb55,#aff8c2)
    }
  }
}

.fullscreen{
  @include pos(0,0);
  width:100%;
  height: 100%;
  z-index: 2;
}
.bg-0{
  @extend .fullscreen;
  background: url('../assets/imgs/3-1-bg.jpg') no-repeat 50% 50%;
  background-size: auto 100%;
  span{
    position: absolute;
    z-index: 5;
    height: 100px;
    width:100px;
    @include bg('3-yes.png',89px,98px);
    opacity: 0;
    @include poc(100px,100px);
    &.active{
      animation: zoomIn 0.5s 0s ease-in forwards;
    }
  }
  span:nth-of-type(1){margin-left:225px; margin-top:-438px;}
  span:nth-of-type(2){margin-left:-375px;margin-top:40px;}
  span:nth-of-type(3){margin-left:90px; margin-top:100px;}
  span:nth-of-type(4){margin-left:-300px;margin-top:270px; }
  span:nth-of-type(5){margin-left:138px; margin-top:309px;}
}

.bg-1{
  @extend .bg-0;
  background: url('../assets/imgs/3-2-bg.jpg') no-repeat 50% 50%;
  background-size: auto 100%;
  span:nth-of-type(1){margin-left:142px; margin-top:120px;}
  span:nth-of-type(2){margin-left:-312px;margin-top:-30px;}
  span:nth-of-type(3){margin-left:-215px; margin-top:112px;}
  span:nth-of-type(4){margin-left:220px;margin-top:70px; }
  span:nth-of-type(5){margin-left:60px; margin-top:320px;}
}

.bg-2{
  @extend .bg-0;
  background: url('../assets/imgs/3-3-bg.jpg') no-repeat 50% 50%;
  background-size: auto 100%;
  span:nth-of-type(1){margin-left:142px; margin-top:120px;}
  span:nth-of-type(2){margin-left:-172px;margin-top:126px;}
  span:nth-of-type(3){margin-left:-365px; margin-top:172px;}
  span:nth-of-type(4){margin-left:-300px;margin-top:300px; }
  span:nth-of-type(5){margin-left:144px; margin-top:340px;}
}

.mark-bg-0{
  @extend .fullscreen;
  background: url('../assets/imgs/3-1-mark.png') no-repeat 50% 50%;
  background-size: auto 100%;
  z-index: 9;
}
.mark-bg-1{
  @extend .fullscreen;
  background: url('../assets/imgs/3-3-mark.png') no-repeat 50% 50%;
  background-size: auto 100%;
  z-index: 9;
}
.mark-bg-2{
  @extend .fullscreen;
  background: url('../assets/imgs/3-2-mark.png') no-repeat 50% 50%;
  background-size: auto 100%;
  z-index: 9;
}
.fail-mark{
  @extend .fullscreen;
  background:rgba(0,0,0,.8) url('../assets/imgs/3-fail.png') no-repeat 50% 50%;
  background-size: 475px 240px;
  z-index: 10;
}
.error-icon{
  @include bg('3-error.png',95px,96px);
  position: absolute;
  z-index: 5;
  opacity: 0;
  display: none;
  transform: translate(-47px,-47px);
  @include animate2(shake,.3,0)
}
@keyframes jump{
  0% {
    opacity: 0;
    top:50px;
  }
  30% {
    opacity: 0.1;
    top:-30px;
  }
  80%{
    opacity: 1;
    top:10px;
    height: 80%;
    background-size: 100% 80%;
  }
  100%{
    opacity: 1;
    top:0;
    height: 100%;
    background-size: 100% 100%;
  }
}
@keyframes zoomIn{
  0% {
    opacity: 0;
    transform: scale(8) rotate(0deg)
  }
  80% {
    opacity: 0.3;
    transform: scale(2) rotate(50deg)
  }
  100%{
    opacity: 1;
    transform: scale(1) rotate(50deg)
  }
}
@keyframes shake{
  0%{
    opacity:0;
  }
  100%{
    opacity: 1;
  }
}
</style>
