import AdminSelect from "./AdminSelect.jsx";
import useRegisterForm from "../../hooks/useRegisterForm.js";
import { getRegisterFormStyles } from "../../utils/registerFormStyles.js";
import { typeAdminSection, typeBodySm, typeEyebrow } from "../../utils/typography.js";

function RegisterForm({
  role = "admin",
  selectableRole = false,
  onSuccess,
  onCancel,
  variant = "register",
  inviteToken = "",
}) {
  const styles = getRegisterFormStyles(variant);
  const {
    isInviteMode,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    verifyPassword,
    setVerifyPassword,
    selectedRole,
    setSelectedRole,
    success,
    error,
    handleSubmit,
  } = useRegisterForm({ role, selectableRole, onSuccess, inviteToken });

  const {
    isDashboard,
    formClass,
    inputClass,
    selectClass,
    labelClass,
    btnCancelClass,
    btnSubmitClass,
  } = styles;

  return (
    <form onSubmit={handleSubmit} className={formClass}>
      <div className={isDashboard ? "" : "flex flex-col items-center gap-2"}>
        {isDashboard ? (
          <h3 className={`text-black/90 dark:text-white/90 ${typeBodySm}`}>
            Nouvel utilisateur
          </h3>
        ) : (
          <>
            <h2
              className={`uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-t from-[#51A2FF] to-[#FF8C42] ${typeAdminSection}`}
            >
              Create an Account
            </h2>
            <p className={`text-gray-500 uppercase tracking-wider ${typeEyebrow}`}>
              New Profile
            </p>
          </>
        )}
      </div>

      <div className={isDashboard ? "grid sm:grid-cols-2 gap-4" : "w-full flex gap-4"}>
        <div className={isDashboard ? "" : "flex-1 flex flex-col gap-1"}>
          <label className={labelClass}>
            {isDashboard ? "Prénom *" : "Firstname *"}
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            className={inputClass}
          />
        </div>
        <div className={isDashboard ? "" : "flex-1 flex flex-col gap-1"}>
          <label className={labelClass}>
            {isDashboard ? "Nom *" : "Lastname *"}
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            className={inputClass}
          />
        </div>
      </div>

      {!isInviteMode && (
        <div className={isDashboard ? "" : "w-full flex flex-col gap-1"}>
          <label className={labelClass}>
            {isDashboard ? "E-mail *" : "E-mail address *"}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mon@exemple.com"
            className={inputClass}
          />
        </div>
      )}

      {selectableRole && !isInviteMode && (
        <div className={isDashboard ? "" : "w-full flex flex-col gap-1"}>
          <label className={labelClass}>
            {isDashboard ? "Choix rôle *" : "Role choice *"}
          </label>
          {isDashboard ? (
            <AdminSelect
              value={selectedRole}
              onChange={setSelectedRole}
              placeholder="Choix rôle"
              options={[
                { value: "admin", label: "Administrateur" },
                { value: "selector", label: "Sélectionneur" },
              ]}
            />
          ) : (
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className={selectClass}
            >
              <option
                value="admin"
                className="bg-white text-black dark:bg-black dark:text-white"
              >
                Administrateur
              </option>
              <option
                value="selector"
                className="bg-white text-black dark:bg-black dark:text-white"
              >
                Sélectionneur
              </option>
            </select>
          )}
        </div>
      )}

      <div className={isDashboard ? "grid sm:grid-cols-2 gap-4" : "w-full flex gap-4"}>
        <div className={isDashboard ? "" : "flex-1 flex flex-col gap-1"}>
          <label className={labelClass}>
            {isDashboard ? "Mot de passe *" : "Mot de passe *"}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            className={inputClass}
          />
        </div>
        <div className={isDashboard ? "" : "flex-1 flex flex-col gap-1"}>
          <label className={labelClass}>
            {isDashboard ? "Confirmation *" : "Confirm *"}
          </label>
          <input
            type="password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            placeholder="••••••"
            className={inputClass}
          />
        </div>
      </div>

      {error && (
        <p
          className={
            isDashboard ? "text-sm text-[#DC2626]" : "text-red-500 text-sm text-center"
          }
        >
          {error}
        </p>
      )}
      {success && (
        <p
          className={
            isDashboard
              ? "text-sm text-[#1AFF7A]"
              : "text-green-500 text-sm text-center"
          }
        >
          {success}
        </p>
      )}

      <div className="w-full flex gap-3">
        {onCancel && (
          <button type="button" onClick={onCancel} className={btnCancelClass}>
            Annuler
          </button>
        )}
        <button type="submit" className={btnSubmitClass}>
          {onCancel ? "Créer" : "Register"}
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
