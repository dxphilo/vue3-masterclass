<template>
  <div class="container" style="width: 100%">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <UserProfileCard v-if="!edit" :user="user" />
        <UserProfileEditor v-else :user="user" />
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead">{{ user.username }} recent activity</span>
          <a href="#">See only started threads?</a>
        </div>
      </div>
      <hr />
      <PostList :posts="user.posts" />
    </div>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import UserProfileCard from "@/components/UserProfileCard.vue";
import UserProfileEditor from "@/components/UserProfileEditor.vue";

import { mapGetters } from "vuex";
export default {
  components: { PostList, UserProfileCard, UserProfileEditor },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({ user: "authUser" }),
  },
  async created() {
    await this.$store.dispatch("fetchAuthUsersPosts");
    this.$emit("ready");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
