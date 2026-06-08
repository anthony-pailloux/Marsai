export default function GallerySearchBar({ value, onChange, placeholder }) {
  return (
    <div className="mb-10 flex justify-center">
      <div className="relative w-full max-w-sm">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full bg-[#EFEAF7] px-6 py-3 pr-12 text-sm text-neutral-800 outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-blue-500/30 dark:bg-white/10 dark:text-white/90 dark:placeholder:text-white/45 dark:ring-1 dark:ring-white/10"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-white/60">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
