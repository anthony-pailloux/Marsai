import AdminSelect from "./AdminSelect.jsx";

export default function RegisterFormFields({
  isDashboard,
  isInviteMode,
  selectableRole,
  labelClass,
  inputClass,
  selectClass,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  selectedRole,
  setSelectedRole,
  password,
  setPassword,
  verifyPassword,
  setVerifyPassword,
}) {
  return (
    <>
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
    </>
  );
}
