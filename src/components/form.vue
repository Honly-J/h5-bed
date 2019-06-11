<template>
  <div class="bg">
    <div class="mask" v-show='subing'>loading ...</div>
    <div class="content">
      <div class="form" :class="{'disabled':afterSub}">
        <div class="form-item">
          <select id="province" v-model="formData.province" :disabled="afterSub">
            <option v-for="(item,index) in formArr" :key="index" :value="index">
              {{ item.province }}
            </option>
          </select>
          <select id="city" v-model="formData.city" :disabled="afterSub">
            <option v-for="(item,index) in formArr[formData.province].city" :key="index" :value="index">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="form-item">
          <select id="shop" v-model="formData.shop" :disabled="afterSub">
            <option v-for="(item,index) in formArr[formData.province].city[formData.city].shop" :key="index" :value="index">
              {{ item.shop }}
            </option>
          </select>
        </div>
      </div>
      <div class="adress-tel" >
        <template v-if="formArr[formData.province].city[formData.city].shop[formData.shop].adress">
          <div>门店地址：{{formArr[formData.province].city[formData.city].shop[formData.shop].adress}}</div>
          <div>联系电话：{{formArr[formData.province].city[formData.city].shop[formData.shop].tel}}</div>
        </template>
        <template v-else>
          <div>提交后长按下方按钮保存获奖凭证，并将凭证发送至</div>
          <div>官方微信公众号【金可儿床具】领奖</div>
        </template>
      </div>
    </div>
    <div class="btn-press" @click="sub"></div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      afterSub: false,
      codeStr: '', // 兑换码
      userInfo: window.userInfo,
      formData: {
        province: 0,
        city: 0,
        shop: 0,
        adress: '',
        tel: ''
      },
      formArr: window.__formdata || [],
      subing: false
    }
  },
  watch: {
    /* eslint-disable */
    ['formData.province'] (o, n) {
      this.formData.city = 0
      this.formData.shop = 0
    }
  },
  mounted () {
    this.resetCss()
  },
  methods: {
    ...mapActions([ 'subUserInfo' ]),
    sub () {
      if (this.subing || this.afterSub) {
        return
      }
      const P = this.formArr[this.formData.province]
      const S = P['city'][this.formData.city]['shop'][this.formData.shop]
      const data = {
        province: P.province,
        city: P['city'][this.formData.city].name,
        shop: S.shop,
        adress: S.adress,
        tel: S.tel,
        userInfo: this.userInfo.nickName,
        wxId:  this.userInfo.wxId,
        headImg:  this.userInfo.headImg
      }
      console.log(data)
      if (!data.province) {
        alert('请选择省份')
        return
      }
      if (!data.city) {
        alert('请选择市')
        return
      }
      if (!data.shop) {
        alert('请选择门店')
        return
      }
      if(!confirm('确定选择【' + data.province + '-' + data.city + '-' + data.shop + '】吗？')){
        return
      }
      this.subing = true
      this.subUserInfo(data).then(res => {
        console.log(res)
        if (res.data.status + '' === '0') {
          setTimeout(() => {
            this.afterSub = true
            this.$store.commit('SET_CODE', res.data.data)
            this.$store.commit('SET_FORMDATA', data)
            this.$store.commit('SET_COMPONENT', 'End')
            this.subing = false
          }, 500);
        } else {
          alert(res.data.message || ('code:' + res.data.status+ '，网络开小差了'))
          this.subing = false
        }
      }).catch(e => {
        this.subing = false
        alert('网络开小差了~')
      })
    },
    resetCss () {
      let $content = document.querySelector('.content')
      let $bg = document.querySelector('.bg')
      const rate = 1004 / 1333
      const x = rate * $bg.offsetHeight / $content.offsetHeight
      $content.style.transform = `scale(${x})`
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
  background:rgba(0,0,0,.8) url('../assets/imgs/5-bg.jpg') no-repeat 50% 50%;
  background-size: auto 100%;
  overflow: hidden;
}
.content{
  @include bg('5-all.png',664px,1004px);
  @include poc(-664/2+0px,-606px);
}
.adress-tel{
    @include bg('',580px,92px);
    @include poc(-580/2+0px,-30px);
    font-weight: bold;
    font-size: 24px;
    color:#3b585e;
    line-height: 1.2;
    font-family: '黑体';
    div{
        margin-bottom:10px;
    }
}
.btn-press{
    @include bg('5-sub-btn.png',378px,128px);
    @include poc(-378/2+0px,0);
    top: auto;
    bottom:90px;
    &.active{
      @include bg('5-press-btn.png',378px,128px);
      animation: jello 0.8s 1s ease-in-out forwards;
    }
}
.form{
    @include pos(0,200px);
    width:100%;
    padding:6px 26px 0;
    box-sizing: border-box;
    height: 220px;
    &.disabled select{
      color:#ccc;
    }
    .form-item{
      display: flex;
      height:120px;
      line-height: 140px;
    }
    select{
        display: block;
        float: left;
        height: 80px;
        line-height: 80px;
        width:100%;
        color:#3b585e;
        font-size:24px;
        outline: none;
        border:none;
        background: none;
    }
    #province{
        width:180px;
        margin-left:100px;
    }
    #city{
        width: 240px;
        margin-left: 120px;
        text-indent: 10px;
    }
    #shop{
        text-indent: 120px;
    }
}
.mask{
  @include pos(0,0);
  width:100%;
  height: 100%;
  z-index: 999;
  background: rgba(0,0,0,.8);
  color:#fff;
  font-size: 24px;
  text-align: center;
  padding-top: 50%;
}
</style>
