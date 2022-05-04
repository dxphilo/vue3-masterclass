import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/HomePage";
import Thread from "@/pages/ThreadShow";
import NotFound from "@/pages/NotFound";
import Category from "@/pages/CategoryPage";
import ForumPage from "@/pages/ForumPage";
import CreateThread from "@/pages/CreateThread";
import Profile from "@/pages/UserProfile";
import EditThread from "@/pages/EditThread";
import Register from "@/pages/UserRegistration";
import SignIn from "@/pages/SignUser";
import store from "@/store/index";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/forum/:forumId/thread/create",
    name: "createThread",
    component: CreateThread,
    props: true,
  },
  {
    path: "/thread/:id/edit",
    name: "EditThread",
    component: EditThread,
    props: true,
  },
  {
    path: "/logout",
    name: "logout",
    async beforeEnter() {
      await store.dispatch("signOut");
      return { name: "Home" };
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { toTop: true, smoothScroll: true },
    beforeEnter() {
      if (!store.state.authId) return { name: "Home" };
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile/edit",
    name: "ProfileEdit",
    component: Profile,
    props: { edit: true },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category,
    props: true,
  },
  { path: "/forum/:id", name: "ForumPage", component: ForumPage, props: true },
  {
    path: "/thread/:id",
    name: "Thread",
    component: Thread,
    props: true,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to) {
    // set smooth scroll for specific routes i.e profile
    const scroll = {};
    if (to.toTop) scroll.top = 0;
    if (to.smoothScrol) scroll.behaviour = "smooth";
    return scroll;
  },
  routes,
});
router.beforeEach(() => {
  store.dispatch("unsubscribeAllSnapshots");
});

export default router;
