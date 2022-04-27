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
import { mapActions } from "vuex";
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
    ...mapActions(["createPost", "fetchThread", "fetchPosts", "fetchUsers"]),
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      };
      this.createPost(post);
    },
  },
  async created() {
    // fetch the thread
    const thread = await this.fetchThread({ id: this.id });
    this.fetchUser({
      id: thread.userId,
    });
    const posts = await this.fetchPosts({
      ids: thread.posts,
    });
    const users = posts.map((post) => post.userId).concat(thread.userId);
    this.fetchUsers({ ids: users });
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
