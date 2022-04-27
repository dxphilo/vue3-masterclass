<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-if="available">
        <div v-for="thread in threads" :key="thread.id" class="thread">
          <div>
            <router-link :to="`/thread/${thread.id}`">{{
              thread.title
            }}</router-link>
            <p class="text-faded text-xsmall">
              By <a href="#">{{ userById(thread.userId).name }}</a
              >, <AppDate :timestamp="thread.publishedAt" />.
            </p>
          </div>

          <div class="activity">
            <p class="replies-count">{{ thread.repliesCount }} replies</p>

            <img
              class="avatar-medium"
              :src="userById(thread.userId).avatar"
              alt=""
            />

            <div>
              <p class="text-xsmall">
                <a href="#">{{ userById(thread.userId).name }}</a>
              </p>
              <p class="text-xsmall text-faded">
                <AppDate :timestamp="thread.publishedAt" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findById } from "@/helpers";
export default {
  name: "ThreadList",
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      available: false,
    };
  },
  async created() {
    if (this.threads) {
      this.available = true;
    }
    console.log(this.threads);
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    postById(postId) {
      return findById(this.posts, postId);
    },
    userById(userId) {
      return findById(this.users, userId) || {};
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
