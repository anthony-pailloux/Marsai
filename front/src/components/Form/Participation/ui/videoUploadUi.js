export const VIDEO_LANGUAGE_CODES = [
  "fr",
  "en",
  "es",
  "it",
  "de",
  "pt",
  "ar",
  "nl",
  "ru",
  "zh",
  "ja",
  "ko",
];

export function videoFileInputClass(uploading) {
  return [
    "w-full rounded-2xl p-4 text-sm outline-none transition",
    "bg-[#E9E9EA] text-neutral-700",
    "dark:bg-neutral-800 dark:text-white",
    uploading ? "opacity-60 cursor-not-allowed" : "",
  ].join(" ");
}
