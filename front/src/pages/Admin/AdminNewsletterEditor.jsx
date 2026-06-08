import { useNavigate, useParams } from "react-router-dom";
import NewsletterCkEditor from "../../components/newsletter/NewsletterCkEditor.jsx";
import NewsletterBlocksEditor from "../../components/admin/NewsletterBlocksEditor.jsx";
import useNewsletterEditor from "../../hooks/useNewsletterEditor.js";
import { typeAdminTitle } from "../../utils/typography.js";

export default function AdminNewsletterEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editor = useNewsletterEditor(id);

  if (editor.loading) {
    return (
      <div className="mx-auto w-full px-6 pb-14 pt-10">
        <main className="min-w-0 flex-1">
          <div className="mt-10 opacity-70">Chargement…</div>
        </main>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-6 pb-14 pt-10">
      <main className="min-w-0">
        <div className="mt-10 flex items-center justify-between">
          <h1 className={typeAdminTitle}>NEWSLETTER #{id}</h1>

          <button
            onClick={() => navigate("/admin/newsletters")}
            className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold dark:border-white/10"
          >
            ← Retour
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[520px_1fr]">
          <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
            <label className="text-xs font-semibold tracking-widest uppercase opacity-70">
              Subject
            </label>
            <input
              value={editor.subject}
              onChange={(e) => editor.setSubject(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/10 dark:bg-black"
            />

            <label className="mt-6 block text-xs font-semibold tracking-widest uppercase opacity-70">
              Titre (optionnel)
            </label>
            <input
              value={editor.title}
              onChange={(e) => editor.setTitle(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/10 dark:bg-black"
            />

            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase opacity-70">
                  Background
                </div>
                <div className="mt-1 text-xs opacity-60">{editor.background}</div>
              </div>

              <input
                type="color"
                value={editor.background}
                onChange={(e) => editor.setBackground(e.target.value)}
                className="h-10 w-16 rounded-lg border border-black/10 bg-transparent dark:border-white/10"
              />
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold tracking-widest uppercase opacity-70">
                Contenu (CKEditor)
              </div>
              <div className="mt-3">
                <NewsletterCkEditor
                  value={editor.contentHtml}
                  onChange={editor.setContentHtml}
                />
              </div>
            </div>

            <NewsletterBlocksEditor
              blocks={editor.blocks}
              onAddBlock={editor.addBlock}
              onUpdateBlock={editor.updateBlock}
              onRemoveBlock={editor.removeBlock}
              onMoveBlock={editor.moveBlock}
              onUploadImage={editor.uploadImage}
              onUploadSuccess={editor.setMsg}
              onUploadError={editor.setError}
            />

            <div className="mt-6 flex flex-col gap-3">
              {editor.error ? (
                <p className="text-sm text-red-700 dark:text-red-400">
                  {editor.error}
                </p>
              ) : null}
              {editor.msg ? (
                <p className="text-sm text-green-700 dark:text-green-400">
                  {editor.msg}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={editor.save}
                  disabled={editor.saving}
                  className="h-11 rounded-xl bg-black px-5 text-sm font-bold text-white disabled:opacity-60 dark:bg-white dark:text-black"
                >
                  {editor.saving ? "..." : "Sauvegarder"}
                </button>

                <div className="flex items-center gap-2">
                  <input
                    value={editor.testTo}
                    onChange={(e) => editor.setTestTo(e.target.value)}
                    placeholder="Email test…"
                    className="h-11 w-[260px] rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/10 dark:bg-black"
                  />
                  <button
                    onClick={editor.sendTest}
                    className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold hover:bg-black/[0.03] dark:border-white/10 dark:hover:bg-white/[0.06]"
                  >
                    Envoyer test
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-black/10 p-4 dark:border-white/10">
                <div className="text-xs font-bold uppercase tracking-widest opacity-60">
                  Envoi & Programmation
                </div>

                <div className="mt-3 flex flex-col gap-3">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <input
                      type="datetime-local"
                      value={editor.scheduledAt}
                      onChange={(e) => editor.setScheduledAt(e.target.value)}
                      className="h-11 w-full md:w-[260px] rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/10 dark:bg-black"
                    />

                    <button
                      type="button"
                      onClick={editor.scheduleNewsletter}
                      disabled={editor.scheduling}
                      className="h-11 rounded-xl bg-black px-4 text-sm font-bold text-white disabled:opacity-60 dark:bg-white dark:text-black"
                    >
                      {editor.scheduling ? "..." : "Programmer"}
                    </button>

                    <button
                      type="button"
                      onClick={editor.cancelSchedule}
                      disabled={editor.scheduling}
                      className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold disabled:opacity-60 dark:border-white/10"
                    >
                      Annuler programmation
                    </button>
                  </div>

                  <div className="flex">
                    <button
                      type="button"
                      onClick={editor.sendNowToAll}
                      disabled={editor.sendingAll}
                      className="h-11 rounded-xl border border-red-500/20 px-4 text-sm font-bold text-red-700 hover:bg-red-500/10 disabled:opacity-60 dark:text-red-400"
                    >
                      {editor.sendingAll ? "..." : "Envoyer à tous maintenant"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
              <div className="text-sm font-semibold">Preview (live)</div>
            </div>

            <iframe
              title="preview"
              srcDoc={editor.previewDoc}
              className="h-[820px] w-full bg-white"
              sandbox=""
            />
          </div>
        </div>
      </main>
    </div>
  );
}
