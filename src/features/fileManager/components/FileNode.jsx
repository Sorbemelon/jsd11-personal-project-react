// src/features/fileManager/components/FileNode.jsx
import { useState, useEffect, useMemo, useRef } from "react";
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
  activePath,
  createFolder,
  deleteNode,
}) {
  if (!node || !node.name) return null;

  const [open, setOpen] = useState(true);
  const [adding, setAdding] = useState(false);

  const isFolder = node.type === "folder";
  const currentPath = useMemo(() => [...parentPath, node], [parentPath, node]);
  const isRoot = level === 0;

  const didInitRef = useRef(false);

  /* ================= Selection ================= */

  const isSelected = useMemo(() => {
    return selected instanceof Set && selected.has(node._id);
  }, [selected, node._id]);

  const isIndeterminate = useMemo(() => {
    if (!isFolder || !(selected instanceof Set)) return false;

    const collectDescendantFileIds = (n, list = []) => {
      if (n.type === "file") list.push(n._id);
      n.children?.forEach((c) => collectDescendantFileIds(c, list));
      return list;
    };

    const fileIds = collectDescendantFileIds(node);

    if (fileIds.length === 0) return false;

    const selectedCount = fileIds.filter((id) => selected.has(id)).length;

    return selectedCount > 0 && selectedCount < fileIds.length;
  }, [isFolder, node, selected]);

  /* ================= Default active path ================= */

  useEffect(() => {
    if (didInitRef.current) return;

    if (isRoot && (!activePath || activePath.length === 0)) {
      didInitRef.current = true;
      setActivePath([node]);
    }
  }, [isRoot, activePath, node, setActivePath]);

  /* ================= Click behavior ================= */

  const handleClick = () => {
    if (isFolder) setActivePath(currentPath);
    else setActivePath(parentPath);
  };

  const handleCheckboxChange = (value, e) => {
    e?.stopPropagation?.();
    toggleSelect(node);
  };

  /* ================= Render ================= */

  return (
    <li>
      <div
        className="flex items-center gap-1 py-0.5 group"
        style={{ paddingLeft: level * 12 }}
      >
        <Checkbox
          checked={isIndeterminate ? "indeterminate" : isSelected}
          onCheckedChange={handleCheckboxChange}
        />

        {isFolder && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => !o);
            }}
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
            onClick={(e) => {
              e.stopPropagation();
              setAdding(true);
            }}
          >
            <Plus size={14} />
          </Button>
        )}

        {!isRoot && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              deleteNode(node);
            }}
          >
            <Trash2 size={14} />
          </Button>
        )}
      </div>

      {adding && (
        <NewFolderInput
          onConfirm={async (name) => {
            await createFolder({ name, parentId: node._id });
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
              activePath={activePath}
              createFolder={createFolder}
              deleteNode={deleteNode}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
