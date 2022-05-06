import { createApp } from "vue";
import App from "./App.vue";
import AppDate from "@/components/AppDate";
import store from "@/store/index";
import router from "@/router";

import firebase from "firebase/compat/app";
import firebaseConfig from "@/config/firebase.js";

// font awesome icons
import FontAwesome from "@/plugins/FontAwesome";
import ClickOutsideDirective from "@/plugins/ClickOutsideDirective";
import PageScrollDirective from "@/plugins/PageScrollDirective";
import Vue3Pagination from "@/plugins/Vue3Pagination";

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("unsubscribeAuthUserSnapshot");
  if (user) {
    store.dispatch("fetchAuthUser");
  }
});
const forumApp = createApp(App);
forumApp.use(router);
forumApp.use(store);
forumApp.use(FontAwesome);
forumApp.use(ClickOutsideDirective);
forumApp.use(PageScrollDirective);
forumApp.use(Vue3Pagination);
forumApp.component("AppDate", AppDate);
forumApp.mount("#app");
