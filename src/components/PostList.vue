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
          <div class="col-full">
            <ComentEditor
              v-if="editing === post.id"
              :post="post"
              @save-comment="handleUpdate"
            />
            <p v-else>
              {{ post.text }}
            </p>
          </div>
          <a
            v-if="post.userId === $store.state.auth.authId"
            href="#"
            style="margin-left: auto; padding-left: 10px"
            class="link-unstyled"
            title="Make a change"
            @click.prevent="toggleEditMode(post.id)"
          >
            <faIcon icon="pencil-alt" />
          </a>
        </div>
        <div class="post-date text-faded">
          <div v-if="post.edited?.at" class="edition-info">Edited</div>
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
import ComentEditor from "./ComentEditor.vue";
import { mapActions } from "vuex";
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
  data() {
    return {
      editing: null,
    };
  },
  computed: {
    users() {
      return this.$store.state.users.items;
    },
  },
  methods: {
    ...mapActions("posts", ["updatePost"]),
    userbyId(userId) {
      return this.$store.getters["users/user"](userId);
    },
    toggleEditMode(id) {
      this.editing = id === this.editing ? null : id;
    },
    handleUpdate(event) {
      this.updatePost(event.post);
      this.editing = null;
    },
  },
  components: { ComentEditor },
};
</script>

<style scoped></style>
