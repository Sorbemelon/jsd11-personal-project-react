import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

// NORMALIZER
const normalizeNode = (node) => ({
  _id: node._id,
  name: node.name,
  type: node.type,

  // ALWAYS NORMALIZE STORAGE.KEY
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

  // FETCH TREE
  const fetchTree = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/folders/tree", {
        params: rootFolderId ? { folderId: rootFolderId } : undefined,
      });

      const normalizedRoot = normalizeNode(res.data.data);
      setFileTree([normalizedRoot]);
    } catch (err) {
      console.error("Failed to fetch file tree:", err);

      const message =
        err?.response?.data?.message || "Failed to load file tree";

      setError(message);
      setFileTree([]);

      // toast error
      toast.error("File tree error", { description: message });
    } finally {
      setLoading(false);
    }
  }, [rootFolderId]);

  useEffect(() => {
    fetchTree();
  }, [fetchTree]);

  // CREATE FOLDER
  const createFolder = async ({ name, parentId = null }) => {
    if (!name?.trim()) return;

    try {
      await api.post("/folders", { name, parentId });
      await fetchTree();

      toast.success("Folder created", {
        description: `"${name}" has been added successfully.`,
      });
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to create folder";

      toast.error("Create failed", { description: message });
    }
  };

  // DELETE NODE
  const deleteNode = async (id, type) => {
    if (!id) return;

    try {
      if (type === "folder") {
        await api.delete(`/folders/${id}`);
      } else {
        await api.delete(`/files/${id}`);
      }

      await fetchTree();

      toast.success(`${type === "folder" ? "Folder" : "File"} deleted`);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to delete";

      toast.error("Delete failed", { description: message });
    }
  };

  // MOVE NODE
  const moveNode = async ({ id, type, targetParentId }) => {
    if (!id) return;

    try {
      const url =
        type === "folder"
          ? `/folders/${id}/move`
          : `/files/${id}/move`;

      await api.patch(url, { targetParentId });
      await fetchTree();

      toast.success(`${type === "folder" ? "Folder" : "File"} moved`);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to move";

      toast.error("Move failed", { description: message });
    }
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
