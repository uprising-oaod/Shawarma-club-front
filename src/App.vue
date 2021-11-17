<template>
  <div id="app">
    <h1 class="title">Шаурмячный клуб ФКП</h1>
    <Main />
  </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style>
.title {
  text-align: center;
  margin-bottom: 50px;
}
</style>
