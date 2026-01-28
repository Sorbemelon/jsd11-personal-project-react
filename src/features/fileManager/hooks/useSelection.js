import { useState } from "react";
import { collectIds } from "../utils/treeHelpers";

export default function useSelection() {
  const [selectedNodes, setSelectedNodes] = useState(new Set());

  const toggleSelect = (node) => {
    const next = new Set(selectedNodes);
    const ids = collectIds(node);
    const shouldSelect = !next.has(node.id);

    ids.forEach((id) => {
      if (shouldSelect) next.add(id);
      else next.delete(id);
    });

    setSelectedNodes(next);
  };

  const removeSelection = (node) => {
    const next = new Set(selectedNodes);
    collectIds(node).forEach((id) => next.delete(id));
    setSelectedNodes(next);
  };

  return {
    selectedNodes,
    toggleSelect,
    removeSelection
  };
}