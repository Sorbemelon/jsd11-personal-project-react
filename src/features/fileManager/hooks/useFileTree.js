import { useState } from "react";
import { removeNodeById } from "../utils/treeHelpers";

export default function useFileTree(initialTree) {
  const [fileTree, setFileTree] = useState(initialTree);

  const addFolder = (parentId, folderName) => {
    if (!folderName) return;

    const insert = (nodes) =>
      nodes.map((n) =>
        n.id === parentId
          ? {
              ...n,
              children: [
                ...(n.children || []),
                {
                  id: crypto.randomUUID(),
                  name: folderName,
                  type: "folder",
                  children: []
                }
              ]
            }
          : { ...n, children: n.children ? insert(n.children) : undefined }
      );

    setFileTree((prev) => insert(prev));
  };

  const deleteNode = (nodeId) => {
    setFileTree((prev) => removeNodeById(prev, nodeId));
  };

  return {
    fileTree,
    addFolder,
    deleteNode,
    setFileTree
  };
}