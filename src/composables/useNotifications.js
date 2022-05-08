import { reactive } from "vue";
const notifications = reactive([]);

const addNotification = (notification) => {
  notifications.push({
    id: Math.random() + Date.now(),
    ...notification,
  });
};

const removeNotificaton = (id) => {
  const indexNotification = notifications.findIndex((item) => item.id === id);

  notifications.splice(indexNotification, 1);
};
export default function useNotification() {
  return {
    notifications,
    addNotification,
    removeNotificaton,
  };
}
