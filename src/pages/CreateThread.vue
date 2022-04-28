<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>
    <ThreadEditor @save="save" @cancel="cancel" />
  </div>
</template>
<script>
import ThreadEditor from "@/components/ThreadEditor";
import asyncDataStatus from "@/mixins/AsyncDataStatus";
import { findById } from "@/helpers";
import { mapActions } from "vuex";
export default {
  components: { ThreadEditor },
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      title: "",
      text: "",
    };
  },
  mixins: [asyncDataStatus],
  computed: {
    forum() {
      return findById(this.$store.state.forums, this.forumId);
    },
  },
  methods: {
    ...mapActions(["fetchForum", "createThread"]),
    async save({ title, text }) {
      const thread = await this.createThread({
        forumId: this.forum.id,
        title,
        text,
      });
      this.$router.push({ name: "Thread", params: { id: thread.id } });
    },
    cancel() {
      this.$router.push({ name: "forum", params: { id: this.forumId } });
    },
  },
  async created() {
    await this.fetchForum({ id: this.forumId });
    this.asyncDataStatus_fetched();
  },
};
</script>

<style></style>
