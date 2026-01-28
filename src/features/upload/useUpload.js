import { useState } from "react";

export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const uploadFile = async (file) => {
    if (!file) return;

    setUploading(true);

    try {
      // 🔁 Simulate transform → JSON
      await new Promise((res) => setTimeout(res, 800));

      const transformed = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        chunks: Math.floor(Math.random() * 200) + 20,
        updatedAt: new Date().toISOString()
      };

      setUploadedFiles((prev) => [...prev, transformed]);

      return transformed;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    uploadedFiles,
    uploadFile
  };
}