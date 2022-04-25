export const findById = (resources, id) => {
  return resources.find((f) => f.id === id);
};
export const upsert = (resource, spec) => {
  const index = resource.findIndex((n) => n.id === spec.id);
  if (spec.id && index !== -1) {
    return (resource[index] = spec);
  } else {
    return resource.push(spec);
  }
};
