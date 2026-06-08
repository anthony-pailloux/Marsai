import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useVideoDetails from "../hooks/useVideoDetails.js";
import useSelectorReview from "../hooks/useSelectorReview.js";
import {
  CopyIcon,
  IconImg,
  PillIcon,
  PlayOverlay,
  SelectorReviewModal,
  SocialItem,
} from "../components/Videos/VideoDetailsParts.jsx";
import {
  typeBadge,
  typeBody,
  typeBodySm,
  typeEyebrow,
  typePageHero,
} from "../utils/typography.js";

export default function VideoDetails() {
  const { t } = useTranslation("detailvideo");
  const tl = (key) => t(key, { keyPrefix: "labels" });

  const icons = t("icons", { returnObjects: true }) || {};
  const social = t("social", { returnObjects: true }) || {};

  const { id } = useParams();
  const {
    video,
    loading,
    err,
    title,
    synopsis,
    director,
    country,
    coverUrl,
    streamUrl,
    directLink,
    aiTags,
  } = useVideoDetails(id);

  const {
    isSelector,
    reviewOpen,
    setReviewOpen,
    reviewLoading,
    reviewError,
    myRating,
    setMyRating,
    myComment,
    setMyComment,
    savedMsg,
    saveReview,
  } = useSelectorReview(id);

  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(directLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  if (loading) {
    return (
      <div className="py-16 text-center text-neutral-500 dark:text-white/60 dark:bg-neutral-950">
        Chargement…
      </div>
    );
  }

  if (err) {
    return (
      <div className="py-16 text-center text-red-600 dark:text-red-400 dark:bg-neutral-950">
        {err}
      </div>
    );
  }

  if (!video) return null;

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-8">
        <div className="mb-6">
          <Link
            to="/gallery"
            className={`inline-flex items-center gap-2 rounded-full bg-[#FF8C42] hover:bg-[#E07830] transition-colors px-5 py-2 text-white shadow-sm ${typeBadge}`}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {t("backToGallery")}
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl bg-black shadow-sm ring-1 ring-black/5 dark:ring-white/10">
          <div className="relative">
            <video
              controls
              preload="metadata"
              poster={coverUrl}
              src={streamUrl}
              className="aspect-[16/9] w-full"
            />
            <PlayOverlay />
          </div>
        </div>

        <h1 className={`mt-10 uppercase tracking-tight text-[#2563EB] ${typePageHero}`}>
          {title}
        </h1>

        <div className="mt-6 flex flex-wrap items-start gap-10">
          <div className="flex items-start gap-4">
            <PillIcon>
              <IconImg
                src={icons.user}
                alt={tl("director")}
                className="!h-9 !w-9"
                scale={2.35}
              />
            </PillIcon>

            <div className="flex flex-col gap-1 leading-none">
              <div className={`text-neutral-500 dark:text-white/50 ${typeEyebrow}`}>
                {tl("director")}
              </div>
              <div className={`font-semibold text-neutral-900 dark:text-white ${typeBodySm}`}>
                {director || "—"}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <PillIcon>
              <IconImg
                src={icons.globe}
                alt={tl("origin")}
                className="!h-9 !w-9"
                scale={2.35}
              />
            </PillIcon>

            <div className="flex flex-col gap-1 leading-none">
              <div className={`text-neutral-500 dark:text-white/50 ${typeEyebrow}`}>
                {tl("origin")}
              </div>

              <div className="flex items-center gap-2">
                <IconImg
                  src={icons.globe}
                  alt=""
                  className="block !h-6 !w-6"
                  scale={1}
                />
                <div className={`font-semibold text-neutral-900 dark:text-white ${typeBodySm}`}>
                  {country}
                </div>
              </div>

              {isSelector ? (
                <button
                  type="button"
                  onClick={() => setReviewOpen(true)}
                  className={`mt-3 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2 text-white shadow-sm transition hover:opacity-90 dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-white/10 ${typeBadge}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 17l-5.878 3.09 1.122-6.545L2.49 8.91l6.566-.955L12 2l2.944 5.955 6.566.955-4.755 4.635 1.122 6.545L12 17z"
                      fill="currentColor"
                    />
                  </svg>
                  Noter
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-end gap-8">
          <div className="flex flex-wrap gap-5">
            <SocialItem
              label={social?.x?.label}
              icon={social?.x?.icon}
              href="https://x.com"
            />
            <SocialItem
              label={social?.linkedin?.label}
              icon={social?.linkedin?.icon}
              href="https://www.linkedin.com"
            />
            <SocialItem
              label={social?.instagram?.label}
              icon={social?.instagram?.icon}
              href="https://www.instagram.com"
            />
            <SocialItem
              label={social?.youtube?.label}
              icon={social?.youtube?.icon}
              href="https://www.youtube.com"
            />
            <SocialItem
              label={social?.facebook?.label}
              icon={social?.facebook?.icon}
              href="https://www.facebook.com"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2 sm:ml-6">
            <div className={`text-neutral-500 dark:text-white/50 ${typeEyebrow}`}>
              {tl("directLink")}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <code
                className={`break-all rounded-xl bg-neutral-50 px-3 py-2 text-neutral-800 ring-1 ring-neutral-200 dark:bg-white/10 dark:text-white/85 dark:ring-white/10 ${typeBadge}`}
              >
                {directLink}
              </code>

              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2 text-white shadow-sm dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-white/10 ${typeBadge}`}
              >
                <CopyIcon />
                {copied ? tl("copied") : tl("copy")}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3 text-[#EF4444]">
            <IconImg
              src={icons.book}
              alt={tl("synopsis")}
              className="!h-9 !w-9"
              scale={2.2}
            />
            <h2 className={typeEyebrow}>{tl("synopsis")}</h2>
          </div>

          <p className={`mt-4 max-w-3xl text-neutral-700 dark:text-white/70 ${typeBody}`}>
            {synopsis || "—"}
          </p>

          <div className="mt-8 flex items-center gap-3 text-[#3B82F6]">
            <IconImg
              src={icons.chip}
              alt={tl("techStackAi")}
              className="!h-9 !w-9"
              scale={2.2}
            />
            <h3 className={typeEyebrow}>{tl("techStackAi")}</h3>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {aiTags.length ? (
              aiTags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full bg-neutral-900 px-4 py-1.5 text-white dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-white/10 ${typeBadge}`}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-neutral-500 dark:text-white/60">
                —
              </span>
            )}
          </div>
        </div>
      </div>

      <SelectorReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        reviewLoading={reviewLoading}
        reviewError={reviewError}
        myRating={myRating}
        onRatingChange={setMyRating}
        myComment={myComment}
        onCommentChange={setMyComment}
        savedMsg={savedMsg}
        onSave={saveReview}
      />
    </div>
  );
}
