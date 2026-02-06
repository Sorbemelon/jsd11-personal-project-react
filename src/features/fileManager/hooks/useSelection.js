import { useState, useMemo } from "react";
import { collectIds } from "../utils/treeHelpers";

export default function useSelection() {
  /* All selected node IDs (folders + files) */
  const [selectedNodes, setSelectedNodes] = useState(new Set());

  /* Only selected FILE ids → used for RAG */
  const [selectedFileIds, setSelectedFileIds] = useState(new Set());

  /* Toggle select */
  const toggleSelect = (node) => {
    const nextNodes = new Set(selectedNodes);
    const nextFiles = new Set(selectedFileIds);

    const isFolder = node.type === "folder";

    // files → only toggle itself
    const targets = isFolder ? collectIds(node) : [node];

    const shouldSelect = !nextNodes.has(node._id);

    targets.forEach((n) => {
      const id = n._id;

      if (shouldSelect) {
        nextNodes.add(id);

        // only store FILE ids for RAG
        if (n.type === "file") {
          nextFiles.add(id);
        }
      } else {
        nextNodes.delete(id);
        nextFiles.delete(id);
      }
    });

    setSelectedNodes(nextNodes);
    setSelectedFileIds(nextFiles);
    console.log("TOGGLE NODE:", node.name, node.type);
    console.log("COLLECTED:", collectIds(node));

  };

  /* Remove selection subtree */
  const removeSelection = (node) => {
    const nextNodes = new Set(selectedNodes);
    const nextFiles = new Set(selectedFileIds);

    const targets =
      node.type === "folder" ? collectIds(node) : [node];

    targets.forEach((n) => {
      nextNodes.delete(n._id);
      nextFiles.delete(n._id);
    });

    setSelectedNodes(nextNodes);
    setSelectedFileIds(nextFiles);
  };

  /* Array form → easier for API */
  const selectedFileIdList = useMemo(
    () => Array.from(selectedFileIds),
    [selectedFileIds]
  );

  return {
    selectedNodes,
    selectedFileIds,
    selectedFileIdList,
    toggleSelect,
    removeSelection,
  };
}
