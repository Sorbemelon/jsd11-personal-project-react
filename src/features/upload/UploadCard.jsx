// src/features/upload/UploadCard.jsx
import { Upload, PanelRight } from "lucide-react";
import { useRef } from "react";
import { useUpload } from "./useUpload";
import BreadcrumbPath from "@/features/fileManager/components/BreadcrumbPath";
import { Button } from "@/components/ui/button";

/**
 * UploadCard
 * - Uploads file to current active folder
 * - Calls onUploaded AFTER successful upload
 *   so parent can refresh the file tree
 */
export default function UploadCard({ activePath = [], onClose, onUploaded }) {
  const inputRef = useRef(null);

  // 🎯 current folder
  const currentFolder = activePath.at(-1) ?? null;
  const parentId = currentFolder?._id ?? null;

  const { uploadFile, uploading } = useUpload({ parentId });

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadFile(file);

      // ✅ notify parent to refetch tree
      await onUploaded?.();
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 pt-2 mb-6 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Upload size={18} /> Upload & Transform
        </h2>

        <Button variant="ghost" size="icon" onClick={onClose}>
          <PanelRight size={18} />
        </Button>
      </div>

      <BreadcrumbPath activePath={activePath} />

      <div
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition flex items-center justify-center
          ${
            uploading
              ? "opacity-50 pointer-events-none"
              : "hover:border-indigo-400"
          }
        `}
      >
        <Upload className="text-slate-400" />
        <p className="text-sm text-slate-600">
          {uploading
            ? "Uploading..."
            : "Click here to upload file to the current folder"}
        </p>
      </div>

      <input ref={inputRef} type="file" hidden onChange={handleFileChange} />
    </div>
  );
}