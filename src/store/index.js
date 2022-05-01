import { createStore } from "vuex";
import getters from "@/store/getters";
import actions from "@/store/actions";
import mutations from "@/store/mutations";

const store = createStore({
  state: {
    categories: [],
    forums: [],
    users: [],
    threads: [],
    posts: [],
    authId: null,
    unsubscribes: [],
  },
  getters,
  actions,
  mutations,
});

export default store;
