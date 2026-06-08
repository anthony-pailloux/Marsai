import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useVideoDetails from "../hooks/useVideoDetails.js";
import useSelectorReview from "../hooks/useSelectorReview.js";
import useCopyToClipboard from "../hooks/useCopyToClipboard.js";
import { SelectorReviewModal } from "../components/Videos/VideoDetailsParts.jsx";
import VideoDetailsHeader from "../components/Videos/VideoDetailsHeader.jsx";
import VideoDetailsMetaRow from "../components/Videos/VideoDetailsMetaRow.jsx";
import VideoDetailsShareBar from "../components/Videos/VideoDetailsShareBar.jsx";
import VideoDetailsSynopsisCard from "../components/Videos/VideoDetailsSynopsisCard.jsx";
import { typePageHero } from "../utils/typography.js";

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

  const { copied, copy } = useCopyToClipboard();

  if (loading) {
    return (
      <div className="py-16 text-center text-neutral-500 dark:bg-neutral-950 dark:text-white/60">
        Chargement…
      </div>
    );
  }

  if (err) {
    return (
      <div className="py-16 text-center text-red-600 dark:bg-neutral-950 dark:text-red-400">
        {err}
      </div>
    );
  }

  if (!video) return null;

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-8">
        <VideoDetailsHeader
          backLabel={t("backToGallery")}
          coverUrl={coverUrl}
          streamUrl={streamUrl}
        />

        <h1
          className={`mt-10 uppercase tracking-tight text-[#2563EB] ${typePageHero}`}
        >
          {title}
        </h1>

        <VideoDetailsMetaRow
          icons={icons}
          directorLabel={tl("director")}
          director={director}
          originLabel={tl("origin")}
          country={country}
          isSelector={isSelector}
          onOpenReview={() => setReviewOpen(true)}
        />

        <VideoDetailsShareBar
          social={social}
          directLinkLabel={tl("directLink")}
          directLink={directLink}
          copied={copied}
          copiedLabel={tl("copied")}
          copyLabel={tl("copy")}
          onCopy={() => copy(directLink)}
        />

        <VideoDetailsSynopsisCard
          icons={icons}
          synopsisLabel={tl("synopsis")}
          techStackLabel={tl("techStackAi")}
          synopsis={synopsis}
          aiTags={aiTags}
        />
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
