import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, registerWithInvite } from "../services/Auth/RegisterApi.js";
import { validateRegisterForm } from "../utils/registerFormValidation.js";
import { toast } from "../utils/toast.js";

export default function useRegisterForm({
  role = "admin",
  selectableRole = false,
  onSuccess,
  inviteToken = "",
}) {
  const navigate = useNavigate();
  const isInviteMode = Boolean(inviteToken);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(selectableRole ? "" : role);

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validateRegisterForm({
      firstName,
      lastName,
      email,
      password,
      verifyPassword,
      isInviteMode,
      selectableRole,
      selectedRole,
    });

    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      if (isInviteMode) {
        await registerWithInvite({
          token: inviteToken,
          firstname: firstName.trim(),
          lastname: lastName.trim(),
          password,
        });

        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1000);
      } else {
        const roleToUse = selectableRole ? selectedRole : role;
        await registerUser(
          {
            email: email.trim(),
            firstname: firstName.trim(),
            lastname: lastName.trim(),
            password,
          },
          roleToUse,
        );
      }

      const successMsg = onSuccess
        ? "Utilisateur créé avec succès !"
        : isInviteMode
          ? "Compte créé avec succès !"
          : "Compte créé avec succès !";

      toast.success(successMsg);
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return {
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
    handleSubmit,
  };
}
