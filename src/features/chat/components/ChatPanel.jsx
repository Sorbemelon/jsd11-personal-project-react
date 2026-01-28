import { Sparkles, Send, PanelRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat, ChatMessage, ChatInput } from "@/features/chat";

export default function ChatPanel({ onClose }) {
  const {
    input,
    setInput,
    messages,
    sendMessage
  } = useChat();

  return (
    <aside className="w-[380px] bg-white border-l flex flex-col">
      <div className="p-4 border-b flex justify-between">
        <h2 className="font-semibold flex gap-2">
          <Sparkles size={18} /> AI Assistant (RAG)
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <PanelRight size={18} />
        </Button>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-auto">
        {messages.map((m, i) => (
          <ChatMessage
            key={i}
            role={m.role}
            content={m.content}
          />
        ))}
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={sendMessage}
      />
    </aside>
  );
}