<template>
  <div id="app">
    <div class="wrapper">
      <transition mode="out-in">
        <component :is="componentName"></component>
      </transition>
    </div>
  </div>
</template>
<script>
import Blank from './components/Blank.vue'
import Load from './components/loading.vue'
import Intro from './components/intro.vue'
import Game from './components/game.vue'
import Result from './components/result.vue'
import Form from './components/form.vue'
import End from './components/end.vue'

import { mapState } from 'vuex'

export default {
  components: {
    Load,
    Blank,
    Intro,
    Game,
    Result,
    Form,
    End
  },
  data () {
    return {}
  },
  mounted () {
    this.$funcs.share2wx()
  },
  computed: {
    ...mapState({
      componentName: state => state.componentName
    })
  }
}
</script>
<style lang="scss">
.wrapper{
  position: absolute;
  left:0;
  top:0;
  bottom:0;
  right: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  overflow: hidden;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease, transform 0.3s ease;
}
</style>
