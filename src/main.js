import { createApp } from "vue";
import App from "./App.vue";
import AppDate from "@/components/AppDate";
import store from "@/store/index";
import router from "@/router";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/config/firebase";
// Initialize Firebase
initializeApp(firebaseConfig);
const forumApp = createApp(App);
forumApp.use(router);
forumApp.use(store);
forumApp.component("AppDate", AppDate);
forumApp.mount("#app");
