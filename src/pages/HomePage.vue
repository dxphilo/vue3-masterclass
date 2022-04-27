<template>
  <div class="">
    <p class="text-center push-top">Welcome to The Forum</p>
    <CategoryListItem :categories="categories" />
  </div>
</template>

<script>
import { useStore, mapActions } from "vuex";
import { computed } from "vue";
import CategoryListItem from "@/components/CategoryListItem";
export default {
  components: {
    CategoryListItem,
  },
  setup() {
    const store = useStore();

    const categories = computed(() => {
      return store.state.categories;
    });

    return {
      categories,
    };
  },
  methods: {
    ...mapActions(["fetchAllCategories", "fetchForums"]),
  },
  async created() {
    const categories = await this.fetchAllCategories();
    const forumIds = categories.map((category) => category.forums).flat();
    this.fetchForums({ ids: forumIds });
  },
};
</script>
<style scoped></style>
