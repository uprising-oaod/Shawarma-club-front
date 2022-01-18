<template>
  <div id="app">
    <h1 class="title">Шаурмячный клуб ФКП</h1>
    <Main />
  </div>
</template>

<script>
import Main from './components/Main.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Main
  },
  created() {
    const token = localStorage.getItem("shawToken");
    if (token) {
      const userData = JSON.parse(token);
      this.$store.dispatch('user/logIn', userData);
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("user/logOut");
        }
        return Promise.reject(error);
      }
    );
  }
}
</script>

<style>
.title {
  text-align: center;
  margin-bottom: 50px;
}
</style>
