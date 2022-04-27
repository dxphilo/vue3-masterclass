import { findById } from "@/helpers";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default {
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
  fetchCategory: ({ dispatch }, { id }) =>
    dispatch("fetchItem", { resource: "categories", id }),
  fetchForum: ({ dispatch }, { id }) =>
    dispatch("fetchItem", { resource: "forums", id }),
  fetchThread: ({ dispatch }, { id }) =>
    dispatch("fetchItem", { resource: "threads", id }),
  fetchUser: ({ dispatch }, { id }) =>
    dispatch("fetchItem", { resource: "users", id }),
  fetchPost: ({ dispatch }, { id }) =>
    dispatch("fetchItem", { resource: "posts", id }),
  fetchAllCategories({ commit }) {
    return new Promise((resolve) => {
      firebase
        .firestore()
        .collection("categories")
        .onSnapshot((querySnapshot) => {
          const categories = querySnapshot.docs.map((doc) => {
            const item = { id: doc.id, ...doc.data() };
            commit("setItem", { resource: "categories", item });
            return item;
          });
          resolve(categories);
        });
    });
  },
  fetchThreads: ({ dispatch }, { ids }) =>
    dispatch("fetchItems", { resource: "threads", ids }),
  fetchCategories: ({ dispatch }, { ids }) =>
    dispatch("fetchItems", {
      resource: "categories",
      ids,
    }),
  fetchForums: ({ dispatch }, { ids }) =>
    dispatch("fetchItems", { resource: "forums", ids }),
  fetchUsers: ({ dispatch }, { ids }) =>
    dispatch("fetchItems", { resource: "users", ids }),
  fetchPosts: ({ dispatch }, { ids }) =>
    dispatch("fetchItems", { resource: "posts", ids }),
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
  fetchItems({ dispatch }, { ids, resource }) {
    return Promise.all(
      ids.map((id) => dispatch("fetchItem", { id, resource }))
    );
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
};
