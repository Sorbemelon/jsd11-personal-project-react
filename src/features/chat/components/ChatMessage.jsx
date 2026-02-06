import clsx from "clsx";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ role, content, sources = [] }) {
  const isUser = role === "user";

  return (
    <div
      className={clsx(
        "text-sm p-3 rounded-2xl max-w-[85%] w-fit shadow-sm leading-relaxed",
        isUser
          ? "bg-indigo-600 text-white ml-auto"
          : "bg-slate-100 text-slate-800"
      )}
    >
      {/* Message text */}
      {isUser ? (
        <div className="whitespace-pre-wrap">{content}</div>
      ) : (
        <ReactMarkdown
          components={{
            h1: ({ ...props }) => (
              <h1 className="text-base font-bold mb-1" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-sm font-bold mb-1" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-sm font-semibold mb-1" {...props} />
            ),
            p: ({ ...props }) => (
              <p className="text-sm mb-1" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="list-disc pl-4 text-sm mb-1" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="list-decimal pl-4 text-sm mb-1" {...props} />
            ),
            li: ({ ...props }) => (
              <li className="mb-0.5" {...props} />
            ),
            strong: ({ ...props }) => (
              <strong className="font-semibold" {...props} />
            ),
            code: ({ inline, ...props }) =>
              inline ? (
                <code
                  className="bg-slate-200 px-1 py-0.5 rounded text-[11px]"
                  {...props}
                />
              ) : (
                <pre className="bg-slate-900 text-white text-[11px] p-2 rounded-lg overflow-auto mb-1">
                  <code {...props} />
                </pre>
              ),
          }}
        >
          {content}
        </ReactMarkdown>
      )}

      {/* RAG sources (AI only) */}
      {!isUser && sources.length > 0 && (
        <div className="mt-2 pt-2 border-t flex flex-wrap gap-1 text-[10px] text-slate-500">
          <span className="font-medium mr-1">Sources:</span>

          {sources.map((s, i) => {
            const key = `${s.fileId || "unknown"}-${i}`;

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
