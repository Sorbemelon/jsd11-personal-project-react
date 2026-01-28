import { useState } from "react";
import { Folder, FileText, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import NewFolderInput from "./NewFolderInput";

export default function FileNode({
  node,
  level,
  selected,
  toggleSelect,
  setActivePath,
  parentPath,
  addFolder,
  deleteNode
}) {
  const [open, setOpen] = useState(true);
  const [adding, setAdding] = useState(false);

  const isFolder = node.type === "folder";
  const currentPath = [...parentPath, node];

  return (
    <div style={{ paddingLeft: level * 12 }}>
      <div className="flex items-center gap-1 py-0.5 group">
        <Checkbox
          checked={selected.has(node.id)}
          onCheckedChange={() => toggleSelect(node)}
        />

        {isFolder && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="h-4 w-4 text-xs"
          >
            {open ? "▾" : "▸"}
          </button>
        )}

        {isFolder ? <Folder size={14} /> : <FileText size={14} />}

        <span
          className="cursor-pointer text-sm flex-1"
          onClick={() => setActivePath(currentPath)}
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

        {node.id !== "root" && (
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
          onConfirm={(name) => {
            addFolder(node.id, name);
            setAdding(false);
            setOpen(true);
          }}
          onCancel={() => setAdding(false)}
        />
      )}

      {isFolder &&
        open &&
        node.children?.map((child) => (
          <FileNode
            key={child.id}
            node={child}
            level={level + 1}
            selected={selected}
            toggleSelect={toggleSelect}
            setActivePath={setActivePath}
            parentPath={currentPath}
            addFolder={addFolder}
            deleteNode={deleteNode}
          />
        ))}
    </div>
  );
}