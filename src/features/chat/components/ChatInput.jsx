import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatInput({ value, onChange, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 border-t flex gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask using selected documents..."
        className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
      />
      <Button onClick={onSend}>
        <Send size={18} />
      </Button>
    </div>
  );
}