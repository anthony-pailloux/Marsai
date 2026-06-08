import { useState } from "react";

export default function useCopyToClipboard(resetMs = 1200) {
  const [copied, setCopied] = useState(false);

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetMs);
    } catch {
      // ignore
    }
  }

  return { copied, copy };
}
