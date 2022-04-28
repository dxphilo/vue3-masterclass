<template>
  <TheHeader />
  <div>
    <router-view v-show="showPage" @ready="showPage = true" />
    <div v-show="!showPage" class="push-top text-center">
      <h3>Loading...</h3>
    </div>
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
  data() {
    return {
      showPage: false,
    };
  },
  methods: {
    ...mapActions(["fetchAuthUser"]),
  },
  async created() {
    await this.fetchAuthUser();
    this.$router.beforeEach(() => {
      this.showPage = false;
    });
  },
};
</script>

<style>
@import "assets/style.css";
</style>
