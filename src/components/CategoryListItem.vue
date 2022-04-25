<template>
  <div>
    <ForumList
      v-for="category in categories"
      :key="category.id"
      :forums="getForumCategory(category)"
      :title="category.name"
      :categoryid="category.id"
    />
  </div>
</template>

<script>
import ForumList from "./ForumList.vue";
export default {
  name: "CategoryListItem",
  components: { ForumList },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getForumCategory(category) {
      return this.$store.state.forums.filter(
        (f) => f.categoryId === category.id
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
