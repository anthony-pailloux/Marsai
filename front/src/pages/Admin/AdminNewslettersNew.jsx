import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsletterCkEditor from "../../components/newsletter/NewsletterCkEditor.jsx";
import { getAuthHeaders } from "../../utils/authHeaders.js";
import { getApiUrl } from "../../utils/apiBase.js";
import { typeAdminTitle } from "../../utils/typography.js";
import { toast } from "../../utils/toast.js";

export default function AdminNewsletterNew() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("#ffffff");
  const [contentHtml, setContentHtml] = useState("<p>Bonjour 👋</p>");
  const [loading, setLoading] = useState(false);

  async function create() {
    if (!subject.trim()) {
      toast.error("Le subject est requis.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${getApiUrl()}/admin/newsletters`, {
        method: "POST",
        headers: getAuthHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify({
          subject,
          title,
          background_color: background,
          content_json: { blocks: [] },
          content_html: contentHtml,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur création");

      toast.success("Newsletter créée");
      navigate(`/admin/newsletters/${data.id}`);
    } catch (e) {
      toast.error(e?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="mx-auto w-full px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <main className="min-w-0 flex-1 w-full">
            <div className="mt-10 w-full">
              <h1 className={typeAdminTitle}>NOUVELLE NEWSLETTER</h1>
              <p className="mt-2 text-sm opacity-70">
                Crée un brouillon, puis édite le contenu.
              </p>
            </div>

            <div className="mt-8 w-full rounded-2xl border border-black/10 dark:border-white/10 p-6">
              <label className="text-xs font-semibold tracking-widest uppercase opacity-70">
                Subject (objet email)
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm
                           dark:border-white/10 dark:bg-black"
                placeholder="MarsAI — Newsletter #1"
              />

              <label className="mt-6 block text-xs font-semibold tracking-widest uppercase opacity-70">
                Titre (optionnel)
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm
                           dark:border-white/10 dark:bg-black"
                placeholder="Bienvenue"
              />

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase opacity-70">
                    Background
                  </div>
                  <div className="mt-1 text-xs opacity-60">{background}</div>
                </div>

                <input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="h-10 w-16 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                />
              </div>

              <label className="mt-6 block text-xs font-semibold tracking-widest uppercase opacity-70">
                Contenu (CKEditor)
              </label>
              <div className="mt-2">
                <NewsletterCkEditor
                  value={contentHtml}
                  onChange={setContentHtml}
                />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => navigate("/admin/newsletters")}
                  className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold
                             dark:border-white/10"
                >
                  Annuler
                </button>

                <button
                  onClick={create}
                  disabled={loading}
                  className="h-11 rounded-xl bg-black px-5 text-sm font-bold text-white
                             disabled:opacity-60
                             dark:bg-white dark:text-black"
                >
                  {loading ? "..." : "Créer"}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
