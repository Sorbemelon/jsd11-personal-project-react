// src/pages/Dashboard.jsx
import { useState } from "react";
import FileTree from "@/features/fileManager/components/FileTree";
import BreadcrumbPath from "@/features/fileManager/components/BreadcrumbPath";
import UploadCard from "@/features/upload/UploadCard";
import ChatPanel from "@/features/chat/components/ChatPanel";
import StoredRecordsTable from "@/features/dataViewer/StoredRecordsTable";
import { Button } from "@/components/ui/button";
import { PanelLeft, Sparkles, Folder } from "lucide-react";

import {
  useFileTree,
  useSelection,
  useBreadcrumb
} from "@/features/fileManager";

export default function Dashboard() {
  /* ======================================================
     FILE TREE (API)
  ====================================================== */
  const {
    fileTree,
    loading: treeLoading,
    createFolder,
    deleteNode,
    fetchTree
  } = useFileTree();

  const {
    selectedNodes,
    toggleSelect,
    removeSelection
  } = useSelection();

  const {
    activePath = [],
    setActivePath,
    activeFolder
  } = useBreadcrumb();

  /* ======================================================
     UI STATE
  ====================================================== */
  const [showSidebar, setShowSidebar] = useState(true);
  const [showAI, setShowAI] = useState(true);

  /* ======================================================
     CHAT (mock)
  ====================================================== */
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", content: "Ask me anything about your selected documents." }
  ]);

  /* ======================================================
     HANDLERS
  ====================================================== */
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

  return (
    <div className="flex min-h-[calc(100dvh-64px)] bg-slate-100">
      {/* ==================================================
         SIDEBAR
      ================================================== */}
      {showSidebar && (
        <aside className="w-64 bg-white border-r p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-medium text-indigo-600">
              <Folder size={16} /> Files
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
            <p className="text-sm text-slate-500">
              Loading folders…
            </p>
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
        </aside>
      )}

      {/* ==================================================
         MAIN
      ================================================== */}
      <main className="flex-1 p-6">
        <div className="flex justify-between">
          {!showSidebar && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSidebar(true)}
              className="mb-4"
            >
              <PanelLeft size={16} className="mr-2" />
              Show Sidebar
            </Button>
          )}

          {!showAI && (
            <Button
              variant="outline"
              size="sm"
              className="mb-4 ml-auto"
              onClick={() => setShowAI(true)}
            >
              <Sparkles size={16} className="mr-2" />
              Show AI Assistant
            </Button>
          )}
        </div>

        {/* ===== Breadcrumb ===== */}
        {/* <BreadcrumbPath activePath={activePath} /> */}

        {/* ===== Upload ===== */}
        <UploadCard
          targetFolder={activeFolder ?? null}
          onUploaded={fetchTree}
          activePath={activePath}
        />

        {/* ===== Data Viewer ===== */}
        <StoredRecordsTable />
      </main>

      {/* ==================================================
         AI PANEL
      ================================================== */}
      {showAI && (
        <ChatPanel
          messages={messages}
          prompt={prompt}
          setPrompt={setPrompt}
          onSend={() => {
            if (!prompt.trim()) return;

            setMessages((prev) => [
              ...prev,
              { role: "user", content: prompt }
            ]);
            setPrompt("");
          }}
          onClose={() => setShowAI(false)}
        />
      )}
    </div>
  );
}
