<template>
  <div></div>
</template>
<script>
export default {
  created () {
    this.$store.commit('SET_COMPONENT', 'Game')
  }
}
</script>
