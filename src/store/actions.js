import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
export default {
  fetchItem(
    { commit },
    { id, resource, handleUnsubscribe = null, once = false }
  ) {
    return new Promise((resolve) => {
      const unsubscribe = firebase
        .firestore()
        .collection(resource)
        .doc(id)
        .onSnapshot((doc) => {
          if (once) {
            unsubscribe();
            console.log("unsubscribe for once option");
          }
          if (doc.exists) {
            const item = { ...doc.data(), id: doc.id };
            commit("setItem", { resource, item });
            resolve(item);
          } else {
            resolve(null);
          }
        });
      if (handleUnsubscribe) {
        handleUnsubscribe(unsubscribe);
      } else {
        commit("appendUnsubscribe", { unsubscribe });
      }
    });
  },
  fetchItems({ dispatch }, { ids, resource, emoji, onSnapshot = null }) {
    ids = ids || [];
    return Promise.all(
      ids.map((id) =>
        dispatch("fetchItem", { id, resource, emoji, onSnapshot })
      )
    );
  },
  async unsubscribeAllSnapshots({ state, commit }) {
    state.unsubscribes.forEach((unsubscribe) => unsubscribe());
    commit("clearAllUnsubscribes");
  },
  clearItems({ commit }, { modules = [] }) {
    commit("clearItems", { modules });
  },
};
