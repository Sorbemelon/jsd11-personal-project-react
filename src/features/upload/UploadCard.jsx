import { Upload } from "lucide-react";
import { useRef } from "react";
import { useUpload } from "./useUpload";

export default function UploadCard() {
  const inputRef = useRef(null);
  const { uploadFile, uploading } = useUpload();

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

      <p className="text-sm text-slate-500 mb-4">
        Upload files and transform them into structured JSON stored in MongoDB.
      </p>

      <div
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
          ${uploading ? "opacity-50 pointer-events-none" : "hover:border-indigo-400"}
        `}
      >
        <Upload className="mx-auto mb-2 text-slate-400" />
        <p className="text-sm text-slate-600">
          {uploading ? "Uploading..." : "Click or drag file to upload"}
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