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
    <div className="bg-white border-l flex flex-col  rounded-2xl shadow p-6">
      <div className="p-4 pt-0 border-b flex justify-between">
        <h2 className="font-semibold flex gap-2">
          <Sparkles size={18} /> AI Assistant (RAG)
        </h2>
        {/* <Button variant="ghost" size="icon" onClick={onClose}>
          <PanelRight size={18} />
        </Button> */}
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-auto max-h-[55dvh]">
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
    </div>
  );
}