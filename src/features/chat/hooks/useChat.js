import { useState, useRef } from "react";
import api from "@/lib/api";

export default function useChat(selectedFileIdList = []) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Ask me anything about your selected documents.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // prevent race conditions if user sends quickly
  const sendingRef = useRef(false);

  const sendMessage = async () => {
    const question = input.trim();
    if (!question || loading || sendingRef.current) return;

    sendingRef.current = true;
    setLoading(true);

    // push user message immediately
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");

    // show temporary thinking message
    const thinkingId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: thinkingId, role: "ai", content: "Thinking..." },
    ]);

    try {
      // call backend RAG chat endpoint
      const { data } = await api.post("/chat", {
        message: question,
        fileIds: selectedFileIdList,
      });

      const answer = data?.data?.answer || "No response from AI.";
      const sources = data?.data?.sources || [];

      // replace thinking message with real answer
      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingId
            ? { role: "ai", content: answer, sources }
            : m
        )
      );
    } catch (err) {
      // replace thinking with error message
      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingId
            ? {
                role: "ai",
                content: "⚠️ Failed to get AI response. Please try again.",
              }
            : m
        )
      );
    } finally {
      sendingRef.current = false;
      setLoading(false);
    }
  };

  return {
    input,
    setInput,
    messages,
    sendMessage,
    loading,
  };
}
