import { Sparkles } from "lucide-react";
import { useChat } from "@/features/chat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatPanel({ selectedFileIdList = [] }) {
  const { input, setInput, messages, sendMessage } = useChat(selectedFileIdList);

  return (
    <div className="bg-white border-l flex flex-col rounded-2xl shadow p-6">
      <div className="p-4 pt-0 border-b flex justify-between">
        <h2 className="font-semibold flex gap-2">
          <Sparkles size={18} /> AI Assistant (RAG)
        </h2>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-auto max-h-[55dvh]">
        {messages.map((m) => (
          <ChatMessage
            key={m.id}
            role={m.role}
            content={m.content}
          />
        ))}
      </div>

      <ChatInput value={input} onChange={setInput} onSend={sendMessage} />
    </div>
  );
}