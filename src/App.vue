<template>
  <div id="app">
    <AppHeader />
    <AppBody />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/layouts/AppHeader";
import AppBody from "@/layouts/AppBody";
import AppFooter from "@/layouts/AppFooter";

export default {
  name: "App",
  components: {
    AppHeader,
    AppBody,
    AppFooter
  }
};
</script>
