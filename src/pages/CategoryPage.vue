<template>
  <div>
    <h1 class="text-center">{{ category.name }}</h1>
    <forum-list :title="category.name" :forums="getForumsCategory" />
  </div>
</template>

<script>
import ForumList from "@/components/ForumList.vue";
import { findById } from "@/helpers";
import { mapActions } from "vuex";
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
  },
  methods: {
    ...mapActions(["fetchCategory", "fetchForums"]),
    getForumsCategory(category) {
      return this.$store.state.forums.filter(
        (f) => f.categoryId === category.id
      );
    },
  },
  async created() {
    const category = await this.fetchCategory({ id: this.id });
    this.fetchForums({ ids: category.forums });
  },
};
</script>
<style scoped></style>
