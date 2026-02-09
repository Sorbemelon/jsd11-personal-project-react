import { useState } from "react";
import FileTree from "@/features/fileManager/components/FileTree";
import UploadCard from "@/features/upload/UploadCard";
import ChatPanel from "@/features/chat/components/ChatPanel";
import StoredRecordsTable from "@/features/dataViewer/StoredRecordsTable";
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelRight, Folder } from "lucide-react";

import {
  useFileTree,
  useSelection,
  useBreadcrumb,
} from "@/features/fileManager";

export default function Dashboard() {
  /* FILE TREE (API) */
  const {
    fileTree,
    loading: treeLoading,
    createFolder,
    deleteNode,
    fetchTree,
  } = useFileTree();

  const { selectedNodes, selectedFileIdList, toggleSelect, removeSelection } =
    useSelection();

  const { activePath = [], setActivePath } = useBreadcrumb();

  /* UI STATE */
  const [showSidebar, setShowSidebar] = useState(true);
  const [showUpload, setShowUpload] = useState(true);

  /* CHAT */
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "ai",
      content: "Ask me about your selected documents.",
    },
  ]);

  /* HANDLERS */
  const handleDelete = async (node) => {
    if (!node) return;

    const label = node.type === "folder" ? "folder" : "file";

    const confirmed = window.confirm(
      `Are you sure you want to delete this ${label}?\n\n"${node.name}"\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    await deleteNode(node._id, node.type);
    removeSelection(node);
  };

  const handleSendMessage = () => {
    if (!prompt.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: prompt,
      },
    ]);

    setPrompt("");
  };

  return (
    <div className="flex h-full bg-slate-100 overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`
          bg-white border-r
          transition-all duration-300 ease-in-out absolute md:static
          ${
            showSidebar
              ? "min-w-fit w-72 max-w-90 opacity-100"
              : "w-0 opacity-0"
          }
          overflow-auto
        `}
      >
        <div className="p-4 min-w-fit w-72 max-w-90">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-medium text-indigo-600">
              <Folder size={16} /> Sources for AI
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(false)}
            >
              <PanelLeft size={18} />
            </Button>
          </div>

          {treeLoading ? (
            <p className="text-sm text-slate-500">Loading folders…</p>
          ) : (
            <FileTree
              fileTree={fileTree}
              selected={selectedNodes}
              toggleSelect={toggleSelect}
              setActivePath={setActivePath}
              createFolder={createFolder}
              deleteNode={handleDelete}
            />
          )}
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col p-6 min-h-0 h-">
        <div className="flex justify-between gap-6">
          {!showSidebar && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSidebar(true)}
              className="mb-4"
            >
              <PanelLeft size={16} className="mr-2" />
              Files
            </Button>
          )}

          {!showUpload && (
            <Button
              variant="outline"
              size="sm"
              className="mb-4 ml-auto"
              onClick={() => setShowUpload(true)}
            >
              Upload & Transform
              <PanelRight size={14} />
            </Button>
          )}
        </div>

        {/* Upload */}
        <div
          className={`
            transition-all duration-300 ease-in-out overflow-hidden
            ${showUpload ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="transform transition-all duration-300 ease-in-out">
            <UploadCard
              activePath={activePath}
              onUploaded={fetchTree}
              onClose={() => setShowUpload(false)}
            />
          </div>
        </div>

        {/* ===== Data Viewer ===== */}
        {/* <StoredRecordsTable /> */}

        <ChatPanel
          messages={messages}
          prompt={prompt}
          setPrompt={setPrompt}
          selectedFileIdList={selectedFileIdList}
          onSend={handleSendMessage}
        />
      </main>
    </div>
  );
}
