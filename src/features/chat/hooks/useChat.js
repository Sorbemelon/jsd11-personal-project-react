import { useState } from "react";

export default function useChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Ask me anything about your selected documents."
    }
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input }
    ]);

    // 🔮 placeholder for AI response
    // Later: call backend / stream tokens here
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: "Got it! I'm processing your documents now."
      }
    ]);

    setInput("");
  };

  return {
    input,
    setInput,
    messages,
    sendMessage
  };
}