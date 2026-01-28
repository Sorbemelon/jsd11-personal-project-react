export const collectIds = (node, ids = []) => {
  ids.push(node.id);
  node.children?.forEach((c) => collectIds(c, ids));
  return ids;
};

export const removeNodeById = (nodes, id) =>
  nodes
    .filter((n) => n.id !== id)
    .map((n) => ({
      ...n,
      children: n.children ? removeNodeById(n.children, id) : undefined
    }));