<template>
  <div>
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post">
        <div v-if="userbyId(post.userId)" class="user-info">
          <a href="#" class="user-name">{{ userbyId(post.userId).name }}</a>

          <a href="#">
            <img
              class="avatar-large"
              :src="userbyId(post.userId).avatar"
              alt=""
            />
          </a>

          <p class="desktop-only text-small">
            {{ userbyId(post.userId).postCount }} Posts
          </p>
          <p class="desktop-only text-small">
            {{ userbyId(post.userId).threadsCount }} Threads
          </p>
        </div>

        <div class="post-content">
          <div>
            <p>
              {{ post.text }}
            </p>
          </div>
          <a
            href="#"
            style="margin-left: auto"
            class="link-unstyled"
            title="Make a change"
            ><i class="fa fa-pencil"
          /></a>
        </div>

        <div class="post-date text-faded">
          <AppDate :timestamp="post.publishedAt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
export default {
  name: "PostList",
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    userbyId(userId) {
      return this.$store.getters.user(userId);
    },
  },
};
</script>

<style scoped></style>
