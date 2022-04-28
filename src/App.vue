<template>
  <TheHeader />
  <div>
    <router-view v-show="showPage" @ready="onPageReady" />
    <AppSpinner v-show="!showPage" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TheHeader from "@/components/TheHeader.vue";
import AppSpinner from "@/components/AppDate.vue";
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
    ...mapActions(["fetchAuthUser"]),
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
