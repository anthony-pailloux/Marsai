import { useEffect, useMemo, useState } from "react";
import { getEvents } from "../services/Events/EventsApi.js";
import { getProgram } from "../services/Events/ConferenceProgramAPI.js";
import {
  filterProgramByDay,
  getProgramDays,
} from "../utils/eventsPageUtils.js";

export default function useEventsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [programItems, setProgramItems] = useState([]);
  const [selectedProgramDay, setSelectedProgramDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const programDays = useMemo(
    () => getProgramDays(programItems),
    [programItems],
  );

  const effectiveDay = selectedProgramDay ?? programDays[0] ?? null;

  const filteredProgramItems = useMemo(
    () => filterProgramByDay(programItems, effectiveDay),
    [programItems, effectiveDay],
  );

  async function refreshWorkshops() {
    const data = await getEvents();
    setWorkshops(data);
  }

  useEffect(() => {
    refreshWorkshops().catch((err) =>
      console.error("Erreur chargement événements:", err),
    );
  }, []);

  useEffect(() => {
    getProgram()
      .then(setProgramItems)
      .catch((err) => console.error("Erreur programme:", err));
  }, []);

  return {
    workshops,
    programDays,
    effectiveDay,
    selectedProgramDay,
    setSelectedProgramDay,
    filteredProgramItems,
    selectedEvent,
    setSelectedEvent,
    refreshWorkshops,
  };
}
