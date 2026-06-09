import { useState } from "react";
import { inviteUser } from "../../services/Admin/Users.api.js";
import AdminSelect from "./AdminSelect.jsx";
import { typeBodySm } from "../../utils/typography.js";
import ActionToastZone from "../ui/ActionToastZone.jsx";
import { toast } from "../../utils/toast.js";

const TOAST_SCOPE = "invite-user";

export default function InviteForm({ onSuccess, onCancel }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      toast.error("Email requis", { scope: TOAST_SCOPE });
      return;
    }
    if (!role) {
      toast.error("Veuillez choisir un rôle", { scope: TOAST_SCOPE });
      return;
    }

    setLoading(true);
    try {
      const result = await inviteUser(cleanEmail, role);
      const msg = result?.message || "Invitation envoyée";
      toast.success(msg, { scope: TOAST_SCOPE });
      setEmail("");
      setRole("");
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err?.message || "Erreur lors de l'envoi", { scope: TOAST_SCOPE });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full">
      <h3 className={`text-black/90 dark:text-white/90 ${typeBodySm}`}>
        Inviter un admin / sélectionneur
      </h3>

      <div>
        <label className="mb-1 block text-xs font-medium text-black/70 dark:text-white/70">
          E-mail *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mon@exemple.com"
          className="w-full rounded-full border border-black/10 bg-black/5 px-3 py-2 text-sm text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:ring-white/20"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-black/70 dark:text-white/70">
          Choix rôle *
        </label>
        <AdminSelect
          value={role}
          onChange={setRole}
          placeholder="Choix rôle"
          options={[
            { value: "admin", label: "Administrateur" },
            { value: "selector", label: "Sélectionneur" },
          ]}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <ActionToastZone scope={TOAST_SCOPE} placement="above" />
        <div className="flex w-full gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs font-semibold text-black/70 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#2F6BFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2F6BFF]/90 disabled:opacity-60"
        >
          {loading ? "Envoi..." : "Envoyer invitation"}
        </button>
        </div>
      </div>
    </form>
  );
}
