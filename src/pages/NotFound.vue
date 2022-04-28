<template>
  <div class="not-found col-full text-center">
    <h1>Not Found</h1>
    <div class="btn">
      <button @click="goBack">Go back</button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$emit("ready");
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
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
