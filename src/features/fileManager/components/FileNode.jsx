import { useState, useEffect } from "react";
import { Folder, FileText, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import NewFolderInput from "./NewFolderInput";

export default function FileNode({
  node,
  level = 0,
  parentPath = [],
  selected,
  toggleSelect,
  setActivePath,
  activePath,          // 👈 pass this in
  createFolder,
  deleteNode,
}) {
  if (!node || !node.name) return null;

  const [open, setOpen] = useState(true);
  const [adding, setAdding] = useState(false);

  const isFolder = node.type === "folder";
  const currentPath = [...parentPath, node];

  const isSelected =
    selected instanceof Set && selected.has(node._id);

  const isRoot = level === 0;

  // ✅ Set default activePath to first node (root only)
  useEffect(() => {
    if (isRoot && (!activePath || activePath.length === 0)) {
      setActivePath([node]);
    }
  }, []);

  const handleClick = () => {
    if (isFolder) {
      setActivePath(currentPath);
    } else {
      // file → set parent folder
      setActivePath(parentPath);
    }
  };

  return (
    <li>
      <div
        className="flex items-center gap-1 py-0.5 group"
        style={{ paddingLeft: level * 12 }}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => toggleSelect(node)}
        />

        {isFolder && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="h-4 w-4 text-base mb-2"
          >
            {open ? "▾" : "▸"}
          </button>
        )}

        {isFolder ? <Folder size={14} /> : <FileText size={14} />}

        <span
          className="cursor-pointer text-sm flex-1 truncate"
          onClick={handleClick}
        >
          {node.name}
        </span>

        {isFolder && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100"
            onClick={() => setAdding(true)}
          >
            <Plus size={14} />
          </Button>
        )}

        {!isRoot && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 text-red-500"
            onClick={() => deleteNode(node)}
          >
            <Trash2 size={14} />
          </Button>
        )}
      </div>

      {adding && (
        <NewFolderInput
          onConfirm={async (name) => {
            await createFolder({
              name,
              parentId: node._id,
            });
            setAdding(false);
            setOpen(true);
          }}
          onCancel={() => setAdding(false)}
        />
      )}

      {isFolder && open && node.children?.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <FileNode
              key={child._id}
              node={child}
              level={level + 1}
              parentPath={currentPath}
              selected={selected}
              toggleSelect={toggleSelect}
              setActivePath={setActivePath}
              activePath={activePath}   // 👈 forward it
              createFolder={createFolder}
              deleteNode={deleteNode}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
