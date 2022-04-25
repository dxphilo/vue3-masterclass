<template>
  <span class="post-date text-faded" :title="friendlyDate">
    {{ diff }}
  </span>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
export default {
  name: "AppDate",
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
  },
  computed: {
    diff() {
      return dayjs.unix(this.timestamp).fromNow();
    },
    friendlyDate() {
      return dayjs.unix(this.timestamp).format("llll");
    },
  },
};
</script>

<style scoped></style>
