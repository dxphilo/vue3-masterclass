<template>
  <div v-if="forum" class="forum">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{ forum.name }}</h1>
          <p class="text-lead">{{ forum.description }}</p>
        </div>
        <router-link
          :to="{ name: 'createThread', params: { forumId: forum.id } }"
          class="btn-green btn-small"
          >Start a thread</router-link
        >
      </div>
    </div>
    <div class="col-full">
      <ThreadList :threads="threads" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ThreadList from "@/components/ThreadList.vue";
import { findById } from "@/helpers";
export default {
  name: "ForumPage",
  components: { ThreadList },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  computed: {
    forum() {
      return findById(this.$store.state.forums, this.id);
    },
    threads() {
      if (!this.forum) return [];
      return this.forum.threads.map((threadId) =>
        this.$store.getters.thread(threadId)
      );
    },
  },
  methods: {
    ...mapActions(["fetchForum", "fetchThreads", "fetchUsers"]),
  },
  async created() {
    const forum = await this.fetchForum({ id: this.id });
    const threads = await this.fetchThreads({ ids: forum.threads });
    this.fetchUsers({ ids: threads.map((thread) => thread.userId) });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
