import { Upload, PanelRight } from "lucide-react";
import { useRef } from "react";
import { useUpload } from "./useUpload";
import BreadcrumbPath from "@/features/fileManager/components/BreadcrumbPath";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function UploadCard({ activePath = [], onClose, onUploaded }) {
  const inputRef = useRef(null);

  const currentFolder = activePath.at(-1) ?? null;
  const parentId = currentFolder?._id ?? null;

  const { uploadFile, uploading } = useUpload({ parentId });

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadFile(file);
      await onUploaded?.();

      // Sonner success toast
      toast.success("Upload complete", {
        description: `${file.name} was uploaded and processed successfully.`,
      });
    } catch (err) {
      // Sonner error toast
      toast.error("Upload failed", {
        description:
          err?.response?.data?.message ||
          "Something went wrong while uploading the file.",
      });
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 pt-2 mb-6 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-1">
          <Upload size={18} /> Upload & Transform
        </h2>

        <Button variant="ghost" size="icon" onClick={onClose}>
          <PanelRight size={18} />
        </Button>
      </div>

      <BreadcrumbPath activePath={activePath} />

      <div
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition flex items-center gap-1 justify-center
          ${uploading ? "opacity-50 pointer-events-none" : "hover:border-indigo-400"}
        `}
      >
        <Upload className="text-slate-400" />
        <p className="text-sm text-slate-600">
          {uploading
            ? "Uploading & Processing..."
            : "Click here to upload file to the current folder (max size 10 MB)"}
        </p>
      </div>

      <input ref={inputRef} type="file" hidden onChange={handleFileChange} />
    </div>
  );
}
