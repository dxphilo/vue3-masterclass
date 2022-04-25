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
import { findById } from "@/helpers";
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
      return findById(this.threads, this.$route.params.id);
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
