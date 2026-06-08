import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, registerWithInvite } from "../services/Auth/RegisterApi.js";
import { validateRegisterForm } from "../utils/registerFormValidation.js";

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
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState(selectableRole ? "" : role);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

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
      setError(validationError);
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

      setSuccess(
        onSuccess
          ? "Utilisateur créé avec succès !"
          : isInviteMode
            ? "Compte créé avec succès !"
            : "User created successfully !",
      );
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
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
    success,
    error,
    handleSubmit,
  };
}
