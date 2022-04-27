<template>
  <div v-if="thread && text" class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>
    <ThreadEditor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>
<script>
import ThreadEditor from "@/components/ThreadEditor.vue";
import { findById } from "@/helpers";
import { mapActions } from "vuex";
export default {
  components: { ThreadEditor },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    thread() {
      return findById(this.$store.state.threads, this.id);
    },
    text() {
      const post = findById(this.$store.state.posts, this.thread.posts[0]);
      return post ? post.text : "";
    },
  },
  methods: {
    ...mapActions(["updateThread", "fetchThread", "fetchPost"]),
    async save({ title, text }) {
      await this.updateThread({
        id: this.id,
        title,
        text,
      });
      this.$router.push({ name: "Thread", params: { id: this.id } });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
  async created() {
    const thread = await this.fetchThread({ id: this.id });
    this.fetchPost({ id: thread.posts[0] });
  },
};
</script>

<style></style>
