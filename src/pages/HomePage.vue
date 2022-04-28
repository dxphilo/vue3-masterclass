<template>
  <div class="">
    <div v-if="ready">
      <h1 class="text-center push-top">Welcome to The Forum</h1>
      <CategoryListItem :categories="categories" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CategoryListItem from "@/components/CategoryListItem";
export default {
  components: {
    CategoryListItem,
  },
  data() {
    return {
      ready: false,
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    ...mapActions(["fetchAllCategories", "fetchForums"]),
  },
  async created() {
    const categories = await this.fetchAllCategories();
    const forumIds = categories.map((category) => category.forums).flat();
    await this.fetchForums({ ids: forumIds });
    this.ready = true;
  },
};
</script>
<style scoped></style>
