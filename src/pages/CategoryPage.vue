<template>
  <div>
    <h1 class="text-center">{{ category.name }}</h1>
    <forum-list :title="category.name" :forums="getForumCategory" />
  </div>
</template>

<script>
import ForumList from "@/components/ForumList.vue";
import { findById } from "@/helpers";
export default {
  components: { ForumList },
  name: "CategoryPage",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    category() {
      return findById(this.$store.state.categories, this.id);
    },
    getForumCategory(category) {
      return this.$store.state.forums.filter(
        (f) => f.categoryId === category.id
      );
    },
  },
};
</script>
<style scoped></style>
