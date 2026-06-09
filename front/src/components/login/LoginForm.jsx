import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/Auth/LoginApi";
import { decodeToken } from "../../utils/decodeToken.js";
import { typeAdminSection, typeBodySm } from "../../utils/typography.js";
import Button from "../ui/Button.jsx";
import Field from "../ui/Field.jsx";
import { Input } from "../ui/Input.jsx";
import { toast } from "../../utils/toast.js";

/* ========================
   Page de connexion admin
======================== */
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const timeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (!email.trim() || !password.trim()) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser(email, password);

      if (!result?.token) {
        throw new Error("Token manquant dans la réponse.");
      }

      localStorage.setItem("token", result.token);
      toast.success("Connexion réussie");

      const user = decodeToken();
      const target = user?.role === "selector" ? "/selector/videos" : "/admin";

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        navigate(target, { replace: true });
      }, 500);
    } catch (err) {
      if (!isMountedRef.current) return;
      toast.error(err?.message || "Échec de la connexion.");
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
            Connexion à votre espace utilisateur
          </h1>
          <p className={`mt-2 text-black/60 dark:text-white/60 ${typeBodySm}`}>
            Utilisez vos identifiants pour vous connecter.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-black/10 bg-black/5 p-6 shadow-sm dark:border-brand/60 dark:bg-white/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Adresse e-mail" htmlFor="admin-email" required>
              <Input
                id="admin-email"
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

            <Field label="Mot de passe" htmlFor="admin-password" required>
              <Input
                id="admin-password"
                type="password"
                variant="light"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
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
              Se connecter
            </Button>

            <p className="text-center text-sm">
              <Link
                to="/forgot-password"
                className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
              >
                Mot de passe oublié ?
              </Link>
            </p>
          </form>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 text-center text-sm">
          <Link
            to="/"
            className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
