import { useTranslation } from "react-i18next";
import BookingModal from "../components/BookingModal.jsx";
import EventsAccessSection from "../components/Events/EventsAccessSection.jsx";
import EventsInfosSection from "../components/Events/EventsInfosSection.jsx";
import EventsProgramSection from "../components/Events/EventsProgramSection.jsx";
import EventsWorkshopsSection from "../components/Events/EventsWorkshopsSection.jsx";
import useEventsPage from "../hooks/useEventsPage.js";

function Events() {
  const { i18n } = useTranslation("event");
  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

  const {
    workshops,
    programDays,
    effectiveDay,
    setSelectedProgramDay,
    filteredProgramItems,
    selectedEvent,
    setSelectedEvent,
    refreshWorkshops,
  } = useEventsPage();

  return (
    <main className="w-full p-[25px] md:px-[100px] md:py-[50px]">
      <div className="mx-auto space-y-16 px-6 py-12">
        <EventsInfosSection />
        <EventsProgramSection
          programDays={programDays}
          effectiveDay={effectiveDay}
          onSelectDay={setSelectedProgramDay}
          items={filteredProgramItems}
          locale={locale}
        />
        <EventsAccessSection />
        <EventsWorkshopsSection
          workshops={workshops}
          onReserve={setSelectedEvent}
        />
      </div>

      {selectedEvent && (
        <BookingModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSuccess={() => {
            setSelectedEvent(null);
            refreshWorkshops().catch(console.error);
          }}
        />
      )}
    </main>
  );
}

export default Events;
