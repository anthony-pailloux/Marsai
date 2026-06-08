import { NEWSLETTER_BLOCK_TEMPLATES } from "../../utils/newsletterEditorUtils.js";

export default function NewsletterBlocksEditor({
  blocks,
  onAddBlock,
  onUpdateBlock,
  onRemoveBlock,
  onMoveBlock,
  onUploadImage,
  onUploadError,
  onUploadSuccess,
}) {
  return (
    <>
      <div className="mt-6">
        <div className="text-xs font-semibold tracking-widest uppercase opacity-70">
          Ajouter
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {NEWSLETTER_BLOCK_TEMPLATES.map((template) => (
            <button
              key={template.type}
              type="button"
              onClick={() => onAddBlock(template.type)}
              className="h-10 rounded-xl border border-black/10 px-3 text-sm font-semibold hover:bg-black/[0.03] dark:border-white/10 dark:hover:bg-white/[0.06]"
            >
              + {template.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="rounded-2xl border border-black/10 p-4 dark:border-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-widest opacity-60">
                {block.type}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onMoveBlock(index, -1)}
                  className="h-9 rounded-xl border border-black/10 px-3 text-xs font-semibold dark:border-white/10"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => onMoveBlock(index, 1)}
                  className="h-9 rounded-xl border border-black/10 px-3 text-xs font-semibold dark:border-white/10"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveBlock(index)}
                  className="h-9 rounded-xl border border-red-500/20 px-3 text-xs font-semibold text-red-700 hover:bg-red-500/10 dark:text-red-400"
                >
                  Suppr
                </button>
              </div>
            </div>

            {block.type === "divider" ? (
              <div className="mt-4 opacity-60">— Divider —</div>
            ) : null}

            {block.type === "image" ? (
              <div className="mt-4 space-y-3">
                <input
                  value={block.url || ""}
                  onChange={(e) => onUpdateBlock(index, { url: e.target.value })}
                  className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/10 dark:bg-black"
                  placeholder="URL de l'image (optionnel)"
                />

                <input
                  value={block.alt || ""}
                  onChange={(e) => onUpdateBlock(index, { alt: e.target.value })}
                  className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/10 dark:bg-black"
                  placeholder="Alt"
                />

                <div className="flex items-center justify-between">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      try {
                        await onUploadImage(file, index);
                        onUploadSuccess?.("Image uploadée");
                      } catch (err) {
                        onUploadError?.(err?.message || "Erreur upload");
                      } finally {
                        e.target.value = "";
                      }
                    }}
                    className="text-xs"
                  />

                  {block.url ? (
                    <a
                      href={block.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold underline opacity-70"
                    >
                      Ouvrir
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        ))}

        {blocks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/20 p-6 text-sm opacity-60 dark:border-white/20">
            Aucun bloc (optionnel). Tu peux ajouter une image ou un divider.
          </div>
        ) : null}
      </div>
    </>
  );
}
