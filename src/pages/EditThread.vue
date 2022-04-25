<template>
  <div class="col-full push-top">
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
      return findById(this.$store.state.posts, this.thread.posts[0]).text;
    },
  },
  methods: {
    async save({ title, text }) {
      await this.$store.dispatch("updateThread", {
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
};
</script>

<style></style>
