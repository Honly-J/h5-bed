<template>
  <div>
    <h3>404</h3>
    <p>找不到页面，{{second}}秒后回到首页</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      second: 5
    }
  },
  created () {
    setInterval(() => {
      this.second--
      if (this.second <= 0) {
        this.$router.replace({ path: '/' })
      }
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
  div{font-size: 40px;color:#333;text-align: center;padding-top: 100px}
</style>
