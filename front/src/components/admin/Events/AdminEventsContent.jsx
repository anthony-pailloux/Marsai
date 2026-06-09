import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAdminEvents from "../../../hooks/useAdminEvents.js";
import EventCard from "../EventCard.jsx";
import EventFormModal from "./EventFormModal.jsx";
import {
  typeAdminMeta,
  typeAdminSection,
  typeAdminStat,
  typeCaption,
} from "../../../utils/typography.js";
import ConfirmDialog from "../../ConfirmDialog.jsx";

export default function AdminEventsContent() {
  const { t } = useTranslation("adminEvents");
  const navigate = useNavigate();

  const {
    day,
    setDay,
    query,
    setQuery,
    loading,
    modalOpen,
    editing,
    form,
    setForm,
    dayTabs,
    filtered,
    stats,
    openCreate,
    openEdit,
    closeModal,
    deleteTarget,
    onSave,
    requestDelete,
    cancelDelete,
    confirmDelete,
    onTogglePublish,
  } = useAdminEvents();

  return (
    <>
      <section className="mt-5 overflow-hidden rounded-3xl border border-black/10 bg-black/5 dark:border-[#FF8C42]/60 dark:bg-white/5">
        <div className="p-6">
          <h2 className={typeAdminSection}>{t("sectionTitle")}</h2>
          <p className={`mt-1 ${typeAdminMeta}`}>{t("sectionSubtitle")}</p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-[#FF8C42]/60 dark:bg-black/35">
              <p className={typeCaption}>{t("statsTotalReservations")}</p>
              <p className={`mt-1 ${typeAdminStat}`}>{stats.totalReservations}</p>
              <p className={`mt-1 text-black/50 dark:text-white/50 ${typeCaption}`}>
                {t("statsOnSelectedDay")}
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-[#FF8C42]/60 dark:bg-black/35">
              <p className={typeCaption}>{t("statsFillRate")}</p>
              <p className={`mt-1 ${typeAdminStat}`}>{stats.fillRate}%</p>
              <div className="mt-3 h-2 w-full rounded-full bg-black/10 dark:bg-white/10">
                <div
                  className="h-2 rounded-full bg-[#FF8C42]"
                  style={{ width: `${stats.fillRate}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-[#FF8C42]/60 dark:bg-black/35">
              <p className={typeCaption}>{t("statsPublished")}</p>
              <p className={`mt-1 ${typeAdminStat}`}>{stats.publishedCount}</p>
              <p className={`mt-1 text-black/50 dark:text-white/50 ${typeCaption}`}>
                {t("statsOnEvents", { count: stats.eventsCount })}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {dayTabs.length > 0 ? (
                dayTabs.map((tab) => {
                  const active = tab.key === day;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setDay(tab.key)}
                      className={[
                        "rounded-full px-4 py-2 text-xs font-semibold",
                        active
                          ? "bg-black/15 text-black dark:bg-white/15 dark:text-white"
                          : "bg-black/10 text-black/70 dark:bg-black/35 dark:text-white/70 hover:bg-black/15 hover:text-black dark:hover:bg-white/10 dark:hover:text-white",
                      ].join(" ")}
                    >
                      {tab.label}
                    </button>
                  );
                })
              ) : (
                <p className="text-xs text-black/60 dark:text-white/60">
                  {t("noEventsYet")}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <div className="flex-1 md:w-[320px]">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-2 text-sm text-black outline-none placeholder:text-black/40 focus:border-black/20 dark:border-[#FF8C42]/60 dark:bg-black/35 dark:text-white dark:placeholder:text-white/40 dark:focus:border-[#FF8C42]/60"
                />
              </div>

              <button
                type="button"
                onClick={openCreate}
                className="rounded-2xl bg-[#FF8C42] hover:bg-[#E07830] transition-colors px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase"
              >
                {t("addButton")}
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="rounded-3xl border border-black/10 bg-black/10 p-6 text-sm text-black/70 dark:border-[#FF8C42]/60 dark:bg-black/30 dark:text-white/70">
                {t("loading")}
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-black/15 bg-black/5 p-8 dark:border-[#FF8C42]/60 dark:bg-black/25">
                <p className="text-sm font-semibold">{t("noEvents")}</p>
                <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                  {t("noEventsHint")}
                </p>

                <button
                  type="button"
                  onClick={openCreate}
                  className="mt-4 inline-flex rounded-2xl bg-black/10 px-4 py-2 text-xs font-semibold hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/15"
                >
                  {t("createEvent")}
                </button>
              </div>
            ) : (
              filtered.map((ev) => (
                <EventCard
                  key={ev.id}
                  ev={ev}
                  onEdit={() => openEdit(ev)}
                  onDelete={() => requestDelete(ev)}
                  onTogglePublish={() => onTogglePublish(ev)}
                  onParticipants={() =>
                    navigate(`/admin/events/${ev.id}/participants`)
                  }
                />
              ))
            )}
          </div>
        </div>
      </section>

      <EventFormModal
        open={modalOpen}
        editing={editing}
        form={form}
        setForm={setForm}
        onClose={closeModal}
        onSave={onSave}
        t={t}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Supprimer l'événement"
        message={
          deleteTarget
            ? `Supprimer « ${deleteTarget.title} » ?`
            : ""
        }
        confirmLabel="Supprimer"
        confirmVariant="danger"
      />
    </>
  );
}
