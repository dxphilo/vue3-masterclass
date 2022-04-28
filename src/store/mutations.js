import { findById, upsert, docToResource } from "@/helpers";
export default {
  setItem(state, { resource, item }) {
    upsert(state[resource], docToResource(item));
  },
  appendUnsubscribe(state, { unsubscribe }) {
    state.unsubscribes.push(unsubscribe);
  },
  clearAllUnsubscribes(state) {
    state.unsubscribes = [];
  },
  appendPostToThread: appendChildToParentMutation({
    parent: "threads",
    child: "posts",
  }),
  appendThreadToForum: appendChildToParentMutation({
    parent: "forums",
    child: "threads",
  }),
  appendThreadToUser: appendChildToParentMutation({
    parent: "users",
    child: "threads",
  }),
};

function appendChildToParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId);
    if (!resource) {
      console.warn(
        `Appending ${child} ${childId} to ${parent} ${parentId} failed because the parent didn't exist`
      );

      return;
    }
    resource[child] = resource[child] || [];
    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };
}
