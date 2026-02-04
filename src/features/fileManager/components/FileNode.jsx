import { useState, useEffect, useMemo, useRef } from "react";
import { Folder, FileText, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import NewFolderInput from "./NewFolderInput";

/**
 * File tree node with:
 * - recursive folder rendering
 * - proper checkbox selection (supports RAG file selection)
 * - indeterminate folder state
 * - loop-safe default active path
 * - FIXED checkbox propagation bug
 */
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

  /** Prevent infinite default-path loop */
  const didInitRef = useRef(false);

  /* ======================================================
     Selection state
  ====================================================== */

  const isSelected = useMemo(() => {
    return selected instanceof Set && selected.has(node._id);
  }, [selected, node._id]);

  /**
   * IMPORTANT FIX:
   * Folder indeterminate must consider ALL descendants,
   * not just direct children — otherwise selecting 1 deep file
   * makes the whole tree appear selected.
   */
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

  /* ======================================================
     Default active path (root only, run once)
  ====================================================== */

  useEffect(() => {
    if (didInitRef.current) return;

    if (isRoot && (!activePath || activePath.length === 0)) {
      didInitRef.current = true;
      setActivePath([node]);
    }
  }, [isRoot, activePath, node, setActivePath]);

  /* ======================================================
     Click behavior
  ====================================================== */

  const handleClick = () => {
    if (isFolder) setActivePath(currentPath);
    else setActivePath(parentPath);
  };

  /**
   * CRITICAL FIX:
   * Stop checkbox click from bubbling to row click
   * which was triggering unexpected selection cascades.
   */
  const handleCheckboxChange = (e) => {
    e?.stopPropagation?.();
    toggleSelect(node);
  };

  /* ======================================================
     Render
  ====================================================== */

  return (
    <li>
      <div
        className="flex items-center gap-1 py-0.5 group"
        style={{ paddingLeft: level * 12 }}
      >
        {/* Checkbox */}
        <Checkbox
          checked={isIndeterminate ? "indeterminate" : isSelected}
          onCheckedChange={handleCheckboxChange}
        />

        {/* Expand / collapse */}
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

        {/* Icon */}
        {isFolder ? <Folder size={14} /> : <FileText size={14} />}

        {/* Name */}
        <span
          className="cursor-pointer text-sm flex-1 truncate"
          onClick={handleClick}
        >
          {node.name}
        </span>

        {/* Add folder */}
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

        {/* Delete */}
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

      {/* New folder input */}
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

      {/* Children */}
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
