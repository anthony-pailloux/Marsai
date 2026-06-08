import { useState } from "react";
import { createBooking } from "../services/Events/EventsApi.js";
import { inputBaseClasses } from "../utils/formInputClasses.js";
import { typeAdminSection, typeBodySm, typeCaption } from "../utils/typography.js";

export default function BookingModal({ event, onClose, onSuccess }) {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createBooking(event.id, { first_name, last_name, email });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Erreur lors de la réservation");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white dark:bg-black rounded-2xl border border-black/10 dark:border-[#FF8C42]/60 shadow-xl dark:shadow-[0_0_40px_rgba(255,140,66,0.4)] max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className={`text-black dark:text-white ${typeAdminSection}`}>
          Réserver pour : {event.title}
        </h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && (
            <p className={`text-red-600 dark:text-red-400 ${typeBodySm}`}>{error}</p>
          )}
          <div>
            <label className={`block text-black/70 dark:text-white/70 mb-1 ${typeCaption} font-medium`}>Prénom</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              required
              className={inputBaseClasses}
            />
          </div>
          <div>
            <label className={`block text-black/70 dark:text-white/70 mb-1 ${typeCaption} font-medium`}>Nom</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              required
              className={inputBaseClasses}
            />
          </div>
          <div>
            <label className={`block text-black/70 dark:text-white/70 mb-1 ${typeCaption} font-medium`}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputBaseClasses}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-black/20 dark:border-[#FF8C42]/60 px-4 py-2 text-sm font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-[#FF8C42] hover:bg-[#E07830] transition-colors px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Envoi…" : "Confirmer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
