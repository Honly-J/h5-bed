<template>
  <div class="bg">
    <div class="load"></div>
    <div class="number">
      <template v-if='precent<100'>
        <span :class="'n'+ m " v-show='m > 0'></span><span :class="'n'+ s "></span><span class="per"></span>
      </template>
      <template v-else>
        <span class="n1"></span><span class="n0"></span><span class="n0"></span><span class="per"></span>
      </template>
    </div>
  </div>
</template>
<script>
// import conf from '@/config'
export default {
  data () {
    return {
      precent: '00',
      s: 0,
      m: 0
    }
  },
  mounted () {
    this.loadImg()
  },
  methods: {
    loadImg () {
      /* eslint-disable */
      const imgArr = [ '1-bg.jpg',
                        '1-loading.png',
                        '1-man.png',
                        '2-bg.jpg',
                        '2-box.png',
                        '2-btn.png',
                        '3-1-bg.jpg',
                        '3-1-mark.png',
                        '3-2-bg.jpg',
                        '3-2-mark.png',
                        '3-3-bg.jpg',
                        '3-3-mark.png',
                        '3-box.png',
                        '3-error.png',
                        '3-fail.png',
                        '3-min-man.png',
                        '3-top-box.png',
                        '3-top-box2.png',
                        '3-yes.png',
                        '4-box.png',
                        '4-btn.png',
                        '4-man.png',
                        '5-all.png',
                        '5-bg.jpg',
                        '5-press-btn.png',
                        '5-sub-btn.png',
                        'num-1.png',
                        'num-2.png',
                        'num-3.png',
                        'save-bg.jpg',
                        '6-bg.jpg',
                        '6-box.png',
                        'n-0.png',
                        'n-1.png',
                        'n-2.png',
                        'n-3.png',
                        'n-4.png',
                        'n-5.png',
                        'n-6.png',
                        'n-7.png',
                        'n-8.png',
                        'n-9.png'
                      ]
      const that = this
      let _acount = 0
      imgArr.forEach(item => {
        let tempImg = new Image()
        tempImg.onload = function () {
          _acount++
          that.precent = Math.max(0, parseInt(_acount / imgArr.length * 100))
          if (_acount >= imgArr.length) {
            that.precent = '100'
            setTimeout(() => {
              that.$store.commit('SET_COMPONENT', 'Intro')
            }, 1000)
          }
          that.m = (that.precent + '').charAt(0)
          that.s = (that.precent + '').charAt(1)
        }
        tempImg.src = require('@/assets/imgs/' + item)
      })
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
  background: url('../assets/imgs/1-bg.jpg') no-repeat 50% 50%;
  background-size: auto 100%;
}
.load{
  @include bg('1-loading.png',260px,260px);
  @include poc( -260/2 + 0px, -220 + 0px);
  @include animate2(rota,5, 0)
}
.number{
  @include poc('', 90px,0);
  left:0;
  width:100%;
  height:40px;
  display:flex;
  align-items: center;
  justify-content: center;
  color:#fff;
  span {
    display: inline-block;
    @include bg('num-1.png',585px,40px);
    width:32px;
    height: 40px;
    &:first-of-type{
      transform: translateX(5px)
    }
    &:last-of-type{
      transform: translateX(-5px)
    }
  }
  .n0{  background-position: -558px  0; }
  .n1{  background-position: -64px  0;  }
  .n2{  background-position: -110px  0; }
  .n3{  background-position: -170px  0; }
  .n4{  background-position: -224px  0; }
  .n5{  background-position: -280px  0; }
  .n6{  background-position: -336px  0; }
  .n7{  background-position: -392px  0;  }
  .n8{  background-position: -448px  0; }
  .n9{  background-position: -504px  0; }
}
@keyframes rota{
  0%{
    transform: rotate(0deg)
  }
  50% {
    transform: rotate(180deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>
