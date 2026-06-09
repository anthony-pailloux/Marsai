import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../../services/Auth/PasswordResetApi";
import { typeAdminSection, typeBodySm } from "../../utils/typography.js";
import Button from "../ui/Button.jsx";
import Field from "../ui/Field.jsx";
import { Input } from "../ui/Input.jsx";
import { toast } from "../../utils/toast.js";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Veuillez saisir votre adresse e-mail.");
      return;
    }

    setLoading(true);
    try {
      const result = await requestPasswordReset(email.trim());
      const msg =
        result?.message ||
        "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.";
      toast.success(msg);
    } catch (err) {
      toast.error(err?.message || "Impossible d'envoyer la demande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/10 px-4 py-2 text-lg font-semibold tracking-[0.2em] uppercase dark:bg-white/10">
            MARS <span className="text-brand">AI</span>
          </div>
          <h1 className={`mt-4 ${typeAdminSection}`}>
            Mot de passe oublié
          </h1>
          <p className={`mt-2 text-black/60 dark:text-white/60 ${typeBodySm}`}>
            Saisissez votre email pour recevoir un lien de réinitialisation.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-black/10 bg-black/5 p-6 shadow-sm dark:border-brand/60 dark:bg-white/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Adresse e-mail" htmlFor="forgot-email" required>
              <Input
                id="forgot-email"
                type="email"
                variant="light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="admin@example.com"
                required
                className="h-12"
              />
            </Field>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="h-12 w-full rounded-md"
            >
              Envoyer le lien
            </Button>
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

export default ForgotPasswordForm;
