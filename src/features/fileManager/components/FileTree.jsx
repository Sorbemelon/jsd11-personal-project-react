import { Folder } from "lucide-react";
import FileNode from "./FileNode";

export default function FileTree(props) {
  const { fileTree } = props;

  return (
    <div className="space-y-2 text-sm text-slate-700">
      {fileTree.map((node) => (
        <FileNode key={node.id} {...props} node={node} level={0} parentPath={[]} />
      ))}
    </div>
  );
}