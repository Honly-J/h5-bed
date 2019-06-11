<template>
  <div class="bg">
    <div class="box">
      <div class="user-info">
        <img :src="wxImg" alt="">
        <div v-text="wxName"></div>
      </div>
      <div class="second">
        <span :class="'n' + m" v-if="m>0"></span>
        <span :class="'n' + s"></span>
      </div>
    </div>
    <div class="man"></div>
    <div class="btns">
      <span @click="toshare"></span>
      <span @click="viewShop"></span>
    </div>
    <div class="showShareMask" v-show="showShareMask" @click="hideShare"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      wxImg: window.userInfo.headImg,
      wxName: window.userInfo.nickName,
      showShareMask: false,
      m: 0,
      s: 0
    }
  },
  computed: {
    ...mapState({
      finishTime: state => state.finishTime
    })
  },
  mounted () {
    this.getSecond()
  },
  methods: {
    getSecond () {
      try {
        const useTime = this.finishTime
        const num = (useTime > 9 ? useTime : '0' + useTime) + ''
        this.m = num.split('')[0]
        this.s = num.split('')[1]
      } catch (e) {
        console.error(e)
      }
    },
    toshare () {
      this.showShareMask = true
    },
    hideShare () {
      this.showShareMask = false
    },
    viewShop () {
      this.$store.commit('SET_COMPONENT', 'Form')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/css/func';
.bg{
  @include pos(0,0);
  width:100%;
  height: 100%;
  z-index: 1;
  background:rgba(0,0,0,.8) url('../assets/imgs/2-bg.jpg') no-repeat 50% 50%;
  background-size: auto 100%;
}
.man{
  opacity: 0;
  @include bg('4-man.png',643px ,659px);
  @include poc(-723px/2,-166px);
  animation: bounceInDown .8s 1.2s cubic-bezier(.16,1.44,.83,1.28) forwards;

}
.box{
  opacity: 0;
  @include bg('4-box.png',687px ,318px);
  @include poc(-687px/2,-448px);
  animation: flipInX .8s .3s cubic-bezier(.16,1.44,.83,1.28) forwards;
}
.btns{
  position: absolute;
  bottom:74px;
  height:140px;
  width:90%;
  z-index: 9;
  left:5%;
  display: flex;
  justify-content: space-between;
  background: url('../assets/imgs/4-btn.png') no-repeat 50% 50%;
  background-size: 679px 128px;
  opacity: 0;
  animation: slideInUp .8s 2.5s cubic-bezier(.16,1.44,.83,1.28) forwards;
  span{
    height: 100%;
    display: inline-block;
    width:44%;
  }
}
.showShareMask{
  @include pos(0,0);
  width:100%;
  height: 100%;
  z-index: 99;
  top:0;
  bottom:0;
  right:0;
  left:0;
  background:rgba(0,0,0,.8) url('../assets/imgs/share.png') no-repeat 50% 20%;
  background-size: 458px 471px;
}

.user-info{
  @include pos(34px,81px);
  img{
    display:block;
    width:128px;
    height:128px;
    border-radius: 12px;
    background: rgba(255,255,255,.2)
  }
  div{
    text-align: center;
    width:128px;
    height: 24px;
    line-height: 24px;
    color:#fff;
    font-size:20px;
    margin-top: 10px;
  }
}
.second{
  @include pos(356px, 116px);
  width:140px;
  text-align: center;
  span{
    width:70px;
    height: 74px;
    display:inline-block;
    background-repeat: no-repeat;
    background-size:cover;
    background-position: 50% 50%;
    margin:0;
    padding:0;
  }
  span:first-of-type{transform: translate(10px,0)}
  span:last-of-type{transform: translate(-5px,0)}
  @for $i from 0 to 10{
    .n#{$i}{
      // background-position: -1 * $i * 71 + 0px  0;
      background-image: url('../assets/imgs/n-#{$i}.png');
    }
  }
}
</style>
