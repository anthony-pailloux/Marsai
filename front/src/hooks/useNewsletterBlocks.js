import { useState } from "react";
import { uploadNewsletterImage } from "../services/Admin/newsletterEditorApi.js";

export default function useNewsletterBlocks(onChange) {
  const [blocks, setBlocks] = useState([]);

  function clearFeedback() {
    onChange?.();
  }

  function addBlock(type) {
    const block =
      type === "image"
        ? { type: "image", url: "", alt: "" }
        : { type: "divider" };
    setBlocks((prev) => [...prev, block]);
    clearFeedback();
  }

  function updateBlock(index, patch) {
    setBlocks((prev) =>
      prev.map((b, i) => (i === index ? { ...b, ...patch } : b)),
    );
    clearFeedback();
  }

  function removeBlock(index) {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
    clearFeedback();
  }

  function moveBlock(index, direction) {
    setBlocks((prev) => {
      const next = [...prev];
      const j = index + direction;
      if (j < 0 || j >= next.length) return prev;
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
    clearFeedback();
  }

  async function uploadImage(file, blockIndex) {
    const url = await uploadNewsletterImage(file);
    updateBlock(blockIndex, { url });
  }

  return {
    blocks,
    setBlocks,
    addBlock,
    updateBlock,
    removeBlock,
    moveBlock,
    uploadImage,
  };
}
