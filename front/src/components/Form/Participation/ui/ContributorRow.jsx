export default function ContributorRow({ contributor, onRemove, removeLabel }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-3 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-white">
      <div>
        <span className="font-semibold">{contributor.full_name}</span> —{" "}
        {contributor.profession} — {contributor.email}
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-red-500 hover:underline"
      >
        {removeLabel}
      </button>
    </div>
  );
}
