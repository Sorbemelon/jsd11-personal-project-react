import clsx from "clsx";

export default function ChatMessage({ role, content, sources = [] }) {
  const isUser = role === "user";

  return (
    <div
      className={clsx(
        "text-sm p-3 rounded-2xl max-w-[85%] w-fit shadow-sm",
        isUser
          ? "bg-indigo-600 text-white ml-auto"
          : "bg-slate-100 text-slate-800"
      )}
    >
      {/* Message text */}
      <div className="whitespace-pre-wrap">{content}</div>

      {/* RAG sources (AI only) */}
      {!isUser && sources.length > 0 && (
        <div className="mt-3 pt-2 border-t flex flex-wrap gap-1 text-[11px] text-slate-500">
          <span className="font-medium mr-1">Sources:</span>

          {sources.map((s, i) => {
            const key = `${s.fileId || "unknown"}-${i}`; // ✅ guaranteed unique

            return (
              <span
                key={key}
                className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700"
              >
                {s.fileId || "unknown"}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
