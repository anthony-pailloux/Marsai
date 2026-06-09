import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../services/Auth/PasswordResetApi";
import { typeAdminSection, typeBodySm } from "../../utils/typography.js";
import Button from "../ui/Button.jsx";
import Field from "../ui/Field.jsx";
import { Input } from "../ui/Input.jsx";
import ActionToastZone from "../ui/ActionToastZone.jsx";
import { toast } from "../../utils/toast.js";

const TOAST_SCOPE = "reset-password";

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("Lien invalide. Demandez un nouveau lien de réinitialisation.", {
        scope: TOAST_SCOPE,
      });
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("Veuillez remplir tous les champs.", { scope: TOAST_SCOPE });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.", { scope: TOAST_SCOPE });
      return;
    }

    setLoading(true);
    try {
      const result = await resetPassword(token, password);
      const msg = result?.message || "Mot de passe mis à jour.";
      toast.success(msg, { scope: TOAST_SCOPE });
      setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch (err) {
      toast.error(err?.message || "Impossible de réinitialiser le mot de passe.", {
        scope: TOAST_SCOPE,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-12 text-center">
        <p className="mb-4 text-sm text-danger">
          Lien de réinitialisation invalide ou manquant.
        </p>
        <Link to="/forgot-password" className="text-sm underline">
          Demander un nouveau lien
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/10 px-4 py-2 text-lg font-semibold tracking-[0.2em] uppercase dark:bg-white/10">
            MARS <span className="text-brand">AI</span>
          </div>
          <h1 className={`mt-4 ${typeAdminSection}`}>
            Nouveau mot de passe
          </h1>
          <p className={`mt-2 text-black/60 dark:text-white/60 ${typeBodySm}`}>
            Choisissez un mot de passe sécurisé (8 caractères min., majuscule, minuscule, chiffre, caractère spécial).
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-black/10 bg-black/5 p-6 shadow-sm dark:border-brand/60 dark:bg-white/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Nouveau mot de passe" htmlFor="reset-password" required>
              <Input
                id="reset-password"
                type="password"
                variant="light"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                className="h-12"
              />
            </Field>

            <Field
              label="Confirmer le mot de passe"
              htmlFor="reset-password-confirm"
              required
            >
              <Input
                id="reset-password-confirm"
                type="password"
                variant="light"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
                className="h-12"
              />
            </Field>

            <div className="flex w-full flex-col items-center">
              <ActionToastZone scope={TOAST_SCOPE} placement="above" />
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="h-12 w-full rounded-md"
              >
                Réinitialiser
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm">
          <Link
            to="/login"
            className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
          >
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
