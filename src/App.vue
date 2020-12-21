<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
      created() {
      try {
        document.body.removeChild(document.getElementById('appLoading'))
        setTimeout(function() {
          document.getElementById('app').style.display = 'block';
        }, 500)
      } catch (e) {
        
      }
    },
  provide() {
    return {
      reloadPage: this.reloadPage,
      foo: 'test'
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reloadPage() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss">

@import '@/styles/variables.scss';

</style>
