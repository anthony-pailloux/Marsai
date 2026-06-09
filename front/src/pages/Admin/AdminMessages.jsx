import useAdminMessages from "../../hooks/useAdminMessages.js";
import { MessageListItem } from "../../components/admin/AdminMessagesParts.jsx";
import MessageDetailPanel from "../../components/admin/MessageDetailPanel.jsx";
import {
  typeAdminSection,
  typeAdminTitle,
  typeBodySm,
} from "../../utils/typography.js";

const panelClass =
  "overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]";

export default function AdminMessages() {
  const {
    loading,
    q,
    setQ,
    selected,
    selectedId,
    setSelectedId,
    reply,
    setReply,
    sending,
    filtered,
    loadMessages,
    sendReply,
  } = useAdminMessages();

  return (
    <div className="">
      <div className="mx-auto w-full px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <div className="min-w-0 flex-1">
            <div className="w-full">
              <h3 className={`w-full ${typeAdminTitle}`}>MESSAGES</h3>
              <div
                className={`mt-2 max-w-2xl text-black/55 dark:text-white/55 ${typeBodySm}`}
              >
                Messages reçus via le formulaire de contact. Réponds directement
                depuis cette page.
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-[0.95fr_1.35fr]">
              <div className={panelClass}>
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div className={typeAdminSection}>Boîte de réception</div>
                  <button
                    type="button"
                    onClick={loadMessages}
                    className="rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-xs font-semibold text-black/70 hover:bg-black/[0.05]
                               dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                  >
                    Rafraîchir
                  </button>
                </div>

                <div className="px-6 pb-4">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Rechercher un email, nom, sujet…"
                    className="w-full rounded-xl border border-black/10 bg-black/[0.03] px-5 py-3 text-sm text-black/70 outline-none
                               dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                  />
                </div>

                <div className="divide-y divide-black/10 dark:divide-white/10">
                  {loading && (
                    <div className="px-6 py-8 text-sm text-black/60 dark:text-white/60">
                      Chargement…
                    </div>
                  )}

                  {!loading && filtered.length === 0 && (
                    <div className="px-6 py-10 text-sm text-black/50 dark:text-white/50">
                      Aucun message.
                    </div>
                  )}

                  {!loading &&
                    filtered.map((m) => (
                      <MessageListItem
                        key={m.id}
                        message={m}
                        isActive={selected?.id === m.id}
                        onSelect={setSelectedId}
                      />
                    ))}
                </div>
              </div>

              <div
                className={`${panelClass} overflow-visible shadow-[0_18px_60px_rgba(0,0,0,0.06)]`}
              >
                <MessageDetailPanel
                  selected={selected}
                  reply={reply}
                  setReply={setReply}
                  sending={sending}
                  onSendReply={sendReply}
                />
              </div>
            </div>

            <div className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
