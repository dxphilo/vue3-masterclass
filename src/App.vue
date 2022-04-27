<template>
  <TheHeader />
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TheHeader from "./components/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheHeader,
  },
  methods: {
    ...mapActions(["fetchAuthUser"]),
  },
  created() {
    this.fetchAuthUser();
  },
};
</script>

<style>
@import "assets/style.css";
</style>
