import { createApp } from "vue";
import App from "./App.vue";
import AppDate from "@/components/AppDate";
import store from "@/store/index";
import router from "@/router";

import firebase from "firebase/compat/app";
import firebaseConfig from "@/config/firebase.js";

firebase.initializeApp(firebaseConfig);
const forumApp = createApp(App);
forumApp.use(router);
forumApp.use(store);
forumApp.component("AppDate", AppDate);
forumApp.mount("#app");
