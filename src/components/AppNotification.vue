<template>
  <div class="notifications">
    <div
      class="notification"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <span>{{ notification.message }}</span>
      <button @click.prevent="removeNotificaton(notification.id)">X</button>
    </div>
  </div>
</template>

<script>
import useNotification from "@/composables/useNotifications";
export default {
  setup() {
    const { notifications, removeNotificaton, addNotification } =
      useNotification();
    return { notifications, removeNotificaton, addNotification };
  },
};
</script>

<style scoped>
.notifications {
  position: fixed;
  bottom: 20px;
  right: 0;
}
.notification {
  background: white;
  display: flex;
  justify-content: space-between;
  width: 350px;
  box-shadow: 2px 2px 2px 2px rbga(0, 0, 0.5);
  padding: 10px 20px;
  margin-bottom: 5px;
  border-left: 5px solid #263959;
}
</style>
