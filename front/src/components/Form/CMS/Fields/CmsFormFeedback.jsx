export default function CmsFormFeedback({ message, type }) {
  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      className={`w-full rounded-2xl px-5 py-3 text-sm font-semibold ring-1 ${
        isError
          ? "bg-[#DC2626]/15 text-[#DC2626] ring-[#DC2626]/25"
          : "bg-[#1AFF7A]/15 text-[#0f7a3f] ring-[#1AFF7A]/25 dark:text-[#1AFF7A]"
      }`}
      role="status"
    >
      {message}
    </div>
  );
}
