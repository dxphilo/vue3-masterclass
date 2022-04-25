<template>
  <div class="">
    <p class="text-center push-top">Welcome to The Forum</p>
    <CategoryListItem :categories="categories" />
  </div>
</template>

<script>
import { useStore } from "vuex";
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
};
</script>
<style scoped></style>
