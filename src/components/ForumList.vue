<template>
  <div class="col-full">
    <div class="forum-list">
      <div class="list-title">
        <router-link
          v-if="categoryid"
          :to="{ name: 'Category', params: { id: categoryid } }"
          >{{ title }}</router-link
        >
        <span v-else>{{ title }}</span>
      </div>

      <div class="forum-listing" v-for="forum in forums" :key="forum.id">
        <div class="forum-details">
          <router-link
            :to="{ name: 'ForumPage', params: { id: forum.id } }"
            class="text-xlarge"
          >
            {{ forum.name }}
          </router-link>
          <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
          <p>
            <span class="count">{{ forum.threads?.length }}</span>
            {{ forumThreadsWord(forum) }}
          </p>
        </div>

        <div class="last-thread"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForumList",
  props: {
    forums: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: "Forums",
    },
    categoryid: {
      required: false,
      type: String,
    },
  },
  methods: {
    forumThreadsWord(forum) {
      if (forum.threads?.length) {
        return forum.threads.length > 1 ? "threads" : "thread";
      } else {
        return "No threads";
      }
    },
  },
};
</script>

<style scoped></style>
