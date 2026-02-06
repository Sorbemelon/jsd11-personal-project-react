/* node selection management */
export const collectIds = (node, list = []) => {
  if (!node) return list;

  list.push(node); // push original reference

  node.children?.forEach((child) => collectIds(child, list));

  return list;
};

/* Remove node by MongoDB _id from tree */
export const removeNodeById = (nodes, id) =>
  nodes
    .filter((n) => n._id !== id)
    .map((n) => ({
      ...n,
      children: n.children ? removeNodeById(n.children, id) : undefined,
    }));
