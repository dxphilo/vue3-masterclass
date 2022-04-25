export const findById = (resources, id) => {
  return resources.find((f) => f.id === id);
};
