<template>
  <div class="bg">
    <div class="box">
      <div class="text">
        <!-- 在我外出参加一次太空护脊行动时，外星人兵兵
        趁我不在，跑到King Koil金可儿空间也就是我家，
        享受我最爱的人工智能床。现在我邀请你，依次
        查看King Koil金可儿空间的三个房间内各个角落，
        在60S内找到全部外星人，送回MIB总部，你将收
        到一份我为你准备的金可儿大礼包。
        <p>----- 特工金可儿</p> -->
      </div>
    </div>
    <div class="btn" @click="action"><!--行动--></div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    action () {
      this.$store.commit('SET_COMPONENT', 'Game')
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
  background: url('../assets/imgs/2-bg.jpg') no-repeat 50% 50%;
  background-size: auto 100%;
}
.box{
  opacity: 0;
  @include bg('2-box.png',631px,825px);
  @include poc(-631/2 + 0px,-513 + 0px);
  animation: bounceInDown .8s .5s cubic-bezier(.16,1.44,.83,1.28) forwards;
}
.btn{
  opacity: 0;
  @include bg('2-btn.png',209*1.24px,99*1.24px);
  @include poc( -105*1.24 + 0px, 432 + 0px);
  cursor: pointer;
  animation: jello 1s 2s ease-in-out forwards;
}
</style>
