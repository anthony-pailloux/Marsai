import { useEffect, useState } from "react";
import { getApiUrl } from "../utils/apiBase.js";
import { getAuthToken, isSelectorFromToken } from "../utils/authToken.js";
import { toast } from "../utils/toast.js";

/** Gère la review sélectionneur sur une vidéo (chargement + sauvegarde). */
export default function useSelectorReview(videoId) {
  const [isSelector, setIsSelector] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [myRating, setMyRating] = useState(10);
  const [myComment, setMyComment] = useState("");

  useEffect(() => {
    const ok = isSelectorFromToken();
    setIsSelector(ok);
    if (!ok) return;

    let alive = true;

    async function loadMyReview() {
      try {
        setReviewLoading(true);

        const token = getAuthToken();
        const res = await fetch(`${getApiUrl()}/videos/${videoId}/review/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Erreur review");

        if (!alive) return;

        if (data?.review) {
          setMyRating(Number(data.review.rating || 10));
          setMyComment(data.review.comment || "");
        } else {
          setMyRating(10);
          setMyComment("");
        }
      } catch (e) {
        if (alive) toast.error(e?.message || "Erreur review");
      } finally {
        if (alive) setReviewLoading(false);
      }
    }

    loadMyReview();
    return () => {
      alive = false;
    };
  }, [videoId]);

  async function saveReview() {
    try {
      setReviewLoading(true);

      const token = getAuthToken();
      const res = await fetch(`${getApiUrl()}/videos/${videoId}/review`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: Number(myRating),
          comment: myComment,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur sauvegarde");

      toast.success("Évaluation enregistrée");
      setReviewOpen(false);
    } catch (e) {
      toast.error(e?.message || "Erreur sauvegarde");
    } finally {
      setReviewLoading(false);
    }
  }

  return {
    isSelector,
    reviewOpen,
    setReviewOpen,
    reviewLoading,
    myRating,
    setMyRating,
    myComment,
    setMyComment,
    saveReview,
  };
}
