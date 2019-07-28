<template lang="html">
  <div class="copyright">
    <div class="game">
      <span>© 2019 <a href="https://senritsu.dev">senritsu</a></span>
      <span>source available at <a href="https://github.com/senritsu/micro-games">GitHub</a></span>
    </div>
    <div class="logos">
      <span>Vuesax logo © <a href="https://lusaxweb.github.io/vuesax/">Vuesax</a></span>
      <span>Vuetify logo © <a href="https://vuetifyjs.com/">Vuetify</a></span>
      <span>Made with Vue / Made with Vuetify logo © <a href="https://madewithvuejs.com/">made with vue.js</a></span>
      <span>Quasar logo © <a href="https://quasar.dev/">Quasar</a></span>
      <span>Element logo © <a href="https://element.eleme.io/">Element</a></span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.copyright {
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
}
.game, .logos {
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    margin: 0.25em 0.75em;
  }
}
</style>
