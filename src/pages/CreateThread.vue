<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>

    <form @submit.prevent="save">
      <div class="form-group">
        <label for="thread_title">Title:</label>
        <input
          v-model="title"
          type="text"
          id="thread_title"
          class="form-input"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea
          v-model="text"
          id="thread_content"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
        ></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-ghost" @click="cancel">Cancel</button>
        <button class="btn btn-blue" type="submit" name="Publish">
          Publish
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { findById } from "@/helpers";
export default {
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
  computed: {
    forum() {
      return findById(this.$store.state.forums, this.forumId);
    },
  },
  methods: {
    async save() {
      const thread = this.$store.dispatch("createThread", {
        forumId: this.forum.id,
        title: this.title,
        text: this.text,
      });
      this.$router.push({ name: "Thread", params: { id: thread.id } });
    },
    cancel() {
      this.$router.push({ name: "forum", params: { id: this.forumId } });
    },
  },
};
</script>

<style></style>
