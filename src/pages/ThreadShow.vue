<template>
  <div v-if="asyncDataStatus_ready">
    <p class="pageshow">Welcome to Page Thread Show</p>
    <div v-if="thread.userId === authUser?.id">
      <router-link class="btn" :to="{ name: 'EditThread', id: this.id }"
        >Edit Thread</router-link
      >
    </div>
    <p class="container push-top">
      By <a href="#" class="link-unstyled bd">{{ thread.author?.name }}</a
      >, <AppDate :timestamp="thread.publishedAt" class="bd" />
      <span
        style="float: right; margin-top: 2px; margin-left: 2px:"
        class="hide-mobile text-faded text-small"
      >
        <span class="bd">{{ thread.repliesCount }}</span> replies by
        <span class="bd">{{ thread.contributorsCount }}</span>
        contributors</span
      >
    </p>

    <div class="container">
      <div class="col-large push-top">
        <h1>{{ thread.title }}</h1>
        <PostList :posts="threadPosts" />
        <ComentEditor v-if="authUser" @save-comment="addPost" />
        <div v-else class="text-center" style="margin-bottom: 50px">
          <router-link
            :to="{ name: 'SignIn', query: { redirectTo: $route.path } }"
            >Sign In</router-link
          >
          or
          <router-link
            :to="{ name: 'Register', query: { redirectTo: $route.path } }"
            >Register</router-link
          >
          to reply
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import ComentEditor from "@/components/ComentEditor.vue";
import { mapActions, mapGetters } from "vuex";
import asyncDataStatus from "@/mixins/AsyncDataStatus";
import useNotification from "@/composables/useNotifications";
import difference from "lodash/difference";
export default {
  name: "ThreadShow",
  components: { PostList, ComentEditor },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  setup() {
    const { addNotification } = useNotification();
    return { addNotification };
  },
  mixins: [asyncDataStatus],
  computed: {
    ...mapGetters("auth", ["authUser"]),
    threads() {
      return this.$store.state.threads.items;
    },
    posts() {
      return this.$store.state.posts.items;
    },
    thread() {
      return this.$store.getters["threads/thread"](this.id);
    },
    threadPosts() {
      return this.posts.filter((p) => p.threadId === this.id);
    },
  },
  methods: {
    ...mapActions("threads", ["fetchThread"]),
    ...mapActions("users", ["fetchUsers"]),
    ...mapActions("posts", ["fetchPosts", "createPost"]),
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      };
      this.createPost(post);
    },
    async fetchPostsWithUsers(ids) {
      // fetch the posts
      const posts = await this.fetchPosts({
        ids,
        onSnapshot: ({ isLocal, previousItem }) => {
          console.log(isLocal);
          if (
            !this.asyncDataStatus_ready ||
            isLocal ||
            (previousItem?.edited && !previousItem?.edited?.at)
          )
            return;
          this.addNotification({
            message: "Thread recently updated",
            timeout: 5000,
          });
        },
      });
      // fetch the users associated with the posts
      const users = posts.map((post) => post.userId).concat(this.thread.userId);
      await this.fetchUsers({ ids: users });
    },
  },
  async created() {
    // fetch the thread
    const thread = await this.fetchThread({
      id: this.id,
      onSnapshot: async ({ isLocal, item, previousItem }) => {
        if (!this.asyncDataStatus_ready || isLocal) return;
        const newPosts = difference(item.posts, previousItem.posts);
        const hasNewPosts = newPosts.length > 0;
        if (hasNewPosts) {
          await this.fetchPostsWithUsers(newPosts);
        } else {
          this.addNotification({
            message: "Thread recently updated",
            timeout: 3000,
          });
        }
      },
    });
    await this.fetchPostsWithUsers(thread.posts);
    this.asyncDataStatus_fetched();
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
