export const findById = (resources, id) => {
  if (!resources) {
    return null;
  } else {
    return resources.find((f) => f.id === id);
  }
};
export const upsert = (resources, resource) => {
  const index = resources.findIndex((p) => p.id === resource.id);
  if (resource.id && index !== -1) {
    resources[index] = resource;
  } else {
    resources.push(resource);
  }
};
