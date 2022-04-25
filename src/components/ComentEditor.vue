<template>
  <div>
    <div class="col-full">
      <form @submit.prevent="submitComment">
        <div class="form-group">
          <textarea
            v-model="comment"
            name="commentarea"
            id=""
            cols="30"
            rows="10"
            class="form-input"
            placeholder="Enter your coment here ..."
          ></textarea>
          <div class="form-actions">
            <button type="submit">Submit Coment</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComentEditor",
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    submitComment() {
      if (this.comment.length == 0) {
        alert("Please write something ...");
      } else {
        const post = {
          text: this.comment,
        };
        this.comment = "";
        this.$emit("save-comment", { post });
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
