<template>
  <div v-if="asyncDataStatus_ready" class="col-full">
    <div class="forum">
      <div class="wdml">
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
      </div>
      <div class="wdmr">
        <div class="col-full push-top">
          <ThreadList :threads="threads" />
          <div class="cen">
            <Vpagination
              v-model="page"
              :pages="totalPages"
              active-color="#57AD8D"
              @update:modelValue="updateHandler"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import asyncDataStatus from "@/mixins/AsyncDataStatus";
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
  mixins: [asyncDataStatus],
  data() {
    return {
      page: parseInt(this.$route.query.page) || 1,
      perPage: 10,
    };
  },
  computed: {
    forum() {
      return findById(this.$store.state.forums.items, this.id);
    },
    threads() {
      if (!this.forum) return [];
      return this.$store.state.threads.items
        .filter((thread) => thread.forumId === this.forum.id)
        .map((thread) => this.$store.getters["threads/thread"](thread.id));
    },
    threadCount() {
      return this.forum.threads.length;
    },
    totalPages() {
      if (!this.threadCount) return 0;
      return Math.ceil(this.threadCount / this.perPage);
    },
  },
  methods: {
    ...mapActions("forums", ["fetchForum"]),
    ...mapActions("threads", ["fetchThreadsByPage"]),
    ...mapActions("users", ["fetchUsers"]),
  },
  async created() {
    const forum = await this.fetchForum({ id: this.id });
    const threads = await this.fetchThreadsByPage({
      ids: forum.threads,
      page: this.page,
      perPage: this.perPage,
    });
    await this.fetchUsers({ ids: threads.map((thread) => thread.userId) });
    this.asyncDataStatus_fetched();
  },
  watch: {
    async page() {
      this.$router.push({ query: { page: this.page } });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
