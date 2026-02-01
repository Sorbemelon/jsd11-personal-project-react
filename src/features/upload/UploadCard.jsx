// UploadCard.jsx
import { Upload } from "lucide-react";
import { useRef } from "react";
import { useUpload } from "./useUpload";
import BreadcrumbPath from "@/features/fileManager/components/BreadcrumbPath";

export default function UploadCard({ activePath }) {
  const inputRef = useRef(null);

  // 🎯 current folder
  const targetFolderId = activePath?.at(-1)?.id ?? null;

  const { uploadFile, uploading } = useUpload({
    parentId: targetFolderId,
  });

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await uploadFile(file);
    e.target.value = "";
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Upload size={18} /> Upload & Transform
      </h2>
      
       <BreadcrumbPath activePath={activePath} />

      <p className="text-sm text-slate-500 mb-4">
        Upload files to the current folder.
      </p>

      <div
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
          ${uploading ? "opacity-50 pointer-events-none" : "hover:border-indigo-400"}
        `}
      >
        <Upload className="mx-auto mb-2 text-slate-400" />
        <p className="text-sm text-slate-600">
          {uploading ? "Uploading..." : "Click to upload file"}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
}
