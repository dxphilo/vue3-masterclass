import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/HomePage";
import Thread from "@/pages/ThreadShow";
import NotFound from "@/pages/NotFound";
import Category from "@/pages/CategoryPage";
import ForumPage from "@/pages/ForumPage";
import CreateThread from "@/pages/CreateThread";
import Profile from "@/pages/UserProfile";
import EditThread from "@/pages/EditThread";
import data from "@/data.json";

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
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { toTop: true, smoothScroll: true },
  },
  {
    path: "/profile/edit",
    name: "ProfileEdit",
    component: Profile,
    props: { edit: true },
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
    beforeEnter(to, from, next) {
      const threadsData = data.threads.find((n) => n.id === to.params.id);
      if (threadsData) {
        return next();
      } else {
        next({
          name: "NotFound",
          params: { pathMatch: to.path.substring(1).split("/") },
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];
export default createRouter({
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
