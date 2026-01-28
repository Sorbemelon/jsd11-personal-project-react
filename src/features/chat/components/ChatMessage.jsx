import clsx from "clsx";

export default function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={clsx(
        "text-sm p-3 rounded-xl max-w-[85%]",
        isUser
          ? "bg-indigo-600 text-white ml-auto"
          : "bg-slate-100 text-slate-700"
      )}
    >
      {content}
    </div>
  );
}