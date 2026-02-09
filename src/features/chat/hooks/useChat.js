import { useState, useRef } from "react";
import api from "@/lib/api";

const createMessage = (role, content, extra = {}) => ({
  id: crypto.randomUUID(),
  role,
  content,
  ...extra,
});

export default function useChat(selectedFileIdList = []) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    createMessage("ai", "Ask me anything about your selected documents."),
  ]);
  const [loading, setLoading] = useState(false);

  const sendingRef = useRef(false);

  const sendMessage = async () => {
    const question = input.trim();
    if (!question || loading || sendingRef.current) return;

    sendingRef.current = true;
    setLoading(true);

    // push user message with ID
    const userMsg = createMessage("user", question);
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // temporary thinking message
    const thinkingId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { id: thinkingId, role: "ai", content: "Thinking..." },
    ]);

    try {
      const { data } = await api.post("/chat", {
        message: question,
        fileIds: selectedFileIdList,
      });

      const answer = data?.data?.answer || "No response from AI.";
      const sources = data?.data?.sources || [];

      // replace thinking message
      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingId
            ? createMessage("ai", answer, { sources })
            : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingId
            ? createMessage(
                "ai",
                "⚠️ Failed to get AI response. Please try again."
              )
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
