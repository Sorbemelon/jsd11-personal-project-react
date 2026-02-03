// src/features/fileManager/hooks/useFileTree.js
import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";

/* ======================================================
   NORMALIZER (CRITICAL)
====================================================== */
const normalizeNode = (node) => ({
  _id: node._id,
  name: node.name,
  type: node.type,

  // ✅ ALWAYS NORMALIZE STORAGE.KEY
  storage: {
    key: node.storage?.key ?? "",
  },

  children: Array.isArray(node.children)
    ? node.children.map(normalizeNode)
    : [],
});

export default function useFileTree({ rootFolderId = null } = {}) {
  const [fileTree, setFileTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ======================================================
     FETCH TREE
  ====================================================== */
  const fetchTree = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/folders/tree", {
        params: rootFolderId ? { folderId: rootFolderId } : undefined,
      });

      // Backend already returns a root node
      const normalizedRoot = normalizeNode(res.data.data);

      // ✅ KEEP ROOT (do NOT wrap again)
      setFileTree([normalizedRoot]);
    } catch (err) {
      console.error("Failed to fetch file tree:", err);
      setError("Failed to load file tree");
      setFileTree([]);
    } finally {
      setLoading(false);
    }
  }, [rootFolderId]);

  useEffect(() => {
    fetchTree();
  }, [fetchTree]);

  /* ======================================================
     MUTATIONS
  ====================================================== */

  const createFolder = async ({ name, parentId = null }) => {
    if (!name?.trim()) return;

    await api.post("/folders", { name, parentId });
    await fetchTree();
  };

  const deleteNode = async (id, type) => {
    if (!id) return;

    if (type === "folder") {
      await api.delete(`/folders/${id}`);
    } else {
      await api.delete(`/files/${id}`);
    }

    await fetchTree();
  };

  const moveNode = async ({ id, type, targetParentId }) => {
    if (!id) return;

    const url =
      type === "folder"
        ? `/folders/${id}/move`
        : `/files/${id}/move`;

    await api.patch(url, { targetParentId });
    await fetchTree();
  };

  return {
    fileTree,
    loading,
    error,
    fetchTree,
    createFolder,
    deleteNode,
    moveNode,
  };
}
