<template>
  <div id="app">
    <navbar />
    <main class="mt-5 bg-white">
    <router-view />
    </main>
  </div>
</template>

<script>
// 載入 Bootstrap 的 JS
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
}
</script>

<style scoped>
  main {
    margin-top: 65px !important;
  }
</style>
