import { Sparkles } from "lucide-react";
import { useChat } from "@/features/chat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useEffect, useRef } from "react";

export default function ChatPanel({ selectedFileIdList = [] }) {
  const { input, setInput, messages, sendMessage } = useChat(selectedFileIdList);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white border-l flex flex-col rounded-2xl shadow p-6 min-h-0 flex-1">
      <div className="p-4 pt-0 border-b flex justify-between">
        <h2 className="font-semibold flex gap-2">
          <Sparkles size={18} /> AutumAI Assistant
        </h2>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-auto">
        {messages.map((m) => (
          <ChatMessage key={m.id} role={m.role} content={m.content} />
        ))}

        <div ref={bottomRef} />
      </div>

      <ChatInput value={input} onChange={setInput} onSend={sendMessage} />
    </div>
  );
}
