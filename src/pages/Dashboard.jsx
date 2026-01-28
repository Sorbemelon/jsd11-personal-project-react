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

// Mock initailFileTree
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



export default function Dashboard() {
  const { fileTree, addFolder, deleteNode } = useFileTree(initialFileTree);
  const { selectedNodes, toggleSelect, removeSelection } = useSelection();
  const { activePath, setActivePath } = useBreadcrumb(initialFileTree[0]);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", content: "Ask me anything about your selected documents." }
  ]);

  const [showSidebar, setShowSidebar] = useState(true);
  const [showAI, setShowAI] = useState(true);

  const handleDelete = (node) => {
    deleteNode(node.id);   // remove from tree
    removeSelection(node); // clean selection state
  };

  return (
    <div className="flex min-h-[calc(100dvh-64px)] bg-slate-100">
      {showSidebar && (
        <aside className="w-64 bg-white border-r p-4">
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-medium text-indigo-600">
              <Folder size={16} /> Files
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)}>
              <PanelLeft size={18} />
            </Button>
          </div>

          <FileTree
            fileTree={fileTree}
            selected={selectedNodes}
            toggleSelect={toggleSelect}
            setActivePath={setActivePath}
            addFolder={addFolder}
            deleteNode={handleDelete}
          />
        </aside>
      )}

      <main className="flex-1 p-6">
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

        <BreadcrumbPath activePath={activePath} />
        <UploadCard />
        <StoredRecordsTable />
      </main>

      {showAI && (
        <ChatPanel
          messages={messages}
          prompt={prompt}
          setPrompt={setPrompt}
          onSend={() => setMessages([...messages, { role: "user", content: prompt }])}
          onClose={() => setShowAI(false)}
        />
      )}
    </div>
  );
}