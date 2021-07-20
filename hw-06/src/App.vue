<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/404">404</router-link>
    </div>
    <transition name="fade">
      <modal-window v-if="modalSettings.name" :settings="modalSettings"/>
    </transition>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App",
    data(){
      return {
        modalShown: false,
        modalSettings: {}
      }
    },
    methods:{
      onShown(settings) {
        this.modalSettings = settings
      },
      onHide(){
        this.modalSettings = {}
      }
    },
    mounted(){
      this.$modal.EventBus.$on('shown', this.onShown);
      this.$modal.EventBus.$on('hide', this.onHide);
    },
    beforeDestroy(){
      this.$modal.EventBus.$off('shown', this.onShown);
      this.$modal.EventBus.$off('shown', this.onShown);
    }
  };
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
