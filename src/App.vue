<template>
  <div id="app">

<List></List>
  </div>
</template>

<script>
import List from './components/List.vue'

export default {
  name: 'App',
  components: {
List,

  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
