// src/features/upload/useUpload.js
import { useState } from "react";
import api from "@/lib/api";

export function useUpload({ parentId = null } = {}) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const uploadFile = async (file) => {
    if (!file || uploading) return;

    const formData = new FormData();
    formData.append("file", file);

    // 📁 target folder (null = root)
    if (parentId) {
      formData.append("parentId", parentId);
    }

    setUploading(true);

    try {
      const res = await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      /**
       * Expected backend response shape (example):
       * {
       *   file: {
       *     _id,
       *     name,
       *     size,
       *     mimeType,
       *     parentId,
       *     createdAt,
       *     updatedAt
       *   }
       * }
       */
      const uploaded = res.data.file;

      // ➕ optimistic local state (for tables, previews, etc.)
      setUploadedFiles((prev) => [...prev, uploaded]);

      return uploaded;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    uploadedFiles,
    uploadFile,
  };
}
