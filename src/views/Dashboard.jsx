import { useState } from "react";
import {
  Folder,
  FileText,
  Upload,
  Database,
  Sparkles,
  Send,
  PanelLeft,
  PanelRight,
  ChevronRight,
  Plus,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const initialFileTree = [
  {
    id: "root",
    name: "Home",
    type: "folder",
    children: [
      {
        id: "reports",
        name: "Reports",
        type: "folder",
        children: [
          {
            id: "2025",
            name: "2025",
            type: "folder",
            children: [
              { id: "doc1", name: "report-2025.pdf", type: "file" },
              { id: "doc2", name: "summary.json", type: "file" }
            ]
          }
        ]
      }
    ]
  }
];

// helpers
const collectIds = (node, ids = []) => {
  ids.push(node.id);
  node.children?.forEach((c) => collectIds(c, ids));
  return ids;
};

const removeNodeById = (nodes, id) =>
  nodes
    .filter((n) => n.id !== id)
    .map((n) => ({
      ...n,
      children: n.children ? removeNodeById(n.children, id) : undefined
    }));

function FileNode({
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
            className="h-4 flex items-center justify-center text-lg"
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
            onClick={() => addFolder(node.id)}
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

      {isFolder && open &&
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

export default function Dashboard() {
  const [fileTree, setFileTree] = useState(initialFileTree);
  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [activePath, setActivePath] = useState([initialFileTree[0]]);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", content: "Ask me anything about your selected documents." }
  ]);

  const [showSidebar, setShowSidebar] = useState(true);
  const [showAI, setShowAI] = useState(true);

  // FIXED selection logic
  const toggleSelect = (node) => {
    const next = new Set(selectedNodes);
    const ids = collectIds(node);
    const shouldSelect = !next.has(node.id);

    ids.forEach((id) => {
      if (shouldSelect) next.add(id);
      else next.delete(id);
    });

    setSelectedNodes(next);
  };

  const addFolder = (parentId) => {
    const folderName = window.prompt("Folder name?");
    if (!folderName) return;

    const insert = (nodes) =>
      nodes.map((n) =>
        n.id === parentId
          ? {
              ...n,
              children: [
                ...(n.children || []),
                {
                  id: crypto.randomUUID(),
                  name: folderName,
                  type: "folder",
                  children: []
                }
              ]
            }
          : { ...n, children: n.children ? insert(n.children) : undefined }
      );

    setFileTree(insert(fileTree));
  };

  const deleteNode = (node) => {
    setFileTree(removeNodeById(fileTree, node.id));

    const next = new Set(selectedNodes);
    collectIds(node).forEach((id) => next.delete(id));
    setSelectedNodes(next);
  };

  const handleSend = () => {
    if (!prompt.trim()) return;
    setMessages([...messages, { role: "user", content: prompt }]);
    setPrompt("");
  };

  return (
    <div className="min-h-[calc(100dvh-64px)] flex bg-slate-100">
      {showSidebar && (
        <aside className="w-64 bg-white border-r p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg font-bold">AI File Manager</h1>
            <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)}>
              <PanelLeft size={18} />
            </Button>
          </div>

          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center gap-2 font-medium text-indigo-600">
              <Folder size={16} /> Files
            </div>

            {fileTree.map((node) => (
              <FileNode
                key={node.id}
                node={node}
                level={0}
                selected={selectedNodes}
                toggleSelect={toggleSelect}
                setActivePath={setActivePath}
                parentPath={[]}
                addFolder={addFolder}
                deleteNode={deleteNode}
              />
            ))}
          </div>
        </aside>
      )}

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between">
          {!showSidebar && (
            <Button variant="outline" size="sm" onClick={() => setShowSidebar(true)} className="mb-4">
              <PanelLeft size={16} className="mr-2" /> Show Sidebar
            </Button>
          )}

          {!showAI && (
            <Button variant="outline" size="sm" className="mb-4 ml-auto" onClick={() => setShowAI(true)}>
              <Sparkles size={16} className="mr-2" /> Show AI Assistant
            </Button>
          )}
        </div>

        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            {activePath.map((node, idx) => (
              <BreadcrumbItem key={node.id}>
                <BreadcrumbLink href="#">{node.name}</BreadcrumbLink>
                {idx < activePath.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight size={14} />
                  </BreadcrumbSeparator>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Upload size={18} /> Upload & Transform
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Upload files and transform them into structured JSON stored in MongoDB.
          </p>
          <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-indigo-400 cursor-pointer">
            <Upload className="mx-auto mb-2 text-slate-400" />
            <p className="text-sm text-slate-600">Click or drag file to upload</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database size={18} /> Stored JSON Records
          </h2>
          <table className="w-full text-sm">
            <thead className="border-b text-slate-500">
              <tr>
                <th className="text-left p-3">Document</th>
                <th className="text-left p-3">Chunks</th>
                <th className="text-left p-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50">
                <td className="p-3 flex items-center gap-2">
                  <FileText size={16} /> report-2025.pdf
                </td>
                <td className="p-3">128</td>
                <td className="p-3">2 min ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {showAI && (
        <aside className="w-[380px] bg-white border-l flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              <Sparkles size={18} /> AI Assistant (RAG)
            </h2>
            <Button variant="ghost" size="icon" onClick={() => setShowAI(false)}>
              <PanelRight size={18} />
            </Button>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-auto">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm p-3 rounded-xl max-w-[85%] ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white ml-auto"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex gap-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask using selected documents..."
              className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
            <Button onClick={handleSend}>
              <Send size={18} />
            </Button>
          </div>
        </aside>
      )}
    </div>
  );
}
