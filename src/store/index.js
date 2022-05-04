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
    authId: "jUjmgCurRRdzayqbRMO7aTG9X1G2",
    unsubscribes: [],
    authUserUnsubscribe: null,
  },
  getters,
  actions,
  mutations,
});

export default store;
