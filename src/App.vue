<template>
  <TheHeader />
  <div>
    <router-view
      v-show="showPage"
      @ready="onPageReady"
      :key="`${$route.path}${JSON.stringify($route.query)}`"
    />
    <AppSpinner v-show="!showPage" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TheHeader from "@/components/TheHeader.vue";
import AppSpinner from "@/components/AppSpinner.vue";
import NProgress from "nprogress";

export default {
  name: "App",
  components: {
    TheHeader,
    AppSpinner,
  },
  data() {
    return {
      showPage: false,
    };
  },
  methods: {
    ...mapActions("auth", ["fetchAuthUser"]),
    onPageReady() {
      this.showPage = true;
    },
  },
  created() {
    this.fetchAuthUser();
    NProgress.configure({
      speed: 200,
      showSpinner: false,
    });
    this.$router.beforeEach(() => {
      this.showPage = false;
      NProgress.start();
      NProgress.done();
    });
  },
};
</script>

<style>
@import "assets/style.css";
@import "~nprogress/nprogress.css";
#nprogress .bar {
  background: #57ad8d !important;
}
</style>
