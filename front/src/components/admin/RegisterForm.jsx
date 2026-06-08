import useRegisterForm from "../../hooks/useRegisterForm.js";
import { getRegisterFormStyles } from "../../utils/registerFormStyles.js";
import { typeAdminSection, typeBodySm, typeEyebrow } from "../../utils/typography.js";
import RegisterFormFields from "./RegisterFormFields.jsx";

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

      <RegisterFormFields
        isDashboard={isDashboard}
        isInviteMode={isInviteMode}
        selectableRole={selectableRole}
        labelClass={labelClass}
        inputClass={inputClass}
        selectClass={selectClass}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        password={password}
        setPassword={setPassword}
        verifyPassword={verifyPassword}
        setVerifyPassword={setVerifyPassword}
      />

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
