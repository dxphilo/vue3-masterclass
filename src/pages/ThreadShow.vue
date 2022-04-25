<template>
  <div>
    <p class="pageshow">Welcome to Page Thread Show</p>
    <div class="btn">
      <button @click="goBack">Go back</button>
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
      return this.threads.find((thread) => thread.id == this.$route.params.id);
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
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pageshow {
  text-align: center;
  font-size: 20px;
}
button {
  text-align: center;
  border-radius: 5px;
  background-color: green;
  padding: 10px 30px;
  color: white;
}
button:hover {
  background-color: rgb(13, 148, 13);
  color: white;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
