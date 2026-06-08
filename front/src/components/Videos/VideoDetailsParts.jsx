import {
  typeBadge,
  typeBodySm,
  typeEyebrow,
  typeSectionSubtitle,
} from "../../utils/typography.js";

export function PillIcon({ children }) {
  return (
    <span className="grid !h-14 !w-14 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10">
      {children}
    </span>
  );
}

export function IconImg({ src, alt = "", className = "", scale = 1 }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain ${className}`}
      style={{ transform: `scale(${scale})` }}
      draggable="false"
      loading="lazy"
    />
  );
}

export function PlayOverlay() {
  return (
    <span className="pointer-events-none absolute inset-0 grid place-items-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/75 shadow-sm backdrop-blur dark:bg-black/40 dark:text-white">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M9 7l10 5-10 5V7z" fill="currentColor" />
        </svg>
      </span>
    </span>
  );
}

export function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 9h10v10H9V9z" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SocialItem({ label, icon, href }) {
  if (!href) return null;

  return (
    <div className="flex w-[74px] flex-col items-center gap-2">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="grid !h-14 !w-14 place-items-center rounded-2xl bg-neutral-900 shadow-sm ring-1 ring-black/5 cursor-pointer dark:ring-white/10"
      >
        <IconImg src={icon} alt={label} className="!h-10 !w-10" scale={2.35} />
      </a>
      <div className={`text-neutral-500 dark:text-white/50 ${typeEyebrow}`}>
        {label}
      </div>
    </div>
  );
}

export function SelectorReviewModal({
  open,
  onClose,
  reviewLoading,
  reviewError,
  myRating,
  onRatingChange,
  myComment,
  onCommentChange,
  savedMsg,
  onSave,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl dark:bg-neutral-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={`uppercase tracking-tight ${typeSectionSubtitle}`}>
              NOTER CE FILM
            </h3>
            <p className={`mt-1 text-neutral-600 dark:text-white/60 ${typeBodySm}`}>
              Note de 1 à 10 + commentaire (optionnel)
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:text-white/70 dark:hover:bg-white/10"
            disabled={reviewLoading}
          >
            ✕
          </button>
        </div>

        <div className="mt-6">
          <label className={`text-neutral-500 dark:text-white/50 ${typeEyebrow}`}>
            NOTE (1–10)
          </label>

          <div className="mt-3 flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="10"
              value={myRating}
              onChange={(e) => onRatingChange(e.target.value)}
              className="w-full"
            />
            <span className="w-10 text-center text-lg font-extrabold">
              {myRating}
            </span>
          </div>

          <label className={`mt-6 block text-neutral-500 dark:text-white/50 ${typeEyebrow}`}>
            COMMENTAIRE
          </label>

          <textarea
            value={myComment}
            onChange={(e) => onCommentChange(e.target.value)}
            rows={4}
            placeholder="Ton avis..."
            className="mt-3 w-full rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#FF8C42]/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />

          {reviewError ? (
            <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-300">
              {reviewError}
            </div>
          ) : null}

          {savedMsg ? (
            <div className="mt-4 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-300">
              {savedMsg}
            </div>
          ) : null}

          {!reviewLoading && reviewError ? (
            <div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              Accès réservé aux sélectionneurs
            </div>
          ) : null}

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:text-white/70 dark:hover:bg-white/10"
              disabled={reviewLoading}
            >
              Annuler
            </button>

            <button
              type="button"
              onClick={onSave}
              className="rounded-xl bg-[#FF8C42] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-50"
              disabled={reviewLoading}
            >
              {reviewLoading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
