<template>
  <div>
    <p class="pageshow">Welcome to Page Thread Show</p>
    <div>
      <router-link
        class="btn"
        :to="{ name: 'EditThread', params: { id: thread.id } }"
        >Edit Thread</router-link
      >
    </div>
    <p class="container">
      By <a href="#" class="link-unstyled">{{ thread.author?.name }}</a
      >, <AppDate :timestamp="thread.publishedAt" />.
      <span
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
        >{{ thread.repliesCount }} replies by
        {{ thread.contributorsCount }} contributors</span
      >
    </p>

    <div class="container">
      <div class="col-large push-top">
        <h1>{{ thread.title }}</h1>
        <PostList :posts="threadPosts" />
        <ComentEditor @save-comment="addPost" />
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import ComentEditor from "@/components/ComentEditor.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
export default {
  name: "ThreadShow",
  components: { PostList, ComentEditor },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  computed: {
    threads() {
      return this.$store.state.threads;
    },
    posts() {
      return this.$store.state.posts;
    },
    thread() {
      return this.$store.getters.thread(this.id);
    },
    threadPosts() {
      return this.posts.filter((p) => p.threadId === this.id);
    },
  },
  methods: {
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      };
      this.$store.dispatch("createPost", post);
    },
  },
  created() {
    // fetch the thread
    firebase
      .firestore()
      .collection("threads")
      .doc(this.id)
      .onSnapshot((doc) => {
        const thread = { ...doc.data(), id: doc.id };
        this.$store.commit("setThread", { thread });

        // fetch the user
        firebase
          .firestore()
          .collection("users")
          .doc(thread.userId)
          .onSnapshot((doc) => {
            const user = { ...doc.data(), id: doc.id };
            this.$store.commit("setUser", { user });
          });

        // fetch the posts
        thread.posts.forEach((postId) => {
          firebase
            .firestore()
            .collection("posts")
            .doc(postId)
            .onSnapshot((doc) => {
              const post = { ...doc.data(), id: doc.id };
              this.$store.commit("setPost", { post });
              // fetch the user for each post
              firebase
                .firestore()
                .collection("users")
                .doc(post.userId)
                .onSnapshot((doc) => {
                  const user = { ...doc.data(), id: doc.id };
                  this.$store.commit("setUser", { user });
                });
            });
        });
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pageshow {
  text-align: center;
  font-size: 20px;
  padding: 1rem 0;
}
.btn {
  text-align: center;
  border-radius: 5px;
  width: 300px;
  background-color: green;
  padding: 10px 30px;
  color: rgb(227, 227, 227);
  margin: auto;
}
.btn:hover {
  background-color: rgb(13, 148, 13);
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
