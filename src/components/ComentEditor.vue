<template>
  <div>
    <div class="col-full">
      <form @submit.prevent="submitComment">
        <div class="form-group">
          <textarea
            v-model="postCopy.text"
            name="commentarea"
            id=""
            cols="30"
            rows="10"
            class="form-input"
            placeholder="Enter your coment here ..."
          ></textarea>
          <div class="form-actions">
            <button type="submit">
              {{ post.id ? "Update Post" : "Submit Post" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComentEditor",
  props: {
    post: {
      type: Object,
      default: () => ({ text: null }),
    },
  },
  data() {
    return {
      postCopy: { ...this.post },
    };
  },
  methods: {
    submitComment() {
      if (this.comment.length == 0) {
        alert("Please write something ...");
      } else {
        this.$emit("save-comment", { post: this.postCopy });
        this.postCopy.text = "";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  text-align: center;
  border-radius: 5px;
  background-color: green;
  padding: 10px 30px;
  color: white;
}
button:hover {
  background-color: rgb(13, 148, 13);
  color: white;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
