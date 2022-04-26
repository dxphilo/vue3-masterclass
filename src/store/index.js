import { createStore } from "vuex";
import { findById, upsert } from "@/helpers";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const store = createStore({
  state: {
    categories: [],
    forums: [],
    users: [],
    threads: [],
    posts: [],
    authId: "VXjpr2WHa8Ux4Bnggym8QFLdv5C3",
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId);
    },
    user: (state) => {
      return (id) => {
        const user = findById(state.users, id);
        if (!user) return null;
        return {
          ...user,
          get posts() {
            return state.posts.filter((p) => p.userId === user.id);
          },
          get postCount() {
            return this.posts.length;
          },
          get threads() {
            return state.threads.filter((t) => t.threadId === user.id);
          },
          get threadsCount() {
            return this.threads.length;
          },
        };
      };
    },
    thread: (state) => {
      return (id) => {
        const thread = findById(state.threads, id);
        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId);
          },
          get repliesCount() {
            return thread.posts.length - 1;
          },
          get contributorsCount() {
            return thread.contributors.length;
          },
        };
      };
    },
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = "john" + Math.random();
      post.userId = state.authId;
      (post.publishedAt = Math.floor(Date.now() / 1000)),
        commit("setItem", { resource: "post", item: post });
      commit("appendPostToThread", {
        childId: post.id,
        parentId: post.threadId,
      });
    },
    updateUser({ commit }, user) {
      commit("setItem", { resource: "users", item: user });
    },
    fetchThread({ dispatch }, { id }) {
      console.log("Thread ID:", id);
      return dispatch("fetchItem", { resource: "threads", id });
    },
    fetchUser({ dispatch }, { id }) {
      console.log("User ID:", id);
      return dispatch("fetchItem", { resource: "users", id });
    },
    fetchPost({ dispatch }, { id }) {
      console.log("Post ID:", id);
      return dispatch("fetchItem", { resource: "posts", id });
    },
    fetchItem({ commit }, { id, resource }) {
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection(resource)
          .doc(id)
          .onSnapshot((doc) => {
            const item = { ...doc.data(), id: doc.id };
            commit("setItem", { resource, id, item: item });
            resolve(item);
          });
      });
    },
    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const id = "john" + Math.random();
      const userId = state.authId;
      const publishedAt = Math.floor(Date.now() / 1000);
      const thread = { forumId, publishedAt, title, userId, id };
      commit("setItem", { resource: "threads", item: thread });
      commit("appendThreadToForum", { forumId, threadId: id });
      commit("appendThreadToUser", { userId, threadId: id });
      dispatch("createPost", { text, threadId: id });
      return state.threads.find((n) => n.id === id);
    },
    async updateThread({ commit, state }, { title, text, id }) {
      const thread = state.threads.find((t) => t.id === id);
      const post = findById(state.posts, thread.posts[0]);
      const newThread = { ...thread, title };
      const newPost = { ...post, text };
      commit("setItem", { resource: "threads", item: newThread });
      commit("setItem", { resource: "posts", item: newPost });
      return newThread;
    },
  },
  mutations: {
    setItem(state, { resource, item }) {
      upsert(state[resource], item);
    },
    appendPostToThread: appendChildToParentMutation({
      parent: "threads",
      child: "posts",
    }),
    appendThreadToForum: appendChildToParentMutation({
      parent: "forums",
      child: "threads",
    }),
    appendThreadToUser: appendChildToParentMutation({
      parent: "users",
      child: "threads",
    }),
  },
});

function appendChildToParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId);
    resource[child] = resource[child] || [];
    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };
}
export default store;
