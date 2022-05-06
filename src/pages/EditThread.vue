<template>
  <div v-if="asyncDataStatus_ready">
    <div v-if="thread && text" class="col-full push-top">
      <h1>
        Editing <i>{{ thread.title }}</i>
      </h1>
      <ThreadEditor
        :title="thread.title"
        :text="text"
        @save="save"
        @cancel="cancel"
        @dirty="formIsDirty = true"
        @clean="formIsDirty = false"
      />
    </div>
  </div>
</template>
<script>
import ThreadEditor from "@/components/ThreadEditor.vue";
import { findById } from "@/helpers";
import { mapActions } from "vuex";
import asyncDataStatus from "@/mixins/AsyncDataStatus";
export default {
  components: { ThreadEditor },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formIsDirty: false,
    };
  },
  mixins: [asyncDataStatus],
  computed: {
    thread() {
      return findById(this.$store.state.threads.items, this.id);
    },
    text() {
      const post = findById(
        this.$store.state.posts.items,
        this.thread.posts[0]
      );
      return post ? post.text : "";
    },
  },
  methods: {
    ...mapActions("threads", ["fetchThread", "updateThread"]),
    ...mapActions("posts", ["fetchPost"]),
    async save({ title, text }) {
      await this.updateThread({
        id: this.id,
        title,
        text,
      });
      this.$router.push({ name: "Thread", params: { id: this.id } });
    },
    cancel() {
      this.$router.push({ name: "Thread", params: { id: this.id } });
    },
  },
  async created() {
    const thread = await this.fetchThread({ id: this.id });
    await this.fetchPost({ id: thread.posts[0] });
    this.asyncDataStatus_fetched();
  },
  watcher: {
    form: {
      handler() {
        if (this.form.title !== this.title || this.form.text !== this.text) {
          this.$emit("dirty");
        } else {
          this.$emit("clean");
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
