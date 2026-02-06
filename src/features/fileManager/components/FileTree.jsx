import { useState } from "react";
import { FolderPlus } from "lucide-react";
import FileNode from "./FileNode";

export default function FileTree({
  fileTree = [],
  selected,
  toggleSelect,
  setActivePath,
  createFolder,
  deleteNode,
}) {
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  const root = fileTree[0];
  if (!root) return null;

  const handleCreateRootFolder = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await createFolder({ name, parentId: null });
    setName("");
    setCreating(false);
  };

  return (
    <div className="space-y-2">
      {/* ===== EMPTY STATE ===== */}
      {root.children.length === 0 && (
        <div className="text-sm text-slate-400 italic space-y-3">
          <p>No files yet</p>

          {creating ? (
            <form onSubmit={handleCreateRootFolder} className="flex gap-2">
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Folder name"
                className="flex-1 px-2 py-1 text-sm border rounded-md"
              />
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md"
              >
                Create
              </button>
            </form>
          ) : (
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-1 text-indigo-600 text-sm"
            >
              <FolderPlus size={14} />
              Create folder
            </button>
          )}
        </div>
      )}

      {/* ===== RENDER ROOT CHILDREN ONLY ===== */}
      <ul className="space-y-1 max-w-80">
        {root.children.map((child) => (
          <FileNode
            key={child._id}
            node={child}
            level={0}
            parentPath={[]}
            selected={selected}
            toggleSelect={toggleSelect}
            setActivePath={setActivePath}
            createFolder={createFolder}
            deleteNode={deleteNode}
          />
        ))}
      </ul>
    </div>
  );
}
