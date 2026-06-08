const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,128}$/;

/** Retourne un message d'erreur ou null si le formulaire est valide. */
export function validateRegisterForm({
  firstName,
  lastName,
  email,
  password,
  verifyPassword,
  isInviteMode,
  selectableRole,
  selectedRole,
}) {
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !password.trim() ||
    !verifyPassword.trim()
  ) {
    return "Veuillez remplir tous les champs.";
  }

  if (!isInviteMode && !email.trim()) {
    return "Veuillez renseigner un email.";
  }

  if (selectableRole && !isInviteMode && !selectedRole) {
    return "Veuillez choisir un rôle.";
  }

  if (lastName.length < 1) {
    return "Le nom doit contenir au moins 1 caractère.";
  }
  if (lastName.length > 100) {
    return "Le nom ne doit pas dépasser 100 caractères.";
  }

  if (firstName.length < 1) {
    return "Le prénom doit contenir au moins 1 caractère.";
  }
  if (firstName.length > 100) {
    return "Le prénom ne doit pas dépasser 100 caractères.";
  }

  if (!PASSWORD_REGEX.test(password)) {
    return "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (!?#$^&*@).";
  }

  if (password !== verifyPassword) {
    return "Le mot de passe et la confirmation ne correspondent pas.";
  }

  return null;
}
